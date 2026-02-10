'use client';

import React from 'react';
import Link from "next/link"; // Link ইমপোর্ট করা হয়েছে
import { Tractor, Wallet, HeartPulse, GraduationCap, Sprout, CheckCircle, ArrowRight } from "lucide-react";

// সার্ভিস আইটেমের টাইপ ডেফিনিশন (slug যুক্ত করা হয়েছে)
interface ServiceItem {
  title: string;
  icon: React.ReactNode;
  desc: string;
  borderColor: string;
  iconColor: string;
  slug: string; // URL এর জন্য স্লাগ
}

export default function Services() {
  const services: ServiceItem[] = [
    {
      title: "কৃষি ও খামার সুরক্ষা",
      slug: "agriculture", // URL হবে: /services/agriculture
      icon: <Tractor className="w-8 h-8 text-emerald-600" />,
      desc: "দেশজুড়ে কৃষকদের জন্য আধুনিক যন্ত্রপাতি ও শস্য ব্যাংক সুবিধা।",
      borderColor: "border-emerald-500",
      iconColor: "bg-emerald-50"
    },
    {
      title: "বিনিয়োগ ও লোন",
      slug: "investment",
      icon: <Wallet className="w-8 h-8 text-blue-600" />,
      desc: "ক্ষুদ্র ও মাঝারি উদ্যোক্তাদের জন্য সহজ শর্তে হালাল বিনিয়োগ।",
      borderColor: "border-blue-500",
      iconColor: "bg-blue-50"
    },
    {
      title: "স্বাস্থ্য সুরক্ষা",
      slug: "health",
      icon: <HeartPulse className="w-8 h-8 text-red-500" />,
      desc: "ফ্রি টেলিমেডিসিন, মেডিকেল ক্যাম্প ও মা-শিশু যত্ন।",
      borderColor: "border-red-500",
      iconColor: "bg-red-50"
    },
    {
      title: "শিক্ষা ও আইটি",
      slug: "education",
      icon: <GraduationCap className="w-8 h-8 text-purple-600" />,
      desc: "কারিগরি প্রশিক্ষণ, স্কলারশিপ ও ফ্রিল্যান্সিং সহায়তা।",
      borderColor: "border-purple-500",
      iconColor: "bg-purple-50"
    },
    {
      title: "প্রাণিসম্পদ উন্নয়ন",
      slug: "livestock",
      icon: <Sprout className="w-8 h-8 text-yellow-600" />,
      desc: "খামারিদের জন্য টিকাদান কর্মসূচি ও ভেটেরিনারি ক্যাম্প।",
      borderColor: "border-yellow-500",
      iconColor: "bg-yellow-50"
    },
    {
      title: "দেশব্যাপী ডিজিটাল সেবা",
      slug: "digital-service",
      icon: <CheckCircle className="w-8 h-8 text-cyan-600" />,
      desc: "দেশের যেকোনো প্রান্ত থেকে অনলাইন সেবা ও বিল পেমেন্ট।",
      borderColor: "border-cyan-500",
      iconColor: "bg-cyan-50"
    }
  ];

  return (
    <section id="services" className="py-10 container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">আমাদের জাতীয় সেবাসমূহ</h2>
        <div className="w-20 h-1.5 bg-emerald-500 mx-auto rounded-full"></div>
        <p className="text-slate-600 mt-4 max-w-xl mx-auto text-lg">
          বাংলাদেশের প্রতিটি মানুষের জীবনযাত্রার মান উন্নয়নে আমরা দিচ্ছি বহুমুখী সুবিধা।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((item, index) => (
          <Link href={`/services/${item.slug}`} key={index} className="block h-full group">
            <div 
              className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 ${item.borderColor} h-full relative hover:-translate-y-2`}
            >
              <div className={`${item.iconColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-8">{item.desc}</p>
              
              {/* বিস্তারিত দেখুন বাটন */}
              <div className="absolute bottom-8 left-8 flex items-center gap-2 text-sm font-bold text-emerald-600 group-hover:underline">
                বিস্তারিত দেখুন <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}