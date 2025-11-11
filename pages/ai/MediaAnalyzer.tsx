
import React, { useState, useRef } from 'react';
import AIPageLayout from '../../components/ai/AIPageLayout';
import LoadingSpinner from '../../components/ai/LoadingSpinner';
import { Image, Mic, Upload, Square } from 'lucide-react';
import { analyzeImage } from '../../services/geminiService';
import { fileToBase64 } from '../../utils/helpers';
import type { Part } from '@google/genai';
import { GoogleGenAI, LiveServerMessage, Modality, Blob as GenAIBlob, LiveSession } from '@google/genai';
import { encode } from '../../utils/audio';

const MediaAnalyzer: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'image' | 'audio'>('image');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('Describe this image in detail.');
    const [analysisResult, setAnalysisResult] = useState('');
    const [transcription, setTranscription] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    const handleImageAnalysis = async () => {
        if (!imageFile) {
            setError('Please upload an image.');
            return;
        }
        setLoading(true);
        setError('');
        setAnalysisResult('');
        try {
            const imagePart: Part = {
                inlineData: { data: await fileToBase64(imageFile), mimeType: imageFile.type }
            };
            const result = await analyzeImage(prompt, imagePart);
            setAnalysisResult(result);
        } catch (e: any) {
            setError(`Error: ${e.message}`);
        } finally {
            setLoading(false);
        }
    };
    
    const stopTranscription = () => {
        if (sessionPromiseRef.current) {
            sessionPromiseRef.current.then(session => session.close());
            sessionPromiseRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (scriptProcessorRef.current) scriptProcessorRef.current.disconnect();
        if (inputAudioContextRef.current && inputAudioContextRef.current.state !== 'closed') {
            inputAudioContextRef.current.close();
        }
        setIsRecording(false);
    };

    const startTranscription = async () => {
        setError('');
        setTranscription('');
        setIsRecording(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            inputAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
            
            sessionPromiseRef.current = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: async () => {
                        streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
                        const source = inputAudioContextRef.current!.createMediaStreamSource(streamRef.current);
                        scriptProcessorRef.current = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
                        scriptProcessorRef.current.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const pcmBlob: GenAIBlob = {
                                data: encode(new Uint8Array(new Int16Array(inputData.map(x => x * 32768)).buffer)),
                                mimeType: 'audio/pcm;rate=16000',
                            };
                            sessionPromiseRef.current?.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                        source.connect(scriptProcessorRef.current);
                        scriptProcessorRef.current.connect(inputAudioContextRef.current!.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        if (message.serverContent?.inputTranscription) {
                            setTranscription(prev => prev + message.serverContent!.inputTranscription!.text);
                        }
                    },
                    onerror: (e: ErrorEvent) => setError(`Connection Error: ${e.message}`),
                    onclose: () => console.log('Transcription session closed.'),
                },
                config: { inputAudioTranscription: {} },
            });
        } catch (e: any) {
            setError(`Error: ${e.message}`);
            stopTranscription();
        }
    };

    return (
        <AIPageLayout title="Media Analyzer" description="Understand images with detailed descriptions or transcribe your speech to text.">
            <div className="flex border-b mb-6">
                <button onClick={() => setActiveTab('image')} className={`py-2 px-4 flex items-center ${activeTab === 'image' ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-gray-500'}`}><Image size={18} className="mr-2"/>Image Analysis</button>
                <button onClick={() => setActiveTab('audio')} className={`py-2 px-4 flex items-center ${activeTab === 'audio' ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-gray-500'}`}><Mic size={18} className="mr-2"/>Audio Transcription</button>
            </div>
            {error && <div className="mb-4 p-3 text-red-600 bg-red-100 rounded-md">{error}</div>}

            {activeTab === 'image' ? (
                <div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-secondary file:text-brand-primary hover:file:bg-brand-primary/20"/>
                    </div>
                    {imageUrl && <img src={imageUrl} alt="Upload preview" className="rounded-lg shadow-md max-h-64 mx-auto mb-4" />}
                    <div className="mb-4">
                        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">Prompt</label>
                        <input type="text" id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                    </div>
                    <button onClick={handleImageAnalysis} disabled={loading || !imageFile} className="w-full bg-brand-primary text-white py-3 rounded-md font-semibold hover:bg-brand-accent disabled:bg-gray-400">Analyze Image</button>
                    {loading && <LoadingSpinner text="Analyzing image..." />}
                    {analysisResult && <div className="mt-4 p-4 bg-gray-50 rounded-lg border whitespace-pre-wrap">{analysisResult}</div>}
                </div>
            ) : (
                <div className="text-center">
                    <button onClick={isRecording ? stopTranscription : startTranscription} className={`flex items-center justify-center mx-auto w-20 h-20 rounded-full text-white ${isRecording ? 'bg-red-500' : 'bg-brand-primary'}`}>
                        {isRecording ? <Square size={30}/> : <Mic size={30}/>}
                    </button>
                    <p className="mt-2 font-semibold">{isRecording ? 'Recording... Tap to Stop' : 'Tap to Start Recording'}</p>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border min-h-[100px] text-left">
                        {transcription || <span className="text-gray-400">Transcription will appear here...</span>}
                    </div>
                </div>
            )}
        </AIPageLayout>
    );
};

export default MediaAnalyzer;
