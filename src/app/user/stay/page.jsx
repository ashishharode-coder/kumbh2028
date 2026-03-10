"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Stay = () => {

    const allOptions = [
        { id: 1, title: 'Luxury Royal Tent', type: 'Tent', price: 4000, beds: '2 Bed', address: 'Near Shipra Ghat, Sector 1', img: 'https://images.unsplash.com/photo-1523987355523-c725b0416954?q=80&w=600', tag: 'Royal' },
        { id: 2, title: 'Deluxe Swiss Cottage', type: 'Hotel', price: 6000, beds: '2 Bed', address: 'Harsiddhi Marg, Ujjain', img: 'https://images.unsplash.com/photo-1571775179298-548c772e27c1?q=80&w=600', tag: 'Best Seller' },
        { id: 3, title: 'Basic Dormitory', type: 'Dormitory', price: 1000, beds: '10 Bed', address: 'Railway Station Road', img: 'https://images.unsplash.com/photo-1555854277-2294f31c26b5?q=80&w=600' },
        { id: 4, title: 'Eco River Tent', type: 'Tent', price: 2500, beds: '3 Bed', address: 'Gaughat Area, Shipra Kinara', img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=600' },
        { id: 5, title: 'Heritage Mahal', type: 'Hotel', price: 8500, beds: '2 Bed', address: 'Mahakal Mandir Back Gate', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600', tag: 'Premium' },
        { id: 6, title: 'Sanyasi Ashram', type: 'Dormitory', price: 800, beds: '15 Bed', address: 'Ram Ghat, Ujjain', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f84af?q=80&w=600' },
        { id: 7, title: 'Family Glamping', type: 'Tent', price: 5500, beds: '4 Bed', address: 'Mela Area, Sector 4', img: 'https://images.unsplash.com/photo-1517824806704-9040b0377033?q=80&w=600' },
        { id: 8, title: 'Mahakal View Hotel', type: 'Hotel', price: 9500, beds: '2 Bed', address: 'Kot Teerth Marg', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600' },
        { id: 9, title: 'Shiv Shakti Niwas', type: 'Hotel', price: 3200, beds: '3 Bed', address: 'Freeganj, Ujjain', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600' },
        { id: 10, title: 'Sadhu Akhada Shed', type: 'Dormitory', price: 400, beds: '20 Bed', address: 'Bada Ganpati Road', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600' },

        { id: 11, title: 'Riverside Bamboo Hut', type: 'Tent', price: 1800, beds: '2 Bed', address: 'Mangalnath Marg', img: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=600' },
        { id: 12, title: 'Grand Ujjain Palace', type: 'Hotel', price: 12000, beds: '2 Bed', address: 'Indore-Ujjain Highway', img: 'https://images.unsplash.com/photo-1543674892-7d64d45df18b?q=80&w=600', tag: 'VVIP' },
        { id: 13, title: 'Yatri Bhawan', type: 'Dormitory', price: 1200, beds: '8 Bed', address: 'Mahakal Dharamshala', img: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=600' },
        { id: 14, title: 'Maharaja Suites', type: 'Hotel', price: 7200, beds: '2 Bed', address: 'Kal Bhairav Marg', img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=600' },
        { id: 15, title: 'Safari Tents', type: 'Tent', price: 3800, beds: '3 Bed', address: 'Nanakheda Area', img: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?q=80&w=600' },

        { id: 16, title: 'Avanti Niwas', type: 'Hotel', price: 4500, beds: '3 Bed', address: 'Bharib Ghat', img: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=600' },
        { id: 17, title: 'Bhakti Ashram', type: 'Dormitory', price: 600, beds: '12 Bed', address: 'Iskcon Temple Road', img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=600' },
        { id: 18, title: 'Narmada Cabin', type: 'Tent', price: 2100, beds: '2 Bed', address: 'Sector 5, Mela Area', img: 'https://images.unsplash.com/photo-1533167649158-6d508895b680?q=80&w=600' },
        { id: 19, title: 'Golden Suites', type: 'Hotel', price: 15000, beds: '2 Bed', address: 'Shipra River Front', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600' },
        { id: 20, title: 'Common Hall Stay', type: 'Dormitory', price: 300, beds: '50 Bed', address: 'Mela Ground', img: 'https://images.unsplash.com/photo-1512918766671-56001159af89?q=80&w=600' },

        { id: 21, title: 'Shanti Niketan', type: 'Hotel', price: 3500, beds: '2 Bed', address: 'Near Jantar Mantar', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600' },
        { id: 22, title: 'Kshatriya Bhawan', type: 'Dormitory', price: 500, beds: '10 Bed', address: 'Mangalnath Road', img: 'https://images.unsplash.com/photo-1555854277-2294f31c26b5?q=80&w=600' },
        { id: 23, title: 'River Breeze Tent', type: 'Tent', price: 3200, beds: '2 Bed', address: 'Siddhwat Ghat', img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=600' },
        { id: 24, title: 'Ujjaini Residency', type: 'Hotel', price: 5200, beds: '2 Bed', address: 'Tower Chowk', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600' },
        { id: 25, title: 'Mela Camp', type: 'Tent', price: 1500, beds: '4 Bed', address: 'Sector 10, Mela', img: 'https://images.unsplash.com/photo-1517824806704-9040b0377033?q=80&w=600' },
    ];

    const [activeTab, setActiveTab] = useState('All');
    const [sortOrder, setSortOrder] = useState('low');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const tabs = ['All', 'Tent', 'Hotel', 'Dormitory'];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, activeTab, sortOrder]);

    const filteredAndSorted = useMemo(() => {
        let result = allOptions.filter(opt => activeTab === 'All' || opt.type === activeTab);
        if (sortOrder === 'low') result.sort((a, b) => a.price - b.price);
        if (sortOrder === 'high') result.sort((a, b) => b.price - a.price);
        return result;
    }, [activeTab, sortOrder]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredAndSorted.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredAndSorted, currentPage]);

    const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);

    return (
        <div className="min-h-screen bg-[#FFFDF9] text-[#2D1B19] pb-8">

            <header className="pt-24 pb-6 px-6 text-center bg-white">
                <span className="text-orange-600 font-bold text-[10px] tracking-widest uppercase block mb-1">🚩 Kumbh Mela 2028</span>
                <h1 className="text-3xl md:text-5xl font-black italic tracking-tight">Accommodation <span className="text-orange-600">Portal</span></h1>
            </header>

             {/* STICKY FILTER AREA (Exact Vehicle UI Style) */}
            <div className="sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 py-3 shadow-sm">
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
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    {item.tag && (
                                        <div className="absolute top-2 left-2 bg-orange-600 text-white text-[7px] font-black px-2 py-0.5 rounded-md uppercase">
                                            {item.tag}
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white text-[8px] font-bold px-2 py-0.5 rounded-full">
                                        {item.type}
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-4 flex flex-col flex-grow">
                                    <div className="mb-2">
                                        <h3 className="text-sm font-bold text-[#2D1B19] italic">{item.title}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] text-gray-500 font-medium">🛏️ {item.beds}</span>
                                            <span className="text-gray-200">|</span>
                                            <span className="text-[10px] text-orange-600/70 font-bold italic line-clamp-1">📍 {item.address}</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-3 border-t border-orange-50 flex items-center justify-between">
                                        <div>
                                            <p className="text-lg font-black text-[#2D1B19]">₹{item.price}</p>
                                            <p className="text-[8px] text-gray-400 uppercase font-bold tracking-widest">per night</p>
                                        </div>
                                        
                                        <button className="group/btn relative flex items-center justify-center gap-2 bg-[#2D1B19] text-white px-4 py-2 rounded-xl overflow-hidden transition-all duration-300 hover:bg-orange-600 active:scale-95 shadow-lg">
                                            <span className="text-[10px] font-black tracking-tight uppercase">Reserve</span>
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

export default Stay;