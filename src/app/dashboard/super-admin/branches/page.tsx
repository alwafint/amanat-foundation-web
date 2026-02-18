'use client';

import React, { useEffect, useState } from 'react';
import { Building2, Plus, MapPin, Loader2, X, Search, ShieldCheck } from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function BranchesPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', code: '', address: '' });

  const fetchBranches = async () => {
    setLoading(true);
    const { data } = await supabase.from('branches').select('*').order('id', { ascending: true });
    if (data) setBranches(data);
    setLoading(false);
  };

  useEffect(() => { fetchBranches(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('branches').insert([formData]);
    if (!error) {
      alert("ব্রাঞ্চ তৈরি সফল!");
      setIsModalOpen(false);
      fetchBranches();
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><Building2 className="text-emerald-600"/> ব্রাঞ্চ ম্যানেজমেন্ট</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-emerald-600 text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">
          <Plus size={20}/> নতুন শাখা
        </button>
      </div>

      {loading ? <div className="flex justify-center py-20"><Loader2 className="animate-spin text-emerald-600"/></div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map(b => (
            <div key={b.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-bold border border-emerald-100">{b.code}</div>
                <h3 className="text-lg font-bold text-slate-800">{b.name}</h3>
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-1 mb-4"><MapPin size={14}/> {b.address}</p>
              <div className="flex gap-2">
                 <button className="flex-1 py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg border border-slate-200 hover:bg-slate-100">এডিট</button>
                 <button className="flex-1 py-2 bg-slate-50 text-emerald-600 text-xs font-bold rounded-lg border border-emerald-100 hover:bg-emerald-50">রিপোর্ট</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">নতুন শাখা তৈরি</h3>
              <button onClick={() => setIsModalOpen(false)}><X/></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <input required className="w-full p-3 border rounded-xl" placeholder="শাখার নাম" onChange={e => setFormData({...formData, name: e.target.value})} />
              <input required className="w-full p-3 border rounded-xl" placeholder="শাখা কোড (যেমন: GOB-02)" onChange={e => setFormData({...formData, code: e.target.value})} />
              <input required className="w-full p-3 border rounded-xl" placeholder="ঠিকানা" onChange={e => setFormData({...formData, address: e.target.value})} />
              <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700">শাখা নিশ্চিত করুন</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}