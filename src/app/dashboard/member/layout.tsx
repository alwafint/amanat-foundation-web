'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { 
  Menu, X, Home, Wallet, CreditCard, LogOut, 
  User, LayoutGrid, Bell, History, ClipboardCheck, 
  LifeBuoy, Megaphone, ChevronDown, ChevronRight,
  Layers, CircleDollarSign
} from "lucide-react";

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // ফোল্ডার ওপেন/ক্লোজ স্টেট
  const [isServiceMenuOpen, setServiceMenuOpen] = useState(false);
  const [isFinanceMenuOpen, setFinanceMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/login');
    }

    // ১. সেবা ও আবেদন পেজে থাকলে ফোল্ডার অটো ওপেন হবে
    if (pathname.includes('/services') || pathname.includes('/my-requests')) {
      setServiceMenuOpen(true);
    }

    // ২. আর্থিক পেজে থাকলে ফোল্ডার অটো ওপেন হবে
    if (pathname.includes('/savings') || pathname.includes('/loan') || pathname.includes('/transactions')) {
      setFinanceMenuOpen(true);
    }

  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-emerald-950 text-white transform transition-transform duration-300 ease-in-out shadow-2xl
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0
      `}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-emerald-900 flex justify-between items-center">
          <div className="font-bold text-xl flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 text-white rounded flex items-center justify-center shadow-lg">A</div>
            মেম্বার প্যানেল
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-emerald-200 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)] custom-scrollbar">
          
          {/* ১. ওভারভিউ */}
          <Link 
            href="/dashboard/member" 
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition mb-1 ${
              pathname === "/dashboard/member"
                ? "bg-emerald-600 text-white shadow-md border-l-4 border-yellow-400" 
                : "text-emerald-100/70 hover:bg-emerald-900 hover:text-white"
            }`}
          >
            <Home size={20} /> ওভারভিউ
          </Link>

          {/* ২. ফোল্ডার: সেবা ও আবেদন */}
          <div className="mb-1">
            <button 
              onClick={() => setServiceMenuOpen(!isServiceMenuOpen)}
              className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl font-medium transition ${
                pathname.includes('/services') || pathname.includes('/my-requests')
                  ? "bg-emerald-900 text-white" 
                  : "text-emerald-100/70 hover:bg-emerald-900 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers size={20} />
                <span>সেবা ও আবেদন</span>
              </div>
              {isServiceMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {isServiceMenuOpen && (
              <div className="ml-4 mt-1 border-l-2 border-emerald-800 pl-2 space-y-1 transition-all duration-300">
                <Link 
                  href="/dashboard/member/services"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition ${
                    pathname === "/dashboard/member/services"
                      ? "bg-emerald-600/40 text-white border border-emerald-600/50" 
                      : "text-emerald-100/60 hover:bg-emerald-900/50 hover:text-white"
                  }`}
                >
                  <LayoutGrid size={18}/> সেবা সমূহ
                </Link>
                <Link 
                  href="/dashboard/member/my-requests"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition ${
                    pathname === "/dashboard/member/my-requests"
                      ? "bg-emerald-600/40 text-white border border-emerald-600/50" 
                      : "text-emerald-100/60 hover:bg-emerald-900/50 hover:text-white"
                  }`}
                >
                  <ClipboardCheck size={18}/> আবেদনের তালিকা
                </Link>
              </div>
            )}
          </div>

          {/* ৩. ফোল্ডার: আর্থিক তথ্য */}
          <div className="mb-1">
            <button 
              onClick={() => setFinanceMenuOpen(!isFinanceMenuOpen)}
              className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl font-medium transition ${
                pathname.includes('/savings') || pathname.includes('/loan') || pathname.includes('/transactions')
                  ? "bg-emerald-900 text-white" 
                  : "text-emerald-100/70 hover:bg-emerald-900 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <CircleDollarSign size={20} />
                <span>আর্থিক তথ্য</span>
              </div>
              {isFinanceMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {isFinanceMenuOpen && (
              <div className="ml-4 mt-1 border-l-2 border-emerald-800 pl-2 space-y-1 transition-all duration-300">
                <Link 
                  href="/dashboard/member/savings"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition ${
                    pathname === "/dashboard/member/savings"
                      ? "bg-emerald-600/40 text-white border border-emerald-600/50" 
                      : "text-emerald-100/60 hover:bg-emerald-900/50 hover:text-white"
                  }`}
                >
                  <Wallet size={18}/> আমার সঞ্চয়
                </Link>
                <Link 
                  href="/dashboard/member/loan"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition ${
                    pathname === "/dashboard/member/loan"
                      ? "bg-emerald-600/40 text-white border border-emerald-600/50" 
                      : "text-emerald-100/60 hover:bg-emerald-900/50 hover:text-white"
                  }`}
                >
                  <CreditCard size={18}/> লোন স্ট্যাটাস
                </Link>
                <Link 
                  href="/dashboard/member/transactions"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition ${
                    pathname === "/dashboard/member/transactions"
                      ? "bg-emerald-600/40 text-white border border-emerald-600/50" 
                      : "text-emerald-100/60 hover:bg-emerald-900/50 hover:text-white"
                  }`}
                >
                  <History size={18}/> লেনদেন ইতিহাস
                </Link>
              </div>
            )}
          </div>

          {/* ৪. বাকি সাধারণ মেনু */}
          <Link 
            href="/dashboard/member/notices" 
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition mb-1 ${
              pathname === "/dashboard/member/notices"
                ? "bg-emerald-600 text-white shadow-md border-l-4 border-yellow-400" 
                : "text-emerald-100/70 hover:bg-emerald-900 hover:text-white"
            }`}
          >
            <Megaphone size={20} /> নোটিশ বোর্ড
          </Link>

          <Link 
            href="/dashboard/member/profile" 
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition mb-1 ${
              pathname === "/dashboard/member/profile"
                ? "bg-emerald-600 text-white shadow-md border-l-4 border-yellow-400" 
                : "text-emerald-100/70 hover:bg-emerald-900 hover:text-white"
            }`}
          >
            <User size={20} /> আমার প্রোফাইল
          </Link>

          <Link 
            href="/dashboard/member/support" 
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition mb-1 ${
              pathname === "/dashboard/member/support"
                ? "bg-emerald-600 text-white shadow-md border-l-4 border-yellow-400" 
                : "text-emerald-100/70 hover:bg-emerald-900 hover:text-white"
            }`}
          >
            <LifeBuoy size={20} /> সহায়তা
          </Link>

        </nav>

        {/* Sidebar Footer */}
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