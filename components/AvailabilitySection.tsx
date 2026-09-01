import React from 'react';
import { APP_CONFIG } from '../constants';
import { trackWhatsAppLead } from '../utils/analytics';

export const AvailabilitySection: React.FC = () => {
  const handleWhatsAppClick = () => {
    trackWhatsAppLead('availability');
    const fbq = (window as any).fbq;
    if (fbq) {
      fbq('track', 'Contact', { content_name: 'WhatsApp Disponibilidade' });
    }
    const message = "Olá DJ Edney! Gostaria de consultar se a data do meu evento está disponível na sua agenda.";
    const whatsappUrl = `https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="disponibilidade-section" className="py-20 sm:py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-5 sm:px-6 relative z-10 text-center">
        
        <div className="glass p-8 sm:p-14 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-950/20 via-[#0a0a0a] to-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-blue-500/20">
            <i className="fas fa-calendar-check text-xs"></i> Agenda & Prazos
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sync font-black text-white uppercase tracking-tight mb-4">
            Sua data está <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">disponível?</span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-8 font-normal">
            Consulte agora e receba uma resposta diretamente pelo WhatsApp.
          </p>

          <div className="flex items-center justify-center">
            <button
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-sans font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 shadow-[0_10px_35px_rgba(37,99,235,0.4)] active:scale-95 cursor-pointer inline-flex items-center justify-center gap-3"
            >
              <span>Consultar minha data</span>
              <i className="fab fa-whatsapp text-lg sm:text-xl"></i>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
