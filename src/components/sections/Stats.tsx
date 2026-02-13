'use client';

import React from 'react';
import { Users, MapPin, TrendingUp, ShieldCheck } from "lucide-react";

export default function Stats() {
  const statsData = [
    {
      id: 1,
      label: "সক্রিয় মেম্বার",
      value: "৫০০+",
      icon: <Users size={28} />,
      color: "emerald", // Green
      borderColor: "border-emerald-500"
    },
    {
      id: 2,
      label: "জেলায় সেবা কার্যক্রম",
      value: "০১",
      icon: <MapPin size={28} />,
      color: "amber", // Yellow/Amber
      borderColor: "border-amber-500"
    },
    {
      id: 3,
      label: "সফল উদ্যোক্তা",
      value: "৯০%",
      icon: <TrendingUp size={28} />,
      color: "blue", // Blue
      borderColor: "border-blue-500"
    }
  ];

  return (
    <section className="relative z-30 container mx-auto px-4 lg:px-8 -mt-12 md:-mt-20 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData.map((stat) => (
          <div 
            key={stat.id}
            className={`
              bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-200/50 
              border-b-4 ${stat.borderColor} 
              flex flex-col items-center text-center
              transform transition-all duration-300 hover:-translate-y-2
            `}
          >
            {/* Icon Circle */}
            <div className={`
              w-14 h-14 rounded-full flex items-center justify-center mb-4
              bg-${stat.color}-50 text-${stat.color}-600
            `}>
              {stat.icon}
            </div>

            {/* Value */}
            <h3 className="text-3xl md:text-4xl font-black text-slate-800 mb-1 tracking-tight">
              {stat.value}
            </h3>

            {/* Label */}
            <div className="flex items-center gap-2">
               <span className="text-slate-500 text-xs md:text-sm font-bold uppercase tracking-widest">
                {stat.label}
              </span>
              {stat.id === 3 && (
                <ShieldCheck size={14} className="text-emerald-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}