'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { 
  User, Phone, MapPin, Loader2, Camera, 
  FileText, UploadCloud, Home, CheckCircle2 
} from "lucide-react";
import { supabase } from '../../lib/supabaseClient';

export default function RegisterTeamLeaderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // File States
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [nidFile, setNidFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [nidPreview, setNidPreview] = useState<string | null>(null);

  // Form Data State
  const [formData, setFormData] = useState({
    full_name: '',
    whatsapp: '',
    division: '',
    district: '',
    upazila: '',
    union_name: '',
    full_address: '', 
  });

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'nid') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      
      if (type === 'photo') {
        setPhotoFile(file);
        setPhotoPreview(previewUrl);
      } else {
        setNidFile(file);
        setNidPreview(previewUrl);
      }
    }
  };

  // Upload Function
  const uploadFile = async (file: File, folder: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('survey-images') 
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('survey-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  // Handle Text Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Handler
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!photoFile || !nidFile) {
        alert("দয়া করে আপনার ছবি এবং এনআইডি কপি আপলোড করুন।");
        setLoading(false);
        return;
      }

      // ১. ছবি আপলোড করা হচ্ছে
      const photoUrl = await uploadFile(photoFile, 'team_leaders/photos');
      const nidUrl = await uploadFile(nidFile, 'team_leaders/nids');

      // ২. ডাটাবেজে ইনসার্ট করা হচ্ছে
      const { error } = await supabase.from('members').insert([{
        full_name: formData.full_name,
        mobile: formData.whatsapp, // মোবাইল কলামে হোয়াটসঅ্যাপ নম্বর সেভ হবে
        whatsapp: formData.whatsapp,
        nid_url: nidUrl,
        photo_url: photoUrl,
        
        division: formData.division,
        district: formData.district,
        upazila: formData.upazila,
        union_name: formData.union_name,
        address: formData.full_address,
        
        password: '123', // ডিফল্ট পাসওয়ার্ড
        role: 'team_leader',
        status: 'pending',
      }]);

      if (error) throw error;

      alert("আবেদন সফল হয়েছে! আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।");
      router.push('/login');

    } catch (err: any) {
      console.error(err);
      alert("ত্রুটি: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Styles
  const inputContainerClass = "relative bg-slate-50 border border-slate-200 rounded-xl p-1 focus-within:ring-2 focus-within:ring-[#006A4E] transition-all";
  const inputClass = "w-full bg-transparent p-3 pl-10 outline-none text-slate-700 font-medium text-sm";
  const labelClass = "text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block ml-1";
  const iconClass = "absolute left-3 top-3.5 text-slate-400";

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-4 font-sans">
      
      <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100">
        
        <div className="bg-[#006A4E] p-8 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
           <h1 className="text-2xl font-black text-white mb-2">টিম লিডার রেজিস্ট্রেশন</h1>
           <p className="text-emerald-100 text-xs px-6 opacity-90 leading-relaxed">
             আমানত ফাউন্ডেশনের সাথে আপনার এলাকার উন্নয়নে যুক্ত হতে ফর্মটি পূরণ করুন।
           </p>
        </div>

        <div className="p-6 md:p-8">
          <form onSubmit={handleRegister} className="space-y-6">
            
            {/* ১. ব্যক্তিগত তথ্য */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-[#006A4E] uppercase border-b border-emerald-50 pb-2 flex items-center gap-2">
                <User size={14}/> পরিচয়
              </h3>
              
              <div>
                <label className={labelClass}>আপনার পূর্ণ নাম</label>
                <div className={inputContainerClass}>
                  <User size={18} className={iconClass} />
                  <input type="text" name="full_name" required className={inputClass} placeholder="নাম লিখুন" onChange={handleChange} />
                </div>
              </div>

              <div>
                <label className={labelClass}>হোয়াটসঅ্যাপ নম্বর</label>
                <div className={inputContainerClass}>
                  <Phone size={18} className={iconClass} />
                  <input type="number" name="whatsapp" required className={inputClass} placeholder="017xxxxxxxx" onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* ২. আপলোড বক্স */}
            <div className="grid grid-cols-2 gap-4">
              <label className={`border-2 border-dashed ${photoPreview ? 'border-[#006A4E] bg-emerald-50' : 'border-slate-300'} aspect-square rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden transition relative`}>
                  {photoPreview ? <img src={photoPreview} className="w-full h-full object-cover"/> : <><Camera size={24} className="text-slate-400 mb-1"/><span className="text-[10px] font-bold text-slate-500">ছবি</span></>}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'photo')} />
              </label>

              <label className={`border-2 border-dashed ${nidPreview ? 'border-[#006A4E] bg-emerald-50' : 'border-slate-300'} aspect-square rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden transition relative`}>
                  {nidPreview ? <img src={nidPreview} className="w-full h-full object-cover"/> : <><FileText size={24} className="text-slate-400 mb-1"/><span className="text-[10px] font-bold text-slate-500">NID কপি</span></>}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'nid')} />
              </label>
            </div>

            {/* ৩. ঠিকানা */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-[#006A4E] uppercase border-b border-emerald-50 pb-2 flex items-center gap-2">
                <MapPin size={14}/> ঠিকানা
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <input type="text" name="division" required placeholder="বিভাগ" className="p-3 bg-slate-50 border rounded-xl text-sm outline-none focus:border-[#006A4E]" onChange={handleChange} />
                <input type="text" name="district" required placeholder="জেলা" className="p-3 bg-slate-50 border rounded-xl text-sm outline-none focus:border-[#006A4E]" onChange={handleChange} />
                <input type="text" name="upazila" required placeholder="উপজেলা" className="p-3 bg-slate-50 border rounded-xl text-sm outline-none focus:border-[#006A4E]" onChange={handleChange} />
                <input type="text" name="union_name" required placeholder="ইউনিয়ন" className="p-3 bg-slate-50 border rounded-xl text-sm outline-none focus:border-[#006A4E]" onChange={handleChange} />
              </div>

              <div className="relative">
                <Home size={18} className="absolute left-3 top-3.5 text-slate-400" />
                <textarea name="full_address" required rows={2} className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#006A4E] text-sm" placeholder="গ্রাম, পাড়া, ওয়ার্ড নং..." onChange={handleChange} />
              </div>
            </div>

            <button disabled={loading} className="w-full bg-[#006A4E] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-emerald-800 transition flex items-center justify-center gap-2 disabled:opacity-70">
              {loading ? <Loader2 className="animate-spin" /> : <><CheckCircle2 size={20} /> আবেদন জমা দিন</>}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}