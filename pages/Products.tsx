import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import Helmet from '../components/Helmet';
import { Search } from 'lucide-react';

const Products: React.FC = () => {
  const { products, siteSettings } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const seo = siteSettings.seo.products;

  // Fix: Explicitly type the useMemo hook to ensure `categories` is a string array.
  // This prevents TypeScript from inferring `unknown` for the category variable
  // during mapping, which caused type errors for the `key`, `value`, and child props.
  const categories = useMemo<string[]>(() => {
    const allCategories = products.map(p => p.category);
    return ['All', ...Array.from(new Set(allCategories))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let tempProducts = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      tempProducts = tempProducts.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const lowercasedQuery = searchQuery.toLowerCase();
      tempProducts = tempProducts.filter(p =>
        p.name.toLowerCase().includes(lowercasedQuery) ||
        p.description.toLowerCase().includes(lowercasedQuery)
      );
    }
    
    return tempProducts;
  }, [products, selectedCategory, searchQuery]);

  return (
    <>
      <Helmet 
        title={seo.metaTitle}
        description={seo.metaDescription}
        keywords={seo.metaKeywords}
      />
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">Our Curated Products</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">A selection of our favorite products to enhance your beauty and wellness routine.</p>
          </div>

          <div className="mb-12 flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-64 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pl-10 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                aria-label="Search products"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700">
                <Search size={20} />
              </div>
            </div>

            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none w-64 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                aria-label="Filter products by category"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;