import React from 'react';
import type { Post } from '../types';
import { ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { categories } = useAppContext();
  // Match by name since categoryId from Blogger is a string label
  const category = categories.find(c => c.name.toLowerCase() === post.categoryId.toLowerCase());

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 group flex flex-col">
      <div className="relative">
        <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />
        {category && (
          <span className="absolute top-2 right-2 bg-brand-accent text-white text-xs font-bold px-2 py-1 rounded-full z-10">{category.name}</span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-sm text-gray-500 mb-2">{post.date} by {post.author}</p>
        <h3 className="text-xl font-serif font-semibold text-brand-dark mb-3">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{post.excerpt}</p>
        <div className="mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="inline-block bg-brand-secondary text-brand-dark text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <a href={post.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary hover:text-brand-accent transition-colors flex items-center mt-auto">
          Read More <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default PostCard;