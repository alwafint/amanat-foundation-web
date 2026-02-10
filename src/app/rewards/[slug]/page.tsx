'use client';

import React, { use } from 'react';
import Link from "next/link";
import { ArrowLeft, Gift, Star, Clock, Trophy, CheckCircle, HelpCircle } from "lucide-react";
// ৩ ধাপ পেছনে রিলেটিভ ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

// রিওয়ার্ড ডাটাবেজ
const rewardsData: any = {
  "best-member": {
    title: "শ্রেষ্ঠ মেম্বার পুরস্কার",
    subtitle: "সততা ও নিয়মমানুবর্তিতার সেরা স্বীকৃতি",
    description: "আমানত ফাউন্ডেশন বিশ্বাস করে, যারা নিয়ম মেনে সঞ্চয় করেন এবং কিস্তি পরিশোধ করেন, তারা সমাজের মডেল। তাই তাদের উৎসাহিত করতে আমরা প্রতি বছর 'শ্রেষ্ঠ মেম্বার' পুরস্কার প্রদান করি।",
    gradient: "from-yellow-600 to-yellow-400",
    icon: <Trophy size={64} className="text-yellow-100" />,
    criteria: [
      "সারা বছরে ১টিও মাসিক সঞ্চয় মিস করা যাবে না",
      "গৃহীত লোনের কিস্তি নির্দিষ্ট তারিখে পরিশোধ করতে হবে",
      "মিটিং বা সাধারণ সভায় উপস্থিত থাকতে হবে",
      "অন্য মেম্বারদের সাথে সুসম্পর্ক বজায় রাখতে হবে"
    ],
    prizes: [
      "৩২ পিসের ডিনার সেট",
      "সিলিং ফ্যান বা রাইস কুকার",
      "শ্রেষ্ঠ মেম্বার ক্রেস্ট ও সনদ",
      "পরবর্তী লোনে প্রসেসিং ফি মওকুফ"
    ]
  },
  "lottery": {
    title: "বাম্পার লটারি",
    subtitle: "ভাগ্যের চাকা ঘুরুক আমানতের সাথে",
    description: "মেম্বারদের মাঝে আনন্দ ছড়িয়ে দিতে এবং সঞ্চয়ে আগ্রহী করতে আমরা প্রতি ৬ মাস অন্তর ধামাকা লটারির আয়োজন করি। এখানে প্রতিটি সক্রিয় মেম্বার স্বয়ংক্রিয়ভাবে অংশগ্রহণ করতে পারেন।",
    gradient: "from-emerald-700 to-emerald-500",
    icon: <Star size={64} className="text-emerald-100" />,
    criteria: [
      "লটারির দিন পর্যন্ত একাউন্ট সক্রিয় থাকতে হবে",
      "ন্যূনতম ৬ মাসের সঞ্চয় জমা থাকতে হবে",
      "কোনো বকেয়া লোন থাকা যাবে না"
    ],
    prizes: [
      "১ম পুরস্কার: বাইসাইকেল",
      "২য় পুরস্কার: সেলাই মেশিন",
      "৩য় পুরস্কার: স্মার্টফোন",
      "৪র্থ-১০ম পুরস্কার: আকর্ষণীয় গৃহস্থালি সামগ্রী"
    ]
  },
  "festival-bonus": {
    title: "ঈদ ও উৎসব বোনাস",
    subtitle: "উৎসবের আনন্দ সবার ঘরে ঘরে",
    description: "ঈদ বা পূজা মানেই বাড়তি খরচ। আমাদের দীর্ঘমেয়াদী মেম্বারদের উৎসবের আনন্দ বাড়িয়ে দিতে আমরা বিশেষ বোনাস বা উপহার সামগ্রী প্রদান করি।",
    gradient: "from-blue-700 to-blue-500",
    icon: <Gift size={64} className="text-blue-100" />,
    criteria: [
      "ন্যূনতম ১ বছর মেম্বারশিপ থাকতে হবে",
      "নিয়মিত সঞ্চয়কারী হতে হবে",
      "উৎসবের ১ মাস আগে তালিকা প্রকাশ করা হয়"
    ],
    prizes: [
      "সেমাই, চিনি ও তেলের ফ্যামিলি প্যাক",
      "পোলাও চাল ও মসলা",
      "শাড়ি বা লুঙ্গি (সিনিয়র মেম্বারদের জন্য)",
      "বাচ্চাদের জন্য শিক্ষা উপকরণ"
    ]
  }
};

export default function RewardDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const reward = rewardsData[slug];

  if (!reward) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-slate-800">তথ্য পাওয়া যায়নি</h1>
        <Link href="/" className="text-emerald-600 underline mt-4">হোম পেজে ফিরে যান</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Hero Header */}
      <div className={`relative bg-gradient-to-r ${reward.gradient} text-white py-20`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <Link href="/#rewards" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition bg-white/10 px-4 py-2 rounded-full text-sm">
              <ArrowLeft size={16} /> পুরস্কার তালিকায় ফিরে যান
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{reward.title}</h1>
            <p className="text-xl text-white/90">{reward.subtitle}</p>
          </div>
          <div className="hidden md:block opacity-80 rotate-12">
            {reward.icon}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">পুরস্কার সম্পর্কে</h2>
              <p className="text-slate-600 text-lg leading-relaxed bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                {reward.description}
              </p>
            </div>

            {/* Criteria List */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
                <CheckCircle className="text-emerald-600" /> পাওয়ার শর্তাবলী
              </h3>
              <ul className="space-y-3">
                {reward.criteria.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-slate-700 font-medium">
                    <span className="w-2 h-2 mt-2 bg-emerald-500 rounded-full flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar (Prizes) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-yellow-500 sticky top-24">
              <div className="flex items-center gap-3 mb-6 border-b pb-4">
                <Gift className="text-yellow-500" size={28} />
                <h3 className="text-xl font-bold text-slate-800">সম্ভাব্য পুরস্কারসমূহ</h3>
              </div>
              
              <ul className="space-y-4">
                {reward.prizes.map((prize: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-600">
                    <Star size={18} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{prize}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 bg-slate-50 p-4 rounded-lg text-center">
                 <h4 className="text-sm font-bold text-slate-500 mb-2 flex justify-center gap-2">
                   <HelpCircle size={16}/> প্রশ্ন আছে?
                 </h4>
                 <p className="text-xs text-slate-400 mb-4">আরও বিস্তারিত জানতে অফিসে যোগাযোগ করুন</p>
                 <Link href="/contact" className="text-emerald-700 font-bold text-sm hover:underline">
                   যোগাযোগ করুন
                 </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <SiteFooter />
    </div>
  );
}