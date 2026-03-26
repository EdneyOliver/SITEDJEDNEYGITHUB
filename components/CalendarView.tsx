
import React, { useState, useEffect, useCallback } from 'react';
import { APP_CONFIG } from '../constants';

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month: number, year: number) => {
  return new Date(year, month, 1).getDay();
};

export const CalendarView: React.FC = () => {
  const [currentViewDate, setCurrentViewDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<{message: string, code?: any, isPrivacyError?: boolean} | null>(null);

  const month = currentViewDate.getMonth();
  const year = currentViewDate.getFullYear();
  
  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const fetchCalendarEvents = useCallback(async () => {
    if (!APP_CONFIG.googleCalendarId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setApiError(null);
    try {
      // Usando o link iCal público do Google via Proxy para evitar erro de CORS
      const icalUrl = `https://calendar.google.com/calendar/ical/${APP_CONFIG.googleCalendarId}/public/basic.ics`;
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(icalUrl)}`;

      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error("Não foi possível acessar os dados da agenda.");
      
      const icsData = await response.text();
      
      // Parser simples para extrair datas do arquivo iCal (.ics)
      // Procuramos por DTSTART;VALUE=DATE:20240326 ou DTSTART:20240326T120000Z
      const eventsDays: number[] = [];
      const lines = icsData.split(/\r?\n/);
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('DTSTART')) {
          const dateMatch = lines[i].match(/:(\d{4})(\d{2})(\d{2})/);
          if (dateMatch) {
            const eYear = parseInt(dateMatch[1]);
            const eMonth = parseInt(dateMatch[2]) - 1; // Meses no JS são 0-11
            const eDay = parseInt(dateMatch[3]);
            
            // Verifica se o evento pertence ao mês e ano que estamos visualizando
            if (eYear === year && eMonth === month) {
              eventsDays.push(eDay);
            }
          }
        }
      }

      setBookedDates([...new Set(eventsDays)]);
    } catch (error: any) {
      console.error("Erro na sincronização iCal:", error);
      setApiError({
        message: "Ocorreu um erro ao tentar ler sua agenda via iCal. Verifique se ela está realmente como 'Pública'.",
        isPrivacyError: true
      });
      setBookedDates([]);
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    fetchCalendarEvents();
  }, [fetchCalendarEvents]);

  const changeMonth = (offset: number) => {
    const newDate = new Date(year, month + offset, 1);
    setCurrentViewDate(newDate);
  };

  const handleDayClick = (day: number) => {
    const isBooked = bookedDates.includes(day);
    const formattedDate = `${day < 10 ? '0' + day : day}/${(month + 1) < 10 ? '0' + (month + 1) : month + 1}`;
    
    let message = "";
    if (isBooked) {
      message = `Olá DJ Edney! Vi que a data ${formattedDate} está reservada na sua agenda, mas gostaria de tirar uma dúvida sobre disponibilidade.`;
    } else {
      message = `Olá DJ Edney! Vi que a data ${formattedDate} está livre e gostaria de solicitar um orçamento para meu evento.`;
    }

    const whatsappUrl = `https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="glass rounded-3xl p-6 sm:p-10 neon-border max-w-4xl mx-auto relative overflow-hidden transition-all duration-500 min-h-[400px]">
      {loading && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex items-center justify-center rounded-3xl">
          <div className="flex flex-col items-center text-center px-6">
            <i className="fas fa-compact-disc animate-spin text-purple-500 text-5xl mb-4"></i>
            <p className="font-sync text-[10px] tracking-[0.4em] text-white uppercase animate-pulse">Sincronizando com Google Agenda...</p>
          </div>
        </div>
      )}

      {apiError && !loading && (
        <div className="mb-6 p-6 bg-red-900/20 border border-red-500/30 rounded-2xl animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-lock text-red-500 text-xl"></i>
            <h4 className="text-red-400 text-xs font-bold uppercase tracking-widest">Atenção DJ Edney: Erro de Privacidade</h4>
          </div>
          
          <p className="text-gray-300 text-[11px] mb-6 leading-relaxed">
            {apiError.message}
          </p>

          {apiError.isPrivacyError && (
            <div className="bg-black/40 p-4 rounded-xl mb-6">
              <p className="text-white text-[10px] font-bold uppercase mb-3 tracking-widest">Como resolver (Passo a Passo):</p>
              <ol className="text-[10px] text-gray-400 space-y-2 list-decimal list-inside">
                <li>Abra o seu <span className="text-white">Google Agenda</span> no computador.</li>
                <li>No menu lateral, clique nos <span className="text-white">3 pontinhos</span> ao lado da sua agenda ({APP_CONFIG.googleCalendarId}).</li>
                <li>Vá em <span className="text-white">"Configurações e Compartilhamento"</span>.</li>
                <li>Role até <span className="text-white">"Autorizações de acesso"</span>.</li>
                <li>Marque a caixa <span className="text-white">"Disponibilizar ao público"</span>.</li>
                <li>Clique no botão abaixo para tentar novamente.</li>
              </ol>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button 
              onClick={fetchCalendarEvents}
              className="px-6 py-2 bg-red-600 text-white rounded-full text-[9px] font-black uppercase tracking-tighter hover:bg-red-500 transition-all"
            >
              Tentar Sincronizar Novamente
            </button>
            <a 
              href="https://calendar.google.com" 
              target="_blank" 
              className="px-6 py-2 bg-white/10 text-white rounded-full text-[9px] font-black uppercase tracking-tighter hover:bg-white/20 transition-all flex items-center gap-2"
            >
              Abrir Google Agenda <i className="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      )}

      {/* Header do Calendário */}
      <div className="flex justify-between items-center mb-10">
        <button 
          onClick={() => changeMonth(-1)}
          className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-600/30 flex items-center justify-center transition-all border border-white/10"
        >
          <i className="fas fa-chevron-left text-xs"></i>
        </button>
        
        <div className="text-center relative group">
          <h2 className="text-xl md:text-2xl font-sync font-bold uppercase tracking-widest text-white flex items-center gap-3">
            {monthNames[month]}
            <button 
              onClick={fetchCalendarEvents}
              className="text-gray-600 hover:text-purple-500 transition-colors text-sm"
              title="Sincronizar agora"
            >
              <i className={`fas fa-sync-alt ${loading ? 'animate-spin' : ''}`}></i>
            </button>
          </h2>
          <span className="text-[10px] text-purple-400 font-bold tracking-[0.3em]">{year}</span>
        </div>

        <button 
          onClick={() => changeMonth(1)}
          className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-600/30 flex items-center justify-center transition-all border border-white/10"
        >
          <i className="fas fa-chevron-right text-xs"></i>
        </button>
      </div>

      {/* Dias da Semana */}
      <div className="grid grid-cols-7 gap-2 mb-4 text-center">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
          <div key={`${d}-${i}`} className="text-[10px] font-bold text-gray-500 uppercase py-2">{d}</div>
        ))}
      </div>

      {/* Grid de Dias */}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="h-14 sm:h-24 opacity-0"></div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isBooked = bookedDates.includes(day);
          const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              className={`
                h-14 sm:h-24 rounded-xl flex flex-col items-center justify-center relative transition-all duration-300 group
                ${isBooked 
                  ? 'bg-red-500/10 text-red-300 border border-red-500/40 hover:bg-red-500/20' 
                  : 'bg-white/5 hover:bg-purple-600/20 hover:border-purple-500/50 border border-white/10 active:scale-95'}
                ${isToday ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-[#0a0a0a]' : ''}
              `}
            >
              <span className={`text-lg sm:text-2xl font-bold ${isBooked ? 'text-red-400' : 'group-hover:text-purple-400'}`}>
                {day}
              </span>
              <span className={`text-[7px] sm:text-[9px] mt-1 uppercase font-black tracking-tighter ${isBooked ? 'text-red-500' : 'text-green-500'}`}>
                {isBooked ? 'OCUPADO' : 'LIVRE'}
              </span>
              
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <i className={`fab fa-whatsapp ${isBooked ? 'text-red-400' : 'text-green-400'} text-[10px]`}></i>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-6 justify-center text-[9px] font-bold uppercase tracking-[0.2em]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
          <span className="text-gray-400">Datas Reservadas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
          <span className="text-gray-400">Datas Disponíveis</span>
        </div>
      </div>
    </div>
  );
};
