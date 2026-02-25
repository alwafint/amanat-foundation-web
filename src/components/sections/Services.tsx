'use client';

import React from 'react';
import Link from "next/link";
import { 
  Tractor, Wallet, HeartPulse, GraduationCap, 
  Scale, CheckCircle, ArrowRight, Layers, Headset 
} from "lucide-react";

export default function Services() {
  const services =[
    {
      id: 1,
      title: "কৃষক সেবা",
      engTitle: "Farmer Services",
      slogan: "কৃষকের হাসিতেই দেশের সমৃদ্ধি।",
      slug: "agriculture",
      icon: <Tractor size={28} />,
      desc: "আধুনিক যন্ত্রপাতি ভাড়া, শস্য ব্যাংক এবং বীজ-সার অর্ডার করুন।",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-700",
      hoverBorder: "hover:border-emerald-300",
      hoverShadow: "hover:shadow-emerald-100"
    },
    {
      id: 2,
      title: "বিনিয়োগ ও লোন",
      engTitle: "Investment & Loan",
      slogan: "হালাল উপার্জনে বরকতের ছোঁয়া।",
      slug: "investment",
      icon: <Wallet size={28} />,
      desc: "সহজ শর্তে হালাল বিনিয়োগ এবং জরুরি লোন সুবিধা গ্রহণ করুন।",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700",
      hoverBorder: "hover:border-blue-300",
      hoverShadow: "hover:shadow-blue-100"
    },
    {
      id: 3,
      title: "স্বাস্থ্য সুরক্ষা",
      engTitle: "Healthcare",
      slogan: "সুস্থ দেহ, সুন্দর মন।",
      slug: "health",
      icon: <HeartPulse size={28} />,
      desc: "ফ্রি টেলিমেডিসিন, মেডিকেল ক্যাম্প এবং ডিসকাউন্টে ঔষধ।",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-700",
      hoverBorder: "hover:border-rose-300",
      hoverShadow: "hover:shadow-rose-100"
    },
    {
      id: 4,
      title: "কারিগরি প্রশিক্ষণ",
      engTitle: "Technical Training",
      slogan: "দক্ষতায় গড়ি উজ্জ্বল ভবিষ্যৎ।",
      slug: "education",
      icon: <GraduationCap size={28} />,
      desc: "দক্ষতা উন্নয়নে কারিগরি প্রশিক্ষণ ও স্কলারশিপের আবেদন।",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-700",
      hoverBorder: "hover:border-purple-300",
      hoverShadow: "hover:shadow-purple-100"
    },
    {
      id: 5,
      title: "আইনি সহায়তা",
      engTitle: "Legal Aid",
      slogan: "সবার জন্য নিশ্চিত ন্যায়বিচার।",
      slug: "legal-aid",
      icon: <Scale size={28} />,
      desc: "জমিজমা ও পারিবারিক বিরোধে অভিজ্ঞ আইনজীবীর পরামর্শ।",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-700",
      hoverBorder: "hover:border-indigo-300",
      hoverShadow: "hover:shadow-indigo-100"
    },
    {
      id: 6,
      title: "ডিজিটাল সেবা",
      engTitle: "Digital Services",
      slogan: "প্রযুক্তির ছোঁয়ায় সহজ জীবন।",
      slug: "digital-service",
      icon: <CheckCircle size={28} />,
      desc: "অনলাইন সেবা, বিল পেমেন্ট এবং ই-সেবা সহায়তা।",
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-700",
      hoverBorder: "hover:border-cyan-300",
      hoverShadow: "hover:shadow-cyan-100"
    }
  ];

  return (
    <section id="services" className="py-20 relative bg-white overflow-hidden">
      
      {/* --- Background Decorations --- */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-60"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* --- Section Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-slate-600 text-xs md:text-sm font-bold mb-4 border border-slate-200 shadow-sm">
            <Layers size={14} className="text-emerald-500" />
            <span className="uppercase tracking-wider">আমাদের কার্যক্রম</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            মানুষের প্রয়োজনে <br className="md:hidden" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
               আমাদের জাতীয় সেবাসমূহ
            </span>
          </h2>
          
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            বাংলাদেশের প্রতিটি মানুষের জীবনযাত্রার মান উন্নয়নে আমরা দিচ্ছি বহুমুখী সুবিধা। আপনার প্রয়োজনীয় সেবাটি বেছে নিন।
          </p>
        </div>

        {/* --- Services Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item) => (
            <Link href={`/services/${item.slug}`} key={item.id} className="group block h-full outline-none">
              <div 
                className={`
                  relative h-full bg-white p-6 rounded-3xl 
                  border border-slate-100 shadow-sm hover:shadow-xl ${item.hoverShadow}
                  transition-all duration-300 hover:-translate-y-2
                  ${item.hoverBorder}
                  flex flex-col items-center text-center overflow-hidden
                `}
              >
                {/* Decorative Blob */}
                <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-20 transition-all group-hover:scale-150 ${item.iconBg}`}></div>

                {/* Icon */}
                <div className={`relative z-10 w-16 h-16 rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-sm border border-white/50`}>
                  {item.icon}
                </div>

                {/* English Badge */}
                <span className={`text-[10px] font-bold uppercase tracking-wider mb-2 px-2 py-0.5 rounded-md bg-slate-50 text-slate-500`}>
                   {item.engTitle}
                </span>

                {/* Title */}
                <h3 className="relative z-10 text-xl font-extrabold text-slate-800 mb-2 group-hover:text-slate-900 leading-tight">
                  {item.title}
                </h3>

                {/* Slogan */}
                <p className={`text-xs font-bold mb-3 italic ${item.iconColor} opacity-90`}>
                  "{item.slogan}"
                </p>

                {/* Description */}
                <p className="relative z-10 text-slate-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                  {item.desc}
                </p>

                {/* Action Link */}
                <div className={`relative z-10 mt-auto inline-flex items-center justify-center gap-2 text-xs font-bold transition-all ${item.iconColor} group-hover:gap-3 bg-slate-50 px-4 py-2 rounded-full group-hover:bg-white group-hover:shadow-sm`}>
                  বিস্তারিত দেখুন <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* --- Bottom CTA --- */}
        <div className="mt-16 text-center">
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg hover:shadow-slate-300 active:scale-95 group">
            <Headset size={18} className="text-emerald-400 group-hover:animate-pulse" /> 
            যেকোনো সহায়তার জন্য যোগাযোগ করুন
          </Link>
        </div>

      </div>
    </section>
  );
}