'use client';

import React, { useState, useEffect } from 'react';
import { 
  LifeBuoy, Phone, MessageCircle, Mail, MapPin, 
  Send, HelpCircle, ChevronDown, User, Loader2,
  Clock, ShieldCheck, CheckCircle2
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function SupportPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // ফর্ম স্টেট
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const faqs = [
    {
      q: "সদস্য হওয়ার জন্য কী কী প্রয়োজন?",
      a: "সদস্য হওয়ার জন্য আপনার জাতীয় পরিচয়পত্র (NID) এবং সচল মোবাইল নম্বর প্রয়োজন। আমাদের যেকোনো স্টাফের মাধ্যমে আপনি রেজিস্ট্রেশন সম্পন্ন করতে পারেন।"
    },
    {
      q: "লোন বা বিনিয়োগ পাওয়ার যোগ্যতা কী?",
      a: "নূন্যতম ৩ মাস নিয়মিত সঞ্চয় জমা থাকলে আপনি আপনার সঞ্চয়ের ৯০% পর্যন্ত তাৎক্ষণিক বিনিয়োগ সুবিধা বা লোন পাওয়ার যোগ্য হবেন।"
    },
    {
      q: "টাকা জমা দেওয়ার মাধ্যমগুলো কী কী?",
      a: "আপনি আমাদের অফিসিয়াল বিকাশ, নগদ বা রকেট মার্চেন্ট নম্বরে 'Payment' করে ট্রানজেকশন আইডি অ্যাপে সাবমিট করতে পারেন অথবা সরাসরি আমাদের ফিল্ড অফিসারের কাছে জমা দিয়ে রসিদ নিতে পারেন।"
    },
    {
      q: "অ্যাকাউন্ট ভেরিফিকেশন হতে কত সময় লাগে?",
      a: "সাধারণত তথ্য সাবমিট করার ২৪-৪৮ ঘণ্টার মধ্যে আমাদের টিম আপনার তথ্য যাচাই করে অ্যাকাউন্ট সচল করে দেয়।"
    }
  ];

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // সাপোর্ট রিকোয়েস্টকে আমরা 'bookings' টেবিলে 'Support' ক্যাটাগরিতে সেভ করছি
      const { error } = await supabase.from('bookings').insert([{
        member_name: user?.full_name || 'Guest',
        mobile: user?.mobile,
        staff_id: user?.referred_by || 'Admin',
        service_category: 'Support',
        item_name: `Help Request: ${subject}`,
        quantity: "Message Submission",
        assigned_staff: `Message: ${message}`,
        status: 'pending_staff'
      }]);

      if (error) throw error;
      alert("আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। শীঘ্রই আমাদের প্রতিনিধি যোগাযোগ করবেন।");
      setSubject('');
      setMessage('');
    } catch (err: any) {
      alert("সমস্যা হয়েছে: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20 max-w-6xl mx-auto">
      
      {/* --- Page Header --- */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-slate-800 flex items-center justify-center md:justify-start gap-3">
          <LifeBuoy className="text-emerald-600" /> সহায়তা কেন্দ্র
        </h1>
        <p className="text-slate-500 mt-2">আমরা আপনার যেকোনো সমস্যা সমাধানে ২৪ ঘণ্টা প্রস্তুত</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Side: Contact Info & Staff Info --- */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Dedicated Staff Card */}
          <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><User size={80}/></div>
             <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-300 mb-4">আপনার দায়িত্বরত স্টাফ</h3>
             <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                   <User size={24}/>
                </div>
                <div>
                   <p className="font-bold text-lg leading-none">{user?.referred_by ? 'অফিসার আইডি: ' + user.referred_by : 'আমানত অফিস'}</p>
                   <p className="text-xs text-emerald-200 mt-1 italic">যেকোনো প্রয়োজনে উনাকে কল করুন</p>
                </div>
             </div>
             <a href={`tel:${user?.referred_by}`} className="relative z-10 w-full bg-white text-emerald-900 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-50 transition active:scale-95">
                <Phone size={18}/> সরাসরি কল করুন
             </a>
          </div>

          {/* Quick Connect Grid */}
          <div className="grid grid-cols-1 gap-4">
             <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-emerald-200 transition group cursor-pointer">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition">
                   <MessageCircle size={24}/>
                </div>
                <div>
                   <p className="text-xs text-slate-400 font-bold uppercase">হোয়াটসঅ্যাপ</p>
                   <p className="font-bold text-slate-700">০১৭XX-XXXXXX</p>
                </div>
             </div>
             <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-emerald-200 transition group cursor-pointer">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition">
                   <Mail size={24}/>
                </div>
                <div>
                   <p className="text-xs text-slate-400 font-bold uppercase">ইমেইল করুন</p>
                   <p className="font-bold text-slate-700 font-mono text-sm">support@amanat.com</p>
                </div>
             </div>
             <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-slate-50 text-slate-600 rounded-xl">
                   <MapPin size={24}/>
                </div>
                <div>
                   <p className="text-xs text-slate-400 font-bold uppercase">প্রধান কার্যালয়</p>
                   <p className="font-bold text-slate-700 text-sm">সাঘাটা বাজার, গাইবান্ধা</p>
                </div>
             </div>
          </div>
        </div>

        {/* --- Right Side: Support Form & FAQ --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Support Form */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 relative">
             <div className="flex items-center gap-3 mb-6">
                <Send className="text-emerald-600" size={24}/>
                <h3 className="text-xl font-bold text-slate-800">সরাসরি বার্তা পাঠান</h3>
             </div>
             
             <form onSubmit={handleSupportSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">বিষয়</label>
                      <input 
                        type="text" required value={subject} onChange={(e) => setSubject(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 transition" 
                        placeholder="যেমন: সঞ্চয় সংক্রান্ত" 
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">আপনার নাম (অটো)</label>
                      <input type="text" disabled value={user?.full_name || ''} className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed" />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-1.5">আপনার মেসেজ</label>
                   <textarea 
                     required value={message} onChange={(e) => setMessage(e.target.value)}
                     className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 transition h-32" 
                     placeholder="আপনার সমস্যা বা জিজ্ঞাসা বিস্তারিত লিখুন..." 
                   />
                </div>
                <button 
                  disabled={loading}
                  className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <><Send size={20}/> মেসেজ পাঠান</>}
                </button>
             </form>
          </div>

          {/* FAQ Section */}
          <div className="space-y-4">
             <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 px-2">
                <HelpCircle className="text-emerald-600" /> সচরাচর জিজ্ঞাসা (FAQ)
             </h3>
             <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition">
                    <button 
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-5 text-left flex justify-between items-center group"
                    >
                      <span className="font-bold text-slate-700 group-hover:text-emerald-700 transition-colors">{faq.q}</span>
                      <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedFaq === index && (
                      <div className="px-5 pb-5 animate-in slide-in-from-top-2 duration-300">
                        <div className="w-full h-px bg-slate-50 mb-4"></div>
                        <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>

      {/* --- Safe Guarantee Banner --- */}
      <div className="mt-16 bg-slate-100 p-8 rounded-[2.5rem] border border-slate-200 flex flex-col md:flex-row items-center gap-8 justify-center">
          <div className="flex items-center gap-3">
             <ShieldCheck size={40} className="text-emerald-600"/>
             <div>
                <h4 className="font-bold text-slate-800 text-lg">আপনার তথ্য সম্পূর্ণ নিরাপদ</h4>
                <p className="text-slate-500 text-xs">অত্যাধুনিক ডাটা এনক্রিপশন ও গোপনীয়তা আমাদের অঙ্গীকার</p>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <CheckCircle2 size={40} className="text-emerald-600"/>
             <div>
                <h4 className="font-bold text-slate-800 text-lg">দ্রুত সমাধান</h4>
                <p className="text-slate-500 text-xs">আমরা প্রতিটি মেসেজের উত্তর ১২-২৪ ঘণ্টার মধ্যে প্রদান করি</p>
             </div>
          </div>
      </div>

    </div>
  );
}