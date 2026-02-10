import React from 'react';
import { ShieldCheck, CheckCircle } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="bg-emerald-50 py-24 my-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <div className="lg:w-1/2 relative group">
          <div className="absolute -top-4 -left-4 w-full h-full border-2 border-emerald-300 rounded-2xl z-0 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
          <div className="bg-slate-200 w-full h-96 rounded-2xl shadow-2xl relative z-10 flex items-center justify-center overflow-hidden bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center">
             <div className="absolute inset-0 bg-emerald-900/60 flex flex-col items-center justify-center text-white p-6 text-center">
                <ShieldCheck size={80} className="mb-4 text-yellow-400" />
                <span className="text-2xl font-bold">বিশ্বাসের অপর নাম</span>
                <span className="text-3xl font-extrabold mt-2 text-yellow-400">আমানত ফাউন্ডেশন</span>
             </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
            কেন বেছে নেবেন <br/><span className="text-emerald-700">আমানত ফাউন্ডেশন?</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            আমরা দেশের প্রতিটি অবহেলিত পরিবারের মুখে হাসি ফোটানোর লক্ষ্যে কাজ করছি। আপনাদের গচ্ছিত প্রতিটি টাকা আমাদের কাছে পবিত্র আমানত, যা দেশের উন্নয়নে বিনিয়োগ হয়।
          </p>
          
          <div className="space-y-4">
            {[
              "সম্পূর্ণ সুদমুক্ত ও শরিয়াহ ভিত্তিক জাতীয় বিনিয়োগ",
              "স্বচ্ছ হিসাব ও সেন্ট্রাল ডিজিটাল ড্যাশবোর্ড সুবিধা",
              "বিপদে আপদে ২৪ ঘণ্টা পাশে থাকার অঙ্গীকার",
              "দেশজুড়ে বিস্তৃত সেবার শক্তিশালী নেটওয়ার্ক"
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-emerald-100 transition hover:border-emerald-300 hover:shadow-md">
                <CheckCircle className="text-emerald-600 w-6 h-6 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}