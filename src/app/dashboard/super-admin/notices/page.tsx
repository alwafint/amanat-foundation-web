'use client';

import React, { useState, useEffect } from 'react';
import { Megaphone, Plus, Pin, Trash2, Loader2, Send, X, Users, UserCog } from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function ManagementNoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', category: 'general', target: 'all', is_pinned: false });

  const fetchNotices = async () => {
    setLoading(true);
    const { data } = await supabase.from('notices').select('*').order('is_pinned', { ascending: false }).order('created_at', { ascending: false });
    if (data) setNotices(data);
    setLoading(false);
  };

  useEffect(() => { fetchNotices(); }, []);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { error } = await supabase.from('notices').insert([formData]);
      if (error) throw error;
      alert("নোটিশ পাবলিশ হয়েছে!");
      setShowForm(false);
      setFormData({ title: '', content: '', category: 'general', target: 'all', is_pinned: false });
      fetchNotices();
    } catch (err: any) { alert(err.message); } 
    finally { setBtnLoading(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("ডিলিট করতে চান?")) return;
    await supabase.from('notices').delete().eq('id', id);
    fetchNotices();
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3"><Megaphone className="text-indigo-600" /> নোটিশ বোর্ড</h2>
          <p className="text-sm text-slate-500 mt-1 uppercase font-bold text-indigo-500/70 tracking-widest">Global Communication</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className={`px-6 py-3 rounded-2xl font-bold transition-all shadow-lg ${showForm ? 'bg-slate-200 text-slate-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
          {showForm ? "বন্ধ করুন" : "নতুন নোটিশ"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-indigo-500/20 mb-10 animate-in slide-in-from-top-4">
          <form onSubmit={handlePublish} className="space-y-6">
            <input required className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:border-indigo-500" placeholder="নোটিশের শিরোনাম" onChange={e => setFormData({...formData, title: e.target.value})} />
            <div className="grid grid-cols-2 gap-4">
                <select className="w-full p-4 bg-slate-50 border rounded-2xl outline-none" onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="general">সাধারণ</option><option value="urgent">জরুরি</option><option value="event">ইভেন্ট</option>
                </select>
                <select className="w-full p-4 bg-slate-50 border rounded-2xl outline-none" onChange={e => setFormData({...formData, target: e.target.value})}>
                    <option value="all">সবাই</option><option value="members">মেম্বার</option><option value="staff">স্টাফ</option>
                </select>
            </div>
            <textarea required className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:border-indigo-500 h-32" placeholder="বিস্তারিত লিখুন..." onChange={e => setFormData({...formData, content: e.target.value})} />
            <label className="flex items-center gap-2 text-sm font-bold text-indigo-900 bg-indigo-50 p-3 rounded-xl w-fit cursor-pointer">
               <input type="checkbox" onChange={e => setFormData({...formData, is_pinned: e.target.checked})} className="w-5 h-5 accent-indigo-600" /> পিন করে রাখুন (Pinned)
            </label>
            <button disabled={btnLoading} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2 transition active:scale-95">
               {btnLoading ? <Loader2 className="animate-spin"/> : <><Send size={20}/> পাবলিশ করুন</>}
            </button>
          </form>
        </div>
      )}

      {loading ? <div className="text-center py-20"><Loader2 className="animate-spin mx-auto text-indigo-600" size={40}/></div> : (
        <div className="space-y-4">
          {notices.map((n) => (
            <div key={n.id} className={`bg-white p-6 rounded-[2rem] border shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 transition hover:shadow-md ${n.is_pinned ? 'border-indigo-200 bg-indigo-50/20' : 'border-slate-100'}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                   {n.is_pinned && <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Pin size={10} fill="white"/> PINNED</span>}
                   <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-slate-100 text-slate-500 border">{n.category}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-lg">{n.title}</h4>
                <p className="text-xs text-slate-400 font-bold mt-1">তারিখ: {new Date(n.created_at).toLocaleDateString('bn-BD')}</p>
              </div>
              <button onClick={() => handleDelete(n.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition"><Trash2 size={20}/></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}