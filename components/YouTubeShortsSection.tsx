import React, { useState } from 'react';
import { YOUTUBE_SHORTS, APP_CONFIG } from '../constants';
import { YouTubeShortItem } from '../types';
import { trackShortVideoClick, trackYouTubeChannelClick } from '../utils/analytics';

export const YouTubeShortsSection: React.FC = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const shorts = YOUTUBE_SHORTS;

  const handlePlayVideo = (item: YouTubeShortItem, position: number) => {
    trackShortVideoClick(item.title, item.youtubeUrl, position);
    setActiveVideoId(item.id);
  };

  const handleMoreShortsClick = () => {
    trackYouTubeChannelClick('shorts_section');
  };

  return (
    <section id="shorts-section" className="py-16 sm:py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Background Glow sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-red-600/10 via-purple-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 relative z-10">
        
        {/* Cabeçalho Direto e Limpo */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3.5 border border-red-500/20">
            <i className="fab fa-youtube text-xs"></i> Experiência ao Vivo
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-sync font-black text-white uppercase tracking-tight mb-3.5 leading-tight">
            Veja meus <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-400">trabalhos</span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
            Momentos reais de festas, pistas animadas e a energia que levamos para cada evento.
          </p>
        </div>

        {/* CONTAINER DE VÍDEOS: Carrossel no Mobile (1 card + preview do próximo), Grid 3 Colunas x 2 Linhas no Desktop */}
        <div className="
          flex md:grid overflow-x-auto md:overflow-visible pb-5 md:pb-0 gap-4 sm:gap-6 
          snap-x snap-mandatory md:snap-none no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0
          md:grid-cols-2 lg:grid-cols-3
        ">
          {shorts.map((item: YouTubeShortItem, index: number) => {
            const isPlaying = activeVideoId === item.id;

            return (
              <div 
                key={item.id}
                className="
                  snap-center shrink-0 w-[76vw] xs:w-[70vw] sm:w-[46vw] md:w-auto 
                  rounded-3xl overflow-hidden border border-white/15 relative group
                  aspect-[9/16] bg-[#0c0c0e] flex flex-col justify-between
                  shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:border-red-500/50 hover:shadow-[0_20px_50px_rgba(239,68,68,0.25)] 
                  transition-all duration-500
                "
              >
                {isPlaying ? (
                  <div className="w-full h-full relative z-20 bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${item.id}?autoplay=1&playsinline=1&rel=0`}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0 absolute inset-0"
                    />
                    {/* Botão discreto para fechar o player */}
                    <button
                      onClick={() => setActiveVideoId(null)}
                      aria-label="Fechar vídeo"
                      className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => handlePlayVideo(item, index + 1)}
                    className="absolute inset-0 w-full h-full cursor-pointer flex flex-col justify-between p-5 sm:p-6 z-10 select-none group"
                  >
                    {/* Imagem Real de Alta Qualidade (Protagonista da Vitrine) */}
                    <img 
                      src={item.thumbnailUrl} 
                      alt={`Vídeo de Festa e Evento: ${item.title} - DJ Edney`}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        // Fallback automático para hqdefault se maxresdefault não estiver disponível
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('hqdefault')) {
                          target.src = `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`;
                        }
                      }}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradiente sutil apenas na base para leitura perfeita do título sem escurecer a festa */}
                    <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none" />
                    
                    {/* Gradiente ultra suave no topo para a badge */}
                    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

                    {/* Top Bar: Referência sutil da plataforma */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-sans font-semibold tracking-wide shadow-md">
                        <i className="fab fa-youtube text-red-500 text-xs"></i>
                        <span>YouTube Short</span>
                      </span>
                    </div>

                    {/* Botão de Play Centralizado Elegante com Brilho Harmônico */}
                    <div className="relative z-10 self-center my-auto">
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-black/50 backdrop-blur-md border-2 border-white/40 text-white flex items-center justify-center text-xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] group-hover:scale-110 group-hover:bg-red-600/90 group-hover:border-red-400 group-hover:shadow-[0_0_35px_rgba(239,68,68,0.7)] transition-all duration-300">
                        <i className="fas fa-play ml-1 text-white"></i>
                      </div>
                    </div>

                    {/* Título do Vídeo Discreto e Legível na Parte Inferior */}
                    <div className="relative z-10 pt-2">
                      <h3 className="font-sync font-bold text-white text-xs sm:text-sm uppercase tracking-tight leading-snug line-clamp-2 drop-shadow-md">
                        {item.title}
                      </h3>
                      <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-gray-300 font-sans">
                        <i className="fas fa-circle-play text-red-400 text-[10px]"></i>
                        <span>Toque para assistir</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Indicador de Swipe no Mobile */}
        <div className="md:hidden text-center mt-3 text-gray-400 text-[11px] font-sans font-medium uppercase tracking-widest flex items-center justify-center gap-2">
          <i className="fas fa-arrows-left-right text-[10px] text-red-400"></i>
          <span>Deslize para ver mais momentos</span>
        </div>

        {/* Botão para Ver Mais no Canal Oficial do YouTube */}
        <div className="mt-12 text-center">
          <a
            href={`${APP_CONFIG.youtube}/shorts`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleMoreShortsClick}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/15 hover:bg-red-600 hover:border-red-500 hover:text-white text-gray-200 font-sans font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-md"
          >
            <i className="fab fa-youtube text-lg text-red-500"></i>
            <span>Ver mais Shorts no YouTube</span>
            <i className="fas fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        </div>

      </div>
    </section>
  );
};
