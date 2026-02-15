'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { 
  Scale, Gavel, FileText, Users, 
  Handshake, Scroll, Phone, ArrowRight, 
  ShieldAlert 
} from "lucide-react";
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

// কাস্টম ম্যাপ আইকন (কারণ Lucide এ Map নেই বা কনফ্লিক্ট করে)
function MapIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>;
}

export default function LegalAidPublicPage() {
  const [activeTab, setActiveTab] = useState('All');
  const categories = ["All", "জমিজমা", "পারিবারিক", "চুক্তি ও দলিল", "পরামর্শ"];

  const getStyle = (category: string) => {
    switch (category) {
      case "জমিজমা": return { bg: "bg-emerald-50", border: "border-emerald-100", iconText: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700", btn: "bg-emerald-600 hover:bg-emerald-700" };
      case "পারিবারিক": return { bg: "bg-rose-50", border: "border-rose-100", iconText: "text-rose-600", badge: "bg-rose-100 text-rose-700", btn: "bg-rose-600 hover:bg-rose-700" };
      case "চুক্তি ও দলিল": return { bg: "bg-amber-50", border: "border-amber-100", iconText: "text-amber-600", badge: "bg-amber-100 text-amber-700", btn: "bg-amber-600 hover:bg-amber-700" };
      default: return { bg: "bg-indigo-50", border: "border-indigo-100", iconText: "text-indigo-600", badge: "bg-indigo-100 text-indigo-700", btn: "bg-indigo-600 hover:bg-indigo-700" };
    }
  };

  const services = [
    { title: "জমি রেজিস্ট্রেশন", category: "জমিজমা", icon: <MapIcon/>, desc: "জমির দলিল ও নামজারি পরামর্শ।" },
    { title: "পারিবারিক বিরোধ", category: "পারিবারিক", icon: <Users size={28}/>, desc: "পারিবারিক কলহ নিষ্পত্তি।" },
    { title: "দলিল ও চুক্তিপত্র", category: "চুক্তি ও দলিল", icon: <Scroll size={28}/>, desc: "চুক্তিপত্র তৈরি।" },
    { title: "আইনজীবীর পরামর্শ", category: "পরামর্শ", icon: <Gavel size={28}/>, desc: "অভিজ্ঞ আইনজীবীর সাথে কথা বলুন।" },
    { title: "নামজারি ও খতিয়ান", category: "জমিজমা", icon: <FileText size={28}/>, desc: "নামজারি আবেদন সহায়তা।" },
    { title: "সালিশ ও মধ্যস্থতা", category: "পারিবারিক", icon: <Handshake size={28}/>, desc: "স্থানীয়ভাবে বিরোধ নিষ্পত্তি।" },
    { title: "জিডি ও আইনি সুরক্ষা", category: "পরামর্শ", icon: <ShieldAlert size={28}/>, desc: "থানায় জিডি করার নিয়ম।" },
  ];

  const filteredItems = activeTab === 'All' ? services : services.filter(item => item.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />
      <div className="bg-gradient-to-br from-indigo-900 to-violet-800 text-white py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">আইনি সহায়তা ও পরামর্শ</h1>
        <p>আইনি জটিলতা আর নয়। আমরা আছি আপনার পাশে।</p>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center mb-8 gap-2 overflow-x-auto">
          {categories.map((cat, idx) => (
            <button key={idx} onClick={() => setActiveTab(cat)} className={`px-5 py-2 rounded-full text-sm font-bold ${activeTab === cat ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600'}`}>{cat}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => {
            const style = getStyle(item.category);
            return (
              <div key={index} className={`bg-white p-6 rounded-2xl border ${style.border} shadow-sm flex flex-col h-full`}>
                <div className={`w-14 h-14 ${style.bg} ${style.iconText} rounded-xl flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 mb-4 flex-grow">{item.desc}</p>
                <Link href="/login" className={`w-full py-2 rounded-lg text-white font-bold text-sm text-center ${style.btn}`}>পরামর্শ নিন</Link>
              </div>
            );
          })}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}