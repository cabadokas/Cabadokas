
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Image, Video, Mic, Search, Bot, Music } from 'lucide-react';

const tools = [
  { name: 'Chat Bot', path: '/studio/chat', icon: MessageSquare, description: 'Have a conversation with our friendly AI assistant.' },
  { name: 'Image Studio', path: '/studio/image', icon: Image, description: 'Generate and edit images with text prompts.' },
  { name: 'Video Studio', path: '/studio/video', icon: Video, description: 'Create stunning videos from text or images.' },
  { name: 'Live Conversation', path: '/studio/live', icon: Mic, description: 'Talk to our AI in real-time with voice.' },
  { name: 'Smart Search', path: '/studio/search', icon: Search, description: 'Get up-to-date answers from the web and maps.' },
  { name: 'Media Analyzer', path: '/studio/analyzer', icon: Bot, description: 'Analyze images and transcribe audio.' },
  { name: 'Text to Speech', path: '/studio/tts', icon: Music, description: 'Convert your text into natural-sounding speech.' }
];

const AIStudio: React.FC = () => {
  return (
    <div className="py-20 bg-brand-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">AI Studio</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore the power of Gemini. A suite of tools to enhance your creativity and productivity.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map(tool => (
            <Link to={tool.path} key={tool.name} className="block bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="flex items-center text-brand-primary mb-4">
                <tool.icon size={32} className="mr-4 group-hover:animate-pulse" />
                <h2 className="text-2xl font-serif font-semibold text-brand-dark">{tool.name}</h2>
              </div>
              <p className="text-gray-600">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIStudio;
