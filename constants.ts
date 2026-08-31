
import { DJConfig, SocialMediaItem, YouTubeShortItem, FaqItem, DifferentialItem } from './types';

/**
 * CONFIGURAÇÃO GLOBAL DO APP
 * djedney.com.br
 */
export const APP_CONFIG: DJConfig = {
  name: "DJ Edney",
  phone: "+55 (019) 9.9226-8163",
  appUrl: "https://djedney.com.br", 
  instagram: "https://www.instagram.com/djedneyoliver/",
  facebook: "https://www.facebook.com/djedneyoliver",
  youtube: "https://www.youtube.com/@djedneyoliver",
  tiktok: "https://www.tiktok.com/@djedneyoliver",
  email: "edney_oliver@hotmail.com",
  googleCalendarId: "edney.and@gmail.com", 
  googleApiKey: "AIzaSyBo8hopTJPtZpxRYW0E-3oCtOGv3spfR4c",
  facebookAccessToken: "1796210094399363|F9q3fGV4QVQFtTBl2bJ55zTOlhA",
  facebookPixelId: "25591008083842856",
  manualBookedDates: [
    "2026-12-31"
  ]
};

export const EVENT_TYPES = [
  { name: "Casamentos", icon: "fas fa-heart", description: "Cerimônia e festa com trilha sonora emocionante e pista animada." },
  { name: "Aniversários", icon: "fas fa-cake-candles", description: "Comemorações com clima contagiante para todas as idades." },
  { name: "Debutantes", icon: "fas fa-crown", description: "15 Anos inesquecíveis com protocolo elegante e muita balada." },
  { name: "Eventos Corporativos", icon: "fas fa-briefcase", description: "Confraternizações e lançamentos com postura e som profissional." }
];

export const DIFFERENTIALS: DifferentialItem[] = [
  {
    icon: "fas fa-sliders",
    title: "Curadoria musical personalizada",
    description: "Repertório planejado junto com você, respeitando o seu gosto e a proposta da festa."
  },
  {
    icon: "fas fa-bolt",
    title: "Leitura de pista",
    description: "Sensibilidade e técnica para sentir a energia dos convidados e manter a pista cheia."
  },
  {
    icon: "fas fa-volume-high",
    title: "Som profissional",
    description: "Equipamentos de alta fidelidade acústica com som claro, limpo e bem distribuído."
  },
  {
    icon: "fas fa-wand-magic-sparkles",
    title: "Iluminação para pista",
    description: "Cenografia de luz e efeitos visuais que transformam o espaço em uma verdadeira balada."
  },
  {
    icon: "fas fa-clock",
    title: "Pontualidade",
    description: "Chegada com antecedência para montagem completa e passagem de som sem atrasos."
  },
  {
    icon: "fas fa-file-contract",
    title: "Contrato e segurança",
    description: "Compromisso formal e total tranquilidade jurídica em todas as etapas do evento."
  },
  {
    icon: "fas fa-award",
    title: "Experiência em diferentes eventos",
    description: "Domínio e adaptação para casamentos, debutantes, aniversários e corporativos."
  }
];

export const ALL_PACKAGES_INCLUDE = [
  "DJ Edney presente no evento",
  "Até 5 horas de evento",
  "Curadoria musical personalizada",
  "Playlist planejada junto ao cliente",
  "Leitura de pista em tempo real",
  "Microfone sem fio para interações e homenagens"
];

export const DJ_PACKAGES = [
  {
    id: "essencial",
    name: "Essencial",
    subtitle: "Para celebrações menores e eventos intimistas.",
    description: "Recomendado para ambientes fechados e de pequeno porte. Ideal para aniversários em salões de condomínio e reuniões familiares.",
    imageUrl: "/images/essencial.webp", 
    fallbackUrl: "https://i.postimg.cc/xjbn4pNH/essencial-02-sem-moving.png",
    imagePosition: "center 80%",
    price: "R$ 950",
    features: [
      "Recomendado para ambientes fechados e pequenos",
      "Sonorização de alta qualidade equilibrada para o espaço",
      "Iluminação decorativa para valorizar o ambiente",
      "Mesa de DJ compacta e organizada"
    ],
    highlight: false
  },
  {
    id: "experiencia",
    name: "Experiência",
    subtitle: "Uma experiência completa de som e iluminação para sua pista.",
    description: "Festa animada com clima de balada e pista empolgante do começo ao fim.",
    imageUrl: "/images/experiencia.webp",
    fallbackUrl: "https://i.postimg.cc/C1FQY1mj/EXPERIENCIA-TOP.png",
    imagePosition: "center 40%",
    price: "R$ 1.500",
    features: [
      "Sonorização potente para ambientes médios e grandes",
      "Iluminação estilo balada com efeitos e movimentos",
      "Máquina de fumaça inclusa para realçar os feixes de luz",
      "Estrutura completa para criar clima de pista de dança"
    ],
    highlight: true
  },
  {
    id: "impacto",
    name: "Impacto",
    subtitle: "Som, iluminação e estrutura visual para uma presença ainda mais marcante.",
    description: "A mesma energia da pista com visual imponente. Estrutura Box Truss que valoriza o layout do seu espaço.",
    imageUrl: "/images/impacto.webp",
    fallbackUrl: "https://i.postimg.cc/D0NsCjS5/Premium-top.png",
    imagePosition: "object-center",
    price: "R$ 1.600",
    features: [
      "Toda a sonorização e iluminação do Pacote Experiência",
      "Estrutura Box Truss para elevação e posicionamento da luz",
      "Layout imponente com cenografia de alto impacto visual",
      "Visual marcante e elegante para fotos e vídeos"
    ],
    highlight: false
  }
];

