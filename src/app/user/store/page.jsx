'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Store = () => {
    // 1. DATA (Keep this in useMemo or a constant outside if static)
    const allItems = useMemo(() => [
        { id: 1, title: '5-Mukhi Nepali Rudraksh', type: 'Rudraksh', price: 450, date: '2024-03-01', img: 'https://images.unsplash.com/photo-1610438183110-664f69f2e3a1?q=80&w=600', tag: 'Best Seller' },
        { id: 2, title: 'Original Tulsi Mala', type: 'Mala', price: 150, date: '2024-03-02', img: 'https://images.unsplash.com/photo-1606768603417-64906f36113b?q=80&w=600' },
        { id: 3, title: 'Mysore Sandalwood Dhoop', type: 'Dhoop', price: 120, date: '2024-03-03', img: 'https://images.unsplash.com/photo-1606768603417-64906f36113b?q=80&w=600', tag: 'Fragrant' },
        { id: 4, title: 'Mahakal Bhashm (Special)', type: 'Bhashm', price: 210, date: '2024-03-04', img: 'https://images.unsplash.com/photo-1610438183110-664f69f2e3a1?q=80&w=600' },
        { id: 5, title: 'Saffron Silk Cloth', type: 'Cloth', price: 890, date: '2024-03-05', img: 'https://images.unsplash.com/photo-1606768603417-64906f36113b?q=80&w=600' },
        { id: 6, title: 'Pure Copper Bracelet', type: 'Bracelet', price: 320, date: '2024-03-06', img: 'https://images.unsplash.com/photo-1610438183110-664f69f2e3a1?q=80&w=600', tag: 'Pure' },
        { id: 7, title: 'Mahakal Ladoo Prasad', type: 'Prasad', price: 250, date: '2024-03-07', img: 'https://images.unsplash.com/photo-1606768603417-64906f36113b?q=80&w=600' },
        { id: 8, title: '7-Mukhi Rudraksh', type: 'Rudraksh', price: 1200, date: '2024-03-08', img: 'https://images.unsplash.com/photo-1610438183110-664f69f2e3a1?q=80&w=600', tag: 'Rare' },
        { id: 9, title: 'Lotus Seed Mala', type: 'Mala', price: 550, date: '2024-03-09', img: 'https://images.unsplash.com/photo-1606768603417-64906f36113b?q=80&w=600' },
        { id: 10, title: 'Rose Dhoop Sticks', type: 'Dhoop', price: 90, date: '2024-03-10', img: 'https://images.unsplash.com/photo-1606768603417-64906f36113b?q=80&w=600' },
        { id: 11, title: 'Sacred Havan Bhashm', type: 'Bhashm', price: 150, date: '2024-03-11', img: 'https://images.unsplash.com/photo-1610438183110-664f69f2e3a1?q=80&w=600' },
        { id: 12, title: 'Cotton Pooja Cloth', type: 'Cloth', price: 400, date: '2024-03-12', img: 'https://images.unsplash.com/photo-1606768603417-64906f36113b?q=80&w=600' },
        { id: 13, title: 'Brass Om Bracelet', type: 'Bracelet', price: 280, date: '2024-03-13', img: 'https://images.unsplash.com/photo-1610438183110-664f69f2e3a1?q=80&w=600' },
        { id: 14, title: 'Dry Fruit Prasad Pack', type: 'Prasad', price: 450, date: '2024-03-14', img: 'https://images.unsplash.com/photo-1606768603417-64906f36113b?q=80&w=600' },
        { id: 15, title: '1-Mukhi Rudraksh', type: 'Rudraksh', price: 2500, date: '2024-03-15', img: 'https://images.unsplash.com/photo-1610438183110-664f69f2e3a1?q=80&w=600', tag: 'Premium' },
        { id: 16, title: 'Sandalwood Mala', type: 'Mala', price: 700, date: '2024-03-16', img: 'https://images.unsplash.com/photo-1606768603417-64906f36113b?q=80&w=600' },
        { id: 17, title: 'Guggal Dhoop Cup', type: 'Dhoop', price: 180, date: '2024-03-17', img: 'https://images.unsplash.com/photo-1606768603417-64906f36113b?q=80&w=600' },
        { id: 18, title: 'Vibhuti Pack of 3', type: 'Bhashm', price: 100, date: '2024-03-18', img: 'https://images.unsplash.com/photo-1610438183110-664f69f2e3a1?q=80&w=600' },
        { id: 19, title: 'Yellow Dhoti Set', type: 'Cloth', price: 1100, date: '2024-03-19', img: 'https://images.unsplash.com/photo-1606768603417-64906f36113b?q=80&w=600' },
        { id: 20, title: 'Silver Finish Bracelet', type: 'Bracelet', price: 650, date: '2024-03-20', img: 'https://images.unsplash.com/photo-1610438183110-664f69f2e3a1?q=80&w=600' },
        { id: 21, title: 'Mishri Prasad', type: 'Prasad', price: 80, date: '2024-03-21', img: 'https://images.unsplash.com/photo-1606768603417-64906f36113b?q=80&w=600' },
        { id: 22, title: 'Crystal Mala', type: 'Mala', price: 950, date: '2024-03-22', img: 'https://images.unsplash.com/photo-1606768603417-64906f36113b?q=80&w=600' },
        { id: 23, title: 'Ganesh Rudraksh', type: 'Rudraksh', price: 850, date: '2024-03-23', img: 'https://images.unsplash.com/photo-1610438183110-664f69f2e3a1?q=80&w=600' },
        { id: 24, title: 'Camphor Dhoop', type: 'Dhoop', price: 140, date: '2024-03-24', img: 'https://images.unsplash.com/photo-1606768603417-64906f36113b?q=80&w=600' },
        { id: 25, title: 'Ashta-gandha Bhashm', type: 'Bhashm', price: 300, date: '2024-03-25', img: 'https://images.unsplash.com/photo-1610438183110-664f69f2e3a1?q=80&w=600' },
        { id: 26, title: 'Woolen Shawl (Red)', type: 'Cloth', price: 1500, date: '2024-03-26', img: 'https://images.unsplash.com/photo-1606768603417-64906f36113b?q=80&w=600' },
        { id: 27, title: 'Magnetic Bracelet', type: 'Bracelet', price: 450, date: '2024-03-27', img: 'https://images.unsplash.com/photo-1610438183110-664f69f2e3a1?q=80&w=600' },
        { id: 28, title: 'Panchamrit Tin', type: 'Prasad', price: 350, date: '2024-03-28', img: 'https://images.unsplash.com/photo-1606768603417-64906f36113b?q=80&w=600' },
        { id: 29, title: '11-Mukhi Rudraksh', type: 'Rudraksh', price: 3500, date: '2024-03-29', img: 'https://images.unsplash.com/photo-1610438183110-664f69f2e3a1?q=80&w=600' },
        { id: 30, title: 'White Sandal Mala', type: 'Mala', price: 820, date: '2024-03-30', img: 'https://images.unsplash.com/photo-1606768603417-64906f36113b?q=80&w=600' },
    ], []);

    const [activeTab, setActiveTab] = useState('All');
    const [sortOrder, setSortOrder] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const tabs = ['All', 'Rudraksh', 'Mala', 'Dhoop', 'Bhashm', 'Cloth', 'Bracelet', 'Prasad'];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, activeTab, sortOrder]);

    const filteredAndSorted = useMemo(() => {
        let result = allItems.filter(opt => activeTab === 'All' || opt.type === activeTab);
        if (sortOrder === 'low') result.sort((a, b) => a.price - b.price);
        if (sortOrder === 'high') result.sort((a, b) => b.price - a.price);
        if (sortOrder === 'newest') result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return result;
    }, [activeTab, sortOrder, allItems]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredAndSorted.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredAndSorted, currentPage]);

    const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);

    return (
        <div className="min-h-screen bg-[#FFFDF9] text-[#2D1B19] pb-8">
            {/* Header Section */}
            <header className="pt-24 pb-6 px-6 text-center bg-white">
                <span className="text-orange-600 font-bold text-[10px] tracking-widest uppercase block mb-1">🚩 Marketplace</span>
                <h1 className="text-3xl md:text-5xl font-black italic">Sacred <span className="text-orange-600">Treasures</span></h1>
            </header>

            {/* STICKY FILTER AREA */}
            <div className="sticky top-[64px] z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 py-3 shadow-sm">
                <div className="max-w-7xl mx-auto space-y-3">
                    {/* Horizontal Tabs */}
                    <div className="flex overflow-x-auto no-scrollbar gap-2 px-4 md:justify-center">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                                className={`px-5 py-2 rounded-full text-[10px] md:text-xs font-bold transition-all whitespace-nowrap ${
                                    activeTab === tab ? 'bg-orange-600 text-white shadow-md' : 'bg-orange-50 text-orange-900/40 hover:bg-orange-100'
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
                        {paginatedData.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-xl transition-shadow flex flex-col group overflow-hidden"
                            >
                                <div className="relative aspect-square overflow-hidden bg-gray-50">
                                    <Image 
                                        src={item.img} 
                                        alt={item.title} 
                                        fill
                                        sizes="(max-width: 768px) 50vw, 20vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                                    />
                                    {item.tag && (
                                        <div className="absolute top-2 left-2 bg-orange-600 text-white text-[7px] font-black px-2 py-0.5 rounded-md uppercase z-10">
                                            {item.tag}
                                        </div>
                                    )}
                                </div>

                                <div className="p-3 md:p-4 flex flex-col flex-grow">
                                    <div className="mb-2">
                                        <h3 className="text-[11px] md:text-sm font-bold text-[#2D1B19] leading-tight line-clamp-1 italic">{item.title}</h3>
                                        <p className="text-[8px] font-bold text-orange-900/30 uppercase tracking-tighter mt-1">{item.type}</p>
                                    </div>

                                    <div className="mt-auto pt-3 border-t border-orange-50 flex items-center justify-between">
                                        <p className="text-[14px] md:text-lg font-black text-[#2D1B19]">₹{item.price}</p>
                                        
                                        <button className="group/btn relative flex items-center justify-center gap-1 bg-[#2D1B19] text-white pl-3 pr-2 py-1.5 md:pl-4 md:pr-3 md:py-2 rounded-full overflow-hidden transition-all duration-300 hover:bg-orange-600 active:scale-95 shadow-lg">
                                            <span className="text-[9px] md:text-[10px] font-black tracking-tight uppercase">Add</span>
                                            <div className="bg-white/20 rounded-full p-0.5 md:p-1 group-hover/btn:rotate-90 transition-transform duration-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-3.5 md:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </div>
                                            {/* Reflection Glow Effect */}
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
                    <div className="mt-16 flex justify-center items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="w-10 h-10 rounded-xl border border-orange-100 flex items-center justify-center disabled:opacity-20 bg-white"
                        >
                            ←
                        </button>
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
                        >
                            →
                        </button>
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

export default Store;