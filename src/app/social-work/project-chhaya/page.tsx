'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Home, Heart, Baby, ArrowRight, CheckCircle2, 
  Users, Shirt, BookOpen, Scissors, PhoneCall, HandHeart 
} from 'lucide-react';

// ৩ ধাপ পেছনে গিয়ে কম্পোনেন্ট ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function ProjectChhayaPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION (EMOTIONAL & PURPLE THEME) --- */}
      <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transform scale-105 animate-slow-zoom" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=1600&auto=format&fit=crop')" }}
        ></div>
        {/* Overlay Gradient (Purple/Indigo) */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-900/80 to-transparent z-10"></div>

        <div className="relative z-20 container mx-auto px-4 text-center mt-10">
          <div className="inline-flex items-center gap-2 bg-purple-500/30 border border-purple-400/50 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 animate-fadeInDown">
            <Home size={18} className="text-purple-200" />
            <span className="text-purple-100 text-sm font-bold uppercase tracking-widest">Project Chhaya</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            প্রজেক্ট ছায়া <br/> 
            <span className="text-purple-300 text-3xl md:text-5xl">অসহায়দের মাথার ওপর ভালোবাসার ছাদ</span>
          </h1>
          
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            স্বামী হারানো নারী কিংবা বাবা-মা হারা এতিম শিশু— সমাজের এই অবহেলিত মানুষগুলোর জন্য একটি নিরাপদ আশ্রয় ও স্বাবলম্বী হওয়ার সুযোগ তৈরি করাই আমাদের লক্ষ্য।
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a href="#sponsor" className="bg-purple-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-purple-500 transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2">
              <Heart size={20} className="fill-white" /> স্পন্সর করুন
            </a>
            <a href="#activities" className="bg-white/10 border border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition flex items-center justify-center gap-2">
              কার্যক্রম জানুন <ArrowRight size={20}/>
            </a>
          </div>
        </div>
      </div>

      {/* --- REALITY CHECK / WHY WE DO THIS --- */}
      <section id="activities" className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-snug">
              কেন আমরা <br/> <span className="text-purple-600">প্রজেক্ট ছায়া শুরু করেছি?</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              পরিবারের একমাত্র উপার্জনক্ষম ব্যক্তিকে হারানোর পর একটি পরিবার অন্ধকারে নিমজ্জিত হয়। এতিম শিশুদের পড়াশোনা বন্ধ হয়ে যায় এবং বিধবা নারীদের অন্যের করুণার ওপর বাঁচতে হয়। আমরা তাদের করুণার পাত্র না বানিয়ে, সম্মানের সাথে বাঁচার পথ তৈরি করে দিই।
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100 hover:shadow-md transition">
                <div className="bg-purple-100 p-2 rounded-full text-purple-600 shrink-0"><Baby size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">এতিমদের ভরণপোষণ</h4>
                  <p className="text-xs text-slate-500 mt-1">থাকা, খাওয়া ও চিকিৎসার সম্পূর্ণ দায়িত্ব।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100 hover:shadow-md transition">
                <div className="bg-purple-100 p-2 rounded-full text-purple-600 shrink-0"><BookOpen size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">সুশিক্ষা নিশ্চিতকরণ</h4>
                  <p className="text-xs text-slate-500 mt-1">মাদ্রাসায় ও স্কুলে পড়ালেখার সুযোগ।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100 hover:shadow-md transition">
                <div className="bg-purple-100 p-2 rounded-full text-purple-600 shrink-0"><Scissors size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">বিধবাদের কর্মসংস্থান</h4>
                  <p className="text-xs text-slate-500 mt-1">সেলাই মেশিন বা গবাদিপশু কিনে দেওয়া।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100 hover:shadow-md transition">
                <div className="bg-purple-100 p-2 rounded-full text-purple-600 shrink-0"><Home size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">নিরাপদ আশ্রয়</h4>
                  <p className="text-xs text-slate-500 mt-1">ভাঙা ঘর মেরামত বা নতুন ঘর তৈরি।</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-2/3 h-2/3 bg-purple-100 rounded-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop" 
              alt="Orphan and Widow Support" 
              className="rounded-3xl shadow-2xl w-full object-cover h-[450px]"
            />
            {/* Stats Overlay */}
            <div className="absolute bottom-8 left-[-20px] bg-white p-6 rounded-2xl shadow-xl border-l-8 border-purple-500 animate-bounce-slow hidden md:block">
              <p className="text-sm text-slate-500 font-bold uppercase">আমাদের ছায়াতলে</p>
              <p className="text-3xl font-extrabold text-purple-600">১০০+ পরিবার</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- HADITH BANNER --- */}
      <section className="bg-purple-900 text-white py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="bg-purple-800 p-4 rounded-full"><HandHeart size={32} className="text-purple-300"/></div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold italic leading-relaxed">
                "বিধবা ও মিসকীনদের জন্য চেষ্টারত ব্যক্তি আল্লাহর রাস্তায় মুজাহিদের সমতুল্য।"
              </h3>
              <p className="text-purple-200 text-sm mt-2 font-bold">— সহীহ বুখারী</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SPONSORSHIP PACKAGES --- */}
      <section id="sponsor" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-bold uppercase tracking-wider text-sm">যাকাত ও সদকায়ে জারিয়া</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">আপনার অনুদান প্যাকেজ বেছে নিন</h2>
            <div className="w-20 h-1.5 bg-purple-500 mx-auto rounded-full mt-4"></div>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              আপনার দেওয়া যাকাত ও সাধারণ অনুদানের শতভাগ স্বচ্ছতার সাথে সরাসরি অসহায়দের কল্যাণে ব্যয় করা হয়।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Package 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-purple-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-purple-400"></div>
              <Baby size={48} className="mx-auto text-purple-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">একজন এতিমের দায়িত্ব</h3>
              <div className="text-4xl font-extrabold text-purple-600 mb-2">৳ ২,০০০</div>
              <p className="text-slate-500 text-sm mb-8">একজন এতিম শিশুর এক মাসের থাকা, খাওয়া ও পড়ার খরচ।</p>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-purple-600 hover:text-white transition mt-auto">স্পন্সর করুন</button>
            </div>

            {/* Package 2 (Popular) */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-500 relative transform md:-translate-y-4 flex flex-col">
              <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
              <Scissors size={48} className="mx-auto text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">বিধবা স্বাবলম্বী প্যাকেজ</h3>
              <div className="text-5xl font-extrabold text-purple-700 mb-2">৳ ১৫,০০০</div>
              <p className="text-slate-500 text-xs mb-8">একজন বিধবা নারীকে সেলাই মেশিন বা ছাগল কিনে দিয়ে স্থায়ী আয়ের ব্যবস্থা।</p>
              <button className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition shadow-lg mt-auto">এখনই দান করুন</button>
            </div>

            {/* Package 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-purple-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-purple-400"></div>
              <Home size={48} className="mx-auto text-purple-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">ছায়া ফান্ড (সাধারণ)</h3>
              <div className="text-4xl font-extrabold text-purple-600 mb-2">যেকোনো অংক</div>
              <p className="text-slate-500 text-sm mb-8">আপনার সামর্থ্য অনুযায়ী যেকোনো পরিমাণ টাকা ফান্ডে দান করতে পারেন।</p>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-purple-600 hover:text-white transition mt-auto">যোগাযোগ করুন</button>
            </div>

          </div>

          {/* Payment Info */}
          <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-2xl border border-dashed border-purple-300 text-center">
            <h4 className="font-bold text-slate-700 mb-4 text-lg">অনুদান পাঠানোর মাধ্যম (Zakat & Sadaqah Fund)</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-pink-50 text-pink-600 rounded-lg font-bold border border-pink-100">bKash: 017XXXXXXXX</div>
              <div className="px-6 py-3 bg-orange-50 text-orange-600 rounded-lg font-bold border border-orange-100">Nagad: 017XXXXXXXX</div>
            </div>
            <p className="text-sm text-slate-500 mt-4">* রেফারেন্সে 'Chhaya' অথবা 'Zakat' উল্লেখ করুন। আমরা যাকাতের টাকা সম্পূর্ণ আলাদাভাবে বণ্টন করি।</p>
          </div>
        </div>
      </section>

      {/* --- CALL TO VOLUNTEERS CTA --- */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-purple-50 p-4 rounded-full mb-4">
             <Users size={40} className="text-purple-600"/>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">আপনার এলাকায় কি এমন কেউ আছেন?</h2>
          <p className="text-slate-600 max-w-xl mx-auto mb-8 text-lg">
            আপনার আশেপাশে যদি এমন কোনো অসহায় এতিম বা বিধবা থাকেন যার সাহায্য প্রয়োজন, তবে আমাদের তথ্য দিন। আমাদের টিম যাচাই করে পাশে দাঁড়াবে।
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition shadow-lg hover:shadow-slate-300">
            <PhoneCall size={20} /> তথ্য দিন
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}