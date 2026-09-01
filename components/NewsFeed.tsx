import React from 'react';
import { DJ_FEEDBACKS } from '../constants';

interface NewsFeedProps {
  limit?: number;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ limit }) => {
  const feedbacks = limit ? DJ_FEEDBACKS.slice(0, limit) : DJ_FEEDBACKS;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {feedbacks.map((item: any) => (
        <div 
          key={item.id} 
          className={`
            relative p-5 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1
            ${item.highlight 
              ? 'border-blue-500/40 bg-gradient-to-b from-blue-950/20 via-[#0d1017] to-[#070707] shadow-[0_15px_40px_rgba(59,130,246,0.15)]' 
              : 'border-white/10 bg-white/[0.02] hover:border-white/20'}
          `}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1">
                {[...Array(item.stars)].map((_, i) => (
                  <i key={i} className="fas fa-star text-xs text-amber-400"></i>
                ))}
              </div>
              <i className={`fas fa-quote-right text-base ${item.highlight ? 'text-blue-400/60' : 'text-white/15'}`}></i>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed mb-5 ${item.highlight ? 'text-white font-medium italic' : 'text-gray-300 font-normal'}`}>
              "{item.content}"
            </p>
          </div>
          
          <div className="flex items-center gap-3 pt-3.5 border-t border-white/5">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-sync font-bold text-xs shadow-inner shrink-0 ${item.highlight ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white' : 'bg-white/10 text-gray-200'}`}>
              {item.clientName.charAt(0)}
            </div>
            <div>
              <h4 className="font-sync text-xs font-bold text-white tracking-wider uppercase">{item.clientName}</h4>
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mt-0.5">{item.eventType}</p>
            </div>
          </div>
          
          {item.highlight && (
            <div className="absolute -top-2.5 right-4 px-3 py-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[8px] font-sync font-bold uppercase tracking-widest rounded-full shadow-md border border-blue-400/30">
              Destaque
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

