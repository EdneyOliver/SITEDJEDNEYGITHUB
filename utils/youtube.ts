import { YouTubeShortItem } from '../types';
import { YOUTUBE_SHORTS, APP_CONFIG } from '../constants';

const CACHE_KEY = 'djedney_youtube_shorts_cache_v3';
const CACHE_TTL_MS = 20 * 60 * 1000; // 20 minutos

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
 * Busca automaticamente os vídeos e Shorts mais recentes do canal oficial do YouTube.
 * Utiliza o RSS Feed oficial do canal do YouTube através do conversor rss2json,
 * filtrando shorts verticais e atualizando o site sem necessidade de deploy ou intervenção manual.
 */
export const fetchLatestYouTubeShorts = async (forceRefresh = false): Promise<YouTubeShortItem[]> => {
  const channelId = APP_CONFIG.youtubeChannelId || 'UCF2V46ZnlIHBQwKS5CdQYPg';
  
  // 1. Verifica se temos cache recente válido e não foi solicitado refresh forçado
  if (!forceRefresh && typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const payload: ShortsCachePayload = JSON.parse(raw);
        const isFresh = Date.now() - payload.timestamp < CACHE_TTL_MS;
        if (isFresh && Array.isArray(payload.data) && payload.data.length >= 4) {
          return payload.data;
        }
      }
    } catch {
      // continua para o fetch
    }
  }

  // 2. Tenta buscar o RSS Feed oficial do YouTube via conversor JSON público
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const response = await fetch(apiUrl, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ao consultar feed do YouTube`);
    }

    const json = await response.json();
    if (json.status === 'ok' && Array.isArray(json.items) && json.items.length > 0) {
      const fetchedShorts: YouTubeShortItem[] = [];

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

        // Filtro inteligente para priorizar Shorts (vídeos verticais de curta duração)
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
            youtubeUrl: `https://www.youtube.com/shorts/${vidId}`,
            pubDate: item.pubDate
          });
        }
      }

      // Se encontramos shorts novos no canal, mesclamos com os estáticos de forma inteligente
      if (fetchedShorts.length > 0) {
        const combined: YouTubeShortItem[] = [];
        const seenIds = new Set<string>();

        // 1. Prioriza vídeos de YOUTUBE_SHORTS que sejam mais recentes e ainda não tenham propagado no feed RSS
        for (const staticItem of YOUTUBE_SHORTS) {
          if (!seenIds.has(staticItem.id)) {
            combined.push(staticItem);
            seenIds.add(staticItem.id);
          }
        }

        // 2. Mescla os vídeos encontrados via feed oficial do YouTube
        for (const fetched of fetchedShorts) {
          if (!seenIds.has(fetched.id)) {
            combined.push(fetched);
            seenIds.add(fetched.id);
          }
        }

        // 3. Ordena garantindo os mais recentes primeiro
        combined.sort((a, b) => {
          const timeA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
          const timeB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
          return timeB - timeA;
        });

        // Limita aos 9 mais recentes para a vitrine
        const finalShorts = combined.slice(0, 9);

        // Salva no cache local
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
              timestamp: Date.now(),
              data: finalShorts
            }));
          } catch (storageErr) {
            console.warn('Não foi possível salvar cache de shorts no localStorage:', storageErr);
          }
        }

        return finalShorts;
      }
    }
  } catch (fetchErr) {
    console.warn('Atualização automática do YouTube usando fallback seguro:', fetchErr);
  }

  // 3. Fallback: cache prévio (mesmo expirado) ou lista estática atualizada
  const cached = getCachedYouTubeShorts();
  if (cached && cached.length > 0) {
    return cached;
  }

  return YOUTUBE_SHORTS;
};
