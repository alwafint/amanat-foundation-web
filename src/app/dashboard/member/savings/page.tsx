'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calculator, Wallet, TrendingUp, CalendarCheck, 
  Info, CheckCircle, X, ChevronRight, Coins, Loader2 
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function SavingsSchemesPage() {
  const [user, setUser] = useState<any>(null);
  const [activeCalcTab, setActiveCalcTab] = useState<'General' | 'FDR' | 'DPS'>('General');
  
  // ক্যালকুলেটর স্টেট
  const [calcAmount, setCalcAmount] = useState<number>(5000);

  // ইউজার সাবস্ক্রিপশন ডাটা
  const [userSubscriptions, setUserSubscriptions] = useState<any[]>([]);
  
  // মডাল ও ফর্ম স্টেট
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(''); // 'General', 'FDR', 'DPS'
  const [applyAmount, setApplyAmount] = useState<string>('');
  const [applyDuration, setApplyDuration] = useState<string>('1 Year');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(localUser);
    if(localUser.mobile) fetchUserSubscriptions(localUser.mobile);
  }, []);

  // ইউজারের বর্তমান স্কিম স্ট্যাটাস চেক করা
  const fetchUserSubscriptions = async (mobile: string) => {
    const { data } = await supabase
      .from('bookings')
      .select('item_name, status')
      .eq('mobile', mobile)
      .eq('service_category', 'SavingsSchemeApply')
      .in('status', ['pending_staff', 'pending_management', 'approved']);
    
    if (data) setUserSubscriptions(data);
  };

  // বাটন স্ট্যাটাস চেক করার ফাংশন
  const getSchemeStatus = (schemeName: string) => {
    const sub = userSubscriptions.find(s => s.item_name === schemeName);
    if (!sub) return null;
    return sub.status === 'approved' ? 'Subscribed' : 'Processing';
  };

  // আবেদন সাবমিট হ্যান্ডলার
  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyAmount) return alert("দয়া করে টাকার পরিমাণ নির্বাচন করুন");

    setLoading(true);
    try {
      const { error } = await supabase.from('bookings').insert([{
        member_name: user?.full_name || 'Guest',
        mobile: user?.mobile,
        service_category: 'SavingsSchemeApply',
        item_name: selectedScheme,
        quantity: `${applyAmount} টাকা`,
        assigned_staff: `মেয়াদ: ${applyDuration}`, // স্টাফ ফিল্ডে মেয়াদ রাখা হচ্ছে আপাতত
        status: 'pending_staff'
      }]);

      if (error) throw error;
      
      alert("আপনার আবেদনটি সফল হয়েছে! শীঘ্রই অনুমোদন করা হবে।");
      setModalOpen(false);
      fetchUserSubscriptions(user.mobile); // স্ট্যাটাস আপডেট
    } catch (err: any) {
      alert("ত্রুটি: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ক্যালকুলেটর লজিক
  const calculateReturn = () => {
    let profit = 0;
    let total = 0;
    
    // ৪০% শেয়ারিং মেথড (আনুমানিক ৪% নেট রিটার্ন)
    if (activeCalcTab === 'DPS') {
        const yearlyDeposit = calcAmount * 12;
        profit = yearlyDeposit * 0.04; 
        total = yearlyDeposit + profit;
    } else {
        profit = calcAmount * 0.04;
        total = calcAmount + profit;
    }
    return { profit, total };
  };
  const result = calculateReturn();

  return (
    <div className="min-h-screen pb-20 bg-slate-50 space-y-8 animate-in fade-in duration-500">
      
      {/* ১. মুনাফা ক্যালকুলেটর */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-emerald-900 p-6 text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Calculator className="text-yellow-400" /> মুনাফা ক্যালকুলেটর
          </h2>
          <p className="text-emerald-200 text-xs mt-1">আপনার বিনিয়োগের সম্ভাব্য মুনাফা (১ বছরে) হিসাব করুন</p>
        </div>

        <div className="p-6">
          <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
            {['General', 'FDR', 'DPS'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveCalcTab(tab as any); setCalcAmount(tab === 'DPS' ? 500 : 10000); }}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${
                  activeCalcTab === tab ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-emerald-600'
                }`}
              >
                {tab === 'General' ? 'সাধারণ' : tab === 'FDR' ? 'ফিক্সড' : 'ডিপিএস'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <label className="text-slate-600 text-xs font-bold uppercase mb-2 block">
                {activeCalcTab === 'DPS' ? 'মাসিক কিস্তি' : 'জমার পরিমাণ'}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-400 font-bold">৳</span>
                <input 
                  type="number" 
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-lg font-bold text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
               <div className="flex justify-between items-center pb-2 border-b border-emerald-200 mb-2">
                  <span className="text-sm text-emerald-800 font-medium">সম্ভাব্য মুনাফা (৪০%)</span>
                  <span className="font-bold text-emerald-700 text-lg">+ ৳ {result.profit.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-900 uppercase">সর্বমোট (১ বছরে)</span>
                  <span className="text-2xl font-extrabold text-emerald-600">৳ {result.total.toLocaleString()}</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* ২. সঞ্চয় স্কিম সমূহ */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-6 pl-2 border-l-4 border-emerald-600">
          আমাদের সঞ্চয় স্কিমসমূহ
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* স্কিম ১: সাধারণ সঞ্চয় */}
            <SchemeCard 
                title="সাধারণ সঞ্চয়" 
                icon={<Wallet size={28}/>}
                desc="যেকোন পরিমাণ টাকা জমা রাখার সুবিধা। কোনো নির্দিষ্ট মেয়াদ নেই।"
                schemeName="General"
                colorClass="text-blue-600 bg-blue-50"
                btnClass="hover:bg-blue-600"
                status={getSchemeStatus('General')}
                onClick={() => {
                    setSelectedScheme('General'); 
                    setApplyAmount(''); 
                    setApplyDuration('Open'); 
                    setModalOpen(true);
                }}
            />

            {/* স্কিম ২: ফিক্সড ডিপোজিট */}
            <SchemeCard 
                title="ফিক্সড ডিপোজিট (FDR)" 
                icon={<TrendingUp size={28}/>}
                desc="১ লক্ষ থেকে ১০ লক্ষ টাকা পর্যন্ত এককালীন জমা। মেয়াদ ১-৫ বছর।"
                schemeName="FDR"
                colorClass="text-emerald-600 bg-emerald-50"
                btnClass="hover:bg-emerald-600"
                badge="জনপ্রিয়"
                status={getSchemeStatus('FDR')}
                onClick={() => {
                    setSelectedScheme('FDR'); 
                    setApplyAmount('100000'); 
                    setApplyDuration('1 Year'); 
                    setModalOpen(true);
                }}
            />

            {/* স্কিম ৩: ডিপিএস */}
            <SchemeCard 
                title="মাসিক ডিপিএস (DPS)" 
                icon={<CalendarCheck size={28}/>}
                desc="প্রতি মাসে ৫০০ থেকে ১০,০০০ টাকা জমার সুযোগ। মেয়াদ ৩/৫/১০ বছর।"
                schemeName="DPS"
                colorClass="text-purple-600 bg-purple-50"
                btnClass="hover:bg-purple-600"
                status={getSchemeStatus('DPS')}
                onClick={() => {
                    setSelectedScheme('DPS'); 
                    setApplyAmount('500'); 
                    setApplyDuration('3 Years'); 
                    setModalOpen(true);
                }}
            />
        </div>
      </div>

      {/* ৩. আবেদন মডাল */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in zoom-in-95 duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl relative flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
               <h3 className="text-lg font-bold text-slate-800">{selectedScheme} শুরু করুন</h3>
               <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20}/></button>
            </div>

            <form onSubmit={handleApply} className="space-y-5 overflow-y-auto">
               
               {/* Amount Selection */}
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">টাকার পরিমাণ নির্বাচন করুন</label>
                 
                 {selectedScheme === 'General' && (
                    <div className="relative">
                       <span className="absolute left-4 top-3.5 text-slate-400 font-bold">৳</span>
                       <input 
                         type="number" 
                         required
                         min={100}
                         value={applyAmount}
                         onChange={(e) => setApplyAmount(e.target.value)}
                         placeholder="পরিমাণ লিখুন (যেমন: ৫০০)"
                         className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-emerald-500 font-bold"
                       />
                    </div>
                 )}

                 {selectedScheme === 'DPS' && (
                    <div className="grid grid-cols-3 gap-3">
                       {[500, 1000, 2500, 5000, 10000].map(amt => (
                          <button 
                            key={amt} 
                            type="button"
                            onClick={() => setApplyAmount(amt.toString())}
                            className={`py-2 px-1 rounded-xl border text-sm font-bold ${applyAmount === amt.toString() ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200'}`}
                          >
                             ৳{amt}
                          </button>
                       ))}
                    </div>
                 )}

                 {selectedScheme === 'FDR' && (
                    <select 
                      value={applyAmount} 
                      onChange={(e) => setApplyAmount(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-emerald-500 font-bold text-slate-700"
                    >
                       {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(lakh => (
                          <option key={lakh} value={lakh * 100000}>{lakh} লক্ষ টাকা</option>
                       ))}
                    </select>
                 )}
               </div>

               {/* Duration Selection */}
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">মেয়াদ / বছর</label>
                  {selectedScheme === 'General' ? (
                     <div className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 text-sm font-bold">
                        অনির্দিষ্ট মেয়াদ (Open)
                     </div>
                  ) : (
                     <select 
                        value={applyDuration} 
                        onChange={(e) => setApplyDuration(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-emerald-500 font-bold text-slate-700"
                     >
                        {selectedScheme === 'FDR' 
                           ? ['1 Year', '2 Years', '3 Years', '4 Years', '5 Years'].map(y => <option key={y} value={y}>{y}</option>)
                           : ['3 Years', '5 Years', '10 Years'].map(y => <option key={y} value={y}>{y}</option>)
                        }
                     </select>
                  )}
               </div>

               <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 flex gap-2">
                  <Info size={16} className="text-emerald-600 shrink-0 mt-0.5"/>
                  <p className="text-xs text-emerald-800">
                     আবেদন করার পর অফিস থেকে আপনার সাথে যোগাযোগ করে অ্যাকাউন্ট কনফার্ম করা হবে।
                  </p>
               </div>

               <button disabled={loading} className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg disabled:opacity-70">
                  {loading ? <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin" size={18}/> প্রসেসিং...</span> : 'আবেদন নিশ্চিত করুন'}
               </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Scheme Card Component
function SchemeCard({ title, icon, desc, colorClass, btnClass, badge, onClick, status }: any) {
    const isSubscribed = status === 'Subscribed';
    const isProcessing = status === 'Processing';
    const isDisabled = isSubscribed || isProcessing;
    
    return (
        <div className={`bg-white p-6 rounded-2xl shadow-sm border ${isDisabled ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-100 hover:shadow-lg'} transition flex flex-col h-full relative overflow-hidden`}>
            {badge && !isDisabled && <div className="absolute top-0 right-0 bg-yellow-400 text-[10px] font-bold px-3 py-1 rounded-bl-xl text-slate-900 shadow-sm">{badge}</div>}
            
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition ${isDisabled ? 'bg-slate-200 text-slate-500' : colorClass}`}>
                {icon}
            </div>
            
            <h4 className="font-bold text-slate-800 text-xl mb-2">{title}</h4>
            <p className="text-sm text-slate-500 mb-6 flex-grow leading-relaxed">{desc}</p>
            
            {isDisabled ? (
                <button disabled className={`w-full py-3 rounded-xl font-bold text-sm flex justify-center items-center gap-2 cursor-not-allowed ${isSubscribed ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-yellow-100 text-yellow-700 border border-yellow-200'}`}>
                    {isSubscribed ? <><CheckCircle size={16}/> সাবস্ক্রাইবড</> : <><Loader2 size={16} className="animate-spin"/> প্রসেসিং...</>}
                </button>
            ) : (
                <button 
                  onClick={onClick} 
                  className={`w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:text-white transition flex justify-center items-center gap-2 ${btnClass}`}
                >
                  শুরু করুন <ChevronRight size={16}/>
                </button>
            )}
        </div>
    );
}