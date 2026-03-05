"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });

    useEffect(() => {
        // Target Date: March 27, 2028
        const targetDate = new Date("March 27, 2028 00:00:00").getTime();
        
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const timeUnits = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
    ];

    return (
        <section className="min-h-screen py-20 px-4 bg-[#FFFDF9] flex flex-col items-center justify-center font-sans">
            <div className="max-w-4xl w-full text-center">
                
                {/* 1. MAIN HEADING */}
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-black text-[#2D1B19] italic tracking-tighter mb-4"
                >
                    Simhastha Kumbh Mela <span className="text-orange-600">2028</span>
                </motion.h1>

                {/* 2. UPCOMING BADGE / LINE */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center gap-3 mb-12"
                >
                    <div className="flex items-center gap-2 bg-orange-50 px-4 py-1 rounded-full border border-orange-100">
                        <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
                        <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em]">Upcoming Event</span>
                    </div>
                    <p className="text-gray-500 text-sm font-medium max-w-lg leading-relaxed">
                        The upcoming Kumbh Mela in <span className="font-bold text-[#2D1B19]">Ujjain, Madhya Pradesh</span> is scheduled for <span className="text-orange-600 font-bold underline underline-offset-4">March 27, 2028</span>
                    </p>
                </motion.div>

                {/* 3. THE COUNTER (Compact Version for All Devices) */}
<div className="grid grid-cols-4 gap-2 md:gap-4 max-w-3xl mx-auto">
    {timeUnits.map((unit, idx) => (
        <motion.div
            key={unit.label}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 + (idx * 0.05) }}
            className="bg-white rounded-2xl md:rounded-[2rem] p-3 md:p-6 border border-orange-100 shadow-sm group hover:border-orange-500 transition-all duration-500"
        >
            <div className="h-8 md:h-14 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={unit.value}
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -15, opacity: 0 }}
                        className="text-xl md:text-5xl font-black text-[#2D1B19] tabular-nums"
                    >
                        {String(unit.value).padStart(2, '0')}
                    </motion.span>
                </AnimatePresence>
            </div>
            <div className="mt-1 text-[8px] md:text-[10px] font-black uppercase tracking-wider text-gray-400 group-hover:text-orange-600 transition-colors">
                {unit.label.slice(0, 3)} {/* Days -> Day, Minutes -> Min */}
            </div>
        </motion.div>
    ))}
</div>
            </div>
        </section>
    );
}