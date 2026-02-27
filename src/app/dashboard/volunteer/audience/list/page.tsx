'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, List, Smartphone, MapPin, Eye, X, 
  UserPlus, Home, DollarSign, Scale, Edit, Save, Map, 
  Sprout, HeartPulse, AlertTriangle 
} from "lucide-react";
import { supabase } from '../../../../../lib/supabaseClient';

// লোকাল ডাটাবেজ থেকে লোকেশন ডাটা ইমপোর্ট
import { divisions, districts, upazilas, unions } from '../../../../../lib/bd-locations';

export default function AudienceListPage() {
  const [dataList, setDataList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering States
  const [filterDiv, setFilterDiv] = useState('');
  const [filterDist, setFilterDist] = useState('');
  const [filterUpa, setFilterUpa] = useState('');
  const [filterUnion, setFilterUnion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal States
  const [selectedItem, setSelectedItem] = useState<any>(null); // For Viewing
  const [editingItem, setEditingItem] = useState<any>(null);   // For Editing

  useEffect(() => {
    fetchSurveys();
  },[]);

  const fetchSurveys = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('audience_survey')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setDataList(data);
    setLoading(false);
  };

  // ডাটা আপডেট ফাংশন (সংশোধিত)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const { id, created_at, ...updateData } = editingItem;

      // নাম্বার ফিল্ড কনভার্সন
      ['total_members', 'earning_members', 'dependent_members', 'monthly_income', 'loan_amount'].forEach(key => {
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

  // --- Filtering Logic for the List ---
  const distsForFilter = districts.filter(d => d.division_id === divisions.find(div => div.bn_name === filterDiv)?.id);
  const upasForFilter = upazilas.filter(u => u.district_id === districts.find(dist => dist.bn_name === filterDist)?.id);
  const unionsForFilter = unions.filter(u => u.upazilla_id === upazilas.find(upa => upa.bn_name === filterUpa)?.id);

  const filteredData = dataList.filter(item => {
    const matchesDiv = filterDiv ? item.division === filterDiv : true;
    const matchesDist = filterDist ? item.district === filterDist : true;
    const matchesUpa = filterUpa ? item.upazila === filterUpa : true;
    const matchesUnion = filterUnion ? item.union_name === filterUnion : true;
    const matchesSearch = item.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.mobile?.includes(searchTerm);
    return matchesDiv && matchesDist && matchesUpa && matchesUnion && matchesSearch;
  });

  // --- Location Logic for Edit Modal ---
  const distsForEdit = districts.filter(d => d.division_id === divisions.find(div => div.bn_name === editingItem?.division)?.id);
  const upasForEdit = upazilas.filter(u => u.district_id === districts.find(dist => dist.bn_name === editingItem?.district)?.id);
  const unionsForEdit = unions.filter(u => u.upazilla_id === upazilas.find(upa => upa.bn_name === editingItem?.upazila)?.id);


  const DetailRow = ({ label, value }: { label: string, value: any }) => (
    <div className="border-b border-slate-100 py-2">
      <span className="block text-xs text-slate-400 font-bold">{label}</span>
      <span className="block text-sm text-slate-800 font-medium">{value || "N/A"}</span>
    </div>
  );

  const inputClass = "w-full p-2.5 rounded-lg border border-slate-300 focus:border-emerald-500 outline-none text-sm bg-slate-50 focus:bg-white transition-colors disabled:opacity-50";
  const labelClass = "text-[11px] font-bold text-slate-500 mb-1 block uppercase tracking-wider ml-1";

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 max-w-7xl mx-auto pb-20">
      
      {/* হেডার ও ফিল্টার */}
      <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-slate-100 mb-6 sticky top-0 z-20">
        <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
          <List className="text-emerald-600"/> ওডিইয়েন্স ডাটা লিস্ট
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="col-span-2 md:col-span-1">
            <label className={labelClass}>বিভাগ</label>
            <select value={filterDiv} onChange={(e) => {setFilterDiv(e.target.value); setFilterDist(''); setFilterUpa(''); setFilterUnion('');}} className={inputClass}>
              <option value="">সকল বিভাগ</option>
              {divisions.map(d => <option key={d.id} value={d.bn_name}>{d.bn_name}</option>)}
            </select>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className={labelClass}>জেলা</label>
            <select value={filterDist} disabled={!filterDiv} onChange={(e) => {setFilterDist(e.target.value); setFilterUpa(''); setFilterUnion('');}} className={inputClass}>
              <option value="">সকল জেলা</option>
              {distsForFilter.map(d => <option key={d.id} value={d.bn_name}>{d.bn_name}</option>)}
            </select>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className={labelClass}>উপজেলা</label>
            <select value={filterUpa} disabled={!filterDist} onChange={(e) => {setFilterUpa(e.target.value); setFilterUnion('');}} className={inputClass}>
              <option value="">সকল উপজেলা</option>
              {upasForFilter.map(u => <option key={u.id} value={u.bn_name}>{u.bn_name}</option>)}
            </select>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className={labelClass}>ইউনিয়ন</label>
            <select value={filterUnion} disabled={!filterUpa} onChange={(e) => setFilterUnion(e.target.value)} className={inputClass}>
              <option value="">সকল ইউনিয়ন</option>
              {unionsForFilter.map(u => <option key={u.id} value={u.bn_name}>{u.bn_name}</option>)}
            </select>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className={labelClass}>সার্চ করুন</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 text-slate-400" size={16}/>
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 focus:border-emerald-500 outline-none text-sm bg-slate-50 focus:bg-white transition-colors`} placeholder="নাম/মোবাইল..." />
            </div>
          </div>
        </div>
      </div>
      
      {/* ডাটা লিস্ট */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-20 text-emerald-600 flex flex-col items-center gap-3">
           
             <p className="font-bold text-sm">ডাটা লোড হচ্ছে...</p>
          </div>
        ) : filteredData.length > 0 ? (
          filteredData.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md hover:border-emerald-100 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-[1rem] flex items-center justify-center font-black text-xl border border-emerald-100 shrink-0">
                  {item.full_name?.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg leading-tight mb-1">{item.full_name}</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
                     <span className="flex items-center gap-1.5"><Smartphone size={14} className="text-slate-400"/> {item.mobile}</span>
                     <span className="flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md"><MapPin size={12}/> {item.union_name || item.village || 'N/A'}, {item.upazila || 'N/A'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0 pt-3 md:pt-0">
                 <button onClick={() => setSelectedItem(item)} className="flex-1 md:flex-none bg-slate-50 text-slate-700 text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-slate-200 transition flex items-center justify-center gap-1.5">
                    <Eye size={16}/> বিস্তারিত
                 </button>
                 <button onClick={() => setEditingItem(item)} className="flex-1 md:flex-none bg-emerald-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-1.5">
                    <Edit size={16}/> এডিট
                 </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 text-center flex flex-col items-center">
            <AlertTriangle size={48} className="text-amber-400 mb-4"/>
            <p className="text-slate-500 font-bold text-lg">কোনো ডাটা পাওয়া যায়নি</p>
            <p className="text-slate-400 text-sm mt-1">অন্য কোনো এরিয়া বা নাম দিয়ে সার্চ করুন</p>
          </div>
        )}
      </div>

      {/* -------------- VIEW DETAILS MODAL -------------- */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="sticky top-0 bg-white z-10 p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2"><UserPlus className="text-emerald-600"/> বিস্তারিত প্রোফাইল</h2>
                <p className="text-xs text-slate-400 mt-1 font-medium">এন্ট্রি করেছেন: <span className="text-emerald-600 font-bold">{selectedItem.staff_name || 'N/A'}</span> | তারিখ: {new Date(selectedItem.created_at).toLocaleDateString()}</p>
              </div>
              <button onClick={() => setSelectedItem(null)} className="p-2 bg-slate-50 text-slate-400 rounded-full hover:bg-rose-50 hover:text-rose-500 transition"><X size={24}/></button>
            </div>
            
            <div className="p-6 md:p-8 space-y-8">
               {/* 1. Basic Info */}
               <div>
                  <h4 className="font-bold text-emerald-800 mb-4 border-b border-emerald-100 pb-2 flex gap-2 items-center"><UserPlus size={18}/> পরিচয় ও ঠিকানা</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
                     <DetailRow label="নাম" value={selectedItem.full_name}/>
                     <DetailRow label="অভিভাবক" value={selectedItem.guardian_name}/>
                     <DetailRow label="মোবাইল" value={selectedItem.mobile}/>
                     <DetailRow label="বিকল্প মোবাইল" value={selectedItem.alt_mobile}/>
                     <DetailRow label="লিঙ্গ" value={selectedItem.gender}/>
                     <DetailRow label="বৈবাহিক অবস্থা" value={selectedItem.marital_status}/>
                     <DetailRow label="বয়স/জন্ম তারিখ" value={selectedItem.dob}/>
                     <DetailRow label="NID" value={selectedItem.nid_number}/>
                  </div>
                  
                  {/* Location Data */}
                  <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                     <p className="text-xs font-bold text-emerald-700 uppercase mb-3">লোকেশন ডিটেইলস</p>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <DetailRow label="বিভাগ" value={selectedItem.division}/>
                        <DetailRow label="জেলা" value={selectedItem.district}/>
                        <DetailRow label="উপজেলা" value={selectedItem.upazila}/>
                        <DetailRow label="ইউনিয়ন" value={selectedItem.union_name}/>
                        <DetailRow label="গ্রাম" value={selectedItem.village}/>
                        <DetailRow label="ওয়ার্ড নং" value={selectedItem.ward_no}/>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-emerald-100/50">
                        <DetailRow label="বর্তমান ঠিকানা" value={selectedItem.present_address}/>
                        <DetailRow label="স্থায়ী ঠিকানা" value={selectedItem.permanent_address}/>
                     </div>
                  </div>
               </div>

               {/* 2. Family Info */}
               <div>
                  <h4 className="font-bold text-emerald-800 mb-4 border-b border-emerald-100 pb-2 flex gap-2 items-center"><Home size={18}/> পারিবারিক তথ্য</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                     <DetailRow label="মোট সদস্য" value={selectedItem.total_members}/>
                     <DetailRow label="উপার্জনকারী" value={selectedItem.earning_members}/>
                     <DetailRow label="নির্ভরশীল" value={selectedItem.dependent_members}/>
                     <DetailRow label="প্রবাসী সদস্য" value={selectedItem.expat_status}/>
                     <DetailRow label="সামাজিক অবস্থা" value={selectedItem.social_status}/>
                  </div>
               </div>

               {/* 3. Financial Info */}
               <div>
                  <h4 className="font-bold text-emerald-800 mb-4 border-b border-emerald-100 pb-2 flex gap-2 items-center"><DollarSign size={18}/> আর্থিক তথ্য</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                  <h4 className="font-bold text-emerald-800 mb-4 border-b border-emerald-100 pb-2 flex gap-2 items-center"><MapPin size={18}/> সম্পদ ও বিনিয়োগ</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                     <DetailRow label="জমি আছে?" value={selectedItem.has_land}/>
                     <DetailRow label="বাড়ির ধরণ" value={selectedItem.house_type}/>
                     <DetailRow label="ব্যবসা" value={selectedItem.business_info}/>
                     <DetailRow label="যানবাহন" value={selectedItem.vehicle_info}/>
                     <DetailRow label="বিনিয়োগ প্রয়োজন" value={selectedItem.investment_need}/>
                  </div>
               </div>

               {/* 5. Agro & Health */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                     <h4 className="font-bold text-emerald-800 mb-4 border-b border-emerald-100 pb-2 flex gap-2 items-center"><Sprout size={18}/> কৃষি</h4>
                     <div className="space-y-4">
                        <DetailRow label="কৃষি যন্ত্রপাতি আগ্রহ" value={selectedItem.agro_machinery_interest}/>
                        <DetailRow label="বীজ/সার প্রয়োজন" value={selectedItem.seed_fertilizer_need}/>
                        <DetailRow label="কৃষি প্রশিক্ষণ" value={selectedItem.agro_training_interest}/>
                        <DetailRow label="শস্য ব্যাংক" value={selectedItem.grain_bank_interest}/>
                     </div>
                  </div>
                  <div>
                     <h4 className="font-bold text-emerald-800 mb-4 border-b border-emerald-100 pb-2 flex gap-2 items-center"><HeartPulse size={18}/> স্বাস্থ্য ও শিক্ষা</h4>
                     <div className="space-y-4">
                        <DetailRow label="টেলিমেডিসিন" value={selectedItem.telemedicine_interest}/>
                        <DetailRow label="স্বাস্থ্য কার্ড" value={selectedItem.health_card_interest}/>
                        <DetailRow label="কারিগরি প্রশিক্ষণ" value={selectedItem.skill_training}/>
                        <DetailRow label="শিক্ষা" value={selectedItem.education}/>
                     </div>
                  </div>
               </div>

               {/* 6. Legal & Risk */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-emerald-800 mb-4 border-b border-emerald-100 pb-2 flex gap-2 items-center"><Scale size={18}/> আইনি ও ডিজিটাল</h4>
                    <div className="space-y-4">
                        <DetailRow label="আইনি সহায়তা" value={selectedItem.legal_help}/>
                        <DetailRow label="ডিজিটাল সেবা" value={selectedItem.digital_service}/>
                        <DetailRow label="বিল পেমেন্ট" value={selectedItem.bill_pay_interest}/>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-800 mb-4 border-b border-emerald-100 pb-2 flex gap-2 items-center"><AlertTriangle size={18}/> ঝুঁকি ও মন্তব্য</h4>
                    <div className="space-y-4">
                        <DetailRow label="ঝুঁকি গ্রহণ" value={selectedItem.risk_tolerance}/>
                        <DetailRow label="অফিসারের মন্তব্য" value={selectedItem.officer_comment}/>
                        <DetailRow label="GPS" value={selectedItem.latitude ? `${selectedItem.latitude}, ${selectedItem.longitude}` : 'N/A'}/>
                    </div>
                  </div>
               </div>
            </div>
            <div className="sticky bottom-0 bg-white p-5 border-t border-slate-100 flex justify-end">
               <button onClick={() => setSelectedItem(null)} className="px-8 py-3 bg-slate-800 hover:bg-black text-white rounded-xl font-bold transition-colors">বন্ধ করুন</button>
            </div>
          </div>
        </div>
      )}

      {/* -------------- EDIT MODAL (ALL FIELDS) -------------- */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            <form onSubmit={handleUpdate}>
              <div className="sticky top-0 bg-white z-20 p-6 border-b border-slate-100 flex justify-between items-center shadow-sm">
                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                   <Edit size={22} className="text-emerald-600"/> তথ্য আপডেট করুন
                </h2>
                <button type="button" onClick={() => setEditingItem(null)} className="p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-rose-50 hover:text-rose-500 transition"><X size={24}/></button>
              </div>

              <div className="p-6 md:p-8 space-y-8 bg-slate-50/50">
                {/* 1. Basic Info Edit */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                   <h3 className="font-bold text-emerald-800 mb-4 border-b border-emerald-50 pb-2 flex items-center gap-2"><UserPlus size={16}/> মৌলিক তথ্য</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                   </div>
                </div>

                {/* 1.5 Area & Location (NEW CASCADING LOGIC) */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
                   <h3 className="font-bold text-emerald-800 mb-4 border-b border-emerald-50 pb-2 flex items-center gap-2"><Map size={16}/> ঠিকানা ও এরিয়া</h3>
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
                      <div>
                        <label className={labelClass}>বিভাগ</label>
                        <select value={editingItem.division || ''} onChange={(e) => setEditingItem({...editingItem, division: e.target.value, district: '', upazila: '', union_name: ''})} className={inputClass}>
                          <option value="">নির্বাচন করুন</option>
                          {divisions.map(d => <option key={d.id} value={d.bn_name}>{d.bn_name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>জেলা</label>
                        <select value={editingItem.district || ''} disabled={!editingItem.division} onChange={(e) => setEditingItem({...editingItem, district: e.target.value, upazila: '', union_name: ''})} className={inputClass}>
                          <option value="">নির্বাচন করুন</option>
                          {distsForEdit.map(d => <option key={d.id} value={d.bn_name}>{d.bn_name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>উপজেলা</label>
                        <select value={editingItem.upazila || ''} disabled={!editingItem.district} onChange={(e) => setEditingItem({...editingItem, upazila: e.target.value, union_name: ''})} className={inputClass}>
                          <option value="">নির্বাচন করুন</option>
                          {upasForEdit.map(u => <option key={u.id} value={u.bn_name}>{u.bn_name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>ইউনিয়ন</label>
                        <select value={editingItem.union_name || ''} disabled={!editingItem.upazila} onChange={(e) => setEditingItem({...editingItem, union_name: e.target.value})} className={inputClass}>
                          <option value="">নির্বাচন করুন</option>
                          {unionsForEdit.map(u => <option key={u.id} value={u.bn_name}>{u.bn_name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>গ্রামের নাম</label>
                        <input type="text" value={editingItem.village || ''} onChange={(e) => setEditingItem({...editingItem, village: e.target.value})} className={inputClass} placeholder="গ্রাম লিখুন"/>
                      </div>
                      <div>
                        <label className={labelClass}>ওয়ার্ড নং</label>
                        <input type="text" value={editingItem.ward_no || ''} onChange={(e) => setEditingItem({...editingItem, ward_no: e.target.value})} className={inputClass} placeholder="ওয়ার্ড নং"/>
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div><label className={labelClass}>বর্তমান ঠিকানা (বিস্তারিত)</label><input type="text" value={editingItem.present_address || ''} onChange={(e) => setEditingItem({...editingItem, present_address: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>স্থায়ী ঠিকানা (বিস্তারিত)</label><input type="text" value={editingItem.permanent_address || ''} onChange={(e) => setEditingItem({...editingItem, permanent_address: e.target.value})} className={inputClass}/></div>
                   </div>
                </div>

                {/* 2. Family Edit */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                   <h3 className="font-bold text-emerald-800 mb-4 border-b border-emerald-50 pb-2 flex items-center gap-2"><Home size={16}/> পারিবারিক তথ্য</h3>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                      <div><label className={labelClass}>মোট সদস্য</label><input type="number" value={editingItem.total_members || ''} onChange={(e) => setEditingItem({...editingItem, total_members: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>উপার্জনকারী</label><input type="number" value={editingItem.earning_members || ''} onChange={(e) => setEditingItem({...editingItem, earning_members: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>নির্ভরশীল</label><input type="number" value={editingItem.dependent_members || ''} onChange={(e) => setEditingItem({...editingItem, dependent_members: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>সামাজিক অবস্থা</label><select value={editingItem.social_status || ''} onChange={(e) => setEditingItem({...editingItem, social_status: e.target.value})} className={inputClass}><option value="">নির্বাচন</option><option value="দরিদ্র">দরিদ্র</option><option value="মধ্যবিত্ত">মধ্যবিত্ত</option><option value="স্বনির্ভর">স্বনির্ভর</option></select></div>
                   </div>
                </div>

                {/* 3. Financial Edit */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                   <h3 className="font-bold text-emerald-800 mb-4 border-b border-emerald-50 pb-2 flex items-center gap-2"><DollarSign size={16}/> আর্থিক তথ্য</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div><label className={labelClass}>আয়ের উৎস</label><input type="text" value={editingItem.income_source || ''} onChange={(e) => setEditingItem({...editingItem, income_source: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>মাসিক আয়</label><input type="number" value={editingItem.monthly_income || ''} onChange={(e) => setEditingItem({...editingItem, monthly_income: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>ঋণ আছে?</label><input type="text" value={editingItem.current_loan || ''} onChange={(e) => setEditingItem({...editingItem, current_loan: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>ঋণের পরিমাণ</label><input type="number" value={editingItem.loan_amount || ''} onChange={(e) => setEditingItem({...editingItem, loan_amount: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>কিস্তি ক্ষমতা</label><input type="text" value={editingItem.monthly_installment_capacity || ''} onChange={(e) => setEditingItem({...editingItem, monthly_installment_capacity: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>সঞ্চয় আগ্রহ</label><input type="text" value={editingItem.savings_interest || ''} onChange={(e) => setEditingItem({...editingItem, savings_interest: e.target.value})} className={inputClass}/></div>
                   </div>
                </div>

                {/* 4. Assets & Agro Edit */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                   <h3 className="font-bold text-emerald-800 mb-4 border-b border-emerald-50 pb-2 flex items-center gap-2"><MapPin size={16}/> সম্পদ ও কৃষি</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div><label className={labelClass}>জমি</label><input type="text" value={editingItem.has_land || ''} onChange={(e) => setEditingItem({...editingItem, has_land: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>বিনিয়োগ প্রয়োজন</label><input type="text" value={editingItem.investment_need || ''} onChange={(e) => setEditingItem({...editingItem, investment_need: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>কৃষি যন্ত্র আগ্রহ</label><input type="text" value={editingItem.agro_machinery_interest || ''} onChange={(e) => setEditingItem({...editingItem, agro_machinery_interest: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>বীজ/সার প্রয়োজন</label><input type="text" value={editingItem.seed_fertilizer_need || ''} onChange={(e) => setEditingItem({...editingItem, seed_fertilizer_need: e.target.value})} className={inputClass}/></div>
                   </div>
                </div>

                {/* 5. Others Edit */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                   <h3 className="font-bold text-emerald-800 mb-4 border-b border-emerald-50 pb-2 flex items-center gap-2"><AlertTriangle size={16}/> অন্যান্য</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div><label className={labelClass}>স্বাস্থ্য সেবা আগ্রহ</label><input type="text" value={editingItem.telemedicine_interest || ''} onChange={(e) => setEditingItem({...editingItem, telemedicine_interest: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>কারিগরি প্রশিক্ষণ</label><input type="text" value={editingItem.skill_training || ''} onChange={(e) => setEditingItem({...editingItem, skill_training: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>আইনি সহায়তা</label><input type="text" value={editingItem.legal_help || ''} onChange={(e) => setEditingItem({...editingItem, legal_help: e.target.value})} className={inputClass}/></div>
                      <div><label className={labelClass}>অফিসারের মন্তব্য</label><input type="text" value={editingItem.officer_comment || ''} onChange={(e) => setEditingItem({...editingItem, officer_comment: e.target.value})} className={inputClass}/></div>
                   </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white p-5 border-t border-slate-200 flex justify-end gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] rounded-b-[2rem]">
                <button type="button" onClick={() => setEditingItem(null)} className="px-6 py-3 rounded-xl text-slate-600 font-bold hover:bg-slate-100 transition">বাতিল</button>
                <button type="submit" className="px-8 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition flex items-center gap-2"><Save size={18}/> আপডেট করুন</button>
              </div>
            </form>
            
          </div>
        </div>
      )}

    </div>
  );
}