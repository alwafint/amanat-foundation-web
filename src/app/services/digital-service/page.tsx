'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { 
  Globe, FileText, Wifi, Printer, 
  CreditCard, Briefcase, Map, ShieldCheck, 
  ArrowRight, MousePointerClick, Phone 
} from "lucide-react";

// ৩ ধাপ পেছনে গিয়ে কম্পোনেন্ট ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function DigitalServicePublicPage() {
  const [activeTab, setActiveTab] = useState('All');

  // --- ক্যাটাগরি ---
  const categories = ["All", "নাগরিক সেবা", "ভূমি সেবা", "বিল ও পেমেন্ট", "ছাত্র ও চাকরি"];

  // --- কালার স্টাইল জেনারেটর ---
  const getStyle = (category: string) => {
    switch (category) {
      case "নাগরিক সেবা":
        return { 
          bg: "bg-cyan-50", border: "border-cyan-100", 
          iconText: "text-cyan-600", badge: "bg-cyan-100 text-cyan-700", 
          btn: "bg-cyan-600 hover:bg-cyan-700" 
        };
      case "ভূমি সেবা":
        return { 
          bg: "bg-emerald-50", border: "border-emerald-100", 
          iconText: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700", 
          btn: "bg-emerald-600 hover:bg-emerald-700" 
        };
      case "বিল ও পেমেন্ট":
        return { 
          bg: "bg-orange-50", border: "border-orange-100", 
          iconText: "text-orange-600", badge: "bg-orange-100 text-orange-700", 
          btn: "bg-orange-600 hover:bg-orange-700" 
        };
      default: // ছাত্র ও চাকরি
        return { 
          bg: "bg-blue-50", border: "border-blue-100", 
          iconText: "text-blue-600", badge: "bg-blue-100 text-blue-700", 
          btn: "bg-blue-600 hover:bg-blue-700" 
        };
    }
  };

  // --- ডিজিটাল সেবার তালিকা (আইকনে সাইজ যুক্ত করা হয়েছে) ---
  const services = [
    // ১. নাগরিক সেবা
    { title: "জন্ম/মৃত্যু নিবন্ধন", category: "নাগরিক সেবা", icon: <FileText size={28}/>, desc: "নতুন নিবন্ধন আবেদন বা সংশোধনের কাজ।" },
    { title: "NID সংশোধন/হারানো", category: "নাগরিক সেবা", icon: <ShieldCheck size={28}/>, desc: "ভোটার আইডি কার্ড সংশোধন বা রি-ইস্যু আবেদন।" },
    { title: "পাসপোর্ট আবেদন", category: "নাগরিক সেবা", icon: <Globe size={28}/>, desc: "ই-পাসপোর্টের ফরম পূরণ ও ব্যাংক ড্রাফট।" },
    
    // ২. ভূমি সেবা
    { title: "ই-পর্চা / খতিয়ান", category: "ভূমি সেবা", icon: <Map size={28}/>, desc: "অনলাইনে জমির খতিয়ান বা পর্চা তোলা।" },
    { title: "ভূমি উন্নয়ন কর", category: "ভূমি সেবা", icon: <CreditCard size={28}/>, desc: "অনলাইনে জমির খাজনা বা কর পরিশোধ।" },
    { title: "নামজারি আবেদন", category: "ভূমি সেবা", icon: <FileText size={28}/>, desc: "জমির মালিকানা পরিবর্তনের মিউটেশন আবেদন।" },

    // ৩. বিল ও পেমেন্ট
    { title: "পল্লী বিদ্যুৎ বিল", category: "বিল ও পেমেন্ট", icon: <Wifi size={28}/>, desc: "পোস্টপেইড বিল দেওয়া বা প্রিপেইড মিটার রিচার্জ।" },
    { title: "গ্যাস ও পানি বিল", category: "বিল ও পেমেন্ট", icon: <CreditCard size={28}/>, desc: "লাইনের গ্যাস বা ওয়াসার বিল পরিশোধ।" },
    
    // ৪. ছাত্র ও চাকরি
    { title: "চাকরির আবেদন", category: "ছাত্র ও চাকরি", icon: <Briefcase size={28}/>, desc: "সরকারি বা বেসরকারি চাকরির অনলাইন আবেদন।" },
    { title: "সিভি (CV) তৈরি", category: "ছাত্র ও চাকরি", icon: <Printer size={28}/>, desc: "প্রফেশনাল বায়োডাটা বা সিভি তৈরি।" },
    { title: "ভর্তি ফরম পূরণ", category: "ছাত্র ও চাকরি", icon: <Globe size={28}/>, desc: "স্কুল, কলেজ বা বিশ্ববিদ্যালয়ে ভর্তির আবেদন।" },
    { title: "রেজাল্ট দেখা", category: "ছাত্র ও চাকরি", icon: <FileText size={28}/>, desc: "বোর্ড বা চাকরির পরীক্ষার ফলাফল প্রিন্ট।" },
  ];

  // ফিল্টার লজিক
  const filteredItems = activeTab === 'All' 
    ? services 
    : services.filter(item => item.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="relative bg-gradient-to-br from-cyan-900 via-cyan-800 to-teal-800 text-white py-24 md:py-32 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-slate-50 clip-path-slant"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-cyan-700/50 border border-cyan-400 text-cyan-100 text-sm font-bold mb-6 backdrop-blur-md">
            🖱️ এক ক্লিকে সকল নাগরিক সেবা
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            ডিজিটাল সেবা কেন্দ্র
          </h1>
          <p className="text-lg md:text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed mb-10">
            শহরে যাওয়ার ঝামেলা শেষ। এখন হাতের কাছেই পাচ্ছেন পাসপোর্ট, জন্ম নিবন্ধন, জমির পর্চাসহ সকল ডিজিটাল সুবিধা।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-white text-cyan-900 px-8 py-4 rounded-xl font-bold hover:bg-cyan-50 transition shadow-lg flex items-center justify-center gap-2">
              মেম্বার হোন <ArrowRight size={20} />
            </Link>
            <a href="tel:017XXXXXXXX" className="bg-cyan-800/50 border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-cyan-800/70 transition backdrop-blur-sm flex items-center justify-center gap-2">
              <Phone size={20} /> হেল্পলাইন
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
                    ? 'bg-cyan-600 text-white shadow-md' 
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
                    {item.icon} {/* ফিক্সড: সরাসরি আইকন ব্যবহার */}
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
                  আবেদন করুন <MousePointerClick size={16}/>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- INFO BANNER --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-cyan-50 border border-cyan-100 rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-cyan-800 mb-4">কেন আমাদের ডিজিটাল সেন্টার?</h3>
            <p className="text-cyan-700 max-w-2xl mx-auto text-lg mb-8">
              আমরা দিচ্ছি নির্ভুল কাজের নিশ্চয়তা। সরকারি ফি এবং নামমাত্র সার্ভিস চার্জে আপনার যেকোনো অনলাইন সেবা গ্রহণ করুন ঘরে বসেই।
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-slate-800">১০০% নির্ভুল</h4>
                <p className="text-sm text-slate-500">কাজের গুণগত মান নিশ্চিত করা হয়</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-slate-800">দ্রুত সেবা</h4>
                <p className="text-sm text-slate-500">নির্ধারিত সময়ের মধ্যে কাজ সম্পন্ন</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-slate-800">হোম ডেলিভারি</h4>
                <p className="text-sm text-slate-500">প্রিন্ট কপি বাড়িতে পৌঁছানোর সুবিধা</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}