
import React from 'react';
import { DJ_PACKAGES, DJ_ADDONS, APP_CONFIG } from '../constants';

export const PackagesSection: React.FC = () => {
  const handleQuoteRequest = (packageName: string, price?: string) => {
    // Rastreamento do Pixel
    const fbq = (window as any).fbq;
    if (fbq) {
      fbq('track', 'Lead', { 
        content_name: packageName,
        content_category: 'Pacotes DJ',
        value: price ? parseFloat(price.replace(/\D/g, '')) : 0,
        currency: 'BRL'
      });
    }

    const priceText = price ? ` (${price})` : '';
    const message = `Olá DJ Edney! Vi seu site e gostaria de solicitar um orçamento para o ${packageName}${priceText}. Poderia me ajudar?`;
    const whatsappUrl = `https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-blue-500/20">
            Nossos Serviços
          </div>
          <h2 className="text-4xl md:text-6xl font-sync font-black text-white uppercase tracking-tighter mb-4">
            Escolha seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Pacote</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm uppercase tracking-widest font-light">
            Experiências personalizadas para cada tipo de celebração.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {DJ_PACKAGES.map((pkg) => (
            <div 
              key={pkg.id}
              className={`relative glass rounded-[2.5rem] border transition-all duration-500 flex flex-col h-full group overflow-hidden
                ${pkg.highlight ? 'border-blue-500/40 bg-blue-500/5 shadow-[0_30px_60px_-15px_rgba(59,130,246,0.2)] scale-105 z-10' : 'border-white/5 hover:border-white/20'}
              `}
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={(pkg as any).imageUrl} 
                  alt={pkg.name}
                  className={`w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ${(pkg as any).imagePosition || 'object-center'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
                {pkg.highlight && (
                  <div className="absolute top-4 right-4 px-4 py-1 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg z-20">
                    Mais Escolhido
                  </div>
                )}
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <div className="mb-8">
                  <h3 className="text-2xl font-sync font-bold text-white mb-4 uppercase tracking-tighter">{pkg.name}</h3>
                  <p className="text-gray-400 text-[11px] leading-relaxed uppercase tracking-wider">{pkg.description}</p>
                </div>

                <div className="flex-grow space-y-4 mb-10">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <i className="fas fa-check-circle text-blue-500 mt-1 text-sm"></i>
                      <span className="text-gray-300 text-[11px] font-medium leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center mb-6">
                  <div className="text-blue-500 font-sync font-black text-3xl">{(pkg as any).price}</div>
                  <div className="text-gray-500 text-[8px] uppercase tracking-widest mt-1">Investimento</div>
                </div>

                <button 
                  onClick={() => handleQuoteRequest(pkg.name, (pkg as any).price)}
                  className="w-full py-5 rounded-2xl bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_10px_30px_-5px_rgba(37,99,235,0.4)] active:scale-95 flex items-center justify-center gap-3"
                >
                  Solicitar <i className="fab fa-whatsapp text-lg"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Nota informativa solicitada */}
        <div className="text-center mb-20">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] max-w-2xl mx-auto flex items-center justify-center gap-3">
            <i className="fas fa-info-circle text-blue-500"></i>
            Os valores variam de acordo com data, local e perfil do evento. Entre em contato para uma proposta personalizada.
          </p>
        </div>

        <div className="pt-16 border-t border-white/5">
          <div className="text-center mb-12">
            <h3 className="text-xl font-sync font-bold text-white mb-2 uppercase tracking-widest">
              Serviços <span className="text-blue-500">Adicionais</span>
            </h3>
            <p className="text-gray-500 text-[9px] uppercase tracking-[0.3em]">Complemente seu evento com tecnologia</p>
          </div>

          {/* Pista Paris em Destaque e Centralizada */}
          {DJ_ADDONS.filter(a => a.name === "Pista Paris").map((addon, i) => (
            <div key={i} className="max-w-lg mx-auto mb-10">
              <div 
                onClick={() => handleQuoteRequest(`Adicional: ${addon.name}`)}
                className="glass p-6 rounded-2xl border border-blue-500/30 bg-blue-500/5 flex flex-col md:flex-row items-center gap-6 group hover:border-blue-500/50 transition-all cursor-pointer hover:-translate-y-1"
              >
                <div className="w-24 h-24 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all overflow-hidden shadow-lg border border-white/10 shrink-0">
                  {(addon as any).imageUrl ? (
                    <img src={(addon as any).imageUrl} alt={addon.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                  ) : (
                    <i className={addon.icon}></i>
                  )}
                </div>
                <div className="flex-grow text-center md:text-left">
                  <div className="inline-block px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[7px] font-black uppercase tracking-widest mb-2 border border-blue-500/30">
                    Destaque Luxo
                  </div>
                  <h4 className="font-sync font-bold text-white text-base md:text-lg uppercase mb-1 tracking-tighter">{addon.name}</h4>
                  <p className="text-gray-300 text-[9px] leading-relaxed uppercase tracking-wider mb-4">{addon.description}</p>
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 text-white font-black text-[8px] uppercase tracking-widest hover:bg-green-500 transition-all shadow-md">
                    Solicitar <i className="fab fa-whatsapp text-sm"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Outros Serviços Adicionais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {DJ_ADDONS.filter(a => a.name !== "Pista Paris").map((addon, i) => (
              <div 
                key={i} 
                onClick={() => handleQuoteRequest(`Adicional: ${addon.name}`)}
                className="glass p-8 rounded-3xl border border-white/5 flex items-center gap-6 group hover:border-blue-500/30 transition-all cursor-pointer hover:-translate-y-1"
              >
                <div className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all overflow-hidden border border-white/5">
                  {(addon as any).imageUrl ? (
                    <img src={(addon as any).imageUrl} alt={addon.name} className="w-full h-full object-cover" />
                  ) : (
                    <i className={addon.icon}></i>
                  )}
                </div>
                <div className="flex-grow">
                  <h4 className="font-sync font-bold text-white text-xs uppercase mb-2">{addon.name}</h4>
                  <p className="text-gray-400 text-[10px] leading-relaxed uppercase tracking-wider">{addon.description}</p>
                </div>
                <div className="p-3 rounded-xl bg-green-500/10 text-green-500 opacity-60 group-hover:opacity-100 transition-opacity">
                  <i className="fab fa-whatsapp text-xl"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
