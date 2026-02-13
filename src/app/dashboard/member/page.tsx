'use client';

import React from 'react';
import Link from "next/link";
import { 
  Tractor, Wallet, HeartPulse, GraduationCap, 
  CheckCircle, ArrowRight, Scale, LayoutGrid, 
  Sprout
} from "lucide-react";

export default function MemberDashboard() {

  // --- SERVICES DATA ---
  const services = [
    {
      title: "কৃষক সেবা",
      customLink: "/dashboard/member/farmer-service",
      icon: <Tractor size={28} />,
      desc: "আধুনিক যন্ত্রপাতি ভাড়া, শস্য ব্যাংক এবং বীজ-সার অর্ডার করুন।",
      bgClass: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-700",
      borderHover: "hover:border-emerald-300",
      cornerColor: "bg-emerald-50",
      btnClass: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200"
    },
    {
      title: "বিনিয়োগ ও লোন",
      customLink: "/dashboard/member/investment",
      icon: <Wallet size={28} />,
      desc: "সহজ শর্তে হালাল বিনিয়োগ এবং জরুরি লোন সুবিধা গ্রহণ করুন।",
      bgClass: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700",
      borderHover: "hover:border-blue-300",
      cornerColor: "bg-blue-50",
      btnClass: "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
    },
    {
      title: "স্বাস্থ্য সুরক্ষা",
      customLink: "/dashboard/member/health",
      icon: <HeartPulse size={28} />,
      desc: "ফ্রি টেলিমেডিসিন, মেডিকেল ক্যাম্প এবং ডিসকাউন্টে ঔষধ।",
      bgClass: "bg-rose-50",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-700",
      borderHover: "hover:border-rose-300",
      cornerColor: "bg-rose-50",
      btnClass: "bg-rose-600 hover:bg-rose-700 shadow-rose-200"
    },
    {
      title: "কারিগরি প্রশিক্ষণ",
      customLink: "/dashboard/member/education",
      icon: <GraduationCap size={28} />,
      desc: "দক্ষতা উন্নয়নে কারিগরি প্রশিক্ষণ ও স্কলারশিপের আবেদন।",
      bgClass: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-700",
      borderHover: "hover:border-purple-300",
      cornerColor: "bg-purple-50",
      btnClass: "bg-purple-600 hover:bg-purple-700 shadow-purple-200"
    },
    {
      title: "আইনি সহায়তা",
      customLink: "/dashboard/member/legal-aid",
      icon: <Scale size={28} />,
      desc: "জমিজমা ও পারিবারিক বিরোধে অভিজ্ঞ আইনজীবীর পরামর্শ।",
      bgClass: "bg-indigo-50",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-700",
      borderHover: "hover:border-indigo-300",
      cornerColor: "bg-indigo-50",
      btnClass: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
    },
    {
      title: "ডিজিটাল সেবা",
      customLink: "/dashboard/member/digital",
      icon: <CheckCircle size={28} />,
      desc: "অনলাইন সেবা, বিল পেমেন্ট এবং ই-সেবা সহায়তা।",
      bgClass: "bg-cyan-50",
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-700",
      borderHover: "hover:border-cyan-300",
      cornerColor: "bg-cyan-50",
      btnClass: "bg-cyan-600 hover:bg-cyan-700 shadow-cyan-200"
    }
  ];

  return (
    <div className="relative min-h-screen pb-20 bg-slate-50">
      
      {/* --- HERO HEADER --- */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 md:p-10 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-4xl font-bold mb-3 flex items-center gap-3">
            <LayoutGrid className="text-slate-300" /> সদস্য সেবা ড্যাশবোর্ড
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed opacity-90">
            আপনার প্রয়োজনীয় সেবাটি গ্রহণ করতে নিচের অপশনগুলো ব্যবহার করুন।
          </p>
        </div>
      </div>

      {/* --- SERVICES GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((item, index) => (
          <div key={index} className="relative group h-full">
            <Link 
              href={item.customLink}
              className={`block h-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 ${item.borderHover} transition hover:-translate-y-1 duration-300 relative overflow-hidden flex flex-col`}
            >
              <div className={`absolute top-0 right-0 w-24 h-24 ${item.cornerColor} rounded-bl-full -mr-4 -mt-4 transition group-hover:scale-110 duration-500`}></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-14 h-14 ${item.iconBg} ${item.iconColor} rounded-full flex items-center justify-center mb-4 shadow-sm`}>
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 mb-6 text-sm flex-grow leading-relaxed">
                  {item.desc}
                </p>

                <button className={`w-full ${item.btnClass} text-white py-3 rounded-xl font-bold transition shadow-lg mt-auto flex items-center justify-center gap-2`}>
                  প্রবেশ করুন <ArrowRight size={18} />
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}