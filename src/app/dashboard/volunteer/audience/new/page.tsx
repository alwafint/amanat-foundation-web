'use client';

import React, { useState, useEffect } from 'react';
import { 
  UserPlus, Camera, Loader2, MapPin, Home, DollarSign, 
  Sprout, HeartPulse, Scale, AlertTriangle, FileText, Map 
} from "lucide-react";
import { supabase } from '../../../../../lib/supabaseClient';

// সাঘাটার গ্রাম তালিকা
const saghataVillages = [
  "চক দাতেয়া", "টেপা পদুমসহর", "কুকরাহাট", "ভাঙ্গামোড়", "গটীয়া", "চিথলিয়া", "সানকীভাঙ্গা", "উল্লা", "সাকোয়া", "মান্দুরা", 
  "ডিমলা পদুমসহর", "দুর্গাপুর", "দলদলিয়া", "ময়মন্তপুর", "বাটী", "বোনারপাড়া", "কালপাণী", "তেলিয়ান", "শ্যামপুর", "বেলতৈল", 
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

const upazilas = ["সাঘাটা"];

export default function NewAudiencePage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [gpsLoading, setGpsLoading] = useState(false);

  // ১. সকল ফিল্ডের প্রাথমিক স্টেট
  const initialFormState = {
    // Basic
    full_name: '', guardian_name: '', mobile: '', alt_mobile: '', nid_number: '', 
    dob: '', gender: '', marital_status: '', 
    present_address: '', permanent_address: '',
    
    // Family
    total_members: '', earning_members: '', dependent_members: '', 
    expat_status: '', social_status: '',
    
    // Financial
    monthly_income: '', income_source: '', has_bank_account: '', 
    current_loan: '', loan_amount: '', monthly_installment_capacity: '',
    savings_interest: '', membership_interest: '',

    // Assets
    has_land: '', house_type: '', business_info: '', vehicle_info: '',
    investment_need: '', installment_plan: '',

    // Agro
    agro_machinery_interest: '', seed_fertilizer_need: '', 
    agro_training_interest: '', grain_bank_interest: '',

    // Health & Edu
    telemedicine_interest: '', health_card_interest: '', 
    skill_training: '', education: '',

    // Legal & Digital
    legal_help: '', digital_service: '', bill_pay_interest: '',

    // Risk & Monitoring
    risk_tolerance: '', officer_comment: '',
    latitude: '', longitude: '',
    
    // Section 9: Area & Staff
    upazila: 'সাঘাটা', village: '', staff_name: '',

    // Files
    photo: null, house_photo: null
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(localUser);
    // লগিন করা ইউজারের নাম অটোমেটিক সেট হবে, তবে পরিবর্তনযোগ্য
    if (localUser?.full_name) {
        setFormData(prev => ({ ...prev, staff_name: localUser.full_name }));
    }
  }, []);

  const getGeoLocation = () => {
    setGpsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          });
          setGpsLoading(false);
          alert("লোকেশন সেট করা হয়েছে!");
        },
        (error) => {
          console.error(error);
          setGpsLoading(false);
          alert("লোকেশন পাওয়া যায়নি।");
        }
      );
    } else {
      alert("ব্রাউজারে জিওলোকেশন সাপোর্ট নেই।");
      setGpsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { photo, house_photo, ...dataToSubmit } = formData;
      
      // নাম্বার ফিল্ড কনভার্সন
      const insertData = { ...dataToSubmit };
      ['total_members','earning_members','dependent_members','monthly_income','loan_amount'].forEach(key => {
        // @ts-ignore
        insertData[key] = insertData[key] ? parseInt(insertData[key]) : 0;
      });

      const { error } = await supabase.from('audience_survey').insert([insertData]);
      if (error) throw error;

      alert("তথ্য সফলভাবে সংরক্ষিত হয়েছে!");
      // ফর্ম রিসেট করার সময় স্টাফ নেম আগেরটাই রাখা হবে
      setFormData({ ...initialFormState, staff_name: user?.full_name || '' });
    } catch (err: any) { 
      alert("ত্রুটি: " + err.message); 
    } finally { setLoading(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      // @ts-ignore
      setFormData({ ...formData, [field]: e.target.files[0] });
    }
  };

  const inputClass = "w-full p-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-sm text-slate-700 bg-white";
  const labelClass = "block text-xs font-bold text-slate-500 mb-1 ml-1";
  const sectionHeaderClass = "text-md font-bold text-emerald-800 border-b border-emerald-100 pb-2 mb-4 flex items-center gap-2 mt-6";

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 pb-10">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <UserPlus className="text-emerald-600"/> নতুন ডাটা এন্ট্রি ফরম
      </h2>
      
      <form onSubmit={handleSubmit} className="bg-slate-50 p-4 md:p-8 rounded-2xl shadow border border-slate-200 space-y-2 max-w-5xl mx-auto">
          
          {/* ১. মৌলিক তথ্য */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className={sectionHeaderClass}><UserPlus size={18}/> ১. মৌলিক ও শনাক্তকরণ তথ্য</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelClass}>পূর্ণ নাম (NID অনুযায়ী)</label><input name="full_name" required value={formData.full_name} onChange={handleChange} className={inputClass} placeholder="নাম লিখুন"/></div>
              <div><label className={labelClass}>পিতা/স্বামীর নাম</label><input name="guardian_name" value={formData.guardian_name} onChange={handleChange} className={inputClass} placeholder="অভিভাবকের নাম"/></div>
              <div><label className={labelClass}>মোবাইল নম্বর (প্রধান)</label><input type="number" name="mobile" required value={formData.mobile} onChange={handleChange} className={inputClass} placeholder="017xxxxxxxx"/></div>
              <div><label className={labelClass}>বিকল্প মোবাইল (যদি থাকে)</label><input type="number" name="alt_mobile" value={formData.alt_mobile} onChange={handleChange} className={inputClass} placeholder="বিকল্প নম্বর"/></div>
              <div><label className={labelClass}>NID নম্বর</label><input type="number" name="nid_number" value={formData.nid_number} onChange={handleChange} className={inputClass} placeholder="জাতীয় পরিচয়পত্র নম্বর"/></div>
              <div><label className={labelClass}>জন্ম তারিখ / বয়স</label><input type="text" name="dob" value={formData.dob} onChange={handleChange} className={inputClass} placeholder="বয়স বা জন্ম তারিখ"/></div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>লিঙ্গ</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass}>
                    <option value="">নির্বাচন</option>
                    <option value="পুরুষ">পুরুষ</option>
                    <option value="মহিলা">মহিলা</option>
                    <option value="অন্যান্য">অন্যান্য</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>বৈবাহিক অবস্থা</label>
                  <select name="marital_status" value={formData.marital_status} onChange={handleChange} className={inputClass}>
                    <option value="">নির্বাচন</option>
                    <option value="বিবাহিত">বিবাহিত</option>
                    <option value="অবিবাহিত">অবিবাহিত</option>
                    <option value="বিধবা/বিপত্নীক">বিধবা/বিপত্নীক</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
               <div><label className={labelClass}>বর্তমান ঠিকানা (গ্রাম/ইউনিয়ন/উপজেলা)</label><textarea name="present_address" rows={2} value={formData.present_address} onChange={handleChange} className={inputClass}/></div>
               <div><label className={labelClass}>স্থায়ী ঠিকানা</label><textarea name="permanent_address" rows={2} value={formData.permanent_address} onChange={handleChange} className={inputClass}/></div>
            </div>
          </div>

          {/* ২. পারিবারিক তথ্য */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className={sectionHeaderClass}><Home size={18}/> ২. পারিবারিক ও সামাজিক তথ্য</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div><label className={labelClass}>মোট সদস্য</label><input type="number" name="total_members" value={formData.total_members} onChange={handleChange} className={inputClass}/></div>
              <div><label className={labelClass}>কর্মক্ষম সদস্য</label><input type="number" name="earning_members" value={formData.earning_members} onChange={handleChange} className={inputClass}/></div>
              <div><label className={labelClass}>নির্ভরশীল সদস্য</label><input type="number" name="dependent_members" value={formData.dependent_members} onChange={handleChange} className={inputClass} placeholder="শিশু/বৃদ্ধ"/></div>
              <div>
                <label className={labelClass}>প্রবাসী সদস্য?</label>
                <select name="expat_status" value={formData.expat_status} onChange={handleChange} className={inputClass}>
                   <option value="না">না</option>
                   <option value="হ্যাঁ">হ্যাঁ</option>
                </select>
              </div>
            </div>
            <div className="mt-3">
                <label className={labelClass}>সামাজিক অবস্থা</label>
                <select name="social_status" value={formData.social_status} onChange={handleChange} className={inputClass}>
                   <option value="">নির্বাচন করুন</option>
                   <option value="দরিদ্র">দরিদ্র</option>
                   <option value="মধ্যবিত্ত">মধ্যবিত্ত</option>
                   <option value="স্বনির্ভর">স্বনির্ভর (ধনী)</option>
                </select>
            </div>
          </div>

          {/* ৩. আর্থিক তথ্য */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className={sectionHeaderClass}><DollarSign size={18}/> ৩. আর্থিক ও সঞ্চয় তথ্য</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><label className={labelClass}>পেশা / আয়ের উৎস</label><input name="income_source" value={formData.income_source} onChange={handleChange} className={inputClass} placeholder="চাকরি/কৃষি/ব্যবসা"/></div>
              <div><label className={labelClass}>মাসিক আনুমানিক আয়</label><input type="number" name="monthly_income" value={formData.monthly_income} onChange={handleChange} className={inputClass} placeholder="টাকায়"/></div>
              <div>
                <label className={labelClass}>ব্যাংক একাউন্ট আছে?</label>
                <select name="has_bank_account" value={formData.has_bank_account} onChange={handleChange} className={inputClass}>
                   <option value="না">না</option>
                   <option value="হ্যাঁ">হ্যাঁ (ব্যাংক)</option>
                   <option value="মোবাইল ব্যাংকিং">হ্যাঁ (বিকাশ/নগদ)</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
               <div><label className={labelClass}>বর্তমান ঋণ (কোথা থেকে)</label><input name="current_loan" value={formData.current_loan} onChange={handleChange} className={inputClass} placeholder="এনজিও/ব্যাংক/মহাজন"/></div>
               <div><label className={labelClass}>ঋণের পরিমাণ (টাকা)</label><input type="number" name="loan_amount" value={formData.loan_amount} onChange={handleChange} className={inputClass} placeholder="0.00"/></div>
               <div><label className={labelClass}>মাসিক কিস্তি ক্ষমতা</label><input type="text" name="monthly_installment_capacity" value={formData.monthly_installment_capacity} onChange={handleChange} className={inputClass} placeholder="কত টাকা ও মেয়াদ"/></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
               <div><label className={labelClass}>সঞ্চয় আগ্রহ</label><input name="savings_interest" value={formData.savings_interest} onChange={handleChange} className={inputClass} placeholder="হালাল বিনিয়োগে ইচ্ছা?"/></div>
               <div><label className={labelClass}>মেম্বারশিপ আগ্রহ</label><select name="membership_interest" value={formData.membership_interest} onChange={handleChange} className={inputClass}><option value="না">না</option><option value="হ্যাঁ">হ্যাঁ</option></select></div>
            </div>
          </div>

          {/* ৪. সম্পদ ও বিনিয়োগ */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className={sectionHeaderClass}><MapPin size={18}/> ৪. সম্পদ ও বিনিয়োগের তথ্য</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div><label className={labelClass}>জমি আছে?</label><input name="has_land" value={formData.has_land} onChange={handleChange} className={inputClass} placeholder="কৃষি/আবাসিক পরিমাণ"/></div>
               <div>
                 <label className={labelClass}>বাড়ির ধরণ</label>
                 <select name="house_type" value={formData.house_type} onChange={handleChange} className={inputClass}>
                   <option value="">নির্বাচন</option>
                   <option value="কাঁচা">কাঁচা</option>
                   <option value="আধা-পাকা">আধা-পাকা (টিনসেড)</option>
                   <option value="পাকা">পাকা</option>
                 </select>
               </div>
               <div><label className={labelClass}>ব্যবসা বা দোকান</label><input name="business_info" value={formData.business_info} onChange={handleChange} className={inputClass} placeholder="ধরণ ও আয়"/></div>
               <div><label className={labelClass}>যানবাহন</label><input name="vehicle_info" value={formData.vehicle_info} onChange={handleChange} className={inputClass} placeholder="বাইক/ভ্যান/অটো"/></div>
            </div>
            <div className="mt-4">
               <label className={labelClass}>বিনিয়োগ প্রয়োজন (কিস্তিতে পণ্য ক্রয়)</label>
               <textarea name="investment_need" rows={2} value={formData.investment_need} onChange={handleChange} className={inputClass} placeholder="অটো ভ্যান, কৃষি যন্ত্র, গবাদি পশু, সেলাই মেশিন ইত্যাদি"/>
            </div>
          </div>

          {/* ৫. কৃষি ও সেবা */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className={sectionHeaderClass}><Sprout size={18}/> ৫. কৃষি ও সেবা তথ্য</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelClass}>আধুনিক কৃষি যন্ত্রপাতি আগ্রহ</label><input name="agro_machinery_interest" value={formData.agro_machinery_interest} onChange={handleChange} className={inputClass}/></div>
              <div><label className={labelClass}>বীজ ও সার প্রয়োজন</label><input name="seed_fertilizer_need" value={formData.seed_fertilizer_need} onChange={handleChange} className={inputClass}/></div>
              <div><label className={labelClass}>কৃষি প্রশিক্ষণ আগ্রহ</label><select name="agro_training_interest" value={formData.agro_training_interest} onChange={handleChange} className={inputClass}><option value="না">না</option><option value="হ্যাঁ">হ্যাঁ</option></select></div>
              <div><label className={labelClass}>শস্য ব্যাংক ও লোন</label><select name="grain_bank_interest" value={formData.grain_bank_interest} onChange={handleChange} className={inputClass}><option value="না">না</option><option value="হ্যাঁ">হ্যাঁ</option></select></div>
            </div>
          </div>

          {/* ৬. স্বাস্থ্য ও শিক্ষা */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className={sectionHeaderClass}><HeartPulse size={18}/> ৬. স্বাস্থ্য ও শিক্ষা তথ্য</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelClass}>টেলিমেডিসিন সেবা আগ্রহ</label><select name="telemedicine_interest" value={formData.telemedicine_interest} onChange={handleChange} className={inputClass}><option value="না">না</option><option value="হ্যাঁ">হ্যাঁ</option></select></div>
              <div><label className={labelClass}>স্বাস্থ্য কার্ড আগ্রহ</label><select name="health_card_interest" value={formData.health_card_interest} onChange={handleChange} className={inputClass}><option value="না">না</option><option value="হ্যাঁ">হ্যাঁ</option></select></div>
              <div><label className={labelClass}>কারিগরি প্রশিক্ষণ আগ্রহ</label><input name="skill_training" value={formData.skill_training} onChange={handleChange} className={inputClass} placeholder="কম্পিউটার/সেলাই/ড্রাইভিং"/></div>
              <div><label className={labelClass}>শিক্ষাগত যোগ্যতা</label><select name="education" value={formData.education} onChange={handleChange} className={inputClass}><option value="স্বাক্ষরজ্ঞান">স্বাক্ষরজ্ঞান</option><option value="প্রাথমিক">প্রাথমিক</option><option value="মাধ্যমিক">মাধ্যমিক</option><option value="উচ্চমাধ্যমিক">উচ্চমাধ্যমিক</option><option value="ডিগ্রি/অনার্স">ডিগ্রি/অনার্স</option></select></div>
            </div>
          </div>

          {/* ৭. আইনি ও ডিজিটাল */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className={sectionHeaderClass}><Scale size={18}/> ৭. আইনি ও ডিজিটাল সেবা</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><label className={labelClass}>আইনি সহায়তা প্রয়োজন?</label><select name="legal_help" value={formData.legal_help} onChange={handleChange} className={inputClass}><option value="না">না</option><option value="হ্যাঁ">হ্যাঁ (জমি/পারিবারিক)</option></select></div>
              <div><label className={labelClass}>ডিজিটাল সেবা আগ্রহ</label><input name="digital_service" value={formData.digital_service} onChange={handleChange} className={inputClass} placeholder="পাসপোর্ট/নিবন্ধন/আবেদন"/></div>
              <div><label className={labelClass}>বিল পেমেন্ট সুবিধা</label><input name="bill_pay_interest" value={formData.bill_pay_interest} onChange={handleChange} className={inputClass} placeholder="বিদ্যুৎ/গ্যাস"/></div>
            </div>
          </div>

          {/* ৮. ঝুঁকি ও নিরীক্ষণ */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-orange-400">
            <h3 className={sectionHeaderClass}><AlertTriangle size={18}/> ৮. ঝুঁকি ও নিরীক্ষণ তথ্য</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                 <label className={labelClass}>ঝুঁকি গ্রহণযোগ্যতা</label>
                 <select name="risk_tolerance" value={formData.risk_tolerance} onChange={handleChange} className={inputClass}>
                   <option value="মধ্যম">মধ্যম</option>
                   <option value="নিম্ন">নিম্ন (ঝুঁকি নিতে চায় না)</option>
                   <option value="উচ্চ">উচ্চ</option>
                 </select>
              </div>
              <div><label className={labelClass}>ফিল্ড অফিসারের মন্তব্য</label><input name="officer_comment" value={formData.officer_comment} onChange={handleChange} className={inputClass} placeholder="পর্যবেক্ষণ..."/></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-end">
               <button type="button" onClick={getGeoLocation} className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-emerald-300 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition h-24">
                 {gpsLoading ? <Loader2 className="animate-spin text-emerald-600"/> : <MapPin className="text-emerald-600 mb-1"/>}
                 <span className="text-[10px] font-bold text-emerald-700">{formData.latitude ? "লোকেশন সেট হয়েছে" : "GPS লোকেশন নিন"}</span>
               </button>

               <label className="border-2 border-dashed border-slate-300 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 h-24">
                  <Camera size={24} className="text-slate-400 mb-1"/>
                  <span className="text-[10px] font-bold text-slate-500">বাড়ির ছবি</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e)=>handleFileChange(e,'house_photo')}/>
                </label>
                
                <label className="border-2 border-dashed border-slate-300 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 h-24">
                  <FileText size={24} className="text-slate-400 mb-1"/>
                  <span className="text-[10px] font-bold text-slate-500">ব্যক্তির ছবি</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e)=>handleFileChange(e,'photo')}/>
                </label>
            </div>
            {formData.latitude && <p className="text-[10px] text-slate-400 mt-2 text-center font-mono">Lat: {formData.latitude}, Lon: {formData.longitude}</p>}
          </div>

          {/* ৯. এরিয়া ও স্টাফ তথ্য (নতুন সেকশন) */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-purple-500">
            <h3 className={sectionHeaderClass}><Map size={18}/> ৯. এরিয়া ও স্টাফ তথ্য</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div>
                  <label className={labelClass}>উপজেলা</label>
                  <select name="upazila" required value={formData.upazila} onChange={handleChange} className={inputClass}>
                     <option value="">নির্বাচন করুন</option>
                     {upazilas.map((u, i) => <option key={i} value={u}>{u}</option>)}
                  </select>
               </div>
               <div>
                  <label className={labelClass}>গ্রাম</label>
                  <select name="village" required value={formData.village} onChange={handleChange} className={inputClass}>
                     <option value="">গ্রাম নির্বাচন করুন</option>
                     {saghataVillages.map((v, i) => <option key={i} value={v}>{v}</option>)}
                  </select>
               </div>
               <div>
                  <label className={labelClass}>স্টাফের নাম</label>
                  <input 
                    type="text" 
                    name="staff_name" 
                    value={formData.staff_name} 
                    onChange={handleChange} 
                    className={inputClass} 
                    placeholder="স্টাফের নাম"
                  />
               </div>
            </div>
          </div>

          <button disabled={loading} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 shadow-xl hover:shadow-2xl transition flex justify-center items-center gap-2 mt-8">
            {loading ? <Loader2 className="animate-spin" /> : "সম্পূর্ণ ডাটা সেভ করুন"}
          </button>
      </form>
    </div>
  );
}