'use client';

import React from 'react';
import Link from "next/link";
import { 
  HandHeart, ArrowRight, Snowflake, GraduationCap, 
  TreeDeciduous, Baby, Heart 
} from "lucide-react";

export default function SocialWork() {
  
  const socialWorks = [
    {
      id: 1,
      title: "শীতবস্ত্র বিতরণ",
      slug: "winter-relief",
      icon: <Snowflake size={32} />,
      desc: "প্রতি বছর শীতে উত্তরবঙ্গসহ দেশের বিভিন্ন প্রান্তে অসহায় মানুষের মাঝে কম্বল ও শীতবস্ত্র বিতরণ।",
      theme: "sky", // Blue/Sky Theme
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600",
      hoverBorder: "hover:border-sky-300",
      hoverShadow: "hover:shadow-sky-100"
    },
    {
      id: 2,
      title: "শিক্ষা বৃত্তি",
      slug: "scholarship",
      icon: <GraduationCap size={32} />,
      desc: "দরিদ্র ও মেধাবী শিক্ষার্থীদের পড়াশোনা চালিয়ে নেওয়ার জন্য মাসিক বৃত্তি ও শিক্ষা উপকরণ প্রদান।",
      theme: "emerald", // Green Theme
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      hoverBorder: "hover:border-emerald-300",
      hoverShadow: "hover:shadow-emerald-100"
    },
    {
      id: 3,
      title: "বৃক্ষরোপণ কর্মসূচি",
      slug: "tree-plantation",
      icon: <TreeDeciduous size={32} />,
      desc: "সবুজ বাংলাদেশ গড়তে মেম্বারদের মাঝে প্রতি বছর ফলজ ও বনজ গাছের চারা বিনামূল্যে বিতরণ।",
      theme: "green", // Dark Green Theme
      iconBg: "bg-green-100",
      iconColor: "text-green-700",
      hoverBorder: "hover:border-green-300",
      hoverShadow: "hover:shadow-green-100"
    },
    {
      id: 4,
      title: "এতিমদের যত্ন",
      slug: "orphan-care",
      icon: <Baby size={32} />,
      desc: "বাবা-মা হারা এতিম শিশুদের ভরণপোষণ, চিকিৎসা এবং সুশিক্ষার সম্পূর্ণ দায়িত্ব গ্রহণ।",
      theme: "rose", // Pink/Rose Theme
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
      hoverBorder: "hover:border-rose-300",
      hoverShadow: "hover:shadow-rose-100"
    }
  ];

  return (
    <section id="social-work" className="py-20 relative bg-white overflow-hidden">
      
      {/* --- Background Decorations --- */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-60"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* --- Section Header (Centered) --- */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-slate-600 text-xs md:text-sm font-bold mb-4 border border-slate-200 shadow-sm">
            <HandHeart size={14} className="text-rose-500" />
            <span className="uppercase tracking-wider">সামাজিক দায়বদ্ধতা</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            মানুষের কল্যাণে <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
              আমাদের সমাজসেবা
            </span>
          </h2>
          
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            মেম্বারশিপের বাইরেও আমরা দেশের কল্যাণে নিবেদিত। আমাদের প্রতিটি উদ্যোগ মানুষের মুখে হাসি ফোটানোর জন্য।
          </p>
        </div>

        {/* --- Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialWorks.map((item) => (
            <Link href={`/social-work/${item.slug}`} key={item.id} className="group block h-full outline-none">
              <div 
                className={`
                  relative h-full bg-white p-6 rounded-2xl 
                  border border-slate-100 shadow-sm hover:shadow-xl ${item.hoverShadow}
                  transition-all duration-300 hover:-translate-y-2
                  ${item.hoverBorder}
                  flex flex-col items-center text-center
                `}
              >
                {/* Decorative Blob inside Card */}
                <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-30 transition-all group-hover:scale-150 ${item.iconBg}`}></div>

                {/* Icon (Centered) */}
                <div className={`relative z-10 w-16 h-16 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                  {item.desc}
                </p>

                {/* Action Link */}
                <div className={`relative z-10 mt-auto inline-flex items-center justify-center gap-2 text-sm font-bold transition-all ${item.iconColor} group-hover:gap-3`}>
                  বিস্তারিত <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* --- Bottom Call to Action --- */}
        <div className="mt-12 text-center">
          <Link href="/social-works" className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg hover:shadow-slate-300">
            <Heart size={18} className="text-rose-400 fill-rose-400" /> 
            সকল কার্যক্রম দেখুন
          </Link>
        </div>

      </div>
    </section>
  );
}