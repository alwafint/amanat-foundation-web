'use client';

import React, { useEffect, useState } from 'react';
import { 
  Briefcase, Banknote, TrendingUp, Plus, 
  Search, X, CheckCircle, Loader2, UserPlus, 
  ChevronRight, PieChart, Smartphone
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function InvestorManagementPage() {
  const [investors, setInvestors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  // পরিসংখ্যান
  const [stats, setStats] = useState({
    totalInvested: 0,
    totalProfit: 450000, // ডামি (বাস্তবে ট্রানজেকশন থেকে আসবে)
    investorShare: 0
  });

  // ফর্ম স্টেট
  const [formData, setFormData] = useState({ full_name: '', mobile: '', initial_investment: '', address: '' });

  const fetchInvestors = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('members').select('*').eq('role', 'investor');
      if (error) throw error;
      if (data) {
        setInvestors(data);
        const total = data.reduce((sum, item) => sum + (Number(item.nid) || 0), 0);
        setStats(prev => ({ ...prev, totalInvested: total, investorShare: prev.totalProfit * 0.40 }));
      }
    } catch (err: any) { console.error(err.message); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchInvestors(); }, []);

  const handleAddInvestor = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { error } = await supabase.from('members').insert([{
        full_name: formData.full_name, mobile: formData.mobile, address: formData.address,
        nid: formData.initial_investment, role: 'investor', status: 'active', password: '123'
      }]);
      if (error) throw error;
      alert("ইনভেস্টর যুক্ত হয়েছে!");
      setIsModalOpen(false);
      fetchInvestors();
    } catch (err: any) { alert(err.message); } 
    finally { setBtnLoading(false); }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><Briefcase className="text-indigo-600" /> ইনভেস্টর ম্যানেজমেন্ট</h2>
          <p className="text-sm text-slate-500 mt-1 uppercase font-bold text-indigo-500/70 tracking-widest">Capital & Profit Control</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl flex items-center gap-2 transition active:scale-95">
          <UserPlus size={18}/> নতুন ইনভেস্টর
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard label="মোট মূলধন" value={stats.totalInvested} icon={<Banknote/>} color="bg-indigo-600" />
        <StatCard label="মোট মুনাফা" value={stats.totalProfit} icon={<TrendingUp/>} color="bg-emerald-600" />
        <StatCard label="ইনভেস্টর লভ্যাংশ (৪০%)" value={stats.investorShare} icon={<PieChart/>} color="bg-orange-500" />
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800">অংশীদারদের তালিকা</h3>
            <div className="relative"><Search className="absolute left-3 top-2.5 text-slate-400" size={16}/><input type="text" placeholder="খুঁজুন..." className="pl-10 pr-4 py-2 bg-white border rounded-full text-sm outline-none w-64 focus:border-indigo-500"/></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <tr><th className="p-5">ইনভেস্টর</th><th className="p-5">বিনিয়োগ</th><th className="p-5">শেয়ার (%)</th><th className="p-5 text-right">অ্যাকশন</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {investors.map((inv) => (
                <tr key={inv.id} className="hover:bg-indigo-50/30 transition group text-sm">
                  <td className="p-5">
                    <p className="font-bold text-slate-800">{inv.full_name}</p>
                    <p className="text-xs text-slate-400 font-mono">{inv.mobile}</p>
                  </td>
                  <td className="p-5 font-black text-slate-700">৳ {Number(inv.nid).toLocaleString()}</td>
                  <td className="p-5"><span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-lg font-black">{((Number(inv.nid)/stats.totalInvested)*100).toFixed(2)}%</span></td>
                  <td className="p-5 text-right"><button className="p-2 bg-slate-100 text-slate-400 rounded-xl hover:bg-indigo-600 hover:text-white transition"><ChevronRight size={18}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
           <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
              <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
                 <h3 className="text-lg font-bold flex items-center gap-2"><UserPlus size={20}/> নতুন ইনভেস্টর</h3>
                 <button onClick={() => setIsModalOpen(false)}><X size={20}/></button>
              </div>
              <form onSubmit={handleAddInvestor} className="p-8 space-y-4">
                 <input required className="w-full p-4 bg-slate-50 border rounded-2xl outline-none" placeholder="সম্পূর্ণ নাম" onChange={e => setFormData({...formData, full_name: e.target.value})} />
                 <input required className="w-full p-4 bg-slate-50 border rounded-2xl outline-none" placeholder="মোবাইল নম্বর" onChange={e => setFormData({...formData, mobile: e.target.value})} />
                 <input required type="number" className="w-full p-4 bg-slate-50 border rounded-2xl outline-none font-bold" placeholder="বিনিয়োগের পরিমাণ (৳)" onChange={e => setFormData({...formData, initial_investment: e.target.value})} />
                 <button disabled={btnLoading} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition active:scale-95 flex justify-center items-center gap-2">
                    {btnLoading ? <Loader2 className="animate-spin" /> : "কনফার্ম করুন"}
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, color }: any) {
    return (
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-lg transition duration-300">
            <div className={`p-4 rounded-2xl text-white shadow-lg ${color}`}>{icon}</div>
            <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-wider">{label}</p>
                <h4 className="text-2xl font-black text-slate-800">৳ {value.toLocaleString()}</h4>
            </div>
        </div>
    );
}