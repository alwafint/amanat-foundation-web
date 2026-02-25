'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// ১. আপনার তৈরি করা লোকাল ফাইল থেকে ডাটা ইমপোর্ট করুন
import { divisions, districts, upazilas, unions } from '../../lib/bd-locations'; 
import { 
  User, Phone, MapPin, Loader2, Camera, 
  Briefcase, Banknote, CheckCircle2, Hash, Tent, CreditCard 
} from "lucide-react";
import { supabase } from '../../lib/supabaseClient'; 

export default function RegisterTeamLeaderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // NID File States (Front and Back)
  const [nidFrontFile, setNidFrontFile] = useState(null);
  const [nidFrontPreview, setNidFrontPreview] = useState(null);
  const[nidBackFile, setNidBackFile] = useState(null);
  const[nidBackPreview, setNidBackPreview] = useState(null);

  // --- Geo Location State (IDs for Filtering) ---
  const[geoState, setGeoState] = useState({
    division_id: '',
    district_id: '',
    upazila_id: '',
    union_id: ''
  });

  // Form Data State
  const [formData, setFormData] = useState({
    full_name: '',
    profession: '',
    monthly_income: '',
    whatsapp: '',
    
    division: '',      
    district: '',      
    upazila: '',       
    union_name: '',    
    ward_no: '',
    village: '',
    full_address: '', // এটি এখন Optional
  });

  // --- Filtering Logic (ডাটা ফিল্টার করা) ---
  const divisionList = divisions; 
  const districtList = districts.filter(d => d.division_id === geoState.division_id);
  const upazilaList = upazilas.filter(u => u.district_id === geoState.district_id);
  const unionList = unions.filter(u => u.upazilla_id === geoState.upazila_id);

  // --- Handlers ---
  const handleDivisionChange = (e) => {
    const divId = e.target.value;
    const divObj = divisions.find(d => d.id === divId);
    
    setGeoState({ ...geoState, division_id: divId, district_id: '', upazila_id: '', union_id: '' });
    setFormData({
      ...formData,
      division: divObj ? divObj.bn_name : '', 
      district: '',
      upazila: '',
      union_name: ''
    });
  };

  const handleDistrictChange = (e) => {
    const distId = e.target.value;
    const distObj = districts.find(d => d.id === distId);

    setGeoState({ ...geoState, district_id: distId, upazila_id: '', union_id: '' });
    setFormData({
      ...formData,
      district: distObj ? distObj.bn_name : '',
      upazila: '',
      union_name: ''
    });
  };

  const handleUpazilaChange = (e) => {
    const upaId = e.target.value;
    const upaObj = upazilas.find(u => u.id === upaId);

    setGeoState({ ...geoState, upazila_id: upaId, union_id: '' });
    setFormData({
      ...formData,
      upazila: upaObj ? upaObj.bn_name : '',
      union_name: ''
    });
  };

  const handleUnionChange = (e) => {
    const uniId = e.target.value;
    const uniObj = unions.find(u => u.id === uniId);
    
    setGeoState({ ...geoState, union_id: uniId });
    setFormData({
      ...formData,
      union_name: uniObj ? uniObj.bn_name : ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "ward_no" && value.length > 2) return; 
    setFormData({ ...formData,[name]: value });
  };

  // NID Front File Handler
  const handleNidFrontChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNidFrontFile(file);
      setNidFrontPreview(URL.createObjectURL(file));
    }
  };

  // NID Back File Handler
  const handleNidBackChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNidBackFile(file);
      setNidBackPreview(URL.createObjectURL(file));
    }
  };

  // সাবমিট হ্যান্ডলার
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!nidFrontFile || !nidBackFile) {
        alert("দয়া করে এনআইডি কার্ডের উভয় পাশের (সামনের ও পিছনের) ছবি আপলোড করুন।");
        setLoading(false);
        return;
      }

      // ১. NID Front ছবি আপলোড
      const frontExt = nidFrontFile.name.split('.').pop();
      const frontFileName = `front_${Date.now()}_${Math.random()}.${frontExt}`;
      const frontFilePath = `team_leaders/nid/${frontFileName}`;
      
      const { error: frontUploadError } = await supabase.storage.from('survey-images').upload(frontFilePath, nidFrontFile);
      if (frontUploadError) throw frontUploadError;
      
      const { data: frontUrlData } = supabase.storage.from('survey-images').getPublicUrl(frontFilePath);
      const nidFrontUrl = frontUrlData.publicUrl;

      // ২. NID Back ছবি আপলোড
      const backExt = nidBackFile.name.split('.').pop();
      const backFileName = `back_${Date.now()}_${Math.random()}.${backExt}`;
      const backFilePath = `team_leaders/nid/${backFileName}`;
      
      const { error: backUploadError } = await supabase.storage.from('survey-images').upload(backFilePath, nidBackFile);
      if (backUploadError) throw backUploadError;
      
      const { data: backUrlData } = supabase.storage.from('survey-images').getPublicUrl(backFilePath);
      const nidBackUrl = backUrlData.publicUrl;

      // ৩. পূর্ণ ঠিকানা তৈরি
      const detailedPart = formData.full_address ? `, ${formData.full_address}` : '';
      const completeAddress = `গ্রাম: ${formData.village}, ওয়ার্ড: ${formData.ward_no}${detailedPart}`;

      // ৪. ৬-ডিজিটের র‍্যান্ডম পাসওয়ার্ড জেনারেট করা
      const generatedPassword = Math.floor(100000 + Math.random() * 900000).toString();
      
      // ৪. ডাটাবেজে ইনসার্ট (আলাদা টেবিল: team_leader_applications)
      const { error } = await supabase.from('team_leader_applications').insert([{
        full_name: formData.full_name,
        profession: formData.profession,
        monthly_income: formData.monthly_income,
        mobile: formData.whatsapp,
        whatsapp: formData.whatsapp,
        
        nid_front_url: nidFrontUrl,  // NID Front URL
        nid_back_url: nidBackUrl,    // NID Back URL
        
        division: formData.division,     
        district: formData.district,     
        upazila: formData.upazila,       
        union_name: formData.union_name, 
        ward_no: formData.ward_no,
        village: formData.village,
        address: completeAddress,
        
        password: generatedPassword, // এখানে নতুন পাসওয়ার্ডটি দেওয়া হলো
        role: 'team_leader',
        status: 'pending',
      }]);

      if (error) throw error;
      alert("আবেদন সফল হয়েছে! প্রতিনিধি যোগাযোগ করবেন।");
      router.push('/login');

    } catch (err) {
      console.error(err);
      alert("ত্রুটি: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Styles
  const inputContainerClass = "relative bg-slate-50 border border-slate-200 rounded-xl p-1 focus-within:ring-2 focus-within:ring-[#006A4E] transition-all";
  const inputClass = "w-full bg-transparent p-3 pl-10 outline-none text-slate-700 font-medium text-sm";
  const selectClass = "w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-[#006A4E] text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed";
  const labelClass = "text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block ml-1";
  const iconClass = "absolute left-3 top-3.5 text-slate-400";
  const RequiredMark = () => <span className="text-red-500 ml-1">*</span>;

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-4 font-sans py-10">
      <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-[#006A4E] p-8 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
           <h1 className="text-2xl font-black text-white mb-2">টিম লিডার রেজিস্ট্রেশন</h1>
           <p className="text-emerald-100 text-xs px-6 opacity-90 leading-relaxed">
             আমানত ফাউন্ডেশনের সাথে যুক্ত হতে সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন।
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
                <label className={labelClass}>আপনার পূর্ণ নাম <RequiredMark/></label>
                <div className={inputContainerClass}>
                  <User size={18} className={iconClass} />
                  <input type="text" name="full_name" required className={inputClass} placeholder="নাম লিখুন" onChange={handleChange} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>পেশা <RequiredMark/></label>
                  <div className={inputContainerClass}>
                    <Briefcase size={18} className={iconClass} />
                    <input type="text" name="profession" required className={inputClass} placeholder="পেশা" onChange={handleChange} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>মাসিক আয় <RequiredMark/></label>
                  <div className={inputContainerClass}>
                    <Banknote size={18} className={iconClass} />
                    <input type="number" name="monthly_income" required className={inputClass} placeholder="টাকা" onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass}>হোয়াটসঅ্যাপ নম্বর <RequiredMark/></label>
                <div className={inputContainerClass}>
                  <Phone size={18} className={iconClass} />
                  <input type="number" name="whatsapp" required className={inputClass} placeholder="017xxxxxxxx" onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* ২. NID কার্ড আপলোড */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-black text-[#006A4E] uppercase border-b border-emerald-50 pb-2 flex items-center gap-2">
                <CreditCard size={14}/> এনআইডি (NID) কার্ডের ছবি
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {/* NID Front */}
                <div className="space-y-2">
                  <label className={labelClass}>সামনের অংশ <RequiredMark/></label>
                  <label className={`w-full border-2 border-dashed ${nidFrontPreview ? 'border-[#006A4E] bg-emerald-50' : 'border-slate-300'} h-28 rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden transition relative hover:bg-slate-50`}>
                      {nidFrontPreview ? <img src={nidFrontPreview} className="w-full h-full object-contain p-2"/> : 
                        <><Camera size={24} className="text-slate-400 mb-1"/><span className="text-[10px] font-bold text-slate-500">Front Part</span></>}
                      <input type="file" accept="image/*" className="hidden" onChange={handleNidFrontChange} />
                  </label>
                </div>
                
                {/* NID Back */}
                <div className="space-y-2">
                  <label className={labelClass}>পিছনের অংশ <RequiredMark/></label>
                  <label className={`w-full border-2 border-dashed ${nidBackPreview ? 'border-[#006A4E] bg-emerald-50' : 'border-slate-300'} h-28 rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden transition relative hover:bg-slate-50`}>
                      {nidBackPreview ? <img src={nidBackPreview} className="w-full h-full object-contain p-2"/> : 
                        <><Camera size={24} className="text-slate-400 mb-1"/><span className="text-[10px] font-bold text-slate-500">Back Part</span></>}
                      <input type="file" accept="image/*" className="hidden" onChange={handleNidBackChange} />
                  </label>
                </div>
              </div>
            </div>

            {/* ৩. ঠিকানা */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-black text-[#006A4E] uppercase border-b border-emerald-50 pb-2 flex items-center gap-2">
                <MapPin size={14}/> ঠিকানা
              </h3>
              
              {/* বিভাগ ও জেলা */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>বিভাগ <RequiredMark/></label>
                  <select onChange={handleDivisionChange} required className={selectClass} value={geoState.division_id}>
                    <option value="">নির্বাচন করুন</option>
                    {divisionList.map((div) => (
                      <option key={div.id} value={div.id}>{div.bn_name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>জেলা <RequiredMark/></label>
                  <select onChange={handleDistrictChange} required className={selectClass} value={geoState.district_id} disabled={!geoState.division_id}>
                    <option value="">নির্বাচন করুন</option>
                    {districtList.map((dist) => (
                      <option key={dist.id} value={dist.id}>{dist.bn_name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* উপজেলা ও ইউনিয়ন */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className={labelClass}>উপজেলা <RequiredMark/></label>
                   <select onChange={handleUpazilaChange} required className={selectClass} value={geoState.upazila_id} disabled={!geoState.district_id}>
                    <option value="">নির্বাচন করুন</option>
                    {upazilaList.map((upa) => (
                      <option key={upa.id} value={upa.id}>{upa.bn_name}</option>
                    ))}
                  </select>
                </div>
                <div>
                   <label className={labelClass}>ইউনিয়ন <RequiredMark/></label>
                   <select onChange={handleUnionChange} required className={selectClass} value={geoState.union_id} disabled={!geoState.upazila_id}>
                    <option value="">নির্বাচন করুন</option>
                    {unionList.map((uni) => (
                      <option key={uni.id} value={uni.id}>{uni.bn_name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ওয়ার্ড ও গ্রাম */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className={labelClass}>ওয়ার্ড নং (১-৯৯) <RequiredMark/></label>
                   <div className={inputContainerClass}>
                    <Hash size={18} className={iconClass} />
                    <input 
                      type="number" 
                      name="ward_no" 
                      required 
                      className={inputClass} 
                      placeholder="নং" 
                      value={formData.ward_no} 
                      onChange={handleChange} 
                    />
                   </div>
                </div>
                <div>
                   <label className={labelClass}>গ্রামের নাম <RequiredMark/></label>
                   <div className={inputContainerClass}>
                    <Tent size={18} className={iconClass} />
                    <input 
                      type="text" 
                      name="village" 
                      required 
                      className={inputClass} 
                      placeholder="গ্রাম লিখুন" 
                      onChange={handleChange} 
                    />
                   </div>
                </div>
              </div>
            </div>

            {/* সাবমিট বাটন */}
            <button disabled={loading} className="w-full bg-[#006A4E] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-emerald-800 transition flex items-center justify-center gap-2 disabled:opacity-70 mt-4">
              {loading ? <Loader2 className="animate-spin" /> : <><CheckCircle2 size={20} /> আবেদন জমা দিন</>}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}