import React from 'react';
import { useAppContext } from '../context/AppContext';
import PostCard from '../components/PostCard';
import Helmet from '../components/Helmet';
import LoadingSpinner from '../components/ai/LoadingSpinner';

const Blog: React.FC = () => {
  const { posts, postsLoading, siteSettings } = useAppContext();
  const seo = siteSettings.seo.blog;

  return (
    <>
      <Helmet 
        title={seo.metaTitle}
        description={seo.metaDescription}
        keywords={seo.metaKeywords}
      />
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">Our Blog</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Insights, tips, and stories on beauty, wellness, and more.</p>
          </div>
          
          {postsLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner text="Loading Articles..." />
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">No articles found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;