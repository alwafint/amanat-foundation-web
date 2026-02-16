'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, Search, Filter, UserPlus, 
  MoreVertical, ShieldCheck, UserCog, 
  Smartphone, MapPin, Loader2, X, Check, Trash2,
  ChevronRight, Mail, AlertCircle
} from "lucide-react";
// ৪ ধাপ পেছনে গিয়ে lib ফোল্ডার ধরা হয়েছে
import { supabase } from '../../../../lib/supabaseClient';

export default function UserManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // all, member, staff, management, admin
  
  // এডিট মোড স্টেট
  const [editingUser, setEditingUser] = useState<any>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ইউজার আপডেট ফাংশন (Role or Status)
  const handleUpdateUser = async (id: number, updates: any) => {
    setUpdateLoading(true);
    try {
      const { error } = await supabase.from('members').update(updates).eq('id', id);
      if (error) throw error;
      alert("তথ্য সফলভাবে আপডেট করা হয়েছে!");
      setEditingUser(null);
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  // রোল অনুযায়ী কালার নির্ধারণ
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700 border-red-200';
      case 'management': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'staff': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  // ফিল্টার এবং সার্চ লজিক
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || u.mobile.includes(searchQuery);
    const matchesFilter = activeFilter === 'all' || u.role === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      
      {/* --- Page Header --- */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
            <UserCog className="text-emerald-600" /> ইউজার ম্যানেজমেন্ট
          </h2>
          <p className="text-sm text-slate-500 mt-1">সিস্টেমের সকল মেম্বার, স্টাফ ও এডমিনদের নিয়ন্ত্রণ করুন</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-100 transition flex items-center gap-2 active:scale-95">
          <UserPlus size={18}/> নতুন ইউজার যোগ
        </button>
      </div>

      {/* --- Search & Filter Bar --- */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="নাম বা মোবাইল নম্বর দিয়ে খুঁজুন..." 
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 transition"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {['all', 'member', 'staff', 'management', 'admin'].map((role) => (
            <button
              key={role}
              onClick={() => setActiveFilter(role)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                activeFilter === role 
                  ? 'bg-slate-800 text-white border-slate-800 shadow-md' 
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {role === 'all' ? 'সবাই' : role}
            </button>
          ))}
        </div>
      </div>

      {/* --- User List (Responsive Grid) --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="animate-spin text-emerald-600" size={32} />
          <p className="text-slate-400 font-medium">ইউজার লিস্ট লোড হচ্ছে...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredUsers.map((u) => (
            <div key={u.id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col">
              
              {/* Status Indicator Bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${u.status === 'active' ? 'bg-emerald-500' : 'bg-yellow-400'}`}></div>

              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-lg text-slate-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500">
                    {u.full_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 leading-none">{u.full_name}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-1.5 flex items-center gap-1">
                       <Smartphone size={12}/> {u.mobile}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setEditingUser(u)}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition"
                >
                  <MoreVertical size={20}/>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase border ${getRoleBadge(u.role)}`}>
                   {u.role}
                </span>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase border ${u.status === 'active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100'}`}>
                   {u.status}
                </span>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center">
                 <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                    <MapPin size={10}/> {u.village || 'No Address'}
                 </div>
                 <button onClick={() => setEditingUser(u)} className="text-xs font-bold text-emerald-600 flex items-center gap-1 hover:underline">
                    ম্যানেজ <ChevronRight size={14}/>
                 </button>
              </div>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed text-slate-400 font-bold">
               <Users className="mx-auto mb-3 opacity-20" size={48}/>
               কোনো ইউজার পাওয়া যায়নি
            </div>
          )}
        </div>
      )}

      {/* --- EDIT USER MODAL --- */}
      {editingUser && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
              <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
                 <h3 className="text-lg font-bold">ইউজার সেটিংস</h3>
                 <button onClick={() => setEditingUser(null)} className="p-2 hover:bg-white/10 rounded-full"><X size={20}/></button>
              </div>
              
              <div className="p-8 space-y-8">
                 {/* Role Change */}
                 <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">রোল পরিবর্তন করুন</label>
                    <div className="grid grid-cols-2 gap-3">
                       {['member', 'staff', 'management', 'admin'].map((r) => (
                          <button 
                            key={r}
                            onClick={() => handleUpdateUser(editingUser.id, { role: r })}
                            className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${editingUser.role === r ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-indigo-300'}`}
                          >
                            {r.toUpperCase()}
                          </button>
                       ))}
                    </div>
                 </div>

                 {/* Status Change */}
                 <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">একাউন্ট স্ট্যাটাস</label>
                    <div className="flex gap-4">
                       <button 
                         onClick={() => handleUpdateUser(editingUser.id, { status: 'active' })}
                         className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm border transition ${editingUser.status === 'active' ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-slate-50 text-slate-400'}`}
                       >
                         <Check size={18}/> Active
                       </button>
                       <button 
                         onClick={() => handleUpdateUser(editingUser.id, { status: 'pending' })}
                         className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm border transition ${editingUser.status === 'pending' ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-slate-50 text-slate-400'}`}
                       >
                         <AlertCircle size={18}/> Block/Pending
                       </button>
                    </div>
                 </div>

                 {updateLoading && (
                    <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold animate-pulse">
                       <Loader2 className="animate-spin" size={16}/> আপডেট হচ্ছে...
                    </div>
                 )}
              </div>
           </div>
        </div>
      )}

    </div>
  );
}