'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, Smartphone, MapPin, ShieldCheck, 
  Download, Calendar, Edit3, Loader2, CreditCard, Star 
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const localData = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (localData?.mobile) {
        // ডাটাবেজ থেকে লেটেস্ট তথ্য আনা (যাতে স্ট্যাটাস চেঞ্জ হলে দেখা যায়)
        const { data } = await supabase
          .from('members')
          .select('*')
          .eq('mobile', localData.mobile)
          .single();
        
        if (data) {
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data)); // আপডেট লোকাল স্টোরেজ
        } else {
          setUser(localData); // ডাটাবেজে না পেলে লোকাল ডাটাই দেখাবে
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  // ঠিকানা ফরম্যাট করা
  const fullAddress = [user?.village, user?.upazila, user?.district]
    .filter(Boolean) // কোনোটা null থাকলে বাদ দিবে
    .join(', ');

  // বাটন হ্যান্ডলার
  const handleDownloadCard = () => {
    alert("ডিজিটাল আইডি কার্ড ডাউনলোডের প্রক্রিয়া শুরু হচ্ছে...");
    window.print(); // আপাতত প্রিন্ট অপশন চালু হবে
  };

  const handleUpdateInfo = () => {
    alert("তথ্য পরিবর্তনের জন্য অনুগ্রহ করে আপনার এলাকার স্টাফ অথবা অফিসে যোগাযোগ করুন। নিরাপত্তার স্বার্থে মেম্বাররা নিজে তথ্য পরিবর্তন করতে পারেন না।");
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-emerald-600">
      <Loader2 className="animate-spin mb-2" size={40}/>
      <p>প্রোফাইল লোড হচ্ছে...</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header Profile Section */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center gap-6">
         <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-4xl font-bold text-emerald-700 border-4 border-white shadow-md">
            {user?.full_name?.charAt(0)}
         </div>
         <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-slate-800">{user?.full_name}</h1>
            <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2 mt-1">
               <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${user?.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                 {user?.status === 'active' ? 'Verified Member' : 'Pending Verification'}
               </span>
               <span className="text-xs text-slate-400">| ID: {user?.id}</span>
            </p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Column: Personal Info --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
             {/* Background Decor */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-10 -mt-10"></div>
             
             <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <User size={20} className="text-emerald-600"/> ব্যক্তিগত তথ্য
                </h3>
                <button onClick={handleUpdateInfo} className="text-xs font-bold text-emerald-600 flex items-center gap-1 hover:underline">
                  <Edit3 size={14}/> এডিট
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 relative z-10">
                <InfoRow icon={<User size={18}/>} label="পুরো নাম" value={user?.full_name} />
                <InfoRow icon={<Smartphone size={18}/>} label="মোবাইল নম্বর" value={user?.mobile} />
                <InfoRow icon={<CreditCard size={18}/>} label="NID নম্বর" value={user?.nid || 'দেওয়া হয়নি'} />
                <InfoRow icon={<MapPin size={18}/>} label="ঠিকানা" value={fullAddress || 'ঠিকানা নেই'} />
                <InfoRow icon={<Calendar size={18}/>} label="যোগদানের তারিখ" value={user?.created_at ? new Date(user.created_at).toLocaleDateString('bn-BD') : 'N/A'} />
                <InfoRow icon={<ShieldCheck size={18}/>} label="অ্যাকাউন্ট স্ট্যাটাস" value={user?.status === 'active' ? 'সক্রিয় (Active)' : 'অপেক্ষমান (Pending)'} color={user?.status === 'active' ? 'text-emerald-600' : 'text-yellow-600'} />
             </div>
          </div>

          {/* Membership Info */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-6 text-white flex justify-between items-center shadow-lg">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-full text-yellow-400">
                   <Star size={24} fill="currentColor"/>
                </div>
                <div>
                   <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">মেম্বারশিপ টাইপ</p>
                   <h4 className="text-xl font-bold">জেনারেল মেম্বার</h4>
                </div>
             </div>
             <div className="text-right">
                <p className="text-2xl font-bold">১০%</p>
                <p className="text-xs text-slate-400">ডিসকাউন্ট সুবিধা</p>
             </div>
          </div>
        </div>

        {/* --- Right Column: Digital ID Card --- */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-bold text-slate-700 mb-4 ml-2">ডিজিটাল আইডি কার্ড</h3>
          
          {/* ID CARD DESIGN */}
          <div id="digital-id-card" className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-6 rounded-2xl shadow-2xl relative overflow-hidden aspect-[3/4] flex flex-col justify-between border-4 border-emerald-700/50 group hover:scale-[1.02] transition-transform duration-300">
             {/* Card Patterns */}
             <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-12 -mt-12 blur-2xl"></div>
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full -ml-10 -mb-10 blur-xl"></div>
             
             {/* Card Header */}
             <div className="text-center relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white text-emerald-900 rounded-xl font-bold text-2xl mb-3 shadow-lg">A</div>
                <h4 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-200">Amanat Foundation</h4>
                <div className="h-0.5 w-16 bg-emerald-600 mx-auto mt-2"></div>
             </div>

             {/* User Photo & Info */}
             <div className="text-center relative z-10">
                <div className="w-28 h-28 bg-slate-200 rounded-full mx-auto mb-4 border-4 border-emerald-500 overflow-hidden flex items-center justify-center shadow-inner">
                   {user?.photo_url ? (
                      <img src={user.photo_url} alt="Profile" className="w-full h-full object-cover"/>
                   ) : (
                      <User size={64} className="text-slate-400" />
                   )}
                </div>
                <h5 className="text-xl font-bold leading-none mb-1">{user?.full_name}</h5>
                <p className="text-[10px] text-emerald-300 font-mono tracking-widest bg-emerald-900/50 inline-block px-2 py-1 rounded">ID: {user?.id}</p>
             </div>

             {/* Details Box */}
             <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/10 mt-4 relative z-10">
                <div className="flex justify-between items-center text-[10px]">
                   <div className="text-left">
                      <p className="text-emerald-400 font-bold uppercase mb-0.5">এলাকা</p>
                      <p className="font-medium text-white text-xs">{user?.village || 'N/A'}</p>
                   </div>
                   <div className="w-[1px] h-6 bg-white/20"></div>
                   <div className="text-right">
                      <p className="text-emerald-400 font-bold uppercase mb-0.5">মোবাইল</p>
                      <p className="font-medium text-white text-xs">{user?.mobile}</p>
                   </div>
                </div>
             </div>

             {/* QR Code Placeholder */}
             <div className="text-center mt-2 opacity-80">
                <div className="bg-white p-1 inline-block rounded">
                   <div className="w-10 h-10 bg-slate-900 flex items-center justify-center text-[6px] font-bold text-slate-500">QR</div>
                </div>
             </div>
          </div>

          <button 
            onClick={handleDownloadCard}
            className="mt-6 w-full py-3 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition shadow-lg shadow-emerald-200"
          >
            <Download size={18}/> কার্ড ডাউনলোড করুন
          </button>
        </div>

      </div>
    </div>
  );
}

// Helper Component for Info Rows
function InfoRow({ icon, label, value, color }: any) {
    return (
        <div className="flex items-start gap-4">
            <div className="p-2.5 bg-slate-50 text-slate-400 rounded-xl shrink-0 border border-slate-100">{icon}</div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                <p className={`font-bold text-base md:text-lg break-all ${color || 'text-slate-700'}`}>{value || '---'}</p>
            </div>
        </div>
    )
}