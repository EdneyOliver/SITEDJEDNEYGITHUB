
export interface DJEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  isBooked: boolean;
  location?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl: string;
  category: 'Evento' | 'Novidade' | 'Setlist';
}

export interface SocialMediaItem {
  id: string;
  platform: 'instagram' | 'youtube' | 'facebook';
  type: 'image' | 'video';
  thumbnailUrl: string;
  url: string;
  caption?: string;
}

export interface YouTubeShortItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  youtubeUrl: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface DifferentialItem {
  icon: string;
  title: string;
  description: string;
}

export interface DJConfig {
  name: string;
  phone: string;
  instagram: string;
  appUrl: string;
  spotify?: string;
  youtube?: string;
  facebook?: string;
  tiktok?: string;
  email: string;
  googleCalendarId?: string;
  googleApiKey?: string;
  facebookAccessToken?: string;
  facebookPixelId?: string;
  manualBookedDates?: string[];
}
