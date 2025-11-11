
import React from 'react';
import type { Post } from '../types';
import { ArrowRight } from 'lucide-react';
import { BLOGGER_LINK } from '../constants';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 group">
      <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2">{post.date} by {post.author}</p>
        <h3 className="text-xl font-serif font-semibold text-brand-dark mb-3">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
        <a href={BLOGGER_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary hover:text-brand-accent transition-colors flex items-center">
          Read More <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default PostCard;