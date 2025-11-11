
import React, { useState, useCallback } from 'react';
import AIPageLayout from '../../components/ai/AIPageLayout';
import LoadingSpinner from '../../components/ai/LoadingSpinner';
import { Sparkles, Upload, Wand2 } from 'lucide-react';
import { generateImage, editImage } from '../../services/geminiService';
import { fileToBase64 } from '../../utils/helpers';
import type { Part } from '@google/genai';

const ImageStudio: React.FC = () => {
    // Fix: Corrected syntax error (removed extra '=')
    const [activeTab, setActiveTab] = useState<'generate' | 'edit'>('generate');
    const [prompt, setPrompt] = useState('');
    const [aspectRatio, setAspectRatio] = useState('1:1');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
    const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setOriginalImageUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt.');
            return;
        }
        setLoading(true);
        setError('');
        setResultImageUrl(null);

        try {
            let imageB64: string;
            if (activeTab === 'generate') {
                imageB64 = await generateImage(prompt, aspectRatio);
            } else {
                if (!imageFile) {
                    setError('Please upload an image to edit.');
                    setLoading(false);
                    return;
                }
                const imagePart: Part = {
                    inlineData: {
                        data: await fileToBase64(imageFile),
                        mimeType: imageFile.type,
                    },
                };
                imageB64 = await editImage(prompt, imagePart);
            }
            setResultImageUrl(`data:image/png;base64,${imageB64}`);
        } catch (e: any) {
            setError(`Error: ${e.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AIPageLayout title="Image Studio" description="Create stunning new visuals with Imagen or edit your photos with natural language.">
            <div className="flex border-b mb-6">
                <button onClick={() => setActiveTab('generate')} className={`py-2 px-4 flex items-center ${activeTab === 'generate' ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-gray-500'}`}><Sparkles size={18} className="mr-2"/>Generate</button>
                <button onClick={() => setActiveTab('edit')} className={`py-2 px-4 flex items-center ${activeTab === 'edit' ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-gray-500'}`}><Wand2 size={18} className="mr-2"/>Edit</button>
            </div>

            {activeTab === 'edit' && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-primary hover:text-brand-dark focus-within:outline-none">
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                    {imageFile && <p className="text-sm text-gray-500 mt-2">Selected: {imageFile.name}</p>}
                </div>
            )}
            
            <div className="mb-4">
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">Prompt</label>
                <textarea id="prompt" rows={3} value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder={activeTab === 'generate' ? 'e.g., A robot holding a red skateboard.' : 'e.g., Add a retro filter.'}></textarea>
            </div>

            {activeTab === 'generate' && (
                <div className="mb-4">
                    <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-700">Aspect Ratio</label>
                    <select id="aspectRatio" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)} className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary">
                        <option value="1:1">1:1 (Square)</option>
                        <option value="16:9">16:9 (Landscape)</option>
                        <option value="9:16">9:16 (Portrait)</option>
                        <option value="4:3">4:3</option>
                        <option value="3:4">3:4</option>
                    </select>
                </div>
            )}

            <button onClick={handleSubmit} disabled={loading} className="w-full bg-brand-primary text-white py-3 px-6 rounded-md font-semibold hover:bg-brand-accent transition-colors disabled:bg-gray-400 flex items-center justify-center">
                {activeTab === 'generate' ? <Sparkles size={20} className="mr-2"/> : <Wand2 size={20} className="mr-2"/>}
                {loading ? 'Working...' : (activeTab === 'generate' ? 'Generate Image' : 'Edit Image')}
            </button>
            
            {error && <div className="mt-4 p-3 text-red-600 bg-red-100 rounded-md">{error}</div>}

            {loading && <LoadingSpinner text="Conjuring pixels..." />}

            <div className={`mt-6 grid gap-4 ${originalImageUrl && resultImageUrl ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {originalImageUrl && activeTab === 'edit' && (
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-center">Original</h3>
                        <img src={originalImageUrl} alt="Original" className="rounded-lg shadow-md w-full" />
                    </div>
                )}
                {resultImageUrl && (
                    <div className={originalImageUrl && activeTab === 'edit' ? '' : 'mx-auto'}>
                        <h3 className="text-lg font-semibold mb-2 text-center">Result</h3>
                        <img src={resultImageUrl} alt="Generated result" className="rounded-lg shadow-md w-full" />
                    </div>
                )}
            </div>
        </AIPageLayout>
    );
};

export default ImageStudio;