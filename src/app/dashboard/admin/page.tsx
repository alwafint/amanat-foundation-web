'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, ShieldAlert, PieChart, 
  Loader2, Landmark, Users, Wallet, 
  ShieldCheck, Globe, Building2, Plus, X
} from "lucide-react";
import { supabase } from '../../../lib/supabaseClient';

export default function AdminMasterDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  const [stats, setStats] = useState({
    totalCapital: 0,
    totalProfit: 0,
    members: 0,
    totalBranches: 0,
    pendingApprovals: 0
  });

  const [branches, setBranches] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBranch, setNewBranch] = useState({ name: '', code: '', address: '' });

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
  }, []);

  const fetchGlobalData = async () => {
    setLoading(true);
    try {
      // ১. ডাটা আনা
      const { data: branchData } = await supabase.from('branches').select('*');
      const { count: memberCount } = await supabase.from('members').select('*', { count: 'exact', head: true });
      const { count: pendingCount } = await supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending_management');
      
      // ২. ইনভেস্টমেন্ট ক্যালকুলেশন
      const { data: investments } = await supabase
        .from('bookings')
        .select('quantity')
        .eq('service_category', 'Investment')
        .eq('status', 'approved');
      
      let totalInv = 0;
      if (investments) {
        investments.forEach((item: any) => {
          // সেফলি নাম্বার কনভার্ট করা
          const val = item.quantity ? parseInt(item.quantity.toString().replace(/[^0-9]/g, '')) : 0;
          totalInv += isNaN(val) ? 0 : val;
        });
      }

      setBranches(branchData || []);
      setStats({
        totalBranches: branchData?.length || 0,
        totalMembers: memberCount || 0,
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

  // ব্রাঞ্চ তৈরি
  const handleCreateBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('branches').insert([newBranch]);
    if (!error) {
      alert("ব্রাঞ্চ তৈরি হয়েছে!");
      setIsModalOpen(false);
      fetchGlobalData();
    } else {
      alert(error.message);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin text-emerald-600" size={40}/>
    </div>
  );

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen text-slate-800">
      
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm">
        <div>
           <h2 className="text-2xl font-bold">অ্যাডমিন ড্যাশবোর্ড</h2>
           <p className="text-sm text-slate-500">স্বাগতম, {user?.full_name}</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex gap-2 font-bold">
           <Plus size={18}/> নতুন ব্রাঞ্চ
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatBox label="মোট ব্রাঞ্চ" value={stats.totalBranches} icon={<Building2/>} color="bg-blue-100 text-blue-600"/>
         <StatBox label="মোট মেম্বার" value={stats.members} icon={<Users/>} color="bg-purple-100 text-purple-600"/>
         <StatBox label="মোট বিনিয়োগ" value={`৳ ${stats.totalCapital}`} icon={<Wallet/>} color="bg-emerald-100 text-emerald-600"/>
         <StatBox label="পেন্ডিং কাজ" value={stats.pendingApprovals} icon={<ShieldAlert/>} color="bg-amber-100 text-amber-600"/>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
           <div className="bg-white p-8 rounded-2xl w-full max-w-md">
              <div className="flex justify-between mb-4">
                 <h3 className="font-bold text-lg">ব্রাঞ্চ তথ্য দিন</h3>
                 <button onClick={() => setIsModalOpen(false)}><X/></button>
              </div>
              <form onSubmit={handleCreateBranch} className="space-y-4">
                 <input className="w-full p-3 border rounded" placeholder="নাম" onChange={e => setNewBranch({...newBranch, name: e.target.value})} required/>
                 <input className="w-full p-3 border rounded" placeholder="কোড (SGT-01)" onChange={e => setNewBranch({...newBranch, code: e.target.value})} required/>
                 <input className="w-full p-3 border rounded" placeholder="ঠিকানা" onChange={e => setNewBranch({...newBranch, address: e.target.value})} required/>
                 <button className="w-full bg-emerald-600 text-white py-3 rounded font-bold">তৈরি করুন</button>
              </form>
           </div>
        </div>
      )}

    </div>
  );
}

function StatBox({ label, value, icon, color }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase">{label}</p>
                <h3 className="text-xl font-bold text-slate-800">{value}</h3>
            </div>
        </div>
    )
}