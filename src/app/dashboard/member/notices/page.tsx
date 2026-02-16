'use client';

import React, { useState, useEffect } from 'react';
import { 
  Megaphone, Calendar, Bell, Info, 
  AlertCircle, Search, Filter, ArrowRight, 
  Clock, Pin, ChevronDown, Loader2
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function NoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedNotice, setExpandedNotice] = useState<number | null>(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    // নোট: আপনার ডাটাবেজে 'notices' নামে টেবিল থাকতে হবে। 
    // আপাতত ডামি ডাটা দিয়ে দেখাচ্ছি যদি টেবিল না থাকে।
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .order('is_pinned', { ascending: false }) // পিন করা নোটিশ আগে
      .order('created_at', { ascending: false });

    if (error) {
      // যদি ডাটাবেজ টেবিল না থাকে তবে ডামি ডাটা দেখাবে
      const dummyNotices = [
        {
          id: 1,
          title: "ফ্রি চক্ষু শিবির অনুষ্ঠিত হবে আগামী শুক্রবার",
          content: "আমানত ফাউন্ডেশনের উদ্যোগে আগামী শুক্রবার সাঘাটা কেন্দ্রীয় কার্যালয়ে দিনব্যাপী ফ্রি চক্ষু শিবির অনুষ্ঠিত হবে। চক্ষু বিশেষজ্ঞ ডাক্তাররা মেম্বারদের বিনামূল্যে পরামর্শ ও ঔষধ প্রদান করবেন। সকাল ১০টা থেকে বিকাল ৪টা পর্যন্ত রেজিস্ট্রেশন চলবে।",
          category: "event",
          is_pinned: true,
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          title: "নতুন লোন কিস্তি পরিশোধের সময়সীমা আপডেট",
          content: "সকল মেম্বারদের জানানো যাচ্ছে যে, আগামী মাস থেকে লোন কিস্তি পরিশোধের তারিখ প্রতি মাসের ১০ তারিখের পরিবর্তে ১৫ তারিখ করা হয়েছে। বিস্তারিত জানতে আপনার নিকটস্থ স্টাফের সাথে কথা বলুন।",
          category: "urgent",
          is_pinned: false,
          created_at: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 3,
          title: "কারিগরি প্রশিক্ষণ কোর্সে ভর্তি চলছে",
          content: "কম্পিউটার অফিস অ্যাপ্লিকেশন এবং সেলাই প্রশিক্ষণ কোর্সের নতুন ব্যাচে ভর্তি শুরু হয়েছে। মেম্বারদের সন্তানদের জন্য ৫০% ছাড় রয়েছে।",
          category: "general",
          is_pinned: false,
          created_at: new Date(Date.now() - 172800000).toISOString()
        }
      ];
      setNotices(dummyNotices);
    } else {
      setNotices(data || []);
    }
    setLoading(false);
  };

  // ক্যাটাগরি অনুযায়ী স্টাইল
  const getCategoryStyle = (cat: string) => {
    switch (cat) {
      case 'urgent': return 'bg-red-50 text-red-600 border-red-100';
      case 'event': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    }
  };

  const filteredNotices = notices.filter(n => activeFilter === 'all' || n.category === activeFilter);

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto pb-20">
      
      {/* --- Page Header --- */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-slate-800 flex items-center justify-center md:justify-start gap-3">
          <Megaphone className="text-emerald-600 animate-bounce-slow" /> নোটিশ বোর্ড
        </h1>
        <p className="text-slate-500 mt-2">আমানত ফাউন্ডেশনের সকল জরুরি ঘোষণা ও খবরাখবর</p>
      </div>

      {/* --- Filter Chips --- */}
      <div className="flex gap-2 overflow-x-auto pb-6 custom-scrollbar no-scrollbar">
        {[
          { id: 'all', label: 'সব নোটিশ', icon: <Bell size={14}/> },
          { id: 'urgent', label: 'জরুরি', icon: <AlertCircle size={14}/> },
          { id: 'event', label: 'ইভেন্ট', icon: <Calendar size={14}/> },
          { id: 'general', label: 'সাধারণ', icon: <Info size={14}/> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              activeFilter === tab.id 
                ? 'bg-slate-900 text-white shadow-lg' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* --- Notices List --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-emerald-600 mb-2" size={32} />
          <p className="text-slate-400">অপেক্ষা করুন...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotices.map((notice) => (
            <div 
              key={notice.id} 
              className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden ${
                notice.is_pinned ? 'border-emerald-200 ring-2 ring-emerald-50' : 'border-slate-100'
              } ${expandedNotice === notice.id ? 'shadow-md ring-2 ring-emerald-100' : 'hover:border-emerald-300'}`}
            >
              {/* Card Header */}
              <div 
                className="p-5 cursor-pointer flex justify-between items-start gap-4"
                onClick={() => setExpandedNotice(expandedNotice === notice.id ? null : notice.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {notice.is_pinned && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        <Pin size={10} className="fill-emerald-600"/> Pinned
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getCategoryStyle(notice.category)}`}>
                      {notice.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 ml-auto">
                       <Clock size={10}/> {new Date(notice.created_at).toLocaleDateString('bn-BD')}
                    </span>
                  </div>
                  <h3 className={`font-bold text-slate-800 md:text-lg leading-snug ${expandedNotice === notice.id ? '' : 'line-clamp-1'}`}>
                    {notice.title}
                  </h3>
                </div>
                <div className={`p-1 rounded-full bg-slate-50 text-slate-400 transition-transform ${expandedNotice === notice.id ? 'rotate-180' : ''}`}>
                   <ChevronDown size={20}/>
                </div>
              </div>

              {/* Card Expanded Content */}
              {expandedNotice === notice.id && (
                <div className="px-5 pb-6 animate-in slide-in-from-top-2 duration-300">
                  <div className="w-full h-px bg-slate-100 mb-4"></div>
                  <div className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                    {notice.content}
                  </div>
                  
                  {/* Action Buttons inside notice (Optional) */}
                  <div className="mt-6 flex gap-3">
                    <button className="flex-1 bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-100">
                      আরও তথ্য জানুন <ArrowRight size={16}/>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredNotices.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <Megaphone className="mx-auto mb-4 text-slate-200" size={64} />
              <h3 className="text-lg font-bold text-slate-700">কোনো নোটিশ পাওয়া যায়নি</h3>
              <p className="text-slate-400">পরে আবার চেক করুন।</p>
            </div>
          )}
        </div>
      )}

      {/* --- Emergency Footer Notice --- */}
      <div className="mt-10 p-6 bg-slate-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
         <div className="flex items-center gap-4 text-center md:text-left">
            <div className="p-3 bg-white/10 rounded-full text-yellow-400">
               <Bell size={28}/>
            </div>
            <div>
               <h4 className="font-bold">জরুরি আপডেট পেতে চান?</h4>
               <p className="text-xs text-slate-400">আমাদের অফিসিয়াল হোয়াটসঅ্যাপ গ্রুপে জয়েন করুন।</p>
            </div>
         </div>
         <button className="bg-emerald-600 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-500 transition shadow-lg">
            হোয়াটসঅ্যাপ জয়েন
         </button>
      </div>

    </div>
  );
}