
import type { Post } from '../types';

const API_KEY = process.env.BLOGGER_API_KEY;
const BLOG_ID = '6862301131153123689'; // cabadokas.blogspot.com

// Mock data to display when API key is not available
const MOCK_POSTS: Post[] = [
  {
    id: 'mock-1',
    title: 'The Ultimate Guide to Morning Skincare',
    excerpt: 'Discover the steps to a perfect morning skincare routine that will leave your skin glowing all day long.',
    imageUrl: 'https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'October 25, 2023',
    author: 'Emma Solis',
    categoryId: 'Skincare',
    tags: ['Morning Routine', 'Glow', 'Tips'],
    url: '#'
  },
  {
    id: 'mock-2',
    title: '5 Superfoods for Natural Radiance',
    excerpt: 'Boost your inner glow with these five nutrient-packed superfoods that promote healthy skin and hair from the inside out.',
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'October 20, 2023',
    author: 'Sarah Jenkins',
    categoryId: 'Nutrition',
    tags: ['Health', 'Diet', 'Organic'],
    url: '#'
  },
  {
    id: 'mock-3',
    title: 'Mindfulness for Busy Women',
    excerpt: 'Simple mindfulness techniques you can incorporate into your busy schedule to reduce stress and find balance.',
    imageUrl: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'October 15, 2023',
    author: 'Dr. Maya Lin',
    categoryId: 'Wellness',
    tags: ['Mindfulness', 'Stress Relief', 'Balance'],
    url: '#'
  }
];

// Helper to parse HTML content from Blogger
const parsePostContent = (htmlContent: string) => {
    const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
    
    // Find the first image URL or use a fallback
    const firstImage = doc.querySelector('img');
    const imageUrl = firstImage ? firstImage.src : 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

    // Create a text excerpt by stripping HTML tags and truncating
    const textContent = doc.body.textContent || "";
    const excerpt = textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '');

    return { imageUrl, excerpt };
};

export const fetchPosts = async (): Promise<Post[]> => {
    if (!API_KEY) {
        // Return mock data to ensure the UI looks good in preview/demo mode without an API key
        console.log("Blogger API key not found. Using mock data.");
        return MOCK_POSTS;
    }
    
    try {
        const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&fetchImages=true&maxResults=20`);
        if (!response.ok) {
            const errorData = await response.json();
            // If fetch fails (e.g. quota exceeded or invalid key), fall back to mock data
            console.warn('Failed to fetch posts from Blogger, using mock data:', errorData.error.message);
            return MOCK_POSTS;
        }
        
        const data = await response.json();
        
        if (!data.items || data.items.length === 0) {
            return [];
        }

        const posts: Post[] = data.items.map((item: any) => {
            const { imageUrl, excerpt } = parsePostContent(item.content);
            const formattedDate = new Date(item.published).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            return {
                id: item.id,
                title: item.title,
                url: item.url,
                excerpt,
                imageUrl,
                date: formattedDate,
                author: item.author.displayName,
                tags: item.labels || [],
                // Use the first label as a category, with a fallback
                categoryId: item.labels?.[0] || 'General', 
            };
        });
        
        return posts;
    } catch (error) {
        console.error("Error fetching Blogger posts:", error);
        // Fallback to mock data on network error
        return MOCK_POSTS;
    }
};
