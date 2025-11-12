import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';
import Blog from './pages/Blog';

// AI Studio Pages
import AIStudio from './pages/ai/AIStudio';
import ChatBot from './pages/ai/ChatBot';
import ImageStudio from './pages/ai/ImageStudio';
import VideoStudio from './pages/ai/VideoStudio';
import LiveConversation from './pages/ai/LiveConversation';
import SmartSearch from './pages/ai/SmartSearch';
import MediaAnalyzer from './pages/ai/MediaAnalyzer';
import TextToSpeech from './pages/ai/TextToSpeech';

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/blog" element={<Blog />} />
            
            {/* AI Studio Routes */}
            <Route path="/studio" element={<AIStudio />} />
            <Route path="/studio/chat" element={<ChatBot />} />
            <Route path="/studio/image" element={<ImageStudio />} />
            <Route path="/studio/video" element={<VideoStudio />} />
            <Route path="/studio/live" element={<LiveConversation />} />
            <Route path="/studio/search" element={<SmartSearch />} />
            <Route path="/studio/analyzer" element={<MediaAnalyzer />} />
            <Route path="/studio/tts" element={<TextToSpeech />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  );
}

export default App;