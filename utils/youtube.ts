import { YouTubeShortItem } from '../types';
import { YOUTUBE_SHORTS, APP_CONFIG } from '../constants';

const CACHE_KEY = 'djedney_youtube_shorts_cache_v6';
const CUSTOM_SHORTS_KEY = 'djedney_custom_shorts_list';
const CACHE_TTL_MS = 3 * 60 * 60 * 1000; // 3 horas para evitar estourar limites de requisição

interface ShortsCachePayload {
  timestamp: number;
  data: YouTubeShortItem[];
}

/**
 * Normaliza datas para timestamp numérico, compatível com WebKit/Safari/Chrome/Firefox
 */
export const parseDateToTimestamp = (dateStr?: string): number => {
  if (!dateStr) return 0;
  try {
    const normalized = dateStr.includes('T') ? dateStr : dateStr.replace(' ', 'T');
    const t = new Date(normalized).getTime();
    if (!isNaN(t)) return t;
    const fallback = new Date(dateStr).getTime();
    return isNaN(fallback) ? 0 : fallback;
  } catch {
    return 0;
  }
};

/**
 * Retorna os shorts salvos manualmente pelo usuário (ex: via link do YouTube)
 */
export const getCustomAddedShorts = (): YouTubeShortItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOM_SHORTS_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
};

/**
 * Salva um novo short customizado adicionado pelo usuário
 */
export const saveCustomShort = (item: YouTubeShortItem): YouTubeShortItem[] => {
  if (typeof window === 'undefined') return [item, ...YOUTUBE_SHORTS];
  try {
    const existing = getCustomAddedShorts();
    const filtered = existing.filter(x => x.id !== item.id);
    const updated = [item, ...filtered];
    localStorage.setItem(CUSTOM_SHORTS_KEY, JSON.stringify(updated));
    // Limpa o cache principal para forçar recomposição
    localStorage.removeItem(CACHE_KEY);
    return updated;
  } catch (err) {
    console.warn('Erro ao salvar short customizado:', err);
    return [item, ...YOUTUBE_SHORTS];
  }
};

/**
 * Retorna os shorts salvos em cache local para renderização instantânea (0ms de atraso).
 */
export const getCachedYouTubeShorts = (): YouTubeShortItem[] | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    const customList = getCustomAddedShorts();

    if (raw) {
      const payload: ShortsCachePayload = JSON.parse(raw);
      if (Array.isArray(payload.data) && payload.data.length > 0) {
        // Se houver vídeos novos em constants.ts ou customList que não estão no cache, invalida
        const topExpectedId = customList[0]?.id || YOUTUBE_SHORTS[0]?.id;
        if (topExpectedId && !payload.data.some(item => item.id === topExpectedId)) {
          return null;
        }
        return payload.data;
      }
    }
  } catch (err) {
    console.warn('Erro ao ler cache de shorts do YouTube:', err);
  }
  return null;
};

/**
 * Busca metadados de um YouTube Short por URL ou ID direto via noembed (CORS nativo e 0ms)
 */
