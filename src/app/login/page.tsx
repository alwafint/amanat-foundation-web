'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// রিলেটিভ পাথ ব্যবহার করা হয়েছে যাতে এরর না আসে
import { supabase } from '../../lib/supabaseClient'; 
import { 
  Lock, Phone, ArrowLeft, LogIn, AlertCircle, Loader2, 
  UserCheck, UserCog, ShieldCheck, Users 
} from 'lucide-react';

export default function LoginPage() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [roleMode, setRoleMode] = useState<'member' | 'office'>('member');
  const router = useRouter();

  // --- ১. রোলের নাম স্ট্যান্ডার্ড করার ফাংশন ---
  const normalizeRole = (role: string) => {
    if (!role) return '';
    return role.toLowerCase().trim().replace(/_/g, '-');
  };

  // --- ২. রোল অনুযায়ী ড্যাশবোর্ড রুট ঠিক করা ---
  const getDashboardRoute = (role: string) => {
    const stdRole = normalizeRole(role);
    switch (stdRole) {
      case 'admin': return '/dashboard/admin';
      case 'team-leader': return '/dashboard/team-leader';
      case 'volunteer': return '/dashboard/volunteer';
      case 'staff': return '/dashboard/staff';
      case 'management': return '/dashboard/management';
      case 'super-admin': return '/dashboard/super-admin';
      default: return '/dashboard/member'; 
    }
  };

  // --- ৩. অটো লগইন চেক (Safe Redirect) ---
  useEffect(() => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user && user.role) {
          const target = getDashboardRoute(user.role);
          if (window.location.pathname !== target) {
            // Next.js এর fetch error এড়াতে সরাসরি ব্রাউজার রিডাইরেক্ট
            setTimeout(() => {
              window.location.replace(target);
            }, 100);
          }
        } else {
          localStorage.removeItem('user');
        }
      }
    } catch (e) {
      console.error("Local storage error:", e);
      localStorage.removeItem('user');
    }
  }, []);

  // --- ৪. লগইন হ্যান্ডলার ---
  const handleLogin = async (e?: React.FormEvent, demoCreds?: { m: string, p: string, r: 'member' | 'office' }) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    const loginMobile = demoCreds ? demoCreds.m : mobile.trim();
    const loginPass = demoCreds ? demoCreds.p : password.trim();
    const currentMode = demoCreds ? demoCreds.r : roleMode;

    try {
      let query = supabase.from('members').select('*').eq('mobile', loginMobile);

      // অফিস মোডে পাসওয়ার্ড চেক করবে
      if (currentMode === 'office' || demoCreds?.p) {
        query = query.eq('password', loginPass);
      }
      
      // মেম্বার মোডে শুধু মেম্বারদের ঢুকতে দেবে
      if (currentMode === 'member') {
        query = query.eq('role', 'member');
      }

      const { data: user, error: dbError } = await query.maybeSingle();

      if (dbError) throw new Error(dbError.message);

      if (!user) {
        setError(currentMode === 'member' ? 'মোবাইল নাম্বারটি আমাদের সিস্টেমে নেই!' : 'মোবাইল নাম্বার বা পাসওয়ার্ড ভুল!');
        setLoading(false);
        return;
      }

      if (user.status && user.status !== 'active') {
        setError('আপনার অ্যাকাউন্টটি নিষ্ক্রিয় বা পেন্ডিং অবস্থায় আছে। অফিসে যোগাযোগ করুন।');
        setLoading(false);
        return;
      }

      const standardRole = normalizeRole(user.role);

      const userData = {
        id: user.id,
        full_name: user.full_name,
        mobile: user.mobile,
        role: standardRole,
        village: user.village,
        parent_id: user.parent_id,
        branch_id: user.branch_id
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      
      const targetRoute = getDashboardRoute(standardRole);
      window.location.href = targetRoute; // সরাসরি রিডাইরেক্ট

    } catch (err: any) {
      console.error("Login Error:", err);
      setError('সার্ভার সমস্যা! ইন্টারনেট সংযোগ চেক করুন।');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col justify-center items-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl border border-white overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Header Design */}
        <div className="bg-[#006A4E] p-10 text-center relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform rotate-3">
              <ShieldCheck size={36} className="text-[#006A4E]" />
            </div>
            <h2 className="text-2xl font-black text-white mb-1 tracking-tight">আমানত ফাউন্ডেশন</h2>
            <p className="text-emerald-100/80 text-sm font-medium">নিরাপদ লগইন প্যানেল</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="p-8 pt-10">
          
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8 border border-slate-200">
              <button onClick={() => { setRoleMode('member'); setPassword(''); }} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${roleMode === 'member' ? 'bg-white text-[#006A4E] shadow-md scale-100' : 'text-slate-500 grayscale opacity-70 hover:opacity-100'}`}>
                  <UserCheck size={18}/> মেম্বার
              </button>
              <button onClick={() => setRoleMode('office')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${roleMode === 'office' ? 'bg-white text-[#006A4E] shadow-md scale-100' : 'text-slate-500 grayscale opacity-70 hover:opacity-100'}`}>
                  <UserCog size={18}/> অফিস
              </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-600 rounded-r-lg text-sm font-bold flex items-center gap-3 animate-pulse">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center group-focus-within:text-[#006A4E]">
                <Phone size={20} className="text-slate-400 transition-colors" />
              </div>
              <input
                type="text"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#006A4E] outline-none text-slate-800 font-bold transition-all placeholder:font-normal"
                placeholder="01XXXXXXXXX"
              />
            </div>

            {roleMode === 'office' && (
              <div className="relative group animate-in slide-in-from-top-2">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center group-focus-within:text-[#006A4E]">
                  <Lock size={20} className="text-slate-400 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#006A4E] outline-none text-slate-800 font-bold transition-all placeholder:font-normal"
                  placeholder="******"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#006A4E] hover:bg-[#005a42] text-white font-bold py-4 rounded-2xl shadow-lg flex justify-center items-center gap-3 disabled:opacity-70 transition-all active:scale-[0.98]"
            >
              {loading ? <Loader2 size={24} className="animate-spin" /> : <><LogIn size={20} /> লগইন করুন</>}
            </button>
          </form>

          {/* Test Login Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest mb-4">দ্রুত ডেমো লগইন</p>
              <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => handleLogin(undefined, { m: '01711111111', p: 'leader123', r: 'office' })} className="bg-indigo-50 text-indigo-700 py-2.5 rounded-xl text-xs font-bold border border-indigo-100 flex items-center justify-center gap-1 hover:bg-indigo-100 transition">
                      <Users size={14}/> টিম লিডার
                  </button>
                  <button onClick={() => handleLogin(undefined, { m: '01700000000', p: 'admin123', r: 'office' })} className="bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold border border-slate-800 flex items-center justify-center gap-1 hover:bg-black transition">
                      <ShieldCheck size={14}/> অ্যাডমিন
                  </button>
                  <button onClick={() => handleLogin(undefined, { m: '01722222222', p: 'staff123', r: 'office' })} className="bg-purple-50 text-purple-700 py-2.5 rounded-xl text-xs font-bold border border-purple-100 flex items-center justify-center gap-1 hover:bg-purple-100 transition">
                      <UserCog size={14}/> স্টাফ
                  </button>
                  <button onClick={() => handleLogin(undefined, { m: '01733333333', p: 'member123', r: 'member' })} className="bg-emerald-50 text-emerald-700 py-2.5 rounded-xl text-xs font-bold border border-emerald-100 flex items-center justify-center gap-1 hover:bg-emerald-100 transition">
                      <UserCheck size={14}/> মেম্বার
                  </button>
              </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              একাউন্ট নেই? <Link href="/register" className="text-emerald-700 font-bold hover:underline">রেজিস্ট্রেশন করুন</Link>
            </p>
            <Link href="/" className="inline-flex items-center gap-1 text-slate-400 text-xs mt-4 hover:text-[#006A4E] transition">
              <ArrowLeft size={12} /> হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}