'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CalendarCheck, Search, Phone, Banknote, 
  ArrowRight, Loader2, Filter,
  CheckCircle2, User, Clock, Wallet, AlertCircle,
  MapPin // <-- এখানে MapPin যোগ করা হয়েছে
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function DueListPage() {
  const [dues, setDues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // all, savings, loan
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(localUser);
    if (localUser.mobile) {
      fetchDueList(localUser.mobile);
    }
  }, []);

  const fetchDueList = async (leaderMobile: string) => {
    setLoading(true);
    try {
      // ১. মেম্বার টেবিল থেকে এই লিডারের মেম্বারদের তথ্য আনা
      const { data: members, error } = await supabase
        .from('members')
        .select('*')
        .eq('referred_by', leaderMobile)
        .eq('status', 'active');

      if (error) throw error;

      // ২. বাস্তব অ্যাপে আপনি ট্রানজেকশন টেবিল চেক করে ডিউ বের করবেন।
      // আপাতত ডেমো হিসেবে মেম্বারদের সাথে ডিউ ডাটা ম্যাপ করা হচ্ছে।
      const mockDues = members?.map((m: any, index: number) => ({
        id: m.id,
        full_name: m.full_name,
        mobile: m.mobile,
        village: m.village,
        amount: index % 2 === 0 ? 500 : 1200, // ডামি ডাটা
        type: index % 2 === 0 ? 'savings' : 'loan', // ডামি টাইপ
        date: 'আজকের তালিকা'
      })) || [];

      setDues(mockDues);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ফিল্টার এবং সার্চ লজিক
  const filteredDues = dues.filter(item => {
    const matchesSearch = item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || item.mobile.includes(searchTerm);
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const totalDueAmount = filteredDues.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-20 max-w-5xl mx-auto">
      
      {/* --- HEADER SUMMARY --- */}
      <div className="mb-8 bg-white p-6 rounded-[2rem] shadow-sm border border-indigo-50 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner">
                <CalendarCheck size={30} />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-800">আজকের ডিউ লিস্ট</h2>
                <p className="text-sm text-slate-500 font-medium">কালেকশন টার্গেট এবং তালিকা</p>
            </div>
        </div>
        <div className="bg-indigo-600 text-white px-8 py-3 rounded-2xl text-center shadow-lg shadow-indigo-200">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">মোট সম্ভাব্য কালেকশন</p>
            <h3 className="text-2xl font-black">৳ {totalDueAmount.toLocaleString()}</h3>
        </div>
      </div>

      {/* --- SEARCH & FILTER --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="নাম বা মোবাইল দিয়ে খুঁজুন..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition shadow-sm font-medium"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          {[
            { id: 'all', label: 'সব ডিউ', icon: <Filter size={14}/> },
            { id: 'savings', label: 'সঞ্চয়', icon: <Wallet size={14}/> },
            { id: 'loan', label: 'কিস্তি', icon: <Banknote size={14}/> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeFilter === tab.id 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- DUE LIST VIEW --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="animate-spin text-indigo-600" size={40} />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">ডাটা লোড হচ্ছে...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDues.length > 0 ? filteredDues.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 group flex flex-col md:flex-row justify-between items-center gap-6">
              
              {/* Member Info */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-xl text-indigo-600 shadow-inner border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                  {item.full_name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg leading-none">{item.full_name}</h4>
                  <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 font-mono">
                     <MapPin size={12}/> {item.village} • {item.mobile}
                  </p>
                </div>
              </div>

              {/* Amount Info */}
              <div className="flex flex-col md:items-end w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                 <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${item.type === 'savings' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                        {item.type === 'savings' ? 'সঞ্চয় জমা' : 'লোন কিস্তি'}
                    </span>
                    <span className="text-[10px] font-bold text-red-500 flex items-center gap-1">
                       <Clock size={10}/> {item.date}
                    </span>
                 </div>
                 <h3 className="text-2xl font-black text-slate-800">৳ {item.amount.toLocaleString()}</h3>
              </div>

              {/* Actions */}
              <div className="flex gap-3 w-full md:w-auto">
                 <a 
                   href={`tel:${item.mobile}`}
                   className="flex-1 md:flex-none p-3 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-100 transition shadow-sm border border-indigo-100 flex items-center justify-center"
                   title="কল করুন"
                 >
                   <Phone size={20}/>
                 </a>
                 <Link 
                   href={`/dashboard/team-leader/collection?mobile=${item.mobile}`}
                   className="flex-1 md:flex-none px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 transition shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 active:scale-95"
                 >
                   টাকা গ্রহণ <ArrowRight size={18}/>
                 </Link>
              </div>

            </div>
          )) : (
            <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
               <CheckCircle2 size={64} className="mx-auto text-emerald-100 mb-4"/>
               <h3 className="text-xl font-bold text-slate-400 italic">আজকের কোনো বকেয়া নেই!</h3>
               <p className="text-slate-300 text-sm mt-1">সব কালেকশন সম্পন্ন হয়েছে।</p>
            </div>
          )}
        </div>
      )}

      {/* --- Footer Tips --- */}
      <div className="mt-12 bg-indigo-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
            <CalendarCheck size={120}/>
          </div>
          <div className="relative z-10">
            <h4 className="text-xl font-bold mb-2">পরামর্শ</h4>
            <p className="text-indigo-200 text-sm max-w-md leading-relaxed">
              সকাল সকাল মেম্বারদের সাথে যোগাযোগ করলে কালেকশন সফল হওয়ার সম্ভাবনা বেশি থাকে। কোনো মেম্বার সমস্যার কথা বললে দয়া করে অফিসে নোট প্রদান করুন।
            </p>
          </div>
      </div>

    </div>
  );
}