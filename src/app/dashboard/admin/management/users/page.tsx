'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, Search, UserCog, Smartphone, MapPin, 
  Loader2, X, Building2, Save, UserPlus, AlertCircle,
  Briefcase, Lock, ShieldCheck, CheckCircle2, MoreHorizontal
} from "lucide-react";
// সঠিক পাথ (৫ ধাপ পেছনে: src/lib/...)
import { supabase } from '../../../../../lib/supabaseClient'; 
import { divisions, districts, upazilas, unions } from '../../../../../lib/bd-locations';

export default function UserManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const[loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const[activeFilter, setActiveFilter] = useState('all');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const[isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const [newUser, setNewUser] = useState({
    full_name: '',
    mobile: '',
    role: 'member',
    branch_id: '',
    division: '',
    district: '',
    upazila: '',
    union_name: '',
    status: 'active'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: userData, error: userError } = await supabase
        .from('members')
        .select('*, branches(name)')
        .order('created_at', { ascending: false });

      const { data: branchData } = await supabase
        .from('branches')
        .select('*');

      if (userData) setUsers(userData);
      if (branchData) {
        setBranches(branchData);
        if (branchData.length > 0 && !newUser.branch_id) {
          setNewUser(prev => ({ ...prev, branch_id: branchData[0].id }));
        }
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); },[]);

  // --- লোকেশন ফিল্টারিং লজিক (New User) ---
  const selectedDivForNew = divisions.find(d => d.bn_name === newUser.division);
  const districtListForNew = districts.filter(d => d.division_id === selectedDivForNew?.id);
  const selectedDistForNew = districts.find(d => d.bn_name === newUser.district);
  const upazilaListForNew = upazilas.filter(u => u.district_id === selectedDistForNew?.id);
  const selectedUpaForNew = upazilas.find(u => u.bn_name === newUser.upazila);
  const unionListForNew = unions.filter(u => u.upazilla_id === selectedUpaForNew?.id);

  // --- লোকেশন ফিল্টারিং লজিক (Edit User) ---
  const selectedDivForEdit = divisions.find(d => d.bn_name === editingUser?.division);
  const districtListForEdit = districts.filter(d => d.division_id === selectedDivForEdit?.id);
  const selectedDistForEdit = districts.find(d => d.bn_name === editingUser?.district);
  const upazilaListForEdit = upazilas.filter(u => u.district_id === selectedDistForEdit?.id);
  const selectedUpaForEdit = upazilas.find(u => u.bn_name === editingUser?.upazila);
  const unionListForEdit = unions.filter(u => u.upazilla_id === selectedUpaForEdit?.id);

  // --- নতুন ইউজার তৈরি হ্যান্ডলার ---
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      // ইউনিয়ন লিডার চেক
      if (newUser.role === 'team_leader') {
        if (!newUser.union_name) {
          alert("ইউনিয়ন লিডারের জন্য অবশ্যই একটি ইউনিয়ন নির্বাচন করতে হবে!");
          setCreateLoading(false); return;
        }

        const { data: existingLeader } = await supabase
          .from('members')
          .select('id')
          .eq('role', 'team_leader')
          .eq('union_name', newUser.union_name)
          .eq('status', 'active')
          .maybeSingle();

        if (existingLeader) {
          alert(`দুঃখিত! '${newUser.union_name}' ইউনিয়নে ইতিমধ্যে একজন লিডার আছেন।`);
          setCreateLoading(false); return;
        }
      }

      // ৬ ডিজিটের র‍্যান্ডম পাসওয়ার্ড জেনারেট
      const generatedPassword = Math.floor(100000 + Math.random() * 900000).toString();

      const { error } = await supabase.from('members').insert([{
        ...newUser,
        password: generatedPassword
      }]);

      if (error) throw error;
      
      alert(`নতুন ইউজার সফলভাবে যুক্ত হয়েছে!\n\nলগইন ডিটেইলস:\nমোবাইল: ${newUser.mobile}\nপাসওয়ার্ড: ${generatedPassword}\n\n(দয়া করে পাসওয়ার্ডটি সংরক্ষণ করুন বা ইউজারকে জানিয়ে দিন)`);
      
      setIsCreateModalOpen(false);
      setNewUser({ ...newUser, full_name: '', mobile: '', division: '', district: '', upazila: '', union_name: '' });
      fetchData();

    } catch (err: any) {
      alert("সমস্যা হয়েছে: " + err.message);
    } finally {
      setCreateLoading(false);
    }
  };

  // --- তথ্য আপডেট হ্যান্ডলার ---
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      if (editingUser.role === 'team_leader') {
        if (!editingUser.union_name) {
          alert("ইউনিয়ন লিডারের জন্য অবশ্যই একটি ইউনিয়ন নির্বাচন করতে হবে!");
          setUpdateLoading(false); return;
        }

        const { data: existingLeader } = await supabase
          .from('members')
          .select('id')
          .eq('role', 'team_leader')
          .eq('union_name', editingUser.union_name)
          .eq('status', 'active')
          .neq('id', editingUser.id)
          .maybeSingle();

        if (existingLeader) {
          alert(`দুঃখিত! '${editingUser.union_name}' ইউনিয়নে ইতিমধ্যে অন্য একজন লিডার আছেন।`);
          setUpdateLoading(false); return;
        }
      }

      const { error } = await supabase
        .from('members')
        .update({
          full_name: editingUser.full_name,
          mobile: editingUser.mobile,
          role: editingUser.role,
          status: editingUser.status,
          branch_id: editingUser.branch_id,
          division: editingUser.division,
          district: editingUser.district,
          upazila: editingUser.upazila,
          union_name: editingUser.union_name
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

  // রোল অনুযায়ী নাম দেখানোর ফাংশন
  const formatRoleName = (role: string) => {
    if (role === 'team_leader') return 'ইউনিয়ন লিডার';
    if (role === 'branch_manager') return 'ব্রাঞ্চ ম্যানেজার';
    if (role === 'volunteer') return 'ভলেন্টিয়ার';
    if (role === 'member') return 'মেম্বার';
    return role.replace('_', ' ');
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans bg-[#F3F4F6] min-h-screen">
      
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-50 text-[#006A4E] rounded-2xl flex items-center justify-center shadow-inner border border-emerald-100">
                <Users size={28} />
            </div>
            <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">ইউজার ম্যানেজমেন্ট</h2>
                <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">মেম্বার, লিডার, ভলেন্টিয়ার ও স্টাফ প্রোফাইল নিয়ন্ত্রণ প্যানেল</p>
            </div>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-[#006A4E] hover:opacity-90 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-900/20 transition flex items-center gap-2 active:scale-95 w-full md:w-auto justify-center"
        >
          <UserPlus size={20}/> নতুন ইউজার যোগ করুন
        </button>
      </div>

      <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 mb-8 flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
          <input 
            type="text" placeholder="নাম বা মোবাইল দিয়ে খুঁজুন..." 
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#006A4E] transition font-medium text-sm md:text-base"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {/* ফিল্টার অপশনে ২ টি নতুন রোল যোগ করা হলো */}
          {['all', 'member', 'volunteer', 'team_leader', 'branch_manager', 'staff', 'management', 'admin', 'super_admin'].map((role) => (
            <button
              key={role}
              onClick={() => setActiveFilter(role)}
              className={`px-5 py-3 rounded-2xl text-xs font-bold capitalize transition-all border shrink-0 ${activeFilter === role ? 'bg-[#006A4E] text-white border-[#006A4E] shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
            >
              {formatRoleName(role)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="animate-spin text-[#006A4E]" size={40} />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">তথ্য লোড হচ্ছে...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
           <Users size={64} className="mx-auto text-slate-200 mb-4"/>
           <h3 className="text-lg font-bold text-slate-400 italic">কোনো ইউজার পাওয়া যায়নি</h3>
        </div>
      ) : (
        <>
          {/* DESKTOP VIEW: Table Format (Large Screens Only) */}
          <div className="hidden lg:block overflow-x-auto bg-white rounded-[2rem] shadow-sm border border-slate-100">
            <table className="w-full text-left border-collapse min-w-max">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase text-[11px] tracking-wider">
                  <th className="px-6 py-5 font-bold">ইউজারের নাম ও রোল</th>
                  <th className="px-6 py-5 font-bold">যোগাযোগের নম্বর</th>
                  <th className="px-6 py-5 font-bold">ঠিকানা (ইউনিয়ন ও উপজেলা)</th>
                  <th className="px-6 py-5 font-bold">ব্রাঞ্চ/শাখা</th>
                  <th className="px-6 py-5 font-bold text-center">স্ট্যাটাস</th>
                  <th className="px-6 py-5 font-bold text-center">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => {
                  const isProtected = u.role === 'admin' || u.role === 'super_admin';
                  const isLeader = u.role === 'team_leader';
                  const isBranchManager = u.role === 'branch_manager';

                  return (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border ${isLeader || isBranchManager ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                            {u.full_name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{u.full_name}</p>
                            <span className={`inline-block mt-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${isProtected ? 'bg-red-50 text-red-600 border-red-100' : (isLeader || isBranchManager) ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                              {formatRoleName(u.role)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-700 flex items-center gap-1.5"><Smartphone size={14} className="text-slate-400"/> {u.mobile}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-700 text-sm">
                          {u.union_name ? `${u.union_name}, ${u.upazila}` : <span className="text-slate-300 italic">ঠিকানা নেই</span>}
                        </p>
                        {u.district && <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{u.district}</p>}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-sm text-slate-600 flex items-center gap-1.5"><Building2 size={14} className="text-emerald-600"/> {u.branches?.name || 'N/A'}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {u.status === 'active' ? (
                           <span className="bg-emerald-100 text-[#006A4E] px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center justify-center gap-1 w-fit mx-auto"><CheckCircle2 size={12}/> Active</span>
                        ) : (
                           <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-[10px] font-bold w-fit mx-auto block capitalize">{u.status}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {isProtected ? (
                           <span className="text-xs text-slate-400 flex items-center justify-center gap-1 font-medium"><Lock size={12}/> Locked</span>
                        ) : (
                          <button 
                            onClick={() => openEditModal(u)}
                            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200 transition flex items-center justify-center gap-1.5 mx-auto"
                          >
                            <UserCog size={14}/> এডিট
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* MOBILE / TABLET VIEW: Card Format (Small Screens Only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
            {filteredUsers.map((u) => {
              const isProtected = u.role === 'admin' || u.role === 'super_admin';
              const isLeader = u.role === 'team_leader';
              const isBranchManager = u.role === 'branch_manager';
              
              return (
                <div key={u.id} className={`bg-white p-5 rounded-[2rem] shadow-sm border transition-all duration-300 relative overflow-hidden flex flex-col h-full ${isLeader || isBranchManager ? 'border-indigo-100' : 'border-slate-100'}`}>
                  <div className={`absolute top-0 left-0 w-full h-1 ${u.status === 'active' ? (isLeader || isBranchManager ? 'bg-indigo-500' : 'bg-[#006A4E]') : 'bg-[#FFB800]'}`}></div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-[1rem] flex items-center justify-center font-bold text-lg border ${isLeader || isBranchManager ? 'bg-indigo-50 text-indigo-500 border-indigo-100' : 'bg-slate-100 text-slate-500 border-slate-50'}`}>
                        {u.full_name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 leading-tight">{u.full_name}</h3>
                        <p className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-1"><Smartphone size={12}/> {u.mobile}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200 border-dashed">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${isProtected ? 'bg-red-50 text-red-600 border-red-100' : (isLeader || isBranchManager) ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                        {formatRoleName(u.role)}
                      </span>
                      <span className={`text-[10px] font-bold uppercase ${u.status === 'active' ? 'text-emerald-600' : 'text-amber-500'}`}>
                        {u.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 flex items-center gap-2 font-medium mt-2"><Building2 size={14} className="text-emerald-600"/> {u.branches?.name || 'N/A'}</p>
                    <p className="text-xs text-slate-600 flex items-center gap-2 font-medium">
                      <MapPin size={14} className="text-indigo-500"/> 
                      <span className="truncate">{u.union_name ? `${u.union_name}, ${u.upazila}` : 'N/A'}</span>
                    </p>
                  </div>

                  <div className="mt-auto">
                    {isProtected ? (
                      <div className="w-full py-2.5 bg-slate-100 text-slate-400 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-not-allowed">
                          <Lock size={14}/> সংরক্ষিত প্রোফাইল
                      </div>
                    ) : (
                      <button 
                        onClick={() => openEditModal(u)}
                        className={`w-full py-2.5 text-white rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${isLeader || isBranchManager ? 'bg-indigo-600' : 'bg-[#0f172a]'}`}
                      >
                          <UserCog size={14}/> এডিট করুন
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
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
                    <select 
                      required 
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#006A4E]" 
                      onChange={(e:any) => setNewUser({...newUser, branch_id: e.target.value})}
                    >
                        <option value="">ব্রাঞ্চ সিলেক্ট করুন</option>
                        {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">রোল (Role)</label>
                    <select required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-[#006A4E]" onChange={(e:any) => setNewUser({...newUser, role: e.target.value})}>
                        <option value="member">মেম্বার (Member)</option>
                        <option value="volunteer">ভলেন্টিয়ার (Volunteer)</option>
                        <option value="team_leader">ইউনিয়ন লিডার (Union Leader)</option>
                        <option value="branch_manager">ব্রাঞ্চ ম্যানেজার (Branch Manager)</option>
                        <option value="staff">স্টাফ (Staff)</option>
                        <option value="management">ম্যানেজমেন্ট (Management)</option>
                    </select>
                 </div>
              </div>

              {/* --- Location Selection (Division -> District -> Upazila -> Union) --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">বিভাগ</label>
                    <select required value={newUser.division} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#006A4E]" 
                      onChange={(e) => setNewUser({...newUser, division: e.target.value, district: '', upazila: '', union_name: ''})}>
                        <option value="">বিভাগ নির্বাচন করুন</option>
                        {divisions.map(d => <option key={d.id} value={d.bn_name}>{d.bn_name}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">জেলা</label>
                    <select required value={newUser.district} disabled={!newUser.division} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#006A4E] disabled:opacity-50" 
                      onChange={(e) => setNewUser({...newUser, district: e.target.value, upazila: '', union_name: ''})}>
                        <option value="">জেলা নির্বাচন করুন</option>
                        {districtListForNew.map(d => <option key={d.id} value={d.bn_name}>{d.bn_name}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">উপজেলা</label>
                    <select required value={newUser.upazila} disabled={!newUser.district} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#006A4E] disabled:opacity-50" 
                      onChange={(e) => setNewUser({...newUser, upazila: e.target.value, union_name: ''})}>
                        <option value="">উপজেলা নির্বাচন করুন</option>
                        {upazilaListForNew.map(u => <option key={u.id} value={u.bn_name}>{u.bn_name}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">ইউনিয়ন</label>
                    <select required value={newUser.union_name} disabled={!newUser.upazila} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#006A4E] disabled:opacity-50" 
                      onChange={(e) => setNewUser({...newUser, union_name: e.target.value})}>
                        <option value="">ইউনিয়ন নির্বাচন করুন</option>
                        {unionListForNew.map(u => <option key={u.id} value={u.bn_name}>{u.bn_name}</option>)}
                    </select>
                 </div>
              </div>

              {newUser.role === 'team_leader' && (
                <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex gap-2">
                  <ShieldCheck className="text-indigo-600 shrink-0 mt-0.5" size={16}/>
                  <p className="text-[11px] text-indigo-900 font-medium"><b>ইউনিয়ন লিডার:</b> প্রতিটি ইউনিয়নের জন্য শুধুমাত্র একজন লিডার এক্টিভ থাকতে পারবেন।</p>
                </div>
              )}
              
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex gap-2">
                 <Lock className="text-emerald-600 shrink-0 mt-0.5" size={16}/>
                 <p className="text-[11px] text-emerald-900 font-medium">ইউজার সফলভাবে তৈরি হওয়ার পর সিস্টেমে স্বয়ংক্রিয়ভাবে একটি <b>৬-ডিজিটের র‍্যান্ডম পাসওয়ার্ড</b> জেনারেট হয়ে স্ক্রিনে দেখাবে।</p>
              </div>

              <button disabled={createLoading} className="w-full bg-[#006A4E] text-white py-4 rounded-2xl font-bold shadow-xl hover:opacity-90 transition flex justify-center items-center gap-2 mt-4">
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
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">শাখা পরিবর্তন</label>
                    <select 
                      value={editingUser.branch_id || ''} 
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-[#006A4E]" 
                      onChange={(e:any) => setEditingUser({...editingUser, branch_id: e.target.value})}
                    >
                        <option value="">ব্রাঞ্চ সিলেক্ট করুন</option>
                        {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">রোল পরিবর্তন</label>
                    <select value={editingUser.role} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-[#006A4E]" onChange={(e:any) => setEditingUser({...editingUser, role: e.target.value})}>
                       <option value="member">Member</option>
                       <option value="volunteer">Volunteer</option>
                       <option value="team_leader">Union Leader</option>
                       <option value="branch_manager">Branch Manager</option>
                       <option value="staff">Staff</option>
                       <option value="management">Management</option>
                    </select>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">বিভাগ</label>
                    <select value={editingUser.division || ''} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#006A4E]" 
                      onChange={(e) => setEditingUser({...editingUser, division: e.target.value, district: '', upazila: '', union_name: ''})}>
                        <option value="">বিভাগ নির্বাচন করুন</option>
                        {divisions.map(d => <option key={d.id} value={d.bn_name}>{d.bn_name}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">জেলা</label>
                    <select value={editingUser.district || ''} disabled={!editingUser.division} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#006A4E] disabled:opacity-50" 
                      onChange={(e) => setEditingUser({...editingUser, district: e.target.value, upazila: '', union_name: ''})}>
                        <option value="">জেলা নির্বাচন করুন</option>
                        {districtListForEdit.map(d => <option key={d.id} value={d.bn_name}>{d.bn_name}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">উপজেলা</label>
                    <select value={editingUser.upazila || ''} disabled={!editingUser.district} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#006A4E] disabled:opacity-50" 
                      onChange={(e) => setEditingUser({...editingUser, upazila: e.target.value, union_name: ''})}>
                        <option value="">উপজেলা নির্বাচন করুন</option>
                        {upazilaListForEdit.map(u => <option key={u.id} value={u.bn_name}>{u.bn_name}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">ইউনিয়ন</label>
                    <select value={editingUser.union_name || ''} disabled={!editingUser.upazila} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#006A4E] disabled:opacity-50" 
                      onChange={(e) => setEditingUser({...editingUser, union_name: e.target.value})}>
                        <option value="">ইউনিয়ন নির্বাচন করুন</option>
                        {unionListForEdit.map(u => <option key={u.id} value={u.bn_name}>{u.bn_name}</option>)}
                    </select>
                 </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">অ্যাকাউন্ট স্ট্যাটাস</label>
                <select value={editingUser.status} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold" onChange={(e:any) => setEditingUser({...editingUser, status: e.target.value})}>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                </select>
              </div>

              <button disabled={updateLoading} className="w-full bg-[#0f172a] text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-black transition flex justify-center items-center gap-2 mt-4">
                {updateLoading ? <Loader2 className="animate-spin"/> : <><Save size={20}/> তথ্য আপডেট করুন</>}
              </button>
           </form>
        </ModalWrapper>
      )}

    </div>
  );

  function openEditModal(user: any) {
    setEditingUser({ ...user });
    setIsEditModalOpen(true);
  }
}

// --- REUSABLE COMPONENTS ---
function ModalWrapper({ title, icon, onClose, children }: any) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 flex flex-col max-h-[90vh]">
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