'use client';

import React from 'react';
import Link from "next/link";
import { 
  ArrowLeft, Trophy, CheckCircle, 
  HelpCircle, Gift, Crown, Medal 
} from "lucide-react";
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function BestMemberPage() {
  const prizes = [
    { name: "৩২ পিসের ডিনার সেট", icon: "🍽️" },
    { name: "সিলিং ফ্যান / রাইস কুকার", icon: "🎁" },
    { name: "সম্মাননা ক্রেস্ট ও সনদ", icon: "🏆" },
    { name: "পরবর্তী লোনে প্রসেসিং ফি মওকুফ", icon: "✨" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION (GOLD THEME) --- */}
      <div className="relative bg-gradient-to-br from-yellow-600 via-amber-500 to-orange-500 text-white py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/#rewards" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition bg-white/10 px-4 py-2 rounded-full text-sm backdrop-blur-md">
            <ArrowLeft size={16} /> পুরস্কার তালিকায় ফিরে যান
          </Link>
          
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 px-4 py-1.5 rounded-full mb-4">
                <Crown size={16} className="text-yellow-200" />
                <span className="text-sm font-bold uppercase tracking-wider">সেরাদের সেরা</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-sm">শ্রেষ্ঠ মেম্বার পুরস্কার</h1>
              <p className="text-lg md:text-xl text-white/90 font-medium">সততা ও নিয়মমানুবর্তিতার সেরা স্বীকৃতি</p>
            </div>
            <div className="animate-float">
              <Trophy size={100} className="text-yellow-200 drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Medal className="text-amber-600" /> পুরস্কার সম্পর্কে
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                আমানত ফাউন্ডেশন বিশ্বাস করে, যারা নিয়ম মেনে সঞ্চয় করেন এবং কিস্তি পরিশোধ করেন, তারা সমাজের মডেল। তাই তাদের উৎসাহিত করতে আমরা প্রতি বছর 'শ্রেষ্ঠ মেম্বার' পুরস্কার প্রদান করি। এটি শুধু একটি পুরস্কার নয়, এটি আপনার সম্মানের প্রতীক।
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-amber-200 bg-amber-50">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-amber-800">
                <CheckCircle className="text-amber-600" /> পাওয়ার শর্তাবলী
              </h3>
              <ul className="space-y-4">
                {["সারা বছরে ১টিও মাসিক সঞ্চয় মিস করা যাবে না", "গৃহীত লোনের কিস্তি নির্দিষ্ট তারিখে পরিশোধ করতে হবে", "সংগঠনের মিটিং বা সাধারণ সভায় উপস্থিত থাকতে হবে", "অন্য মেম্বারদের সাথে সুসম্পর্ক বজায় রাখতে হবে"].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{idx + 1}</span>
                    <span className="text-slate-700 font-medium text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-yellow-400 sticky top-24">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <Gift className="text-yellow-500" size={32} />
                <div>
                  <h3 className="text-xl font-bold text-slate-800">সম্ভাব্য পুরস্কার</h3>
                  <p className="text-xs text-slate-400">বিজয়ীদের জন্য অপেক্ষা করছে</p>
                </div>
              </div>
              <ul className="space-y-4">
                {prizes.map((prize, idx) => (
                  <li key={idx} className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100 transition hover:bg-yellow-50 hover:border-yellow-200 group">
                    <div className="text-2xl group-hover:scale-125 transition-transform">{prize.icon}</div>
                    <span className="font-bold text-slate-700">{prize.name}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 bg-slate-900 p-5 rounded-2xl text-center text-white">
                 <h4 className="text-sm font-bold mb-2 flex justify-center gap-2 items-center">
                   <HelpCircle size={18} className="text-yellow-400"/> প্রশ্ন আছে?
                 </h4>
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