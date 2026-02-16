'use client';

import React, { useEffect, useState } from 'react';
import { 
  Database, Users, Briefcase, TrendingUp, 
  MapPin, Loader2, ArrowRight, PieChart, 
  Target, Info, CheckCircle
} from "lucide-react";
// সঠিক রিলেটিভ পাথ (৪ ধাপ পেছনে)
import { supabase } from '../../../../lib/supabaseClient';

export default function AudienceInsights() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalFamilies: 0,
    totalPopulation: 0,
    totalEarning: 0,
    totalUnemployed: 0,
  });
  const [villageStats, setVillageStats] = useState<any[]>([]);

  useEffect(() => {
    fetchAudienceData();
  }, []);

  const fetchAudienceData = async () => {
    setLoading(true);
    try {
      // ১. ডাটাবেজ থেকে সব সার্ভে ডাটা আনা
      const { data, error } = await supabase
        .from('audience_survey')
        .select('*');

      if (error) throw error;

      if (data) {
        // ২. গ্লোবাল পরিসংখ্যান হিসাব করা
        const population = data.reduce((sum, item) => sum + (Number(item.total_members) || 0), 0);
        const earners = data.reduce((sum, item) => sum + (Number(item.earning_members) || 0), 0);
        const unemployed = data.reduce((sum, item) => sum + (Number(item.unemployed_members) || 0), 0);

        setStats({
          totalFamilies: data.length,
          totalPopulation: population,
          totalEarning: earners,
          totalUnemployed: unemployed
        });

        // ৩. গ্রাম ভিত্তিক ডাটা গ্রুপিং
        const villageMap: any = {};
        data.forEach(item => {
          const vName = item.address?.split(',')[0] || 'Unknown'; // ঠিকানা থেকে প্রথম অংশ (গ্রাম) নেওয়া
          if (!villageMap[vName]) villageMap[vName] = 0;
          villageMap[vName]++;
        });

        const formattedVillages = Object.entries(villageMap).map(([name, count]) => ({
          name,
          count
        })).sort((a: any, b: any) => b.count - a.count);

        setVillageStats(formattedVillages);
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
      <p className="text-slate-400 font-medium">বিশ্লেষণ করা হচ্ছে...</p>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      
      {/* --- Page Header --- */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Database className="text-indigo-600" /> ওডিইয়েন্স ডাটা বিশ্লেষণ
        </h2>
        <p className="text-slate-500 mt-1">মাঠ পর্যায়ের তথ্যের ভিত্তিতে আমাদের পরবর্তী কর্মপরিকল্পনা</p>
      </div>

      {/* --- Global Summary Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="মোট জরিপকৃত পরিবার" value={stats.totalFamilies} icon={<Users size={24}/>} color="bg-blue-600" />
        <StatCard label="মোট জনসংখ্যা (সার্ভে)" value={stats.totalPopulation} icon={<Target size={24}/>} color="bg-indigo-600" />
        <StatCard label="মোট উপার্জনকারী" value={stats.totalEarning} icon={<CheckCircle size={24}/>} color="bg-emerald-600" />
        <StatCard label="মোট বেকার (টার্গেট)" value={stats.totalUnemployed} icon={<Briefcase size={24}/>} color="bg-rose-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Side: Unemployment Analysis --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-5"><PieChart size={120}/></div>
             <h3 className="text-xl font-bold text-slate-800 mb-6">বেকারত্ব ও আয়ের অনুপাত</h3>
             
             {/* Progress Bars */}
             <div className="space-y-6">
                <div>
                   <div className="flex justify-between mb-2 text-sm font-bold text-slate-600">
                      <span>উপার্জনকারী জনবল</span>
                      <span className="text-emerald-600">{((stats.totalEarning / stats.totalPopulation) * 100).toFixed(1)}%</span>
                   </div>
                   <div className="w-full bg-slate-100 rounded-full h-3">
                      <div className="bg-emerald-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${(stats.totalEarning / stats.totalPopulation) * 100}%` }}></div>
                   </div>
                </div>

                <div>
                   <div className="flex justify-between mb-2 text-sm font-bold text-slate-600">
                      <span>বেকার (প্রশিক্ষণ প্রয়োজন)</span>
                      <span className="text-rose-600">{((stats.totalUnemployed / stats.totalPopulation) * 100).toFixed(1)}%</span>
                   </div>
                   <div className="w-full bg-slate-100 rounded-full h-3">
                      <div className="bg-rose-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${(stats.totalUnemployed / stats.totalPopulation) * 100}%` }}></div>
                   </div>
                </div>
             </div>

             <div className="mt-8 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex gap-3">
                <Info className="text-indigo-600 shrink-0" size={20}/>
                <p className="text-xs text-indigo-800 leading-relaxed italic">
                  এই তথ্যগুলো আমাদের জানান দিচ্ছে যে এলাকায় বেকারত্ব কমানোর জন্য আরও কারিগরি প্রশিক্ষণের ব্যবস্থা করা জরুরি।
                </p>
             </div>
          </div>
        </div>

        {/* --- Right Side: Village Coverage --- */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-full">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <MapPin size={20} className="text-indigo-600" /> এলাকা ভিত্তিক কভারেজ
            </h3>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {villageStats.map((village, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-indigo-50 transition border border-transparent hover:border-indigo-100">
                   <span className="font-bold text-slate-700 text-sm">{village.name}</span>
                   <span className="bg-white px-3 py-1 rounded-lg text-xs font-bold text-indigo-600 shadow-sm">
                      {village.count} টি পরিবার
                   </span>
                </div>
              ))}
              {villageStats.length === 0 && <p className="text-center text-slate-400 py-10">কোনো ডাটা নেই</p>}
            </div>

            <button className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition flex items-center justify-center gap-2">
              বিস্তারিত রিপোর্ট <ArrowRight size={16}/>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

// --- Helper Components ---
function StatCard({ label, value, icon, color }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 group hover:shadow-md transition">
      <div className={`p-3 rounded-xl text-white ${color} shadow-lg transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{label}</p>
        <h4 className="text-xl font-black text-slate-800">{value.toLocaleString()}</h4>
      </div>
    </div>
  );
}