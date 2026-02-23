'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, ShieldAlert, PieChart, 
  Loader2, Landmark, Users, Wallet, 
  ShieldCheck, Globe, Building2, Plus, X,
  Activity, Calendar, DollarSign, ArrowRight, ChevronRight
} from "lucide-react";
import { supabase } from '../../../lib/supabaseClient';

export default function AdminMasterDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  // ড্যাশবোর্ড ডাটা স্টেট (এখানে কী-র নাম 'members')
  const [stats, setStats] = useState({
    totalCapital: 0,
    totalProfit: 0,
    members: 0,
    totalBranches: 0,
    pendingApprovals: 0
  });

  const [branches, setBranches] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBranch, setNewBranch] = useState({ name: '', code: '', address: '' });
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    const checkUser = () => {
      const localUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (!localUser?.role) {
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
      const { data: branchData } = await supabase.from('branches').select('*');
      const { count: memberCount } = await supabase.from('members').select('*', { count: 'exact', head: true });
      const { count: pendingCount } = await supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending_management');
      
      const { data: investments } = await supabase
        .from('bookings')
        .select('quantity')
        .eq('service_category', 'Investment')
        .eq('status', 'approved');
      
      let totalInv = 0;
      if (investments) {
        investments.forEach((item: any) => {
          const val = item.quantity ? parseInt(item.quantity.toString().replace(/[^0-9]/g, '')) : 0;
          totalInv += isNaN(val) ? 0 : val;
        });
      }

      const { data: recent } = await supabase
        .from('bookings')
        .select('member_name, service_category, created_at, status')
        .order('created_at', { ascending: false })
        .limit(5);

      setBranches(branchData || []);
      setRecentActivities(recent || []);
      
      // এখানে কী-র নাম 'members' ঠিক করে দেওয়া হয়েছে
      setStats({
        totalBranches: branchData?.length || 0,
        members: memberCount || 0, // ফিক্সড: totalMembers এর বদলে members
        totalCapital: totalInv,
        totalProfit: totalInv * 0.10,
        pendingApprovals: pendingCount || 0
      });

    } catch (error) {
      console.error("Data fetch error:", error);
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
      alert("ব্রাঞ্চ তৈরি হয়েছে!");
      setIsModalOpen(false);
      setNewBranch({ name: '', code: '', address: '' });
      fetchGlobalData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setCreateLoading(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#F3F4F6]">
      <Loader2 className="animate-spin text-[#006A4E]" size={40}/>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-20 text-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#006A4E] animate-pulse"></div>
            <span className="text-[10px] font-black text-[#006A4E] uppercase tracking-[0.3em]">অ্যাডমিন কন্ট্রোল</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">সিস্টেম মাস্টার ড্যাশবোর্ড</h2>
          <p className="text-slate-500 mt-1 font-medium">স্বাগতম, {user?.full_name}</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#006A4E] text-white px-6 py-3 rounded-xl font-bold flex gap-2 shadow-lg hover:bg-emerald-800 transition text-sm">
           <Plus size={18}/> নতুন শাখা
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <StatBox label="মোট ব্রাঞ্চ" value={stats.totalBranches} icon={<Building2/>} color="bg-blue-50 text-blue-600"/>
         <StatBox label="মোট মেম্বার" value={stats.members} icon={<Users/>} color="bg-purple-50 text-purple-600"/>
         <StatBox label="মোট বিনিয়োগ" value={`৳ ${stats.totalCapital}`} icon={<Wallet/>} color="bg-emerald-50 text-emerald-600"/>
         <StatBox label="পেন্ডিং কাজ" value={stats.pendingApprovals} icon={<ShieldCheck/>} color="bg-amber-50 text-amber-600"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                <Globe className="text-[#006A4E]" size={20}/> শাখা সমূহের অবস্থা
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {branches.map((branch) => (
                    <div key={branch.id} className="bg-white border border-slate-200 p-5 rounded-2xl hover:border-[#006A4E] transition shadow-sm group">
                        <h4 className="font-bold text-slate-800">{branch.name}</h4>
                        <p className="text-xs text-slate-400 mt-1 uppercase">কোড: {branch.code}</p>
                        <p className="text-sm text-slate-500 mt-3 flex items-center gap-1"><MapPin size={14}/> {branch.address}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#006A4E] text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden text-center group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><DollarSign size={100}/></div>
                <p className="text-emerald-200 text-xs font-bold uppercase tracking-widest mb-1">নিট মুনাফা (১০%)</p>
                <h3 className="text-3xl font-black">৳ {stats.totalProfit.toLocaleString()}</h3>
                <button className="mt-6 w-full py-3 bg-white text-[#006A4E] rounded-xl font-bold text-sm shadow-lg hover:bg-slate-50 transition">ডিটেইল রিপোর্ট</button>
            </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in zoom-in-95">
           <div className="bg-white p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl">
              <div className="flex justify-between mb-6">
                 <h3 className="font-bold text-xl text-slate-800">নতুন শাখা তথ্য</h3>
                 <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-slate-100 rounded-full"><X/></button>
              </div>
              <form onSubmit={handleCreateBranch} className="space-y-4">
                 <input className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:border-[#006A4E]" placeholder="শাখার নাম" onChange={e => setNewBranch({...newBranch, name: e.target.value})} required/>
                 <input className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:border-[#006A4E]" placeholder="শাখা কোড (SGT-01)" onChange={e => setNewBranch({...newBranch, code: e.target.value})} required/>
                 <input className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:border-[#006A4E]" placeholder="শাখার ঠিকানা" onChange={e => setNewBranch({...newBranch, address: e.target.value})} required/>
                 <button disabled={createLoading} className="w-full bg-[#006A4E] text-white py-4 rounded-2xl font-bold hover:opacity-90 transition">
                    {createLoading ? "প্রসেসিং..." : "শাখা নিশ্চিত করুন"}
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value, icon, color }: any) {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm flex items-center gap-4 border border-slate-50 hover:shadow-md transition">
            <div className={`p-4 rounded-2xl ${color} shadow-inner`}>{icon}</div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
                <h3 className="text-2xl font-black text-slate-800 mt-1">{value}</h3>
            </div>
        </div>
    )
}