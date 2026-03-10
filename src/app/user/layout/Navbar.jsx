'use client';

import React, { useState } from 'react';
import Link from 'next/link'; // Vite ke 'Link' ki jagah
import Image from 'next/image'; // 'img' tag ki jagah optimization ke liye
import { usePathname } from 'next/navigation'; // 'useLocation' ki jagah Next.js hook
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../../../public/logo.jpeg'; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname(); 

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Information', href: '/information' },
        { name: 'Stay', href: '/stay' },
        { name: 'Vehicle', href: '/vehicle' },
        { name: 'Store', href: '/store' },
        { name: 'Vishesh Pooja', href: '/vishesh-pooja' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] p-3 md:p-5">
            {/* Main Premium Container */}
            <div className="max-w-7xl mx-auto rounded-[2.5rem] bg-white/80 backdrop-blur-xl border border-orange-100 shadow-[0_10px_40px_rgba(150,50,0,0.1)] p-2 md:p-3">
                <div className="flex items-center justify-between">
                    
                    {/* Left: Brand Identity */}
                    <div className="flex items-center gap-4 md:gap-10">
                        <Link href="/" className="flex items-center gap-2 pl-2">
                            <div className="relative">
                                {/* Next.js Image component for better performance */}
                                <div className="w-10 h-10 relative overflow-hidden rounded-full border-2 border-orange-400">
                                    <Image 
                                        src={logo} 
                                        alt="Kumbh Logo" 
                                        fill 
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                                <div className="absolute -top-1 -right-1 text-[10px]">🔱</div>
                            </div>
                            <div className="flex flex-col leading-none hidden sm:block">
                                <span className="text-xs font-black text-orange-400 tracking-[0.2em] uppercase">Ujjain</span>
                                <span className="text-xl font-black text-[#2D1B19] tracking-tighter">
                                    KUMBH<span className="text-orange-600">2028</span>
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link 
                                        key={link.name}
                                        href={link.href} 
                                        prefetch={false} 
                                        className={`relative text-[13px] font-bold px-5 py-2.5 rounded-full transition-all duration-500 ${
                                            isActive 
                                            ? 'text-white' 
                                            : 'text-orange-900/70 hover:text-orange-600'
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.div 
                                                layoutId="nav-bg"
                                                className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-700 rounded-full -z-10 shadow-lg shadow-orange-200"
                                                transition={{ type: 'spring', duration: 0.6 }}
                                            />
                                        )}
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3 pr-2">
                        <Link href="/login" className="hidden sm:flex group items-center gap-2 bg-[#2D1B19] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-orange-600 transition-all duration-500 shadow-md">
                            <span>Login</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                        
                        {/* Mobile Toggle Button */}
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-orange-50 text-orange-600 border border-orange-100"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen 
                                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h10M4 18h16" />
                                }
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="lg:hidden mt-3 mx-auto max-w-[95%] rounded-[2rem] bg-white border border-orange-100 shadow-2xl overflow-hidden z-50"
                    >
                        <div className="p-4 flex flex-col gap-2">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link 
                                        key={link.name} 
                                        href={link.href} 
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all ${
                                            isActive 
                                            ? 'bg-orange-50 text-orange-600 border border-orange-100' 
                                            : 'text-orange-950/70 hover:bg-orange-50/50'
                                        }`}
                                    >
                                        <span>{link.name}</span>
                                        {isActive && <span className="text-orange-500">✨</span>}
                                    </Link>
                                );
                            })}
                            
                            <div className="h-px bg-orange-50 my-2"></div>
                            
                            <Link 
                                href="/login" 
                                onClick={() => setIsOpen(false)}
                                className="w-full text-center p-4 bg-gradient-to-r from-orange-500 to-red-700 text-white rounded-2xl font-black text-sm shadow-lg"
                            >
                                Login Account
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;