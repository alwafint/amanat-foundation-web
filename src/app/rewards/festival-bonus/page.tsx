'use client';

import React from 'react';
import Link from "next/link";
import { ArrowLeft, CheckCircle, HelpCircle, Gift, ShoppingBag, PartyPopper } from "lucide-react";
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function FestivalBonusPage() {
  const prizes = [
    { name: "সেমাই, চিনি ও তেলের প্যাক", icon: "🛍️" },
    { name: "পোলাও চাল ও মসলা", icon: "🍚" },
    { name: "শাড়ি বা লুঙ্গি (সিনিয়র)", icon: "👕" },
    { name: "বাচ্চাদের শিক্ষা উপকরণ", icon: "🎒" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* HERO SECTION (BLUE THEME) */}
      <div className="relative bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500 text-white py-24 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-24 bg-slate-50 clip-path-slant"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/#rewards" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition bg-white/10 px-4 py-2 rounded-full text-sm backdrop-blur-md">
            <ArrowLeft size={16} /> পুরস্কার তালিকায় ফিরে যান
          </Link>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 px-4 py-1.5 rounded-full mb-4">
                <PartyPopper size={16} className="text-yellow-300" />
                <span className="text-sm font-bold uppercase tracking-wider">উৎসবের আনন্দ</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-sm">ঈদ ও উৎসব বোনাস</h1>
              <p className="text-lg md:text-xl text-white/90 font-medium">সবার ঘরে ঘরে পৌঁছে যাক খুশির বার্তা</p>
            </div>
            <div className="animate-bounce-slow">
              <Gift size={100} className="text-blue-200 drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ShoppingBag className="text-blue-600" /> বোনাস সম্পর্কে
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                ঈদ বা পূজা মানেই বাড়তি খরচ। আমাদের দীর্ঘমেয়াদী মেম্বারদের উৎসবের আনন্দ বাড়িয়ে দিতে আমরা বিশেষ বোনাস বা উপহার সামগ্রী প্রদান করি।
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-blue-200 bg-blue-50">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-800">
                <CheckCircle className="text-blue-600" /> কারা পাবেন?
              </h3>
              <ul className="space-y-4">
                {["ন্যূনতম ১ বছর মেম্বারশিপ থাকতে হবে", "নিয়মিত সঞ্চয়কারী হতে হবে", "উৎসবের ১ মাস আগে তালিকা প্রকাশ করা হয়"].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{idx + 1}</span>
                    <span className="text-slate-700 font-medium text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-blue-400 sticky top-24">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <Gift className="text-blue-500" size={32} />
                <div>
                  <h3 className="text-xl font-bold text-slate-800">গিফট আইটেম</h3>
                </div>
              </div>
              <ul className="space-y-4">
                {prizes.map((prize, idx) => (
                  <li key={idx} className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100 transition hover:bg-blue-50 hover:border-blue-200 group">
                    <div className="text-2xl group-hover:scale-125 transition-transform">{prize.icon}</div>
                    <span className="font-bold text-slate-700">{prize.name}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 bg-slate-900 p-5 rounded-2xl text-center text-white">
                 <Link href="/contact" className="inline-block bg-white text-slate-900 px-6 py-2 rounded-lg font-bold text-sm hover:bg-slate-200 transition">
                   যোগাযোগ করুন
                 </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
      <SiteFooter />
    </div>
  );
}