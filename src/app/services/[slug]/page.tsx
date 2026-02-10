'use client';

// 1. { use } ইমপোর্ট করা হয়েছে (Next.js 15+ এর জন্য জরুরি)
import React, { use } from 'react';
import Link from "next/link";
import { 
  ArrowLeft, 
  Phone, 
  Tractor, 
  Sprout, 
  Droplets, 
  Sun, 
  Wheat,
  ArrowRight,
  HelpCircle,
  CheckCircle // আগে মিসিং ছিল, যোগ করা হলো
} from "lucide-react";

// ইমপোর্ট পাথ (আপনার ফোল্ডার স্ট্রাকচার অনুযায়ী ৩ ধাপ পেছনে)
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

// ডাটাবেজ
const servicesData: any = {
  "agriculture": {
    theme: "emerald",
    title: "কৃষি ও খামার সুরক্ষা",
    subtitle: "প্রযুক্তির ছোঁয়ায় ফলবে সোনা, কৃষক থাকবে দুশ্চিন্তামুক্ত",
    description: "আমানত ফাউন্ডেশন বাংলাদেশের কৃষকদের ভাগ্য উন্নয়নে প্রতিশ্রুতিবদ্ধ। আমরা সনাতন পদ্ধতির বদলে আধুনিক যন্ত্রপাতি এবং বিজ্ঞানসম্মত চাষাবাদে কৃষকদের সহায়তা করছি। আমাদের লক্ষ্য— উৎপাদন খরচ কমানো এবং ফসলের ন্যায্য মূল্য নিশ্চিত করা।",
    gradient: "from-emerald-900 via-emerald-800 to-green-700",
    features: [
      {
        icon: <Tractor size={32} />,
        title: "আধুনিক যন্ত্রপাতি",
        desc: "পাওয়ার টিলার, ধান মাড়াই ও কাটার মেশিন নামমাত্র ভাড়ায় ব্যবহারের সুযোগ।"
      },
      {
        icon: <Wheat size={32} />,
        title: "শস্য ব্যাংক (Grain Bank)",
        desc: "ফসল ওঠার পর কম দামে না বেচে আমাদের গোডাউনে রাখুন এবং তাৎক্ষণিক লোন নিন।"
      },
      {
        icon: <Sprout size={32} />,
        title: "উন্নত বীজ ও সার",
        desc: "মৌসুমের শুরুতে বাকিতে বা ভর্তুকি মূল্যে মানসম্মত বীজ ও সার সরবরাহ।"
      },
      {
        icon: <Droplets size={32} />,
        title: "সেচ ও পানি ব্যবস্থাপনা",
        desc: "শুষ্ক মৌসুমে জমিতে পানি দেওয়ার জন্য যৌথ সেচ পাম্পের ব্যবস্থা।"
      }
    ],
    steps: [
      "আমানত ফাউন্ডেশনের মেম্বার হোন",
      "নিকটস্থ অফিসে চাহিদা জানান",
      "নামমাত্র সার্ভিস চার্জ প্রদান করুন",
      "সেবা গ্রহণ করুন"
    ],
    faqs: [
      { q: "মেশিন ভাড়া নিতে কত দিন আগে জানাতে হবে?", a: "মেশিন ব্যবহারের অন্তত ৩ দিন আগে বুকিং দিতে হবে।" },
      { q: "শস্য ব্যাংকে কত দিন ফসল রাখা যায়?", a: "সর্বোচ্চ ৬ মাস পর্যন্ত ফসল রাখা যাবে।" }
    ]
  },
  
  // অন্যান্য পেজের জন্য ডিফল্ট ডাটা
  "investment": {
    theme: "blue",
    title: "বিনিয়োগ ও লোন",
    subtitle: "হালাল উপায়ে স্বাবলম্বী হোন",
    gradient: "from-blue-900 to-blue-600",
    features: [], steps: [], faqs: []
  },
};

// 2. টাইপ পরিবর্তন: params এখন Promise<{ slug: string }>
export default function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  
  // 3. React.use() ব্যবহার করে params আনর‍্যাপ করা হলো
  const { slug } = use(params);
  
  const service = servicesData[slug] || servicesData['agriculture'];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* Hero Section */}
      <div className={`relative bg-gradient-to-br ${service.gradient || "from-slate-800 to-slate-600"} text-white py-20 md:py-32 overflow-hidden`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-slate-50 clip-path-slant"></div>

        <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
          <Link href="/#services" className="inline-flex items-center gap-2 text-emerald-100 hover:text-white mb-6 transition bg-white/10 px-4 py-2 rounded-full text-sm">
            <ArrowLeft size={16} /> সব সেবাসমূহ
          </Link>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            {service.title}
          </h1>
          <p className="text-lg md:text-xl text-emerald-50 max-w-2xl leading-relaxed mb-8">
            {service.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-yellow-400 text-emerald-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition shadow-lg">
              আবেদন করুন
            </button>
            <button className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition">
              বিস্তারিত জানুন
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Sun className="text-yellow-500" /> সেবা সম্পর্কে
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {service.description || "বিস্তারিত তথ্য শীঘ্রই আসছে..."}
              </p>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">আমাদের বিশেষ সুবিধাসমূহ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {service.features?.map((item: any, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition hover:border-emerald-300 group">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h4>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            {service.faqs && service.faqs.length > 0 && (
              <div className="bg-emerald-50 rounded-2xl p-6 md:p-8 mt-8">
                <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                  <HelpCircle /> সচরাচর জিজ্ঞাসা
                </h3>
                <div className="space-y-4">
                  {service.faqs.map((faq: any, i: number) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="font-bold text-slate-800 mb-2">❓ {faq.q}</p>
                      <p className="text-slate-600 text-sm">✅ {faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-emerald-500">
              <h3 className="text-lg font-bold text-slate-800 mb-6">সেবা গ্রহণের প্রক্রিয়া</h3>
              <ul className="space-y-0">
                {service.steps?.map((step: string, index: number) => (
                  <li key={index} className="flex gap-4 pb-6 relative last:pb-0">
                    {index !== (service.steps?.length || 0) - 1 && (
                      <div className="absolute left-[11px] top-8 bottom-0 w-[2px] bg-slate-200"></div>
                    )}
                    <div className="w-6 h-6 rounded-full bg-emerald-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold ring-4 ring-emerald-50">
                      {index + 1}
                    </div>
                    <span className="text-slate-600 font-medium">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>
              <h3 className="text-lg font-bold mb-4">জরুরি প্রয়োজনে</h3>
              <div className="flex items-center gap-3 mb-2">
                <Phone className="text-yellow-400" />
                <span className="text-2xl font-bold">০৯৬XX-XXXXXX</span>
              </div>
              <p className="text-slate-400 text-sm">সকাল ৯টা থেকে সন্ধ্যা ৬টা পর্যন্ত</p>
              
              <Link href="#" className="mt-6 block w-full bg-emerald-600 text-center py-3 rounded-lg font-bold hover:bg-emerald-500 transition">
                সরাসরি কল করুন
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-4">অন্যান্য সেবাসমূহ</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/services/investment" className="flex items-center justify-between text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 p-2 rounded transition">
                    বিনিয়োগ ও লোন <ArrowRight size={16}/>
                  </Link>
                </li>
                <li>
                  <Link href="/services/health" className="flex items-center justify-between text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 p-2 rounded transition">
                    স্বাস্থ্য সুরক্ষা <ArrowRight size={16}/>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}