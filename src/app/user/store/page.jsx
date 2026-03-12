'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ProductDetailView from '@/app/user/components/ProductDetailView';

const product1 = "/images/product1.jpg";
const product2 = "/images/product2.jpg";
const product3 = "/images/product3.jpg";
const product4 = "/images/product4.jpg";

const Store = () => {
    const allItems = useMemo(() => [
        { id: 1, title: '5-Mukhi Nepali Rudraksh', type: 'Rudraksh', price: 450, date: '2024-03-01', img: product1, tag: 'Best Seller', originalPrice: 600, description: "Authentic 5-mukhi Rudraksh from Nepal, known for peace and health.Authentic 5-mukhi Rudraksh from Nepal, known for peace and health.Authentic 5-mukhi Rudraksh from Nepal, known for peace and health.Authentic 5-mukhi Rudraksh from Nepal, known for peace and health.Authentic 5-mukhi Rudraksh from Nepal, known for peace and health.Authentic 5-mukhi Rudraksh from Nepal, known for peace and health.", specifications: ["Natural Seed", "Nepali Origin", "Lab Certified"] },
        { id: 2, title: 'Original Tulsi Mala', type: 'Mala', price: 150, date: '2024-03-02', img: product2, tag: 'Original', originalPrice: 300, description: "Handmade Tulsi Mala for chanting and spiritual protection.", specifications: ["Pure Tulsi Wood", "108 Beads", "Hand-knotted"] },
        { id: 3, title: 'Mysore Sandalwood Dhoop', type: 'Dhoop', price: 120, date: '2024-03-03', img: product3, tag: 'Fragrant', originalPrice: 200, description: "Natural Mysore sandalwood fragrance for a divine atmosphere.", specifications: ["Charcoal Free", "Long Lasting", "Organic"] },
        { id: 4, title: 'Mahakal Bhashm (Special)', type: 'Bhashm', price: 210, date: '2024-03-04', img: product4, tag: 'Spiritual', originalPrice: 400, description: "Sacred Bhashm directly from Ujjain for ritual use.", specifications: ["Traditional Process", "Pure Ash", "Sancitified"] },
        { id: 5, title: 'Saffron Silk Cloth', type: 'Cloth', price: 890, date: '2024-03-05', img: product1, tag: 'Premium', originalPrice: 1200, description: "High-quality saffron silk cloth for deities and puja altar.", specifications: ["Pure Silk", "Golden Borders", "Soft Texture"] },
        { id: 6, title: 'Pure Copper Bracelet', type: 'Bracelet', price: 320, date: '2024-03-06', img: product2, tag: 'Pure', originalPrice: 500, description: "Scientific and spiritual benefits of pure copper in a sleek design.", specifications: ["99.9% Copper", "Adjustable Size", "Skin Friendly"] },
        { id: 7, title: 'Mahakal Ladoo Prasad', type: 'Prasad', price: 250, date: '2024-03-07', img: product3, tag: 'Delicious', originalPrice: 350, description: "The famous Mahakaleshwar temple style prasad made with pure ghee.", specifications: ["Pure Desi Ghee", "Hygienically Packed", "Fresh Ingredients"] },
        { id: 8, title: '7-Mukhi Rudraksh', type: 'Rudraksh', price: 1200, date: '2024-03-08', img: product2, tag: 'Rare', originalPrice: 1800, description: "Rare 7-mukhi Rudraksh for prosperity and Mahalaxmi blessings.", specifications: ["Authentic", "Large Size", "Collector's Grade"] },
        { id: 9, title: 'Lotus Seed Mala', type: 'Mala', price: 550, date: '2024-03-09', img: product1, tag: 'Popular', originalPrice: 800, description: "Kamalgatta mala specially used for Lakshmi Puja.", specifications: ["Natural Lotus Seeds", "Strong Thread", "Traditional"] },
        { id: 10, title: 'Rose Dhoop Sticks', type: 'Dhoop', price: 90, date: '2024-03-10', img: product2, tag: 'Fragrant', originalPrice: 150, description: "Sweet rose fragrance to soothe the mind and soul.", specifications: ["Low Smoke", "Synthetic Free", "Eco-friendly"] },
        { id: 11, title: 'Sacred Havan Bhashm', type: 'Bhashm', price: 150, date: '2024-03-11', img: product2, tag: 'Spiritual', originalPrice: 250, description: "Pure ash collected from Vedic Havan ceremonies.", specifications: ["Energized", "Herbal Content", "Fine Powder"] },
        { id: 12, title: 'Cotton Pooja Cloth', type: 'Cloth', price: 400, date: '2024-03-12', img: product3, tag: 'Traditional', originalPrice: 600, description: "Pure cotton cloth for daily puja essentials.", specifications: ["100% Cotton", "Fast Color", "Durable"] },
        { id: 13, title: 'Brass Om Bracelet', type: 'Bracelet', price: 280, date: '2024-03-13', img: product2, tag: 'Elegant', originalPrice: 450, description: "Beautifully carved brass kada with sacred 'Om' symbol.", specifications: ["Solid Brass", "Handcrafted", "Anti-tarnish"] },
        { id: 14, title: 'Dry Fruit Prasad Pack', type: 'Prasad', price: 450, date: '2024-03-14', img: product3, tag: 'Delicious', originalPrice: 600, description: "Mixed dry fruits offered as sacred prasad.", specifications: ["Premium Quality", "Vacuum Packed", "Mixed Nuts"] },
        { id: 15, title: '1-Mukhi Rudraksh', type: 'Rudraksh', price: 2500, date: '2024-03-15', img: product2, tag: 'Premium', originalPrice: 3500, description: "The most powerful Rudraksh for ultimate spiritual awakening.", specifications: ["Lab Certified", "Half-moon Shape", "High Energy"] },
        { id: 16, title: 'Sandalwood Incense Holder', type: 'Incense Holders', price: 350, date: '2024-03-16', img: product1, tag: 'Artisan', originalPrice: 500, description: "Hand-carved sandalwood holder for your incense sticks.", specifications: ["Pure Sandalwood", "Intricate Design", "Durable"] },  
        { id: 17, title: 'Brass Puja Thali', type: 'Puja Thalis', price: 800, date: '2024-03-17', img: product2, tag: 'Traditional', originalPrice: 1200, description: "Complete brass thali set for all your puja needs.", specifications: ["Solid Brass", "Includes Bowls", "Polished Finish"] },
        { id: 18, title: 'Holy Water Bottle', type: 'Holy Water Bottles', price: 220, date: '2024-03-18', img: product3, tag: 'Sacred', originalPrice: 350, description: "Specially designed bottle to store holy water for rituals.", specifications: ["Glass Body", "Leak-proof Cap", "Decorative"] },
        { id: 19, title: 'Meditation Cushion', type: 'Meditation Cushions', price: 1500, date: '2024-03-19', img: product4, tag: 'Comfort', originalPrice: 2500, description: "Ergonomic cushion for comfortable meditation sessions.", specifications: ["High-density Foam", "Removable Cover", "Portable"] },
        { id: 20, title: 'Ganesha Statue', type: 'Divine Statues', price: 2000, date: '2024-03-20', img: product1, tag: 'Divine', originalPrice: 3000, description: "Beautifully crafted Ganesha statue for blessings and decor.", specifications: ["Resin Material", "Hand-painted", "Intricate Details"] },
        { id: 21, title: 'Lakshmi Statue', type: 'Divine Statues', price: 2500, date: '2024-03-21', img: product2, tag: 'Divine', originalPrice: 3500, description: "Elegant Lakshmi statue to invite wealth and prosperity.", specifications: ["Resin Material", "Hand-painted", "Intricate Details"] },
        { id: 22, title: 'Shiva Statue', type: 'Divine Statues', price: 3000, date: '2024-03-22', img: product3, tag: 'Divine', originalPrice: 4500, description: "Majestic Shiva statue for spiritual energy and decor.", specifications: ["Resin Material", "Hand-painted", "Intricate Details"] },
        { id: 23, title: 'Kali Statue', type: 'Divine Statues', price: 2800, date: '2024-03-23', img: product4, tag: 'Divine', originalPrice: 4000, description: "Powerful Kali statue to ward off negativity and evil.", specifications: ["Resin Material", "Hand-painted", "Intricate Details"] },
        { id: 24, title: 'Hanuman Statue', type: 'Divine Statues', price: 2200, date: '2024-03-24', img: product1, tag: 'Divine', originalPrice: 3500, description: "Dynamic Hanuman statue for strength and protection.", specifications: ["Resin Material", "Hand-painted", "Intricate Details"] },
        { id: 25, title: 'Saraswati Statue', type: 'Divine Statues', price: 2600, date: '2024-03-25', img: product2, tag: 'Divine', originalPrice: 4000, description: "Graceful Saraswati statue for wisdom and creativity.", specifications: ["Resin Material", "Hand-painted", "Intricate Details"] },
        { id: 26, title: 'Vishnu Statue', type: 'Divine Statues', price: 2800, date: '2024-03-26', img: product3, tag: 'Divine', originalPrice: 4500, description: "Serene Vishnu statue for harmony and protection.", specifications: ["Resin Material", "Hand-painted", "Intricate Details"] },
        { id: 27, title: 'Durga Statue', type: 'Divine Statues', price: 3000, date: '2024-03-27', img: product4, tag: 'Divine', originalPrice: 5000, description: "Fierce Durga statue to empower and protect your space.", specifications: ["Resin Material", "Hand-painted", "Intricate Details"] },
    ], []);

    const [activeTab, setActiveTab] = useState('All');
    const [sortOrder, setSortOrder] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const itemsPerPage = 20;

    const tabs = ['All', 'Rudraksh', 'Mala', 'Dhoop', 'Bhashm', 'Cloth', 'Bracelet', 'Prasad','Pooja Essentials', 'Spiritual Books', 'Yantras', 'Incense Holders', 'Puja Thalis', 'Holy Water Bottles', 'Meditation Cushions', 'Divine Statues'];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, activeTab, sortOrder, selectedProduct]);

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

    if (selectedProduct) {
        return (
            <ProductDetailView 
                product={{
                    ...selectedProduct,
                    category: selectedProduct.type,
                    rating: 4.8,
                    reviews: 120,
                    codAvailable: true,
                    returnAvailable: true,
                    freeDelivery: true,
                    images: [selectedProduct.img, product2, product3, product4]
                }} 
                onBack={() => setSelectedProduct(null)} 
                onAddToCart={(prod) => console.log("Added to cart:", prod)} 
            />
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFDF9] text-[#2D1B19] ">
            <header className="pt-24 pb-6 px-6 text-center bg-white">
                <span className="text-orange-600 font-bold text-[10px] tracking-widest uppercase block mb-1">🚩 Marketplace</span>
                <h1 className="text-3xl md:text-5xl font-black italic">Vedic <span className="text-orange-600">Collection</span></h1>
            </header>

            {/* --- Tabs Section  --- */}
        <div className="sticky top-[70px] md:top-[85px] z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 py-1 md:py-4 shadow-sm transition-all">
            <div className="max-w-7xl mx-auto space-y-3 px-4">
            <div className="flex overflow-x-auto no-scrollbar gap-2">
                <div className="flex gap-2">
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
        </div>

        {/* Sort Options */}
        <div className="flex flex-wrap items-center justify-center gap-2">
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
            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* EMPTY STATE LOGIC: 
                  If no products found for selected category 
                */}
                {paginatedData.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-5 px-4 text-center"
                    >
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-orange-100 blur-3xl rounded-full opacity-50 scale-150 animate-pulse"></div>
                            <span className="relative text-6xl md:text-8xl">🕉️</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black italic text-[#2D1B19] mb-2">
                            Divine items <span className="text-orange-600">arriving soon</span>
                        </h2>
                        <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em] max-w-xs">
                            We are currently sourcing authentic {activeTab} for you.
                        </p>
                        <button 
                            onClick={() => setActiveTab('All')}
                            className="mt-8 px-8 py-3 bg-[#2D1B19] text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-orange-600 transition-colors shadow-xl"
                        >
                            Explore All Collections
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                        <AnimatePresence mode='popLayout'>
                            {paginatedData.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onClick={() => setSelectedProduct(item)}
                                    className="bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-xl transition-shadow flex flex-col group overflow-hidden cursor-pointer"
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
                                            
                                            <button 
                                                onClick={(e) => { 
                                                    e.stopPropagation();
                                                    setSelectedProduct(item);
                                                }} 
                                                className="group/btn relative flex items-center justify-center gap-1 bg-[#2D1B19] text-white pl-3 pr-2 py-1.5 md:pl-4 md:pr-3 md:py-2 rounded-full overflow-hidden transition-all duration-300 hover:bg-orange-600 active:scale-95 shadow-lg"
                                            >
                                                <span className="text-[9px] md:text-[10px] font-black tracking-tight uppercase">Add</span>
                                                <div className="bg-white/20 rounded-full p-0.5 md:p-1 group-hover/btn:rotate-90 transition-transform duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-3.5 md:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </div>
                                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* PAGINATION LOGIC */}
                {totalPages > 1 && paginatedData.length > 0 && (
                    <div className="mt-10 flex justify-center items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="w-10 h-10 rounded-xl border border-orange-100 flex items-center justify-center disabled:opacity-20 bg-white"
                        >←</button>
                        <div className="flex gap-1.5">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all ${
                                        currentPage === i + 1 ? 'bg-orange-600 text-white shadow-lg scale-110' : 'bg-white border border-orange-100 text-orange-900/40'
                                    }`}
                                >{i + 1}</button>
                            ))}
                        </div>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="w-10 h-10 rounded-xl border border-orange-100 flex items-center justify-center disabled:opacity-20 bg-white"
                        >→</button>
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

export default Store;