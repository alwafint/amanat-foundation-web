'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, Target, Users, ArrowRight } from "lucide-react";

export default function About() {
  const features =[
    { 
      text: "সম্পূর্ণ সুদমুক্ত ও শরিয়াহ ভিত্তিক বিনিয়োগ", 
      iconColor: "text-emerald-600", 
      iconBg: "bg-emerald-100", 
      hoverBorder: "hover:border-emerald-300" 
    },
    { 
      text: "স্বচ্ছ হিসাব ও সেন্ট্রাল ডিজিটাল ড্যাশবোর্ড", 
      iconColor: "text-blue-600", 
      iconBg: "bg-blue-100", 
      hoverBorder: "hover:border-blue-300" 
    },
    { 
      text: "বিপদে আপদে ২৪ ঘণ্টা পাশে থাকার অঙ্গীকার", 
      iconColor: "text-amber-600", 
      iconBg: "bg-amber-100", 
      hoverBorder: "hover:border-amber-300" 
    },
    { 
      text: "দেশজুড়ে বিস্তৃত সেবার শক্তিশালী নেটওয়ার্ক", 
      iconColor: "text-purple-600", 
      iconBg: "bg-purple-100", 
      hoverBorder: "hover:border-purple-300" 
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden bg-slate-50">
      
      {/* --- Decorative Background Blobs --- */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 opacity-60 pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* --- LEFT SIDE: IMAGE CARD --- */}
          <div className="w-full lg:w-1/2 relative group max-w-lg mx-auto lg:max-w-none">
            {/* Background Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-[2rem] rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500"></div>
            
            {/* Main Image Container */}
            <div className="relative bg-white p-2.5 rounded-[2rem] shadow-2xl overflow-hidden aspect-[4/3] lg:aspect-[4/5] xl:h-[550px]">
              <div 
                className="w-full h-full rounded-[1.5rem] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=1000&auto=format&fit=crop')" }}
              >
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent flex flex-col justify-end p-6 md:p-8 text-white transition-opacity duration-300">
                  <div className="flex items-center gap-3 mb-2 transform transition-transform group-hover:-translate-y-1">
                    <div className="p-2.5 bg-amber-400 rounded-xl text-slate-900 shadow-lg">
                      <ShieldCheck size={24} />
                    </div>
                    <span className="font-bold text-amber-400 tracking-widest text-[10px] md:text-xs uppercase">বিশ্বাস ও আস্থার অপর নাম</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black mb-1 drop-shadow-md">আমানত ফাউন্ডেশন</h3>
                  <p className="text-emerald-50/80 text-sm md:text-base font-medium">আপনার আমানত, আমাদের দায়িত্ব।</p>
                </div>
              </div>
            </div>
            
            {/* Floating Badge (Updated count to match Hero/Stats) */}
            <div className="absolute -bottom-6 -right-6 md:-right-8 bg-white/95 backdrop-blur-md p-4 md:p-5 rounded-3xl shadow-xl flex items-center gap-4 border border-white/50 animate-[bounce_3s_infinite] hidden md:flex">
              <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600 shadow-sm border border-emerald-50">
                <Users size={28} />
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-extrabold uppercase tracking-widest">সদস্য পরিবার</p>
                <p className="text-slate-800 text-2xl font-black drop-shadow-sm">৫০০+</p>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: CONTENT --- */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              {/* Section Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-slate-600 text-xs md:text-sm font-bold mb-6 border border-slate-200 shadow-sm">
                <Target size={14} className="text-amber-500" />
                <span className="uppercase tracking-wider">আমাদের লক্ষ্য ও উদ্দেশ্য</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.2] mb-6">
                কেন বেছে নেবেন <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                  আমানত ফাউন্ডেশন?
                </span>
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                আমরা দেশের প্রতিটি অবহেলিত পরিবারের মুখে হাসি ফোটানোর লক্ষ্যে কাজ করছি। আপনাদের গচ্ছিত প্রতিটি টাকা আমাদের কাছে পবিত্র আমানত, যা দেশের উন্নয়নে বিনিয়োগ হয়।
              </p>
            </div>

            {/* Feature List */}
            <div className="grid gap-4">
              {features.map((item, i) => (
                <div 
                  key={i} 
                  className={`group flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-lg ${item.hoverBorder} hover:-translate-x-1 cursor-default`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.iconBg} ${item.iconColor} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="text-slate-700 font-bold text-sm md:text-base group-hover:text-slate-900 transition-colors">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-300 active:scale-95 group">
                আমাদের সম্পর্কে আরও জানুন <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
              </button>
            </div>
          </div>
        
        </div>
      </div>
    </section>
  );
}