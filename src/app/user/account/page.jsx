'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, Package, Car, Hotel, Flame, LogOut, 
    ChevronRight, MapPin, CheckCircle2, 
    Calendar, ShoppingBag, Edit2, Camera,
    ChevronDown, History ,X
} from 'lucide-react';

const Account = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    
    // --- History Selection State ---
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState(null); 

    const [userName, setUserName] = useState('Rahul Sharma');
    const [userEmail, setUserEmail] = useState('rahul@mahakal.com');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({ field: '', label: '', value: '' });

    const [profileImg, setProfileImg] = useState(null); 
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setProfileImg(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const finalSignOut = () => {
        localStorage.clear();
        window.location.href = "/"; 
    };
    

    const historyData = {
        orders: [
            { id: 'OD01', title: 'Pooja Essentials Kit', status: 'Delivered', date: '10 March 2026', img: 'https://images.unsplash.com/photo-1600185366529-1c8b9a1e7c8b?w=400', desc: 'Includes incense, diya, and more' },
            { id: 'OD02', title: 'Holy Water Bottle', status: 'Shipped', date: '12 March 2026', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400', desc: '500ml bottle of Ganga water' }
            ],
        rides: [
            // { id: 'RD01', title: 'Temple Shuttle', status: 'Confirmed', date: '15 March 2026', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400', desc: 'Innova MP13' }
        ],
        hotels: [{ id: 'HT01', title: 'Shanti Palace', status: 'Upcoming', date: '20 March 2026', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400', desc: 'Deluxe AC Room' }],
        pooja: [{ id: 'PJ01', title: 'Maha Rudrabhishek', status: 'Booked', date: '20 March 2026', img: 'https://images.unsplash.com/photo-1608933250320-56993170701b?w=400', desc: '4:00 AM Slot' }]
    };

    const categories = [
        { id: 'orders', label: 'My Orders', icon: <Package size={14} /> },
        { id: 'rides', label: 'Ride Bookings', icon: <Car size={14} /> },
        { id: 'hotels', label: 'Hotel Stays', icon: <Hotel size={14} /> },
        { id: 'pooja', label: 'Pooja Slots', icon: <Flame size={14} /> },
    ];

    return (
        <div className="min-h-screen bg-[#FFFDF9] text-[#2D1B19] font-sans pb-5 pt-24">
            
            {/* --- Profile Header --- */}
            <div className="max-w-7xl mx-auto px-6 mb-4 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4 group">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        onClick={() => fileInputRef.current.click()}
                        className="w-full h-full bg-orange-50 rounded-full border-2 border-orange-100 flex items-center justify-center shadow-sm overflow-hidden cursor-pointer"
                    >
                        {profileImg ? (
                            <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=F97316&color=fff&size=128`} alt={userName} className="w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera size={20} className="text-white" />
                        </div>
                    </motion.div>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                </div>
                <h1 className="text-3xl font-black italic tracking-tight uppercase">
                    {userName.split(' ')[0]} <span className="text-orange-600">{userName.split(' ').slice(1).join(' ')}</span>
                </h1>
                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">+91 9876543210</p>
            </div>

            {/* --- Navigation --- */}
            <div className="sticky top-[70px] z-40 bg-white/80 backdrop-blur-md border-b border-orange-100 py-4 mb-8">
                <div className="max-w-7xl mx-auto px-4 flex justify-center gap-3">
                    
                    <button 
                        onClick={() => {
                            setActiveTab('profile');
                            setSelectedHistory(null); 
                            setIsDropdownOpen(false);
                        }}
                        className={`flex items-center gap-2 px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'profile' ? 'bg-orange-600 text-white shadow-lg' : 'bg-orange-50 text-orange-900/40'}`}
                    >
                        <User size={16} /> My Profile
                    </button>

                    <div className="relative">
                        <button 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={`flex items-center gap-2 px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-orange-600 text-white shadow-lg' : 'bg-orange-50 text-orange-900/40'}`}
                        >
                            <History size={16} /> Booking History
                            <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <>
                                    {/* Invisible Backplate to close dropdown on click outside */}
                                    <div className="fixed inset-0 z-[-1]" onClick={() => setIsDropdownOpen(false)} />
                                    
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                                        animate={{ opacity: 1, y: 0, scale: 1 }} 
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full right-0 mt-2 w-52 bg-white border border-orange-100 rounded-2xl shadow-2xl p-2 z-50"
                                    >
                                        {categories.map((cat) => (
                                            <button
                                                key={cat.id}
                                                onClick={() => {
                                                    setSelectedHistory(cat.id);
                                                    setActiveTab('history');
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase transition-colors ${selectedHistory === cat.id ? 'bg-orange-50 text-orange-600' : 'hover:bg-orange-50 text-gray-400'}`}
                                            >
                                                {cat.icon} {cat.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

           {/* --- Main Content --- */}
<main className="max-w-4xl mx-auto px-4">
    <AnimatePresence mode="wait">
        {activeTab === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-xl mx-auto space-y-4">
                <InfoTile label="Full Name" value={userName} onClick={() => {setModalConfig({field:'name', label:'Full Name', value:userName}); setIsModalOpen(true);}} />
                <InfoTile label="Email Address" value={userEmail} onClick={() => {setModalConfig({field:'email', label:'Email Address', value:userEmail}); setIsModalOpen(true);}} />
                <InfoTile label="Primary Location" value="Ujjain, Madhya Pradesh" icon={<MapPin size={16}/>} />
                
                <button onClick={() => setIsLogoutModalOpen(true)} className="w-full mt-8 py-4 rounded-2xl bg-red-50 text-red-600 font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 border border-red-100 hover:bg-red-100 transition-colors">
                    <LogOut size={18} /> Sign Out Account
                </button>
            </motion.div>
        )}

        {activeTab === 'history' && selectedHistory && (
            <motion.div key={selectedHistory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {historyData[selectedHistory] && historyData[selectedHistory].length > 0 ? (
                    <>
                        <div className="col-span-full mb-2 flex items-center justify-between">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 flex items-center gap-2">
                                <ShoppingBag size={12}/> {categories.find(c => c.id === selectedHistory)?.label}
                            </h2>
                        </div>
                        {historyData[selectedHistory].map((item) => (
                            <AccountCard key={item.id} item={item} />
                        ))}
                    </>
                ) : (
                   
<div className="col-span-full py-6 md:py-10 flex flex-row items-center justify-center gap-6 md:gap-10 max-w-lg mx-auto bg-orange-50/30 rounded-[2.5rem] px-8 border border-orange-100/50">
    
    {/* Left Side: Icon Container */}
    <div className="relative flex-shrink-0">
        {/* Decorative Background for Icon */}
        <div className="absolute inset-0 bg-white rounded-3xl rotate-6 shadow-sm" />
        <div className="absolute inset-0 border border-orange-200 rounded-3xl -rotate-3" />
        
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-white rounded-3xl shadow-xl shadow-orange-100/50 flex items-center justify-center text-orange-600 border border-white"
        >
            <div className="relative">
                {React.cloneElement(categories.find(c => c.id === selectedHistory)?.icon || <Package />, { 
                    size: 28, 
                    strokeWidth: 1.8 
                })}
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />
            </div>
        </motion.div>
    </div>

    {/* Right Side: Content & Button */}
    <div className="flex flex-col items-start text-left">
        <h3 className="text-lg font-black italic text-[#2D1B19] leading-none uppercase tracking-tighter">
            No <span className="text-orange-600">History</span>
        </h3>
        
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.15em] mt-2 leading-tight max-w-[180px]">
            Your {categories.find(c => c.id === selectedHistory)?.label.toLowerCase()} list is currently empty.
        </p>

        {/* Action Button - Compact Row Style */}
        <motion.button 
            whileTap={{ scale: 0.96 }}
            onClick={() => {
                const paths = {
                    orders: '/user/store',
                    rides: '/user/vehicle',
                    hotels: '/user/stay',
                    pooja: '/user/vishesh-pooja'
                };
                window.location.href = paths[selectedHistory] || '/';
            }}
            className="mt-4 group flex items-center gap-2 bg-[#2D1B19] pl-4 pr-2 py-1.5 rounded-xl transition-all hover:bg-orange-600 shadow-lg shadow-orange-900/10"
        >
            <span className="text-white text-[8px] font-black uppercase tracking-widest">
                Explore
            </span>
            <div className="w-5 h-5 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ChevronRight size={12} className="text-white" />
            </div>
        </motion.button>
    </div>
</div>
                )}
            </motion.div>
        )}

        {/* Initial History State (Nothing selected) */}
        {activeTab === 'history' && !selectedHistory && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 flex flex-col items-center">
                <div className="relative mb-6">
                    <History size={60} className="text-orange-100" />
                    <div className="absolute inset-0 border-2 border-dashed border-orange-200 rounded-full scale-150 opacity-20 animate-spin-slow" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#2D1B19]">Booking History</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2">Please select a category to view details</p>
            </motion.div>
        )}
    </AnimatePresence>
</main>

            {/* Modals */}
            <AnimatePresence>
                {isLogoutModalOpen && <LogoutConfirmationModal onClose={() => setIsLogoutModalOpen(false)} onConfirm={finalSignOut} />}
                {isModalOpen && <EditModal config={modalConfig} onClose={() => setIsModalOpen(false)} onSave={(val) => { if(modalConfig.field === 'name') setUserName(val); else setUserEmail(val); setIsModalOpen(false); }} />}
            </AnimatePresence>
        </div>
    );
};

// --- Sub-components (Aesthetic remains same) ---
const AccountCard = ({ item }) => (
    <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-3xl border border-orange-100 shadow-sm p-3 flex items-center gap-4 group">
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-orange-50 flex-shrink-0">
            <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
                <span className="text-[7px] font-black text-orange-600 uppercase bg-orange-50 px-2 py-0.5 rounded-md">{item.id}</span>
                <span className="text-[8px] font-black uppercase text-green-500 flex items-center gap-1"><CheckCircle2 size={10}/>{item.status}</span>
            </div>
            <h3 className="text-sm font-bold text-[#2D1B19] italic truncate mt-1">{item.title}</h3>
            <p className="text-[9px] text-gray-400 font-medium truncate mb-2">{item.desc}</p>
            <div className="flex items-center gap-2 text-[9px] font-black text-gray-500/60">
                <Calendar size={10}/> {item.date}
            </div>
        </div>
    </motion.div>
);

const InfoTile = ({ label, value, icon, onClick }) => (
    <div onClick={onClick} className="flex items-center justify-between p-5 bg-white rounded-3xl border border-orange-100 shadow-sm group hover:border-orange-300 transition-colors cursor-pointer">
        <div>
            <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">{label}</p>
            <p className="text-sm font-bold text-[#2D1B19] italic">{value}</p>
        </div>
        <div className="w-10 h-10 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
            {onClick ? <Edit2 size={16} /> : (icon || <ChevronRight size={18} />)}
        </div>
    </div>
);

const LogoutConfirmationModal = ({ onClose, onConfirm }) => (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#2D1B19]/60 backdrop-blur-md">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-sm rounded-[40px] p-8 text-center shadow-2xl border border-orange-100">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut size={24} className="text-red-500" />
            </div>
            <h2 className="text-2xl font-black italic mb-2">Sign <span className="text-orange-600">Out?</span></h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">Are you sure you want to leave?</p>
            <div className="flex flex-col gap-3">
                <button onClick={onConfirm} className="w-full py-4 bg-[#2D1B19] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">Yes, Sign Me Out</button>
                <button onClick={onClose} className="w-full py-4 bg-orange-50 text-orange-600 rounded-2xl font-black text-[10px] uppercase tracking-widest">Cancel</button>
            </div>
        </motion.div>
    </div>
);

const EditModal = ({ config, onClose, onSave }) => {
    const [val, setVal] = useState(config.value);
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#2D1B19]/40 backdrop-blur-sm">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl border border-orange-100">
                <h2 className="text-xl font-black italic text-orange-600 uppercase mb-6 tracking-tight">Update {config.label}</h2>
                <input autoFocus type="text" value={val} onChange={(e) => setVal(e.target.value)} className="w-full bg-orange-50 border border-orange-100 rounded-2xl px-5 py-4 font-bold mb-6 focus:outline-none transition-all" />
                <button onClick={() => onSave(val)} className="w-full py-4 bg-orange-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-orange-200">Save Changes</button>
            </motion.div>
        </div>
    );
};

export default Account;