'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, Users, ChevronRight, Search, 
  Building2, ArrowLeft, Smartphone, Home, 
  Loader2, UserPlus, X, Save, Lock, 
  UserCheck, FileText, Activity
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

const upazilas = ["সাঘাটা"];

export default function MemberManagement() {
  const [step, setStep] = useState(1); 
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [villageSearch, setVillageSearch] = useState('');

  const [currentUser, setCurrentUser] = useState<any>(null);

  // প্রোফাইল ভিউ স্টেট
  const [viewMember, setViewMember] = useState<any>(null);
  const [memberHistory, setMemberHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // নতুন মেম্বার ফরম স্টেট
  const [newMember, setNewMember] = useState({
    full_name: '', mobile: '', upazila: 'সাঘাটা', village: '', password: '123'
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setCurrentUser(user);
  }, []);

  // মেম্বার ফেচ করা (শুধুমাত্র লগইন করা স্টাফের মেম্বাররা)
  const fetchMembers = async (village: string) => {
    if (!currentUser?.mobile) return;
    
    setLoading(true);
    // referred_by ফিল্ড দিয়ে ফিল্টার করা হচ্ছে যাতে অন্য স্টাফের ডাটা না আসে
    const { data } = await supabase.from('members')
      .select('*')
      .eq('village', village)
      .eq('referred_by', currentUser.mobile) 
      .order('full_name', { ascending: true });
    
    if (data) setMembers(data);
    setLoading(false);
  };

  // মেম্বার একটিভ করা
  const activateMember = async (id: number) => {
    if(!confirm("আপনি কি নিশ্চিত যে এই মেম্বারকে একটিভ করবেন?")) return;
    
    const { error } = await supabase.from('members').update({ status: 'active' }).eq('id', id);
    if(error) alert(error.message);
    else {
      alert("মেম্বার সফলভাবে একটিভ হয়েছে!");
      if (selectedVillage) fetchMembers(selectedVillage);
    }
  };

  // মেম্বারের বিস্তারিত তথ্য ও ইতিহাস লোড করা
  const openProfile = async (member: any) => {
    setViewMember(member);
    setHistoryLoading(true);
    
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .eq('mobile', member.mobile)
      .order('created_at', { ascending: false });

    setMemberHistory(data || []);
    setHistoryLoading(false);
  };

  // মেম্বার এড করা
  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
        alert("স্টাফ তথ্য পাওয়া যায়নি। পুনরায় লগইন করুন।");
        return;
    }
    setLoading(true);

    try {
      const { error } = await supabase.from('members').insert([{
        ...newMember,
        role: 'member',
        status: 'active',
        // অটোমেটিক রেফারেন্স সেট করা
        referred_by: currentUser.mobile, // স্টাফের মোবাইল নম্বর রেফারেন্স আইডি হিসেবে
        reference_name: currentUser.full_name // স্টাফের নাম
      }]);

      if (error) throw error;
      alert("নতুন মেম্বার সফলভাবে যুক্ত হয়েছে!");
      setIsAddingMember(false);
      setNewMember({ full_name: '', mobile: '', upazila: 'সাঘাটা', village: '', password: '123' });
      
      // গ্রাম সিলেক্ট করা থাকলে লিস্ট রিফ্রেশ করা
      if (selectedVillage) fetchMembers(selectedVillage);
    } catch (err: any) { alert(err.message); } 
    finally { setLoading(false); }
  };

  const goBack = () => {
    if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  const filteredVillages = saghataVillages.filter(v => v.includes(villageSearch));
  const filteredMembers = members.filter(m => m.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || m.mobile.includes(searchQuery));

  return (
    <div className="relative min-h-screen animate-in fade-in duration-500 pb-10">
      
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          {step > 1 && (
            <button onClick={goBack} className="p-2 bg-slate-100 rounded-full hover:bg-emerald-100 text-emerald-700 transition">
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {step === 1 && "উপজেলা নির্বাচন"}
              {step === 2 && `${selectedUpazila} - গ্রাম নির্বাচন`}
              {step === 3 && `${selectedVillage} - মেম্বার তালিকা`}
            </h2>
            <p className="text-xs text-slate-500">গাইবান্ধা জেলা</p>
          </div>
        </div>

        <button 
          onClick={() => setIsAddingMember(true)}
          className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition active:scale-95 w-full md:w-auto justify-center text-sm"
        >
          <UserPlus size={18} /> নতুন মেম্বার
        </button>
      </div>

      {/* --- ADD MEMBER MODAL --- */}
      {isAddingMember && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-emerald-700 p-5 text-white flex justify-between items-center shrink-0">
              <h3 className="text-lg font-bold flex items-center gap-2"><UserPlus size={20}/> মেম্বার ফর্ম</h3>
              <button onClick={() => setIsAddingMember(false)} className="hover:bg-white/20 p-2 rounded-full transition"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleAddMember} className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">নাম</label>
                <input type="text" required placeholder="পুরো নাম লিখুন" className="w-full p-3.5 bg-slate-50 border rounded-xl outline-none focus:border-emerald-500" onChange={(e) => setNewMember({...newMember, full_name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">মোবাইল নম্বর</label>
                <input type="number" required placeholder="017xxxxxxxx" className="w-full p-3.5 bg-slate-50 border rounded-xl outline-none focus:border-emerald-500" onChange={(e) => setNewMember({...newMember, mobile: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">উপজেলা</label>
                    <select className="w-full p-3 bg-slate-50 border rounded-xl outline-none" onChange={(e) => setNewMember({...newMember, upazila: e.target.value})}>
                        {upazilas.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">গ্রাম</label>
                    <select required className="w-full p-3 bg-slate-50 border rounded-xl outline-none" onChange={(e) => setNewMember({...newMember, village: e.target.value})}>
                        <option value="">নির্বাচন করুন</option>
                        {saghataVillages.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
              </div>
              
              {/* Reference Info (Read Only) */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <p className="text-xs font-bold text-slate-500 mb-1">রেফারেন্স (স্টাফ)</p>
                  <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-800">{currentUser?.full_name}</span>
                      <span className="text-xs font-mono text-slate-500">{currentUser?.mobile}</span>
                  </div>
              </div>

              <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-200 flex gap-2 items-start">
                <Lock size={14} className="text-yellow-600 mt-1 shrink-0" />
                <p className="text-[11px] text-yellow-800 font-medium">লগইন পাসওয়ার্ড অটোমেটিক <b>'123'</b> সেট হবে।</p>
              </div>
              <button disabled={loading} className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition shadow-lg">
                {loading ? <Loader2 className="animate-spin"/> : <><Save size={18}/> সেভ করুন</>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MEMBER PROFILE MODAL (Same as before) --- */}
      {viewMember && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in zoom-in-95 duration-200">
           <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="bg-slate-900 text-white p-6 flex justify-between items-start shrink-0">
                  <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-slate-800">
                          {viewMember.full_name.charAt(0)}
                      </div>
                      <div>
                          <h3 className="text-2xl font-bold">{viewMember.full_name}</h3>
                          <p className="text-slate-400 text-sm flex items-center gap-1 font-mono"><Smartphone size={14}/> {viewMember.mobile}</p>
                          <div className="flex gap-2 mt-2">
                             <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${viewMember.status === 'active' ? 'bg-green-500 text-black' : 'bg-yellow-500 text-black'}`}>
                                {viewMember.status}
                             </span>
                             <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-white border border-slate-600">
                                {viewMember.village}, {viewMember.upazila}
                             </span>
                          </div>
                      </div>
                  </div>
                  <button onClick={() => setViewMember(null)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"><X size={24}/></button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar bg-slate-50 flex-grow">
                  <h4 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                      <Activity size={20} className="text-emerald-600"/> সকল কার্যক্রমের ইতিহাস
                  </h4>
                  {historyLoading ? (
                      <div className="text-center py-10"><Loader2 className="animate-spin text-emerald-600 mx-auto"/> লোড হচ্ছে...</div>
                  ) : (
                      <div className="space-y-3">
                          {memberHistory.length > 0 ? memberHistory.map((item: any) => (
                              <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-emerald-300 transition">
                                  <div>
                                      <div className="flex items-center gap-2 mb-1">
                                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{item.service_category}</span>
                                          <span className="text-xs text-slate-400 font-mono">{new Date(item.created_at).toLocaleDateString('bn-BD')}</span>
                                      </div>
                                      <h5 className="font-bold text-slate-800">{item.item_name}</h5>
                                      <p className="text-xs text-slate-500 mt-1">{item.quantity}</p>
                                  </div>
                                  <div className="text-right">
                                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.status}</span>
                                  </div>
                              </div>
                          )) : (
                              <div className="text-center py-10 text-slate-400 bg-white rounded-xl border border-dashed"><FileText className="mx-auto mb-2 opacity-20" size={32}/><p>কোনো রেকর্ড নেই</p></div>
                          )}
                      </div>
                  )}
              </div>
              
              <div className="p-4 bg-white border-t flex justify-end gap-3 shrink-0">
                  <a href={`tel:${viewMember.mobile}`} className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-bold text-sm border border-emerald-200 hover:bg-emerald-100 transition">কল করুন</a>
                  {viewMember.status === 'pending' && (
                      <button onClick={() => activateMember(viewMember.id)} className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold text-sm hover:bg-emerald-700 transition shadow-md">আইডি একটিভ করুন</button>
                  )}
              </div>
           </div>
        </div>
      )}

      {/* --- STEP 1: UPAZILA --- */}
      {step === 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {upazilas.map((u) => (
            <div key={u} onClick={() => {setSelectedUpazila(u); setStep(2);}} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-500 hover:shadow-xl transition cursor-pointer group flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition"><Building2 size={24} /></div>
                <span className="font-bold text-slate-700 text-lg">{u}</span>
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-emerald-500" />
            </div>
          ))}
        </div>
      )}

      {/* --- STEP 2: VILLAGE --- */}
      {step === 2 && (
        <div className="animate-in slide-in-from-right-4">
            <div className="relative mb-6">
                <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
                <input type="text" placeholder="গ্রামের নাম খুঁজুন..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm outline-none focus:border-emerald-500" onChange={(e) => setVillageSearch(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredVillages.map((village) => (
                    <div key={village} onClick={() => {setSelectedVillage(village); fetchMembers(village); setStep(3);}} className="bg-white p-4 rounded-xl border border-slate-200 text-center hover:bg-emerald-50 hover:border-emerald-400 transition cursor-pointer group shadow-sm">
                        <MapPin size={20} className="mx-auto mb-2 text-emerald-500 group-hover:scale-110 transition" />
                        <span className="font-bold text-slate-700 text-sm block">{village}</span>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- STEP 3: MEMBER LIST --- */}
      {step === 3 && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3.5 text-slate-400" size={20} />
            <input type="text" placeholder="মেম্বার খুঁজুন..." className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm outline-none focus:border-emerald-500" onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          {loading ? (
            <div className="text-center py-20 text-slate-400 flex flex-col items-center"><Loader2 className="animate-spin mb-2 text-emerald-600"/> লোড হচ্ছে...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMembers.map((m) => (
                <div key={m.id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center group hover:border-emerald-300 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-bold text-xl">{m.full_name.charAt(0)}</div>
                    <div>
                      <h4 className="font-bold text-slate-800">{m.full_name}</h4>
                      <p className="text-xs text-slate-500 font-mono mt-1"><Smartphone size={12} className="inline mr-1"/> {m.mobile}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded mt-1 inline-block font-bold uppercase ${m.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{m.status}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {m.status === 'pending' && (
                        <button onClick={() => activateMember(m.id)} className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm hover:bg-emerald-700 flex items-center gap-1"><UserCheck size={12}/> একটিভ করুন</button>
                    )}
                    <button onClick={() => openProfile(m)} className="text-xs font-bold text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition border border-emerald-100">প্রোফাইল</button>
                  </div>
                </div>
              ))}
              {members.length === 0 && (
                <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400"><Users className="mx-auto mb-2 opacity-20" size={48} /><p>এই গ্রামে আপনার কোনো মেম্বার নেই</p></div>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
}