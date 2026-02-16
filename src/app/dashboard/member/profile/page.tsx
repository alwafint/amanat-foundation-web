'use client';

import React, { useState, useEffect } from 'react';
import { User, Smartphone, MapPin, ShieldCheck, Download, Calendar, Mail } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Personal Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
             <h3 className="text-xl font-bold text-slate-800 mb-6">ব্যক্তিগত তথ্য</h3>
             <div className="space-y-6">
                <InfoRow icon={<User size={18}/>} label="পুরো নাম" value={user?.full_name} />
                <InfoRow icon={<Smartphone size={18}/>} label="মোবাইল নম্বর" value={user?.mobile} />
                <InfoRow icon={<MapPin size={18}/>} label="ঠিকানা" value={`${user?.village}, ${user?.upazila}, ${user?.district}`} />
                <InfoRow icon={<Calendar size={18}/>} label="যোগদানের তারিখ" value={new Date(user?.created_at).toLocaleDateString('bn-BD')} />
                <InfoRow icon={<ShieldCheck size={18}/>} label="মেম্বারশিপ স্ট্যাটাস" value={user?.status === 'active' ? 'সক্রিয়' : 'পেন্ডিং'} />
             </div>
             <button className="mt-8 w-full py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition">তথ্য পরিবর্তন করুন</button>
          </div>
        </div>

        {/* Right Column: Digital ID Card */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-bold text-slate-800 mb-4">ডিজিটাল আইডি কার্ড</h3>
          
          {/* ID CARD DESIGN */}
          <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-6 rounded-2xl shadow-2xl relative overflow-hidden aspect-[3/4] flex flex-col justify-between border-4 border-emerald-700/50">
             {/* Card Patterns */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
             
             <div className="text-center relative z-10">
                <div className="w-10 h-10 bg-white text-emerald-900 rounded-lg flex items-center justify-center font-bold text-xl mx-auto mb-4">A</div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-300">Amanat Foundation</h4>
             </div>

             <div className="text-center relative z-10">
                <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 border-4 border-emerald-600 overflow-hidden flex items-center justify-center">
                   <User size={60} className="text-emerald-100" />
                </div>
                <h5 className="text-lg font-bold leading-none">{user?.full_name}</h5>
                <p className="text-[10px] text-emerald-300 mt-2 font-mono tracking-widest uppercase">Member ID: {user?.id}</p>
             </div>

             <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10 mt-6 relative z-10">
                <div className="flex justify-between items-center text-[10px]">
                   <div className="text-left">
                      <p className="text-emerald-400 font-bold">এলাকা</p>
                      <p className="font-medium">{user?.village}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-emerald-400 font-bold">মোবাইল</p>
                      <p className="font-medium">{user?.mobile}</p>
                   </div>
                </div>
             </div>

             <div className="text-center mt-4">
                <div className="bg-white p-1 inline-block rounded-md opacity-80">
                   {/* QR Code Placeholder */}
                   <div className="w-12 h-12 bg-slate-800 flex items-center justify-center text-[8px] font-bold">QR CODE</div>
                </div>
             </div>
          </div>

          <button className="mt-6 w-full flex items-center justify-center gap-2 text-emerald-700 font-bold hover:underline">
            <Download size={18}/> কার্ড ডাউনলোড করুন
          </button>
        </div>

      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: any) {
    return (
        <div className="flex items-start gap-4">
            <div className="p-2 bg-slate-50 text-slate-400 rounded-lg">{icon}</div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
                <p className="text-slate-700 font-bold text-lg">{value || 'N/A'}</p>
            </div>
        </div>
    )
}