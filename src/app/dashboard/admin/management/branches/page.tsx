'use client';

import React, { useEffect, useState } from 'react';
import { 
  Building, Plus, MapPin, Phone, 
  Trash2, X, ChevronRight, Loader2, User, KeyRound, Smartphone, Mail
} from "lucide-react";
import { supabase } from '../../../../../lib/supabaseClient';

// লোকাল ডাটাবেজ থেকে লোকেশন ডাটা ইমপোর্ট করা হলো
import { divisions, districts, upazilas, unions } from '../../../../../lib/bd-locations';

export default function BranchManagement() {
  const[branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const[submitLoading, setSubmitLoading] = useState(false);
  
  // --- Form State ---
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    manager_name: '',
    manager_mobile: '',
    manager_username: '',
    address_details: '', 
    division: '',
    district: '',
    upazila: '',
    union_name: ''
  });

  // --- 1. Initial Data Fetch ---
  useEffect(() => {
    fetchBranches();
  },[]);

  const fetchBranches = async () => {
    setLoading(true);
    // ব্রাঞ্চের ডাটা ফেচ করা হচ্ছে
    const { data, error } = await supabase
      .from('branches')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (data) setBranches(data);
    setLoading(false);
  };

  // --- 2. Location Filtering Logic ---
  const selectedDiv = divisions.find(d => d.bn_name === formData.division);
  const districtList = districts.filter(d => d.division_id === selectedDiv?.id);
  const selectedDist = districts.find(d => d.bn_name === formData.district);
  const upazilaList = upazilas.filter(u => u.district_id === selectedDist?.id);
  const selectedUpa = upazilas.find(u => u.bn_name === formData.upazila);
  const unionList = unions.filter(u => u.upazilla_id === selectedUpa?.id);

  // --- 3. Submit Handler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);

    // ৬-ডিজিটের অটোমেটিক পাসওয়ার্ড জেনারেট
    const generatedPassword = Math.floor(100000 + Math.random() * 900000).toString();
    
    // ডাটাবেজের জন্য পে-লোড তৈরি
    const payload = {
      name: formData.name,
      code: formData.code,
      manager_name: formData.manager_name,
      manager_mobile: formData.manager_mobile,
      manager_username: formData.manager_username,
      manager_password: generatedPassword, // পাসওয়ার্ডটি সেভ হবে
      address: formData.address_details, 
      division: formData.division,
      district: formData.district,
      upazila: formData.upazila,
      union_name: formData.union_name
    };

    const { error } = await supabase.from('branches').insert([payload]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert(`ব্রাঞ্চ সফলভাবে তৈরি হয়েছে! 🎉\n\n--- ম্যানেজার লগইন ডিটেইলস ---\nইউজারনেম: ${formData.manager_username}\nপাসওয়ার্ড: ${generatedPassword}\n\n(দয়া করে পাসওয়ার্ডটি ম্যানেজারকে জানিয়ে দিন)`);
      setFormData({ 
        name: '', code: '', manager_name: '', manager_mobile: '', manager_username: '', address_details: '', 
        division: '', district: '', upazila: '', union_name: '' 
      });
      setShowModal(false);
      fetchBranches();
    }
    setSubmitLoading(false);
  };

  // --- 4. Delete Handler ---
  const handleDelete = async (id: number) => {
    if(!window.confirm("সতর্কতা: আপনি কি নিশ্চিত এই ব্রাঞ্চটি ডিলিট করতে চান?")) return;
    const { error } = await supabase.from('branches').delete().eq('id', id);
    if (!error) fetchBranches();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Building className="text-[#006A4E]" /> ব্রাঞ্চ তালিকা
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            মোট ব্রাঞ্চ: <span className="font-bold text-[#006A4E]">{branches.length}</span> টি
          </p>
        </div>
        
        <button onClick={() => setShowModal(true)} className="bg-[#006A4E] text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-800 transition shadow-lg shadow-emerald-900/20">
          <Plus size={20} /> নতুন ব্রাঞ্চ
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#006A4E]" size={40}/></div>
      ) : branches.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
           <Building size={64} className="mx-auto text-slate-200 mb-4"/>
           <h3 className="text-lg font-bold text-slate-400 italic">কোনো ব্রাঞ্চ পাওয়া যায়নি</h3>
        </div>
      ) : (
        <>
          {/* --- DESKTOP VIEW: Table Format (Large Screens Only) --- */}
          <div className="hidden lg:block overflow-x-auto bg-white rounded-[2rem] shadow-sm border border-slate-100">
            <table className="w-full text-left border-collapse min-w-max">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase text-[11px] tracking-wider">
                  <th className="px-6 py-5 font-bold">ব্রাঞ্চের নাম ও কোড</th>
                  <th className="px-6 py-5 font-bold">ম্যানেজার ইনফো</th>
                  <th className="px-6 py-5 font-bold">লগইন ডিটেইলস</th>
                  <th className="px-6 py-5 font-bold">ঠিকানা</th>
                  <th className="px-6 py-5 font-bold text-center">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {branches.map((branch) => (
                  <tr key={branch.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006A4E] flex items-center justify-center font-bold border border-emerald-100">
                          <Building size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{branch.name}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200">
                            {branch.code}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-700 text-sm flex items-center gap-1.5"><User size={14} className="text-slate-400"/> {branch.manager_name || 'N/A'}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1"><Smartphone size={14} className="text-slate-400"/> {branch.manager_mobile || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-700 text-xs flex items-center gap-1.5"><Mail size={12} className="text-emerald-600"/> {branch.manager_username || 'N/A'}</p>
                      <p className="font-medium text-slate-700 text-xs flex items-center gap-1.5 mt-1"><KeyRound size={12} className="text-[#FFB800]"/> ******</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-700 text-sm">
                        {branch.union_name ? `${branch.union_name}, ${branch.upazila}` : <span className="text-slate-300 italic">ঠিকানা নেই</span>}
                      </p>
                      {branch.district && <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{branch.district}</p>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => handleDelete(branch.id)}
                        className="px-3 py-2 bg-red-50 text-red-500 rounded-lg font-bold text-xs hover:bg-red-500 hover:text-white transition flex items-center justify-center gap-1.5 mx-auto"
                      >
                        <Trash2 size={14}/> ডিলিট
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- MOBILE / TABLET VIEW: Card Format (Small Screens Only) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
            {branches.map((branch) => (
              <div key={branch.id} className="group bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden flex flex-col h-full">
                
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[4rem] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 text-[#006A4E] rounded-2xl flex items-center justify-center">
                      <Building size={20} />
                    </div>
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                      {branch.code}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-2">{branch.name}</h3>
                  
                  <div className="space-y-2 mb-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex-grow">
                    <p className="text-xs text-slate-600 font-bold flex items-center gap-2"><User size={14} className="text-[#006A4E]"/> {branch.manager_name || 'N/A'}</p>
                    <p className="text-xs text-slate-600 flex items-center gap-2 font-medium"><Smartphone size={14} className="text-slate-400"/> {branch.manager_mobile || 'N/A'}</p>
                    <p className="text-xs text-slate-600 flex items-center gap-2 font-medium"><Mail size={14} className="text-slate-400"/> {branch.manager_username || 'N/A'}</p>
                    <p className="text-xs text-slate-600 flex items-center gap-2 font-medium"><MapPin size={14} className="text-slate-400"/> <span className="truncate">{branch.union_name ? `${branch.union_name}, ${branch.upazila}` : 'N/A'}</span></p>
                  </div>

                  <button onClick={() => handleDelete(branch.id)} className="w-full py-2.5 bg-red-50 text-red-500 rounded-xl font-bold text-xs hover:bg-red-500 hover:text-white transition flex justify-center items-center gap-2">
                    <Trash2 size={16} /> ডিলিট করুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* --- CREATE MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-red-50 hover:text-red-500 transition">
              <X size={20} />
            </button>

            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Plus className="text-[#006A4E]" /> নতুন ব্রাঞ্চ ও ম্যানেজার যুক্ত করুন
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Branch Basic Info */}
              <div>
                 <h4 className="text-xs font-black text-[#006A4E] uppercase tracking-widest mb-3 flex items-center gap-1.5"><Building size={14}/> ব্রাঞ্চের তথ্য</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">ব্রাঞ্চ নাম <span className="text-red-500">*</span></label>
                      <input type="text" required placeholder="ব্রাঞ্চের নাম..." value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#006A4E] focus:outline-none focus:ring-4 focus:ring-[#006A4E]/5 transition font-medium text-sm"/>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">ব্রাঞ্চ কোড <span className="text-red-500">*</span></label>
                      <input type="text" required placeholder="Ex: BR-001" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})}
                        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#006A4E] focus:outline-none focus:ring-4 focus:ring-[#006A4E]/5 transition font-medium text-sm"/>
                    </div>
                 </div>
              </div>

              {/* Manager Info */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                 <h4 className="text-xs font-black text-[#006A4E] uppercase tracking-widest mb-3 flex items-center gap-1.5"><User size={14}/> ম্যানেজার ডিটেইলস</h4>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">ম্যানেজারের নাম <span className="text-red-500">*</span></label>
                      <input type="text" required placeholder="নাম..." value={formData.manager_name} onChange={e => setFormData({...formData, manager_name: e.target.value})}
                        className="w-full p-3.5 bg-white border border-slate-200 rounded-xl focus:border-[#006A4E] focus:outline-none transition font-medium text-sm"/>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">মোবাইল নম্বর <span className="text-red-500">*</span></label>
                      <input type="text" required placeholder="01XXXXXXXXX" value={formData.manager_mobile} onChange={e => setFormData({...formData, manager_mobile: e.target.value})}
                        className="w-full p-3.5 bg-white border border-slate-200 rounded-xl focus:border-[#006A4E] focus:outline-none transition font-medium text-sm"/>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">লগইন ইউজারনেম <span className="text-red-500">*</span></label>
                      <input type="text" required placeholder="Username..." value={formData.manager_username} onChange={e => setFormData({...formData, manager_username: e.target.value})}
                        className="w-full p-3.5 bg-white border border-slate-200 rounded-xl focus:border-[#006A4E] focus:outline-none transition font-medium text-sm"/>
                    </div>
                 </div>
                 <div className="mt-3 text-[11px] text-amber-600 bg-amber-50 p-2.5 rounded-lg border border-amber-100 flex items-center gap-1.5 font-medium">
                   <KeyRound size={14} className="shrink-0"/>
                   সেভ বাটনে ক্লিক করলে ম্যানেজারের জন্য একটি ৬-ডিজিটের অটোমেটিক পাসওয়ার্ড জেনারেট হবে।
                 </div>
              </div>

              {/* Location Selectors */}
              <div>
                  <h4 className="text-xs font-black text-[#006A4E] uppercase tracking-widest mb-3 flex items-center gap-1.5"><MapPin size={14}/> লোকেশন ও ঠিকানা</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">বিভাগ <span className="text-red-500">*</span></label>
                        <select required value={formData.division} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#006A4E] text-sm" 
                          onChange={(e) => setFormData({...formData, division: e.target.value, district: '', upazila: '', union_name: ''})}>
                            <option value="">বিভাগ নির্বাচন করুন</option>
                            {divisions.map(d => <option key={d.id} value={d.bn_name}>{d.bn_name}</option>)}
                        </select>
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">জেলা <span className="text-red-500">*</span></label>
                        <select required value={formData.district} disabled={!formData.division} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#006A4E] text-sm disabled:opacity-50" 
                          onChange={(e) => setFormData({...formData, district: e.target.value, upazila: '', union_name: ''})}>
                            <option value="">জেলা নির্বাচন করুন</option>
                            {districtList.map(d => <option key={d.id} value={d.bn_name}>{d.bn_name}</option>)}
                        </select>
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">উপজেলা <span className="text-red-500">*</span></label>
                        <select required value={formData.upazila} disabled={!formData.district} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#006A4E] text-sm disabled:opacity-50" 
                          onChange={(e) => setFormData({...formData, upazila: e.target.value, union_name: ''})}>
                            <option value="">উপজেলা নির্বাচন করুন</option>
                            {upazilaList.map(u => <option key={u.id} value={u.bn_name}>{u.bn_name}</option>)}
                        </select>
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">ইউনিয়ন <span className="text-red-500">*</span></label>
                        <select required value={formData.union_name} disabled={!formData.upazila} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#006A4E] text-sm disabled:opacity-50" 
                          onChange={(e) => setFormData({...formData, union_name: e.target.value})}>
                            <option value="">ইউনিয়ন নির্বাচন করুন</option>
                            {unionList.map(u => <option key={u.id} value={u.bn_name}>{u.bn_name}</option>)}
                        </select>
                     </div>
                  </div>
              </div>

              <button type="submit" disabled={submitLoading} className="w-full py-4 bg-[#006A4E] text-white font-bold rounded-xl hover:bg-emerald-800 transition shadow-lg shadow-emerald-900/20 disabled:opacity-70 flex justify-center items-center gap-2">
                {submitLoading ? <Loader2 className="animate-spin" size={20}/> : 'সেভ ও কনফার্ম করুন'}
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}