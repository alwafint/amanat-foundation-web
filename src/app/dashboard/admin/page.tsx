'use client';

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Tractor, Scale, HeartPulse, 
  Wallet, FileText, Menu, X, Bell, LogOut, Search, 
  CheckCircle, XCircle, MoreVertical, DollarSign 
} from "lucide-react";
import { supabase } from '../../../lib/supabaseClient'; // পাথ ঠিক করে নিন

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  // --- MOCK DATA (Testing purpose) ---
  // ডেটাবেজ কানেক্ট করার পর এগুলো মুছে ফেচ করা ডেটা বসাবেন
  const stats = [
    { title: "মোট মেম্বার", value: "১,২৫০", icon: <Users />, color: "bg-blue-500" },
    { title: "নতুন আবেদন", value: "৪৫", icon: <FileText />, color: "bg-orange-500" },
    { title: "আজকের আয়", value: "৳ ১২,৫০০", icon: <DollarSign />, color: "bg-emerald-500" },
    { title: "পেন্ডিং লোন", value: "৮", icon: <Wallet />, color: "bg-purple-500" },
  ];

  const recentRequests = [
    { id: 1, name: "রহিম মিয়া", type: "কৃষক সেবা", item: "পাওয়ার টিলার", date: "12 Feb 2026", status: "Pending" },
    { id: 2, name: "করিম বক্স", type: "আইনি সহায়তা", item: "জমি মাপা", date: "11 Feb 2026", status: "Approved" },
    { id: 3, name: "সালেহা বেগম", type: "স্বাস্থ্য", item: "টেলিমেডিসিন", date: "10 Feb 2026", status: "Pending" },
    { id: 4, name: "জুয়েল রানা", type: "সাবস্ক্রিপশন", item: "মাসিক প্ল্যান", date: "10 Feb 2026", status: "Paid" },
  ];

  // --- RENDER CONTENT BASED ON TAB ---
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewSection stats={stats} requests={recentRequests} />;
      case 'members':
        return <MembersSection />;
      case 'requests':
        return <ServiceRequestsSection />;
      case 'subscriptions':
        return <SubscriptionSection />;
      default:
        return <OverviewSection stats={stats} requests={recentRequests} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* --- SIDEBAR (Desktop & Mobile) --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:inset-0
      `}>
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold tracking-wider">ADMIN<span className="text-emerald-400">PANEL</span></h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20}/>} label="ড্যাশবোর্ড" active={activeTab === 'overview'} onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }} />
          <NavItem icon={<Users size={20}/>} label="মেম্বার লিস্ট" active={activeTab === 'members'} onClick={() => { setActiveTab('members'); setSidebarOpen(false); }} />
          <NavItem icon={<FileText size={20}/>} label="সেবা রিকোয়েস্ট" active={activeTab === 'requests'} onClick={() => { setActiveTab('requests'); setSidebarOpen(false); }} />
          <NavItem icon={<DollarSign size={20}/>} label="সাবস্ক্রিপশন" active={activeTab === 'subscriptions'} onClick={() => { setActiveTab('subscriptions'); setSidebarOpen(false); }} />
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 text-red-400 hover:text-red-300 w-full p-3 rounded-lg hover:bg-slate-800 transition">
            <LogOut size={20} /> লগআউট
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-slate-800 hidden md:block">
              স্বাগতম, অ্যাডমিন 👋
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 relative text-slate-500 hover:bg-slate-100 rounded-full">
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
              A
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
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

// --- SUB-COMPONENTS (SECTIONS) ---

// 1. OVERVIEW SECTION
const OverviewSection = ({ stats, requests }: any) => (
  <div className="animate-in fade-in duration-500">
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat: any, idx: number) => (
        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition duration-300">
          <div className={`${stat.color} w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg shadow-opacity-30`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
            <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>

    {/* Recent Activity Table */}
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-800">সাম্প্রতিক আবেদন সমূহ</h3>
        <button className="text-sm text-indigo-600 font-bold hover:underline">সব দেখুন</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
            <tr>
              <th className="p-4">নাম</th>
              <th className="p-4">সেবার ধরণ</th>
              <th className="p-4">বিবরণ</th>
              <th className="p-4">তারিখ</th>
              <th className="p-4">স্ট্যাটাস</th>
              <th className="p-4 text-center">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
            {requests.map((req: any) => (
              <tr key={req.id} className="hover:bg-slate-50 transition">
                <td className="p-4 font-bold">{req.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    req.type === 'কৃষক সেবা' ? 'bg-emerald-100 text-emerald-700' :
                    req.type === 'আইনি সহায়তা' ? 'bg-indigo-100 text-indigo-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {req.type}
                  </span>
                </td>
                <td className="p-4">{req.item}</td>
                <td className="p-4 text-slate-500">{req.date}</td>
                <td className="p-4">
                  <StatusBadge status={req.status} />
                </td>
                <td className="p-4 text-center">
                  <button className="text-slate-400 hover:text-slate-700"><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// 2. MEMBERS SECTION
const MembersSection = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-300">
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <h3 className="text-xl font-bold text-slate-800">সকল মেম্বার তালিকা</h3>
      <div className="relative w-full md:w-64">
        <Search className="absolute left-3 top-3 text-slate-400" size={18} />
        <input type="text" placeholder="নাম বা ফোন নম্বর খুঁজুন..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
    </div>
    <div className="text-center py-10 text-slate-400">
      <Users size={48} className="mx-auto mb-3 opacity-20" />
      <p>মেম্বার ডেটা লোড হচ্ছে...</p>
    </div>
  </div>
);

// 3. SERVICE REQUESTS SECTION (With Tabs)
const ServiceRequestsSection = () => {
  const [serviceTab, setServiceTab] = useState('all');
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-300">
      <h3 className="text-xl font-bold text-slate-800 mb-6">সেবা রিকোয়েস্ট ম্যানেজমেন্ট</h3>
      
      {/* Service Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 border-b">
        {['all', 'farmer', 'legal', 'health', 'loan'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setServiceTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition ${
              serviceTab === tab ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab === 'all' ? 'সব' : tab === 'farmer' ? 'কৃষক সেবা' : tab === 'legal' ? 'আইনি সহায়তা' : tab === 'health' ? 'স্বাস্থ্য' : 'লোন'}
          </button>
        ))}
      </div>

      {/* Content based on sub-tab */}
      <div className="min-h-[200px] flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
        {serviceTab === 'all' && <p>সকল আবেদন এখানে দেখা যাবে</p>}
        {serviceTab === 'farmer' && <p>কৃষি যন্ত্র ও বীজ আবেদন</p>}
        {serviceTab === 'legal' && <p>আইনি পরামর্শ ও সালিশ আবেদন</p>}
      </div>
    </div>
  );
}

// 4. SUBSCRIPTION SECTION
const SubscriptionSection = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-300">
    <h3 className="text-xl font-bold text-slate-800 mb-6">সাবস্ক্রিপশন ও পেমেন্ট</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
       <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
          <h4 className="font-bold text-emerald-800">মোট আয়</h4>
          <p className="text-2xl font-bold text-emerald-600">৳ ৫,৫০,০০০</p>
       </div>
       <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <h4 className="font-bold text-blue-800">অ্যাক্টিভ মেম্বার</h4>
          <p className="text-2xl font-bold text-blue-600">৮৫০ জন</p>
       </div>
       <div className="bg-red-50 p-4 rounded-xl border border-red-100">
          <h4 className="font-bold text-red-800">মেয়াদ উত্তীর্ণ</h4>
          <p className="text-2xl font-bold text-red-600">১২০ জন</p>
       </div>
    </div>
  </div>
);

// --- HELPER COMPONENTS ---

const NavItem = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 w-full p-3 rounded-lg transition font-medium ${
      active 
        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" 
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Approved: "bg-green-100 text-green-700 border-green-200",
    Rejected: "bg-red-100 text-red-700 border-red-200",
    Paid: "bg-blue-100 text-blue-700 border-blue-200",
  };
  const bgClass = styles[status as keyof typeof styles] || "bg-gray-100 text-gray-700";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${bgClass}`}>
      {status}
    </span>
  );
};