export const fetchShortInfoByUrlOrId = async (input: string): Promise<YouTubeShortItem | null> => {
  const cleanInput = input.trim();
  if (!cleanInput) return null;

  // Extrai o ID de 11 caracteres de diversos formatos de URL:
  // - https://www.youtube.com/shorts/PrDfJ4iPLoM
  // - https://youtu.be/PrDfJ4iPLoM
  // - https://www.youtube.com/watch?v=PrDfJ4iPLoM
  // - PrDfJ4iPLoM
  let vidId = '';
  const match = cleanInput.match(/(?:shorts\/|v=|youtu\.be\/|^)([a-zA-Z0-9_-]{11})(?:[?&/#]|$)/);
  if (match) {
    vidId = match[1];
  }

  if (!vidId || vidId.length !== 11) {
    return null;
  }

  let title = 'Momento Especial na Pista';
  try {
    const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${vidId}`, {
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.title && typeof data.title === 'string') {
        title = data.title.trim();
      }
    }
  } catch (err) {
    console.warn('Erro ao buscar título no noembed, usando fallback:', err);
  }

  return {
    id: vidId,
    title,
    thumbnailUrl: `https://i.ytimg.com/vi/${vidId}/maxresdefault.jpg`,
    youtubeUrl: `https://www.youtube.com/shorts/${vidId}`,
    pubDate: new Date().toISOString()
  };
};

/**
 * Busca automaticamente os vídeos e Shorts mais recentes do canal oficial do YouTube.
 */
export const fetchLatestYouTubeShorts = async (
  forceRefresh = false
): Promise<{ shorts: YouTubeShortItem[]; newVideosCount: number; success: boolean; message?: string }> => {
  const channelId = APP_CONFIG.youtubeChannelId || 'UCF2V46ZnlIHBQwKS5CdQYPg';
  const customList = getCustomAddedShorts();

  // 1. Limpa cache se for refresh forçado
  if (forceRefresh && typeof window !== 'undefined') {
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch {
      // noop
    }
  }

  // 2. Se temos cache recente e não foi forçado, retorna o cache
  if (!forceRefresh && typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const payload: ShortsCachePayload = JSON.parse(raw);
        const isFresh = Date.now() - payload.timestamp < CACHE_TTL_MS;
        if (isFresh && Array.isArray(payload.data) && payload.data.length >= 4) {
          const topExpectedId = customList[0]?.id || YOUTUBE_SHORTS[0]?.id;
          if (!topExpectedId || payload.data.some(item => item.id === topExpectedId)) {
            return { shorts: payload.data, newVideosCount: 0, success: true };
          }
        }
      }
    } catch {
      // continua para o fetch
    }
  }

  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  let fetchedShorts: YouTubeShortItem[] = [];
  let isFetchSuccess = false;
  let statusMessage = '';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

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
        isFetchSuccess = true;
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
      } else if (json.message) {
        statusMessage = json.message;
      }
    } else {
      statusMessage = `HTTP ${response.status}`;
    }
  } catch (err: unknown) {
    const error = err as Error;
    console.warn('Erro na consulta ao feed do YouTube:', error.message);
    statusMessage = error.message;
  }

  // Mesclagem com prioridade:
  // 1. Shorts adicionados manualmente pelo usuário
  // 2. Shorts encontrados no canal ao vivo
  // 3. Shorts de constants.ts
  const combined: YouTubeShortItem[] = [];
  const seenIds = new Set<string>();

  for (const item of customList) {
    if (!seenIds.has(item.id)) {
      combined.push(item);
      seenIds.add(item.id);
    }
  }

  for (const fetched of fetchedShorts) {
    if (!seenIds.has(fetched.id)) {
      combined.push(fetched);
      seenIds.add(fetched.id);
    }
  }

  for (const staticItem of YOUTUBE_SHORTS) {
    if (!seenIds.has(staticItem.id)) {
      combined.push(staticItem);
      seenIds.add(staticItem.id);
    }
  }

  // Ordena pelo pubDate mais recente garantindo compatibilidade com Safari
  combined.sort((a, b) => {
    const timeA = parseDateToTimestamp(a.pubDate);
    const timeB = parseDateToTimestamp(b.pubDate);
    return timeB - timeA;
  });

  const finalShorts = combined.slice(0, 9);

  // Calcula se houve vídeos novos em relação ao baseline de constants.ts
  const knownBaselineIds = new Set(YOUTUBE_SHORTS.map(x => x.id));
  const newVideosCount = finalShorts.filter(x => !knownBaselineIds.has(x.id)).length;

  // Salva no cache local
  if (finalShorts.length > 0 && typeof window !== 'undefined') {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: finalShorts
      }));
    } catch {
      // noop
    }
  }

  return {
    shorts: finalShorts.length > 0 ? finalShorts : YOUTUBE_SHORTS,
    newVideosCount,
    success: isFetchSuccess,
    message: statusMessage
  };
};
