'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

import logo from '../../../../public/logo.jpeg'; 

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { name: 'Information', href: '/information' },
        { name: 'Stay', href: '/stay' },
        { name: 'Vehicle', href: '/vehicle' },
        { name: 'Store', href: '/store' },
        { name: 'Vishesh Pooja', href: '/vishesh-pooja' },
    ];

    return (
        <footer className="relative pb-10 px-4 mt-10 w-full">
            {/* Main Premium Container */}
            <div className="max-w-7xl mx-auto rounded-[3rem] bg-white/80 backdrop-blur-xl border border-orange-100 shadow-[0_20px_50px_rgba(150,50,0,0.08)] overflow-hidden relative z-10">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 p-10 md:p-16">
                    
                    {/* Column 1: Branding */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="relative w-12 h-12">
                                <Image 
                                    src={logo} 
                                    alt="Kumbh Logo" 
                                    fill
                                    className="rounded-full border-2 border-orange-400 object-cover" 
                                />
                                <div className="absolute -top-1 -right-1 text-xs z-20">🔱</div>
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-[10px] font-black text-orange-400 tracking-[0.2em] uppercase">Ujjain</span>
                                <span className="text-xl font-black text-[#2D1B19] tracking-tighter">KUMBH<span className="text-orange-600">2028</span></span>
                            </div>
                        </Link>
                        <p className="text-sm text-orange-900/60 leading-relaxed font-medium">
                            Experience the spiritual essence of Simhastha Ujjain. Join millions in the divine journey of faith and purity at the banks of Kshipra.
                        </p>
                        <div className="flex gap-3">
                            {[Facebook, Twitter, Instagram].map((Icon, i) => (
                                <motion.a 
                                    whileHover={{ y: -3 }}
                                    href="#" 
                                    key={i} 
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm"
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Navigation */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-[#2D1B19]">Navigation</h3>
                        <ul className="space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="group flex items-center text-sm font-bold text-orange-900/70 hover:text-orange-600 transition-colors">
                                        <span className="opacity-0 group-hover:opacity-100 transition-all mr-2 text-orange-500">🚩</span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact Details */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-[#2D1B19]">Help Desk</h3>
                        <div className="space-y-4">
                            {[
                                { Icon: MapPin, text: 'Mahakaleshwar, Ujjain, MP' },
                                { Icon: Phone, text: '+91 12345 67890' },
                                { Icon: Mail, text: 'help@kumbh2028.in' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 group">
                                    <div className="p-2 rounded-xl bg-orange-50 text-orange-600 group-hover:bg-orange-100 transition-colors">
                                        <item.Icon size={16} />
                                    </div>
                                    <span className="text-sm font-bold text-orange-900/70 pt-1">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 4: Newsletter/CTA */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-[2rem] bg-gradient-to-br from-orange-500 to-red-700 text-white shadow-xl shadow-orange-200">
                            <h4 className="font-black text-lg mb-2">Plan Your Visit</h4>
                            <p className="text-xs text-orange-50 opacity-90 mb-4 font-medium">Get latest updates about Snan dates.</p>
                            <Link href="/login" className="flex items-center justify-center gap-2 bg-white text-orange-600 py-3 rounded-2xl text-xs font-black hover:bg-[#2D1B19] hover:text-white transition-all duration-500">
                                REGISTER NOW <ArrowUpRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-orange-50 px-10 py-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-orange-50/30">
                    <p className="text-xs font-bold text-orange-900/50">
                        © {currentYear} SIHASTH UJJAIN. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-[11px] font-black uppercase tracking-wider text-orange-900/40">
                        <Link href="#" className="hover:text-orange-600 transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-orange-600 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-orange-200/20 blur-[120px] z-0 rounded-full"></div>
        </footer>
    );
};

export default Footer;