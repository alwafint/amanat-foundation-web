'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, UserPlus, MapPin, Trash2, 
  Loader2, AlertCircle, ShieldCheck, Phone, LogOut, Camera, X, Check, Edit2
} from "lucide-react";
// এই লাইনটি ৯ নম্বর লাইনে রিপ্লেস করুন
import { supabase } from '../../../lib/supabaseClient';

export default function TeamLeaderDashboard() {
  const router = useRouter();
  
  // --- States ---
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [villageName, setVillageName] = useState<string>('');
  const [volunteers, setVolunteers] = useState<any[]>([]);
  
  // Loading States
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form Inputs (Add Volunteer)
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Edit Profile States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editAvatar, setEditAvatar] = useState('');

  const MAX_VOLUNTEERS = 10;

  // --- Initial Check & Fetch ---
  useEffect(() => {
    const checkSession = async () => {
      const savedUser = localStorage.getItem('user');
      if (!savedUser) return router.push('/login');
      
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.role !== 'team-leader') return router.push('/login');

      setCurrentUser(parsedUser);
      await fetchTeamLeaderData(parsedUser.id);
    };
    checkSession();
  }, [router]);

  const fetchTeamLeaderData = async (leaderId: number) => {
    setFetching(true);
    try {
      // ১. টিম লিডারের ডিটেইলস (members টেবিল থেকে ডাটা নেওয়া হচ্ছে)
      const { data: leaderData } = await supabase
        .from('members')
        .select('*, villages(name)')
        .eq('id', leaderId)
        .maybeSingle();
        
      if (leaderData) {
        setCurrentUser(leaderData);
        setEditName(leaderData.full_name);
        setEditAvatar(leaderData.avatar_url || '');
        if (leaderData.villages) setVillageName(leaderData.villages.name);
      }

      // ২. ভলান্টিয়ার লিস্ট (members টেবিল থেকে)
      const { data: volData } = await supabase
        .from('members')
        .select('*')
        .eq('parent_id', leaderId)
        .eq('role', 'volunteer')
        .order('created_at', { ascending: false });

      if (volData) setVolunteers(volData);
    } catch (error) { console.error(error); }
    setFetching(false);
  };

  // --- প্রোফাইল আপডেট লজিক ---
  const handleUpdateProfile = async () => {
    setSubmitting(true);
    const { error } = await supabase
      .from('members')
      .update({ full_name: editName, avatar_url: editAvatar })
      .eq('id', currentUser.id);

    if (error) alert(error.message);
    else {
      alert("প্রোফাইল আপডেট সফল হয়েছে!");
      setIsEditModalOpen(false);
      fetchTeamLeaderData(currentUser.id);
    }
    setSubmitting(false);
  };

  // --- নতুন ভলান্টিয়ার যোগ করার লজিক ---
  const handleAddVolunteer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (volunteers.length >= MAX_VOLUNTEERS) return alert("লিমিট পূর্ণ!");
    
    setSubmitting(true);
    try {
      const { error } = await supabase.from('members').insert([{
        full_name: fullName,
        mobile: phone, // আপনার DB কলাম অনুযায়ী mobile/phone চেক করুন
        password: password, 
        role: 'volunteer',
        village_id: currentUser.village_id,
        parent_id: currentUser.id,
        status: 'active'
      }]);

      if (error) throw error;
      alert("✅ ভলান্টিয়ার সফলভাবে যুক্ত হয়েছে!");
      setFullName(''); setPhone(''); setPassword('');
      fetchTeamLeaderData(currentUser.id);
    } catch (error: any) { alert(error.message); }
    setSubmitting(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("রিমুভ করতে চান?")) return;
    const { error } = await supabase.from('members').delete().eq('id', id);
    if (!error) setVolunteers(prev => prev.filter(v => v.id !== id));
  };

  const handleLogout = () => {
    if (confirm("লগআউট করতে চান?")) {
      localStorage.clear();
      router.push('/login');
    }
  };

  if (fetching && !currentUser) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-[#006A4E]" size={40}/></div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10 font-sans">
      
      {/* --- Top Navbar/Header --- */}
      <div className="bg-[#006A4E] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* প্রোফাইল ছবি ও এডিট আইকন */}
            <div className="relative group">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center font-bold text-2xl border-2 border-white/20 shadow-inner overflow-hidden">
                {currentUser?.avatar_url ? (
                  <img src={currentUser.avatar_url} alt="profile" className="w-full h-full object-cover" />
                ) : currentUser?.full_name?.charAt(0)}
              </div>
              <button onClick={() => setIsEditModalOpen(true)} className="absolute -bottom-1 -right-1 bg-[#FFB800] p-1.5 rounded-lg text-[#006A4E] shadow-lg hover:scale-110 transition-transform">
                <Edit2 size={12} strokeWidth={3} />
              </button>
            </div>
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                {currentUser?.full_name} <ShieldCheck size={16} className="text-[#FFB800]" />
              </h2>
              <p className="text-emerald-100/80 text-xs flex items-center gap-1">
                <MapPin size={12} /> গ্রাম: <span className="text-[#FFB800] font-bold">{villageName}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto bg-white/5 p-2 rounded-xl border border-white/10">
             <div className="flex-1 text-center px-4 border-r border-white/10">
                <p className="text-[10px] text-emerald-200 uppercase">টিম মেম্বার</p>
                <p className="text-xl font-black text-[#FFB800]">{volunteers.length}/10</p>
             </div>
             <button onClick={handleLogout} className="px-4 py-2 bg-red-500/20 hover:bg-red-500 text-red-100 rounded-lg transition-all text-sm font-bold flex items-center gap-2">
               <LogOut size={16} /> <span className="hidden sm:inline">লগআউট</span>
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* --- Left: Add Volunteer Form --- */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 pb-3 border-b flex items-center gap-2">
              <UserPlus size={20} className="text-[#006A4E]" /> নতুন মেম্বার নিয়োগ
            </h3>
            <form onSubmit={handleAddVolunteer} className="space-y-4">
                <input type="text" placeholder="পূর্ণ নাম" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#006A4E]" required />
                <input type="tel" placeholder="মোবাইল নাম্বার" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#006A4E]" required />
                <input type="password" placeholder="পাসওয়ার্ড" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#006A4E]" required />
                <button type="submit" disabled={submitting} className="w-full bg-[#006A4E] text-white py-4 rounded-xl hover:bg-emerald-800 font-bold flex justify-center gap-2 shadow-lg shadow-emerald-900/10">
                  {submitting ? <Loader2 size={20} className="animate-spin" /> : <UserPlus size={20} />} যুক্ত করুন
                </button>
            </form>
          </div>
        </div>

        {/* --- Right: Volunteer List --- */}
        <div className="lg:col-span-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 min-h-[500px]">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 border-b pb-3 text-lg">
              <Users size={22} className="text-[#FFB800]" /> আমার টিমের সদস্যবৃন্দ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {volunteers.map((vol) => (
                <div key={vol.id} className="group bg-slate-50 border border-slate-100 hover:border-[#006A4E] p-4 rounded-2xl flex items-center justify-between transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border-2 border-emerald-50 rounded-2xl flex items-center justify-center font-bold text-sm overflow-hidden shadow-sm">
                      {vol.avatar_url ? (
                        <img src={vol.avatar_url} alt="vol" className="w-full h-full object-cover" />
                      ) : vol.full_name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{vol.full_name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{vol.mobile}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href={`tel:${vol.mobile}`} className="p-2.5 bg-white text-[#006A4E] rounded-xl border border-slate-200 hover:bg-[#006A4E] hover:text-white transition-colors">
                      <Phone size={16} />
                    </a>
                    <button onClick={() => handleDelete(vol.id)} className="p-2.5 bg-white text-red-500 rounded-xl border border-slate-200 hover:bg-red-500 hover:text-white transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {volunteers.length === 0 && <p className="text-center text-slate-400 py-10 col-span-full">কোনো ভলান্টিয়ার নেই</p>}
            </div>
          </div>
        </div>
      </div>

      {/* --- Edit Profile Modal --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl relative animate-in zoom-in duration-300">
            <button onClick={() => setIsEditModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800"><X /></button>
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2"><Camera className="text-[#006A4E]" /> প্রোফাইল আপডেট</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">পূর্ণ নাম</label>
                <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl outline-none focus:border-[#006A4E] font-bold" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">ছবির লিঙ্ক (URL)</label>
                <input type="text" value={editAvatar} onChange={e => setEditAvatar(e.target.value)} placeholder="https://image-link.com" className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl outline-none focus:border-[#006A4E] text-xs" />
              </div>
              <button onClick={handleUpdateProfile} disabled={submitting} className="w-full bg-[#006A4E] text-white py-4 rounded-2xl font-black shadow-lg shadow-emerald-900/20 active:scale-95 transition-all">
                {submitting ? "সেভ হচ্ছে..." : "সংরক্ষণ করুন"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}