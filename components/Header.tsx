
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
    { label: 'Serviços', id: 'servicos' },
    { label: 'Agenda', id: 'agenda' },
    { label: 'Feedback', id: 'news' },
    { label: 'Informações', id: 'informacoes' },
    { label: 'Contato', id: 'contato' },
  ];

  const handleShare = async () => {
    const currentUrl = APP_CONFIG.appUrl;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'DJ Edney | Experience',
          text: 'Confira o portfólio e agenda do DJ Edney Oliver. Experiência sonora completa para o seu evento!',
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div 
          className="cursor-pointer flex items-center gap-2" 
          onClick={() => onTabChange('home')}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full flex items-center justify-center neon-border">
            <i className="fas fa-compact-disc animate-spin-slow text-white text-xs md:text-base"></i>
          </div>
          <span className="font-sync font-bold text-sm md:text-lg tracking-tighter uppercase hidden xs:block">
            {APP_CONFIG.name.split(' ')[0]} <span className="text-purple-500">{APP_CONFIG.name.split(' ')[1]}</span>
          </span>
        </div>

        <nav className="flex items-center gap-3 sm:gap-6 md:gap-8 overflow-x-auto no-scrollbar py-2">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-colors whitespace-nowrap ${
                activeTab === item.id ? 'text-purple-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <button 
            onClick={handleShare}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all ml-2"
            title="Compartilhar"
          >
            <i className="fas fa-share-alt text-[10px]"></i>
          </button>
        </nav>
      </div>
    </header>
  );
};
