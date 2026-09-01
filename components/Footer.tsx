
import React from 'react';
import { APP_CONFIG } from '../constants';
import { trackSocialClick, trackWhatsAppLead } from '../utils/analytics';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-[#050505] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex justify-center gap-6 mb-8">
          <a 
            href={APP_CONFIG.instagram} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => trackSocialClick('instagram')}
            className="text-2xl text-gray-500 hover:text-white transition-colors" 
            title="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a 
            href={APP_CONFIG.facebook} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => trackSocialClick('facebook')}
            className="text-2xl text-gray-500 hover:text-white transition-colors" 
            title="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a 
            href={APP_CONFIG.tiktok} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => trackSocialClick('tiktok')}
            className="text-2xl text-gray-500 hover:text-white transition-colors" 
            title="TikTok"
          >
            <i className="fab fa-tiktok"></i>
          </a>
          <a 
            href={APP_CONFIG.youtube} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => trackSocialClick('youtube')}
            className="text-2xl text-gray-500 hover:text-white transition-colors" 
            title="YouTube"
          >
            <i className="fab fa-youtube"></i>
          </a>
          <a 
            href={`https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => trackWhatsAppLead('footer_whatsapp')}
            className="text-2xl text-gray-500 hover:text-white transition-colors" 
            title="WhatsApp"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
        
        {/* Área de Atendimento */}
        <div className="max-w-3xl mx-auto mb-8">
          <p className="text-xs sm:text-sm text-gray-400 font-medium mb-1.5">
            Atendimento em Campinas, Paulínia e toda a Região Metropolitana de Campinas - SP.
          </p>
          <p className="text-[11px] sm:text-xs text-gray-600 font-normal">
            Demais cidades atendidas: Americana, Sumaré, Hortolândia, Valinhos, Vinhedo, Indaiatuba, Jundiaí, Piracicaba, Limeira, Santa Bárbara d'Oeste e outras.
          </p>
        </div>
        
        <div className="font-sync font-bold text-sm tracking-widest text-gray-600 mb-4 uppercase">
          {APP_CONFIG.name}
        </div>
        
        <p className="text-[10px] text-gray-700 uppercase tracking-[0.3em] font-medium">
          &copy; {new Date().getFullYear()} Experiência de Alta Performance em Eventos.
        </p>
      </div>
    </footer>
  );
};

