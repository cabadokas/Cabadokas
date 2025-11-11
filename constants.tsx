
import React from 'react';
import type { Product, Post, SiteContent, SiteSettings, SocialLink } from './types';
import { Facebook, Instagram, X, Youtube } from 'lucide-react';

export const AFFILIATE_LINKS = {
  AMAZON: 'https://amzn.to/4qXSsyE',
  DIGISTORE: 'https://www.advancedbionutritionals.com/DS24/Advanced-Amino/Muscle-Mass-Loss/HD.htm#aff=Profitsoagrty',
};

export const BLOGGER_LINK = 'https://cabadokas.blogspot.com/';

// Create a custom Pinterest icon component to bypass the import issue
const PinterestIcon: React.FC<{ size?: number;[key: string]: any }> = ({ size = 20, ...props }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        {...props}
    >
        <path d="M12.5 12c0-2.5 2-4.5 4.5-4.5.7 0 1.4.2 2 .5.5.3.8.8.8 1.4 0 .9-.5 1.7-1.1 2.3-.6.6-1.5 1-2.2 1.3-1.1.4-2.4.6-3.5.5.1-.2.2-.4.3-.6.2-.4.3-.8.4-1.2l.3-1.2c.2-.7.6-1.3 1-1.9.5-.6 1.2-1 2-1.2.2 0 .4 0 .6.2.2.2.3.4.3.7 0 .2-.1.5-.2.7-.2.5-.5 1-.9 1.4-.4.4-1 .8-1.6.9-.2.1-.4 0-.6-.1-.2-.1-.3-.3-.3-.5 0-.2.1-.4.2-.6l.2-.5c.2-.5.4-1 .6-1.5.2-1.1-1.7-1-1.7-2.9 0-1 .4-1.9 1.1-2.6.7-.6 1.6-1 2.6-1 .9 0 1.8.3 2.5.8.7.5 1.2 1.3 1.4 2.1.2.8.1 1.7-.2 2.5-.3.8-.8 1.5-1.4 2.1-.6.6-1.4 1.1-2.2 1.4-1.2.5-2.6.7-4 .5-1-.1-1.9-.4-2.8-.8-1-.4-1.9-1-2.7-1.7-.8-.7-1.5-1.6-2-2.5-.5-.9-.8-2-.8-3.1 0-1.2.3-2.4 1-3.5s1.6-2 2.8-2.6c1.1-.6 2.4-.9 3.7-.9 1.6 0 3.1.5 4.4 1.3 1.3.9 2.3 2.1 2.9 3.5.6 1.4.8 3 .5 4.5-.3 1.5-1 2.9-2.1 4-1.1 1.1-2.5 1.9-4.1 2.3s-3.3.4-4.9-.2c-1.6-.6-3-1.6-4-2.9-1.1-1.3-1.7-2.9-1.7-4.6 0-2.1.8-4.1 2.2-5.6 1.4-1.5 3.3-2.4 5.3-2.4.7 0 1.4 0 2.1.2"/>
    </svg>
);

// Create a custom Tiktok icon component to bypass the import issue
const TiktokIcon: React.FC<{ size?: number;[key: string]: any }> = ({ size = 20, ...props }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        {...props}
    >
        <path d="M12 12a4 4 0 1 0 4 4v-12a5 5 0 0 0-5-5" />
    </svg>
);

export const SOCIAL_ICON_MAP: { [key: string]: React.ReactElement } = {
  'Facebook': <Facebook size={20} />,
  'Instagram': <Instagram size={20} />,
  'Twitter': <X size={20} />,
  'Pinterest': <PinterestIcon size={20} />,
  'Tiktok': <TiktokIcon size={20} />,
  'Youtube': <Youtube size={20} />,
};

export const INITIAL_SOCIAL_LINKS: SocialLink[] = [
  { name: 'Facebook', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'Twitter', href: '#' },
  { name: 'Pinterest', href: '#' },
  { name: 'Tiktok', href: '#' },
  { name: 'Youtube', href: '#' },
];


