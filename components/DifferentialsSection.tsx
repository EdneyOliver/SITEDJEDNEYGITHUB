import React from 'react';
import { DIFFERENTIALS } from '../constants';

export const DifferentialsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-purple-500/20">
            Diferenciais
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sync font-black text-white uppercase tracking-tight mb-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {DIFFERENTIALS.map((item, index) => (
            <div 
              key={index}
              className={`glass p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                index === 0 
                  ? 'border-blue-500/30 bg-blue-500/5 shadow-[0_10px_30px_rgba(59,130,246,0.1)] sm:col-span-2 xl:col-span-1' 
                  : 'border-white/5 hover:border-white/20 bg-white/[0.02]'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 text-lg mb-5 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-300">
                  <i className={item.icon}></i>
                </div>
                
                <h3 className="font-sync font-bold text-white text-sm sm:text-base uppercase tracking-tight mb-2 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-400 uppercase font-black tracking-widest">
                <span>0{index + 1}</span>
                <i className="fas fa-check text-blue-500/40 group-hover:text-blue-400 transition-colors"></i>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
