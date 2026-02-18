'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, UserCog, Landmark, 
  ShieldCheck, Settings, Megaphone, FileBox,
  Menu, X, Bell, LogOut, ChevronRight, Briefcase, Shield
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser || JSON.parse(savedUser).role !== 'admin') {
      router.push('/login');
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [router]);

  const handleLogout = () => {
    if (confirm("আপনি কি অ্যাডমিন প্যানেল থেকে লগ আউট করতে চান?")) {
      localStorage.removeItem('user');
      router.push('/login');
    }
  };

  const menuItems = [
    { name: "মাস্টার ড্যাশবোর্ড", href: "/dashboard/admin", icon: <LayoutDashboard size={20}/> },
    { name: "অ্যাডমিন ও স্টাফ", href: "/dashboard/admin/users", icon: <UserCog size={20}/> },
    { name: "ইনভেস্টর প্যানেল", href: "/dashboard/admin/investors", icon: <Briefcase size={20}/> },
    { name: "আর্থিক অডিট", href: "/dashboard/admin/financials", icon: <Landmark size={20}/> },
    { name: "বড় লোন অনুমোদন", href: "/dashboard/admin/approvals", icon: <ShieldCheck size={20}/> },
    { name: "সিস্টেম সেটিংস", href: "/dashboard/admin/settings", icon: <Settings size={20}/> },
    { name: "গ্লোবাল নোটিশ", href: "/dashboard/admin/notices", icon: <Megaphone size={20}/> },
    { name: "রিপোর্ট জেনারেটর", href: "#", icon: <FileBox size={20}/> },
  ];

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0f172a] text-white transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static flex flex-col shadow-2xl border-r border-slate-800`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 p-6 border-b border-slate-800 bg-[#0f172a]">
          <div className="w-10 h-10 bg-[#FFB800] rounded-xl flex items-center justify-center font-bold text-[#006A4E] text-xl shadow-lg shadow-yellow-500/20">A</div>
          <div>
            <h2 className="font-bold text-white leading-none text-lg">অ্যাডমিন</h2>
            <p className="text-[10px] text-[#00A86B] mt-1 uppercase font-black tracking-widest">System Core</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1 mt-2 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">মেইন কন্ট্রোল</p>
          
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link key={index} href={item.href} onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? "bg-[#006A4E] text-white shadow-lg shadow-emerald-900/40 border-l-4 border-[#FFB800]" 
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3 font-medium text-sm">
                  <span className={isActive ? "text-[#FFB800]" : "text-slate-400 group-hover:text-[#00A86B]"}>{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight size={14} className="text-[#FFB800]" />}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Bottom Profile */}
        <div className="p-4 border-t border-slate-800 bg-[#0B1120]">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-[#00A86B] border-2 border-slate-700 flex items-center justify-center text-white font-bold uppercase shadow-inner">
              {user?.full_name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate leading-none">{user?.full_name || 'Admin'}</p>
              <p className="text-[10px] text-[#FFB800] uppercase font-black mt-1 tracking-tighter">Root Authority</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 text-red-400 hover:text-white w-full p-2.5 rounded-lg hover:bg-red-600/20 transition text-sm font-bold border border-red-900/30 hover:border-red-600/50">
            <LogOut size={16} /> লগআউট
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8 z-40 text-slate-800 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition">
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
                <h2 className="text-lg font-extrabold text-[#006A4E] leading-tight">আমানত ফাউন্ডেশন</h2>
                <span className="text-[10px] text-[#FFB800] font-black tracking-[0.2em] uppercase hidden md:block">অ্যাডমিন কন্ট্রোল সেন্টার</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-[#00A86B] animate-pulse"></div>
                <span className="text-[10px] font-bold text-[#006A4E] uppercase">Core Secured</span>
             </div>
             <button className="p-2 relative text-slate-400 hover:text-[#006A4E] transition">
               <Bell size={22} />
               <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-600 rounded-full border-2 border-white"></span>
             </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#F3F4F6] custom-scrollbar">
          {children}
        </main>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
            <div 
            onClick={() => setSidebarOpen(false)} 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
            ></div>
        )}
      </div>
    </div>
  );
}