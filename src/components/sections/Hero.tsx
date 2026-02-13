'use client';

import React from 'react';
import Link from "next/link";
import { ArrowRight, Users, CheckCircle2, Star } from "lucide-react";

export default function Hero() {
  return (
    <header className="relative bg-emerald-950 min-h-[85vh] flex items-center overflow-hidden pt-24 pb-16 lg:pt-0 lg:pb-0">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      {/* Soft Glow Top Right */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
      {/* Soft Glow Bottom Left */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-yellow-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
      {/* Pattern Grid */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-5"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
          
          {/* --- LEFT SIDE: TEXT CONTENT --- */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 md:space-y-8">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-emerald-900/50 border border-emerald-700/50 backdrop-blur-md shadow-sm mx-auto lg:mx-0">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-emerald-100 text-xs md:text-sm font-medium tracking-wide">বিশ্বাস ও আস্থার প্রতীক</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              আপনার ক্ষুদ্র সঞ্চয়, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">
                গড়বে বড় স্বপ্ন
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
              আমানত ফাউন্ডেশন-এর সাথে যুক্ত হয়ে নিজের ও পরিবারের ভবিষ্যৎ সুনিশ্চিত করুন। কৃষি, শিক্ষা ও স্বাস্থ্যের উন্নয়নে আমরা আছি আপনার পাশে।
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link 
                href="/register" 
                className="w-full sm:w-auto px-8 py-3.5 bg-yellow-500 text-emerald-950 rounded-xl font-bold hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2"
              >
                মেম্বার হোন <ArrowRight size={18} />
              </Link>
              <Link 
                href="#contact" 
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-900/40 border border-emerald-700 text-emerald-100 rounded-xl font-medium hover:bg-emerald-800/60 transition flex items-center justify-center"
              >
                যোগাযোগ করুন
              </Link>
            </div>

            {/* Stats (Mobile Optimized) */}
            <div className="pt-4 border-t border-emerald-800/50 flex items-center justify-center lg:justify-start gap-8">
              <div className="flex flex-col items-center lg:items-start">
                 <span className="text-2xl md:text-3xl font-bold text-white">৫০০+</span>
                 <span className="text-xs text-emerald-300 uppercase tracking-wider">সক্রিয় মেম্বার</span>
              </div>
              <div className="h-8 w-[1px] bg-emerald-800"></div>
              <div className="flex flex-col items-center lg:items-start">
                 <span className="text-2xl md:text-3xl font-bold text-white">১০০%</span>
                 <span className="text-xs text-emerald-300 uppercase tracking-wider">হালাল বিনিয়োগ</span>
              </div>
            </div>

          </div>

          {/* --- RIGHT SIDE: IMAGE (Clean & Simple) --- */}
          <div className="w-full lg:w-1/2 relative">
            {/* Image Container */}
            <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 group">
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent z-10"></div>
              
              <img 
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1000&auto=format&fit=crop" 
                alt="Happy Member" 
                className="w-full aspect-[4/3] lg:aspect-square object-cover transform group-hover:scale-105 transition-transform duration-700" 
              />

              {/* Floating Glass Card */}
              <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center gap-4">
                <div className="bg-yellow-500 p-2.5 rounded-full text-emerald-900 shadow-lg">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm md:text-base">৫০০+ ফ্যামিলি</p>
                  <p className="text-emerald-200 text-xs">আমাদের সেবার আওতায়</p>
                </div>
                <div className="ml-auto bg-emerald-600 text-white text-[10px] md:text-xs px-2 py-1 rounded-full font-bold">
                  ভেরিফাইড
                </div>
              </div>
            </div>

            {/* Background Blob behind image */}
            <div className="absolute -inset-4 bg-emerald-500/20 rounded-full blur-2xl -z-10 animate-pulse"></div>
          </div>
          
        </div>
      </div>

      {/* --- BOTTOM CURVE --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg className="relative block w-full h-[40px] md:h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48V0h1200v120z" className="fill-slate-50"></path>
        </svg>
      </div>
    </header>
  );
}