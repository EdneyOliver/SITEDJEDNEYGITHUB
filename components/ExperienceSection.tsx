import React from 'react';
import { EVENT_TYPES, APP_CONFIG } from '../constants';

export const ExperienceSection: React.FC = () => {
  const handleWhatsApp = () => {
    const message = "Olá DJ Edney! Gostaria de conversar sobre a experiência musical para meu evento.";
    window.open(`https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="experiencia-section" className="py-12 sm:py-16 bg-[#080808] border-t border-white/5 relative overflow-hidden">
      {/* Luz ambiente sutil */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        {/* Tipos de Eventos */}
        <div className="glass p-6 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {EVENT_TYPES.map((ev, i) => (
              <div key={i} className="flex flex-col items-start p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-400 text-base mb-4">
                  <i className={ev.icon}></i>
                </div>
                <div>
                  <h3 className="font-sync font-bold text-white text-sm uppercase tracking-wider mb-2">{ev.name}</h3>
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
