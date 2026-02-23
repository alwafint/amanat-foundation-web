'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, Search, UserPlus, Phone, MapPin, 
  Loader2, X, Save, ShieldCheck, User 
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function MyMembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);

  // মডাল স্টেট
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  // নতুন মেম্বার ফর্ম
  const [newMember, setNewMember] = useState({
    full_name: '',
    mobile: '',
    nid: '',
    village: '',
    password: '123' // ডিফল্ট পাসওয়ার্ড
  });

  // ১. ডাটা লোড করা
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(localUser);
    if (localUser.mobile) {
      fetchMyMembers(localUser.mobile);
      // অটোমেটিক লিডারের গ্রাম সেট করা
      setNewMember(prev => ({ ...prev, village: localUser.village || '' }));
    }
  }, []);

  const fetchMyMembers = async (leaderMobile: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('referred_by', leaderMobile) // লিডারের রেফারেন্সে যারা আছে
        .eq('role', 'member')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMembers(data || []);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ২. নতুন মেম্বার তৈরি করা
  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);

    try {
      const { error } = await supabase.from('members').insert([{
        ...newMember,
        role: 'member',
        status: 'active', // লিডার এড করলে সরাসরি একটিভ
        referred_by: user.mobile, // লিডারের মোবাইল রেফারেন্স হিসেবে যাবে
        branch_id: user.branch_id // লিডারের ব্রাঞ্চেই এড হবে
      }]);

      if (error) throw error;

      alert("নতুন মেম্বার সফলভাবে যুক্ত হয়েছে!");
      setIsModalOpen(false);
      setNewMember({ ...newMember, full_name: '', mobile: '', nid: '' }); // গ্রাম বাদে রিসেট
      fetchMyMembers(user.mobile);
    } catch (err: any) {
      alert("সমস্যা হয়েছে: " + err.message);
    } finally {
      setCreateLoading(false);
    }
  };

  // সার্চ ফিল্টার
  const filteredMembers = members.filter(m => 
    m.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.mobile.includes(searchQuery)
  );

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 pb-20">
      
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-indigo-100">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="text-indigo-600"/> আমার মেম্বার তালিকা
          </h2>
          <p className="text-sm text-slate-500 mt-1">আপনার টিমের মোট মেম্বার: {members.length} জন</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 transition flex items-center gap-2 active:scale-95 w-full md:w-auto justify-center"
        >
          <UserPlus size={18}/> মেম্বার যুক্ত করুন
        </button>
      </div>

      {/* --- Search Bar --- */}
      <div className="relative mb-6">
         <Search className="absolute left-4 top-3.5 text-slate-400" size={20}/>
         <input 
            type="text" 
            placeholder="নাম বা মোবাইল নম্বর দিয়ে খুঁজুন..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 shadow-sm transition"
            onChange={(e) => setSearchQuery(e.target.value)}
         />
      </div>

      {/* --- Members List --- */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-600" size={32}/></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <div key={member.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4 hover:border-indigo-200 transition group">
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl border-2 border-white shadow-sm">
                  {member.full_name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{member.full_name}</h4>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <Phone size={12}/> {member.mobile}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs border-t pt-3 border-slate-50">
                 <span className="flex items-center gap-1 text-slate-500 bg-slate-50 px-2 py-1 rounded">
                    <MapPin size={12}/> {member.village || 'N/A'}
                 </span>
                 <span className={`px-2 py-1 rounded font-bold uppercase ${member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {member.status}
                 </span>
              </div>
            </div>
          ))}

          {filteredMembers.length === 0 && (
            <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
               <User className="mx-auto text-slate-300 mb-2" size={48}/>
               <p className="text-slate-400 font-medium">কোনো মেম্বার পাওয়া যায়নি</p>
            </div>
          )}
        </div>
      )}

      {/* --- ADD MEMBER MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in zoom-in-95">
           <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-indigo-900 p-5 text-white flex justify-between items-center">
                 <h3 className="text-lg font-bold flex items-center gap-2">
                    <UserPlus size={20}/> নতুন মেম্বার ফর্ম
                 </h3>
                 <button onClick={() => setIsModalOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"><X size={20}/></button>
              </div>

              <form onSubmit={handleAddMember} className="p-6 space-y-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">মেম্বারের নাম</label>
                    <input required type="text" onChange={e => setNewMember({...newMember, full_name: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:border-indigo-500 font-bold" placeholder="নাম লিখুন" />
                 </div>
                 
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">মোবাইল নম্বর</label>
                    <input required type="number" onChange={e => setNewMember({...newMember, mobile: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:border-indigo-500 font-mono" placeholder="017xxxxxxxx" />
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">গ্রাম/এলাকা</label>
                    <input type="text" value={newMember.village} onChange={e => setNewMember({...newMember, village: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:border-indigo-500" placeholder="গ্রামের নাম" />
                 </div>

                 <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 flex gap-2">
                    <ShieldCheck className="text-indigo-600 shrink-0 mt-0.5" size={16}/>
                    <p className="text-[11px] text-indigo-800 font-medium leading-tight">
                       এই মেম্বারটি আপনার টিমের অন্তর্ভুক্ত হবে। ডিফল্ট পাসওয়ার্ড: <b>123</b>
                    </p>
                 </div>

                 <button disabled={createLoading} className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg flex justify-center items-center gap-2">
                    {createLoading ? <Loader2 className="animate-spin"/> : "মেম্বার সেভ করুন"}
                 </button>
              </form>
           </div>
        </div>
      )}

    </div>
  );
}