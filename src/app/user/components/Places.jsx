'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';

// Path Check: Ye image 'public/images/mahakal.jpg' mein honi chahiye
const mahakalImg = "/images/ramghat.jpg";
const ramghat2 = "/images/ramghat2.jpg";
const ramghat3 = "/images/ramghat3.jpg";
const heroimg = "/images/heroimg.jpg";

const Places = () => {
    const places = [
        {
            title: "Mahakaleshwar",
            desc: "Jyotirlinga temple known for powerful Bhasma Aarti experience.",
            img: mahakalImg
        },
        {
            title: "Tower Clock",
            desc: "Historic landmark standing tall in central Ujjain city.",
            img: ramghat2 
        },
        {
            title: "Kaal Bhairav",
            desc: "Devotees offer liquor to fierce form of Shiva.",
            img: ramghat3
        },
        {
            title: "Mahakal Corridor",
            desc: "Sacred corridor depicting Lord Shiva's divine spiritual journey.",
            img: heroimg
        }
    ];

    return (
        <section className="bg-[#F3EFE0] py-16 px-4 md:px-12 font-sans overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
                    <div className="space-y-2">
                        <p className="text-red-600 font-bold text-xs uppercase tracking-widest">About Ujjain</p>
                        <h2 className="text-4xl md:text-5xl font-black text-[#2D1B19] italic leading-tight">
                            The Eternal City <br /> of Temples
                        </h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium">
                            Ujjain, one of oldest and holiest cities, is a timeless blend of spirituality, culture, and history. 
                        </p>
                        <button className="text-orange-600 font-black text-sm uppercase mt-4 flex items-center gap-1 hover:gap-3 transition-all duration-300">
                            See all packages <ArrowUpRight size={16} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {places.map((place, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="relative group h-[450px] overflow-hidden rounded-xl cursor-pointer shadow-xl bg-gray-200"
                        >
                            <Image 
                                src={place.img} 
                                alt={place.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 25vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                unoptimized={true} // Debugging ke liye: agar image nahi dikh rahi toh ise true rakhein
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>

                            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-20">
                                <p className="text-xs font-medium text-gray-300 mb-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    {place.desc}
                                </p>
                                <h3 className="text-2xl font-black tracking-tighter uppercase italic border-l-4 border-orange-600 pl-3">
                                    {place.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Places;