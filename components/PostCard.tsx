import React from 'react';
import type { Post } from '../types';
import { ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const excerpt = post.content.substring(0, 120) + '...';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl group flex flex-col">
      <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-sm text-gray-500 mb-1">{post.date} &bull; {post.category}</p>
        <h3 className="text-xl font-serif font-semibold text-brand-dark mb-3">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{excerpt}</p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="inline-block bg-gray-200 text-gray-700 text-xs font-medium mr-2 px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <a href="#/blog" className="text-brand-primary font-semibold hover:text-brand-dark transition-colors mt-auto inline-flex items-center">
          Read More <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default PostCard;