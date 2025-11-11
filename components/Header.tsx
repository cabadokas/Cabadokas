import React from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import Logo from './Logo';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md z-40">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/">
                    <Logo className="h-10 w-auto" />
                </Link>
                <div className="flex items-center">
                    <Link to="/admin" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <Settings className="text-gray-600" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
