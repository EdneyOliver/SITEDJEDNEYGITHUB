import React from 'react';
import { EVENT_TYPES, APP_CONFIG } from '../constants';
import { trackWhatsAppLead } from '../utils/analytics';

export const ExperienceSection: React.FC = () => {
  const handleWhatsApp = () => {
    trackWhatsAppLead('experience_special_project');
    const message = "Olá DJ Edney! Gostaria de conversar sobre a experiência musical para meu evento.";
    window.open(`https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="experiencia-section" className="py-14 sm:py-20 bg-[#080808] border-t border-white/5 relative overflow-hidden">
      {/* Luz ambiente sutil */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        
        {/* Tipos de Eventos */}
        <div className="glass p-6 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
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

      </div>
    </section>
  );
};

