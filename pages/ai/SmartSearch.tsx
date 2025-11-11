
import React, { useState } from 'react';
import AIPageLayout from '../../components/ai/AIPageLayout';
import LoadingSpinner from '../../components/ai/LoadingSpinner';
import { Search, Map, BrainCircuit, Globe } from 'lucide-react';
import { groundedSearch } from '../../services/geminiService';

const SmartSearch: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [useMaps, setUseMaps] = useState(false);
    const [useThinking, setUseThinking] = useState(false);
    const [result, setResult] = useState<{ text: string; chunks: any[] } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!prompt.trim()) {
            setError('Please enter a search query.');
            return;
        }
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await groundedSearch(prompt, useMaps, useThinking);
            setResult(response);
        } catch (e: any) {
            setError(`Error: ${e.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AIPageLayout title="Smart Search" description="Get up-to-date and accurate information using Google Search and Maps grounding.">
            <div className="space-y-4">
                <div className="relative">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., Who won the most recent F1 race?"
                        className="w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
                    <label className="flex items-center cursor-pointer">
                        <input type="checkbox" checked={useMaps} onChange={() => setUseMaps(!useMaps)} className="h-4 w-4 rounded text-brand-primary focus:ring-brand-primary" />
                        <Map size={20} className="mx-2 text-green-600" />
                        <span className="ml-1 text-gray-700">Use Maps</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input type="checkbox" checked={useThinking} onChange={() => setUseThinking(!useThinking)} className="h-4 w-4 rounded text-brand-primary focus:ring-brand-primary" />
                        <BrainCircuit size={20} className="mx-2 text-purple-600" />
                        <span className="ml-1 text-gray-700">Complex Query (Thinking Mode)</span>
                    </label>
                </div>
                <button onClick={handleSubmit} disabled={loading} className="w-full bg-brand-primary text-white py-3 rounded-md font-semibold hover:bg-brand-accent disabled:bg-gray-400">
                    Search
                </button>
            </div>
            
            {error && <div className="mt-4 p-3 text-red-600 bg-red-100 rounded-md">{error}</div>}
            {loading && <LoadingSpinner text="Searching the web..." />}

            {result && (
                <div className="mt-6 space-y-4">
                    <div className="p-4 bg-brand-secondary rounded-lg">
                        <h3 className="text-xl font-serif font-semibold text-brand-dark mb-2">Answer</h3>
                        <p className="text-gray-800 whitespace-pre-wrap">{result.text}</p>
                    </div>
                    {result.chunks && result.chunks.length > 0 && (
                        <div className="p-4 bg-gray-50 rounded-lg border">
                            <h4 className="text-lg font-semibold text-brand-dark mb-2 flex items-center"><Globe size={18} className="mr-2"/>Sources</h4>
                            <ul className="list-disc list-inside space-y-1">
                                {result.chunks.map((chunk, index) => {
                                    const source = chunk.web || chunk.maps;
                                    if (!source || !source.uri) return null;
                                    return (
                                      <li key={index}>
                                        <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            {source.title || source.uri}
                                        </a>
                                      </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </AIPageLayout>
    );
};

export default SmartSearch;
