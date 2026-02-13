'use client';

import React, { useState } from 'react';
import { 
  Wallet, Landmark, Calculator, X, Info, 
  Sprout, Store, Car, Laptop, Home, Shirt, 
  Milk, Fish, Hammer, Smartphone, ShoppingBag, 
  ArrowRight, CheckCircle2 
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function InvestmentPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  
  // ফর্ম স্টেট
  const [selectedItem, setSelectedItem] = useState('');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [purpose, setPurpose] = useState('');

  // ক্যাটাগরি লিস্ট
  const categories = ["All", "কৃষি ও খামার", "ক্ষুদ্র ব্যবসা", "যানবাহন", "প্রযুক্তি ও দক্ষতা", "গৃহ ও অন্যান্য"];

  // --- স্টাইল জেনারেটর ফাংশন (কার্ডের ভিন্নতার জন্য) ---
  const getCategoryStyle = (category: string) => {
    switch (category) {
      case "কৃষি ও খামার":
        return {
          bg: "bg-emerald-50", border: "border-emerald-100", 
          iconBg: "bg-emerald-100", iconColor: "text-emerald-600", 
          badge: "bg-emerald-200 text-emerald-800", btn: "bg-emerald-600 hover:bg-emerald-700",
          accent: "from-emerald-500 to-green-400"
        };
      case "ক্ষুদ্র ব্যবসা":
        return {
          bg: "bg-blue-50", border: "border-blue-100", 
          iconBg: "bg-blue-100", iconColor: "text-blue-600", 
          badge: "bg-blue-200 text-blue-800", btn: "bg-blue-600 hover:bg-blue-700",
          accent: "from-blue-500 to-cyan-400"
        };
      case "যানবাহন":
        return {
          bg: "bg-orange-50", border: "border-orange-100", 
          iconBg: "bg-orange-100", iconColor: "text-orange-600", 
          badge: "bg-orange-200 text-orange-800", btn: "bg-orange-600 hover:bg-orange-700",
          accent: "from-orange-500 to-amber-400"
        };
      case "প্রযুক্তি ও দক্ষতা":
        return {
          bg: "bg-violet-50", border: "border-violet-100", 
          iconBg: "bg-violet-100", iconColor: "text-violet-600", 
          badge: "bg-violet-200 text-violet-800", btn: "bg-violet-600 hover:bg-violet-700",
          accent: "from-violet-500 to-purple-400"
        };
      default: // গৃহ ও অন্যান্য
        return {
          bg: "bg-rose-50", border: "border-rose-100", 
          iconBg: "bg-rose-100", iconColor: "text-rose-600", 
          badge: "bg-rose-200 text-rose-800", btn: "bg-rose-600 hover:bg-rose-700",
          accent: "from-rose-500 to-pink-400"
        };
    }
  };

  // --- ডাটাবেজ ---
  const investmentItems = [
    { title: "হাঁস-মুরগি ও ছাগল পালন", category: "কৃষি ও খামার", icon: <Sprout/>, desc: "পারিবারিক পর্যায়ে পালনের জন্য স্বল্প পুঁজি।" },
    { title: "মুদি দোকান সম্প্রসারণ", category: "ক্ষুদ্র ব্যবসা", icon: <Store/>, desc: "দোকানে মাল তোলার জন্য পণ্য-ভিত্তিক পুঁজি।" },
    { title: "অটো ভ্যান বা রিক্সা", category: "যানবাহন", icon: <Car/>, desc: "পণ্য বা যাত্রী পরিবহনের বাহন ক্রয়।" },
    { title: "কম্পিউটার ও আইটি সেন্টার", category: "প্রযুক্তি ও দক্ষতা", icon: <Laptop/>, desc: "কম্পিউটার টাইপ, প্রিন্ট ও ইন্টারনেট সেবা।" },
    { title: "টিনের ঘর তৈরি", category: "গৃহ ও অন্যান্য", icon: <Home/>, desc: "বসতঘর নির্মাণ বা মেরামতের সামগ্রী।" },
    { title: "দুগ্ধ খামার / গাভী পালন", category: "কৃষি ও খামার", icon: <Milk/>, desc: "উন্নত জাতের গাভী ক্রয় ও লালন-পালন।" },
    { title: "ফেরিওয়ালা বা হকার", category: "ক্ষুদ্র ব্যবসা", icon: <ShoppingBag/>, desc: "ভ্যানে বা পায়ে হেঁটে পণ্য বিক্রির মালামাল।" },
    { title: "ইলেকট্রিক অটো/ইজি বাইক", category: "যানবাহন", icon: <Car/>, desc: "ব্যাটারি চালিত ইজি বাইক ক্রয়ের সুবিধা।" },
    { title: "মোবাইল সার্ভিসিং ল্যাব", category: "প্রযুক্তি ও দক্ষতা", icon: <Smartphone/>, desc: "মোবাইল মেরামতের আধুনিক যন্ত্রপাতি।" },
    { title: "স্যানিটেশন ও টিউবওয়েল", category: "গৃহ ও অন্যান্য", icon: <Hammer/>, desc: "স্বাস্থ্যসম্মত ল্যাট্রিন ও বিশুদ্ধ পানি।" },
    { title: "মাছ চাষ প্রজেক্ট", category: "কৃষি ও খামার", icon: <Fish/>, desc: "পুকুর বা বায়োফ্লক পদ্ধতিতে মাছ চাষ।" },
    { title: "মিনি গার্মেন্টস/সেলাই", category: "ক্ষুদ্র ব্যবসা", icon: <Shirt/>, desc: "সেলাই মেশিন বা ছোট গার্মেন্টস মেশিনারি।" },
    { title: "ফসল স্টক ব্যবসা", category: "কৃষি ও খামার", icon: <Landmark/>, desc: "সিজনে ফসল কিনে স্টক করার বড় পুঁজি।" },
    { title: "ফ্রিল্যান্সিং গিয়ার", category: "প্রযুক্তি ও দক্ষতা", icon: <Laptop/>, desc: "ফ্রিল্যান্সিংয়ের জন্য হাই-কনফিগারেশন পিসি।" },
    { title: "রাইড শেয়ারিং বাইক", category: "যানবাহন", icon: <Car/>, desc: "ভাড়ায় বা রাইড শেয়ারিংয়ে বাইক চালানো।" },
  ];

  const filteredItems = activeTab === 'All' ? investmentItems : investmentItems.filter(item => item.category === activeTab);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    try {
      const { error } = await supabase.from('bookings').insert([{
        member_name: user?.full_name || 'Guest', mobile: user?.mobile,
        service_category: 'Investment', item_name: selectedItem,
        quantity: `টাকা: ${amount}, মেয়াদ: ${duration} মাস`, assigned_staff: `উদ্দেশ্য: ${purpose}`,
        status: 'pending'
      }]);
      if (error) throw error;
      alert("আবেদন সফল হয়েছে! আমাদের প্রতিনিধি যোগাযোগ করবেন।");
      setModalOpen(false); setAmount(''); setDuration(''); setPurpose('');
    } catch (err: any) { alert("সমস্যা হয়েছে: " + err.message); } 
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen pb-12 bg-slate-50/50">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white mb-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-xs font-bold mb-4 tracking-wider uppercase">
            হালাল ও নিরাপদ
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            স্বপ্ন পূরণের <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">বিশ্বস্ত অংশীদার</span>
          </h1>
          <p className="text-slate-300 text-lg">
            ছোট বা বড়, যেকোনো উদ্যোগের জন্য আমরা দিচ্ছি সহজ শর্তে পণ্য ভিত্তিক বিনিয়োগ সুবিধা।
          </p>
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-6 mb-2 custom-scrollbar px-1">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(cat)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
              activeTab === cat 
                ? 'bg-slate-800 text-white shadow-lg ring-2 ring-offset-2 ring-slate-800' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:shadow-sm'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- DISTINCTIVE CARD GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => {
          const style = getCategoryStyle(item.category);
          return (
            <div 
              key={index} 
              className={`relative bg-white rounded-3xl p-6 border ${style.border} shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 flex flex-col overflow-hidden`}
            >
              {/* Decorative Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${style.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              {/* Header: Icon & Badge */}
              <div className="flex justify-between items-start mb-5 relative z-10">
                <div className={`w-14 h-14 ${style.iconBg} ${style.iconColor} rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${style.badge}`}>
                  {item.category}
                </span>
              </div>
              
              {/* Content */}
              <div className="relative z-10 flex-grow">
                <h3 className="text-xl font-bold text-slate-800 mb-2 leading-snug group-hover:text-slate-900">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>
              
              {/* Button */}
              <div className="relative z-10 mt-auto">
                <button 
                  onClick={() => { setSelectedItem(item.title); setModalOpen(true); }} 
                  className={`w-full py-3 rounded-xl text-white font-bold text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg ${style.btn}`}
                >
                  আবেদন করুন <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- MODERN MODAL --- */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-slate-900 p-6 flex justify-between items-center text-white shrink-0">
              <div>
                <h3 className="text-xl font-bold">{selectedItem}</h3>
                <p className="text-slate-400 text-xs mt-1">আবেদন ফর্মটি সঠিক তথ্য দিয়ে পূরণ করুন</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition text-white">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">টাকার পরিমাণ (আনুমানিক)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-slate-400 font-bold">৳</span>
                    <input type="number" required onChange={(e) => setAmount(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-800 transition font-bold text-slate-800" placeholder="৫০,০০০" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">পরিশোধের মেয়াদ</label>
                  <select required onChange={(e) => setDuration(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-800 transition text-slate-700 font-medium appearance-none">
                    <option value="">মেয়াদ নির্বাচন করুন...</option>
                    <option value="6">৬ মাস</option>
                    <option value="12">১২ মাস (১ বছর)</option>
                    <option value="18">১৮ মাস (১.৫ বছর)</option>
                    <option value="24">২৪ মাস (২ বছর)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">বিস্তারিত পরিকল্পনা</label>
                  <textarea required onChange={(e) => setPurpose(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-800 transition h-28 text-slate-700" placeholder="এই টাকা দিয়ে আপনি কি করবেন বিস্তারিত লিখুন..." />
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-xs text-emerald-800 flex gap-3 items-start">
                <CheckCircle2 size={18} className="shrink-0 text-emerald-600"/> 
                <span>
                  আপনার আবেদনটি সফলভাবে জমা হলে আমাদের অফিসার ২-৩ কর্মদিবসের মধ্যে আপনার সাথে যোগাযোগ করে প্রজেক্ট ভিজিট করবেন।
                </span>
              </div>

              <button 
                disabled={loading} 
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg disabled:opacity-70 transform active:scale-[0.98]"
              >
                {loading ? 'প্রসেসিং হচ্ছে...' : 'আবেদন নিশ্চিত করুন'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}