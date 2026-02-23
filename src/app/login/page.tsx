'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Phone, Lock, LogIn, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient'; // আপনার পাথ অনুযায়ী ঠিক করে নিন

export default function LoginPage() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // --- ১. রোলের নাম স্ট্যান্ডার্ড করার ফাংশন ---
  const normalizeRole = (role: string) => {
    if (!role) return '';
    // আন্ডারস্কোর (_) কে হাইফেন (-) করা এবং সব ছোট হাতের করা
    return role.toLowerCase().trim().replace(/_/g, '-');
  };

  // --- ২. রোল অনুযায়ী ড্যাশবোর্ড রুট ঠিক করা ---
  const getDashboardRoute = (role: string) => {
    const stdRole = normalizeRole(role);

    switch (stdRole) {
      case 'admin':
        return '/dashboard/admin';
      case 'team-leader': 
        return '/dashboard/team-leader';
      case 'volunteer':
        return '/dashboard/volunteer';
      case 'branch-manager':
        return '/dashboard/branch-manager';
      case 'staff':
        return '/dashboard/staff';
      case 'member':
        return '/dashboard/member';
      default:
        return '/dashboard/member'; 
    }
  };

  // --- ৩. অটো লগইন চেক ---
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user?.role) {
          const target = getDashboardRoute(user.role);
          if (window.location.pathname !== target) {
            router.replace(target);
          }
        }
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, [router]);

  // --- ৪. লগইন হ্যান্ডলার ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanMobile = mobile.trim();
    const cleanPassword = password.trim();

    try {
      // ⚠️ আপডেট: এখন 'members' টেবিল থেকে ডাটা নেওয়া হচ্ছে
      const { data: user, error: dbError } = await supabase
        .from('members') 
        .select('*')
        .eq('mobile', cleanMobile) // কলামের নাম 'mobile'
        .eq('password', cleanPassword)
        .maybeSingle();

      if (dbError) {
        throw new Error(dbError.message);
      }

      if (!user) {
        setError('মোবাইল নাম্বার বা পাসওয়ার্ড ভুল হয়েছে!');
        setLoading(false);
        return;
      }

      // স্ট্যাটাস চেক
      if (user.status && user.status !== 'active') {
        setError('আপনার অ্যাকাউন্টটি নিষ্ক্রিয়। অফিসে যোগাযোগ করুন।');
        setLoading(false);
        return;
      }

      const standardRole = normalizeRole(user.role);

      // লোকাল স্টোরেজে ডাটা সেভ
      const userData = {
        id: user.id,
        full_name: user.full_name,
        mobile: user.mobile, // কলামের নাম mobile
        role: standardRole,
        village_id: user.village_id,
        parent_id: user.parent_id
      };
      
      localStorage.setItem('user', JSON.stringify(userData));

      // ড্যাশবোর্ডে পাঠানো
      const targetRoute = getDashboardRoute(standardRole);
      router.push(targetRoute);

    } catch (err: any) {
      console.error("Login Error:", err);
      setError('সার্ভার সমস্যা! আবার চেষ্টা করুন।');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl border border-white overflow-hidden animate-in fade-in zoom-in duration-500">
        
        {/* Header Design */}
        <div className="bg-[#006A4E] p-10 text-center relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform rotate-3">
              <ShieldCheck size={36} className="text-[#006A4E]" />
            </div>
            <h2 className="text-2xl font-black text-white mb-1 tracking-tight">আমানত ফাউন্ডেশন</h2>
            <p className="text-emerald-100/80 text-sm font-medium">সুরক্ষিত মেম্বার লগইন প্যানেল</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="p-8 pt-10">
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-600 rounded-r-lg text-sm font-medium flex items-center gap-3 animate-pulse">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">মোবাইল নাম্বার</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center group-focus-within:text-[#006A4E]">
                  <Phone size={20} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none text-slate-800 font-bold transition-all"
                  placeholder="01XXXXXXXXX"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">পাসওয়ার্ড</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center group-focus-within:text-[#006A4E]">
                  <Lock size={20} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none text-slate-800 font-bold transition-all"
                  placeholder="******"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#006A4E] hover:bg-[#005a42] text-white font-bold py-4 rounded-xl shadow-lg flex justify-center items-center gap-3 disabled:opacity-70 transition-all active:scale-[0.98]"
            >
              {loading ? <Loader2 size={24} className="animate-spin" /> : <><LogIn size={20} /> লগইন করুন</>}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-xs font-medium">
              পাসওয়ার্ড ভুলে গেছেন? <span className="text-[#006A4E] font-bold cursor-pointer hover:underline">অফিসে যোগাযোগ করুন</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}