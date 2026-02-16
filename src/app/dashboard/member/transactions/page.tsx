'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, ArrowDownLeft, History, Search, 
  Filter, Download, Loader2, Calendar, Wallet,
  CreditCard, Banknote, FileText
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, savings, loan
  const [searchTerm, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (userData.id) {
      // আমরা 'transactions' টেবিল থেকে ডাটা আনব
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('member_id', userData.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error:", error.message);
      } else {
        setTransactions(data || []);
      }
    }
    setLoading(false);
  };

  // লেনদেনের ধরণ অনুযায়ী আইকন ও কালার
  const getTxStyle = (type: string) => {
    if (type === 'savings') {
      return { 
        bg: 'bg-emerald-50 text-emerald-600', 
        icon: <ArrowDownLeft size={18} />, 
        label: 'সঞ্চয় জমা' 
      };
    }
    return { 
      bg: 'bg-blue-50 text-blue-600', 
      icon: <ArrowUpRight size={18} />, 
      label: 'কিস্তি পরিশোধ' 
    };
  };

  // ফিল্টার এবং সার্চ লজিক
  const filteredData = transactions.filter(tx => {
    const matchesFilter = filter === 'all' || tx.type === filter;
    const matchesSearch = tx.amount.toString().includes(searchTerm) || 
                          tx.method.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // সামারি ক্যালকুলেশন
  const totalSavings = transactions.filter(t => t.type === 'savings').reduce((sum, t) => sum + Number(t.amount), 0);
  const totalLoanPaid = transactions.filter(t => t.type === 'loan').reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      
      {/* --- Header Summary --- */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <History className="text-emerald-600" /> লেনদেন ইতিহাস
        </h1>
        <p className="text-sm text-slate-500 mt-1">আপনার সকল জমার হিসাব একনজরে</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100">
           <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
             <Wallet size={20}/>
           </div>
           <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">মোট সঞ্চয়</p>
           <h3 className="text-xl font-bold text-slate-800">৳ {totalSavings.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-blue-100">
           <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3">
             <CreditCard size={20}/>
           </div>
           <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">মোট কিস্তি</p>
           <h3 className="text-xl font-bold text-slate-800">৳ {totalLoanPaid.toLocaleString()}</h3>
        </div>
        <div className="bg-slate-900 p-5 rounded-2xl shadow-lg hidden md:block">
           <div className="w-10 h-10 bg-white/10 text-white rounded-xl flex items-center justify-center mb-3">
             <Banknote size={20}/>
           </div>
           <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">মোট লেনদেন</p>
           <h3 className="text-xl font-bold text-white">৳ {(totalSavings + totalLoanPaid).toLocaleString()}</h3>
        </div>
      </div>

      {/* --- Filters --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 w-full md:w-auto overflow-x-auto">
          {[
            { id: 'all', label: 'সব' },
            { id: 'savings', label: 'সঞ্চয়' },
            { id: 'loan', label: 'লোন কিস্তি' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                filter === tab.id ? 'bg-emerald-600 text-white shadow' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
           <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
           <input 
              type="text" 
              placeholder="টাকার পরিমাণ দিয়ে খুঁজুন..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>
      </div>

      {/* --- Transaction List --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="animate-spin text-emerald-600" size={32} />
          <p className="text-slate-400 font-medium">লোড হচ্ছে...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredData.length > 0 ? (
            filteredData.map((tx) => {
              const style = getTxStyle(tx.type);
              return (
                <div key={tx.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:border-emerald-300 transition group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${style.bg}`}>
                      {style.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm md:text-base">{style.label}</h4>
                      <p className="text-xs text-slate-400 flex items-center gap-3 mt-0.5">
                        <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(tx.created_at).toLocaleDateString('bn-BD')}</span>
                        <span className="font-bold uppercase text-emerald-600">{tx.method}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-extrabold text-slate-800">৳ {tx.amount.toLocaleString()}</p>
                    <span className="text-[10px] text-slate-400 font-bold bg-slate-50 px-2 py-0.5 rounded border">SUCCESS</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
               <FileText className="mx-auto mb-3 text-slate-200" size={48} />
               <p className="text-slate-400 font-medium">কোনো লেনদেনের তথ্য পাওয়া যায়নি</p>
            </div>
          )}
        </div>
      )}

      {/* Download Statement Floating Button (Mobile Only) */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
         <button className="bg-slate-900 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition">
            <Download size={24} />
         </button>
      </div>

    </div>
  );
}