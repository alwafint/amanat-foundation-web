'use client';

import React, { useState } from 'react';
import { 
  HeartPulse, Pill, Ambulance, Stethoscope, 
  Activity, Baby, HeartHandshake, Microscope, 
  PhoneCall, X, User, FileText, Phone 
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function HealthPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  
  const [selectedService, setSelectedService] = useState('');
  const [patientName, setPatientName] = useState('');
  const [contactMobile, setContactMobile] = useState('');
  const [problemDetails, setProblemDetails] = useState('');

  const categories = ["All", "ডাক্তার ও পরামর্শ", "জরুরি সেবা", "ঔষধ ও টেস্ট", "মা ও শিশু"];

  const getStyle = (category: string) => {
    switch (category) {
      case "জরুরি সেবা": return { bg: "bg-red-50", border: "border-red-100", iconText: "text-red-600", badge: "bg-red-100 text-red-700", btn: "bg-red-600 hover:bg-red-700" };
      case "ডাক্তার ও পরামর্শ": return { bg: "bg-blue-50", border: "border-blue-100", iconText: "text-blue-600", badge: "bg-blue-100 text-blue-700", btn: "bg-blue-600 hover:bg-blue-700" };
      case "ঔষধ ও টেস্ট": return { bg: "bg-teal-50", border: "border-teal-100", iconText: "text-teal-600", badge: "bg-teal-100 text-teal-700", btn: "bg-teal-600 hover:bg-teal-700" };
      default: return { bg: "bg-pink-50", border: "border-pink-100", iconText: "text-pink-600", badge: "bg-pink-100 text-pink-700", btn: "bg-pink-600 hover:bg-pink-700" };
    }
  };

  const healthServices = [
    { title: "হ্যালো ডাক্তার", category: "ডাক্তার ও পরামর্শ", icon: <PhoneCall size={28}/>, desc: "২৪/৭ বিশেষজ্ঞ ডাক্তারের পরামর্শ।" },
    { title: "ফ্রি হেলথ ক্যাম্প", category: "ডাক্তার ও পরামর্শ", icon: <Stethoscope size={28}/>, desc: "মাসে একদিন ফ্রি ক্যাম্প।" },
    { title: "অ্যাম্বুলেন্স সেবা", category: "জরুরি সেবা", icon: <Ambulance size={28}/>, desc: "জরুরি রোগী পরিবহন।" },
    { title: "অক্সিজেন ব্যাংক", category: "জরুরি সেবা", icon: <Activity size={28}/>, desc: "বিনামূল্যে অক্সিজেন সিলিন্ডার।" },
    { title: "ব্লাড ডোনেশন", category: "জরুরি সেবা", icon: <HeartHandshake size={28}/>, desc: "জরুরি রক্তের ডোনার ম্যানেজ।" },
    { title: "ঔষধ হোম ডেলিভারি", category: "ঔষধ ও টেস্ট", icon: <Pill size={28}/>, desc: "ডিসকাউন্টে ঔষধ অর্ডার।" },
    { title: "প্যাথলজি ডিসকাউন্ট", category: "ঔষধ ও টেস্ট", icon: <Microscope size={28}/>, desc: "টেস্টে ৩০-৪০% ছাড়।" },
    { title: "মা ও শিশু যত্ন", category: "মা ও শিশু", icon: <Baby size={28}/>, desc: "গর্ভবতী মা ও নবজাতকের যত্ন।" },
  ];

  const filteredItems = activeTab === 'All' ? healthServices : healthServices.filter(item => item.category === activeTab);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    try {
      const { error } = await supabase.from('bookings').insert([{
        member_name: user?.full_name || 'Guest', mobile: user?.mobile,
        service_category: 'Health', item_name: selectedService,
        quantity: `রোগী: ${patientName}`, assigned_staff: `মোবাইল: ${contactMobile}, সমস্যা: ${problemDetails}`,
        status: 'pending'
      }]);
      if (error) throw error;
      alert("অনুরোধ পাঠানো হয়েছে!");
      setModalOpen(false); setPatientName(''); setProblemDetails(''); setContactMobile('');
    } catch (err: any) { alert(err.message); } 
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen pb-12 bg-slate-50/50">
      <div className="bg-gradient-to-r from-rose-600 to-pink-500 rounded-3xl p-8 text-white mb-10 shadow-xl">
        <h1 className="text-3xl font-bold mb-3">স্বাস্থ্য সুরক্ষা সেবা</h1>
        <p>২৪ ঘণ্টা আপনার পাশে।</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 mb-4 custom-scrollbar px-1">
        {categories.map((cat, idx) => (
          <button key={idx} onClick={() => setActiveTab(cat)} className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all ${activeTab === cat ? 'bg-rose-700 text-white' : 'bg-white text-slate-600'}`}>{cat}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => {
          const style = getStyle(item.category);
          return (
            <div key={index} className={`bg-white p-6 rounded-2xl border ${style.border} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full`}>
              <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 ${style.bg} ${style.iconText} rounded-xl flex items-center justify-center`}>
                  {item.icon}
                </div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${style.badge}`}>{item.category}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{item.desc}</p>
              <button onClick={() => { setSelectedService(item.title); setModalOpen(true); }} className={`w-full py-2.5 rounded-lg text-white font-bold text-sm shadow ${style.btn}`}>
                সেবা নিন
              </button>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{selectedService}</h3>
              <button onClick={() => setModalOpen(false)}><X/></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" required onChange={(e) => setPatientName(e.target.value)} className="w-full p-3 border rounded-xl" placeholder="রোগীর নাম" />
              <input type="number" required onChange={(e) => setContactMobile(e.target.value)} className="w-full p-3 border rounded-xl" placeholder="মোবাইল নম্বর" />
              <textarea required onChange={(e) => setProblemDetails(e.target.value)} className="w-full p-3 border rounded-xl h-24" placeholder="সমস্যা..." />
              <button disabled={loading} className="w-full bg-rose-600 text-white py-3 rounded-xl font-bold">{loading ? 'পাঠানো হচ্ছে...' : 'জমা দিন'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}