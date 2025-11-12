import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Video, X } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (isVideoModalOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'unset';
    }
    return () => {
      body.style.overflow = 'unset';
    };
  }, [isVideoModalOpen]);

  const hasImages = product.images && product.images.length > 0;
  const showCarouselControls = hasImages && product.images.length > 1;

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));
  };
  
  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const openVideoModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsVideoModalOpen(true);
  };

  const PlaceholderImage = () => (
    <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
        <ImageIcon className="text-gray-400" size={48} />
    </div>
  );

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 group">
        <div className="relative">
          {hasImages ? (
              <img src={product.images[currentImageIndex]} alt={`${product.name} - image ${currentImageIndex + 1}`} className="w-full h-56 object-cover" />
          ) : (
              <PlaceholderImage />
          )}
          
          {showCarouselControls && (
              <>
                  <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      aria-label="Previous image"
                  >
                      <ChevronLeft size={24} />
                  </button>
                  <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      aria-label="Next image"
                  >
                      <ChevronRight size={24} />
                  </button>
                   <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                      {product.images.map((_, index) => (
                          <button
                              key={index}
                              onClick={() => goToImage(index)}
                              className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                              aria-label={`Go to image ${index + 1}`}
                          />
                      ))}
                  </div>
              </>
          )}

          {product.videoUrl && (
            <button
              onClick={openVideoModal}
              className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
              aria-label="Play product video"
            >
              <Video size={20} />
            </button>
          )}

          <div className="absolute top-2 right-2 bg-brand-primary text-white text-xs font-bold px-2 py-1 rounded-full z-10">{product.category}</div>
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
      
      {isVideoModalOpen && product.videoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={() => setIsVideoModalOpen(false)} role="dialog" aria-modal="true">
          <div className="relative bg-black max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsVideoModalOpen(false)} 
              className="absolute -top-3 -right-3 z-10 bg-white text-black p-1.5 rounded-full shadow-lg hover:bg-gray-200 transition-colors"
              aria-label="Close video player"
            >
              <X size={24} />
            </button>
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <iframe
                    src={`${product.videoUrl}?autoplay=1`}
                    title={`${product.name} video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;