'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, Plus, MapPin, Loader2, CheckCircle, 
  Search, X, List, Trash2, ShieldCheck, Globe
} from "lucide-react";
// আপনার পাথ অনুযায়ী রিলেটিভ ইমপোর্ট (৪ ধাপ পেছনে)
import { supabase } from '../../../../lib/supabaseClient';

export default function OpenBranchPage() {
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [branches, setBranches] = useState<any[]>([]);
  
  // ফর্ম স্টেট
  const [formData, setFormData] = useState({ name: '', code: '', address: '' });

  // ১. ব্রাঞ্চ লিস্ট লোড করা
  const fetchBranches = async () => {
    setFetchLoading(true);
    try {
      const { data, error } = await supabase
        .from('branches')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setBranches(data || []);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  // ২. নতুন ব্রাঞ্চ সেভ করা
  const handleSaveBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('branches').insert([
        { ...formData, status: 'inactive' } // শুরুতে ইন-অ্যাক্টিভ থাকবে
      ]);
      if (error) throw error;
      
      alert("ব্রাঞ্চের তথ্য সফলভাবে যোগ করা হয়েছে!");
      setFormData({ name: '', code: '', address: '' });
      fetchBranches(); // লিস্ট আপডেট
    } catch (err: any) {
      alert("ত্রুটি: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ৩. ব্রাঞ্চ ওপেন/অ্যাক্টিভ করা
  const toggleBranchStatus = async (id: number, currentStatus: string) => {
    const nextStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const confirmMsg = nextStatus === 'active' ? "আপনি কি এই শাখাটি আনুষ্ঠানিকভাবে ওপেন করতে চান?" : "আপনি কি এই শাখাটি বন্ধ করতে চান?";
    
    if (!window.confirm(confirmMsg)) return;

    try {
      const { error } = await supabase
        .from('branches')
        .update({ status: nextStatus })
        .eq('id', id);
      
      if (error) throw error;
      fetchBranches();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20 max-w-6xl mx-auto">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- বাম পাশ: নতুন ব্রাঞ্চ এন্ট্রি ফর্ম --- */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden sticky top-4">
            <div className="bg-[#006A4E] p-6 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10"><Plus size={80}/></div>
                <h2 className="text-xl font-bold relative z-10">নতুন শাখা যুক্ত করুন</h2>
            </div>

            <form onSubmit={handleSaveBranch} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">শাখার নাম</label>
                <input 
                  required type="text" value={formData.name}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#006A4E] transition text-sm"
                  placeholder="যেমন: গোবিন্দগঞ্জ প্রধান শাখা"
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">শাখা কোড</label>
                <input 
                  required type="text" value={formData.code}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#006A4E] transition font-mono text-sm"
                  placeholder="যেমন: GOB-02"
                  onChange={e => setFormData({...formData, code: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">শাখার ঠিকানা</label>
                <textarea 
                  required value={formData.address}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#006A4E] transition h-24 text-sm"
                  placeholder="পূর্ণ ঠিকানা লিখুন..."
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <button 
                disabled={loading}
                className="w-full bg-[#006A4E] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-emerald-800 transition shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={18}/> : <><CheckCircle size={18}/> ডাটা সেভ করুন</>}
              </button>
            </form>
          </div>
        </div>

        {/* --- ডান পাশ: এড করা ব্রাঞ্চ লিস্ট --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                   <List size={20} className="text-[#006A4E]"/> সংরক্ষিত ব্রাঞ্চ লিস্ট
                </h3>
                <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-bold">মোট: {branches.length}</span>
             </div>

             {fetchLoading ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-emerald-600"/></div>
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {branches.map((branch) => (
                     <div key={branch.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 transition group relative overflow-hidden">
                        
                        {/* Status Badge */}
                        <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-black uppercase rounded-bl-xl ${branch.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                           {branch.status}
                        </div>

                        <div className="flex items-center gap-3 mb-3">
                           <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#006A4E] font-bold border border-slate-200">
                              {branch.code.split('-')[1] || '01'}
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-800 text-sm">{branch.name}</h4>
                              <p className="text-[10px] font-mono text-slate-400">ID: {branch.code}</p>
                           </div>
                        </div>

                        <p className="text-xs text-slate-500 flex items-start gap-1 mb-5 h-8 line-clamp-2">
                           <MapPin size={12} className="mt-0.5 shrink-0"/> {branch.address}
                        </p>

                        <div className="flex gap-2">
                           <button 
                            onClick={() => toggleBranchStatus(branch.id, branch.status)}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ${branch.status === 'active' ? 'bg-orange-50 text-orange-600 border border-orange-200' : 'bg-emerald-600 text-white shadow-md'}`}
                           >
                              {branch.status === 'active' ? 'শাখা বন্ধ করুন' : <><Globe size={14}/> শাখা ওপেন করুন</>}
                           </button>
                           <button className="p-2 bg-white text-red-500 border border-slate-200 rounded-lg hover:bg-red-50 transition">
                              <Trash2 size={16}/>
                           </button>
                        </div>
                     </div>
                   ))}
                </div>
             )}

             {!fetchLoading && branches.length === 0 && (
                <div className="text-center py-20 text-slate-400">
                   <Building2 size={48} className="mx-auto mb-2 opacity-10"/>
                   <p>এখনো কোনো শাখা যোগ করা হয়নি</p>
                </div>
             )}
          </div>
        </div>

      </div>
    </div>
  );
}