export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  images: string[];
  affiliateLink: string;
}

export interface Category {
  id: string;
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

export type SocialLinkName = 'Facebook' | 'X' | 'Instagram' | 'Pinterest' | 'Whatsapp' | 'Tiktok'

export interface SocialLink {
  name: SocialLinkName;
  href: string;
}

export interface AppContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  siteContent: SiteContent;
  setSiteContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  socialLinks: SocialLink[];
  setSocialLinks: React.Dispatch<React.SetStateAction<SocialLink[]>>;
}