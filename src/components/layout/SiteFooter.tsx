'use client';

import React from 'react';
import Link from "next/link";
import { 
  MapPin, Phone, Mail, Facebook, Youtube, 
  ArrowRight, Heart 
} from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t-4 border-emerald-600">
      <div className="container mx-auto px-4">
        
        {/* --- Top Section (Grid) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Brand & About */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="/img/amanat.png" 
                alt="Amanat Foundation" 
                className="h-14 w-auto object-contain bg-white p-1.5 rounded-xl shadow-sm"
              />
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              গাইবান্ধার সাঘাটা ও চরাঞ্চলের মানুষের জীবনমান উন্নয়নে নিবেদিত একটি অলাভজনক প্রতিষ্ঠান। আপনার সঞ্চয় ও বিশ্বাস আমাদের কাছে পবিত্র আমানত।
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300 group">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition duration-300 group">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 border-b border-emerald-600 pb-2 inline-block">গুরুত্বপূর্ণ লিংক</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition flex items-center gap-2 text-sm">
                  <ArrowRight size={14}/> হোম পেজ
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-emerald-400 transition flex items-center gap-2 text-sm">
                  <ArrowRight size={14}/> আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-emerald-400 transition flex items-center gap-2 text-sm">
                  <ArrowRight size={14}/> মেম্বার লগইন
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-emerald-400 transition flex items-center gap-2 text-sm">
                  <ArrowRight size={14}/> রেজিস্ট্রেশন করুন
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Our Services */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 border-b border-emerald-600 pb-2 inline-block">আমাদের সেবাসমূহ</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services/farmer-service" className="hover:text-emerald-400 transition flex items-center gap-2 text-sm">
                  <ArrowRight size={14}/> কৃষক ও কৃষি সেবা
                </Link>
              </li>
              <li>
                <Link href="/services/investment" className="hover:text-emerald-400 transition flex items-center gap-2 text-sm">
                  <ArrowRight size={14}/> বিনিয়োগ ও লোন
                </Link>
              </li>
              <li>
                <Link href="/services/health" className="hover:text-emerald-400 transition flex items-center gap-2 text-sm">
                  <ArrowRight size={14}/> স্বাস্থ্য সুরক্ষা
                </Link>
              </li>
              <li>
                <Link href="/services/education" className="hover:text-emerald-400 transition flex items-center gap-2 text-sm">
                  <ArrowRight size={14}/> কারিগরি প্রশিক্ষণ
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 border-b border-emerald-600 pb-2 inline-block">যোগাযোগ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-emerald-500 mt-1 flex-shrink-0"/> 
                <span className="text-sm">সাঘাটা বাজার, সাঘাটা,<br/> গাইবান্ধা, বাংলাদেশ।</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-emerald-500 flex-shrink-0"/> 
                <span className="text-sm font-bold text-white">০১৭XX-XXXXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-emerald-500 flex-shrink-0"/> 
                <span className="text-sm">info@amanat-foundation.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Bottom Section (Copyright) --- */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} আমানত ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-white transition">গোপনীয়তা নীতি</Link>
            <Link href="#" className="hover:text-white transition">শর্তাবলী</Link>
          </div>
          <p className="text-xs text-slate-600 flex items-center gap-1 justify-center md:justify-start">
            Made with <Heart size={12} className="text-red-500 fill-red-500" /> for Humanity
          </p>
        </div>

      </div>
    </footer>
  );
}