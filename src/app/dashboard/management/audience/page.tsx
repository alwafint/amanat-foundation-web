'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, List, Smartphone, MapPin, Eye, X, 
  UserPlus, Home, DollarSign, Scale, Edit, Save, Map, 
  Sprout, HeartPulse, AlertTriangle 
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

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

export default function AudienceListPage() {
  const [dataList, setDataList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering States
  const [selectedUpazila, setSelectedUpazila] = useState('সাঘাটা');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal States
  const [selectedItem, setSelectedItem] = useState<any>(null); // For Viewing
  const [editingItem, setEditingItem] = useState<any>(null);   // For Editing

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('audience_survey')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setDataList(data);
    setLoading(false);
  };

  // ডাটা আপডেট ফাংশন (সকল ফিল্ড সহ)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      // সিস্টেম ফিল্ড বাদ দিয়ে বাকি ডাটা আপডেট করা
      const { id, created_at, ...updateData } = editingItem;

      // নাম্বার ফিল্ড কনভার্সন
      ['total_members','earning_members','dependent_members','monthly_income','loan_amount'].forEach(key => {
        // @ts-ignore
        updateData[key] = updateData[key] ? parseInt(updateData[key]) : 0;
      });

      const { error } = await supabase
        .from('audience_survey')
        .update(updateData)
        .eq('id', editingItem.id);

      if (error) throw error;

      alert("ডাটা সফলভাবে আপডেট হয়েছে!");
      setEditingItem(null);
      fetchSurveys(); 
    } catch (err: any) {
      alert("আপডেট ব্যর্থ হয়েছে: " + err.message);
    }
  };

  const filteredData = dataList.filter(item => {
    const matchesUpazila = selectedUpazila ? item.upazila === selectedUpazila : true;
    const matchesVillage = selectedVillage ? item.village === selectedVillage : true;
    const matchesSearch = item.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.mobile?.includes(searchTerm);
    return matchesUpazila && matchesVillage && matchesSearch;
  });

  const DetailRow = ({ label, value }: { label: string, value: any }) => (
    <div className="border-b border-slate-100 py-2">
      <span className="block text-xs text-slate-400 font-bold">{label}</span>
      <span className="block text-sm text-slate-800 font-medium">{value || "N/A"}</span>
    </div>
  );

  // ইনপুট স্টাইল
  const inputClass = "w-full p-2 rounded border border-slate-300 focus:border-emerald-500 outline-none text-sm";
  const labelClass = "text-xs font-bold text-slate-500 mb-1 block";

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 max-w-6xl mx-auto pb-20">
      
      {/* হেডার ও ফিল্টার */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6 sticky top-0 z-20">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <List className="text-emerald-600"/> ওডিইয়েন্স ডাটা লিস্ট
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-500 ml-1">উপজেলা</label>
            <select value={selectedUpazila} onChange={(e) => setSelectedUpazila(e.target.value)} className={inputClass}>
              <option value="">সকল উপজেলা</option>
              {upazilas.map((u, i) => <option key={i} value={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 ml-1">গ্রাম</label>
            <select value={selectedVillage} onChange={(e) => setSelectedVillage(e.target.value)} className={inputClass}>
              <option value="">সকল গ্রাম</option>
              {saghataVillages.map((v, i) => <option key={i} value={v}>{v}</option>)}
            </select>
          </div>
          <div className="relative">
            <label className="text-xs font-bold text-slate-500 ml-1">খুঁজুন</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 text-slate-400" size={16}/>
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded text-sm outline-none focus:border-emerald-500" placeholder="নাম বা মোবাইল..." />
            </div>
          </div>
        </div>
      </div>
      
      {/* ডাটা লিস্ট */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-10 text-slate-500">লোডিং হচ্ছে...</div>
        ) : filteredData.length > 0 ? (
          filteredData.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm shrink-0">
                  {item.full_name?.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">{item.full_name}</h4>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-500 mt-1">
                     <span className="flex items-center gap-1"><Smartphone size={12}/> {item.mobile}</span>
                     <span className="flex items-center gap-1 border-l pl-3 text-emerald-600 font-bold"><MapPin size={12}/> {item.village}, {item.upazila}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0 border-t md:border-t-0 pt-3 md:pt-0">
                 <button onClick={() => setSelectedItem(item)} className="flex-1 md:flex-none bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2 rounded-lg hover:bg-slate-200 transition flex items-center justify-center gap-1">
                    <Eye size={14}/> বিস্তারিত
                 </button>
                 <button onClick={() => setEditingItem(item)} className="flex-1 md:flex-none bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-emerald-700 transition flex items-center justify-center gap-1">
                    <Edit size={14}/> এডিট
                 </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-10 rounded-xl border border-dashed text-center">
            <p className="text-slate-400 font-bold">কোনো ডাটা পাওয়া যায়নি</p>
          </div>
        )}
      </div>

      {/* -------------- VIEW DETAILS MODAL -------------- */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="sticky top-0 bg-white z-10 p-5 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">বিস্তারিত তথ্য</h2>
                <p className="text-xs text-slate-500">এন্ট্রি: {selectedItem.staff_name} | তারিখ: {new Date(selectedItem.created_at).toLocaleDateString()}</p>
              </div>
              <button onClick={() => setSelectedItem(null)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200"><X size={20}/></button>
            </div>
            
            <div className="p-6 space-y-6">
               {/* 1. Basic Info */}
               <div>
                  <h4 className="font-bold text-emerald-700 mb-2 border-b pb-1 flex gap-2"><UserPlus size={16}/> পরিচয় ও ঠিকানা</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
                     <DetailRow label="নাম" value={selectedItem.full_name}/>
                     <DetailRow label="অভিভাবক" value={selectedItem.guardian_name}/>
                     <DetailRow label="মোবাইল" value={selectedItem.mobile}/>
                     <DetailRow label="বিকল্প মোবাইল" value={selectedItem.alt_mobile}/>
                     <DetailRow label="লিঙ্গ" value={selectedItem.gender}/>
                     <DetailRow label="বৈবাহিক অবস্থা" value={selectedItem.marital_status}/>
                     <DetailRow label="বয়স/জন্ম তারিখ" value={selectedItem.dob}/>
                     <DetailRow label="NID" value={selectedItem.nid_number}/>
                     <DetailRow label="গ্রাম" value={selectedItem.village}/>
                     <DetailRow label="উপজেলা" value={selectedItem.upazila}/>
                  </div>
                  <div className="mt-2">
                     <DetailRow label="বর্তমান ঠিকানা" value={selectedItem.present_address}/>
                     <DetailRow label="স্থায়ী ঠিকানা" value={selectedItem.permanent_address}/>
                  </div>
               </div>

               {/* 2. Family Info */}
               <div>
                  <h4 className="font-bold text-emerald-700 mb-2 border-b pb-1 flex gap-2"><Home size={16}/> পারিবারিক তথ্য</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2">
                     <DetailRow label="মোট সদস্য" value={selectedItem.total_members}/>
                     <DetailRow label="উপার্জনকারী" value={selectedItem.earning_members}/>
                     <DetailRow label="নির্ভরশীল" value={selectedItem.dependent_members}/>
                     <DetailRow label="প্রবাসী সদস্য" value={selectedItem.expat_status}/>
                     <DetailRow label="সামাজিক অবস্থা" value={selectedItem.social_status}/>
                  </div>
               </div>

               {/* 3. Financial Info */}
               <div>
                  <h4 className="font-bold text-emerald-700 mb-2 border-b pb-1 flex gap-2"><DollarSign size={16}/> আর্থিক তথ্য</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
                     <DetailRow label="আয়ের উৎস" value={selectedItem.income_source}/>
                     <DetailRow label="মাসিক আয়" value={selectedItem.monthly_income}/>
                     <DetailRow label="ব্যাংক একাউন্ট" value={selectedItem.has_bank_account}/>
                     <DetailRow label="ঋণ আছে?" value={selectedItem.current_loan}/>
                     <DetailRow label="ঋণের পরিমাণ" value={selectedItem.loan_amount}/>
                     <DetailRow label="কিস্তি ক্ষমতা" value={selectedItem.monthly_installment_capacity}/>
                     <DetailRow label="সঞ্চয় আগ্রহ" value={selectedItem.savings_interest}/>
                     <DetailRow label="মেম্বারশিপ আগ্রহ" value={selectedItem.membership_interest}/>
                  </div>
               </div>

               {/* 4. Assets */}
               <div>
                  <h4 className="font-bold text-emerald-700 mb-2 border-b pb-1 flex gap-2"><MapPin size={16}/> সম্পদ ও বিনিয়োগ</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
                     <DetailRow label="জমি আছে?" value={selectedItem.has_land}/>
                     <DetailRow label="বাড়ির ধরণ" value={selectedItem.house_type}/>
                     <DetailRow label="ব্যবসা" value={selectedItem.business_info}/>
                     <DetailRow label="যানবাহন" value={selectedItem.vehicle_info}/>
                     <DetailRow label="বিনিয়োগ প্রয়োজন" value={selectedItem.investment_need}/>
                  </div>
               </div>

               {/* 5. Agro & Health */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <h4 className="font-bold text-emerald-700 mb-2 border-b pb-1 flex gap-2"><Sprout size={16}/> কৃষি</h4>
                     <DetailRow label="কৃষি যন্ত্রপাতি আগ্রহ" value={selectedItem.agro_machinery_interest}/>
                     <DetailRow label="বীজ/সার প্রয়োজন" value={selectedItem.seed_fertilizer_need}/>
                     <DetailRow label="কৃষি প্রশিক্ষণ" value={selectedItem.agro_training_interest}/>
                     <DetailRow label="শস্য ব্যাংক" value={selectedItem.grain_bank_interest}/>
                  </div>
                  <div>
                     <h4 className="font-bold text-emerald-700 mb-2 border-b pb-1 flex gap-2"><HeartPulse size={16}/> স্বাস্থ্য ও শিক্ষা</h4>
                     <DetailRow label="টেলিমেডিসিন" value={selectedItem.telemedicine_interest}/>
                     <DetailRow label="স্বাস্থ্য কার্ড" value={selectedItem.health_card_interest}/>
                     <DetailRow label="কারিগরি প্রশিক্ষণ" value={selectedItem.skill_training}/>
                     <DetailRow label="শিক্ষা" value={selectedItem.education}/>
                  </div>
               </div>

               {/* 6. Legal & Risk */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-emerald-700 mb-2 border-b pb-1 flex gap-2"><Scale size={16}/> আইনি ও ডিজিটাল</h4>
                    <DetailRow label="আইনি সহায়তা" value={selectedItem.legal_help}/>
                    <DetailRow label="ডিজিটাল সেবা" value={selectedItem.digital_service}/>
                    <DetailRow label="বিল পেমেন্ট" value={selectedItem.bill_pay_interest}/>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-700 mb-2 border-b pb-1 flex gap-2"><AlertTriangle size={16}/> ঝুঁকি ও মন্তব্য</h4>
                    <DetailRow label="ঝুঁকি গ্রহণ" value={selectedItem.risk_tolerance}/>
                    <DetailRow label="অফিসারের মন্তব্য" value={selectedItem.officer_comment}/>
                    <DetailRow label="GPS" value={selectedItem.latitude ? `${selectedItem.latitude}, ${selectedItem.longitude}` : 'N/A'}/>
                  </div>
               </div>
            </div>
            <div className="sticky bottom-0 bg-white p-4 border-t border-slate-100 flex justify-end">
               <button onClick={() => setSelectedItem(null)} className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold">বন্ধ করুন</button>
            </div>
          </div>
        </div>
      )}

      {/* -------------- EDIT MODAL (ALL FIELDS) -------------- */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            <form onSubmit={handleUpdate}>
              <div className="sticky top-0 bg-white z-10 p-5 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                   <Edit size={20} className="text-emerald-600"/> তথ্য আপডেট করুন
                </h2>
                <button type="button" onClick={() => setEditingItem(null)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200"><X size={20}/></button>
              </div>

              <div className="p-6 space-y-8">
                {/* 1. Basic Info Edit */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                   <h3 className="font-bold text-emerald-800 mb-3 border-b pb-1">১. মৌলিক তথ্য</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div><label className={labelClass}>নাম</label><input type="text" value={editingItem.full_name || ''} onChange={(e) => setEditingItem({...editingItem, full_name: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>অভিভাবক</label><input type="text" value={editingItem.guardian_name || ''} onChange={(e) => setEditingItem({...editingItem, guardian_name: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>মোবাইল</label><input type="text" value={editingItem.mobile || ''} onChange={(e) => setEditingItem({...editingItem, mobile: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>বিকল্প মোবাইল</label><input type="text" value={editingItem.alt_mobile || ''} onChange={(e) => setEditingItem({...editingItem, alt_mobile: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>NID</label><input type="text" value={editingItem.nid_number || ''} onChange={(e) => setEditingItem({...editingItem, nid_number: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>বয়স/জন্ম তারিখ</label><input type="text" value={editingItem.dob || ''} onChange={(e) => setEditingItem({...editingItem, dob: e.target.value})} className={inputClass}/></div>
                      <div>
                        <label className={labelClass}>লিঙ্গ</label>
                        <select value={editingItem.gender || ''} onChange={(e) => setEditingItem({...editingItem, gender: e.target.value})} className={inputClass}>
                           <option value="">নির্বাচন</option><option value="পুরুষ">পুরুষ</option><option value="মহিলা">মহিলা</option><option value="অন্যান্য">অন্যান্য</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>বৈবাহিক অবস্থা</label>
                        <select value={editingItem.marital_status || ''} onChange={(e) => setEditingItem({...editingItem, marital_status: e.target.value})} className={inputClass}>
                           <option value="">নির্বাচন</option><option value="বিবাহিত">বিবাহিত</option><option value="অবিবাহিত">অবিবাহিত</option><option value="বিধবা/বিপত্নীক">বিধবা/বিপত্নীক</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>গ্রাম</label>
                        <select value={editingItem.village || ''} onChange={(e) => setEditingItem({...editingItem, village: e.target.value})} className={inputClass}>
                           <option value="">নির্বাচন</option>{saghataVillages.map((v, i) => <option key={i} value={v}>{v}</option>)}
                        </select>
                      </div>
                   </div>
                   <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className={labelClass}>বর্তমান ঠিকানা</label><input type="text" value={editingItem.present_address || ''} onChange={(e) => setEditingItem({...editingItem, present_address: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>স্থায়ী ঠিকানা</label><input type="text" value={editingItem.permanent_address || ''} onChange={(e) => setEditingItem({...editingItem, permanent_address: e.target.value})} className={inputClass}/></div>
                   </div>
                </div>

                {/* 2. Family Edit */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                   <h3 className="font-bold text-emerald-800 mb-3 border-b pb-1">২. পারিবারিক তথ্য</h3>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div><label className={labelClass}>মোট সদস্য</label><input type="number" value={editingItem.total_members || ''} onChange={(e) => setEditingItem({...editingItem, total_members: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>উপার্জনকারী</label><input type="number" value={editingItem.earning_members || ''} onChange={(e) => setEditingItem({...editingItem, earning_members: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>নির্ভরশীল</label><input type="number" value={editingItem.dependent_members || ''} onChange={(e) => setEditingItem({...editingItem, dependent_members: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>সামাজিক অবস্থা</label><select value={editingItem.social_status || ''} onChange={(e) => setEditingItem({...editingItem, social_status: e.target.value})} className={inputClass}><option value="">নির্বাচন</option><option value="দরিদ্র">দরিদ্র</option><option value="মধ্যবিত্ত">মধ্যবিত্ত</option><option value="স্বনির্ভর">স্বনির্ভর</option></select></div>
                   </div>
                </div>

                {/* 3. Financial Edit */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                   <h3 className="font-bold text-emerald-800 mb-3 border-b pb-1">৩. আর্থিক তথ্য</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div><label className={labelClass}>আয়ের উৎস</label><input type="text" value={editingItem.income_source || ''} onChange={(e) => setEditingItem({...editingItem, income_source: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>মাসিক আয়</label><input type="number" value={editingItem.monthly_income || ''} onChange={(e) => setEditingItem({...editingItem, monthly_income: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>ঋণ আছে?</label><input type="text" value={editingItem.current_loan || ''} onChange={(e) => setEditingItem({...editingItem, current_loan: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>ঋণের পরিমাণ</label><input type="number" value={editingItem.loan_amount || ''} onChange={(e) => setEditingItem({...editingItem, loan_amount: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>কিস্তি ক্ষমতা</label><input type="text" value={editingItem.monthly_installment_capacity || ''} onChange={(e) => setEditingItem({...editingItem, monthly_installment_capacity: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>সঞ্চয় আগ্রহ</label><input type="text" value={editingItem.savings_interest || ''} onChange={(e) => setEditingItem({...editingItem, savings_interest: e.target.value})} className={inputClass}/></div>
                   </div>
                </div>

                {/* 4. Assets & Agro Edit */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                   <h3 className="font-bold text-emerald-800 mb-3 border-b pb-1">৪. সম্পদ ও কৃষি</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className={labelClass}>জমি</label><input type="text" value={editingItem.has_land || ''} onChange={(e) => setEditingItem({...editingItem, has_land: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>বিনিয়োগ প্রয়োজন</label><input type="text" value={editingItem.investment_need || ''} onChange={(e) => setEditingItem({...editingItem, investment_need: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>কৃষি যন্ত্র আগ্রহ</label><input type="text" value={editingItem.agro_machinery_interest || ''} onChange={(e) => setEditingItem({...editingItem, agro_machinery_interest: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>বীজ/সার প্রয়োজন</label><input type="text" value={editingItem.seed_fertilizer_need || ''} onChange={(e) => setEditingItem({...editingItem, seed_fertilizer_need: e.target.value})} className={inputClass}/></div>
                   </div>
                </div>

                {/* 5. Others Edit */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                   <h3 className="font-bold text-emerald-800 mb-3 border-b pb-1">৫. অন্যান্য</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className={labelClass}>স্বাস্থ্য সেবা আগ্রহ</label><input type="text" value={editingItem.telemedicine_interest || ''} onChange={(e) => setEditingItem({...editingItem, telemedicine_interest: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>কারিগরি প্রশিক্ষণ</label><input type="text" value={editingItem.skill_training || ''} onChange={(e) => setEditingItem({...editingItem, skill_training: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>আইনি সহায়তা</label><input type="text" value={editingItem.legal_help || ''} onChange={(e) => setEditingItem({...editingItem, legal_help: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>অফিসারের মন্তব্য</label><input type="text" value={editingItem.officer_comment || ''} onChange={(e) => setEditingItem({...editingItem, officer_comment: e.target.value})} className={inputClass}/></div>
                   </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white p-4 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingItem(null)} className="px-5 py-2.5 rounded-lg text-slate-600 font-bold hover:bg-slate-100 transition">বাতিল</button>
                <button type="submit" className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition flex items-center gap-2"><Save size={18}/> আপডেট করুন</button>
              </div>
            </form>
            
          </div>
        </div>
      )}

    </div>
  );
}