
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Settings } from 'lucide-react';

const NavLinks = () => (
    <>
        <NavLink to="/" className={({ isActive }) => `px-4 py-2 transition-colors hover:text-brand-primary ${isActive ? 'text-brand-primary font-semibold' : ''}`}>Home</NavLink>
        <NavLink to="/about" className={({ isActive }) => `px-4 py-2 transition-colors hover:text-brand-primary ${isActive ? 'text-brand-primary font-semibold' : ''}`}>About</NavLink>
        <NavLink to="/products" className={({ isActive }) => `px-4 py-2 transition-colors hover:text-brand-primary ${isActive ? 'text-brand-primary font-semibold' : ''}`}>Products</NavLink>
        <NavLink to="/blog" className={({ isActive }) => `px-4 py-2 transition-colors hover:text-brand-primary ${isActive ? 'text-brand-primary font-semibold' : ''}`}>Blog</NavLink>
        <a href="https://cabadokas.blogspot.com/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 transition-colors hover:text-brand-primary">My Blog</a>
        <NavLink to="/contact" className={({ isActive }) => `px-4 py-2 transition-colors hover:text-brand-primary ${isActive ? 'text-brand-primary font-semibold' : ''}`}>Contact</NavLink>
        <NavLink to="/studio" className={({ isActive }) => `px-4 py-2 transition-colors hover:text-brand-primary rounded-md bg-brand-secondary ${isActive ? 'text-brand-primary font-semibold' : ''}`}>✨ AI Studio</NavLink>
    </>
);

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-3xl font-serif font-bold text-brand-dark">
                    Cabadokas
                </Link>
                <nav className="hidden md:flex items-center space-x-2">
                    <NavLinks />
                </nav>
                 <div className="flex items-center">
                    <Link to="/admin" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <Settings className="text-gray-600" />
                    </Link>
                    <div className="md:hidden ml-2">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-brand-dark focus:outline-none">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-white pb-4">
                    <nav className="flex flex-col items-center space-y-2">
                       <NavLinks />
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
