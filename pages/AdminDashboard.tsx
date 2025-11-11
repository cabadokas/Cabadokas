import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import type { Post } from '../types';
import { SOCIAL_ICON_MAP } from '../constants';

const AdminDashboard: React.FC = () => {
  const { products, posts, setPosts, categories, socialLinks, setSocialLinks } = useAppContext();
  
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    imageUrl: '',
    author: 'Admin',
    categoryId: categories[0]?.id || '',
    tags: ''
  });

  const [localSocialLinks, setLocalSocialLinks] = useState([...socialLinks.map(link => ({...link}))]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.excerpt || !newPost.imageUrl || !newPost.categoryId) {
        alert("Please fill in all required fields.");
        return;
    }
    const postToAdd: Post = {
        id: `post-${Date.now()}`,
        ...newPost,
        tags: newPost.tags.split(',').map(tag => tag.trim()),
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    setPosts(prevPosts => [postToAdd, ...prevPosts]);
    // Reset form
    setNewPost({
        title: '',
        excerpt: '',
        imageUrl: '',
        author: 'Admin',
        categoryId: categories[0]?.id || '',
        tags: ''
    });
  };

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
                <h2 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Add New Blog Post</h2>
                <form onSubmit={handleAddPost} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" name="title" id="title" value={newPost.title} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary" required />
                    </div>
                     <div>
                        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Excerpt</label>
                        <textarea name="excerpt" id="excerpt" rows={3} value={newPost.excerpt} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary" required></textarea>
                    </div>
                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input type="url" name="imageUrl" id="imageUrl" value={newPost.imageUrl} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                            <input type="text" name="author" id="author" value={newPost.author} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary" required />
                        </div>
                        <div>
                            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category</label>
                            <select name="categoryId" id="categoryId" value={newPost.categoryId} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary" required>
                                <option value="" disabled>Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                        <input type="text" name="tags" id="tags" value={newPost.tags} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary" />
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-brand-dark text-white py-2 px-4 rounded-md font-semibold hover:bg-brand-primary transition-colors">
                            Add Post
                        </button>
                    </div>
                </form>
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