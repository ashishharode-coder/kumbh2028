'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, CheckCircle2, Star, 
  ShieldCheck, Heart, Share2, 
  ArrowLeft, ArrowRight, ShoppingBag, Zap, Clock 
} from 'lucide-react';

const poojawithpandit = "/images/poojawithpandit.jpg"; 
const poojaimg1 = "/images/poojaimg1.jpg";
const poojaimg2 = "/images/poojaimg2.jpg";   
const poojaimg3 = "/images/poojaimg3.jpg";

const PoojaDetailView = ({ pooja, onBack, onBook }) => {
  const galleryImages = [poojawithpandit, poojaimg1, poojaimg2, poojaimg3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = pooja || {
    title: "Mahakal Bhasm Aarti Special",
    price: 2100,
    place: "Mahakaleshwar Temple, Ujjain",
    samagri: true,
    benefits: ["Mental Peace", "Health Prosperity", "Dosh Nivaran", "Positive Aura"],
    rating: 4.9,
    reviews: 1240,
    description: "Experience the divine energy of Lord Shiva with our specialized Bhasm Aarti ritual performed by certified Pandits. This ritual includes the sacred ash ceremony, vedic chanting, and personalized sankalp."
  };

  const nextImage = () => setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#FDFCF9] flex flex-col"
    >
      <div className="pt-24 md:pt-32 pb-10">
        
        {/* Top Actions */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6 flex justify-between items-center">
          <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-[#2D1B19] hover:text-orange-600 transition-all font-black text-xs uppercase tracking-widest group"
          >
            <div className="p-2 bg-white rounded-full shadow-sm border border-orange-50 group-hover:bg-orange-600 group-hover:text-white transition-all">
              <ArrowLeft size={18} />
            </div>
            <span>Back</span>
          </button>
          <div className="flex gap-2">
            <button className="p-2.5 bg-white rounded-full shadow-sm border border-orange-50 text-gray-400 hover:text-orange-600 transition-colors"><Share2 size={16} /></button>
            <button className="p-2.5 bg-white rounded-full shadow-sm border border-orange-50 text-red-500 hover:bg-red-50 transition-colors"><Heart size={16} /></button>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: GALLERY SECTION */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] md:aspect-video lg:aspect-[4/3] w-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white group bg-gray-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image src={galleryImages[currentIndex]} alt="Pooja" fill className="object-cover" priority />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows - Visible on all devices */}
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center z-10">
                <button 
                  onClick={prevImage} 
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:bg-orange-600 hover:text-white transition-all active:scale-90"
                >
                  <ArrowLeft size={20} strokeWidth={3} />
                </button>
                <button 
                  onClick={nextImage} 
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:bg-orange-600 hover:text-white transition-all active:scale-90"
                >
                  <ArrowRight size={20} strokeWidth={3} />
                </button>
              </div>
              
              <div className="absolute top-6 left-6 bg-orange-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg z-10">Live Ujjain</div>
              
              {/* Pagination Dots - Dynamic Orange Color */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full z-10">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx 
                        ? 'w-8 bg-orange-500' 
                        : 'w-2 bg-white/60 hover:bg-white'
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
                  <Star size={10} fill="currentColor" /> {data.rating}
                </div>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">({data.reviews} Reviews)</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black italic uppercase text-[#2D1B19] leading-[0.9] tracking-tighter">
                {data.title}
              </h1>
              <div className="flex items-center gap-2 text-orange-600 font-bold text-[11px] uppercase tracking-tighter bg-orange-50 w-fit px-3 py-1.5 rounded-lg border border-orange-100">
                <MapPin size={14} strokeWidth={3} /> {data.place}
              </div>
            </section>

            {/* Feature Icons */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: CheckCircle2, label: "Samagri", val: data.samagri ? "Included" : "Extra", color: "text-green-500" },
                { icon: ShieldCheck, label: "Pandit", val: "Certified", color: "text-blue-500" },
                { icon: Zap, label: "Booking", val: "Instant", color: "text-orange-500" },
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
                <Clock size={12} /> Ritual Description
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed font-medium bg-white p-6 rounded-[2.5rem] border border-orange-50 shadow-sm">
                {data.description}
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              <h2 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Benefits</h2>
              <div className="flex flex-wrap gap-2">
                {data.benefits.map((benefit, idx) => (
                  <span key={idx} className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl text-gray-700 text-[10px] font-bold border border-orange-50 shadow-sm">
                    <CheckCircle2 size={12} className="text-green-500" /> {benefit}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Price Card */}
            <div className="mt-auto bg-[#2D1B19] p-5 rounded-[2.5rem] text-white flex items-center justify-between shadow-2xl ring-4 ring-orange-500/5">
              <div>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Price</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl md:text-3xl font-black italic">₹{data.price}</span>
                  <span className="text-xs text-gray-500 line-through">₹{data.price + 500}</span>
                </div>
              </div>
              <button 
                onClick={() => onBook(data)}
                className="bg-orange-600 hover:bg-orange-500 text-white px-6 md:px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-orange-900/20"
              >
                Confirm <ShoppingBag size={14} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default PoojaDetailView;