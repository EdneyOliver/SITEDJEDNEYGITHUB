import React from 'react';
import { DJ_FEEDBACKS } from '../constants';

interface NewsFeedProps {
  limit?: number;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ limit }) => {
  const feedbacks = limit ? DJ_FEEDBACKS.slice(0, limit) : DJ_FEEDBACKS;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {feedbacks.map((item: any) => (
        <div 
          key={item.id} 
          className={`
            relative glass p-7 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1
            ${item.highlight 
              ? 'border-blue-500/40 bg-blue-500/5 shadow-[0_15px_40px_rgba(59,130,246,0.12)]' 
              : 'border-white/10 bg-white/[0.02] hover:border-white/20'}
          `}
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-1.5">
                {[...Array(item.stars)].map((_, i) => (
                  <i key={i} className="fas fa-star text-xs text-yellow-400"></i>
                ))}
              </div>
              <i className={`fas fa-quote-right text-xl ${item.highlight ? 'text-blue-400/60' : 'text-white/20'}`}></i>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${item.highlight ? 'text-white font-medium italic' : 'text-gray-300 font-normal'}`}>
              "{item.content}"
            </p>
          </div>
          
          <div className="flex items-center gap-3.5 pt-4 border-t border-white/5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-sync font-bold text-xs shadow-inner shrink-0 ${item.highlight ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-300'}`}>
              {item.clientName.charAt(0)}
            </div>
            <div>
              <h4 className="font-sync text-[11px] font-bold text-white tracking-wider uppercase">{item.clientName}</h4>
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mt-0.5">{item.eventType}</p>
            </div>
          </div>
          
          {item.highlight && (
            <div className="absolute -top-3 right-4 px-3 py-0.5 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-md">
              Destaque
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
