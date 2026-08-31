
import React from 'react';
import { APP_CONFIG } from '../constants';

export const Hero: React.FC = () => {
  const handleWhatsAppClick = () => {
    const fbq = (window as any).fbq;
    if (fbq) {
      fbq('track', 'Contact', { content_name: 'WhatsApp Hero - Consultar Data' });
    }
    const message = "Olá DJ Edney! Gostaria de consultar a disponibilidade para o meu evento.";
    const whatsappUrl = `https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#050505]">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-blue-600/15 via-purple-600/15 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-10 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-[90px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-5 sm:px-6 w-full relative z-10 text-center flex flex-col items-center">
        
        {/* Foto de Apresentação Real */}
        <div className="mb-6 md:mb-8 flex flex-col items-center">
          <div className="relative group/avatar">
            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 sm:border-4 border-blue-500/40 p-1 bg-black shadow-[0_0_40px_rgba(59,130,246,0.35)] transition-all duration-500 group-hover/avatar:scale-105 group-hover/avatar:border-blue-400">
              <img 
                src="/images/hero-edney.webp" 
                alt={`DJ Edney - Profissional para Eventos`} 
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                style={{ objectPosition: 'center 20%' }}
                className="w-full h-full object-cover rounded-full transition-all duration-700"
              />
            </div>
            <div className="absolute bottom-1 right-2 sm:bottom-1 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 sm:border-3 border-[#050505] shadow-lg">
              <i className="fas fa-check text-[9px] sm:text-xs text-white"></i>
            </div>
          </div>
        </div>
        
        {/* Identificação */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] mb-4 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          {APP_CONFIG.name}
        </div>

        {/* Título Principal */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-sync font-black mb-4 sm:mb-6 leading-[1.2] sm:leading-[1.15] tracking-tight uppercase text-white max-w-3xl">
          O som é o meio. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500">
            A experiência é o resultado.
          </span>
        </h1>

        {/* Texto Complementar Solicitado */}
        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal">
          Som, iluminação e curadoria musical para transformar seu evento em uma experiência.
        </p>

        {/* Botão Principal de Conversão */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-sans font-bold text-sm sm:text-base uppercase tracking-wider hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-[0_10px_35px_-5px_rgba(37,99,235,0.5)] active:scale-95 cursor-pointer"
          >
            <span>Consultar minha data</span>
            <i className="fab fa-whatsapp text-lg sm:text-xl"></i>
          </button>
        </div>

      </div>
    </section>
  );
};

