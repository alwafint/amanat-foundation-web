'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { 
  Menu, X, Home, Wallet, CreditCard, Calendar, LogOut, 
  TrendingUp, Bell, User, History, ChevronRight 
} from "lucide-react";

export default function MemberDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // ডামি লেনদেন ডাটা
  const transactions = [
    { id: 1, date: "১০ অক্টো, ২০২৪", desc: "মাসিক সঞ্চয় জমা", amount: 500, type: 'credit', status: 'completed' },
    { id: 2, date: "০৫ অক্টো, ২০২৪", desc: "লোন কিস্তি পরিশোধ", amount: 1500, type: 'debit', status: 'completed' },
    { id: 3, date: "০১ অক্টো, ২০২৪", desc: "সার্ভিস চার্জ", amount: 50, type: 'debit', status: 'pending' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* 1. Sidebar (Desktop & Mobile) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-emerald-900 text-white transform transition-transform duration-300 ease-in-out shadow-2xl
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0
      `}>
        <div className="p-6 border-b border-emerald-800 flex justify-between items-center">
          <div className="font-bold text-xl flex items-center gap-2">
            <div className="w-8 h-8 bg-white text-emerald-900 rounded flex items-center justify-center">A</div>
            মেম্বার প্যানেল
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-emerald-200 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <Link href="#" className="flex items-center gap-3 px-4 py-3 bg-emerald-800 rounded-lg text-white font-medium shadow-md border-l-4 border-yellow-400">
            <Home size={20} /> ড্যাশবোর্ড
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-emerald-100 hover:bg-emerald-800 rounded-lg hover:text-white transition">
            <Wallet size={20} /> আমার সঞ্চয়
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-emerald-100 hover:bg-emerald-800 rounded-lg hover:text-white transition">
            <CreditCard size={20} /> লোন স্ট্যাটাস
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-emerald-100 hover:bg-emerald-800 rounded-lg hover:text-white transition">
            <History size={20} /> লেনদেন ইতিহাস
          </Link>
          <div className="pt-8 mt-4 border-t border-emerald-800">
            <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-emerald-800 rounded-lg hover:text-red-200 transition">
              <LogOut size={20} /> লগ আউট
            </Link>
          </div>
        </nav>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        
        {/* Header */}
        <header className="bg-white p-4 shadow-sm flex justify-between items-center sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded">
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-slate-800 hidden sm:block">ড্যাশবোর্ড ওভারভিউ</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition">
               <Bell size={24} />
               <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="font-bold text-sm text-slate-800">আব্দুল করিম</p>
                <p className="text-xs text-slate-500">আইডি: ১২৩৪৫</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 rounded-2xl p-6 md:p-10 text-white mb-8 shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">স্বাগতম, আব্দুল করিম 👋</h1>
              <p className="text-emerald-100 max-w-xl">আপনার বর্তমান ব্যালেন্স এবং লোনের অবস্থা নিচে দেওয়া হলো। নিয়মিত সঞ্চয় করুন, ভবিষ্যৎ গড়ুন।</p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><Wallet size={24} /></div>
                <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">+৫০০ (অক্টোবর)</span>
              </div>
              <h3 className="text-slate-500 text-sm font-medium">মোট সঞ্চয়</h3>
              <p className="text-3xl font-bold text-slate-800 mt-1">৳ ১৫,৫০০</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-lg"><CreditCard size={24} /></div>
                <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded">সক্রিয়</span>
              </div>
              <h3 className="text-slate-500 text-sm font-medium">লোন বাকি</h3>
              <p className="text-3xl font-bold text-slate-800 mt-1">৳ ১০,০০০</p>
            </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Calendar size={24} /></div>
                <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded">৫ দিন বাকি</span>
              </div>
              <h3 className="text-slate-500 text-sm font-medium">পরবর্তী কিস্তি</h3>
              <p className="text-2xl font-bold text-slate-800 mt-1">১৫ অক্টোবর</p>
            </div>
          </div>

          {/* Quick Actions & Recent Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-fit">
              <h3 className="font-bold text-slate-800 mb-4">দ্রুত সেবা</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition border border-slate-100">
                  <Wallet className="mb-2" /> <span>টাকা জমা</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition border border-slate-100">
                  <CreditCard className="mb-2" /> <span>লোন আবেদন</span>
                </button>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">সাম্প্রতিক লেনদেন</h3>
                <button className="text-sm text-emerald-600 font-bold hover:underline flex items-center">সব দেখুন <ChevronRight size={16} /></button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                    <tr>
                      <th className="p-4">তারিখ</th>
                      <th className="p-4">বিবরণ</th>
                      <th className="p-4">স্ট্যাটাস</th>
                      <th className="p-4 text-right">টাকা</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50 transition">
                        <td className="p-4 text-slate-500 font-medium">{tx.date}</td>
                        <td className="p-4 text-slate-800 font-bold">{tx.desc}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            tx.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {tx.status === 'completed' ? 'সম্পন্ন' : 'প্রক্রিয়াধীন'}
                          </span>
                        </td>
                        <td className={`p-4 text-right font-bold ${tx.type === 'credit' ? 'text-emerald-600' : 'text-red-500'}`}>
                          {tx.type === 'credit' ? '+' : '-'} ৳{tx.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}