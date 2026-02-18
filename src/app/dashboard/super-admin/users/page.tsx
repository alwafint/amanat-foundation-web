'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, Search, UserCog, Smartphone, MapPin, 
  Loader2, X, Check, Trash2, ChevronRight, 
  ShieldCheck, Building2, Save, UserPlus, AlertCircle
} from "lucide-react";
// আপনার পাথ অনুযায়ী রিলেটিভ ইমপোর্ট (৪ ধাপ পেছনে)
import { supabase } from '../../../../lib/supabaseClient';

export default function GlobalUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // এডিট মডাল স্টেট
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  // নতুন ইউজার মডাল স্টেট
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    full_name: '',
    mobile: '',
    role: 'member',
    branch_id: '',
    village: '',
    password: '123', // ডিফল্ট পাসওয়ার্ড
    status: 'active'
  });

  // ১. ডাটা লোড করা
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: userData } = await supabase
        .from('members')
        .select('*, branches(name)')
        .order('created_at', { ascending: false });

      const { data: branchData } = await supabase
        .from('branches')
        .select('id, name');

      if (userData) setUsers(userData);
      if (branchData) {
        setBranches(branchData);
        // ডিফল্ট হিসেবে প্রথম ব্রাঞ্চ সেট করা (নতুন ইউজারের জন্য)
        if (branchData.length > 0) setNewUser(prev => ({ ...prev, branch_id: branchData[0].id }));
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ২. নতুন ইউজার তৈরি করা
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);

    try {
      const { error } = await supabase.from('members').insert([newUser]);
      if (error) throw error;

      alert("নতুন ইউজার সফলভাবে তৈরি হয়েছে!");
      setIsCreateModalOpen(false);
      setNewUser({ ...newUser, full_name: '', mobile: '', village: '' }); // রিসেট
      fetchData();
    } catch (err: any) {
      alert("সমস্যা হয়েছে: " + err.message);
    } finally {
      setCreateLoading(false);
    }
  };

  // ৩. বিদ্যমান ইউজার আপডেট করা
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);

    try {
      const { error } = await supabase
        .from('members')
        .update({
          full_name: editingUser.full_name,
          mobile: editingUser.mobile,
          role: editingUser.role,
          status: editingUser.status,
          branch_id: editingUser.branch_id,
          village: editingUser.village
        })
        .eq('id', editingUser.id);

      if (error) throw error;

      alert("তথ্য সফলভাবে আপডেট করা হয়েছে!");
      setIsEditModalOpen(false);
      fetchData();
    } catch (err: any) {
      alert("সমস্যা হয়েছে: " + err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || u.mobile.includes(searchTerm);
    const matchesFilter = activeFilter === 'all' || u.role === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans">
      
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <UserCog className="text-blue-600" /> ইউজার ম্যানেজমেন্ট
          </h2>
          <p className="text-sm text-slate-500">মেম্বার, স্টাফ ও কর্মকর্তাদের প্রোফাইল নিয়ন্ত্রণ করুন</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-100 transition flex items-center gap-2 active:scale-95"
        >
          <UserPlus size={18}/> নতুন ইউজার যোগ
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input 
            type="text" placeholder="নাম বা মোবাইল দিয়ে খুঁজুন..." 
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {['all', 'member', 'staff', 'management', 'admin', 'super_admin'].map((role) => (
            <button
              key={role}
              onClick={() => setActiveFilter(role)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all border ${activeFilter === role ? 'bg-slate-800 text-white border-slate-800 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
            >
              {role.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* User Grid */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={40}/></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredUsers.map((u) => (
            <div key={u.id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 ${u.status === 'active' ? 'bg-emerald-500' : 'bg-amber-400'}`}></div>
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-xl text-slate-600 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                    {u.full_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 leading-none">{u.full_name}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-2 flex items-center gap-1"><Smartphone size={12}/> {u.mobile}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase border ${u.role === 'super_admin' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>{u.role}</span>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-xs text-slate-500 flex items-center gap-1"><Building2 size={14} className="text-slate-300"/> শাখা: <b>{u.branches?.name || 'N/A'}</b></p>
                <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={14} className="text-slate-300"/> গ্রাম: <b>{u.village || 'N/A'}</b></p>
              </div>

              <div className="mt-auto flex gap-2 pt-4 border-t border-slate-50">
                 <button 
                   onClick={() => { setEditingUser({ ...u }); setIsEditModalOpen(true); }}
                   className="flex-1 py-2.5 bg-slate-50 text-blue-700 border border-blue-100 rounded-xl font-bold text-xs hover:bg-blue-600 hover:text-white transition flex items-center justify-center gap-1"
                 >
                    <UserCog size={14}/> ম্যানেজ ও এডিট
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- MODAL 1: CREATE NEW USER --- */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 flex flex-col max-h-[90vh]">
            <div className="bg-emerald-700 p-6 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><UserPlus size={20}/></div>
                 <h3 className="font-bold text-lg">নতুন ইউজার যোগ করুন</h3>
              </div>
              <button onClick={() => setIsCreateModalOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"><X size={20}/></button>
            </div>

            <form onSubmit={handleCreateUser} className="p-8 space-y-5 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">নাম</label>
                  <input type="text" required value={newUser.full_name} onChange={e => setNewUser({...newUser, full_name: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:border-emerald-500 font-bold" placeholder="পুরো নাম লিখুন" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">মোবাইল নম্বর</label>
                  <input type="number" required value={newUser.mobile} onChange={e => setNewUser({...newUser, mobile: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:border-emerald-500 font-mono" placeholder="017xxxxxxxx" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">শাখা নির্বাচন করুন</label>
                <select required value={newUser.branch_id} onChange={e => setNewUser({...newUser, branch_id: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:border-emerald-500">
                   <option value="">ব্রাঞ্চ সিলেক্ট করুন</option>
                   {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">রোল (Role)</label>
                  <select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:border-emerald-500 font-bold text-blue-600">
                    <option value="member">মেম্বার</option>
                    <option value="staff">স্টাফ</option>
                    <option value="management">ম্যানেজমেন্ট</option>
                    <option value="admin">অ্যাডমিন</option>
                    {/* super_admin অপশনটি বাদ দেওয়া হয়েছে */}
                  </select>
                </div>
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">গ্রাম/এলাকা</label>
                   <input type="text" value={newUser.village} onChange={e => setNewUser({...newUser, village: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl" placeholder="গ্রামের নাম" />
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex gap-2">
                 <AlertCircle className="text-yellow-600 shrink-0 mt-0.5" size={16}/>
                 <p className="text-[10px] text-yellow-800 font-medium">নতুন মেম্বার/স্টাফদের জন্য ডিফল্ট পাসওয়ার্ড <b>'123'</b> সেট করা হবে।</p>
              </div>

              <button disabled={createLoading} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition shadow-lg flex justify-center items-center gap-2">
                {createLoading ? <Loader2 className="animate-spin" size={20}/> : <><UserPlus size={20}/> ইউজার তৈরি করুন</>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: EDIT USER --- */}
      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 flex flex-col max-h-[90vh]">
            <div className="bg-slate-900 p-6 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center"><UserCog size={20}/></div>
                 <h3 className="font-bold">ইউজার প্রোফাইল এডিট</h3>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"><X size={20}/></button>
            </div>

            <form onSubmit={handleUpdate} className="p-8 space-y-5 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">পুরো নাম</label>
                  <input type="text" value={editingUser.full_name} onChange={e => setEditingUser({...editingUser, full_name: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:border-blue-500 font-bold" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">মোবাইল</label>
                  <input type="text" value={editingUser.mobile} onChange={e => setEditingUser({...editingUser, mobile: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:border-blue-500 font-mono" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">শাখা পরিবর্তন করুন</label>
                <select value={editingUser.branch_id || ''} onChange={e => setEditingUser({...editingUser, branch_id: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:border-blue-500">
                   {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">ইউজার রোল (Role)</label>
                  <select value={editingUser.role} onChange={e => setEditingUser({...editingUser, role: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:border-blue-500 font-bold text-blue-600">
                    <option value="member">মেম্বার</option>
                    <option value="staff">স্টাফ</option>
                    <option value="management">ম্যানেজমেন্ট</option>
                    <option value="admin">অ্যাডমিন</option>
                    <option value="super_admin">সুপার অ্যাডমিন</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">স্ট্যাটাস</label>
                  <select value={editingUser.status} onChange={e => setEditingUser({...editingUser, status: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:border-blue-500 font-bold">
                    <option value="active">Active (সক্রিয়)</option>
                    <option value="pending">Pending (অপেক্ষমান)</option>
                    <option value="rejected">Rejected (বাতিল)</option>
                  </select>
                </div>
              </div>

              <div>
                 <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">গ্রাম/এলাকা</label>
                 <input type="text" value={editingUser.village || ''} onChange={e => setEditingUser({...editingUser, village: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl" />
              </div>

              <button disabled={updateLoading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-lg flex justify-center items-center gap-2">
                {updateLoading ? <Loader2 className="animate-spin" size={20}/> : <><Save size={20}/> তথ্য আপডেট করুন</>}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}