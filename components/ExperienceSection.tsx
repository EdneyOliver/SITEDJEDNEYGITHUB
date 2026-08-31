import React from 'react';
import { EVENT_TYPES, APP_CONFIG } from '../constants';

export const ExperienceSection: React.FC = () => {
  const handleWhatsApp = () => {
    const message = "Olá DJ Edney! Gostaria de conversar sobre a experiência musical para meu evento.";
    window.open(`https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const REAL_MOMENTS = [
    {
      img: "/images/insta-2.webp",
      title: "Pista Animada",
      desc: "Energia e pista cheia do início ao fim"
    },
    {
      img: "/images/insta-1.webp",
      title: "Som & Iluminação",
      desc: "Equipamentos profissionais e tecnologia"
    },
    {
      img: "/images/insta-3.webp",
      title: "Atmosfera Única",
      desc: "Cenografia de luz e leitura de público"
    }
  ];

  return (
    <section id="experiencia-section" className="py-14 sm:py-20 bg-[#080808] border-t border-white/5 relative overflow-hidden">
      {/* Luz ambiente sutil */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        
        {/* Tipos de Eventos */}
        <div className="glass p-6 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] shadow-[0_15px_40px_rgba(0,0,0,0.5)] mb-10 sm:mb-14">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3 border border-blue-500/20">
              Versatilidade & Estilo
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sync font-bold text-white uppercase tracking-tight">
              A trilha sonora perfeita para o seu formato
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {EVENT_TYPES.map((ev, i) => (
              <div key={i} className="flex flex-col items-start p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/40 hover:bg-white/[0.05] transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-400 text-base mb-4 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 transition-all">
                  <i className={ev.icon}></i>
                </div>
                <div>
                  <h3 className="font-sync font-bold text-white text-sm uppercase tracking-wider mb-2 group-hover:text-blue-400 transition-colors">{ev.name}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{ev.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Nota Secundária para marcas / bares / academias */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-xs font-normal">
              Também desenvolvemos projetos personalizados para marcas, bares, academias e eventos especiais.
            </p>
            <button
              onClick={handleWhatsApp}
              className="text-blue-400 hover:text-blue-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <span>Consultar projeto especial</span>
              <i className="fas fa-arrow-right text-[10px]"></i>
            </button>
          </div>
        </div>

        {/* RESPIRO VISUAL: Momentos Reais em Destaque */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {REAL_MOMENTS.map((moment, idx) => (
            <div 
              key={idx}
              className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 group shadow-lg"
            >
              <img 
                src={moment.img} 
                alt={`${moment.title} - DJ Edney em Eventos em Campinas e Região`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-[9px] font-sync font-bold uppercase tracking-wider mb-1.5">
                  <i className="fas fa-camera text-[8px]"></i> Momento Real
                </div>
                <h4 className="font-sync font-bold text-white text-sm sm:text-base uppercase tracking-tight">
                  {moment.title}
                </h4>
                <p className="text-gray-300 text-xs font-normal mt-0.5 line-clamp-1">
                  {moment.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