export const YOUTUBE_SHORTS: YouTubeShortItem[] = [
  {
    id: "u8I3zOSSwz8",
    title: "Aniversário Vanessa - Pista Animada",
    thumbnailUrl: "https://i.ytimg.com/vi/u8I3zOSSwz8/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/shorts/u8I3zOSSwz8"
  },
  {
    id: "dBVgAvi8TNM",
    title: "Aniversário Paula - Momentos Especiais",
    thumbnailUrl: "https://i.ytimg.com/vi/dBVgAvi8TNM/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/shorts/dBVgAvi8TNM"
  },
  {
    id: "OyB3lHrt00U",
    title: "Festa de 15 Anos - Lara",
    thumbnailUrl: "https://i.ytimg.com/vi/OyB3lHrt00U/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/shorts/OyB3lHrt00U"
  },
  {
    id: "ErZpFVgzf0g",
    title: "Festa Temática - Muita Energia",
    thumbnailUrl: "https://i.ytimg.com/vi/ErZpFVgzf0g/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/shorts/ErZpFVgzf0g"
  },
  {
    id: "JguYy1VSVdw",
    title: "15 Anos da Ana - Pista Cheia",
    thumbnailUrl: "https://i.ytimg.com/vi/JguYy1VSVdw/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/shorts/JguYy1VSVdw"
  },
  {
    id: "Vj1wUYybyQs",
    title: "15 Anos da Rafa - Momento Inesquecível",
    thumbnailUrl: "https://i.ytimg.com/vi/Vj1wUYybyQs/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/shorts/Vj1wUYybyQs"
  }
];

export const DJ_ADDONS = [
  {
    name: "Pista Paris",
    description: "Pista de dança iluminada disponível nos tamanhos 4x4 e 3x3. O toque de luxo e sofisticação que seu evento merece.",
    imageUrl: "/images/pista-paris.webp",
    fallbackUrl: "https://i.postimg.cc/jjsjV609/paris-jat-11.jpg",
    icon: "fas fa-star",
    badge: "Destaque Luxo"
  },
  {
    name: "Projetor",
    description: "Projetor de alta definição para homenagens, retrospectivas com fotos e vídeos emocionantes.",
    imageUrl: "/images/projetor.webp",
    fallbackUrl: "https://i.postimg.cc/fb6p1MVv/VPL-DX130B.jpg",
    icon: "fas fa-video",
    badge: "Homenagens & Vídeos"
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Como funciona a reserva da data?",
    answer: "A reserva da data é formalizada com a assinatura do contrato de prestação de serviços e o pagamento de um adiantamento de 20% do valor total. O saldo restante pode ser quitado até o dia do evento."
  },
  {
    question: "Quanto preciso pagar para reservar minha data?",
    answer: "Para garantir o bloqueio da data na agenda, é solicitado o adiantamento de 20% do valor total do pacote contratado no momento da assinatura do contrato."
  },
  {
    question: "Posso escolher as músicas e personalizar a playlist?",
    answer: "Sim! A curadoria musical é feita em conjunto com você. Alinhamos seus gostos, músicas indispensáveis e momentos especiais da cerimônia ou recepção para criar a trilha sonora perfeita."
  },
  {
    question: "Quanto tempo dura o serviço do DJ?",
    answer: "Todos os nossos pacotes incluem um período de até 5 horas de evento. Esse tempo é dedicado exclusivamente à festa, já com toda a montagem pronta com antecedência."
  },
  {
    question: "É possível contratar horas adicionais?",
    answer: "Sim! Horas extras podem ser combinadas previamente na contratação ou solicitadas durante o próprio evento, caso a festa se estenda."
  },
  {
    question: "Vocês atendem outras cidades?",
    answer: "Sim! Atendemos Campinas, Paulínia e diversas cidades da região de Campinas. Entre em contato informando o local do evento para verificarmos a disponibilidade e os detalhes de deslocamento."
  },
  {
    question: "Quais são as formas de pagamento aceitas?",
    answer: "Trabalhamos com Pix à vista, parcelamento bancário até o dia do evento ou parcelamento no Cartão de Crédito (com as taxas da maquininha repassadas ao cliente)."
  },
  {
    question: "Como funciona a montagem e desmontagem dos equipamentos?",
    answer: "Chegamos ao local com bastante antecedência em relação ao horário de início do evento para realizar toda a montagem, alinhamento técnico e passagem de som com calma e pontualidade."
  },
  {
    question: "É possível personalizar um pacote ou montar uma estrutura sob medida?",
    answer: "Com certeza! Os pacotes apresentados são sugestões para facilitar sua escolha. Se você precisa de som para mais ambientes, iluminação específica ou projetor, montamos uma proposta personalizada para seu espaço."
  },
  {
    question: "O que o local do evento precisa disponibilizar para a instalação?",
    answer: "O local precisa apenas de pontos de energia elétrica (tomadas em bom estado e voltagem informada) próximos ao espaço reservado para a mesa do DJ, além de cobertura em caso de chuva ou sol direto."
  },
  {
    question: "Qual é a política de repertório do DJ Edney?",
    answer: "Nosso compromisso é com uma atmosfera musical de alta qualidade, respeitosa e envolvente para todos os convidados. Não tocamos faixas com conteúdo explícito, funk proibidão ou apologia, garantindo um ambiente agradável para a família e amigos."
  }
];

