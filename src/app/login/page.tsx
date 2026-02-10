'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation'; // রাউটিং এর জন্য
import { Lock, Phone, ArrowLeft, ShieldCheck, UserCog, Users } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'member' | 'admin'>('member');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ২ সেকেন্ড লোডিং দেখিয়ে ড্যাশবোর্ডে নিয়ে যাবে
    setTimeout(() => {
      if (role === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/member');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-64 bg-emerald-900 rounded-b-[50px] z-0"></div>
      
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-slate-100 relative z-10">
        
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="w-10 h-10 bg-emerald-700 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
              A
            </div>
            <span className="text-2xl font-bold text-emerald-900">আমানত ফাউন্ডেশন</span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-800">স্বাগতম!</h2>
          <p className="text-slate-500 text-sm">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
        </div>

        {/* Role Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
          <button 
            onClick={() => setRole('member')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition ${role === 'member' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}
          >
            <Users size={16} /> মেম্বার
          </button>
          <button 
            onClick={() => setRole('admin')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition ${role === 'admin' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}
          >
            <UserCog size={16} /> অ্যাডমিন
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {role === 'member' ? 'মোবাইল নম্বর' : 'অ্যাডমিন ইউজারনেম'}
            </label>
            <div className="relative group">
              <Phone className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-emerald-600 transition" size={18} />
              <input 
                type="text" 
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" 
                placeholder={role === 'member' ? "017xxxxxxxx" : "admin"} 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">পাসওয়ার্ড</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-emerald-600 transition" size={18} />
              <input 
                type="password" 
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" 
                placeholder="********" 
              />
            </div>
            <div className="text-right mt-2">
              <Link href="#" className="text-xs font-bold text-emerald-600 hover:underline">পাসওয়ার্ড ভুলে গেছেন?</Link>
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-emerald-700 text-white py-3.5 rounded-lg font-bold hover:bg-emerald-800 transition shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
          >
            {loading ? 'প্রসেসিং...' : 'লগইন করুন'}
          </button>
        </form>
        
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