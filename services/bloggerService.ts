import type { Post } from '../types';

const API_KEY = process.env.BLOGGER_API_KEY;
const BLOG_ID = '6862301131153123689'; // cabadokas.blogspot.com

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
        console.warn("Blogger API key not found. Blog posts cannot be loaded. Please set the BLOGGER_API_KEY environment variable.");
        return [];
    }
    
    try {
        const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&fetchImages=true&maxResults=20`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error.message || 'Failed to fetch posts from Blogger');
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
        throw error;
    }
};
