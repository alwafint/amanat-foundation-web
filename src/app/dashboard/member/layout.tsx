'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { 
  Menu, X, Home, Wallet, CreditCard, LogOut, 
  User, LayoutGrid, Bell // Crown আইকন বাদ দেওয়া হয়েছে
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

  // --- সাবস্ক্রিপশন বাদ দিয়ে নতুন মেনু ---
  const menuItems = [
    { name: "সেবা সমূহ", href: "/dashboard/member", icon: <LayoutGrid size={20} /> },
    { name: "আমার সঞ্চয়", href: "/dashboard/member/savings", icon: <Wallet size={20} /> }, // লিংক আপডেট করা হয়েছে
    { name: "লোন স্ট্যাটাস", href: "/dashboard/member/loan", icon: <CreditCard size={20} /> }, // লিংক আপডেট করা হয়েছে
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Sidebar */}
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
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={index} 
                href={item.href} 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                  isActive 
                    ? "bg-emerald-800 text-white shadow-md border-l-4 border-yellow-400" 
                    : "text-emerald-100 hover:bg-emerald-800 hover:text-white"
                }`}
              >
                {item.icon} {item.name}
              </Link>
            );
          })}

          <div className="pt-8 mt-4 border-t border-emerald-800">
            <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 text-red-300 hover:bg-emerald-800 rounded-lg hover:text-red-200 transition">
              <LogOut size={20} /> লগ আউট
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        <header className="bg-white p-4 shadow-sm flex justify-between items-center sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded">
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-slate-800 hidden sm:block">আমানত ফাউন্ডেশন</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition">
               <Bell size={24} />
               <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="font-bold text-sm text-slate-800">{user?.full_name || 'মেম্বার'}</p>
                <p className="text-xs text-slate-500">আইডি: {user?.id || '...'}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8 flex-1">
            {children}
        </div>
      </main>
    </div>
  );
}