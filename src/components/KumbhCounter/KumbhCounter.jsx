"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bgimg = "/counter_bg.jpeg";

export default function KumbhCounter() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
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
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center font-sans overflow-hidden bg-no-repeat bg-cover bg-right md:bg-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${bgimg})`,
      }}
    >
      {/* Dark Overlay for Depth */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

      <div className="relative z-10 w-full px-4 text-center">
        {/* 1. UPDATED HEADING SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-6"
        >
          {/* English Sub-heading: Clean & Spaced */}
          <span className="text-orange-400 text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-2 drop-shadow-md">
            Simhastha Kumbh Mela
          </span>
          
          {/* Main Hindi Heading */}
          <h1 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter drop-shadow-2xl">
            सिंहस्थ कुंभ मेला <span className="text-orange-500">2028</span>
          </h1>
          
          {/* Decorative underline */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            className="h-1 bg-orange-500 mt-2 rounded-full"
          />
        </motion.div>

        {/* 2. SUBTITLE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10 flex flex-col items-center"
        >
          <div className="bg-orange-600/80 backdrop-blur-sm px-4 py-1 rounded-full mb-3 border border-orange-400/50 shadow-lg">
            <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-[0.2em]">
              Ujjain Mahakal
            </span>
          </div>
          <p className="text-white/80 text-sm md:text-lg font-medium tracking-widest uppercase">
            Starts: <span className="text-orange-400 font-bold">March 27, 2028</span>
          </p>
        </motion.div>

        {/* 3. FULLY TRANSPARENT COUNTER GRID */}
        <div className="grid grid-cols-4 gap-2 md:gap-6 max-w-[95%] md:max-w-3xl mx-auto">
          {timeUnits.map((unit, idx) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className="relative bg-transparent backdrop-blur-md rounded-xl md:rounded-[2.5rem] p-3 md:p-8 border border-white/20 group hover:border-orange-500/50 transition-colors duration-500"
            >
              <div className="h-10 md:h-20 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={unit.value}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    className="text-2xl md:text-6xl font-black text-white tabular-nums leading-none drop-shadow-lg"
                  >
                    {String(unit.value).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </div>
              
              <div className="mt-2 text-[9px] md:text-xs font-bold uppercase text-orange-400/90 tracking-widest group-hover:text-white transition-colors">
                {unit.label}
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}