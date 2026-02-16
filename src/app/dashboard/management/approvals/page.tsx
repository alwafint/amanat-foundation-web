'use client';

import React, { useEffect, useState } from 'react';
import { 
  CheckCircle, XCircle, Clock, Smartphone, User, 
  Loader2, ClipboardCheck, ArrowLeft, Search, Calendar,
  Tractor, Wallet, HeartPulse, GraduationCap
} from "lucide-react";
// সঠিক রিলেটিভ পাথ (৪ ধাপ পেছনে)
import { supabase } from '../../../../lib/supabaseClient';

export default function ManagementApprovals() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  
  // ফিল্টার স্ট্যাটাস: 'pending_management' (নতুন), 'approved' (সম্পন্ন), 'rejected' (বাতিল)
  const [filter, setFilter] = useState('pending_management');

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('status', filter)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  // চূড়ান্ত অ্যাকশন (Approve/Reject)
  const handleFinalAction = async (id: number, newStatus: 'approved' | 'rejected') => {
    const confirmMsg = newStatus === 'approved' ? "আপনি কি এই আবেদনটি চূড়ান্ত অনুমোদন দিতে চান?" : "আপনি কি এই আবেদনটি বাতিল করতে চান?";
    if (!window.confirm(confirmMsg)) return;

    setActionLoading(id);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      alert(newStatus === 'approved' ? "আবেদনটি চূড়ান্তভাবে অনুমোদিত হয়েছে!" : "আবেদনটি বাতিল করা হয়েছে।");
      fetchRequests(); // লিস্ট রিফ্রেশ
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  // সার্ভিস অনুযায়ী আইকন জেনারেটর
  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'Machinery': return <Tractor size={20} className="text-emerald-600" />;
      case 'Investment': return <Wallet size={20} className="text-blue-600" />;
      case 'Health': return <HeartPulse size={20} className="text-rose-600" />;
      case 'Training': return <GraduationCap size={20} className="text-purple-600" />;
      default: return <ClipboardCheck size={20} className="text-indigo-600" />;
    }
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      
      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <ClipboardCheck className="text-indigo-600" size={28}/> চূড়ান্ত অনুমোদন প্যানেল
          </h2>
          <p className="text-sm text-slate-500 mt-1">স্টাফদের যাচাইকৃত আবেদনসমূহ এখান থেকে অনুমোদন দিন</p>
        </div>

        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200 overflow-x-auto w-full md:w-auto">
          {[
            { id: 'pending_management', label: 'অপেক্ষমান' },
            { id: 'approved', label: 'অনুমোদিত' },
            { id: 'rejected', label: 'বাতিল' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                filter === tab.id 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab.label} {filter === tab.id && `(${requests.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* --- Requests List --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader2 className="animate-spin text-indigo-600" size={40} />
          <p className="text-slate-400 font-medium animate-pulse">তথ্য লোড হচ্ছে...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((req) => (
            <div key={req.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 relative flex flex-col group overflow-hidden">
              
              {/* Background Glow */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 rounded-full blur-2xl group-hover:bg-indigo-100 transition-colors"></div>

              {/* Top Info */}
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-xl text-slate-600 shadow-inner">
                    {req.member_name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg leading-none">{req.member_name}</h4>
                    <p className="text-xs text-slate-400 font-mono mt-2 flex items-center gap-1">
                       <Smartphone size={12}/> {req.mobile}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    req.status === 'pending_management' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                    req.status === 'approved' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                    'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    {req.status === 'pending_management' ? 'Pending Final' : req.status}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-2 font-bold flex items-center justify-end gap-1">
                    <Calendar size={10}/> {new Date(req.created_at).toLocaleDateString('bn-BD')}
                  </p>
                </div>
              </div>

              {/* Service Details Box */}
              <div className="bg-slate-50/80 p-5 rounded-2xl space-y-4 flex-grow border border-slate-50">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-white rounded-lg shadow-sm">
                      {getServiceIcon(req.service_category)}
                   </div>
                   <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">সেবার ধরণ</p>
                      <p className="text-sm font-bold text-slate-700">{req.service_category}</p>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">আইটেম / বিষয়</p>
                      <p className="text-xs font-bold text-slate-700">{req.item_name}</p>
                   </div>
                   <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">পরিমাণ / স্কেল</p>
                      <p className="text-xs font-bold text-slate-700">{req.quantity}</p>
                   </div>
                </div>

                <div className="pt-3 border-t border-slate-200/50">
                   <p className="text-[10px] text-indigo-500 font-extrabold uppercase mb-1 flex items-center gap-1">
                      <User size={10}/> ভেরিফাইড বাই স্টাফ
                   </p>
                   <p className="text-sm text-slate-600 font-medium italic">"{req.assigned_staff || 'Unknown Staff'}"</p>
                </div>
              </div>

              {/* --- Actions (Only for Pending Management) --- */}
              {filter === 'pending_management' && (
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button 
                    disabled={actionLoading === req.id}
                    onClick={() => handleFinalAction(req.id, 'rejected')}
                    className="py-3 rounded-2xl border-2 border-red-100 text-red-600 font-bold text-sm hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center gap-2"
                  >
                    <XCircle size={18}/> বাতিল
                  </button>
                  <button 
                    disabled={actionLoading === req.id}
                    onClick={() => handleFinalAction(req.id, 'approved')}
                    className="py-3 rounded-2xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transform active:scale-95"
                  >
                    {actionLoading === req.id ? <Loader2 className="animate-spin" size={18}/> : <><CheckCircle size={18}/> অনুমোদন দিন</>}
                  </button>
                </div>
              )}

              {/* Final Status Messages */}
              {filter === 'approved' && (
                <div className="mt-4 p-3 bg-emerald-50 text-emerald-700 text-center rounded-2xl text-xs font-bold border border-emerald-100 flex items-center justify-center gap-2">
                   <CheckCircle size={14}/> এই আবেদনটি সফলভাবে সম্পন্ন হয়েছে
                </div>
              )}
              {filter === 'rejected' && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 text-center rounded-2xl text-xs font-bold border border-red-100 flex items-center justify-center gap-2">
                   <XCircle size={14}/> এই আবেদনটি বাতিল করা হয়েছে
                </div>
              )}
            </div>
          ))}

          {/* Empty State */}
          {requests.length === 0 && (
            <div className="col-span-full text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                <ClipboardCheck size={48}/>
              </div>
              <h3 className="text-xl font-bold text-slate-400 italic">এই মুহূর্তে কোনো আবেদন নেই</h3>
              <p className="text-slate-300 text-sm mt-2">নতুন আবেদন আসলে এখানে জমা হবে।</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}