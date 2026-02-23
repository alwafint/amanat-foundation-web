'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Banknote, 
  ClipboardList, 
  Send, 
  PieChart, 
  Menu, 
  X, 
  LogOut, 
  CalendarCheck, 
  MapPin,
  HandHeart, 
  UserPlus   
} from "lucide-react";

export default function TeamLeaderLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  // ১. অথেন্টিকেশন চেক (এখানে ইনফিনিট লুপ ফিক্স করা হয়েছে)
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    
    if (!userStr) {
       router.replace('/login');
       return;
    }

    const localUser = JSON.parse(userStr);
    
    // 'team-leader' এবং 'team_leader' দুটিই চেক করা হচ্ছে যাতে এরর না হয়
    if (localUser.role !== 'team-leader' && localUser.role !== 'team_leader') {
       router.replace('/login');
       return;
    }
    
    setUser(localUser);
  }, [router]);

  const handleLogout = () => {
    if(confirm("আপনি কি লগ আউট করতে চান?")) {
        localStorage.removeItem('user');
        router.replace('/login');
    }
  };

  const menuItems = [
    { name: "ওভারভিউ", href: "/dashboard/team-leader", icon: <LayoutDashboard size={20}/> },
    { name: "আমার মেম্বার", href: "/dashboard/team-leader/members", icon: <Users size={20}/> },
    { name: "কালেকশন এন্ট্রি", href: "/dashboard/team-leader/collection", icon: <Banknote size={20}/> },
    { name: "আজকের ডিউ", href: "/dashboard/team-leader/due-list", icon: <CalendarCheck size={20}/> },
    { name: "সেবার আবেদন", href: "/dashboard/team-leader/requests", icon: <ClipboardList size={20}/> },
    { name: "ভলান্টিয়ার ও সমাজসেবা", href: "/dashboard/team-leader/social-work", icon: <HandHeart size={20}/> },
    { name: "অসহায় তালিকা", href: "/dashboard/team-leader/needy-list", icon: <UserPlus size={20}/> },
    { name: "অফিসে জমা", href: "/dashboard/team-leader/deposit-history", icon: <Send size={20}/> },
    { name: "রিপোর্ট ও আয়", href: "/dashboard/team-leader/reports", icon: <PieChart size={20}/> },
  ];

  // ইউজার লোড না হওয়া পর্যন্ত ড্যাশবোর্ড রেন্ডার হবে না (এটি গ্লিচ বন্ধ করবে)
  if (!user) return null; 

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-indigo-900 text-white transition-transform duration-300 transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static flex flex-col shadow-2xl
      `}>
        
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 p-6 border-b border-indigo-800 bg-indigo-950">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-indigo-700 font-bold text-xl">L</div>
          <div>
            <h2 className="font-bold text-lg leading-none">টিম লিডার</h2>
            <p className="text-[10px] text-indigo-300 uppercase tracking-widest mt-1">Village Unit</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden ml-auto text-indigo-200 hover:text-white">
            <X size={24}/>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1 mt-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={index} 
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 font-medium text-sm ${
                  isActive 
                    ? "bg-indigo-700 text-white shadow-lg border-l-4 border-yellow-400" 
                    : "text-indigo-200 hover:bg-indigo-800 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Profile Footer */}
        <div className="p-4 bg-indigo-950 border-t border-indigo-800">
          <div className="flex items-center gap-3 mb-4 px-2">
             <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white border-2 border-indigo-400">
                {user?.full_name?.charAt(0)}
             </div>
             <div className="overflow-hidden">
                <p className="text-sm font-bold truncate text-white">{user?.full_name}</p>
                <p className="text-[10px] text-indigo-300 flex items-center gap-1">
                   <MapPin size={10}/> {user?.village || 'Unknown Area'}
                </p>
             </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="flex items-center justify-center gap-2 text-red-300 hover:text-white w-full p-2.5 rounded-lg hover:bg-red-900/50 transition text-xs font-bold border border-red-900/30 hover:border-red-500/50"
          >
            <LogOut size={16} /> লগআউট
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Top Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-6 z-40 border-b border-slate-200">
          <div className="flex items-center gap-3">
             <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
               <Menu size={24} />
             </button>
             <div>
                <h2 className="text-lg font-bold text-slate-800">গ্রাম উন্নয়ন ড্যাশবোর্ড</h2>
                <p className="text-[10px] text-slate-500 font-medium hidden md:block">মাঠ পর্যায় নিয়ন্ত্রণ প্যানেল</p>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
               Active
             </span>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50 custom-scrollbar">
          {children}
        </main>
        
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)} 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
          ></div>
        )}
      </div>
    </div>
  );
}