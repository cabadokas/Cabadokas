import React from 'react';
import { useAppContext } from '../context/AppContext';

const AdminDashboard: React.FC = () => {
  const { products, posts } = useAppContext();

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">Admin Dashboard</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Manage your site's content and settings.</p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Site Management</h2>
                <p>This is where you can manage products, blog posts, site content, and settings. This feature is currently under construction.</p>
                {/* TODO: Add forms and controls to edit context data */}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-serif font-semibold text-brand-dark mb-2">Current Stats</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li>Products: {products.length}</li>
                    <li>Blog Posts: {posts.length}</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
