import React from 'react';
import { DJ_PACKAGES, ALL_PACKAGES_INCLUDE, APP_CONFIG } from '../constants';

export const PackagesSection: React.FC = () => {
  const handleSelectPackage = (pkgName: string, price: string) => {
    const fbq = (window as any).fbq;
    if (fbq) {
      fbq('track', 'Contact', { content_name: `WhatsApp Pacote - ${pkgName}` });
    }
    const message = `Olá DJ Edney! Gostaria de consultar a disponibilidade e solicitar um orçamento para o *Pacote ${pkgName}* (${price}).`;
    const whatsappUrl = `https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCustomPackage = () => {
    const fbq = (window as any).fbq;
    if (fbq) {
      fbq('track', 'Contact', { content_name: 'WhatsApp Pacote Personalizado' });
    }
    const message = "Olá DJ Edney! Gostaria de montar um pacote personalizado de som e iluminação para o meu evento.";
    const whatsappUrl = `https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="pacotes-section" className="py-20 sm:py-28 bg-[#070707] border-t border-white/5 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        
        {/* Cabeçalho da Seção de Pacotes */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-blue-500/20">
            Estrutura & Investimento
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sync font-black text-white uppercase tracking-tight mb-4">
            Escolha o formato ideal para a sua pista
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
            Estruturas completas planejadas para atender do evento intimista à grande celebração.
          </p>
        </div>

        {/* 1. SEÇÃO: TODOS OS PACOTES INCLUEM */}
        <div className="glass p-6 sm:p-8 rounded-3xl border border-blue-500/20 bg-blue-500/[0.03] mb-12 sm:mb-16 shadow-[0_10px_35px_rgba(0,0,0,0.3)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left max-w-sm">
              <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-sync font-bold uppercase tracking-widest mb-1">
                <i className="fas fa-shield-check"></i> Padrão de Qualidade
              </div>
              <h3 className="text-xl sm:text-2xl font-sync font-bold text-white uppercase tracking-tight">
                Todos os pacotes incluem
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full md:max-w-3xl">
              {ALL_PACKAGES_INCLUDE.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] shrink-0">
                    <i className="fas fa-check"></i>
                  </div>
                  <span className="text-gray-200 text-xs sm:text-[13px] font-medium leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. CARDS DOS PACOTES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-16">
          {DJ_PACKAGES.map((pkg) => {
            const isImpacto = pkg.id === 'impacto';
            const isExperiencia = pkg.id === 'experiencia';

            return (
              <div 
                key={pkg.id} 
                className={`
                  rounded-3xl flex flex-col justify-between transition-all duration-500 relative overflow-hidden group
                  ${isImpacto 
                    ? 'border-2 border-indigo-500/70 bg-gradient-to-b from-indigo-950/30 via-[#0e121e] to-[#070707] shadow-[0_20px_50px_rgba(99,102,241,0.25)] md:-translate-y-3 z-10 ring-1 ring-indigo-500/30' 
                    : isExperiencia
                    ? 'border border-blue-500/40 bg-gradient-to-b from-blue-950/20 via-[#0d1017] to-[#070707] shadow-lg'
                    : 'border border-white/10 bg-[#0d0d0d] hover:border-white/20 shadow-md'}
                `}
              >
                {/* Imagem do Setup */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black/60 border-b border-white/5">
                  <img 
                    src={pkg.imageUrl} 
                    alt={`Estrutura e Sonorização do ${pkg.name} - DJ Edney em Campinas e região`}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: pkg.imagePosition || 'center center' }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      if (pkg.fallbackUrl && (e.target as HTMLImageElement).src !== pkg.fallbackUrl) {
                        (e.target as HTMLImageElement).src = pkg.fallbackUrl;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-80" />
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-sync font-bold text-white mb-2 uppercase tracking-tight flex items-center justify-between">
                      <span>{pkg.name}</span>
                    </h3>
                    
                    <p className={`text-xs font-semibold mb-4 leading-snug ${isImpacto ? 'text-indigo-300' : 'text-blue-400'}`}>
                      {pkg.subtitle}
                    </p>

                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                      {pkg.description}
                    </p>

                    {/* Diferenciais exclusivos deste pacote */}
                    <div className="space-y-3 mb-8 pt-4 border-t border-white/5">
                      <div className="text-[10px] font-sync font-bold text-gray-500 uppercase tracking-wider">
                        Estrutura específica:
                      </div>
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <i className={`fas fa-check-circle text-xs mt-0.5 shrink-0 ${isImpacto ? 'text-indigo-400' : isExperiencia ? 'text-blue-400' : 'text-purple-400'}`}></i>
                          <span className="text-gray-200 text-xs leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Preço e Botão */}
                  <div className="pt-5 border-t border-white/5">
                    <div className="mb-4">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1">Investimento</span>
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className={`text-2xl sm:text-3xl font-sync font-black whitespace-nowrap tracking-tight ${isImpacto ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300' : 'text-white'}`}>
                          {pkg.price}
                        </span>
                        <span className="text-xs text-gray-400 whitespace-nowrap">/ evento</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectPackage(pkg.name, pkg.price)}
                      className={`w-full py-3.5 px-4 rounded-xl font-sans font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        isImpacto
                          ? 'bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-[0_10px_30px_rgba(99,102,241,0.45)] active:scale-95'
                          : isExperiencia
                          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_10px_25px_rgba(59,130,246,0.35)] active:scale-95'
                          : 'bg-white/5 hover:bg-blue-600 hover:text-white text-gray-200 border border-white/10 active:scale-95'
                      }`}
                    >
                      <span>Solicitar {pkg.name}</span>
                      <i className="fab fa-whatsapp text-sm shrink-0"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. SEÇÃO: PERSONALIZAÇÃO DOS PACOTES ("Seu evento, do seu jeito") */}
        <div className="glass p-8 sm:p-12 rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-[#0a0a0f] to-blue-950/30 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 text-[10px] font-black uppercase tracking-widest mb-3 border border-purple-500/30">
              <i className="fas fa-sliders"></i> Flexibilidade Total
            </div>
            <h3 className="text-2xl sm:text-3xl font-sync font-bold text-white uppercase tracking-tight mb-3">
              Seu evento, do seu jeito.
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
              Os pacotes apresentados são sugestões de estrutura para facilitar sua escolha. Cada evento é único e podemos personalizar equipamentos, iluminação e serviços de acordo com o espaço, número de convidados e proposta da sua festa.
            </p>
          </div>

          <button
            onClick={handleCustomPackage}
            className="shrink-0 px-8 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-sans font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_10px_30px_rgba(168,85,247,0.4)] active:scale-95 cursor-pointer inline-flex items-center gap-3"
          >
            <span>Montar meu pacote</span>
            <i className="fab fa-whatsapp text-base"></i>
          </button>
        </div>

      </div>
    </section>
  );
};

