'use client';

import React, { useState, useEffect } from 'react';
import { 
  UserPlus, Search, FileText, Camera, Loader2, List, Smartphone, CheckCircle 
} from "lucide-react";
// ৪ ধাপ পেছনে
import { supabase } from '../../../../lib/supabaseClient';

export default function AudienceDataPage() {
  const [subTab, setSubTab] = useState<'form' | 'list'>('form');
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  // ফর্ম স্টেট
  const [formData, setFormData] = useState({
    full_name: '', guardian_name: '', mother_name: '',
    mobile: '', total_members: '', earning_members: '',
    unemployed_members: '', address: '', nid_number: ''
  });

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(localUser);
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    const { data } = await supabase.from('audience_survey').select('*').order('created_at', { ascending: false });
    if (data) setDataList(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('audience_survey').insert([{
        ...formData,
        staff_name: user?.full_name,
        total_members: parseInt(formData.total_members || '0'),
        earning_members: parseInt(formData.earning_members || '0'),
        unemployed_members: parseInt(formData.unemployed_members || '0')
      }]);
      if (error) throw error;
      alert("তথ্য সফলভাবে সংরক্ষিত হয়েছে!");
      setFormData({ full_name: '', guardian_name: '', mother_name: '', mobile: '', total_members: '', earning_members: '', unemployed_members: '', address: '', nid_number: '' });
      fetchSurveys();
      setSubTab('list');
    } catch (err: any) { alert(err.message); } 
    finally { setLoading(false); }
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      
      <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 mb-6 max-w-md mx-auto">
        <button onClick={() => setSubTab('form')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${subTab === 'form' ? 'bg-emerald-600 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}`}>নতুন এন্ট্রি</button>
        <button onClick={() => setSubTab('list')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${subTab === 'list' ? 'bg-emerald-600 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}`}>ডাটা লিস্ট</button>
      </div>

      {subTab === 'form' ? (
        <form onSubmit={handleSubmit} className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100 space-y-5 max-w-2xl mx-auto">
           <h3 className="text-lg font-bold text-slate-700 mb-2 border-b pb-2 flex items-center gap-2"><UserPlus size={20}/> নতুন তথ্য ফরম</h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">নাম <span className="text-red-500">*</span></label>
                <input type="text" required value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} className="w-full p-3.5 bg-slate-50 border rounded-xl outline-none focus:border-emerald-500" placeholder="নাম লিখুন" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">মোবাইল <span className="text-red-500">*</span></label>
                <input type="number" required value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} className="w-full p-3.5 bg-slate-50 border rounded-xl outline-none focus:border-emerald-500" placeholder="017xxxxxxxx" />
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input type="text" value={formData.guardian_name} onChange={(e) => setFormData({...formData, guardian_name: e.target.value})} className="w-full p-3.5 bg-slate-50 border rounded-xl outline-none focus:border-emerald-500" placeholder="পিতা/স্বামীর নাম" />
              <input type="text" value={formData.mother_name} onChange={(e) => setFormData({...formData, mother_name: e.target.value})} className="w-full p-3.5 bg-slate-50 border rounded-xl outline-none focus:border-emerald-500" placeholder="মাতার নাম" />
           </div>

           <div className="grid grid-cols-3 gap-3 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
              <div className="text-center">
                <label className="block text-[10px] font-bold text-slate-500 mb-1">সদস্য</label>
                <input type="number" value={formData.total_members} onChange={(e) => setFormData({...formData, total_members: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg text-center font-bold" placeholder="০" />
              </div>
              <div className="text-center">
                <label className="block text-[10px] font-bold text-slate-500 mb-1">উপার্জনকারী</label>
                <input type="number" value={formData.earning_members} onChange={(e) => setFormData({...formData, earning_members: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg text-center font-bold" placeholder="০" />
              </div>
              <div className="text-center">
                <label className="block text-[10px] font-bold text-slate-500 mb-1">বেকার</label>
                <input type="number" value={formData.unemployed_members} onChange={(e) => setFormData({...formData, unemployed_members: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg text-center font-bold text-red-500" placeholder="০" />
              </div>
           </div>

           <div className="space-y-4">
              <textarea value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full p-3.5 bg-slate-50 border rounded-xl outline-none focus:border-emerald-500 h-20" placeholder="বর্তমান ঠিকানা..."></textarea>
              <input type="number" value={formData.nid_number} onChange={(e) => setFormData({...formData, nid_number: e.target.value})} className="w-full p-3.5 bg-slate-50 border rounded-xl outline-none focus:border-emerald-500 font-mono" placeholder="NID নম্বর" />
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-slate-300 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 h-24">
                  <Camera size={24} className="text-slate-400 mb-1" />
                  <span className="text-[10px] font-bold text-slate-500">ছবি তুলুন</span>
              </div>
              <div className="border-2 border-dashed border-slate-300 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 h-24">
                  <FileText size={24} className="text-slate-400 mb-1" />
                  <span className="text-[10px] font-bold text-slate-500">NID কপি</span>
              </div>
           </div>

           <button disabled={loading} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-emerald-700 shadow-md transition flex justify-center items-center gap-2">
              {loading ? <Loader2 className="animate-spin" /> : "ডাটা সেভ করুন"}
           </button>
        </form>
      ) : (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300 max-w-3xl mx-auto">
           <div className="relative mb-6">
              <Search className="absolute left-4 top-4 text-slate-400" size={20}/>
              <input type="text" className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm outline-none focus:border-emerald-500" placeholder="খুঁজুন..." />
           </div>

           {dataList.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-lg">
                      {item.full_name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{item.full_name}</h4>
                      <p className="text-xs text-slate-500 mt-1 font-mono flex items-center gap-1"><Smartphone size={12}/> {item.mobile}</p>
                    </div>
                 </div>
                 <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100">সদস্য: {item.total_members}</span>
              </div>
           ))}
           {dataList.length === 0 && <div className="text-center py-10 text-slate-400">কোনো ডাটা নেই</div>}
        </div>
      )}
    </div>
  );
}