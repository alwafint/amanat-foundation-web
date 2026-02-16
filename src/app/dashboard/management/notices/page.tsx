'use client';

import React, { useState, useEffect } from 'react';
import { 
  Megaphone, Plus, Search, Pin, Trash2, 
  AlertCircle, Calendar, Info, Loader2, 
  Send, X, CheckCircle, Users, UserCog
} from "lucide-react";
// সঠিক রিলেটিভ পাথ (৪ ধাপ পেছনে)
import { supabase } from '../../../../lib/supabaseClient';

export default function ManagementNoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  
  // ফর্ম স্টেট
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general', // general, urgent, event
    target: 'all',       // all, members, staff
    is_pinned: false
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotices(data || []);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // নতুন নোটিশ পাবলিশ করা
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      const { error } = await supabase
        .from('notices')
        .insert([formData]);

      if (error) throw error;

      alert("নোটিশটি সফলভাবে পাবলিশ হয়েছে!");
      setShowForm(false);
      setFormData({ title: '', content: '', category: 'general', target: 'all', is_pinned: false });
      fetchNotices();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setBtnLoading(false);
    }
  };

  // নোটিশ ডিলিট করা
  const handleDelete = async (id: number) => {
    if (!window.confirm("আপনি কি নিশ্চিতভাবে এই নোটিশটি ডিলিট করতে চান?")) return;

    try {
      const { error } = await supabase.from('notices').delete().eq('id', id);
      if (error) throw error;
      fetchNotices();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      
      {/* --- Header & Action --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Megaphone className="text-indigo-600" /> নোটিশ বোর্ড ম্যানেজমেন্ট
          </h2>
          <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest font-bold text-indigo-500/70">Control Panel</p>
        </div>
        
        <button 
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg ${showForm ? 'bg-slate-200 text-slate-700' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'}`}
        >
          {showForm ? <><X size={20}/> বন্ধ করুন</> : <><Plus size={20}/> নতুন নোটিশ</>}
        </button>
      </div>

      {/* --- NEW NOTICE FORM --- */}
      {showForm && (
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border border-indigo-100 mb-10 animate-in slide-in-from-top-4 duration-300">
          <form onSubmit={handlePublish} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">নোটিশের শিরোনাম <span className="text-red-500">*</span></label>
                  <input 
                    type="text" required
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 transition" 
                    placeholder="যেমন: মাসিক সভার সময় পরিবর্তন"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
               </div>
               
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">ক্যাটাগরি</label>
                  <select 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="general">সাধারণ (General)</option>
                    <option value="urgent">জরুরি (Urgent)</option>
                    <option value="event">ইভেন্ট (Event)</option>
                  </select>
               </div>

               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">টার্গেট অডিয়েন্স</label>
                  <select 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none"
                    value={formData.target}
                    onChange={(e) => setFormData({...formData, target: e.target.value})}
                  >
                    <option value="all">সবাই (Everyone)</option>
                    <option value="members">শুধু মেম্বার (Members Only)</option>
                    <option value="staff">শুধু স্টাফ (Staff Only)</option>
                  </select>
               </div>
            </div>

            <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">বিস্তারিত তথ্য</label>
               <textarea 
                 required
                 className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 transition h-32" 
                 placeholder="নোটিশের বিস্তারিত এখানে লিখুন..."
                 value={formData.content}
                 onChange={(e) => setFormData({...formData, content: e.target.value})}
               />
            </div>

            <div className="flex items-center gap-3 bg-indigo-50 p-4 rounded-2xl w-fit">
               <input 
                 type="checkbox" id="pin"
                 checked={formData.is_pinned}
                 onChange={(e) => setFormData({...formData, is_pinned: e.target.checked})}
                 className="w-5 h-5 text-indigo-600 rounded"
               />
               <label htmlFor="pin" className="text-sm font-bold text-indigo-900 cursor-pointer flex items-center gap-2">
                 <Pin size={16}/> এই নোটিশটি পিন (সবার উপরে) রাখুন
               </label>
            </div>

            <button 
              disabled={btnLoading}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-black transition shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {btnLoading ? <Loader2 className="animate-spin"/> : <><Send size={20}/> নোটিশ পাবলিশ করুন</>}
            </button>
          </form>
        </div>
      )}

      {/* --- NOTICE LIST --- */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 px-2 flex items-center gap-2">
           <ListIcon size={20} className="text-indigo-600" /> বর্তমানে লাইভ নোটিশসমূহ
        </h3>

        {loading ? (
           <div className="text-center py-20"><Loader2 className="animate-spin mx-auto text-indigo-600"/></div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {notices.map((notice) => (
              <div key={notice.id} className={`bg-white p-5 md:p-6 rounded-3xl border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition hover:shadow-md ${notice.is_pinned ? 'border-indigo-200 bg-indigo-50/20' : 'border-slate-100'}`}>
                <div className="flex-1">
                   <div className="flex items-center gap-2 mb-2">
                      {notice.is_pinned && <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Pin size={10} fill="white"/> PINNED</span>}
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                        notice.category === 'urgent' ? 'border-red-200 text-red-600 bg-red-50' : 
                        notice.category === 'event' ? 'border-blue-200 text-blue-600 bg-blue-50' : 
                        'border-emerald-200 text-emerald-600 bg-emerald-50'
                      }`}>
                        {notice.category}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                         {notice.target === 'staff' ? <UserCog size={10}/> : <Users size={10}/>} {notice.target}
                      </span>
                   </div>
                   <h4 className="font-bold text-slate-800 md:text-lg">{notice.title}</h4>
                   <p className="text-xs text-slate-400 font-bold mt-1">তারিখ: {new Date(notice.created_at).toLocaleDateString('bn-BD')}</p>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                   <button 
                    onClick={() => handleDelete(notice.id)}
                    className="flex-1 md:flex-none p-3 text-red-500 hover:bg-red-50 rounded-2xl transition border border-transparent hover:border-red-100"
                   >
                     <Trash2 size={20}/>
                   </button>
                </div>
              </div>
            ))}

            {notices.length === 0 && (
              <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
                <Megaphone size={48} className="mx-auto text-slate-200 mb-4"/>
                <p className="text-slate-400 font-bold">এখনো কোনো নোটিশ নেই</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper icon
function ListIcon({ size, className }: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
}