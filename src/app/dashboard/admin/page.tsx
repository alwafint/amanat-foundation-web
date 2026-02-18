'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, ShieldAlert, ArrowUpRight, PieChart, 
  Loader2, Landmark, Users, Wallet, Activity, 
  ChevronRight, ArrowRight, ShieldCheck, Globe
} from "lucide-react";
import { supabase } from '../../../lib/supabaseClient';

export default function AdminMasterDashboard() {
  const router = useRouter();

  const [stats, setStats] = useState({
    totalCapital: 5000000, 
    totalProfit: 450000,  
    members: 0,
    investors: 0,
    pendingApprovals: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRootData = async () => {
      const { count: m } = await supabase.from('members').select('*', { count: 'exact', head: true });
      const { count: i } = await supabase.from('members').select('*', { count: 'exact', head: true }).eq('role', 'investor');
      const { count: p } = await supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending_management');

      setStats(prev => ({
        ...prev,
        members: m || 0,
        investors: i || 0,
        pendingApprovals: p || 0
      }));

      setLoading(false);
    };

    fetchRootData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#F3F4F6]">
        <Loader2 className="animate-spin text-[#006A4E] mb-4" size={40}/>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">সিস্টেম লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-20 text-slate-800">

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#006A4E] animate-pulse"></div>
            <span className="text-[10px] font-black text-[#006A4E] uppercase tracking-[0.3em]">অ্যাডমিন কন্ট্রোল সেন্টার</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            সিস্টেম <span className="text-[#006A4E]">মাস্টার</span> ড্যাশবোর্ড
          </h2>
          <p className="text-slate-500 mt-1 font-medium">
            আমানত ফাউন্ডেশনের সার্বিক কার্যক্রম ও আর্থিক অবস্থা
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-4 bg-slate-50 border border-slate-200 p-4 rounded-2xl">
           <div className="text-right">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">সার্ভার স্ট্যাটাস</p>
              <p className="text-[#006A4E] font-bold text-sm">Secure & Online</p>
           </div>
           <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#FFB800] border border-slate-200 shadow-sm">
              <Globe size={24} className="animate-spin-slow" />
           </div>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MasterStatCard
          label="মোট মূলধন"
          value={stats.totalCapital}
          icon={<Landmark size={24}/>}
          color="border-[#006A4E]"
          iconColor="text-[#006A4E]"
          bgGlow="bg-[#006A4E]/5"
        />

        <MasterStatCard
          label="নিট মুনাফা"
          value={stats.totalProfit}
          icon={<TrendingUp size={24}/>}
          color="border-[#FFB800]"
          iconColor="text-[#FFB800]"
          bgGlow="bg-[#FFB800]/5"
        />

        <MasterStatCard
          label="মোট সদস্য"
          value={stats.members}
          icon={<Users size={24}/>}
          color="border-blue-500"
          iconColor="text-blue-600"
          isCount
          bgGlow="bg-blue-500/5"
        />

        <MasterStatCard
          label="পেন্ডিং অনুমোদন"
          value={stats.pendingApprovals}
          icon={<ShieldAlert size={24}/>}
          color="border-rose-500"
          iconColor="text-rose-600"
          isCount
          bgGlow="bg-rose-500/5"
        />
      </div>

      {/* --- PROFIT SPLIT & ACTION PANEL --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profit Distribution */}
        <div className="lg:col-span-2 bg-white border border-slate-100 p-8 rounded-[3rem] shadow-sm relative overflow-hidden group">
          <h3 className="text-xl font-bold text-slate-800 mb-10 flex items-center gap-3">
            <ShieldCheck className="text-[#006A4E]" size={24}/>
            লভ্যাংশ বন্টন মডেল (শরিয়াহ মোতাবেক)
          </h3>

          <div className="space-y-8 relative z-10">
            <RootProgressBar
              label="ইনভেস্টর শেয়ার (৪০%)"
              value={40}
              amount={stats.totalProfit * 0.4}
              color="bg-[#FFB800]"
            />
            <RootProgressBar
              label="মেম্বার ডিভিডেন্ড (২০%)"
              value={20}
              amount={stats.totalProfit * 0.2}
              color="bg-[#006A4E]"
            />
            <RootProgressBar
              label="ডেভেলপমেন্ট ফান্ড (৩০%)"
              value={30}
              amount={stats.totalProfit * 0.3}
              color="bg-blue-600"
            />
            <RootProgressBar
              label="চ্যারিটি ও ওপেএক্স (১০%)"
              value={10}
              amount={stats.totalProfit * 0.1}
              color="bg-slate-400"
            />
          </div>
        </div>

        {/* Action Panel */}
        <div className="flex flex-col gap-6">
            <div className="bg-[#006A4E] p-8 rounded-[3rem] shadow-2xl flex flex-col justify-between h-full relative overflow-hidden group">
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
                
                <div className="relative z-10 text-white">
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Wallet size={20} className="text-[#FFB800]"/> ইনভেস্টর পেমেন্ট
                    </h3>
                    <p className="text-emerald-100 text-sm leading-relaxed opacity-80">
                    চলতি মাসে ইনভেস্টরদের মাঝে বিতরণের জন্য প্রস্তুত মোট লভ্যাংশ:
                    </p>
                    <h4 className="text-5xl font-black text-white mt-8 tracking-tighter">
                    <span className="text-[#FFB800] text-2xl mr-1">৳</span>
                    {(stats.totalProfit * 0.4).toLocaleString()}
                    </h4>
                </div>

                <button
                    onClick={() => router.push('/dashboard/admin/investors')}
                    className="w-full bg-white text-[#006A4E] py-4 rounded-2xl font-bold transition-all shadow-lg mt-8 flex items-center justify-center gap-2 transform active:scale-95 group relative z-10"
                >
                    ইনভেস্টর প্যানেল <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                </button>
            </div>
            
            {/* Quick Link Card */}
            <div onClick={() => router.push('/dashboard/admin/approvals')} className="bg-white border border-slate-100 p-6 rounded-[2.5rem] flex items-center justify-between cursor-pointer hover:border-[#FFB800] transition-all group shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-50 text-[#FFB800] rounded-2xl group-hover:bg-[#FFB800] group-hover:text-white transition">
                        <ShieldCheck size={24}/>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800">চূড়ান্ত অনুমোদন</h4>
                        <p className="text-xs text-slate-500">{stats.pendingApprovals} টি আবেদন বাকি</p>
                    </div>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-slate-600 transition" />
            </div>
        </div>
      </div>
    </div>
  );
}


/* ---------- Helper UI Components ---------- */

function MasterStatCard({ label, value, color, icon, isCount, bgGlow, iconColor }: any) {
  return (
    <div className={`relative bg-white border border-slate-100 p-8 rounded-[2.5rem] border-b-8 ${color} shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden`}>
      <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full blur-3xl opacity-50 ${bgGlow}`}></div>
      
      <div className="relative z-10">
        <div className={`w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 ${iconColor} border border-slate-100 shadow-inner group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
          {label}
        </p>
        <h4 className="text-3xl font-black text-slate-800 tracking-tight tabular-nums">
          {isCount ? value : `৳ ${value.toLocaleString()}`}
        </h4>
      </div>
    </div>
  );
}

function RootProgressBar({ label, value, amount, color }: any) {
  return (
    <div className="group">
      <div className="flex justify-between mb-3 text-sm">
        <span className="font-bold text-slate-500 group-hover:text-[#006A4E] transition-colors tracking-wide">{label}</span>
        <span className="font-black text-slate-800 tabular-nums">
          ৳ {amount.toLocaleString()}
        </span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-3.5 p-[3px] border border-slate-200">
        <div
          className={`${color} h-full rounded-full transition-all duration-1000 ease-out shadow-sm`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}