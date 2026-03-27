
import React from 'react';
import { APP_CONFIG } from '../constants';

export const CalendarView: React.FC = () => {
  const whatsappUrl = `https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}?text=${encodeURIComponent('Olá DJ Edney! Gostaria de verificar a disponibilidade para o meu evento.')}`;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass rounded-3xl p-8 md:p-12 neon-border relative overflow-hidden group">
        {/* Elementos Decorativos de Fundo */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-700"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-700"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(147,51,234,0.3)] group-hover:scale-110 transition-transform duration-500">
            <i className="fas fa-calendar-check text-3xl text-white"></i>
          </div>
          
          <h3 className="text-2xl md:text-4xl font-sync font-black text-white uppercase tracking-tighter mb-6 leading-tight">
            Sua data ainda está <span className="text-purple-500">disponível?</span>
          </h3>
          
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed uppercase tracking-widest font-medium">
            Minha agenda é atualizada diariamente. Para garantir a <span className="text-white">precisão total</span> e reservar seu evento, clique no botão abaixo e fale comigo agora mesmo!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
            {[
              { icon: 'fa-bolt', title: 'Resposta Rápida', desc: 'Retorno em poucos minutos' },
              { icon: 'fa-check-circle', title: 'Garantia de Data', desc: 'Reserva imediata após sinal' },
              { icon: 'fa-clock', title: 'Flexibilidade', desc: 'Horários personalizados' }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                <i className={`fas ${item.icon} text-purple-500 mb-2`}></i>
                <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-1">{item.title}</h4>
                <p className="text-gray-500 text-[9px] uppercase tracking-wider">{item.desc}</p>
              </div>
            ))}
          </div>

          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative inline-flex items-center gap-4 px-10 py-5 bg-green-600 hover:bg-green-500 text-white rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(22,163,74,0.4)]"
          >
            <i className="fab fa-whatsapp text-2xl animate-bounce"></i>
            <span className="font-sync font-black text-xs md:text-sm uppercase tracking-widest">
              Consultar Disponibilidade Agora
            </span>
            <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover/btn:scale-100 transition-transform duration-500 opacity-0 group-hover/btn:opacity-100"></div>
          </a>
          
          <p className="mt-8 text-[9px] text-gray-600 uppercase tracking-[0.4em] font-bold">
            Atendimento Personalizado via WhatsApp
          </p>
        </div>
      </div>
    </div>
  );
};
