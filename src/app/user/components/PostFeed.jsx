'use client';
import React, { useState } from 'react'; // Added useState
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MoreHorizontal, CheckCircle2, AlertCircle, LayoutGrid, PlusCircle } from 'lucide-react';
import CreatePost from './CreatePost';

// --- SUB-COMPONENT: POST CARD ---
const PostCard = ({ item }) => {
  const [status, setStatus] = React.useState(null); 

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className=" bg-white border border-gray-100 rounded-xl mb-4 w-full max-w-[800px] mx-auto shadow-sm overflow-hidden"
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
      <div className="relative w-full bg-gray-50 overflow-hidden aspect-square md:aspect-auto md:h-[450px]"> 
        <Image 
        src={item.url} 
        alt="Post" 
        fill 
        className="object-cover" 
        sizes="(max-width: 768px) 100vw, 620px" 
        priority={true}
        />
      </div>
      
      {/* Buttons */}
      <div className="px-3 py-3 border-b border-gray-50">
  {/* LayoutGroup keeps animations synced when sibling heights change */}
  <motion.div layout transition={{ type: 'spring', damping: 25, stiffness: 300 }}>
    
    {/* --- Top Row: Buttons --- */}
    <div className="flex items-center justify-between gap-3">
      {/* Action Buttons */}
      <div className="flex bg-gray-50 p-0.5 rounded-lg gap-0.5 border border-gray-100 shadow-inner">
        <button 
          onClick={() => setStatus('verified')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[8px] font-black transition-all active:scale-95 ${
            status === 'verified' 
              ? 'bg-green-500 text-white shadow-md shadow-green-900/10' 
              : 'text-gray-400 hover:text-green-600'
          }`}
        >
          <CheckCircle2 size={12} strokeWidth={status === 'verified' ? 3 : 2} /> VERIFIED
        </button>
        <button 
          onClick={() => setStatus('doubtful')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[8px] font-black transition-all active:scale-95 ${
            status === 'doubtful' 
              ? 'bg-red-500 text-white shadow-md shadow-red-900/10' 
              : 'text-gray-400 hover:text-red-600'
          }`}
        >
          <AlertCircle size={12} strokeWidth={3} /> DOUBTFUL
        </button>
      </div>
      
      {/* Send Button (Always Visible) */}
      <button className="p-2.5 bg-gray-50 text-gray-400 rounded-full hover:text-orange-500 transition-colors">
        <Send size={18} />
      </button>
    </div>

    {/* --- Conditional Poll Bar (Slides Down) --- */}
    <AnimatePresence>
      {status && (
        <motion.div
          key="poll-results"
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          className="relative px-1 overflow-hidden" // Prevents overflow during animation
        >
          <div className="p-3 bg-gray-50/50 rounded-xl border border-gray-100">
            {/* Header / Info */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Public Opinion (Poll)</span>
              <span className="text-[10px] font-bold text-gray-700">1.2K Votes</span>
            </div>

            {/* Visual Bar */}
            <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden flex border border-gray-100">
              {/* Green Progress (Verified) */}
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '72%' }} 
                transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                className="h-full bg-green-500 relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_10px_rgba(34,197,94,0.3)]"
              >
                {/* Visual Highlight */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
              </motion.div>
              
              {/* Red Progress (Doubtful) */}
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '28%' }} 
                transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                className="h-full bg-red-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_10px_rgba(239,68,68,0.3)]"
              />
            </div>
            
            {/* Legend / Key */}
            <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500"/> <span className="text-[9px] font-bold text-gray-500">72% True</span></div>
                <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500"/> <span className="text-[9px] font-bold text-gray-500">28% Doubtful</span></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

  </motion.div>
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
  const [activeTab, setActiveTab] = useState('posts'); // Tab logic: 'posts' or 'create'
  
  // Smooth Scroll Function
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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

        {/* --- NEW BUTTONS START --- */}
        <div className="flex gap-2 mt-5">
            <button 
              onClick={() => setActiveTab('posts')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black transition-all border ${activeTab === 'posts' ? 'bg-[#2D1B19] text-white border-[#2D1B19] shadow-lg' : 'bg-white text-gray-400 border-gray-100'}`}
            >
              <LayoutGrid size={14} /> POSTS
            </button>
            <button 
              onClick={() => setActiveTab('create')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black transition-all border ${activeTab === 'create' ? 'bg-[#2D1B19] text-white border-[#2D1B19] shadow-lg' : 'bg-white text-gray-400 border-gray-100'}`}
            >
              <PlusCircle size={14} /> CREATE POST
            </button>
        </div>
        {/* --- NEW BUTTONS END --- */}
      </div>

      {activeTab === 'posts' ? (
        <>
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
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="w-12 h-12 rounded-[22px] border border-orange-50 flex items-center justify-center disabled:opacity-30 bg-white shadow-sm transition-all text-xl"
              >
                ←
              </button>

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

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="w-12 h-12 rounded-[22px] border border-orange-50 flex items-center justify-center disabled:opacity-30 bg-white shadow-sm transition-all text-xl"
              >
                →
              </button>
            </div>
          )}
        </>
      ) : (
          <motion.div 
            key="create"
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
          >
            {/* Yahan CreatePost Component Call Ho Raha Hai */}
            <CreatePost onSuccess={() => setActiveTab('posts')} />
          </motion.div>
        )}
    </div>
  );
};

export default PostFeed;