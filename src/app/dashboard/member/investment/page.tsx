'use client';

import React, { useState, useEffect } from 'react';
import { 
  Wallet, Landmark, Calculator, X, Info, 
  Sprout, Store, Car, Laptop, Home, Shirt, 
  Milk, Fish, Hammer, Smartphone, ShoppingBag, 
  ArrowRight, CheckCircle2, Loader2 
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function InvestmentPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [user, setUser] = useState<any>(null);
  
  // ফর্ম স্টেট
  const [selectedItem, setSelectedItem] = useState('');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [purpose, setPurpose] = useState('');

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(localUser);
  }, []);

  const categories = ["All", "কৃষি ও খামার", "ক্ষুদ্র ব্যবসা", "যানবাহন", "প্রযুক্তি ও দক্ষতা", "গৃহ ও অন্যান্য"];

  // স্টাইলিং হেল্পার
  const getCategoryStyle = (category: string) => {
    switch (category) {
      case "কৃষি ও খামার": return { bg: "bg-emerald-50", border: "border-emerald-100", iconBg: "bg-emerald-100", iconColor: "text-emerald-600", badge: "bg-emerald-200 text-emerald-800", btn: "bg-emerald-600 hover:bg-emerald-700" };
      case "ক্ষুদ্র ব্যবসা": return { bg: "bg-blue-50", border: "border-blue-100", iconBg: "bg-blue-100", iconColor: "text-blue-600", badge: "bg-blue-200 text-blue-800", btn: "bg-blue-600 hover:bg-blue-700" };
      case "যানবাহন": return { bg: "bg-orange-50", border: "border-orange-100", iconBg: "bg-orange-100", iconColor: "text-orange-600", badge: "bg-orange-200 text-orange-800", btn: "bg-orange-600 hover:bg-orange-700" };
      case "প্রযুক্তি ও দক্ষতা": return { bg: "bg-violet-50", border: "border-violet-100", iconBg: "bg-violet-100", iconColor: "text-violet-600", badge: "bg-violet-200 text-violet-800", btn: "bg-violet-600 hover:bg-violet-700" };
      default: return { bg: "bg-rose-50", border: "border-rose-100", iconBg: "bg-rose-100", iconColor: "text-rose-600", badge: "bg-rose-200 text-rose-800", btn: "bg-rose-600 hover:bg-rose-700" };
    }
  };

  const investmentItems = [
    { title: "হাঁস-মুরগি ও ছাগল পালন", category: "কৃষি ও খামার", icon: <Sprout size={28}/>, desc: "পারিবারিক পর্যায়ে পালনের জন্য স্বল্প পুঁজি।" },
    { title: "মুদি দোকান সম্প্রসারণ", category: "ক্ষুদ্র ব্যবসা", icon: <Store size={28}/>, desc: "দোকানে মাল তোলার জন্য পণ্য-ভিত্তিক পুঁজি।" },
    { title: "অটো ভ্যান বা রিক্সা", category: "যানবাহন", icon: <Car size={28}/>, desc: "পণ্য বা যাত্রী পরিবহনের বাহন ক্রয়।" },
    { title: "কম্পিউটার ও আইটি সেন্টার", category: "প্রযুক্তি ও দক্ষতা", icon: <Laptop size={28}/>, desc: "কম্পিউটার টাইপ, প্রিন্ট ও ইন্টারনেট সেবা।" },
    { title: "টিনের ঘর তৈরি", category: "গৃহ ও অন্যান্য", icon: <Home size={28}/>, desc: "বসতঘর নির্মাণ বা মেরামতের সামগ্রী।" },
    { title: "দুগ্ধ খামার / গাভী পালন", category: "কৃষি ও খামার", icon: <Milk size={28}/>, desc: "উন্নত জাতের গাভী ক্রয় ও লালন-পালন।" },
    { title: "ফেরিওয়ালা বা হকার", category: "ক্ষুদ্র ব্যবসা", icon: <ShoppingBag size={28}/>, desc: "ভ্যানে বা পায়ে হেঁটে পণ্য বিক্রির মালামাল।" },
    { title: "ইলেকট্রিক অটো/ইজি বাইক", category: "যানবাহন", icon: <Car size={28}/>, desc: "ব্যাটারি চালিত ইজি বাইক ক্রয়ের সুবিধা।" },
    { title: "মোবাইল সার্ভিসিং ল্যাব", category: "প্রযুক্তি ও দক্ষতা", icon: <Smartphone size={28}/>, desc: "মোবাইল মেরামতের আধুনিক যন্ত্রপাতি।" },
    { title: "স্যানিটেশন ও টিউবওয়েল", category: "গৃহ ও অন্যান্য", icon: <Hammer size={28}/>, desc: "স্বাস্থ্যসম্মত ল্যাট্রিন ও বিশুদ্ধ পানি।" },
    { title: "মাছ চাষ প্রজেক্ট", category: "কৃষি ও খামার", icon: <Fish size={28}/>, desc: "পুকুর বা বায়োফ্লক পদ্ধতিতে মাছ চাষ।" },
    { title: "মিনি গার্মেন্টস/সেলাই", category: "ক্ষুদ্র ব্যবসা", icon: <Shirt size={28}/>, desc: "সেলাই মেশিন বা ছোট গার্মেন্টস মেশিনারি।" },
    { title: "ফসল স্টক ব্যবসা", category: "কৃষি ও খামার", icon: <Landmark size={28}/>, desc: "সিজনে ফসল কিনে স্টক করার বড় পুঁজি।" },
    { title: "ফ্রিল্যান্সিং গিয়ার", category: "প্রযুক্তি ও দক্ষতা", icon: <Laptop size={28}/>, desc: "ফ্রিল্যান্সিংয়ের জন্য হাই-কনফিগারেশন পিসি।" },
    { title: "রাইড শেয়ারিং বাইক", category: "যানবাহন", icon: <Car size={28}/>, desc: "ভাড়ায় বা রাইড শেয়ারিংয়ে বাইক চালানো।" },
  ];

  const filteredItems = activeTab === 'All' ? investmentItems : investmentItems.filter(item => item.category === activeTab);

  // আবেদন সাবমিট হ্যান্ডলার
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('bookings').insert([{
        member_name: user?.full_name || 'Guest', 
        mobile: user?.mobile,
        service_category: 'Investment', 
        item_name: selectedItem,
        quantity: `টাকা: ${amount}, মেয়াদ: ${duration} মাস`, 
        assigned_staff: `উদ্দেশ্য: ${purpose}`,
        status: 'pending_staff'
      }]);

      if (error) throw error;
      
      alert("বিনিয়োগের আবেদন সফল হয়েছে! অফিস থেকে শীঘ্রই যোগাযোগ করা হবে।");
      setModalOpen(false); 
      setAmount(''); 
      setDuration(''); 
      setPurpose('');
    } catch (err: any) { 
      alert("ত্রুটি: " + err.message); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-slate-50 animate-in fade-in duration-500">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white mb-10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">বিনিয়োগ ও লোন</h1>
          <p className="text-slate-300 text-lg">সহজ শর্তে পণ্য ভিত্তিক হালাল বিনিয়োগ সুবিধা গ্রহণ করুন।</p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-6 mb-2 custom-scrollbar px-1">
        {categories.map((cat, idx) => (
          <button key={idx} onClick={() => setActiveTab(cat)} className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === cat ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>{cat}</button>
        ))}
      </div>

      {/* Investment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => {
          const style = getCategoryStyle(item.category);
          return (
            <div key={index} className={`relative bg-white rounded-3xl p-6 border ${style.border} shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 flex flex-col h-full`}>
              <div className="flex justify-between items-start mb-5 relative z-10">
                <div className={`w-14 h-14 ${style.iconBg} ${style.iconColor} rounded-2xl flex items-center justify-center shadow-inner`}>
                  {item.icon}
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${style.badge}`}>{item.category}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{item.desc}</p>
              <button onClick={() => { setSelectedItem(item.title); setModalOpen(true); }} className={`mt-auto w-full py-3 rounded-xl text-white font-bold text-sm shadow-md transition-all flex justify-center items-center gap-2 ${style.btn}`}>
                আবেদন করুন <ArrowRight size={16}/>
              </button>
            </div>
          );
        })}
      </div>

      {/* Application Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in zoom-in-95 duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 relative">
            
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{selectedItem}</h3>
                <p className="text-xs text-slate-500">বিনিয়োগের আবেদন ফর্ম</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition"><X size={20}/></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">টাকার পরিমাণ</label>
                <div className="relative">
                   <span className="absolute left-4 top-3.5 text-slate-400 font-bold">৳</span>
                   <input 
                     type="number" 
                     required 
                     onChange={(e) => setAmount(e.target.value)} 
                     className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-slate-800 font-bold text-slate-800" 
                     placeholder="প্রয়োজনীয় টাকা" 
                   />
                </div>
              </div>

              {/* Duration Select (Updated: 3, 6, 12 months only) */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">কিস্তির মেয়াদ</label>
                <select 
                  required 
                  onChange={(e) => setDuration(e.target.value)} 
                  className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-slate-800 bg-white text-slate-700 font-medium"
                >
                  <option value="">মেয়াদ নির্বাচন করুন</option>
                  <option value="3">৩ মাস</option>
                  <option value="6">৬ মাস</option>
                  <option value="12">১২ মাস</option>
                </select>
              </div>

              {/* Purpose Textarea */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">বিনিয়োগের উদ্দেশ্য</label>
                <textarea 
                  required 
                  onChange={(e) => setPurpose(e.target.value)} 
                  className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-slate-800 text-sm h-24 resize-none" 
                  placeholder="কিভাবে এই টাকা কাজে লাগাবেন বিস্তারিত লিখুন..." 
                />
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 flex gap-2">
                  <Info size={16} className="text-emerald-600 shrink-0 mt-0.5"/>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                     আপনার আবেদনটি যাচাই করার পর আমাদের ফিল্ড অফিসার আপনার সাথে যোগাযোগ করবেন।
                  </p>
               </div>

              <button disabled={loading} className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg disabled:opacity-70 active:scale-[0.98]">
                {loading ? <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin" size={18}/> প্রসেসিং...</span> : 'আবেদন নিশ্চিত করুন'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}