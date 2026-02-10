'use client';

import React from 'react';
import Link from "next/link";
import { Trophy, Bike, Gift, ArrowRight } from "lucide-react";

// ডাটা টাইপ
interface RewardItem {
  title: string;
  slug: string; // URL এর জন্য
  icon: React.ReactNode;
  desc: string;
  badge: string;
  badgeColor: string;
  borderColor: string;
  iconColor: string;
}

export default function Rewards() {
  const rewardItems: RewardItem[] = [
    {
      title: "শ্রেষ্ঠ মেম্বার পুরস্কার",
      slug: "best-member",
      icon: <Trophy className="w-16 h-16 text-yellow-500 mb-6 group-hover:scale-110 transition-transform" />,
      desc: "বছরে একটি কিস্তিও মিস না করলে বছর শেষে ডিনার সেট, ফ্যান বা আকর্ষণীয় গৃহস্থালি উপহার।",
      badge: "PREMIUM",
      badgeColor: "bg-yellow-400 text-emerald-900",
      borderColor: "border-yellow-200",
      iconColor: "text-yellow-500"
    },
    {
      title: "বাম্পার লটারি",
      slug: "lottery",
      icon: <Bike className="w-16 h-16 text-emerald-600 mb-6 group-hover:scale-110 transition-transform" />,
      desc: "প্রতি ৬ মাসে একবার মেম্বারদের নিয়ে লটারির আয়োজন। ১ম পুরস্কার বাইসাইকেল বা সেলাই মেশিন।",
      badge: "LUCKY DRAW",
      badgeColor: "bg-emerald-500 text-white",
      borderColor: "border-emerald-200",
      iconColor: "text-emerald-600"
    },
    {
      title: "ঈদ ও উৎসব বোনাস",
      slug: "festival-bonus",
      icon: <Gift className="w-16 h-16 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />,
      desc: "দীর্ঘমেয়াদী মেম্বারদের জন্য ঈদ এবং পূজায় বিশেষ খাদ্য সামগ্রী ও গিফট ভাউচার উপহার।",
      badge: "BONUS",
      badgeColor: "bg-blue-500 text-white",
      borderColor: "border-blue-200",
      iconColor: "text-blue-500"
    }
  ];

  return (
    <section id="rewards" className="py-20 relative overflow-hidden bg-gradient-to-r from-yellow-50 to-orange-50">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-200 rounded-full blur-3xl opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide mb-3 inline-block shadow-sm">
            আকর্ষণীয় উপহার
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            মেম্বারদের জন্য রিওয়ার্ড ও স্বীকৃতি
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-lg">
            নিয়মিত সঞ্চয় এবং লেনদেনের ভিত্তিতে আমরা দিচ্ছি বিশেষ পুরস্কার এবং সম্মাননা।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rewardItems.map((item, index) => (
            <Link key={index} href={`/rewards/${item.slug}`} className="block h-full">
              <div className={`bg-white p-8 rounded-2xl shadow-xl border ${item.borderColor} relative overflow-hidden group h-full hover:-translate-y-2 transition-transform duration-300`}>
                
                {/* Badge */}
                <div className={`absolute top-0 right-0 ${item.badgeColor} text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-sm z-10`}>
                  {item.badge}
                </div>

                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  {item.icon}
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {item.desc}
                  </p>
                  
                  <div className="mt-auto text-emerald-700 font-bold text-sm uppercase tracking-wider flex items-center gap-2 group-hover:underline">
                    কীভাবে পাবেন? <ArrowRight size={16} />
                  </div>
                </div>

                {/* Hover Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}