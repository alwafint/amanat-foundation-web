'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { 
  Wallet, Landmark, Calculator, Sprout, Store, Car, 
  Laptop, Home, Shirt, Milk, Fish, Hammer, 
  Smartphone, ShoppingBag, ArrowRight, CheckCircle, 
  HandCoins, Users 
} from "lucide-react";

// ৩ ধাপ পেছনে গিয়ে কম্পোনেন্ট ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function InvestmentPublicPage() {
  const [activeTab, setActiveTab] = useState('All');

  // --- ক্যাটাগরি ---
  const categories = ["All", "কৃষি ও খামার", "ক্ষুদ্র ব্যবসা", "যানবাহন", "প্রযুক্তি ও দক্ষতা", "গৃহ ও অন্যান্য"];

  // --- বিনিয়োগ আইটেম ডাটাবেজ (ড্যাশবোর্ডের মতো) ---
  const investmentItems = [
    // ১. কৃষি ও খামার
    { title: "হাঁস-মুরগি ও ছাগল পালন", category: "কৃষি ও খামার", icon: <Sprout/>, desc: "পারিবারিক পর্যায়ে পালনের জন্য স্বল্প পুঁজি বিনিয়োগ।" },
    { title: "দুগ্ধ খামার / গাভী পালন", category: "কৃষি ও খামার", icon: <Milk/>, desc: "উন্নত জাতের গাভী ক্রয় এবং লালন-পালনের সুবিধা।" },
    { title: "গরু মোটাতাজাকরণ", category: "কৃষি ও খামার", icon: <Sprout/>, desc: "কোরবানি ঈদ বা সিজনাল প্রজেক্টের জন্য গরু ক্রয়।" },
    { title: "মাছ চাষ প্রজেক্ট", category: "কৃষি ও খামার", icon: <Fish/>, desc: "পুকুর লিজ নেওয়া বা বায়োফ্লক মাছ চাষের সরঞ্জাম।" },
    
    // ২. ক্ষুদ্র ব্যবসা
    { title: "মুদি দোকান সম্প্রসারণ", category: "ক্ষুদ্র ব্যবসা", icon: <Store/>, desc: "দোকানে মাল তোলার জন্য পণ্য-ভিত্তিক পুঁজি সহায়তা।" },
    { title: "ফেরিওয়ালা বা হকার", category: "ক্ষুদ্র ব্যবসা", icon: <ShoppingBag/>, desc: "ভ্যানে বা পায়ে হেঁটে পণ্য বিক্রির মালামাল ক্রয়।" },
    { title: "মিনি গার্মেন্টস/সেলাই", category: "ক্ষুদ্র ব্যবসা", icon: <Shirt/>, desc: "নারীদের জন্য সেলাই মেশিন বা ছোট গার্মেন্টস মেশিনারি।" },
    
    // ৩. যানবাহন
    { title: "অটো ভ্যান বা রিক্সা", category: "যানবাহন", icon: <Car/>, desc: "পণ্য বা যাত্রী পরিবহনের জন্য নতুন ভ্যান বা রিক্সা।" },
    { title: "ইলেকট্রিক অটো/ইজি বাইক", category: "যানবাহন", icon: <Car/>, desc: "ব্যাটারি চালিত ইজি বাইক ক্রয়ের পূর্ণাঙ্গ সুবিধা।" },
    
    // ৪. প্রযুক্তি
    { title: "কম্পিউটার ও আইটি সেন্টার", category: "প্রযুক্তি ও দক্ষতা", icon: <Laptop/>, desc: "কম্পিউটার, প্রিন্টার ও ফটোকপি মেশিন ক্রয়।" },
    { title: "মোবাইল সার্ভিসিং ল্যাব", category: "প্রযুক্তি ও দক্ষতা", icon: <Smartphone/>, desc: "মোবাইল মেরামতের আধুনিক যন্ত্রপাতি ও হটগান।" },
    
    // ৫. গৃহ
    { title: "টিনের ঘর তৈরি", category: "গৃহ ও অন্যান্য", icon: <Home/>, desc: "বসতঘর নির্মাণ বা মেরামতের জন্য ঢেউটিন ও খুঁটি।" },
    { title: "স্যানিটেশন ও টিউবওয়েল", category: "গৃহ ও অন্যান্য", icon: <Hammer/>, desc: "স্বাস্থ্যসম্মত ল্যাট্রিন স্থাপন ও বিশুদ্ধ পানির টিউবওয়েল।" },
  ];

  // ফিল্টার লজিক
  const filteredItems = activeTab === 'All' 
    ? investmentItems 
    : investmentItems.filter(item => item.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-800 text-white py-24 md:py-32 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-slate-50 clip-path-slant"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-blue-700/50 border border-blue-500 text-blue-100 text-sm font-bold mb-6 backdrop-blur-md">
            💼 স্বাবলম্বী হওয়ার সুযোগ
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            বিনিয়োগ ও লোন সহায়তা
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-10">
            আমরা দিচ্ছি সহজ শর্তে এবং ইসলামি শরিয়াহ মোতাবেক পণ্য ভিত্তিক বিনিয়োগ। আপনার স্বপ্ন পূরণে আমরা আছি পাশে।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition shadow-lg flex items-center justify-center gap-2">
              মেম্বার হোন <ArrowRight size={20} />
            </Link>
            <Link href="/login" className="bg-blue-700 border border-blue-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition">
              লগইন করুন
            </Link>
          </div>
        </div>
      </div>

      {/* --- TABS & GRID SECTION --- */}
      <div className="container mx-auto px-4 py-16 -mt-20 relative z-20">
        
        {/* Tabs (Scrollable) */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar bg-white/90 p-2 rounded-full shadow-lg backdrop-blur-md max-w-full">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(cat)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeTab === cat 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 transition group hover:-translate-y-2 duration-300 flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition duration-300 shadow-inner">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-wide">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-800 mt-1 leading-tight group-hover:text-blue-700 transition">
                    {item.title}
                  </h3>
                </div>
              </div>
              
              <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed">
                {item.desc}
              </p>
              
              <Link href="/login" className="w-full bg-slate-50 text-slate-700 border border-slate-200 py-3 rounded-xl font-bold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition flex items-center justify-center gap-2 mt-auto">
                বিস্তারিত ও আবেদন <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* --- HOW IT WORKS (MURABAHA) --- */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">আমাদের বিনিয়োগ পদ্ধতি</h2>
            <p className="text-slate-500 mt-2">আমরা নগদ টাকা লোন দেই না, আমরা আপনাকে পণ্য কিনে দেই (মুরাবাহা)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-md text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-blue-200"></div>
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">১. আবেদন ও নির্বাচন</h3>
              <p className="text-slate-600 text-sm">
                প্রথমে মেম্বারশিপ নিন এবং আপনার প্রয়োজীয় পণ্যের (যেমন: ভ্যান, গরু, মেশিন) জন্য আবেদন করুন।
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-md text-center relative overflow-hidden group border-t-4 border-blue-500">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-blue-200"></div>
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-300">
                <HandCoins size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">২. পণ্য ক্রয়</h3>
              <p className="text-slate-600 text-sm">
                আমরা আপনার সাথে বাজারে গিয়ে পছন্দমতো পণ্যটি কিনে আপনার হাতে তুলে দেব। কোনো নগদ টাকা দেওয়া হবে না।
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-md text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-blue-200"></div>
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calculator size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">৩. সহজ কিস্তি</h3>
              <p className="text-slate-600 text-sm">
                পণ্যের দামের সাথে সামান্য লাভ যুক্ত করে সহজ সাপ্তাহিক বা মাসিক কিস্তিতে টাকা পরিশোধ করুন।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                আপনি কি উদ্যোক্তা হতে চান?
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
                বেকারত্ব ঘোচাতে এবং নিজের পায়ে দাঁড়াতে আমানত ফাউন্ডেশন আছে আপনার পাশে। আজই আমাদের অফিসে আসুন।
              </p>
              <Link href="/contact" className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-500 transition shadow-lg shadow-blue-900/50">
                যোগাযোগ করুন
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}