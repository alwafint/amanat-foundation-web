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
  
  // ফর্ম স্টেট
  const [selectedService, setSelectedService] = useState('');
  const [patientName, setPatientName] = useState('');
  const [contactMobile, setContactMobile] = useState('');
  const [problemDetails, setProblemDetails] = useState('');

  // --- ক্যাটাগরি ---
  const categories = ["All", "ডাক্তার ও পরামর্শ", "জরুরি সেবা", "ঔষধ ও টেস্ট", "মা ও শিশু"];

  // --- কালার স্টাইল জেনারেটর ---
  const getStyle = (category: string) => {
    switch (category) {
      case "জরুরি সেবা":
        return { 
          bg: "bg-red-50", border: "border-red-100", 
          iconText: "text-red-600", badge: "bg-red-100 text-red-700", 
          btn: "bg-red-600 hover:bg-red-700" 
        };
      case "ডাক্তার ও পরামর্শ":
        return { 
          bg: "bg-blue-50", border: "border-blue-100", 
          iconText: "text-blue-600", badge: "bg-blue-100 text-blue-700", 
          btn: "bg-blue-600 hover:bg-blue-700" 
        };
      case "ঔষধ ও টেস্ট":
        return { 
          bg: "bg-teal-50", border: "border-teal-100", 
          iconText: "text-teal-600", badge: "bg-teal-100 text-teal-700", 
          btn: "bg-teal-600 hover:bg-teal-700" 
        };
      default: // মা ও শিশু
        return { 
          bg: "bg-pink-50", border: "border-pink-100", 
          iconText: "text-pink-600", badge: "bg-pink-100 text-pink-700", 
          btn: "bg-pink-600 hover:bg-pink-700" 
        };
    }
  };

  // --- স্বাস্থ্য সেবার তালিকা ---
  const healthServices = [
    { title: "হ্যালো ডাক্তার", category: "ডাক্তার ও পরামর্শ", icon: <PhoneCall/>, desc: "২৪/৭ ঢাকা বা রংপুরের বিশেষজ্ঞ ডাক্তারের ভিডিও পরামর্শ।" },
    { title: "ফ্রি হেলথ ক্যাম্প", category: "ডাক্তার ও পরামর্শ", icon: <Stethoscope/>, desc: "মাসে একদিন ডায়াবেটিস ও প্রেশার মাপার ক্যাম্প।" },
    
    { title: "অ্যাম্বুলেন্স সেবা", category: "জরুরি সেবা", icon: <Ambulance/>, desc: "জরুরি প্রয়োজনে সড়ক বা নৌ-পথে রোগী পরিবহন।" },
    { title: "অক্সিজেন ব্যাংক", category: "জরুরি সেবা", icon: <Activity/>, desc: "শ্বাসকষ্টের রোগীদের জন্য বিনামূল্যে অক্সিজেন সিলিন্ডার।" },
    { title: "ব্লাড ডোনেশন ক্লাব", category: "জরুরি সেবা", icon: <HeartHandshake/>, desc: "জরুরি রক্তের প্রয়োজনে ডোনার ম্যানেজ করে দেওয়া।" },

    { title: "ঔষধ হোম ডেলিভারি", category: "ঔষধ ও টেস্ট", icon: <Pill/>, desc: "চুক্তিবদ্ধ ফার্মেসি থেকে ১০-১৫% ছাড়ে ঔষধ অর্ডার।" },
    { title: "প্যাথলজি ডিসকাউন্ট", category: "ঔষধ ও টেস্ট", icon: <Microscope/>, desc: "ডায়াগনস্টিক টেস্টে মেম্বারদের জন্য ৩০-৪০% ছাড়।" },

    { title: "মা ও শিশু যত্ন", category: "মা ও শিশু", icon: <Baby/>, desc: "গর্ভবতী মায়েদের চেকআপ ও নবজাতকের পুষ্টি নিশ্চিতকরণ।" },
  ];

  const filteredItems = activeTab === 'All' ? healthServices : healthServices.filter(item => item.category === activeTab);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    try {
      const { error } = await supabase.from('bookings').insert([{
        member_name: user?.full_name || 'Guest', 
        mobile: user?.mobile,
        service_category: 'Health', 
        item_name: selectedService,
        quantity: `রোগী: ${patientName}`, 
        assigned_staff: `মোবাইল: ${contactMobile}, সমস্যা: ${problemDetails}`,
        status: 'pending'
      }]);

      if (error) throw error;
      alert("সেবার অনুরোধ পাঠানো হয়েছে! আমাদের স্বাস্থ্যকর্মী দ্রুত যোগাযোগ করবেন।");
      setModalOpen(false); setPatientName(''); setProblemDetails(''); setContactMobile('');
    } catch (err: any) { alert("সমস্যা হয়েছে: " + err.message); } 
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen pb-12 bg-slate-50/50">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-600 to-pink-500 rounded-3xl p-8 text-white mb-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">স্বাস্থ্য সুরক্ষা সেবা</h1>
          <p className="text-rose-100 max-w-2xl">
            সুস্থ দেহ, সুন্দর জীবন। আপনার এবং পরিবারের সুস্বাস্থ্যের জন্য আমরা আছি ২৪ ঘণ্টা।
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
                ? 'bg-rose-700 text-white shadow-lg' 
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
                সেবা নিন
              </button>
            </div>
          );
        })}
      </div>

      {/* Emergency Contact Banner */}
      <div className="mt-10 bg-red-50 border border-red-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-red-100 p-4 rounded-full text-red-600 animate-pulse">
            <Phone size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-800">জরুরি অ্যাম্বুলেন্স বা ডাক্তার প্রয়োজন?</h3>
            <p className="text-red-600 text-sm">রাত-দিন ২৪ ঘণ্টা আমাদের হটলাইনে কল করুন</p>
          </div>
        </div>
        <a href="tel:017XXXXXXXX" className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-red-700 transition shadow-lg hover:shadow-red-200">
          ০১৭XX-XXXXXX
        </a>
      </div>

      {/* Service Request Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 flex flex-col max-h-[90vh]">
            
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{selectedService}</h3>
                <p className="text-xs text-slate-500">সেবা গ্রহণের আবেদন ফর্ম</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition"><X size={20}/></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto custom-scrollbar">
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">রোগীর নাম</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-slate-400" size={18}/>
                  <input type="text" required onChange={(e) => setPatientName(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-rose-500 transition" placeholder="রোগীর নাম লিখুন" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">যোগাযোগের নম্বর</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-slate-400" size={18}/>
                  <input type="number" required onChange={(e) => setContactMobile(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-rose-500 transition" placeholder="017xxxxxxxx" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">সমস্যা / বিবরণ</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-slate-400" size={18}/>
                  <textarea 
                    required 
                    onChange={(e) => setProblemDetails(e.target.value)} 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-rose-500 h-28" 
                    placeholder="সমস্যা বিস্তারিত লিখুন (যেমন: ঔষধের নাম, রোগের লক্ষণ)..." 
                  />
                </div>
              </div>

              <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 text-xs text-rose-800 flex gap-3 items-start">
                <HeartPulse size={18} className="shrink-0 text-rose-600"/> 
                <span>
                  জরুরি ক্ষেত্রে অ্যাপে অপেক্ষা না করে সরাসরি আমাদের হটলাইনে কল করার অনুরোধ রইল।
                </span>
              </div>

              <button 
                disabled={loading} 
                className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg transition disabled:opacity-70"
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