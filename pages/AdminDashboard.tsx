import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { SOCIAL_ICON_MAP } from '../constants';

const AdminDashboard: React.FC = () => {
  const { products, posts, socialLinks, setSocialLinks } = useAppContext();
  
  const [localSocialLinks, setLocalSocialLinks] = useState([...socialLinks.map(link => ({...link}))]);

  const handleSocialLinkChange = (index: number, value: string) => {
    const newLinks = [...localSocialLinks];
    newLinks[index].href = value;
    setLocalSocialLinks(newLinks);
  };

  const handleSaveSocialLinks = (e: React.FormEvent) => {
    e.preventDefault();
    setSocialLinks(localSocialLinks);
    alert('Social links updated!');
  };


  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">Admin Dashboard</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Manage your site's content and settings.</p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Manage Social Links</h2>
                <form onSubmit={handleSaveSocialLinks} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {localSocialLinks.map((link, index) => (
                            <div key={link.name}>
                                <label htmlFor={`social-${link.name}`} className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                                    {React.cloneElement(SOCIAL_ICON_MAP[link.name], { size: 18, className: "mr-2" })}
                                    {link.name}
                                </label>
                                <input 
                                    type="url" 
                                    id={`social-${link.name}`} 
                                    value={link.href} 
                                    onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary"
                                    placeholder={`https://...`}
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-brand-dark text-white py-2 px-4 rounded-md font-semibold hover:bg-brand-primary transition-colors mt-2">
                            Save Social Links
                        </button>
                    </div>
                </form>
            </div>
            
             <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-serif font-semibold text-brand-dark mb-2">Current Stats</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li>Products: {products.length}</li>
                    <li>Blog Posts (from Blogger): {posts.length}</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;