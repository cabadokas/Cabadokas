// Fix: Add import for React types to resolve 'Cannot find namespace React' error.
import type { Dispatch, SetStateAction } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  images: string[];
  affiliateLink: string;
  videoUrl?: string;
}

export interface Category {
  id:string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  author: string;
  categoryId: string;
  tags: string[];
  url: string;
}


export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

export interface SiteSettings {
  seo: {
    [key: string]: SEOConfig;
    home: SEOConfig;
    about: SEOConfig;
    products: SEOConfig;
    contact: SEOConfig;
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

export type SocialLinkName = 
  'Facebook' | 
  'X' | 
  'Instagram' | 
  'Tiktok' | 
  'Discord' |
  'Snapchat' |
  'YouTube' |
  'Whatsapp' |
  'Behance' |
  'Threads' |
  'LinkedIn' |
  'Dribbble' |
  'Pinterest' |
  'Twitch' |
  'Telegram';

export interface SocialLink {
  name: SocialLinkName;
  href: string;
}

export interface AppContextType {
  products: Product[];
  // Fix: Use imported Dispatch and SetStateAction types.
  setProducts: Dispatch<SetStateAction<Product[]>>;
  posts: Post[];
  // Fix: Use imported Dispatch and SetStateAction types.
  setPosts: Dispatch<SetStateAction<Post[]>>;
  postsLoading: boolean;
  categories: Category[];
  // Fix: Use imported Dispatch and SetStateAction types.
  setCategories: Dispatch<SetStateAction<Category[]>>;
  siteContent: SiteContent;
  // Fix: Use imported Dispatch and SetStateAction types.
  setSiteContent: Dispatch<SetStateAction<SiteContent>>;
  siteSettings: SiteSettings;
  // Fix: Use imported Dispatch and SetStateAction types.
  setSiteSettings: Dispatch<SetStateAction<SiteSettings>>;
  socialLinks: SocialLink[];
  // Fix: Use imported Dispatch and SetStateAction types.
  setSocialLinks: Dispatch<SetStateAction<SocialLink[]>>;
}