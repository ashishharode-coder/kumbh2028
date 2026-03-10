"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayCircle,
  Calendar,
  ChevronRight,
  Heart,
  Send,
  Radio,
  ArrowUpRight,
  ChevronLeft,
} from "lucide-react";

// Components
import Places from "@/app/user/components/Places";
import PostFeed from "@/app/user/components/PostFeed";
import MelaFeed from "@/app/user/components/MelaFeed"; // Path check kar lena agar component folder mein hai

// Assets
const ramghat = "/images/ramghat.jpg";
const ramghat2 = "/images/ramghat2.jpg";
const ramghat3 = "/images/ramghat3.jpg";
const heroimg = "/images/heroimg.jpg";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Images");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4; // Sidebar ke liye 4 ya 6 best hai

  const slides = useMemo(
    () => [
      {
        img: heroimg,
        title: "Anant Kumbh 2028",
        place: "Ujjain News",
        desc: "Administration begins preparation for the 13 Akhadas.",
      },
      {
        img: ramghat,
        title: "Punya Salila Shipra",
        place: "Ram Ghat Update",
        desc: "New water treatment plant inaugurated near Gaughat.",
      },
      {
        img: ramghat2,
        title: "Maha Kaal Ki Nagri",
        place: "Mahakal Corridor",
        desc: "Phase 3 of Mahakal Corridor to be completed by 2027.",
      },
    ],
    [],
  );

  const upcomingEvents = [
    { date: "15", month: "APR", title: "1st Shahi Snan" },
    { date: "29", month: "APR", title: "Snan Daan Amavasya" },
    { date: "04", month: "MAY", title: "2nd Shahi Snan" },
    { date: "17", month: "MAY", title: "3rd Shahi Snan" },
  ];

  // Logic to generate and slice posts
  const mediaContent = useMemo(() => {
    const generateData = (type) =>
      Array.from({ length: 12 }, (_, i) => ({
        id: `${type}-${i + 1}`,
        url: [ramghat, ramghat2, ramghat3, heroimg][i % 4],
        user: `${type === "Img" ? "Ujjain_Bhakt" : "Mela_Explorer"}_${i + 1}`,
        likes: (Math.floor(Math.random() * 800) + 150).toString(),
        title: `Ujjain Sihasth Update #${i + 1} - Beautiful views from the Ghat.`,
        time: `${i + 2}h ago`,
      }));

    return {
      Images: generateData("Img"),
      Videos: generateData("Vid"),
    };
  }, []);

  // --- FIX: Calculating variables for PostFeed ---
  const allPosts = mediaContent[activeTab] || [];
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  const postsToDisplay = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return allPosts.slice(start, start + postsPerPage);
  }, [currentPage, activeTab, allPosts]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1c1e21] overflow-x-hidden font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative h-[65vh] md:h-[80vh] w-full overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].img}
              alt="News"
              fill
              className="object-cover opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>

            <div className="absolute bottom-24 left-0 w-full z-10 px-4 md:px-12">
              <div className="max-w-7xl mx-auto">
                <div className="space-y-4">
                  <motion.span
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-red-600 text-white px-2 py-1 font-bold text-[10px] uppercase flex items-center w-fit gap-1.5"
                  >
                    <Radio size={12} className="animate-pulse" /> Live Update
                  </motion.span>
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-4xl md:text-7xl font-black text-white italic leading-none tracking-tighter"
                  >
                    {slides[currentSlide].title}
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-gray-300 text-sm md:text-lg max-w-xl line-clamp-2"
                  >
                    {slides[currentSlide].desc}
                  </motion.p>
                  <button className="bg-white text-black px-6 py-2.5 font-black uppercase text-[10px] flex items-center gap-2 hover:bg-orange-600 hover:text-white transition-all">
                    Read Full Story <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-0 w-full bg-orange-600 h-10 flex items-center overflow-hidden z-20">
          <div className="bg-black text-white h-full px-4 flex items-center font-black italic text-[10px] z-30">
            BREAKING
          </div>
          <div className="whitespace-nowrap flex items-center animate-ticker text-white font-bold text-[10px] uppercase">
            {[1, 2].map((i) => (
              <span key={i} className="mx-8">
                🚩 Ujjain Sihasth 2028: New parking zones ready • 🚩 Morning
                Aarti crowd peaks • 🚩 24/7 Helpline launched
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. LIVE & CALENDAR */}
      <section className="max-w-7xl mx-auto px-4 mt-6 grid lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-md p-4 border-l-[6px] border-red-600 flex items-center gap-4 min-h-[100px] md:min-h-[120px]">
          <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0 shadow-inner">
            <Image src={ramghat} alt="aarti" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                <PlayCircle className="text-white" size={24} />
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <p className="text-red-600 text-[10px] font-black uppercase tracking-widest">
                Live Now
              </p>
            </div>
            <h3 className="font-black text-sm md:text-base text-gray-800 uppercase italic leading-tight">
              Sandhya <br /> Aarti
            </h3>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#2D1B19] rounded-2xl p-5 shadow-xl text-white flex flex-col md:flex-row items-center gap-6 border border-white/5">
          <div className="flex items-center gap-3 shrink-0 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6 w-full md:w-auto">
            <div className="bg-orange-600/20 p-2.5 rounded-xl">
              <Calendar size={24} className="text-orange-500" />
            </div>
            <h2 className="text-xs md:text-sm font-black uppercase tracking-widest italic leading-tight">
              Upcoming <br />{" "}
              <span className="text-orange-500 text-base md:text-lg">
                Events
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
            {upcomingEvents.map((ev, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col items-center justify-center hover:bg-orange-600 hover:scale-105 transition-all cursor-pointer group"
              >
                <span className="text-[10px] font-bold text-orange-400 group-hover:text-white mb-1">
                  {ev.month} {ev.date}
                </span>
                <p className="text-[11px] font-black text-center uppercase tracking-tighter line-clamp-1">
                  {ev.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MELA FEED & DASHBOARD (40:60) */}
      <section className="max-w-[1400px] mx-auto px-4 mt-12 mb-8">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* LEFT SIDE (40%) */}
          <div className="w-full lg:w-[40%]">
            <PostFeed
              currentPosts={postsToDisplay}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>

          {/* RIGHT SIDE (60%) */}
          <div className="w-full lg:w-[60%] lg:sticky lg:top-24">
            <MelaFeed />
          </div>
        </div>
      </section>

      <div className="mt-5">
        <Places />
      </div>

      <style jsx global>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          display: inline-flex;
          animation: ticker 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
