'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Added
import { 
  TrendingUp, ShieldAlert, 
  ArrowUpRight, PieChart, Loader2, Landmark
} from "lucide-react";
import { supabase } from '../../../lib/supabaseClient';

export default function AdminMasterDashboard() {
  const router = useRouter(); // ✅ Added

  const [stats, setStats] = useState({
    totalCapital: 0,
    totalProfit: 0,
    members: 0,
    investors: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRootData = async () => {
      const { count: m } = await supabase
        .from('members')
        .select('*', { count: 'exact', head: true });

      const { count: i } = await supabase
        .from('members')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'investor');

      setStats({
        totalCapital: 5000000,
        totalProfit: 450000,
        members: m || 0,
        investors: i || 0
      });

      setLoading(false);
    };

    fetchRootData();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-500" size={40}/>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 space-y-10">

      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white">
            সিস্টেম মাস্টার ড্যাশবোর্ড
          </h2>
          <p className="text-slate-500 mt-1">
            প্রতিষ্ঠানের সার্বিক আর্থিক ও অপারেশনাল অবস্থা
          </p>
        </div>

        <div className="hidden md:block bg-slate-900 border border-slate-800 p-3 rounded-2xl">
          <p className="text-[10px] text-slate-500 font-bold uppercase">
            সার্ভার স্ট্যাটাস
          </p>
          <p className="text-emerald-500 font-bold text-sm">
            Synchronized 100%
          </p>
        </div>
      </div>

      {/* --- SUPER STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MasterStatCard
          label="মোট মূলধন (Capital)"
          value={stats.totalCapital}
          color="border-blue-500"
          icon={<Landmark size={24}/>}
        />

        <MasterStatCard
          label="নিট মুনাফা"
          value={stats.totalProfit}
          color="border-emerald-500"
          icon={<TrendingUp size={24}/>}
        />

        <MasterStatCard
          label="মোট সদস্য"
          value={stats.members}
          color="border-purple-500"
          icon={<Users size={24}/>}
          isCount
        />

        <MasterStatCard
          label="রিজার্ভ ফান্ড"
          value={1000000}
          color="border-amber-500"
          icon={<ShieldAlert size={24}/>}
        />
      </div>

      {/* --- PROFIT SPLIT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl">
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            <PieChart className="text-emerald-500"/>
            প্রফিট বন্টন মডেল (শরিয়াহ মোতাবেক)
          </h3>

          <div className="space-y-6">
            <RootProgressBar
              label="ইনভেস্টর শেয়ার (৪০%)"
              value={40}
              amount={stats.totalProfit * 0.4}
              color="bg-blue-500"
            />
            <RootProgressBar
              label="মেম্বার ডিভিডেন্ড (২০%)"
              value={20}
              amount={stats.totalProfit * 0.2}
              color="bg-emerald-500"
            />
            <RootProgressBar
              label="ডেভেলপমেন্ট ফান্ড (২০%)"
              value={20}
              amount={stats.totalProfit * 0.2}
              color="bg-indigo-500"
            />
            <RootProgressBar
              label="চ্যারিটি ও ওপেএক্স (২০%)"
              value={20}
              amount={stats.totalProfit * 0.2}
              color="bg-slate-700"
            />
          </div>
        </div>

        {/* --- PAYMENT PANEL --- */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              ইনভেস্টর পেমেন্ট
            </h3>
            <p className="text-slate-500 text-sm">
              এই মাসে বিতরণের জন্য প্রস্তুত লভ্যাংশ
            </p>
            <h4 className="text-4xl font-black text-emerald-500 mt-6">
              ৳ {(stats.totalProfit * 0.4).toLocaleString()}
            </h4>
          </div>

          <button
            onClick={() => router.push('/dashboard/admin/investors')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold transition shadow-lg mt-8 flex items-center justify-center gap-2"
          >
            পেমেন্ট প্যানেল দেখুন <ArrowUpRight size={20}/>
          </button>
        </div>
      </div>
    </div>
  );
}


/* ---------- Helper Components ---------- */

function MasterStatCard({ label, value, color, icon, isCount }: any) {
  return (
    <div className={`bg-slate-900 border border-slate-800 p-6 rounded-3xl border-l-8 ${color} shadow-lg hover:bg-slate-800 transition`}>
      <div className="bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-slate-400 border border-slate-700">
        {icon}
      </div>
      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
        {label}
      </p>
      <h4 className="text-2xl font-black text-white mt-1">
        {isCount ? value : `৳ ${value.toLocaleString()}`}
      </h4>
    </div>
  );
}

function RootProgressBar({ label, value, amount, color }: any) {
  return (
    <div>
      <div className="flex justify-between mb-2 text-sm">
        <span className="font-bold text-slate-300">{label}</span>
        <span className="font-bold text-white">
          ৳ {amount.toLocaleString()}
        </span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-2.5">
        <div
          className={`${color} h-2.5 rounded-full`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Users({ size, className }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}
