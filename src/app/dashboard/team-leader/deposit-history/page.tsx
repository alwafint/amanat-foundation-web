'use client';

import React, { useState, useEffect } from 'react';
import { 
  Send, History, CheckCircle2, Clock, 
  ArrowUpRight, Loader2, Banknote, Landmark,
  AlertCircle, ChevronRight, Calendar
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function DepositHistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // পরিসংখ্যান স্টেট
  const [stats, setStats] = useState({
    totalCollected: 0,
    pendingHandover: 0,
    totalDeposited: 0
  });

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(localUser);
    if (localUser.mobile) {
      fetchDepositData(localUser.mobile);
    }
  }, []);

  const fetchDepositData = async (staffMobile: string) => {
    setLoading(true);
    try {
      // ১. ট্রানজেকশন টেবিল থেকে এই লিডারের সকল কালেকশন আনা
      const { data, error } = await supabase
        .from('transactions')
        .select('*, members(full_name)')
        .eq('staff_id', staffMobile)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setHistory(data);
        
        // ২. পরিসংখ্যান হিসাব করা
        const total = data.reduce((sum, item) => sum + Number(item.amount), 0);
        // নোট: এখানে 'status' কলাম থাকলে ভালো হয়। আপাতত ডামি হিসাব দিচ্ছি।
        const deposited = data.filter(t => t.status === 'approved').reduce((sum, t) => sum + Number(t.amount), 0);
        const pending = total - deposited;

        setStats({
          totalCollected: total,
          totalDeposited: deposited,
          pendingHandover: pending
        });
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-20 max-w-5xl mx-auto">
      
      {/* --- HEADER SUMMARY --- */}
      <div className="mb-8 bg-indigo-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
            <Landmark size={120}/>
        </div>
        <div className="relative z-10">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Send size={24} className="text-indigo-400" /> অফিসে জমা রিপোর্ট
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                    <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest">মোট কালেকশন</p>
                    <h3 className="text-3xl font-black mt-1">৳ {stats.totalCollected.toLocaleString()}</h3>
                </div>
                <div className="bg-emerald-500/20 backdrop-blur-md p-4 rounded-2xl border border-emerald-500/30">
                    <p className="text-emerald-200 text-[10px] font-bold uppercase tracking-widest">অফিসে জমা হয়েছে</p>
                    <h3 className="text-3xl font-black mt-1">৳ {stats.totalDeposited.toLocaleString()}</h3>
                </div>
                <div className="bg-orange-500/20 backdrop-blur-md p-4 rounded-2xl border border-orange-500/30">
                    <p className="text-orange-200 text-[10px] font-bold uppercase tracking-widest">হাতে আছে (বাকি)</p>
                    <h3 className="text-3xl font-black mt-1 text-orange-300">৳ {stats.pendingHandover.toLocaleString()}</h3>
                </div>
            </div>
        </div>
      </div>

      {/* --- TRANSACTION LIST --- */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <History size={20} className="text-indigo-600" /> কালেকশন ও জমা ইতিহাস
            </h3>
            <button className="text-xs font-bold text-indigo-600 hover:underline">ডাউনলোড রিপোর্ট</button>
        </div>

        {loading ? (
          <div className="flex justify-center py-24"><Loader2 className="animate-spin text-indigo-600" size={40}/></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="p-5">তারিখ ও মেম্বার</th>
                  <th className="p-5">ধরন</th>
                  <th className="p-5 text-right">পরিমাণ</th>
                  <th className="p-5 text-center">অবস্থা</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-indigo-50/30 transition group text-sm">
                    <td className="p-5">
                      <p className="font-bold text-slate-800">{item.members?.full_name || 'Guest'}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-1 flex items-center gap-1">
                        <Calendar size={10}/> {new Date(item.created_at).toLocaleDateString('bn-BD')}
                      </p>
                    </td>
                    <td className="p-5">
                       <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase ${item.type === 'savings' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                          {item.type === 'savings' ? 'সঞ্চয়' : 'কিস্তি'}
                       </span>
                    </td>
                    <td className="p-5 text-right font-black text-slate-700">৳ {item.amount.toLocaleString()}</td>
                    <td className="p-5 text-center">
                       <div className="flex items-center justify-center gap-1">
                          {item.status === 'approved' ? (
                            <span className="flex items-center gap-1 text-emerald-600 font-bold text-[10px] bg-emerald-50 px-2 py-1 rounded-full">
                               <CheckCircle2 size={12}/> জমা হয়েছে
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-orange-600 font-bold text-[10px] bg-orange-50 px-2 py-1 rounded-full animate-pulse">
                               <Clock size={12}/> পেন্ডিং
                            </span>
                          )}
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {history.length === 0 && (
                <div className="text-center py-20 text-slate-400 italic">এখনো কোনো কালেকশন করা হয়নি</div>
            )}
          </div>
        )}
      </div>

      {/* --- Action Call --- */}
      <div className="mt-8 flex flex-col md:flex-row gap-4">
         <div className="flex-1 bg-white p-6 rounded-3xl border border-indigo-100 flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
               <AlertCircle size={24}/>
            </div>
            <div>
               <h4 className="font-bold text-slate-800 text-sm">টাকা জমা দিতে সমস্যা?</h4>
               <p className="text-xs text-slate-500">আপনার এরিয়া স্টাফকে সরাসরি কল করুন।</p>
            </div>
            <button className="ml-auto bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold">কল করুন</button>
         </div>
      </div>

    </div>
  );
}