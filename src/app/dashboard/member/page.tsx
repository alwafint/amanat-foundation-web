'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Wallet, CreditCard, TrendingUp, ArrowRight, 
  Megaphone, Calendar, CheckCircle2, Star,
  LayoutGrid, User, LifeBuoy // Fixed Imports
} from "lucide-react";

export default function MemberOverview() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">স্বাগতম, {user?.full_name || 'সদস্য'} 👋</h1>
          <p className="text-emerald-100 max-w-xl text-sm md:text-base">আমানত ফাউন্ডেশনের সাথে আপনার পথচলা হোক সমৃদ্ধ ও নিরাপদ। আপনার আজকের আপডেটগুলো নিচে দেখুন।</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Summary Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Savings Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-emerald-500 transition">
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">মোট সঞ্চয়</p>
                <h3 className="text-3xl font-bold text-slate-800">৳ ১৫,৫০০</h3>
                <Link href="/dashboard/member/savings" className="text-xs text-emerald-600 font-bold mt-3 flex items-center gap-1 hover:underline">
                  বিস্তারিত দেখুন <ArrowRight size={12}/>
                </Link>
              </div>
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition">
                <Wallet size={28}/>
              </div>
            </div>

            {/* Loan Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-blue-500 transition">
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">বাকি লোন</p>
                <h3 className="text-3xl font-bold text-slate-800">৳ ১০,০০০</h3>
                <Link href="/dashboard/member/loan" className="text-xs text-blue-600 font-bold mt-3 flex items-center gap-1 hover:underline">
                  কিস্তি পরিশোধ করুন <ArrowRight size={12}/>
                </Link>
              </div>
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition">
                <CreditCard size={28}/>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <h3 className="font-bold text-slate-800 mb-4">দ্রুত এক্সেস</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/dashboard/member" className="p-4 bg-slate-50 rounded-xl text-center hover:bg-emerald-50 transition border border-transparent hover:border-emerald-100">
                   <LayoutGrid className="mx-auto mb-2 text-emerald-600" size={24}/>
                   <span className="text-xs font-bold text-slate-600">সব সেবা</span>
                </Link>
                <Link href="/dashboard/member/profile" className="p-4 bg-slate-50 rounded-xl text-center hover:bg-emerald-50 transition border border-transparent hover:border-emerald-100">
                   <User size={24} className="mx-auto mb-2 text-emerald-600"/>
                   <span className="text-xs font-bold text-slate-600">আইডি কার্ড</span>
                </Link>
                <Link href="/dashboard/member/savings" className="p-4 bg-slate-50 rounded-xl text-center hover:bg-emerald-50 transition border border-transparent hover:border-emerald-100">
                   <TrendingUp className="mx-auto mb-2 text-emerald-600" size={24}/>
                   <span className="text-xs font-bold text-slate-600">টাকা জমা</span>
                </Link>
                <Link href="/dashboard/member" className="p-4 bg-slate-50 rounded-xl text-center hover:bg-emerald-50 transition border border-transparent hover:border-emerald-100">
                   <LifeBuoy className="mx-auto mb-2 text-emerald-600" size={24}/>
                   <span className="text-xs font-bold text-slate-600">সহায়তা</span>
                </Link>
             </div>
          </div>
        </div>

        {/* Right Side: Notice Board & Alerts */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-yellow-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-100 text-yellow-700 rounded-lg">
                <Megaphone size={20}/>
              </div>
              <h3 className="font-bold text-slate-800">নোটিশ বোর্ড</h3>
            </div>
            
            <div className="space-y-4">
               <div className="border-b border-slate-50 pb-3">
                  <p className="text-xs text-slate-400 font-bold flex items-center gap-1 mb-1">
                    <Calendar size={12}/> ১০ অক্টোবর, ২০২৪
                  </p>
                  <h4 className="text-sm font-bold text-slate-700 hover:text-emerald-600 cursor-pointer transition">আগামী শুক্রবার ফ্রি চক্ষু শিবির অনুষ্ঠিত হবে।</h4>
               </div>
               <div className="border-b border-slate-50 pb-3">
                  <p className="text-xs text-slate-400 font-bold flex items-center gap-1 mb-1">
                    <Calendar size={12}/> ০৫ অক্টোবর, ২০২৪
                  </p>
                  <h4 className="text-sm font-bold text-slate-700 hover:text-emerald-600 cursor-pointer transition">নতুন লোন পলিসি ও সঞ্চয়ের হার আপডেট করা হয়েছে।</h4>
               </div>
            </div>
            <button className="w-full mt-4 py-2 text-xs font-bold text-emerald-600 hover:underline">সব নোটিশ দেখুন</button>
          </div>

          {/* Membership Badge */}
          <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-xl text-center relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:rotate-12 transition">
              <Star size={80} fill="white"/>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-2">আপনার মেম্বারশিপ</p>
            <h4 className="text-xl font-bold mb-4">প্রিমিয়াম সদস্য</h4>
            <div className="flex items-center justify-center gap-1 text-yellow-400">
               <CheckCircle2 size={16}/> <span className="text-xs font-medium">ভেরিফাইড অ্যাকাউন্ট</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}