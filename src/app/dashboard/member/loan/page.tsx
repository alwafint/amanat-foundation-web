'use client';

import React, { useState, useEffect } from 'react';
import { 
  CreditCard, Calendar, CheckCircle, AlertCircle, 
  TrendingUp, Banknote, X, History, FileText,
  PieChart, ArrowRight
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function LoanStatusPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // পেমেন্ট ফর্ম স্টেট
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bkash');
  const [trxID, setTrxID] = useState('');

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(localUser);
  }, []);

  // --- ডামি ডাটা (বাস্তবে ডাটাবেজ থেকে আসবে) ---
  const activeLoan = {
    id: "LN-2024-001",
    type: "ব্যবসা লোন (Business Loan)",
    totalAmount: 50000,
    paidAmount: 35000,
    remainingAmount: 15000,
    nextInstallment: 2500,
    nextDueDate: "১৫ নভেম্বর, ২০২৪",
    status: "Active", // Active, Pending, Closed
    progress: 70 // (35000 / 50000) * 100
  };

  const loanHistory = [
    { id: 1, date: "১০ অক্টো, ২০২৪", amount: 2500, method: "bKash", status: "Approved" },
    { id: 2, date: "১০ সেপ্টে, ২০২৪", amount: 2500, method: "Cash", status: "Approved" },
    { id: 3, date: "১০ আগস্ট, ২০২৪", amount: 2500, method: "Agent", status: "Approved" },
    { id: 4, date: "১০ জুলাই, ২০২৪", amount: 2500, method: "bKash", status: "Pending" },
  ];

  // কিস্তি জমার হ্যান্ডলার
  const handleRepayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('bookings').insert([{
        member_name: user?.full_name || 'Guest',
        mobile: user?.mobile,
        service_category: 'LoanRepayment',
        item_name: `কিস্তি পরিশোধ (${activeLoan.id})`,
        quantity: amount + ' টাকা',
        assigned_staff: `মাধ্যম: ${method}, TrxID: ${trxID}`,
        status: 'pending'
      }]);

      if (error) throw error;
      alert("কিস্তি জমার রিকোয়েস্ট সফল হয়েছে! অফিস থেকে ভেরিফাই করা হবে।");
      setModalOpen(false); setAmount(''); setTrxID('');
    } catch (err: any) {
      alert("সমস্যা হয়েছে: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12 bg-slate-50/50">
      
      {/* --- HEADER BANNER --- */}
      <div className="bg-gradient-to-r from-blue-800 to-cyan-600 rounded-3xl p-8 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">লোন স্ট্যাটাস</h1>
              <p className="text-blue-100 text-sm">আপনার চলমান ঋণ এবং পরিশোধের বিবরণ</p>
            </div>
            {/* Status Badge */}
            <span className={`px-4 py-1.5 border rounded-full text-sm font-bold backdrop-blur-sm flex items-center gap-2 ${activeLoan.status === 'Active' ? 'bg-green-500/20 border-green-400 text-green-100' : 'bg-white/20'}`}>
              <CheckCircle size={16}/> {activeLoan.status === 'Active' ? 'চলমান ঋণ' : 'ঋণ নেই'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: ACTIVE LOAN DETAILS --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Card */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">লোনের ধরন</p>
                <h2 className="text-2xl font-bold text-slate-800">{activeLoan.type}</h2>
                <p className="text-xs text-slate-400 mt-1 font-mono">ID: {activeLoan.id}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <PieChart size={24}/>
              </div>
            </div>

            {/* Progress Bar Area */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-slate-600">পরিশোধিত: {activeLoan.progress}%</span>
                <span className="font-bold text-red-500">বাকি আছে: {100 - activeLoan.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-4 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${activeLoan.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Amount Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center md:text-left">
                <p className="text-xs text-slate-500 mb-1 uppercase font-bold">মোট ঋণ</p>
                <p className="text-xl font-extrabold text-slate-800">৳ {activeLoan.totalAmount.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center md:text-left">
                <p className="text-xs text-emerald-600 mb-1 uppercase font-bold">পরিশোধিত</p>
                <p className="text-xl font-extrabold text-emerald-700">৳ {activeLoan.paidAmount.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100 text-center md:text-left">
                <p className="text-xs text-red-600 mb-1 uppercase font-bold">পরিশোধ বাকি</p>
                <p className="text-xl font-extrabold text-red-700">৳ {activeLoan.remainingAmount.toLocaleString()}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setModalOpen(true)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 flex justify-center items-center gap-2 active:scale-[0.98]"
              >
                <Banknote size={18}/> কিস্তি দিন
              </button>
              <button className="flex-1 bg-white text-slate-600 border border-slate-200 py-3 rounded-xl font-bold hover:bg-slate-50 transition flex justify-center items-center gap-2">
                <FileText size={18}/> স্টেটমেন্ট দেখুন
              </button>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <History size={20} className="text-blue-500"/> পূর্ববর্তী লেনদেন
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs text-slate-400 uppercase border-b border-slate-100">
                    <th className="pb-3 font-semibold pl-2">তারিখ</th>
                    <th className="pb-3 font-semibold">মাধ্যম</th>
                    <th className="pb-3 font-semibold text-right">পরিমাণ</th>
                    <th className="pb-3 font-semibold text-right pr-2">স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {loanHistory.map((item) => (
                    <tr key={item.id} className="group hover:bg-slate-50 transition">
                      <td className="py-3 pl-2 text-slate-600 border-b border-slate-50">{item.date}</td>
                      <td className="py-3 text-slate-600 border-b border-slate-50">{item.method}</td>
                      <td className="py-3 text-slate-800 font-bold text-right border-b border-slate-50">৳ {item.amount}</td>
                      <td className="py-3 text-right border-b border-slate-50 pr-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          item.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: ALERTS & INFO --- */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Next Installment Card */}
          <div className="bg-white p-6 rounded-3xl shadow-lg border-t-4 border-orange-500 relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Calendar size={64} className="text-orange-500"/>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-full text-orange-600">
                <AlertCircle size={24}/>
              </div>
              <h3 className="font-bold text-slate-800">পরবর্তী কিস্তি</h3>
            </div>
            <div className="text-center py-6 bg-orange-50 rounded-2xl mb-4 border border-orange-100">
              <p className="text-sm text-orange-700 mb-1 font-medium">পরিমাণ</p>
              <p className="text-4xl font-extrabold text-orange-600">৳ {activeLoan.nextInstallment}</p>
              <div className="mt-3 inline-block bg-white px-3 py-1 rounded-full border border-orange-200 text-xs font-bold text-orange-800">
                তারিখ: {activeLoan.nextDueDate}
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center leading-relaxed">
              জরিমানা এড়াতে নির্ধারিত তারিখের মধ্যে কিস্তি পরিশোধ করার অনুরোধ রইল।
            </p>
          </div>

          {/* Need Help */}
          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 text-center">
            <h4 className="font-bold text-blue-900 mb-2">কিস্তি দিতে সমস্যা হচ্ছে?</h4>
            <p className="text-sm text-blue-700 mb-4">
              যেকোনো প্রয়োজনে আমাদের লোন অফিসারের সাথে কথা বলুন।
            </p>
            <a href="tel:017XXXXXXXX" className="inline-flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-blue-100 transition">
              <CreditCard size={16}/> লোন অফিসারকে কল করুন
            </a>
          </div>

        </div>
      </div>

      {/* --- REPAYMENT MODAL --- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in zoom-in-95">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800">কিস্তি পরিশোধ</h3>
                <p className="text-xs text-slate-500">চলমান লোন ID: {activeLoan.id}</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition"><X/></button>
            </div>

            <form onSubmit={handleRepayment} className="space-y-5 overflow-y-auto custom-scrollbar">
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">টাকার পরিমাণ</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-slate-400 font-bold">৳</span>
                  <input 
                    type="number" 
                    required 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-blue-500 font-bold text-slate-800" 
                    placeholder={activeLoan.nextInstallment.toString()} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">পেমেন্ট মেথড</label>
                <div className="grid grid-cols-3 gap-3">
                  {['bkash', 'nagad', 'rocket'].map((m) => (
                    <div 
                      key={m} 
                      onClick={() => setMethod(m)}
                      className={`border-2 p-2 rounded-xl cursor-pointer text-center text-sm font-bold uppercase transition ${method === m ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500'}`}
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">TrxID (ট্রানজেকশন আইডি)</label>
                <input 
                  type="text" 
                  required 
                  value={trxID}
                  onChange={(e) => setTrxID(e.target.value)} 
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-blue-500 text-sm font-mono uppercase" 
                  placeholder="8N7A6D..." 
                />
              </div>

              <div className="bg-orange-50 p-3 rounded-xl text-xs text-orange-800 border border-orange-100 flex gap-2 items-start">
                <AlertCircle size={16} className="shrink-0 mt-0.5"/>
                <span>টাকা পাঠানোর পর TrxID টি সঠিকভাবে লিখুন। ভুল হলে পেমেন্ট ভেরিফাই হবে না।</span>
              </div>

              <button disabled={loading} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg disabled:opacity-70 active:scale-[0.98]">
                {loading ? 'যাচাই করা হচ্ছে...' : 'জমা নিশ্চিত করুন'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}