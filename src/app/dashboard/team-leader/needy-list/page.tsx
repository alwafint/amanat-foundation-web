'use client';

import React from 'react';
import { UserPlus, List } from "lucide-react";

export default function NeedyListPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-orange-600 text-white p-6 rounded-2xl mb-6 shadow-lg">
        <h2 className="text-xl font-bold">অসহায় ও দরিদ্র তালিকা</h2>
        <p className="text-orange-100 text-sm">ভবিষ্যৎ সাহায্যের জন্য তালিকা প্রস্তুত রাখুন</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
         <h3 className="font-bold text-slate-800 mb-4">নতুন নাম যোগ করুন</h3>
         <div className="space-y-4">
            <input type="text" placeholder="নাম" className="w-full p-3 border rounded-xl" />
            <input type="text" placeholder="সমস্যা (যেমন: বিধবা / অসুস্থ)" className="w-full p-3 border rounded-xl" />
            <input type="text" placeholder="মোবাইল (যদি থাকে)" className="w-full p-3 border rounded-xl" />
            <button className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold">লিস্টে সেভ করুন</button>
         </div>
      </div>
      
      {/* List would be here */}
    </div>
  );
}