import React, { useState } from 'react';
import { YOUTUBE_SHORTS, APP_CONFIG } from '../constants';
import { YouTubeShortItem } from '../types';

export const YouTubeShortsSection: React.FC = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const shorts = YOUTUBE_SHORTS;

  const handlePlayVideo = (id: string) => {
    setActiveVideoId(id);
  };

  return (
    <section id="shorts-section" className="py-20 sm:py-28 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-red-500/20">
            <i className="fab fa-youtube text-xs"></i> Vídeos & Shorts
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sync font-black text-white uppercase tracking-tight mb-4">
            Veja meus <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-400">trabalhos</span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
            Confira alguns momentos reais de festas e eventos com DJ Edney.
          </p>
        </div>

        {/* CONTAINER DE VÍDEOS: Carrossel no Mobile, Grid 3x2 no Desktop */}
        <div className="
          flex md:grid overflow-x-auto md:overflow-visible pb-6 md:pb-0 gap-4 sm:gap-6 
          snap-x snap-mandatory md:snap-none no-scrollbar
          md:grid-cols-2 lg:grid-cols-3
        ">
          {shorts.map((item: YouTubeShortItem) => {
            const isPlaying = activeVideoId === item.id;

            return (
              <div 
                key={item.id}
                className="
                  snap-center shrink-0 w-[80vw] xs:w-[70vw] sm:w-[50vw] md:w-auto 
                  glass rounded-3xl overflow-hidden border border-white/10 relative group
                  aspect-[9/16] bg-black/80 flex flex-col justify-between
                  shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:border-red-500/40 transition-all duration-300
                "
              >
                {isPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${item.id}?autoplay=1&playsinline=1&rel=0`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0 absolute inset-0 z-20"
                  />
                ) : (
                  <div 
                    onClick={() => handlePlayVideo(item.id)}
                    className="absolute inset-0 w-full h-full cursor-pointer flex flex-col justify-between p-5 z-10"
                  >
                    {/* Thumbnail Imagem com fallback otimizado */}
                    <img 
                      src={item.thumbnailUrl} 
                      alt={`Vídeo de Festa / Evento: ${item.title} - DJ Edney em Campinas`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />

                    {/* Badge Superior */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white text-[9px] font-black uppercase tracking-wider">
                        <i className="fab fa-youtube text-red-500"></i> Short
                      </span>
                    </div>

                    {/* Botão de Play Centralizado */}
                    <div className="relative z-10 self-center my-auto">
                      <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center text-xl shadow-[0_0_30px_rgba(239,68,68,0.7)] group-hover:scale-110 group-hover:bg-red-500 transition-all duration-300 border-2 border-white/20">
                        <i className="fas fa-play ml-1"></i>
                      </div>
                    </div>

                    {/* Título Inferior */}
                    <div className="relative z-10">
                      <h3 className="font-sync font-bold text-white text-xs sm:text-sm uppercase tracking-tight leading-snug line-clamp-2 drop-shadow-md">
                        {item.title}
                      </h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1 flex items-center gap-1">
                        <i className="fas fa-play text-[8px] text-red-400"></i> Toque para assistir
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Indicador de Swipe no Mobile */}
        <div className="md:hidden text-center mt-3 text-gray-400 text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          <i className="fas fa-arrows-left-right text-[10px]"></i>
          <span>Deslize para ver mais vídeos</span>
        </div>

        {/* Botão para Ver Mais no Canal Oficial */}
        <div className="mt-12 text-center">
          <a
            href={`${APP_CONFIG.youtube}/shorts`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/15 hover:bg-red-600 hover:border-red-500 hover:text-white text-gray-200 font-sync font-bold text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-md"
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
