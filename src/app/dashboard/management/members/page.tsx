'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, Users, ChevronRight, Search, 
  Building2, ArrowLeft, Smartphone, Home, 
  Loader2, UserCheck, Map as MapIcon, ShieldCheck
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

const upazilas = ["সাঘাটা", "গাইবান্ধা সদর", "গোবিন্দগঞ্জ", "পলাশবাড়ী", "সাদুল্লাপুর", "সুন্দরগঞ্জ", "ফুলছড়ি"];

export default function ManagementMemberDirectory() {
  const [step, setStep] = useState(1); // 1: Upazila, 2: Village, 3: Members
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [villageSearch, setVillageSearch] = useState('');
  const [memberSearch, setMemberSearch] = useState('');

  const fetchMembers = async (village: string) => {
    setLoading(true);
    const { data } = await supabase.from('members').select('*').eq('village', village).order('full_name', { ascending: true });
    if (data) setMembers(data);
    setLoading(false);
  };

  const goBack = () => {
    if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      
      {/* Header */}
      <div className="mb-8 flex items-center gap-4 bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
        {step > 1 && (
          <button onClick={goBack} className="p-2 bg-indigo-50 rounded-full text-indigo-600 hover:bg-indigo-600 hover:text-white transition">
            <ArrowLeft size={20} />
          </button>
        )}
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {step === 1 && "উপজেলা ভিত্তিক মেম্বার ডিরেক্টরি"}
            {step === 2 && `${selectedUpazila} - গ্রাম নির্বাচন`}
            {step === 3 && `${selectedVillage} - মেম্বার তালিকা`}
          </h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Management View</p>
        </div>
      </div>

      {/* STEP 1: UPAZILA */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {upazilas.map((u) => (
            <div key={u} onClick={() => {setSelectedUpazila(u); setStep(2);}} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:border-indigo-500 hover:shadow-xl transition cursor-pointer group flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition shadow-inner">
                  <Building2 size={24} />
                </div>
                <span className="font-bold text-slate-700 text-lg">{u}</span>
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-indigo-500 transform group-hover:translate-x-1 transition" />
            </div>
          ))}
        </div>
      )}

      {/* STEP 2: VILLAGE */}
      {step === 2 && (
        <div className="animate-in slide-in-from-right-4 duration-300">
            <div className="relative mb-8 max-w-xl mx-auto">
                <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
                <input 
                  type="text" placeholder="গ্রামের নাম লিখে খুঁজুন..." 
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition"
                  onChange={(e) => setVillageSearch(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {saghataVillages.filter(v => v.includes(villageSearch)).map((village) => (
                    <div key={village} onClick={() => {setSelectedVillage(village); fetchMembers(village); setStep(3);}} className="bg-white p-5 rounded-2xl border border-slate-100 text-center hover:bg-indigo-50 hover:border-indigo-300 transition cursor-pointer group shadow-sm">
                        <MapPin size={24} className="mx-auto mb-2 text-indigo-500 group-hover:scale-110 transition" />
                        <span className="font-bold text-slate-700 text-sm">{village}</span>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* STEP 3: MEMBERS */}
      {step === 3 && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3.5 text-slate-400" size={20} />
            <input type="text" placeholder="মেম্বার খুঁজুন..." className="w-full pl-10 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:border-indigo-500" onChange={(e) => setMemberSearch(e.target.value)} />
          </div>

          {loading ? (
            <div className="text-center py-20"><Loader2 className="animate-spin text-indigo-600 mx-auto" size={40}/></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {members.filter(m => m.full_name.toLowerCase().includes(memberSearch.toLowerCase()) || m.mobile.includes(memberSearch)).map((m) => (
                <div key={m.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex justify-between items-center group hover:border-indigo-300 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                      {m.full_name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg leading-none">{m.full_name}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-2 flex items-center gap-1"><Smartphone size={12}/> {m.mobile}</p>
                      <div className="flex gap-2 mt-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${m.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{m.status}</span>
                        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold">ওয়ার্ড: {m.ward_no || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-3 bg-slate-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition shadow-sm border border-indigo-100">
                     <Users size={18}/>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}