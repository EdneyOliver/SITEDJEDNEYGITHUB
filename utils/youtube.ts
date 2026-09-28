import { YouTubeShortItem } from '../types';
import { YOUTUBE_SHORTS, APP_CONFIG } from '../constants';

const CACHE_KEY = 'djedney_youtube_shorts_cache_v4';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

interface ShortsCachePayload {
  timestamp: number;
  data: YouTubeShortItem[];
}

/**
 * Retorna os shorts salvos em cache local para renderização instantânea (0ms de atraso).
 * Valida automaticamente se o vídeo mais recente conhecido está presente.
 */
export const getCachedYouTubeShorts = (): YouTubeShortItem[] | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const payload: ShortsCachePayload = JSON.parse(raw);
    if (Array.isArray(payload.data) && payload.data.length > 0) {
      // Se um novo vídeo foi adicionado à base e não está no cache antigo, invalida para atualizar
      if (YOUTUBE_SHORTS[0] && !payload.data.some(item => item.id === YOUTUBE_SHORTS[0].id)) {
        return null;
      }
      return payload.data;
    }
  } catch (err) {
    console.warn('Erro ao ler cache de shorts do YouTube:', err);
  }
  return null;
};

/**
 * Helper para interpretar o XML do feed oficial do YouTube (Atom/RSS)
 */
const parseYouTubeXml = (xmlText: string): YouTubeShortItem[] => {
  if (typeof window === 'undefined' || !xmlText) return [];
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'text/xml');
    const entries = doc.getElementsByTagName('entry');
    const items: YouTubeShortItem[] = [];

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      
      // Video ID
      const videoIdEl = entry.getElementsByTagName('yt:videoId')[0] || 
                        entry.getElementsByTagName('videoId')[0];
      let vidId = videoIdEl?.textContent?.trim() || '';
      
      // Fallback para ID se yt:videoId não vier explícito
      if (!vidId) {
        const idEl = entry.getElementsByTagName('id')[0];
        const idText = idEl?.textContent || '';
        if (idText.startsWith('yt:video:')) {
          vidId = idText.replace('yt:video:', '');
        }
      }

      // Link
      const linkEl = entry.querySelector('link[rel="alternate"]') || entry.querySelector('link');
      const link = linkEl?.getAttribute('href') || '';
      if (!vidId && link.includes('/shorts/')) {
        vidId = link.split('/shorts/')[1]?.split('?')[0] || '';
      } else if (!vidId && link.includes('v=')) {
        vidId = link.split('v=')[1]?.split('&')[0] || '';
      }

      // Title
      const titleEl = entry.getElementsByTagName('title')[0];
      const title = titleEl?.textContent?.trim() || 'Momento na Pista';

      // PubDate
      const pubEl = entry.getElementsByTagName('published')[0] || 
                    entry.getElementsByTagName('updated')[0];
      const pubDate = pubEl?.textContent?.trim() || '';

      const isShortLink = link.includes('/shorts/');
      const titleUpper = title.toUpperCase();
      const isLongFormSet = titleUpper.includes('WEEKEND SESSIONS') || 
                            titleUpper.includes('NEON NIGHTS') || 
                            titleUpper.includes('DJ SET -') ||
                            titleUpper.includes('EXTENDED MIX');

      if (vidId && (isShortLink || !isLongFormSet)) {
        items.push({
          id: vidId,
          title: title,
          thumbnailUrl: `https://i.ytimg.com/vi/${vidId}/maxresdefault.jpg`,
          youtubeUrl: isShortLink ? link : `https://www.youtube.com/shorts/${vidId}`,
          pubDate: pubDate
        });
      }
    }

    return items;
  } catch (err) {
    console.warn('Erro ao processar XML do YouTube:', err);
    return [];
  }
};

/**
 * Busca automaticamente os vídeos e Shorts mais recentes do canal oficial do YouTube.
 * Utiliza cache-busting dinâmico no RSS feed oficial do canal do YouTube
 * e múltiplos proxies de contingência (rss2json e AllOrigins) com parser nativo de XML.
 */
