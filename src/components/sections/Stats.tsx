'use client';

import React from 'react';
import { Users, MapPin, TrendingUp, ShieldCheck } from "lucide-react";

export default function Stats() {
  const statsData =[
    {
      id: 1,
      label: "সক্রিয় মেম্বার",
      engTitle: "Active Members",
      value: "৫০০+",
      slogan: "বিশ্বস্ততার এক অনন্য পরিবার।",
      icon: <Users size={28} />,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      hoverBorder: "hover:border-emerald-300",
      hoverShadow: "hover:shadow-emerald-100",
      blobBg: "bg-emerald-50"
    },
    {
      id: 2,
      label: "জেলায় সেবা কার্যক্রম",
      engTitle: "Service Area",
      value: "০১ টি",
      slogan: "ধীরে ধীরে দেশজুড়ে বিস্তার।",
      icon: <MapPin size={28} />,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      hoverBorder: "hover:border-amber-300",
      hoverShadow: "hover:shadow-amber-100",
      blobBg: "bg-amber-50"
    },
    {
      id: 3,
      label: "সফল উদ্যোক্তা",
      engTitle: "Success Rate",
      value: "৯০%",
      slogan: "স্বাবলম্বী হওয়ার পথে এগিয়ে।",
      icon: <TrendingUp size={28} />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      hoverBorder: "hover:border-blue-300",
      hoverShadow: "hover:shadow-blue-100",
      blobBg: "bg-blue-50"
    }
  ];

  return (
    <section className="relative z-30 container mx-auto px-4 lg:px-8 -mt-12 md:-mt-20 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {statsData.map((stat) => (
          <div 
            key={stat.id}
            className={`
              group relative bg-white p-6 md:p-8 rounded-3xl 
              border border-slate-100 shadow-lg hover:shadow-2xl ${stat.hoverShadow}
              transition-all duration-300 hover:-translate-y-2
              ${stat.hoverBorder}
              flex flex-col items-center text-center overflow-hidden
            `}
          >
            {/* Decorative Blob */}
            <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-40 transition-all duration-500 group-hover:scale-150 ${stat.blobBg}`}></div>

            {/* Icon */}
            <div className={`relative z-10 w-16 h-16 rounded-2xl ${stat.iconBg} ${stat.iconColor} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-sm border border-white/50`}>
              {stat.icon}
            </div>

            {/* English Badge */}
            <span className={`text-[10px] font-bold uppercase tracking-wider mb-3 px-2 py-0.5 rounded-md bg-slate-50 text-slate-500`}>
                {stat.engTitle}
            </span>

            {/* Value */}
            <h3 className="relative z-10 text-4xl md:text-5xl font-black text-slate-800 mb-2 tracking-tight group-hover:text-slate-900 transition-colors drop-shadow-sm">
              {stat.value}
            </h3>

            {/* Label Container */}
            <div className="relative z-10 flex items-center justify-center gap-1.5 mb-2">
               <span className="text-slate-700 text-sm md:text-base font-extrabold tracking-wide">
                {stat.label}
              </span>
              {stat.id === 3 && (
                <ShieldCheck size={18} className="text-emerald-500" />
              )}
            </div>

            {/* Slogan */}
            <p className={`relative z-10 text-xs font-bold italic ${stat.iconColor} opacity-90 mt-1`}>
                "{stat.slogan}"
            </p>

            {/* Subtle bottom highlight bar (replacing the old heavy border-b-4) */}
            <div className={`absolute bottom-0 left-0 w-full h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${stat.iconBg.replace('100', '400')}`}></div>
          </div>
        ))}
      </div>
    </section>
  );
}