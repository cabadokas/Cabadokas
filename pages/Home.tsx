import React from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';
import Helmet from '../components/Helmet';
import { BLOGGER_LINK } from '../constants';

const Home: React.FC = () => {
  const { products, posts, siteContent, siteSettings } = useAppContext();
  const featuredProducts = products.slice(0, 4);
  const latestArticles = posts.slice(0, 3);
  const seo = siteSettings.seo.home;

  return (
    <>
      <Helmet 
        title={seo.metaTitle}
        description={seo.metaDescription}
        keywords={seo.metaKeywords}
      />
      <div className="bg-brand-light">
        {/* Hero Section */}
        <section className="relative bg-brand-secondary py-20 md:py-32 text-center text-brand-dark">
           <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{backgroundImage: "url('https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"}}></div>
          <div className="container mx-auto px-6 relative">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{siteContent.home.heroTitle}</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">{siteContent.home.heroSubtitle}</p>
            <Link to="/products" className="bg-brand-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-accent transition-transform duration-300 inline-block transform hover:scale-105">
              Shop Now
            </Link>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-serif font-semibold mb-4">Welcome to Cabadokas</h2>
            <p className="max-w-3xl mx-auto text-gray-700">{siteContent.home.introText}</p>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-serif font-semibold text-center mb-12">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/products" className="bg-brand-dark text-white px-6 py-3 rounded-md font-semibold hover:bg-brand-primary transition-colors">
                View All Products
              </Link>
            </div>
          </div>
        </section>
        
        {/* Latest Articles Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-serif font-semibold text-center mb-12">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
             <div className="text-center mt-12">
              <a href={BLOGGER_LINK} target="_blank" rel="noopener noreferrer" className="bg-brand-dark text-white px-6 py-3 rounded-md font-semibold hover:bg-brand-primary transition-colors">
                Read More on Blog
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;