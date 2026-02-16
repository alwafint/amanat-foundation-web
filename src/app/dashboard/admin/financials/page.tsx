'use client';

import React, { useEffect, useState } from 'react';
import { 
  Landmark, Wallet, Banknote, TrendingUp, 
  PieChart, Receipt, Loader2, ShieldCheck, 
  ArrowUpRight, ArrowDownRight, FileText, 
  Plus, History, Percent
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function AdminFinancialsPage() {
  const [loading, setLoading] = useState(true);
  const [finStats, setFinStats] = useState({
    totalCapital: 5000000, // ডামি: ৫-১০ কোটি ফান্ডের লক্ষ্যমাত্রা
    totalSavings: 0,
    totalInvestment: 0,
    netProfit: 0,
    reserveFund: 1000000, // প্রতি ব্রাঞ্চ ১০ লক্ষ
    memberPayout: 0,
    investorPayout: 0
  });

  useEffect(() => {
    fetchMasterFinancials();
  }, []);

  const fetchMasterFinancials = async () => {
    setLoading(true);
    try {
      // ১. মোট মেম্বার সঞ্চয় (সরাসরি ডাটাবেজ থেকে)
      const { count: memberCount } = await supabase.from('members').select('*', { count: 'exact', head: true });
      const currentSavings = (memberCount || 0) * 2500; 

      // ২. মোট অনুমোদিত বিনিয়োগ (বুকিংস টেবিল থেকে)
      const { data: loans } = await supabase
        .from('bookings')
        .select('quantity')
        .eq('status', 'approved')
        .eq('service_category', 'Investment');

      let currentInvestment = 0;
      loans?.forEach(l => {
        const amount = parseInt(l.quantity.replace(/[^0-9]/g, '')) || 0;
        currentInvestment += amount;
      });

      // ৩. আপনার দেওয়া ১০% প্রফিট মার্জিন মডেলে হিসাব
      const calculatedProfit = currentInvestment * 0.10;

      setFinStats(prev => ({
        ...prev,
        totalSavings: currentSavings,
        totalInvestment: currentInvestment,
        netProfit: calculatedProfit,
        investorPayout: calculatedProfit * 0.40, // ইনভেস্টরদের ৪০%
        memberPayout: calculatedProfit * 0.20    // মেম্বারদের ২০%
      }));

    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <Loader2 className="animate-spin text-emerald-500" size={40} />
      <p className="text-slate-400 font-medium">মাস্টার ফিন্যান্সিয়াল ডাটা লোড হচ্ছে...</p>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans text-slate-800">
      
      {/* --- Page Header --- */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <Landmark className="text-emerald-600" /> আর্থিক অডিট ও রিজার্ভ
          </h2>
          <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest font-bold">Master Financial Control Panel</p>
        </div>
        <div className="flex gap-3">
            <button className="bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-200 transition flex items-center gap-2">
                <FileText size={18}/> অডিট রিপোর্ট
            </button>
            <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition flex items-center gap-2">
                <Plus size={18}/> ফান্ড যোগ করুন
            </button>
        </div>
      </div>

      {/* --- Key Metrics Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <MasterCard label="মোট মূলধন" value={finStats.totalCapital} icon={<Landmark size={24}/>} color="bg-indigo-600" />
        <MasterCard label="নিট মুনাফা" value={finStats.netProfit} icon={<TrendingUp size={24}/>} color="bg-emerald-600" />
        <MasterCard label="সঞ্চয় আমানত" value={finStats.totalSavings} icon={<Wallet size={24}/>} color="bg-blue-600" />
        <MasterCard label="রিজার্ভ ফান্ড" value={finStats.reserveFund} icon={<ShieldCheck size={24}/>} color="bg-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Profit Distribution & Analysis --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden">
             <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                   <PieChart className="text-indigo-600"/> লভ্যাংশ বন্টন বিশ্লেষণ
                </h3>
                <div className="flex gap-2">
                   <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">বাৎসরিক হিসাব</span>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                    <DistributionItem label="ইনভেস্টর শেয়ার (৪০%)" amount={finStats.investorPayout} color="bg-indigo-600" percent={40} />
                    <DistributionItem label="মেম্বার ডিভিডেন্ড (২০%)" amount={finStats.memberPayout} color="bg-emerald-500" percent={20} />
                    <DistributionItem label="পুনঃবিনিয়োগ ও উন্নয়ন" amount={finStats.netProfit * 0.30} color="bg-blue-500" percent={30} />
                    <DistributionItem label="চ্যারিটি ও ওপেএক্স" amount={finStats.netProfit * 0.10} color="bg-slate-300" percent={10} />
                </div>
                
                {/* Visual Circle Chart (CSS based) */}
                <div className="flex items-center justify-center relative">
                   <div className="w-48 h-48 rounded-full border-[16px] border-slate-100 flex items-center justify-center relative">
                      <div className="text-center">
                         <p className="text-[10px] font-bold text-slate-400 uppercase">মোট প্রফিট</p>
                         <h4 className="text-2xl font-black text-slate-800">১০০%</h4>
                      </div>
                      {/* Gradient Ring Overlay - Decorative */}
                      <div className="absolute inset-0 rounded-full border-[16px] border-emerald-500 border-t-transparent border-l-transparent rotate-45 opacity-20"></div>
                   </div>
                </div>
             </div>
          </div>

          {/* Quick Audit Log */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
             <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
               <History className="text-blue-500"/> রিসেন্ট ফিন্যান্সিয়াল লগ
             </h3>
             <div className="space-y-4">
                <LogItem title="ইনভেস্টর 'আরিফ' লভ্যাংশ প্রদান" amount={45000} type="debit" date="১২ ফেব্রু" />
                <LogItem title="নতুন কৃষি যন্ত্রপাতি (ট্রাক্টর) ক্রয়" amount={850000} type="debit" date="১০ ফেব্রু" />
                <LogItem title="সাপ্তাহিক কিস্তি কালেকশন" amount={124500} type="credit" date="০৮ ফেব্রু" />
                <LogItem title="মেম্বার রেজিস্ট্রেশন ফি জমা" amount={15000} type="credit" date="০৫ ফেব্রু" />
             </div>
          </div>
        </div>

        {/* --- Side Controls --- */}
        <div className="lg:col-span-1 space-y-6">
          {/* Target Box */}
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp size={100}/></div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
               <Percent size={20} className="text-yellow-400"/> বিনিয়োগ লক্ষ্যমাত্রা
            </h3>
            <div className="space-y-4 relative z-10">
               <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                     <span className="text-slate-400 uppercase">১ম বছরের টার্গেট</span>
                     <span className="text-yellow-400">৳ ১০ কোটি</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                     <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
               </div>
               <p className="text-xs text-slate-400 leading-relaxed mt-4 italic">
                 "আমাদের বর্তমান গতি অনুযায়ী আমরা আগামী ৬ মাসের মধ্যে লক্ষ্যমাত্রার ৮০% অর্জনে সক্ষম হবো।"
               </p>
            </div>
          </div>

          {/* Reserve Alert */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-amber-100 text-center">
             <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-100">
                <ShieldCheck className="text-amber-500" size={32}/>
             </div>
             <h4 className="text-lg font-bold text-slate-800">রিজার্ভ ফান্ড স্ট্যাটাস</h4>
             <p className="text-sm text-slate-500 mt-2">আপনার কথা অনুযায়ী প্রতিটি ব্রাঞ্চের জন্য নিরাপদ ১০ লক্ষ টাকা রিজার্ভ তহবিলে জমা আছে।</p>
             <div className="mt-4 py-2 bg-amber-50 rounded-xl text-amber-700 font-black text-xl tracking-tighter">
                ৳ ১,০০০,০০০
             </div>
          </div>

          {/* Action Call */}
          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2rem] text-center">
             <p className="text-emerald-800 text-sm font-bold mb-4">লভ্যাংশ বন্টন করতে চান?</p>
             <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">
                ডিভিডেন্ড ডিক্লেয়ার করুন
             </button>
          </div>
        </div>

      </div>

    </div>
  );
}

// --- Helper UI Components ---

function MasterCard({ label, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 relative group overflow-hidden">
      <div className={`p-3 rounded-2xl text-white w-fit mb-4 ${color} shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <p className="text-slate-400 text-[10px] font-black uppercase tracking-wider mb-1">{label}</p>
      <h4 className="text-2xl font-black text-slate-800 tracking-tighter">৳ {value.toLocaleString()}</h4>
      <div className={`absolute bottom-0 left-0 h-1 w-full opacity-20 ${color}`}></div>
    </div>
  );
}

function DistributionItem({ label, amount, color, percent }: any) {
    return (
        <div className="group">
           <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold text-slate-700">{label}</span>
              <span className="text-xs font-black text-slate-400 group-hover:text-indigo-600 transition-colors">৳ {amount.toLocaleString()}</span>
           </div>
           <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className={`${color} h-2 rounded-full transition-all duration-1000`} style={{ width: `${percent}%` }}></div>
           </div>
        </div>
    )
}

function LogItem({ title, amount, type, date }: any) {
    return (
        <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
           <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                 {type === 'credit' ? <ArrowDownRight size={16}/> : <ArrowUpRight size={16}/>}
              </div>
              <div>
                 <p className="text-xs font-bold text-slate-700 leading-none">{title}</p>
                 <p className="text-[10px] text-slate-400 mt-1">{date} • {type === 'credit' ? 'আয়' : 'ব্যয়'}</p>
              </div>
           </div>
           <p className={`text-sm font-black ${type === 'credit' ? 'text-emerald-600' : 'text-slate-800'}`}>
             {type === 'credit' ? '+' : '-'} ৳ {amount.toLocaleString()}
           </p>
        </div>
    )
}