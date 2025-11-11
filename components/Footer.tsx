
import React from 'react';
import { Link } from 'react-router-dom';
import { SOCIAL_ICON_MAP, BLOGGER_LINK } from '../constants';
import { useAppContext } from '../context/AppContext';

const Footer: React.FC = () => {
  const { socialLinks } = useAppContext();

  return (
    <footer className="bg-brand-dark text-brand-secondary">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">Cabadokas</h3>
            <p className="text-sm text-gray-300">
              Your trusted source for beauty, health, and wellness inspiration.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-brand-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand-primary transition-colors">Contact</Link></li>
              <li><a href={BLOGGER_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">Our Blogger Site</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map(social => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors">
                  {SOCIAL_ICON_MAP[social.name]}
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Cabadokas. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;