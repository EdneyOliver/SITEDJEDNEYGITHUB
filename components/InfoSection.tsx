
import React from 'react';

export const InfoSection: React.FC = () => {
  const infos = [
    {
      title: "Reserva de Data",
      content: "Para garantir a reserva da data, é necessário um adiantamento de 20% do valor total após a assinatura do contrato. O saldo restante poderá ser quitado até o dia do evento.",
      icon: "far fa-calendar-check"
    },
    {
      title: "Segurança Jurídica",
      content: "Trabalhamos com Contrato para sua total segurança e tranquilidade em todas as etapas do evento.",
      icon: "fas fa-file-signature"
    },
    {
      title: "Sobre a Playlist",
      content: "Compromisso com um repertório respeitoso e diversificado. Não toco estilos de funk proibidão, mandelão e com letras conteúdo explícito.",
      icon: "fas fa-music"
    },
    {
      title: "Meios de Pagamento",
      content: "Pix à vista, Parcelado até o dia do evento ou Parcelado via Cartão de Crédito (Taxa da maquininha).",
      icon: "fas fa-credit-card"
    }
  ];

  return (
    <section className="py-24 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
           <h2 className="text-2xl font-sync font-bold text-white uppercase tracking-tighter">Informações <span className="text-red-500">Importantes</span></h2>
           <div className="flex-grow h-px bg-white/5"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {infos.map((info, i) => (
            <div key={i} className="relative">
              <div className="text-3xl text-red-500/20 absolute -top-4 -left-2 mb-4">
                 <i className={info.icon}></i>
              </div>
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 relative z-10">{info.title}</h4>
              <p className="text-gray-500 text-[11px] leading-relaxed uppercase tracking-wider">
                {info.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
