'use client';

import React from 'react';
import { Users, UserCheck, Banknote, Wallet, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";

export default function BranchManagerOverview() {
  const stats = [
    { label: "মোট স্টাফ", value: "১২ জন", icon: <Users size={20}/>, color: "bg-blue-50 text-blue-600" },
    { label: "পেন্ডিং মেম্বার", value: "০৮ জন", icon: <UserCheck size={20}/>, color: "bg-orange-50 text-orange-600" },
    { label: "আজকের আদায়", value: "৳ ১৫,৪৫০", icon: <Banknote size={20}/>, color: "bg-emerald-50 text-emerald-600" },
    { label: "ব্রাঞ্চ ক্যাশ", value: "৳ ৪২,৮০০", icon: <Wallet size={20}/>, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">সাঘাটা ব্রাঞ্চ ওভারভিউ</h1>
          <p className="text-sm text-slate-500">স্বাগতম, আজ আপনার ব্রাঞ্চের বর্তমান অবস্থা নিচে দেওয়া হলো।</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-2">
          <Clock size={16} className="text-blue-500" />
          <span className="text-sm font-bold text-slate-600">ফেব্রুয়ারি ২৩, ২০২৬</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-4`}>{s.icon}</div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
            <h3 className="text-xl font-black text-slate-800 mt-1">{s.value}</h3>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <UserCheck size={18} className="text-blue-500" /> পেন্ডিং মেম্বার অ্যাপ্রুভাল
            </h3>
            <button className="text-xs font-bold text-blue-600 hover:underline">সবগুলো দেখুন</button>
          </div>
          <div className="divide-y divide-slate-50">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold">M</div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">মোঃ আব্দুর রহিম</p>
                    <p className="text-[10px] text-slate-400">অনুরোধ: ২ ঘণ্টা আগে</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-lg hover:bg-blue-700">অ্যাপ্রুভ</button>
                  <button className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg hover:bg-slate-200">বিস্তারিত</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
           <h3 className="font-bold text-slate-800 text-sm mb-6 flex items-center gap-2">
              <BarChart3 size={18} className="text-blue-500" /> আজকের স্টাফ রিপোর্ট
           </h3>
           <div className="space-y-4">
              {[ {name: "করিম স্টাফ", target: "৮০%", collection: "৳ ৪,৫০০"}, {name: "রহিমা খাতুন", target: "৯৫%", collection: "৳ ৬,২০০"} ].map((staff, i) => (
                <div key={i} className="flex flex-col gap-2">
                   <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-600">{staff.name}</span>
                      <span className="text-blue-600">{staff.target} লক্ষ্যমাত্রা</span>
                   </div>
                   <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full" style={{width: staff.target}}></div>
                   </div>
                   <p className="text-[10px] text-slate-400">আজকের আদায়: <b>{staff.collection}</b></p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}