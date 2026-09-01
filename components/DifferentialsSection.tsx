import React from 'react';
import { DIFFERENTIALS } from '../constants';

export const DifferentialsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-block px-4 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3.5 border border-purple-500/20">
            Diferenciais
          </div>
          
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-sync font-black text-white uppercase tracking-tight mb-3.5 leading-tight">
            Música certa. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              No momento certo.
            </span>
          </h2>
          
          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
            A combinação entre técnica, repertório alinhado e atenção a cada detalhe da sua celebração.
          </p>
        </div>

        {/* Grid dos 7 Diferenciais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {DIFFERENTIALS.map((item, index) => (
            <div 
              key={index}
              className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                index === 0 
                  ? 'border-blue-500/40 bg-gradient-to-b from-blue-950/20 to-black/60 shadow-[0_10px_30px_rgba(59,130,246,0.15)] sm:col-span-2 xl:col-span-1' 
                  : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 text-lg mb-5 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-300">
                  <i className={item.icon}></i>
                </div>
                
                <h3 className="font-sync font-bold text-white text-sm sm:text-base uppercase tracking-tight mb-2 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 uppercase font-black tracking-widest">
                <span>0{index + 1}</span>
                <i className="fas fa-check text-blue-500/40 group-hover:text-blue-400 transition-colors"></i>
              </div>
            </div>
          ))}
        </div>

        {/* BANNER VISUAL DE TRANSIÇÃO (Respiro Visual com Pista & Luz Real) */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group min-h-[180px] sm:min-h-[160px] md:min-h-[180px] flex items-center">
          <img 
            src="/images/insta-3.webp" 
            alt="Estrutura de Iluminação e Pista Real - DJ Edney"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/95 via-black/80 to-black/75" />
          
          <div className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between p-5 sm:p-8 md:p-10 gap-4 text-center sm:text-left">
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-sync font-bold uppercase tracking-wider mb-2 border border-purple-500/30">
                Experiência Visual & Sonora
              </span>
              <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-sync font-black text-white uppercase tracking-tight leading-snug">
                Cada detalhe projetado para valorizar o seu espaço
              </h3>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-gray-300 font-sync font-bold uppercase tracking-wider hidden md:inline">
                Conheça os Pacotes
              </span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                <i className="fas fa-arrow-down text-xs animate-bounce"></i>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

