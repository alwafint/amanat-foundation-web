'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, ShieldAlert, PieChart, 
  Loader2, Landmark, Users, Wallet, 
  ShieldCheck, Globe, Building2, Plus, X,
  Activity, Calendar, DollarSign, ArrowRight, ChevronRight,
  MapPin, UserCheck // <-- UserCheck আইকন ভলান্টিয়ারের জন্য যুক্ত করা হলো
} from "lucide-react";
import { supabase } from '../../../lib/supabaseClient';

export default function AdminMasterDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const[user, setUser] = useState<any>(null);
  
  const [stats, setStats] = useState({
    totalBranches: 0,
    totalUsers: 0,
    totalTeamLeaders: 0,
    totalVolunteers: 0,
    totalCapital: 0,
    totalProfit: 0
  });

  const [branches, setBranches] = useState<any[]>([]);
  const[recentActivities, setRecentActivities] = useState<any[]>([]);
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
      // ব্রাঞ্চের ডাটা
      const { data: branchData } = await supabase.from('branches').select('*');
      
      // মেম্বারদের ডাটা (Role অনুযায়ী কাউন্ট করার জন্য)
      const { data: membersData } = await supabase.from('members').select('role');
      
      let usersCount = 0;
      let teamLeadersCount = 0;
      let volunteersCount = 0;

      if (membersData) {
        usersCount = membersData.length; // মোট ইউজার (সব রোল মিলে)
        teamLeadersCount = membersData.filter(m => m.role === 'team_leader').length; // শুধু টিম লিডার
        volunteersCount = membersData.filter(m => m.role === 'volunteer').length; // শুধু ভলান্টিয়ার
      }

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
      </div>

      {/* --- Updated Stat Boxes --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <StatBox label="মোট ব্রাঞ্চ" value={stats.totalBranches} icon={<Building2/>} color="bg-blue-50 text-blue-600"/>
         <StatBox label="মোট ইউজার" value={stats.totalUsers} icon={<Users/>} color="bg-purple-50 text-purple-600"/>
         <StatBox label="মোট টিম লিডার" value={stats.totalTeamLeaders} icon={<ShieldCheck/>} color="bg-emerald-50 text-emerald-600"/>
         <StatBox label="মোট ভলান্টিয়ার" value={stats.totalVolunteers} icon={<UserCheck/>} color="bg-amber-50 text-amber-600"/>
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