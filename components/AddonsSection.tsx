import React from 'react';
import { DJ_ADDONS, APP_CONFIG } from '../constants';

export const AddonsSection: React.FC = () => {
  const handleRequestAddon = (name: string) => {
    const fbq = (window as any).fbq;
    if (fbq) {
      fbq('track', 'Contact', { content_name: `WhatsApp Adicional - ${name}` });
    }
    const message = `Olá DJ Edney! Gostaria de informações e valores sobre o adicional *${name}* para o meu evento.`;
    window.open(`https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="adicionais-section" className="py-20 sm:py-28 bg-[#080808] border-t border-white/5 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-blue-500/20">
            Upgrades & Experiência
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sync font-black text-white uppercase tracking-tight mb-4">
            Adicionais & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Upgrades</span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
            Elementos extras para elevar ainda mais a sofisticação e a emoção do seu evento.
          </p>
        </div>

        {/* Grid de Adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6 sm:gap-8">
          {DJ_ADDONS.map((addon, index) => (
            <div 
              key={index}
              className="glass rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between group hover:border-blue-500/40 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-[16/11] overflow-hidden bg-black/50">
                  <img 
                    src={addon.imageUrl} 
                    alt={`Adicional ${addon.name} para Casamentos e Eventos - DJ Edney em Campinas`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      if (addon.fallbackUrl && (e.target as HTMLImageElement).src !== addon.fallbackUrl) {
                        (e.target as HTMLImageElement).src = addon.fallbackUrl;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-blue-400 text-[10px] font-sync font-bold uppercase tracking-wider">
                    {addon.badge}
                  </span>
                </div>

                <div className="p-6 sm:p-7">
                  <h3 className="text-xl font-sync font-bold text-white uppercase tracking-tight mb-3 flex items-center gap-2">
                    <i className={`${addon.icon} text-blue-400 text-base`}></i>
                    <span>{addon.name}</span>
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    {addon.description}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0">
                <button
                  onClick={() => handleRequestAddon(addon.name)}
                  className="w-full py-3.5 px-4 rounded-xl bg-white/5 hover:bg-blue-600 hover:text-white border border-white/10 text-gray-200 font-sans font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Solicitar adicional</span>
                  <i className="fab fa-whatsapp text-sm"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
