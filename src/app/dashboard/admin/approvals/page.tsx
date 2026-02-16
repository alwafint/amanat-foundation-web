'use client';

import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, CheckCircle, XCircle, Clock, 
  User, Loader2, Search, ArrowRight, AlertTriangle,
  Tractor, Wallet, HeartPulse, GraduationCap, Smartphone,
  Filter, Calendar
} from "lucide-react";
// সঠিক রিলেটিভ পাথ (৪ ধাপ পেছনে)
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
      // অ্যাডমিন প্যানেলে মূলত ম্যানেজমেন্টের পাঠানো (pending_management) ডাটা আসবে
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

  // চূড়ান্ত অনুমোদন বা বাতিল
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

  // আইকন ডিটেক্টর
  const getIcon = (cat: string) => {
    if (cat === 'Machinery') return <Tractor size={20} className="text-emerald-500" />;
    if (cat === 'Investment') return <Wallet size={20} className="text-blue-500" />;
    if (cat === 'Health') return <HeartPulse size={20} className="text-rose-500" />;
    return <Smartphone size={20} className="text-indigo-500" />;
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20 text-slate-300">
      
      {/* --- Page Header --- */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-8">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <ShieldCheck className="text-emerald-500" size={32}/> চূড়ান্ত অনুমোদন কেন্দ্র
          </h2>
          <p className="text-slate-500 mt-1">ম্যানেজমেন্ট কর্তৃক প্রেরিত বড় অংকের লোন ও বিশেষ সেবার তালিকা</p>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800">
          {[
            { id: 'pending_management', label: 'অপেক্ষমান' },
            { id: 'approved', label: 'অনুমোদিত' },
            { id: 'rejected', label: 'বাতিল' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                filter === tab.id 
                  ? 'bg-emerald-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- Summary Alert --- */}
      {filter === 'pending_management' && requests.length > 0 && (
          <div className="mb-8 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-3 text-emerald-400">
              <AlertTriangle size={20}/>
              <span className="text-sm font-bold">সতর্কতা: আপনার চূড়ান্ত অনুমোদনের জন্য {requests.length} টি রিকোয়েস্ট অপেক্ষমান আছে।</span>
          </div>
      )}

      {/* --- Requests Grid --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="animate-spin text-emerald-500 mb-4" size={40} />
          <p className="text-slate-500 animate-pulse font-bold uppercase tracking-widest text-xs">ডাটা ভেরিফাই হচ্ছে...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {requests.map((req) => (
            <div key={req.id} className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 md:p-8 hover:border-emerald-500/30 transition-all duration-300 relative group overflow-hidden shadow-2xl">
              
              {/* Background Accent */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>

              {/* Member Info Section */}
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center font-black text-2xl text-emerald-500 shadow-inner border border-slate-700">
                    {req.member_name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xl leading-none">{req.member_name}</h4>
                    <p className="text-xs text-slate-500 mt-2 font-mono flex items-center gap-1">
                       <Smartphone size={12}/> {req.mobile}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                   <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
                      req.status === 'pending_management' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                      req.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      'bg-red-500/10 text-red-400 border-red-500/20'
                   }`}>
                      {req.status.replace('_', ' ')}
                   </div>
                   <p className="text-[10px] text-slate-500 mt-2 font-bold flex items-center justify-end gap-1">
                      <Calendar size={10}/> {new Date(req.created_at).toLocaleDateString('bn-BD')}
                   </p>
                </div>
              </div>

              {/* Details Box */}
              <div className="bg-slate-950/50 p-6 rounded-3xl space-y-5 border border-slate-800 flex-grow relative z-10">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                   <div className="flex items-center gap-2">
                      {getIcon(req.service_category)}
                      <span className="text-sm font-bold text-slate-300">{req.service_category}</span>
                   </div>
                   <div className="text-xs font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded tracking-widest">
                      CORE SERVICE
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">আইটেম / রিকোয়েস্ট</p>
                      <p className="text-sm font-bold text-white leading-tight">{req.item_name}</p>
                   </div>
                   <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">পরিমাণ / ভ্যালু</p>
                      <p className="text-sm font-bold text-yellow-400 leading-tight">৳ {req.quantity}</p>
                   </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                   <div className="flex items-center gap-2 text-[10px] text-slate-500 font-black uppercase mb-2">
                      <User size={12}/> ম্যানেজমেন্ট ভেরিফিকেশন কমেন্ট
                   </div>
                   <p className="text-xs text-slate-400 italic font-medium leading-relaxed">
                      "আবেদনটি ম্যানেজার <b>{req.assigned_staff}</b> দ্বারা মাঠ পর্যায়ে যাচাই করা হয়েছে এবং চূড়ান্ত অনুমোদনের জন্য সুপারিশ করা হয়েছে।"
                   </p>
                </div>
              </div>

              {/* --- Admin Actions --- */}
              {filter === 'pending_management' && (
                <div className="grid grid-cols-2 gap-4 mt-8 relative z-10">
                  <button 
                    disabled={actionLoading === req.id}
                    onClick={() => handleAction(req.id, 'rejected')}
                    className="py-4 rounded-2xl bg-slate-800 text-red-400 font-bold text-sm hover:bg-red-500/10 border border-slate-700 transition-all active:scale-95"
                  >
                    <XCircle size={20} className="inline mr-2"/> বাতিল করুন
                  </button>
                  <button 
                    disabled={actionLoading === req.id}
                    onClick={() => handleAction(req.id, 'approved')}
                    className="py-4 rounded-2xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 shadow-xl shadow-emerald-900/40 transition-all flex items-center justify-center gap-2 transform active:scale-95"
                  >
                    {actionLoading === req.id ? <Loader2 className="animate-spin" size={20}/> : <><CheckCircle size={20}/> চূড়ান্ত অনুমোদন</>}
                  </button>
                </div>
              )}

              {/* Status Footer info for other filters */}
              {filter !== 'pending_management' && (
                  <div className={`mt-6 p-4 rounded-2xl text-center text-xs font-bold border ${filter === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                      {filter === 'approved' ? 'আবেদনটি সফলভাবে সম্পন্ন হয়েছে' : 'আবেদনটি বাতিল করা হয়েছে'}
                  </div>
              )}
            </div>
          ))}

          {/* Empty State */}
          {requests.length === 0 && (
            <div className="col-span-full text-center py-40 bg-slate-900/50 rounded-[4rem] border border-dashed border-slate-800">
              <ShieldCheck size={80} className="mx-auto text-slate-800 mb-6 opacity-20"/>
              <h3 className="text-2xl font-bold text-slate-500 italic">কোনো নতুন অনুমোদন অপেক্ষমান নেই</h3>
              <p className="text-slate-600 mt-2">নতুন আবেদন ম্যানেজমেন্ট থেকে সাবমিট করলে এখানে পাবেন।</p>
            </div>
          )}
        </div>
      )}

      {/* --- Footer Signature --- */}
      <div className="mt-20 text-center border-t border-slate-800 pt-8 opacity-50">
          <p className="text-xs font-mono uppercase tracking-[0.5em] text-slate-500">Amanat Foundation Super Admin Authority</p>
      </div>

    </div>
  );
}