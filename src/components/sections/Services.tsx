'use client';

import React from 'react';
import Link from "next/link";
import { 
  Tractor, Wallet, HeartPulse, GraduationCap, 
  Scale, CheckCircle, ArrowRight, Layers 
} from "lucide-react";

export default function Services() {
  const services = [
    {
      id: 1,
      title: "কৃষক সেবা",
      slug: "agriculture",
      icon: <Tractor size={32} />,
      desc: "আধুনিক যন্ত্রপাতি ভাড়া, শস্য ব্যাংক এবং বীজ-সার অর্ডার করুন।",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-700",
      hoverBorder: "hover:border-emerald-300",
      hoverShadow: "hover:shadow-emerald-100",
      btnBg: "bg-emerald-600"
    },
    {
      id: 2,
      title: "বিনিয়োগ ও লোন",
      slug: "investment",
      icon: <Wallet size={32} />,
      desc: "সহজ শর্তে হালাল বিনিয়োগ এবং জরুরি লোন সুবিধা গ্রহণ করুন।",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700",
      hoverBorder: "hover:border-blue-300",
      hoverShadow: "hover:shadow-blue-100",
      btnBg: "bg-blue-600"
    },
    {
      id: 3,
      title: "স্বাস্থ্য সুরক্ষা",
      slug: "health",
      icon: <HeartPulse size={32} />,
      desc: "ফ্রি টেলিমেডিসিন, মেডিকেল ক্যাম্প এবং ডিসকাউন্টে ঔষধ।",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-700",
      hoverBorder: "hover:border-rose-300",
      hoverShadow: "hover:shadow-rose-100",
      btnBg: "bg-rose-600"
    },
    {
      id: 4,
      title: "কারিগরি প্রশিক্ষণ",
      slug: "education",
      icon: <GraduationCap size={32} />,
      desc: "দক্ষতা উন্নয়নে কারিগরি প্রশিক্ষণ ও স্কলারশিপের আবেদন।",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-700",
      hoverBorder: "hover:border-purple-300",
      hoverShadow: "hover:shadow-purple-100",
      btnBg: "bg-purple-600"
    },
    {
      id: 5,
      title: "আইনি সহায়তা",
      slug: "legal-aid",
      icon: <Scale size={32} />,
      desc: "জমিজমা ও পারিবারিক বিরোধে অভিজ্ঞ আইনজীবীর পরামর্শ।",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-700",
      hoverBorder: "hover:border-indigo-300",
      hoverShadow: "hover:shadow-indigo-100",
      btnBg: "bg-indigo-600"
    },
    {
      id: 6,
      title: "ডিজিটাল সেবা",
      slug: "digital-service",
      icon: <CheckCircle size={32} />,
      desc: "অনলাইন সেবা, বিল পেমেন্ট এবং ই-সেবা সহায়তা।",
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-700",
      hoverBorder: "hover:border-cyan-300",
      hoverShadow: "hover:shadow-cyan-100",
      btnBg: "bg-cyan-600"
    }
  ];

  return (
    <section id="services" className="py-20 relative bg-slate-50 overflow-hidden">
      
      {/* --- Background Decorations --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-100 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-40"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* --- Section Header --- */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-slate-600 text-xs md:text-sm font-bold mb-4 border border-slate-200 shadow-sm">
            <Layers size={14} />
            <span className="uppercase tracking-wider">আমাদের কার্যক্রম</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            মানুষের প্রয়োজনে <br className="md:hidden" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
               আমাদের জাতীয় সেবাসমূহ
            </span>
          </h2>
          
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            বাংলাদেশের প্রতিটি মানুষের জীবনযাত্রার মান উন্নয়নে আমরা দিচ্ছি বহুমুখী সুবিধা। আপনার প্রয়োজনীয় সেবাটি বেছে নিন।
          </p>
        </div>

        {/* --- Services Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((item) => (
            <Link href={`/services/${item.slug}`} key={item.id} className="group block h-full outline-none">
              <div 
                className={`
                  relative h-full bg-white p-8 rounded-2xl 
                  border border-slate-100 shadow-sm hover:shadow-2xl ${item.hoverShadow}
                  transition-all duration-300 hover:-translate-y-2
                  ${item.hoverBorder}
                  flex flex-col items-center text-center
                `}
              >
                {/* Icon Circle */}
                <div className={`w-20 h-20 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm mx-auto`}>
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-base leading-relaxed mb-8 flex-grow max-w-xs mx-auto">
                  {item.desc}
                </p>

                {/* Action Button Style Link */}
                <div className={`mt-auto w-full ${item.btnBg} text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md group-hover:shadow-lg hover:opacity-90`}>
                  প্রবেশ করুন <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}