import React from 'react';
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";

export default function Hero() {
  return (
    <header className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white pt-24 pb-48 overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/10 blur-3xl rounded-full transform translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <span className="inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-emerald-800/60 border border-emerald-500/50 text-sm mb-8 backdrop-blur-md text-emerald-100 shadow-lg">
           <Globe size={16} className="text-yellow-400" /> দেশজুড়ে বিস্তৃত সেবার নেটওয়ার্ক
        </span>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
          অল্প সঞ্চয়ে গড়বো ভবিষ্যৎ <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 drop-shadow-sm">
            সেবার আলোয় সাজাবো দেশ
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-emerald-100/90 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
          সমগ্র বাংলাদেশের কৃষি, স্বাস্থ্য ও কর্মসংস্থানে আমরা আছি আপনার পাশে। আজই <span className="font-semibold text-white">আমানত ফাউন্ডেশন</span>-এর মেম্বার হোন এবং নিশ্চিত করুন আপনার পরিবারের নিরাপত্তা।
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-yellow-500 text-emerald-950 rounded-lg font-bold hover:bg-yellow-400 transition-all shadow-xl hover:shadow-yellow-500/20 flex items-center justify-center gap-2 transform hover:-translate-y-1">
            মেম্বার হোন <ArrowRight size={20} />
          </Link>
          <Link href="#contact" className="w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/20 text-white rounded-lg font-bold hover:bg-white/20 transition backdrop-blur-sm">
            আমাদের শাখাসমূহ
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-slate-50"></path>
        </svg>
      </div>
    </header>
  );
}