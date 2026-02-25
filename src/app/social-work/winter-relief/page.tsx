'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Snowflake, Heart, Users, ArrowRight, 
  CheckCircle2, ThermometerSnowflake, 
  Wind, Gift, MapPin, PhoneCall, AlertTriangle
} from 'lucide-react';

// ৩ ধাপ পেছনে গিয়ে কম্পোনেন্ট ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function WinterReliefPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION (WINTER/BLUE THEME) --- */}
      <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transform scale-105 animate-slow-zoom" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544914167-939e6022e176?q=80&w=1600&auto=format&fit=crop')" }}
        ></div>
        {/* Overlay Gradient (Sky/Blue) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-blue-900/80 to-sky-900/40 z-10"></div>

        <div className="relative z-20 container mx-auto px-4 text-center mt-10">
          <div className="inline-flex items-center gap-2 bg-sky-500/30 border border-sky-400/50 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 animate-fadeInDown">
            <Snowflake size={18} className="text-sky-200" />
            <span className="text-sky-100 text-sm font-bold uppercase tracking-widest">উষ্ণতার ছোঁয়া</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            হাড়কাঁপানো শীতে <br/> 
            <span className="text-sky-300 text-3xl md:text-5xl">ভালোবাসার উষ্ণ চাদর</span>
          </h1>
          
          <p className="text-lg md:text-xl text-sky-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            উত্তরাঞ্চলের কনকনে শীতে যখন জনজীবন বিপর্যস্ত, তখন আপনার একটি ছোট উপহার বাঁচাতে পারে একটি শিশুর প্রাণ, ফোটাতে পারে একজন বৃদ্ধের হাসি।
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a href="#sponsor" className="bg-sky-500 text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-sky-400 transition shadow-lg shadow-sky-500/30 flex items-center justify-center gap-2">
              <Heart size={20} className="fill-slate-900 opacity-80" /> উষ্ণতা ছড়ান
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
              কেন চরাঞ্চলে <br/> <span className="text-sky-600">শীতবস্ত্র বিতরণ জরুরি?</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              সাঘাটা ও গাইবান্ধার চরাঞ্চলে নদী অববাহিকায় শীতের প্রকোপ শহরের চেয়ে বহুগুণ বেশি। কনকনে ঠান্ডা বাতাস আর ঘন কুয়াশায় এখানকার দিনমজুর ও কৃষকরা কাজে যেতে পারেন না। গরম কাপড়ের অভাবে শিশুরা নিউমোনিয়ায় এবং বৃদ্ধরা শ্বাসকষ্টে ভোগেন।
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 bg-sky-50 rounded-xl border border-sky-100 hover:shadow-md transition">
                <div className="bg-sky-100 p-2 rounded-full text-sky-600 shrink-0"><Wind size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">তীব্র শৈত্যপ্রবাহ</h4>
                  <p className="text-xs text-slate-500 mt-1">নদীর হিমেল হাওয়ায় বিপর্যস্ত জনজীবন।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600 shrink-0"><AlertTriangle size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">চরম দারিদ্র্য</h4>
                  <p className="text-xs text-slate-500 mt-1">শীতের পোশাক কেনার সামর্থ্য নেই।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100 hover:shadow-md transition">
                <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 shrink-0"><ThermometerSnowflake size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">স্বাস্থ্য ঝুঁকি</h4>
                  <p className="text-xs text-slate-500 mt-1">নিউমোনিয়া ও শ্বাসকষ্টের প্রকোপ।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-xl border border-teal-100 hover:shadow-md transition">
                <div className="bg-teal-100 p-2 rounded-full text-teal-600 shrink-0"><Users size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">অসহায় শিশু ও বৃদ্ধ</h4>
                  <p className="text-xs text-slate-500 mt-1">শীতে সবচেয়ে বেশি ঝুঁকিতে থাকে তারা।</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-sky-100 rounded-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1533552277427-449733083dbd?q=80&w=1000&auto=format&fit=crop" 
              alt="Winter Relief" 
              className="rounded-3xl shadow-2xl w-full object-cover h-[450px]"
            />
            {/* Stats Overlay */}
            <div className="absolute top-10 left-[-20px] bg-white p-6 rounded-2xl shadow-xl border-l-8 border-sky-500 animate-bounce-slow hidden md:block">
              <p className="text-sm text-slate-500 font-bold uppercase">প্রতি শীতে আমাদের লক্ষ্য</p>
              <p className="text-3xl font-extrabold text-sky-600">৫,০০০+ কম্বল</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- IMPACT BANNER --- */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold opacity-90">গত বছরের সাফল্য</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Gift size={32} className="mx-auto text-sky-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">৩,২০০+</h3>
              <p className="text-slate-400 text-sm">কম্বল বিতরণ</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Users size={32} className="mx-auto text-sky-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">১০,০০০+</h3>
              <p className="text-slate-400 text-sm">উপকৃত মানুষ</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <MapPin size={32} className="mx-auto text-sky-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">১২+</h3>
              <p className="text-slate-400 text-sm">গ্রাম কভার করা হয়েছে</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Heart size={32} className="mx-auto text-sky-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">১০০%</h3>
              <p className="text-slate-400 text-sm">স্বচ্ছতা ও আমানত</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SPONSORSHIP PACKAGES --- */}
      <section id="sponsor" className="py-24 bg-sky-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sky-600 font-bold uppercase tracking-wider text-sm">সহযোগিতার হাত বাড়ান</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">আপনার অনুদান প্যাকেজ বেছে নিন</h2>
            <div className="w-20 h-1.5 bg-sky-500 mx-auto rounded-full mt-4"></div>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              আপনার দেওয়া অনুদান দিয়ে আমরা সরাসরি কারখানা থেকে উন্নত মানের কম্বল কিনে মানুষের ঘরে পৌঁছে দিই।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Package 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-sky-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-sky-400"></div>
              <Snowflake size={48} className="mx-auto text-sky-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">একটি কম্বল</h3>
              <div className="text-4xl font-extrabold text-sky-600 mb-2">৳ ৫০০</div>
              <p className="text-slate-500 text-sm mb-8">একজন অসহায় মানুষের শীত নিবারণের জন্য যথেষ্ট।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-sky-500"/> উন্নত মানের কম্বল</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-sky-500"/> ভেরিফাইড গ্রহীতা</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-sky-600 hover:text-white transition mt-auto">দান করুন</button>
            </div>

            {/* Package 2 (Popular) */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-blue-500 relative transform md:-translate-y-4 flex flex-col">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
              <Users size={48} className="mx-auto text-blue-600 mb-4 fill-blue-50" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">ফ্যামিলি প্যাক</h3>
              <div className="text-5xl font-extrabold text-blue-700 mb-2">৳ ২,০০০</div>
              <p className="text-slate-500 text-xs mb-8">একটি পুরো পরিবারের শীতের সুরক্ষা নিশ্চিত করুন।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-blue-500"/> ২ টি বড় কম্বল</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-blue-500"/> বাচ্চাদের গরম কাপড়</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-blue-500"/> লোশন ও পেট্রোলিয়াম জেলি</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-lg mt-auto">এখনই স্পন্সর করুন</button>
            </div>

            {/* Package 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-sky-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-sky-400"></div>
              <Heart size={48} className="mx-auto text-sky-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">উষ্ণতার বন্ধু</h3>
              <div className="text-4xl font-extrabold text-sky-600 mb-2">৳ ৫,০০০+</div>
              <p className="text-slate-500 text-sm mb-8">১০ জন বা তার বেশি মানুষের মুখে হাসি ফোটাতে পারেন।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-sky-500"/> ১০ টি কম্বল বিতরণ</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-sky-500"/> ভিডিও ফুটেজ প্রদান</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-sky-600 hover:text-white transition mt-auto">যোগাযোগ করুন</button>
            </div>

          </div>

          {/* Payment Info */}
          <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-2xl border border-dashed border-sky-300 text-center">
            <h4 className="font-bold text-slate-700 mb-4 text-lg">অনুদান পাঠানোর মাধ্যম (Winter Fund)</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-pink-50 text-pink-600 rounded-lg font-bold border border-pink-100">bKash: 017XXXXXXXX</div>
              <div className="px-6 py-3 bg-orange-50 text-orange-600 rounded-lg font-bold border border-orange-100">Nagad: 017XXXXXXXX</div>
            </div>
            <p className="text-sm text-slate-500 mt-4">* রেফারেন্সে 'Winter' উল্লেখ করুন।</p>
          </div>
        </div>
      </section>

      {/* --- VOLUNTEER CTA --- */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-sky-50 p-4 rounded-full mb-4">
             <MapPin size={40} className="text-sky-600"/>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">আমাদের সাথে কম্বল বিতরণে যেতে চান?</h2>
          <p className="text-slate-600 max-w-xl mx-auto mb-8 text-lg">
            শীতের রাতে মানুষের দ্বারে দ্বারে গিয়ে কম্বল বিতরণের এই মানবিক কাজে স্বেচ্ছাসেবক হিসেবে যোগ দিন।
          </p>
          <Link href="/register-volunteer" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-sky-600 transition shadow-lg hover:shadow-slate-300">
            <Users size={20} /> ভলান্টিয়ার হিসেবে যুক্ত হোন
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}