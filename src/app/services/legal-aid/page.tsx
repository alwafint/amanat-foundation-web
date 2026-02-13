'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { 
  Scale, Gavel, FileText, Users, 
  Handshake, Scroll, Phone, ArrowRight, 
  CheckCircle2, ShieldAlert 
} from "lucide-react";

// ৩ ধাপ পেছনে গিয়ে কম্পোনেন্ট ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function LegalAidPublicPage() {
  const [activeTab, setActiveTab] = useState('All');

  // --- ক্যাটাগরি ---
  const categories = ["All", "জমিজমা", "পারিবারিক", "চুক্তি ও দলিল", "পরামর্শ"];

  // --- কালার স্টাইল জেনারেটর ---
  const getStyle = (category: string) => {
    switch (category) {
      case "জমিজমা":
        return { 
          bg: "bg-emerald-50", border: "border-emerald-100", 
          iconText: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700", 
          btn: "bg-emerald-600 hover:bg-emerald-700" 
        };
      case "পারিবারিক":
        return { 
          bg: "bg-rose-50", border: "border-rose-100", 
          iconText: "text-rose-600", badge: "bg-rose-100 text-rose-700", 
          btn: "bg-rose-600 hover:bg-rose-700" 
        };
      case "চুক্তি ও দলিল":
        return { 
          bg: "bg-amber-50", border: "border-amber-100", 
          iconText: "text-amber-600", badge: "bg-amber-100 text-amber-700", 
          btn: "bg-amber-600 hover:bg-amber-700" 
        };
      default: // পরামর্শ
        return { 
          bg: "bg-indigo-50", border: "border-indigo-100", 
          iconText: "text-indigo-600", badge: "bg-indigo-100 text-indigo-700", 
          btn: "bg-indigo-600 hover:bg-indigo-700" 
        };
    }
  };

  // --- আইনি সেবার তালিকা ---
  const services = [
    { title: "জমি রেজিস্ট্রেশন পরামর্শ", category: "জমিজমা", icon: <Map/>, desc: "জমির দলিল যাচাই, নামজারি এবং রেজিস্ট্রেশন সংক্রান্ত সঠিক পরামর্শ।" },
    { title: "পারিবারিক বিরোধ নিষ্পত্তি", category: "পারিবারিক", icon: <Users/>, desc: "পারিবারিক কলহ, দেনমোহর বা ভরণপোষণ নিয়ে আইনি সহায়তা।" },
    { title: "দলিল ও চুক্তিপত্র", category: "চুক্তি ও দলিল", icon: <Scroll/>, desc: "বাড়ি ভাড়া, জমি বায়না বা ব্যবসায়িক চুক্তিপত্র তৈরি।" },
    { title: "আইনজীবীর অ্যাপয়েন্টমেন্ট", category: "পরামর্শ", icon: <Gavel/>, desc: "অভিজ্ঞ আইনজীবীর সাথে সরাসরি বা ফোনে পরামর্শের সুযোগ।" },
    { title: "নামজারি ও খতিয়ান", category: "জমিজমা", icon: <FileText/>, desc: "অনলাইনে নামজারি আবেদন এবং খতিয়ান উত্তোলনে সহায়তা।" },
    { title: "সালিশ ও মধ্যস্থতা", category: "পারিবারিক", icon: <Handshake/>, desc: "মামলা এড়িয়ে স্থানীয়ভাবে বিরোধ নিষ্পত্তির উদ্যোগ।" },
    { title: "হলফনামা (Affidavit)", category: "চুক্তি ও দলিল", icon: <FileText/>, desc: "নাম পরিবর্তন, বয়স সংশোধন বা যেকোনো হলফনামা তৈরি।" },
    { title: "জিডি ও আইনি সুরক্ষা", category: "পরামর্শ", icon: <ShieldAlert/>, desc: "থানায় জিডি বা অভিযোগ দায়ের করার সঠিক নিয়মাবলী।" },
  ];

  // আইকন ফিক্স (Map আইকন Lucide এ নেই, তাই কাস্টম বা অন্য আইকন ব্যবহার করছি)
  function Map() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>;
  }

  // ফিল্টার লজিক
  const filteredItems = activeTab === 'All' 
    ? services 
    : services.filter(item => item.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-800 text-white py-24 md:py-32 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-slate-50 clip-path-slant"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-indigo-700/50 border border-indigo-400 text-indigo-100 text-sm font-bold mb-6 backdrop-blur-md">
            ⚖️ ন্যায়বিচার সবার অধিকার
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            আইনি সহায়তা ও পরামর্শ
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed mb-10">
            আইনি জটিলতা আর নয়। জমিজমা, পারিবারিক বা ব্যবসায়িক যেকোনো আইনি প্রয়োজনে আমরা আছি আপনার পাশে। অভিজ্ঞ আইনজীবীর পরামর্শ নিন সহজেই।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-white text-indigo-900 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition shadow-lg flex items-center justify-center gap-2">
              মেম্বার হোন <ArrowRight size={20} />
            </Link>
            <a href="tel:017XXXXXXXX" className="bg-indigo-800/50 border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-800/70 transition backdrop-blur-sm flex items-center justify-center gap-2">
              <Phone size={20} /> জরুরি পরামর্শ
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
                    ? 'bg-indigo-600 text-white shadow-md' 
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
                    {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
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
                  পরামর্শ নিন <ArrowRight size={16}/>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- WHY LEGAL AID SECTION --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-indigo-900/10"></div>
              {/* Placeholder image for legal/court */}
              <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-indigo-300">
                 <Scale size={100} />
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800">কেন আমাদের আইনি সহায়তা?</h2>
              <p className="text-slate-600 text-lg">
                গ্রামীণ মানুষের আইনি অধিকার নিশ্চিত করতে আমরা দিচ্ছি সহজ ও সাশ্রয়ী সমাধান।
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-700 font-medium bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                  <CheckCircle2 className="text-indigo-600 shrink-0" size={20}/>
                  অভিজ্ঞ প্যানেল আইনজীবীর পরামর্শ
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                  <CheckCircle2 className="text-indigo-600 shrink-0" size={20}/>
                  সালিশের মাধ্যমে দ্রুত বিরোধ নিষ্পত্তি
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                  <CheckCircle2 className="text-indigo-600 shrink-0" size={20}/>
                  দলিল ও কাগজপত্রের নিখুঁত যাচাই
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOTLINE BANNER --- */}
      <section className="py-12 bg-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-md border border-indigo-100">
            <ShieldAlert size={48} className="text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">জরুরি আইনি সহায়তা?</h3>
            <p className="text-slate-500 mb-6">থানায় জিডি বা জরুরি আইনি পরামর্শের জন্য আমাদের হটলাইনে কল করুন।</p>
            <a href="tel:017XXXXXXXX" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition">
              <Phone size={20} /> কল করুন: ০১৭XX-XXXXXX
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}