'use client';
import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MoreHorizontal, CheckCircle2, AlertCircle } from 'lucide-react';

// --- SUB-COMPONENT: POST CARD ---
const PostCard = ({ item }) => {
  const [status, setStatus] = React.useState(null); 

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="bg-white border border-gray-100 rounded-xl mb-4 w-full max-w-[420px] mx-auto shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden border border-orange-200">
             <span className="text-[10px] font-black text-orange-700">{item.user.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-gray-900 leading-tight">{item.user}</span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{item.location} • {item.time}</span>
          </div>
        </div>
        <MoreHorizontal size={18} className="text-gray-300" />
      </div>

      {/* Media */}
      <div className="relative aspect-square w-full bg-gray-50">
        <Image src={item.url} alt="Post" fill className="object-cover" sizes="420px" />
      </div>

      {/* Buttons */}
      <div className="px-3 py-2 border-b border-gray-50 flex items-center justify-between">
        <div className="flex bg-gray-50 p-0.5 rounded-lg gap-0.5 border border-gray-100">
          <button 
            onClick={() => setStatus('verified')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[8px] font-black transition-all ${status === 'verified' ? 'bg-green-500 text-white shadow-sm' : 'text-gray-400'}`}
          >
            <CheckCircle2 size={12} strokeWidth={3} /> VERIFIED
          </button>
          <button 
            onClick={() => setStatus('doubtful')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[8px] font-black transition-all ${status === 'doubtful' ? 'bg-red-500 text-white shadow-sm' : 'text-gray-400'}`}
          >
            <AlertCircle size={12} strokeWidth={3} /> DOUBTFUL
          </button>
        </div>
        <button className="p-2.5 bg-gray-50 text-gray-400 rounded-full hover:text-orange-500"><Send size={18} /></button>
      </div>

      {/* Caption */}
      <div className="px-3 py-3">
        <p className="text-[12px] leading-snug text-gray-700">
          <span className="font-bold mr-1.5 text-gray-900">{item.user}</span>
          {item.title} <span className="text-orange-600 font-bold ml-1">#Ujjain2028</span>
        </p>
      </div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
const PostFeed = ({ currentPosts, currentPage, totalPages, setCurrentPage }) => {
  
  // Smooth Scroll Function
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Forcefully scrolling to top
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10);
  };

  return (
    <div className="w-full max-w-full px-2">
      <div className="mb-6 mt-2">
        <h2 className="text-xl font-black italic underline decoration-orange-600 underline-offset-4 uppercase">
          Mela <span className="text-orange-600">Feed</span>
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        <AnimatePresence mode="popLayout">
          {currentPosts?.map((item) => (
            <PostCard key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </div>

      {/* COMPACT STAY-STYLE PAGINATION */}
      {totalPages > 1 && (
        <div className="mt-8 mb-10 flex justify-center items-center gap-2">
          
          {/* BACK BUTTON (Fixed) */}
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="w-12 h-12 rounded-[22px] border border-orange-50 flex items-center justify-center disabled:opacity-30 bg-white shadow-sm transition-all text-xl"
          >
            ←
          </button>

          {/* NUMBERS */}
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-12 h-12 rounded-[22px] text-sm font-bold transition-all ${
                  currentPage === i + 1
                    ? 'bg-[#FF4D00] text-white shadow-[0_5px_15px_rgba(255,77,0,0.3)]'
                    : 'bg-white border border-orange-50 text-gray-400 hover:border-orange-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* NEXT BUTTON */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-12 h-12 rounded-[22px] border border-orange-50 flex items-center justify-center disabled:opacity-30 bg-white shadow-sm transition-all text-xl"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default PostFeed;