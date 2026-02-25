'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Recycle, Trash2, ArrowRight, CheckCircle2, 
  Leaf, Megaphone, TreePine, ShieldCheck, 
  Sprout, MapPin, Users
} from 'lucide-react';

// ৩ ধাপ পেছনে গিয়ে কম্পোনেন্ট ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function EcoGuardPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION (ENVIRONMENT/LIME THEME) --- */}
      <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image (Nature Cleanup/Recycle Vibe) */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transform scale-105 animate-slow-zoom" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1600&auto=format&fit=crop')" }}
        ></div>
        {/* Overlay Gradient (Lime/Slate) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-lime-900/80 to-green-900/40 z-10"></div>

        <div className="relative z-20 container mx-auto px-4 text-center mt-10">
          <div className="inline-flex items-center gap-2 bg-lime-500/30 border border-lime-400/50 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 animate-fadeInDown">
            <Recycle size={18} className="text-lime-200" />
            <span className="text-lime-100 text-sm font-bold uppercase tracking-widest">প্লাস্টিক বর্জন ও ডাস্টবিন প্রকল্প</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            ইকো-গার্ড <br/> 
            <span className="text-lime-400 text-3xl md:text-5xl">প্লাস্টিক বর্জন করি, পরিবেশ রক্ষা করি</span>
          </h1>
          
          <p className="text-lg md:text-xl text-lime-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            পলিথিন ও প্লাস্টিকের দূষণ থেকে আমাদের গ্রাম, বাজার এবং নদীনালাকে রক্ষা করতে নির্দিষ্ট স্থানে বর্জ্য ফেলা এবং ডাস্টবিন স্থাপনের উদ্যোগ।
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a href="#sponsor" className="bg-lime-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-lime-500 transition shadow-lg shadow-lime-600/30 flex items-center justify-center gap-2">
              <Sprout size={20} className="text-white opacity-80" /> স্পন্সর করুন
            </a>
            <a href="#activities" className="bg-white/10 border border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition flex items-center justify-center gap-2">
              আমাদের লক্ষ্য <ArrowRight size={20}/>
            </a>
          </div>
        </div>
      </div>

      {/* --- REALITY CHECK / WHY WE DO THIS --- */}
      <section id="activities" className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-snug">
              কেন সঠিক <br/> <span className="text-lime-600">বর্জ্য ব্যবস্থাপনা জরুরি?</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              যত্রতত্র প্লাস্টিক ও পলিথিন ফেলার কারণে আমাদের আবাদি জমি, খালবিল ও নদীর পানি মারাত্মকভাবে দূষিত হচ্ছে। পরিবেশের এই ভয়ংকর অবক্ষয় রোধে ডাস্টবিন ব্যবহার ও রিসাইক্লিংয়ের সচেতনতা বৃদ্ধি করা সময়ের দাবি।
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 bg-lime-50 rounded-xl border border-lime-100 hover:shadow-md transition">
                <div className="bg-lime-100 p-2 rounded-full text-lime-600 shrink-0"><Recycle size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">প্লাস্টিক দূষণ রোধ</h4>
                  <p className="text-xs text-slate-500 mt-1">মাটি ও পানির উর্বরতা বাঁচাতে পলিথিন বর্জন।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100 hover:shadow-md transition">
                <div className="bg-green-100 p-2 rounded-full text-green-600 shrink-0"><Trash2 size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">ডাস্টবিন স্থাপন</h4>
                  <p className="text-xs text-slate-500 mt-1">বাজার ও জনবহুল স্থানে স্থায়ী ডাস্টবিন তৈরি।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-xl border border-teal-100 hover:shadow-md transition">
                <div className="bg-teal-100 p-2 rounded-full text-teal-600 shrink-0"><Megaphone size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">জনসচেতনতা</h4>
                  <p className="text-xs text-slate-500 mt-1">যত্রতত্র ময়লা না ফেলতে মানুষকে উদ্বুদ্ধ করা।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100 hover:shadow-md transition">
                <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 shrink-0"><TreePine size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">পরিবেশ রক্ষা</h4>
                  <p className="text-xs text-slate-500 mt-1">আগামী প্রজন্মের জন্য একটি সুস্থ ও সুন্দর পৃথিবী।</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-lime-100 rounded-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1605600659873-d808a1d14b48?q=80&w=1000&auto=format&fit=crop" 
              alt="Waste Management" 
              className="rounded-3xl shadow-2xl w-full object-cover h-[450px]"
            />
            {/* Stats Overlay */}
            <div className="absolute top-10 left-[-20px] bg-white p-6 rounded-2xl shadow-xl border-l-8 border-lime-500 animate-bounce-slow hidden md:block">
              <p className="text-sm text-slate-500 font-bold uppercase">আমাদের টার্গেট</p>
              <p className="text-3xl font-extrabold text-lime-600">১,০০০+ ডাস্টবিন</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- IMPACT BANNER --- */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold opacity-90">আমাদের কাজের প্রভাব</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Trash2 size={32} className="mx-auto text-lime-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">১০০+</h3>
              <p className="text-slate-400 text-sm">ডাস্টবিন স্থাপন</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Recycle size={32} className="mx-auto text-lime-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">৫ টন+</h3>
              <p className="text-slate-400 text-sm">প্লাস্টিক অপসারণ</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <MapPin size={32} className="mx-auto text-lime-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">২০+</h3>
              <p className="text-slate-400 text-sm">গ্রাম পরিচ্ছন্ন</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Users size={32} className="mx-auto text-lime-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">২,০০০+</h3>
              <p className="text-slate-400 text-sm">সচেতন মানুষ</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SPONSORSHIP PACKAGES --- */}
      <section id="sponsor" className="py-24 bg-lime-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-lime-600 font-bold uppercase tracking-wider text-sm">প্রকৃতিকে ভালোবাসুন</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">স্পন্সর প্যাকেজ বেছে নিন</h2>
            <div className="w-20 h-1.5 bg-lime-500 mx-auto rounded-full mt-4"></div>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              আপনার স্পন্সরকৃত একটি ডাস্টবিন গ্রামের একটি মোড় বা বাজারকে পরিষ্কার রাখতে সাহায্য করবে।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Package 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-lime-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-lime-400"></div>
              <Leaf size={48} className="mx-auto text-lime-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">পরিবেশ বন্ধু</h3>
              <div className="text-4xl font-extrabold text-lime-600 mb-2">৳ ১,০০০</div>
              <p className="text-slate-500 text-sm mb-8">গ্রামের একটি গুরুত্বপূর্ণ মোড়ে ১টি স্থায়ী বা টেকসই ডাস্টবিন স্থাপন।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-lime-500"/> উন্নত মানের ডাস্টবিন</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-lime-500"/> স্পন্সরের নাম/লোগো যুক্ত</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-lime-600 hover:text-white transition mt-auto">স্পন্সর করুন</button>
            </div>

            {/* Package 2 (Popular) */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-green-500 relative transform md:-translate-y-4 flex flex-col">
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
              <Trash2 size={48} className="mx-auto text-green-600 mb-4 fill-green-50" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">ক্লিন ভিলেজ প্যাক</h3>
              <div className="text-5xl font-extrabold text-green-600 mb-2">৳ ৫,০০০</div>
              <p className="text-slate-500 text-xs mb-8">গ্রামের একটি সম্পূর্ণ বাজার বা মোড়কে প্লাস্টিকমুক্ত রাখতে ৫টি ডাস্টবিন।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-500"/> ৫টি স্থানে ডাস্টবিন স্থাপন</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-500"/> সচেতনতামূলক সাইনবোর্ড</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-500"/> ছবি ও আপডেট প্রদান</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition shadow-lg mt-auto">এখনই স্পন্সর করুন</button>
            </div>

            {/* Package 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-lime-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-lime-400"></div>
              <ShieldCheck size={48} className="mx-auto text-lime-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">প্লাস্টিক ফ্রি জোন</h3>
              <div className="text-4xl font-extrabold text-lime-600 mb-2">৳ ১০,০০০+</div>
              <p className="text-slate-500 text-sm mb-8">একটি বড় এলাকার বর্জ্য অপসারণ ও মেগা পরিচ্ছন্নতা অভিযান স্পন্সর করুন।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-lime-500"/> ময়লা ফেলার ভ্যান সাপোর্ট</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-lime-500"/> বড় পরিচ্ছন্নতা ক্যাম্পেইন</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-lime-600 hover:text-white transition mt-auto">যোগাযোগ করুন</button>
            </div>

          </div>

          {/* Payment Info */}
          <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-2xl border border-dashed border-lime-300 text-center">
            <h4 className="font-bold text-slate-700 mb-4 text-lg">অনুদান পাঠানোর মাধ্যম (Eco Fund)</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-pink-50 text-pink-600 rounded-lg font-bold border border-pink-100">bKash: 017XXXXXXXX</div>
              <div className="px-6 py-3 bg-lime-50 text-lime-700 rounded-lg font-bold border border-lime-200">Nagad: 017XXXXXXXX</div>
            </div>
            <p className="text-sm text-slate-500 mt-4">* রেফারেন্সে 'Eco Guard' বা 'Dustbin' উল্লেখ করুন।</p>
          </div>
        </div>
      </section>

      {/* --- VOLUNTEER CTA --- */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-lime-50 p-4 rounded-full mb-4">
             <Recycle size={40} className="text-lime-600"/>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">পরিচ্ছন্নতা অভিযানে যুক্ত হতে চান?</h2>
          <p className="text-slate-600 max-w-xl mx-auto mb-8 text-lg">
            বাজার, রাস্তাঘাট ও নদীনালা পরিচ্ছন্ন করার আমাদের সাপ্তাহিক ভলান্টিয়ারিং কার্যক্রমে আপনিও হতে পারেন একজন 'ইকো-গার্ড'।
          </p>
          <Link href="/register-volunteer" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-lime-600 transition shadow-lg hover:shadow-slate-300">
            <Users size={20} /> ভলান্টিয়ার হিসেবে যুক্ত হোন
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}