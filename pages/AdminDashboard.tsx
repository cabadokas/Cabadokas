import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Edit, Trash2, PlusCircle, Save, XCircle, Settings, FileText, Share2, Search, Newspaper, Tags } from 'lucide-react';
// Fix: Import the 'SiteSettings' type to resolve type errors.
import type { SocialLink, Category, Post, SEOConfig, SiteSettings } from '../types';

const AdminDashboard: React.FC = () => {
    const { 
        siteContent, setSiteContent, 
        socialLinks, setSocialLinks,
        siteSettings, setSiteSettings,
        posts, setPosts,
        categories, setCategories
    } = useAppContext();
    
    const [activeTab, setActiveTab] = useState('content');

    // Social Links State
    const [editableSocialLinks, setEditableSocialLinks] = useState<SocialLink[]>(socialLinks);
    const [socialErrors, setSocialErrors] = useState<{[key: number]: string}>({});

    // SEO State
    const [editableSeo, setEditableSeo] = useState<SiteSettings['seo']>(siteSettings.seo);
    
    // Blog Posts State
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<Post | null>(null);

    // Categories State
    const [editableCategories, setEditableCategories] = useState<Category[]>(categories);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const handleSocialLinkChange = (index: number, value: string) => {
        const newLinks = [...editableSocialLinks];
        newLinks[index] = { ...newLinks[index], href: value };
        setEditableSocialLinks(newLinks);
    };

    const validateUrl = (url: string) => {
        try {
            if (url.startsWith('/') || url.startsWith('#')) return true;
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }

    const saveSocialLinks = () => {
        const newErrors: {[key: number]: string} = {};
        let hasError = false;
        editableSocialLinks.forEach((link, index) => {
            if (!validateUrl(link.href)) {
                newErrors[index] = 'Invalid URL format.';
                hasError = true;
            }
        });
        setSocialErrors(newErrors);
        if (!hasError) {
            setSocialLinks(editableSocialLinks);
            alert('Social links updated successfully!');
        }
    };

    const handleSeoChange = (page: keyof SiteSettings['seo'], field: keyof SEOConfig, value: string) => {
        setEditableSeo(prev => ({
            ...prev,
            [page]: {
                ...prev[page],
                [field]: value,
            }
        }));
    };

    const saveSeoSettings = () => {
        setSiteSettings(prev => ({ ...prev, seo: editableSeo }));
        alert('SEO settings updated!');
    };
    
    const handleUpdatePost = () => {
        if (!editingPost) return;
        setPosts(posts.map(p => p.id === editingPost.id ? editingPost : p));
        setEditingPost(null);
        alert('Post updated!');
    };
    
    const handleDeletePost = (post: Post) => {
        setPosts(posts.filter(p => p.id !== post.id));
        setShowDeleteConfirm(null);
        alert('Post deleted!');
    };
    
    const handleAddCategory = () => {
        if (!newCategoryName.trim()) return;
        const newCategory: Category = { id: `cat${Date.now()}`, name: newCategoryName.trim() };
        const updatedCategories = [...editableCategories, newCategory];
        setEditableCategories(updatedCategories);
        setCategories(updatedCategories);
        setNewCategoryName('');
    };

    const handleUpdateCategory = () => {
        if (!editingCategory || !editingCategory.name.trim()) return;
        const updatedCategories = editableCategories.map(c => c.id === editingCategory.id ? editingCategory : c);
        setEditableCategories(updatedCategories);
        setCategories(updatedCategories);
        setEditingCategory(null);
    };
    
    const handleDeleteCategory = (category: Category) => {
        if (posts.some(p => p.categoryId === category.id)) {
            alert(`Cannot delete category "${category.name}" because it is currently assigned to one or more posts.`);
            return;
        }
        const updatedCategories = editableCategories.filter(c => c.id !== category.id);
        setEditableCategories(updatedCategories);
        setCategories(updatedCategories);
    };
    
    const TabButton = ({ id, label, icon: Icon }: {id: string, label: string, icon: React.ElementType}) => (
        <button onClick={() => setActiveTab(id)} className={`flex items-center px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeTab === id ? 'bg-white text-brand-primary border-b-2 border-brand-primary' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            <Icon size={16} className="mr-2" />
            {label}
        </button>
    );

    return (
        <div className="py-12 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold text-brand-dark">Admin Dashboard</h1>
                    <p className="text-gray-600 mt-2">Manage your website's content and settings.</p>
                </div>
                
                <div className="flex border-b border-gray-200">
                    <TabButton id="content" label="Site Content" icon={FileText} />
                    <TabButton id="social" label="Social Links" icon={Share2} />
                    <TabButton id="seo" label="SEO" icon={Search} />
                    <TabButton id="blog" label="Blog Posts" icon={Newspaper} />
                    <TabButton id="categories" label="Categories" icon={Tags} />
                </div>

                <div className="bg-white p-6 md:p-8 rounded-b-lg shadow-lg">
                    {/* Site Content Tab */}
                    {activeTab === 'content' && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-brand-dark">Edit Site Content</h2>
                            {/* Add content editing fields here */}
                            <p>Content editing features coming soon.</p>
                        </div>
                    )}

                    {/* Social Links Tab */}
                    {activeTab === 'social' && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-brand-dark">Edit Social Links</h2>
                            <div className="space-y-4">
                                {editableSocialLinks.map((link, index) => (
                                    <div key={link.name}>
                                        <label className="block text-sm font-medium text-gray-700">{link.name}</label>
                                        <input 
                                            type="text" 
                                            value={link.href}
                                            onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm ${socialErrors[index] ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {socialErrors[index] && <p className="text-red-500 text-xs mt-1">{socialErrors[index]}</p>}
                                    </div>
                                ))}
                                <button onClick={saveSocialLinks} className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-accent font-semibold flex items-center"><Save size={16} className="mr-2"/> Save Social Links</button>
                            </div>
                        </div>
                    )}
                    
                    {/* SEO Tab */}
                    {activeTab === 'seo' && (
                        <div>
                           <h2 className="text-2xl font-semibold mb-6 text-brand-dark">Edit SEO Settings</h2>
                           <div className="space-y-6">
                               {Object.keys(editableSeo).map(pageKey => (
                                   <div key={pageKey} className="p-4 border rounded-lg">
                                       <h3 className="text-lg font-semibold capitalize text-brand-dark mb-2">{pageKey} Page</h3>
                                       <div className="space-y-2">
                                           <div>
                                               <label className="text-sm font-medium">Meta Title</label>
                                               <input type="text" value={editableSeo[pageKey as keyof typeof editableSeo].metaTitle} onChange={e => handleSeoChange(pageKey as keyof SiteSettings['seo'], 'metaTitle', e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
                                           </div>
                                           <div>
                                               <label className="text-sm font-medium">Meta Description</label>
                                               <textarea rows={2} value={editableSeo[pageKey as keyof typeof editableSeo].metaDescription} onChange={e => handleSeoChange(pageKey as keyof SiteSettings['seo'], 'metaDescription', e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
                                           </div>
                                            <div>
                                               <label className="text-sm font-medium">Meta Keywords</label>
                                               <input type="text" value={editableSeo[pageKey as keyof typeof editableSeo].metaKeywords} onChange={e => handleSeoChange(pageKey as keyof SiteSettings['seo'], 'metaKeywords', e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
                                           </div>
                                       </div>
                                   </div>
                               ))}
                           </div>
                           <button onClick={saveSeoSettings} className="mt-6 px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-accent font-semibold flex items-center"><Save size={16} className="mr-2"/> Save SEO Settings</button>
                        </div>
                    )}
                    
                    {/* Blog Posts Tab */}
                    {activeTab === 'blog' && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-brand-dark">Manage Blog Posts</h2>
                            <div className="space-y-4">
                                {posts.map(post => (
                                    <div key={post.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span>{post.title}</span>
                                        <div>
                                            <button onClick={() => setEditingPost(post)} className="p-2 text-blue-600 hover:text-blue-800"><Edit size={18}/></button>
                                            <button onClick={() => setShowDeleteConfirm(post)} className="p-2 text-red-600 hover:text-red-800"><Trash2 size={18}/></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                     {/* Categories Tab */}
                    {activeTab === 'categories' && (
                        <div>
                             <h2 className="text-2xl font-semibold mb-4 text-brand-dark">Manage Categories</h2>
                             <div className="mb-6 flex gap-2">
                                 <input type="text" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} placeholder="New category name" className="flex-grow p-2 border rounded-md" />
                                 <button onClick={handleAddCategory} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"><PlusCircle size={18} className="mr-2"/>Add</button>
                             </div>
                             <div className="space-y-2">
                                 {editableCategories.map(cat => (
                                     <div key={cat.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                         {editingCategory?.id === cat.id ? (
                                             <input type="text" value={editingCategory.name} onChange={e => setEditingCategory({...editingCategory, name: e.target.value})} className="flex-grow p-1 border rounded-md"/>
                                         ) : (
                                             <span>{cat.name}</span>
                                         )}
                                         <div>
                                             {editingCategory?.id === cat.id ? (
                                                 <>
                                                    <button onClick={handleUpdateCategory} className="p-2 text-green-600 hover:text-green-800"><Save size={18}/></button>
                                                    <button onClick={() => setEditingCategory(null)} className="p-2 text-gray-600 hover:text-gray-800"><XCircle size={18}/></button>
                                                 </>
                                             ) : (
                                                <button onClick={() => setEditingCategory(cat)} className="p-2 text-blue-600 hover:text-blue-800"><Edit size={18}/></button>
                                             )}
                                             <button onClick={() => handleDeleteCategory(cat)} className="p-2 text-red-600 hover:text-red-800"><Trash2 size={18}/></button>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                        </div>
                    )}
                </div>
                
                {/* Modals for Blog Management */}
                {editingPost && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
                            <h3 className="text-xl font-semibold mb-4">Edit Post</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium">Category</label>
                                    <select value={editingPost.categoryId} onChange={e => setEditingPost({...editingPost, categoryId: e.target.value})} className="w-full mt-1 p-2 border rounded-md">
                                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                    </select>
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium">Tags (comma-separated)</label>
                                    <input type="text" value={editingPost.tags.join(', ')} onChange={e => setEditingPost({...editingPost, tags: e.target.value.split(',').map(t => t.trim())})} className="w-full mt-1 p-2 border rounded-md"/>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-3">
                                <button onClick={() => setEditingPost(null)} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
                                <button onClick={handleUpdatePost} className="px-4 py-2 bg-brand-primary text-white rounded-md">Save Changes</button>
                            </div>
                        </div>
                    </div>
                )}
                {showDeleteConfirm && (
                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                            <h3 className="text-xl font-semibold mb-2">Confirm Deletion</h3>
                            <p>Are you sure you want to delete the post: "{showDeleteConfirm.title}"?</p>
                            <div className="mt-6 flex justify-end gap-3">
                                <button onClick={() => setShowDeleteConfirm(null)} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
                                <button onClick={() => handleDeletePost(showDeleteConfirm)} className="px-4 py-2 bg-red-600 text-white rounded-md">Delete</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;