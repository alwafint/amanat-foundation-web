'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Gift, Heart, ArrowRight, CheckCircle2, 
  MoonStar, ShoppingBag, Utensils, Smile, 
  Users, HandHeart
} from 'lucide-react';

// ৩ ধাপ পেছনে গিয়ে কম্পোনেন্ট ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function MissionEhsanPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION (RAMADAN/EID/PINK THEME) --- */}
      <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image (Charity/Ramadan Vibe) */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transform scale-105 animate-slow-zoom" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?q=80&w=1600&auto=format&fit=crop')" }}
        ></div>
        {/* Overlay Gradient (Pink/Slate) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-pink-900/80 to-rose-900/40 z-10"></div>

        <div className="relative z-20 container mx-auto px-4 text-center mt-10">
          <div className="inline-flex items-center gap-2 bg-pink-500/30 border border-pink-400/50 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 animate-fadeInDown">
            <MoonStar size={18} className="text-pink-200" />
            <span className="text-pink-100 text-sm font-bold uppercase tracking-widest">রমাদান ও ইদ প্রজেক্ট</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            মিশন এহসান <br/> 
            <span className="text-pink-400 text-3xl md:text-5xl">ইদের খুশি ছড়িয়ে যাক প্রতিটি ঘরে</span>
          </h1>
          
          <p className="text-lg md:text-xl text-pink-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            রমাদানের রহমত এবং ইদের আনন্দ শুধুমাত্র সামর্থ্যবানদের জন্য নয়। সুবিধাবঞ্চিত শিশু ও অসহায় পরিবারগুলোর মুখে হাসি ফোটাতে আমাদের এই ক্ষুদ্র প্রয়াস।
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a href="#sponsor" className="bg-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-pink-500 transition shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2">
              <HandHeart size={20} className="text-white opacity-80" /> সাদাকাহ ও যাকাত দিন
            </a>
            <a href="#activities" className="bg-white/10 border border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition flex items-center justify-center gap-2">
              কার্যক্রমসমূহ <ArrowRight size={20}/>
            </a>
          </div>
        </div>
      </div>

      {/* --- REALITY CHECK / WHY WE DO THIS --- */}
      <section id="activities" className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-snug">
              কেন এই <br/> <span className="text-pink-600">আনন্দ ভাগাভাগি করা প্রয়োজন?</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              ইদের দিন যখন আমাদের শিশুরা নতুন জামা পরে আনন্দ করে, তখন অনেক এতিম ও দরিদ্র শিশু পুরনো ছেঁড়া জামা গায়ে দিয়ে দূর থেকে তাকিয়ে থাকে। রমাদানে যখন আমাদের টেবিলে হরেক রকম ইফতার থাকে, তখন অনেক পরিবার শুধু পানি পান করে রোজা ভাঙে। এই বৈষম্য দূর করে সবার মাঝে উৎসবের আনন্দ ছড়িয়ে দেওয়াই 'মিশন এহসান'-এর লক্ষ্য।
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 bg-pink-50 rounded-xl border border-pink-100 hover:shadow-md transition">
                <div className="bg-pink-100 p-2 rounded-full text-pink-600 shrink-0"><Utensils size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">ইফতার ও সেহরি</h4>
                  <p className="text-xs text-slate-500 mt-1">দরিদ্র রোজাদারদের মাঝে রান্না করা খাবার বিতরণ।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-rose-50 rounded-xl border border-rose-100 hover:shadow-md transition">
                <div className="bg-rose-100 p-2 rounded-full text-rose-600 shrink-0"><ShoppingBag size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">ইদের নতুন পোশাক</h4>
                  <p className="text-xs text-slate-500 mt-1">এতিম ও পথশিশুদের জন্য ইদের নতুন জামা ও জুতো।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-fuchsia-50 rounded-xl border border-fuchsia-100 hover:shadow-md transition">
                <div className="bg-fuchsia-100 p-2 rounded-full text-fuchsia-600 shrink-0"><Gift size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">ইদ উপহার সামগ্রী</h4>
                  <p className="text-xs text-slate-500 mt-1">সেমাই, চিনি, পোলাও চাল ও অন্যান্য বাজার প্রদান।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100 hover:shadow-md transition">
                <div className="bg-red-100 p-2 rounded-full text-red-600 shrink-0"><Heart size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">যাকাত ও ফিতরা</h4>
                  <p className="text-xs text-slate-500 mt-1">সঠিক হকদার যাচাই করে আমানত পৌঁছে দেওয়া।</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-pink-100 rounded-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1622340621360-1e5bfa75c613?q=80&w=1000&auto=format&fit=crop" 
              alt="Mission Ehsan Gifts" 
              className="rounded-3xl shadow-2xl w-full object-cover h-[450px]"
            />
            {/* Stats Overlay */}
            <div className="absolute top-10 left-[-20px] bg-white p-6 rounded-2xl shadow-xl border-l-8 border-pink-500 animate-bounce-slow hidden md:block">
              <p className="text-sm text-slate-500 font-bold uppercase">আমাদের লক্ষ্যমাত্রা</p>
              <p className="text-3xl font-extrabold text-pink-600">৫০০+ শিশুর হাসি</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- IMPACT BANNER --- */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold opacity-90">বিগত বছরের সাফল্য</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Utensils size={32} className="mx-auto text-pink-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">২,৫০০+</h3>
              <p className="text-slate-400 text-sm">ইফতার বিতরণ</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <ShoppingBag size={32} className="mx-auto text-pink-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">৩২০+</h3>
              <p className="text-slate-400 text-sm">নতুন পোশাক প্রদান</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Gift size={32} className="mx-auto text-pink-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">১৫০+</h3>
              <p className="text-slate-400 text-sm">পরিবারে ইদ বাজার</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Smile size={32} className="mx-auto text-pink-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">১০০%</h3>
              <p className="text-slate-400 text-sm">যাকাত ও ফিতরা বণ্টন</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SPONSORSHIP PACKAGES --- */}
      <section id="sponsor" className="py-24 bg-pink-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-pink-600 font-bold uppercase tracking-wider text-sm">আনন্দ ভাগাভাগি করুন</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">আপনার অনুদান প্যাকেজ বেছে নিন</h2>
            <div className="w-20 h-1.5 bg-pink-500 mx-auto rounded-full mt-4"></div>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              আপনার যাকাত, ফিতরা অথবা সাধারণ সাদাকাহ আমাদের মাধ্যমে পৌঁছে দিতে পারেন প্রকৃত হকদারদের হাতে।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Package 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-pink-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-pink-400"></div>
              <Utensils size={48} className="mx-auto text-pink-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">রোজাদারের ইফতার</h3>
              <div className="text-4xl font-extrabold text-pink-600 mb-2">৳ ৩০০</div>
              <p className="text-slate-500 text-sm mb-8">একজন দরিদ্র রোজাদারের একদিনের পুষ্টিকর ইফতারের ব্যবস্থা করুন।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-pink-500"/> স্বাস্থ্যসম্মত খাবার</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-pink-500"/> রোজাদারকে ইফতার করানোর সওয়াব</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-pink-600 hover:text-white transition mt-auto">দান করুন</button>
            </div>

            {/* Package 2 (Popular) */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-rose-500 relative transform md:-translate-y-4 flex flex-col">
              <div className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
              <ShoppingBag size={48} className="mx-auto text-rose-600 mb-4 fill-rose-50" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">ইদ আনন্দ প্যাকেজ</h3>
              <div className="text-5xl font-extrabold text-rose-600 mb-2">৳ ১,৫০০</div>
              <p className="text-slate-500 text-xs mb-8">একজন এতিম বা পথশিশুকে নতুন পোশাক কিনে দিয়ে তার মুখে হাসি ফোটান।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-rose-500"/> নতুন জামা ও প্যান্ট</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-rose-500"/> নতুন জুতো</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-rose-500"/> মেহেদি ও ছোট খেলনা</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition shadow-lg mt-auto">উপহার দিন</button>
            </div>

            {/* Package 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-pink-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-pink-400"></div>
              <Gift size={48} className="mx-auto text-pink-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">ফ্যামিলি বাজার প্যাক</h3>
              <div className="text-4xl font-extrabold text-pink-600 mb-2">৳ ৩,০০০+</div>
              <p className="text-slate-500 text-sm mb-8">একটি অসহায় পরিবারের পুরো মাসের রমাদান অথবা ইদের বাজারের খরচ।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-pink-500"/> চাল, ডাল, তেল ও ছোলা</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-pink-500"/> সেমাই, চিনি ও দুধ</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-pink-600 hover:text-white transition mt-auto">যোগাযোগ করুন</button>
            </div>

          </div>

          {/* Payment Info */}
          <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-2xl border border-dashed border-pink-300 text-center">
            <h4 className="font-bold text-slate-700 mb-4 text-lg">অনুদান পাঠানোর মাধ্যম (Ehsan Fund)</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-pink-50 text-pink-600 rounded-lg font-bold border border-pink-200">bKash: 017XXXXXXXX</div>
              <div className="px-6 py-3 bg-rose-50 text-rose-600 rounded-lg font-bold border border-rose-200">Nagad: 017XXXXXXXX</div>
            </div>
            <p className="text-sm text-slate-500 mt-4">* যাকাত/ফিতরা হলে রেফারেন্সে অবশ্যই 'Zakat' বা 'Fitrah' উল্লেখ করুন।</p>
          </div>
        </div>
      </section>

      {/* --- VOLUNTEER CTA --- */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-pink-50 p-4 rounded-full mb-4">
             <Heart size={40} className="text-pink-600 fill-pink-100"/>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">প্যাকিং ও বিতরণে অংশ নিতে চান?</h2>
          <p className="text-slate-600 max-w-xl mx-auto mb-8 text-lg">
            রমাদানের এই বরকতময় মাসে ইফতার তৈরি, ফুড প্যাক করা এবং শিশুদের মাঝে ইদ উপহার বিতরণে আমাদের ভলান্টিয়ার টিমে যোগ দিন।
          </p>
          <Link href="/register-volunteer" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-pink-600 transition shadow-lg hover:shadow-slate-300">
            <Users size={20} /> ভলান্টিয়ার হিসেবে যুক্ত হোন
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}