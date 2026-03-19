'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Star } from 'lucide-react';
import { ROUTES } from "@/app/constant/routes";

const RecommendationRow = ({ type }) => {
    const router = useRouter();

    const handleNavigation = (id) => {
        switch (type) {
            case 'hotels': router.push(ROUTES.USER_STAY_DETAIL_VIEW(id)); break;
            case 'orders': router.push(ROUTES.USER_PRODUCT_DETAIL_VIEW(id)); break;
            case 'rides': router.push(ROUTES.USER_VEHICLE); break;
            case 'pooja': router.push(ROUTES.USER_POOJA_DETAIL_VIEW(id)); break;
            default: router.push(ROUTES.USER_HOME);
        }
    };

    const recommendationData = {
        orders: { title: "Temple Store", subtitle: "Blessings for home", tag: "Prasad" },
        rides: { title: "Quick Rides", subtitle: "Comfortable travel", tag: "E-Rickshaw" },
        hotels: { title: "Nearby Stays", subtitle: "Top rated hotels", tag: "Hotel" },
        pooja: { title: "Vishesh pooja", subtitle: "Divine rituals", tag: "Ritual" }
    };

    const currentMeta = recommendationData[type] || recommendationData.orders;
    
    // 20 Items logic
    const items = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: i % 2 === 0 ? `Premium ${currentMeta.tag}` : `Special ${currentMeta.tag} Pack`,
        price: i % 2 === 0 ? "₹501" : "₹1,250",
        img: `https://images.unsplash.com/photo-${1544367567 + (i % 5)}-0f2fcb009e0b?w=400`,
        rating: "4.8"
    }));

    return (
        <section className="py-3 bg-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-5 px-6">
                    <div>
                        <h2 className="text-xl font-black text-[#2D1B19] uppercase italic tracking-tight">
                            {currentMeta.title}
                        </h2>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-[2px] bg-orange-500"></span>
                            <p className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em]">
                                {currentMeta.subtitle}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Horizontal Scroll Container */}
                <div className="relative">
                    {/* Right Side Fade Gradient: Isse pata chalta hai ki aur content hai */}
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden" />

                    <div className="flex overflow-x-auto gap-4 px-6 pb-2 no-scrollbar snap-x snap-mandatory">
                        {items.map((item) => (
                            <motion.div 
                                key={item.id}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleNavigation(item.id)}
                                // MOBILE TRICK: w-[75vw] ya w-[260px] taaki agla card side se dikhe
                                className="flex-shrink-0 w-[72vw] md:w-[280px] snap-start group cursor-pointer"
                            >
                                {/* Card Body */}
                                <div className="bg-[#FFFDF9] rounded-[2rem] border border-orange-100/50 p-2 shadow-sm group-hover:shadow-md transition-all">
                                    {/* Image */}
                                    <div className="relative aspect-square rounded-[1.8rem] overflow-hidden mb-3">
                                        <img 
                                            src={item.img} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover" 
                                        />
                                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                                            <Star size={10} className="text-orange-500 fill-orange-500" />
                                            <span className="text-[10px] font-black text-[#2D1B19]">{item.rating}</span>
                                        </div>
                                    </div>

                                    {/* Text Info */}
                                    <div className="px-3 pb-2">
                                        <h4 className="text-[13px] font-bold text-[#2D1B19] truncate mb-1">
                                            {item.name}
                                        </h4>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[15px] font-black text-orange-600">
                                                {item.price}
                                            </span>
                                            <div className="w-7 h-7 bg-[#2D1B19] rounded-full flex items-center justify-center text-white">
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        
                        {/* Spacer for last card to center properly */}
                        <div className="flex-shrink-0 w-6 md:hidden" />
                    </div>
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
};

export default RecommendationRow;