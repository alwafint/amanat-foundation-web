import React from 'react';
import { ShieldCheck, CheckCircle2, Target, Users, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden bg-slate-50">
      
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* --- LEFT SIDE: IMAGE CARD --- */}
          <div className="w-full lg:w-1/2 relative group">
            {/* Background Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-3xl rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500"></div>
            
            {/* Main Image Container */}
            <div className="relative bg-white p-2 rounded-3xl shadow-xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[500px]">
              <div 
                className="w-full h-full rounded-2xl bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=1000&auto=format&fit=crop')" }}
              >
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-8 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-yellow-500 rounded-lg text-slate-900">
                      <ShieldCheck size={28} />
                    </div>
                    <span className="font-bold text-yellow-400 tracking-wider text-sm uppercase">বিশ্বাসের অপর নাম</span>
                  </div>
                  <h3 className="text-3xl font-extrabold mb-1">আমানত ফাউন্ডেশন</h3>
                  <p className="text-slate-300 text-sm opacity-90">আপনার আমানত, আমাদের দায়িত্ব।</p>
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-lg flex items-center gap-3 border border-slate-100 animate-bounce-slow hidden md:flex">
              <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                <Users size={24} />
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase">সদস্য সংখ্যা</p>
                <p className="text-slate-800 text-xl font-extrabold">১০,০০০+</p>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: CONTENT --- */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold mb-4">
                <Target size={16} /> আমাদের লক্ষ্য
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight mb-4">
                কেন বেছে নেবেন <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                  আমানত ফাউন্ডেশন?
                </span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                আমরা দেশের প্রতিটি অবহেলিত পরিবারের মুখে হাসি ফোটানোর লক্ষ্যে কাজ করছি। আপনাদের গচ্ছিত প্রতিটি টাকা আমাদের কাছে পবিত্র আমানত, যা দেশের উন্নয়নে বিনিয়োগ হয়।
              </p>
            </div>

            <div className="grid gap-4">
              {[
                { text: "সম্পূর্ণ সুদমুক্ত ও শরিয়াহ ভিত্তিক বিনিয়োগ", color: "text-emerald-600", bg: "bg-emerald-50" },
                { text: "স্বচ্ছ হিসাব ও সেন্ট্রাল ডিজিটাল ড্যাশবোর্ড", color: "text-blue-600", bg: "bg-blue-50" },
                { text: "বিপদে আপদে ২৪ ঘণ্টা পাশে থাকার অঙ্গীকার", color: "text-rose-600", bg: "bg-rose-50" },
                { text: "দেশজুড়ে বিস্তৃত সেবার শক্তিশালী নেটওয়ার্ক", color: "text-purple-600", bg: "bg-purple-50" }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="group flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md hover:border-emerald-200 hover:-translate-x-1"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${item.bg} ${item.color}`}>
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="text-slate-700 font-bold text-base md:text-lg group-hover:text-slate-900 transition-colors">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 group">
              আমাদের সম্পর্কে আরও জানুন <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </div>
        
        </div>
      </div>
    </section>
  );
}