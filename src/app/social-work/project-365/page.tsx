'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Heart, CalendarDays, ArrowRight, CheckCircle2, 
  Smile, Sun, Coffee, Users, HandHeart, Sparkles
} from 'lucide-react';

// ৩ ধাপ পেছনে গিয়ে কম্পোনেন্ট ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function Project365Page() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION (KINDNESS/RED THEME) --- */}
      <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image (Kindness/Helping Vibe) */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transform scale-105 animate-slow-zoom" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593113565240-050f26e330d6?q=80&w=1600&auto=format&fit=crop')" }}
        ></div>
        {/* Overlay Gradient (Red/Slate) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-red-900/80 to-rose-900/40 z-10"></div>

        <div className="relative z-20 container mx-auto px-4 text-center mt-10">
          <div className="inline-flex items-center gap-2 bg-red-500/30 border border-red-400/50 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 animate-fadeInDown">
            <CalendarDays size={18} className="text-red-200" />
            <span className="text-red-100 text-sm font-bold uppercase tracking-widest">প্রতিদিন একটি ভালো কাজ</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            প্রজেক্ট ৩৬৫ <br/> 
            <span className="text-red-400 text-3xl md:text-5xl">ছোট ছোট ভালো কাজ, গড়বে সুখের সমাজ</span>
          </h1>
          
          <p className="text-lg md:text-xl text-red-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            একটি বছর, ৩৬৫ দিন। আমাদের ভলান্টিয়ারদের শপথ— প্রতিদিন অন্তত একটি করে ভালো কাজ করা। হতে পারে তা কোনো পথপ্রাণীকে খাবার দেওয়া, কিংবা একজন বৃদ্ধকে রাস্তা পার করে দেওয়া।
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a href="#sponsor" className="bg-red-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-red-500 transition shadow-lg shadow-red-600/30 flex items-center justify-center gap-2">
              <HandHeart size={20} className="text-white opacity-80" /> ফান্ডে যুক্ত হোন
            </a>
            <a href="#activities" className="bg-white/10 border border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition flex items-center justify-center gap-2">
              প্রজেক্ট সম্পর্কে <ArrowRight size={20}/>
            </a>
          </div>
        </div>
      </div>

      {/* --- REALITY CHECK / WHY WE DO THIS --- */}
      <section id="activities" className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-snug">
              কেন প্রতিদিন <br/> <span className="text-red-600">ভালো কাজ করা জরুরি?</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              বড় কোনো পরিবর্তনের জন্য সব সময় বড় ফান্ডের প্রয়োজন হয় না। প্রতিদিনের ছোট্ট একটি হাসি, একটি সাহায্য বা একটু সহানুভূতি পারে অন্যের পুরো দিনটি সুন্দর করে দিতে। আমরা চাই এই ছোট ছোট কাজের মাধ্যমে সমাজে মানবিকতার একটি বিশাল ঢেউ তৈরি করতে।
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100 hover:shadow-md transition">
                <div className="bg-red-100 p-2 rounded-full text-red-600 shrink-0"><Sun size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">ধারাবাহিকতা</h4>
                  <p className="text-xs text-slate-500 mt-1">মাঝে মাঝে নয়, প্রতিদিন অন্তত একটি ভালো কাজ করা।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-rose-50 rounded-xl border border-rose-100 hover:shadow-md transition">
                <div className="bg-rose-100 p-2 rounded-full text-rose-600 shrink-0"><Smile size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">মানসিক প্রশান্তি</h4>
                  <p className="text-xs text-slate-500 mt-1">অন্যের মুখে হাসি ফোটানোর মাধ্যমে নিজের আত্মতৃপ্তি।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100 hover:shadow-md transition">
                <div className="bg-orange-100 p-2 rounded-full text-orange-600 shrink-0"><Users size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">সহমর্মিতা বৃদ্ধি</h4>
                  <p className="text-xs text-slate-500 mt-1">সমাজের প্রতিটি মানুষের প্রতি ভালোবাসা তৈরি হওয়া।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-pink-50 rounded-xl border border-pink-100 hover:shadow-md transition">
                <div className="bg-pink-100 p-2 rounded-full text-pink-600 shrink-0"><Sparkles size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">ক্ষুদ্র থেকে বৃহৎ</h4>
                  <p className="text-xs text-slate-500 mt-1">আমাদের এই ছোট উদ্যোগ একদিন বিশাল ইমপ্যাক্ট ফেলবে।</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-red-100 rounded-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1000&auto=format&fit=crop" 
              alt="Random Acts of Kindness" 
              className="rounded-3xl shadow-2xl w-full object-cover h-[450px]"
            />
            {/* Stats Overlay */}
            <div className="absolute top-10 left-[-20px] bg-white p-6 rounded-2xl shadow-xl border-l-8 border-red-500 animate-bounce-slow hidden md:block">
              <p className="text-sm text-slate-500 font-bold uppercase">বছরে আমাদের লক্ষ্য</p>
              <p className="text-3xl font-extrabold text-red-600">১০,০০০+ ভালো কাজ</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- IMPACT BANNER --- */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold opacity-90">আমাদের ৩৬৫ দিনের ইমপ্যাক্ট</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <CalendarDays size={32} className="mx-auto text-red-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">৩৬৫</h3>
              <p className="text-slate-400 text-sm">দিন অবিরত কার্যক্রম</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Heart size={32} className="mx-auto text-red-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">৫,০০০+</h3>
              <p className="text-slate-400 text-sm">ভালো কাজের রেকর্ড</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Users size={32} className="mx-auto text-red-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">৩০০+</h3>
              <p className="text-slate-400 text-sm">অ্যাকটিভ ভলান্টিয়ার</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Smile size={32} className="mx-auto text-red-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">অগণিত</h3>
              <p className="text-slate-400 text-sm">মানুষের মুখের হাসি</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SPONSORSHIP PACKAGES --- */}
      <section id="sponsor" className="py-24 bg-red-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-red-600 font-bold uppercase tracking-wider text-sm">সাদাকাহ ফান্ডে যুক্ত হোন</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">আপনার বিন্দু বিন্দু দান, গড়বে বড় ফান্ড</h2>
            <div className="w-20 h-1.5 bg-red-500 mx-auto rounded-full mt-4"></div>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              অনেক সময় একটি ছোট ভালো কাজের জন্য সামান্য অর্থের প্রয়োজন হয় (যেমন- পথশিশুকে খাবার কিনে দেওয়া)। আপনার ক্ষুদ্র দান আমাদের সেই কাজে সাহায্য করবে।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Package 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-red-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-red-400"></div>
              <Coffee size={48} className="mx-auto text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">দৈনিক সাদাকাহ</h3>
              <div className="text-4xl font-extrabold text-red-600 mb-2">৳ ৩০০ <span className="text-lg text-slate-400 font-medium">/মাস</span></div>
              <p className="text-slate-500 text-sm mb-8">প্রতিদিন মাত্র ১০ টাকা করে আমাদের ফান্ডে দান করুন।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-red-500"/> ছোট ছোট সাহায্যে ব্যবহৃত হবে</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-red-500"/> নিয়মিত দানের সওয়াব</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-red-600 hover:text-white transition mt-auto">দান করুন</button>
            </div>

            {/* Package 2 (Popular) */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-rose-500 relative transform md:-translate-y-4 flex flex-col">
              <div className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
              <Smile size={48} className="mx-auto text-rose-600 mb-4 fill-rose-50" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">স্মাইল প্যাক</h3>
              <div className="text-5xl font-extrabold text-rose-600 mb-2">৳ ১,০০০</div>
              <p className="text-slate-500 text-xs mb-8">৫ জন অসহায় মানুষকে একদিন সারপ্রাইজ খাবার বা উপহার দিন।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-rose-500"/> সারপ্রাইজ গিফট বা খাবার</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-rose-500"/> পথপ্রাণীদের খাবার ক্রয়</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-rose-500"/> ভলান্টিয়ারদের মাধ্যমে বিতরণ</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition shadow-lg mt-auto">স্মাইল স্পন্সর করুন</button>
            </div>

            {/* Package 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-red-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-red-400"></div>
              <Heart size={48} className="mx-auto text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">৩৬৫ ফান্ড</h3>
              <div className="text-4xl font-extrabold text-red-600 mb-2">৳ ৩,৬৫০</div>
              <p className="text-slate-500 text-sm mb-8">সারা বছর প্রতিদিন ১০ টাকা হিসেবে এককালীন দান করুন।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-red-500"/> সারাবছরের সাদাকাহ কভার</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-red-500"/> যেকোনো জরুরি ভালো কাজে ব্যয়</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-red-600 hover:text-white transition mt-auto">এককালীন দান করুন</button>
            </div>

          </div>

          {/* Payment Info */}
          <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-2xl border border-dashed border-red-300 text-center">
            <h4 className="font-bold text-slate-700 mb-4 text-lg">অনুদান পাঠানোর মাধ্যম (Project 365)</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-pink-50 text-pink-600 rounded-lg font-bold border border-pink-100">bKash: 017XXXXXXXX</div>
              <div className="px-6 py-3 bg-red-50 text-red-600 rounded-lg font-bold border border-red-100">Nagad: 017XXXXXXXX</div>
            </div>
            <p className="text-sm text-slate-500 mt-4">* রেফারেন্সে '365' বা 'Sadaqah' উল্লেখ করুন।</p>
          </div>
        </div>
      </section>

      {/* --- VOLUNTEER CTA --- */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-red-50 p-4 rounded-full mb-4">
             <Heart size={40} className="text-red-600 fill-red-100"/>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">৩৬৫ দিনের এই চ্যালেঞ্জ নিতে চান?</h2>
          <p className="text-slate-600 max-w-xl mx-auto mb-8 text-lg">
            প্রতিদিন অন্তত একটি ভালো কাজ করার শপথ নিন। আমাদের ভলান্টিয়ার টিমে যুক্ত হয়ে নিজের কাজগুলোর মাধ্যমে অন্যদের অনুপ্রাণিত করুন।
          </p>
          <Link href="/register-volunteer" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-red-600 transition shadow-lg hover:shadow-slate-300">
            <Users size={20} /> ৩৬৫ চ্যালেঞ্জে যুক্ত হোন
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}