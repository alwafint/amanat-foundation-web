'use client';

import React, { useState } from 'react';
import { Search, CheckCircle, Banknote, User, Loader2 } from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function CollectionPage() {
  const [mobile, setMobile] = useState('');
  const [member, setMember] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('savings'); // savings or loan
  const [loading, setLoading] = useState(false);
  const [searching, setSearch] = useState(false);

  // মেম্বার খোঁজা
  const handleSearch = async () => {
    setSearch(true);
    const { data } = await supabase.from('members').select('*').eq('mobile', mobile).single();
    if (data) setMember(data);
    else { alert("মেম্বার পাওয়া যায়নি!"); setMember(null); }
    setSearch(false);
  };

  // টাকা জমা নেওয়া
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const staffUser = JSON.parse(localStorage.getItem('user') || '{}');

    try {
      const { error } = await supabase.from('bookings').insert([{
        member_name: member.full_name,
        mobile: member.mobile,
        staff_id: staffUser.mobile, // যে স্টাফ টাকা নিচ্ছে
        service_category: 'CashCollection',
        item_name: type === 'savings' ? 'সঞ্চয় জমা' : 'কিস্তি পরিশোধ',
        quantity: amount + ' টাকা',
        status: 'approved', // স্টাফ নিচ্ছে তাই সরাসরি এপ্রুভ (বা পেন্ডিং রাখতে পারেন)
        assigned_staff: staffUser.full_name
      }]);

      if (error) throw error;
      alert(`৳${amount} টাকা সফলভাবে গ্রহণ করা হয়েছে!`);
      setMember(null); setAmount(''); setMobile('');
    } catch (err: any) {
      alert("সমস্যা: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-lg mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Banknote className="text-yellow-400"/> ক্যাশ কালেকশন
        </h2>
        <p className="text-emerald-200 text-sm">সরাসরি মেম্বারের কাছ থেকে টাকা গ্রহণ করুন</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-lg mx-auto">
        
        {/* Search Section */}
        <div className="flex gap-2 mb-6">
          <input 
            type="text" 
            placeholder="মেম্বারের মোবাইল নম্বর..." 
            className="flex-1 p-3 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <button 
            onClick={handleSearch}
            disabled={searching}
            className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700"
          >
            {searching ? <Loader2 className="animate-spin"/> : <Search/>}
          </button>
        </div>

        {/* Member Details & Form */}
        {member && (
          <form onSubmit={handleSubmit} className="space-y-5 animate-in slide-in-from-top-2">
            <div className="bg-emerald-50 p-4 rounded-xl flex items-center gap-4 border border-emerald-100">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-emerald-700 text-xl shadow-sm">
                {member.full_name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{member.full_name}</h3>
                <p className="text-xs text-slate-500">{member.village}, {member.upazila}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">জমার ধরন</label>
              <div className="grid grid-cols-2 gap-3">
                <div onClick={() => setType('savings')} className={`p-3 text-center rounded-xl cursor-pointer border-2 transition ${type === 'savings' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold' : 'border-slate-100 text-slate-500'}`}>
                  সঞ্চয়
                </div>
                <div onClick={() => setType('loan')} className={`p-3 text-center rounded-xl cursor-pointer border-2 transition ${type === 'loan' ? 'border-blue-500 bg-blue-50 text-blue-700 font-bold' : 'border-slate-100 text-slate-500'}`}>
                  লোন কিস্তি
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">টাকার পরিমাণ</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-400 font-bold">৳</span>
                <input 
                  type="number" 
                  required 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 font-bold text-lg" 
                  placeholder="500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <button disabled={loading} className="w-full bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-800 shadow-lg flex justify-center items-center gap-2">
              {loading ? <Loader2 className="animate-spin"/> : <><CheckCircle/> টাকা গ্রহণ করুন</>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}