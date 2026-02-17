'use client';

import React, { useState, useEffect } from 'react';
import { 
  CreditCard, Calendar, CheckCircle, AlertCircle, 
  TrendingUp, Banknote, X, History, FileText,
  PieChart, ArrowRight, Loader2, Coins
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function LoanStatusPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // লোন ডাটা স্টেট
  const [activeLoans, setActiveLoans] = useState<any[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const [loanHistory, setLoanHistory] = useState<any[]>([]);

  // পেমেন্ট ফর্ম স্টেট
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bkash');
  const [trxID, setTrxID] = useState('');

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(localUser);
    if(localUser.mobile) {
      fetchActiveLoans(localUser.mobile);
      fetchLoanHistory(localUser.mobile);
    }
  }, []);

  // ১. একটিভ লোন ফেচ করা (যেগুলো Approved Investment)
  const fetchActiveLoans = async (mobile: string) => {
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .eq('mobile', mobile)
      .eq('service_category', 'Investment')
      .eq('status', 'approved'); // শুধুমাত্র অনুমোদিত লোন
    
    if (data) setActiveLoans(data);
  };

  // ২. লোন পরিশোধের হিস্ট্রি ফেচ করা
  const fetchLoanHistory = async (mobile: string) => {
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .eq('mobile', mobile)
      .eq('service_category', 'LoanRepayment')
      .order('created_at', { ascending: false });

    if (data) setLoanHistory(data);
  };

  // ৩. কিস্তি জমার হ্যান্ডলার
  const handleRepayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!selectedLoan) return;
    setLoading(true);

    try {
      const { error } = await supabase.from('bookings').insert([{
        member_name: user?.full_name || 'Guest',
        mobile: user?.mobile,
        service_category: 'LoanRepayment',
        item_name: `কিস্তি পরিশোধ (${selectedLoan.item_name})`, // লোনের নাম রেফারেন্স হিসেবে
        quantity: amount + ' টাকা',
        assigned_staff: `মাধ্যম: ${method}, TrxID: ${trxID}, LoanID: ${selectedLoan.id}`,
        status: 'pending_staff'
      }]);

      if (error) throw error;
      alert("কিস্তি জমার রিকোয়েস্ট সফল হয়েছে! অফিস থেকে ভেরিফাই করা হবে।");
      setModalOpen(false); setAmount(''); setTrxID('');
      fetchLoanHistory(user.mobile); // হিস্ট্রি রিফ্রেশ
    } catch (err: any) {
      alert("সমস্যা হয়েছে: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ক্যালকুলেশন হেল্পার (মোট পরিশোধিত বের করা)
  const getTotalPaid = () => {
    return loanHistory
      .filter(h => h.status === 'approved')
      .reduce((acc, curr) => acc + parseInt(curr.quantity), 0);
  };

  return (
    <div className="min-h-screen pb-20 bg-slate-50 space-y-8 animate-in fade-in duration-500">
      
      {/* --- HEADER BANNER --- */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
               <CreditCard size={32}/> লোন স্ট্যাটাস
            </h1>
            <p className="text-blue-200 text-sm">আপনার চলমান বিনিয়োগ ও পরিশোধের বিবরণ</p>
          </div>
          <div className="flex gap-3">
             <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <p className="text-xs text-blue-200 uppercase font-bold">মোট লোন</p>
                <p className="text-xl font-bold">{activeLoans.length} টি</p>
             </div>
             <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <p className="text-xs text-blue-200 uppercase font-bold">মোট পরিশোধ</p>
                <p className="text-xl font-bold">৳ {getTotalPaid().toLocaleString()}</p>
             </div>
          </div>
        </div>
      </div>

      {activeLoans.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
           <Coins size={48} className="mx-auto text-slate-300 mb-3"/>
           <h3 className="text-xl font-bold text-slate-700">কোনো চলমান লোন নেই</h3>
           <p className="text-slate-500 text-sm mt-1">আপনি এখনো কোনো বিনিয়োগ বা লোন গ্রহণ করেননি।</p>
           <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700">
              বিনিয়োগের জন্য আবেদন করুন
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: ACTIVE LOANS LIST --- */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
               <TrendingUp className="text-blue-600"/> আপনার চলমান লোনসমূহ
            </h3>

            {activeLoans.map((loan) => {
               // লোন অ্যামাউন্ট পার্স করা (quantity থেকে)
               const loanAmount = parseInt(loan.quantity.replace(/[^0-9]/g, '')) || 0;
               // এই নির্দিষ্ট লোনের পরিশোধিত অ্যামাউন্ট বের করা (Assigned staff এ loanID চেক করে)
               const paidForThisLoan = loanHistory
                 .filter(h => h.status === 'approved' && h.assigned_staff?.includes(loan.id))
                 .reduce((acc, curr) => acc + parseInt(curr.quantity), 0);
               
               const remaining = loanAmount - paidForThisLoan;
               const progress = Math.min(100, Math.round((paidForThisLoan / loanAmount) * 100));

               return (
                  <div key={loan.id} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-blue-300 transition">
                     <div className="flex justify-between items-start mb-6">
                        <div>
                           <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">প্রজেক্ট / খাত</p>
                           <h2 className="text-2xl font-bold text-slate-800">{loan.item_name}</h2>
                           <p className="text-xs text-slate-400 mt-1 font-mono">Loan ID: {loan.id}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-inner">
                           <PieChart size={24}/>
                        </div>
                     </div>

                     {/* Progress Bar */}
                     <div className="mb-8">
                        <div className="flex justify-between text-sm mb-2">
                           <span className="font-bold text-emerald-600">পরিশোধিত: {progress}%</span>
                           <span className="font-bold text-slate-400">বাকি: {100 - progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                           <div 
                              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-3 rounded-full transition-all duration-1000 ease-out" 
                              style={{ width: `${progress}%` }}
                           ></div>
                        </div>
                     </div>

                     {/* Amount Grid */}
                     <div className="grid grid-cols-3 gap-4 mb-8 text-center md:text-left">
                        <div>
                           <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">মোট লোন</p>
                           <p className="text-lg font-bold text-slate-800">৳ {loanAmount.toLocaleString()}</p>
                        </div>
                        <div>
                           <p className="text-[10px] text-emerald-600 font-bold uppercase mb-1">পরিশোধিত</p>
                           <p className="text-lg font-bold text-emerald-600">৳ {paidForThisLoan.toLocaleString()}</p>
                        </div>
                        <div>
                           <p className="text-[10px] text-red-500 font-bold uppercase mb-1">বাকি আছে</p>
                           <p className="text-lg font-bold text-red-500">৳ {remaining.toLocaleString()}</p>
                        </div>
                     </div>

                     {/* Action Button */}
                     <button 
                        onClick={() => { setSelectedLoan(loan); setModalOpen(true); }}
                        className="w-full bg-slate-50 text-slate-700 py-3 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition border border-slate-200 flex justify-center items-center gap-2 group-hover:border-blue-500"
                     >
                        <Banknote size={18}/> কিস্তি পরিশোধ করুন
                     </button>
                  </div>
               );
            })}
          </div>

          {/* --- RIGHT COLUMN: HISTORY --- */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-full">
               <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <History size={20} className="text-slate-400"/> পরিশোধের ইতিহাস
               </h3>
               
               <div className="space-y-4">
                  {loanHistory.length > 0 ? loanHistory.map((item) => (
                     <div key={item.id} className="flex justify-between items-center group p-3 hover:bg-slate-50 rounded-xl transition border-b border-slate-50 last:border-0">
                        <div>
                           <p className="font-bold text-slate-700 text-sm">{item.item_name}</p>
                           <p className="text-xs text-slate-400 font-mono mt-0.5">{new Date(item.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                           <span className="block font-bold text-sm text-emerald-600">
                              - ৳{parseInt(item.quantity).toLocaleString()}
                           </span>
                           <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              item.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'
                           }`}>
                              {item.status}
                           </span>
                        </div>
                     </div>
                  )) : (
                     <p className="text-center text-slate-400 text-sm py-10">কোনো লেনদেন পাওয়া যায়নি</p>
                  )}
               </div>
            </div>
          </div>

        </div>
      )}

      {/* --- REPAYMENT MODAL --- */}
      {modalOpen && selectedLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in zoom-in-95">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800">কিস্তি পরিশোধ</h3>
                <p className="text-xs text-slate-500">লোন: {selectedLoan.item_name}</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition"><X size={20}/></button>
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
                    placeholder="Example: 5000" 
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
                <span>মার্চেন্ট নম্বরে পেমেন্ট করার পর সঠিক TrxID দিন। ভুল হলে পেমেন্ট বাতিল হতে পারে।</span>
              </div>

              <button disabled={loading} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg disabled:opacity-70 active:scale-[0.98]">
                {loading ? <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin" size={18}/> যাচাই করা হচ্ছে...</span> : 'জমা নিশ্চিত করুন'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}