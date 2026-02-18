'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// রিলেটিভ পাথ ব্যবহার করা হয়েছে যাতে এরর না আসে
import { supabase } from '../../lib/supabaseClient'; 
import { 
  Lock, Phone, ArrowLeft, LogIn, 
  UserCheck, UserCog, Loader2, ShieldCheck 
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [roleMode, setRoleMode] = useState<'member' | 'office'>('member');

  // পেজ লোড হলে আগের সেশন চেক (Optional)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      // redirectBasedOnRole(user.role); 
    }
  }, []);

  const redirectBasedOnRole = (role: string) => {
    switch (role) {
      case 'admin':
        router.push('/dashboard/admin');
        break;
      case 'management':
        router.push('/dashboard/management');
        break;
      case 'staff':
        router.push('/dashboard/staff');
        break;
      default:
        router.push('/dashboard/member');
        break;
    }
  };

  const handleLogin = async (e?: React.FormEvent, demoCreds?: { m: string, p: string, r: 'member' | 'office' }) => {
    if (e) e.preventDefault();
    setLoading(true);

    const loginMobile = demoCreds ? demoCreds.m : mobile;
    const loginPass = demoCreds ? demoCreds.p : password;
    const currentMode = demoCreds ? demoCreds.r : roleMode;

    try {
      let query = supabase.from('members').select('*').eq('mobile', loginMobile);

      // যদি অফিস মোড হয় বা ডেমো ক্রেডেনশিয়াল থাকে, তবে পাসওয়ার্ড চেক করবে
      if (currentMode === 'office' || demoCreds?.p) {
        query = query.eq('password', loginPass);
      }
      
      // মেম্বার মোডে রোল 'member' হতে হবে
      if (currentMode === 'member') {
        query = query.eq('role', 'member');
      }

      const { data, error } = await query.single();

      if (error || !data) {
        throw new Error(currentMode === 'member' 
          ? 'মোবাইল নম্বরটি আমাদের মেম্বার লিস্টে নেই!' 
          : 'মোবাইল বা পাসওয়ার্ড ভুল!');
      }

      if (data.status === 'rejected') {
        throw new Error('আপনার একাউন্টটি বাতিল করা হয়েছে। অফিসে যোগাযোগ করুন।');
      }

      // সেশন সেভ
      localStorage.setItem('user', JSON.stringify(data));
      alert(`স্বাগতম, ${data.full_name}!`);
      redirectBasedOnRole(data.role);

    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-72 bg-emerald-900 rounded-b-[60px] z-0"></div>

      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-slate-100 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-700 shadow-inner">
             <ShieldCheck size={35} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">লগইন প্যানেল</h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">আমানত ফাউন্ডেশন ডিজিটাল সিস্টেমে আপনাকে স্বাগতম</p>
        </div>

        {/* Role Toggle Switch */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8 border border-slate-200">
            <button 
              onClick={() => { setRoleMode('member'); setPassword(''); }} 
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${roleMode === 'member' ? 'bg-white text-emerald-700 shadow-md scale-100' : 'text-slate-500 grayscale opacity-70 hover:opacity-100'}`}
            >
                <UserCheck size={18}/> মেম্বার
            </button>
            <button 
              onClick={() => setRoleMode('office')} 
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${roleMode === 'office' ? 'bg-white text-emerald-700 shadow-md scale-100' : 'text-slate-500 grayscale opacity-70 hover:opacity-100'}`}
            >
                <UserCog size={18}/> অফিস
            </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative group">
            <Phone className="absolute left-4 top-4 text-slate-400 group-focus-within:text-emerald-600 transition" size={20} />
            <input 
              type="text" 
              required 
              value={mobile}
              onChange={(e) => setMobile(e.target.value)} 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition font-bold text-slate-700" 
              placeholder="মোবাইল নম্বর" 
            />
          </div>

          {/* পাসওয়ার্ড ফিল্ড শুধু অফিস মোডে দেখাবে */}
          {roleMode === 'office' && (
            <div className="relative group animate-in slide-in-from-top-2">
              <Lock className="absolute left-4 top-4 text-slate-400 group-focus-within:text-emerald-600 transition" size={20} />
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition font-bold text-slate-700" 
                placeholder="পাসওয়ার্ড" 
              />
            </div>
          )}

          <button 
            disabled={loading} 
            className="w-full bg-emerald-700 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-800 transition shadow-lg shadow-emerald-200 flex justify-center items-center gap-2 active:scale-95 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><LogIn size={22}/> প্রবেশ করুন</>}
          </button>
        </form>

        {/* Demo Login Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest mb-4">দ্রুত ডেমো লগইন</p>
            <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleLogin(undefined, { m: 'manager', p: 'manager123', r: 'office' })}
                  className="bg-indigo-50 text-indigo-700 py-2.5 rounded-xl text-xs font-bold border border-indigo-100 flex items-center justify-center gap-1 hover:bg-indigo-100 transition"
                >
                    <UserCog size={14}/> ম্যানেজমেন্ট
                </button>
                <button 
                  onClick={() => handleLogin(undefined, { m: '01700000000', p: 'admin123', r: 'office' })}
                  className="bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold border border-slate-800 flex items-center justify-center gap-1 hover:bg-black transition"
                >
                    <ShieldCheck size={14}/> অ্যাডমিন
                </button>
                <button 
                  onClick={() => handleLogin(undefined, { m: 'staff', p: 'staff123', r: 'office' })}
                  className="bg-purple-50 text-purple-700 py-2.5 rounded-xl text-xs font-bold border border-purple-100 flex items-center justify-center gap-1 hover:bg-purple-100 transition"
                >
                    <UserCog size={14}/> স্টাফ
                </button>
                <button 
                  onClick={() => handleLogin(undefined, { m: 'member', p: 'member123', r: 'member' })}
                  className="bg-emerald-50 text-emerald-700 py-2.5 rounded-xl text-xs font-bold border border-emerald-100 flex items-center justify-center gap-1 hover:bg-emerald-100 transition"
                >
                    <UserCheck size={14}/> মেম্বার
                </button>
            </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            একাউন্ট নেই? <Link href="/register" className="text-emerald-700 font-bold hover:underline">রেজিস্ট্রেশন করুন</Link>
          </p>
          <Link href="/" className="inline-flex items-center gap-1 text-slate-400 text-xs mt-4 hover:text-emerald-600 transition">
            <ArrowLeft size={12} /> হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}