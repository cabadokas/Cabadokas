import React, { createContext, useContext, ReactNode } from 'react';
import type { AppContextType, Product, Post, SiteContent, SiteSettings, SocialLink } from '../types';

// Mock Data
const mockProducts: Product[] = [
  { id: '1', name: 'Organic Face Serum', description: 'A rejuvenating serum made with all-natural ingredients.', price: '$49.99', category: 'Skincare', images: ['https://images.unsplash.com/photo-1620916566398-39f168a27e43?q=80&w=1887&auto=format&fit=crop', 'https://images.unsplash.com/photo-1598440947619-2c35fc93c9ad?q=80&w=1887&auto=format&fit=crop'], affiliateLink: '#' },
  { id: '2', name: 'Silk Sleep Mask', description: 'Block out light for a deeper, more restful sleep.', price: '$24.99', category: 'Wellness', images: ['https://images.unsplash.com/photo-1616474244400-09b2b2b1a8ce?q=80&w=1887&auto=format&fit=crop'], affiliateLink: '#' },
  { id: '3', name: 'Herbal Detox Tea', description: 'A blend of herbs to cleanse and revitalize your body.', price: '$19.99', category: 'Health', images: ['https://images.unsplash.com/photo-1576092762791-d02d11074036?q=80&w=1887&auto=format&fit=crop'], affiliateLink: '#' },
  { id: '4', name: 'Aromatherapy Diffuser', description: 'Create a calming atmosphere with your favorite essential oils.', price: '$39.99', category: 'Home', images: ['https://images.unsplash.com/photo-1620150244383-a9d7a22026e6?q=80&w=1887&auto=format&fit=crop', 'https://images.unsplash.com/photo-1617963321593-941842c1b402?q=80&w=1887&auto=format&fit=crop'], affiliateLink: '#' },
  { id: '5', name: 'Vitamin C Boost', description: 'High-potency Vitamin C for immune support.', price: '$29.99', category: 'Supplements', images: [], affiliateLink: '#' },
  { id: '6', name: 'Collagen Peptides', description: 'Supports healthy hair, skin, nails, and joints.', price: '$45.00', category: 'Supplements', images: ['https://images.unsplash.com/photo-1599819958461-125d0c2c3175?q=80&w=1887&auto=format&fit=crop', 'https://images.unsplash.com/photo-1588665829633-874b7c330f8f?q=80&w=1887&auto=format&fit=crop'], affiliateLink: '#' },
];

const mockPosts: Post[] = [
    { id: '1', title: 'The Ultimate Guide to a Morning Skincare Routine', excerpt: 'Discover the steps to a perfect morning skincare routine that will leave your skin glowing all day long.', imageUrl: 'https://images.unsplash.com/photo-1562912384-345091658498?q=80&w=1892&auto=format&fit=crop', date: 'October 26, 2023', author: 'Jane Doe', content: '' },
    { id: '2', title: '5 Natural Ways to Boost Your Energy Levels', excerpt: 'Feeling sluggish? These five natural tips will help you boost your energy without reaching for that third cup of coffee.', imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop', date: 'October 22, 2023', author: 'John Smith', content: '' },
    { id: '3', title: 'Mindfulness and Meditation for Beginners', excerpt: 'Learn the basics of mindfulness and meditation to reduce stress and improve your overall well-being.', imageUrl: 'https://images.unsplash.com/photo-1506126613408-4e0523735359?q=80&w=2070&auto=format&fit=crop', date: 'October 18, 2023', author: 'Jane Doe', content: '' },
];

const mockSiteContent: SiteContent = {
    home: {
        heroTitle: "Embrace Your Natural Radiance",
        heroSubtitle: "Discover curated products and insightful articles for a healthier, more beautiful you. Your journey to wellness starts here.",
        introText: "Cabadokas is a sanctuary for those who seek to nurture their body and soul. We believe in the power of nature and the importance of self-care. Explore our handpicked selection of beauty, health, and wellness products, and dive into our blog for tips and inspiration."
    },
    about: {
        title: "About Cabadokas",
        mission: "Our mission is to empower women by providing high-quality, reliable information and products for beauty, health, and wellness. We strive to be a trusted companion on your journey to self-discovery and well-being.",
        vision: "We envision a world where every woman feels confident, healthy, and beautiful from the inside out. We aim to build a supportive community that celebrates authenticity and holistic living."
    }
};

const mockSiteSettings: SiteSettings = {
    seo: {
        home: { metaTitle: 'Cabadokas | Beauty, Health & Wellness', metaDescription: 'Your trusted source for beauty, health, and wellness inspiration and products.', metaKeywords: 'beauty, health, wellness, skincare, supplements' },
        about: { metaTitle: 'About Us | Cabadokas', metaDescription: 'Learn about the mission and vision of Cabadokas.', metaKeywords: 'about us, mission, vision, wellness blog' },
        products: { metaTitle: 'Products | Cabadokas', metaDescription: 'A selection of our favorite products to enhance your beauty and wellness routine.', metaKeywords: 'products, skincare, health supplements, wellness items' },
        contact: { metaTitle: 'Contact Us | Cabadokas', metaDescription: "Get in touch with the Cabadokas team.", metaKeywords: 'contact, support, inquiry' },
        // Fix: Add blog SEO configuration to the mock site settings data.
        blog: { metaTitle: 'Blog | Cabadokas', metaDescription: 'Read our latest articles on beauty, health, and wellness.', metaKeywords: 'blog, articles, beauty tips, wellness advice' }
    }
};

const mockSocialLinks: SocialLink[] = [
    { name: 'Facebook', href: '#' },
    { name: 'Whatsapp', href: 'https://wa.me/1234567890' },
    { name: 'Instagram', href: '#' },
    { name: 'X', href: '#' },
    { name: 'Pinterest', href: '#' },
    { name: 'Tiktok', href: '#' },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const value: AppContextType = {
    products: mockProducts,
    posts: mockPosts,
    siteContent: mockSiteContent,
    siteSettings: mockSiteSettings,
    socialLinks: mockSocialLinks,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};