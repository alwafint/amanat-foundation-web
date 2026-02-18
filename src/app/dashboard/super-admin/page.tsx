'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, Users, TrendingUp, Wallet, 
  Plus, MapPin, Loader2, Globe, ShieldCheck, 
  Activity, Calendar, DollarSign, 
  X // <-- এই আইকনটি মিসিং ছিল
} from "lucide-react";
import { supabase } from '../../../lib/supabaseClient';

export default function SuperAdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  const [stats, setStats] = useState({
    totalBranches: 0,
    totalMembers: 0,
    totalCapital: 0,
    totalProfit: 0,
    pendingRequests: 0
  });

  const [branches, setBranches] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBranch, setNewBranch] = useState({ name: '', code: '', address: '' });
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const savedUser = localStorage.getItem('user');
      if (!savedUser) {
        router.push('/login');
        return;
      }
      const localUser = JSON.parse(savedUser);
      if (localUser.role !== 'super_admin') {
        router.push('/login');
        return;
      }
      setUser(localUser);
      fetchGlobalData();
    };
    checkUser();
  }, [router]);

  const fetchGlobalData = async () => {
    setLoading(true);
    try {
      const { data: branchList } = await supabase.from('branches').select('*').order('id', { ascending: true });
      const { count: memberCount } = await supabase.from('members').select('*', { count: 'exact', head: true });
      const { data: investments } = await supabase.from('bookings').select('quantity').eq('service_category', 'Investment').eq('status', 'approved');
      
      let totalInv = 0;
      investments?.forEach(i => {
        const amount = parseInt(i.quantity.replace(/[^0-9]/g, '')) || 0;
        totalInv += amount;
      });

      const { data: recent } = await supabase
        .from('bookings')
        .select('member_name, service_category, created_at, status')
        .order('created_at', { ascending: false })
        .limit(5);

      setBranches(branchList || []);
      setRecentActivities(recent || []);
      setStats({
        totalBranches: branchList?.length || 0,
        totalMembers: memberCount || 0,
        totalCapital: totalInv,
        totalProfit: totalInv * 0.10,
        pendingRequests: 0
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      const { error } = await supabase.from('branches').insert([newBranch]);
      if (error) throw error;
      alert("নতুন ব্রাঞ্চ সফলভাবে তৈরি হয়েছে!");
      setIsModalOpen(false);
      setNewBranch({ name: '', code: '', address: '' });
      fetchGlobalData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setCreateLoading(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-emerald-600" size={40}/></div>;

  return (
    <div className="animate-in fade-in duration-500 pb-20 bg-slate-50 min-h-screen text-slate-800 font-sans">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-6 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
             <h2 className="text-2xl font-bold text-slate-800">সিস্টেম ওভারভিউ</h2>
             <p className="text-sm text-slate-500 font-medium">সুপার অ্যাডমিন: {user?.full_name}</p>
          </div>
          <button 
             onClick={() => setIsModalOpen(true)}
             className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition active:scale-95 text-sm"
           >
             <Plus size={18}/> নতুন ব্রাঞ্চ খুলুন
          </button>
        </div>
      </div>

      <div className="container mx-auto p-4 md:p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           <StatCard label="মোট ব্রাঞ্চ" value={stats.totalBranches} icon={<Building2 size={24}/>} color="bg-blue-50 text-blue-600" />
           <StatCard label="মোট মেম্বার" value={stats.totalMembers} icon={<Users size={24}/>} color="bg-purple-50 text-purple-600" />
           <StatCard label="মোট বিনিয়োগ" value={`৳ ${stats.totalCapital.toLocaleString()}`} icon={<Wallet size={24}/>} color="bg-emerald-50 text-emerald-600" />
           <StatCard label="প্রত্যাশিত মুনাফা" value={`৳ ${stats.totalProfit.toLocaleString()}`} icon={<TrendingUp size={24}/>} color="bg-amber-50 text-amber-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
               <Globe className="text-emerald-600" size={20}/> ব্রাঞ্চ নেটওয়ার্ক
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {branches.map((branch) => (
                 <div key={branch.id} className="bg-white border border-slate-200 p-5 rounded-2xl hover:border-emerald-300 transition shadow-sm group">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 font-bold border border-emerald-100">{branch.code.split('-')[1] || '01'}</div>
                       <div>
                          <h4 className="font-bold text-slate-800">{branch.name}</h4>
                          <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono">{branch.code}</span>
                       </div>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-4"><MapPin size={12}/> {branch.address}</p>
                    <button className="w-full py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-100 transition border border-slate-200">বিস্তারিত দেখুন</button>
                 </div>
               ))}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
             <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden text-center">
                <div className="absolute right-0 top-0 p-4 opacity-10"><DollarSign size={80}/></div>
                <p className="text-emerald-200 text-xs font-bold uppercase mb-1">নিট মুনাফা (১০%)</p>
                <h3 className="text-3xl font-black">৳ {stats.totalProfit.toLocaleString()}</h3>
                <button className="mt-4 w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition border border-white/20">রিপোর্ট দেখুন</button>
             </div>
          </div>
        </div>
      </div>

      {/* Create Branch Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in zoom-in-95 duration-200">
           <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold text-slate-800">নতুন ব্রাঞ্চ খুলুন</h3>
                 <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
                    <X size={20}/>
                 </button>
              </div>
              <form onSubmit={handleCreateBranch} className="space-y-4">
                 <input required type="text" onChange={e => setNewBranch({...newBranch, name: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:border-emerald-500 transition text-sm" placeholder="ব্রাঞ্চের নাম" />
                 <input required type="text" onChange={e => setNewBranch({...newBranch, code: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:border-emerald-500 transition text-sm" placeholder="ব্রাঞ্চ কোড (যেমন: GOB-02)" />
                 <input required type="text" onChange={e => setNewBranch({...newBranch, address: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:border-emerald-500 transition text-sm" placeholder="ঠিকানা" />
                 <button disabled={createLoading} className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition flex justify-center items-center gap-2">
                    {createLoading ? <Loader2 className="animate-spin" size={18}/> : "তৈরি করুন"}
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
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition">
            <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
            <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{label}</p>
                <h4 className="text-xl font-black text-slate-800 mt-0.5">{value}</h4>
            </div>
        </div>
    )
}