'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, ClipboardList, FileText, Gift, Target, 
  Menu, X, LogOut, ChevronDown, ChevronRight, 
  ShieldCheck, User, Bell, MapPin, Database, UserPlus, List // <--- আইকনগুলো ইমপোর্ট করা হয়েছে
} from "lucide-react";

export default function VolunteerLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // মেনু স্টেটসমূহ
  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false);
  const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false);
  const [isAudienceMenuOpen, setIsAudienceMenuOpen] = useState(false); // <--- স্টেটটি যুক্ত করা হয়েছে

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      router.push('/login');
      return;
    }
    
    const localUser = JSON.parse(savedUser);
    // রোল ভ্যালিডেশন
    const validRoles = ['volunteer', 'team-leader', 'team_leader'];
    if (!validRoles.includes(localUser.role)) {
       router.push('/login');
       return;
    }
    setUser(localUser);

    // বর্তমান পাথ অনুযায়ী সাব-মেনু অটো ওপেন রাখা
    if (pathname.includes('/team')) setIsTeamMenuOpen(true);
    if (pathname.includes('/tasks') || pathname.includes('/reports')) setIsTaskMenuOpen(true);
    if (pathname.includes('/audience')) setIsAudienceMenuOpen(true); // <--- ওডিইয়েন্স পাথ চেক
  }, [router, pathname]);

  const handleLogout = () => {
    if(confirm("আপনি কি লগআউট করতে চান?")) {
        localStorage.removeItem('user');
        router.push('/login');
    }
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#006A4E]"></div>
    </div>
  );

  const isLeader = user.role === 'team-leader' || user.role === 'team_leader';

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0f172a] text-white transition-transform duration-300 transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static flex flex-col shadow-2xl`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-[#0B1120]">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-[#FFB800] rounded-lg flex items-center justify-center text-[#006A4E] font-black shadow-lg">A</div>
             <h2 className="text-sm font-black tracking-widest uppercase italic">
                {isLeader ? 'Leader' : 'Volunteer'}<span className="text-[#FFB800]">.</span>
             </h2>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1 mt-2 flex-1 overflow-y-auto custom-scrollbar">
          
          <Link href={isLeader ? "/dashboard/team-leader" : "/dashboard/volunteer"} onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 font-bold text-sm mb-1 
            ${pathname === (isLeader ? "/dashboard/team-leader" : "/dashboard/volunteer") ? "bg-[#006A4E] text-white shadow-lg" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
            <LayoutDashboard size={20}/>
            <span>ড্যাশবোর্ড ওভারভিউ</span>
          </Link>

          {/* ওডিইয়েন্স ডাটা মেনু */}
          <div className="mb-1">
            <button 
              onClick={() => setIsAudienceMenuOpen(!isAudienceMenuOpen)}
              className={`flex items-center justify-between w-full p-3 rounded-xl transition font-medium text-sm ${
                pathname.includes('/audience') 
                  ? "bg-slate-800 text-white" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Database size={20} />
                <span>ওডিইয়েন্স ডাটা</span>
              </div>
              {isAudienceMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {isAudienceMenuOpen && (
              <div className="ml-4 mt-1 border-l-2 border-slate-700 pl-2 space-y-1 transition-all duration-300">
                <Link 
                  href="/dashboard/volunteer/audience/new"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 w-full p-2.5 rounded-lg transition font-medium text-xs ${
                    pathname === "/dashboard/volunteer/audience/new"
                      ? "text-[#FFB800] bg-white/5 shadow-sm" 
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <UserPlus size={16}/>
                  <span>নতুন ওডিইয়েন্স</span>
                </Link>

                <Link 
                  href="/dashboard/volunteer/audience/list"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 w-full p-2.5 rounded-lg transition font-medium text-xs ${
                    pathname === "/dashboard/volunteer/audience/list"
                      ? "text-[#FFB800] bg-white/5 shadow-sm" 
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <List size={16}/>
                  <span>ওডিইয়েন্স লিস্ট</span>
                </Link>
              </div>
            )}
          </div>

          {/* টিম ম্যানেজমেন্ট (টিম লিডার এর জন্য) */}
          {isLeader && (
            <div className="mb-1">
              <Link href="/dashboard/team-leader" onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 w-full p-3 rounded-xl transition font-bold text-sm ${pathname === "/dashboard/team-leader/team" ? "bg-[#006A4E] text-white" : "text-slate-400 hover:bg-slate-800"}`}>
                <Users size={20} />
                <span>আমার টিম ম্যানেজমেন্ট</span>
              </Link>
            </div>
          )}

          {/* কার্যক্রম ও রিপোর্ট */}
          <div className="mb-1">
            <button onClick={() => setIsTaskMenuOpen(!isTaskMenuOpen)}
              className={`flex items-center justify-between w-full p-3 rounded-xl transition font-bold text-sm ${pathname.includes('/tasks') || pathname.includes('/reports') ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-800"}`}>
              <div className="flex items-center gap-3">
                <Target size={20} />
                <span>কার্যক্রম ও রিপোর্ট</span>
              </div>
              {isTaskMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            
            {isTaskMenuOpen && (
              <div className="ml-4 mt-1 border-l-2 border-slate-700 pl-2 space-y-1">
                <Link href="/dashboard/volunteer/tasks" onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 w-full p-2.5 rounded-lg transition font-medium text-xs ${pathname === "/dashboard/volunteer/tasks" ? "text-[#FFB800] bg-white/5 shadow-sm" : "text-slate-400 hover:text-white"}`}>
                  <ClipboardList size={16}/>
                  <span>চলমান কাজ</span>
                </Link>
                <Link href="/dashboard/volunteer/reports" onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 w-full p-2.5 rounded-lg transition font-medium text-xs ${pathname === "/dashboard/volunteer/reports" ? "text-[#FFB800] bg-white/5 shadow-sm" : "text-slate-400 hover:text-white"}`}>
                  <FileText size={16}/>
                  <span>রিপোর্ট ইতিহাস</span>
                </Link>
              </div>
            )}
          </div>

          <Link href="/dashboard/volunteer/benefits" onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 w-full p-3 rounded-xl transition font-bold text-sm mt-2 ${pathname === "/dashboard/volunteer/benefits" ? "bg-[#006A4E] text-white shadow-lg" : "text-slate-400 hover:bg-slate-800"}`}>
            <Gift size={20}/>
            <span>সুযোগ-সুবিধা</span>
          </Link>
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0B1120]">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black shrink-0 shadow-inner ${isLeader ? 'bg-[#006A4E]' : 'bg-emerald-600'}`}>
              {user.full_name?.charAt(0) || 'V'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate leading-none">{user.full_name}</p>
              <p className="text-[9px] text-[#FFB800] uppercase font-black tracking-widest mt-1.5 flex items-center gap-1">
                <ShieldCheck size={10}/> {isLeader ? 'Leader' : 'Volunteer'}
              </p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 text-red-400 hover:bg-red-500/10 w-full p-2.5 rounded-xl transition text-xs font-black border border-red-900/30">
            <LogOut size={16} /> লগআউট করুন
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="bg-white border-b border-slate-100 h-16 flex items-center justify-between px-4 md:px-8 z-40 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
                <h2 className="text-lg font-black text-[#006A4E] leading-tight">আমানত ফাউন্ডেশন</h2>
                <span className="text-[9px] text-[#FFB800] font-black uppercase tracking-[0.2em] hidden sm:block">Field Management System</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-[#006A4E] rounded-full relative transition-all">
               <Bell size={20} />
               <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#F8FAFC] custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>

        {sidebarOpen && (
            <div 
                onClick={() => setSidebarOpen(false)} 
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
            ></div>
        )}
      </div>
    </div>
  );
}