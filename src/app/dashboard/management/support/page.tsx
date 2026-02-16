'use client';

import React, { useEffect, useState } from 'react';
import { 
  LifeBuoy, MessageSquare, Phone, User, 
  CheckCircle, Clock, Search, Loader2, 
  ArrowRight, Mail, ShieldAlert, Smartphone
} from "lucide-react";
// সঠিক রিলেটিভ পাথ (৪ ধাপ পেছনে)
import { supabase } from '../../../../lib/supabaseClient';

export default function ManagementSupportPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [filter, setFilter] = useState('pending_staff'); // pending_staff (New), approved (Solved)

  const fetchSupportRequests = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('service_category', 'Support') // শুধু সাপোর্ট মেসেজগুলো
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
    fetchSupportRequests();
  }, []);

  // স্ট্যাটাস আপডেট (মেসেজ সলভ করা)
  const handleSolve = async (id: number) => {
    if (!window.confirm("আপনি কি এই অভিযোগটি সমাধান হয়েছে হিসেবে চিহ্নিত করতে চান?")) return;

    setActionLoading(id);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'approved' }) // approved মানে এখানে 'Solved'
        .eq('id', id);

      if (error) throw error;
      alert("সফলভাবে সম্পন্ন হয়েছে!");
      fetchSupportRequests();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  // ফিল্টার লজিক
  const filteredRequests = requests.filter(r => filter === 'all' ? true : r.status === filter);

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      
      {/* --- Page Header --- */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
            <LifeBuoy className="text-indigo-600" /> মেম্বার সহায়তা ও অভিযোগ
          </h2>
          <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest font-bold text-indigo-500/70">Member Feedback Center</p>
        </div>

        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
           <button onClick={() => setFilter('pending_staff')} className={`px-4 py-2 rounded-lg text-xs font-bold transition ${filter === 'pending_staff' ? 'bg-orange-500 text-white shadow' : 'text-slate-500'}`}>নতুন ({requests.filter(r => r.status === 'pending_staff').length})</button>
           <button onClick={() => setFilter('approved')} className={`px-4 py-2 rounded-lg text-xs font-bold transition ${filter === 'approved' ? 'bg-emerald-600 text-white shadow' : 'text-slate-500'}`}>সমাধানকৃত</button>
        </div>
      </div>

      {/* --- Content Area --- */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-600" size={40}/></div>
      ) : (
        <div className="space-y-6">
          {filteredRequests.map((item) => (
            <div key={item.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6 md:p-8">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  
                  {/* Member & Staff Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg">
                        {item.member_name?.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg leading-none">{item.member_name}</h4>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                           <Smartphone size={12}/> {item.mobile}
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                       <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">বিষয় / সমস্যা</p>
                       <h5 className="font-bold text-slate-700 mb-2">{item.item_name.replace('Help Request: ', '')}</h5>
                       <p className="text-sm text-slate-500 leading-relaxed italic">
                         "{item.assigned_staff.replace('Message: ', '')}"
                       </p>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-slate-100 w-fit px-3 py-1 rounded-full uppercase">
                       <User size={12}/> সংশ্লিষ্ট স্টাফ: {item.staff_id || 'Admin'}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col justify-between items-end gap-4 min-w-[150px]">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${item.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                       {item.status === 'approved' ? 'Resolved' : 'New Message'}
                    </span>
                    
                    <div className="flex flex-col gap-2 w-full">
                       <a 
                        href={`tel:${item.mobile}`}
                        className="w-full py-2.5 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-100 transition"
                       >
                         <Phone size={16}/> কল করুন
                       </a>
                       {item.status === 'pending_staff' && (
                         <button 
                          disabled={actionLoading === item.id}
                          onClick={() => handleSolve(item.id)}
                          className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-700 transition shadow-lg shadow-emerald-100"
                         >
                           {actionLoading === item.id ? <Loader2 className="animate-spin" size={16}/> : <><CheckCircle size={16}/> সম্পন্ন করুন</>}
                         </button>
                       )}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
               <MessageSquare size={64} className="mx-auto text-slate-100 mb-4"/>
               <p className="text-slate-400 font-bold italic">বর্তমানে কোনো {filter === 'approved' ? 'সমাধানকৃত' : 'নতুন'} মেসেজ নেই</p>
            </div>
          )}
        </div>
      )}

      {/* --- Footer Note --- */}
      <div className="mt-12 bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-4">
            <ShieldAlert size={40} className="text-yellow-400"/>
            <div>
               <h4 className="font-bold text-lg">জরুরি অভিযোগ?</h4>
               <p className="text-slate-400 text-xs">বড় কোনো অনিয়ম বা সরাসরি কথা বলতে আমাদের স্পেশাল নম্বরে কল দিন।</p>
            </div>
         </div>
         <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition">
            স্পেশাল হেল্পলাইন
         </button>
      </div>

    </div>
  );
}