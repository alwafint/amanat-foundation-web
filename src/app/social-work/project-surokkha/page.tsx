'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Droplets, ShieldCheck, ArrowRight, CheckCircle2, 
  Sparkles, HeartPulse, Hammer, Wrench, Users, Activity
} from 'lucide-react';

// ৩ ধাপ পেছনে গিয়ে কম্পোনেন্ট ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function ProjectSurokkhaPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION (SANITATION/CYAN THEME) --- */}
      <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image (Water/Hygiene Vibe) */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transform scale-105 animate-slow-zoom" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541888081608-8eb13c490ec9?q=80&w=1600&auto=format&fit=crop')" }}
        ></div>
        {/* Overlay Gradient (Cyan/Slate) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-cyan-900/80 to-teal-900/40 z-10"></div>

        <div className="relative z-20 container mx-auto px-4 text-center mt-10">
          <div className="inline-flex items-center gap-2 bg-cyan-500/30 border border-cyan-400/50 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 animate-fadeInDown">
            <Droplets size={18} className="text-cyan-200" />
            <span className="text-cyan-100 text-sm font-bold uppercase tracking-widest">পরিচ্ছন্ন টয়লেট ও স্যানিটেশন ক্যাম্পেইন</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            সুরক্ষা স্যানিটেশন <br/> 
            <span className="text-cyan-400 text-3xl md:text-5xl">সুস্থ থাকার প্রথম সোপান</span>
          </h1>
          
          <p className="text-lg md:text-xl text-cyan-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            নিরাপদ পানীয় জল এবং স্বাস্থ্যসম্মত স্যানিটেশন ব্যবস্থা নিশ্চিত করার মাধ্যমে পানিবাহিত রোগ প্রতিরোধে আমাদের এই বিশেষ উদ্যোগ।
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a href="#sponsor" className="bg-cyan-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-cyan-500 transition shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2">
              <ShieldCheck size={20} className="text-white opacity-80" /> স্পন্সর করুন
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
              কেন স্যানিটেশন <br/> <span className="text-cyan-600">উন্নয়ন জরুরি?</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              চরাঞ্চল ও সুবিধাবঞ্চিত এলাকাগুলোতে অস্বাস্থ্যকর পরিবেশে টয়লেট ব্যবহারের কারণে ডায়রিয়া, কলেরা ও চর্মরোগের মতো পানিবাহিত রোগ দ্রুত ছড়িয়ে পড়ে। সুস্থ সমাজ গড়তে স্বাস্থ্যসম্মত স্যানিটেশন এবং পরিচ্ছন্নতার অভ্যাস গড়ে তোলা অপরিহার্য।
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 bg-cyan-50 rounded-xl border border-cyan-100 hover:shadow-md transition">
                <div className="bg-cyan-100 p-2 rounded-full text-cyan-600 shrink-0"><ShieldCheck size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">রোগ প্রতিরোধ</h4>
                  <p className="text-xs text-slate-500 mt-1">পানিবাহিত জটিল রোগ থেকে শিশু ও বৃদ্ধদের রক্ষা করা।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-xl border border-teal-100 hover:shadow-md transition">
                <div className="bg-teal-100 p-2 rounded-full text-teal-600 shrink-0"><Droplets size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">নিরাপদ পানি</h4>
                  <p className="text-xs text-slate-500 mt-1">টিউবওয়েল স্থাপন ও বিশুদ্ধ পানির ব্যবস্থা নিশ্চিত করা।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600 shrink-0"><Sparkles size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">হাইজিন সচেতনতা</h4>
                  <p className="text-xs text-slate-500 mt-1">সাবান দিয়ে হাত ধোয়া ও ব্যক্তিগত পরিচ্ছন্নতার প্রশিক্ষণ।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100 hover:shadow-md transition">
                <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 shrink-0"><Hammer size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">অবকাঠামো উন্নয়ন</h4>
                  <p className="text-xs text-slate-500 mt-1">ভাঙা টয়লেট মেরামত এবং রিং-স্ল্যাব প্রদান করা।</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-cyan-100 rounded-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1584489626359-0db79fbc9b7b?q=80&w=1000&auto=format&fit=crop" 
              alt="Sanitation Project" 
              className="rounded-3xl shadow-2xl w-full object-cover h-[450px]"
            />
            {/* Stats Overlay */}
            <div className="absolute top-10 left-[-20px] bg-white p-6 rounded-2xl shadow-xl border-l-8 border-cyan-500 animate-bounce-slow hidden md:block">
              <p className="text-sm text-slate-500 font-bold uppercase">আমাদের বাৎসরিক লক্ষ্য</p>
              <p className="text-3xl font-extrabold text-cyan-600">১০০+ টয়লেট সংস্কার</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- IMPACT BANNER --- */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold opacity-90">গত বছরের ইমপ্যাক্ট</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Wrench size={32} className="mx-auto text-cyan-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">৪৫+</h3>
              <p className="text-slate-400 text-sm">টয়লেট সংস্কার</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Droplets size={32} className="mx-auto text-cyan-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">১৫+</h3>
              <p className="text-slate-400 text-sm">টিউবওয়েল স্থাপন</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Sparkles size={32} className="mx-auto text-cyan-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">১,২০০+</h3>
              <p className="text-slate-400 text-sm">হাইজিন কিট বিতরণ</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Users size={32} className="mx-auto text-cyan-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">৫,০০০+</h3>
              <p className="text-slate-400 text-sm">সচেতনতা তৈরি</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SPONSORSHIP PACKAGES --- */}
      <section id="sponsor" className="py-24 bg-cyan-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-cyan-600 font-bold uppercase tracking-wider text-sm">সুস্থ সমাজ গড়তে সহায়তা করুন</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">আপনার অনুদান প্যাকেজ বেছে নিন</h2>
            <div className="w-20 h-1.5 bg-cyan-500 mx-auto rounded-full mt-4"></div>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              আপনার সামান্য অনুদানে একটি পরিবারের সুস্থতা নিশ্চিত হতে পারে। স্বাস্থ্যসম্মত জীবনযাপন তাদের মৌলিক অধিকার।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Package 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-cyan-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-cyan-400"></div>
              <Sparkles size={48} className="mx-auto text-cyan-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">হাইজিন কিট</h3>
              <div className="text-4xl font-extrabold text-cyan-600 mb-2">৳ ৫০০</div>
              <p className="text-slate-500 text-sm mb-8">একটি দরিদ্র পরিবারকে এক মাসের পরিষ্কার-পরিচ্ছন্নতার সামগ্রী দিন।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-cyan-500"/> সাবান, ডিটারজেন্ট ও ব্রাশ</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-cyan-500"/> স্যানিটারি ন্যাপকিন</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-cyan-600 hover:text-white transition mt-auto">দান করুন</button>
            </div>

            {/* Package 2 (Popular) */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-teal-500 relative transform md:-translate-y-4 flex flex-col">
              <div className="absolute top-0 right-0 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
              <Wrench size={48} className="mx-auto text-teal-600 mb-4 fill-teal-50" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">টয়লেট সংস্কার</h3>
              <div className="text-5xl font-extrabold text-teal-600 mb-2">৳ ২,৫০০</div>
              <p className="text-slate-500 text-xs mb-8">ভাঙা ও অস্বাস্থ্যকর টয়লেট ব্যবহারযোগ্য করে তুলতে সাহায্য করুন।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-teal-500"/> নতুন রিং ও স্ল্যাব প্রদান</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-teal-500"/> বাঁশ বা টিনের বেড়া মেরামত</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-teal-500"/> মিস্ত্রি খরচ অন্তর্ভূক্ত</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-teal-500 text-white font-bold hover:bg-teal-600 transition shadow-lg mt-auto">স্পন্সর করুন</button>
            </div>

            {/* Package 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-cyan-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-cyan-400"></div>
              <Droplets size={48} className="mx-auto text-cyan-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">স্যানিটারি ল্যাট্রিন</h3>
              <div className="text-4xl font-extrabold text-cyan-600 mb-2">৳ ১০,০০০+</div>
              <p className="text-slate-500 text-sm mb-8">যে পরিবারে কোনো টয়লেট নেই, তাদের সম্পূর্ণ নতুন টয়লেট তৈরি করে দিন।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-cyan-500"/> পাকা ল্যাট্রিন সেটআপ</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-cyan-500"/> আজীবন সাদাকাহ জারিয়া</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-cyan-600 hover:text-white transition mt-auto">যোগাযোগ করুন</button>
            </div>

          </div>

          {/* Payment Info */}
          <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-2xl border border-dashed border-cyan-300 text-center">
            <h4 className="font-bold text-slate-700 mb-4 text-lg">অনুদান পাঠানোর মাধ্যম (Surokkha Fund)</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-pink-50 text-pink-600 rounded-lg font-bold border border-pink-100">bKash: 017XXXXXXXX</div>
              <div className="px-6 py-3 bg-cyan-50 text-cyan-700 rounded-lg font-bold border border-cyan-200">Nagad: 017XXXXXXXX</div>
            </div>
            <p className="text-sm text-slate-500 mt-4">* রেফারেন্সে 'Surokkha' উল্লেখ করুন।</p>
          </div>
        </div>
      </section>

      {/* --- VOLUNTEER CTA --- */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-cyan-50 p-4 rounded-full mb-4">
             <HeartPulse size={40} className="text-cyan-600"/>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">হাইজিন সচেতনতা তৈরি করতে চান?</h2>
          <p className="text-slate-600 max-w-xl mx-auto mb-8 text-lg">
            গ্রামে গ্রামে গিয়ে স্বাস্থ্যকর স্যানিটেশন সম্পর্কে মানুষকে সচেতন করতে আমাদের ভলান্টিয়ার টিমে যোগ দিন।
          </p>
          <Link href="/register-volunteer" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-cyan-600 transition shadow-lg hover:shadow-slate-300">
            <Activity size={20} /> ভলান্টিয়ার হিসেবে যুক্ত হোন
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}