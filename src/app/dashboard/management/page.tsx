'use client';

import React, { useEffect, useState } from 'react';
import { Users, Database, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { supabase } from '../../../lib/supabaseClient';

export default function ManagementOverview() {
  const [stats, setStats] = useState({ members: 0, surveys: 0, requests: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const { count: m } = await supabase.from('members').select('*', { count: 'exact', head: true });
      const { count: s } = await supabase.from('audience_survey').select('*', { count: 'exact', head: true });
      const { count: r } = await supabase.from('bookings').select('*', { count: 'exact', head: true });
      setStats({ members: m || 0, surveys: s || 0, requests: r || 0 });
    };
    fetchStats();
  }, []);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">অপারেশনাল ওভারভিউ</h2>
        <p className="text-slate-500 mt-1">পুরো ফাউন্ডেশনের কার্যক্রমের রিয়েল-টাইম তথ্য</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard icon={<Users className="text-blue-600"/>} label="মোট মেম্বার" value={stats.members} trend="+১২%" trendType="up" color="border-blue-500" />
        <StatCard icon={<Database className="text-emerald-600"/>} label="ফিল্ড সার্ভে ডাটা" value={stats.surveys} trend="+৫%" trendType="up" color="border-emerald-500" />
        <StatCard icon={<TrendingUp className="text-orange-600"/>} label="সেবার আবেদন" value={stats.requests} trend="-২%" trendType="down" color="border-orange-500" />
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center py-20">
         <Clock size={48} className="text-indigo-200 mx-auto mb-4"/>
         <h3 className="text-xl font-bold text-slate-400">অ্যানালিটিক্স গ্রাফ লোড হচ্ছে...</h3>
         <p className="text-slate-300 text-sm">শীঘ্রই এখানে মাসিক সঞ্চয় ও লোনের গ্রাফ দেখা যাবে।</p>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend, trendType, color }: any) {
  return (
    <div className={`bg-white p-6 rounded-3xl shadow-sm border-b-4 ${color} hover:shadow-xl transition-all duration-300`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 rounded-2xl">{icon}</div>
        <span className={`flex items-center text-[10px] font-bold px-2 py-1 rounded-full ${trendType === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {trendType === 'up' ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>} {trend}
        </span>
      </div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{label}</p>
      <h4 className="text-3xl font-extrabold text-slate-800 mt-1">{value.toLocaleString()}</h4>
    </div>
  );
}