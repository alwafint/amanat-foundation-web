'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Snowflake, Heart, Users, MapPin, 
  ThermometerSnowflake, Gift, ArrowRight, PhoneCall, 
  CheckCircle2, AlertCircle
} from 'lucide-react';

// ভুল: import Navbar from '@/components/layout/Navbar';
// সঠিক (৩ ধাপ পেছনে):
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

export default function WinterReliefPage() {
  // ... বাকি কোড যেমন ছিল তেমনই থাকবে ...
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION (EMOTIONAL) --- */}
      <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transform scale-105 animate-slow-zoom" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618423769742-23c3479633d7?q=80&w=1600&auto=format&fit=crop')" }}
        ></div>
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent z-10"></div>

        <div className="relative z-20 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 border border-blue-400/50 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 animate-fadeInDown">
            <Snowflake size={18} className="text-blue-200" />
            <span className="text-blue-100 text-sm font-bold uppercase tracking-wider">মিশন উষ্ণতা ২০২৪-২৫</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            শীতের আর্তনাদ: <br/> 
            <span className="text-amber-400">একটি কম্বল, একটি প্রাণ</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            উত্তরাঞ্চলের হাড়কাঁপানো শীতে যখন জনজীবন বিপন্ন, তখন আপনার সামান্য উষ্ণতাই বাঁচাতে পারে একটি শিশুর প্রাণ, একজন বৃদ্ধের হাসি।
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a href="#donate" className="bg-amber-500 text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-amber-400 transition shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2">
              <Heart size={20} fill="black" className="opacity-80"/> উষ্ণতা ছড়ান (দান করুন)
            </a>
            <a href="#gallery" className="bg-white/10 border border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition flex items-center justify-center gap-2">
              আমাদের কার্যক্রম <ArrowRight size={20}/>
            </a>
          </div>
        </div>
      </div>

      {/* --- REALITY CHECK SECTION --- */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-2/3 h-2/3 bg-blue-100 rounded-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1533552277427-449733083dbd?q=80&w=800&auto=format&fit=crop" 
              alt="Poor child in winter" 
              className="rounded-3xl shadow-2xl w-full object-cover h-[400px]"
            />
            <div className="absolute bottom-6 right-6 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-bounce-slow">
              <ThermometerSnowflake className="text-blue-500" size={32} />
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase">বর্তমান তাপমাত্রা</p>
                <p className="text-2xl font-extrabold text-slate-800">০৮° সেলসিয়াস</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-snug">
              গাইবান্ধার চরাঞ্চলে <br/> <span className="text-blue-600">শীতের ভয়াবহতা</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              নদীবিধৌত সাঘাটা ও এর চরাঞ্চলে শীতের প্রকোপ শহরের চেয়ে অনেক বেশি। কনকনে ঠান্ডা বাতাস আর কুয়াশায় এখানকার দরিদ্র মানুষগুলো জবুথবু হয়ে পড়ে। গরম কাপড়ের অভাবে শিশুরা নিউমোনিয়ায় এবং বৃদ্ধরা শ্বাসকষ্টে ভোগেন।
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-2 rounded-full text-amber-600 shrink-0 mt-1"><AlertCircle size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">চরম দারিদ্র্য</h4>
                  <p className="text-sm text-slate-500">দিনমজুর ও কৃষকরা শীতের পোশাক কেনার সামর্থ্য রাখেন না।</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-2 rounded-full text-amber-600 shrink-0 mt-1"><AlertCircle size={20}/></div>
                <div>
                  <h4 className="font-bold text-slate-800">স্বাস্থ্য ঝুঁকি</h4>
                  <p className="text-sm text-slate-500">শীতজনিত রোগে প্রতি বছর অনেক শিশু ও বৃদ্ধ মারা যায়।</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold opacity-90">গত বছরের সাফল্য</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2 p-4 border border-blue-800 rounded-2xl bg-blue-800/30">
              <Gift size={32} className="mx-auto text-amber-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">৫,০০০+</h3>
              <p className="text-blue-200 text-sm">কম্বল বিতরণ</p>
            </div>
            <div className="space-y-2 p-4 border border-blue-800 rounded-2xl bg-blue-800/30">
              <Users size={32} className="mx-auto text-amber-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">১২,০০০+</h3>
              <p className="text-blue-200 text-sm">উপকৃত মানুষ</p>
            </div>
            <div className="space-y-2 p-4 border border-blue-800 rounded-2xl bg-blue-800/30">
              <MapPin size={32} className="mx-auto text-amber-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">১৫+</h3>
              <p className="text-blue-200 text-sm">গ্রাম কভার করা হয়েছে</p>
            </div>
            <div className="space-y-2 p-4 border border-blue-800 rounded-2xl bg-blue-800/30">
              <Heart size={32} className="mx-auto text-amber-400 mb-2"/>
              <h3 className="text-4xl font-extrabold">১০০%</h3>
              <p className="text-blue-200 text-sm">স্বচ্ছতা ও আমানত</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- DONATION PACKAGES --- */}
      <section id="donate" className="py-24 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">সহযোগিতার হাত বাড়ান</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">আপনার অনুদান প্যাকেজ বেছে নিন</h2>
            <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Package 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border hover:border-blue-300 hover:shadow-xl transition text-center group relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-2 bg-blue-400"></div>
              <h3 className="text-xl font-bold text-slate-700 mb-4">একটি কম্বল</h3>
              <div className="text-4xl font-extrabold text-blue-600 mb-2">৳ ৫০০</div>
              <p className="text-slate-500 text-sm mb-8">একজন অসহায় মানুষের শীত নিবারণের জন্য যথেষ্ট।</p>
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-blue-500"/> উন্নত মানের কম্বল</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-blue-500"/> ভেরিফাইড গ্রহীতা</li>
              </ul>
              <button className="w-full py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition">দান করুন</button>
            </div>

            {/* Package 2 (Highlighted) */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-amber-400 relative transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">ফ্যামিলি প্যাক</h3>
              <div className="text-4xl font-extrabold text-amber-500 mb-2">৳ ২,০০০</div>
              <p className="text-slate-500 text-sm mb-8">একটি পুরো পরিবারের শীতের সুরক্ষা।</p>
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-amber-500"/> ২ টি কম্বল</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-amber-500"/> ১ টি সোয়েটার (বাচ্চাদের)</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-amber-500"/> ভ্যাসলিন ও লোশন</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition shadow-lg shadow-amber-200">এখনই দান করুন</button>
            </div>

            {/* Package 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border hover:border-blue-300 hover:shadow-xl transition text-center group relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-2 bg-blue-400"></div>
              <h3 className="text-xl font-bold text-slate-700 mb-4">উষ্ণতার বন্ধু</h3>
              <div className="text-4xl font-extrabold text-blue-600 mb-2">৳ ৫,০০০+</div>
              <p className="text-slate-500 text-sm mb-8">১০ জন মানুষের মুখে হাসি ফোটাতে পারেন।</p>
              <ul className="text-left space-y-3 mb-8 text-sm text-slate-600">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-blue-500"/> ১০ টি কম্বল বিতরণ</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-blue-500"/> ভিডিও ফুটেজ প্রদান</li>
              </ul>
              <button className="w-full py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition">নিজে অ্যামাউন্ট দিন</button>
            </div>

          </div>

          {/* Payment Info */}
          <div className="max-w-2xl mx-auto mt-12 bg-white p-6 rounded-2xl border border-slate-200 text-center">
            <h4 className="font-bold text-slate-700 mb-4">অনুদান পাঠানোর মাধ্যম</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-4 py-2 bg-pink-50 text-pink-600 rounded-lg font-bold border border-pink-100">bKash: 017XXXXXXXX</div>
              <div className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg font-bold border border-orange-100">Nagad: 017XXXXXXXX</div>
              <div className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg font-bold border border-purple-100">Rocket: 017XXXXXXXX</div>
            </div>
            <p className="text-xs text-slate-400 mt-4">* রেফারেন্সে 'Winter' উল্লেখ করুন</p>
          </div>
        </div>
      </section>

      {/* --- GALLERY PREVIEW --- */}
      <section id="gallery" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">গত বছরের কিছু স্মৃতি</h2>
              <p className="text-slate-500">আপনার দেওয়া দানেই এই হাসিগুলো ফুটেছে</p>
            </div>
            <Link href="/social-work" className="text-blue-600 font-bold hover:underline flex items-center gap-2">
              সব ছবি দেখুন <ArrowRight size={16}/>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-96">
            <div className="md:col-span-2 h-full rounded-2xl overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop" alt="Winter Relief" className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"/>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
            </div>
            <div className="grid grid-rows-2 gap-4 h-full">
              <div className="rounded-2xl overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1547082688-9077fe60b8f9?q=80&w=600&auto=format&fit=crop" alt="Winter Relief" className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"/>
              </div>
              <div className="rounded-2xl overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600&auto=format&fit=crop" alt="Winter Relief" className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- VOLUNTEER CTA --- */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">টাকা দিয়ে না হলেও, সময় দিয়ে পাশে দাঁড়ান</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            আমাদের শীতবস্ত্র বিতরণ কার্যক্রমে স্বেচ্ছাসেবক হিসেবে যোগ দিন। মানুষের সেবা করার এই সুযোগ হাতছাড়া করবেন না।
          </p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition">
            <Users size={20}/> স্বেচ্ছাসেবক হতে চাই
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}