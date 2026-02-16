'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  Database, 
  Banknote, 
  CalendarCheck, 
  Camera, 
  CheckSquare, 
  Menu, 
  X, 
  LogOut 
} from "lucide-react";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  // অথেন্টিকেশন চেক
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (localUser.role !== 'staff') {
       router.push('/login');
    }
    setUser(localUser);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  // আপনার নির্ধারিত ৭টি মেনু
  const menuItems = [
    { name: "ওভারভিউ", href: "/dashboard/staff", icon: <LayoutDashboard size={20}/> },
    { name: "মেম্বার ম্যানেজ", href: "/dashboard/staff/members", icon: <Users size={20}/> },
    { name: "সেবা রিকোয়েস্ট", href: "/dashboard/staff/requests", icon: <ClipboardList size={20}/> },
    { name: "ওডিইয়েন্স ডাটা", href: "/dashboard/staff/audience", icon: <Database size={20}/> },
    { name: "কালেকশন", href: "/dashboard/staff/collection", icon: <Banknote size={20}/> },
    { name: "আজকের ডিউ", href: "/dashboard/staff/due-list", icon: <CalendarCheck size={20}/> },
    { name: "মনিটরিং", href: "/dashboard/staff/monitoring", icon: <Camera size={20}/> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static
      `}>
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold tracking-wide flex items-center gap-2">
            <CheckSquare className="text-emerald-400" /> STAFF<span className="text-emerald-400">PANEL</span>
          </h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1 mt-2 overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={index} 
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 w-full p-3 rounded-xl transition font-medium text-sm ${
                  isActive 
                    ? "bg-emerald-600 text-white shadow-lg" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile at Bottom */}
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold shrink-0">
              {user?.full_name?.charAt(0) || 'S'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{user?.full_name || 'Staff Member'}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Field Officer</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-400 hover:text-red-300 w-full p-2.5 rounded-lg hover:bg-red-950/30 transition text-sm font-bold border border-transparent hover:border-red-900/50"
          >
            <LogOut size={18} /> লগআউট
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 z-40">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-bold text-slate-700 ml-2 md:ml-0">
               আমানত ফাউন্ডেশন - স্টাফ প্যানেল
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">
              Active
            </div>
            <button className="p-2 relative text-slate-500 hover:bg-slate-100 rounded-full transition">
              <Bell size={22} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50 custom-scrollbar">
          {children}
        </main>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        ></div>
      )}
    </div>
  );
}

// Simple internal icon (Optional, if Bell icon doesn't work)
function Bell({ size, className }: { size: number, className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
        </svg>
    );
}