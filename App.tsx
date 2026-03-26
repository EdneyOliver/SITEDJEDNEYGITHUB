
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CalendarView } from './components/CalendarView';
import { NewsFeed } from './components/NewsFeed';
import { SocialLinks } from './components/SocialLinks';
import { ContactSection } from './components/ContactSection';
import { PackagesSection } from './components/PackagesSection';
import { InfoSection } from './components/InfoSection';
import { Footer } from './components/Footer';
import { APP_CONFIG } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'news'>('home');
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
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (activeTab !== 'home') {
      setActiveTab('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleNavigation = (id: string) => {
    switch (id) {
      case 'home':
        if (activeTab === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          setActiveTab('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        break;
      case 'servicos':
        scrollToSection('servicos');
        break;
      case 'agenda':
        scrollToSection('agenda-section');
        break;
      case 'news':
        scrollToSection('feedback-section');
        break;
      case 'informacoes':
        scrollToSection('info-section');
        break;
      case 'contato':
        scrollToSection('contato-section');
        break;
      default:
        setActiveTab('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Hero />
            
            <div id="servicos">
              <PackagesSection />
            </div>

            <section className="py-20 bg-[#050505] text-center px-6 border-y border-white/5">
               <div className="max-w-4xl mx-auto">
                  <h3 className="text-xl md:text-3xl font-sync font-bold text-white mb-6 uppercase tracking-tighter">
                    "Te aguardo para, juntos, realizarmos um <span className="text-blue-500">evento inesquecível</span> pra você e para os seus convidados."
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm uppercase tracking-[0.3em] leading-relaxed">
                    Trabalho com equipamentos de alta qualidade, tecnologia e excelência sonora aliados a repertório personalizado.
                  </p>
               </div>
            </section>

            <section id="agenda-section" className="py-24 bg-[#050505] overflow-hidden border-b border-white/5">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                  <div className="inline-block px-4 py-1 rounded-full bg-purple-500/10 text-purple-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-purple-500/20">
                    Disponibilidade Real
                  </div>
                  <h2 className="text-4xl md:text-6xl font-sync font-black text-white uppercase tracking-tighter mb-4">
                    Minha <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Agenda</span>
                  </h2>
                  <p className="text-gray-400 max-w-2xl mx-auto text-[10px] uppercase tracking-[0.3em] font-bold">
                    Consulte as datas disponíveis e solicite sua reserva via WhatsApp
                  </p>
                </div>
                
                <CalendarView />
              </div>
            </section>

            <div id="feedback-section" className="max-w-6xl mx-auto px-4 py-24 bg-[#0a0a0a]">
              <div className="text-center mb-16">
                <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-blue-500/20">
                  Depoimentos Reais
                </div>
                <h2 className="text-4xl md:text-6xl font-sync font-bold text-white uppercase tracking-tighter mb-4">Feedback dos <span className="text-blue-500">Clientes</span></h2>
                <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] font-bold">Fonte: Respostas do meu formulário de pós-evento</p>
              </div>
              
              <NewsFeed limit={3} />
              
              <div className="text-center mt-12">
                <button 
                  onClick={() => setActiveTab('news')}
                  className="px-8 py-3 rounded-full border border-blue-600/30 text-blue-400 hover:bg-blue-600 hover:text-white transition-all font-bold uppercase text-[10px] tracking-widest"
                >
                  Ver Mais Depoimentos <i className="fas fa-comments ml-2"></i>
                </button>
              </div>
            </div>

            <SocialLinks />

            <div id="info-section">
              <InfoSection />
            </div>
            
            <div id="contato-section">
              <ContactSection />
            </div>
          </>
        );
      case 'news':
        return (
          <div className="max-w-6xl mx-auto px-4 py-24 min-h-screen">
            <h1 className="text-4xl font-sync font-bold mb-4 text-center neon-text uppercase tracking-tighter">Feedback Detalhado</h1>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto uppercase text-xs tracking-[0.2em]">
              Confira a experiência real de quem já contratou.
            </p>
            <NewsFeed />
            <div className="text-center mt-16">
              <button 
                onClick={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-10 py-4 bg-white text-black font-black uppercase text-xs tracking-widest rounded-full hover:bg-gray-200 transition-all"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header 
        scrolled={scrolled} 
        activeTab={activeTab === 'news' ? 'news' : 'home'} 
        onTabChange={handleNavigation} 
      />
      
      <main className="pt-0">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
};

export default App;
