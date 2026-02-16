'use client';

import React, { useEffect, useState } from 'react';
import { 
  BarChart3, Users, ClipboardList, TrendingUp, 
  Search, User, Smartphone, Award, Star, 
  Loader2, ArrowRight, Filter, ChevronRight
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function StaffReportsPage() {
  const [loading, setLoading] = useState(true);
  const [staffData, setStaffData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchStaffReports = async () => {
    setLoading(true);
    try {
      // ১. প্রথমে সব স্টাফদের লিস্ট আনা (Role = staff)
      const { data: staffList } = await supabase
        .from('members')
        .select('id, full_name, mobile, status')
        .eq('role', 'staff');

      // ২. সব মেম্বারদের ডাটা আনা (রেফারেল চেক করার জন্য)
      const { data: allMembers } = await supabase.from('members').select('referred_by');

      // ৩. সব সার্ভে ডাটা আনা (সার্ভে কাউন্ট করার জন্য)
      const { data: allSurveys } = await supabase.from('audience_survey').select('mobile'); // মোবাইল বা অন্য ইউনিক ফিল্ড

      // ৪. সব বুকিং রিকোয়েস্ট আনা
      const { data: allBookings } = await supabase.from('bookings').select('staff_id, status');

      if (staffList) {
        const formattedStaff = staffList.map(staff => {
          return {
            ...staff,
            memberCount: allMembers?.filter(m => m.referred_by === staff.mobile).length || 0,
            surveyCount: allSurveys?.length || 0, // বাস্তবে এখানে staff_id দিয়ে ফিল্টার হবে যদি কলাম থাকে
            requestCount: allBookings?.filter(b => b.staff_id === staff.mobile).length || 0,
            performance: Math.floor(Math.random() * 20) + 80 // ডামি পারফরম্যান্স স্কোর
          };
        });
        setStaffData(formattedStaff);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffReports();
  }, []);

  // সার্চ ফিল্টার
  const filteredStaff = staffData.filter(s => 
    s.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.mobile.includes(searchQuery)
  );

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
            <BarChart3 className="text-indigo-600" size={32}/> স্টাফ পারফরম্যান্স রিপোর্ট
          </h2>
          <p className="text-slate-500 mt-1">মাঠ পর্যায়ের কর্মকর্তাদের কাজের অগ্রগতি মনিটর করুন</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3.5 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="স্টাফের নাম বা মোবাইল..." 
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 shadow-sm transition"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* --- Summary Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-indigo-900 text-white p-6 rounded-[2rem] shadow-xl relative overflow-hidden group">
           <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
             <Award size={80}/>
           </div>
           <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest">সেরা কর্মকর্তা (এই মাস)</p>
           <h3 className="text-2xl font-bold mt-2">আরিফুল ইসলাম</h3>
           <div className="mt-4 flex items-center gap-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">৯৮% স্কোর</span>
           </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
                <p className="text-slate-400 text-xs font-bold uppercase">মোট মাঠকর্মী</p>
                <h3 className="text-3xl font-extrabold text-slate-800">{staffData.length} জন</h3>
            </div>
            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
                <Users size={28}/>
            </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
                <p className="text-slate-400 text-xs font-bold uppercase">মোট কালেকশন লক্ষ্যমাত্রা</p>
                <h3 className="text-3xl font-extrabold text-slate-800">৮৫%</h3>
            </div>
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                <TrendingUp size={28}/>
            </div>
        </div>
      </div>

      {/* --- Staff Table/List --- */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-600" size={40}/></div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredStaff.map((staff) => (
            <div key={staff.id} className="bg-white p-4 md:p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-all group overflow-hidden relative">
              
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                
                {/* Profile Info */}
                <div className="flex items-center gap-4 w-full lg:w-1/4">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-xl text-slate-600 shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                    {staff.full_name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg leading-none">{staff.full_name}</h4>
                    <p className="text-xs text-slate-400 font-mono mt-2 flex items-center gap-1">
                       <Smartphone size={12}/> {staff.mobile}
                    </p>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-3 gap-4 flex-1 w-full">
                  <div className="text-center p-3 bg-slate-50 rounded-2xl border border-transparent group-hover:border-indigo-100 transition">
                     <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">মেম্বার সংগ্রহ</p>
                     <p className="text-lg font-black text-indigo-600">{staff.memberCount}</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-2xl border border-transparent group-hover:border-emerald-100 transition">
                     <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">ফিল্ড সার্ভে</p>
                     <p className="text-lg font-black text-emerald-600">{staff.surveyCount}</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-2xl border border-transparent group-hover:border-orange-100 transition">
                     <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">সেবা প্রসেস</p>
                     <p className="text-lg font-black text-orange-600">{staff.requestCount}</p>
                  </div>
                </div>

                {/* Rating & Action */}
                <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-1/4 border-t lg:border-t-0 pt-4 lg:pt-0">
                   <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-500 mb-1">
                        <Star size={14} fill="currentColor"/>
                        <span className="font-bold text-sm text-slate-700">{(staff.performance / 20).toFixed(1)}</span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">স্কোর</p>
                   </div>
                   <button className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-indigo-700 transition shadow-lg flex items-center gap-2">
                     <span className="text-xs font-bold px-2">বিস্তারিত</span>
                     <ChevronRight size={18}/>
                   </button>
                </div>

              </div>

              {/* Progress Indicator Bottom */}
              <div className="absolute bottom-0 left-0 h-1 bg-indigo-500 transition-all duration-1000" style={{ width: `${staff.performance}%` }}></div>
            </div>
          ))}
          
          {filteredStaff.length === 0 && (
            <div className="text-center py-20 text-slate-400 font-bold italic bg-white rounded-3xl border border-dashed">
                কোনো স্টাফ তথ্য পাওয়া যায়নি
            </div>
          )}
        </div>
      )}
    </div>
  );
}