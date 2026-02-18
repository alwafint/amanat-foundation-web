'use client';

import React, { useState } from 'react';
import { 
  Settings, Save, Percent, Banknote, ShieldCheck, 
  Bell, Globe, Smartphone, Lock, Info, 
  RotateCcw, AppWindow, Loader2, Database,
  ChevronRight, AlertTriangle
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function SuperAdminSettings() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'financial' | 'security'>('general');

  // সেটিংস ডাটা স্টেট
  const [config, setConfig] = useState({
    profitMargin: '10',
    memberFee: '500',
    reserveFundTarget: '1000000',
    hotline: '096XXXXXXXX',
    officeAddress: 'সাঘাটা বাজার, গাইবান্ধা',
    allowRegistration: true,
    maintenanceMode: false
  });

  const handleSave = async () => {
    setLoading(true);
    // বর্তমানে ডামি টাইমআউট, বাস্তবে সুপাবেজ আপডেট হবে
    setTimeout(() => {
      alert("সিস্টেম কনফিগারেশন সফলভাবে আপডেট করা হয়েছে!");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans text-slate-800">
      
      {/* --- Page Header --- */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <Settings className="text-[#006A4E]" size={32}/> সিস্টেম সেটিংস
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">আমানত ফাউন্ডেশনের গ্লোবাল কনফিগারেশন কন্ট্রোল</p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
            <div className="w-2 h-2 rounded-full bg-[#006A4E] animate-pulse"></div>
            <span className="text-xs font-bold text-[#006A4E] uppercase tracking-wider">Root Access Active</span>
        </div>
      </div>

      {/* --- Settings Tabs --- */}
      <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar bg-white p-1.5 rounded-2xl border border-slate-200 w-fit shadow-sm">
        <button 
          onClick={() => setActiveTab('general')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'general' ? 'bg-[#006A4E] text-white shadow-lg' : 'hover:bg-slate-50 text-slate-500'}`}
        >
          <AppWindow size={18}/> সাধারণ
        </button>
        <button 
          onClick={() => setActiveTab('financial')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'financial' ? 'bg-[#006A4E] text-white shadow-lg' : 'hover:bg-slate-50 text-slate-500'}`}
        >
          <Percent size={18}/> আর্থিক পলিসি
        </button>
        <button 
          onClick={() => setActiveTab('security')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'security' ? 'bg-[#006A4E] text-white shadow-lg' : 'hover:bg-slate-50 text-slate-500'}`}
        >
          <Lock size={18}/> সিকিউরিটি
        </button>
      </div>

      {/* --- Settings Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-6 md:p-10 animate-in slide-in-from-bottom-4 duration-500">
            
            {/* 1. General Tab */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                 <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    অফিস ও যোগাযোগ
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="হটলাইন নম্বর" value={config.hotline} type="text" onChange={(val:string) => setConfig({...config, hotline: val})} placeholder="০৯৬..." />
                    <InputGroup label="হেড অফিস ঠিকানা" value={config.officeAddress} type="text" onChange={(val:string) => setConfig({...config, officeAddress: val})} placeholder="ঠিকানা লিখুন" />
                 </div>
                 
                 <div className="pt-6 border-t border-slate-100 space-y-4">
                    <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-200 group transition hover:border-[#FFB800]">
                      <div>
                        <p className="font-bold text-slate-800">মেনটেন্যান্স মোড</p>
                        <p className="text-xs text-slate-500">চালু করলে মেম্বাররা অ্যাপ ব্যবহার করতে পারবে না</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={config.maintenanceMode} onChange={e => setConfig({...config, maintenanceMode: e.target.checked})} />
                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFB800]"></div>
                      </label>
                    </div>
                 </div>
              </div>
            )}

            {/* 2. Financial Tab */}
            {activeTab === 'financial' && (
              <div className="space-y-8">
                 <h3 className="text-xl font-bold text-slate-800 mb-6">আর্থিক প্যারামিটারসমূহ</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 transition group hover:border-[#006A4E]">
                      <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest flex items-center gap-2">
                        <Percent size={14} className="text-[#006A4E]"/> ইনভেস্টমেন্ট প্রফিট মার্জিন (%)
                      </label>
                      <input type="number" value={config.profitMargin} onChange={e => setConfig({...config, profitMargin: e.target.value})} className="w-full bg-transparent text-4xl font-black text-[#006A4E] outline-none" />
                    </div>
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 transition group hover:border-[#006A4E]">
                      <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest flex items-center gap-2">
                        <Banknote size={14} className="text-[#006A4E]"/> মেম্বার রেজিস্ট্রেশন ফি (৳)
                      </label>
                      <input type="number" value={config.memberFee} onChange={e => setConfig({...config, memberFee: e.target.value})} className="w-full bg-transparent text-4xl font-black text-[#006A4E] outline-none" />
                    </div>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200">
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">রিজার্ভ ফান্ড টার্গেট (৳)</label>
                    <input type="number" value={config.reserveFundTarget} onChange={e => setConfig({...config, reserveFundTarget: e.target.value})} className="w-full bg-transparent border-b-2 border-slate-200 py-2 outline-none focus:border-[#FFB800] text-xl font-bold text-slate-700" />
                 </div>
              </div>
            )}

            {/* 3. Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-4">
                 <h3 className="text-xl font-bold text-slate-800 mb-6">নিরাপত্তা ও ডাটাবেজ</h3>
                 <button className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between hover:border-[#006A4E] hover:bg-emerald-50/30 transition group">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-[#006A4E] transition">
                          <Lock size={20}/>
                       </div>
                       <span className="font-bold text-slate-700">সুপার অ্যাডমিন পাসওয়ার্ড পরিবর্তন</span>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-[#006A4E]"/>
                 </button>
                 <button className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between hover:border-[#006A4E] hover:bg-emerald-50/30 transition group">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-[#006A4E] transition">
                          <Database size={20}/>
                       </div>
                       <span className="font-bold text-slate-700">ফুল ডাটাবেজ ব্যাকআপ (JSON)</span>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-[#006A4E]"/>
                 </button>
              </div>
            )}

            {/* Save Button */}
            <div className="pt-10">
              <button 
                onClick={handleSave}
                disabled={loading}
                className="w-full md:w-auto bg-[#006A4E] text-white px-12 py-4 rounded-2xl font-bold text-lg hover:opacity-90 shadow-xl shadow-emerald-900/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin"/> : <><Save size={20}/> সেটিংস আপডেট করুন</>}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Info & Warnings */}
        <div className="lg:col-span-1 space-y-6">
           
           <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 p-4 text-slate-50 group-hover:rotate-12 transition">
                <Info size={100} className="text-[#F3F4F6]"/>
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <ShieldCheck size={20} className="text-[#006A4E]"/> অ্যাডমিন গাইড
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed relative z-10">
                এখানে পরিবর্তন করা প্রতিটি মান সরাসরি আমানত ফাউন্ডেশনের সকল শাখার আর্থিক এবং অপারেশনাল লজিককে প্রভাবিত করবে। 
              </p>
              <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-[#FFB800]/20 flex gap-3 relative z-10">
                 <AlertTriangle size={24} className="text-[#FFB800] shrink-0"/>
                 <p className="text-[11px] text-amber-800 font-bold leading-tight">
                   সতর্কতা: আর্থিক পলিসি পরিবর্তনের আগে বোর্ড অব ডিরেক্টরস এর লিখিত অনুমতি নিশ্চিত করুন।
                 </p>
              </div>
           </div>

           <div className="bg-white border border-red-100 p-8 rounded-[2.5rem] text-center shadow-sm">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
                <RotateCcw size={28} className="text-red-500"/>
              </div>
              <h4 className="text-slate-800 font-bold mb-2">ডিফল্ট সেটিংস</h4>
              <p className="text-slate-400 text-xs mb-6 px-4">সিস্টেমের সকল কনফিগারেশন পূর্বের ডিফল্ট অবস্থায় ফিরিয়ে নিতে চান?</p>
              <button className="text-red-600 text-xs font-black uppercase tracking-widest hover:underline">রিসেট অল সেটিংস</button>
           </div>

        </div>

      </div>

    </div>
  );
}

// Helper Input Component
function InputGroup({ label, value, type, onChange, placeholder }: any) {
    return (
        <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">{label}</label>
            <input 
              type={type} 
              value={value} 
              onChange={(e) => onChange(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#006A4E] focus:ring-4 focus:ring-[#006A4E]/5 transition font-bold text-slate-700 shadow-sm" 
              placeholder={placeholder} 
            />
        </div>
    )
}