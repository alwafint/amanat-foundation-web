'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { 
  HeartPulse, Pill, Ambulance, Stethoscope, 
  Activity, Baby, HeartHandshake, Microscope, 
  PhoneCall, ArrowRight, Phone 
} from "lucide-react";

// ৩ ধাপ পেছনে গিয়ে কম্পোনেন্ট ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function HealthPublicPage() {
  const [activeTab, setActiveTab] = useState('All');

  // --- ক্যাটাগরি ---
  const categories = ["All", "ডাক্তার ও পরামর্শ", "জরুরি সেবা", "ঔষধ ও টেস্ট", "মা ও শিশু"];

  // --- কালার স্টাইল জেনারেটর ---
  const getStyle = (category: string) => {
    switch (category) {
      case "জরুরি সেবা":
        return { 
          bg: "bg-red-50", border: "border-red-100", 
          iconText: "text-red-600", badge: "bg-red-100 text-red-700", 
          btn: "bg-red-600 hover:bg-red-700" 
        };
      case "ডাক্তার ও পরামর্শ":
        return { 
          bg: "bg-blue-50", border: "border-blue-100", 
          iconText: "text-blue-600", badge: "bg-blue-100 text-blue-700", 
          btn: "bg-blue-600 hover:bg-blue-700" 
        };
      case "ঔষধ ও টেস্ট":
        return { 
          bg: "bg-teal-50", border: "border-teal-100", 
          iconText: "text-teal-600", badge: "bg-teal-100 text-teal-700", 
          btn: "bg-teal-600 hover:bg-teal-700" 
        };
      default: // মা ও শিশু
        return { 
          bg: "bg-pink-50", border: "border-pink-100", 
          iconText: "text-pink-600", badge: "bg-pink-100 text-pink-700", 
          btn: "bg-pink-600 hover:bg-pink-700" 
        };
    }
  };

  // --- স্বাস্থ্য সেবার তালিকা (সরাসরি সাইজ দেওয়া হয়েছে) ---
  const healthServices = [
    { title: "হ্যালো ডাক্তার", category: "ডাক্তার ও পরামর্শ", icon: <PhoneCall size={28}/>, desc: "২৪/৭ ঢাকা বা রংপুরের বিশেষজ্ঞ ডাক্তারের ভিডিও পরামর্শ।" },
    { title: "ফ্রি হেলথ ক্যাম্প", category: "ডাক্তার ও পরামর্শ", icon: <Stethoscope size={28}/>, desc: "মাসে একদিন ডায়াবেটিস ও প্রেশার মাপার ক্যাম্প।" },
    
    { title: "অ্যাম্বুলেন্স সেবা", category: "জরুরি সেবা", icon: <Ambulance size={28}/>, desc: "জরুরি প্রয়োজনে সড়ক বা নৌ-পথে রোগী পরিবহন।" },
    { title: "অক্সিজেন ব্যাংক", category: "জরুরি সেবা", icon: <Activity size={28}/>, desc: "শ্বাসকষ্টের রোগীদের জন্য বিনামূল্যে অক্সিজেন সিলিন্ডার।" },
    { title: "ব্লাড ডোনেশন ক্লাব", category: "জরুরি সেবা", icon: <HeartHandshake size={28}/>, desc: "জরুরি রক্তের প্রয়োজনে ডোনার ম্যানেজ করে দেওয়া।" },

    { title: "ঔষধ হোম ডেলিভারি", category: "ঔষধ ও টেস্ট", icon: <Pill size={28}/>, desc: "চুক্তিবদ্ধ ফার্মেসি থেকে ১০-১৫% ছাড়ে ঔষধ অর্ডার।" },
    { title: "প্যাথলজি ডিসকাউন্ট", category: "ঔষধ ও টেস্ট", icon: <Microscope size={28}/>, desc: "ডায়াগনস্টিক টেস্টে মেম্বারদের জন্য ৩০-৪০% ছাড়।" },

    { title: "মা ও শিশু যত্ন", category: "মা ও শিশু", icon: <Baby size={28}/>, desc: "গর্ভবতী মায়েদের চেকআপ ও নবজাতকের পুষ্টি নিশ্চিতকরণ।" },
  ];

  // ফিল্টার লজিক
  const filteredItems = activeTab === 'All' 
    ? healthServices 
    : healthServices.filter(item => item.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="relative bg-gradient-to-br from-rose-700 via-rose-600 to-pink-600 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-slate-50 clip-path-slant"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-rose-800/30 border border-rose-400 text-rose-100 text-sm font-bold mb-6 backdrop-blur-md">
            🩺 সুস্থ জীবন, সুন্দর ভবিষ্যৎ
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            স্বাস্থ্য সুরক্ষা সেবা
          </h1>
          <p className="text-lg md:text-xl text-rose-100 max-w-3xl mx-auto leading-relaxed mb-10">
            গ্রামের মানুষের দোরগোড়ায় আধুনিক স্বাস্থ্যসেবা পৌঁছে দিতে আমরা বদ্ধপরিকর। টেলিমেডিসিন, ঔষধ এবং জরুরি সেবায় আমরা আছি ২৪ ঘণ্টা।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-white text-rose-700 px-8 py-4 rounded-xl font-bold hover:bg-rose-50 transition shadow-lg flex items-center justify-center gap-2">
              মেম্বার হোন <ArrowRight size={20} />
            </Link>
            <a href="tel:017XXXXXXXX" className="bg-rose-800/50 border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-rose-800/70 transition backdrop-blur-sm flex items-center justify-center gap-2">
              <Phone size={20} /> জরুরি কল
            </a>
          </div>
        </div>
      </div>

      {/* --- TABS & GRID SECTION --- */}
      <div className="container mx-auto px-4 py-16 -mt-20 relative z-20">
        
        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar bg-white/90 p-2 rounded-full shadow-lg backdrop-blur-md max-w-full">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(cat)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeTab === cat 
                    ? 'bg-rose-600 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => {
            const style = getStyle(item.category);
            return (
              <div 
                key={index} 
                className={`bg-white p-6 rounded-2xl border ${style.border} shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 flex flex-col h-full`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-14 h-14 ${style.bg} ${style.iconText} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {/* এখানে React.cloneElement বাদ দেওয়া হয়েছে */}
                    {item.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${style.badge}`}>
                    {item.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                  {item.desc}
                </p>

                <Link href="/login" className={`w-full py-2.5 rounded-lg text-white font-bold text-sm shadow transition-all flex items-center justify-center gap-2 ${style.btn}`}>
                  সেবা নিন <ArrowRight size={16}/>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- EMERGENCY BANNER --- */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-rose-50 border border-rose-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 animate-pulse shadow-sm">
                <Ambulance size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-rose-800 mb-2">জরুরি অ্যাম্বুলেন্স প্রয়োজন?</h3>
                <p className="text-rose-600 max-w-md">
                  রাত-দিন ২৪ ঘণ্টা আমাদের হটলাইন খোলা থাকে। যেকোনো জরুরি প্রয়োজনে অ্যাপে অপেক্ষা না করে সরাসরি কল করুন।
                </p>
              </div>
            </div>
            <a href="tel:017XXXXXXXX" className="bg-rose-600 text-white px-10 py-4 rounded-full font-bold text-xl hover:bg-rose-700 transition shadow-lg hover:shadow-rose-200 flex items-center gap-3">
              <PhoneCall size={24}/> ০১৭XX-XXXXXX
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}