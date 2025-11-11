
import React, { useState, useEffect } from 'react';
import AIPageLayout from '../../components/ai/AIPageLayout';
import LoadingSpinner from '../../components/ai/LoadingSpinner';
import { Film, Upload, Sparkles } from 'lucide-react';
import { generateVideo, pollVideoOperation, fetchVideo } from '../../services/geminiService';
import { fileToBase64 } from '../../utils/helpers';
import type { Part, Operation, GenerateVideosResponse } from '@google/genai';

const VideoStudio: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState('');
    const [apiKeySelected, setApiKeySelected] = useState(false);

    useEffect(() => {
        const checkKey = async () => {
            if (window.aistudio && await window.aistudio.hasSelectedApiKey()) {
                setApiKeySelected(true);
            }
        };
        checkKey();
    }, []);

    const handleSelectKey = async () => {
        if (window.aistudio) {
            await window.aistudio.openSelectKey();
            setApiKeySelected(true); // Assume success to avoid race condition
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setImageFile(file);
    };

    const handleSubmit = async () => {
        if (!prompt.trim() && !imageFile) {
            setError('Please enter a prompt or upload an image.');
            return;
        }
        setLoading(true);
        setLoadingMessage('Initializing video generation...');
        setError('');
        setVideoUrl(null);

        try {
            let imagePart: Part | undefined;
            if (imageFile) {
                imagePart = {
                    inlineData: { data: await fileToBase64(imageFile), mimeType: imageFile.type },
                };
            }

            let operation: Operation<GenerateVideosResponse> = await generateVideo(prompt, aspectRatio, imagePart);
            setLoadingMessage('Video is processing. This may take a few minutes...');
            
            const resultOperation = await pollVideoOperation(operation);
            
            const downloadLink = resultOperation.response?.generatedVideos?.[0]?.video?.uri;
            if (downloadLink) {
                setLoadingMessage('Fetching your video...');
                const url = await fetchVideo(downloadLink);
                setVideoUrl(url);
            } else {
                throw new Error('Video generation failed to produce a result.');
            }

        } catch (e: any) {
            if (e.message.includes('Requested entity was not found')) {
                setError('API Key error. Please re-select your API key.');
                setApiKeySelected(false);
            } else {
                setError(`Error: ${e.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    if (!apiKeySelected) {
        return (
            <AIPageLayout title="Video Studio" description="Generate high-quality videos from text or images with Veo.">
                <div className="text-center p-8 border-2 border-dashed border-brand-primary rounded-lg bg-brand-secondary">
                    <h2 className="text-2xl font-bold text-brand-dark mb-4">API Key Required</h2>
                    <p className="mb-6 text-gray-700">Video generation with Veo requires a user-selected API key. Please select a key to continue. For more information, please see the <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-brand-primary underline">billing documentation</a>.</p>
                    <button onClick={handleSelectKey} className="bg-brand-primary text-white py-2 px-6 rounded-md font-semibold hover:bg-brand-accent transition-colors">Select API Key</button>
                </div>
            </AIPageLayout>
        );
    }
    
    return (
        <AIPageLayout title="Video Studio" description="Generate high-quality videos from text or images with Veo.">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Starting Image (Optional)</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-secondary file:text-brand-primary hover:file:bg-brand-primary/20"/>
                    {imageFile && <p className="text-sm text-gray-500 mt-2">Selected: {imageFile.name}</p>}
                </div>

                <div>
                    <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">Prompt</label>
                    <textarea id="prompt" rows={3} value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="e.g., A neon hologram of a cat driving at top speed."></textarea>
                </div>

                <div>
                    <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-700">Aspect Ratio</label>
                    <select id="aspectRatio" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value as any)} className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary">
                        <option value="16:9">16:9 (Landscape)</option>
                        <option value="9:16">9:16 (Portrait)</option>
                    </select>
                </div>

                <button onClick={handleSubmit} disabled={loading} className="w-full bg-brand-primary text-white py-3 px-6 rounded-md font-semibold hover:bg-brand-accent transition-colors disabled:bg-gray-400 flex items-center justify-center">
                    <Film size={20} className="mr-2"/>
                    {loading ? 'Generating...' : 'Generate Video'}
                </button>
            </div>
            
            {error && <div className="mt-4 p-3 text-red-600 bg-red-100 rounded-md">{error}</div>}
            {loading && <LoadingSpinner text={loadingMessage} />}

            {videoUrl && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2 text-center">Generated Video</h3>
                    <video src={videoUrl} controls autoPlay loop className="rounded-lg shadow-md w-full" />
                </div>
            )}
        </AIPageLayout>
    );
};

export default VideoStudio;
