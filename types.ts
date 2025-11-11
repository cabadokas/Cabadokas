
export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  affiliateLink: string;
  price: string;
  category: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
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

export interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

export interface SiteSettings {
  apiKeys: {
    googleAnalytics: string;
  },
  seo: {
    home: SeoSettings;
    about: SeoSettings;
    blog: SeoSettings;
    products: SeoSettings;
    contact: SeoSettings;
  }
}

export interface SocialLink {
  name: string;
  href: string;
}
