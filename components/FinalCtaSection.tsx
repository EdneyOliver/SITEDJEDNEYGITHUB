import React, { useState } from 'react';
import { APP_CONFIG } from '../constants';

export const FinalCtaSection: React.FC = () => {
  const [showQR, setShowQR] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'copiar' | 'copiado'>('copiar');
  const officialAppUrl = APP_CONFIG.appUrl;

  const handleWhatsAppClick = () => {
    const fbq = (window as any).fbq;
    if (fbq) {
      fbq('track', 'Contact', { content_name: 'WhatsApp CTA Final' });
    }
    const message = "Olá DJ Edney! Gostaria de consultar a disponibilidade e solicitar um orçamento para o meu evento.";
    const whatsappUrl = `https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'DJ Edney | Som & Iluminação',
          text: 'Conheça o trabalho do DJ Edney Oliver. Experiência de som e iluminação para festas e eventos!',
          url: officialAppUrl,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(officialAppUrl);
    setCopyStatus('copiado');
    setTimeout(() => setCopyStatus('copiar'), 2000);
  };

  return (
    <section id="contato-section" className="py-20 sm:py-28 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/15 via-purple-600/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 sm:px-6 relative z-10">
        
        {/* Bloco Principal de Conversão */}
        <div className="p-8 sm:p-14 md:p-16 rounded-3xl border border-blue-500/40 bg-gradient-to-b from-blue-950/30 via-[#0d1017] to-[#070707] text-center shadow-[0_25px_60px_rgba(0,0,0,0.8)] mb-12 ring-1 ring-blue-500/20">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 text-blue-300 text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-blue-500/30">
            <i className="fas fa-paper-plane text-xs"></i> Próximo Passo
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sync font-black text-white uppercase tracking-tight mb-6 leading-tight">
            Vamos fazer sua festa <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              acontecer?
            </span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Conte a data, cidade e tipo do seu evento e vamos encontrar a estrutura ideal para você.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto mb-10">
            <button
              onClick={handleWhatsAppClick}
              className="w-full py-4 sm:py-5 px-6 sm:px-8 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-sans font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 shadow-[0_12px_40px_rgba(37,99,235,0.5)] active:scale-95 cursor-pointer inline-flex items-center justify-center gap-3 text-center"
            >
              <span>Consultar disponibilidade no WhatsApp</span>
              <i className="fab fa-whatsapp text-xl shrink-0"></i>
            </button>
          </div>

          {/* Dados de Contato e Compartilhamento */}
          <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <i className="fab fa-whatsapp text-green-400 text-sm"></i>
              <span className="text-gray-200 font-semibold">{APP_CONFIG.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-envelope text-purple-400 text-sm"></i>
              <span className="text-gray-200 font-semibold">{APP_CONFIG.email}</span>
            </div>
            <button 
              onClick={handleShare}
              className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fas fa-share-nodes text-blue-400 text-sm"></i>
              <span>Compartilhar Portfólio</span>
            </button>
            <button 
              onClick={() => setShowQR(!showQR)}
              className="hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fas fa-qrcode text-gray-300 text-sm"></i>
              <span>{showQR ? 'Ocultar QR' : 'QR Code'}</span>
            </button>
          </div>

          {/* Modal/Box QR Code */}
          {showQR && (
            <div className="mt-8 p-6 bg-white rounded-3xl max-w-xs mx-auto text-center animate-fade-in shadow-2xl">
              <h3 className="text-black font-sync font-bold text-[10px] uppercase mb-3">Escaneie com a Câmera</h3>
              <div className="bg-white p-2 rounded-xl border border-gray-100 mb-3 flex justify-center">
                <img 
                  src={`https://quickchart.io/qr?text=${encodeURIComponent(officialAppUrl)}&size=200&margin=1&ecLevel=M`} 
                  alt="QR Code DJ Edney" 
                  referrerPolicy="no-referrer"
                  className="w-40 h-40"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(officialAppUrl)}`;
                  }}
                />
              </div>
              <button 
                onClick={copyToClipboard}
                className="w-full py-2 bg-gray-100 text-gray-800 text-[10px] font-black uppercase rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                {copyStatus === 'copiar' ? <><i className="fas fa-copy"></i> Copiar Link</> : <><i className="fas fa-check text-green-600"></i> Link Copiado!</>}
              </button>
            </div>
          )}

        </div>

        {/* Links de Redes Sociais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <a 
            href={APP_CONFIG.instagram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass p-4 sm:p-5 rounded-2xl border border-white/5 hover:border-pink-500/40 transition-all duration-300 flex items-center gap-3.5 group min-w-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white text-lg shrink-0 group-hover:scale-110 transition-transform shadow-md">
              <i className="fab fa-instagram"></i>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Instagram</div>
              <div className="font-sans text-xs sm:text-sm font-bold text-white group-hover:text-pink-400 transition-colors truncate">
                @djedneyoliver
              </div>
            </div>
          </a>

          <a 
            href={APP_CONFIG.youtube} 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass p-4 sm:p-5 rounded-2xl border border-white/5 hover:border-red-500/40 transition-all duration-300 flex items-center gap-3.5 group min-w-0"
          >
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white text-lg shrink-0 group-hover:scale-110 transition-transform shadow-md">
              <i className="fab fa-youtube"></i>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">YouTube</div>
              <div className="font-sans text-xs sm:text-sm font-bold text-white group-hover:text-red-400 transition-colors truncate">
                DJ Edney Oliver
              </div>
            </div>
          </a>

          <a 
            href={APP_CONFIG.tiktok} 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass p-4 sm:p-5 rounded-2xl border border-white/5 hover:border-white/40 transition-all duration-300 flex items-center gap-3.5 group min-w-0"
          >
            <div className="w-10 h-10 rounded-xl bg-black border border-white/20 flex items-center justify-center text-white text-lg shrink-0 group-hover:scale-110 transition-transform shadow-md">
              <i className="fab fa-tiktok"></i>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">TikTok</div>
              <div className="font-sans text-xs sm:text-sm font-bold text-white group-hover:text-gray-300 transition-colors truncate">
                @djedneyoliver
              </div>
            </div>
          </a>

          <a 
            href={APP_CONFIG.facebook} 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass p-4 sm:p-5 rounded-2xl border border-white/5 hover:border-blue-500/40 transition-all duration-300 flex items-center gap-3.5 group min-w-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1877F2] flex items-center justify-center text-white text-lg shrink-0 group-hover:scale-110 transition-transform shadow-md">
              <i className="fab fa-facebook-f"></i>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Facebook</div>
              <div className="font-sans text-xs sm:text-sm font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                DJ Edney Oliver
              </div>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
};

