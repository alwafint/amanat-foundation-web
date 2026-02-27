'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Menu, 
  X, 
  LogOut, 
  MapPin,
  UserPlus,
  ChevronRight
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
    if(window.confirm("আপনি কি লগ আউট করতে চান?")) {
        localStorage.removeItem('user');
        router.replace('/login');
    }
  };

  // ২. আপডেটেড মেনু লিংকস
  const menuItems =[
    { name: "ওভারভিউ", href: "/dashboard/team-leader", icon: <LayoutDashboard size={18}/> },
    { name: "নতুন ভলান্টিয়ার", href: "/dashboard/team-leader/volunteer/new-volunteer", icon: <UserPlus size={18}/> },
    { name: "ভলান্টিয়ার লিস্ট", href: "/dashboard/team-leader/volunteer/volunteer-list", icon: <Users size={18}/> },
  ];

  // ইউজার লোড না হওয়া পর্যন্ত ড্যাশবোর্ড রেন্ডার হবে না (এটি গ্লিচ বন্ধ করবে)
  if (!user) return null; 

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0f172a] text-white transition-transform duration-300 transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static flex flex-col shadow-2xl border-r border-slate-800
      `}>
        
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 p-6 border-b border-slate-800 bg-[#0f172a]">
          <div className="w-10 h-10 bg-[#FFB800] rounded-xl flex items-center justify-center font-bold text-[#006A4E] text-xl shadow-lg shadow-yellow-500/20">U</div>
          <div>
            <h2 className="font-bold text-white leading-none text-lg uppercase tracking-tight">Union Leader</h2>
            <p className="text-[10px] text-[#00A86B] mt-1 uppercase font-black tracking-widest">Field Control</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto text-slate-400 hover:text-white">
            <X size={24}/>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 mt-2 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">ম্যানেজমেন্ট</p>
          
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={index} 
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  isActive 
                    ? "bg-[#006A4E] text-white shadow-lg shadow-emerald-900/40" 
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {/* Active Indicator Line */}
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFB800] rounded-r-full"></div>}
                
                <div className="flex items-center gap-3 font-medium text-sm">
                  <span className={isActive ? "text-[#FFB800]" : "text-slate-400 group-hover:text-[#00A86B]"}>{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight size={14} className="text-[#FFB800]" />}
              </Link>
            );
          })}
        </nav>

        {/* Profile Footer */}
        <div className="p-4 bg-[#0B1120] border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4 px-2">
             <div className="w-10 h-10 rounded-full bg-[#00A86B] flex items-center justify-center font-bold text-white border-2 border-slate-700 shadow-inner">
                {user?.full_name?.charAt(0) || 'U'}
             </div>
             <div className="overflow-hidden">
                <p className="text-sm font-bold truncate text-white">{user?.full_name}</p>
                <p className="text-[10px] text-[#FFB800] flex items-center gap-1 mt-0.5">
                   <MapPin size={10}/> {user?.union_name || user?.village || 'Unknown Area'}
                </p>
             </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="flex items-center justify-center gap-2 text-red-400 hover:text-white w-full p-2.5 rounded-lg hover:bg-red-600/20 transition text-sm font-bold border border-red-900/30"
          >
            <LogOut size={16} /> লগআউট
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Top Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:px-8 z-40 border-b border-slate-200">
          <div className="flex items-center gap-3">
             <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
               <Menu size={24} />
             </button>
             <div>
                <h2 className="text-lg font-extrabold text-[#006A4E]">আমানত ফাউন্ডেশন</h2>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider hidden md:block">ইউনিয়ন লিডার প্যানেল</p>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             <span className="text-xs font-bold text-[#006A4E] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
               Active User
             </span>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#F3F4F6] custom-scrollbar">
          {children}
        </main>
        
        {/* Mobile Overlay */}
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