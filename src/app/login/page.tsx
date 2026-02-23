'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient'; 
import { 
  Lock, Phone, ArrowLeft, LogIn, AlertCircle, Loader2, 
  UserCheck, UserCog, ShieldCheck, Eye, EyeOff, Building2 
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  
  // State Management
  const [activeTab, setActiveTab] = useState<'member' | 'office'>('member');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    const routes: { [key: string]: string } = {
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

      // Query Database
      let query = supabase
        .from('members')
        .select('*')
        .eq('mobile', mobile.trim())
        .eq('password', password.trim()); // For security, check password in DB query

      // Role specific filtering
      if (activeTab === 'member') {
        // মেম্বাররা শুধু মেম্বার রোলেই লগইন করতে পারবে
        query = query.in('role', ['member', 'volunteer']); 
      } else {
        // অফিস ট্যাবে মেম্বার বাদে বাকি সবাই
        query = query.neq('role', 'member');
      }

      const { data: user, error: dbError } = await query.maybeSingle();

      if (dbError) throw dbError;

      if (!user) {
        throw new Error('মোবাইল নম্বর বা পাসওয়ার্ড ভুল! অথবা আপনি ভুল ট্যাবে লগইন করছেন।');
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

  // --- 4. Demo Login (Optional: For Development) ---
  const handleDemoLogin = (role: string, phone: string, pass: string) => {
    setMobile(phone);
    setPassword(pass);
    setActiveTab(role === 'member' ? 'member' : 'office');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 font-sans relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-64 bg-[#006A4E] rounded-b-[3rem] shadow-lg z-0"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl z-0"></div>
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#FFB800]/20 rounded-full blur-xl z-0"></div>

      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl border border-white z-10 overflow-hidden">
        
        {/* Header */}
        <div className="text-center pt-8 pb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4 text-[#006A4E]">
            <ShieldCheck size={38} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-black text-slate-800">আমানত ফাউন্ডেশন</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">নিরাপদ লগইন প্যানেল</p>
        </div>

        {/* Tab Switcher */}
        <div className="px-8 mt-2">
          <div className="bg-slate-100 p-1.5 rounded-xl flex relative">
             <button 
               onClick={() => { setActiveTab('member'); setError(''); }}
               className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition-all duration-300 ${activeTab === 'member' ? 'bg-white text-[#006A4E] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
               <UserCheck size={16}/> সাধারণ সদস্য
             </button>
             <button 
               onClick={() => { setActiveTab('office'); setError(''); }}
               className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition-all duration-300 ${activeTab === 'office' ? 'bg-white text-[#006A4E] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
               <Building2 size={16}/> অফিস প্যানেল
             </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3 text-rose-600 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <span className="text-xs font-bold leading-relaxed">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Mobile Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 ml-1 uppercase">মোবাইল নম্বর</label>
              <div className="relative group focus-within:ring-2 ring-[#006A4E]/20 rounded-xl transition-all">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone size={18} className="text-slate-400 group-focus-within:text-[#006A4E] transition-colors" />
                </div>
                <input
                  type="number"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#006A4E] focus:outline-none text-slate-800 font-bold transition-all placeholder:font-normal text-sm"
                  placeholder="017XXXXXXXX"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 ml-1 uppercase">পাসওয়ার্ড</label>
              <div className="relative group focus-within:ring-2 ring-[#006A4E]/20 rounded-xl transition-all">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400 group-focus-within:text-[#006A4E] transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#006A4E] focus:outline-none text-slate-800 font-bold transition-all placeholder:font-normal text-sm"
                  placeholder="******"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#006A4E] transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="#" className="text-[11px] font-bold text-slate-400 hover:text-[#006A4E] transition">
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#006A4E] hover:bg-[#005a42] text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-900/20 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <><LogIn size={20} /> লগইন করুন</>}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-xs font-medium text-slate-500">
              একাউন্ট নেই? <Link href="/register/team-leader" className="text-[#006A4E] font-extrabold hover:underline">টিম লিডার আবেদন</Link>
            </p>
            
            <Link href="/" className="inline-flex items-center gap-1.5 text-slate-400 text-[11px] font-bold uppercase tracking-wider hover:text-[#006A4E] transition group">
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <p className="absolute bottom-4 text-[10px] text-slate-400 font-medium">
        &copy; ২০২৬ আমানত ফাউন্ডেশন | সর্বস্বত্ব সংরক্ষিত
      </p>

    </div>
  );
}