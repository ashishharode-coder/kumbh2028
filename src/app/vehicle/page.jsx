'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Vehicle = () => {
    // 1. FULL 30 ITEMS DATA (useMemo for stability)
    const allVehicles = useMemo(() => [
        { id: 1, title: 'E-Scooter Pro', type: '2-Wheeler', price: 500, capacity: '1 Person', desc: 'Eco-friendly city ride', img: 'https://images.unsplash.com/photo-1590483866171-872f2e519289?q=80&w=600', tag: 'Eco' },
        { id: 2, title: 'Classic Rickshaw', type: '3-Wheeler', price: 800, capacity: '3 People', desc: 'Traditional Mela transport', img: 'https://images.unsplash.com/photo-1577717983057-017e882e3914?q=80&w=600', tag: 'Popular' },
        { id: 3, title: 'Premium SUV Taxi', type: '4-Wheeler', price: 3000, capacity: '6 People', desc: 'Comfortable family ride', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600', tag: 'Best Seller' },
        { id: 4, title: 'Royal Enfield', type: '2-Wheeler', price: 1500, capacity: '2 People', desc: 'Rugged local travel', img: 'https://images.unsplash.com/photo-1558981403-c5f9211a7570?q=80&w=600' },
        { id: 5, title: 'Electric Auto', type: '3-Wheeler', price: 400, capacity: '3 People', desc: 'Quiet & clean shuttle', img: 'https://images.unsplash.com/photo-1590483866171-872f2e519289?q=80&w=600' },
        { id: 6, title: 'Luxury Sedan', type: '4-Wheeler', price: 2500, capacity: '4 People', desc: 'Reliable city car', img: 'https://images.unsplash.com/photo-1581078737397-251f2868846c?q=80&w=600' },
        { id: 7, title: 'MTB Bicycle', type: '2-Wheeler', price: 200, capacity: '1 Person', desc: 'Healthy local commute', img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=600' },
        { id: 8, title: 'Fortuner 4x4', type: '4-Wheeler', price: 6000, capacity: '7 People', desc: 'Premium comfort travel', img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=600', tag: 'VVIP' },
        { id: 9, title: 'Shared Vikram', type: '3-Wheeler', price: 100, capacity: '8 People', desc: 'Budget shared ride', img: 'https://images.unsplash.com/photo-1577717983057-017e882e3914?q=80&w=600' },
        { id: 10, title: 'Sports Bike', type: '2-Wheeler', price: 2000, capacity: '2 People', desc: 'High-speed transport', img: 'https://images.unsplash.com/photo-1558981403-c5f9211a7570?q=80&w=600' },
        { id: 11, title: 'Traveller Bus', type: '4-Wheeler', price: 8000, capacity: '12 People', desc: 'For large groups', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600' },
        { id: 12, title: 'E-Rickshaw VIP', type: '3-Wheeler', price: 600, capacity: '4 People', desc: 'Silent short shuttle', img: 'https://images.unsplash.com/photo-1590483866171-872f2e519289?q=80&w=600' },
        { id: 13, title: 'Activa 6G', type: '2-Wheeler', price: 700, capacity: '2 People', desc: 'Easy city handling', img: 'https://images.unsplash.com/photo-1590483866171-872f2e519289?q=80&w=600' },
        { id: 14, title: 'Swift Dzire', type: '4-Wheeler', price: 2200, capacity: '4 People', desc: 'Compact city sedan', img: 'https://images.unsplash.com/photo-1581078737397-251f2868846c?q=80&w=600' },
        { id: 15, title: 'Cargo Auto', type: '3-Wheeler', price: 900, capacity: 'Loader', desc: 'Best for luggage', img: 'https://images.unsplash.com/photo-1577717983057-017e882e3914?q=80&w=600' },
        { id: 16, title: 'Vespa Retro', type: '2-Wheeler', price: 850, capacity: '2 People', desc: 'Vintage style ride', img: 'https://images.unsplash.com/photo-1590483866171-872f2e519289?q=80&w=600' },
        { id: 17, title: 'Mahindra Treo', type: '3-Wheeler', price: 550, capacity: '3 People', desc: 'Modern electric auto', img: 'https://images.unsplash.com/photo-1590483866171-872f2e519289?q=80&w=600' },
        { id: 18, title: 'Innova Crysta', type: '4-Wheeler', price: 4500, capacity: '7 People', desc: 'VVIP group travel', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600', tag: 'Premium' },
        { id: 19, title: 'Ducati Sports', type: '2-Wheeler', price: 7500, capacity: '1 Person', desc: 'Elite racing experience', img: 'https://images.unsplash.com/photo-1558981403-c5f9211a7570?q=80&w=600' },
        { id: 20, title: 'Golf Cart VIP', type: '4-Wheeler', price: 1200, capacity: '4 People', desc: 'Mela site touring', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600' },
        { id: 21, title: 'Classic Bajaj', type: '3-Wheeler', price: 700, capacity: '3 People', desc: 'Budget city auto', img: 'https://images.unsplash.com/photo-1577717983057-017e882e3914?q=80&w=600' },
        { id: 22, title: 'Hero Splendor', type: '2-Wheeler', price: 400, capacity: '2 People', desc: 'Most reliable economy', img: 'https://images.unsplash.com/photo-1558981403-c5f9211a7570?q=80&w=600' },
        { id: 23, title: 'Mahindra Scorpio', type: '4-Wheeler', price: 3500, capacity: '7 People', desc: 'Powerful SUV experience', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600' },
        { id: 24, title: 'Piaggio Ape', type: '3-Wheeler', price: 500, capacity: '3 People', desc: 'Compact economy ride', img: 'https://images.unsplash.com/photo-1577717983057-017e882e3914?q=80&w=600' },
        { id: 25, title: 'Electric Cycle', type: '2-Wheeler', price: 300, capacity: '1 Person', desc: 'Effortless green ride', img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=600' },
        { id: 26, title: 'Force Traveller', type: '4-Wheeler', price: 9000, capacity: '17 People', desc: 'Large pilgrim group', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600' },
        { id: 27, title: 'KTM Duke', type: '2-Wheeler', price: 1800, capacity: '2 People', desc: 'Fast city transit', img: 'https://images.unsplash.com/photo-1558981403-c5f9211a7570?q=80&w=600' },
        { id: 28, title: 'Vintage Open Jeep', type: '4-Wheeler', price: 5000, capacity: '5 People', desc: 'Unique safari feel', img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=600' },
        { id: 29, title: 'Modified TukTuk', type: '3-Wheeler', price: 1100, capacity: '4 People', desc: 'Stylized mela travel', img: 'https://images.unsplash.com/photo-1577717983057-017e882e3914?q=80&w=600' },
        { id: 30, title: 'Luxury BMW Sedan', type: '4-Wheeler', price: 15000, capacity: '4 People', desc: 'VIP protocol travel', img: 'https://images.unsplash.com/photo-1581078737397-251f2868846c?q=80&w=600', tag: 'VVIP' },
    ], []);

    const [activeTab, setActiveTab] = useState('All');
    const [sortOrder, setSortOrder] = useState('low');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const tabs = ['All', '2-Wheeler', '3-Wheeler', '4-Wheeler'];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, activeTab, sortOrder]);

    const filteredAndSorted = useMemo(() => {
        let result = allVehicles.filter(opt => activeTab === 'All' || opt.type === activeTab);
        if (sortOrder === 'low') result.sort((a, b) => a.price - b.price);
        if (sortOrder === 'high') result.sort((a, b) => b.price - a.price);
        return result;
    }, [activeTab, sortOrder, allVehicles]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredAndSorted.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredAndSorted, currentPage]);

    const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);

    return (
        <div className="min-h-screen bg-[#FFFDF9] text-[#2D1B19] pb-8">
            {/* Header Section */}
            <header className="pt-24 pb-6 px-6 text-center bg-white">
                <span className="text-orange-600 font-bold text-[10px] tracking-widest uppercase block mb-1">🚩 Ujjain Transport</span>
                <h1 className="text-3xl md:text-5xl font-black italic">Transit <span className="text-orange-600">Services</span></h1>
            </header>

            {/* STICKY FILTER AREA */}
            <div className="sticky top-[64px] z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 py-3 shadow-sm">
                <div className="max-w-7xl mx-auto space-y-3 px-4">
                    {/* Horizontal Tabs */}
                    <div className="flex overflow-x-auto no-scrollbar gap-2 md:justify-center">
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
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {[
                            { id: 'low', label: 'Price: Low to High' },
                            { id: 'high', label: 'Price: High to Low' }
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <AnimatePresence mode='popLayout'>
                        {paginatedData.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-xl transition-shadow flex flex-col group overflow-hidden"
                            >
                                {/* Image Area */}
                                <div className="relative aspect-video overflow-hidden bg-gray-50">
                                    <Image 
                                        src={item.img} 
                                        alt={item.title} 
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                                    />
                                    {item.tag && (
                                        <div className="absolute top-2 left-2 bg-orange-600 text-white text-[7px] font-black px-2 py-0.5 rounded-md uppercase z-10">
                                            {item.tag}
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white text-[8px] font-bold px-2 py-0.5 rounded-full z-10">
                                        {item.type}
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-4 flex flex-col flex-grow">
                                    <div className="mb-2">
                                        <h3 className="text-sm font-bold text-[#2D1B19] italic">{item.title}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap">👤 {item.capacity}</span>
                                            <span className="text-gray-200">|</span>
                                            <span className="text-[10px] text-orange-600/70 font-bold italic line-clamp-1">{item.desc}</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-3 border-t border-orange-50 flex items-center justify-between">
                                        <div>
                                            <p className="text-lg font-black text-[#2D1B19]">₹{item.price}</p>
                                            <p className="text-[8px] text-gray-400 uppercase font-bold tracking-widest">per booking</p>
                                        </div>
                                        
                                        <button className="group/btn relative flex items-center justify-center gap-2 bg-[#2D1B19] text-white px-4 py-2 rounded-xl overflow-hidden transition-all duration-300 hover:bg-orange-600 active:scale-95 shadow-lg">
                                            <span className="text-[10px] font-black tracking-tight uppercase">Book</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
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
                            className="w-10 h-10 rounded-xl border border-orange-100 flex items-center justify-center disabled:opacity-20 bg-white shadow-sm"
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
                            className="w-10 h-10 rounded-xl border border-orange-100 flex items-center justify-center disabled:opacity-20 bg-white shadow-sm"
                        >
                            →
                        </button>
                    </div>
                )}
            </main>

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

export default Vehicle;