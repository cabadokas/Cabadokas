
import React, { useState, useRef } from 'react';
import AIPageLayout from '../../components/ai/AIPageLayout';
import LoadingSpinner from '../../components/ai/LoadingSpinner';
import { Volume2, Play } from 'lucide-react';
import { generateSpeech } from '../../services/geminiService';
import { decode, decodeAudioData } from '../../utils/audio';

const TextToSpeech: React.FC = () => {
    const [text, setText] = useState('Hello! I am an AI voice from Gemini. Have a wonderful day!');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const audioRef = useRef<HTMLAudioElement>(null);
    const [audioB64, setAudioB64] = useState<string | null>(null);

    const handleGenerateSpeech = async () => {
        if (!text.trim()) {
            setError('Please enter some text to generate speech.');
            return;
        }
        setLoading(true);
        setError('');
        setAudioB64(null);

        try {
            const resultB64 = await generateSpeech(text);
            if (!resultB64) throw new Error("API did not return audio data.");
            
            const audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
            const audioBuffer = await decodeAudioData(decode(resultB64), audioContext, 24000, 1);
            
            // A bit of a hack to play raw PCM data in an <audio> tag
            const wav = audioBufferToWav(audioBuffer);
            const blob = new Blob([wav], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            if(audioRef.current) {
                audioRef.current.src = url;
                audioRef.current.play();
            }

        } catch (e: any) {
            setError(`Error: ${e.message}`);
        } finally {
            setLoading(false);
        }
    };
    
    // Helper to convert AudioBuffer to a WAV file Blob
    function audioBufferToWav(buffer: AudioBuffer) {
        let numOfChan = buffer.numberOfChannels,
            length = buffer.length * numOfChan * 2 + 44,
            bufferArr = new ArrayBuffer(length),
            view = new DataView(bufferArr),
            channels = [], i, sample,
            offset = 0,
            pos = 0;

        // write WAV header
        setUint32(0x46464952); // "RIFF"
        setUint32(length - 8); // file length - 8
        setUint32(0x45564157); // "WAVE"

        setUint32(0x20746d66); // "fmt " chunk
        setUint32(16); // length = 16
        setUint16(1); // PCM (uncompressed)
        setUint16(numOfChan);
        setUint32(buffer.sampleRate);
        setUint32(buffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
        setUint16(numOfChan * 2); // block-align
        setUint16(16); // 16-bit

        setUint32(0x61746164); // "data" - chunk
        setUint32(length - pos - 4); // chunk length

        // write interleaved data
        for(i = 0; i < buffer.numberOfChannels; i++)
            channels.push(buffer.getChannelData(i));

        while(pos < length) {
            for(i = 0; i < numOfChan; i++) {
                sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
                sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0; // scale to 16-bit signed int
                view.setInt16(pos, sample, true); // write 16-bit sample
                pos += 2;
            }
            offset++
        }
        return bufferArr;

        function setUint16(data: number) { view.setUint16(pos, data, true); pos += 2; }
        function setUint32(data: number) { view.setUint32(pos, data, true); pos += 4; }
    }


    return (
        <AIPageLayout title="Text to Speech" description="Convert written text into natural-sounding speech with Gemini.">
            <div className="space-y-4">
                <div>
                    <label htmlFor="tts-text" className="block text-sm font-medium text-gray-700">Text to Synthesize</label>
                    <textarea
                        id="tts-text"
                        rows={5}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        placeholder="Enter text to convert to speech..."
                    />
                </div>
                <button
                    onClick={handleGenerateSpeech}
                    disabled={loading}
                    className="w-full bg-brand-primary text-white py-3 rounded-md font-semibold hover:bg-brand-accent disabled:bg-gray-400 flex items-center justify-center"
                >
                    <Volume2 size={20} className="mr-2" />
                    {loading ? 'Generating...' : 'Generate & Play Speech'}
                </button>
            </div>
            {error && <div className="mt-4 p-3 text-red-600 bg-red-100 rounded-md">{error}</div>}
            {loading && <LoadingSpinner text="Synthesizing audio..." />}
            <div className="mt-6 flex justify-center">
                <audio ref={audioRef} controls className="w-full max-w-md">
                    Your browser does not support the audio element.
                </audio>
            </div>
        </AIPageLayout>
    );
};

export default TextToSpeech;
