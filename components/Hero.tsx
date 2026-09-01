
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
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-14 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#050505]">
      {/* Imagem de Fundo de Festa Real com Tratamento Atmosférico Cinematográfico */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/images/insta-2.webp" 
          alt="Atmosfera de Festa e Pista de Dança Real com DJ Edney"
          className="w-full h-full object-cover object-center opacity-25 scale-105 filter blur-[2px]"
          loading="eager"
          decoding="async"
        />
        {/* Camadas de Gradientes Escuros e Iluminação Cênica */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/90 to-[#050505]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-gradient-to-tr from-blue-600/20 via-purple-600/15 to-pink-600/10 rounded-full blur-[130px]" />
        <div className="absolute -top-10 right-0 w-72 h-72 bg-blue-500/15 rounded-full blur-[100px]" />
      </div>
      
      <div className="max-w-4xl mx-auto px-5 sm:px-6 w-full relative z-10 text-center flex flex-col items-center">
        
        {/* 1. QUEM É O PROFISSIONAL (Foto Real do DJ + Identificação) */}
        <div className="mb-4 sm:mb-6 flex flex-col items-center">
          <div className="relative group/avatar">
            <div className="w-24 h-24 xs:w-28 xs:h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-2 sm:border-4 border-blue-500/50 p-1 bg-black shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all duration-500 group-hover/avatar:scale-105 group-hover/avatar:border-blue-400">
              <img 
                src="/images/hero-edney.webp" 
                alt="DJ Edney Oliver - DJ Profissional para Casamentos e Eventos em Campinas, Paulínia e Região Metropolitana" 
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                style={{ objectPosition: 'center 20%' }}
                className="w-full h-full object-cover rounded-full transition-all duration-700"
              />
            </div>
            <div className="absolute bottom-0 right-1 sm:bottom-1 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 sm:border-3 border-[#050505] shadow-lg">
              <i className="fas fa-check text-[9px] sm:text-xs text-white"></i>
            </div>
          </div>
        </div>
        
        {/* Identificação & Localização Principal */}
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-4 sm:mb-5 shadow-sm backdrop-blur-md">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500 animate-pulse shrink-0"></span>
          <span>{APP_CONFIG.name}</span>
          <span className="text-gray-500 hidden sm:inline">•</span>
          <span className="text-gray-300 font-medium normal-case tracking-normal text-[11px] sm:text-xs">
            Campinas, Paulínia e Região Metropolitana
          </span>
        </div>

        {/* Título Principal */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-sync font-black mb-3.5 sm:mb-5 leading-[1.2] sm:leading-[1.15] tracking-tight uppercase text-white max-w-3xl">
          O som é o meio. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
            A experiência é o resultado.
          </span>
        </h1>

        {/* Texto Complementar */}
        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed font-normal">
          Som, iluminação e curadoria musical para transformar seu evento em uma experiência.
        </p>

        {/* Botão Principal de Conversão */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-sans font-bold text-sm sm:text-base uppercase tracking-wider hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_10px_35px_-5px_rgba(37,99,235,0.6)] active:scale-95 cursor-pointer"
          >
            <span>Consultar minha data</span>
            <i className="fab fa-whatsapp text-lg sm:text-xl"></i>
          </button>
        </div>

        {/* Selos de Confiança Sutil */}
        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-10 text-[11px] sm:text-xs text-gray-400 font-medium">
          <div className="flex items-center gap-2">
            <i className="fas fa-calendar-check text-blue-400"></i>
            <span>Agenda 2026/2027</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-sliders text-purple-400"></i>
            <span>Repertório Personalizado</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-shield-alt text-emerald-400"></i>
            <span>Contrato & Segurança</span>
          </div>
        </div>

      </div>
    </section>
  );
};


