'use client';

import React, { use } from 'react';
import Link from "next/link";
import { ArrowLeft, Heart, Calendar, MapPin, Users, CheckCircle } from "lucide-react";

// সঠিক রিলেটিভ ইমপোর্ট (৩ ধাপ পেছনে)
import Navbar from '../../../components/layout/Navbar';
import SiteFooter from '../../../components/layout/SiteFooter';

// ... বাকি কোড যেমন ছিল তেমনই থাকবে

// সমাজসেবা প্রোজেক্টের ডাটা
const projectsData: any = {
  "winter-relief": {
    title: "শীতবস্ত্র ও ত্রাণ বিতরণ",
    image: "bg-blue-600", // এখানে ইমেজ ইউআরএল বসাতে পারেন
    date: "প্রতি বছর ডিসেম্বর-জানুয়ারি",
    location: "উত্তরবঙ্গ ও চরাঞ্চল",
    beneficiaries: "৫০০০+ পরিবার",
    description: "তীব্র শীতে যখন জনজীবন বিপর্যস্ত হয়ে পড়ে, তখন আমানত ফাউন্ডেশন অসহায় মানুষের পাশে দাঁড়ায়। আমরা প্রতি বছর চরাঞ্চলের হাজার হাজার মানুষের মাঝে কম্বল, জ্যাকেট এবং শুকনো খাবার বিতরণ করি।",
    activities: [
      "অসহায় বৃদ্ধদের মাঝে কম্বল বিতরণ",
      "শিশুদের জন্য গরম কাপড় প্রদান",
      "রাতের বেলা ভাসমান মানুষের কাছে ত্রাণ পৌঁছানো",
      "জরুরি শুকনো খাবার সরবরাহ"
    ]
  },
  "scholarship": {
    title: "মেধাবী শিক্ষা বৃত্তি",
    image: "bg-emerald-600",
    date: "সারা বছর",
    location: "সারা দেশ",
    beneficiaries: "২০০+ শিক্ষার্থী",
    description: "অর্থের অভাবে যেন কোনো মেধাবী শিক্ষার্থীর পড়াশোনা বন্ধ না হয়। আমরা এসএসসি ও এইচএসসি পর্যায়ে ভালো ফলাফল করা দরিদ্র শিক্ষার্থীদের মাসিক বৃত্তি প্রদান করি।",
    activities: [
      "মাসিক শিক্ষাবৃত্তি প্রদান",
      "বিনা মূল্যে বই ও খাতা বিতরণ",
      "পরীক্ষার ফর্ম ফিলাপ সহায়তা",
      "ক্যারিয়ার গাইডলাইন সেশন"
    ]
  },
  "tree-plantation": {
    title: "সবুজায়ন ও বৃক্ষরোপণ",
    image: "bg-green-600",
    date: "জুন - আগস্ট (বর্ষাকাল)",
    location: "সারা দেশ",
    beneficiaries: "পরিবেশ ও সমাজ",
    description: "জলবায়ু পরিবর্তনের প্রভাব মোকাবিলায় আমরা প্রতি বছর হাজার হাজার গাছ লাগাই। আমাদের মেম্বারদের মাঝে বিনামূল্যে ফলজ ও বনজ গাছের চারা বিতরণ করা হয়।",
    activities: [
      "বিনামূল্যে চারা বিতরণ",
      "রাস্তার ধারে গাছ লাগানো",
      "স্কুল-কলেজে বৃক্ষরোপণ কর্মসূচি",
      "পরিবেশ সচেতনতা বৃদ্ধি"
    ]
  },
  "eye-camp": {
    title: "ফ্রি চক্ষু শিবির",
    image: "bg-red-600",
    date: "বছরে ২ বার",
    location: "প্রত্যন্ত অঞ্চল",
    beneficiaries: "১০০০+ রোগী",
    description: "গ্রামের অনেক বয়স্ক মানুষ ছানি পড়ার কারণে অন্ধত্ব বরণ করেন। আমরা বিশেষজ্ঞ ডাক্তারদের নিয়ে ক্যাম্প করি এবং বিনামূল্যে ছানি অপারেশন ও চশমা প্রদান করি।",
    activities: [
      "বিনামূল্যে চোখ পরীক্ষা",
      "ছানি অপারেশন (ফ্রি লেন্স)",
      "ওষুধ ও চশমা বিতরণ",
      "ডায়াবেটিস চেকআপ"
    ]
  }
};

export default function SocialWorkDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = projectsData[slug];

  if (!project) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">প্রজেক্টটি পাওয়া যায়নি</h1>
            <Link href="/" className="text-emerald-600 underline mt-4">হোম পেজে ফিরে যান</Link>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Hero Header */}
      <div className={`relative ${project.image} text-white py-24`}>
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/#services" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition bg-white/10 px-4 py-2 rounded-full text-sm">
            <ArrowLeft size={16} /> হোম পেজে ফিরে যান
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{project.title}</h1>
          
          <div className="flex flex-wrap gap-6 mt-6 text-white/90">
             <div className="flex items-center gap-2">
                <Calendar size={18} /> <span>{project.date}</span>
             </div>
             <div className="flex items-center gap-2">
                <MapPin size={18} /> <span>{project.location}</span>
             </div>
             <div className="flex items-center gap-2">
                <Users size={18} /> <span>{project.beneficiaries}</span>
             </div>
          </div>
        </div>
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
             <h2 className="text-2xl font-bold text-slate-800 mb-6">কার্যক্রমের বিস্তারিত</h2>
             <p className="text-slate-600 text-lg leading-relaxed mb-10">
                {project.description}
             </p>

             <h3 className="text-xl font-bold text-slate-800 mb-6">আমাদের মূল কাজসমূহ</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {project.activities.map((act: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-slate-100">
                     <CheckCircle className="text-emerald-600 flex-shrink-0" size={20}/>
                     <span className="text-slate-700 font-medium">{act}</span>
                  </div>
               ))}
             </div>
          </div>

          {/* Sidebar (Donation) */}
          <div className="lg:col-span-1">
             <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-yellow-500 sticky top-24">
                <h3 className="text-xl font-bold text-slate-800 mb-4">এই উদ্যোগে শরিক হোন</h3>
                <p className="text-slate-500 mb-6 text-sm">
                   আপনার সামান্য অনুদান একজন অসহায় মানুষের মুখে হাসি ফোটাতে পারে। আজই দান করুন।
                </p>
                
                <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition flex items-center justify-center gap-2 mb-4 shadow-lg shadow-emerald-200">
                   <Heart size={20} fill="white" /> অনলাইনে দান করুন
                </button>
                <button className="w-full bg-white text-emerald-700 border border-emerald-200 py-3 rounded-lg font-bold hover:bg-emerald-50 transition">
                   বিস্তারিত জানতে কল করুন
                </button>

                <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                   <p className="text-xs text-slate-400">বিকাশ / নগদ / রকেট এর মাধ্যমে দান গ্রহণ করা হয়</p>
                </div>
             </div>
          </div>

        </div>
      </div>

      <SiteFooter />
    </div>
  );
}