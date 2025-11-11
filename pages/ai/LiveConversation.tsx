
import React, { useState, useRef, useEffect } from 'react';
import AIPageLayout from '../../components/ai/AIPageLayout';
import { Mic, MicOff, Bot, User, Volume2 } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob as GenAIBlob, LiveSession } from '@google/genai';
import { encode, decode, decodeAudioData } from '../../utils/audio';

type Transcription = { speaker: 'user' | 'bot'; text: string };

const LiveConversation: React.FC = () => {
    const [isListening, setIsListening] = useState(false);
    // Fix: Corrected syntax error (removed extra '=')
    const [error, setError] = useState('');
    const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
    const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);

    const stopConversation = () => {
        if (sessionPromiseRef.current) {
            sessionPromiseRef.current.then(session => session.close());
            sessionPromiseRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (scriptProcessorRef.current) {
            scriptProcessorRef.current.disconnect();
            scriptProcessorRef.current = null;
        }
        if (inputAudioContextRef.current && inputAudioContextRef.current.state !== 'closed') {
            inputAudioContextRef.current.close();
        }
        setIsListening(false);
    };

    const startConversation = async () => {
        setError('');
        setTranscriptions([]);
        setIsListening(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            
            // Setup audio contexts
            outputAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
            inputAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
            
            const outputNode = outputAudioContextRef.current.createGain();
            let nextStartTime = 0;
            const sources = new Set<AudioBufferSourceNode>();

            let currentInputTranscription = '';
            let currentOutputTranscription = '';

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
                        if (message.serverContent?.outputTranscription) {
                            currentOutputTranscription += message.serverContent.outputTranscription.text;
                        }
                        if (message.serverContent?.inputTranscription) {
                            currentInputTranscription += message.serverContent.inputTranscription.text;
                        }

                        if (message.serverContent?.turnComplete) {
                            const finalInput = currentInputTranscription;
                            const finalOutput = currentOutputTranscription;
                            setTranscriptions(prev => [...prev, { speaker: 'user', text: finalInput }, { speaker: 'bot', text: finalOutput }]);
                            currentInputTranscription = '';
                            currentOutputTranscription = '';
                        }
                        
                        const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData.data;
                        if (base64Audio) {
                            const audioContext = outputAudioContextRef.current!;
                            nextStartTime = Math.max(nextStartTime, audioContext.currentTime);
                            const audioBuffer = await decodeAudioData(decode(base64Audio), audioContext, 24000, 1);
                            const source = audioContext.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputNode);
                            source.addEventListener('ended', () => sources.delete(source));
                            source.start(nextStartTime);
                            nextStartTime += audioBuffer.duration;
                            sources.add(source);
                        }
                    },
                    onerror: (e: ErrorEvent) => setError(`Connection Error: ${e.message}`),
                    onclose: () => console.log('Connection closed.'),
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    inputAudioTranscription: {},
                    outputAudioTranscription: {},
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
                },
            });
        } catch (e: any) {
            setError(`Error: ${e.message}`);
            stopConversation();
        }
    };

    useEffect(() => {
        return () => stopConversation(); // Cleanup on component unmount
    }, []);

    return (
        <AIPageLayout title="Live Conversation" description="Speak directly with Gemini and get real-time audio responses.">
            <div className="flex flex-col items-center">
                <button
                    onClick={isListening ? stopConversation : startConversation}
                    className={`flex items-center justify-center w-24 h-24 rounded-full text-white transition-colors ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-brand-primary hover:bg-brand-accent'}`}
                >
                    {isListening ? <MicOff size={40} /> : <Mic size={40} />}
                </button>
                <p className="mt-4 font-semibold">{isListening ? 'Listening...' : 'Tap to Start'}</p>

                {error && <div className="mt-4 p-3 text-red-600 bg-red-100 rounded-md w-full">{error}</div>}

                <div className="mt-6 w-full h-64 overflow-y-auto bg-gray-50 p-4 rounded-lg border">
                    {transcriptions.length === 0 && !isListening && (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <Volume2 size={48} />
                            <p className="mt-2">Your conversation will appear here.</p>
                        </div>
                    )}
                     {transcriptions.map((t, i) => (
                         <div key={i} className={`flex items-start gap-3 my-2 ${t.speaker === 'user' ? 'justify-end' : ''}`}>
                            {t.speaker === 'bot' && <div className="bg-brand-primary p-2 rounded-full text-white"><Bot size={16} /></div>}
                            <p className={`max-w-md p-3 rounded-lg ${t.speaker === 'user' ? 'bg-brand-accent text-white' : 'bg-brand-secondary'}`}>{t.text}</p>
                            {t.speaker === 'user' && <div className="bg-brand-dark p-2 rounded-full text-white"><User size={16} /></div>}
                         </div>
                     ))}
                </div>
            </div>
        </AIPageLayout>
    );
};

export default LiveConversation;