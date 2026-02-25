'use client';

import React from 'react';
import Link from "next/link";
import { ArrowRight, Users, Star, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <header className="relative bg-emerald-950 min-h-[85vh] flex items-center overflow-hidden pt-28 pb-24 lg:pt-32 lg:pb-32">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      {/* Soft Glow Top Right */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      {/* Soft Glow Bottom Left */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      {/* Pattern Grid */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-5"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* --- LEFT SIDE: TEXT CONTENT --- */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 md:space-y-8">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-emerald-900/50 border border-emerald-700/50 backdrop-blur-md shadow-sm mx-auto lg:mx-0">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span className="text-emerald-50 text-xs md:text-sm font-bold tracking-wide">বিশ্বাস ও আস্থার প্রতীক</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15]">
              আপনার ক্ষুদ্র সঞ্চয়, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                গড়বে বড় স্বপ্ন
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-emerald-100/80 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
              আমানত ফাউন্ডেশনের সাথে যুক্ত হয়ে নিজের ও পরিবারের ভবিষ্যৎ সুনিশ্চিত করুন। কৃষি, শিক্ষা ও স্বাস্থ্যের উন্নয়নে আমরা আছি আপনার পাশে।
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start">
              <Link 
                href="/register-volunteer" 
                className="group w-full sm:w-auto px-8 py-4 bg-amber-500 text-emerald-950 rounded-xl font-bold hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-95"
              >
                ভলান্টিয়ার হোন <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/contact" 
                className="w-full sm:w-auto px-8 py-4 bg-emerald-900/40 border border-emerald-700 text-emerald-100 rounded-xl font-bold hover:bg-emerald-800/60 hover:text-white transition-all flex items-center justify-center active:scale-95"
              >
                যোগাযোগ করুন
              </Link>
            </div>

            {/* Stats (Mobile Optimized) */}
            <div className="pt-6 border-t border-emerald-800/50 flex items-center justify-center lg:justify-start gap-8 md:gap-12">
              <div className="flex flex-col items-center lg:items-start">
                 <span className="text-3xl md:text-4xl font-black text-white drop-shadow-sm">৫০০+</span>
                 <span className="text-[10px] md:text-xs text-emerald-300/80 uppercase tracking-widest font-bold mt-1">সক্রিয় মেম্বার</span>
              </div>
              <div className="h-10 w-[1px] bg-emerald-800/50"></div>
              <div className="flex flex-col items-center lg:items-start">
                 <span className="text-3xl md:text-4xl font-black text-white drop-shadow-sm">১০০%</span>
                 <span className="text-[10px] md:text-xs text-emerald-300/80 uppercase tracking-widest font-bold mt-1">হালাল বিনিয়োগ</span>
              </div>
            </div>

          </div>

          {/* --- RIGHT SIDE: IMAGE (Clean & Simple) --- */}
          <div className="w-full lg:w-1/2 relative max-w-lg mx-auto lg:max-w-none">
            {/* Image Container */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-emerald-950/50 border border-white/10 group">
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
              
              <img 
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1000&auto=format&fit=crop" 
                alt="Happy Member" 
                className="w-full aspect-[4/3] lg:aspect-square object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" 
              />

              {/* Floating Glass Card */}
              <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-5 rounded-2xl flex items-center gap-4 transform transition-transform duration-500 group-hover:-translate-y-2 hover:bg-white/15">
                <div className="bg-amber-400 p-3 rounded-full text-emerald-950 shadow-lg">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-white font-extrabold text-sm md:text-lg drop-shadow-md">৫০০+ ফ্যামিলি</p>
                  <p className="text-emerald-100/90 text-xs md:text-sm font-medium">আমাদের সেবার আওতায়</p>
                </div>
                <div className="ml-auto bg-emerald-500/80 backdrop-blur-sm text-white text-[10px] md:text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1 shadow-sm border border-emerald-400/30">
                  <ShieldCheck size={14} /> ভেরিফাইড
                </div>
              </div>
            </div>

            {/* Background Blob behind image */}
            <div className="absolute -inset-6 bg-emerald-500/20 rounded-full blur-3xl -z-10 animate-pulse duration-1000"></div>
          </div>
          
        </div>
      </div>

      {/* --- BOTTOM CURVE --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg className="relative block w-full h-[60px] md:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48V0h1200v120z" className="fill-slate-50"></path>
        </svg>
      </div>
    </header>
  );
}