
import React from 'react';
import { APP_CONFIG } from '../constants';

export const Hero: React.FC = () => {
  const handleWhatsAppClick = () => {
    // Rastreamento do Pixel
    const fbq = (window as any).fbq;
    if (fbq) {
      fbq('track', 'Contact', { content_name: 'WhatsApp Hero' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#050505]">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-5xl mx-auto px-6 w-full relative z-10 text-center flex flex-col items-center">
        
        {/* Foto de Apresentação Circular */}
        <div className="mb-8 flex flex-col items-center gap-4">
          <div className="relative group/avatar">
            <div className="w-28 h-28 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-blue-500/40 p-1.5 bg-black shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-500 group-hover/avatar:scale-105 group-hover/avatar:border-blue-400">
              <img 
                src="https://images.unsplash.com/photo-1768919533164-1695daa801e8?q=100&w=800&auto=format&fit=crop" 
                alt={`Foto de Perfil ${APP_CONFIG.name}`} 
                style={{ objectPosition: 'center 20%' }}
                className="w-full h-full object-cover rounded-full transition-all duration-700 hd-img"
              />
            </div>
            <div className="absolute bottom-1 right-3 w-7 h-7 md:w-9 md:h-9 bg-blue-600 rounded-full flex items-center justify-center border-4 border-[#050505] shadow-xl">
              <i className="fas fa-check text-[10px] md:text-xs text-white"></i>
            </div>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-9xl font-sync font-black mb-4 leading-[1.1] tracking-tighter uppercase italic text-white">
          {APP_CONFIG.name}
        </h1>

        {/* Subtítulo com fonte levemente reduzida */}
        <h2 className="text-lg md:text-2xl font-sync font-bold text-blue-500 uppercase tracking-widest mb-10">
          DJ profissional para eventos
        </h2>
        
        <div className="space-y-6 max-w-3xl">
          <div className="flex flex-col gap-4 text-gray-300 text-sm md:text-xl leading-relaxed font-normal">
            <p>
              Trabalho com casamentos, aniversários, eventos corporativos e festas em geral. 
              Sempre com playlists personalizadas, pensadas para garantir o clima adequado em cada momento do evento.
            </p>
          </div>

          <div className="py-8 border-y border-white/5 my-10">
             <p className="text-xl md:text-3xl font-sync font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 uppercase tracking-tighter">
               "O som é o meio. <br className="md:hidden" /> A experiência é o resultado."
             </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-10">
          <button 
            onClick={() => {
              const el = document.getElementById('servicos');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-7 py-3 bg-white text-black font-black uppercase text-[9px] tracking-widest rounded-full hover:bg-gray-200 transition-all shadow-[0_10px_20px_rgba(255,255,255,0.05)] active:scale-95"
          >
            Serviços
          </button>
          
          <button 
            onClick={() => {
              const el = document.getElementById('agenda-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-7 py-3 bg-purple-600/20 border border-purple-500/30 text-purple-400 font-black uppercase text-[9px] tracking-widest rounded-full hover:bg-purple-600 hover:text-white transition-all shadow-[0_10px_20px_rgba(124,58,237,0.1)] active:scale-95"
          >
            Ver Agenda
          </button>

          <a 
            href={`https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}`}
            target="_blank"
            onClick={handleWhatsAppClick}
            className="px-7 py-3 bg-green-600/10 border border-green-500/30 text-white font-black uppercase text-[9px] tracking-widest rounded-full hover:bg-green-600 transition-all flex items-center gap-2 active:scale-95 animate-pulse-green relative overflow-hidden group/btn"
          >
            <span className="relative z-10 flex items-center gap-2">
              Orçamento <i className="fab fa-whatsapp text-base text-green-500 group-hover/btn:text-white transition-colors"></i>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] transition-all"></div>
          </a>
        </div>
      </div>
    </section>
  );
};
