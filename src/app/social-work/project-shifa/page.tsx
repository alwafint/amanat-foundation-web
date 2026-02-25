'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Stethoscope, Heart, Activity, Pill, 
  ArrowRight, CheckCircle2, ShieldPlus, 
  Users, MapPin, Calendar, HeartPulse 
} from 'lucide-react';

// ৩ ধাপ পেছনে গিয়ে কম্পোনেন্ট ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function ProjectShifaPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION (EMOTIONAL & MEDICAL THEME) --- */}
      <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transform scale-105 animate-slow-zoom" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1600&auto=format&fit=crop')" }}
        ></div>
        {/* Overlay Gradient (Rose/Red) */}
        <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-rose-900/80 to-transparent z-10"></div>

        <div className="relative z-20 container mx-auto px-4 text-center mt-10">
          <div className="inline-flex items-center gap-2 bg-rose-500/30 border border-rose-400/50 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 animate-fadeInDown">
            <Stethoscope size={18} className="text-rose-200" />
            <span className="text-rose-100 text-sm font-bold uppercase tracking-widest">Project Shifa</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            প্রজেক্ট শিফা <br/> 
            <span className="text-rose-400 text-3xl md:text-5xl">সুস্থ গ্রাম, সমৃদ্ধ জীবন।</span>
          </h1>
          
          <p className="text-lg md:text-xl text-rose-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            টাকার অভাবে যেন কোনো মানুষের চিকিৎসা বন্ধ না থাকে। গ্রামের অসহায় ও দরিদ্র মানুষের দোরগোড়ায় বিনামূল্যে স্বাস্থ্যসেবা পৌঁছে দেওয়াই আমাদের লক্ষ্য।
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a href="#sponsor" className="bg-rose-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-rose-500 transition shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2">
              <HeartPulse size={20} /> স্পন্সর করুন
            </a>
            <a href="#activities" className="bg-white/10 border border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition flex items-center justify-center gap-2">
              ক্যাম্পের বিবরণ <ArrowRight size={20}/>
            </a>
          </div>
        </div>
      </div>

      {/* --- REALITY CHECK / WHY WE DO THIS --- */}
      <section id="activities" className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-snug">
              কেন এই <br/> <span className="text-rose-600">ফ্রি হেলথ ক্যাম্প?</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              চরাঞ্চল বা প্রত্যন্ত গ্রামের মানুষ ছোটখাটো শারীরিক সমস্যায় ডাক্তারের কাছে যান না। ফলে পরবর্তীতে সেটি বড় আকার ধারণ করে। আমরা প্রতি মাসে বিশেষজ্ঞ ডাক্তার নিয়ে গ্রামে গ্রামে ক্যাম্প করি, যাতে মানুষ প্রাথমিক অবস্থায় চিকিৎসা ও বিনামূল্যে ঔষধ পেতে পারে।
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 bg-rose-50 rounded-xl border border-rose-100 hover:shadow-md transition">
                <div className="bg-rose-100 p-2 rounded-full text-rose-600 shrink-0"><Activity size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">প্রাথমিক চেকআপ</h4>
                  <p className="text-xs text-slate-500 mt-1">ব্লাড প্রেশার ও ডায়াবেটিস পরীক্ষা।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-rose-50 rounded-xl border border-rose-100 hover:shadow-md transition">
                <div className="bg-rose-100 p-2 rounded-full text-rose-600 shrink-0"><Pill size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">ফ্রি ঔষধ প্রদান</h4>
                  <p className="text-xs text-slate-500 mt-1">অসহায় রোগীদের প্রয়োজনীয় ঔষধ।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-rose-50 rounded-xl border border-rose-100 hover:shadow-md transition">
                <div className="bg-rose-100 p-2 rounded-full text-rose-600 shrink-0"><ShieldPlus size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">বিশেষজ্ঞ পরামর্শ</h4>
                  <p className="text-xs text-slate-500 mt-1">এমবিবিএস ডাক্তার দ্বারা রোগী দেখা।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-rose-50 rounded-xl border border-rose-100 hover:shadow-md transition">
                <div className="bg-rose-100 p-2 rounded-full text-rose-600 shrink-0"><HeartPulse size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">স্বাস্থ্য সচেতনতা</h4>
                  <p className="text-xs text-slate-500 mt-1">পুষ্টি ও পরিচ্ছন্নতা সম্পর্কে গাইডলাইন।</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-2/3 h-2/3 bg-rose-100 rounded-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1000&auto=format&fit=crop" 
              alt="Medical Camp" 
              className="rounded-3xl shadow-2xl w-full object-cover h-[450px]"
            />
            {/* Stats Overlay */}
            <div className="absolute bottom-8 left-[-20px] bg-white p-6 rounded-2xl shadow-xl border-l-8 border-rose-500 animate-bounce-slow hidden md:block">
              <p className="text-sm text-slate-500 font-bold uppercase">প্রতি ক্যাম্পে সেবা পান</p>
              <p className="text-3xl font-extrabold text-rose-600">২০০+ রোগী</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SPONSORSHIP PACKAGES --- */}
      <section id="sponsor" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-rose-600 font-bold uppercase tracking-wider text-sm">সদকায়ে জারিয়া ও যাকাত</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">মেডিকেল ক্যাম্প স্পন্সর করুন</h2>
            <div className="w-20 h-1.5 bg-rose-500 mx-auto rounded-full mt-4"></div>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              আপনার দেওয়া অনুদানেই কেনা হয় ঔষধ এবং ডাক্তারদের ফি। আপনার সামর্থ্য অনুযায়ী যেকোনো একটি প্যাকেজ বেছে নিন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Package 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-rose-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-rose-400"></div>
              <Pill size={48} className="mx-auto text-rose-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">৫ জন রোগীর ঔষধ</h3>
              <div className="text-4xl font-extrabold text-rose-600 mb-2">৳ ১,০০০</div>
              <p className="text-slate-500 text-sm mb-8">৫ জন অসহায় রোগীর সম্পূর্ণ ঔষধের খরচ বহন করুন।</p>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-rose-600 hover:text-white transition mt-auto">দান করুন</button>
            </div>

            {/* Package 2 (Popular) */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-rose-500 relative transform md:-translate-y-4 flex flex-col">
              <div className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
              <Users size={48} className="mx-auto text-rose-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">২০ জন রোগীর চিকিৎসা</h3>
              <div className="text-5xl font-extrabold text-rose-700 mb-2">৳ ৩,০০০</div>
              <p className="text-slate-500 text-xs mb-8">২০ জন রোগীর চেকআপ ও প্রয়োজনীয় ঔষধের ব্যবস্থা।</p>
              <button className="w-full py-3 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition shadow-lg mt-auto">এখনই স্পন্সর করুন</button>
            </div>

            {/* Package 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-rose-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-rose-400"></div>
              <HeartPulse size={48} className="mx-auto text-rose-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">পূর্ণাঙ্গ ক্যাম্প স্পন্সর</h3>
              <div className="text-4xl font-extrabold text-rose-600 mb-2">৳ ১৫,০০০</div>
              <p className="text-slate-500 text-sm mb-8">একটি গ্রামের পুরো একটি মেডিকেল ক্যাম্প আপনার নামে স্পন্সর করুন।</p>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-rose-600 hover:text-white transition mt-auto">যোগাযোগ করুন</button>
            </div>

          </div>

          {/* Payment Info */}
          <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-2xl border border-dashed border-rose-300 text-center">
            <h4 className="font-bold text-slate-700 mb-4 text-lg">অনুদান পাঠানোর মাধ্যম (Health Fund)</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-pink-50 text-pink-600 rounded-lg font-bold border border-pink-100">bKash: 017XXXXXXXX</div>
              <div className="px-6 py-3 bg-rose-50 text-rose-600 rounded-lg font-bold border border-rose-100">Nagad: 017XXXXXXXX</div>
            </div>
            <p className="text-sm text-slate-500 mt-4">* রেফারেন্সে 'Shifa' বা 'Health' উল্লেখ করুন।</p>
          </div>
        </div>
      </section>

      {/* --- CALL TO DOCTORS CTA --- */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-rose-50 p-4 rounded-full mb-4">
             <Stethoscope size={40} className="text-rose-600"/>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">আপনি কি একজন চিকিৎসক?</h2>
          <p className="text-slate-600 max-w-xl mx-auto mb-8 text-lg">
            আপনার সপ্তাহে মাত্র ১ দিনের সময় গ্রামের শত শত মানুষের জীবন বাঁচাতে পারে। আমাদের মেডিকেল ক্যাম্পে স্বেচ্ছাসেবী চিকিৎসক হিসেবে যোগ দিন।
          </p>
          <Link href="/register-volunteer" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition shadow-lg hover:shadow-slate-300">
            ডাক্তার হিসেবে যুক্ত হোন
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}