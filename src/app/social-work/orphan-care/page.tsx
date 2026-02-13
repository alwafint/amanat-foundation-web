'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Heart, HandHeart, Home, BookOpen, 
  Utensils, Shirt, Gift, PhoneCall, 
  CheckCircle2, ArrowRight, Smile 
} from 'lucide-react';

// ৩ ধাপ পেছনে গিয়ে কম্পোনেন্ট ইমপোর্ট
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function OrphanCarePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION (EMOTIONAL) --- */}
      <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop')" }}
        ></div>
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900 via-rose-900/70 to-transparent z-10"></div>

        <div className="relative z-20 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-pink-500/30 border border-pink-400/50 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 animate-fadeInDown">
            <Heart size={18} className="text-pink-300 fill-pink-300" />
            <span className="text-pink-100 text-sm font-bold uppercase tracking-wider">ভালোবাসার হাত বাড়ান</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            এতিমের মুখে হাসি ফোটানোই <br/> 
            <span className="text-pink-400">আমাদের এবাদত</span>
          </h1>
          
          <p className="text-lg md:text-xl text-rose-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            বাবা-মা হারা এই নিষ্পাপ শিশুগুলোর কেউ নেই। আপনার সামান্য সহযোগিতা ও ভালোবাসা দিতে পারে তাদের একটি সুন্দর ভবিষ্যৎ এবং নিরাপদ আশ্রয়।
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a href="#sponsor" className="bg-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-pink-500 transition shadow-lg shadow-pink-500/40 flex items-center justify-center gap-2">
              <Smile size={20}/> দায়িত্ব নিতে চাই
            </a>
            <a href="#activities" className="bg-white/10 border border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition flex items-center justify-center gap-2">
              আমাদের কার্যক্রম <ArrowRight size={20}/>
            </a>
          </div>
        </div>
      </div>

      {/* --- OUR MISSION / IMPACT --- */}
      <section id="activities" className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-snug">
              আমরা কীভাবে <br/> <span className="text-rose-600">এতিম শিশুদের যত্ন নেই?</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              আমানত ফাউন্ডেশন শুধু খাবার বা পোশাক দিয়েই দায়িত্ব শেষ করে না। আমরা চেষ্টা করি প্রতিটি এতিম শিশুকে নিজের সন্তানের মতো গড়ে তুলতে, যাতে তারা ভবিষ্যতে সমাজের বোঝা না হয়ে সম্পদ হতে পারে।
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-xl border border-pink-100 hover:shadow-md transition">
                <div className="bg-pink-100 p-2 rounded-full text-pink-600 shrink-0"><Home size={20}/></div>
                <span className="font-bold text-slate-700">নিরাপদ আবাসন</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-rose-50 rounded-xl border border-rose-100 hover:shadow-md transition">
                <div className="bg-rose-100 p-2 rounded-full text-rose-600 shrink-0"><Utensils size={20}/></div>
                <span className="font-bold text-slate-700">পুষ্টিকর খাবার</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100 hover:shadow-md transition">
                <div className="bg-orange-100 p-2 rounded-full text-orange-600 shrink-0"><BookOpen size={20}/></div>
                <span className="font-bold text-slate-700">দ্বীনি ও সাধারণ শিক্ষা</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100 hover:shadow-md transition">
                <div className="bg-purple-100 p-2 rounded-full text-purple-600 shrink-0"><Shirt size={20}/></div>
                <span className="font-bold text-slate-700">পোশাক ও চিকিৎসা</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-rose-100 rounded-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1502086223501-636a25419432?q=80&w=800&auto=format&fit=crop" 
              alt="Orphan Children Smiling" 
              className="rounded-3xl shadow-2xl w-full object-cover h-[450px]"
            />
            {/* Stats Overlay */}
            <div className="absolute top-10 left-[-20px] bg-white p-6 rounded-2xl shadow-xl border-l-8 border-rose-500 animate-bounce-slow hidden md:block">
              <p className="text-sm text-slate-500 font-bold uppercase">আমাদের তত্ত্বাবধানে</p>
              <p className="text-3xl font-extrabold text-rose-600">৫০+ শিশু</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- HADITH SECTION --- */}
      <section className="bg-rose-900 text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <HandHeart size={48} className="mx-auto text-pink-300 mb-6" />
          <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6 italic opacity-90">
            "আমি এবং এতিম প্রতিপালনকারী জান্নাতে এইভাবে (পাশাপাশি) থাকব।"
          </blockquote>
          <p className="text-pink-200 font-bold">— রাসূলুল্লাহ (সা.) (বুখারী)</p>
        </div>
      </section>

      {/* --- SPONSORSHIP PACKAGES --- */}
      <section id="sponsor" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-rose-600 font-bold uppercase tracking-wider text-sm">সদকায়ে জারিয়া</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">স্পন্সরশিপ প্যাকেজ</h2>
            <div className="w-20 h-1.5 bg-rose-500 mx-auto rounded-full mt-4"></div>
            <p className="text-slate-500 mt-4">আপনার সামর্থ্য অনুযায়ী যেকোনো একটি প্যাকেজ গ্রহণ করুন</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Package 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-pink-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-pink-400"></div>
              <Utensils size={48} className="mx-auto text-pink-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">খাবারের দায়িত্ব</h3>
              <div className="text-4xl font-extrabold text-pink-600 mb-2">৳ ২,০০০</div>
              <p className="text-slate-500 text-sm mb-8">একজন এতিম শিশুর এক মাসের খাবারের খরচ।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-pink-500"/> ৩ বেলা পুষ্টিকর খাবার</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-pink-500"/> ফল ও দুধ অন্তর্ভুক্ত</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-pink-600 hover:text-white transition">দান করুন</button>
            </div>

            {/* Package 2 (Highlighted) */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-rose-500 relative transform md:-translate-y-4 flex flex-col">
              <div className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">FULL CARE</div>
              <Heart size={48} className="mx-auto text-rose-600 mb-4 fill-rose-100" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">পূর্ণাঙ্গ অভিভাবক</h3>
              <div className="text-5xl font-extrabold text-rose-700 mb-2">৳ ৫,০০০</div>
              <p className="text-slate-500 text-xs mb-8">একজন শিশুর পুরো এক মাসের সব খরচ।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-rose-500"/> থাকা, খাওয়া ও শিক্ষা</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-rose-500"/> চিকিৎসা ও পোশাক</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-rose-500"/> শিশুর সাথে দেখা করার সুযোগ</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition shadow-lg">দায়িত্ব নিন</button>
            </div>

            {/* Package 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-pink-400 hover:shadow-xl transition text-center group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-2 bg-pink-400"></div>
              <Gift size={48} className="mx-auto text-pink-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">ঈদের খুশি</h3>
              <div className="text-4xl font-extrabold text-pink-600 mb-2">৳ ১,০০০</div>
              <p className="text-slate-500 text-sm mb-8">ঈদের সময় নতুন জামা ও ভালো খাবার।</p>
              
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600 flex-grow">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-pink-500"/> ১ সেট নতুন জামা</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-pink-500"/> ঈদের দিনের বিশেষ খাবার</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-pink-600 hover:text-white transition">উপহার দিন</button>
            </div>

          </div>

          {/* Payment Info */}
          <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-2xl border border-dashed border-rose-300 text-center">
            <h4 className="font-bold text-slate-700 mb-4 text-lg">অনুদান পাঠানোর মাধ্যম (Orphan Fund)</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-pink-50 text-pink-600 rounded-lg font-bold border border-pink-100">bKash: 017XXXXXXXX</div>
              <div className="px-6 py-3 bg-orange-50 text-orange-600 rounded-lg font-bold border border-orange-100">Nagad: 017XXXXXXXX</div>
            </div>
            <p className="text-sm text-slate-500 mt-4">* রেফারেন্সে 'Orphan' বা 'Yatim' উল্লেখ করুন।</p>
          </div>
        </div>
      </section>

      {/* --- VISIT CTA --- */}
      <section className="bg-rose-50 py-16 border-t border-rose-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-rose-900 mb-4">আমাদের এতিমখানা ভিজিট করতে চান?</h2>
          <p className="text-rose-700 max-w-xl mx-auto mb-8">
            আপনার উপস্থিতি এই শিশুদের মনে অনেক আনন্দ দেয়। যেকোনো শুক্রবার বা ছুটির দিনে পরিবার নিয়ে চলে আসুন।
          </p>
          <a href="tel:017XXXXXXXX" className="inline-flex items-center gap-2 bg-rose-600 text-white px-8 py-3 rounded-full font-bold hover:bg-rose-700 transition shadow-lg">
            <PhoneCall size={20}/> যোগাযোগ করুন
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}