export const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Pro-Collagen Cleansing Balm', description: 'A nourishing cleansing balm that melts away makeup, daily pollutants and impurities for a soft and glowing complexion.', image: 'https://picsum.photos/seed/product1/400/400', affiliateLink: AFFILIATE_LINKS.AMAZON, price: '$68.00', category: 'Skincare' },
  { id: '2', name: 'Advanced Amino Formula', description: 'Supports muscle mass and strength, especially for those over 40. Helps maintain a healthy, active lifestyle.', image: 'https://picsum.photos/seed/product2/400/400', affiliateLink: AFFILIATE_LINKS.DIGISTORE, price: '$49.95', category: 'Health' },
  { id: '3', name: 'SonicGlow Facial Cleansing Brush', description: 'Utilizes sonic vibrations to deeply cleanse pores, remove impurities, and gently exfoliate the skin for a radiant look.', image: 'https://picsum.photos/seed/product3/400/400', affiliateLink: AFFILIATE_LINKS.AMAZON, price: '$89.00', category: 'Beauty Tools' },
  { id: '4', name: 'Herbal Weight Loss Tea', description: 'A natural blend of herbs designed to boost metabolism and support a healthy weight management journey.', image: 'https://picsum.photos/seed/product4/400/400', affiliateLink: AFFILIATE_LINKS.DIGISTORE, price: '$29.99', category: 'Weight Loss' },
];

export const INITIAL_POSTS: Post[] = [
  { id: '1', title: 'The Ultimate Guide to a Flawless Foundation', content: 'Achieving a perfect foundation application is the cornerstone of any great makeup look. It’s about creating a smooth, even canvas that enhances your natural beauty without looking heavy or cakey. This guide will walk you through the essential steps, from skin prep to the final setting spray, ensuring your base is flawless every single time...', image: 'https://picsum.photos/seed/blog1/800/450', author: 'Jane Doe', date: 'October 26, 2023', category: 'Makeup', tags: ['foundation', 'makeup', 'beauty'] },
  { id: '2', title: '5 Must-Have Beauty Tools You Need Right Now', content: 'In the world of beauty, the right tools can make all the difference. While skills and quality products are essential, beauty tools are the secret weapons that help you achieve professional-level results at home. From blending sponges to high-tech cleansing devices, here are five must-have beauty tools that deserve a spot in your collection...', image: 'https://picsum.photos/seed/blog2/800/450', author: 'Emily White', date: 'October 22, 2023', category: 'Beauty Tools', tags: ['tools', 'skincare', 'essentials'] },
  { id: '3', title: 'A Sustainable Approach to Your Beauty Routine', content: 'As we become more conscious of our environmental impact, the beauty industry is undergoing a green revolution. Sustainable beauty is more than just a trend; it’s a movement towards mindful consumption, ethical sourcing, and eco-friendly packaging. Adopting a sustainable approach to your beauty routine doesn’t mean sacrificing quality or luxury. Here’s how you can make your regimen more earth-friendly...', image: 'https://picsum.photos/seed/blog3/800/450', author: 'Chloe Green', date: 'October 18, 2023', category: 'Cosmetics', tags: ['sustainable', 'eco-friendly', 'skincare'] },
];

export const INITIAL_SITE_CONTENT: SiteContent = {
  home: {
    heroTitle: 'Discover Your Inner Radiance',
    heroSubtitle: 'Your ultimate guide to beauty, health, and wellness. Explore expert tips, trusted products, and inspiration to help you shine from the inside out.',
    introText: 'Welcome to Cabadokas, a sanctuary for women dedicated to exploring the worlds of makeup, beauty, health, and holistic wellness. We believe that true beauty is a reflection of self-care and confidence. Here, you’ll find everything you need to enhance your natural glow and lead a healthier, more vibrant life.'
  },
  about: {
    title: 'About Cabadokas',
    mission: 'Our mission is to empower women by providing a trusted and comprehensive resource for all things beauty and wellness. We are committed to curating high-quality content and recommending products that are effective, safe, and align with our values. We aim to build a supportive community where women can learn, share, and feel confident in their choices.',
    vision: 'Our vision is to be the leading online destination for women seeking inspiration and guidance on their beauty and health journeys. We aspire to create a platform that not only informs but also inspires, fostering a culture of self-love, confidence, and holistic well-being for women everywhere.'
  }
};

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  apiKeys: {
    googleAnalytics: ''
  },
  seo: {
    home: { metaTitle: 'Cabadokas | Beauty, Health, and Wellness for Women', metaDescription: 'Your ultimate guide to beauty, health, and wellness.', metaKeywords: 'makeup, beauty, weight loss, cosmetics, health' },
    about: { metaTitle: 'About Cabadokas', metaDescription: 'Learn about our mission and vision.', metaKeywords: 'about us, mission, vision' },
    blog: { metaTitle: 'Blog | Cabadokas', metaDescription: 'Latest articles on beauty and health.', metaKeywords: 'blog, articles, tips' },
    products: { metaTitle: 'Products | Cabadokas', metaDescription: 'Curated beauty and health products.', metaKeywords: 'products, affiliate, skincare' },
    contact: { metaTitle: 'Contact Us | Cabadokas', metaDescription: 'Get in touch with the Cabadokas team.', metaKeywords: 'contact, support, inquiry' },
  }
};
