'use client';

import React from 'react';
import Link from "next/link";
import { Tractor, Wallet, HeartPulse, GraduationCap, Sprout, CheckCircle, ArrowRight } from "lucide-react";

export default function MemberServices() {
  const services = [
    {
      title: "কৃষক সেবা",
      slug: "farmer-service",
      customLink: "/dashboard/member/farmer-service",
      icon: <Tractor className="w-8 h-8 text-emerald-600" />,
      desc: "আধুনিক যন্ত্রপাতি ভাড়া, শস্য ব্যাংক এবং বীজ-সার অর্ডার করুন।",
      borderColor: "border-emerald-500",
      iconColor: "bg-emerald-50"
    },
    {
      title: "বিনিয়োগ ও লোন",
      slug: "investment",
      customLink: "/dashboard/member/investment",
      icon: <Wallet className="w-8 h-8 text-blue-600" />,
      desc: "সহজ শর্তে হালাল বিনিয়োগ এবং জরুরি লোন সুবিধা।",
      borderColor: "border-blue-500",
      iconColor: "bg-blue-50"
    },
    {
      title: "স্বাস্থ্য সুরক্ষা",
      slug: "health",
      customLink: "/dashboard/member/health",
      icon: <HeartPulse className="w-8 h-8 text-red-500" />,
      desc: "ফ্রি টেলিমেডিসিন, মেডিকেল ক্যাম্প এবং ডিসকাউন্টে ঔষধ।",
      borderColor: "border-red-500",
      iconColor: "bg-red-50"
    },
    {
      title: "কারিগরি প্রশিক্ষণ",
      slug: "education",
      customLink: "/dashboard/member/education",
      icon: <GraduationCap className="w-8 h-8 text-purple-600" />,
      desc: "দক্ষতা উন্নয়নে কারিগরি প্রশিক্ষণ ও স্কলারশিপের আবেদন।",
      borderColor: "border-purple-500",
      iconColor: "bg-purple-50"
    },
    {
      title: "প্রাণিসম্পদ উন্নয়ন",
      slug: "livestock",
      customLink: "/dashboard/member/livestock",
      icon: <Sprout className="w-8 h-8 text-yellow-600" />,
      desc: "খামারিদের জন্য টিকাদান এবং ভেটেরিনারি সেবা।",
      borderColor: "border-yellow-500",
      iconColor: "bg-yellow-50"
    },
    {
      title: "ডিজিটাল সেবা",
      slug: "digital-service",
      customLink: "/dashboard/member/digital",
      icon: <CheckCircle className="w-8 h-8 text-cyan-600" />,
      desc: "অনলাইন সেবা, বিল পেমেন্ট এবং ই-সেবা সহায়তা।",
      borderColor: "border-cyan-500",
      iconColor: "bg-cyan-50"
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">সেবা সমূহ</h1>
        <p className="text-slate-500">আপনার জন্য প্রযোজ্য সেবাগুলো নিচে দেওয়া হলো</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((item, index) => (
          <Link 
            href={item.customLink} 
            key={index} 
            className="block h-full group"
          >
            <div 
              className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-t-4 ${item.borderColor} h-full relative hover:-translate-y-1`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`${item.iconColor} w-12 h-12 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                </div>
                <span className="bg-slate-100 text-emerald-700 text-xs px-2 py-1 rounded font-bold border border-slate-200">
                  Available
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">{item.desc}</p>
              
              <div className="w-full py-2 rounded-lg border border-emerald-100 text-emerald-700 font-bold text-sm hover:bg-emerald-50 transition flex items-center justify-center gap-2">
                বিস্তারিত ও আবেদন <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}