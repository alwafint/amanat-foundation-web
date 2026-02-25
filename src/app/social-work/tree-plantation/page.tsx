'use client';

import React from 'react';
import Link from 'next/link';
import { 
  TreeDeciduous, Sprout, Heart, Leaf, 
  CloudRain, Wind, ArrowRight, CheckCircle2, 
  PhoneCall, MapPin, ShieldCheck
} from 'lucide-react';

// ৩ ধাপ পেছনে গিয়ে কম্পোনেন্ট ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function TreePlantationPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION (GREEN / NATURE THEME) --- */}
      <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transform scale-105 animate-slow-zoom" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb7d5fa5?q=80&w=1600&auto=format&fit=crop')" }}
        ></div>
        {/* Overlay Gradient (Emerald to Green) */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-emerald-900/80 to-transparent z-10"></div>

        <div className="relative z-20 container mx-auto px-4 text-center mt-10">
          <div className="inline-flex items-center gap-2 bg-green-500/30 border border-green-400/50 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 animate-fadeInDown">
            <Leaf size={18} className="text-green-300 fill-green-300" />
            <span className="text-green-100 text-sm font-bold uppercase tracking-widest">প্রজেক্ট সবুজায়ন</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            একটি গাছ, একটি প্রাণ <br/> 
            <span className="text-green-400 text-3xl md:text-5xl">আগামী প্রজন্মের জন্য অনুদান</span>
          </h1>
          
          <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            জলবায়ু পরিবর্তনের ঝুঁকি মোকাবিলা এবং দরিদ্র পরিবারের অর্থনৈতিক নিশ্চয়তার জন্য আমানত ফাউন্ডেশন দেশজুড়ে লাখো গাছ লাগানোর উদ্যোগ নিয়েছে।
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a href="#sponsor" className="bg-green-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-green-500 transition shadow-lg shadow-green-600/30 flex items-center justify-center gap-2">
              <Sprout size={20} /> গাছ উপহার দিন
            </a>
            <a href="#activities" className="bg-white/10 border border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition flex items-center justify-center gap-2">
              প্রকল্পের গুরুত্ব <ArrowRight size={20}/>
            </a>
          </div>
        </div>
      </div>

      {/* --- REALITY CHECK / WHY WE DO THIS --- */}
      <section id="activities" className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-snug">
              কেন আমরা <br/> <span className="text-emerald-600">গাছ লাগাচ্ছি?</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              নদী ভাঙন, খরা আর অতিরিক্ত তাপমাত্রার কারণে আমাদের গ্রামীণ জীবনযাত্রা হুমকির মুখে। একটি ফলের গাছ শুধু পরিবেশকেই রক্ষা করে না, বরং একটি দরিদ্র পরিবারের জন্য পুষ্টি ও দীর্ঘমেয়াদী আয়ের উৎস হয়ে দাঁড়ায়।
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100 hover:shadow-md transition">
                <div className="bg-green-100 p-2 rounded-full text-green-600 shrink-0"><Wind size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">প্রাকৃতিক দুর্যোগ রোধ</h4>
                  <p className="text-xs text-slate-500 mt-1">বন্যা ও ঝড় থেকে ঘরবাড়ি রক্ষা করা।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100 hover:shadow-md transition">
                <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 shrink-0"><Sprout size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">অর্থনৈতিক মুক্তি</h4>
                  <p className="text-xs text-slate-500 mt-1">ফলের গাছ থেকে দরিদ্র পরিবারের আয় বৃদ্ধি।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-xl border border-teal-100 hover:shadow-md transition">
                <div className="bg-teal-100 p-2 rounded-full text-teal-600 shrink-0"><CloudRain size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">পরিবেশের ভারসাম্য</h4>
                  <p className="text-xs text-slate-500 mt-1">অক্সিজেন বৃদ্ধি এবং তাপপ্রবাহ কমানো।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-lime-50 rounded-xl border border-lime-100 hover:shadow-md transition">
                <div className="bg-lime-100 p-2 rounded-full text-lime-600 shrink-0"><ShieldCheck size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">সদকায়ে জারিয়া</h4>
                  <p className="text-xs text-slate-500 mt-1">গাছ বেঁচে থাকা পর্যন্ত ছওয়াব পাওয়ার সুযোগ।</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-2/3 h-2/3 bg-green-100 rounded-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=1000&auto=format&fit=crop" 
              alt="Planting Tree" 
              className="rounded-3xl shadow-2xl w-full object-cover h-[450px]"
            />
            {/* Stats Overlay */}
            <div className="absolute bottom-8 left-[-20px] bg-white p-6 rounded-2xl shadow-xl border-l-8 border-green-500 animate-bounce-slow hidden md:block">
              <p className="text-sm text-slate-500 font-bold uppercase">আমাদের লক্ষ্যমাত্রা</p>
              <p className="text-3xl font-extrabold text-green-600">৫০,০০০+ চারা</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TREE TYPES BANNER --- */}
      <section className="bg-emerald-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">আমরা কী ধরনের গাছ লাগাই?</h2>
            <p className="text-emerald-200 mt-2">এলাকার মাটি ও আবহাওয়া উপযোগী গাছ নির্বাচন করা হয়</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
              <p className="text-sm text-emerald-100">মেহগনি, কড়ই। যা কাঠ ও পরিবেশের জন্য জরুরি।</p>
            </div>
            <div className="text-center p-6 border border-emerald-700 rounded-2xl bg-emerald-800/30 hover:bg-emerald-800 transition">
              <div className="w-16 h-16 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-bold mb-2">ঔষধি গাছ</h3>
              <p className="text-sm text-emerald-100">নিম, অর্জুন। যা প্রাকৃতিকভাবে রোগ নিরাময়ে সাহায্য করে।</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SPONSORSHIP PACKAGES --- */}
      <section id="sponsor" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-green-600 font-bold uppercase tracking-wider text-sm">সদকায়ে জারিয়া</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">আপনার অনুদান প্যাকেজ বেছে নিন</h2>
            <div className="w-20 h-1.5 bg-green-500 mx-auto rounded-full mt-4"></div>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              আপনার দেওয়া টাকায় আমরা সঠিক চারা কিনে মেম্বারদের হাতে তুলে দিই এবং রোপণ নিশ্চিত করি।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Package 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-green-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-green-400"></div>
              <Sprout size={48} className="mx-auto text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">১টি ফলের চারা</h3>
              <div className="text-4xl font-extrabold text-green-600 mb-2">৳ ১০০</div>
              <p className="text-slate-500 text-sm mb-8">চারা ক্রয়, রোপণ ও প্রাথমিক পরিচর্যার খরচ।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-500"/> উন্নত জাতের চারা</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-500"/> কৃষকের হাতে হস্তান্তর</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-green-600 hover:text-white transition mt-auto">দান করুন</button>
            </div>

            {/* Package 2 (Popular) */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-emerald-500 relative transform md:-translate-y-4 flex flex-col">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
              <TreeDeciduous size={48} className="mx-auto text-emerald-600 mb-4 fill-emerald-100" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">৫টি গাছের ফ্যামিলি প্যাক</h3>
              <div className="text-5xl font-extrabold text-emerald-700 mb-2">৳ ৫০০</div>
              <p className="text-slate-500 text-xs mb-8">একটি দরিদ্র পরিবারকে ৫টি ফলজ ও বনজ গাছ উপহার দিন।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> মিশ্র গাছের চারা</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> পরিবারের আয় বৃদ্ধি</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> আজীবন ছওয়াবের সুযোগ</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition shadow-lg mt-auto">এখনই স্পন্সর করুন</button>
            </div>

            {/* Package 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-green-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-green-400"></div>
              <Leaf size={48} className="mx-auto text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">সবুজ গ্রাম (২০টি গাছ)</h3>
              <div className="text-4xl font-extrabold text-green-600 mb-2">৳ ২,০০০</div>
              <p className="text-slate-500 text-sm mb-8">মসজিদ, স্কুল বা রাস্তার ধারে গাছ লাগানো।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-500"/> কমিউনিটি বনায়ন</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-500"/> পরিবেশ রক্ষায় ভূমিকা</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-green-600 hover:text-white transition mt-auto">যোগাযোগ করুন</button>
            </div>

          </div>

          {/* Payment Info */}
          <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-2xl border border-dashed border-green-300 text-center">
            <h4 className="font-bold text-slate-700 mb-4 text-lg">অনুদান পাঠানোর মাধ্যম (Green Fund)</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-pink-50 text-pink-600 rounded-lg font-bold border border-pink-100">bKash: 017XXXXXXXX</div>
              <div className="px-6 py-3 bg-orange-50 text-orange-600 rounded-lg font-bold border border-orange-100">Nagad: 017XXXXXXXX</div>
            </div>
            <p className="text-sm text-slate-500 mt-4">* রেফারেন্সে 'Tree' বা 'Gach' উল্লেখ করুন।</p>
          </div>
        </div>
      </section>

      {/* --- CALL TO VOLUNTEERS CTA --- */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-green-50 p-4 rounded-full mb-4">
             <MapPin size={40} className="text-green-600"/>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">আমাদের সাথে গাছ লাগাতে চান?</h2>
          <p className="text-slate-600 max-w-xl mx-auto mb-8 text-lg">
            বর্ষা মৌসুমে আমাদের বৃক্ষরোপণ টিমের সাথে যোগ দিয়ে নিজ হাতে গাছ লাগান। পরিবেশ রক্ষায় আপনার এই অংশগ্রহণ আমরা সাধুবাদ জানাই।
          </p>
          <Link href="/register-volunteer" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-green-600 transition shadow-lg hover:shadow-slate-300">
            <TreeDeciduous size={20} /> ভলান্টিয়ার হিসেবে যুক্ত হোন
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}