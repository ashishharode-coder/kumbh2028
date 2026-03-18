"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StayDetailView from "../components/StayDetailView";
import { IoHome } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/constant/routes";

// --- Images ---
const hotel1 = "/images/hotel1.jpg";
const hotel2 = "/images/hotel2.jpg";
const hotel3 = "/images/hotel3.jpg";
const hotel4 = "/images/hotel4.jpg";
const hotel5 = "/images/hotel5.jpg";
const tent1 = "/images/tent1.jpg";
const tent2 = "/images/tent2.jpg";
const dormitory1 = "/images/dormitory1.jpg";
const dormitory2 = "/images/dormitory2.jpg";
const room2 = "/images/room2.jpg";
const room3 = "/images/room3.jpg";
const room4 = "/images/room4.jpg";
const room5 = "/images/room5.jpg";

const Stay = () => {
  const allOptions = [
    {
      id: 1,
      title: "Luxury Royal Tent",
      type: "Tent",
      price: 4000,
      beds: "2 Bed",
      address: "Near Shipra Ghat, Sector 1",
      img: tent1,
      tag: "Royal",
    },
    {
      id: 2,
      title: "Deluxe Swiss Cottage",
      type: "Hotel",
      price: 6000,
      beds: "2 Bed",
      address: "Harsiddhi Marg, Ujjain",
      img: hotel2,
      tag: "Best Seller",
    },
    {
      id: 3,
      title: "Basic Dormitory",
      type: "Dormitory",
      price: 1000,
      beds: "10 Bed",
      address: "Railway Station Road",
      img: dormitory1,
      tag: "Affordable",
    },
    {
      id: 4,
      title: "Eco River Tent",
      type: "Tent",
      price: 2500,
      beds: "3 Bed",
      address: "Gaughat Area, Shipra Kinara",
      img: tent2,
      tag: "Eco Friendly",
    },
    {
      id: 5,
      title: "Heritage Mahal",
      type: "Hotel",
      price: 8500,
      beds: "2 Bed",
      address: "Mahakal Mandir Back Gate",
      img: hotel5,
      tag: "Premium",
    },
    {
      id: 6,
      title: "Sanyasi Ashram",
      type: "Dormitory",
      price: 800,
      beds: "15 Bed",
      address: "Ram Ghat, Ujjain",
      img: dormitory2,
      tag: "Budget",
    },
    {
      id: 7,
      title: "Family Glamping",
      type: "Tent",
      price: 5500,
      beds: "4 Bed",
      address: "Mela Area, Sector 4",
      img: room3,
      tag: "Family Friendly",
    },
    {
      id: 8,
      title: "Mahakal View Hotel",
      type: "Hotel",
      price: 9500,
      beds: "2 Bed",
      address: "Kot Teerth Marg",
      img: room4,
      tag: "Luxury",
    },
    {
      id: 9,
      title: "Shiv Shakti Niwas",
      type: "Hotel",
      price: 3200,
      beds: "3 Bed",
      address: "Freeganj, Ujjain",
      img: room5,
      tag: "Affordable",
    },
    {
      id: 10,
      title: "Sadhu Akhada Shed",
      type: "Dormitory",
      price: 400,
      beds: "20 Bed",
      address: "Bada Ganpati Road",
      img: dormitory1,
      tag: "Basic",
    },
    {
      id: 11,
      title: "Riverside Bamboo Hut",
      type: "Tent",
      price: 1800,
      beds: "2 Bed",
      address: "Mangalnath Marg",
      img: tent1,
      tag: "Nature Stay",
    },
    {
      id: 12,
      title: "Grand Ujjain Palace",
      type: "Hotel",
      price: 12000,
      beds: "2 Bed",
      address: "Indore-Ujjain Highway",
      img: hotel3,
      tag: "VVIP",
    },
    {
      id: 13,
      title: "Yatri Bhawan",
      type: "Dormitory",
      price: 1200,
      beds: "8 Bed",
      address: "Mahakal Dharamshala",
      img: dormitory2,
      tag: "Affordable",
    },
    {
      id: 14,
      title: "Maharaja Suites",
      type: "Hotel",
      price: 7200,
      beds: "2 Bed",
      address: "Kal Bhairav Marg",
      img: room3,
      tag: "Premium",
    },
    {
      id: 15,
      title: "Safari Tents",
      type: "Tent",
      price: 3800,
      beds: "3 Bed",
      address: "Nanakheda Area",
      img: room4,
      tag: "Adventure",
    },
    {
      id: 16,
      title: "Avanti Niwas",
      type: "Hotel",
      price: 4500,
      beds: "3 Bed",
      address: "Bharib Ghat",
      img: room5,
      tag: "Affordable",
    },
    {
      id: 17,
      title: "Bhakti Ashram",
      type: "Dormitory",
      price: 600,
      beds: "12 Bed",
      address: "Iskcon Temple Road",
      img: dormitory1,
      tag: "Budget",
    },
    {
      id: 18,
      title: "Narmada Cabin",
      type: "Tent",
      price: 2100,
      beds: "2 Bed",
      address: "Sector 5, Mela Area",
      img: tent2,
      tag: "Eco Friendly",
    },
    {
      id: 19,
      title: "Golden Suites",
      type: "Hotel",
      price: 15000,
      beds: "2 Bed",
      address: "Shipra River Front",
      img: room4,
      tag: "Premium",
    },
    {
      id: 20,
      title: "Common Hall Stay",
      type: "Dormitory",
      price: 300,
      beds: "50 Bed",
      address: "Mela Ground",
      img: dormitory2,
      tag: "Basic",
    },
    {
      id: 21,
      title: "Shivaji Tent Camp",
      type: "Tent",
      price: 3200,
      beds: "4 Bed",
      address: "Sector 2, Mela Area",
      img: tent1,
      tag: "Family Friendly",
    },
    {
      id: 22,
      title: "Regal Heritage Hotel",
      type: "Hotel",
      price: 9000,
      beds: "2 Bed",
      address: "Rajwada Area",
      img: hotel4,
      tag: "Luxury",
    },
    {
      id: 23,
      title: "Sadhu Sadan Dormitory",
      type: "Dormitory",
      price: 500,
      beds: "25 Bed",
      address: "Shivaji Ghat",
      img: dormitory1,
      tag: "Budget",
    },
    {
      id: 24,
      title: "Lotus Lake Tent",
      type: "Tent",
      price: 2700,
      beds: "3 Bed",
      address: "Lotus Lake Area",
      img: tent2,
      tag: "Nature Stay",
    },
  ];

  const router = useRouter();

  const [activeTab, setActiveTab] = useState("All");
  const [sortOrder, setSortOrder] = useState("low");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStay, setSelectedStay] = useState(null);
  const itemsPerPage = 20;

  const tabs = ["All", "Tent", "Hotel", "Dormitory", "VVIP Suites", "Ashram"];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, activeTab, sortOrder]);

  const filteredAndSorted = useMemo(() => {
    let result = allOptions.filter(
      (opt) => activeTab === "All" || opt.type === activeTab,
    );
    if (sortOrder === "low") result.sort((a, b) => a.price - b.price);
    if (sortOrder === "high") result.sort((a, b) => b.price - a.price);
    return result;
  }, [activeTab, sortOrder]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSorted.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSorted, currentPage]);

  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2D1B19]">
      <AnimatePresence mode="wait">
        {!selectedStay ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <header className="pt-24 pb-6 px-6 text-center bg-white">
              <span className="text-orange-600 font-bold text-[10px] tracking-widest uppercase block mb-1">
                🚩 Kumbh Mela 2028
              </span>
              <h1 className="text-3xl md:text-5xl font-black italic tracking-tight">
                Pilgrim <span className="text-orange-600">Stay</span>
              </h1>
            </header>

            {/* STICKY FILTER AREA */}
            <div className="sticky top-[70px] md:top-[85px] z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 py-1 md:py-4 shadow-sm transition-all">
              <div className="max-w-7xl mx-auto space-y-3 px-4">
                <div className="flex overflow-x-auto no-scrollbar gap-2 md:justify-center">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setCurrentPage(1);
                      }}
                      className={`px-5 py-2 rounded-full text-[10px] md:text-xs font-bold transition-all whitespace-nowrap ${
                        activeTab === tab
                          ? "bg-orange-600 text-white shadow-md"
                          : "bg-orange-50 text-orange-900/40 hover:bg-orange-100"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {[
                    { id: "low", label: "Price: Low to High" },
                    { id: "high", label: "Price: High to Low" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSortOrder(opt.id);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-[9px] md:text-[10px] font-black border transition-all ${
                        sortOrder === opt.id
                          ? "bg-orange-50 border-orange-600 text-orange-600 shadow-sm"
                          : "bg-transparent border-gray-100 text-gray-400"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-8">
              {/* --- EMPTY STATE LOGIC START --- */}
              {paginatedData.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-5 px-4 text-center"
                >
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-orange-100 blur-3xl rounded-full opacity-50 scale-150 animate-pulse"></div>
                    <span className="relative text-6xl md:text-8xl">
                      <IoHome />
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black italic text-[#2D1B19] mb-2">
                    Stay <span className="text-orange-600">Arriving Soon</span>
                  </h2>
                  <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em] max-w-xs">
                    We are currently arranging the best {activeTab}{" "}
                    accommodations for the Mahakumbh.
                  </p>
                  <button
                    onClick={() => setActiveTab("All")}
                    className="mt-8 px-8 py-3 bg-[#2D1B19] text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-orange-600 transition-colors shadow-xl"
                  >
                    View All Stays
                  </button>
                </motion.div>
              ) : (
                /* --- GRID VIEW --- */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  <AnimatePresence mode="popLayout">
                    {paginatedData.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={() =>
                          router.push(ROUTES.USER_STAY_DETAIL_VIEW(item.id))
                        }
                        className="bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-xl transition-shadow flex flex-col group overflow-hidden cursor-pointer"
                      >
                        <div className="relative aspect-video overflow-hidden bg-gray-50">
                          <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute top-2 left-2 bg-orange-600 text-white text-[7px] font-black px-2 py-0.5 rounded-md uppercase">
                            {item.type}
                          </div>
                        </div>

                        <div className="p-4 flex flex-col flex-grow">
                          <div className="mb-2">
                            <h3 className="text-sm font-bold text-[#2D1B19] italic">
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-gray-500 font-medium">
                                🛏️ {item.beds}
                              </span>
                              <span className="text-gray-200">|</span>
                              <span className="text-[10px] text-orange-600/70 font-bold italic line-clamp-1">
                                📍 {item.address}
                              </span>
                            </div>
                          </div>

                          <div className="mt-auto pt-3 border-t border-orange-50 flex items-center justify-between">
                            <div>
                              <p className="text-lg font-black text-[#2D1B19]">
                                ₹{item.price}
                              </p>
                              <p className="text-[8px] text-gray-400 uppercase font-bold tracking-widest">
                                per night
                              </p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  ROUTES.USER_STAY_DETAIL_VIEW(item.id),
                                );
                              }}
                              className="group/btn relative flex items-center justify-center gap-2 bg-[#2D1B19] text-white px-4 py-2 rounded-xl overflow-hidden shadow-lg transition-all hover:bg-orange-600"
                            >
                              <span className="text-[10px] font-black tracking-tight uppercase">
                                Reserve
                              </span>
                              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
              {/* --- EMPTY STATE LOGIC END --- */}

              {/* PAGINATION */}
              {totalPages > 1 && paginatedData.length > 0 && (
                <div className="mt-10 flex justify-center items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="w-10 h-10 rounded-xl border border-orange-100 flex items-center justify-center disabled:opacity-20 bg-white shadow-sm"
                  >
                    ←
                  </button>
                  <div className="flex gap-1.5">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all ${currentPage === i + 1 ? "bg-orange-600 text-white shadow-lg scale-110" : "bg-white border border-orange-100 text-orange-900/40"}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="w-10 h-10 rounded-xl border border-orange-100 flex items-center justify-center disabled:opacity-20 bg-white shadow-sm"
                  >
                    →
                  </button>
                </div>
              )}
            </main>
          </motion.div>
        ) : (
          /* --- DETAIL VIEW --- */
          <StayDetailView
            stay={selectedStay}
            onBack={() => setSelectedStay(null)}
            onReserve={(data) => console.log("Final Booking:", data)}
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Stay;
