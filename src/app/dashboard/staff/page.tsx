'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, ClipboardList, CheckSquare, 
  Menu, X, Bell, LogOut, Search, PhoneCall, 
  UserCheck, Tractor, Scale, MapPin, PlusCircle
} from "lucide-react";
// Supabase import (আপনার পাথ অনুযায়ী)
import { supabase } from '../../../lib/supabaseClient'; 

export default function StaffDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // --- MOCK DATA (টেস্টিং এর জন্য) ---
  const pendingTasks = [
    { id: 1, title: "করিম মিয়া - ট্রাক্টর বুকিং", time: "১০ মিনিট আগে", type: "farmer", status: "pending" },
    { id: 2, title: "রহিমা খাতুন - লোন আবেদন", time: "১ ঘণ্টা আগে", type: "loan", status: "pending" },
    { id: 3, title: "নতুন মেম্বার ভেরিফিকেশন", time: "২ ঘণ্টা আগে", type: "member", status: "urgent" },
  ];

  // --- TAB CONTENT RENDERER ---
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewSection tasks={pendingTasks} />;
      case 'members':
        return <MemberManagement />;
      case 'requests':
        return <RequestProcessing />;
      case 'verify':
        return <VerificationCenter />;
      default:
        return <OverviewSection tasks={pendingTasks} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* --- SIDEBAR (Mobile & Desktop) --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 text-white transition-transform duration-300 transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:inset-0
      `}>
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold tracking-wide flex items-center gap-2">
            <CheckSquare className="text-emerald-400" /> STAFF<span className="text-emerald-400">PANEL</span>
          </h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20}/>} label="ওভারভিউ" active={activeTab === 'overview'} onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }} />
          <NavItem icon={<Users size={20}/>} label="মেম্বার ম্যানেজ" active={activeTab === 'members'} onClick={() => { setActiveTab('members'); setSidebarOpen(false); }} />
          <NavItem icon={<ClipboardList size={20}/>} label="সেবা রিকোয়েস্ট" active={activeTab === 'requests'} onClick={() => { setActiveTab('requests'); setSidebarOpen(false); }} />
          <NavItem icon={<UserCheck size={20}/>} label="ভেরিফিকেশন" active={activeTab === 'verify'} onClick={() => { setActiveTab('verify'); setSidebarOpen(false); }} />
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">S</div>
            <div>
              <p className="text-sm font-bold">স্টাফ প্রোফাইল</p>
              <p className="text-xs text-slate-400">ফিল্ড অফিসার</p>
            </div>
          </div>
          <button className="flex items-center gap-3 text-red-400 hover:text-red-300 w-full p-2 rounded hover:bg-slate-700 transition text-sm">
            <LogOut size={18} /> লগআউট
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 z-40">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-bold text-slate-700 hidden md:block">
              কাজের তালিকা
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 relative text-slate-500 hover:bg-slate-100 rounded-full">
              <Bell size={22} />
              <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-slate-50">
          {renderContent()}
        </main>
      </div>
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 md:hidden"></div>
      )}
    </div>
  );
}

// --- 1. OVERVIEW SECTION ---
const OverviewSection = ({ tasks }: any) => (
  <div className="animate-in fade-in duration-300">
    {/* Quick Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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

    {/* Task List */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-bold text-slate-700">অপেক্ষমান কাজ (Pending Tasks)</h3>
        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">৩ টি বাকি</span>
      </div>
      <div className="divide-y divide-slate-100">
        {tasks.map((task: any) => (
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
            <button className="px-3 py-1 bg-slate-800 text-white text-xs rounded hover:bg-slate-700">
              বিস্তারিত
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- 2. MEMBER MANAGEMENT SECTION ---
const MemberManagement = () => (
  <div className="animate-in fade-in zoom-in-95 duration-300">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-bold text-slate-700">মেম্বার তালিকা</h3>
      <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-200 hover:bg-emerald-700">
        <PlusCircle size={16} /> নতুন মেম্বার
      </button>
    </div>

    {/* Search Box */}
    <div className="bg-white p-4 rounded-xl shadow-sm border mb-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 text-slate-400" size={18} />
        <input type="text" placeholder="নাম বা মোবাইল নম্বর দিয়ে খুঁজুন..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
      </div>
    </div>

    {/* Member List (Card Style for Mobile) */}
    <div className="space-y-3">
      {[1, 2, 3].map((m) => (
        <div key={m} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">M</div>
            <div>
              <h4 className="font-bold text-slate-700 text-sm">আব্দুল করিম</h4>
              <p className="text-xs text-slate-400">ID: MEM-2024-{m}05</p>
              <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded mt-1 inline-block">Active</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><PhoneCall size={16}/></button>
            <button className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100">প্রোফাইল</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- 3. REQUEST PROCESSING SECTION ---
const RequestProcessing = () => (
  <div className="animate-in fade-in zoom-in-95 duration-300">
    <h3 className="text-lg font-bold text-slate-700 mb-4">সেবা রিকোয়েস্ট প্রসেসিং</h3>
    
    {/* Categories */}
    <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
      {['সব', 'কৃষি', 'আইনি', 'স্বাস্থ্য'].map((cat) => (
        <button key={cat} className="px-4 py-1.5 bg-white border rounded-full text-sm text-slate-600 whitespace-nowrap hover:bg-slate-50 active:bg-slate-800 active:text-white focus:bg-slate-800 focus:text-white transition">
          {cat}
        </button>
      ))}
    </div>

    {/* Request Cards */}
    <div className="space-y-4">
      {/* Sample Request 1 */}
      <div className="bg-white p-5 rounded-xl border border-l-4 border-l-emerald-500 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded font-bold">কৃষি সেবা</span>
          <span className="text-xs text-slate-400">১২ ফেব, ২০২৬</span>
        </div>
        <h4 className="font-bold text-slate-800">পাওয়ার টিলার ভাড়ার আবেদন</h4>
        <p className="text-sm text-slate-500 mt-1 mb-3">আবেদনকারী: মো: রফিক (রসুলপুর)</p>
        
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 bg-slate-50 p-2 rounded">
           <MapPin size={14}/> জমি: ৩০ শতাংশ, লোকেশন: পূর্ব পাড়া
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="py-2 rounded-lg border border-red-200 text-red-600 text-sm font-bold hover:bg-red-50">বাতিল</button>
          <button className="py-2 rounded-lg bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700">মঞ্জুর করুন</button>
        </div>
      </div>

      {/* Sample Request 2 */}
      <div className="bg-white p-5 rounded-xl border border-l-4 border-l-indigo-500 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <span className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded font-bold">আইনি সহায়তা</span>
          <span className="text-xs text-slate-400">১০ ফেব, ২০২৬</span>
        </div>
        <h4 className="font-bold text-slate-800">জমি মাপার সার্ভেয়ার প্রয়োজন</h4>
        <p className="text-sm text-slate-500 mt-1 mb-3">আবেদনকারী: হাসেম আলী</p>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50">কল করুন</button>
          <button className="py-2 rounded-lg bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700">অ্যাসাইন করুন</button>
        </div>
      </div>
    </div>
  </div>
);

// --- 4. VERIFICATION SECTION ---
const VerificationCenter = () => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 text-center animate-in fade-in zoom-in-95 duration-300">
    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
      <UserCheck size={32} />
    </div>
    <h3 className="text-lg font-bold text-slate-800 mb-2">আইডি ভেরিফিকেশন</h3>
    <p className="text-slate-500 text-sm mb-6">মেম্বারদের জাতীয় পরিচয়পত্র এবং ছবি যাচাই করে অ্যাকাউন্ট অ্যাক্টিভ করুন।</p>
    
    <div className="p-4 bg-slate-50 rounded-lg border border-dashed border-slate-300 text-slate-400 text-sm">
      কোনো পেন্ডিং ভেরিফিকেশন নেই
    </div>
  </div>
);

// --- HELPER: Navigation Item ---
const NavItem = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 w-full p-3 rounded-lg transition font-medium text-sm ${
      active 
        ? "bg-slate-700 text-white shadow-lg" 
        : "text-slate-400 hover:bg-slate-700 hover:text-white"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);