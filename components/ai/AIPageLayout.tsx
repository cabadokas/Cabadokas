
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface AIPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const AIPageLayout: React.FC<AIPageLayoutProps> = ({ title, description, children }) => {
  return (
    <div className="py-12 bg-gray-50 min-h-[calc(100vh-150px)]">
      <div className="container mx-auto px-6">
        <Link to="/studio" className="inline-flex items-center text-brand-primary hover:text-brand-dark mb-6 font-semibold">
          <ArrowLeft className="mr-2" size={20} />
          Back to AI Studio
        </Link>
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">{title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
export default AIPageLayout;
