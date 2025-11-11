import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { generateContent } from '../services/geminiService';
import type { SiteContent, Product, Post, SiteSettings, SocialLink } from '../types';

const AdminDashboard: React.FC = () => {
  const { 
    siteContent, setSiteContent, 
    products, setProducts, 
    posts, setPosts, 
    siteSettings, setSiteSettings,
    socialLinks, setSocialLinks
  } = useAppContext();

  const [editableContent, setEditableContent] = useState<SiteContent>(siteContent);
  const [editableSettings, setEditableSettings] = useState<SiteSettings>(siteSettings);
  const [editableSocialLinks, setEditableSocialLinks] = useState<SocialLink[]>(socialLinks);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const [activeTab, setActiveTab] = useState('content');
  const [aiLoading, setAiLoading] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  const handleContentChange = (section: keyof SiteContent, field: string, value: string) => {
    setEditableContent(prev => ({
      ...prev,
      [section]: {
        // @ts-ignore
        ...prev[section],
        [field]: value
      }
    }));
  };
  
  const handleSettingsChange = (section: keyof SiteSettings, field: string, value: string) => {
    setEditableSettings(prev => ({
        ...prev,
        [section]: {
            // @ts-ignore
            ...prev[section],
            [field]: value,
        }
    }));
  };
  
  const handleSocialLinkChange = (index: number, value: string) => {
    const newLinks = [...editableSocialLinks];
    newLinks[index].href = value;
    setEditableSocialLinks(newLinks);
  };
  
  const handleSaveSocialLinks = () => {
    const errors: { [key: string]: string } = {};
    const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*|#|^\/[^\s]*)$/i;

    editableSocialLinks.forEach(link => {
        if (!urlRegex.test(link.href)) {
            errors[link.name] = 'Please enter a valid URL (e.g., https://...), a relative path (e.g., /about), or #.';
        }
    });

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
        setSocialLinks(editableSocialLinks);
        alert('Social links updated successfully!');
    }
  };

  const handleSaveContent = () => {
    setSiteContent(editableContent);
    alert('Site content updated!');
  };
  
  const handleSaveSettings = () => {
      setSiteSettings(editableSettings);
      alert('Site settings updated!');
  }
  
  const generateProductDescription = async () => {
      if (!productToEdit) return;
      setAiLoading(true);
      const prompt = `Generate a compelling, short e-commerce product description for a product named "${productToEdit.name}". Focus on its benefits for women's beauty or health. The description should be about 20-30 words.`;
      const description = await generateContent(prompt);
      setProductToEdit(prev => prev ? {...prev, description} : null);
      setAiLoading(false);
  };
  
  const handleProductUpdate = (e: React.FormEvent) => {
      e.preventDefault();
      if (!productToEdit) return;
      setProducts(products.map(p => p.id === productToEdit.id ? productToEdit : p));
      setProductToEdit(null);
      alert('Product updated!');
  };

  const handlePostUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postToEdit) return;
    setPosts(posts.map(p => p.id === postToEdit.id ? postToEdit : p));
    setPostToEdit(null);
    alert('Post updated!');
  };

  const handleConfirmDeletePost = () => {
      if (!postToDelete) return;
      setPosts(posts.filter(p => p.id !== postToDelete.id));
      setPostToDelete(null);
      alert('Post deleted!');
  };

  const renderContentEditor = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4 text-brand-dark">Homepage Content</h3>
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">Hero Title</label>
            <input type="text" value={editableContent.home.heroTitle} onChange={(e) => handleContentChange('home', 'heroTitle', e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Hero Subtitle</label>
            <textarea value={editableContent.home.heroSubtitle} onChange={(e) => handleContentChange('home', 'heroSubtitle', e.target.value)} className="w-full p-2 border rounded" rows={3}></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Intro Text</label>
            <textarea value={editableContent.home.introText} onChange={(e) => handleContentChange('home', 'introText', e.target.value)} className="w-full p-2 border rounded" rows={4}></textarea>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4 text-brand-dark">About Page Content</h3>
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">Page Title</label>
            <input type="text" value={editableContent.about.title} onChange={(e) => handleContentChange('about', 'title', e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mission Statement</label>
            <textarea value={editableContent.about.mission} onChange={(e) => handleContentChange('about', 'mission', e.target.value)} className="w-full p-2 border rounded" rows={4}></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Vision Statement</label>
            <textarea value={editableContent.about.vision} onChange={(e) => handleContentChange('about', 'vision', e.target.value)} className="w-full p-2 border rounded" rows={4}></textarea>
          </div>
        </div>
      </div>
       <button onClick={handleSaveContent} className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-accent transition-colors">Save Content Changes</button>
    </div>
  );
  
  const renderProductEditor = () => (
      <div>
        <h3 className="text-xl font-semibold mb-4 text-brand-dark">Manage Products</h3>
        <div className="space-y-2">
            {products.map(product => (
                <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>{product.name}</span>
                    <button onClick={() => setProductToEdit(product)} className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
                </div>
            ))}
        </div>
      </div>
  );

  const renderBlogEditor = () => (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-brand-dark">Manage Blog Posts</h3>
      <p className="text-sm text-gray-500 mb-4">Edit categories and tags, or delete posts from your blog.</p>
      <div className="space-y-2">
          {posts.map(post => (
              <div key={post.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{post.title}</span>
                  <div>
                      <button onClick={() => setPostToEdit(post)} className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
                      <button onClick={() => setPostToDelete(post)} className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2">Delete</button>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );

  const renderSocialLinksEditor = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4 text-brand-dark">Social Media Links</h3>
        <p className="text-sm text-gray-500 mb-4">Update the URLs for your social media profiles. Enter '#' for links you want to disable for now.</p>
        <div className="space-y-4">
          {editableSocialLinks.map((link, index) => (
            <div key={link.name}>
              <label className="block text-sm font-medium text-gray-700">{link.name}</label>
              <input
                type="text"
                value={link.href}
                onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                className={`w-full p-2 border rounded mt-1 ${validationErrors[link.name] ? 'border-red-500' : 'border-gray-300'}`}
              />
              {validationErrors[link.name] && <p className="text-red-500 text-xs mt-1">{validationErrors[link.name]}</p>}
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleSaveSocialLinks} className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-accent transition-colors">Save Social Links</button>
    </div>
  );
  
  const renderSettingsEditor = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4 text-brand-dark">API Keys</h3>
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">Google Analytics API Key</label>
            <input type="text" value={editableSettings.apiKeys.googleAnalytics} onChange={(e) => handleSettingsChange('apiKeys', 'googleAnalytics', e.target.value)} className="w-full p-2 border rounded" />
          </div>
        </div>
      </div>
       <button onClick={handleSaveSettings} className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-accent transition-colors">Save Settings</button>
    </div>
  );

  return (
    <div className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-serif font-bold text-brand-dark mb-8">Admin Dashboard</h1>
        
        <div className="flex border-b mb-6 overflow-x-auto">
            <button onClick={() => setActiveTab('content')} className={`py-2 px-4 whitespace-nowrap ${activeTab === 'content' ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-gray-500'}`}>Content</button>
            <button onClick={() => setActiveTab('products')} className={`py-2 px-4 whitespace-nowrap ${activeTab === 'products' ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-gray-500'}`}>Products</button>
            <button onClick={() => setActiveTab('blog')} className={`py-2 px-4 whitespace-nowrap ${activeTab === 'blog' ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-gray-500'}`}>Blog</button>
            <button onClick={() => setActiveTab('social')} className={`py-2 px-4 whitespace-nowrap ${activeTab === 'social' ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-gray-500'}`}>Social</button>
            <button onClick={() => setActiveTab('settings')} className={`py-2 px-4 whitespace-nowrap ${activeTab === 'settings' ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-gray-500'}`}>Settings</button>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
            {activeTab === 'content' && renderContentEditor()}
            {activeTab === 'products' && renderProductEditor()}
            {activeTab === 'blog' && renderBlogEditor()}
            {activeTab === 'social' && renderSocialLinksEditor()}
            {activeTab === 'settings' && renderSettingsEditor()}
        </div>
      </div>
      
      {productToEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <form onSubmit={handleProductUpdate} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg space-y-4">
                  <h4 className="text-lg font-bold">Editing: {productToEdit.name}</h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Product Name</label>
                      <input type="text" value={productToEdit.name} onChange={(e) => setProductToEdit({...productToEdit, name: e.target.value})} className="w-full p-2 border rounded" />
                  </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea value={productToEdit.description} onChange={(e) => setProductToEdit({...productToEdit, description: e.target.value})} className="w-full p-2 border rounded" rows={4}></textarea>
                      <button type="button" onClick={generateProductDescription} disabled={aiLoading} className="mt-2 text-sm bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 disabled:bg-gray-400">
                          {aiLoading ? 'Generating...' : 'Generate with AI ✨'}
                      </button>
                  </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Affiliate Link</label>
                      <input type="text" value={productToEdit.affiliateLink} onChange={(e) => setProductToEdit({...productToEdit, affiliateLink: e.target.value})} className="w-full p-2 border rounded" />
                  </div>
                    <div className="flex justify-end space-x-2">
                      <button type="button" onClick={() => setProductToEdit(null)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                      <button type="submit" className="px-4 py-2 bg-brand-primary text-white rounded-lg">Save Changes</button>
                  </div>
              </form>
          </div>
      )}
      
      {postToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <form onSubmit={handlePostUpdate} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg space-y-4">
                <h4 className="text-lg font-bold">Editing Post: {postToEdit.title}</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input type="text" value={postToEdit.category} onChange={(e) => setPostToEdit({...postToEdit, category: e.target.value})} className="w-full p-2 border rounded" />
                </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                    <input type="text" value={postToEdit.tags.join(', ')} onChange={(e) => setPostToEdit({...postToEdit, tags: e.target.value.split(',').map(tag => tag.trim())})} className="w-full p-2 border rounded" />
                </div>
                  <div className="flex justify-end space-x-2">
                    <button type="button" onClick={() => setPostToEdit(null)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-brand-primary text-white rounded-lg">Save Changes</button>
                </div>
            </form>
        </div>
      )}

      {postToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-center">
                  <h4 className="text-lg font-bold mb-4">Confirm Deletion</h4>
                  <p className="mb-6">Are you sure you want to delete the post titled "{postToDelete.title}"? This action cannot be undone.</p>
                  <div className="flex justify-center space-x-4">
                      <button onClick={() => setPostToDelete(null)} className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
                      <button onClick={handleConfirmDeletePost} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Confirm Delete</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminDashboard;