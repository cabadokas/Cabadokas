
import React, { useState, useRef, useEffect } from 'react';
import AIPageLayout from '../../components/ai/AIPageLayout';
import LoadingSpinner from '../../components/ai/LoadingSpinner';
import { Send, User, Bot } from 'lucide-react';
import { createChatSession, generateContentStream } from '../../services/geminiService';
import type { Chat } from '@google/genai';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      chatRef.current = createChatSession();
    } catch (e: any) {
        setError(e.message);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatRef.current) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const stream = await generateContentStream(chatRef.current, input);
      setLoading(false);

      let botResponse = '';
      setMessages(prev => [...prev, { sender: 'bot', text: '...' }]);
      
      for await (const chunk of stream) {
        botResponse += chunk.text;
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { sender: 'bot', text: botResponse };
            return newMessages;
        });
      }
    } catch (e: any) {
      setError(`Error: ${e.message}`);
      setLoading(false);
    }
  };

  return (
    <AIPageLayout title="AI Chat Bot" description="Chat with a helpful AI assistant powered by Gemini Flash for low-latency responses.">
      <div className="flex flex-col h-[60vh]">
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-t-md">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'bot' && <div className="bg-brand-primary p-2 rounded-full text-white"><Bot size={20} /></div>}
              <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-brand-accent text-white' : 'bg-brand-secondary'}`}>
                {msg.text}
              </div>
              {msg.sender === 'user' && <div className="bg-brand-dark p-2 rounded-full text-white"><User size={20} /></div>}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {loading && !messages.some(m => m.sender === 'bot' && m.text.endsWith('...')) && <LoadingSpinner text="AI is thinking..." />}
        {error && <div className="p-4 text-red-600 bg-red-100 rounded-md my-2">{error}</div>}
        <div className="flex p-4 border-t border-gray-200 bg-gray-50 rounded-b-md">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
            disabled={loading}
          />
          <button onClick={handleSend} disabled={loading} className="bg-brand-primary text-white p-3 rounded-r-md hover:bg-brand-accent disabled:bg-gray-400">
            <Send size={20} />
          </button>
        </div>
      </div>
    </AIPageLayout>
  );
};

export default ChatBot;
