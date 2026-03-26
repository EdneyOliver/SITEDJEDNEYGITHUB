
import React from 'react';
import { APP_CONFIG } from '../constants';

export const SocialLinks: React.FC = () => {
  const links = [
    {
      name: 'Instagram',
      icon: 'fab fa-instagram',
      url: APP_CONFIG.instagram,
      color: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600',
      label: '@djedneyoliver'
    },
    {
      name: 'TikTok',
      icon: 'fab fa-tiktok',
      url: APP_CONFIG.tiktok,
      color: 'bg-black',
      label: '@djedneyoliver'
    },
    {
      name: 'Facebook',
      icon: 'fab fa-facebook-f',
      url: APP_CONFIG.facebook,
      color: 'bg-[#1877F2]',
      label: 'DJ Edney'
    },
    {
      name: 'YouTube',
      icon: 'fab fa-youtube',
      url: APP_CONFIG.youtube,
      color: 'bg-[#FF0000]',
      label: 'Canal Oficial'
    },
    {
      name: 'WhatsApp',
      icon: 'fab fa-whatsapp',
      url: `https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}`,
      color: 'bg-[#25D366]',
      label: 'Solicitar'
    }
  ];

  return (
    <section className="py-12 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-sync font-bold uppercase tracking-widest text-white mb-2">Conecte-se Comigo</h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 glass rounded-2xl hover:scale-[1.02] transition-all duration-300 group border border-white/5"
            >
              <div className={`w-12 h-12 ${link.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}>
                <i className={link.icon}></i>
              </div>
              <div className="flex-grow text-left">
                <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{link.name}</div>
                <div className="font-bold text-white group-hover:text-purple-400 transition-colors">{link.label}</div>
              </div>
              <i className="fas fa-external-link-alt text-gray-600 text-xs group-hover:text-white transition-colors"></i>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
