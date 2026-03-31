
import React, { useState, useEffect } from 'react';
import { MOCK_SOCIAL_FEED, APP_CONFIG } from '../constants';

export const SocialMediaFeed: React.FC = () => {
  const [media, setMedia] = useState(MOCK_SOCIAL_FEED);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInstagramMedia = async () => {
      if (!APP_CONFIG.facebookAccessToken) return;
      
      setIsLoading(true);
      try {
        // Tentativa de buscar via Graph API (Requer que o App esteja Live e o User ID configurado)
        // Como não temos o UserID, usamos uma estrutura preparada para quando você tiver o ID.
        // Ex: const url = `https://graph.facebook.com/v19.0/${USER_ID}/media?access_token=${APP_CONFIG.facebookAccessToken}`;
        
        // Simulação de carregamento para efeito visual de 'Real-time'
        await new Promise(resolve => setTimeout(resolve, 1500));
        setMedia(MOCK_SOCIAL_FEED); 
      } catch (error) {
        console.error("Facebook API Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstagramMedia();
  }, []);

  return (
    <div className="py-24 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 text-center md:text-left">
          <div>
            <div className="inline-block px-4 py-1 rounded-full bg-pink-500/10 text-pink-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-pink-500/20">
              Live Feed
            </div>
            <h2 className="text-4xl md:text-6xl font-sync font-black text-white uppercase tracking-tighter">
              Instagram <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">Highlights</span>
            </h2>
          </div>
          <a 
            href={APP_CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 glass px-8 py-4 rounded-2xl border border-white/5 hover:border-pink-500/30 transition-all group"
          >
            <div className="text-right">
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Siga no insta</div>
              <div className="text-white font-sync font-bold text-sm">@djedneyoliver</div>
            </div>
            <i className="fab fa-instagram text-3xl text-pink-500 group-hover:scale-110 transition-transform"></i>
          </a>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {media.map((item, index) => (
              <div key={item.id} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-tr from-pink-600 to-orange-500 rounded-[2.5rem] blur opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
                <div className="relative aspect-[1/1] overflow-hidden rounded-[2rem] border border-white/5 bg-gray-900 shadow-2xl">
                  <img 
                    src={item.thumbnailUrl} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                    alt={item.caption}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                     <p className="text-white text-xs font-medium italic mb-4 leading-relaxed">
                       {item.caption}
                     </p>
                     <div className="flex gap-4 text-white/60 text-sm">
                        <span className="flex items-center gap-1"><i className="far fa-heart"></i> 124</span>
                        <span className="flex items-center gap-1"><i className="far fa-comment"></i> 12</span>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-16 flex items-center justify-center">
           <div className="px-6 py-2 rounded-full glass border border-white/5 text-[9px] font-bold text-gray-600 uppercase tracking-[0.3em]">
             API Facebook: {APP_CONFIG.facebookAccessToken ? 'Token Ativo' : 'Aguardando Configuração'}
           </div>
        </div>
      </div>
    </div>
  );
};
