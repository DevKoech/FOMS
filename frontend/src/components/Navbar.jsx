import React, { useState } from 'react';
import { Menu, X} from 'lucide-react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth.jsx';
import octadecagon from '../assets/octadecagon.jpg';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout} = useAuth();
    //user example

    const navlinks = [
        { name: 'Home', href: '#home' },
        { name: 'Dashboard', href: '#dashboard' },
        { name: 'Profile', href: '#profile' },
        { name: 'Services', href: '#services' },
        { name: 'Contact', href: '#contact' },
    ];
    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    }

    return (
    <nav className = "w-full bg-slate-900 border-b border-slate-700 shadow-sm">
        <div className = "max-w-7xl mx-auto px-4">
            <div className = "flex justify-between items-center h-16">
                {/* Logo and Brand Name */}
                <div className="flex items-center gap-3">
                    <Link 
                        to = "/" 
                        className = 'text-white text-2xl font-bold tracking-wide hover:scale-105 transition'>
                        Pollinate
                    </Link>
                </div>
            
                {/* Navigation Links */}
                <div className="hidden md:flex space-x-8">
                    {navlinks.map(link => (
                    <Link 
                        key = {link.name}
                        to = {link.href}
                        className = 'text-slate-300 hover:text-white transition font-medium'
                    >
                        {link.name}
                    </Link>
                    ))}
                </div>

                {/* Authentication Btns */}
                <div className="hidden md:flex items-center gap-3">
                    {!user ? (
                    <>
                        <Link
                            to="#login"
                            className="px-4 py-2 rounded-md border border-slate-600 bg-slate-800 text-slate-200 font-semibold hover:bg-slate-800 transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="#register"
                            className="px-4 py-2 rounded-md bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
                        >
                            Register
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                    )
                } 
                </div>

                {/* Mobile Menu */}
                <div className='md:hidden'>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden duration-300 text-slate-200 hover:text-white focus:outline-none" 
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            

                {/* MOBILE DROPDOWN MENU */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-r from-blue-600 to-purple-600">
                        {navlinks.map(link => (
                            <Link
                                key={link.name}
                                to = {link.href}
                                className="block text-slate-200 hover:text-white"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="#login"
                            className="block px-4 py-2 rounded-md border border-slate-600 bg-slate-800 text-slate-100 font-semibold hover:bg-slate-700 transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Login
                        </Link>
                        <Link
                            to="#register"
                            className="block px-4 py-2 rounded-md bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Register
                        </Link>
                    </div>

                </div>
                
            </div>
        </div>
    </nav>

    );
    }
    export default Navbar;