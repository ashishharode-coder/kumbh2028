'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
// Import the detail view component
import PoojaDetailView from '@/components/PoojaDetailView'; 

const poojawithpandit = "/images/poojawithpandit.jpg"; 
const poojaimg1 = "/images/poojaimg.jpg";
const poojaimg2 = "/images/poojaimg2.jpg";   
const poojaimg3 = "/images/poojaimg3.jpg";

// Gallery Array for Cycling
const localGallery = [poojawithpandit, poojaimg1, poojaimg2, poojaimg3];

const VisheshPooja = () => {
    // 1. STATE FOR NAVIGATION
    const [selectedPooja, setSelectedPooja] = useState(null);

    // 2. DATA (30 Items)
    const allPoojas = useMemo(() => [
        { 
            id: 1, 
            title: 'Mahakal Bhasm Aarti', 
            type: 'Daily', 
            price: 1500, 
            desc: 'Special darshan of Bhasm Aarti at Mahakal Temple.', 
            img: 'https://images.unsplash.com/photo-1605559424843-9e4c22861cc2?q=80&w=600', 
            date: '2024-03-01', 
            tag: 'Most Booked',
            place: "Mahakaleshwar Temple, Ujjain", // Added for Detail View
            samagri: true,
            benefits: ["Mental Peace", "Health Prosperity", "Dosh Nivaran"],
            rating: 4.9,
            reviews: 1240
        },
        // ... (rest of your dummy data generation)
        ...Array.from({ length: 29 }, (_, i) => ({
            id: i + 2,
            title: `Sacred Ritual ${i + 2}`,
            type: ['Daily', 'Special', 'Dosh Nivaran'][i % 3],
            price: Math.floor(Math.random() * 9000) + 500,
            desc: 'Experienced Pandits will perform this Vedic ritual as per scriptures.',
            img: 'https://images.unsplash.com/photo-1596700070513-efd0496d5955?q=80&w=600',
            date: `2024-02-${(i % 28) + 1}`,
            place: "Ujjain, Madhya Pradesh",
            samagri: i % 2 === 0,
            benefits: ["Prosperity", "Protection", "Family Well-being"],
            rating: 4.5,
            reviews: 450,
            description: "Detailed Vedic ritual performed by certified Pandits with full devotion."
        }))
    ], []);

    const [activeTab, setActiveTab] = useState('All');
    const [sortOrder, setSortOrder] = useState('newest'); 
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; 

    const tabs = ['All', 'Daily', 'Special', 'Dosh Nivaran'];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, activeTab, sortOrder, selectedPooja]);

    const filteredAndSorted = useMemo(() => {
        let result = allPoojas.filter(p => activeTab === 'All' || p.type === activeTab);
        if (sortOrder === 'low') result.sort((a, b) => a.price - b.price);
        if (sortOrder === 'high') result.sort((a, b) => b.price - a.price);
        if (sortOrder === 'newest') result.sort((a, b) => b.id - a.id);
        return result;
    }, [activeTab, sortOrder, allPoojas]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredAndSorted.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredAndSorted, currentPage]);

    const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);

    // --- CONDITIONALLY RENDER DETAIL VIEW ---
    if (selectedPooja) {
        return (
            <PoojaDetailView 
                pooja={selectedPooja} 
                onBack={() => setSelectedPooja(null)} 
                onBook={(data) => alert(`Booking confirmed for ${data.title}`)} 
            />
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFDF9] text-[#2D1B19] pb-8">
            {/* Header */}
            <header className="pt-24 pb-6 px-6 text-center bg-white">
                <span className="text-orange-600 font-bold text-[10px] tracking-widest uppercase block mb-2">🚩 Spiritual Services</span>
                <h1 className="text-3xl md:text-5xl font-black italic">Vishesh <span className="text-orange-600">Pooja</span></h1>
            </header>

            {/* STICKY FILTER AREA */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 py-3 shadow-sm">
                <div className="max-w-7xl mx-auto space-y-3">
                    <div className="flex overflow-x-auto no-scrollbar gap-2 px-4 md:justify-center">
                        {tabs.map(tab => (
                            <button 
                                key={tab}
                                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                                className={`px-5 py-2 rounded-full text-[10px] md:text-xs font-bold transition-all whitespace-nowrap ${
                                    activeTab === tab ? 'bg-orange-600 text-white shadow-md' : 'bg-orange-50 text-orange-900/40'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* GRID CONTAINER */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                    <AnimatePresence mode='popLayout'>
                        {paginatedData.map((pooja) => (
                            <motion.div 
                                key={pooja.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
                            >
                                <div className="relative aspect-square overflow-hidden bg-gray-50">
                                    <Image 
                                        src={pooja.img} 
                                        alt={pooja.title} 
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                                    />
                                </div>

                                <div className="p-3 md:p-4 flex flex-col flex-grow">
                                    <div className="mb-3">
                                        <h3 className="text-[12px] md:text-sm font-bold text-[#2D1B19] leading-tight line-clamp-1 italic">{pooja.title}</h3>
                                        <p className="text-[9px] text-gray-400 mt-1 line-clamp-2">{pooja.desc}</p>
                                    </div>

                                    <div className="mt-auto pt-3 border-t border-orange-50 flex items-center justify-between">
                                        <p className="text-[14px] md:text-lg font-black text-[#2D1B19]">₹{pooja.price}</p>
                                        
                                        {/* CLICK HANDLER ADDED HERE */}
                                        <button 
                                            onClick={() => setSelectedPooja(pooja)}
                                            className="group/btn relative flex items-center justify-center gap-1 bg-[#2D1B19] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full overflow-hidden transition-all hover:bg-orange-600 active:scale-90"
                                        >
                                            <span className="text-[9px] md:text-[10px] font-black uppercase">Book</span>
                                            <div className="bg-white/20 rounded-full p-0.5 group-hover/btn:rotate-90 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                {/* Pagination (kept as is) */}
            </main>
        </div>
    );
};

export default VisheshPooja;