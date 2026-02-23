'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, ClipboardCheck, Banknote, 
  BarChart3, Settings, Menu, X, LogOut, Bell, 
  ChevronRight, Building2, UserCheck, Wallet
} from "lucide-react";

export default function BranchManagerLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
  const savedUser = localStorage.getItem('user');
  if (!savedUser || JSON.parse(savedUser).role !== 'branch_manager') {
     router.push('/login');
  } else {
     setUser(JSON.parse(savedUser));
  }
}, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const menuItems = [
    { name: "ওভারভিউ", href: "/dashboard/branch-manager", icon: <LayoutDashboard size={20}/> },
    { name: "স্টাফ ম্যানেজমেন্ট", href: "/dashboard/branch-manager/staff", icon: <Users size={20}/> },
    { name: "মেম্বার ভেরিফিকেশন", href: "/dashboard/branch-manager/verify", icon: <UserCheck size={20}/> },
    { name: "কালেকশন রিপোর্ট", href: "/dashboard/branch-manager/collections", icon: <Banknote size={20}/> },
    { name: "ব্রাঞ্চ খরচ", href: "/dashboard/branch-manager/expenses", icon: <Wallet size={20}/> },
    { name: "মাসিক রিপোর্ট", href: "/dashboard/branch-manager/reports", icon: <BarChart3 size={20}/> },
  ];

  if (!user) return null;

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-950 text-white transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static flex flex-col shadow-2xl`}>
        <div className="flex items-center justify-between p-6 border-b border-blue-900">
          <div className="flex items-center gap-2">
            <Building2 className="text-blue-400" size={24} />
            <h2 className="text-lg font-bold tracking-tight">BRANCH <span className="text-blue-400">MANAGER</span></h2>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-blue-300"><X size={24} /></button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive ? "bg-blue-600 text-white shadow-lg" : "text-blue-200 hover:bg-blue-900 hover:text-white"
                }`}>
                <div className="flex items-center gap-3 font-medium text-sm">
                  {item.icon}<span>{item.name}</span>
                </div>
                {isActive && <ChevronRight size={14} />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-blue-900 bg-blue-950/50">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">{user.full_name?.charAt(0)}</div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate">{user.full_name}</p>
              <p className="text-[10px] text-blue-400 uppercase font-bold tracking-wider">সাঘাটা ব্রাঞ্চ</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 text-red-400 hover:text-white w-full p-2.5 rounded-lg border border-red-900/30 hover:bg-red-600/20 transition text-sm font-bold">
            <LogOut size={16} /> লগআউট
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:px-8 border-b border-slate-200">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600"><Menu size={24} /></button>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-slate-700">আমানত ফাউন্ডেশন</h2>
            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">ব্রাঞ্চ ম্যানেজার প্যানেল</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black border border-blue-100 uppercase tracking-tighter">Branch Manager Access</div>
             <button className="p-2 relative text-slate-500 hover:bg-slate-100 rounded-full transition"><Bell size={22} /><span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span></button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50">
          {children}
        </main>
      </div>
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"></div>}
    </div>
  );
}