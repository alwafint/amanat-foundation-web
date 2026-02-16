'use client';

import React, { useEffect, useState } from 'react';
import { 
  Briefcase, Users, Banknote, TrendingUp, 
  Plus, Search, ArrowUpRight, DollarSign, 
  X, CheckCircle, Loader2, UserPlus, 
  ChevronRight, PieChart, ShieldCheck
} from "lucide-react";
// সঠিক রিলেটিভ পাথ (৪ ধাপ পেছনে)
import { supabase } from '../../../../lib/supabaseClient';

export default function InvestorManagementPage() {
  const [investors, setInvestors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  // ইনভেস্টর পরিসংখ্যান
  const [stats, setStats] = useState({
    totalInvested: 0,
    distributableProfit: 450000, // ডামি ডাটা (বাস্তবে ট্রানজেকশন টেবিল থেকে আসবে)
    investorShare: 0 // ৪০% লভ্যাংশ
  });

  // ফর্ম স্টেট
  const [formData, setFormData] = useState({
    full_name: '',
    mobile: '',
    initial_investment: '',
    address: ''
  });

  const fetchInvestors = async () => {
    setLoading(true);
    try {
      // ১. ডাটাবেজ থেকে ইনভেস্টরদের লিস্ট আনা (Role = investor)
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('role', 'investor')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setInvestors(data);
        // ২. মোট মূলধন হিসাব করা
        const total = data.reduce((sum, item) => sum + (Number(item.nid) || 0), 0); // এখানে 'nid' কলামটি ডামি ইনভেস্টমেন্ট ফিল্ড হিসেবে ব্যবহৃত হচ্ছে যদি আলাদা কলাম না থাকে
        setStats(prev => ({ 
            ...prev, 
            totalInvested: total, 
            investorShare: prev.distributableProfit * 0.40 
        }));
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestors();
  }, []);

  // নতুন ইনভেস্টর যোগ করা
  const handleAddInvestor = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { error } = await supabase.from('members').insert([{
        full_name: formData.full_name,
        mobile: formData.mobile,
        address: formData.address,
        nid: formData.initial_investment, // সাময়িকভাবে ইনভেস্টমেন্ট অ্যামাউন্ট NID কলামে রাখা হচ্ছে
        role: 'investor',
        status: 'active',
        password: '123'
      }]);

      if (error) throw error;
      alert("ইনভেস্টর সফলভাবে যুক্ত হয়েছে!");
      setIsModalOpen(false);
      fetchInvestors();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans">
      
      {/* --- Page Header --- */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Briefcase className="text-blue-600" /> ইনভেস্টর ম্যানেজমেন্ট
          </h2>
          <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest font-bold text-blue-500/70">Capital & Profit Sharing</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl transition flex items-center gap-2 active:scale-95"
        >
          <UserPlus size={18}/> নতুন ইনভেস্টর যোগ
        </button>
      </div>

      {/* --- Financial Overview Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard label="মোট মূলধন (Capital)" value={stats.totalInvested} icon={<Banknote size={24}/>} color="bg-blue-600 shadow-blue-200" />
        <StatCard label="মোট নিট মুনাফা" value={stats.distributableProfit} icon={<TrendingUp size={24}/>} color="bg-emerald-600 shadow-emerald-200" />
        <StatCard label="ইনভেস্টর শেয়ার (৪০%)" value={stats.investorShare} icon={<PieChart size={24}/>} color="bg-orange-500 shadow-orange-200" />
      </div>

      {/* --- Investor List --- */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Users size={20} className="text-blue-600"/> ইনভেস্টর তালিকা ({investors.length})
            </h3>
            <div className="relative hidden md:block">
                <Search className="absolute left-3 top-2 text-slate-400" size={16}/>
                <input type="text" placeholder="খুঁজুন..." className="pl-10 pr-4 py-1.5 bg-slate-50 border rounded-full text-sm outline-none focus:border-blue-500 w-64"/>
            </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={40}/></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="p-5">ইনভেস্টর নাম ও মোবাইল</th>
                  <th className="p-5">বিনিয়োগকৃত অর্থ</th>
                  <th className="p-5">শেয়ার (%)</th>
                  <th className="p-5 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {investors.map((inv) => {
                  const investedAmount = Number(inv.nid) || 0;
                  const sharePercentage = stats.totalInvested > 0 ? ((investedAmount / stats.totalInvested) * 100).toFixed(2) : '0';
                  
                  return (
                    <tr key={inv.id} className="hover:bg-blue-50/30 transition group">
                      <td className="p-5">
                        <p className="font-bold text-slate-800 group-hover:text-blue-700">{inv.full_name}</p>
                        <p className="text-xs text-slate-400 font-mono mt-1">{inv.mobile}</p>
                      </td>
                      <td className="p-5 font-black text-slate-700">৳ {investedAmount.toLocaleString()}</td>
                      <td className="p-5">
                         <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-black tracking-tighter">
                            {sharePercentage}%
                         </span>
                      </td>
                      <td className="p-5 text-right">
                        <button className="p-2 bg-slate-100 text-slate-400 rounded-xl hover:bg-blue-600 hover:text-white transition">
                           <ChevronRight size={18}/>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {investors.length === 0 && <div className="text-center py-20 text-slate-300 font-bold italic uppercase">কোনো ইনভেস্টর পাওয়া যায়নি</div>}
          </div>
        )}
      </div>

      {/* --- ADD INVESTOR MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
              <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
                 <h3 className="text-lg font-bold flex items-center gap-2"><UserPlus size={20}/> নতুন ইনভেস্টর</h3>
                 <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><X size={20}/></button>
              </div>
              
              <form onSubmit={handleAddInvestor} className="p-8 space-y-5">
                 <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2">নাম</label>
                    <input type="text" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-600" placeholder="সম্পূর্ণ নাম" onChange={e => setFormData({...formData, full_name: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2">মোবাইল নম্বর</label>
                    <input type="number" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-600" placeholder="017xxxxxxxx" onChange={e => setFormData({...formData, mobile: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2">বিনিয়োগের পরিমাণ (৳)</label>
                    <input type="number" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-600 font-bold text-blue-600" placeholder="যেমন: ৫,০০,০০০" onChange={e => setFormData({...formData, initial_investment: e.target.value})} />
                 </div>
                 <button disabled={btnLoading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-100 transition active:scale-95 flex justify-center items-center gap-2">
                    {btnLoading ? <Loader2 className="animate-spin" /> : <><CheckCircle size={22}/> কনফার্ম করুন</>}
                 </button>
              </form>
           </div>
        </div>
      )}

    </div>
  );
}

// --- Helper Stat Card Component ---
function StatCard({ label, value, icon, color }: any) {
    return (
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-lg transition duration-300">
            <div className={`p-4 rounded-2xl text-white shadow-lg ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-wider">{label}</p>
                <h4 className="text-2xl font-black text-slate-800">৳ {value.toLocaleString()}</h4>
            </div>
        </div>
    );
}