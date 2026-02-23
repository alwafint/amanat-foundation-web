'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, Users, ChevronRight, Search, 
  Building2, ArrowLeft, Smartphone, Home, 
  Loader2, Wallet, Banknote, CalendarClock, CheckCircle,
  TrendingUp, AlertCircle
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
  "গোরেরপাড়া", "হাপানিিয়া", "আগ গড়গড়িয়া", "পাছ গড়গড়িয়া", "নসিরারপাড়া", "সতীতলা", "কিঙ্করপুর", "বাঙ্গাবাড়ী", "চাকুলী", 
  "জালাল তাইর", "গজারিয়া", "ফলিয়াদিগর", "কামালেরপাড়া", "বারকোনা", "সাহাবাজের পাড়া", "সুজালপুর", "ছিলমানেরপাড়া", 
  "বাদিনারপাড়া", "থৈকরেরপাড়া", "বেঙ্গারপাড়া", "চিনিরপটল", "কালুরপাড়া", "কুমারপাড়া", "হলদিয়া", "গুয়াবাড়ী", "কানাইপাড়া", 
  "বেড়া", "গোবিন্দপুর", "আমদিরপাড়া", "আবদুল্লারপাড়া", "শিমুলবাড়ী", "কৈচড়া", "মেছট", "বাজিতনগর", "শিমুলবাড়িয়া", 
  "বলিয়ারবেড়", "কামারপাড়া", "বগারভিটা", "দৈচড়া", "জাঙ্গালিয়া", "জুমারবাড়ী", "চান্দপাড়া", "মামুদপুর", "বসন্তেরপাড়া", 
  "কুন্দপাড়া", "কাঠুর", "নলছিয়া", "চেঙ্গালিয়া"
].sort();

const upazilas = ["সাঘাটা", "গাইবান্ধা সদর", "গোবিন্দগঞ্জ", "পলাশবাড়ী", "সাদুল্লাপুর", "সুন্দরগঞ্জ", "ফুলছড়ি"];

