'use client';

import React, { useState, useEffect } from 'react';
import { 
  Wallet, TrendingUp, PiggyBank, History, 
  ArrowUpRight, ArrowDownLeft, Plus, Calculator, 
  CreditCard, X, CheckCircle
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function SavingsPage() {
  const [user, setUser] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // ডিপোজিট ফর্ম স্টেট
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bkash');
  const [trxID, setTrxID] = useState('');
  const [schemeType, setSchemeType] = useState('General');

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(localUser);
  }, []);

  // --- ডামি ডাটা (বাস্তবে ডাটাবেজ থেকে আসবে) ---
  const savingsData = {
    totalBalance: 25500,
    totalProfit: 1250,
    loanLimit: 20000, // সঞ্চয়ের ৮০-৯০%
    schemes: [
      { id: 1, name: "সাধারণ সঞ্চয়", balance: 5500, monthly: 200, profit: 150, color: "bg-blue-100 text-blue-700" },
      { id: 2, name: "মুদারাবা ডিপিএস (৫ বছর)", balance: 20000, monthly: 1000, profit: 1100, color: "bg-purple-100 text-purple-700" },
    ],
    history: [
      { id: 1, date: "০৫ অক্টো, ২০২৪", type: "Deposit", amount: 1000, method: "bKash", status: "Approved" },
      { id: 2, date: "১০ সেপ্টে, ২০২৪", type: "Deposit", amount: 200, method: "Cash", status: "Approved" },
      { id: 3, date: "১৫ আগস্ট, ২০২৪", type: "Withdraw", amount: 500, method: "Agent", status: "Pending" },
    ]
  };

  // টাকা জমার হ্যান্ডলার
  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // আমরা 'bookings' টেবিলে বা আলাদা 'transactions' টেবিলে রাখতে পারি
      const { error } = await supabase.from('bookings').insert([{
        member_name: user?.full_name || 'Guest',
        mobile: user?.mobile,
        service_category: 'SavingsDeposit',
        item_name: `টাকা জমা (${schemeType})`,
        quantity: amount + ' টাকা',
        assigned_staff: `মাধ্যম: ${method}, TrxID: ${trxID}`,
        status: 'pending'
      }]);

      if (error) throw error;
      alert("টাকা জমার রিকোয়েস্ট পাঠানো হয়েছে! অফিস থেকে ভেরিফাই করে ব্যালেন্স যোগ করা হবে।");
      setModalOpen(false); setAmount(''); setTrxID('');
    } catch (err: any) {
      alert("সমস্যা হয়েছে: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12 bg-slate-50/50">
      
      {/* ১. হিরো কার্ড (মোট ব্যালেন্স) */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-600 rounded-3xl p-8 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <p className="text-emerald-100 text-sm font-medium mb-1 flex items-center gap-2">
              <Wallet size={18}/> মোট সঞ্চয় স্থিতি
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold flex items-center gap-2 mb-2">
              ৳ {savingsData.totalBalance.toLocaleString()}
            </h1>
            <div className="flex gap-3 text-xs font-medium">
              <span className="bg-white/20 px-3 py-1 rounded-full">মুনাফা: +৳{savingsData.totalProfit}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">লোন লিমিট: ৳{savingsData.loanLimit}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setModalOpen(true)}
            className="bg-white text-emerald-800 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition shadow-lg flex items-center gap-2 animate-bounce-slow"
          >
            <Plus size={20} /> টাকা জমা দিন
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ২. স্কিম বা অ্যাকাউন্ট ডিটেইলস */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <PiggyBank className="text-emerald-600"/> আপনার অ্যাকাউন্টসমূহ
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savingsData.schemes.map((scheme) => (
              <div key={scheme.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 rounded-lg text-xs font-bold ${scheme.color}`}>
                    {scheme.name}
                  </div>
                  <TrendingUp size={20} className="text-emerald-500" />
                </div>
                <p className="text-slate-500 text-xs uppercase font-bold">বর্তমান জমা</p>
                <h4 className="text-2xl font-bold text-slate-800 mb-2">৳ {scheme.balance.toLocaleString()}</h4>
                <div className="flex justify-between text-xs text-slate-500 border-t pt-3 mt-3">
                  <span>মাসিক কিস্তি: ৳{scheme.monthly}</span>
                  <span className="text-emerald-600 font-bold">লাভ: ৳{scheme.profit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* জাকাত ক্যালকুলেটর ব্যানার */}
          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                <Calculator size={24}/>
              </div>
              <div>
                <h4 className="font-bold text-purple-800">জাকাত ক্যালকুলেটর</h4>
                <p className="text-xs text-purple-600">আপনার সঞ্চয়ের ওপর কত টাকা জাকাত আসে দেখুন</p>
              </div>
            </div>
            <button className="text-purple-700 font-bold text-sm hover:underline">হিসাব করুন</button>
          </div>
        </div>

        {/* ৩. লেনদেন ইতিহাস (Transaction History) */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 h-full">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center justify-between">
              লেনদেন ইতিহাস
              <span className="text-xs text-emerald-600 cursor-pointer hover:underline flex items-center gap-1">
                <History size={14}/> সব দেখুন
              </span>
            </h3>
            
            <div className="space-y-6">
              {savingsData.history.map((item) => (
                <div key={item.id} className="flex justify-between items-center group">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === 'Deposit' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                      {item.type === 'Deposit' ? <ArrowDownLeft size={18}/> : <ArrowUpRight size={18}/>}
                    </div>
                    <div>
                      <p className="font-bold text-slate-700 text-sm">{item.type === 'Deposit' ? 'টাকা জমা' : 'টাকা উত্তোলন'}</p>
                      <p className="text-xs text-slate-400">{item.date} • {item.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`block font-bold text-sm ${item.type === 'Deposit' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {item.type === 'Deposit' ? '+' : '-'} ৳{item.amount}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ৪. ডিপোজিট মডাল (Popup Form) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in zoom-in-95">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800">টাকা জমা দিন</h3>
                <p className="text-xs text-slate-500">বিকাশ/নগদ এর মাধ্যমে পেমেন্ট করুন</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition"><X size={20}/></button>
            </div>

            <form onSubmit={handleDeposit} className="space-y-5 overflow-y-auto custom-scrollbar">
              
              {/* স্কিম সিলেক্ট */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">কোন অ্যাকাউন্টে জমা দেবেন?</label>
                <select 
                  onChange={(e) => setSchemeType(e.target.value)} 
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-emerald-500 text-slate-700 font-medium"
                >
                  <option value="General">সাধারণ সঞ্চয়</option>
                  <option value="DPS">মুদারাবা ডিপিএস</option>
                  <option value="Other">অন্যান্য</option>
                </select>
              </div>

              {/* পরিমাণ */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">জমার পরিমাণ</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-slate-400 font-bold">৳</span>
                  <input type="number" required onChange={(e) => setAmount(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-emerald-500 font-bold text-slate-800" placeholder="500" />
                </div>
              </div>

              {/* পেমেন্ট মেথড */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">পেমেন্ট মেথড</label>
                <div className="grid grid-cols-3 gap-3">
                  {['bkash', 'nagad', 'rocket'].map((m) => (
                    <div 
                      key={m} 
                      onClick={() => setMethod(m)}
                      className={`border-2 p-2 rounded-xl cursor-pointer text-center text-sm font-bold uppercase transition ${method === m ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-500'}`}
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </div>

              {/* TrxID */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">TrxID (ট্রানজেকশন আইডি)</label>
                <input type="text" required onChange={(e) => setTrxID(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-emerald-500 text-sm font-mono uppercase" placeholder="8N7A6D..." />
                
                <div className="mt-3 bg-yellow-50 p-3 rounded-lg border border-yellow-100 flex gap-2 items-start">
                  <CheckCircle size={16} className="text-yellow-600 shrink-0 mt-0.5"/>
                  <p className="text-xs text-yellow-800">
                    আমাদের মার্চেন্ট নম্বরে (017XXXXXXXX) 'Payment' অপশন ব্যবহার করে টাকা পাঠান এবং ফিরতি মেসেজে পাওয়া TrxID এখানে দিন।
                  </p>
                </div>
              </div>

              <button disabled={loading} className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg disabled:opacity-70 transform active:scale-[0.98]">
                {loading ? 'যাচাই করা হচ্ছে...' : 'জমা নিশ্চিত করুন'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}