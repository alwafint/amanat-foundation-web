'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { ShieldCheck, Users, Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // মেনু আইটেমের তালিকা (লিংক সহ)
  const menuItems = [
    { name: "হোম", href: "/" },
    { name: "আমাদের সম্পর্কে", href: "/#about" },
    { name: "সেবাসমূহ", href: "/#services" },
    { name: "সমাজসেবা", href: "/#social-work" }, // এই আইডিটি সেকশনে থাকতে হবে
    { name: "রিওয়ার্ড", href: "/#rewards" },
    { name: "যোগাযোগ", href: "#contact" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
        
        {/* 1. Logo Section */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="relative w-12 h-12 bg-emerald-700 rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-emerald-200 group-hover:bg-emerald-800 transition">
            A
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1 border-2 border-white">
               <ShieldCheck size={12} className="text-emerald-900" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="block text-xl md:text-2xl font-bold text-emerald-900 leading-none tracking-tight">আমানত</span>
            <span className="text-xs md:text-sm text-slate-500 font-medium tracking-widest uppercase group-hover:text-emerald-600 transition">ফাউন্ডেশন</span>
          </div>
        </Link>

        {/* 2. Desktop Menu (বড় স্ক্রিনে দেখাবে) */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 font-medium text-slate-600">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.href} 
              className="hover:text-emerald-700 transition duration-200 text-sm xl:text-base relative group"
            >
              {item.name}
              {/* Hover Underline Effect */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* 3. Action Buttons (Login/Register) */}
        <div className="hidden lg:flex items-center gap-4">
           {/* Emergency Call Button (Optional) */}
           <a href="tel:096XXXXXXXX" className="flex items-center gap-2 text-slate-600 hover:text-emerald-700 text-sm font-bold">
              <Phone size={18} /> <span className="hidden xl:inline">হটলাইন</span>
           </a>

           <Link href="/login" className="px-6 py-2.5 bg-emerald-700 text-white rounded-full hover:bg-emerald-800 transition shadow-lg shadow-emerald-200 font-semibold flex items-center gap-2 text-sm">
             <Users size={18} /> মেম্বার লগইন
           </Link>
        </div>

        {/* 4. Mobile Menu Button (ছোট স্ক্রিনে দেখাবে) */}
        <button 
          className="lg:hidden text-slate-600 focus:outline-none p-2 rounded hover:bg-slate-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} className="text-red-500" /> : <Menu size={28} />}
        </button>
      </div>

      {/* 5. Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 absolute w-full shadow-2xl animate-in slide-in-from-top-5 z-50">
          <div className="p-4 space-y-2">
            {menuItems.map((item, index) => (
              <Link 
                key={index} 
                href={item.href} 
                onClick={() => setIsMobileMenuOpen(false)} // ক্লিক করলে মেনু বন্ধ হবে
                className="block p-3 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 font-medium text-slate-700 border-l-4 border-transparent hover:border-emerald-500 transition-all"
              >
                {item.name}
              </Link>
            ))}
            
            <div className="border-t border-slate-100 my-2 pt-2"></div>

            <Link 
              href="/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-center w-full py-3 bg-emerald-700 text-white rounded-lg font-bold shadow-md hover:bg-emerald-800 active:scale-95 transition"
            >
              মেম্বার লগইন / রেজিস্টার
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}