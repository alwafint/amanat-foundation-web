'use client';

import React, { useEffect, useState } from 'react';
import { 
  Landmark, Wallet, Banknote, TrendingUp, 
  PieChart, Receipt, Loader2, ShieldCheck, ArrowRight
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function FinancialsPage() {
  const [loading, setLoading] = useState(true);
  const [finData, setFinData] = useState({
    totalSavings: 0,
    totalInvestment: 0,
    totalProfit: 0,
    reserveFund: 1000000,
    totalExpenses: 0
  });

  useEffect(() => {
    fetchFinancials();
  }, []);

  const fetchFinancials = async () => {
    setLoading(true);
    try {
      const { count: memberCount } = await supabase.from('members').select('*', { count: 'exact', head: true });
      const mockSavings = (memberCount || 0) * 1500; 

      const { data: loans } = await supabase
        .from('bookings')
        .select('quantity')
        .eq('status', 'approved')
        .eq('service_category', 'Investment');

      let mockInvestment = 0;
      loans?.forEach(l => {
        const amount = parseInt(l.quantity.replace(/[^0-9]/g, '')) || 0;
        mockInvestment += amount;
      });

      const mockProfit = mockInvestment * 0.10;

      setFinData({
        totalSavings: mockSavings,
        totalInvestment: mockInvestment,
        totalProfit: mockProfit,
        reserveFund: 1000000,
        totalExpenses: mockProfit * 0.20 
      });

    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
      <p className="text-slate-400 font-medium">আর্থিক তথ্য বিশ্লেষণ হচ্ছে...</p>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      
      {/* --- Page Header --- */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Landmark className="text-indigo-600" /> আর্থিক বিবরণী
          </h2>
          <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest font-bold">Financial Summary & Accounts</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-emerald-100 flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <ShieldCheck size={18}/> অডিট স্ট্যাটাস: ক্লিয়ার
        </div>
      </div>

      {/* --- Main Cards Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <FinCard label="মোট সঞ্চয় জমা" value={finData.totalSavings} icon={<Wallet size={20}/>} color="indigo" />
        <FinCard label="মাঠে বিনিয়োগ (লোন)" value={finData.totalInvestment} icon={<Banknote size={20}/>} color="blue" />
        <FinCard label="অর্জিত মুনাফা" value={finData.totalProfit} icon={<TrendingUp size={20}/>} color="emerald" />
        <FinCard label="রিজার্ভ ফান্ড" value={finData.reserveFund} icon={<ShieldCheck size={20}/>} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Column: Profit Distribution --- */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                   <PieChart className="text-indigo-600"/> মুনাফা বণ্টন (Dividend Split)
                </h3>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">ব্যবসার ১০% মডেল</span>
             </div>

             <div className="space-y-6">
                <ProgressItem label="মেম্বারদের লভ্যাংশ" percent={40} amount={finData.totalProfit * 0.40} color="bg-emerald-500" />
                <ProgressItem label="পুনঃবিনিয়োগ (উন্নয়ন তহবিল)" percent={30} amount={finData.totalProfit * 0.30} color="bg-blue-500" />
                <ProgressItem label="পরিচালন ও স্টাফ খরচ" percent={20} amount={finData.totalProfit * 0.20} color="bg-indigo-500" />
                <ProgressItem label="সমাজসেবা ও ত্রাণ তহবিল" percent={10} amount={finData.totalProfit * 0.10} color="bg-rose-500" />
             </div>

             <div className="mt-10 p-5 bg-slate-900 rounded-2xl text-white flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                   <p className="text-slate-400 text-xs font-bold uppercase">নেট পে-আউট</p>
                   <h4 className="text-2xl font-black">৳ {(finData.totalProfit * 0.40).toLocaleString()}</h4>
                </div>
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition shadow-lg">
                   লভ্যাংশ ডিক্লেয়ার করুন
                </button>
             </div>
          </div>
        </div>

        {/* --- Right Column: Recent Expenses --- */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 h-full flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center justify-between">
               <div className="flex items-center gap-2"><Receipt className="text-rose-500" size={20}/> সাম্প্রতিক ব্যয়</div>
               <span className="text-[10px] font-bold text-rose-500">View All</span>
            </h3>
            
            <div className="space-y-4 flex-grow">
               {/* এখানে সংখ্যাগুলো ইংরেজি (0, 1, 2...) করা হয়েছে */}
               <ExpenseItem label="স্টাফ স্যালারি (অক্টোবর)" amount={85000} date="০১ অক্টো" />
               <ExpenseItem label="নতুন পাওয়ার টিলার ক্রয়" amount={125000} date="১৫ সেপ্টে" />
               <ExpenseItem label="ফ্রি চক্ষু শিবির খরচ" amount={45000} date="১০ সেপ্টে" />
               <ExpenseItem label="অফিস ইউটিলিটি বিল" amount={4200} date="০৫ সেপ্টে" />
            </div>

            <button className="w-full mt-6 py-4 bg-slate-50 text-slate-700 rounded-2xl font-bold text-sm border-2 border-dashed border-slate-200 hover:bg-slate-100 transition">
               + নতুন ভাউচার যোগ করুন
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

// --- Helper Components ---

function FinCard({ label, value, icon, color }: any) {
  const colors: any = {
    indigo: "bg-indigo-600 shadow-indigo-200 text-indigo-600",
    blue: "bg-blue-600 shadow-blue-200 text-blue-600",
    emerald: "bg-emerald-600 shadow-emerald-200 text-emerald-600",
    amber: "bg-amber-500 shadow-amber-200 text-amber-500"
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition duration-300 relative group overflow-hidden">
      <div className={`p-2 rounded-lg text-white w-fit mb-4 ${colors[color].split(' ')[0]} shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">{label}</p>
      <h4 className="text-2xl font-black text-slate-800 tracking-tight">৳ {value.toLocaleString()}</h4>
      <div className={`absolute bottom-0 left-0 h-1 w-full opacity-20 ${colors[color].split(' ')[0]}`}></div>
    </div>
  );
}

function ProgressItem({ label, percent, amount, color }: any) {
  return (
    <div className="group">
       <div className="flex justify-between items-end mb-2">
          <div>
             <p className="text-sm font-bold text-slate-700">{label}</p>
             <p className="text-xs text-slate-400 font-medium">৳ {amount.toLocaleString()}</p>
          </div>
          <span className="text-sm font-black text-slate-400 group-hover:text-indigo-600 transition-colors">{percent}%</span>
       </div>
       <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div className={`${color} h-2.5 rounded-full transition-all duration-1000`} style={{ width: `${percent}%` }}></div>
       </div>
    </div>
  );
}

function ExpenseItem({ label, amount, date }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
       <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center font-bold text-[10px]">
             {date.split(' ')[0]}
          </div>
          <div>
             <p className="text-xs font-bold text-slate-700 leading-none">{label}</p>
             <p className="text-[10px] text-slate-400 mt-1">{date}</p>
          </div>
       </div>
       <p className="text-sm font-black text-slate-800">৳ {amount.toLocaleString()}</p>
    </div>
  );
}