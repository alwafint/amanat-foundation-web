'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Briefcase, Target, ArrowRight, CheckCircle2, 
  Scissors, Laptop, TrendingUp, Users, 
  Award, HandCoins, Lightbulb
} from 'lucide-react';

// ৩ ধাপ পেছনে গিয়ে কম্পোনেন্ট ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function ProjectSwabolombiPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION (EMPOWERMENT/INDIGO THEME) --- */}
      <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image (Skill Development/Training Vibe) */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transform scale-105 animate-slow-zoom" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop')" }}
        ></div>
        {/* Overlay Gradient (Indigo/Slate) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-indigo-900/80 to-blue-900/40 z-10"></div>

        <div className="relative z-20 container mx-auto px-4 text-center mt-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/30 border border-indigo-400/50 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 animate-fadeInDown">
            <Briefcase size={18} className="text-indigo-200" />
            <span className="text-indigo-100 text-sm font-bold uppercase tracking-widest">যুব প্রশিক্ষণ ও স্কিল ডেভেলপমেন্ট</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            প্রজেক্ট স্বাবলম্বী <br/> 
            <span className="text-indigo-400 text-3xl md:text-5xl">দক্ষ হাত, উন্নত ভবিষ্যৎ</span>
          </h1>
          
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            বেকার যুবক ও সুবিধাবঞ্চিত নারীদের আত্মনির্ভরশীল করে তুলতে আমাদের প্রশিক্ষণমূলক উদ্যোগ। আমরা বিশ্বাস করি, অনুদান নয়, কর্মসংস্থানই পারে স্থায়ী দারিদ্র্য বিমোচন করতে।
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a href="#sponsor" className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2">
              <HandCoins size={20} className="text-white opacity-80" /> স্পন্সর করুন
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
              কেন <span className="text-indigo-600">দক্ষতা উন্নয়ন</span> <br/> এত বেশি জরুরি?
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              আমাদের সমাজে অনেক কর্মঠ মানুষ আছেন, যাদের কেবল একটু দিকনির্দেশনা, প্রশিক্ষণ ও মূলধনের অভাব রয়েছে। তাদের যদি সঠিক প্রশিক্ষণ ও কাজের সরঞ্জাম দেওয়া যায়, তবে তারা অন্যের মুখাপেক্ষী না হয়ে নিজেরাই নিজেদের ভাগ্য পরিবর্তন করতে পারবেন।
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100 hover:shadow-md transition">
                <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 shrink-0"><Scissors size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">নারীদের ক্ষমতায়ন</h4>
                  <p className="text-xs text-slate-500 mt-1">সেলাই ও হাতের কাজের মাধ্যমে নারীদের আত্মনির্ভরশীল করা।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600 shrink-0"><Laptop size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">আইটি ও ফ্রিল্যান্সিং</h4>
                  <p className="text-xs text-slate-500 mt-1">যুবকদের জন্য বেসিক কম্পিউটার ও ফ্রিল্যান্সিং প্রশিক্ষণ।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100 hover:shadow-md transition">
                <div className="bg-purple-100 p-2 rounded-full text-purple-600 shrink-0"><Lightbulb size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">ক্ষুদ্র উদ্যোক্তা তৈরি</h4>
                  <p className="text-xs text-slate-500 mt-1">ছোট ব্যবসা শুরু করতে প্রয়োজনীয় সরঞ্জাম ও পুঁজি প্রদান।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-violet-50 rounded-xl border border-violet-100 hover:shadow-md transition">
                <div className="bg-violet-100 p-2 rounded-full text-violet-600 shrink-0"><TrendingUp size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">বেকারত্ব দূরীকরণ</h4>
                  <p className="text-xs text-slate-500 mt-1">কর্মসংস্থান সৃষ্টির মাধ্যমে সমাজের অর্থনৈতিক উন্নয়ন।</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-indigo-100 rounded-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000&auto=format&fit=crop" 
              alt="Small Business & Skill Development" 
              className="rounded-3xl shadow-2xl w-full object-cover h-[450px]"
            />
            {/* Stats Overlay */}
            <div className="absolute top-10 left-[-20px] bg-white p-6 rounded-2xl shadow-xl border-l-8 border-indigo-500 animate-bounce-slow hidden md:block">
              <p className="text-sm text-slate-500 font-bold uppercase">আমাদের সাফল্যের হার</p>
              <p className="text-3xl font-extrabold text-indigo-600">৮৫% স্বাবলম্বী</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- IMPACT BANNER --- */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold opacity-90">স্বাবলম্বী হওয়ার গল্প</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Scissors size={32} className="mx-auto text-indigo-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">৫০+</h3>
              <p className="text-slate-400 text-sm">সেলাই মেশিন প্রদান</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Award size={32} className="mx-auto text-indigo-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">২০০+</h3>
              <p className="text-slate-400 text-sm">প্রশিক্ষণপ্রাপ্ত নারী ও যুবক</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Briefcase size={32} className="mx-auto text-indigo-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">৩০+</h3>
              <p className="text-slate-400 text-sm">নতুন ক্ষুদ্র ব্যবসা</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <TrendingUp size={32} className="mx-auto text-indigo-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">৩০০+</h3>
              <p className="text-slate-400 text-sm">পরিবারের মুখে হাসি</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SPONSORSHIP PACKAGES --- */}
      <section id="sponsor" className="py-24 bg-indigo-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-bold uppercase tracking-wider text-sm">কর্মসংস্থান তৈরি করুন</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">আপনার অনুদান প্যাকেজ বেছে নিন</h2>
            <div className="w-20 h-1.5 bg-indigo-500 mx-auto rounded-full mt-4"></div>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              কাউকে একবেলার খাবার দেওয়ার চেয়ে তাকে উপার্জনের একটি পথ তৈরি করে দেওয়া সবচেয়ে বড় সাদাকাহ।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Package 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-indigo-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-indigo-400"></div>
              <Laptop size={48} className="mx-auto text-indigo-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">ট্রেনিং স্পন্সর</h3>
              <div className="text-4xl font-extrabold text-indigo-600 mb-2">৳ ৩,০০০</div>
              <p className="text-slate-500 text-sm mb-8">একজন বেকার যুবকের কম্পিউটার বা কারিগরি কোর্সের ফি স্পন্সর করুন।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-indigo-500"/> ৩-৬ মাসের কোর্স ফি</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-indigo-500"/> মেন্টরিং ও গাইডলাইন</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-indigo-600 hover:text-white transition mt-auto">স্পন্সর করুন</button>
            </div>

            {/* Package 2 (Popular) */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-blue-500 relative transform md:-translate-y-4 flex flex-col">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
              <Scissors size={48} className="mx-auto text-blue-600 mb-4 fill-blue-50" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">উদ্যোক্তা মেশিন</h3>
              <div className="text-5xl font-extrabold text-blue-600 mb-2">৳ ৮,০০০</div>
              <p className="text-slate-500 text-xs mb-8">একজন বিধবা বা অসহায় নারীকে সেলাই মেশিন দিয়ে আত্মনির্ভরশীল করুন।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-blue-500"/> নতুন সেলাই মেশিন প্রদান</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-blue-500"/> প্রাথমিক সুতা ও কাপড়</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-blue-500"/> আয়ের একটি স্থায়ী উৎস</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-lg mt-auto">মেশিন উপহার দিন</button>
            </div>

            {/* Package 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-indigo-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-indigo-400"></div>
              <Briefcase size={48} className="mx-auto text-indigo-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">ক্ষুদ্র ব্যবসা তহবিল</h3>
              <div className="text-4xl font-extrabold text-indigo-600 mb-2">৳ ১৫,০০০+</div>
              <p className="text-slate-500 text-sm mb-8">চা-দোকান, সবজি ব্যবসা বা হাঁস-মুরগি পালনের জন্য মূলধন প্রদান।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-indigo-500"/> ব্যবসার সম্পূর্ণ সেটআপ</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-indigo-500"/> নিয়মিত ফলোআপ ও সাপোর্ট</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-indigo-600 hover:text-white transition mt-auto">যোগাযোগ করুন</button>
            </div>

          </div>

          {/* Payment Info */}
          <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-2xl border border-dashed border-indigo-300 text-center">
            <h4 className="font-bold text-slate-700 mb-4 text-lg">তহবিলে অনুদান পাঠানোর মাধ্যম</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-pink-50 text-pink-600 rounded-lg font-bold border border-pink-100">bKash: 017XXXXXXXX</div>
              <div className="px-6 py-3 bg-indigo-50 text-indigo-700 rounded-lg font-bold border border-indigo-200">Nagad: 017XXXXXXXX</div>
            </div>
            <p className="text-sm text-slate-500 mt-4">* রেফারেন্সে 'Swabolombi' উল্লেখ করুন।</p>
          </div>
        </div>
      </section>

      {/* --- VOLUNTEER/MENTOR CTA --- */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-indigo-50 p-4 rounded-full mb-4">
             <Target size={40} className="text-indigo-600"/>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">আপনি কি একজন ট্রেইনার বা মেন্টর?</h2>
          <p className="text-slate-600 max-w-xl mx-auto mb-8 text-lg">
            আপনার দক্ষতা (আইটি, হাতের কাজ, ফ্রিল্যান্সিং বা ব্যবসা) দিয়ে যদি বেকার যুবক বা নারীদের প্রশিক্ষণ দিতে চান, তবে আমাদের সাথে যুক্ত হোন।
          </p>
          <Link href="/register-volunteer" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-600 transition shadow-lg hover:shadow-slate-300">
            <Users size={20} /> ট্রেইনার হিসেবে যুক্ত হোন
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}