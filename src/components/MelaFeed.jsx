'use client';
import React from 'react';
import { Map, Users, TrendingUp, Compass, ChevronRight, ParkingCircle, Zap, Calendar,Clock,AlertTriangle,Info  } from 'lucide-react';
import { motion } from 'framer-motion';

const MelaFeed = () => {

    const melaNews = [
    { id: 1, title: "Sector 3 House Full", detail: "Redirect to North Gate 9", time: "2 MIN AGO", type: "PARKING", urgent: true },
    { id: 2, title: "Sandhya Aarti Rush", detail: "Heavy crowd at Ramghat", time: "15 MIN AGO", type: "CROWD", urgent: false },
    { id: 3, title: "Shuttle Service Active", detail: "Routes 4 & 5 now operational", time: "22 MIN AGO", type: "TRANSPORT", urgent: false },
    { id: 4, title: "Lost & Found Alert", detail: "Golden bag found at Gate 2", time: "45 MIN AGO", type: "ALERT", urgent: false },
    { id: 5, title: "Gate 12 Closed", detail: "Maintenance in progress", time: "1 HOUR AGO", type: "GATE", urgent: true },
    { id: 6, title: "Water Supply Zone 4", detail: "New drinking water points added", time: "2 HOURS AGO", type: "FACILITY", urgent: false },
    { id: 7, title: "VIP Movement Alert", detail: "Expect delays near Mahakal Lok", time: "3 HOURS AGO", type: "TRAFFIC", urgent: true },
    { id: 8, title: "Lost Child Found", detail: "Safe at Help Desk Sector 1", time: "4 HOURS AGO", type: "ALERT", urgent: false },
    { id: 9, title: "Weather Update", detail: "Light rain expected at night", time: "5 HOURS AGO", type: "WEATHER", urgent: false },
    { id: 10, title: "Mela Exit Smooth", detail: "Exit route B is now clear", time: "6 HOURS AGO", type: "TRAFFIC", urgent: false },
  ];

  
  return (
    <div className="w-full flex flex-col gap-5">
      
      {/* 1. MELA NAVIGATOR - White Theme (As requested) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl shadow-md p-5 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-100">
              <Map size={20} />
            </div>
            <h3 className="font-black text-lg text-gray-800 uppercase italic leading-none">Mela Navigator</h3>
          </div>
          <div className="bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Satellite Live</p>
          </div>
        </div>
        <div className="relative w-full h-[250px] bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14686.066442651134!2d75.7618218!3d23.1878954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39637469de00ff23%3A0x7f827047bc2519c8!2sMahakaleshwar%20Jyotirlinga!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" className="w-full h-full border-0 grayscale-[0.2]" />
           <div className="absolute bottom-4 inset-x-0 flex justify-center">
             <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-black text-[10px] flex items-center gap-2 shadow-xl hover:bg-blue-600 transition-all uppercase italic">
               View Full Map <Compass size={14} />
             </button>
           </div>
        </div>
      </motion.div>

      {/* 2. STATS ROW - Mixed Themes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Total Visitors - Live Aarti Style (White + Red Border) */}
        <div className="bg-white rounded-2xl shadow-md p-4 border-l-[6px] border-red-600 flex items-center gap-4 min-h-[100px]">
           <div className="bg-red-50 p-3 rounded-xl border border-red-100">
              <Users size={24} className="text-red-600" />
           </div>
           <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                <p className="text-red-600 text-[10px] font-black uppercase tracking-widest">Total Visitors</p>
              </div>
              <h3 className="font-black text-2xl text-gray-800 uppercase italic">14.8<span className="text-red-600">M</span></h3>
           </div>
        </div>

        {/* Live Capacity - Calendar Style (Dark Theme) */}
        <div className="bg-[#2D1B19] rounded-2xl p-5 shadow-xl text-white flex flex-col justify-center gap-3 border border-white/5">
           <div className="flex items-center gap-3">
              <div className="bg-orange-600/20 p-2 rounded-lg">
                 <Zap size={20} className="text-orange-500 fill-orange-500" />
              </div>
              <h2 className="text-[10px] font-black uppercase tracking-widest italic">Live <span className="text-orange-500">Status</span></h2>
           </div>
           <div className="space-y-2">
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-orange-500 w-[70%]" />
              </div>
              <div className="flex justify-between text-[9px] font-bold text-orange-400 uppercase">
                 <span>70% Capacity</span>
                 <span className="text-white/40">Sector A-Z</span>
              </div>
           </div>
        </div>
      </div>

    {/* 3. NEWS FEED - Dynamic Icons & Colors */}
<div className="flex flex-col gap-2">
  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Latest Updates</p>
  {melaNews.map((news) => {
    // Dynamic Icon Logic
    const IconComponent = news.urgent ? AlertTriangle : Info;

    return (
      <motion.div 
        key={news.id}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-sm p-3 border-l-[4px] md:border-l-[6px] border-red-600 flex items-center justify-between gap-3 min-h-[70px]"
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Dynamic Icon Style */}
          <div className={`p-2 rounded-lg text-white shrink-0 shadow-sm ${
            news.urgent 
              ? 'bg-red-600 animate-pulse shadow-red-100' 
              : 'bg-gray-800 shadow-gray-100'
          }`}>
            <IconComponent size={18} strokeWidth={2.5} />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-red-600 text-[8px] font-black uppercase truncate">
                {news.type}
              </p>
              <div className="flex items-center gap-1 text-[7px] font-bold text-gray-400 bg-gray-50 px-1 py-0.5 rounded border border-gray-100 shrink-0">
                <Clock size={8} /> {news.time}
              </div>
            </div>
            <h3 className="font-black text-xs md:text-sm text-gray-800 uppercase italic leading-tight truncate">
              {news.title}
            </h3>
            <p className="text-[9px] text-gray-400 font-bold truncate">{news.detail}</p>
          </div>
        </div>
        <ChevronRight size={14} className="text-gray-200 shrink-0" />
      </motion.div>
    );
  })}
</div>

    </div>
  );
};

export default MelaFeed;