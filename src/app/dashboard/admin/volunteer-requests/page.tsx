'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, User, Search, CheckCircle, XCircle, Eye, // User এখানে যুক্ত করা হয়েছে
  Phone, MapPin, Loader2, Image as ImageIcon, 
  FileText, ShieldCheck, Mail, ArrowLeft, Filter
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function VolunteerRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null); // বিস্তারিত দেখার জন্য
  const [searchTerm, setSearchTerm] = useState('');

  // ১. ডাটা লোড করা (শুধুমাত্র Pending Team Leaders)
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('role', 'team_leader')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  // ২. অনুমোদন বা বাতিল হ্যান্ডলার
  const handleAction = async (id: number, newStatus: 'active' | 'rejected') => {
    const confirmMsg = newStatus === 'active' ? "আপনি কি এই টিম লিডারকে নিয়োগ দিতে চান?" : "আপনি কি এই আবেদনটি বাতিল করতে চান?";
    if (!window.confirm(confirmMsg)) return;

    setActionLoading(id);
    try {
      const { error } = await supabase
        .from('members')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      alert(newStatus === 'active' ? "নিয়োগ সফল হয়েছে!" : "আবেদন বাতিল করা হয়েছে।");
      setSelectedUser(null);
      fetchRequests();
    } catch (err: any) {
      alert("সমস্যা হয়েছে: " + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  // সার্চ ফিল্টার
  const filteredRequests = requests.filter(req => 
    req.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    req.mobile.includes(searchTerm)
  );

  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans text-slate-800">
      
      {/* --- Header --- */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="text-[#006A4E]" size={28}/> নতুন লিডার নিয়োগ প্যানেল
          </h2>
          <p className="text-sm text-slate-500 mt-1">মাঠ পর্যায় থেকে আসা টিম লিডারদের আবেদন যাচাই করুন</p>
        </div>
        <div className="bg-emerald-50 text-[#006A4E] px-4 py-2 rounded-xl font-bold text-sm border border-emerald-100">
            অপেক্ষমান আবেদন: {requests.length} টি
        </div>
      </div>

      {/* --- Search Bar --- */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="নাম বা মোবাইল দিয়ে খুঁজুন..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#006A4E] transition"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- Requests Grid --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="animate-spin text-[#006A4E]" size={32} />
          <p className="text-slate-400 font-medium">আবেদনপত্রগুলো যাচাই হচ্ছে...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((req) => (
            <div key={req.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
              
              {/* ফিক্সড: User আইকন ব্যবহার */}
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <User size={80}/>
              </div>

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-xl text-slate-500 border border-slate-50 shadow-inner overflow-hidden">
                   {req.photo_url ? (
                     <img src={req.photo_url} className="w-full h-full object-cover" alt="Profile" />
                   ) : req.full_name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg leading-none">{req.full_name}</h4>
                  <p className="text-xs text-[#006A4E] font-bold mt-2 flex items-center gap-1 uppercase tracking-tighter">
                     <MapPin size={12}/> {req.village || req.upazila}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-6 flex-grow">
                 <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone size={14} className="text-slate-400"/> {req.mobile}
                 </div>
                 <p className="text-xs text-slate-400 line-clamp-2 italic">"{req.address}"</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-auto relative z-10">
                 <button 
                   onClick={() => setSelectedUser(req)}
                   className="col-span-2 py-3 mb-2 bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-bold text-xs hover:bg-slate-100 transition flex items-center justify-center gap-2"
                 >
                   <Eye size={14}/> তথ্য ও ফাইল দেখুন
                 </button>
                 <button 
                   onClick={() => handleAction(req.id, 'rejected')}
                   className="py-3 bg-rose-50 text-rose-600 rounded-xl font-bold text-xs hover:bg-rose-100 transition"
                 >
                   বাতিল
                 </button>
                 <button 
                   onClick={() => handleAction(req.id, 'active')}
                   className="py-3 bg-[#006A4E] text-white rounded-xl font-bold text-xs hover:opacity-90 transition shadow-md shadow-emerald-900/20"
                 >
                   নিয়োগ দিন
                 </button>
              </div>
            </div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
               <ShieldCheck size={64} className="mx-auto text-slate-100 mb-4"/>
               <h3 className="text-xl font-bold text-slate-300 italic">কোনো নতুন আবেদন নেই</h3>
            </div>
          )}
        </div>
      )}

      {/* --- DETAIL MODAL (মডেলের মাধ্যমে সব দেখা যাবে) --- */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="bg-[#0f172a] p-6 text-white flex justify-between items-center shrink-0">
               <h3 className="font-bold flex items-center gap-2"><User size={20}/> আবেদনকারীর প্রোফাইল</h3>
               <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-white/10 rounded-full transition"><XCircle size={24}/></button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
               
               {/* Basic Details */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">পূর্ণ নাম</label>
                    <p className="font-bold text-lg text-slate-800">{selectedUser.full_name}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">মোবাইল / হোয়াটসঅ্যাপ</label>
                    <p className="font-bold text-lg text-slate-800">{selectedUser.mobile}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">অভিভাবক</label>
                    <p className="font-bold text-slate-700">{selectedUser.guardian_name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">NID নম্বর</label>
                    <p className="font-bold text-slate-700 font-mono tracking-tighter">{selectedUser.nid || 'N/A'}</p>
                  </div>
               </div>

               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">পূর্ণ ঠিকানা</label>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">{selectedUser.address}</p>
               </div>

               {/* File Previews */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 flex items-center gap-1"><ImageIcon size={12}/> আবেদনকারীর ছবি</label>
                    {selectedUser.photo_url ? (
                      <a href={selectedUser.photo_url} target="_blank" rel="noreferrer" className="block relative aspect-square rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm hover:opacity-90">
                        <img src={selectedUser.photo_url} className="w-full h-full object-cover" alt="User Photo" />
                      </a>
                    ) : <div className="h-40 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 border-2 border-dashed italic text-xs">ছবি পাওয়া যায়নি</div>}
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 flex items-center gap-1"><FileText size={12}/> এনআইডি (NID) কপি</label>
                    {selectedUser.nid_url ? (
                      <a href={selectedUser.nid_url} target="_blank" rel="noreferrer" className="block relative aspect-square rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm hover:opacity-90">
                        <img src={selectedUser.nid_url} className="w-full h-full object-cover" alt="NID Photo" />
                      </a>
                    ) : <div className="h-40 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 border-2 border-dashed italic text-xs">NID পাওয়া যায়নি</div>}
                  </div>
               </div>
            </div>

            <div className="p-6 bg-slate-50 border-t flex gap-4 shrink-0">
               <button 
                 disabled={actionLoading === selectedUser.id}
                 onClick={() => handleAction(selectedUser.id, 'rejected')}
                 className="flex-1 py-4 bg-white text-rose-600 border border-rose-200 rounded-2xl font-bold hover:bg-rose-50 transition"
               >
                  আবেদন বাতিল
               </button>
               <button 
                 disabled={actionLoading === selectedUser.id}
                 onClick={() => handleAction(selectedUser.id, 'active')}
                 className="flex-1 py-4 bg-[#006A4E] text-white rounded-2xl font-bold shadow-lg hover:opacity-95 transition"
               >
                  {actionLoading === selectedUser.id ? "প্রসেসিং..." : "নিয়োগ অনুমোদন করুন"}
               </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}