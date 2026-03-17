'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F3EFE0]">
            {/* Background Decorative Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-200/30 blur-[100px] rounded-full"></div>
            
            <div className="relative flex flex-col items-center">
                {/* Spiritual Symbol or Logo Circle */}
                <motion.div
                    animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                        rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="w-24 h-24 rounded-full border-4 border-t-orange-600 border-r-orange-200 border-b-orange-100 border-l-orange-400 flex items-center justify-center shadow-lg bg-white"
                >
                    <span className="text-4xl">🔱</span>
                </motion.div>

                {/* Text Animation */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-center"
                >
                    <h2 className="text-xl font-black text-[#2D1B19] tracking-tighter uppercase italic">
                        KUMBH<span className="text-orange-600">2028</span>
                    </h2>
                    <div className="flex gap-1 mt-2 justify-center">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
            
            {/* Bottom Quote */}
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                className="absolute bottom-10 text-[10px] font-bold uppercase tracking-[0.3em] text-orange-900"
            >
                Shree Mahakaleshwar Jyotirlinga, Ujjain
            </motion.p>
        </div>
    );
};

export default Loader;