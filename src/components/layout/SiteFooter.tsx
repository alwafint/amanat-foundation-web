'use client';

import React from 'react';
import Link from "next/link";
import { 
  MapPin, Phone, Mail, Facebook, Youtube, 
  ArrowRight, Heart 
} from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 pt-20 pb-8 overflow-hidden">
      
      {/* --- Top Gradient Border --- */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-amber-500 to-teal-500 opacity-90"></div>

      {/* --- Background Decorative Blobs --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* --- Top Section (Grid) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* 1. Brand & About */}
          <div className="space-y-6 pr-0 lg:pr-6">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-2xl shadow-lg shadow-emerald-900/20 inline-block">
                <img 
                  src="/img/amanat.png" 
                  alt="Amanat Foundation" 
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm font-medium">
              আমানত ফাউন্ডেশন দেশের প্রতিটি গ্রামকে একটি স্বাবলম্বী অর্থনৈতিক ইউনিটে রূপান্তর করতে বদ্ধপরিকর। এই মহৎ লক্ষ্য বাস্তবায়নে আমরা প্রতিটি গ্রাম থেকে একজন করে দক্ষ ও নিবেদিতপ্রাণ 'ভলান্টিয়ার টিম লিডার' খুঁজছি। আপনার সঞ্চয় ও বিশ্বাস আমাদের কাছে পবিত্র আমানত।
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://www.facebook.com/amanat.ltd/" className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 hover:-translate-y-1 text-slate-400 hover:text-white transition-all duration-300 shadow-sm">
                <Facebook size={18} />
              </a>
              <a href="https://www.facebook.com/amanat.ltd/" className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center hover:bg-red-600 hover:border-red-500 hover:-translate-y-1 text-slate-400 hover:text-white transition-all duration-300 shadow-sm">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="text-lg font-extrabold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> গুরুত্বপূর্ণ লিংক
            </h4>
            <ul className="space-y-3.5">
              {[
                { name: "হোম পেজ", path: "/" },
                { name: "আমাদের সম্পর্কে", path: "/#about" },
                { name: "মেম্বার লগইন", path: "/login" },
                { name: "রেজিস্ট্রেশন করুন", path: "/register" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.path} className="group flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors text-sm font-medium">
                    <ArrowRight size={14} className="text-slate-700 group-hover:text-emerald-400 group-hover:translate-x-1 transition-transform" /> 
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Our Services */}
          <div>
            <h4 className="text-lg font-extrabold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> আমাদের সেবাসমূহ
            </h4>
            <ul className="space-y-3.5">
              {[
                { name: "কৃষক ও কৃষি সেবা", path: "/services/farmer-service" },
                { name: "বিনিয়োগ ও লোন", path: "/services/investment" },
                { name: "স্বাস্থ্য সুরক্ষা", path: "/services/health" },
                { name: "কারিগরি প্রশিক্ষণ", path: "/services/education" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.path} className="group flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors text-sm font-medium">
                    <ArrowRight size={14} className="text-slate-700 group-hover:text-emerald-400 group-hover:translate-x-1 transition-transform" /> 
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h4 className="text-lg font-extrabold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span> যোগাযোগ
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl flex-shrink-0 text-amber-500">
                  <MapPin size={18} />
                </div>
                <span className="text-sm text-slate-400 leading-relaxed mt-1.5 font-medium">বোনারপাড়া বাজার, সাঘাটা,<br/> গাইবান্ধা, বাংলাদেশ।</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl flex-shrink-0 text-emerald-500">
                  <Phone size={18} />
                </div>
                <span className="text-sm font-bold text-white tracking-wide mt-1">০১৭XX-XXXXXX</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl flex-shrink-0 text-teal-500">
                  <Mail size={18} />
                </div>
                <span className="text-sm text-slate-400 font-medium mt-1">amanatltd@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Bottom Section (Copyright) --- */}
        <div className="border-t border-slate-800/60 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-sm text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} <span className="text-emerald-500 font-bold">আমানত ফাউন্ডেশন</span>। সর্বস্বত্ব সংরক্ষিত।
          </p>
          
          <div className="flex gap-8 text-sm text-slate-500 font-medium">
            <Link href="#" className="hover:text-amber-400 transition-colors">গোপনীয়তা নীতি</Link>
            <Link href="#" className="hover:text-amber-400 transition-colors">শর্তাবলী</Link>
          </div>
          
          <p className="text-xs text-slate-600 flex items-center gap-1.5 justify-center md:justify-start font-medium bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
            Made with <Heart size={12} className="text-rose-500 fill-rose-500 animate-pulse" /> for Humanity
          </p>
        </div>

      </div>
    </footer>
  );
}