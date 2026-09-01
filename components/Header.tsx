import React, { useState } from 'react';
import { APP_CONFIG } from '../constants';

interface HeaderProps {
  scrolled: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ scrolled, activeTab, onTabChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Início', id: 'home', icon: 'fas fa-home' },
    { label: 'Eventos', id: 'experiencia', icon: 'fas fa-music' },
    { label: 'Pacotes', id: 'pacotes', icon: 'fas fa-layer-group' },
    { label: 'Vídeos', id: 'videos', icon: 'fab fa-youtube' },
    { label: 'Depoimentos', id: 'depoimentos', icon: 'fas fa-star' },
    { label: 'Dúvidas', id: 'faq', icon: 'fas fa-circle-question' },
    { label: 'Contato', id: 'contato', icon: 'fas fa-envelope' },
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

  const handleItemClick = (id: string) => {
    onTabChange(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMobileMenuOpen ? 'glass py-3 shadow-2xl bg-black/85 backdrop-blur-xl border-b border-white/10' : 'bg-transparent py-4 sm:py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        
        {/* Logo / Nome */}
        <div 
          className="cursor-pointer flex items-center gap-2.5 select-none" 
          onClick={() => handleItemClick('home')}
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] shrink-0">
            <i className="fas fa-compact-disc animate-spin-slow text-white text-xs sm:text-sm"></i>
          </div>
          <span className="font-sync font-black text-xs sm:text-sm md:text-base tracking-tighter uppercase text-white">
            DJ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">EDNEY</span>
          </span>
        </div>

        {/* Navegação Desktop (Visível a partir de md) */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`text-[10px] lg:text-xs font-sync font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap px-1.5 py-1 cursor-pointer ${
                activeTab === item.id 
                  ? 'text-blue-400 border-b-2 border-blue-400 pb-0.5' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <button 
            onClick={handleShare}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all ml-2 shrink-0 cursor-pointer"
            title="Compartilhar"
          >
            <i className="fas fa-share-nodes text-xs"></i>
          </button>
        </nav>

        {/* Controles Mobile (Compartilhar + Menu Hambúrguer) */}
        <div className="flex md:hidden items-center gap-2">
          <button 
            onClick={handleShare}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all active:scale-95 cursor-pointer"
            title="Compartilhar"
            aria-label="Compartilhar página"
          >
            <i className="fas fa-share-nodes text-xs"></i>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95 cursor-pointer"
            title="Menu"
            aria-label="Abrir Menu de Navegação"
            aria-expanded={isMobileMenuOpen}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times text-base text-red-400' : 'fa-bars text-sm text-white'} transition-transform duration-200`}></i>
          </button>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#050505]/95 backdrop-blur-2xl px-5 py-4 mt-3 shadow-2xl transition-all duration-300">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl font-sync font-bold text-xs uppercase tracking-wider text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <i className={`${item.icon} text-xs ${isActive ? 'text-blue-400' : 'text-gray-500'}`}></i>
                    {item.label}
                  </span>
                  {isActive && <i className="fas fa-chevron-right text-[10px] text-blue-400"></i>}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

