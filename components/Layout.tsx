import React from 'react';
import Header from './Header';
import Footer from './Footer';
import TopBar from './TopBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-brand-light font-sans text-brand-dark">
      <TopBar />
      <Header />
      <main className="flex-grow">{children}</main>
      <TopBar />
      <Footer />
    </div>
  );
};

export default Layout;