export const DJ_FEEDBACKS = [
  {
    id: "1",
    clientName: "Cliente Satisfeita",
    eventType: "Casamento",
    content: "Totalmente satisfeita com o atendimento, atenção e desenvoltura. Soube me ajudar a escolher as melhores músicas e repertório para o meu casamento, Edney te agradeço muito, tudo ocorreu perfeitamente como o combinado... Te indicaria 1.000 vezes",
    stars: 5,
    highlight: true
  },
  {
    id: "2",
    clientName: "Evento Social",
    eventType: "Festa Individual",
    content: "O trabalho do DJ Edney foi excelente, e o som estava impecável, criando uma atmosfera incrível durante todo o evento. Super indico.",
    stars: 5,
    highlight: false
  },
  {
    id: "3",
    clientName: "Feedback Pós-Evento",
    eventType: "Aniversário",
    content: "Uma excelente profissional, com um som de alta qualidade, atendeu nossas expectativas, pontual, muito educado, e dedicado a atender as necessidades do evento, nota 1000.",
    stars: 5,
    highlight: false
  },
  {
    id: "4",
    clientName: "Noivos",
    eventType: "Casamento",
    content: "Eu amei o dj, foi lindo os votos, as músicas foram todas maravilhosas, atendeu aos pedidos dos noivos, dos convidados.",
    stars: 5,
    highlight: true
  },
  {
    id: "5",
    clientName: "Cliente de Formulário",
    eventType: "Evento Especial",
    content: "Recomendo o DJ Edney. Desde o primeiro contato até o final do evento sempre foi muito solícito e claro quanto ao seu trabalho. Tudo que foi combinado foi cumprido de forma magnífica. A presença dele com certeza deixou nosso casamento mais especial.",
    stars: 5,
    highlight: false
  },
  {
    id: "6",
    clientName: "Confraternização",
    eventType: "Social",
    content: "Simplesmente gostamos de tudo, foi muito legal, nos divertimos além do esperado e todos elogiaram, parabéns pelo ótimo trabalho 👏",
    stars: 5,
    highlight: false
  }
];

export const MOCK_SOCIAL_FEED: SocialMediaItem[] = [
  {
    id: 'ig1',
    platform: 'instagram',
    type: 'image',
    thumbnailUrl: '/images/insta-1.webp',
    url: APP_CONFIG.instagram,
    caption: 'Equipamento de alta qualidade e tecnologia. #DjEdney'
  },
  {
    id: 'ig2',
    platform: 'instagram',
    type: 'video',
    thumbnailUrl: '/images/insta-2.webp',
    url: APP_CONFIG.instagram,
    caption: 'O som é o meio. A experiência é o resultado.'
  },
  {
    id: 'ig3',
    platform: 'instagram',
    type: 'image',
    thumbnailUrl: '/images/insta-3.webp',
    url: APP_CONFIG.instagram,
    caption: 'Repertório personalizado e leitura de pista.'
  }
];

