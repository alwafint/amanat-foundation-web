'use client';

import React from 'react';
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-slate-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">A</div>
            <span className="text-2xl font-bold text-white">আমানত ফাউন্ডেশন</span>
          </div>
          <p className="text-slate-400 max-w-sm leading-relaxed">
            সমগ্র বাংলাদেশের মানুষের সেবায় নিয়োজিত একটি অলাভজনক প্রতিষ্ঠান।
          </p>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-6 border-b-2 border-emerald-600 pb-2 inline-block">যোগাযোগ</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3"><MapPin size={20} className="text-emerald-500"/> <span>ঢাকা, বাংলাদেশ</span></li>
            <li className="flex items-center gap-3"><Phone size={20} className="text-emerald-500"/> <span>০৯৬XX-XXXXXX</span></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-6 border-b-2 border-emerald-600 pb-2 inline-block">লিংক</h4>
          <ul className="space-y-3">
            <li><Link href="/login" className="hover:text-emerald-400">লগইন</Link></li>
            <li><Link href="/register" className="hover:text-emerald-400">রেজিস্টার</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 mt-16 pt-8 text-center">
        <p className="text-sm text-slate-500">&copy; ২০২৪ আমানত ফাউন্ডেশন।</p>
      </div>
    </footer>
  );
}