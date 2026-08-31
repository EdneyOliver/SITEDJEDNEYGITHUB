import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ExperienceSection } from './components/ExperienceSection';
import { DifferentialsSection } from './components/DifferentialsSection';
import { PackagesSection } from './components/PackagesSection';
import { YouTubeShortsSection } from './components/YouTubeShortsSection';
import { AddonsSection } from './components/AddonsSection';
import { NewsFeed } from './components/NewsFeed';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { APP_CONFIG } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Inicialização do Facebook Pixel
    if (APP_CONFIG.facebookPixelId && APP_CONFIG.facebookPixelId !== "000000000000000") {
      const fbq = (window as any).fbq;
      if (fbq) {
        fbq('init', APP_CONFIG.facebookPixelId);
        fbq('track', 'PageView');
        console.log('Facebook Pixel Initialized:', APP_CONFIG.facebookPixelId);
      }
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavigation = (id: string) => {
    setActiveTab(id);
    switch (id) {
      case 'home':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'experiencia':
        scrollToSection('experiencia-section');
        break;
      case 'pacotes':
        scrollToSection('pacotes-section');
        break;
      case 'videos':
        scrollToSection('shorts-section');
        break;
      case 'depoimentos':
        scrollToSection('depoimentos-section');
        break;
      case 'faq':
        scrollToSection('faq-section');
        break;
      case 'contato':
        scrollToSection('contato-section');
        break;
      default:
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Barra de Navegação Superior */}
      <Header 
        scrolled={scrolled} 
        activeTab={activeTab} 
        onTabChange={handleNavigation} 
      />
      
      <main className="flex-1">
        {/* 1. HERO */}
        <Hero />

        {/* 2. VEJA A EXPERIÊNCIA */}
        <ExperienceSection />

        {/* 3. DIFERENCIAIS */}
        <DifferentialsSection />

        {/* 4 & 5. PACOTES & PERSONALIZAÇÃO */}
        <PackagesSection />

        {/* 6. VÍDEOS / YOUTUBE SHORTS */}
        <YouTubeShortsSection />

        {/* 7. ESTRUTURAS E ADICIONAIS */}
        <AddonsSection />

        {/* 8. DEPOIMENTOS REAIS */}
        <section id="depoimentos-section" className="py-20 sm:py-28 bg-[#050505] border-t border-white/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-blue-500/20">
                Depoimentos Reais
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-sync font-black text-white uppercase tracking-tight mb-4">
                Feedback dos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Clientes</span>
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-normal">
                Experiências reais compartilhadas por quem confiou o seu evento ao DJ Edney.
              </p>
            </div>

            <NewsFeed />
          </div>
        </section>

        {/* 10 & 11. FAQ ACCORDION & CURADORIA */}
        <FaqSection />

        {/* 12 & 13. CTA FINAL & REDES SOCIAIS */}
        <FinalCtaSection />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default App;
