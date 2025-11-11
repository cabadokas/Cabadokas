
import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 group">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
        <div className="absolute top-2 right-2 bg-brand-primary text-white text-xs font-bold px-2 py-1 rounded-full">{product.category}</div>
      </div>
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-xl font-serif font-semibold text-brand-dark mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-bold text-brand-accent">{product.price}</span>
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-dark text-white px-4 py-2 rounded-md hover:bg-brand-primary transition-colors text-sm font-semibold"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
   