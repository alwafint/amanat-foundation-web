'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, Building2, Landmark, 
  ShieldCheck, Briefcase, Settings, Megaphone,
  Menu, X, LogOut, Bell, ChevronRight, Shield, PlusCircle, UserCog
} from "lucide-react";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser || JSON.parse(savedUser).role !== 'super_admin') {
       router.push('/login');
    } else {
       setUser(JSON.parse(savedUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  // --- মেইন মেনু (সাধারণ) ---
  const generalMenu = [
    { name: "ওভারভিউ", href: "/dashboard/super-admin", icon: <LayoutDashboard size={20}/> },
  ];

  // --- ব্রাঞ্চ ফোল্ডার/গ্রুপ মেনু ---
  const branchGroup = [
    { name: "ব্রাঞ্চ ম্যানেজমেন্ট", href: "/dashboard/super-admin/branches", icon: <Building2 size={20}/> },
    { name: "ইউজার ও রোল", href: "/dashboard/super-admin/users", icon: <UserCog size={20}/> },
    { name: "ওপেন ব্রাঞ্চ", href: "/dashboard/super-admin/open-branch", icon: <PlusCircle size={20}/> },
  ];

  // --- অন্যান্য মেনু ---
  const otherMenu = [
    { name: "আর্থিক অডিট", href: "/dashboard/super-admin/financials", icon: <Landmark size={20}/> },
    { name: "ইনভেস্টর প্যানেল", href: "/dashboard/super-admin/investors", icon: <Briefcase size={20}/> },
    { name: "সিস্টেম সেটিংস", href: "/dashboard/super-admin/settings", icon: <Settings size={20}/> },
    { name: "গ্লোবাল নোটিশ", href: "/dashboard/super-admin/notices", icon: <Megaphone size={20}/> },
  ];

  const NavLink = ({ item }: any) => {
    const isActive = pathname === item.href;
    return (
      <Link 
        href={item.href}
        onClick={() => setSidebarOpen(false)}
        className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl transition-all duration-200 group ${
          isActive 
            ? "bg-[#006A4E] text-white shadow-lg" 
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`}
      >
        <div className="flex items-center gap-3 font-medium text-sm">
          {item.icon}
          <span>{item.name}</span>
        </div>
        {isActive && <ChevronRight size={14} className="text-white/80"/>}
      </Link>
    );
  };

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0f172a] text-white transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static flex flex-col shadow-2xl border-r border-slate-800`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Shield className="text-[#00A86B]" size={28} />
            <h2 className="text-xl font-bold tracking-wide">SUPER <span className="text-[#00A86B]">ADMIN</span></h2>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400"><X size={24} /></button>
        </div>

        <nav className="flex-1 p-4 space-y-6 overflow-y-auto custom-scrollbar">
          {/* General Section */}
          <div className="space-y-1">
            {generalMenu.map((item) => <NavLink key={item.name} item={item} />)}
          </div>

          {/* Branch Folder Section */}
          <div className="space-y-1">
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">ব্রাঞ্চ কার্যক্রম</p>
            <div className="bg-slate-800/30 rounded-2xl p-1 border border-slate-800/50">
                {branchGroup.map((item) => <NavLink key={item.name} item={item} />)}
            </div>
          </div>

          {/* Others Section */}
          <div className="space-y-1">
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">ম্যানেজমেন্ট</p>
            {otherMenu.map((item) => <NavLink key={item.name} item={item} />)}
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800 bg-[#0B1120]">
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 text-red-400 hover:text-white w-full p-2.5 rounded-lg hover:bg-red-600/20 transition text-sm font-bold border border-red-900/30">
            <LogOut size={16} /> লগআউট
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:px-8 z-40 border-b border-slate-200 text-slate-800">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"><Menu size={24} /></button>
            <div className="flex flex-col">
                <h2 className="text-lg font-extrabold text-[#006A4E]">আমানত ফাউন্ডেশন</h2>
                <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">সেন্ট্রাল অ্যাডমিন কন্ট্রোল</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 relative text-slate-500 hover:bg-slate-100 rounded-full transition"><Bell size={22} /><span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span></button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#F3F4F6] custom-scrollbar">
          {children}
        </main>
        {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"></div>}
      </div>
    </div>
  );
}