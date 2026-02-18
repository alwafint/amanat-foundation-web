'use client';

import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, CheckCircle, XCircle, Clock, 
  User, Loader2, Search, ArrowRight, AlertTriangle,
  Tractor, Wallet, HeartPulse, GraduationCap, Smartphone,
  Filter, Calendar, ChevronRight
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function AdminApprovalsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  
  // ফিল্টার স্ট্যাটাস
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

  const handleAction = async (id: number, newStatus: 'approved' | 'rejected') => {
    const actionText = newStatus === 'approved' ? "অনুমোদন" : "বাতিল";
    if (!window.confirm(`আপনি কি এই আবেদনটি চূড়ান্ত ${actionText} করতে চান?`)) return;

    setActionLoading(id);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      alert(`আবেদনটি সফলভাবে ${actionText} করা হয়েছে।`);
      fetchRequests();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const getIcon = (cat: string) => {
    if (cat === 'Machinery') return <Tractor size={20} className="text-[#006A4E]" />;
    if (cat === 'Investment') return <Wallet size={20} className="text-blue-500" />;
    if (cat === 'Health') return <HeartPulse size={20} className="text-rose-500" />;
    return <Smartphone size={20} className="text-indigo-500" />;
  };

  return (
    <div className="animate-in fade-in duration-700 pb-20 text-slate-800 bg-[#F3F4F6] min-h-screen">
      
      {/* --- Page Header (Super Admin Style Card) --- */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-50 text-[#006A4E] rounded-2xl flex items-center justify-center shadow-inner border border-emerald-100">
                <ShieldCheck size={32}/>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-900">চূড়ান্ত অনুমোদন কেন্দ্র</h2>
                <p className="text-sm text-slate-500 font-medium">ম্যানেজমেন্ট কর্তৃক প্রেরিত আবেদনসমূহ যাচাই করুন</p>
            </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-full md:w-auto overflow-x-auto">
          {[
            { id: 'pending_management', label: 'অপেক্ষমান' },
            { id: 'approved', label: 'অনুমোদিত' },
            { id: 'rejected', label: 'বাতিল' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filter === tab.id 
                  ? 'bg-[#006A4E] text-white shadow-md' 
                  : 'text-slate-500 hover:text-[#006A4E]'
              }`}
            >
              {tab.label} {filter === tab.id && requests.length > 0 && `(${requests.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* --- Summary Alert --- */}
      {filter === 'pending_management' && requests.length > 0 && (
          <div className="mb-8 bg-amber-50 border border-[#FFB800]/30 p-4 rounded-2xl flex items-center gap-3 text-amber-800 shadow-sm animate-pulse">
              <AlertTriangle size={20} className="text-[#FFB800]"/>
              <span className="text-sm font-bold">সতর্কতা: আপনার চূড়ান্ত অনুমোদনের জন্য {requests.length} টি আবেদন অপেক্ষমান আছে।</span>
          </div>
      )}

      {/* --- Content Area --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 className="animate-spin text-[#006A4E]" size={40} />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">তথ্য যাচাই হচ্ছে...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {requests.map((req) => (
            <div key={req.id} className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 hover:shadow-xl transition-all duration-300 relative group overflow-hidden shadow-sm flex flex-col h-full">
              
              {/* Status Accent Bar */}
              <div className={`absolute top-0 left-0 w-full h-1.5 ${
                  req.status === 'pending_management' ? 'bg-[#FFB800]' :
                  req.status === 'approved' ? 'bg-[#006A4E]' : 'bg-red-500'
              }`}></div>

              {/* Member Info Section */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-[1.25rem] flex items-center justify-center font-black text-2xl text-slate-500 group-hover:bg-[#006A4E] group-hover:text-white transition-colors duration-500 shadow-inner border border-slate-50">
                    {req.member_name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg leading-none">{req.member_name}</h4>
                    <p className="text-xs text-slate-400 font-mono mt-2 flex items-center gap-1">
                       <Smartphone size={12}/> {req.mobile}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                   <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                      req.status === 'pending_management' ? 'bg-amber-50 text-[#FFB800] border-[#FFB800]/20' :
                      req.status === 'approved' ? 'bg-emerald-50 text-[#006A4E] border-[#006A4E]/20' :
                      'bg-red-50 text-red-600 border-red-200'
                   }`}>
                      {req.status === 'pending_management' ? 'Pending Final' : req.status.replace('_', ' ')}
                   </div>
                   <p className="text-[10px] text-slate-400 mt-2 font-bold flex items-center justify-end gap-1 uppercase tracking-tighter">
                      <Calendar size={10}/> {new Date(req.created_at).toLocaleDateString('bn-BD')}
                   </p>
                </div>
              </div>

              {/* Details Box */}
              <div className="bg-slate-50 p-6 rounded-3xl space-y-4 border border-slate-100 flex-grow">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                   <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-white rounded-lg shadow-sm">{getIcon(req.service_category)}</div>
                      <span className="text-sm font-bold text-slate-600">{req.service_category}</span>
                   </div>
                   <div className="text-[10px] font-black text-[#006A4E] bg-emerald-50 px-2 py-1 rounded tracking-widest uppercase">
                      Core Seva
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">সেবার বিষয়</p>
                      <p className="text-sm font-bold text-slate-800 leading-tight">{req.item_name}</p>
                   </div>
                   <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">পরিমাণ / ভ্যালু</p>
                      <p className="text-sm font-bold text-[#006A4E] leading-tight">৳ {req.quantity}</p>
                   </div>
                </div>

                <div className="pt-3 border-t border-slate-200">
                   <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase mb-1">
                      <User size={12} className="text-indigo-500"/> ভেরিফাইড বাই ম্যানেজার
                   </div>
                   <p className="text-xs text-indigo-600 italic font-bold">
                      "{req.assigned_staff || 'Unknown Manager'}"
                   </p>
                </div>
              </div>

              {/* --- Admin Actions --- */}
              {filter === 'pending_management' && (
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <button 
                    disabled={actionLoading === req.id}
                    onClick={() => handleAction(req.id, 'rejected')}
                    className="py-4 rounded-2xl bg-white text-red-600 font-bold text-sm border-2 border-red-50 hover:bg-red-50 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <XCircle size={18}/> বাতিল
                  </button>
                  <button 
                    disabled={actionLoading === req.id}
                    onClick={() => handleAction(req.id, 'approved')}
                    className="py-4 rounded-2xl bg-[#006A4E] text-white font-bold text-sm shadow-lg shadow-emerald-900/20 hover:opacity-90 transition-all flex items-center justify-center gap-2 transform active:scale-95"
                  >
                    {actionLoading === req.id ? <Loader2 className="animate-spin" size={20}/> : <><CheckCircle size={20}/> অনুমোদন</>}
                  </button>
                </div>
              )}

              {/* Status Footer info for other filters */}
              {filter !== 'pending_management' && (
                  <div className={`mt-6 p-3 rounded-2xl text-center text-xs font-bold border ${filter === 'approved' ? 'bg-emerald-50 text-[#006A4E] border-[#006A4E]/20' : 'bg-red-50 text-red-600 border-red-100'}`}>
                      {filter === 'approved' ? 'আবেদনটি সফলভাবে সম্পন্ন করা হয়েছে' : 'আবেদনটি বাতিল করা হয়েছে'}
                  </div>
              )}
            </div>
          ))}

          {/* Empty State */}
          {requests.length === 0 && (
            <div className="col-span-full text-center py-40 bg-white rounded-[4rem] border border-dashed border-slate-200 shadow-sm">
              <ShieldCheck size={80} className="mx-auto text-slate-100 mb-6"/>
              <h3 className="text-2xl font-bold text-slate-300 italic tracking-tight">কোনো আবেদন অপেক্ষমান নেই</h3>
              <p className="text-slate-400 mt-2 text-sm">ম্যানেজমেন্ট থেকে রিকোয়েস্ট সাবমিট করলে এখানে দেখাবে।</p>
            </div>
          )}
        </div>
      )}

      {/* --- Footer Signature --- */}
      <div className="mt-20 text-center border-t border-slate-200 pt-8 opacity-40">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Amanat Foundation Admin Authority Control</p>
      </div>

    </div>
  );
}