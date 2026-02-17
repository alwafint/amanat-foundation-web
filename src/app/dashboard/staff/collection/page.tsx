'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, Users, ChevronRight, Search, 
  Building2, ArrowLeft, Smartphone, Home, 
  Loader2, Wallet, Banknote, CalendarClock, CheckCircle 
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

// সাঘাটা উপজেলার গ্রামের তালিকা
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

const upazilas = ["সাঘাটা", "গাইবান্ধা সদর", "গোবিন্দগঞ্জ", "পলাশবাড়ী", "সাদুল্লাপুর", "সুন্দরগঞ্জ", "ফুলছড়ি"];

export default function CollectionPage() {
  const [step, setStep] = useState(1); // 1: Upazila, 2: Village, 3: Members, 4: Collection Form
  
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [villageSearch, setVillageSearch] = useState('');
  const [globalMobileSearch, setGlobalMobileSearch] = useState(''); // সরাসরি মোবাইল সার্চ

  // ফিনান্সিয়াল স্টেট
  const [stats, setStats] = useState({ totalSavings: 0, totalInstallments: 0, totalDue: 5000 }); // ডামি ডিউ
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('savings');
  const [submitLoading, setSubmitLoading] = useState(false);

  // মেম্বার ফেচ করা (গ্রাম অনুযায়ী)
  const fetchMembers = async (village: string) => {
    setLoading(true);
    const { data } = await supabase.from('members')
      .select('*')
      .eq('village', village)
      .order('full_name', { ascending: true });
    
    if (data) setMembers(data);
    setLoading(false);
  };

  // গ্লোবাল সার্চ (মোবাইল দিয়ে সরাসরি মেম্বার বের করা)
  const handleGlobalSearch = async () => {
    if(!globalMobileSearch) return;
    setLoading(true);
    const { data } = await supabase.from('members').select('*').eq('mobile', globalMobileSearch).single();
    if(data) {
        handleMemberSelect(data);
    } else {
        alert("কোনো মেম্বার পাওয়া যায়নি!");
    }
    setLoading(false);
  }

  // মেম্বার সিলেক্ট এবং তার হিসাব লোড করা
  const handleMemberSelect = async (member: any) => {
    setSelectedMember(member);
    setStep(4);
    
    // ট্রানজেকশন হিস্ট্রি থেকে যোগফল বের করা
    const { data } = await supabase.from('transactions').select('*').eq('member_id', member.id);
    
    if(data) {
        const savings = data.filter(t => t.type === 'savings').reduce((sum, t) => sum + Number(t.amount), 0);
        const loans = data.filter(t => t.type === 'loan').reduce((sum, t) => sum + Number(t.amount), 0);
        // ডিউ ক্যালকুলেশন লজিক (আপাতত ডামি ভ্যালু অথবা লজিক বসাতে পারেন)
        const due = 5000; // উদাহরণস্বরূপ

        setStats({ totalSavings: savings, totalInstallments: loans, totalDue: due });
    }
  };

  // টাকা কালেকশন সাবমিট
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    const staffUser = JSON.parse(localStorage.getItem('user') || '{}');

    try {
      const { error } = await supabase.from('transactions').insert([{
        member_id: selectedMember.id,
        staff_id: staffUser.mobile,
        type: type,
        amount: amount,
        method: 'cash'
      }]);

      if (error) throw error;
      
      alert(`৳${amount} টাকা সফলভাবে গ্রহণ করা হয়েছে!`);
      setAmount('');
      // আপডেট স্ট্যাটাস রিফ্রেশ
      handleMemberSelect(selectedMember);

    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const goBack = () => {
    if (step === 4) setStep(3);
    else if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  return (
    <div className="relative min-h-screen animate-in fade-in duration-500 pb-10">
      
      {/* --- HEADER --- */}
      <div className="mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
                {step > 1 && (
                    <button onClick={goBack} className="p-2 bg-slate-100 rounded-full hover:bg-emerald-100 text-emerald-700 transition">
                    <ArrowLeft size={20} />
                    </button>
                )}
                <div>
                    <h2 className="text-xl font-bold text-slate-800">ক্যাশ কালেকশন</h2>
                    <p className="text-xs text-slate-500">
                        {step === 1 && "উপজেলা নির্বাচন"}
                        {step === 2 && `${selectedUpazila} - গ্রাম নির্বাচন`}
                        {step === 3 && `${selectedVillage} - মেম্বার তালিকা`}
                        {step === 4 && `${selectedMember?.full_name} - টাকা জমা`}
                    </p>
                </div>
            </div>

            {/* Global Direct Search */}
            {step !== 4 && (
                <div className="flex w-full md:w-auto">
                    <input 
                        type="text" 
                        placeholder="মোবাইল নম্বর দিয়ে খুঁজুন..." 
                        className="w-full md:w-64 p-2.5 border border-slate-200 rounded-l-xl text-sm outline-none focus:border-emerald-500"
                        onChange={(e) => setGlobalMobileSearch(e.target.value)}
                    />
                    <button onClick={handleGlobalSearch} className="bg-emerald-600 text-white px-4 rounded-r-xl hover:bg-emerald-700">
                        <Search size={18}/>
                    </button>
                </div>
            )}
        </div>
      </div>

      {/* --- STEP 1: UPAZILA --- */}
      {step === 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {upazilas.map((u) => (
            <div key={u} onClick={() => {setSelectedUpazila(u); setStep(2);}} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-500 hover:shadow-md transition cursor-pointer flex justify-between items-center group">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition"><Building2 size={24} /></div>
                <span className="font-bold text-slate-700">{u}</span>
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-emerald-500" />
            </div>
          ))}
        </div>
      )}

      {/* --- STEP 2: VILLAGE --- */}
      {step === 2 && (
        <div className="space-y-4 animate-in slide-in-from-right-4">
             <input type="text" placeholder="গ্রাম খুঁজুন..." className="w-full p-3 border rounded-xl" onChange={(e) => setVillageSearch(e.target.value)}/>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {saghataVillages.filter(v => v.includes(villageSearch)).map((village) => (
                    <div key={village} onClick={() => {setSelectedVillage(village); fetchMembers(village); setStep(3);}} className="bg-white p-4 rounded-xl border border-slate-200 text-center hover:bg-emerald-50 hover:border-emerald-400 transition cursor-pointer shadow-sm">
                        <MapPin size={20} className="mx-auto mb-2 text-emerald-500" />
                        <span className="font-bold text-slate-700 text-sm block">{village}</span>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- STEP 3: MEMBER LIST --- */}
      {step === 3 && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4">
          <input type="text" placeholder="নাম বা মোবাইল দিয়ে খুঁজুন..." className="w-full p-3 border rounded-xl" onChange={(e) => setSearchQuery(e.target.value)} />
          
          {loading ? <div className="text-center py-10 text-slate-400">লোড হচ্ছে...</div> : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {members.filter(m => m.full_name.includes(searchQuery) || m.mobile.includes(searchQuery)).map((m) => (
                <div key={m.id} onClick={() => handleMemberSelect(m)} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center hover:border-emerald-500 cursor-pointer transition">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-lg">{m.full_name.charAt(0)}</div>
                    <div>
                      <h4 className="font-bold text-slate-800">{m.full_name}</h4>
                      <p className="text-xs text-slate-500 font-mono mt-1"><Smartphone size={12} className="inline mr-1"/> {m.mobile}</p>
                    </div>
                  </div>
                  <ChevronRight className="text-slate-300" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- STEP 4: COLLECTION FORM --- */}
      {step === 4 && selectedMember && (
        <div className="max-w-xl mx-auto animate-in zoom-in-95 duration-300">
            
            {/* Member Card */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center mb-6">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-3xl mx-auto mb-3 border-4 border-white shadow-sm">
                    {selectedMember.full_name.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-slate-800">{selectedMember.full_name}</h2>
                <p className="text-sm text-slate-500 font-mono">{selectedMember.mobile}</p>
                <div className="flex justify-center gap-4 mt-4">
                    <div className="text-center bg-blue-50 p-2 rounded-lg min-w-[80px]">
                        <p className="text-[10px] text-blue-500 font-bold uppercase">মোট সঞ্চয়</p>
                        <p className="font-bold text-blue-700">৳{stats.totalSavings}</p>
                    </div>
                    <div className="text-center bg-purple-50 p-2 rounded-lg min-w-[80px]">
                        <p className="text-[10px] text-purple-500 font-bold uppercase">কিস্তি জমা</p>
                        <p className="font-bold text-purple-700">৳{stats.totalInstallments}</p>
                    </div>
                    <div className="text-center bg-red-50 p-2 rounded-lg min-w-[80px]">
                        <p className="text-[10px] text-red-500 font-bold uppercase">মোট ডিউ</p>
                        <p className="font-bold text-red-700">৳{stats.totalDue}</p>
                    </div>
                </div>
            </div>

            {/* Collection Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl shadow-lg border border-emerald-100 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">জমার ধরন নির্বাচন করুন</label>
                    <div className="grid grid-cols-2 gap-4">
                        <div onClick={() => setType('savings')} className={`p-4 rounded-xl border-2 cursor-pointer text-center transition ${type === 'savings' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold' : 'border-slate-100 text-slate-500'}`}>
                            <Wallet className="mx-auto mb-2"/> সঞ্চয় জমা
                        </div>
                        <div onClick={() => setType('loan')} className={`p-4 rounded-xl border-2 cursor-pointer text-center transition ${type === 'loan' ? 'border-blue-500 bg-blue-50 text-blue-700 font-bold' : 'border-slate-100 text-slate-500'}`}>
                            <Banknote className="mx-auto mb-2"/> লোন কিস্তি
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">টাকার পরিমাণ</label>
                    <div className="relative">
                        <span className="absolute left-5 top-4 text-slate-400 font-bold text-lg">৳</span>
                        <input 
                            type="number" required 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 font-bold text-xl text-slate-800"
                            placeholder="500"
                        />
                    </div>
                </div>

                <button disabled={submitLoading} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 shadow-xl transition flex justify-center items-center gap-2">
                    {submitLoading ? <Loader2 className="animate-spin"/> : <><CheckCircle size={22}/> ক্যাশ রিসিভ করুন</>}
                </button>
            </form>

        </div>
      )}

    </div>
  );
}