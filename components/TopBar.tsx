import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { SOCIAL_ICON_MAP } from '../constants';

const TopBar = () => {
  const { socialLinks } = useAppContext();

  return (
    <div className="bg-brand-dark text-brand-secondary">
      <div className="container mx-auto px-6">
        <nav className="flex flex-wrap justify-center items-center py-2 text-sm">
          <NavLink to="/" className={({ isActive }) => `px-3 py-1 transition-colors ${isActive ? 'text-brand-primary font-semibold' : 'hover:text-brand-primary'}`}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => `px-3 py-1 transition-colors ${isActive ? 'text-brand-primary font-semibold' : 'hover:text-brand-primary'}`}>About</NavLink>
          <NavLink to="/products" className={({ isActive }) => `px-3 py-1 transition-colors ${isActive ? 'text-brand-primary font-semibold' : 'hover:text-brand-primary'}`}>Products</NavLink>
          <NavLink to="/blog" className={({ isActive }) => `px-3 py-1 transition-colors ${isActive ? 'text-brand-primary font-semibold' : 'hover:text-brand-primary'}`}>Blog</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `px-3 py-1 transition-colors ${isActive ? 'text-brand-primary font-semibold' : 'hover:text-brand-primary'}`}>Contact</NavLink>
          <NavLink to="/studio" className={({ isActive }) => `px-3 py-1 transition-colors ${isActive ? 'text-brand-primary font-semibold' : 'hover:text-brand-primary'}`}>✨ AI Studio</NavLink>
          
          <div className="flex items-center space-x-3 pl-4">
              {socialLinks.map(social => (
                  social.href && social.href !== '#' && (
                      <a 
                          key={social.name} 
                          href={social.href} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-brand-secondary hover:text-brand-primary transition-colors"
                          aria-label={social.name}
                      >
                          {React.cloneElement(SOCIAL_ICON_MAP[social.name], { size: 16 })}
                          <span className="sr-only">{social.name}</span>
                      </a>
                  )
              ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default TopBar;