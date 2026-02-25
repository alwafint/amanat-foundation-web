'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Heart, Users, ArrowRight, CheckCircle2, 
  MapPin, Gift, BookOpen, Library, 
  Star, GraduationCap, Sparkles
} from 'lucide-react';

// ৩ ধাপ পেছনে গিয়ে কম্পোনেন্ট ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function AlokitoMaktobPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION (ISLAMIC EDUCATION/AMBER THEME) --- */}
      <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image (Quran/Maktab Vibe) */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transform scale-105 animate-slow-zoom" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574246604907-dbac3e3e2b2c?q=80&w=1600&auto=format&fit=crop')" }}
        ></div>
        {/* Overlay Gradient (Amber/Slate) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-amber-900/80 to-orange-900/40 z-10"></div>

        <div className="relative z-20 container mx-auto px-4 text-center mt-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/30 border border-amber-400/50 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 animate-fadeInDown">
            <BookOpen size={18} className="text-amber-200" />
            <span className="text-amber-100 text-sm font-bold uppercase tracking-widest">মক্তব উন্নয়ন ও শিশু শিক্ষা প্রকল্প</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            আলোকিত মক্তব <br/> 
            <span className="text-amber-400 text-3xl md:text-5xl">শিশুকাল থেকেই গড়বো নৈতিকতার ভিত্তি</span>
          </h1>
          
          <p className="text-lg md:text-xl text-amber-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            গ্রামের পিছিয়ে পড়া শিশুদের বিশুদ্ধ কুরআন তিলাওয়াত, ইসলামী শিষ্টাচার এবং মৌলিক শিক্ষায় শিক্ষিত করতে আমাদের এই উদ্যোগ। 
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a href="#sponsor" className="bg-amber-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-amber-500 transition shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2">
              <Heart size={20} className="fill-white opacity-80" /> সাদাকাহ করুন
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
              কেন চরাঞ্চলে <br/> <span className="text-amber-600">মক্তব প্রতিষ্ঠা জরুরি?</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              প্রত্যন্ত অঞ্চলে সঠিক ইসলামী শিক্ষার অভাব প্রকট। দারিদ্র্যের কারণে অনেক শিশু মক্তবে যেতে পারে না বা তাদের জন্য কোনো সুব্যবস্থা নেই। আমরা চাই প্রতিটি শিশু বিশুদ্ধভাবে কুরআন শিখুক এবং সুন্দর চরিত্রের অধিকারী হোক।
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100 hover:shadow-md transition">
                <div className="bg-amber-100 p-2 rounded-full text-amber-600 shrink-0"><BookOpen size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">বিশুদ্ধ কুরআন শিক্ষা</h4>
                  <p className="text-xs text-slate-500 mt-1">তাজভীদ সহকারে সহীহ তিলাওয়াত শেখানো।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100 hover:shadow-md transition">
                <div className="bg-orange-100 p-2 rounded-full text-orange-600 shrink-0"><Star size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">নৈতিকতা ও চরিত্র গঠন</h4>
                  <p className="text-xs text-slate-500 mt-1">ইসলামী শিষ্টাচার ও সুন্নতের আমল শেখানো।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-100 hover:shadow-md transition">
                <div className="bg-yellow-100 p-2 rounded-full text-yellow-600 shrink-0"><Library size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">বিনামূল্যে কিতাব বিতরণ</h4>
                  <p className="text-xs text-slate-500 mt-1">কায়দা, আমপারা ও কুরআন শরীফ প্রদান।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100 hover:shadow-md transition">
                <div className="bg-red-100 p-2 rounded-full text-red-600 shrink-0"><GraduationCap size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">যোগ্য শিক্ষক নিয়োগ</h4>
                  <p className="text-xs text-slate-500 mt-1">দক্ষ ও আমলদার ওস্তাদদের মাধ্যমে পাঠদান।</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-amber-100 rounded-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1604856608933-2ba936efc964?q=80&w=1000&auto=format&fit=crop" 
              alt="Alokito Maktob" 
              className="rounded-3xl shadow-2xl w-full object-cover h-[450px]"
            />
            {/* Stats Overlay */}
            <div className="absolute top-10 left-[-20px] bg-white p-6 rounded-2xl shadow-xl border-l-8 border-amber-500 animate-bounce-slow hidden md:block">
              <p className="text-sm text-slate-500 font-bold uppercase">আমাদের বাৎসরিক লক্ষ্য</p>
              <p className="text-3xl font-extrabold text-amber-600">১,০০০+ শিশু</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- IMPACT BANNER --- */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold opacity-90">আমাদের বর্তমান অর্জন</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Library size={32} className="mx-auto text-amber-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">১৫+</h3>
              <p className="text-slate-400 text-sm">মক্তব চালু</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <BookOpen size={32} className="mx-auto text-amber-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">৫০০+</h3>
              <p className="text-slate-400 text-sm">কুরআন বিতরণ</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <Users size={32} className="mx-auto text-amber-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">১,২০০+</h3>
              <p className="text-slate-400 text-sm">শিক্ষার্থী</p>
            </div>
            <div className="space-y-2 p-4 border border-slate-800 rounded-2xl bg-slate-800/50">
              <GraduationCap size={32} className="mx-auto text-amber-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">২০+</h3>
              <p className="text-slate-400 text-sm">শিক্ষক নিয়োগ</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SPONSORSHIP PACKAGES --- */}
      <section id="sponsor" className="py-24 bg-amber-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-bold uppercase tracking-wider text-sm">সাদাকাহ জারিয়া</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">আপনার স্পন্সর প্যাকেজ বেছে নিন</h2>
            <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full mt-4"></div>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              আপনার সামান্য অনুদান হতে পারে একটি শিশুর সারা জীবনের কুরআন শিক্ষার মাধ্যম এবং আপনার জন্য অনন্তকালের সাদাকাহ জারিয়া।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Package 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-amber-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-amber-400"></div>
              <Sparkles size={48} className="mx-auto text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">একজন শিক্ষার্থীর দায়িত্ব</h3>
              <div className="text-4xl font-extrabold text-amber-600 mb-2">৳ ৫০০ <span className="text-lg text-slate-400 font-medium">/মাস</span></div>
              <p className="text-slate-500 text-sm mb-8">একজন দরিদ্র শিক্ষার্থীর মাসিক পড়ালেখার সম্পূর্ণ খরচ।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-amber-500"/> কায়দা ও আমপারা</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-amber-500"/> খাতা, কলম ও উপকরণ</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-amber-600 hover:text-white transition mt-auto">দান করুন</button>
            </div>

            {/* Package 2 (Popular) */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-orange-500 relative transform md:-translate-y-4 flex flex-col">
              <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
              <BookOpen size={48} className="mx-auto text-orange-600 mb-4 fill-orange-50" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">কুরআনের আলো</h3>
              <div className="text-5xl font-extrabold text-orange-600 mb-2">৳ ১,০০০</div>
              <p className="text-slate-500 text-xs mb-8">মক্তবের শিশুদের জন্য পবিত্র কুরআন শরীফ ও রেহাল উপহার দিন।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-orange-500"/> ৫ জনের জন্য কুরআন শরীফ</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-orange-500"/> ৫ টি কাঠের রেহাল</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-orange-500"/> আজীবন সাদাকাহ জারিয়া</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition shadow-lg mt-auto">স্পন্সর করুন</button>
            </div>

            {/* Package 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-amber-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-amber-400"></div>
              <Library size={48} className="mx-auto text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">মক্তব স্পন্সর</h3>
              <div className="text-4xl font-extrabold text-amber-600 mb-2">৳ ৫,০০০ <span className="text-lg text-slate-400 font-medium">/মাস</span></div>
              <p className="text-slate-500 text-sm mb-8">একটি পুরো মক্তব পরিচালনার মাসিক ব্যয়ভার বহন করুন।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-amber-500"/> শিক্ষকের সম্মানানী</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-amber-500"/> ৩০-৪০ জন শিক্ষার্থীর ফ্রি শিক্ষা</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-amber-600 hover:text-white transition mt-auto">যোগাযোগ করুন</button>
            </div>

          </div>

          {/* Payment Info */}
          <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-2xl border border-dashed border-amber-300 text-center">
            <h4 className="font-bold text-slate-700 mb-4 text-lg">অনুদান পাঠানোর মাধ্যম (Maktab Fund)</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-pink-50 text-pink-600 rounded-lg font-bold border border-pink-100">bKash: 017XXXXXXXX</div>
              <div className="px-6 py-3 bg-orange-50 text-orange-600 rounded-lg font-bold border border-orange-100">Nagad: 017XXXXXXXX</div>
            </div>
            <p className="text-sm text-slate-500 mt-4">* রেফারেন্সে 'Maktab' উল্লেখ করুন।</p>
          </div>
        </div>
      </section>

      {/* --- VOLUNTEER CTA --- */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-amber-50 p-4 rounded-full mb-4">
             <GraduationCap size={40} className="text-amber-600"/>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">দ্বীনি শিক্ষাদানে যুক্ত হতে চান?</h2>
          <p className="text-slate-600 max-w-xl mx-auto mb-8 text-lg">
            প্রত্যন্ত অঞ্চলে শিশুদের কুরআন শেখানোর এই মহান কাজে স্বেচ্ছাসেবক বা মক্তবের শিক্ষক হিসেবে আমাদের সাথে যুক্ত হোন।
          </p>
          <Link href="/register-volunteer" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-amber-600 transition shadow-lg hover:shadow-slate-300">
            <Users size={20} /> যুক্ত হোন
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}