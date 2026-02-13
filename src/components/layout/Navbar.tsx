'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { ShieldCheck, Users, Menu, X, Phone, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // স্ক্রল করলে শ্যাডো এবং ব্যাকগ্রাউন্ড চেঞ্জ হবে
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: "হোম", href: "/" },
    { name: "আমাদের সম্পর্কে", href: "/#about" },
    { name: "সেবাসমূহ", href: "/#services" },
    { name: "সমাজসেবা", href: "/#social-work" },
    { name: "রিওয়ার্ড", href: "/#rewards" },
    { name: "যোগাযোগ", href: "#contact" },
  ];

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-[100] transition-all duration-300
      ${isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' 
        : 'bg-white py-4'}
    `}>
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        
        {/* --- 1. LOGO SECTION --- */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-lg shadow-emerald-200 group-hover:bg-emerald-700 transition-all group-hover:rotate-3">
            A
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1 border-2 border-white shadow-sm">
               <ShieldCheck size={10} className="text-emerald-900" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black text-slate-800 leading-none tracking-tight">আমানত</span>
            <span className="text-[10px] md:text-xs text-emerald-600 font-bold tracking-[0.2em] uppercase">ফাউন্ডেশন</span>
          </div>
        </Link>

        {/* --- 2. DESKTOP MENU --- */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {menuItems.map((item, index) => (
              <Link 
                key={index} 
                href={item.href} 
                className="text-slate-600 hover:text-emerald-600 font-bold text-sm transition-all relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full group-hover:left-0"></span>
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="h-6 w-[1px] bg-slate-200"></div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <a href="tel:017XXXXXXXX" className="text-slate-500 hover:text-emerald-600 transition-colors p-2 rounded-full hover:bg-emerald-50">
               <Phone size={20} />
            </a>
            <Link 
              href="/login" 
              className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all shadow-md hover:shadow-emerald-200 flex items-center gap-2"
            >
              <Users size={18} /> লগইন
            </Link>
          </div>
        </div>

        {/* --- 3. MOBILE MENU BUTTON --- */}
        <div className="flex lg:hidden items-center gap-3">
          <Link href="/login" className="p-2.5 bg-emerald-50 text-emerald-700 rounded-lg font-bold">
            <Users size={20} />
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- 4. MOBILE OVERLAY MENU --- */}
      <div className={`
        lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-2xl transition-all duration-300 overflow-hidden
        ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="p-6 space-y-4">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-slate-700 font-bold hover:bg-emerald-50 hover:text-emerald-700 transition-all"
            >
              {item.name}
              <ArrowRight size={16} className="opacity-0 group-hover:opacity-100" />
            </Link>
          ))}
          
          <div className="pt-4 grid grid-cols-2 gap-4">
            <a href="tel:017XXXXXXXX" className="flex items-center justify-center gap-2 py-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-sm">
               <Phone size={18} /> কল করুন
            </a>
            <Link 
              href="/register" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-100"
            >
              রেজিস্ট্রেশন
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}