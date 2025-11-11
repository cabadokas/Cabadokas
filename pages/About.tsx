
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Target, Eye } from 'lucide-react';

const About: React.FC = () => {
  const { siteContent } = useAppContext();

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">{siteContent.about.title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Empowering women through beauty, health, and knowledge.</p>
        </div>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-brand-secondary p-8 rounded-lg shadow-md">
            <div className="flex items-center text-brand-accent mb-4">
              <Target size={32} className="mr-3" />
              <h2 className="text-2xl font-serif font-semibold text-brand-dark">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{siteContent.about.mission}</p>
          </div>
          <div className="bg-brand-secondary p-8 rounded-lg shadow-md">
            <div className="flex items-center text-brand-accent mb-4">
              <Eye size={32} className="mr-3" />
              <h2 className="text-2xl font-serif font-semibold text-brand-dark">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{siteContent.about.vision}</p>
          </div>
        </div>
        
        <div className="mt-20 text-center">
            <img src="https://picsum.photos/seed/aboutus/1200/400" alt="Team behind Cabadokas" className="rounded-lg shadow-xl mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default About;
   