'use client';

import React, { useEffect, useState } from 'react';
import { Users, Loader2, Phone, MapPin, User, Hash, Briefcase } from "lucide-react";
// আপনার ফোল্ডার অনুযায়ী supabaseClient এর পাথ ঠিক করে নেবেন
import { supabase } from '../../../../../lib/supabaseClient'; 
import { divisions, districts, upazilas, unions } from '../../../../../lib/bd-locations';

export default function VolunteerListPage() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteers = async () => {
      const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (!savedUser?.mobile) return;

      // শুধুমাত্র কারেন্ট টিম লিডারের রেফার করা ভলান্টিয়ারদের আনা হবে
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('role', 'volunteer')
        .eq('referred_by', savedUser.mobile)
        .order('created_at', { ascending: false });

      if (data) setVolunteers(data);
      setLoading(false);
    };
    fetchVolunteers();
  },[]);

  if (loading) return <div className="h-screen flex justify-center py-20"><Loader2 className="animate-spin text-[#006A4E]" size={40}/></div>;

  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 mb-8">
        <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100">
                <Users size={28} />
            </div>
            <div>
                <h2 className="text-2xl font-black text-slate-800">ভলান্টিয়ার লিস্ট</h2>
                <p className="text-sm text-slate-500 font-medium">আপনার টিমের মোট ভলান্টিয়ার: {volunteers.length} জন</p>
            </div>
        </div>
      </div>

      {volunteers.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
           <Users size={64} className="mx-auto text-slate-200 mb-4"/>
           <h3 className="text-lg font-bold text-slate-400 italic">আপনার টিমে কোনো ভলান্টিয়ার নেই</h3>
        </div>
      ) : (
        <>
          {/* --- DESKTOP VIEW: Table Format --- */}
          <div className="hidden lg:block overflow-x-auto bg-white rounded-[2rem] shadow-sm border border-slate-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase text-[11px] tracking-wider">
                  <th className="px-6 py-5 font-bold">নাম ও পেশা</th>
                  <th className="px-6 py-5 font-bold">ইউজারনেম</th>
                  <th className="px-6 py-5 font-bold">মোবাইল</th>
                  <th className="px-6 py-5 font-bold">গ্রাম ও ওয়ার্ড</th>
                  <th className="px-6 py-5 font-bold text-center">যোগাযোগ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {volunteers.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#006A4E] flex items-center justify-center font-bold">
                          {v.full_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{v.full_name}</p>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5"><Briefcase size={10}/> {v.profession || 'দেওয়া নেই'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-[#006A4E] bg-emerald-50 px-2 py-1 rounded-md text-xs">{v.username || 'N/A'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-700 text-sm flex items-center gap-1.5"><Phone size={14} className="text-slate-400"/> {v.mobile}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-700 text-sm flex items-center gap-1.5"><MapPin size={14} className="text-amber-500"/> {v.village}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">ওয়ার্ড নং: {v.ward_no || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <a href={`tel:${v.mobile}`} className="inline-flex items-center justify-center p-2.5 bg-emerald-50 text-[#006A4E] rounded-xl hover:bg-[#006A4E] hover:text-white transition-colors">
                        <Phone size={16} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- MOBILE VIEW: Card Format --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
            {volunteers.map((v) => (
              <div key={v.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#006A4E] flex items-center justify-center font-bold text-xl border border-emerald-100">
                      {v.full_name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 leading-tight text-lg">{v.full_name}</h3>
                      <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mt-0.5">Volunteer</p>
                    </div>
                  </div>
                  <a href={`tel:${v.mobile}`} className="p-2.5 bg-emerald-50 text-[#006A4E] rounded-xl">
                    <Phone size={16} />
                  </a>
                </div>

                <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
                  <p className="flex justify-between border-b border-dashed border-slate-200 pb-2">
                    <span className="text-slate-500 flex items-center gap-1.5"><User size={14}/> ইউজারনেম</span>
                    <span className="font-bold text-[#006A4E]">{v.username || 'N/A'}</span>
                  </p>
                  <p className="flex justify-between border-b border-dashed border-slate-200 pb-2 pt-1">
                    <span className="text-slate-500 flex items-center gap-1.5"><Phone size={14}/> মোবাইল</span>
                    <span className="font-bold text-slate-700">{v.mobile}</span>
                  </p>
                  <p className="flex justify-between border-b border-dashed border-slate-200 pb-2 pt-1">
                    <span className="text-slate-500 flex items-center gap-1.5"><MapPin size={14}/> গ্রাম</span>
                    <span className="font-bold text-slate-700">{v.village || 'N/A'}</span>
                  </p>
                  <p className="flex justify-between pt-1">
                    <span className="text-slate-500 flex items-center gap-1.5"><Hash size={14}/> ওয়ার্ড নং</span>
                    <span className="font-bold text-slate-700">{v.ward_no || 'N/A'}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}