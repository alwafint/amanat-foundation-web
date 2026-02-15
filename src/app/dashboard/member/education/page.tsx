'use client';

import React, { useState } from 'react';
import { 
  Laptop, Smartphone, Scissors, Zap, 
  Sprout, Fish, Milk, PenTool, 
  MonitorPlay, Wrench, X, CheckCircle2, ArrowRight 
} from "lucide-react";
// সঠিক ইমপোর্ট পাথ (৪ ধাপ পেছনে)
import { supabase } from '../../../../lib/supabaseClient'; 

export default function TrainingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  
  // ফর্ম স্টেট
  const [selectedCourse, setSelectedCourse] = useState('');
  const [shift, setShift] = useState('');
  const [remarks, setRemarks] = useState('');

  // --- ক্যাটাগরি ---
  const categories = ["All", "আইটি ও ফ্রিল্যান্সিং", "কারিগরি দক্ষতা", "কৃষি ও খামার", "কুটির শিল্প"];

  // --- কালার স্টাইল জেনারেটর ---
  const getStyle = (category: string) => {
    switch (category) {
      case "আইটি ও ফ্রিল্যান্সিং":
        return { bg: "bg-violet-50", border: "border-violet-100", iconText: "text-violet-600", badge: "bg-violet-100 text-violet-700", btn: "bg-violet-600 hover:bg-violet-700" };
      case "কারিগরি দক্ষতা":
        return { bg: "bg-blue-50", border: "border-blue-100", iconText: "text-blue-600", badge: "bg-blue-100 text-blue-700", btn: "bg-blue-600 hover:bg-blue-700" };
      case "কৃষি ও খামার":
        return { bg: "bg-emerald-50", border: "border-emerald-100", iconText: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700", btn: "bg-emerald-600 hover:bg-emerald-700" };
      default: // কুটির শিল্প
        return { bg: "bg-rose-50", border: "border-rose-100", iconText: "text-rose-600", badge: "bg-rose-100 text-rose-700", btn: "bg-rose-600 hover:bg-rose-700" };
    }
  };

  // --- প্রশিক্ষণের তালিকা ---
  const trainingItems = [
    { title: "কম্পিউটার অফিস অ্যাপ্লিকেশন", category: "আইটি ও ফ্রিল্যান্সিং", icon: <Laptop size={28}/>, duration: "৩ মাস", desc: "বেসিক কম্পিউটার, টাইপিং এবং অফিস ম্যানেজমেন্ট।" },
    { title: "গ্রাফিক্স ডিজাইন ও ফ্রিল্যান্সিং", category: "আইটি ও ফ্রিল্যান্সিং", icon: <PenTool size={28}/>, duration: "৬ মাস", desc: "লোগো, ব্যানার ডিজাইন এবং অনলাইন মার্কেটপ্লেস গাইডলাইন।" },
    { title: "ডিজিটাল মার্কেটিং", category: "আইটি ও ফ্রিল্যান্সিং", icon: <MonitorPlay size={28}/>, duration: "৩ মাস", desc: "ফেসবুক বুস্টিং, ইউটিউব মার্কেটিং এবং কন্টেন্ট ক্রিয়েশন।" },
    { title: "মোবাইল সার্ভিসিং ও রিপেয়ার", category: "কারিগরি দক্ষতা", icon: <Smartphone size={28}/>, duration: "৩ মাস", desc: "মোবাইল হার্ডওয়্যার ও সফটওয়্যার মেরামতের পূর্ণাঙ্গ কোর্স।" },
    { title: "ইলেকট্রিক্যাল হাউজ ওয়্যারিং", category: "কারিগরি দক্ষতা", icon: <Zap size={28}/>, duration: "৩ মাস", desc: "বাসাবাড়ির বিদ্যুৎ সংযোগ ও ফ্যান-লাইট মেরামতের কাজ।" },
    { title: "অটো মেকানিক্স ও ড্রাইভিং", category: "কারিগরি দক্ষতা", icon: <Wrench size={28}/>, duration: "২ মাস", desc: "অটো রিক্সা মেরামত এবং চালনা প্রশিক্ষণ।" },
    { title: "আধুনিক গবাদিপশু পালন", category: "কৃষি ও খামার", icon: <Milk size={28}/>, duration: "১ মাস", desc: "গরু মোটাতাজাকরণ এবং প্রাথমিক চিকিৎসা প্রশিক্ষণ।" },
    { title: "বায়োফ্লক ও মাছ চাষ", category: "কৃষি ও খামার", icon: <Fish size={28}/>, duration: "১৫ দিন", desc: "আধুনিক পদ্ধতিতে অল্প জায়গায় মাছ চাষের কৌশল।" },
    { title: "আধুনিক কৃষি ও বীজ প্রযুক্তি", category: "কৃষি ও খামার", icon: <Sprout size={28}/>, duration: "১ মাস", desc: "উন্নত ফলন, সার প্রয়োগ এবং বালাইনাশক ব্যবস্থাপনা।" },
    { title: "সেলাই ও দর্জি বিজ্ঞান", category: "কুটির শিল্প", icon: <Scissors size={28}/>, duration: "৩ মাস", desc: "কাটিং, সেলাই এবং পোশাক তৈরির হাতে-কলমে শিক্ষা।" },
    { title: "হস্তশিল্প ও নকশিকাঁথা", category: "কুটির শিল্প", icon: <PenTool size={28}/>, duration: "২ মাস", desc: "শৌখিন পণ্য তৈরি এবং বাজারজাতকরণ।" },
  ];

  const filteredItems = activeTab === 'All' ? trainingItems : trainingItems.filter(item => item.category === activeTab);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    try {
      const { error } = await supabase.from('bookings').insert([{
        member_name: user?.full_name || 'Guest', mobile: user?.mobile,
        service_category: 'Training', 
        item_name: selectedCourse,
        quantity: "Training Request", 
        assigned_staff: `শিফট: ${shift}, নোট: ${remarks}`,
        status: 'pending'
      }]);

      if (error) throw error;
      alert("ভর্তির আবেদন জমা হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।");
      setModalOpen(false);
    } catch (err: any) { alert(err.message); } 
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen pb-12 bg-slate-50/50">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-600 rounded-3xl p-8 text-white mb-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">কারিগরি প্রশিক্ষণ ও দক্ষতা</h1>
          <p className="text-purple-100 max-w-2xl">
            নিজের পায়ে দাঁড়াতে প্রয়োজনীয় প্রশিক্ষণ নিন এবং স্বাবলম্বী হোন।
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-4 custom-scrollbar px-1">
        {categories.map((cat, idx) => (
          <button key={idx} onClick={() => setActiveTab(cat)} className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all ${activeTab === cat ? 'bg-slate-800 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => {
          const style = getStyle(item.category);
          return (
            <div key={index} className={`bg-white p-6 rounded-2xl border ${style.border} shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col h-full`}>
              
              <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 ${style.bg} ${style.iconText} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${style.badge}`}>
                  {item.duration}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{item.desc}</p>

              <button 
                onClick={() => { setSelectedCourse(item.title); setModalOpen(true); }} 
                className={`w-full py-2.5 rounded-lg text-white font-bold text-sm shadow transition-all flex items-center justify-center gap-2 ${style.btn}`}
              >
                ভর্তি হোন <ArrowRight size={16}/>
              </button>
            </div>
          );
        })}
      </div>

      {/* Application Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{selectedCourse}</h3>
                <p className="text-xs text-slate-500">প্রশিক্ষণে ভর্তির আবেদন</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition"><X size={20}/></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">শিফট নির্বাচন করুন</label>
                <div className="grid grid-cols-2 gap-4">
                  <div onClick={() => setShift('Morning')} className={`border-2 p-3 rounded-xl cursor-pointer text-center transition ${shift === 'Morning' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-200'}`}>
                    সকাল (৯টা - ১টা)
                  </div>
                  <div onClick={() => setShift('Evening')} className={`border-2 p-3 rounded-xl cursor-pointer text-center transition ${shift === 'Evening' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-200'}`}>
                    বিকাল (৩টা - ৬টা)
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">মন্তব্য</label>
                <textarea onChange={(e) => setRemarks(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-purple-500 h-24" placeholder="আপনার কিছু জানার থাকলে লিখুন..." />
              </div>
              <button disabled={loading} className="w-full bg-purple-700 text-white py-3.5 rounded-xl font-bold hover:bg-purple-800 transition shadow-lg disabled:opacity-70">
                {loading ? 'প্রসেসিং...' : 'আবেদন জমা দিন'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}