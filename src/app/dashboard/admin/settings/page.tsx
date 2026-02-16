'use client';

import React, { useState } from 'react';
import { 
  Settings, Save, Percent, Banknote, ShieldCheck, 
  Bell, Globe, Smartphone, Lock, Info, 
  RotateCcw, AppWindow, Loader2, Database
} from "lucide-react";
// ৪ ধাপ পেছনে গিয়ে lib ফোল্ডার ধরা হয়েছে
import { supabase } from '../../../../lib/supabaseClient';

export default function AdminSettingsPage() {
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
    // বাস্তবে এখানে Supabase এর একটি 'settings' টেবিল আপডেট হবে
    setTimeout(() => {
      alert("সিস্টেম কনফিগারেশন সফলভাবে আপডেট করা হয়েছে!");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20 text-slate-300">
      
      {/* --- Page Header --- */}
      <div className="mb-10 border-b border-slate-800 pb-8">
        <h2 className="text-3xl font-black text-white flex items-center gap-3">
          <Settings className="text-emerald-500" size={32}/> সিস্টেম কনফিগারেশন
        </h2>
        <p className="text-slate-500 mt-1 uppercase tracking-widest font-bold text-xs">Amanat Core Engine Settings</p>
      </div>

      {/* --- Settings Tabs --- */}
      <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar bg-slate-900/50 p-2 rounded-2xl border border-slate-800 w-fit">
        <button 
          onClick={() => setActiveTab('general')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'general' ? 'bg-emerald-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}
        >
          <AppWindow size={18}/> সাধারণ
        </button>
        <button 
          onClick={() => setActiveTab('financial')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'financial' ? 'bg-emerald-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}
        >
          <Percent size={18}/> আর্থিক পলিসি
        </button>
        <button 
          onClick={() => setActiveTab('security')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'security' ? 'bg-emerald-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}
        >
          <Lock size={18}/> সিকিউরিটি
        </button>
      </div>

      {/* --- Settings Content Area --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. General Settings */}
          {activeTab === 'general' && (
            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 space-y-6 animate-in slide-in-from-left-4">
               <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 underline underline-offset-8 decoration-emerald-500/30">
                 অফিস ও যোগাযোগ তথ্য
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">হটলাইন নম্বর</label>
                    <input type="text" value={config.hotline} onChange={e => setConfig({...config, hotline: e.target.value})} className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:border-emerald-500 text-white font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">হেড অফিস ঠিকানা</label>
                    <input type="text" value={config.officeAddress} onChange={e => setConfig({...config, officeAddress: e.target.value})} className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:border-emerald-500 text-white" />
                  </div>
               </div>
               
               <div className="pt-6 border-t border-slate-800 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div>
                      <p className="font-bold text-white">মেনটেন্যান্স মোড (Maintenance)</p>
                      <p className="text-xs text-slate-500">চালু করলে ইউজাররা অ্যাপ ব্যবহার করতে পারবে না</p>
                    </div>
                    <input type="checkbox" className="w-6 h-6 accent-emerald-500" checked={config.maintenanceMode} onChange={e => setConfig({...config, maintenanceMode: e.target.checked})} />
                  </div>
               </div>
            </div>
          )}

          {/* 2. Financial Settings */}
          {activeTab === 'financial' && (
            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 space-y-6 animate-in slide-in-from-left-4">
               <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 underline underline-offset-8 decoration-emerald-500/30">
                 আর্থিক প্যারামিটারসমূহ
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 group hover:border-emerald-500/30 transition">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2"><Percent size={14}/> ইনভেস্টমেন্ট প্রফিট মার্জিন (%)</label>
                    <input type="number" value={config.profitMargin} onChange={e => setConfig({...config, profitMargin: e.target.value})} className="w-full bg-transparent text-4xl font-black text-emerald-500 outline-none" />
                    <p className="text-[10px] text-slate-600 mt-2">ডিফল্টভাবে ১০% সেট করা আছে</p>
                  </div>
                  <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 group hover:border-emerald-500/30 transition">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2"><Banknote size={14}/> মেম্বার রেজিস্ট্রেশন ফি (৳)</label>
                    <input type="number" value={config.memberFee} onChange={e => setConfig({...config, memberFee: e.target.value})} className="w-full bg-transparent text-4xl font-black text-emerald-500 outline-none" />
                    <p className="text-[10px] text-slate-600 mt-2">এককালীন সদস্যপদ ফি</p>
                  </div>
               </div>
               <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">রিজার্ভ ফান্ড টার্গেট (৳)</label>
                  <input type="number" value={config.reserveFundTarget} onChange={e => setConfig({...config, reserveFundTarget: e.target.value})} className="w-full p-4 bg-slate-900 border border-slate-800 rounded-2xl outline-none focus:border-emerald-500 text-white font-mono text-xl" />
               </div>
            </div>
          )}

          {/* 3. Security Settings */}
          {activeTab === 'security' && (
            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 space-y-6 animate-in slide-in-from-left-4">
               <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 underline underline-offset-8 decoration-emerald-500/30">
                 অ্যাডমিন সিকিউরিটি
               </h3>
               <div className="space-y-4">
                  <button className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between hover:bg-slate-800 transition group">
                     <div className="flex items-center gap-3">
                        <Lock className="text-slate-500 group-hover:text-emerald-500" size={20}/>
                        <span className="font-bold text-slate-300">অ্যাডমিন পাসওয়ার্ড পরিবর্তন</span>
                     </div>
                     <ChevronRight size={18} className="text-slate-600"/>
                  </button>
                  <button className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between hover:bg-slate-800 transition group">
                     <div className="flex items-center gap-3">
                        <Database className="text-slate-500 group-hover:text-emerald-500" size={20}/>
                        <span className="font-bold text-slate-300">ডাটাবেজ ব্যাকআপ (Download)</span>
                     </div>
                     <ChevronRight size={18} className="text-slate-600"/>
                  </button>
               </div>
            </div>
          )}

          {/* Save Button */}
          <div className="pt-4">
            <button 
              onClick={handleSave}
              disabled={loading}
              className="w-full md:w-auto bg-emerald-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-500 shadow-xl shadow-emerald-900/20 transition-all flex items-center justify-center gap-3 transform active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin"/> : <><Save size={20}/> আপডেট সেভ করুন</>}
            </button>
          </div>
        </div>

        {/* Right Side: Info Panel */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-indigo-900/50 border border-indigo-500/20 p-8 rounded-[2.5rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><Info size={100}/></div>
              <h4 className="text-lg font-bold text-white mb-4">নির্দেশিকা</h4>
              <p className="text-indigo-200 text-sm leading-relaxed">
                এখানে করা যেকোনো পরিবর্তন সরাসরি আপনার পুরো প্রতিষ্ঠানের অ্যাপের ওপর প্রভাব ফেলবে। বিশেষ করে **আর্থিক পলিসি** পরিবর্তনের আগে ইনভেস্টর বোর্ডের সাথে পরামর্শ করার অনুরোধ রইল। 
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-yellow-400 bg-yellow-400/10 p-3 rounded-xl border border-yellow-400/20">
                 <ShieldCheck size={16}/> এই পরিবর্তনগুলো শুধুমাত্র সুপার অ্যাডমিন করতে পারেন।
              </div>
           </div>

           <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] text-center">
              <RotateCcw size={32} className="mx-auto text-slate-500 mb-4"/>
              <h4 className="text-white font-bold mb-2">ফ্যাক্টরি রিসেট</h4>
              <p className="text-slate-500 text-xs mb-6">সিস্টেমের সকল সেটিংস ডিফল্ট মানে ফিরিয়ে নিতে চান?</p>
              <button className="text-red-400 text-xs font-bold hover:underline">রিসেট ডিফল্ট সেটিংস</button>
           </div>
        </div>

      </div>

    </div>
  );
}

function ChevronRight({ size, className }: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>;
}