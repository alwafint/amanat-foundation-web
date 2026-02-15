'use client';

import React, { useState } from 'react';
import { 
  Laptop, Smartphone, Scissors, Zap, 
  Sprout, Fish, Milk, PenTool, 
  MonitorPlay, Wrench, X, CheckCircle2, ArrowRight 
} from "lucide-react";
// ৪ ধাপ পেছনে (../../../../)
import { supabase } from '../../../../lib/supabaseClient'; 

export default function TrainingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  
  const [selectedCourse, setSelectedCourse] = useState('');
  const [shift, setShift] = useState('');
  const [remarks, setRemarks] = useState('');

  const categories = ["All", "আইটি ও ফ্রিল্যান্সিং", "কারিগরি দক্ষতা", "কৃষি ও খামার", "কুটির শিল্প"];

  const getStyle = (category: string) => {
    switch (category) {
      case "আইটি ও ফ্রিল্যান্সিং": return { bg: "bg-violet-50", border: "border-violet-100", iconText: "text-violet-600", badge: "bg-violet-100 text-violet-700", btn: "bg-violet-600 hover:bg-violet-700" };
      case "কারিগরি দক্ষতা": return { bg: "bg-blue-50", border: "border-blue-100", iconText: "text-blue-600", badge: "bg-blue-100 text-blue-700", btn: "bg-blue-600 hover:bg-blue-700" };
      case "কৃষি ও খামার": return { bg: "bg-emerald-50", border: "border-emerald-100", iconText: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700", btn: "bg-emerald-600 hover:bg-emerald-700" };
      default: return { bg: "bg-rose-50", border: "border-rose-100", iconText: "text-rose-600", badge: "bg-rose-100 text-rose-700", btn: "bg-rose-600 hover:bg-rose-700" };
    }
  };

  const trainingItems = [
    { title: "কম্পিউটার অফিস অ্যাপ্লিকেশন", category: "আইটি ও ফ্রিল্যান্সিং", icon: <Laptop size={28}/>, duration: "৩ মাস", desc: "বেসিক কম্পিউটার ও অফিস ম্যানেজমেন্ট।" },
    { title: "গ্রাফিক্স ডিজাইন", category: "আইটি ও ফ্রিল্যান্সিং", icon: <PenTool size={28}/>, duration: "৬ মাস", desc: "লোগো, ব্যানার ডিজাইন ও ফ্রিল্যান্সিং।" },
    { title: "ডিজিটাল মার্কেটিং", category: "আইটি ও ফ্রিল্যান্সিং", icon: <MonitorPlay size={28}/>, duration: "৩ মাস", desc: "সোশ্যাল মিডিয়া মার্কেটিং ও কন্টেন্ট।" },
    { title: "মোবাইল সার্ভিসিং", category: "কারিগরি দক্ষতা", icon: <Smartphone size={28}/>, duration: "৩ মাস", desc: "মোবাইল হার্ডওয়্যার ও সফটওয়্যার রিপেয়ার।" },
    { title: "হাউজ ওয়্যারিং", category: "কারিগরি দক্ষতা", icon: <Zap size={28}/>, duration: "৩ মাস", desc: "বিদ্যুৎ সংযোগ ও ফ্যান-লাইট মেরামত।" },
    { title: "অটো মেকানিক্স", category: "কারিগরি দক্ষতা", icon: <Wrench size={28}/>, duration: "২ মাস", desc: "অটো রিক্সা মেরামত ও চালনা।" },
    { title: "গবাদিপশু পালন", category: "কৃষি ও খামার", icon: <Milk size={28}/>, duration: "১ মাস", desc: "গরু মোটাতাজাকরণ ও চিকিৎসা।" },
    { title: "মাছ চাষ", category: "কৃষি ও খামার", icon: <Fish size={28}/>, duration: "১৫ দিন", desc: "বায়োফ্লক ও পুকুরে মাছ চাষ।" },
    { title: "কৃষি প্রযুক্তি", category: "কৃষি ও খামার", icon: <Sprout size={28}/>, duration: "১ মাস", desc: "উন্নত বীজ ও সার প্রয়োগ বিধি।" },
    { title: "দর্জি বিজ্ঞান", category: "কুটির শিল্প", icon: <Scissors size={28}/>, duration: "৩ মাস", desc: "কাটিং ও সেলাই প্রশিক্ষণ।" },
    { title: "হস্তশিল্প", category: "কুটির শিল্প", icon: <PenTool size={28}/>, duration: "২ মাস", desc: "নকশিকাঁথা ও শৌখিন পণ্য তৈরি।" },
  ];

  const filteredItems = activeTab === 'All' ? trainingItems : trainingItems.filter(item => item.category === activeTab);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    try {
      const { error } = await supabase.from('bookings').insert([{
        member_name: user?.full_name || 'Guest', mobile: user?.mobile,
        service_category: 'Training', item_name: selectedCourse,
        quantity: "Training Request", assigned_staff: `শিফট: ${shift}, নোট: ${remarks}`,
        status: 'pending'
      }]);
      if (error) throw error;
      alert("আবেদন জমা হয়েছে!");
      setModalOpen(false);
    } catch (err: any) { alert(err.message); } 
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen pb-12 bg-slate-50/50">
      <div className="bg-gradient-to-r from-purple-700 to-indigo-600 rounded-3xl p-8 text-white mb-10 shadow-xl">
        <h1 className="text-3xl font-bold mb-3">কারিগরি প্রশিক্ষণ</h1>
        <p>দক্ষতা অর্জন করুন, স্বাবলম্বী হোন।</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 mb-4 px-1">
        {categories.map((cat, idx) => (
          <button key={idx} onClick={() => setActiveTab(cat)} className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold ${activeTab === cat ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'}`}>{cat}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => {
          const style = getStyle(item.category);
          return (
            <div key={index} className={`bg-white p-6 rounded-2xl border ${style.border} shadow-sm flex flex-col h-full`}>
              <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 ${style.bg} ${style.iconText} rounded-xl flex items-center justify-center`}>
                  {item.icon}
                </div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${style.badge}`}>{item.duration}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm mb-6 flex-grow">{item.desc}</p>
              <button onClick={() => { setSelectedCourse(item.title); setModalOpen(true); }} className={`w-full py-2.5 rounded-lg text-white font-bold text-sm ${style.btn}`}>ভর্তি হোন</button>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{selectedCourse}</h3>
              <button onClick={() => setModalOpen(false)}><X/></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <select onChange={(e) => setShift(e.target.value)} className="w-full p-3 border rounded-xl">
                <option value="">শিফট নির্বাচন করুন</option>
                <option value="Morning">সকাল</option>
                <option value="Evening">বিকাল</option>
              </select>
              <textarea onChange={(e) => setRemarks(e.target.value)} className="w-full p-3 border rounded-xl h-24" placeholder="মন্তব্য..." />
              <button disabled={loading} className="w-full bg-purple-700 text-white py-3 rounded-xl font-bold">{loading ? 'অপেক্ষা করুন...' : 'জমা দিন'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}