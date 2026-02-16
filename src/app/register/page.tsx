'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { 
  User, Phone, MapPin, ArrowRight, ShieldCheck, 
  Loader2, CheckCircle 
} from "lucide-react";
import { supabase } from '../../lib/supabaseClient';

// গ্রামের তালিকা
const saghataVillages = [
  "চক দাতেয়া", "টেপা পদুমসহর", "কুকরাহাট", "ভাঙ্গামোড়", "গটীয়া", "চিথলিয়া", "সানকীভাঙ্গা", "উল্লা", "সাকোয়া", "মান্দুরা", 
  "ডিমলা পদুমসহর", "দুর্গাপুর", "দলদলিয়া", "ময়মন্তপুর", "বাটী", "বোনারপাড়া", "কালপাণী", "তেলিয়ান", "শ্যামপুর", "বেলতৈল", 
  "কুখাতাইড়", "চকচকিয়া", "ভরতখালী", "বাঁশহাটা", "পুটিমারী", "ধনারুহা", "খামার ধনারুহা", "মাজবাড়ী", "ধানঘরা", "পূর্ব অনন্তপুর", 
  "যাদুরতাইড়", "মথরপাড়া", "উল্যা সোনাতলা", "হেলেঞ্চা", "বুরুঙ্গি", "গছাবাড়ী", "অনন্তপুর", "রামনগর", "কচুয়া", "পাঠানপাড়া", 
  "চন্দনপাট", "ওচমানেরপাড়া", "বালুয়া", "বড়াইকান্দী", "ঝৈলতলা", "পাচিয়ারপুর", "বাউলিয়া", "পচাবস্তা", "ঘুরিদহ", "ঝাড়াবর্ষা", 
  "যোগীপাড়া", "কচুয়াহাট", "সাথালিয়া", "সেঙ্গুয়া", "হাটবাড়ী", "হাসিলকান্দি", "সাঘাটা", "পবণতাইড়", "কমলপুর", "ভগবানপুর", 
  "গোরেরপাড়া", "হাপানিয়া", "আগ গড়গড়িয়া", "পাছ গড়গড়িয়া", "নসিরারপাড়া", "সতীতলা", "কিঙ্করপুর", "বাঙ্গাবাড়ী", "চাকুলী", 
  "জালাল তাইর", "গজারিয়া", "ফলিয়াদিগর", "কামালেরপাড়া", "বারকোনা", "সাহাবাজের পাড়া", "সুজালপুর", "ছিলমানেরপাড়া", 
  "বাদিনারপাড়া", "থৈকরেরপাড়া", "বেঙ্গারপাড়া", "চিনিরপটল", "কালুরপাড়া", "কুমারপাড়া", "হলদিয়া", "গুয়াবাড়ী", "কানাইপাড়া", 
  "বেড়া", "গোবিন্দপুর", "আমদিরপাড়া", "আবদুল্লারপাড়া", "শিমুলবাড়ী", "কৈচড়া", "মেছট", "বাজিতনগর", "শিমুলবাড়িয়া", 
  "বলিয়ারবেড়", "কামারপাড়া", "বগারভিটা", "দৈচড়া", "জাঙ্গালিয়া", "জুমারবাড়ী", "চান্দপাড়া", "মামুদপুর", "বসন্তেরপাড়া", 
  "কুন্দপাড়া", "কাঠুর", "নলছিয়া", "চেঙ্গালিয়া"
].sort();

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    mobile: '',
    district: 'গাইবান্ধা',
    upazila: 'সাঘাটা',
    village: ''
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('members').insert([{
        ...formData,
        password: '123', // ডিফল্ট পাসওয়ার্ড
        role: 'member',
        status: 'pending', // শুরুতে পেন্ডিং থাকবে, স্টাফ এপ্রুভ করবে
        address: `${formData.village}, ${formData.upazila}, ${formData.district}`
      }]);

      if (error) throw error;

      alert("রেজিস্ট্রেশন সফল হয়েছে! আপনার একাউন্ট যাচাইয়ের জন্য অপেক্ষা করুন।");
      router.push('/login');

    } catch (err: any) {
      alert("সমস্যা হয়েছে: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-6 font-sans">
      
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        
        {/* Left Branding */}
        <div className="hidden md:flex w-2/5 bg-emerald-900 p-10 flex-col justify-between relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">আমানত ফাউন্ডেশন</h1>
            <p className="text-emerald-200 text-sm">আপনার বিশ্বস্ত সহযোগী</p>
          </div>
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3">
               <CheckCircle className="text-yellow-400" size={20}/>
               <span className="text-sm">সহজ রেজিস্ট্রেশন</span>
            </div>
            <div className="flex items-center gap-3">
               <CheckCircle className="text-yellow-400" size={20}/>
               <span className="text-sm">দ্রুত সেবা</span>
            </div>
            <div className="flex items-center gap-3">
               <CheckCircle className="text-yellow-400" size={20}/>
               <span className="text-sm">নিরাপদ তথ্য</span>
            </div>
          </div>
          <p className="text-xs text-emerald-400 mt-8">&copy; ২০২৬ আমানত ফাউন্ডেশন</p>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-3/5 p-6 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">নতুন সদস্য হোন</h2>
            <p className="text-slate-500 text-sm mt-1">মাত্র ১ মিনিটে রেজিস্ট্রেশন সম্পন্ন করুন</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            
            {/* নাম */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">আপনার নাম</label>
              <div className="relative group">
                <User className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-emerald-600 transition" size={18} />
                <input 
                  type="text" required 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 transition" 
                  placeholder="পুরো নাম লিখুন"
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                />
              </div>
            </div>

            {/* মোবাইল */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">মোবাইল নম্বর</label>
              <div className="relative group">
                <Phone className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-emerald-600 transition" size={18} />
                <input 
                  type="number" required 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 transition" 
                  placeholder="017xxxxxxxx"
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                />
              </div>
            </div>

            {/* ঠিকানা (ফিক্সড + ড্রপডাউন) */}
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 space-y-4">
               <div className="flex items-center gap-2 mb-2 border-b border-emerald-200 pb-2">
                 <MapPin size={18} className="text-emerald-600"/>
                 <span className="text-sm font-bold text-emerald-800">ঠিকানা</span>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">জেলা</label>
                    <input type="text" value="গাইবান্ধা" disabled className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">উপজেলা</label>
                    <input type="text" value="সাঘাটা" disabled className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed" />
                  </div>
               </div>

               <div>
                 <label className="block text-xs font-bold text-slate-700 mb-1">গ্রাম নির্বাচন করুন <span className="text-red-500">*</span></label>
                 <select 
                   required 
                   className="w-full p-3 bg-white border border-slate-200 rounded-lg outline-none focus:border-emerald-500 text-slate-700"
                   onChange={(e) => setFormData({...formData, village: e.target.value})}
                 >
                   <option value="">তালিকায় ক্লিক করুন...</option>
                   {saghataVillages.map((v, i) => (
                     <option key={i} value={v}>{v}</option>
                   ))}
                 </select>
               </div>
            </div>

            {/* Submit Button */}
            <button 
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {loading ? <Loader2 className="animate-spin"/> : "রেজিস্ট্রেশন করুন"} 
              {!loading && <ArrowRight size={20} />}
            </button>

            <p className="text-center text-sm text-slate-500 mt-4">
              আগেই অ্যাকাউন্ট আছে? <Link href="/login" className="text-emerald-600 font-bold hover:underline">লগইন করুন</Link>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}