'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { 
  ClipboardList, CheckCircle, XCircle, Clock, 
  Phone, User, Loader2, ArrowRight, Search,
  Tractor, Wallet, HeartPulse, GraduationCap, Smartphone
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function TeamLeaderRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [filter, setFilter] = useState('pending_staff'); // pending_staff, pending_management, approved

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(localUser);
    if (localUser.mobile) {
      fetchRequests(localUser.mobile, filter);
    }
  }, [filter]);

  const fetchRequests = async (leaderMobile: string, currentFilter: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('staff_id', leaderMobile) // টিম লিডারের নিজের মেম্বারদের রিকোয়েস্ট
        .eq('status', currentFilter)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // স্টাফ বা লিডার কর্তৃক ভেরিফিকেশন সম্পন্ন করা
  const handleVerify = async (id: number) => {
    if(!window.confirm("আপনি কি আবেদনটি যাচাই করেছেন? এটি এখন চূড়ান্ত অনুমোদনের জন্য ম্যানেজমেন্টের কাছে যাবে।")) return;

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: 'pending_management',
          assigned_staff: user.full_name // লিডারের নাম রেকর্ড হবে
        })
        .eq('id', id);

      if (error) throw error;
      alert("আবেদনটি ম্যানেজমেন্টের কাছে পাঠানো হয়েছে।");
      fetchRequests(user.mobile, filter);
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleReject = async (id: number) => {
    if(!window.confirm("আপনি কি আবেদনটি বাতিল করতে চান?")) return;
    try {
      await supabase.from('bookings').update({ status: 'rejected' }).eq('id', id);
      alert("আবেদনটি বাতিল করা হয়েছে।");
      fetchRequests(user.mobile, filter);
    } catch (err: any) { alert(err.message); }
  };

  // আইকন ডিটেক্টর
  const getIcon = (cat: string) => {
    if (cat === 'Machinery') return <Tractor size={20} className="text-indigo-600" />;
    if (cat === 'Investment') return <Wallet size={20} className="text-blue-600" />;
    if (cat === 'Health') return <HeartPulse size={20} className="text-rose-600" />;
    return <Smartphone size={20} className="text-slate-600" />;
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-20 max-w-5xl mx-auto">
      
      {/* --- HEADER --- */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <ClipboardList className="text-indigo-600"/> মেম্বার রিকোয়েস্ট
          </h2>
          <p className="text-sm text-slate-500 mt-1">আপনার মাধ্যমে যুক্ত মেম্বারদের আবেদনের তালিকা</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 overflow-x-auto w-full md:w-auto">
          {[
            { id: 'pending_staff', label: 'নতুন' },
            { id: 'pending_management', label: 'প্রক্রিয়াধীন' },
            { id: 'approved', label: 'সফল' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                filter === tab.id 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- CONTENT --- */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-600" size={32}/></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {requests.map((req) => (
            <div key={req.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 relative flex flex-col h-full group">
              
              {/* Status Badge */}
              <div className="absolute top-4 right-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
                  req.status === 'pending_staff' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                  req.status === 'pending_management' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                  'bg-emerald-50 text-emerald-600 border-emerald-100'
                }`}>
                  {req.status.replace('_', ' ')}
                </span>
              </div>

              {/* Member Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner border border-white">
                  {req.member_name?.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg leading-none">{req.member_name}</h4>
                  <p className="text-xs text-slate-400 font-mono mt-2 flex items-center gap-1">
                    <Smartphone size={12}/> {req.mobile}
                  </p>
                </div>
              </div>

              {/* Request Details */}
              <div className="bg-slate-50 p-4 rounded-2xl space-y-3 flex-grow border border-slate-100">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                   <div className="flex items-center gap-2">
                      {getIcon(req.service_category)}
                      <span className="text-xs font-bold text-slate-500 uppercase">{req.service_category}</span>
                   </div>
                   <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <Clock size={10}/> {new Date(req.created_at).toLocaleDateString('bn-BD')}
                   </span>
                </div>
                <div>
                   <p className="text-sm font-bold text-slate-700 leading-tight">{req.item_name}</p>
                   <p className="text-xs text-slate-500 mt-1">পরিমাণ/স্কোপ: {req.quantity}</p>
                </div>
              </div>

              {/* Actions */}
              {req.status === 'pending_staff' && (
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button 
                    onClick={() => handleReject(req.id)}
                    className="py-3 rounded-xl border border-red-100 text-red-600 text-xs font-bold hover:bg-red-50 transition"
                  >
                    বাতিল
                  </button>
                  <button 
                    onClick={() => handleVerify(req.id)}
                    className="py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-bold transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                  >
                    যাচাই সম্পন্ন <ArrowRight size={14}/>
                  </button>
                </div>
              )}

              {req.status === 'pending_management' && (
                <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-center rounded-xl text-xs font-bold border border-blue-100">
                  অফিসে অনুমোদনের জন্য পাঠানো হয়েছে
                </div>
              )}
            </div>
          ))}

          {requests.length === 0 && (
            <div className="col-span-full text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
              <ClipboardList className="mx-auto mb-4 text-slate-100" size={64} />
              <h3 className="text-xl font-bold text-slate-400 italic">কোনো আবেদন পাওয়া যায়নি</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}