'use client';

import React, { useState } from 'react';
import { 
  Globe, FileText, Wifi, Printer, 
  CreditCard, Briefcase, Map, ShieldCheck, 
  X, Send, Info 
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function DigitalServicePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  
  // ফর্ম স্টেট
  const [selectedService, setSelectedService] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [details, setDetails] = useState('');
  const [docLink, setDocLink] = useState('');

  // --- ক্যাটাগরি ---
  const categories = ["All", "নাগরিক সেবা", "ভূমি সেবা", "বিল ও পেমেন্ট", "ছাত্র ও চাকরি"];

  // --- কালার স্টাইল জেনারেটর ---
  const getStyle = (category: string) => {
    switch (category) {
      case "নাগরিক সেবা":
        return { 
          bg: "bg-cyan-50", border: "border-cyan-100", 
          iconText: "text-cyan-600", badge: "bg-cyan-100 text-cyan-700", 
          btn: "bg-cyan-600 hover:bg-cyan-700" 
        };
      case "ভূমি সেবা":
        return { 
          bg: "bg-emerald-50", border: "border-emerald-100", 
          iconText: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700", 
          btn: "bg-emerald-600 hover:bg-emerald-700" 
        };
      case "বিল ও পেমেন্ট":
        return { 
          bg: "bg-orange-50", border: "border-orange-100", 
          iconText: "text-orange-600", badge: "bg-orange-100 text-orange-700", 
          btn: "bg-orange-600 hover:bg-orange-700" 
        };
      default: // ছাত্র ও চাকরি
        return { 
          bg: "bg-blue-50", border: "border-blue-100", 
          iconText: "text-blue-600", badge: "bg-blue-100 text-blue-700", 
          btn: "bg-blue-600 hover:bg-blue-700" 
        };
    }
  };

  // --- ডিজিটাল সেবার তালিকা ---
  const services = [
    // ১. নাগরিক সেবা
    { title: "জন্ম/মৃত্যু নিবন্ধন", category: "নাগরিক সেবা", icon: <FileText/>, desc: "নতুন নিবন্ধন আবেদন বা সংশোধনের কাজ।" },
    { title: "NID সংশোধন/হারানো", category: "নাগরিক সেবা", icon: <ShieldCheck/>, desc: "ভোটার আইডি কার্ড সংশোধন বা রি-ইস্যু আবেদন।" },
    { title: "পাসপোর্ট আবেদন", category: "নাগরিক সেবা", icon: <Globe/>, desc: "ই-পাসপোর্টের ফরম পূরণ ও ব্যাংক ড্রাফট।" },
    
    // ২. ভূমি সেবা
    { title: "ই-পর্চা / খতিয়ান", category: "ভূমি সেবা", icon: <Map/>, desc: "অনলাইনে জমির খতিয়ান বা পর্চা তোলা।" },
    { title: "ভূমি উন্নয়ন কর", category: "ভূমি সেবা", icon: <CreditCard/>, desc: "অনলাইনে জমির খাজনা বা কর পরিশোধ।" },
    { title: "নামজারি আবেদন", category: "ভূমি সেবা", icon: <FileText/>, desc: "জমির মালিকানা পরিবর্তনের মিউটেশন আবেদন।" },

    // ৩. বিল ও পেমেন্ট
    { title: "পল্লী বিদ্যুৎ বিল", category: "বিল ও পেমেন্ট", icon: <Wifi/>, desc: "পোস্টপেইড বিল দেওয়া বা প্রিপেইড মিটার রিচার্জ।" },
    { title: "গ্যাস ও পানি বিল", category: "বিল ও পেমেন্ট", icon: <CreditCard/>, desc: "লাইনের গ্যাস বা ওয়াসার বিল পরিশোধ।" },
    
    // ৪. ছাত্র ও চাকরি
    { title: "চাকরির আবেদন", category: "ছাত্র ও চাকরি", icon: <Briefcase/>, desc: "সরকারি বা বেসরকারি চাকরির অনলাইন আবেদন।" },
    { title: "সিভি (CV) তৈরি", category: "ছাত্র ও চাকরি", icon: <Printer/>, desc: "প্রফেশনাল বায়োডাটা বা সিভি তৈরি।" },
    { title: "ভর্তি ফরম পূরণ", category: "ছাত্র ও চাকরি", icon: <Globe/>, desc: "স্কুল, কলেজ বা বিশ্ববিদ্যালয়ে ভর্তির আবেদন।" },
    { title: "রেজাল্ট দেখা", category: "ছাত্র ও চাকরি", icon: <FileText/>, desc: "বোর্ড বা চাকরির পরীক্ষার ফলাফল প্রিন্ট।" },
  ];

  const filteredItems = activeTab === 'All' ? services : services.filter(item => item.category === activeTab);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    try {
      const { error } = await supabase.from('bookings').insert([{
        member_name: user?.full_name || 'Guest', 
        mobile: user?.mobile,
        service_category: 'DigitalService', 
        item_name: selectedService,
        quantity: "Service Request", 
        assigned_staff: `নাম: ${applicantName}, বিবরণ: ${details}, ডক লিংক: ${docLink}`,
        status: 'pending'
      }]);

      if (error) throw error;
      alert("আবেদন জমা হয়েছে! আমাদের কম্পিউটার অপারেটর যোগাযোগ করবে।");
      setModalOpen(false); setApplicantName(''); setDetails(''); setDocLink('');
    } catch (err: any) { alert("সমস্যা হয়েছে: " + err.message); } 
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen pb-12 bg-slate-50/50">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-600 to-teal-500 rounded-3xl p-8 text-white mb-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">ডিজিটাল সেবা কেন্দ্র</h1>
          <p className="text-cyan-100 max-w-2xl">
            শহরে যাওয়ার ঝামেলা শেষ। এখন হাতের কাছেই পাচ্ছেন পাসপোর্ট, জন্ম নিবন্ধন, জমির পর্চাসহ সকল ডিজিটাল সুবিধা।
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-4 custom-scrollbar px-1">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(cat)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all ${
              activeTab === cat 
                ? 'bg-cyan-700 text-white shadow-lg' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => {
          const style = getStyle(item.category);
          return (
            <div key={index} className={`bg-white p-6 rounded-2xl border ${style.border} shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col h-full`}>
              
              <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 ${style.bg} ${style.iconText} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
                </div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${style.badge}`}>
                  {item.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{item.desc}</p>

              <button 
                onClick={() => { setSelectedService(item.title); setModalOpen(true); }} 
                className={`w-full py-2.5 rounded-lg text-white font-bold text-sm shadow transition-all flex items-center justify-center gap-2 ${style.btn}`}
              >
                আবেদন করুন <Send size={16}/>
              </button>
            </div>
          );
        })}
      </div>

      {/* Application Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 flex flex-col max-h-[90vh]">
            
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{selectedService}</h3>
                <p className="text-xs text-slate-500">প্রয়োজনীয় তথ্য দিয়ে ফর্মটি পূরণ করুন</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition"><X size={20}/></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto custom-scrollbar">
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">আবেদনকারীর নাম</label>
                <input 
                  type="text" 
                  required 
                  onChange={(e) => setApplicantName(e.target.value)} 
                  className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-cyan-500 transition" 
                  placeholder="নাম লিখুন" 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">প্রয়োজনীয় তথ্য (বিস্তারিত)</label>
                <textarea 
                  required 
                  onChange={(e) => setDetails(e.target.value)} 
                  className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-cyan-500 h-24" 
                  placeholder="যেমন: জন্ম তারিখ, পিতার নাম, বা বিল নম্বর..." 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">ডকুমেন্ট লিংক (যদি থাকে)</label>
                <input 
                  type="text" 
                  onChange={(e) => setDocLink(e.target.value)} 
                  className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-cyan-500 transition" 
                  placeholder="গুগল ড্রাইভ বা ছবির লিংক (অপশনাল)" 
                />
              </div>

              <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-100 text-xs text-cyan-800 flex gap-3 items-start">
                <Info size={18} className="shrink-0 text-cyan-600"/> 
                <span>
                  সরকারি ফি এবং আমাদের সার্ভিস চার্জ প্রযোজ্য হবে। আবেদন জমা দেওয়ার পর অপারেটর আপনাকে খরচ জানিয়ে কাজ শুরু করবে।
                </span>
              </div>

              <button 
                disabled={loading} 
                className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg transition disabled:opacity-70"
              >
                {loading ? 'পাঠানো হচ্ছে...' : 'আবেদন জমা দিন'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}