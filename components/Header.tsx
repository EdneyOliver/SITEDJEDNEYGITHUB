import React from 'react';
import { APP_CONFIG } from '../constants';

interface HeaderProps {
  scrolled: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ scrolled, activeTab, onTabChange }) => {
  const navItems = [
    { label: 'Início', id: 'home' },
    { label: 'Eventos', id: 'experiencia' },
    { label: 'Pacotes', id: 'pacotes' },
    { label: 'Vídeos', id: 'videos' },
    { label: 'Depoimentos', id: 'depoimentos' },
    { label: 'Dúvidas', id: 'faq' },
    { label: 'Contato', id: 'contato' },
  ];

  const handleShare = async () => {
    const currentUrl = APP_CONFIG.appUrl;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'DJ Edney | Experiência Sonora & Iluminação',
          text: 'Conheça o trabalho e pacotes do DJ Edney Oliver!',
          url: currentUrl,
        });
      } catch (err) {
        console.log('Erro ao compartilhar', err);
      }
    } else {
      navigator.clipboard.writeText(currentUrl);
      alert(`Link ${currentUrl.replace('https://', '')} copiado!`);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        
        {/* Logo / Nome */}
        <div 
          className="cursor-pointer flex items-center gap-2.5" 
          onClick={() => onTabChange('home')}
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <i className="fas fa-compact-disc animate-spin-slow text-white text-xs sm:text-sm"></i>
          </div>
          <span className="font-sync font-black text-xs sm:text-sm md:text-base tracking-tighter uppercase text-white">
            DJ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">EDNEY</span>
          </span>
        </div>

        {/* Navegação */}
        <nav className="flex items-center gap-2 sm:gap-4 md:gap-6 overflow-x-auto no-scrollbar py-1">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`text-[9px] sm:text-[10px] font-sync font-bold uppercase tracking-wider transition-colors whitespace-nowrap px-1.5 py-1 ${
                activeTab === item.id 
                  ? 'text-blue-400 border-b border-blue-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <button 
            onClick={handleShare}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all ml-1 shrink-0 cursor-pointer"
            title="Compartilhar"
          >
            <i className="fas fa-share-nodes text-[10px]"></i>
          </button>
        </nav>
      </div>
    </header>
  );
};
