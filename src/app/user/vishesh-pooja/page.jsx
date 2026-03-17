'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ROUTES } from "@/app/constant/routes";

const VisheshPooja = () => {

    const router = useRouter();
    // 1. STATE FOR NAVIGATION & FILTERS
    const [activeTab, setActiveTab] = useState('All');
    const [sortOrder, setSortOrder] = useState('newest'); 
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; 

    // 2. DATA (30 Items with tags and proper dates for sorting)
    const allPoojas = useMemo(() => [
        { 
            id: 1, 
            title: 'Mahakal Bhasm Aarti', 
            type: 'Daily', 
            price: 1500, 
            desc: 'Special darshan of Bhasm Aarti at Mahakal Temple.', 
            img: 'https://images.unsplash.com/photo-1605559424843-9e4c22861cc2?q=80&w=600', 
            date: '2024-03-25', 
            tag: 'Most Booked',
            place: "Mahakaleshwar Temple, Ujjain",
            samagri: true,
            benefits: ["Mental Peace", "Health Prosperity"],
            rating: 4.9
        },
        ...Array.from({ length: 29 }, (_, i) => ({
            id: i + 2,
            title: `Sacred Ritual ${i + 2}`,
            type: ['Daily', 'Special', 'Dosh Nivaran'][i % 3],
            price: Math.floor(Math.random() * 8000) + 500,
            desc: 'Experienced Pandits will perform this Vedic ritual as per scriptures.',
            img: 'https://images.unsplash.com/photo-1596700070513-efd0496d5955?q=80&w=600',
            date: `2024-03-${(i % 25) + 1}`,
            tag: i % 5 === 0 ? 'Trending' : null,
            place: "Ujjain, Madhya Pradesh",
            samagri: i % 2 === 0,
            benefits: ["Prosperity", "Protection"],
            rating: 4.5
        }))
    ], []);

    const tabs = ['All', 'Daily', 'Special', 'Dosh Nivaran'];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, activeTab, sortOrder]);

    // 3. FILTER & SORT LOGIC (Same as Store)
    const filteredAndSorted = useMemo(() => {
        let result = allPoojas.filter(p => activeTab === 'All' || p.type === activeTab);
        
        if (sortOrder === 'low') result.sort((a, b) => a.price - b.price);
        if (sortOrder === 'high') result.sort((a, b) => b.price - a.price);
        if (sortOrder === 'newest') result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        return result;
    }, [activeTab, sortOrder, allPoojas]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredAndSorted.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredAndSorted, currentPage]);

    const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);


    return (
        <div className="min-h-screen bg-[#FFFDF9] text-[#2D1B19] ">
            {/* Header Section */}
            <header className="pt-24 pb-3 px-6 text-center bg-white">
                <span className="text-orange-600 font-bold text-[10px] tracking-widest uppercase block mb-1">🚩 Spiritual Services</span>
                <h1 className="text-3xl md:text-5xl font-black italic">Vishesh <span className="text-orange-600">Pooja</span></h1>
            </header>

            {/* STICKY FILTER AREA (Synced with Store UI) */}
            <div className="sticky top-[70px] md:top-[85px] z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 py-2 md:py-4 shadow-sm transition-all">
                <div className="max-w-7xl mx-auto space-y-4">
                    <div className="flex overflow-x-auto no-scrollbar gap-2 px-4 justify-start md:justify-center">
                        {tabs.map(tab => (
                        <button
                        key={tab}
                        onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                        className={`px-5 py-2 rounded-full text-[10px] md:text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                        activeTab === tab 
                        ? 'bg-orange-600 text-white shadow-md' 
                        : 'bg-orange-50 text-orange-900/40 hover:bg-orange-100'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Sorting Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 px-4">
            {[
                { id: 'newest', label: 'Newest' },
                { id: 'low', label: 'Low to High' },
                { id: 'high', label: 'High to Low' }
            ].map(opt => (
                <button
                    key={opt.id}
                    onClick={() => { setSortOrder(opt.id); setCurrentPage(1); }}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-[9px] md:text-[10px] font-black border transition-all ${
                        sortOrder === opt.id
                            ? 'bg-orange-50 border-orange-600 text-orange-600 shadow-sm'
                            : 'bg-transparent border-gray-100 text-gray-400'
                    }`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    </div>
</div>
            {/* MAIN GRID */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                    <AnimatePresence mode='popLayout'>
                        {paginatedData.map((pooja) => (
                            <motion.div
                                key={pooja.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onClick={() => router.push(ROUTES.USER_POOJA_DETAIL_VIEW(pooja.id))}
                                className="bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-xl transition-shadow flex flex-col group overflow-hidden cursor-pointer"
                            >
                                {/* Image Wrapper */}
                                <div className="relative aspect-square overflow-hidden bg-gray-50">
                                    <Image 
                                        src={pooja.img} 
                                        alt={pooja.title} 
                                        fill
                                        sizes="(max-width: 768px) 50vw, 20vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                                    />
                                    {pooja.tag && (
                                        <div className="absolute top-2 left-2 bg-orange-600 text-white text-[7px] font-black px-2 py-0.5 rounded-md uppercase z-10">
                                            {pooja.tag}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-3 md:p-4 flex flex-col flex-grow">
                                    <div className="mb-2">
                                        <h3 className="text-[11px] md:text-sm font-bold text-[#2D1B19] leading-tight line-clamp-1 italic">{pooja.title}</h3>
                                        <p className="text-[8px] font-bold text-orange-900/30 uppercase tracking-tighter mt-1">{pooja.type}</p>
                                    </div>

                                    <div className="mt-auto pt-3 border-t border-orange-50 flex items-center justify-between">
                                        <p className="text-[14px] md:text-lg font-black text-[#2D1B19]">₹{pooja.price}</p>
                                        
                                        <button 
                                            onClick={(e) => {
                                                    e.stopPropagation();
                                                    router.push(ROUTES.USER_POOJA_DETAIL_VIEW(pooja.id));
                                                }}
                                            className="group/btn relative flex items-center justify-center gap-1 bg-[#2D1B19] text-white pl-3 pr-2 py-1.5 md:pl-4 md:pr-3 md:py-2 rounded-full overflow-hidden transition-all duration-300 hover:bg-orange-600 active:scale-95 shadow-lg"
                                        >
                                            <span className="text-[9px] md:text-[10px] font-black tracking-tight uppercase">Book</span>
                                            <div className="bg-white/20 rounded-full p-0.5 md:p-1 group-hover/btn:rotate-90 transition-transform duration-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-3.5 md:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </div>
                                            {/* Shimmer Effect */}
                                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="mt-10 flex justify-center items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="w-10 h-10 rounded-xl border border-orange-100 flex items-center justify-center disabled:opacity-20 bg-white"
                        > ← </button>
                        <div className="flex gap-1.5">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all ${
                                        currentPage === i + 1
                                            ? 'bg-orange-600 text-white shadow-lg scale-110'
                                            : 'bg-white border border-orange-100 text-orange-900/40'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="w-10 h-10 rounded-xl border border-orange-100 flex items-center justify-center disabled:opacity-20 bg-white"
                        > → </button>
                    </div>
                )}
            </main>

            {/* Custom Styles */}
            <style jsx global>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default VisheshPooja;