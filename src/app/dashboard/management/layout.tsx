'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  BarChart3, 
  Users, 
  Database, 
  Landmark, 
  Megaphone, 
  LifeBuoy, 
  Menu, 
  X, 
  LogOut, 
  Bell,
  List, 
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function ManagementLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  // ১. সেশন এবং রোল চেক
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(savedUser);
    if (parsedUser.role !== 'management') {
      alert("আপনার এই প্যানেলে প্রবেশের অনুমতি নেই!");
      router.push('/login');
    } else {
      setUser(parsedUser);
    }
  }, [router]);

  const handleLogout = () => {
    if (window.confirm("আপনি কি লগ আউট করতে চান?")) {
      localStorage.removeItem('user');
      router.push('/login');
    }
  };

  // আপনার দেওয়া আধুনিক সিকোয়েন্স অনুযায়ী মেনু আইটেম
  const menuItems = [
    { name: "ড্যাশবোর্ড", href: "/dashboard/management", icon: <LayoutDashboard size={20}/> },
    { name: "চূড়ান্ত অনুমোদন", href: "/dashboard/management/approvals", icon: <ClipboardCheck size={20}/> },
    { name: "স্টাফ রিপোর্ট", href: "/dashboard/management/staff-reports", icon: <BarChart3 size={20}/> },
    { name: "মেম্বার ম্যানেজমেন্ট", href: "/dashboard/management/members", icon: <Users size={20}/> }, // হায়ারার্কি ভিউ
    { name: "ওডিইয়েন্স লিস্ট", href: "/dashboard/management/audience", icon: <List size={20}/> },
    { name: "মাঠ পর্যায়ের তথ্য", href: "/dashboard/management/audience-insights", icon: <Database size={20}/> },
    { name: "আর্থিক বিবরণী", href: "/dashboard/management/financials", icon: <Landmark size={20}/> },
    { name: "নোটিশ বোর্ড", href: "/dashboard/management/notices", icon: <Megaphone size={20}/> },
    { name: "সাপোর্ট ও অভিযোগ", href: "/dashboard/management/support", icon: <LifeBuoy size={20}/> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* --- SIDEBAR (Desktop & Mobile) --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-indigo-950 text-white transition-transform duration-300 transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 border-r border-indigo-900 shadow-2xl
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 p-6 border-b border-indigo-900/50">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20">
            A
          </div>
          <div>
            <h2 className="font-bold text-lg leading-none tracking-tight">ম্যানেজমেন্ট</h2>
            <p className="text-[10px] text-indigo-400 mt-1 uppercase font-black tracking-widest">Amanat Foundation</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden ml-auto text-indigo-300">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1 mt-2 overflow-y-auto max-h-[calc(100vh-180px)] custom-scrollbar">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={index} 
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between group px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 border-l-4 border-yellow-400" 
                    : "text-indigo-300 hover:bg-indigo-900 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3 font-medium text-sm">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight size={14} className="text-yellow-400" />}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Bottom (Profile & Logout) */}
        <div className="absolute bottom-0 w-full p-4 border-t border-indigo-900/50 bg-indigo-950/80 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-indigo-500 border-2 border-indigo-400 flex items-center justify-center text-white font-bold text-lg shadow-inner">
              {user?.full_name?.charAt(0) || 'M'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate leading-none">{user?.full_name || 'Manager Name'}</p>
              <p className="text-[10px] text-indigo-400 uppercase font-black mt-1 tracking-tighter">Central Management</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-400 hover:text-red-300 w-full p-2.5 rounded-xl hover:bg-red-950/30 transition-all text-sm font-bold border border-transparent hover:border-red-900/30"
          >
            <LogOut size={18} /> লগআউট
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-8 z-40 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2 text-slate-700">
              <ShieldCheck className="text-indigo-600 hidden sm:block" size={20}/>
              <h2 className="text-sm md:text-lg font-bold">সিস্টেম কন্ট্রোল সেন্টার</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">সিস্টেম অনলাইন</span>
                <span className="text-[10px] text-slate-400 mt-1">{new Date().toLocaleDateString('bn-BD')}</span>
             </div>
             <button className="p-2 relative text-slate-400 hover:bg-slate-100 rounded-full transition">
               <Bell size={22} />
               <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50 custom-scrollbar">
          {children}
        </main>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-indigo-950/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
        ></div>
      )}
    </div>
  );
}