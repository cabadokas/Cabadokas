import React, { createContext, useContext, ReactNode, useState } from 'react';
import type { AppContextType, Product, Post, SiteContent, SiteSettings, SocialLink, Category } from '../types';

// Initial Data
const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Organic Face Serum', description: 'A rejuvenating serum made with all-natural ingredients.', price: '$49.99', category: 'Skincare', images: ['https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=600'], affiliateLink: '#' },
  { id: '2', name: 'Silk Sleep Mask', description: 'Block out light for a deeper, more restful sleep.', price: '$24.99', category: 'Wellness', images: ['https://images.pexels.com/photos/7936413/pexels-photo-7936413.jpeg?auto=compress&cs=tinysrgb&w=600'], affiliateLink: '#' },
  { id: '3', name: 'Herbal Detox Tea', description: 'A blend of herbs to cleanse and revitalize your body.', price: '$19.99', category: 'Health', images: ['https://images.pexels.com/photos/4113943/pexels-photo-4113943.jpeg?auto=compress&cs=tinysrgb&w=600'], affiliateLink: '#' },
  { id: '4', name: 'Aromatherapy Diffuser', description: 'Create a calming atmosphere with your favorite essential oils.', price: '$39.99', category: 'Home', images: ['https://images.pexels.com/photos/4203063/pexels-photo-4203063.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/4476644/pexels-photo-4476644.jpeg?auto=compress&cs=tinysrgb&w=600'], affiliateLink: '#' },
  { id: '5', name: 'Vitamin C Boost', description: 'High-potency Vitamin C for immune support.', price: '$29.99', category: 'Supplements', images: ['https://images.pexels.com/photos/209459/pexels-photo-209459.jpeg?auto=compress&cs=tinysrgb&w=600'], affiliateLink: '#' },
  { id: '6', name: 'Collagen Peptides', description: 'Supports healthy hair, skin, nails, and joints.', price: '$45.00', category: 'Supplements', images: ['https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600'], affiliateLink: '#' },
];

const INITIAL_CATEGORIES: Category[] = [
    { id: 'cat1', name: 'Skincare' },
    { id: 'cat2', name: 'Wellness' },
    { id: 'cat3', name: 'Nutrition' },
];

const INITIAL_POSTS: Post[] = [
    { id: '1', title: 'The Ultimate Guide to a Morning Skincare Routine', excerpt: 'Discover the steps to a perfect morning skincare routine that will leave your skin glowing all day long.', imageUrl: 'https://images.pexels.com/photos/4041391/pexels-photo-4041391.jpeg?auto=compress&cs=tinysrgb&w=600', date: 'October 26, 2023', author: 'Jane Doe', categoryId: 'cat1', tags: ['Glow', 'Morning Routine'] },
    { id: '2', title: '5 Natural Ways to Boost Your Energy Levels', excerpt: 'Feeling sluggish? These five natural tips will help you boost your energy without the caffeine crash.', imageUrl: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', date: 'October 22, 2023', author: 'John Smith', categoryId: 'cat2', tags: ['Energy', 'Fitness'] },
    { id: '3', title: 'Mindfulness and Meditation for Beginners', excerpt: 'Learn the basics of mindfulness and meditation to reduce stress and improve your overall well-being.', imageUrl: 'https://images.pexels.com/photos/3862601/pexels-photo-3862601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', date: 'October 18, 2023', author: 'Jane Doe', categoryId: 'cat2', tags: ['Stress Relief', 'Meditation'] },
];

const INITIAL_SITE_CONTENT: SiteContent = {
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

const INITIAL_SITE_SETTINGS: SiteSettings = {
    seo: {
        home: { metaTitle: 'Cabadokas | Beauty, Health & Wellness', metaDescription: 'Your trusted source for beauty, health, and wellness inspiration and products.', metaKeywords: 'beauty, health, wellness, skincare, supplements' },
        about: { metaTitle: 'About Us | Cabadokas', metaDescription: 'Learn about the mission and vision of Cabadokas.', metaKeywords: 'about us, mission, vision, wellness blog' },
        products: { metaTitle: 'Products | Cabadokas', metaDescription: 'A selection of our favorite products to enhance your beauty and wellness routine.', metaKeywords: 'products, skincare, health supplements, wellness items' },
        contact: { metaTitle: 'Contact Us | Cabadokas', metaDescription: "Get in touch with the Cabadokas team.", metaKeywords: 'contact, support, inquiry' },
    }
};

const INITIAL_SOCIAL_LINKS: SocialLink[] = [
    { name: 'Facebook', href: 'https://www.facebook.com/Cabadokas' },
    { name: 'X', href: 'https://www.x.com/Cabadokas' },
    { name: 'Instagram', href: 'https://www.instagram.com/Cabadokas' },
    { name: 'Tiktok', href: 'https://www.tiktok.com/@Cabadokas' },
    { name: 'Discord', href: 'https://discord.com' }, // Discord links are usually invite-based
    { name: 'Snapchat', href: 'https://www.snapchat.com/add/Cabadokas' },
    { name: 'YouTube', href: 'https://www.youtube.com/@Cabadokas' },
    { name: 'Whatsapp', href: 'https://wa.me/1234567890' }, // Requires a phone number
    { name: 'Behance', href: 'https://www.behance.net/Cabadokas' },
    { name: 'Threads', href: 'https://www.threads.net/@Cabadokas' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/Cabadokas' },
    { name: 'Dribbble', href: 'https://www.dribbble.com/Cabadokas' },
    { name: 'Pinterest', href: 'https://www.pinterest.com/Cabadokas' },
    { name: 'Twitch', href: 'https://www.twitch.tv/Cabadokas' },
    { name: 'Telegram', href: 'https://t.me/Cabadokas' },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [siteContent, setSiteContent] = useState(INITIAL_SITE_CONTENT);
  const [siteSettings, setSiteSettings] = useState(INITIAL_SITE_SETTINGS);
  const [socialLinks, setSocialLinks] = useState(INITIAL_SOCIAL_LINKS);

  const value: AppContextType = {
    products, setProducts,
    posts, setPosts,
    categories, setCategories,
    siteContent, setSiteContent,
    siteSettings, setSiteSettings,
    socialLinks, setSocialLinks,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};