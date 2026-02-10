'use client';

import React from 'react';
import Link from "next/link";
import { HandHeart, ArrowRight, Snowflake, GraduationCap, TreeDeciduous, HeartPulse } from "lucide-react";

// ডাটা টাইপ
interface SocialWorkItem {
  title: string;
  icon: React.ReactNode;
  desc: string;
  slug: string; // URL এর জন্য
  colorClass: string; // আইকনের কালার
}

export default function SocialWork() {
  
  // সমাজসেবা ডাটা লিস্ট
  const workItems: SocialWorkItem[] = [
    {
      title: "শীতবস্ত্র ও ত্রাণ বিতরণ",
      slug: "winter-relief",
      icon: <Snowflake className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />,
      desc: "প্রতি বছর শীতে এবং দুর্যোগকালীন সময়ে অসহায় মানুষের পাশে দাঁড়ানো।",
      colorClass: "border-blue-200"
    },
    {
      title: "শিক্ষা বৃত্তি প্রদান",
      slug: "scholarship",
      icon: <GraduationCap className="w-12 h-12 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />,
      desc: "দরিদ্র মেধাবী শিক্ষার্থীদের জন্য মাসিক বৃত্তি ও শিক্ষা উপকরণ প্রদান।",
      colorClass: "border-emerald-200"
    },
    {
      title: "বৃক্ষরোপণ কর্মসূচি",
      slug: "tree-plantation",
      icon: <TreeDeciduous className="w-12 h-12 text-green-600 mb-4 group-hover:scale-110 transition-transform" />,
      desc: "সবুজ বাংলাদেশ গড়তে মেম্বারদের মাঝে প্রতি বছর বিনামূল্যে চারা বিতরণ।",
      colorClass: "border-green-200"
    },
    {
      title: "বিনামূল্যে চক্ষু শিবির",
      slug: "eye-camp",
      icon: <HeartPulse className="w-12 h-12 text-red-500 mb-4 group-hover:scale-110 transition-transform" />,
      desc: "ছানি অপারেশন ও গরিব রোগীদের বিনামূল্যে চশমা বিতরণ ক্যাম্প।",
      colorClass: "border-red-200"
    }
  ];

  return (
    <section id="social-work" className="py-20 bg-slate-100">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
              <HandHeart className="text-emerald-600" /> সমাজসেবা কার্যক্রম
            </h2>
            <p className="text-slate-600 max-w-xl">
              মেম্বারশিপের বাইরেও আমরা দেশের কল্যাণে নিবেদিত। আমাদের প্রতিটি উদ্যোগ মানুষের মুখে হাসি ফোটানোর জন্য।
            </p>
          </div>
          <Link href="/social-work" className="hidden md:flex text-emerald-700 font-bold hover:underline items-center gap-2">
            সব কার্যক্রম দেখুন <ArrowRight size={16} />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workItems.map((item, index) => (
            <Link key={index} href={`/social-work/${item.slug}`} className="block h-full">
              <div className={`bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 ${item.colorClass} h-full group hover:-translate-y-2 relative overflow-hidden`}>
                
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-4 -mt-4 z-0 group-hover:bg-emerald-50 transition-colors"></div>
                
                <div className="relative z-10">
                  {item.icon}
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 mt-auto">
                    বিস্তারিত <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View Link Button */}
        <div className="mt-8 text-center md:hidden">
            <Link href="/social-work" className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-full text-slate-700 font-bold shadow-sm">
                সব কার্যক্রম দেখুন <ArrowRight size={16} />
            </Link>
        </div>

      </div>
    </section>
  );
}