'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, UserCog, Landmark, 
  ShieldCheck, Settings, Megaphone, FileBox,
  Menu, X, Bell, LogOut, ChevronRight, Briefcase
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
    <div className="flex h-screen bg-slate-900 overflow-hidden font-sans">
      
      {/* --- Sidebar --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 text-slate-300 transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 border-r border-slate-800`}>
        <div className="flex items-center gap-3 p-6 border-b border-slate-800 bg-slate-950">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-900/20">A</div>
          <div>
            <h2 className="font-bold text-white leading-none">সুপার অ্যাডমিন</h2>
            <p className="text-[10px] text-emerald-500 mt-1 uppercase font-black tracking-widest tracking-tighter">System Root</p>
          </div>
        </div>

        <nav className="p-4 space-y-1 mt-2 overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link key={index} href={item.href} onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? "bg-emerald-600 text-white shadow-lg" : "hover:bg-slate-900 hover:text-white"}`}
              >
                <div className="flex items-center gap-3 font-medium text-sm">
                  {item.icon} <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight size={14} />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800 bg-slate-950/50 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-500 font-bold uppercase">{user?.full_name?.charAt(0)}</div>
            <div className="overflow-hidden"><p className="text-sm font-bold text-white truncate">{user?.full_name}</p><p className="text-[10px] text-slate-500 font-bold uppercase">Root Access</p></div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3 text-red-400 hover:bg-red-950/30 w-full p-2.5 rounded-lg transition-all text-sm font-bold border border-transparent hover:border-red-900/30">
            <LogOut size={18} /> লগআউট
          </button>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-slate-900 border-b border-slate-800 h-16 flex items-center justify-between px-4 md:px-8 z-40 text-white">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition"><Menu size={24} /></button>
            <h2 className="text-lg font-bold tracking-tight text-slate-200">আমানত ফাউন্ডেশন <span className="text-emerald-500 font-black">CORE</span></h2>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:block text-right mr-2">
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">ROOT SECURITY ACTIVE</span>
             </div>
             <button className="p-2 relative text-slate-400 hover:text-white transition"><Bell size={22} /><span className="absolute top-2 right-2.5 w-2 h-2 bg-red-600 rounded-full border-2 border-slate-900"></span></button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-10 bg-slate-950 custom-scrollbar text-slate-300">{children}</main>
      </div>
      
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"></div>}
    </div>
  );
}