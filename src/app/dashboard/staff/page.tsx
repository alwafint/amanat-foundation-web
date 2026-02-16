'use client';

import React from 'react';
import { Tractor, ClipboardList, UserCheck } from "lucide-react";

export default function StaffOverview() {
  const pendingTasks = [
    { id: 1, title: "করিম মিয়া - ট্রাক্টর বুকিং", time: "১০ মিনিট আগে", type: "farmer" },
    { id: 2, title: "রহিমা খাতুন - লোন আবেদন", time: "১ ঘণ্টা আগে", type: "loan" },
    { id: 3, title: "নতুন মেম্বার ভেরিফিকেশন", time: "২ ঘণ্টা আগে", type: "member" },
  ];

  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">কাজের সারাংশ</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
          <p className="text-slate-500 text-xs font-bold">নতুন রিকোয়েস্ট</p>
          <h3 className="text-2xl font-bold text-emerald-600">১২</h3>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
          <p className="text-slate-500 text-xs font-bold">পেন্ডিং ভেরিফিকেশন</p>
          <h3 className="text-2xl font-bold text-blue-600">০৫</h3>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100">
          <p className="text-slate-500 text-xs font-bold">চলমান কাজ</p>
          <h3 className="text-2xl font-bold text-orange-600">০৮</h3>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100">
          <p className="text-slate-500 text-xs font-bold">আজকের কালেকশন</p>
          <h3 className="text-xl font-bold text-purple-600">৳ ৪,৫০০</h3>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-slate-700">অপেক্ষমান কাজ (Pending Tasks)</h3>
          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">৩ টি বাকি</span>
        </div>
        <div className="divide-y divide-slate-100">
          {pendingTasks.map((task: any) => (
            <div key={task.id} className="p-4 hover:bg-slate-50 transition flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  task.type === 'farmer' ? 'bg-emerald-100 text-emerald-600' :
                  task.type === 'loan' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  {task.type === 'farmer' ? <Tractor size={18}/> : task.type === 'loan' ? <ClipboardList size={18}/> : <UserCheck size={18}/>}
                </div>
                <div>
                  <p className="font-bold text-slate-700 text-sm">{task.title}</p>
                  <p className="text-xs text-slate-400">{task.time}</p>
                </div>
              </div>
              <button className="px-3 py-1 bg-slate-800 text-white text-xs rounded hover:bg-slate-700">বিস্তারিত</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}