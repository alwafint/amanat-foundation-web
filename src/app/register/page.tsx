'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { 
  User, 
  Phone, 
  CreditCard, 
  MapPin, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Briefcase,
  Users,
  Eye,
  EyeOff,
  Upload,      // আপলোড আইকন
  Image as ImageIcon,
  FileText
} from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-3 md:p-6 font-sans">
      
      {/* Main Card Container */}
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-slate-100">
        
        {/* Left Side - Branding (মোবাইলে হাইড থাকবে, বড় স্ক্রিনে দেখাবে) */}
        <div className="hidden lg:flex w-2/5 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white p-12 flex-col justify-between relative overflow-hidden">
          {/* Background Patterns */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-3 mb-10 group w-fit">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-white font-bold text-xl border border-white/20 group-hover:bg-white group-hover:text-emerald-900 transition duration-300">
                A
              </div>
              <span className="text-2xl font-bold tracking-tight">আমানত ফাউন্ডেশন</span>
            </Link>

            <h2 className="text-4xl font-bold leading-tight mb-6">
              আপনার সঞ্চয়, <br/> 
              <span className="text-yellow-400">আমাদের আমানত।</span>
            </h2>
            <p className="text-emerald-100 text-lg leading-relaxed">
              আজই মেম্বার হয়ে আমাদের পরিবারের সদস্য হোন। কৃষি, স্বাস্থ্য এবং আত্মকর্মসংস্থানে আমরা আছি আপনার পাশে।
            </p>
          </div>

          <div className="relative z-10 space-y-4">
             <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                <ShieldCheck className="text-yellow-400 w-8 h-8" />
                <div>
                   <h4 className="font-bold">১০০% স্বচ্ছতা</h4>
                   <p className="text-xs text-emerald-200">ডিজিটাল ড্যাশবোর্ডের মাধ্যমে হিসাব দেখার সুবিধা</p>
                </div>
             </div>
          </div>

          <div className="relative z-10 text-xs text-emerald-300 mt-8">
            &copy; ২০২৪ আমানত ফাউন্ডেশন।
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full lg:w-3/5 p-6 md:p-10 lg:p-14 overflow-y-auto max-h-screen">
          <div className="max-w-2xl mx-auto">
            
            {/* Mobile Branding (শুধু মোবাইলে দেখাবে) */}
            <div className="lg:hidden text-center mb-8">
               <h2 className="text-2xl font-bold text-emerald-800 flex items-center justify-center gap-2">
                 <ShieldCheck size={24}/> আমানত ফাউন্ডেশন
               </h2>
            </div>

            <div className="text-center lg:text-left mb-8">
               <h2 className="text-3xl font-bold text-slate-800 mb-2">মেম্বার রেজিস্ট্রেশন</h2>
               <p className="text-slate-500">নিচের ফর্মে সঠিক তথ্য দিয়ে পূরণ করুন (<span className="text-red-500">*</span> চিহ্নযুক্ত ঘরগুলো বাধ্যতামূলক)</p>
            </div>

            <form className="space-y-6">
              
              {/* ১. ব্যক্তিগত তথ্য */}
              <div className="space-y-5">
                 <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-wider border-b border-slate-200 pb-2 mb-4">
                   ব্যক্তিগত তথ্য
                 </h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        আপনার নাম <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <User className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-emerald-600 transition" size={18} />
                        <input type="text" required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none" placeholder="আপনার পুরো নাম" />
                      </div>
                    </div>
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        মোবাইল নম্বর <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <Phone className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-emerald-600 transition" size={18} />
                        <input type="number" required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none" placeholder="017xxxxxxxx" />
                      </div>
                    </div>
                 </div>

                 {/* Profession & NID Number */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        পেশা <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <Briefcase className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-emerald-600 transition" size={18} />
                        <select required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none text-slate-600 appearance-none">
                          <option value="">পেশা নির্বাচন করুন</option>
                          <option>কৃষক</option>
                          <option>ব্যবসায়ী</option>
                          <option>চাকুরীজীবী</option>
                          <option>ছাত্র/ছাত্রী</option>
                          <option>গৃহিণী</option>
                          <option>প্রবাসী</option>
                          <option>অন্যান্য</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        NID নম্বর <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <CreditCard className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-emerald-600 transition" size={18} />
                        <input type="number" required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none" placeholder="জাতীয় পরিচয়পত্র নম্বর" />
                      </div>
                    </div>
                 </div>

                 {/* Address */}
                 <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      বর্তমান ঠিকানা <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <MapPin className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-emerald-600 transition" size={18} />
                      <textarea required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none" placeholder="গ্রাম, পোস্ট অফিস, থানা, জেলা..." rows={2}></textarea>
                    </div>
                 </div>
              </div>

              {/* ২. ডকুমেন্ট আপলোড (নতুন সেকশন) */}
              <div className="space-y-5 pt-2">
                 <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-wider border-b border-slate-200 pb-2 mb-4">
                   ডকুমেন্ট আপলোড
                 </h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Photo Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          আপনার ছবি <span className="text-red-500">*</span>
                        </label>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-emerald-500 hover:bg-emerald-50 transition cursor-pointer relative group">
                            <input type="file" required accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <div className="flex flex-col items-center justify-center text-slate-500 group-hover:text-emerald-600">
                                <ImageIcon size={32} className="mb-2" />
                                <span className="text-sm font-medium">ছবি আপলোড করুন</span>
                                <span className="text-xs text-slate-400 mt-1">(JPG, PNG - Max 2MB)</span>
                            </div>
                        </div>
                    </div>

                    {/* NID Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          NID কার্ডের ছবি <span className="text-red-500">*</span>
                        </label>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-emerald-500 hover:bg-emerald-50 transition cursor-pointer relative group">
                            <input type="file" required accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <div className="flex flex-col items-center justify-center text-slate-500 group-hover:text-emerald-600">
                                <FileText size={32} className="mb-2" />
                                <span className="text-sm font-medium">NID আপলোড করুন</span>
                                <span className="text-xs text-slate-400 mt-1">(সামনের অংশ)</span>
                            </div>
                        </div>
                    </div>
                 </div>
              </div>

              {/* ৩. নিরাপত্তা */}
              <div className="space-y-5 pt-2">
                 <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-wider border-b border-slate-200 pb-2 mb-4">
                   নিরাপত্তা
                 </h3>
                 
                 <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      পাসওয়ার্ড দিন <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-emerald-600 transition" size={18} />
                      <input 
                        required
                        type={showPassword ? "text" : "password"} 
                        className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none" 
                        placeholder="কমপক্ষে ৬ সংখ্যার পাসওয়ার্ড" 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-slate-400 hover:text-emerald-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                 </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button className="w-full bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-800 transition shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 group transform active:scale-[0.99]">
                  রেজিস্ট্রেশন সম্পন্ন করুন <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
                </button>
              </div>

              {/* Login Link */}
              <p className="text-center text-slate-500 mt-6">
                আগেই অ্যাকাউন্ট আছে? <Link href="/login" className="text-emerald-700 font-bold hover:underline">লগইন করুন</Link>
              </p>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}