export default function TeamLeaderCollectionPage() {
  const [step, setStep] = useState(1); // 1: Upazila, 2: Village, 3: Members, 4: Collection Form
  const [user, setUser] = useState<any>(null);
  
  const [selectedVillage, setSelectedVillage] = useState('');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [globalMobileSearch, setGlobalMobileSearch] = useState('');

  // আর্থিক তথ্য
  const [stats, setStats] = useState({ totalSavings: 0, totalInstallments: 0, totalDue: 0 });
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'savings' | 'loan'>('savings');
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(localUser);
  }, []);

  // ১. মেম্বার ফেচ করা (শুধুমাত্র এই লিডারের মেম্বাররা)
  const fetchMembers = async (village: string) => {
    setLoading(true);
    const { data } = await supabase.from('members')
      .select('*')
      .eq('village', village)
      .eq('referred_by', user.mobile) // লিডারের নিজের মেম্বার
      .order('full_name', { ascending: true });
    
    if (data) setMembers(data);
    setLoading(false);
  };

  // ২. সরাসরি নাম্বার দিয়ে সার্চ
  const handleGlobalSearch = async () => {
    if(!globalMobileSearch) return;
    setLoading(true);
    const { data } = await supabase.from('members')
        .select('*')
        .eq('mobile', globalMobileSearch)
        .eq('referred_by', user.mobile) // নিরাপত্তা চেক
        .single();
    
    if(data) {
        handleMemberSelect(data);
    } else {
        alert("আপনার টিমে এই নাম্বারের কোনো মেম্বার পাওয়া যায়নি!");
    }
    setLoading(false);
  }

  // ৩. মেম্বার সিলেক্ট এবং তার আগের ডাটা চেক করা
  const handleMemberSelect = async (member: any) => {
    setSelectedMember(member);
    setStep(4);
    
    const { data } = await supabase.from('transactions').select('*').eq('member_id', member.id);
    
    if(data) {
        const savings = data.filter(t => t.type === 'savings').reduce((sum, t) => sum + Number(t.amount), 0);
        const loans = data.filter(t => t.type === 'loan').reduce((sum, t) => sum + Number(t.amount), 0);
        setStats({ totalSavings: savings, totalInstallments: loans, totalDue: 500 }); // ডামি ডিউ
    }
  };

  // ৪. কালেকশন সাবমিট
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!amount || Number(amount) <= 0) return alert("সঠিক টাকার পরিমাণ দিন");
    
    setSubmitLoading(true);
    try {
      const { error } = await supabase.from('transactions').insert([{
        member_id: selectedMember.id,
        staff_id: user.mobile, // টিম লিডারের আইডি
        type: type,
        amount: amount,
        method: 'cash'
      }]);

      if (error) throw error;
      
      alert(`✅ ৳${amount} টাকা সফলভাবে গ্রহণ করা হয়েছে!`);
      setAmount('');
      handleMemberSelect(selectedMember); // ডাটা রিফ্রেশ

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
    <div className="animate-in fade-in duration-500 pb-20 max-w-5xl mx-auto">
      
      {/* --- Breadcrumb & Search --- */}
      <div className="mb-6 bg-white p-5 rounded-3xl shadow-sm border border-indigo-50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
                {step > 1 && (
                    <button onClick={goBack} className="p-2 bg-indigo-50 rounded-full text-indigo-600 hover:bg-indigo-600 hover:text-white transition">
                       <ArrowLeft size={20} />
                    </button>
                )}
                <div>
                    <h2 className="text-xl font-bold text-slate-800">কালেকশন এন্ট্রি</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                        {step === 4 ? `গ্রহীতা: ${selectedMember?.full_name}` : "ধাপ ভিত্তিক মেম্বার নির্বাচন"}
                    </p>
                </div>
            </div>

            {step !== 4 && (
                <div className="flex w-full md:w-auto shadow-sm">
                    <input 
                        type="text" placeholder="মোবাইল নম্বর লিখুন..." 
                        className="w-full md:w-64 p-3 bg-slate-50 border border-slate-200 rounded-l-2xl outline-none focus:border-indigo-500 text-sm"
                        onChange={(e) => setGlobalMobileSearch(e.target.value)}
                    />
                    <button onClick={handleGlobalSearch} className="bg-indigo-600 text-white px-5 rounded-r-2xl hover:bg-indigo-700 transition">
                        <Search size={18}/>
                    </button>
                </div>
            )}
        </div>
      </div>

      {/* --- STEP 1: UPAZILA --- */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {upazilas.map((u) => (
            <div key={u} onClick={() => setStep(2)} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:border-indigo-500 hover:shadow-xl transition cursor-pointer flex justify-between items-center group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition shadow-inner">
                   <Building2 size={24} />
                </div>
                <span className="font-bold text-slate-700 text-lg">{u}</span>
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-indigo-500" />
            </div>
          ))}
        </div>
      )}

      {/* --- STEP 2: VILLAGE --- */}
      {step === 2 && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
             <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                <Search className="text-slate-400" size={20}/>
                <input type="text" placeholder="গ্রামের নাম লিখে খুঁজুন..." className="w-full outline-none text-sm" onChange={(e) => setSearchQuery(e.target.value)}/>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {saghataVillages.filter(v => v.includes(searchQuery)).map((village) => (
                    <div key={village} onClick={() => {setSelectedVillage(village); fetchMembers(village); setStep(3);}} className="bg-white p-5 rounded-2xl border border-slate-200 text-center hover:bg-indigo-50 hover:border-indigo-400 transition cursor-pointer group shadow-sm">
                        <MapPin size={24} className="mx-auto mb-2 text-indigo-500 group-hover:scale-110 transition" />
                        <span className="font-bold text-slate-700 text-sm block">{village}</span>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- STEP 3: MEMBER LIST --- */}
      {step === 3 && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
          {loading ? (
            <div className="flex flex-col items-center py-20"><Loader2 className="animate-spin text-indigo-600 mb-2"/> লোড হচ্ছে...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {members.map((m) => (
                <div key={m.id} onClick={() => handleMemberSelect(m)} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center hover:border-indigo-500 cursor-pointer transition group">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner border border-white">
                        {m.full_name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg leading-none">{m.full_name}</h4>
                      <p className="text-xs text-slate-500 mt-2 font-mono flex items-center gap-1"><Smartphone size={12}/> {m.mobile}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition">
                      <ChevronRight size={20} />
                  </div>
                </div>
              ))}
              {members.length === 0 && (
                 <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed text-slate-400">
                    <AlertCircle className="mx-auto mb-2 opacity-10" size={48}/>
                    <p>আপনার টিমে এই গ্রামে কোনো মেম্বার নেই</p>
                 </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* --- STEP 4: COLLECTION FORM --- */}
      {step === 4 && selectedMember && (
        <div className="max-w-xl mx-auto animate-in zoom-in-95 duration-300">
            
            {/* Member Profile Stats */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-indigo-50 text-center mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
                <div className="w-24 h-24 bg-indigo-50 text-indigo-700 rounded-3xl flex items-center justify-center font-bold text-4xl mx-auto mb-4 border-4 border-white shadow-md">
                    {selectedMember.full_name.charAt(0)}
                </div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{selectedMember.full_name}</h2>
                <p className="text-slate-400 font-mono text-sm mt-1">{selectedMember.mobile}</p>
                
                <div className="grid grid-cols-3 gap-3 mt-8">
                    <StatBox label="সঞ্চয়" value={stats.totalSavings} color="text-emerald-600" bg="bg-emerald-50" />
                    <StatBox label="কিস্তি" value={stats.totalInstallments} color="text-blue-600" bg="bg-blue-50" />
                    <StatBox label="ডিউ" value={stats.totalDue} color="text-red-600" bg="bg-red-50" />
                </div>
            </div>

            {/* Repayment Form */}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 space-y-6">
                <div className="flex gap-4">
                    <button type="button" onClick={() => setType('savings')} className={`flex-1 py-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${type === 'savings' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md' : 'border-slate-50 bg-slate-50 text-slate-400'}`}>
                        <Wallet size={24}/>
                        <span className="font-bold text-xs uppercase tracking-widest">সঞ্চয় জমা</span>
                    </button>
                    <button type="button" onClick={() => setType('loan')} className={`flex-1 py-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${type === 'loan' ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md' : 'border-slate-50 bg-slate-50 text-slate-400'}`}>
                        <Banknote size={24}/>
                        <span className="font-bold text-xs uppercase tracking-widest">কিস্তি জমা</span>
                    </button>
                </div>

                <div className="relative group">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">টাকার পরিমাণ</label>
                    <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 font-black text-2xl">৳</span>
                        <input 
                            type="number" required 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 font-black text-3xl text-slate-800 transition-all"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <button disabled={submitLoading} className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all flex justify-center items-center gap-3 active:scale-[0.98] disabled:opacity-70">
                    {submitLoading ? <Loader2 className="animate-spin"/> : <><CheckCircle size={24}/> কালেকশন কনফার্ম করুন</>}
                </button>
            </form>
        </div>
      )}

    </div>
  );
}

// Small UI Components
function StatBox({ label, value, color, bg }: any) {
    return (
        <div className={`${bg} p-3 rounded-2xl border border-white/50 shadow-inner`}>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-tighter">{label}</p>
            <p className={`font-black ${color} text-sm md:text-base`}>৳{value.toLocaleString()}</p>
        </div>
    )
}