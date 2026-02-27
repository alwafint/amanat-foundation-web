'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, Loader2, MapPin, Briefcase, Phone, User, Banknote, ShieldCheck, AlertTriangle } from "lucide-react";
// আপনার ফোল্ডার অনুযায়ী supabaseClient এর পাথ ঠিক করে নেবেন
import { supabase } from '../../../../../lib/supabaseClient'; 
import { divisions, districts, upazilas, unions } from '../../../../../lib/bd-locations';

export default function NewVolunteerPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // ভলান্টিয়ার কাউন্ট স্টেট
  const [volunteerCount, setVolunteerCount] = useState<number>(0);
  const MAX_VOLUNTEERS = 100;

  // Form States
  const[formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    username: '',
    profession: '',
    monthlyIncome: '',
    wardNo: '',
    village: ''
  });

  useEffect(() => {
    const fetchUserAndCount = async () => {
      const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (!savedUser?.mobile) return router.push('/login');

      // ১. ডাটাবেজ থেকে টিম লিডারের ফ্রেশ ডাটা আনা
      const { data: userData } = await supabase
        .from('members')
        .select('*')
        .eq('mobile', savedUser.mobile)
        .single();
      
      if (userData) {
        setCurrentUser(userData);

        // ২. এই টিম লিডার কতজন ভলান্টিয়ার অ্যাড করেছে তার কাউন্ট বের করা
        const { count } = await supabase
          .from('members')
          .select('*', { count: 'exact', head: true })
          .eq('role', 'volunteer')
          .eq('referred_by', savedUser.mobile);
        
        setVolunteerCount(count || 0);
      }
      setLoading(false);
    };
    fetchUserAndCount();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // লিমিট চেক (১০০ জনের বেশি হলে সাবমিট করতে দিবে না)
    if (volunteerCount >= MAX_VOLUNTEERS) {
      alert(`⚠️ লিমিট পূর্ণ! আপনি সর্বোচ্চ ${MAX_VOLUNTEERS} জন ভলান্টিয়ার যোগ করতে পারবেন।`);
      return;
    }

    setSubmitting(true);

    // ৬-ডিজিটের র‍্যান্ডম পাসওয়ার্ড তৈরি
    const generatedPassword = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      const { error } = await supabase.from('members').insert([{
        full_name: formData.fullName,
        mobile: formData.mobile,
        username: formData.username,
        profession: formData.profession,
        monthly_income: formData.monthlyIncome,
        password: generatedPassword,
        role: 'volunteer',
        status: 'active',
        referred_by: currentUser.mobile, // টিম লিডারের রেফারেন্স
        
        // অটোমেটিক ইনহেরিট করা লোকেশন
        division: currentUser.division,
        district: currentUser.district,
        upazila: currentUser.upazila,
        union_name: currentUser.union_name,
        
        // নতুন ইনপুট করা লোকেশন
        ward_no: formData.wardNo,
        village: formData.village
      }]);

      if (error) throw error;

      alert(`✅ ভলান্টিয়ার সফলভাবে তৈরি হয়েছে!\n\n--- লগইন ডিটেইলস ---\nইউজারনেম/মোবাইল: ${formData.username} অথবা ${formData.mobile}\nপাসওয়ার্ড: ${generatedPassword}\n\n(দয়া করে পাসওয়ার্ডটি ভলান্টিয়ারকে জানিয়ে দিন)`);
      
      router.push('./volunteer-list'); // লিস্ট পেজে পাঠিয়ে দেওয়া হবে
    } catch (err: any) {
      alert("সমস্যা হয়েছে: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="h-screen flex justify-center py-20"><Loader2 className="animate-spin text-[#006A4E]" size={40}/></div>;

  const isLimitReached = volunteerCount >= MAX_VOLUNTEERS;

  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans max-w-3xl mx-auto">
      
      <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 mb-6">
        
        {/* Header Section with Counter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-50 text-[#006A4E] rounded-2xl flex items-center justify-center border border-emerald-100">
              <UserPlus size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800">নতুন ভলান্টিয়ার</h2>
              <p className="text-sm text-slate-500 font-medium">আপনার ইউনিয়নের অধীনে সেচ্ছাসেবক নিয়োগ</p>
            </div>
          </div>
          
          {/* Limit Badge */}
          <div className={`px-5 py-2.5 rounded-xl border flex flex-col items-center justify-center ${isLimitReached ? 'bg-red-50 border-red-200 text-red-600' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
            <p className="text-[10px] font-black uppercase tracking-widest mb-0.5">ভলান্টিয়ার লিমিট</p>
            <p className="text-xl font-bold leading-none">{volunteerCount} <span className="text-sm opacity-70">/ {MAX_VOLUNTEERS}</span></p>
          </div>
        </div>

        {isLimitReached ? (
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl text-center mb-6">
             <AlertTriangle size={48} className="mx-auto text-red-400 mb-3" />
             <h3 className="text-lg font-bold text-red-600">লিমিট পূর্ণ হয়ে গেছে!</h3>
             <p className="text-sm text-red-500 mt-1">আপনি ইতিমধ্যে সর্বোচ্চ ১০০ জন ভলান্টিয়ার যোগ করেছেন। নতুন অ্যাকাউন্ট খোলার অনুমতি নেই।</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Personal Info */}
            <div>
              <h4 className="text-xs font-black text-[#006A4E] uppercase tracking-widest mb-4 flex items-center gap-2"><User size={16}/> ব্যক্তিগত তথ্য</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-bold text-slate-500 ml-1">পূর্ণ নাম</label>
                    <input type="text" required placeholder="ভলান্টিয়ারের নাম..." value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full mt-1 p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#006A4E] transition"/>
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 ml-1">মোবাইল নম্বর</label>
                    <input type="text" required placeholder="01XXXXXXXXX" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="w-full mt-1 p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#006A4E] transition"/>
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 ml-1">পেশা</label>
                    <input type="text" placeholder="উদাঃ ছাত্র, ব্যবসায়ী..." value={formData.profession} onChange={e => setFormData({...formData, profession: e.target.value})} className="w-full mt-1 p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#006A4E] transition"/>
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 ml-1">মাসিক আয় (যদি থাকে)</label>
                    <input type="number" placeholder="টাকার পরিমাণ..." value={formData.monthlyIncome} onChange={e => setFormData({...formData, monthlyIncome: e.target.value})} className="w-full mt-1 p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#006A4E] transition"/>
                </div>
                <div className="md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 ml-1">লগইন ইউজারনেম (Username)</label>
                    <input type="text" required placeholder="উদাঃ vol_hasan" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="w-full mt-1 p-3.5 bg-white border-2 border-emerald-100 rounded-xl outline-none focus:border-[#006A4E] transition font-bold text-[#006A4E]"/>
                    <p className="text-[10px] text-amber-600 mt-1.5 ml-1 font-medium">* সেভ করার পর অটোমেটিক একটি ৬-ডিজিটের পাসওয়ার্ড জেনারেট হবে।</p>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-black text-[#006A4E] uppercase tracking-widest mb-4 flex items-center gap-2"><MapPin size={16}/> ঠিকানা (অটো-সেট)</h4>
              
              {/* Auto Filled (Read-only) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-white p-3 rounded-xl border border-slate-100"><p className="text-[10px] text-slate-400 font-bold uppercase">বিভাগ</p><p className="text-sm font-bold text-slate-700">{currentUser?.division || 'N/A'}</p></div>
                <div className="bg-white p-3 rounded-xl border border-slate-100"><p className="text-[10px] text-slate-400 font-bold uppercase">জেলা</p><p className="text-sm font-bold text-slate-700">{currentUser?.district || 'N/A'}</p></div>
                <div className="bg-white p-3 rounded-xl border border-slate-100"><p className="text-[10px] text-slate-400 font-bold uppercase">উপজেলা</p><p className="text-sm font-bold text-slate-700">{currentUser?.upazila || 'N/A'}</p></div>
                <div className="bg-white p-3 rounded-xl border border-slate-100"><p className="text-[10px] text-slate-400 font-bold uppercase">ইউনিয়ন</p><p className="text-sm font-bold text-slate-700">{currentUser?.union_name || 'N/A'}</p></div>
              </div>

              {/* Manual Inputs for Village and Ward */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-bold text-slate-500 ml-1">গ্রামের নাম <span className="text-red-500">*</span></label>
                    <input type="text" required placeholder="গ্রাম লিখুন..." value={formData.village} onChange={e => setFormData({...formData, village: e.target.value})} className="w-full mt-1 p-3.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#006A4E] transition"/>
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 ml-1">ওয়ার্ড নং (১-৯) <span className="text-red-500">*</span></label>
                    <input type="number" required placeholder="ওয়ার্ড নং..." value={formData.wardNo} onChange={e => setFormData({...formData, wardNo: e.target.value})} className="w-full mt-1 p-3.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#006A4E] transition"/>
                </div>
              </div>
            </div>

            <button type="submit" disabled={submitting || isLimitReached} className="w-full py-4 bg-[#006A4E] text-white font-bold rounded-xl shadow-lg hover:bg-emerald-800 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {submitting ? <Loader2 className="animate-spin" size={20}/> : <><ShieldCheck size={20}/> অ্যাকাউন্ট তৈরি করুন</>}
            </button>

          </form>
        )}
      </div>
    </div>
  );
}