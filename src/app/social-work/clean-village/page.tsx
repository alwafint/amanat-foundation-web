'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, Trash2, Recycle, TreePine, 
  ArrowRight, CheckCircle2, Heart, 
  Users, MapPin, Leaf, ShieldCheck
} from 'lucide-react';

// ৩ ধাপ পেছনে গিয়ে কম্পোনেন্ট ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function CleanVillagePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION (GREEN/NATURE THEME) --- */}
      <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transform scale-105 animate-slow-zoom" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop')" }}
        ></div>
        {/* Overlay Gradient (Emerald/Teal) */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/80 to-transparent z-10"></div>

        <div className="relative z-20 container mx-auto px-4 text-center mt-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/30 border border-emerald-400/50 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 animate-fadeInDown">
            <Leaf size={18} className="text-emerald-200" />
            <span className="text-emerald-100 text-sm font-bold uppercase tracking-widest">Mission Green Village</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            মিশন গ্রিন ভিলেজ <br/> 
            <span className="text-emerald-400 text-3xl md:text-5xl">পরিচ্ছন্নতা ঈমানের অঙ্গ</span>
          </h1>
          
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            একটি সুস্থ ও সুন্দর সমাজ গড়তে পরিচ্ছন্নতার বিকল্প নেই। গ্রামের আনাচে-কানাচে ছড়িয়ে থাকা প্লাস্টিক ও বর্জ্য অপসারণ করে একটি দূষণমুক্ত ও সবুজ গ্রাম গড়ে তোলাই আমাদের লক্ষ্য।
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a href="#sponsor" className="bg-emerald-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2">
              <Heart size={20} /> স্পন্সর করুন
            </a>
            <a href="#activities" className="bg-white/10 border border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition flex items-center justify-center gap-2">
              আমাদের কার্যক্রম <ArrowRight size={20}/>
            </a>
          </div>
        </div>
      </div>

      {/* --- REALITY CHECK / WHY WE DO THIS --- */}
      <section id="activities" className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-snug">
              কেন এই <br/> <span className="text-emerald-600">পরিষ্কার গ্রাম অভিযান?</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              প্লাস্টিক দূষণ এবং যত্রতত্র ময়লা ফেলার কারণে আমাদের গ্রামের সুন্দর পরিবেশ আজ হুমকির মুখে। মশা-মাছির উপদ্রব এবং পানিবাহিত রোগ থেকে গ্রামবাসীকে বাঁচাতে প্রয়োজন একটি পরিচ্ছন্ন ও স্বাস্থ্যকর পরিবেশ।
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100 hover:shadow-md transition">
                <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 shrink-0"><Trash2 size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">বর্জ্য অপসারণ</h4>
                  <p className="text-xs text-slate-500 mt-1">রাস্তা ও হাটবাজার পরিষ্কার করা।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100 hover:shadow-md transition">
                <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 shrink-0"><Recycle size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">ডাস্টবিন স্থাপন</h4>
                  <p className="text-xs text-slate-500 mt-1">গুরুত্বপূর্ণ স্থানে ডাস্টবিন বসানো।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100 hover:shadow-md transition">
                <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 shrink-0"><ShieldCheck size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">প্লাস্টিক বর্জন</h4>
                  <p className="text-xs text-slate-500 mt-1">পলিথিনের বদলে পাটের ব্যাগের প্রচার।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100 hover:shadow-md transition">
                <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 shrink-0"><Sparkles size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">সচেতনতা বৃদ্ধি</h4>
                  <p className="text-xs text-slate-500 mt-1">স্কুল ও মসজিদে পরিচ্ছন্নতা কর্মশালা।</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-2/3 h-2/3 bg-emerald-100 rounded-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=1000&auto=format&fit=crop" 
              alt="Cleaning Campaign" 
              className="rounded-3xl shadow-2xl w-full object-cover h-[450px]"
            />
            {/* Stats Overlay */}
            <div className="absolute bottom-8 left-[-20px] bg-white p-6 rounded-2xl shadow-xl border-l-8 border-emerald-500 animate-bounce-slow hidden md:block">
              <p className="text-sm text-slate-500 font-bold uppercase">অংশগ্রহণকারী ভলান্টিয়ার</p>
              <p className="text-3xl font-extrabold text-emerald-600">১০০০+ তরুণ</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- BANNER --- */}
      <section className="bg-emerald-900 text-white py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-800 p-4 rounded-full"><MapPin size={32} className="text-emerald-300"/></div>
            <div>
              <h3 className="text-2xl font-bold">চলমান অভিযান: সাঘাটা, গাইবান্ধা</h3>
              <p className="text-emerald-200 text-sm">আমাদের টিম প্রতি শুক্রবার বিভিন্ন গ্রাম পরিষ্কারের কাজে অংশ নেয়।</p>
            </div>
          </div>
          <Link href="/register-volunteer" className="bg-white text-emerald-900 px-8 py-3 rounded-full font-bold hover:bg-emerald-100 transition shadow-lg">
            ক্লিন টিমে জয়েন করুন
          </Link>
        </div>
      </section>

      {/* --- SPONSORSHIP PACKAGES --- */}
      <section id="sponsor" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">সদকায়ে জারিয়া ও পরিবেশ রক্ষা</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">পরিচ্ছন্নতার এই মিশনে স্পন্সর করুন</h2>
            <div className="w-20 h-1.5 bg-emerald-500 mx-auto rounded-full mt-4"></div>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              আপনার দেওয়া অনুদানেই কেনা হয় পরিচ্ছন্নতা সামগ্রী এবং স্থাপন করা হয় ডাস্টবিন। আপনার সামর্থ্য অনুযায়ী যেকোনো একটি প্যাকেজ বেছে নিন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Package 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-emerald-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-emerald-400"></div>
              <Trash2 size={48} className="mx-auto text-emerald-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">১টি ডাস্টবিন স্থাপন</h3>
              <div className="text-4xl font-extrabold text-emerald-600 mb-2">৳ ৫০০</div>
              <p className="text-slate-500 text-sm mb-8">গ্রামের মোড়ে বা হাটে একটি ডাস্টবিন স্থাপন করুন।</p>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-emerald-600 hover:text-white transition mt-auto">দান করুন</button>
            </div>

            {/* Package 2 (Popular) */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-emerald-500 relative transform md:-translate-y-4 flex flex-col">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
              <Users size={48} className="mx-auto text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">ভলান্টিয়ার কিট</h3>
              <div className="text-5xl font-extrabold text-emerald-700 mb-2">৳ ২,০০০</div>
              <p className="text-slate-500 text-xs mb-8">১০ জন ভলান্টিয়ারের গ্লাভস, মাস্ক ও টি-শার্টের খরচ।</p>
              <button className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition shadow-lg mt-auto">এখনই স্পন্সর করুন</button>
            </div>

            {/* Package 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-emerald-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-emerald-400"></div>
              <TreePine size={48} className="mx-auto text-emerald-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">পূর্ণাঙ্গ গ্রাম পরিষ্কার</h3>
              <div className="text-4xl font-extrabold text-emerald-600 mb-2">৳ ১০,০০০</div>
              <p className="text-slate-500 text-sm mb-8">একটি গ্রামের সম্পূর্ণ পরিচ্ছন্নতা অভিযানের খরচ বহন করুন।</p>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-emerald-600 hover:text-white transition mt-auto">যোগাযোগ করুন</button>
            </div>

          </div>

          {/* Payment Info */}
          <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-2xl border border-dashed border-emerald-300 text-center">
            <h4 className="font-bold text-slate-700 mb-4 text-lg">অনুদান পাঠানোর মাধ্যম (Eco Fund)</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-pink-50 text-pink-600 rounded-lg font-bold border border-pink-100">bKash: 017XXXXXXXX</div>
              <div className="px-6 py-3 bg-orange-50 text-orange-600 rounded-lg font-bold border border-orange-100">Nagad: 017XXXXXXXX</div>
            </div>
            <p className="text-sm text-slate-500 mt-4">* রেফারেন্সে 'Clean Village' উল্লেখ করুন।</p>
          </div>
        </div>
      </section>

      {/* --- VOLUNTEER CTA --- */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-emerald-50 p-4 rounded-full mb-4">
             <Sparkles size={40} className="text-emerald-600"/>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">আপনার গ্রামকে সুন্দর রাখতে চান?</h2>
          <p className="text-slate-600 max-w-xl mx-auto mb-8 text-lg">
            আমাদের 'মিশন গ্রিন ভিলেজ' টিমে স্বেচ্ছাসেবক হিসেবে যোগ দিন। প্রতি শুক্রবার মাত্র ২ ঘণ্টা সময় দিয়ে নিজের গ্রামকে পরিষ্কার রাখুন।
          </p>
          <Link href="/register-volunteer" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition shadow-lg hover:shadow-slate-300">
            স্বেচ্ছাসেবক হিসেবে যুক্ত হোন
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}