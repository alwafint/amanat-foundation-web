'use client';

import React, { useEffect, useState } from 'react';
import { 
  User, Search, XCircle, Eye, 
  Phone, MapPin, Loader2, CreditCard, 
  ShieldCheck, Briefcase, Banknote
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function VolunteerRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null); 
  const [searchTerm, setSearchTerm] = useState('');

  // ১. ডাটা লোড করা
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('team_leader_applications')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data ||[]);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); },[]);

  // ২. অনুমোদন বা বাতিল হ্যান্ডলার এবং WhatsApp মেসেজ
  const handleAction = async (userObj: any, newStatus: 'active' | 'rejected') => {
    const confirmMsg = newStatus === 'active' 
      ? "আপনি কি এই টিম লিডারকে নিয়োগ দিতে চান? অনুমোদন দিলে হোয়াটসঅ্যাপ মেসেজ পাঠানোর উইন্ডো ওপেন হবে।" 
      : "আপনি কি এই আবেদনটি বাতিল করতে চান?";
      
    if (!window.confirm(confirmMsg)) return;

    setActionLoading(userObj.id);
    try {
      const { error } = await supabase
        .from('team_leader_applications')
        .update({ status: newStatus })
        .eq('id', userObj.id);

      if (error) throw error;
      
      if (newStatus === 'active') {
        alert("নিয়োগ সফল হয়েছে! হোয়াটসঅ্যাপে মেসেজ পাঠানোর জন্য রিডাইরেক্ট করা হচ্ছে...");
        
        // --- WhatsApp Message Logic ---
        const websiteLink = "https://amanat.ltd/login"; // ⚠️ আপনার ওয়েবসাইটের আসল লগইন লিংক দিন
        const message = `স্বাগতম ${userObj.full_name}! 🎉\n\nআমানত ফাউন্ডেশনে আপনার 'টিম লিডার' আবেদনটি সফলভাবে অনুমোদন করা হয়েছে। নিচে আপনার ড্যাশবোর্ডে প্রবেশ করার লগইন ডিটেইলস দেওয়া হলো:\n\n🌐 লগইন লিংক: ${websiteLink}\n📱 মোবাইল নম্বর: ${userObj.mobile}\n🔑 পাসওয়ার্ড: ${userObj.password}\n\nধন্যবাদ!`;
        
        // বাংলাদেশের কান্ট্রি কোড যুক্ত করা (যদি না থাকে)
        let waNumber = userObj.whatsapp;
        if (waNumber.startsWith('0')) {
          waNumber = '88' + waNumber; 
        }

        // WhatsApp Web/App লিংক তৈরি
        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
        
        // নতুন ট্যাবে হোয়াটসঅ্যাপ ওপেন হবে
        window.open(waUrl, '_blank');
      } else {
        alert("আবেদন বাতিল করা হয়েছে।");
      }

      setSelectedUser(null);
      fetchRequests(); // লিস্ট রিফ্রেশ করা
    } catch (err: any) {
      alert("সমস্যা হয়েছে: " + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredRequests = requests.filter(req => 
    req.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    req.mobile?.includes(searchTerm) ||
    req.upazila?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans text-slate-800">
      
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

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="নাম, মোবাইল বা উপজেলা দিয়ে খুঁজুন..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#006A4E] transition"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="animate-spin text-[#006A4E]" size={32} />
          <p className="text-slate-400 font-medium">আবেদনপত্রগুলো লোড হচ্ছে...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
           <ShieldCheck size={64} className="mx-auto text-slate-100 mb-4"/>
           <h3 className="text-xl font-bold text-slate-300 italic">কোনো অপেক্ষমান আবেদন নেই</h3>
        </div>
      ) : (
        <>
          {/* DESKTOP VIEW: Table */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-100">
            <table className="w-full text-left border-collapse min-w-max">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase text-xs tracking-wider">
                  <th className="px-6 py-4 font-bold">আবেদনকারীর নাম ও পেশা</th>
                  <th className="px-6 py-4 font-bold">যোগাযোগ</th>
                  <th className="px-6 py-4 font-bold">ঠিকানা (উপজেলা ও জেলা)</th>
                  <th className="px-6 py-4 font-bold text-center">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#006A4E] flex items-center justify-center font-bold">
                          {req.full_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{req.full_name}</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <Briefcase size={12}/> {req.profession}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-700">{req.mobile}</p>
                      <p className="text-xs text-slate-400 mt-0.5">WA: {req.whatsapp}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-700">{req.upazila}, {req.district}</p>
                      <p className="text-xs text-[#006A4E] mt-0.5 font-medium">{req.division}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => setSelectedUser(req)}
                          className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-bold text-xs hover:bg-slate-200 transition flex items-center gap-1"
                        >
                          <Eye size={14}/> তথ্য
                        </button>
                        <button 
                          onClick={() => handleAction(req, 'active')} // <- ID এর বদলে পুরো Object পাঠানো হলো
                          className="px-3 py-1.5 bg-[#006A4E] text-white rounded-lg font-bold text-xs hover:bg-emerald-800 transition"
                        >
                          অনুমোদন
                        </button>
                        <button 
                          onClick={() => handleAction(req, 'rejected')} // <- ID এর বদলে পুরো Object পাঠানো হলো
                          className="px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg font-bold text-xs hover:bg-rose-100 transition"
                        >
                          বাতিল
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE VIEW: Cards */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredRequests.map((req) => (
              <div key={req.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#006A4E] flex items-center justify-center font-bold text-lg">
                    {req.full_name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 leading-tight">{req.full_name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{req.profession}</p>
                  </div>
                </div>

                <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-sm flex items-center gap-2 text-slate-600"><Phone size={14} className="text-[#006A4E]"/> {req.mobile}</p>
                  <p className="text-sm flex items-center gap-2 text-slate-600"><MapPin size={14} className="text-[#006A4E]"/> {req.upazila}, {req.district}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-2">
                  <button onClick={() => setSelectedUser(req)} className="col-span-3 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200 transition flex items-center justify-center gap-2">
                    <Eye size={14}/> সম্পূর্ণ তথ্য দেখুন
                  </button>
                  <button onClick={() => handleAction(req, 'rejected')} className="col-span-1 py-2.5 bg-rose-50 text-rose-600 rounded-xl font-bold text-xs hover:bg-rose-100 transition">
                    বাতিল
                  </button>
                  <button onClick={() => handleAction(req, 'active')} className="col-span-2 py-2.5 bg-[#006A4E] text-white rounded-xl font-bold text-xs hover:opacity-90 transition shadow-sm">
                    নিয়োগ দিন
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* --- DETAIL MODAL --- */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* ... Modal এর ভেতরের বাকি কোড আগের মতোই থাকবে ... */}
            <div className="bg-[#006A4E] p-6 text-white flex justify-between items-center shrink-0">
               <h3 className="font-bold flex items-center gap-2"><User size={20}/> আবেদনকারীর বিস্তারিত তথ্য</h3>
               <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-white/20 rounded-full transition"><XCircle size={24}/></button>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar space-y-8">
               <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">পূর্ণ নাম</label>
                    <p className="font-bold text-lg text-slate-800">{selectedUser.full_name}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">মোবাইল নম্বর</label>
                    <p className="font-bold text-slate-700">{selectedUser.mobile}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">পেশা</label>
                    <p className="font-bold text-slate-700 flex items-center gap-1"><Briefcase size={14}/> {selectedUser.profession}</p>
                  </div>
               </div>

               {/* NID Images & Address as before */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 text-center">সামনের অংশ (Front)</label>
                    {selectedUser.nid_front_url ? (
                      <a href={selectedUser.nid_front_url} target="_blank" rel="noreferrer">
                        <img src={selectedUser.nid_front_url} className="w-full aspect-video object-contain bg-slate-100 rounded-xl" alt="Front" />
                      </a>
                    ) : <div className="aspect-video bg-slate-50 flex items-center justify-center text-xs">ছবি নেই</div>}
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 text-center">পিছনের অংশ (Back)</label>
                    {selectedUser.nid_back_url ? (
                      <a href={selectedUser.nid_back_url} target="_blank" rel="noreferrer">
                        <img src={selectedUser.nid_back_url} className="w-full aspect-video object-contain bg-slate-100 rounded-xl" alt="Back" />
                      </a>
                    ) : <div className="aspect-video bg-slate-50 flex items-center justify-center text-xs">ছবি নেই</div>}
                  </div>
               </div>
            </div>

            <div className="p-4 md:p-6 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row gap-3 shrink-0">
               <button 
                 disabled={actionLoading === selectedUser.id}
                 onClick={() => handleAction(selectedUser, 'rejected')}
                 className="flex-1 py-3.5 bg-white text-rose-600 border border-rose-200 rounded-xl font-bold hover:bg-rose-50 transition"
               >
                  আবেদন বাতিল করুন
               </button>
               <button 
                 disabled={actionLoading === selectedUser.id}
                 onClick={() => handleAction(selectedUser, 'active')}
                 className="flex-1 py-3.5 bg-[#006A4E] text-white rounded-xl font-bold shadow-md hover:opacity-95 transition"
               >
                  {actionLoading === selectedUser.id ? "প্রসেসিং..." : "আবেদন অনুমোদন করুন"}
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}