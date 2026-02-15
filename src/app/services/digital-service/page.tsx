'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { 
  Globe, FileText, Wifi, Printer, 
  CreditCard, Briefcase, ShieldCheck, 
  ArrowRight, Phone 
} from "lucide-react";
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

// কাস্টম ম্যাপ আইকন
function MapIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>;
}

export default function DigitalServicePublicPage() {
  const [activeTab, setActiveTab] = useState('All');
  const categories = ["All", "নাগরিক সেবা", "ভূমি সেবা", "বিল ও পেমেন্ট", "ছাত্র ও চাকরি"];

  const getStyle = (category: string) => {
    switch (category) {
      case "নাগরিক সেবা": return { bg: "bg-cyan-50", border: "border-cyan-100", iconText: "text-cyan-600", btn: "bg-cyan-600 hover:bg-cyan-700" };
      case "ভূমি সেবা": return { bg: "bg-emerald-50", border: "border-emerald-100", iconText: "text-emerald-600", btn: "bg-emerald-600 hover:bg-emerald-700" };
      case "বিল ও পেমেন্ট": return { bg: "bg-orange-50", border: "border-orange-100", iconText: "text-orange-600", btn: "bg-orange-600 hover:bg-orange-700" };
      default: return { bg: "bg-blue-50", border: "border-blue-100", iconText: "text-blue-600", btn: "bg-blue-600 hover:bg-blue-700" };
    }
  };

  const services = [
    { title: "জন্ম/মৃত্যু নিবন্ধন", category: "নাগরিক সেবা", icon: <FileText size={28}/>, desc: "নতুন নিবন্ধন ও সংশোধন।" },
    { title: "NID সংশোধন", category: "নাগরিক সেবা", icon: <ShieldCheck size={28}/>, desc: "ভোটার আইডি কার্ড সংশোধন।" },
    { title: "পাসপোর্ট আবেদন", category: "নাগরিক সেবা", icon: <Globe size={28}/>, desc: "ই-পাসপোর্ট ফরম ও ব্যাংক ড্রাফট।" },
    { title: "ই-পর্চা / খতিয়ান", category: "ভূমি সেবা", icon: <MapIcon/>, desc: "জমির খতিয়ান তোলা।" },
    { title: "পল্লী বিদ্যুৎ বিল", category: "বিল ও পেমেন্ট", icon: <Wifi size={28}/>, desc: "বিদ্যুৎ বিল পরিশোধ।" },
    { title: "চাকরির আবেদন", category: "ছাত্র ও চাকরি", icon: <Briefcase size={28}/>, desc: "সরকারি চাকরির আবেদন।" },
    { title: "সিভি (CV) তৈরি", category: "ছাত্র ও চাকরি", icon: <Printer size={28}/>, desc: "প্রফেশনাল বায়োডাটা তৈরি।" },
  ];

  const filteredItems = activeTab === 'All' ? services : services.filter(item => item.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />
      <div className="bg-gradient-to-br from-cyan-900 to-teal-800 text-white py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">ডিজিটাল সেবা কেন্দ্র</h1>
        <p>এক ক্লিকে সকল নাগরিক সেবা।</p>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center mb-8 gap-2 overflow-x-auto">
          {categories.map((cat, idx) => (
            <button key={idx} onClick={() => setActiveTab(cat)} className={`px-5 py-2 rounded-full text-sm font-bold ${activeTab === cat ? 'bg-cyan-600 text-white' : 'bg-white text-slate-600'}`}>{cat}</button>
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
                <p className="text-sm text-slate-500 mb-6 flex-grow">{item.desc}</p>
                <Link href="/login" className={`w-full py-2 rounded-lg text-white font-bold text-sm text-center ${style.btn}`}>আবেদন করুন</Link>
              </div>
            );
          })}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}