import React, { useState, useEffect, useRef } from 'react';
import { APP_CONFIG } from '../constants';
import { trackWhatsAppLead, trackCheckAvailability } from '../utils/analytics';

type AvailabilityStatus = 'idle' | 'loading' | 'available' | 'busy' | 'error';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby3De6bYhMqY582hWIopHYu_bFXkFH9S3s9CE6RdhGkcJkzJXzsiL3m6LZzPixmy_yO/exec';

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export const DateAvailabilitySection: React.FC = () => {
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [status, setStatus] = useState<AvailabilityStatus>('idle');
  const [checkedDate, setCheckedDate] = useState<string>('');

  // Controle do Popup do Calendário
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [calendarYear, setCalendarYear] = useState<number>(now.getFullYear());
  const [calendarMonth, setCalendarMonth] = useState<number>(now.getMonth());

  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Data de hoje no formato ISO AAAA-MM-DD
  const todayStr = (() => {
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  })();

  // Fechar o popup ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        popoverRef.current && !popoverRef.current.contains(target) &&
        containerRef.current && !containerRef.current.contains(target)
      ) {
        setIsPickerOpen(false);
      }
    };

    if (isPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPickerOpen]);

  // Navegação entre meses no popup
  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(prev => prev - 1);
    } else {
      setCalendarMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(prev => prev + 1);
    } else {
      setCalendarMonth(prev => prev + 1);
    }
  };

  // Cálculo dos dias do mês atual para o popup
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calendarYear, calendarMonth, 1).getDay();

  // Espaços vazios no início (SEM dias do mês anterior)
  const leadingEmptyCount = firstDayOfWeek;
  // Espaços vazios no final (SEM dias do mês seguinte)
  const totalSlots = leadingEmptyCount + daysInMonth;
  const trailingEmptyCount = (7 - (totalSlots % 7)) % 7;

  // Formata ISO para DD/MM/AAAA
  const formatDateBR = (isoDate: string): string => {
    if (!isoDate) return '';
    const parts = isoDate.split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}/${month}/${year}`;
    }
    return isoDate;
  };

  // Formata data legível (ex: "Sábado, 19 de setembro de 2026")
  const formatFriendlyDate = (isoDate: string): string => {
    if (!isoDate) return '';
    const parts = isoDate.split('-').map(Number);
    if (parts.length !== 3) return isoDate;
    const [year, month, day] = parts;
    const dateObj = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(dateObj);
  };

  const checkAvailability = async (dateToCheck: string) => {
    if (!dateToCheck) return;

    setStatus('loading');
    setCheckedDate(dateToCheck);
    trackCheckAvailability(dateToCheck, 'consultando');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const url = `${APPS_SCRIPT_URL}?data=${encodeURIComponent(dateToCheck)}`;
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      const returnedStatus = String(data.status || '').toLowerCase().trim();
      if (returnedStatus.includes('dispon')) {
        setStatus('available');
        trackCheckAvailability(dateToCheck, 'disponivel');
      } else if (returnedStatus.includes('ocupad')) {
        setStatus('busy');
        trackCheckAvailability(dateToCheck, 'ocupado');
      } else {
        setStatus('error');
        trackCheckAvailability(dateToCheck, 'erro');
      }
    } catch (err) {
      console.warn('Erro ao consultar agenda do Google Apps Script:', err);
      setStatus('error');
      trackCheckAvailability(dateToCheck, 'erro');
    }
  };

  const handleSelectDay = (dayNumber: number) => {
    const dayStr = String(dayNumber).padStart(2, '0');
    const monthStr = String(calendarMonth + 1).padStart(2, '0');
    const isoDate = `${calendarYear}-${monthStr}-${dayStr}`;

    setSelectedDate(isoDate);
    setIsPickerOpen(false);
    checkAvailability(isoDate);
  };

  const handleWhatsAppAvailable = () => {
    trackWhatsAppLead('agenda_disponivel');
    const fbq = (window as any).fbq;
    if (fbq) {
      fbq('track', 'Contact', { content_name: 'WhatsApp Agenda - Data Disponível' });
    }
    const dateFormatted = formatDateBR(checkedDate || selectedDate);
    const message = `Olá! Consultei a agenda pelo site e vi que o dia ${dateFormatted} está disponível. Gostaria de solicitar um orçamento para meu evento.`;
    const whatsappUrl = `https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleWhatsAppBusy = () => {
    trackWhatsAppLead('agenda_ocupada');
    const fbq = (window as any).fbq;
    if (fbq) {
      fbq('track', 'Contact', { content_name: 'WhatsApp Agenda - Data Ocupada' });
    }
    const dateFormatted = formatDateBR(checkedDate || selectedDate);
    const message = `Olá DJ Edney! Consultei a agenda pelo site e vi que o dia ${dateFormatted} já possui um evento agendado. Gostaria de falar com você para verificar possibilidades.`;
    const whatsappUrl = `https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleWhatsAppFallback = () => {
    trackWhatsAppLead('agenda_erro_contato');
    const fbq = (window as any).fbq;
    if (fbq) {
      fbq('track', 'Contact', { content_name: 'WhatsApp Agenda - Erro Consulta' });
    }
    const message = `Olá DJ Edney! Gostaria de consultar a disponibilidade para o meu evento.`;
    const whatsappUrl = `https://wa.me/${APP_CONFIG.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section 
      id="consultar-data" 
      className="scroll-mt-20 sm:scroll-mt-24 py-16 sm:py-24 bg-[#060608] border-t border-white/5 relative overflow-hidden"
    >
      {/* Glow Atmosférico Sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/10 via-purple-600/10 to-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-5 sm:px-6 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.25em] mb-3.5 border border-blue-500/20">
            <i className="fas fa-calendar-check text-xs"></i> Consulte sua Data
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-sync font-black text-white uppercase tracking-tight mb-3.5 leading-tight">
            Sua data está <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">disponível?</span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
            Consulte a agenda em tempo real e veja a disponibilidade para o seu evento.
          </p>
        </div>

        {/* Card Principal da Consulta (Layout Original com Campo e Botão Consultar) */}
        <div className="bg-[#0c0c0e]/95 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md relative">
          
          <div className="max-w-lg mx-auto">
            {/* Campo Seletor de Data */}
            <label 
              htmlFor="date-picker-trigger" 
              className="block text-xs sm:text-sm font-sans font-semibold text-gray-300 mb-2.5 tracking-wide"
            >
              Escolha a data pretendida para o seu evento:
            </label>

            <div className="relative mb-6">
              {/* Caixa de Seleção de Data Expandida (Ocupa 100% da largura, centralizada e equilibrada) */}
              <div ref={containerRef} className="relative w-full">
                <button
                  id="date-picker-trigger"
                  type="button"
                  onClick={() => setIsPickerOpen(!isPickerOpen)}
                  aria-expanded={isPickerOpen}
                  className="w-full bg-white/5 border border-white/15 hover:border-blue-500/60 focus:border-blue-500 focus:bg-white/10 text-left font-sans text-base sm:text-lg rounded-2xl px-5 py-4 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all cursor-pointer shadow-inner flex items-center justify-between group"
                >
                  <span className={selectedDate ? 'text-white font-semibold' : 'text-gray-400 font-normal'}>
                    {selectedDate ? formatDateBR(selectedDate) : 'Toque aqui para escolher a data no calendário...'}
                  </span>
                  <div className="flex items-center gap-2 text-gray-400 group-hover:text-blue-400 transition-colors">
                    <span className="text-xs uppercase tracking-wider font-sans font-medium hidden sm:inline text-gray-500 group-hover:text-blue-400">
                      {isPickerOpen ? 'Fechar' : 'Abrir'}
                    </span>
                    <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${isPickerOpen ? 'rotate-180 text-blue-400' : ''}`}></i>
                  </div>
                </button>

                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400 text-base">
                  <i className="fas fa-calendar-days"></i>
                </div>

                {/* CALENDÁRIO POPUP (Abre exclusivamente ao clicar no campo) */}
                {isPickerOpen && (
                  <div 
                    ref={popoverRef}
                    className="absolute top-full left-0 right-0 sm:left-1/2 sm:-translate-x-1/2 sm:w-[360px] mt-2 z-50 bg-[#0e0e12] border border-white/20 rounded-2xl p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl animate-fade-in"
                  >
                    {/* Topo do Popup: Mês e Ano + Navegação */}
                    <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-white/10 select-none">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        aria-label="Mês anterior"
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 hover:border-blue-500/40"
                      >
                        <i className="fas fa-chevron-left text-[11px] sm:text-xs"></i>
                      </button>

                      <div className="text-center">
                        <span className="font-sync font-bold text-xs sm:text-sm text-white uppercase tracking-wider">
                          {MONTH_NAMES[calendarMonth]} <span className="text-blue-400">{calendarYear}</span>
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleNextMonth}
                        aria-label="Próximo mês"
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 hover:border-blue-500/40"
                      >
                        <i className="fas fa-chevron-right text-[11px] sm:text-xs"></i>
                      </button>
                    </div>

                    {/* Cabeçalho dos Dias da Semana */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-1.5 text-center select-none">
                      {WEEKDAYS.map((dayName, idx) => (
                        <div 
                          key={dayName} 
                          className={`text-[9px] sm:text-[10px] font-sync font-bold uppercase tracking-wider py-0.5 ${
                            idx === 0 || idx === 6 ? 'text-blue-400/80' : 'text-gray-400'
                          }`}
                        >
                          {dayName}
                        </div>
                      ))}
                    </div>

                    {/* Grade de Dias: MOSTRA SOMENTE OS DIAS DO MÊS ATUAL */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-1.5 select-none">
                      
                      {/* 1. Espaços vazios no início (SEM dias do mês anterior) */}
                      {Array.from({ length: leadingEmptyCount }).map((_, i) => (
                        <div 
                          key={`empty-lead-${i}`} 
                          className="w-full aspect-square rounded-lg pointer-events-none" 
                        />
                      ))}

                      {/* 2. Dias do mês atual */}
                      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((dayNumber) => {
                        const dayStr = String(dayNumber).padStart(2, '0');
                        const monthStr = String(calendarMonth + 1).padStart(2, '0');
                        const isoString = `${calendarYear}-${monthStr}-${dayStr}`;
                        
                        const isSelected = selectedDate === isoString;
                        const isToday = isoString === todayStr;
                        const isPast = isoString < todayStr;

                        let dayClass = 'bg-white/5 hover:bg-white/15 text-gray-200 border border-white/5 hover:border-white/20';

                        if (isSelected) {
                          dayClass = 'bg-blue-600 text-white font-bold border border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.6)]';
                        } else if (isToday) {
                          dayClass = 'bg-blue-500/15 text-blue-300 border border-blue-500/40';
                        } else if (isPast) {
                          dayClass = 'text-gray-600 opacity-35 cursor-not-allowed border-transparent';
                        }

                        return (
                          <button
                            key={`day-${dayNumber}`}
                            type="button"
                            onClick={() => !isPast && handleSelectDay(dayNumber)}
                            disabled={isPast}
                            title={isPast ? 'Data passada' : `${dayStr}/${monthStr}/${calendarYear}`}
                            className={`
                              w-full aspect-square rounded-lg flex items-center justify-center 
                              text-xs sm:text-sm font-sans font-semibold transition-all duration-150 cursor-pointer
                              ${dayClass}
                            `}
                          >
                            {dayNumber}
                          </button>
                        );
                      })}

                      {/* 3. Espaços vazios no final (SEM dias do mês seguinte) */}
                      {Array.from({ length: trailingEmptyCount }).map((_, i) => (
                        <div 
                          key={`empty-trail-${i}`} 
                          className="w-full aspect-square rounded-lg pointer-events-none" 
                        />
                      ))}

                    </div>

                  </div>
                )}

              </div>

              <p className="mt-2 text-[11px] text-gray-400 font-sans flex items-center gap-1.5">
                <i className="fas fa-circle-info text-[10px] text-blue-400"></i>
                <span>A verificação da agenda é realizada automaticamente ao selecionar a data.</span>
              </p>
            </div>

            {/* ESTADO 1: CARREGANDO */}
            {status === 'loading' && (
              <div className="rounded-2xl border border-blue-500/20 bg-blue-950/20 p-6 sm:p-8 text-center transition-all animate-fade-in">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xl">
                  <i className="fas fa-circle-notch fa-spin"></i>
                </div>
                <h4 className="font-sync font-bold text-sm sm:text-base text-white uppercase tracking-wide mb-1">
                  Consultando disponibilidade...
                </h4>
                <p className="text-gray-400 text-xs font-sans">
                  Conectando com a agenda em tempo real.
                </p>
              </div>
            )}

            {/* ESTADO 2: DISPONÍVEL */}
            {status === 'available' && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 sm:p-8 text-center transition-all animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-sync font-bold uppercase tracking-wider mb-3">
                  <i className="fas fa-circle-check text-emerald-400"></i>
                  <span>✓ DATA DISPONÍVEL</span>
                </div>

                <div className="my-2">
                  <div className="text-xl sm:text-2xl font-sync font-black text-white capitalize">
                    {formatDateBR(checkedDate)}
                  </div>
                  <div className="text-xs text-emerald-400/90 font-sans capitalize mt-0.5">
                    {formatFriendlyDate(checkedDate)}
                  </div>
                </div>

                <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-sans max-w-md mx-auto my-4">
                  Essa data está disponível. Solicite seu orçamento e conte um pouco sobre o seu evento.
                </p>

                <button
                  onClick={handleWhatsAppAvailable}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-sans font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  <i className="fab fa-whatsapp text-lg"></i>
                  <span>SOLICITAR ORÇAMENTO NO WHATSAPP</span>
                </button>
              </div>
            )}

            {/* ESTADO 3: OCUPADO */}
            {status === 'busy' && (
              <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-6 sm:p-8 text-center transition-all animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-sync font-bold uppercase tracking-wider mb-3">
                  <i className="fas fa-calendar-xmark text-red-400"></i>
                  <span>DATA JÁ RESERVADA</span>
                </div>

                <div className="my-2">
                  <div className="text-xl sm:text-2xl font-sync font-black text-white capitalize">
                    {formatDateBR(checkedDate)}
                  </div>
                  <div className="text-xs text-red-400/90 font-sans capitalize mt-0.5">
                    {formatFriendlyDate(checkedDate)}
                  </div>
                </div>

                <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-sans max-w-md mx-auto my-4">
                  Essa data já possui um evento agendado. Você pode consultar outra data ou falar comigo para verificar possibilidades.
                </p>

                <button
                  onClick={handleWhatsAppBusy}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white font-sans font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  <i className="fab fa-whatsapp text-lg text-emerald-400"></i>
                  <span>FALAR COM O DJ EDNEY</span>
                </button>
              </div>
            )}

            {/* ESTADO 4: ERRO DE CONEXÃO OU CONSULTA */}
            {status === 'error' && (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-6 sm:p-8 text-center transition-all animate-fade-in">
                <div className="w-10 h-10 mx-auto mb-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-base">
                  <i className="fas fa-triangle-exclamation"></i>
                </div>

                <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-sans max-w-md mx-auto mb-4">
                  Não foi possível consultar a agenda agora. Entre em contato pelo WhatsApp.
                </p>

                <button
                  onClick={handleWhatsAppFallback}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-sans font-bold text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
                >
                  <i className="fab fa-whatsapp text-lg text-emerald-400"></i>
                  <span>FALAR NO WHATSAPP</span>
                </button>
              </div>
            )}

            {/* ESTADO 0: INICIAL (Sem data escolhida) */}
            {status === 'idle' && (
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center text-gray-400 text-xs sm:text-sm font-sans leading-relaxed">
                <i className="fas fa-hand-pointer text-blue-400 text-base mb-2 block"></i>
                Selecione acima o dia do seu casamento, aniversário, debutante ou evento corporativo para verificar a disponibilidade imediata.
              </div>
            )}

          </div>

          {/* Rodapé informativo discreto */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px] text-gray-400 font-sans">
            <span className="flex items-center gap-1.5">
              <i className="fas fa-shield-halved text-blue-400 text-xs"></i>
              Consulta direta e sem compromisso
            </span>
            <span className="text-gray-400">
              A reserva definitiva é garantida após alinhamento e assinatura de contrato
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
