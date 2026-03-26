
import { DJConfig, SocialMediaItem } from './types';

/**
 * CONFIGURAÇÃO GLOBAL DO APP
 * djedney.com.br
 * Last Build: v2.5.3 (Updated Experience Image)
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
  // ID do Pixel do Facebook configurado conforme solicitado
  facebookPixelId: "25591008083842856" 
};

export const DJ_PACKAGES = [
  {
    id: "essencial",
    name: "Essencial",
    description: "Organização, música de qualidade e tranquilidade para eventos intimistas. Ideal para aniversários em salões de condomínio e reuniões familiares.",
    // Imagem do setup Essencial
    imageUrl: "https://i.postimg.cc/NjKWXkbY/Essencial.png", 
    price: "R$ 900",
    features: [
      "DJ Edney com Leitura de Pista e Animação da Pista",
      "Período de 5 horas",
      "Sonorização de alta qualidade equilibrada",
      "Iluminação decorativa para valorizar o espaço",
      "Microfone sem fio para recados e parabéns",
      "Playlist personalizada conforme o perfil"
    ],
    highlight: false
  },
  {
    id: "experiencia",
    name: "Experiência",
    description: "Festa animada com clima de pista e leitura de público. Para quem quer que a festa realmente aconteça do começo ao fim.",
    // Nova imagem real do setup Experiência enviada pelo usuário
    imageUrl: "https://i.postimg.cc/Nj6DR2SB/IMG-20251122-175048.jpg",
    imagePosition: "object-center",
    price: "R$ 1200",
    features: [
      "DJ Edney com Leitura de Pista e Animação da Pista",
      "Período de 5 horas",
      "Sonorização potente para ambientes médios/grandes",
      "Iluminação estilo balada com movimentos",
      "Máquina de fumaça inclusa",
      "Microfone sem fio para interações",
      "Playlist personalizada conforme o público"
    ],
    highlight: true
  },
  {
    id: "impacto",
    name: "Impacto",
    description: "A mesma energia da pista com visual marcante e elegante. Estrutura Box Truss que transforma o layout do seu espaço.",
    imageUrl: "https://images.unsplash.com/photo-1768916055541-26e3e97ac16e?q=100&w=1000&auto=format&fit=crop",
    price: "R$ 1300",
    features: [
      "DJ Edney com Leitura de Pista e Animação da Pista",
      "Período de 5 horas",
      "Toda a estrutura do Pacote Experiência",
      "Estruturas Box Truss (elevação de iluminação)",
      "Layout imponente com maior impacto visual",
      "Playlist ajustada em tempo real"
    ],
    highlight: false
  }
];

export const DJ_ADDONS = [
  {
    name: "Pista Paris",
    description: "Pista de dança iluminada disponível nos tamanhos 4x4 e 3x3. O toque de luxo que seu evento merece.",
    imageUrl: "https://i.postimg.cc/tgXH2qVV/PISTA-PARIS-4x4-5.png",
    icon: "fas fa-star"
  },
  {
    name: "Projetor",
    description: "Para homenagens com fotos e vídeos.",
    imageUrl: "https://i.postimg.cc/fb6p1MVv/VPL-DX130B.jpg",
    icon: "fas fa-video"
  },
  {
    name: "Karaokê",
    description: "Som + dois microfones e monitor de 19 polegadas.",
    imageUrl: "https://i.postimg.cc/SsfdV4CM/pngtree-karaoke-lable-png-and-psd-png-image-6947629.png",
    icon: "fas fa-microphone-alt"
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
    thumbnailUrl: 'https://images.unsplash.com/photo-1514525253361-b83f859b73c0?auto=format&fit=crop&q=100&w=800',
    url: APP_CONFIG.instagram,
    caption: 'Equipamento de alta qualidade e tecnologia. #DjEdney'
  },
  {
    id: 'ig2',
    platform: 'instagram',
    type: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=100&w=800',
    url: APP_CONFIG.instagram,
    caption: 'O som é o meio. A experiência é o resultado.'
  },
  {
    id: 'ig3',
    platform: 'instagram',
    type: 'image',
    thumbnailUrl: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=100&w=800',
    url: APP_CONFIG.instagram,
    caption: 'Repertório personalizado e leitura de pista.'
  }
];
