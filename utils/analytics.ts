/**
 * Google Analytics 4 (GA4) Tracking Utility
 * Measurement ID: G-J2H17DYTTE
 * Production: https://www.djedney.com.br/
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Generic safe event dispatcher to GA4
 */
export const trackGA4Event = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, params);
    } catch (err) {
      console.warn('[GA4] Event dispatch error:', err);
    }
  }
};

/**
 * 1. WhatsApp Lead Conversion Tracking (Recommended GA4 Event)
 * Fired whenever a visitor initiates a WhatsApp contact.
 */
export const trackWhatsAppLead = (buttonLocation: string) => {
  trackGA4Event('generate_lead', {
    lead_source: 'website',
    contact_method: 'whatsapp',
    button_location: buttonLocation,
  });
};

/**
 * 2. Package Interest Tracking (select_package)
 * Fired when a user selects or requests a specific package CTA.
 * Also triggers generate_lead if WhatsApp is opened.
 */
export const trackPackageSelection = (
  packageName: string,
  packagePrice: string,
  buttonLocation: string
) => {
  trackGA4Event('select_package', {
    package_name: packageName,
    package_price: packagePrice,
    button_location: buttonLocation,
  });
  trackWhatsAppLead(buttonLocation);
};

/**
 * 3. Custom Package Tracking (custom_package_click)
 * Fired for the "Seu evento, do seu jeito" CTA.
 * Also triggers generate_lead since it opens WhatsApp.
 */
export const trackCustomPackage = (buttonLocation: string = 'custom_package') => {
  trackGA4Event('custom_package_click', {
    button_location: buttonLocation,
  });
  trackWhatsAppLead(buttonLocation);
};

/**
 * 4. YouTube Short Video Click (short_video_click)
 * Fired when a visitor plays/clicks a Short video.
 */
export const trackShortVideoClick = (
  videoTitle: string,
  videoUrl: string,
  videoPosition: number
) => {
  trackGA4Event('short_video_click', {
    video_title: videoTitle,
    video_url: videoUrl,
    video_position: videoPosition,
  });
};

/**
 * 5. YouTube Channel Click (youtube_channel_click)
 * Fired for "Ver mais Shorts no YouTube" button.
 */
export const trackYouTubeChannelClick = (buttonLocation: string = 'shorts_section') => {
  trackGA4Event('youtube_channel_click', {
    button_location: buttonLocation,
  });
};

/**
 * 6. Social Media Tracking (social_click)
 * Fired when a user clicks on social links (Instagram, YouTube, TikTok, Facebook).
 */
export const trackSocialClick = (platform: 'instagram' | 'youtube' | 'tiktok' | 'facebook') => {
  trackGA4Event('social_click', {
    platform: platform,
  });
};
