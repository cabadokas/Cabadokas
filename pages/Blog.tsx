
import React from 'react';
import { useAppContext } from '../context/AppContext';
import PostCard from '../components/PostCard';

const Blog: React.FC = () => {
  const { posts } = useAppContext();

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">Our Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Insights, tips, and stories on beauty, wellness, and more.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
   