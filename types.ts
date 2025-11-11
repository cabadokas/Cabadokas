export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  images: string[];
  affiliateLink: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  author: string;
  content: string;
}

export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

export interface SiteSettings {
  seo: {
    home: SEOConfig;
    about: SEOConfig;
    products: SEOConfig;
    contact: SEOConfig;
    // Fix: Add blog SEO configuration to the site settings type.
    blog: SEOConfig;
  };
}

export interface SiteContent {
  home: {
    heroTitle: string;
    heroSubtitle: string;
    introText: string;
  };
  about: {
    title: string;
    mission: string;
    vision: string;
  };
}

export interface SocialLink {
  name: 'Facebook' | 'X' | 'Instagram' | 'LinkedIn' | 'YouTube' | 'Pinterest' | 'Whatsapp' | 'Tiktok';
  href: string;
}

export interface AppContextType {
  products: Product[];
  posts: Post[];
  siteContent: SiteContent;
  siteSettings: SiteSettings;
  socialLinks: SocialLink[];
}