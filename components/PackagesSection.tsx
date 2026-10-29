import React from 'react';
import { DJ_PACKAGES, ALL_PACKAGES_INCLUDE, APP_CONFIG } from '../constants';
import { trackPackageSelection, trackCustomPackage } from '../utils/analytics';

export const PackagesSection: React.FC = () => {
  const handleSelectPackage = (pkgName: string, pkgId: string, customMsg?: string) => {
    const buttonLocation = `format_${pkgId}`;
    trackPackageSelection(pkgName, 'sob_consulta', buttonLocation);
    const fbq = (window as any).fbq;
    if (fbq) {
      fbq('track', 'Contact', { content_name: `WhatsApp Proposta - ${pkgName}` });
    }
    const message = customMsg || `Olá DJ Edney! Gostaria de solicitar uma proposta para ${pkgName}.`;
    const whatsappUrl = `https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCustomPackage = () => {
    trackCustomPackage('custom_package');
    const fbq = (window as any).fbq;
    if (fbq) {
      fbq('track', 'Contact', { content_name: 'WhatsApp Proposta Personalizada' });
    }
    const message = "Olá DJ Edney! Gostaria de montar uma proposta personalizada de som e iluminação para o meu evento.";
    const whatsappUrl = `https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="pacotes-section" className="py-16 sm:py-24 bg-[#070707] border-t border-white/5 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        
        {/* Cabeçalho da Seção de Formatos */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3.5 border border-blue-500/20">
            Formatos & Atuação
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-sync font-black text-white uppercase tracking-tight mb-3.5 leading-tight">
            Escolha o formato ideal para a sua festa
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
            Estruturas completas e planejadas para atender cada perfil e porte de comemoração.
          </p>
        </div>

        {/* 1. SEÇÃO: TODOS OS PACOTES INCLUEM */}
        <div className="glass p-5 sm:p-7 md:p-8 rounded-3xl border border-blue-500/20 bg-blue-500/[0.03] mb-10 sm:mb-14 shadow-[0_10px_35px_rgba(0,0,0,0.3)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
            <div className="text-center md:text-left max-w-sm">
              <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-sync font-bold uppercase tracking-widest mb-1">
                <i className="fas fa-shield-check"></i> Padrão de Qualidade
              </div>
              <h3 className="text-lg sm:text-2xl font-sync font-bold text-white uppercase tracking-tight">
                Todos os formatos incluem
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 w-full md:max-w-3xl">
              {ALL_PACKAGES_INCLUDE.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] shrink-0">
                    <i className="fas fa-check"></i>
                  </div>
                  <span className="text-gray-200 text-xs sm:text-[13px] font-medium leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. CARDS DOS FORMATOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch mb-12 sm:mb-16">
          {DJ_PACKAGES.map((pkg) => {
            const isCasamentos = pkg.id === 'casamentos';
            const isFestas = pkg.id === 'eventos-festas';
            const badge = (pkg as any).badge;

            return (
              <div 
                key={pkg.id} 
                className={`
                  rounded-3xl flex flex-col justify-between transition-all duration-500 relative overflow-hidden group
                  ${isCasamentos
                    ? 'border-2 border-blue-500/60 bg-gradient-to-b from-blue-950/30 via-[#0d121c] to-[#070707] shadow-[0_15px_40px_rgba(59,130,246,0.2)] ring-1 ring-blue-500/20'
                    : isFestas 
                    ? 'border border-purple-500/40 bg-gradient-to-b from-purple-950/20 via-[#0e1018] to-[#070707] shadow-lg'
                    : 'border border-white/10 bg-[#0d0d0d] hover:border-white/20 shadow-md'}
                `}
              >
                {/* Imagem do Setup */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black/60 border-b border-white/5">
                  <img 
                    src={pkg.imageUrl} 
                    alt={`Estrutura e Sonorização - ${pkg.name} - DJ Edney`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    style={{ objectPosition: pkg.imagePosition || 'center center' }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      if (pkg.fallbackUrl && (e.target as HTMLImageElement).src !== pkg.fallbackUrl) {
                        (e.target as HTMLImageElement).src = pkg.fallbackUrl;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 via-transparent to-transparent opacity-80" />

                  {/* Selo / Destaque Elegante Centralizado e Discreto */}
                  {badge && (
                    <div className="absolute top-2.5 sm:top-3 inset-x-0 flex justify-center z-20 pointer-events-none">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-sync font-bold uppercase tracking-wider backdrop-blur-md shadow-sm border bg-blue-500/25 text-blue-200 border-blue-400/40 shadow-[0_2px_10px_rgba(59,130,246,0.25)]">
                        <i className="fas fa-star text-[8px] text-blue-300"></i>
                        {badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Conteúdo do Card */}
                <div className="p-5 sm:p-7 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Subtítulo */}
                    <h3 className="text-xl sm:text-2xl font-sync font-bold text-white mb-3 tracking-tight leading-snug">
                      {pkg.subtitle}
                    </h3>

                    {/* Parágrafo 1: Tipos de eventos */}
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                      {pkg.description}
                    </p>

                    {/* Parágrafo 2: Sonorização e montagem */}
                    <div className="pt-3.5 pb-2 border-t border-white/5 flex items-start gap-2.5 mb-6">
                      <i className={`fas fa-check-circle text-xs mt-1 shrink-0 ${isCasamentos ? 'text-blue-400' : isFestas ? 'text-purple-400' : 'text-blue-400/80'}`}></i>
                      <p className="text-gray-300 text-xs sm:text-[13px] leading-relaxed">
                        {pkg.detail}
                      </p>
                    </div>
                  </div>

                  {/* Botão de Solicitar Proposta (Sem valores) */}
                  <div className="pt-4 border-t border-white/5 mt-auto">
                    <button
                      onClick={() => handleSelectPackage(pkg.name, pkg.id, pkg.whatsappMessage)}
                      className={`w-full py-3.5 px-4 rounded-xl font-sans font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        isCasamentos
                          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_10px_25px_rgba(59,130,246,0.35)] active:scale-95'
                          : isFestas
                          ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-[0_10px_30px_rgba(168,85,247,0.35)] active:scale-95'
                          : 'bg-white/5 hover:bg-blue-600 hover:text-white text-gray-200 border border-white/10 active:scale-95'
                      }`}
                    >
                      <span>Solicitar uma proposta</span>
                      <span className="text-base font-bold leading-none">↗</span>
                      <i className="fab fa-whatsapp text-sm ml-1 text-emerald-400 group-hover:text-white"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Observação discreta abaixo dos formatos */}
        <div className="text-center max-w-3xl mx-auto -mt-6 sm:-mt-8 mb-12 sm:mb-16 px-4">
          <p className="text-xs sm:text-[13px] text-gray-400 font-normal leading-relaxed flex items-center justify-center gap-2">
            <i className="fas fa-circle-info text-blue-400/80 text-xs shrink-0"></i>
            <span>
              A sonorização, iluminação e estrutura são adaptadas conforme o local, número de convidados e cronograma do evento.
            </span>
          </p>
        </div>

        {/* 3. SEÇÃO: PERSONALIZAÇÃO ("Seu evento, do seu jeito") */}
        <div className="glass p-6 sm:p-10 md:p-12 rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-[#0a0a0f] to-blue-950/30 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 text-[10px] font-black uppercase tracking-widest mb-3 border border-purple-500/30">
              <i className="fas fa-sliders"></i> Flexibilidade Total
            </div>
            <h3 className="text-2xl sm:text-3xl font-sync font-bold text-white uppercase tracking-tight mb-2.5">
              Seu evento, do seu jeito.
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
              Os formatos apresentados são referências para guiar sua escolha. Cada evento é único e podemos personalizar equipamentos, iluminação e repertório de acordo com o espaço, número de convidados e proposta da sua festa.
            </p>
          </div>

          <button
            onClick={handleCustomPackage}
            className="shrink-0 w-full sm:w-auto px-8 py-4 sm:py-4.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-sans font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_10px_30px_rgba(168,85,247,0.4)] active:scale-95 cursor-pointer inline-flex items-center justify-center gap-3"
          >
            <span>Montar proposta personalizada</span>
            <i className="fab fa-whatsapp text-base"></i>
          </button>
        </div>

      </div>
    </section>
  );
};
