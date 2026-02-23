'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Gift, Award, TrendingUp, Heart, BookOpen, 
  ShieldCheck, ArrowLeft, Star, Zap, ChevronRight 
} from "lucide-react";

export default function VolunteerBenefits() {
  const router = useRouter();

  const benefitsList = [
    {
      title: "মাসিক সম্মাননী",
      desc: "প্রতিটি লক্ষ্যমাত্রা অর্জনে আপনি পাবেন আকর্ষণীয় মাসিক সম্মাননী বা রিওয়ার্ড পয়েন্ট।",
      icon: <Star className="text-[#FFB800]" />,
      color: "bg-amber-50"
    },
    {
      title: "কমিশন ও বোনাস",
      desc: "সদস্য সংগ্রহ এবং কিস্তি আদায়ের ওপর ভিত্তি করে অতিরিক্ত কমিশন ও উৎসব বোনাস।",
      icon: <Zap className="text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      title: "লিডারশিপ ট্রেনিং",
      desc: "অভিজ্ঞ মেন্টরদের মাধ্যমে ম্যানেজমেন্ট ও লিডারশিপ বিষয়ক বিশেষ প্রশিক্ষণ কোর্স।",
      icon: <BookOpen className="text-indigo-500" />,
      color: "bg-indigo-50"
    },
    {
      title: "পদোন্নতির সুযোগ",
      desc: "ভালো পারফরম্যান্সের ভিত্তিতে 'টিম লিডার' বা 'স্টাফ' হিসেবে স্থায়ী ক্যারিয়ার গড়ার সুযোগ।",
      icon: <TrendingUp className="text-[#006A4E]" />,
      color: "bg-emerald-50"
    },
    {
      title: "চিকিৎসা সহায়তা",
      desc: "ভলান্টিয়ার ও তার পরিবারের জন্য ফাউন্ডেশন নির্ধারিত হাসপাতালে বিশেষ ছাড় ও সহায়তা।",
      icon: <Heart className="text-rose-500" />,
      color: "bg-rose-50"
    },
    {
      title: "সনদপত্র ও সম্মাননা",
      desc: "বাৎসরিক সেরা ভলান্টিয়ার অ্যাওয়ার্ড এবং কাজের অভিজ্ঞতার অফিশিয়াল সার্টিফিকেট।",
      icon: <Award className="text-[#FFB800]" />,
      color: "bg-orange-50"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10">
      
      {/* --- Top Hero Area --- */}
      <div className="bg-[#006A4E] text-white p-8 rounded-b-[3.5rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
        <button onClick={() => router.back()} className="mb-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">
            <ArrowLeft size={20}/>
        </button>
        <h1 className="text-2xl font-black flex items-center gap-3">
          <Gift className="text-[#FFB800]"/> সুযোগ-সুবিধা সমূহ
        </h1>
        <p className="text-emerald-100/70 text-sm mt-2 leading-relaxed">
          আমানত ফাউন্ডেশনের একজন গর্বিত ভলান্টিয়ার হিসেবে আপনি যেসকল সুযোগ-সুবিধা পাবেন তার বিস্তারিত তালিকা নিচে দেওয়া হলো।
        </p>
      </div>

      <main className="max-w-xl mx-auto px-6 mt-8 space-y-4">
        
        {/* Benefit Cards Grid */}
        <div className="grid grid-cols-1 gap-4">
            {benefitsList.map((item, index) => (
                <div 
                    key={index}
                    className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-all group"
                >
                    <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center shrink-0 border border-white group-hover:scale-110 transition-transform`}>
                        {React.cloneElement(item.icon, { size: 28 })}
                    </div>
                    <div>
                        <h3 className="font-black text-slate-800 text-base">{item.title}</h3>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                </div>
            ))}
        </div>

        {/* --- Career Goal Section --- */}
        <div className="mt-8 bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <ShieldCheck size={80}/>
            </div>
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                <TrendingUp size={18} className="text-[#006A4E]"/> আপনার পরবর্তী লক্ষ্য
            </h3>
            <div className="mt-4 flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">বর্তমান স্তর</p>
                    <p className="text-sm font-bold text-[#006A4E]">সিনিয়র ভলান্টিয়ার</p>
                </div>
                <ChevronRight className="text-slate-300"/>
                <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">পরবর্তী ধাপ</p>
                    <p className="text-sm font-bold text-[#FFB800]">ভিলেজ টিম লিডার</p>
                </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-4 text-center italic">
                * আরও বিস্তারিত তথ্যের জন্য আপনার টিম লিডারের সাথে সরাসরি যোগাযোগ করুন।
            </p>
        </div>

      </main>

      {/* Footer Branding */}
      <div className="text-center mt-12 mb-6">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
            Amanat Foundation &copy; {new Date().getFullYear()}
          </p>
      </div>

    </div>
  );
}