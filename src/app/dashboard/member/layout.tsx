'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { 
  Menu, X, Home, Wallet, CreditCard, LogOut, 
  User, LayoutGrid, Bell, History, ClipboardCheck, 
  ShieldCheck, LifeBuoy, Megaphone
} from "lucide-react";

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  // মেম্বার প্যানেলের জন্য সাজানো মেনু তালিকা
  const menuItems = [
    { name: "ওভারভিউ", href: "/dashboard/member", icon: <Home size={20} /> },
    { name: "সেবা সমূহ", href: "/dashboard/member/services", icon: <LayoutGrid size={20} /> },
    { name: "আবেদনের তালিকা", href: "/dashboard/member/my-requests", icon: <ClipboardCheck size={20} /> },
    { name: "আমার সঞ্চয়", href: "/dashboard/member/savings", icon: <Wallet size={20} /> },
    { name: "লোন স্ট্যাটাস", href: "/dashboard/member/loan", icon: <CreditCard size={20} /> },
    { name: "লেনদেন ইতিহাস", href: "/dashboard/member/transactions", icon: <History size={20} /> },
    { name: "নোটিশ বোর্ড", href: "/dashboard/member/notices", icon: <Megaphone size={20} /> },
    { name: "আমার প্রোফাইল", href: "/dashboard/member/profile", icon: <User size={20} /> },
    { name: "সহায়তা", href: "/dashboard/member/support", icon: <LifeBuoy size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-emerald-950 text-white transform transition-transform duration-300 ease-in-out shadow-2xl
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0
      `}>
        <div className="p-6 border-b border-emerald-900 flex justify-between items-center">
          <div className="font-bold text-xl flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 text-white rounded flex items-center justify-center shadow-lg">A</div>
            মেম্বার প্যানেল
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-emerald-200 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)] custom-scrollbar">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={index} 
                href={item.href} 
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition ${
                  isActive 
                    ? "bg-emerald-600 text-white shadow-md border-l-4 border-yellow-400" 
                    : "text-emerald-100/70 hover:bg-emerald-900 hover:text-white"
                }`}
              >
                {item.icon} {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-emerald-900 bg-emerald-950">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-950/30 rounded-xl transition text-sm font-bold">
            <LogOut size={18} /> লগ আউট
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        {/* Top Header */}
        <header className="bg-white p-4 shadow-sm flex justify-between items-center sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-bold text-slate-700 hidden sm:block">আমানত ফাউন্ডেশন</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition">
               <Bell size={22} />
               <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="font-bold text-sm text-slate-800 leading-none">{user?.full_name || 'লোডিং...'}</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">মেম্বার আইডি: {user?.id}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-emerald-200 flex items-center justify-center text-emerald-700 font-bold shadow-inner">
                {user?.full_name?.charAt(0) || <User size={20} />}
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-4 md:p-8">
            {children}
        </div>
      </main>
    </div>
  );
}