'use client';
import React, { useState } from 'react';
import { Camera, MapPin, UploadCloud, Save } from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function MonitoringPage() {
  const [mobile, setMobile] = useState('');
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const staff = JSON.parse(localStorage.getItem('user') || '{}');
    
    // ১. মেম্বার আইডি বের করা
    const { data: member } = await supabase.from('members').select('id').eq('mobile', mobile).single();
    
    if (member) {
      await supabase.from('project_visits').insert([{
        member_id: member.id,
        staff_id: staff.mobile,
        project_name: 'Regular Visit',
        remarks: remarks,
        // image_url: এখানে ইমেজ আপলোডের লজিক বসাতে পারেন (আগের মতো)
      }]);
      alert("ভিজিট রিপোর্ট জমা হয়েছে!");
      setMobile(''); setRemarks('');
    } else {
      alert("মেম্বার পাওয়া যায়নি");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-lg mx-auto animate-in fade-in">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex gap-2"><Camera className="text-blue-600"/> প্রজেক্ট মনিটরিং</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
        <div>
          <label className="text-sm font-bold text-slate-700">মেম্বার মোবাইল</label>
          <input type="text" required className="w-full p-3 border rounded-xl" value={mobile} onChange={e => setMobile(e.target.value)} />
        </div>
        
        <div className="border-2 border-dashed border-slate-300 p-6 rounded-xl flex flex-col items-center text-slate-400 cursor-pointer hover:bg-slate-50">
          <UploadCloud size={32}/>
          <span className="text-xs mt-2">প্রজেক্টের ছবি তুলুন (বাধ্যতামূলক)</span>
        </div>

        <div>
          <label className="text-sm font-bold text-slate-700">মন্তব্য / অবস্থা</label>
          <textarea required className="w-full p-3 border rounded-xl h-24" placeholder="গরু সুস্থ আছে / দোকানের অবস্থা ভালো..." value={remarks} onChange={e => setRemarks(e.target.value)} />
        </div>

        <button disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex justify-center gap-2">
          <Save size={20}/> রিপোর্ট সাবমিট
        </button>
      </form>
    </div>
  );
}