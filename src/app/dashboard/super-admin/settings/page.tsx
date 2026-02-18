'use client';

import React, { useState } from 'react';
import { Settings, Save, ShieldCheck, Percent, Bell, RotateCcw } from "lucide-react";

export default function SuperAdminSettings() {
  return (
    <div className="max-w-4xl animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2"><Settings className="text-slate-600"/> গ্লোবাল সিস্টেম সেটিংস</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Financial Settings */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
           <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Percent size={20} className="text-emerald-500"/> আর্থিক পলিসি</h3>
           <div className="space-y-4">
              <div><label className="text-xs font-bold text-slate-400 uppercase">প্রফিট মার্জিন (%)</label><input type="number" defaultValue="10" className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:border-emerald-500" /></div>
              <div><label className="text-xs font-bold text-slate-400 uppercase">মেম্বারশিপ ফি (৳)</label><input type="number" defaultValue="500" className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:border-emerald-500" /></div>
              <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition"><Save size={18}/> আপডেট করুন</button>
           </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
           <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><ShieldCheck size={20} className="text-red-500"/> সিকিউরিটি ও মেইনটেন্যান্স</h3>
           <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100">
                 <div><p className="font-bold text-red-800">মেইনটেন্যান্স মোড</p><p className="text-[10px] text-red-600 uppercase font-bold">Off</p></div>
                 <div className="w-12 h-6 bg-slate-300 rounded-full"></div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition"><RotateCcw size={18}/> ফ্যাক্টরি রিসেট</button>
           </div>
        </div>
      </div>
    </div>
  );
}