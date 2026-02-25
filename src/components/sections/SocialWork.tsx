'use client';

import React from 'react';
import Link from "next/link";
import { 
  HandHeart, ArrowRight, Snowflake, GraduationCap, 
  TreeDeciduous, Heart, Stethoscope, Sparkles, 
  BookOpen, Trophy, Droplets, Briefcase, Gift, 
  Recycle, Home, UserPlus 
} from "lucide-react";

export default function SocialWork() {
  
  const campaigns = [
    {
      id: 1,
      title: "প্রজেক্ট শিফা",
      engTitle: "Project Shifa",
      slug: "project-shifa",
      icon: <Stethoscope size={28} />,
      slogan: "সুস্থ গ্রাম, সমৃদ্ধ জীবন।",
      desc: "বিনামূল্যে বেসিক হেলথ ক্যাম্প ও চেকআপ।",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
      hoverBorder: "hover:border-rose-300",
      hoverShadow: "hover:shadow-rose-100"
    },
    {
      id: 2,
      title: "মিশন গ্রিন ভিলেজ",
      engTitle: "Mission Green Village",
      slug: "clean-village",
      icon: <Sparkles size={28} />,
      slogan: "পরিচ্ছন্নতা ঈমানের অঙ্গ, সুন্দর হোক সঙ্গ।",
      desc: "পরিষ্কার গ্রাম অভিযান ও সচেতনতা বৃদ্ধি।",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      hoverBorder: "hover:border-emerald-300",
      hoverShadow: "hover:shadow-emerald-100"
    },
    {
      id: 3,
      title: "প্রজেক্ট ছায়া",
      engTitle: "Project Chhaya",
      slug: "project-chhaya",
      icon: <Home size={28} />,
      slogan: "অসহায়দের মাথার ওপর ভালোবাসার ছাদ।",
      desc: "এতিম ও বিধবা সহায়তা কার্যক্রম।",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      hoverBorder: "hover:border-purple-300",
      hoverShadow: "hover:shadow-purple-100"
    },
    {
      id: 4,
      title: "সবুজায়ন",
      engTitle: "Sobujayon",
      slug: "tree-plantation",
      icon: <TreeDeciduous size={28} />,
      slogan: "একটি গাছ, একটি প্রাণ।",
      desc: "আগামী প্রজন্মের জন্য বৃক্ষরোপণ উৎসব।",
      iconBg: "bg-green-100",
      iconColor: "text-green-700",
      hoverBorder: "hover:border-green-300",
      hoverShadow: "hover:shadow-green-100"
    },
    {
      id: 5,
      title: "উষ্ণতার ছোঁয়া",
      engTitle: "Touch of Warmth",
      slug: "winter-relief",
      icon: <Snowflake size={28} />,
      slogan: "হাড়কাঁপানো শীতে ভালোবাসার চাদর।",
      desc: "দরিদ্র মানুষের মাঝে শীতবস্ত্র বিতরণ।",
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600",
      hoverBorder: "hover:border-sky-300",
      hoverShadow: "hover:shadow-sky-100"
    },
    {
      id: 6,
      title: "আলোকিত মক্তব",
      engTitle: "Alokito Maktob",
      slug: "alokito-maktob",
      icon: <BookOpen size={28} />,
      slogan: "শিশুকাল থেকেই গড়বো নৈতিকতার ভিত্তি।",
      desc: "মক্তব উন্নয়ন ও শিশু শিক্ষা প্রকল্প।",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      hoverBorder: "hover:border-amber-300",
      hoverShadow: "hover:shadow-amber-100"
    },
    {
      id: 7,
      title: "সম্প্রীতি টুর্নামেন্ট",
      engTitle: "Harmony Cup",
      slug: "harmony-cup",
      icon: <Trophy size={28} />,
      slogan: "খেলাধুলায় বাড়ে বল, মাদক ছেড়ে মাঠে চল।",
      desc: "টিম লিডার কাপ ও ক্রীড়া প্রতিযোগিতা।",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      hoverBorder: "hover:border-orange-300",
      hoverShadow: "hover:shadow-orange-100"
    },
    {
      id: 8,
      title: "সুরক্ষা স্যানিটেশন",
      engTitle: "Project Surokkha",
      slug: "project-surokkha",
      icon: <Droplets size={28} />,
      slogan: "সুস্থ থাকার প্রথম ওচন।",
      desc: "পরিচ্ছন্ন টয়লেট ও স্যানিটেশন ক্যাম্পেইন।",
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
      hoverBorder: "hover:border-cyan-300",
      hoverShadow: "hover:shadow-cyan-100"
    },
    {
      id: 9,
      title: "ইকো-গার্ড",
      engTitle: "Eco-Guard",
      slug: "eco-guard",
      icon: <Recycle size={28} />,
      slogan: "প্লাস্টিক বর্জন করি, পরিবেশ রক্ষা করি।",
      desc: "প্লাস্টিক বর্জন ও ডাস্টবিন প্রকল্প।",
      iconBg: "bg-lime-100",
      iconColor: "text-lime-600",
      hoverBorder: "hover:border-lime-300",
      hoverShadow: "hover:shadow-lime-100"
    },
    {
      id: 10,
      title: "প্রজেক্ট স্বাবলম্বী",
      engTitle: "Project Swabolombi",
      slug: "project-swabolombi",
      icon: <Briefcase size={28} />,
      slogan: "দক্ষ হাত, উন্নত ভবিষ্যৎ।",
      desc: "যুব প্রশিক্ষণ ও নারীদের স্কিল ডেভেলপমেন্ট।",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      hoverBorder: "hover:border-indigo-300",
      hoverShadow: "hover:shadow-indigo-100"
    },
    {
      id: 11,
      title: "মিশন এহসান",
      engTitle: "Mission Ehsan",
      slug: "mission-ehsan",
      icon: <Gift size={28} />,
      slogan: "ইদের খুশি ছড়িয়ে যাক প্রতিটি ঘরে।",
      desc: "রমাদান ও ইদের আনন্দ ভাগাভাগি।",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      hoverBorder: "hover:border-pink-300",
      hoverShadow: "hover:shadow-pink-100"
    },
    {
      id: 12,
      title: "প্রজেক্ট ৩৬৫",
      engTitle: "Project 365",
      slug: "project-365",
      icon: <Heart size={28} />,
      slogan: "ছোট ছোট ভালো কাজ, গড়বে সুখের সমাজ।",
      desc: "ভলান্টিয়ারদের প্রতিদিন একটি করে ভালো কাজ।",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      hoverBorder: "hover:border-red-300",
      hoverShadow: "hover:shadow-red-100"
    }
  ];

  return (
    <section id="social-work" className="py-20 relative bg-white overflow-hidden">
      
      {/* --- Background Decorations --- */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-60"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* --- Section Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-slate-600 text-xs md:text-sm font-bold mb-4 border border-slate-200 shadow-sm">
            <HandHeart size={14} className="text-rose-500" />
            <span className="uppercase tracking-wider">আমাদের ১২টি সামাজিক উদ্যোগ</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            মানুষের কল্যাণে <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
              সারা বছর জুড়ে আমাদের আয়োজন
            </span>
          </h2>
          
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            আমরা শুধু আর্থিক প্রতিষ্ঠান নই, আমরা একটি পরিবার। সমাজের প্রতিটি স্তরে আমাদের ভলান্টিয়াররা কাজ করে যাচ্ছে।
          </p>
        </div>

        {/* --- Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {campaigns.map((item) => (
            <Link href={`/social-work/${item.slug}`} key={item.id} className="group block h-full outline-none">
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

                {/* Slogan (New) */}
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
          <Link href="/register-volunteer" className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg hover:shadow-slate-300 active:scale-95 group">
            <UserPlus size={18} className="text-rose-400 group-hover:animate-pulse" /> 
            আপনিও ভলান্টিয়ার হতে চান?
          </Link>
        </div>

      </div>
    </section>
  );
}