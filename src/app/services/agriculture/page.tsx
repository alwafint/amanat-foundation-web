'use client';

import React from 'react';
import Link from "next/link";
import { 
  Tractor, Wheat, Sprout, ShoppingCart, 
  ArrowRight, CheckCircle, PhoneCall, 
  Leaf, Droplets, Sun 
} from "lucide-react";

// সঠিক রিলেটিভ পাথ ব্যবহার করা হয়েছে
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function AgriculturePublicPage() {

  // কৃষি যন্ত্রপাতির তালিকা (ড্যাশবোর্ড থেকে নেওয়া)
  const machines = [
    { name: "পাওয়ার টিলার", desc: "দ্রুত জমি চাষ ও মই দেওয়ার জন্য।" },
    { name: "কম্বাইন হারভেস্টার", desc: "সাশ্রয়ী খরচে ধান কাটা ও মাড়াই।" },
    { name: "রাইস ট্রান্সপ্লান্টার", desc: "সমদূরত্বে ধানের চারা রোপণ যন্ত্র।" },
    { name: "পটেটো প্লান্টার", desc: "আলু রোপণ ও বেড তৈরির আধুনিক মেশিন।" },
    { name: "পাওয়ার স্প্রেয়ার", desc: "দ্রুত ও সহজে কীটনাশক স্প্রে করার জন্য।" },
    { name: "গ্রেইন ময়েশ্চার মিটার", desc: "শস্যের আর্দ্রতা মাপার ডিজিটাল যন্ত্র।" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --------------------------------------
          ১. হিরো সেকশন (Hero Section)
      --------------------------------------- */}
      <div className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-700 text-white py-24 md:py-32 overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-slate-50 clip-path-slant"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-emerald-700/50 border border-emerald-500 text-emerald-100 text-sm font-bold mb-6 backdrop-blur-md">
            🚜 আধুনিক কৃষির স্মার্ট সমাধান
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            কৃষক সেবা কেন্দ্র
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed mb-10">
            সনাতন পদ্ধতির দিন শেষ। আমানত ফাউন্ডেশন নিয়ে এসেছে আধুনিক কৃষি যন্ত্রপাতি, শস্য ব্যাংক এবং ন্যায্য মূল্যে ফসল বিক্রির সুবিধা।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-yellow-400 text-emerald-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-300 transition shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2">
              মেম্বার হোন <ArrowRight size={20} />
            </Link>
            <Link href="/login" className="bg-white/10 border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition backdrop-blur-sm">
              লগইন করুন
            </Link>
          </div>
        </div>
      </div>

      {/* --------------------------------------
          ২. প্রধান সেবাসমূহ (Main Services)
      --------------------------------------- */}
      <div className="container mx-auto px-4 py-16 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Service 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-emerald-500 group hover:-translate-y-2 transition duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition">
              <Tractor size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">যন্ত্রপাতি ভাড়া</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              পাওয়ার টিলার, হারভেস্টার সহ দামী যন্ত্রপাতি কেনার প্রয়োজন নেই। নামমাত্র ভাড়ায় ব্যবহার করুন।
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-yellow-500 group hover:-translate-y-2 transition duration-300">
            <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-600 group-hover:text-white transition">
              <Wheat size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">শস্য ব্যাংক</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              ফসল কম দামে না বেচে আমাদের গুদামে রাখুন। প্রয়োজেনে ফসলের বিপরীতে লোন নিন।
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-blue-500 group hover:-translate-y-2 transition duration-300">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition">
              <Sprout size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">বীজ ও সার</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              মৌসুমের শুরুতে উন্নত মানের বীজ ও সার বাকিতে নিন। ফসল উঠলে মূল্য পরিশোধ করুন।
            </p>
          </div>

          {/* Service 4 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-purple-500 group hover:-translate-y-2 transition duration-300">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition">
              <ShoppingCart size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">ফসল বিক্রি</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              মধ্যস্বত্বভোগী ছাড়া সরাসরি পাইকার বা কোম্পানির কাছে ন্যায্য মূল্যে ফসল বিক্রি করুন।
            </p>
          </div>

        </div>
      </div>

      {/* --------------------------------------
          ৩. আধুনিক যন্ত্রপাতির তালিকা
      --------------------------------------- */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">আমাদের আধুনিক যন্ত্রপাতি</h2>
            <p className="text-slate-500 mt-2">আপনার চাষাবাদকে সহজ করতে আমাদের সংগ্রহে আছে</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {machines.map((machine, idx) => (
              <div key={idx} className="flex items-start gap-4 p-5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition">
                <div className="bg-white p-3 rounded-full shadow-sm text-emerald-600">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{machine.name}</h4>
                  <p className="text-sm text-slate-500 mt-1">{machine.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------
          ৪. শস্য ব্যাংক ফিচার (Special Feature)
      --------------------------------------- */}
      <section className="py-20 bg-yellow-50 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          
          {/* Image / Graphic Area */}
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>
            <div className="bg-white p-8 rounded-3xl shadow-xl relative z-10 border border-yellow-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold text-xl">১</div>
                <p className="font-medium text-slate-700">ফসল আনুন</p>
              </div>
              <div className="w-1 h-8 bg-slate-200 ml-6 mb-2"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold text-xl">২</div>
                <p className="font-medium text-slate-700">গুদামে সংরক্ষণ করুন</p>
              </div>
              <div className="w-1 h-8 bg-slate-200 ml-6 mb-2"></div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xl">৩</div>
                <p className="font-bold text-emerald-700">তাৎক্ষণিক লোন নিন</p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 space-y-6">
            <span className="text-yellow-600 font-bold uppercase tracking-wider text-sm">স্পেশাল ফিচার</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              শস্য ব্যাংক: <span className="text-yellow-600">কৃষকের এটিএম</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              ফসলের মৌসুমে দাম কম থাকে। টাকার প্রয়োজনে কৃষক কম দামে ফসল বেচতে বাধ্য হন। আমাদের **শস্য ব্যাংক** আপনাকে দিচ্ছে ফসল জমা রেখে লোন নেওয়ার সুবিধা। পরে দাম বাড়লে ফসল বিক্রি করে লোন শোধ করুন এবং বাড়তি লাভ ঘরে তুলুন।
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle className="text-emerald-500" size={20}/> নিরাপদ ও আধুনিক গুদামজাতকরণ
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle className="text-emerald-500" size={20}/> বাজার দরের ৬০-৭০% পর্যন্ত লোন
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle className="text-emerald-500" size={20}/> আর্দ্রতা ও মান পরীক্ষা সম্পূর্ণ ফ্রি
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* --------------------------------------
          ৫. কল টু অ্যাকশন (CTA)
      --------------------------------------- */}
      <section className="py-20 bg-emerald-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            আজই সেবা গ্রহণ করতে চান?
          </h2>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto mb-8">
            আমাদের মেম্বার হয়ে অ্যাপ থেকেই সব সেবা বুকিং দিন। অথবা সরাসরি আমাদের হটলাইনে কল করুন।
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/register" className="bg-white text-emerald-900 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition shadow-lg">
              রেজিস্ট্রেশন করুন
            </Link>
            <a href="tel:017XXXXXXXX" className="flex items-center justify-center gap-2 text-white border-2 border-emerald-500/50 px-8 py-4 rounded-xl font-bold hover:bg-emerald-800 transition">
              <PhoneCall size={20}/> হটলাইন: ০১৭XX-XXXXXX
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}