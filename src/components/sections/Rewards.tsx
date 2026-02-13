'use client';

import React from 'react';
import Link from "next/link";
import { Trophy, Gift, Ticket, ArrowRight, Star, Crown, Sparkles } from "lucide-react";

export default function Rewards() {
  const rewards = [
    {
      id: 1,
      title: "শ্রেষ্ঠ মেম্বার পুরস্কার",
      slug: "best-member",
      icon: <Crown size={32} />,
      desc: "বছরে একটি কিস্তিও মিস না করলে বছর শেষে ডিনার সেট, ফ্যান বা আকর্ষণীয় গৃহস্থালি উপহার।",
      bgClass: "bg-yellow-50",
      iconColor: "text-yellow-600",
      iconBg: "bg-yellow-100",
      badge: "PREMIUM",
      borderColor: "group-hover:border-yellow-300"
    },
    {
      id: 2,
      title: "বাম্পার লটারি",
      slug: "lottery",
      icon: <Ticket size={32} />,
      desc: "প্রতি ৬ মাসে একবার মেম্বারদের নিয়ে লটারির আয়োজন। ১ম পুরস্কার বাইসাইকেল বা সেলাই মেশিন।",
      bgClass: "bg-emerald-50",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-100",
      badge: "LUCKY DRAW",
      borderColor: "group-hover:border-emerald-300"
    },
    {
      id: 3,
      title: "ঈদ ও উৎসব বোনাস",
      slug: "festival-bonus",
      icon: <Gift size={32} />,
      desc: "দীর্ঘমেয়াদী মেম্বারদের জন্য ঈদ এবং পূজায় বিশেষ খাদ্য সামগ্রী ও গিফট ভাউচার উপহার।",
      bgClass: "bg-purple-50",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      badge: "BONUS",
      borderColor: "group-hover:border-purple-300"
    }
  ];

  return (
    <section id="rewards" className="py-20 relative overflow-hidden bg-slate-50">
      
      {/* --- Background Decorations --- */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* --- Header Section --- */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold mb-4 border border-emerald-200 shadow-sm">
            <Trophy size={16} className="text-yellow-500" />
            <span>স্বীকৃতি ও সম্মাননা</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            মেম্বারদের জন্য বিশেষ <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              রিওয়ার্ড ও উপহার
            </span>
          </h2>
          <p className="text-slate-600 text-lg">
            আপনার নিয়মিত সঞ্চয় এবং লেনদেনের ভিত্তিতে আমরা দিচ্ছি আকর্ষণীয় পুরস্কার। আমানত ফাউন্ডেশনের সাথে থাকার আনন্দ উপভোগ করুন।
          </p>
        </div>

        {/* --- Rewards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rewards.map((item) => (
            <Link key={item.id} href={`/rewards/${item.slug}`} className="group h-full outline-none">
              <div className={`relative h-full bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${item.borderColor} flex flex-col items-center text-center overflow-hidden`}>
                
                {/* Top Badge */}
                <div className="absolute top-4 right-4">
                   <span className={`text-[10px] font-bold px-2 py-1 rounded border ${item.bgClass.replace('bg-', 'border-').replace('50', '200')} text-slate-500 tracking-wider`}>
                     {item.badge}
                   </span>
                </div>

                {/* Decorative Blob inside Card */}
                <div className={`absolute -top-10 -left-10 w-32 h-32 rounded-full opacity-50 transition-all group-hover:scale-150 ${item.bgClass}`}></div>

                {/* Icon */}
                <div className={`relative z-10 w-20 h-20 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                     <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full w-full">
                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 mb-8 leading-relaxed text-sm flex-grow">
                      {item.desc}
                    </p>
                    
                    {/* Button-like Link */}
                    <div className="mt-auto w-full pt-6 border-t border-slate-100 group-hover:border-slate-200 transition-colors">
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 group-hover:text-emerald-600 transition-colors">
                           বিস্তারিত দেখুন <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* --- Bottom CTA --- */}
        <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 text-slate-500 bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200">
                <Sparkles size={18} className="text-yellow-500" />
                <span className="text-sm font-medium">শর্তাবলী প্রযোজ্য। পুরস্কারের ধরন পরিবর্তন হতে পারে।</span>
            </div>
        </div>

      </div>
    </section>
  );
}