'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ClipboardList, Clock, CheckCircle2, XCircle, 
  Search, Filter, ArrowRight, Loader2, Calendar,
  Tractor, Wallet, HeartPulse, GraduationCap, Scale, CheckCircle
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function MyRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    setLoading(true);
    // লোকাল স্টোরেজ থেকে মেম্বারের মোবাইল নম্বর নেওয়া
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (userData.mobile) {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('mobile', userData.mobile) // শুধুমাত্র এই মেম্বারের ডাটা
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching requests:", error.message);
      } else {
        setRequests(data || []);
      }
    }
    setLoading(false);
  };

  // স্ট্যাটাস অনুযায়ী আইকন ও কালার নির্ধারণ
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'approved':
        return { color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: <CheckCircle2 size={14}/>, label: 'অনুমোদিত' };
      case 'rejected':
        return { color: 'text-red-600 bg-red-50 border-red-100', icon: <XCircle size={14}/>, label: 'বাতিল' };
      case 'pending_management':
        return { color: 'text-blue-600 bg-blue-50 border-blue-100', icon: <Clock size={14}/>, label: 'অফিসে প্রক্রিয়াধীন' };
      default:
        return { color: 'text-orange-600 bg-orange-50 border-orange-100', icon: <Clock size={14}/>, label: 'স্টাফ ভেরিফিকেশন' };
    }
  };

  // সার্ভিস অনুযায়ী আইকন
  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'Machinery': return <Tractor size={20} className="text-emerald-600" />;
      case 'Investment': return <Wallet size={20} className="text-blue-600" />;
      case 'Health': return <HeartPulse size={20} className="text-rose-600" />;
      case 'Training': return <GraduationCap size={20} className="text-purple-600" />;
      case 'Legal': return <Scale size={20} className="text-indigo-600" />;
      default: return <ClipboardList size={20} className="text-slate-600" />;
    }
  };

  // ফিল্টার লজিক
  const filteredRequests = requests.filter(req => {
    if (filter === 'all') return true;
    if (filter === 'pending') return req.status.includes('pending');
    return req.status === filter;
  });

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      
      {/* --- Page Header --- */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <ClipboardList className="text-emerald-600" /> আমার আবেদনের তালিকা
          </h1>
          <p className="text-sm text-slate-500 mt-1">আপনার সকল সেবার রিকোয়েস্ট ও বর্তমান অবস্থা</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 overflow-x-auto max-w-full">
          {[
            { id: 'all', label: 'সব' },
            { id: 'pending', label: 'চলমান' },
            { id: 'approved', label: 'সফল' },
            { id: 'rejected', label: 'বাতিল' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                filter === tab.id 
                  ? 'bg-emerald-600 text-white shadow' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- Content --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="animate-spin text-emerald-600" size={32} />
          <p className="text-slate-400 font-medium">তথ্য লোড হচ্ছে...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((req) => {
              const style = getStatusStyle(req.status);
              return (
                <div key={req.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-slate-50 rounded-xl">
                        {getServiceIcon(req.service_category)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 leading-none">{req.item_name}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">{req.service_category}</p>
                      </div>
                    </div>
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold border ${style.color}`}>
                      {style.icon} {style.label}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4 bg-slate-50/50 p-3 rounded-xl border border-slate-50">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">পরিমাণ:</span>
                      <span className="font-bold text-slate-700">{req.quantity}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">তারিখ:</span>
                      <span className="font-bold text-slate-700 flex items-center gap-1">
                        <Calendar size={12}/> {new Date(req.created_at).toLocaleDateString('bn-BD')}
                      </span>
                    </div>
                  </div>

                  {/* Staff Info if assigned */}
                  {req.assigned_staff && (
                    <div className="text-[10px] text-emerald-700 bg-emerald-50 p-2 rounded-lg mb-2 font-medium flex items-center gap-2">
                       <CheckCircle size={12}/> দায়িত্বপ্রাপ্ত স্টাফ: {req.assigned_staff}
                    </div>
                  )}

                  <div className="flex justify-end pt-2 border-t border-slate-50">
                     <button className="text-xs font-bold text-emerald-600 flex items-center gap-1 hover:underline">
                        বিস্তারিত <ArrowRight size={14}/>
                     </button>
                  </div>
                </div>
              );
            })
          ) : (
            /* Empty State */
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
              <ClipboardList className="mx-auto mb-4 text-slate-200" size={64} />
              <h3 className="text-lg font-bold text-slate-700">কোনো আবেদন পাওয়া যায়নি</h3>
              <p className="text-slate-400 text-sm mb-6">আপনি এখনো কোনো সেবার জন্য আবেদন করেননি।</p>
              <Link href="/dashboard/member" className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">
                সেবা সমূহ দেখুন
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}