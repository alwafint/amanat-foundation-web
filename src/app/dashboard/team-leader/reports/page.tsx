'use client';

import React, { useState, useEffect } from 'react';
import { 
  PieChart, BarChart3, TrendingUp, Users, 
  Banknote, Award, Loader2, Calendar, 
  ArrowUpRight, Target, HandHeart, CheckCircle2 
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function TeamLeaderReports() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  // ডাইনামিক ডাটা স্টেট
  const [reportData, setReportData] = useState({
    totalMembers: 0,
    totalCollection: 0,
    totalAudience: 0,
    performanceScore: 85, // ডামি পারফরম্যান্স
    estimatedCommission: 0
  });

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(localUser);
    if (localUser.mobile) {
      fetchAnalytics(localUser.mobile);
    }
  }, []);

  const fetchAnalytics = async (mobile: string) => {
    setLoading(true);
    try {
      // ১. মোট মেম্বার সংখ্যা (যাদের লিডার এড করেছেন)
      const { count: memberCount } = await supabase
        .from('members')
        .select('*', { count: 'exact', head: true })
        .eq('referred_by', mobile);

      // ২. মোট কালেকশন (ট্রানজেকশন টেবিল থেকে)
      const { data: transData } = await supabase
        .from('transactions')
        .select('amount')
        .eq('staff_id', mobile)
        .eq('status', 'approved');

      const totalColl = transData?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;

      // ৩. ওডিইয়েন্স সার্ভে সংখ্যা
      const { count: surveyCount } = await supabase
        .from('audience_survey')
        .select('*', { count: 'exact', head: true })
        .eq('staff_name', user?.full_name);

      setReportData({
        totalMembers: memberCount || 0,
        totalCollection: totalColl,
        totalAudience: surveyCount || 0,
        performanceScore: 92,
        estimatedCommission: totalColl * 0.02 // উদাহরণ: কালেকশনের ২% কমিশন
      });

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-600" size={40}/></div>;

  return (
    <div className="animate-in fade-in duration-500 pb-20 max-w-6xl mx-auto">
      
      {/* --- HEADER --- */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
           <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
             <BarChart3 className="text-indigo-600" /> কাজের রিপোর্ট ও আয়
           </h2>
           <p className="text-slate-500 mt-1">আপনার ব্যক্তিগত পারফরম্যান্স এবং সম্মানী ট্র্যাকার</p>
        </div>
        <div className="flex gap-2">
            <span className="bg-white border px-4 py-2 rounded-xl text-xs font-bold text-slate-500 flex items-center gap-2 shadow-sm">
                <Calendar size={14}/> এই মাস: {new Date().toLocaleString('bn-BD', { month: 'long' })}
            </span>
        </div>
      </div>

      {/* --- TOP PERFORMANCE CARD --- */}
      <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white mb-8 shadow-xl relative overflow-hidden">
         <div className="absolute right-0 top-0 p-8 opacity-10 rotate-12">
            <Award size={150}/>
         </div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
               <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-2">আপনার স্কোর</p>
               <h3 className="text-5xl font-black">{reportData.performanceScore}%</h3>
               <p className="text-indigo-200 mt-3 flex items-center gap-2">
                 <CheckCircle2 size={16} className="text-emerald-400"/> আপনি এই মাসে 'সুপার লিডার' ক্যাটাগরিতে আছেন!
               </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center min-w-[200px]">
               <p className="text-indigo-200 text-xs font-bold uppercase">সম্ভাব্য কমিশন</p>
               <h4 className="text-4xl font-black text-yellow-400 mt-1">৳ {reportData.estimatedCommission.toLocaleString()}</h4>
               <p className="text-[10px] text-white/60 mt-2 italic">* কালেকশন ও সার্ভে অনুযায়ী পরিবর্তিত হতে পারে</p>
            </div>
         </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <ReportCard label="সংগৃহীত মেম্বার" value={reportData.totalMembers} sub="জন" icon={<Users className="text-blue-600"/>} color="blue" />
        <ReportCard label="মোট কালেকশন" value={`৳ ${reportData.totalCollection.toLocaleString()}`} sub="আদায়কৃত" icon={<Banknote className="text-emerald-600"/>} color="emerald" />
        <ReportCard label="মাঠ পর্যায়ের সার্ভে" value={reportData.totalAudience} sub="পরিবার" icon={<ClipboardListIcon className="text-orange-600"/>} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Progress Section */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
           <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
              <Target size={20} className="text-indigo-600"/> মাসিক লক্ষ্যমাত্রা (Target)
           </h3>
           <div className="space-y-6">
              <ProgressBar label="নতুন মেম্বার এড (টার্গেট: ২০)" value={(reportData.totalMembers / 20) * 100} color="bg-blue-500" />
              <ProgressBar label="কালেকশন সম্পন্ন (টার্গেট: ৳৫০,০০০)" value={(reportData.totalCollection / 50000) * 100} color="bg-emerald-500" />
              <ProgressBar label="ওডিইয়েন্স সার্ভে (টার্গেট: ৫০)" value={(reportData.totalAudience / 50) * 100} color="bg-orange-500" />
           </div>
        </div>

        {/* Info Box */}
        <div className="bg-slate-100 p-8 rounded-[2rem] flex flex-col justify-center border border-slate-200 border-dashed">
           <TrendingUp size={48} className="text-indigo-600 mb-4" />
           <h4 className="text-xl font-bold text-slate-800 mb-2">আপনার সম্মানীর হার কীভাবে বৃদ্ধি পাবে?</h4>
           <p className="text-slate-500 text-sm leading-relaxed">
             আপনার গ্রামের যত বেশি মেম্বার নিয়মিত সঞ্চয় দিবে, আপনার মাসিক কমিশন তত বৃদ্ধি পাবে। এছাড়া নতুন সফল ভলান্টিয়ার নিয়োগ করলে পাবেন এককালীন বোনাস।
           </p>
           <button className="mt-6 w-fit bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition shadow-lg">
             ফুল পলিসি দেখুন
           </button>
        </div>

      </div>

    </div>
  );
}

// --- Helper UI Components ---

function ReportCard({ label, value, sub, icon, color }: any) {
    const colors: any = {
        blue: "bg-blue-50",
        emerald: "bg-emerald-50",
        orange: "bg-orange-50"
    };
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 group hover:shadow-md transition transform hover:-translate-y-1">
            <div className={`p-4 rounded-2xl ${colors[color]} transition-transform group-hover:scale-110`}>{icon}</div>
            <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{label}</p>
                <div className="flex items-baseline gap-1">
                    <h4 className="text-2xl font-black text-slate-800">{value}</h4>
                    <span className="text-[10px] font-bold text-slate-400">{sub}</span>
                </div>
            </div>
        </div>
    );
}

function ProgressBar({ label, value, color }: any) {
    const clampedValue = Math.min(Math.max(value, 0), 100);
    return (
        <div>
            <div className="flex justify-between mb-2">
                <span className="text-xs font-bold text-slate-600">{label}</span>
                <span className="text-xs font-black text-slate-400">{Math.round(clampedValue)}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className={`${color} h-full rounded-full transition-all duration-1000`} style={{ width: `${clampedValue}%` }}></div>
            </div>
        </div>
    );
}

function ClipboardListIcon({ size, className }: any) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>;
}