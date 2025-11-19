
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
    const { cart } = useAppContext();
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="bg-white shadow-md z-40">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-3xl font-serif font-bold text-brand-dark hover:text-brand-primary transition-colors">
                    Cabadokas
                </Link>
                <div className="flex items-center space-x-4">
                    <div className="relative p-2 cursor-pointer group">
                        <ShoppingBag className="text-gray-600 group-hover:text-brand-primary transition-colors" />
                        {cartItemCount > 0 && (
                             <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-accent rounded-full">
                                {cartItemCount}
                            </span>
                        )}
                    </div>
                    <Link to="/admin" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <Settings className="text-gray-600" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
