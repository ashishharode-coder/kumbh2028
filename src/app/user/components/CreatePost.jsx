'use client';
import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, X, Send, Smile, Search, Check } from 'lucide-react';

const CreatePost = ({ onSuccess }) => {
    const [preview, setPreview] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [caption, setCaption] = useState('');
    const [location, setLocation] = useState('');
    const [isLocationFocused, setIsLocationFocused] = useState(false);
    const fileInputRef = useRef(null);

    const allLocations = [
        'Mahakal Lok, Ujjain', 'Ram Ghat, Shipra', 'Harsiddhi Temple', 
        'Kaal Bhairav Temple', 'Mangalnath Mandir', 'Ujjain Junction'
    ];

    const filteredLocations = useMemo(() => {
        if (!location) return allLocations.slice(0, 3);
        return allLocations.filter(loc => loc.toLowerCase().includes(location.toLowerCase()));
    }, [location]);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileType(file.type.startsWith('video') ? 'video' : 'image');
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-[800px] mx-auto bg-white md:rounded-[24px] rounded-t-[32px] border border-gray-100 shadow-2xl overflow-hidden"
        >
            <div className="flex flex-col md:flex-row">
                
                {/* LEFT: Media Section (Mobile: Square, Desktop: Fixed Width) */}
                <div className="relative w-full md:w-[400px] aspect-square md:aspect-auto bg-gray-50 flex items-center justify-center border-r border-gray-50">
                    {!preview ? (
                        <div onClick={() => fileInputRef.current.click()} className="flex flex-col items-center gap-2 cursor-pointer active:scale-95">
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-orange-600">
                                <Camera size={24} />
                            </div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Add Photo/Video</p>
                        </div>
                    ) : (
                        <div className="relative w-full h-full">
                            {fileType === 'image' ? (
                                <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                            ) : (
                                <video src={preview} className="w-full h-full object-cover" controls />
                            )}
                            <button onClick={() => setPreview(null)} className="absolute top-4 right-4 p-1.5 bg-black/50 text-white rounded-full backdrop-blur-md">
                                <X size={16} />
                            </button>
                        </div>
                    )}
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/*" onChange={handleFileSelect} />
                </div>

                {/* RIGHT: Input Section (Mobile: Full width, Desktop: Flexible) */}
                <div className="flex-1 p-5 md:p-8 flex flex-col justify-between bg-white min-h-[350px] md:min-h-full">
                    <div className="space-y-5">
                        {/* User Header */}
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-[10px] font-black text-orange-700">R</div>
                            <div className="flex flex-col">
                                <span className="text-[13px] font-bold text-gray-900">Rahul Sharma</span>
                            </div>
                        </div>

                        {/* Caption Area */}
                        <textarea 
                            placeholder="Write a caption..."
                            className="w-full bg-transparent border-none p-0 text-[14px] focus:ring-0 min-h-[80px] md:min-h-[120px] resize-none font-medium text-gray-700 placeholder:text-gray-300"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />

                        {/* Searchable Location (Instagram Style) */}
                        <div className="relative ">
                            <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${isLocationFocused ? 'border-orange-500 ring-4 ring-orange-50' : 'border-gray-100 bg-gray-50'}`}>
                                <MapPin size={16} className={isLocationFocused ? 'text-orange-500' : 'text-gray-400'} />
                                <input 
                                    placeholder="Add location..."
                                    value={location}
                                    onFocus={() => setIsLocationFocused(true)}
                                    onBlur={() => setTimeout(() => setIsLocationFocused(false), 200)}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full bg-transparent border-none text-[12px] font-bold outline-none text-gray-800 placeholder:text-gray-400"
                                />
                            </div>

                            {/* Suggestions Dropdown (Opens Above on Desktop if needed) */}
                            <AnimatePresence>
                                {isLocationFocused && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                        className="absolute bottom-full mb-3 left-0 right-0 bg-white border border-gray-100 rounded-[20px] shadow-2xl z-[100] py-2 overflow-hidden"
                                    >
                                        <p className="px-4 py-2 text-[8px] font-black text-gray-300 uppercase tracking-widest">Suggestions</p>
                                        {filteredLocations.map((loc) => (
                                            <div 
                                                key={loc}
                                                onClick={() => { setLocation(loc); setIsLocationFocused(false); }}
                                                className="px-4 py-3 hover:bg-orange-50 text-[11px] font-bold text-gray-600 flex items-center justify-between cursor-pointer border-b border-gray-50 last:border-none"
                                            >
                                                <div className="flex items-center gap-2"><Search size={12} className="text-gray-300" /> {loc}</div>
                                                {location === loc && <Check size={12} className="text-orange-600" />}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button 
                        whileTap={{ scale: 0.98 }}
                        disabled={!preview}
                        onClick={()=>alert("Post Uploaded")}
                        className="w-full mt-4 py-4 bg-[#2D1B19] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-10 shadow-xl shadow-orange-950/10 active:bg-orange-600 transition-all"
                    >
                        Publish Post
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default CreatePost;