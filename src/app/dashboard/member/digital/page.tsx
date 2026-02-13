'use client';

import React, { useState, useEffect } from 'react';
import { 
  Smartphone, Zap, Wifi, FileText, Plane, Fingerprint, 
  X, Send, PhoneCall, CreditCard, Globe
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient'; 

export default function DigitalServicePage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // --- STATES FOR FORMS ---
  const [mobileNo, setMobileNo] = useState('');
  const [operator, setOperator] = useState('Grameenphone');
  const [amount, setAmount] = useState('');
  const [billType, setBillType] = useState('Electricity');
  const [accountNo, setAccountNo] = useState('');

  // --- INITIALIZATION ---
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(localUser);
  }, []);

  // --- SUBMIT HANDLER ---
  const submitData = async (serviceName: string, details: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.from('bookings').insert([{
        member_name: user?.full_name || 'Guest',
        mobile: user?.mobile || mobileNo,
        service_category: 'Digital Service',
        item_name: serviceName,
        description: details,
        status: 'pending',
        required_date: new Date().toISOString()
      }]);

      if (error) throw error;
      alert("আবেদন সফল হয়েছে! আমাদের প্রতিনিধি দ্রুত প্রসেস করবে।");
      setActiveModal(null);
      
      // Reset
      setMobileNo(''); setAmount(''); setAccountNo('');
    } catch (err: any) {
      alert("সমস্যা হয়েছে: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- SERVICES LIST ---
  const digitalServices = [
    {
      id: 'recharge',
      title: "মোবাইল রিচার্জ",
      icon: <Smartphone />,
      desc: "যেকোনো নাম্বারে ফ্লেক্সিলোড বা রিচার্জ।",
      color: "emerald",
      badge: "Fast"
    },
    {
      id: 'utility',
      title: "বিল পেমেন্ট",
      icon: <Zap />,
      desc: "বিদ্যুৎ, গ্যাস বা পানির বিল পরিশোধ।",
      color: "yellow",
      badge: "Easy"
    },
    {
      id: 'internet',
      title: "ইন্টারনেট বিল",
      icon: <Wifi />,
      desc: "ওয়াইফাই বা ব্রডব্যান্ড বিল দিন ঘরে বসেই।",
      color: "cyan",
      badge: "No Fee"
    },
    {
      id: 'birth',
      title: "জন্ম নিবন্ধন",
      icon: <FileText />,
      desc: "নতুন জন্ম নিবন্ধন বা সংশোধনের আবেদন।",
      color: "purple",
      badge: "Official"
    },
    {
      id: 'passport',
      title: "পাসপোর্ট ফি",
      icon: <Plane />,
      desc: "ই-পাসপোর্ট ফি জমা ও ফর্ম পূরণ।",
      color: "blue",
      badge: "Secure"
    },
    {
      id: 'nid',
      title: "এনআইডি সেবা",
      icon: <Fingerprint />,
      desc: "ভোটার আইডি কার্ড সংশোধন বা হারানো কার্ড।",
      color: "rose",
      badge: "Govt"
    }
  ];

  return (
    <div className="relative min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-700 to-blue-600 rounded-2xl p-6 md:p-8 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">ডিজিটাল সেবা কেন্দ্র</h1>
          <p className="text-cyan-100 text-sm md:text-base opacity-90">
            মোবাইল রিচার্জ, বিল পেমেন্ট এবং সরকারি সব ই-সেবা এখন হাতের মুঠোয়।
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {digitalServices.map((item) => {
          // Dynamic styles based on color
          const colorStyles: any = {
            emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "hover:border-emerald-400" },
            yellow: { bg: "bg-yellow-50", text: "text-yellow-600", border: "hover:border-yellow-400" },
            cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "hover:border-cyan-400" },
            purple: { bg: "bg-purple-50", text: "text-purple-600", border: "hover:border-purple-400" },
            blue: { bg: "bg-blue-50", text: "text-blue-600", border: "hover:border-blue-400" },
            rose: { bg: "bg-rose-50", text: "text-rose-600", border: "hover:border-rose-400" },
          };
          const style = colorStyles[item.color] || colorStyles.emerald;

          return (
            <div 
              key={item.id}
              onClick={() => setActiveModal(item.id)}
              className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all duration-300 cursor-pointer group hover:-translate-y-1 ${style.border}`}
            >
              <div className="flex justify-between items-start mb-4">
                {/* --- FIX: Added <any> to ReactElement --- */}
                <div className={`w-14 h-14 ${style.bg} ${style.text} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {React.cloneElement(item.icon as React.ReactElement<any>, { size: 28 })}
                </div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${style.bg} ${style.text}`}>
                  {item.badge}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* --- MODALS --- */}

      {/* 1. RECHARGE MODAL */}
      {activeModal === 'recharge' && (
        <ModalWrapper title="মোবাইল রিচার্জ" icon={<Smartphone size={24}/>} onClose={() => setActiveModal(null)} colorClass="from-emerald-600 to-emerald-500">
          <form onSubmit={(e) => { e.preventDefault(); submitData('Mobile Recharge', `${operator} - ${mobileNo}, Amount: ${amount}`); }} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">অপারেটর</label>
              <select value={operator} onChange={(e) => setOperator(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500">
                <option>Grameenphone</option>
                <option>Banglalink</option>
                <option>Robi</option>
                <option>Airtel</option>
                <option>Teletalk</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">মোবাইল নম্বর</label>
              <input type="tel" required value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="017xxxxxxxx" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">টাকার পরিমাণ</label>
              <input type="number" required value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="50" />
            </div>
            <button disabled={loading} className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700">{loading ? 'অপেক্ষা করুন...' : 'রিচার্জ করুন'}</button>
          </form>
        </ModalWrapper>
      )}

      {/* 2. UTILITY / INTERNET MODAL */}
      {(activeModal === 'utility' || activeModal === 'internet') && (
        <ModalWrapper title="বিল পেমেন্ট" icon={<CreditCard size={24}/>} onClose={() => setActiveModal(null)} colorClass="from-cyan-600 to-blue-500">
          <form onSubmit={(e) => { e.preventDefault(); submitData('Bill Payment', `${billType} - Acc: ${accountNo}, Amount: ${amount}`); }} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">বিলের ধরণ</label>
              <select value={billType} onChange={(e) => setBillType(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500">
                <option>পল্লী বিদ্যুৎ (Prepaid)</option>
                <option>পল্লী বিদ্যুৎ (Postpaid)</option>
                <option>ইন্টারনেট / ওয়াইফাই</option>
                <option>গ্যাস বিল</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">অ্যাকাউন্ট / মিটার নং</label>
              <input type="text" required value={accountNo} onChange={(e) => setAccountNo(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">বিলের পরিমাণ</label>
              <input type="number" required value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500" placeholder="500" />
            </div>
            <button disabled={loading} className="w-full bg-cyan-600 text-white py-3 rounded-lg font-bold hover:bg-cyan-700">{loading ? 'অপেক্ষা করুন...' : 'বিল পরিশোধ করুন'}</button>
          </form>
        </ModalWrapper>
      )}

      {/* 3. GOVT SERVICES MODAL (Birth/Passport/NID) */}
      {(activeModal === 'birth' || activeModal === 'passport' || activeModal === 'nid') && (
        <ModalWrapper title="সরকারি ই-সেবা" icon={<Globe size={24}/>} onClose={() => setActiveModal(null)} colorClass="from-purple-600 to-pink-500">
           <form onSubmit={(e) => { e.preventDefault(); submitData('Govt Service', `Service: ${activeModal}, Note: ${accountNo}`); }} className="space-y-4">
            <div className="bg-purple-50 p-3 rounded text-sm text-purple-700 mb-4">
              এই সেবার জন্য আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করে প্রয়োজনীয় কাগজপত্র সংগ্রহ করবেন।
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">আপনার নাম</label>
              <input type="text" defaultValue={user?.full_name} disabled className="w-full p-3 border rounded-lg bg-slate-100" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">মোবাইল নম্বর</label>
              <input type="tel" defaultValue={user?.mobile} disabled className="w-full p-3 border rounded-lg bg-slate-100" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">কি প্রয়োজন? (বিস্তারিত)</label>
              <textarea rows={3} required value={accountNo} onChange={(e) => setAccountNo(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="যেমন: নতুন জন্ম নিবন্ধনের আবেদন..."></textarea>
            </div>
            <button disabled={loading} className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700">{loading ? 'অপেক্ষা করুন...' : 'আবেদন জমা দিন'}</button>
          </form>
        </ModalWrapper>
      )}

    </div>
  );
}

// --- REUSABLE MODAL WRAPPER ---
function ModalWrapper({ title, icon, onClose, colorClass, children }: any) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className={`bg-gradient-to-r ${colorClass} p-5 text-white shrink-0 flex justify-between items-center`}>
          <h3 className="text-xl font-bold flex items-center gap-2">{icon} {title}</h3>
          <button onClick={onClose} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition text-white"><X size={24} /></button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}