'use client';

import React from 'react';
import Link from "next/link";
import { Trophy, Gift, Ticket, ArrowRight, Crown, Sparkles } from "lucide-react";

export default function Rewards() {
  const rewards =[
    {
      id: 1,
      title: "শ্রেষ্ঠ মেম্বার পুরস্কার",
      engTitle: "Best Member Award",
      slug: "best-member",
      icon: <Crown size={28} />,
      slogan: "নিয়মিত সঞ্চয়ে সেরা উপহার।",
      desc: "বছরে একটি কিস্তিও মিস না করলে বছর শেষে ডিনার সেট, ফ্যান বা আকর্ষণীয় গৃহস্থালি উপহার।",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      hoverBorder: "hover:border-amber-300",
      hoverShadow: "hover:shadow-amber-100"
    },
    {
      id: 2,
      title: "বাম্পার লটারি",
      engTitle: "Bumper Lottery",
      slug: "lottery",
      icon: <Ticket size={28} />,
      slogan: "ভাগ্য বদলের এক অনন্য সুযোগ।",
      desc: "প্রতি ৬ মাসে একবার মেম্বারদের নিয়ে লটারির আয়োজন। ১ম পুরস্কার বাইসাইকেল বা সেলাই মেশিন।",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      hoverBorder: "hover:border-emerald-300",
      hoverShadow: "hover:shadow-emerald-100"
    },
    {
      id: 3,
      title: "ঈদ ও উৎসব বোনাস",
      engTitle: "Festival Bonus",
      slug: "festival-bonus",
      icon: <Gift size={28} />,
      slogan: "উৎসবে আনন্দে সবার সাথে।",
      desc: "দীর্ঘমেয়াদী মেম্বারদের জন্য ঈদ এবং পূজায় বিশেষ খাদ্য সামগ্রী ও গিফট ভাউচার উপহার।",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      hoverBorder: "hover:border-purple-300",
      hoverShadow: "hover:shadow-purple-100"
    }
  ];

  return (
    <section id="rewards" className="py-20 relative bg-white overflow-hidden">
      
      {/* --- Background Decorations --- */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-60"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* --- Section Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-slate-600 text-xs md:text-sm font-bold mb-4 border border-slate-200 shadow-sm">
            <Trophy size={14} className="text-amber-500" />
            <span className="uppercase tracking-wider">স্বীকৃতি ও সম্মাননা</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            মেম্বারদের জন্য বিশেষ <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-emerald-600">
              রিওয়ার্ড ও উপহার
            </span>
          </h2>
          
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            আপনার নিয়মিত সঞ্চয় এবং লেনদেনের ভিত্তিতে আমরা দিচ্ছি আকর্ষণীয় পুরস্কার। আমানত ফাউন্ডেশনের সাথে থাকার আনন্দ উপভোগ করুন।
          </p>
        </div>

        {/* --- Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {rewards.map((item) => (
            <Link href={`/rewards/${item.slug}`} key={item.id} className="group block h-full outline-none">
              <div 
                className={`
                  relative h-full bg-white p-6 rounded-3xl 
                  border border-slate-100 shadow-sm hover:shadow-xl ${item.hoverShadow}
                  transition-all duration-300 hover:-translate-y-2
                  ${item.hoverBorder}
                  flex flex-col items-center text-center overflow-hidden
                `}
              >
                {/* Decorative Blob */}
                <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-20 transition-all group-hover:scale-150 ${item.iconBg}`}></div>

                {/* Icon */}
                <div className={`relative z-10 w-16 h-16 rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-sm border border-white/50`}>
                  {item.icon}
                </div>

                {/* English Badge */}
                <span className={`text-[10px] font-bold uppercase tracking-wider mb-2 px-2 py-0.5 rounded-md bg-slate-50 text-slate-500`}>
                   {item.engTitle}
                </span>

                {/* Title */}
                <h3 className="relative z-10 text-xl font-extrabold text-slate-800 mb-2 group-hover:text-slate-900 leading-tight">
                  {item.title}
                </h3>

                {/* Slogan */}
                <p className={`text-xs font-bold mb-3 italic ${item.iconColor} opacity-90`}>
                  "{item.slogan}"
                </p>

                {/* Description */}
                <p className="relative z-10 text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                  {item.desc}
                </p>

                {/* Action Link */}
                <div className={`relative z-10 mt-auto inline-flex items-center justify-center gap-2 text-xs font-bold transition-all ${item.iconColor} group-hover:gap-3 bg-slate-50 px-4 py-2 rounded-full group-hover:bg-white group-hover:shadow-sm`}>
                  বিস্তারিত দেখুন <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* --- Bottom Disclaimer / CTA --- */}
        <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 text-slate-600 bg-slate-50 px-6 py-3 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <Sparkles size={18} className="text-amber-500 animate-pulse" />
                <span className="text-sm font-bold">শর্তাবলী প্রযোজ্য। পুরস্কারের ধরন পরিবর্তন হতে পারে।</span>
            </div>
        </div>

      </div>
    </section>
  );
}