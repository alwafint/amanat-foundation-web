'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Trophy, Users, ArrowRight, CheckCircle2, 
  Activity, Medal, Flag, Target, ShieldCheck
} from 'lucide-react';

// ৩ ধাপ পেছনে গিয়ে কম্পোনেন্ট ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function HarmonyCupPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION (SPORTS/ORANGE THEME) --- */}
      <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image (Sports/Football Vibe) */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transform scale-105 animate-slow-zoom" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518605368461-1ee7e53f03b6?q=80&w=1600&auto=format&fit=crop')" }}
        ></div>
        {/* Overlay Gradient (Orange/Slate) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-orange-900/80 to-amber-900/40 z-10"></div>

        <div className="relative z-20 container mx-auto px-4 text-center mt-10">
          <div className="inline-flex items-center gap-2 bg-orange-500/30 border border-orange-400/50 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 animate-fadeInDown">
            <Trophy size={18} className="text-orange-200" />
            <span className="text-orange-100 text-sm font-bold uppercase tracking-widest">টিম লিডার কাপ ও ক্রীড়া প্রতিযোগিতা</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            সম্প্রীতি টুর্নামেন্ট <br/> 
            <span className="text-orange-400 text-3xl md:text-5xl">খেলাধুলায় বাড়ে বল, মাদক ছেড়ে মাঠে চল</span>
          </h1>
          
          <p className="text-lg md:text-xl text-orange-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            যুবসমাজকে মাদকমুক্ত রাখতে এবং তাদের শারীরিক ও মানসিক বিকাশের লক্ষ্যে আমাদের এই নিয়মিত ক্রীড়া আয়োজন। চলুন, তরুণদের মাঠে ফিরিয়ে আনি।
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a href="#sponsor" className="bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-500 transition shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2">
              <Target size={20} className="text-white opacity-80" /> স্পন্সর করুন
            </a>
            <a href="#activities" className="bg-white/10 border border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition flex items-center justify-center gap-2">
              উদ্যোগের উদ্দেশ্য <ArrowRight size={20}/>
            </a>
          </div>
        </div>
      </div>

      {/* --- REALITY CHECK / WHY WE DO THIS --- */}
      <section id="activities" className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-snug">
              কেন এই <br/> <span className="text-orange-600">ক্রীড়া আয়োজন?</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              বর্তমান সময়ে যুবসমাজ যখন মোবাইল গেমস ও বিভিন্ন অসামাজিক কাজে জড়িয়ে পড়ছে, তখন তাদের মাঠে ফিরিয়ে আনা অত্যন্ত জরুরি। আমাদের 'সম্প্রীতি টুর্নামেন্ট' শুধুমাত্র একটি খেলা নয়, এটি তরুণদের মধ্যে ভ্রাতৃত্ববোধ ও সুস্থ প্রতিযোগিতা তৈরির একটি মাধ্যম।
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100 hover:shadow-md transition">
                <div className="bg-orange-100 p-2 rounded-full text-orange-600 shrink-0"><ShieldCheck size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">মাদকমুক্ত সমাজ</h4>
                  <p className="text-xs text-slate-500 mt-1">মাদক ও অবক্ষয় থেকে দূরে রাখতে মাঠে ফিরিয়ে আনা।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100 hover:shadow-md transition">
                <div className="bg-amber-100 p-2 rounded-full text-amber-600 shrink-0"><Activity size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">শারীরিক ও মানসিক স্বাস্থ্য</h4>
                  <p className="text-xs text-slate-500 mt-1">সুস্থ দেহ ও সুন্দর মনের বিকাশে খেলাধুলার বিকল্প নেই।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100 hover:shadow-md transition">
                <div className="bg-red-100 p-2 rounded-full text-red-600 shrink-0"><Users size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">ভ্রাতৃত্ববোধ ও সম্প্রীতি</h4>
                  <p className="text-xs text-slate-500 mt-1">এলাকার তরুণদের মাঝে একতা ও বন্ধুত্ব তৈরি করা।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-100 hover:shadow-md transition">
                <div className="bg-yellow-100 p-2 rounded-full text-yellow-600 shrink-0"><Medal size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">প্রতিভা অন্বেষণ</h4>
                  <p className="text-xs text-slate-500 mt-1">তৃণমূল থেকে ভালো খেলোয়াড় তুলে আনার সুযোগ।</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-orange-100 rounded-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1000&auto=format&fit=crop" 
              alt="Harmony Cup" 
              className="rounded-3xl shadow-2xl w-full object-cover h-[450px]"
            />
            {/* Stats Overlay */}
            <div className="absolute top-10 left-[-20px] bg-white p-6 rounded-2xl shadow-xl border-l-8 border-orange-500 animate-bounce-slow hidden md:block">
              <p className="text-sm text-slate-500 font-bold uppercase">প্রতি বছর লক্ষ্য</p>
              <p className="text-3xl font-extrabold text-orange-600">১৬+ টিমের অংশগ্রহণ</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- IMPACT BANNER --- */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold opacity-90">আমাদের টুর্নামেন্টের রেকর্ড</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Flag size={32} className="mx-auto text-orange-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">১০+</h3>
              <p className="text-slate-400 text-sm">টুর্নামেন্ট আয়োজন</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Users size={32} className="mx-auto text-orange-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">৩২+</h3>
              <p className="text-slate-400 text-sm">অংশগ্রহণকারী দল</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Activity size={32} className="mx-auto text-orange-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">৫০০+</h3>
              <p className="text-slate-400 text-sm">খেলোয়াড়</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Medal size={32} className="mx-auto text-orange-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">১০০০+</h3>
              <p className="text-slate-400 text-sm">দর্শক সমাগম</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SPONSORSHIP PACKAGES --- */}
      <section id="sponsor" className="py-24 bg-orange-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">টুর্নামেন্টে যুক্ত হোন</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">স্পন্সর অথবা টিম রেজিস্ট্রেশন</h2>
            <div className="w-20 h-1.5 bg-orange-500 mx-auto rounded-full mt-4"></div>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              ক্রীড়া আয়োজনে আর্থিকভাবে সহায়তা করে অথবা আপনার নিজের টিম নিয়ে টুর্নামেন্টে অংশগ্রহণ করে আমাদের সাথে যুক্ত হতে পারেন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Package 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-orange-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-orange-400"></div>
              <ShieldCheck size={48} className="mx-auto text-orange-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">জার্সি স্পন্সর</h3>
              <div className="text-4xl font-extrabold text-orange-600 mb-2">৳ ৩,০০০</div>
              <p className="text-slate-500 text-sm mb-8">একটি টিমের জার্সিতে আপনার বা আপনার প্রতিষ্ঠানের লোগো।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-orange-500"/> ১৫ টি জার্সি প্রদান</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-orange-500"/> ব্যানারে বিশেষ স্থান</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-orange-600 hover:text-white transition mt-auto">যোগাযোগ করুন</button>
            </div>

            {/* Package 2 (Popular) */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-amber-500 relative transform md:-translate-y-4 flex flex-col">
              <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
              <Users size={48} className="mx-auto text-amber-600 mb-4 fill-amber-50" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">টিম রেজিস্ট্রেশন</h3>
              <div className="text-5xl font-extrabold text-amber-600 mb-2">৳ ২,০০০</div>
              <p className="text-slate-500 text-xs mb-8">আপনার নিজস্ব দল নিয়ে আমাদের আগামী টুর্নামেন্টে অংশগ্রহণ করুন।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-amber-500"/> ১৫ জন খেলোয়াড়ের এন্ট্রি</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-amber-500"/> ফিক্সচার ও রুলস প্রদান</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-amber-500"/> ম্যান অফ দা ম্যাচ সুযোগ</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition shadow-lg mt-auto">রেজিস্ট্রেশন করুন</button>
            </div>

            {/* Package 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-orange-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-orange-400"></div>
              <Trophy size={48} className="mx-auto text-orange-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">ট্রফি ও মেডেল স্পন্সর</h3>
              <div className="text-4xl font-extrabold text-orange-600 mb-2">৳ ৫,০০০+</div>
              <p className="text-slate-500 text-sm mb-8">চ্যাম্পিয়ন, রানার-আপ ট্রফি ও খেলোয়াড়দের মেডেল স্পন্সর করুন।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-orange-500"/> বিশাল চ্যাম্পিয়ন ট্রফি</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-orange-500"/> অতিথি হিসেবে পুরস্কার বিতরণ</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-orange-600 hover:text-white transition mt-auto">যোগাযোগ করুন</button>
            </div>

          </div>

          {/* Payment Info */}
          <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-2xl border border-dashed border-orange-300 text-center">
            <h4 className="font-bold text-slate-700 mb-4 text-lg">পেমেন্ট ও রেজিস্ট্রেশন মাধ্যম</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-pink-50 text-pink-600 rounded-lg font-bold border border-pink-100">bKash: 017XXXXXXXX</div>
              <div className="px-6 py-3 bg-amber-50 text-amber-600 rounded-lg font-bold border border-amber-100">Nagad: 017XXXXXXXX</div>
            </div>
            <p className="text-sm text-slate-500 mt-4">* রেফারেন্সে 'Harmony Cup' এবং টিমের নাম উল্লেখ করুন।</p>
          </div>
        </div>
      </section>

      {/* --- VOLUNTEER CTA --- */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-orange-50 p-4 rounded-full mb-4">
             <Target size={40} className="text-orange-600"/>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">আয়োজক কমিটিতে যুক্ত হতে চান?</h2>
          <p className="text-slate-600 max-w-xl mx-auto mb-8 text-lg">
            টুর্নামেন্ট পরিচালনা, রেফারিং বা সার্বিক শৃঙ্খলার দায়িত্বে ভলান্টিয়ার হিসেবে আমাদের সাথে কাজ করতে পারেন।
          </p>
          <Link href="/register-volunteer" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition shadow-lg hover:shadow-slate-300">
            <Activity size={20} /> ভলান্টিয়ার হিসেবে যুক্ত হোন
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}