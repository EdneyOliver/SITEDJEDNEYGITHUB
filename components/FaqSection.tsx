import React, { useState } from 'react';
import { FAQ_ITEMS, APP_CONFIG } from '../constants';
import { FaqItem } from '../types';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleWhatsApp = () => {
    const message = "Olá DJ Edney! Fiquei com uma dúvida sobre a contratação do evento.";
    window.open(`https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="faq-section" className="py-16 sm:py-24 bg-[#080808] border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-5 sm:px-6 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-block px-4 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3.5 border border-purple-500/20">
            Tire Suas Dúvidas
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-sync font-black text-white uppercase tracking-tight mb-3.5 leading-tight">
            Perguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">frequentes</span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-normal">
            Informações claras sobre reserva, estrutura, pagamentos e o funcionamento do serviço.
          </p>
        </div>

        {/* Bloco de Destaque da Curadoria Musical */}
        <div className="glass p-5 sm:p-7 md:p-8 rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-950/20 to-purple-950/20 mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-lg sm:text-xl shrink-0 shadow-lg">
            <i className="fas fa-music"></i>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-sync font-bold text-white uppercase tracking-tight mb-1">
              Curadoria Musical
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              O repertório é planejado junto ao cliente, respeitando o perfil do evento, dos convidados e a proposta definida previamente.
            </p>
          </div>
        </div>

        {/* Lista de Accordions */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item: FaqItem, idx: number) => {
            const isOpen = openIndex === idx;

            return (
              <div 
                key={idx}
                className={`
                  rounded-2xl border transition-all duration-300 overflow-hidden
                  ${isOpen 
                    ? 'glass border-purple-500/40 bg-purple-500/5 shadow-md' 
                    : 'glass border-white/5 bg-white/[0.02] hover:border-white/15'}
                `}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-4.5 sm:p-5 md:p-6 text-left flex items-center justify-between gap-4 cursor-pointer min-h-[52px]"
                  aria-expanded={isOpen}
                >
                  <span className="font-sync font-bold text-white text-xs sm:text-sm uppercase tracking-tight pr-2 leading-snug">
                    {item.question}
                  </span>
                  
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                    isOpen 
                      ? 'bg-purple-600 text-white border-purple-500 rotate-180' 
                      : 'bg-white/5 text-gray-400 border-white/10'
                  }`}>
                    <i className="fas fa-chevron-down text-[10px]"></i>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4.5 sm:px-5 md:px-6 pb-5 sm:pb-6 text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-3.5 sm:pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Card para dúvida não listada */}
        <div className="mt-8 sm:mt-10 text-center text-xs text-gray-400">
          <span>Ficou com alguma dúvida específica? </span>
          <button 
            onClick={handleWhatsApp}
            className="text-purple-400 hover:text-purple-300 font-bold uppercase underline ml-1 cursor-pointer"
          >
            Fale comigo no WhatsApp
          </button>
        </div>

      </div>
    </section>
  );
};
