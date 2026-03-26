
import React from 'react';
import { DJ_FEEDBACKS } from '../constants';

interface NewsFeedProps {
  limit?: number;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ limit }) => {
  const feedbacks = limit ? DJ_FEEDBACKS.slice(0, limit) : DJ_FEEDBACKS;

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {feedbacks.map((item: any) => (
        <div 
          key={item.id} 
          className={`
            break-inside-avoid relative glass p-8 rounded-[2rem] border transition-all duration-500 group
            ${item.highlight 
              ? 'border-blue-500/30 bg-blue-500/5 shadow-[0_20px_50px_rgba(59,130,246,0.1)]' 
              : 'border-white/5 hover:border-white/20'}
          `}
        >
          <div className="flex items-center justify-between mb-6">
             <div className="flex gap-1">
                {[...Array(item.stars)].map((_, i) => (
                  <i key={i} className="fas fa-star text-[10px] text-yellow-500"></i>
                ))}
             </div>
             <i className={`fas fa-quote-right text-2xl ${item.highlight ? 'text-blue-500/40' : 'text-white/10'}`}></i>
          </div>

          <p className={`text-sm leading-relaxed mb-8 ${item.highlight ? 'text-white font-medium italic' : 'text-gray-400'}`}>
            "{item.content}"
          </p>
          
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-sync font-bold text-xs shadow-inner ${item.highlight ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400'}`}>
              {item.clientName.charAt(0)}
            </div>
            <div>
              <h4 className="font-sync text-[10px] font-black text-white tracking-[0.2em] uppercase">{item.clientName}</h4>
              <p className="text-[9px] text-blue-500 font-bold uppercase tracking-widest mt-1">{item.eventType}</p>
            </div>
          </div>
          
          {item.highlight && (
            <div className="absolute -top-3 -right-3 px-3 py-1 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded-lg shadow-lg">
              Destaque
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
