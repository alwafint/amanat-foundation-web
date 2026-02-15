'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { 
  Laptop, Smartphone, Scissors, Zap, 
  Sprout, Fish, Milk, PenTool, 
  MonitorPlay, Wrench, ArrowRight, Phone 
} from "lucide-react";

// ৩ ধাপ পেছনে গিয়ে কম্পোনেন্ট ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function EducationPublicPage() {
  const [activeTab, setActiveTab] = useState('All');

  // --- ক্যাটাগরি ---
  const categories = ["All", "আইটি ও ফ্রিল্যান্সিং", "কারিগরি দক্ষতা", "কৃষি ও খামার", "কুটির শিল্প"];

  // --- কালার স্টাইল জেনারেটর ---
  const getStyle = (category: string) => {
    switch (category) {
      case "আইটি ও ফ্রিল্যান্সিং":
        return { 
          bg: "bg-violet-50", border: "border-violet-100", 
          iconText: "text-violet-600", badge: "bg-violet-100 text-violet-700", 
          btn: "bg-violet-600 hover:bg-violet-700" 
        };
      case "কারিগরি দক্ষতা":
        return { 
          bg: "bg-blue-50", border: "border-blue-100", 
          iconText: "text-blue-600", badge: "bg-blue-100 text-blue-700", 
          btn: "bg-blue-600 hover:bg-blue-700" 
        };
      case "কৃষি ও খামার":
        return { 
          bg: "bg-emerald-50", border: "border-emerald-100", 
          iconText: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700", 
          btn: "bg-emerald-600 hover:bg-emerald-700" 
        };
      default: // কুটির শিল্প
        return { 
          bg: "bg-rose-50", border: "border-rose-100", 
          iconText: "text-rose-600", badge: "bg-rose-100 text-rose-700", 
          btn: "bg-rose-600 hover:bg-rose-700" 
        };
    }
  };

  // --- প্রশিক্ষণের তালিকা (আইকনে সাইজ যুক্ত করা হয়েছে - এখানে ফিক্স করা হয়েছে) ---
  const trainingItems = [
    { title: "কম্পিউটার অফিস অ্যাপ্লিকেশন", category: "আইটি ও ফ্রিল্যান্সিং", icon: <Laptop size={28}/>, duration: "৩ মাস", desc: "বেসিক কম্পিউটার, টাইপিং এবং অফিস ম্যানেজমেন্ট।" },
    { title: "গ্রাফিক্স ডিজাইন ও ফ্রিল্যান্সিং", category: "আইটি ও ফ্রিল্যান্সিং", icon: <PenTool size={28}/>, duration: "৬ মাস", desc: "লোগো, ব্যানার ডিজাইন এবং অনলাইন মার্কেটপ্লেস গাইডলাইন।" },
    { title: "ডিজিটাল মার্কেটিং", category: "আইটি ও ফ্রিল্যান্সিং", icon: <MonitorPlay size={28}/>, duration: "৩ মাস", desc: "ফেসবুক বুস্টিং, ইউটিউব মার্কেটিং এবং কন্টেন্ট ক্রিয়েশন।" },
    { title: "মোবাইল সার্ভিসিং ও রিপেয়ার", category: "কারিগরি দক্ষতা", icon: <Smartphone size={28}/>, duration: "৩ মাস", desc: "মোবাইল হার্ডওয়্যার ও সফটওয়্যার মেরামতের পূর্ণাঙ্গ কোর্স।" },
    { title: "ইলেকট্রিক্যাল হাউজ ওয়্যারিং", category: "কারিগরি দক্ষতা", icon: <Zap size={28}/>, duration: "৩ মাস", desc: "বাসাবাড়ির বিদ্যুৎ সংযোগ ও ফ্যান-লাইট মেরামতের কাজ।" },
    { title: "অটো মেকানিক্স ও ড্রাইভিং", category: "কারিগরি দক্ষতা", icon: <Wrench size={28}/>, duration: "২ মাস", desc: "অটো রিক্সা মেরামত এবং চালনা প্রশিক্ষণ।" },
    { title: "আধুনিক গবাদিপশু পালন", category: "কৃষি ও খামার", icon: <Milk size={28}/>, duration: "১ মাস", desc: "গরু মোটাতাজাকরণ এবং প্রাথমিক চিকিৎসা প্রশিক্ষণ।" },
    { title: "বায়োফ্লক ও মাছ চাষ", category: "কৃষি ও খামার", icon: <Fish size={28}/>, duration: "১৫ দিন", desc: "আধুনিক পদ্ধতিতে অল্প জায়গায় মাছ চাষের কৌশল।" },
    { title: "আধুনিক কৃষি ও বীজ প্রযুক্তি", category: "কৃষি ও খামার", icon: <Sprout size={28}/>, duration: "১ মাস", desc: "উন্নত ফলন, সার প্রয়োগ এবং বালাইনাশক ব্যবস্থাপনা।" },
    { title: "সেলাই ও দর্জি বিজ্ঞান", category: "কুটির শিল্প", icon: <Scissors size={28}/>, duration: "৩ মাস", desc: "কাটিং, সেলাই এবং পোশাক তৈরির হাতে-কলমে শিক্ষা।" },
    { title: "হস্তশিল্প ও নকশিকাঁথা", category: "কুটির শিল্প", icon: <PenTool size={28}/>, duration: "২ মাস", desc: "শৌখিন পণ্য তৈরি এবং বাজারজাতকরণ।" },
  ];

  // ফিল্টার লজিক
  const filteredItems = activeTab === 'All' 
    ? trainingItems 
    : trainingItems.filter(item => item.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="relative bg-gradient-to-br from-purple-800 via-purple-700 to-indigo-800 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-slate-50 clip-path-slant"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-purple-600/50 border border-purple-400 text-purple-100 text-sm font-bold mb-6 backdrop-blur-md">
            🎓 দক্ষতা অর্জন করুন, স্বাবলম্বী হোন
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            কারিগরি প্রশিক্ষণ ও দক্ষতা
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed mb-10">
            শুধু লোন নয়, আমরা দিচ্ছি দক্ষ হওয়ার সুযোগ। কম্পিউটার, মোবাইল সার্ভিসিং, সেলাই কিংবা আধুনিক খামার ব্যবস্থাপনায় প্রশিক্ষণ নিয়ে নিজের পায়ে দাঁড়ান।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-white text-purple-900 px-8 py-4 rounded-xl font-bold hover:bg-purple-50 transition shadow-lg flex items-center justify-center gap-2">
              ভর্তি হতে চাই <ArrowRight size={20} />
            </Link>
            <a href="tel:017XXXXXXXX" className="bg-purple-800/50 border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-purple-800/70 transition backdrop-blur-sm flex items-center justify-center gap-2">
              <Phone size={20} /> বিস্তারিত জানতে কল
            </a>
          </div>
        </div>
      </div>

      {/* --- TABS & GRID SECTION --- */}
      <div className="container mx-auto px-4 py-16 -mt-20 relative z-20">
        
        {/* Tabs (Scrollable) */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar bg-white/90 p-2 rounded-full shadow-lg backdrop-blur-md max-w-full">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(cat)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeTab === cat 
                    ? 'bg-purple-700 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
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
                    {/* ফিক্সড: সরাসরি আইকন রেন্ডার করা হয়েছে */}
                    {item.icon} 
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${style.badge}`}>
                    {item.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                  {item.desc}
                </p>

                <Link href="/login" className={`w-full py-2.5 rounded-lg text-white font-bold text-sm shadow transition-all flex items-center justify-center gap-2 ${style.btn}`}>
                  ভর্তি হোন <ArrowRight size={16}/>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}