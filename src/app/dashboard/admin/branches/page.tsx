'use client';

import React, { useEffect, useState } from 'react';
import { 
  Building, Plus, MapPin, Phone, 
  Trash2, X, ChevronRight, Loader2
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient'; 
// লক্ষ্য করুন: এখন ৫টি ../ দেওয়া হয়েছে কারণ পেজটি এক ধাপ ভেতরে ঢুকেছে।

export default function BranchManagement() {
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // --- Location Data States ---
  const [districts, setDistricts] = useState<any[]>([]);
  const [upazilas, setUpazilas] = useState<any[]>([]);
  const [unions, setUnions] = useState<any[]>([]);
  const [villages, setVillages] = useState<any[]>([]);
  
  // --- Form State ---
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    mobile: '',
    address_details: '', // বাড়ি নং, রোড নং ইত্যাদি
    district_id: '',
    upazila_id: '',
    union_id: '',
    village_id: ''
  });

  // --- 1. Initial Data Fetch ---
  useEffect(() => {
    fetchBranches();
    fetchDistricts();
  }, []);

  const fetchBranches = async () => {
    setLoading(true);
    // ব্রাঞ্চের সাথে লোকেশনের নামগুলোও জয়েন করে আনা হচ্ছে
    const { data, error } = await supabase
      .from('branches')
      .select(`
        *,
        districts:district_id (name),
        upazilas:upazila_id (name),
        unions:union_id (name),
        villages:village_id (name)
      `)
      .order('id', { ascending: true });
      
    if (data) setBranches(data);
    setLoading(false);
  };

  const fetchDistricts = async () => {
    const { data } = await supabase.from('districts').select('*').order('name');
    if (data) setDistricts(data);
  };

  // --- 2. Cascading Dropdown Handlers ---
  
  // জেলা পাল্টালে উপজেলা লোড হবে
  const handleDistrictChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const distId = e.target.value;
    setFormData({ ...formData, district_id: distId, upazila_id: '', union_id: '', village_id: '' });
    setUpazilas([]); setUnions([]); setVillages([]);

    if (distId) {
      const { data } = await supabase.from('upazilas').select('*').eq('district_id', distId).order('name');
      if (data) setUpazilas(data);
    }
  };

  // উপজেলা পাল্টালে ইউনিয়ন লোড হবে
  const handleUpazilaChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const upzId = e.target.value;
    setFormData({ ...formData, upazila_id: upzId, union_id: '', village_id: '' });
    setUnions([]); setVillages([]);

    if (upzId) {
      const { data } = await supabase.from('unions').select('*').eq('upazila_id', upzId).order('name');
      if (data) setUnions(data);
    }
  };

  // ইউনিয়ন পাল্টালে গ্রাম লোড হবে
  const handleUnionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const unionId = e.target.value;
    setFormData({ ...formData, union_id: unionId, village_id: '' });
    setVillages([]);

    if (unionId) {
      const { data } = await supabase.from('villages').select('*').eq('union_id', unionId).order('name');
      if (data) setVillages(data);
    }
  };

  // --- 3. Submit Handler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    
    // ডাটাবেজের কলামের সাথে মিল রেখে অবজেক্ট তৈরি
    const payload = {
      name: formData.name,
      code: formData.code,
      mobile: formData.mobile,
      address: formData.address_details, // সাধারণ টেক্সট (বাড়ি/রোড)
      district_id: formData.district_id || null,
      upazila_id: formData.upazila_id || null,
      union_id: formData.union_id || null,
      village_id: formData.village_id || null
    };

    const { error } = await supabase.from('branches').insert([payload]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      setFormData({ 
        name: '', code: '', mobile: '', address_details: '', 
        district_id: '', upazila_id: '', union_id: '', village_id: '' 
      });
      setShowModal(false);
      fetchBranches();
    }
    setSubmitLoading(false);
  };

  // --- 4. Delete Handler ---
  const handleDelete = async (id: number) => {
    if(!confirm("সতর্কতা: আপনি কি নিশ্চিত এই ব্রাঞ্চটি ডিলিট করতে চান?")) return;
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

      {/* --- BRANCH GRID --- */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#006A4E]"/></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <div key={branch.id} className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#006A4E] transition-all duration-300 relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[4rem] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-[#006A4E]/10 text-[#006A4E] rounded-2xl flex items-center justify-center">
                    <Building size={24} />
                  </div>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {branch.code}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-1">{branch.name}</h3>
                
                {/* Location Badge */}
                <div className="flex items-center gap-1 text-[10px] font-bold text-[#006A4E] bg-emerald-50 w-fit px-2 py-1 rounded-md mb-4">
                   <MapPin size={10}/>
                   {branch.upazilas?.name}, {branch.districts?.name}
                </div>
                
                <div className="space-y-2 mb-6 text-sm text-slate-500">
                  <div className="flex gap-2">
                    <span className="min-w-[16px] mt-0.5"><ChevronRight size={14} className="text-[#FFB800]"/></span>
                    <span>ইউনিয়ন: {branch.unions?.name || '-'}, গ্রাম: {branch.villages?.name || '-'}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="min-w-[16px] mt-0.5"><Phone size={14} className="text-[#FFB800]"/></span>
                    <span>{branch.mobile}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <button onClick={() => handleDelete(branch.id)} className="ml-auto p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-[2rem] p-8 shadow-2xl relative my-8">
            
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-red-50 hover:text-red-500 transition">
              <X size={20} />
            </button>

            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2 border-b pb-4">
              <Plus className="text-[#006A4E]" /> নতুন ব্রাঞ্চ যুক্ত করুন
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">ব্রাঞ্চ নাম</label>
                  <input type="text" required placeholder="ব্রাঞ্চের নাম..." value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#006A4E] focus:outline-none"/>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">কোড</label>
                  <input type="text" required placeholder="B-001" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#006A4E] focus:outline-none"/>
                </div>
              </div>

              {/* Location Selectors (The Main Part) */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
                  <p className="text-xs font-black text-[#006A4E] uppercase tracking-widest mb-2">লোকেশন সেটআপ</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* District */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">জেলা নির্বাচন করুন</label>
                        <select required value={formData.district_id} onChange={handleDistrictChange} className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm">
                            <option value="">জেলা...</option>
                            {districts.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                      </div>

                      {/* Upazila */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">উপজেলা নির্বাচন করুন</label>
                        <select required value={formData.upazila_id} onChange={handleUpazilaChange} disabled={!formData.district_id} className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm disabled:opacity-50">
                            <option value="">উপজেলা...</option>
                            {upazilas.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
                        </select>
                      </div>

                      {/* Union */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">ইউনিয়ন নির্বাচন করুন</label>
                        <select required value={formData.union_id} onChange={handleUnionChange} disabled={!formData.upazila_id} className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm disabled:opacity-50">
                            <option value="">ইউনিয়ন...</option>
                            {unions.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
                        </select>
                      </div>

                      {/* Village */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">গ্রাম নির্বাচন করুন</label>
                        <select value={formData.village_id} onChange={(e) => setFormData({...formData, village_id: e.target.value})} disabled={!formData.union_id} className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm disabled:opacity-50">
                            <option value="">গ্রাম (অপশনাল)...</option>
                            {villages.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
                        </select>
                      </div>
                  </div>
              </div>

              {/* Contact & Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">মোবাইল</label>
                    <input type="text" placeholder="01XXXXXXXXX" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#006A4E] focus:outline-none"/>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">ঠিকানা (রোড/বাড়ি)</label>
                    <input type="text" placeholder="হোল্ডিং নং..." value={formData.address_details} onChange={e => setFormData({...formData, address_details: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#006A4E] focus:outline-none"/>
                 </div>
              </div>

              <button type="submit" disabled={submitLoading} className="w-full py-4 bg-[#006A4E] text-white font-bold rounded-xl hover:bg-emerald-800 transition shadow-lg shadow-emerald-900/20 disabled:opacity-70">
                {submitLoading ? 'সেভ হচ্ছে...' : 'সেভ ও কনফার্ম করুন'}
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}