export const fetchLatestYouTubeShorts = async (forceRefresh = false): Promise<YouTubeShortItem[]> => {
  const channelId = APP_CONFIG.youtubeChannelId || 'UCF2V46ZnlIHBQwKS5CdQYPg';
  
  // 1. Limpa cache se for refresh forçado
  if (forceRefresh && typeof window !== 'undefined') {
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch {
      // noop
    }
  }

  // 2. Verifica se temos cache recente válido e não foi solicitado refresh forçado
  if (!forceRefresh && typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const payload: ShortsCachePayload = JSON.parse(raw);
        const isFresh = Date.now() - payload.timestamp < CACHE_TTL_MS;
        if (isFresh && Array.isArray(payload.data) && payload.data.length >= 4) {
          // Validação extra: se houver vídeo novo em constants que não está no cache, atualiza
          if (!YOUTUBE_SHORTS[0] || payload.data.some(item => item.id === YOUTUBE_SHORTS[0].id)) {
            return payload.data;
          }
        }
      }
    } catch {
      // continua para o fetch
    }
  }

  const cacheBuster = Date.now();
  // URL com cache-buster para evitar cache agressivo de servidores intermediários
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}&t=${cacheBuster}`;
  
  let fetchedShorts: YouTubeShortItem[] = [];

  // ESTRATÉGIA 1: rss2json com cache-busting explícito
  try {
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(apiUrl, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const json = await response.json();
      if (json.status === 'ok' && Array.isArray(json.items) && json.items.length > 0) {
        for (const item of json.items) {
          const link = item.link || '';
          const guid = item.guid || '';
          let vidId = '';

          if (guid.startsWith('yt:video:')) {
            vidId = guid.replace('yt:video:', '');
          } else if (link.includes('/shorts/')) {
            vidId = link.split('/shorts/')[1]?.split('?')[0] || '';
          } else if (link.includes('v=')) {
            vidId = link.split('v=')[1]?.split('&')[0] || '';
          }

          const isShortLink = link.includes('/shorts/');
          const titleUpper = (item.title || '').toUpperCase();
          const isLongFormSet = titleUpper.includes('WEEKEND SESSIONS') || 
                                titleUpper.includes('NEON NIGHTS') || 
                                titleUpper.includes('DJ SET -') ||
                                titleUpper.includes('EXTENDED MIX');

          if (vidId && (isShortLink || !isLongFormSet)) {
            fetchedShorts.push({
              id: vidId,
              title: item.title?.trim() || 'Momento na Pista',
              thumbnailUrl: `https://i.ytimg.com/vi/${vidId}/maxresdefault.jpg`,
              youtubeUrl: isShortLink ? link : `https://www.youtube.com/shorts/${vidId}`,
              pubDate: item.pubDate
            });
          }
        }
      }
    }
  } catch (err) {
    console.warn('Tentativa 1 (rss2json) falhou ou expirou:', err);
  }

  // ESTRATÉGIA 2 (Fallback em tempo real): AllOrigins proxy com XML direto do YouTube
  if (fetchedShorts.length === 0) {
    try {
      const allOriginsUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(allOriginsUrl, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const xmlText = await response.text();
        const parsed = parseYouTubeXml(xmlText);
        if (parsed.length > 0) {
          fetchedShorts = parsed;
        }
      }
    } catch (err2) {
      console.warn('Tentativa 2 (AllOrigins) falhou:', err2);
    }
  }

  // ESTRATÉGIA 3 (Fallback terciário): CorsProxy.io com XML direto do YouTube
  if (fetchedShorts.length === 0) {
    try {
      const corsProxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(rssUrl)}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(corsProxyUrl, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const xmlText = await response.text();
        const parsed = parseYouTubeXml(xmlText);
        if (parsed.length > 0) {
          fetchedShorts = parsed;
        }
      }
    } catch (err3) {
      console.warn('Tentativa 3 (CorsProxy) falhou:', err3);
    }
  }

  // Mesclagem inteligente com os dados estáticos mais recentes
  const combined: YouTubeShortItem[] = [];
  const seenIds = new Set<string>();

  // 1. Adiciona os vídeos encontrados na consulta ao vivo do canal
  for (const fetched of fetchedShorts) {
    if (!seenIds.has(fetched.id)) {
      combined.push(fetched);
      seenIds.add(fetched.id);
    }
  }

  // 2. Adiciona os vídeos de YOUTUBE_SHORTS caso não estejam na lista
  for (const staticItem of YOUTUBE_SHORTS) {
    if (!seenIds.has(staticItem.id)) {
      combined.push(staticItem);
      seenIds.add(staticItem.id);
    }
  }

  // 3. Ordena garantindo os mais recentes primeiro
  combined.sort((a, b) => {
    const timeA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const timeB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return timeB - timeA;
  });

  const finalShorts = combined.slice(0, 9);

  // Salva no cache local se tivermos itens válidos
  if (finalShorts.length > 0 && typeof window !== 'undefined') {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: finalShorts
      }));
    } catch (storageErr) {
      console.warn('Não foi possível salvar cache de shorts no localStorage:', storageErr);
    }
  }

  return finalShorts.length > 0 ? finalShorts : YOUTUBE_SHORTS;
};
