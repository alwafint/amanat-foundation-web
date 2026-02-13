'use client';

import React from 'react';
import Link from 'next/link';
import { 
  TreeDeciduous, Sprout, Heart, Leaf, 
  CloudRain, Wind, ArrowRight, CheckCircle2, 
  PhoneCall, Users 
} from 'lucide-react';

// ৩ ধাপ পেছনে গিয়ে কম্পোনেন্ট ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function TreePlantationPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb7d5fa5?q=80&w=1600&auto=format&fit=crop')" }}
        ></div>
        {/* Overlay Gradient (Greenish) */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-emerald-900/70 to-transparent z-10"></div>

        <div className="relative z-20 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/30 border border-green-400/50 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 animate-fadeInDown">
            <Leaf size={18} className="text-green-300" />
            <span className="text-green-100 text-sm font-bold uppercase tracking-wider">মিশন সবুজ বাংলাদেশ</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            আগামীর জন্য একটি <br/> 
            <span className="text-green-400">সবুজ পৃথিবী গড়ি</span>
          </h1>
          
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            একটি গাছ শুধু অক্সিজেন দেয় না, এটি আগামীর প্রজন্মের জন্য একটি আমানত। জলবায়ু পরিবর্তন ও নদী ভাঙন রোধে আসুন আমরা সবাই মিলে গাছ লাগাই।
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a href="#donate" className="bg-green-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-green-500 transition shadow-lg shadow-green-500/40 flex items-center justify-center gap-2">
              <Sprout size={20}/> গাছ উপহার দিন
            </a>
            <a href="#impact" className="bg-white/10 border border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition flex items-center justify-center gap-2">
              আমাদের উদ্যোগ <ArrowRight size={20}/>
            </a>
          </div>
        </div>
      </div>

      {/* --- WHY TREE PLANTATION (Saghata Context) --- */}
      <section id="impact" className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-snug">
              কেন গাইবান্ধায় <br/> <span className="text-emerald-600">বৃক্ষরোপণ জরুরি?</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              সাঘাটা ও এর চরাঞ্চল প্রতি বছর নদী ভাঙন ও বন্যার শিকার হয়। মাটির ক্ষয় রোধ করতে এবং পরিবেশের ভারসাম্য রক্ষা করতে এখানে ব্যাপক বনায়ন প্রয়োজন। এছাড়াও, দরিদ্র পরিবারের পুষ্টির চাহিদা মেটাতে আমরা ফলের গাছ বিতরণে বেশি গুরুত্ব দিই।
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="bg-green-100 p-2 rounded-full text-green-700 shrink-0"><Wind size={24}/></div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">প্রাকৃতিক দুর্যোগ মোকাবিলা</h4>
                  <p className="text-sm text-slate-600">ঝড় ও জলোচ্ছ্বাস থেকে ঘরবাড়ি রক্ষা করতে গাছ প্রাকৃতিক ঢাল হিসেবে কাজ করে।</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="bg-emerald-100 p-2 rounded-full text-emerald-700 shrink-0"><CloudRain size={24}/></div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">অর্থনৈতিক স্বাবলম্বিতা</h4>
                  <p className="text-sm text-slate-600">ফলজ ও বনজ গাছ ভবিষ্যতে একটি পরিবারের আয়ের বড় উৎস হতে পারে।</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -bottom-6 -left-6 w-2/3 h-2/3 bg-green-100 rounded-full -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb7d5fa5?q=80&w=800&auto=format&fit=crop" 
              alt="Planting Trees" 
              className="rounded-3xl shadow-2xl w-full object-cover h-[500px]"
            />
            {/* Stats Card */}
            <div className="absolute top-10 left-[-20px] bg-white p-6 rounded-2xl shadow-xl border-l-8 border-green-500 animate-bounce-slow hidden md:block">
              <p className="text-sm text-slate-500 font-bold uppercase">এখন পর্যন্ত রোপণ</p>
              <p className="text-3xl font-extrabold text-green-600">১০,০০০+ গাছ</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TREE TYPES SECTION --- */}
      <section className="bg-emerald-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">আমরা কী ধরনের গাছ লাগাই?</h2>
            <p className="text-emerald-200 mt-2">এলাকার মাটি ও আবহাওয়া উপযোগী গাছ নির্বাচন করা হয়</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-emerald-700 rounded-2xl bg-emerald-800/30 hover:bg-emerald-800 transition">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🥭</span>
              </div>
              <h3 className="text-xl font-bold mb-2">ফলজ গাছ</h3>
              <p className="text-sm text-emerald-100">আম, জাম, কাঁঠাল, পেয়ারা। যা পুষ্টি ও আয় উভয়ই নিশ্চিত করে।</p>
            </div>
            <div className="text-center p-6 border border-emerald-700 rounded-2xl bg-emerald-800/30 hover:bg-emerald-800 transition">
              <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌲</span>
              </div>
              <h3 className="text-xl font-bold mb-2">বনজ গাছ</h3>
              <p className="text-sm text-emerald-100">মেহগনি, ইউক্যালিপটাস, আকাশমণি। যা কাঠ ও পরিবেশের জন্য জরুরি।</p>
            </div>
            <div className="text-center p-6 border border-emerald-700 rounded-2xl bg-emerald-800/30 hover:bg-emerald-800 transition">
              <div className="w-16 h-16 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-bold mb-2">ঔষধি গাছ</h3>
              <p className="text-sm text-emerald-100">নিম, তুলসী, অর্জুন। যা প্রাকৃতিকভাবে রোগ নিরাময়ে সাহায্য করে।</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- DONATION PACKAGES --- */}
      <section id="donate" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-green-600 font-bold uppercase tracking-wider text-sm">সদকায়ে জারিয়া</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">আপনার অনুদান প্যাকেজ</h2>
            <div className="w-20 h-1.5 bg-green-500 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Package 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-green-400 hover:shadow-xl transition text-center group relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-2 bg-green-400"></div>
              <Sprout size={48} className="mx-auto text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">একটি ফলের গাছ</h3>
              <div className="text-4xl font-extrabold text-green-600 mb-2">৳ ১০০</div>
              <p className="text-slate-500 text-sm mb-8">চারা ক্রয়, রোপণ ও প্রাথমিক পরিচর্যা সহ।</p>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-green-600 hover:text-white transition">দান করুন</button>
            </div>

            {/* Package 2 (Popular) */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-emerald-500 relative transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">BEST VALUE</div>
              <TreeDeciduous size={48} className="mx-auto text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">৫টি গাছের বান্ডিল</h3>
              <div className="text-5xl font-extrabold text-emerald-700 mb-2">৳ ৫০০</div>
              <p className="text-slate-500 text-xs mb-8">একটি দরিদ্র পরিবারকে ৫টি ফলের গাছ উপহার দিন।</p>
              <button className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition shadow-lg">এখনই দান করুন</button>
            </div>

            {/* Package 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-green-400 hover:shadow-xl transition text-center group relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-2 bg-green-400"></div>
              <Heart size={48} className="mx-auto text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">সবুজ বাগান</h3>
              <div className="text-4xl font-extrabold text-green-600 mb-2">৳ ২,০০০+</div>
              <p className="text-slate-500 text-sm mb-8">স্কুল, মাদ্রাসা বা রাস্তার ধারে ২০টি গাছ রোপণ।</p>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-green-600 hover:text-white transition">দান করুন</button>
            </div>

          </div>

          {/* Payment Info */}
          <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-2xl border border-dashed border-green-300 text-center">
            <h4 className="font-bold text-slate-700 mb-4 text-lg">অনুদান পাঠানোর মাধ্যম (Green Fund)</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-pink-50 text-pink-600 rounded-lg font-bold border border-pink-100">bKash: 017XXXXXXXX</div>
              <div className="px-6 py-3 bg-orange-50 text-orange-600 rounded-lg font-bold border border-orange-100">Nagad: 017XXXXXXXX</div>
            </div>
            <p className="text-sm text-slate-500 mt-4">* রেফারেন্সে 'Tree' উল্লেখ করুন।</p>
          </div>
        </div>
      </section>

      {/* --- VOLUNTEER CTA --- */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">আমাদের সাথে গাছ লাগাতে চান?</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            বর্ষাকালে আমাদের বৃক্ষরোপণ টিমের সাথে যোগ দিয়ে পরিবেশ রক্ষায় ভূমিকা রাখুন। ছাত্র-ছাত্রীদের জন্য এটি একটি দারুণ সামাজিক কাজ।
          </p>
          <a href="tel:017XXXXXXXX" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-500 transition shadow-lg">
            <PhoneCall size={20}/> যোগাযোগ করুন
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}