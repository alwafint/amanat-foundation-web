'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  GraduationCap, BookOpen, Heart, Users, 
  Target, CheckCircle2, ArrowRight, PhoneCall 
} from 'lucide-react';

// ৩ ধাপ পেছনে গিয়ে কম্পোনেন্ট ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function ScholarshipPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-emerald-900/80 z-10"></div>

        <div className="relative z-20 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-400/50 backdrop-blur-md px-4 py-1.5 rounded-full mb-6">
            <GraduationCap size={18} className="text-yellow-300" />
            <span className="text-yellow-100 text-sm font-bold uppercase tracking-wider">আমানত মেধাবৃত্তি ২০২৫</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            টাকার অভাবে যেন থেমে না যায় <br/> 
            <span className="text-yellow-400">কোনো মেধাবীর স্বপ্ন</span>
          </h1>
          
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            দরিদ্র কিন্তু অদম্য মেধাবী শিক্ষার্থীদের উচ্চ শিক্ষার পথ সুগম করতে আমরা দিচ্ছি মাসিক বৃত্তি ও শিক্ষা উপকরণ। আপনার জাকাত বা সদকা গড়তে পারে একটি উজ্জ্বল ভবিষ্যৎ।
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a href="#sponsor" className="bg-yellow-500 text-emerald-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition shadow-lg shadow-yellow-500/30 flex items-center justify-center gap-2">
              <Heart size={20} fill="black" className="opacity-80"/> স্পন্সর হোন (ডোনেট)
            </a>
            <a href="#criteria" className="bg-white/10 border border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition flex items-center justify-center gap-2">
              বৃত্তির নিয়মাবলী <ArrowRight size={20}/>
            </a>
          </div>
        </div>
      </div>

      {/* --- MISSION STATEMENT --- */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-snug">
              কেন আমাদের এই <br/> <span className="text-emerald-600">শিক্ষা বৃত্তি কার্যক্রম?</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              বাংলাদেশে প্রতি বছর হাজার হাজার শিক্ষার্থী জিপিএ-৫ পাওয়ার পরেও শুধুমাত্র আর্থিক অনটনের কারণে পড়াশোনা বন্ধ করে দিতে বাধ্য হয়। বিশেষ করে চরাঞ্চলের পরিবারগুলোর পক্ষে সন্তানের কলেজ বা বিশ্ববিদ্যালয়ের খরচ চালানো অসম্ভব হয়ে পড়ে।
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-emerald-100">
                <div className="bg-emerald-100 w-10 h-10 rounded-full flex items-center justify-center text-emerald-600 mb-3"><Target size={20}/></div>
                <h4 className="font-bold text-slate-800">ঝরে পড়া রোধ</h4>
                <p className="text-sm text-slate-500 mt-1">মাধ্যমিক ও উচ্চ মাধ্যমিক পর্যায়ে ড্রপআউট কমানো।</p>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-emerald-100">
                <div className="bg-emerald-100 w-10 h-10 rounded-full flex items-center justify-center text-emerald-600 mb-3"><BookOpen size={20}/></div>
                <h4 className="font-bold text-slate-800">উচ্চ শিক্ষা নিশ্চিত</h4>
                <p className="text-sm text-slate-500 mt-1">মেধাবীদের ডাক্তার বা ইঞ্জিনিয়ার হওয়ার স্বপ্ন পূরণ।</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-2/3 h-2/3 bg-yellow-100 rounded-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000&auto=format&fit=crop" 
              alt="Students Studying" 
              className="rounded-3xl shadow-2xl w-full object-cover h-[450px]"
            />
            {/* Overlay Card */}
            <div className="absolute bottom-8 left-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs animate-bounce-slow">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-emerald-600 text-white p-2 rounded-full"><Users size={18}/></div>
                <p className="font-bold text-slate-800">২০০+ শিক্ষার্থী</p>
              </div>
              <p className="text-sm text-slate-500">বর্তমানে আমাদের বৃত্তির আওতায় পড়াশোনা করছে।</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ELIGIBILITY & FACILITIES (CRITERIA) --- */}
      <section id="criteria" className="bg-emerald-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">কাদের জন্য এই বৃত্তি?</h2>
            <div className="w-20 h-1.5 bg-yellow-500 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl text-center hover:bg-white/20 transition duration-300">
              <h3 className="text-xl font-bold text-yellow-300 mb-4">এসএসসি ও এইচএসসি</h3>
              <p className="text-emerald-100 mb-6 text-sm">যারা জিপিএ ৫ পেয়েছে কিন্তু অর্থাভাবে কলেজে ভর্তি হতে পারছে না।</p>
              <ul className="text-left space-y-3 text-sm text-emerald-50">
                <li className="flex gap-2"><CheckCircle2 className="text-yellow-400" size={16}/> মাসিক ২০০০ টাকা বৃত্তি</li>
                <li className="flex gap-2"><CheckCircle2 className="text-yellow-400" size={16}/> এককালীন বই কেনার অনুদান</li>
              </ul>
            </div>

            <div className="bg-emerald-800 border-2 border-yellow-500 p-8 rounded-3xl text-center transform md:-translate-y-4 shadow-2xl relative">
              <div className="absolute top-0 right-0 bg-yellow-500 text-emerald-900 text-xs font-bold px-3 py-1 rounded-bl-xl">FOCUS</div>
              <h3 className="text-xl font-bold text-white mb-4">বিশ্ববিদ্যালয় ভর্তিচ্ছু</h3>
              <p className="text-emerald-200 mb-6 text-sm">মেডিকেল বা পাবলিক ভার্সিটিতে ভর্তির কোচিং ও আবেদন ফি সহায়তা।</p>
              <ul className="text-left space-y-3 text-sm text-white">
                <li className="flex gap-2"><CheckCircle2 className="text-yellow-400" size={16}/> কোচিং ফি সম্পূর্ণ ফ্রি</li>
                <li className="flex gap-2"><CheckCircle2 className="text-yellow-400" size={16}/> ঢাকায় থাকার ব্যবস্থা</li>
                <li className="flex gap-2"><CheckCircle2 className="text-yellow-400" size={16}/> আবেদন ফর্মের খরচ বহন</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl text-center hover:bg-white/20 transition duration-300">
              <h3 className="text-xl font-bold text-yellow-300 mb-4">এতিম ও হাফেজ</h3>
              <p className="text-emerald-100 mb-6 text-sm">মাদ্রাসায় অধ্যয়নরত এতিম শিশু ও হিফজ বিভাগের ছাত্ররা।</p>
              <ul className="text-left space-y-3 text-sm text-emerald-50">
                <li className="flex gap-2"><CheckCircle2 className="text-yellow-400" size={16}/> মাসিক খোরাকি খরচ</li>
                <li className="flex gap-2"><CheckCircle2 className="text-yellow-400" size={16}/> বাৎসরিক পোশাক ও চিকিৎসা</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- SPONSORSHIP PACKAGES --- */}
      <section id="sponsor" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">একজন অভিভাবক হোন</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">আপনার স্পন্সরশিপ প্যাকেজ</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              আপনি চাইলে একজন ছাত্রের সম্পূর্ণ পড়ার খরচ বহন করতে পারেন অথবা সাধারণ ফান্ডে যেকোনো পরিমাণ দান করতে পারেন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Package 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-emerald-400 hover:shadow-xl transition text-center">
              <h3 className="text-lg font-bold text-slate-600 mb-2">স্কুল ছাত্র</h3>
              <div className="text-4xl font-extrabold text-emerald-600 mb-2">৳ ১,০০০</div>
              <p className="text-slate-400 text-xs mb-6">প্রতি মাস</p>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-emerald-600 hover:text-white transition">স্পন্সর করুন</button>
            </div>

            {/* Package 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-yellow-400 relative transform md:-translate-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-emerald-900 px-4 py-1 rounded-full text-xs font-bold shadow-sm">RECOMMENDED</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">কলেজ/মাদ্রাসা ছাত্র</h3>
              <div className="text-5xl font-extrabold text-emerald-700 mb-2">৳ ২,০০০</div>
              <p className="text-slate-500 text-xs mb-8">প্রতি মাস</p>
              <button className="w-full py-3 rounded-xl bg-yellow-400 text-emerald-900 font-bold hover:bg-yellow-500 transition shadow-lg">স্পন্সর করুন</button>
            </div>

            {/* Package 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-emerald-400 hover:shadow-xl transition text-center">
              <h3 className="text-lg font-bold text-slate-600 mb-2">মেডিকেল/ভার্সিটি</h3>
              <div className="text-4xl font-extrabold text-emerald-600 mb-2">৳ ৫,০০০</div>
              <p className="text-slate-400 text-xs mb-6">প্রতি মাস</p>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-emerald-600 hover:text-white transition">স্পন্সর করুন</button>
            </div>

          </div>

          {/* Payment Info */}
          <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-2xl border border-dashed border-emerald-300 text-center">
            <h4 className="font-bold text-slate-700 mb-4 text-lg">অনুদান পাঠানোর মাধ্যম (Education Fund)</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-pink-50 text-pink-600 rounded-lg font-bold border border-pink-100">bKash: 017XXXXXXXX</div>
              <div className="px-6 py-3 bg-orange-50 text-orange-600 rounded-lg font-bold border border-orange-100">Nagad: 017XXXXXXXX</div>
            </div>
            <p className="text-sm text-slate-500 mt-4">* রেফারেন্সে 'Education' বা 'Zakat' উল্লেখ করুন। আমরা জাকাত ফান্ডের টাকা আলাদা রাখি।</p>
          </div>
        </div>
      </section>

      {/* --- CONTACT CTA --- */}
      <section className="bg-emerald-50 py-16 border-t border-emerald-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-emerald-900 mb-4">আপনার এলাকায় কোনো মেধাবী ছাত্র আছে?</h2>
          <p className="text-emerald-700 max-w-xl mx-auto mb-8">
            যদি এমন কাউকে চেনেন যার পড়াশোনা টাকার অভাবে বন্ধ হতে চলেছে, তবে আমাদের জানান। আমরা খোঁজ নিয়ে পাশে দাঁড়াব।
          </p>
          <a href="tel:017XXXXXXXX" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition shadow-lg">
            <PhoneCall size={20}/> তথ্য দিন
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}