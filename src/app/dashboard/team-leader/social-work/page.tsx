'use client';

import React, { useState } from 'react';
import { 
  Users, UserPlus, Camera, Send, 
  Megaphone, Heart, Share2 
} from "lucide-react";

export default function SocialWorkPage() {
  const [activeTab, setActiveTab] = useState('activities'); // activities, volunteers

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-600 p-6 rounded-2xl text-white mb-6 shadow-lg">
        <h2 className="text-2xl font-bold flex items-center gap-2">
           <Heart className="text-pink-400" fill="currentColor"/> সমাজসেবা ও ভলান্টিয়ার
        </h2>
        <p className="text-purple-100 text-sm">গ্রামের উন্নয়নে যুবসমাজকে কাজে লাগান</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
         <button onClick={() => setActiveTab('activities')} className={`flex-1 py-2 rounded-xl font-bold transition ${activeTab === 'activities' ? 'bg-indigo-600 text-white shadow' : 'bg-white text-slate-500'}`}>
            সামাজিক কাজ (রিপোর্ট)
         </button>
         <button onClick={() => setActiveTab('volunteers')} className={`flex-1 py-2 rounded-xl font-bold transition ${activeTab === 'volunteers' ? 'bg-indigo-600 text-white shadow' : 'bg-white text-slate-500'}`}>
            ভলান্টিয়ার টিম
         </button>
      </div>

      {/* --- Tab 1: Activities Report --- */}
      {activeTab === 'activities' && (
        <div className="space-y-6">
           {/* Report Form */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <Camera size={20} className="text-indigo-600"/> কাজের ছবি আপলোড ও প্রচার
              </h3>
              <div className="space-y-4">
                 <input type="text" placeholder="কাজের শিরোনাম (যেমন: মসজিদ পরিষ্কার)" className="w-full p-3 border rounded-xl" />
                 <textarea placeholder="বিস্তারিত বিবরণ..." className="w-full p-3 border rounded-xl h-24" />
                 
                 <div className="border-2 border-dashed border-slate-300 p-6 rounded-xl text-center text-slate-400 cursor-pointer hover:bg-slate-50">
                    <Camera className="mx-auto mb-2"/>
                    <span className="text-xs">ছবি বা ভিডিও যুক্ত করুন</span>
                 </div>

                 <div className="flex gap-3">
                    <button className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition">
                       অফিসে রিপোর্ট পাঠান
                    </button>
                    <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                       <Share2 size={18}/> ফেসবুকে শেয়ার
                    </button>
                 </div>
              </div>
           </div>

           {/* Previous Activities */}
           <div>
              <h4 className="font-bold text-slate-700 mb-3">পূর্ববর্তী কাজসমূহ</h4>
              {[1, 2].map(i => (
                 <div key={i} className="bg-white p-4 rounded-xl border mb-3 flex gap-4">
                    <div className="w-20 h-20 bg-slate-200 rounded-lg shrink-0"></div>
                    <div>
                       <h5 className="font-bold text-slate-800">শীতবস্ত্র বিতরণ</h5>
                       <p className="text-xs text-slate-500 mt-1">১৫ জন ভলান্টিয়ার উপস্থিত ছিলেন।</p>
                       <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded mt-2 inline-block">সম্পন্ন হয়েছে</span>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      )}

      {/* --- Tab 2: Volunteers List --- */}
      {activeTab === 'volunteers' && (
        <div>
           <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-700">আমার ভলান্টিয়ারগণ</h3>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                 <UserPlus size={16}/> নতুন ভলান্টিয়ার
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['রহিম', 'করিম', 'সুমন', 'আরিফ'].map((name, idx) => (
                 <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                       {name.charAt(0)}
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-800">{name}</h4>
                       <p className="text-xs text-slate-500">ব্লাড গ্রুপ: A+</p>
                    </div>
                    <button className="ml-auto bg-green-50 text-green-600 p-2 rounded-full hover:bg-green-100">
                       <Megaphone size={16}/>
                    </button>
                 </div>
              ))}
           </div>
        </div>
      )}

    </div>
  );
}