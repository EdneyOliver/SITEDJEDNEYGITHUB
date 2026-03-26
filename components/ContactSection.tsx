
import React, { useState } from 'react';
import { APP_CONFIG } from '../constants';

export const ContactSection: React.FC = () => {
  const [showQR, setShowQR] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'copiar' | 'copiado'>('copiar');
  
  // URL oficial sem WWW para garantir funcionamento imediato
  const officialAppUrl = "https://djedney.com.br";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'DJ Edney | Portfólio Digital',
          text: 'Conheça o trabalho do DJ Edney Oliver. Música e experiência para seu evento!',
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
    <section className="py-24 bg-[#0d0d0d] border-y border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="glass rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-md">
            <h2 className="text-4xl font-sync font-bold mb-6 neon-text">Sua festa <br />começa aqui.</h2>
            <p className="text-gray-400 mb-8">
              Atendimento exclusivo para Casamentos, Debutantes, Confraternizações Corporativas e projetos para Bares e Academias. Vamos conversar sobre o seu projeto!
            </p>
            
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                  <i className="fas fa-envelope text-purple-400 group-hover:text-white"></i>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-bold">E-mail</div>
                  <div className="font-semibold">{APP_CONFIG.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors">
                  <i className="fab fa-whatsapp text-green-400 group-hover:text-white"></i>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-bold">WhatsApp</div>
                  <div className="font-semibold">{APP_CONFIG.phone}</div>
                </div>
              </div>
            </div>

            {/* Botões de Ação de Compartilhamento */}
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleShare}
                className="px-6 py-3 bg-blue-600/10 border border-blue-500/30 text-blue-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2"
              >
                <i className="fas fa-share-nodes"></i> Enviar para Alguém
              </button>
              <button 
                onClick={() => setShowQR(!showQR)}
                className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <i className="fas fa-qrcode"></i> {showQR ? 'Ocultar QR' : 'Mostrar QR Code'}
              </button>
            </div>
          </div>

          <div className="w-full max-w-sm relative">
            {showQR ? (
              <div className="bg-white p-6 rounded-3xl text-center animate-fade-in flex flex-col items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <h3 className="text-black font-sync font-bold text-[10px] uppercase mb-4 tracking-tighter">Escaneie o Portfólio</h3>
                
                {/* QR Code gerado com o link djedney.com.br */}
                <div className="bg-white p-2 rounded-xl mb-4 border border-gray-100">
                  <img 
                    src={`https://quickchart.io/qr?text=${encodeURIComponent(officialAppUrl)}&size=200&margin=1&ecLevel=M`} 
                    alt="QR Code DJ Edney" 
                    className="w-44 h-44"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(officialAppUrl)}`;
                    }}
                  />
                </div>
                
                <p className="text-gray-500 text-[8px] uppercase font-bold tracking-widest mb-4">Aponte a câmera do celular</p>
                
                <div className="flex flex-col gap-2 w-full">
                  <button 
                    onClick={copyToClipboard}
                    className="w-full py-2 bg-gray-100 text-gray-800 text-[9px] font-black uppercase rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                  >
                    {copyStatus === 'copiar' ? (
                      <><i className="fas fa-copy"></i> Copiar Link</>
                    ) : (
                      <><i className="fas fa-check text-green-600"></i> Link Copiado!</>
                    )}
                  </button>
                  <button 
                    onClick={() => setShowQR(false)}
                    className="w-full py-2 text-red-500 text-[9px] font-black uppercase"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 p-8 rounded-2xl border border-white/10 text-center">
                <i className="fab fa-instagram text-5xl mb-6 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text"></i>
                <h3 className="text-xl font-bold mb-4">Siga nas redes</h3>
                <p className="text-sm text-gray-400 mb-8">Confira os bastidores das festas, depoimentos de clientes e as novidades no dia a dia.</p>
                <a 
                  href={APP_CONFIG.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
                >
                  @djedneyoliver
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
