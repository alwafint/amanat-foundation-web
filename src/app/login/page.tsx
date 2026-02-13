'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
// রিলেটিভ পাথ (আপনার ফোল্ডার স্ট্রাকচার অনুযায়ী)
import { supabase } from '../../lib/supabaseClient'; 
import { Lock, Phone, ArrowLeft, LogIn, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // ১. ডাটাবেজ থেকে মেম্বার খোঁজা
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('mobile', mobile)
        .eq('password', password) // নোট: রিয়েল অ্যাপে পাসওয়ার্ড হ্যাশ করা উচিত
        .single();

      if (error || !data) {
        throw new Error('মোবাইল নম্বর বা পাসওয়ার্ড ভুল!');
      }

      // ২. স্ট্যাটাস চেক করা
      if (data.status !== 'active' && data.status !== 'pending') {
        throw new Error('আপনার অ্যাকাউন্টটি নিষ্ক্রিয় করা হয়েছে। অফিসে যোগাযোগ করুন।');
      }

      // ৩. ডাটা ব্রাউজারে সেভ করা (Session)
      localStorage.setItem('user', JSON.stringify(data));
      
      // ৪. রোল অনুযায়ী ড্যাশবোর্ডে পাঠানো
      if (data.role === 'admin') {
        router.push('/dashboard/admin');
      } else if (data.role === 'staff') {
        router.push('/dashboard/staff');
      } else {
        // সাধারণ মেম্বারদের জন্য
        alert(`স্বাগতম, ${data.full_name}!`);
        router.push('/dashboard/member');
      }

    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
             <LogIn className="text-emerald-600" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">লগইন করুন</h2>
          <p className="text-slate-500 text-sm mt-2">আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন</p>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle size={16} /> {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">মোবাইল নম্বর</label>
            <div className="relative group">
              <Phone className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-emerald-600 transition" size={18} />
              <input 
                type="text" 
                onChange={(e) => setMobile(e.target.value)} 
                required 
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition" 
                placeholder="017xxxxxxxx" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">পাসওয়ার্ড</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-emerald-600 transition" size={18} />
              <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition" 
                placeholder="********" 
              />
            </div>
            <div className="text-right mt-2">
               <a href="#" className="text-xs font-semibold text-emerald-600 hover:underline">পাসওয়ার্ড ভুলে গেছেন?</a>
            </div>
          </div>

          <button 
            disabled={loading} 
            className="w-full bg-emerald-700 text-white py-3.5 rounded-xl font-bold hover:bg-emerald-800 transition shadow-lg shadow-emerald-200 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'যাচাই করা হচ্ছে...' : 'লগইন করুন'}
          </button>
        </form>
        
        {/* Footer Links */}
        <div className="mt-8 text-center border-t border-slate-100 pt-6">
          <p className="text-sm text-slate-500 mb-2">
            একাউন্ট নেই? <Link href="/register" className="text-emerald-700 font-bold hover:underline">রেজিস্ট্রেশন করুন</Link>
          </p>
          <Link href="/" className="inline-flex items-center gap-1 text-slate-400 text-xs hover:text-emerald-600 transition mt-2">
            <ArrowLeft size={12} /> হোম পেজে ফিরে যান
          </Link>
        </div>

      </div>
    </div>
  );
}