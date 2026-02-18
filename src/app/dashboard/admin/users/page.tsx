'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, Search, UserCog, Smartphone, MapPin, 
  Loader2, X, Check, Trash2, ChevronRight, 
  ShieldCheck, Building2, Save, UserPlus, AlertCircle,
  Briefcase, UserCheck, Lock
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function UserManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // মডাল স্টেট
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  // নতুন ইউজার ডাটা স্টেট
  const [newUser, setNewUser] = useState({
    full_name: '',
    mobile: '',
    role: 'member',
    branch_id: '',
    village: '',
    password: '123',
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
        if (branchData.length > 0) setNewUser(prev => ({ ...prev, branch_id: branchData[0].id }));
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ২. নতুন ইউজার তৈরি
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      const { error } = await supabase.from('members').insert([newUser]);
      if (error) throw error;
      alert("নতুন ইউজার সফলভাবে যুক্ত হয়েছে!");
      setIsCreateModalOpen(false);
      setNewUser({ ...newUser, full_name: '', mobile: '', village: '' });
      fetchData();
    } catch (err: any) {
      alert("সমস্যা হয়েছে: " + err.message);
    } finally {
      setCreateLoading(false);
    }
  };

  // ৩. ইউজার আপডেট
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
    <div className="animate-in fade-in duration-500 pb-20 font-sans bg-[#F3F4F6] min-h-screen">
      
      {/* --- HEADER SECTION --- */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-50 text-[#006A4E] rounded-2xl flex items-center justify-center shadow-inner border border-emerald-100">
                <Users size={30} />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-800">ইউজার ম্যানেজমেন্ট</h2>
                <p className="text-sm text-slate-500 font-medium">মেম্বার ও স্টাফ প্রোফাইল নিয়ন্ত্রণ প্যানেল</p>
            </div>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-[#006A4E] hover:opacity-90 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-900/20 transition flex items-center gap-2 active:scale-95 w-full md:w-auto justify-center"
        >
          <UserPlus size={20}/> নতুন ইউজার যোগ করুন
        </button>
      </div>

      {/* --- SEARCH & FILTER --- */}
      <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 mb-8 flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
          <input 
            type="text" placeholder="নাম বা মোবাইল দিয়ে খুঁজুন..." 
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#006A4E] transition font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {['all', 'member', 'staff', 'management', 'admin', 'super_admin'].map((role) => (
            <button
              key={role}
              onClick={() => setActiveFilter(role)}
              className={`px-6 py-3 rounded-2xl text-xs font-bold capitalize transition-all border ${activeFilter === role ? 'bg-[#006A4E] text-white border-[#006A4E] shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
            >
              {role.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* --- USER GRID --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="animate-spin text-[#006A4E]" size={40} />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">তথ্য লোড হচ্ছে...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((u) => {
            // চেক করা হচ্ছে সে কি এডমিন বা সুপার এডমিন কি না
            const isProtected = u.role === 'admin' || u.role === 'super_admin';
            
            return (
              <div key={u.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1.5 ${u.status === 'active' ? 'bg-[#006A4E]' : 'bg-[#FFB800]'}`}></div>
                
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-[1.25rem] flex items-center justify-center font-bold text-2xl text-slate-500 group-hover:bg-[#006A4E] group-hover:text-white transition-colors duration-500 shadow-inner border border-slate-50">
                      {u.full_name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg leading-none">{u.full_name}</h3>
                      <p className="text-xs text-slate-400 font-mono mt-2 flex items-center gap-1"><Smartphone size={12}/> {u.mobile}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${isProtected ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>{u.role}</span>
                </div>

                <div className="space-y-3 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-xs text-slate-600 flex items-center gap-2 font-medium"><Building2 size={14} className="text-[#006A4E]"/> শাখা: <b>{u.branches?.name || 'N/A'}</b></p>
                  <p className="text-xs text-slate-600 flex items-center gap-2 font-medium"><MapPin size={14} className="text-[#006A4E]"/> গ্রাম: <b>{u.village || 'N/A'}</b></p>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-50 flex gap-3">
                   {isProtected ? (
                     <div className="w-full py-3 bg-slate-100 text-slate-400 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 cursor-not-allowed">
                        <Lock size={16}/> এডিট করার অনুমতি নেই
                     </div>
                   ) : (
                     <button 
                       onClick={() => openEditModal(u)}
                       className="flex-1 py-3 bg-[#0f172a] text-white rounded-2xl font-bold text-xs hover:bg-black transition shadow-lg flex items-center justify-center gap-2"
                     >
                        <UserCog size={16}/> ম্যানেজ ও এডিট
                     </button>
                   )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- MODAL: CREATE USER --- */}
      {isCreateModalOpen && (
        <ModalWrapper title="নতুন ইউজার যোগ করুন" icon={<UserPlus size={24}/>} onClose={() => setIsCreateModalOpen(false)}>
           <form onSubmit={handleCreateUser} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <InputGroup label="পুরো নাম" name="name" type="text" onChange={(e:any) => setNewUser({...newUser, full_name: e.target.value})} placeholder="নাম লিখুন" required />
                 <InputGroup label="মোবাইল নম্বর" name="mobile" type="number" onChange={(e:any) => setNewUser({...newUser, mobile: e.target.value})} placeholder="017xxxxxxxx" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">শাখা নির্বাচন</label>
                    <select required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#006A4E]" onChange={(e:any) => setNewUser({...newUser, branch_id: e.target.value})}>
                        <option value="">ব্রাঞ্চ সিলেক্ট করুন</option>
                        {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">রোল (Role)</label>
                    <select required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-[#006A4E]" onChange={(e:any) => setNewUser({...newUser, role: e.target.value})}>
                        <option value="member">মেম্বার (Member)</option>
                        <option value="staff">স্টাফ (Staff)</option>
                        <option value="management">ম্যানেজমেন্ট (Management)</option>
                    </select>
                 </div>
              </div>
              <InputGroup label="গ্রাম/এলাকা" name="village" type="text" onChange={(e:any) => setNewUser({...newUser, village: e.target.value})} placeholder="গ্রামের নাম" />
              
              <div className="bg-amber-50 p-4 rounded-2xl border border-[#FFB800]/30 flex gap-2">
                 <AlertCircle className="text-[#FFB800] shrink-0 mt-0.5" size={16}/>
                 <p className="text-[11px] text-amber-900 font-medium">নিরাপত্তার স্বার্থে নতুন ইউজারের পাসওয়ার্ড ডিফল্টভাবে <b>'123'</b> সেট করা হবে।</p>
              </div>

              <button disabled={createLoading} className="w-full bg-[#006A4E] text-white py-4 rounded-2xl font-bold shadow-xl hover:opacity-90 transition flex justify-center items-center gap-2">
                {createLoading ? <Loader2 className="animate-spin"/> : "ইউজার তৈরি করুন"}
              </button>
           </form>
        </ModalWrapper>
      )}

      {/* --- MODAL: EDIT USER --- */}
      {isEditModalOpen && editingUser && (
        <ModalWrapper title="ইউজার প্রোফাইল এডিট" icon={<UserCog size={24}/>} onClose={() => setIsEditModalOpen(false)}>
           <form onSubmit={handleUpdate} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <InputGroup label="নাম" value={editingUser.full_name} type="text" onChange={(e:any) => setEditingUser({...editingUser, full_name: e.target.value})} />
                 <InputGroup label="মোবাইল" value={editingUser.mobile} type="text" onChange={(e:any) => setEditingUser({...editingUser, mobile: e.target.value})} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">রোল পরিবর্তন</label>
                    <select value={editingUser.role} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-[#006A4E]" onChange={(e:any) => setEditingUser({...editingUser, role: e.target.value})}>
                       <option value="member">Member</option>
                       <option value="staff">Staff</option>
                       <option value="management">Management</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">স্ট্যাটাস</label>
                    <select value={editingUser.status} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold" onChange={(e:any) => setEditingUser({...editingUser, status: e.target.value})}>
                       <option value="active">Active</option>
                       <option value="pending">Pending</option>
                       <option value="rejected">Rejected</option>
                    </select>
                 </div>
              </div>
              <InputGroup label="গ্রাম/এলাকা" value={editingUser.village} type="text" onChange={(e:any) => setEditingUser({...editingUser, village: e.target.value})} />
              <button disabled={updateLoading} className="w-full bg-[#0f172a] text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-black transition flex justify-center items-center gap-2">
                {updateLoading ? <Loader2 className="animate-spin"/> : <><Save size={20}/> তথ্য আপডেট করুন</>}
              </button>
           </form>
        </ModalWrapper>
      )}

    </div>
  );

  // --- Helper Functions ---
  function openEditModal(user: any) {
    setEditingUser({ ...user });
    setIsEditModalOpen(true);
  }
}

// --- REUSABLE COMPONENTS ---

function ModalWrapper({ title, icon, onClose, children }: any) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 flex flex-col max-h-[90vh]">
            <div className="bg-[#0f172a] p-6 text-white flex justify-between items-center shrink-0 border-b border-white/5">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-[#006A4E] rounded-xl flex items-center justify-center shadow-lg border border-emerald-400/20">{icon}</div>
                 <h3 className="font-bold text-lg">{title}</h3>
              </div>
              <button onClick={onClose} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"><X size={20}/></button>
            </div>
            <div className="p-8 overflow-y-auto custom-scrollbar">
              {children}
            </div>
          </div>
        </div>
    )
}

function InputGroup({ label, ...props }: any) {
    return (
        <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">{label}</label>
            <input {...props} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#006A4E] focus:ring-4 focus:ring-[#006A4E]/5 transition font-medium text-slate-700" />
        </div>
    )
}