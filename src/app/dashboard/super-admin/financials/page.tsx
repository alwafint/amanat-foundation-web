'use client';

import React, { useState } from 'react';
import { Landmark, TrendingUp, Wallet, PieChart, ArrowUpRight, BarChart } from "lucide-react";

export default function GlobalFinancials() {
  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><Landmark className="text-indigo-600"/> গ্লোবাল ফিন্যান্সিয়াল অডিট</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border-b-4 border-emerald-500">
           <p className="text-slate-400 text-xs font-bold uppercase mb-1">মোট কালেকশন</p>
           <h3 className="text-3xl font-black text-slate-800">৳ ৫,৫০,০০০</h3>
           <p className="text-emerald-600 text-xs mt-2 flex items-center gap-1 font-bold"><ArrowUpRight size={14}/> এই মাসে +১২%</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border-b-4 border-blue-500">
           <p className="text-slate-400 text-xs font-bold uppercase mb-1">মোট লোন বিতরণ</p>
           <h3 className="text-3xl font-black text-slate-800">৳ ৪,২০,০০০</h3>
        </div>
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border-b-4 border-amber-500">
           <p className="text-slate-400 text-xs font-bold uppercase mb-1">নিট মুনাফা</p>
           <h3 className="text-3xl font-black text-slate-800">৳ ৫২,০০০</h3>
        </div>
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white text-center">
         <PieChart size={48} className="mx-auto text-emerald-400 mb-4 animate-pulse"/>
         <h4 className="text-xl font-bold">মুনাফা বণ্টন বিশ্লেষণ</h4>
         <div className="mt-8 flex justify-center gap-8 flex-wrap">
            <div className="text-center"><p className="text-slate-400 text-xs uppercase font-bold">ইনভেস্টর (৪০%)</p><p className="text-lg font-bold">৳ ২০,৮০০</p></div>
            <div className="text-center"><p className="text-slate-400 text-xs uppercase font-bold">মেম্বার (২০%)</p><p className="text-lg font-bold">৳ ১০,৪০০</p></div>
            <div className="text-center"><p className="text-slate-400 text-xs uppercase font-bold">রিজার্ভ (৪০%)</p><p className="text-lg font-bold">৳ ২০,৮০০</p></div>
         </div>
      </div>
    </div>
  );
}