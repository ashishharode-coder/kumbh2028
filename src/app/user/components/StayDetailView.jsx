'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, CheckCircle2, Star, ShieldCheck, Heart, 
  Share2, ArrowLeft, ArrowRight, Home, Zap, Clock,
  Wifi, Car, Coffee, Shield
} from 'lucide-react';

const StayDetailView = ({ stay, onBack, onReserve }) => {
  // Default data for Stay if props are empty
  const data = stay || {
    title: "Luxury Royal Tent",
    price: 4000,
    address: "Near Shipra Ghat, Sector 1, Ujjain",
    beds: "2 Bed",
    rating: 4.8,
    reviews: 520,
    checkIn: "12:00 PM",
    checkOut: "10:00 AM",
    facilities: ["Free Wi-Fi", "Pure Veg Meals", "Attached Washroom", "Charging Point"],
    parking: "Available (Free)",
    description: "Experience the Kumbh Mela in luxury with our Royal Tents. Located just walking distance from the main Ghats, these tents offer premium bedding, 24/7 security, and a traditional spiritual environment. Perfect for pilgrims seeking comfort without compromising on the authentic Kumbh experience. Book now to secure your stay during this once-in-a-lifetime event! featuring all modern amenities in the heart of the holy city. the tents are designed to provide a blend of traditional aesthetics and contemporary comfort, ensuring a memorable stay for all our guests. have a memorable stay at the Kumbh Mela with our premium tents, offering a blend of traditional aesthetics and modern amenities in the heart of Ujjain.",
    images: ["/images/tent1.jpg", "/images/tent2.jpg"]
  };

  const galleryImages = data.images || [data.img];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 50) prevImage();
    else if (info.offset.x < -50) nextImage();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#FDFCF9] flex flex-col"
    >
      <div className="pt-21 md:pt-26 pb-3">
        
        {/* Top Actions */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6 flex justify-between items-center">
          <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-[#2D1B19] hover:text-orange-600 transition-all font-black text-xs uppercase tracking-widest group"
          >
            <div className="p-2 bg-white rounded-full shadow-sm border border-orange-50 group-hover:bg-orange-600 group-hover:text-white transition-all">
              <ArrowLeft size={18} />
            </div>
          </button>
          <div className="flex gap-2">
            <button className="p-2.5 bg-white rounded-full shadow-sm border border-orange-50 text-gray-400 hover:text-orange-600 transition-colors"><Share2 size={16} /></button>
            <button className="p-2.5 bg-white rounded-full shadow-sm border border-orange-50 text-red-500 hover:bg-red-50 transition-colors"><Heart size={16} /></button>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: GALLERY SECTION */}
          <div className="lg:col-span-7 lg:sticky lg:top-32">
            <div className="relative aspect-[4/5] md:aspect-video lg:aspect-[4/3] w-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white group bg-gray-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full touch-pan-y cursor-grab active:cursor-grabbing"
                >
                  <img 
                    src={galleryImages[currentIndex]} 
                    alt={data.title} 
                    className="w-full h-full object-cover pointer-events-none" 
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <div className="hidden lg:flex absolute inset-x-4 top-1/2 -translate-y-1/2 justify-between items-center z-10">
                <button onClick={prevImage} className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:bg-orange-600 hover:text-white transition-all active:scale-90">
                  <ArrowLeft size={20} strokeWidth={3} />
                </button>
                <button onClick={nextImage} className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:bg-orange-600 hover:text-white transition-all active:scale-90">
                  <ArrowRight size={20} strokeWidth={3} />
                </button>
              </div>
              
              {/* Pagination Dots */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full z-10">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? 'w-8 bg-orange-500' : 'w-2 bg-white/60 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: DETAILS SECTION */}
          <div className="lg:col-span-5 flex flex-col space-y-6 py-2">
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded flex items-center gap-1 text-[10px] font-black leading-none">
                  <Star size={10} fill="currentColor" /> {data.rating || 4.5}
                </div>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">({data.reviews || 100}+ Bookings)</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black italic uppercase text-[#2D1B19] leading-[0.9] tracking-tighter">
                {data.title}
              </h1>
              <div className="flex items-center gap-2 text-orange-600 font-bold text-[11px] uppercase tracking-tighter bg-orange-50 w-fit px-3 py-1.5 rounded-lg border border-orange-100">
                <MapPin size={14} strokeWidth={3} /> {data.address}
              </div>
            </section>

            {/* Stay Features Card */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Clock, label: "Check-In", val: data.checkIn || "12 PM", color: "text-blue-500" },
                { icon: Home, label: "Beds", val: data.beds, color: "text-green-500" },
                { icon: Car, label: "Parking", val: data.parking || "Available", color: "text-orange-500" },
              ].map((item, i) => (
                <div key={i} className="bg-white p-3 rounded-2xl border border-orange-50 text-center shadow-sm">
                  <item.icon size={18} className={`mx-auto mb-1 ${item.color}`} />
                  <p className="text-[8px] font-black uppercase text-gray-400">{item.label}</p>
                  <p className="text-[10px] font-bold text-gray-900 leading-tight">{item.val}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h2 className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                <Shield size={12} /> Stay Description
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed font-medium bg-white p-6 rounded-[2.5rem] border border-orange-50 shadow-sm">
                {data.description || "Premium stay experience with all modern amenities in the heart of the holy city.Experience the Kumbh Mela in luxury with our Royal Tents. Located just walking distance from the main Ghats, these tents offer premium bedding, 24/7 security, and a traditional spiritual environment. Perfect for pilgrims seeking comfort without compromising on the authentic Kumbh experience. Book now to secure your stay during this once-in-a-lifetime event! featuring all modern amenities in the heart of the holy city."}
              </p>
            </div>

            {/* Facilities */}
            <div className="space-y-3">
              <h2 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Amenities & Facilities</h2>
              <div className="flex flex-wrap gap-2">
                {(data.facilities || ["Wifi", "Water", "Security"]).map((facility, idx) => (
                  <span key={idx} className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl text-gray-700 text-[10px] font-bold border border-orange-50 shadow-sm">
                    <CheckCircle2 size={12} className="text-green-500" /> {facility}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Price Card */}
            <div className="mt-auto bg-[#2D1B19] p-5 rounded-[2.5rem] text-white flex items-center justify-between shadow-2xl ring-4 ring-orange-500/5">
              <div>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Price / Night</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl md:text-3xl font-black italic">₹{data.price}</span>
                  <span className="text-xs text-gray-500 line-through">₹{data.price + 1500}</span>
                </div>
              </div>
              <button 
                onClick={() => onReserve(data)}
                className="bg-orange-600 hover:bg-orange-500 text-white px-6 md:px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-orange-900/20"
              >
                Book Now <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default StayDetailView;