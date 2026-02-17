'use client';

import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, CheckCircle, XCircle, Clock, 
  Phone, User, Loader2, ArrowRight, Search 
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function StaffRequestPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // ফিল্টার স্ট্যাটাস: 
  // 'pending' = নতুন রিকোয়েস্ট (যা মেম্বার পাঠিয়েছে, স্টাফ দেখবে)
  // 'pending_management' = স্টাফ চেক করেছে, এখন এডমিনের কাছে আছে
  // 'approved' = সফলভাবে সম্পন্ন
  const [filter, setFilter] = useState('pending'); 

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(localUser);
    
    // স্টাফ লগইন করা থাকলেই কেবল ডাটা আনবে
    if (localUser.mobile && localUser.role === 'staff') {
      fetchRequests(localUser.mobile, filter);
    } else {
      setLoading(false);
    }
  }, [filter]);

  const fetchRequests = async (staffMobile: string, currentFilter: string) => {
    setLoading(true);
    
    try {
      // ১. বুকিং টেবিল থেকে ডাটা আনা
      // ২. লজিক: staff_id == বর্তমান স্টাফের মোবাইল (যাতে অন্য স্টাফের ডাটা না আসে)
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('staff_id', staffMobile) // এই লাইনটি নিশ্চিত করছে যে শুধু এই স্টাফের মেম্বারদের ডাটাই আসবে
        .eq('status', currentFilter)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (err: any) {
      console.error("Error fetching requests:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- অ্যাকশন: স্টাফ এপ্রুভ করে ম্যানেজমেন্টের কাছে পাঠাবে ---
  const handleStaffApproval = async (id: number) => {
    if(!window.confirm("আপনি কি নিশ্চিত যে এই আবেদনটি যাচাই করেছেন এবং ম্যানেজমেন্টের কাছে পাঠাতে চান?")) return;

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: 'pending_management', // স্ট্যাটাস আপডেট
          assigned_staff: user.full_name // স্টাফের নাম রেকর্ড হবে (অপশনাল)
        })
        .eq('id', id);

      if (error) throw error;
      
      alert("আবেদনটি যাচাই করে ম্যানেজমেন্টের অনুমোদনের জন্য পাঠানো হয়েছে।");
      fetchRequests(user.mobile, filter); // রিফ্রেশ
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  // --- অ্যাকশন: বাতিল করা ---
  const handleReject = async (id: number) => {
    if(!window.confirm("আপনি কি এই আবেদনটি বাতিল করতে চান?")) return;
    
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'rejected' })
        .eq('id', id);

      if (error) throw error;
      alert("আবেদনটি বাতিল করা হয়েছে।");
      fetchRequests(user.mobile, filter);
    } catch (err: any) { alert(err.message); }
  };

  // সার্চ ফিল্টার (ক্লায়েন্ট সাইড)
  const filteredData = requests.filter(item => 
    (item.member_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.mobile?.includes(searchQuery))
  );

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 min-h-screen pb-10">
      
      {/* Header & Filter */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <ClipboardList className="text-emerald-600"/> সেবা রিকোয়েস্ট
          </h2>
          <p className="text-xs text-slate-500 mt-1">আপনার মেম্বারদের পাঠানো সকল আবেদন</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'pending', label: 'নতুন আবেদন', count: null },
            { id: 'pending_management', label: 'অফিসে পাঠানো', count: null },
            { id: 'approved', label: 'সম্পন্ন', count: null },
            { id: 'rejected', label: 'বাতিল', count: null }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition shadow-sm ${
                filter === tab.id 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
         <Search className="absolute left-3 top-3 text-slate-400" size={20}/>
         <input 
            type="text" 
            placeholder="মেম্বারের নাম বা মোবাইল নম্বর দিয়ে খুঁজুন..." 
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
         />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center py-20 gap-3">
          <Loader2 className="animate-spin text-emerald-600" size={32}/>
          <p className="text-slate-400 text-sm font-medium">তথ্য লোড হচ্ছে...</p>
        </div>
      ) : (
        /* Requests Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredData.map((req) => (
            <div key={req.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition relative flex flex-col h-full group hover:border-emerald-200">
              
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner">
                    {req.member_name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 leading-none text-lg">{req.member_name}</h4>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-mono">
                       <Phone size={12}/> {req.mobile}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  req.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                  req.status === 'pending_management' ? 'bg-blue-100 text-blue-700' :
                  req.status === 'rejected' ? 'bg-red-100 text-red-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {req.status === 'pending' ? 'New' : req.status.replace('_', ' ')}
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl space-y-3 flex-grow border border-slate-100">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">সেবার ধরন</span>
                   <span className="text-sm font-bold text-emerald-700">{req.service_category}</span>
                </div>
                <div>
                   <p className="text-xs text-slate-400 font-bold uppercase mb-1">বিস্তারিত বিবরণ</p>
                   <p className="text-sm text-slate-700 font-medium leading-relaxed">
                     {req.item_name} <br/> 
                     <span className="text-xs text-slate-500">{req.quantity}</span>
                   </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold pt-2">
                   <Clock size={12}/> আবেদন তারিখ: {new Date(req.created_at).toLocaleDateString('bn-BD')}
                </div>
              </div>

              {/* অ্যাকশন বাটনসমূহ (শুধুমাত্র স্টাফ পেন্ডিং থাকলে দেখাবে) */}
              {req.status === 'pending' && (
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button 
                    onClick={() => handleReject(req.id)}
                    className="py-3 rounded-xl border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 transition"
                  >
                    বাতিল করুন
                  </button>
                  <button 
                    onClick={() => handleStaffApproval(req.id)}
                    className="py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold transition shadow-lg shadow-emerald-200 flex items-center justify-center gap-1"
                  >
                    যাচাই সম্পন্ন <ArrowRight size={14}/>
                  </button>
                </div>
              )}

              {/* স্ট্যাটাস মেসেজ */}
              {req.status === 'pending_management' && (
                <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-center rounded-xl text-xs font-bold border border-blue-100 flex items-center justify-center gap-2">
                  <CheckCircle size={14}/> হেড অফিসে পাঠানো হয়েছে
                </div>
              )}
              
              {req.status === 'approved' && (
                <div className="mt-4 p-3 bg-green-50 text-green-700 text-center rounded-xl text-xs font-bold border border-green-100 flex items-center justify-center gap-2">
                  <CheckCircle size={14}/> সেবা প্রদান সম্পন্ন হয়েছে
                </div>
              )}
            </div>
          ))}

          {filteredData.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <ClipboardList className="mx-auto mb-3 text-slate-200" size={64}/>
              <p className="text-slate-400 font-bold italic">এই ক্যাটাগরিতে আপনার কোনো মেম্বারের আবেদন নেই</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}