'use client';

import React from 'react';
import Link from "next/link";
import { ArrowLeft, CheckCircle, HelpCircle, Gift, Sparkles, Bike } from "lucide-react";
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function LotteryPage() {
  const prizes = [
    { name: "১ম পুরস্কার: বাইসাইকেল", icon: "🚲" },
    { name: "২য় পুরস্কার: সেলাই মেশিন", icon: "🧵" },
    { name: "৩য় পুরস্কার: এন্ড্রয়েড মোবাইল", icon: "📱" },
    { name: "৪র্থ-১০ম: গৃহস্থালি সামগ্রী", icon: "🎁" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* HERO SECTION (EMERALD THEME) */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500 text-white py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/#rewards" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition bg-white/10 px-4 py-2 rounded-full text-sm backdrop-blur-md">
            <ArrowLeft size={16} /> পুরস্কার তালিকায় ফিরে যান
          </Link>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 px-4 py-1.5 rounded-full mb-4">
                <Sparkles size={16} className="text-yellow-300" />
                <span className="text-sm font-bold uppercase tracking-wider">লাকি ড্র</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-sm">বাম্পার লটারি</h1>
              <p className="text-lg md:text-xl text-white/90 font-medium">ভাগ্যের চাকা ঘুরুক আমানতের সাথে</p>
            </div>
            <div className="animate-pulse">
              <Bike size={100} className="text-emerald-100 drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Sparkles className="text-emerald-600" /> লটারি সম্পর্কে
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                মেম্বারদের মাঝে আনন্দ ছড়িয়ে দিতে এবং সঞ্চয়ে আগ্রহী করতে আমরা প্রতি ৬ মাস অন্তর ধামাকা লটারির আয়োজন করি। এখানে প্রতিটি সক্রিয় মেম্বার স্বয়ংক্রিয়ভাবে অংশগ্রহণ করতে পারেন।
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-emerald-200 bg-emerald-50">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-800">
                <CheckCircle className="text-emerald-600" /> অংশগ্রহণের নিয়ম
              </h3>
              <ul className="space-y-4">
                {["লটারির দিন পর্যন্ত একাউন্ট সক্রিয় থাকতে হবে", "ন্যূনতম ৬ মাসের সঞ্চয় জমা থাকতে হবে", "কোনো বকেয়া লোন থাকা যাবে না"].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{idx + 1}</span>
                    <span className="text-slate-700 font-medium text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-emerald-400 sticky top-24">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <Gift className="text-emerald-500" size={32} />
                <div>
                  <h3 className="text-xl font-bold text-slate-800">আকর্ষণীয় পুরস্কার</h3>
                </div>
              </div>
              <ul className="space-y-4">
                {prizes.map((prize, idx) => (
                  <li key={idx} className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100 transition hover:bg-emerald-50 hover:border-emerald-200 group">
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