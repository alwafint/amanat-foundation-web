'use client';

import React from 'react';
import Link from "next/link";
import { 
  Users, DollarSign, FileText, Activity, LayoutDashboard, Settings, 
  LogOut, CheckCircle, XCircle 
} from "lucide-react";

export default function AdminDashboard() {
  
  // ডামি মেম্বার রিকোয়েস্ট ডাটা
  const pendingRequests = [
    { id: 1, name: "রহিম মিয়া", type: "লোন আবেদন", amount: "২০,০০০", time: "২ ঘণ্টা আগে" },
    { id: 2, name: "করিম শেখ", type: "নতুন মেম্বার", amount: "-", time: "৫ ঘণ্টা আগে" },
    { id: 3, name: "সালেহা বেগম", type: "সেলাই লোন", amount: "১০,০০০", time: "১ দিন আগে" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-800">
       
       {/* Sidebar */}
       <aside className="w-20 lg:w-64 bg-slate-900 text-white flex flex-col fixed h-full transition-all z-50">
          <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-800">
             <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center font-bold mr-0 lg:mr-3">A</div>
             <span className="hidden lg:block font-bold text-xl tracking-tight">অ্যাডমিন</span>
          </div>
          
          <nav className="flex-1 py-6 space-y-2 px-3">
            <Link href="#" className="flex items-center gap-3 p-3 bg-emerald-700 rounded-lg text-white justify-center lg:justify-start shadow-md">
              <LayoutDashboard size={20} /> <span className="hidden lg:block font-medium">ড্যাশবোর্ড</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition justify-center lg:justify-start">
              <Users size={20} /> <span className="hidden lg:block font-medium">মেম্বার তালিকা</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition justify-center lg:justify-start">
              <FileText size={20} /> <span className="hidden lg:block font-medium">লোন রিকোয়েস্ট</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition justify-center lg:justify-start">
              <Settings size={20} /> <span className="hidden lg:block font-medium">সেটিংস</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-slate-800">
             <Link href="/login" className="flex items-center gap-3 p-3 hover:bg-red-900/50 text-red-400 rounded-lg justify-center lg:justify-start transition">
                <LogOut size={20} /> <span className="hidden lg:block font-medium">লগ আউট</span>
             </Link>
          </div>
       </aside>

       {/* Main Content (Margin Left for Sidebar) */}
       <main className="flex-1 ml-20 lg:ml-64 p-6 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
             <div>
                <h1 className="text-3xl font-bold text-slate-800">অফিস ড্যাশবোর্ড</h1>
                <p className="text-slate-500">আজকের কার্যক্রমের সংক্ষিপ্ত বিবরণ</p>
             </div>
             <button className="bg-slate-800 text-white px-5 py-2.5 rounded-lg shadow hover:bg-slate-700 font-bold text-sm">
                রিপোর্ট ডাউনলোড
             </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-purple-500">
               <div className="flex justify-between items-start">
                 <div>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">মোট মেম্বার</p>
                   <h3 className="text-2xl font-bold text-slate-800 mt-1">১,২৫০ জন</h3>
                 </div>
                 <div className="p-3 bg-purple-100 rounded-lg text-purple-600"><Users size={24} /></div>
               </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-emerald-500">
               <div className="flex justify-between items-start">
                 <div>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">আজকের কালেকশন</p>
                   <h3 className="text-2xl font-bold text-slate-800 mt-1">৳ ৩৫,০০০</h3>
                 </div>
                 <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600"><DollarSign size={24} /></div>
               </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-blue-500">
               <div className="flex justify-between items-start">
                 <div>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">মোট লোন বিতরণ</p>
                   <h3 className="text-2xl font-bold text-slate-800 mt-1">৳ ২ লক্ষ+</h3>
                 </div>
                 <div className="p-3 bg-blue-100 rounded-lg text-blue-600"><Activity size={24} /></div>
               </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-yellow-500">
               <div className="flex justify-between items-start">
                 <div>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">পেন্ডিং আবেদন</p>
                   <h3 className="text-2xl font-bold text-slate-800 mt-1">৩ টি</h3>
                 </div>
                 <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600"><FileText size={24} /></div>
               </div>
            </div>
          </div>

          {/* Recent Applications Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-800">অপেক্ষমান আবেদনসমূহ</h3>
             </div>
             
             <div className="divide-y divide-slate-100">
                {pendingRequests.map((req) => (
                  <div key={req.id} className="p-5 flex flex-col md:flex-row justify-between items-center hover:bg-slate-50 transition gap-4">
                     <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                           {req.name.charAt(0)}
                        </div>
                        <div>
                           <h4 className="font-bold text-slate-800">{req.name}</h4>
                           <div className="flex items-center gap-2 text-sm text-slate-500">
                              <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-bold border border-slate-200">{req.type}</span>
                              <span>• {req.time}</span>
                           </div>
                        </div>
                     </div>

                     <div className="text-right w-full md:w-auto">
                        <p className="font-bold text-slate-800">৳ {req.amount}</p>
                        <p className="text-xs text-slate-400">পরিমাণ</p>
                     </div>

                     <div className="flex gap-3 w-full md:w-auto justify-end">
                        <button className="flex items-center gap-1 px-4 py-2 text-sm font-bold bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition">
                           <XCircle size={16} /> বাতিল
                        </button>
                        <button className="flex items-center gap-1 px-4 py-2 text-sm font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-md shadow-emerald-200">
                           <CheckCircle size={16} /> অনুমোদন
                        </button>
                     </div>
                  </div>
                ))}
             </div>
             <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
                <button className="text-emerald-700 font-bold text-sm hover:underline">সব আবেদন দেখুন</button>
             </div>
          </div>
       </main>
    </div>
  );
}