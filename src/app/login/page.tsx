'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient'; 
import { 
  Lock, Phone, ArrowLeft, LogIn, AlertCircle, Loader2, 
  ShieldCheck, Eye, EyeOff 
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  
  // State Management
  const[mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const[showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // --- 1. Auto Login Check ---
  useEffect(() => {
    const checkSession = () => {
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          if (user?.role) {
            router.replace(getDashboardRoute(user.role));
          }
        }
      } catch (e) {
        localStorage.removeItem('user');
      }
    };
    checkSession();
  }, [router]);

  // --- 2. Helper Functions ---
  const normalizeRole = (role: string) => {
    return role ? role.toLowerCase().trim().replace(/_/g, '-') : 'member';
  };

  const getDashboardRoute = (role: string) => {
    const stdRole = normalizeRole(role);
    const routes: {[key: string]: string } = {
      'admin': '/dashboard/admin',
      'team-leader': '/dashboard/team-leader',
      'volunteer': '/dashboard/volunteer',
      'staff': '/dashboard/staff',
      'management': '/dashboard/management',
      'super-admin': '/dashboard/super-admin',
    };
    return routes[stdRole] || '/dashboard/member';
  };

  // --- 3. Login Handler ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Basic Validation
      if (mobile.length < 11) {
        throw new Error('সঠিক মোবাইল নম্বর দিন (১১ ডিজিট)');
      }
      if (password.length < 3) {
        throw new Error('সঠিক পাসওয়ার্ড দিন');
      }

      // Query Database (সবার জন্য একটাই লগইন কোয়েরি)
      const { data: user, error: dbError } = await supabase
        .from('members')
        .select('*')
        .eq('mobile', mobile.trim())
        .eq('password', password.trim())
        .maybeSingle();

      if (dbError) throw dbError;

      if (!user) {
        throw new Error('মোবাইল নম্বর বা পাসওয়ার্ড ভুল!');
      }

      if (user.status !== 'active') {
        throw new Error('আপনার অ্যাকাউন্টটি এখনও অনুমোদিত হয়নি। অনুগ্রহ করে অপেক্ষা করুন।');
      }

      // Success Logic
      const standardRole = normalizeRole(user.role);
      const userData = {
        id: user.id,
        full_name: user.full_name,
        mobile: user.mobile,
        role: standardRole,
        photo_url: user.photo_url,
        district: user.district
      };

      localStorage.setItem('user', JSON.stringify(userData));
      
      // Artificial delay for better UX
      setTimeout(() => {
        window.location.href = getDashboardRoute(standardRole);
      }, 500);

    } catch (err: any) {
      console.error("Login Error:", err);
      setError(err.message || 'সার্ভারে সমস্যা হচ্ছে। ইন্টারনেট সংযোগ চেক করুন।');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 font-sans relative overflow-hidden">
      
      {/* Background Decor (মিনিমাল ডিজাইন) */}
      <div className="absolute top-0 w-full h-72 bg-gradient-to-b from-[#006A4E] to-[#004e39] rounded-b-[4rem] shadow-xl z-0"></div>
      <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#FFB800]/20 rounded-full blur-2xl z-0"></div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-white z-10 overflow-hidden mt-8">
        
        {/* Header */}
        <div className="text-center pt-10 pb-6 px-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-[1.5rem] shadow-inner mb-5 text-[#006A4E]">
            <ShieldCheck size={42} strokeWidth={2} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">স্বাগতম!</h2>
          <p className="text-sm text-slate-500 font-medium mt-2 leading-relaxed">
            আমানত ফাউন্ডেশন এর সুরক্ষিত ড্যাশবোর্ডে প্রবেশ করতে আপনার তথ্য দিন।
          </p>
        </div>

        {/* Form */}
        <div className="px-8 pb-8">
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 text-rose-600 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <span className="text-xs font-bold leading-relaxed">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Mobile Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">মোবাইল নম্বর</label>
              <div className="relative group focus-within:ring-2 ring-[#006A4E]/20 rounded-2xl transition-all">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone size={18} className="text-slate-400 group-focus-within:text-[#006A4E] transition-colors" />
                </div>
                <input
                  type="number"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#006A4E] focus:bg-white focus:outline-none text-slate-800 font-bold transition-all placeholder:font-normal text-sm shadow-sm"
                  placeholder="017XXXXXXXX"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center pr-1">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">পাসওয়ার্ড</label>
                <Link href="#" className="text-[11px] font-bold text-slate-400 hover:text-[#006A4E] transition">
                  ভুলে গেছেন?
                </Link>
              </div>
              <div className="relative group focus-within:ring-2 ring-[#006A4E]/20 rounded-2xl transition-all">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400 group-focus-within:text-[#006A4E] transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-11 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#006A4E] focus:bg-white focus:outline-none text-slate-800 font-bold transition-all placeholder:font-normal text-sm shadow-sm"
                  placeholder="******"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#006A4E] transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#006A4E] hover:bg-[#005a42] text-white py-4 mt-2 rounded-2xl font-bold shadow-lg shadow-emerald-900/20 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <><LogIn size={20} /> প্রবেশ করুন</>}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center space-y-4">
            <p className="text-xs font-medium text-slate-500">
              একাউন্ট নেই? <Link href="/register-volunteer" className="text-[#006A4E] font-extrabold hover:underline">টিম লিডার আবেদন করুন</Link>
            </p>
            
            <Link href="/" className="inline-flex items-center justify-center w-full gap-1.5 text-slate-400 text-[11px] font-bold uppercase tracking-wider hover:text-[#006A4E] transition group bg-slate-50 py-3 rounded-xl">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <p className="absolute bottom-6 text-[11px] text-slate-400 font-medium tracking-wide">
        &copy; {new Date().getFullYear()} আমানত ফাউন্ডেশন | সর্বস্বত্ব সংরক্ষিত
      </p>

    </div>
  );
}