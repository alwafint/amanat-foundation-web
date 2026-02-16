'use client';
import React, { useEffect, useState } from 'react';
import { CalendarCheck, Phone, CheckSquare } from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient';

export default function DueListPage() {
  const [dues, setDues] = useState<any[]>([]);

  useEffect(() => {
    // ডেমো হিসেবে আজকের তারিখের ডাটা আনার লজিক
    // বাস্তবে আপনি dues টেবিল থেকে date = today দিয়ে ফিল্টার করবেন
    const fetchDues = async () => {
      // এখানে ডেমো জয়েনিং (members + dues) দেখানো হলো
      const { data } = await supabase.from('dues').select('*, members(full_name, mobile, address)').eq('status', 'pending');
      if (data) setDues(data);
    };
    fetchDues();
  }, []);

  return (
    <div className="p-4 animate-in fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex gap-2"><CalendarCheck className="text-red-500"/> আজকের টার্গেট</h2>
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">{dues.length} টি বাকি</span>
      </div>

      <div className="space-y-3">
        {dues.length > 0 ? dues.map((due) => (
          <div key={due.id} className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-red-500 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-slate-800">{due.members?.full_name}</h4>
              <p className="text-xs text-slate-500 flex gap-1 mt-1"><Phone size={12}/> {due.members?.mobile}</p>
              <p className="text-xs text-slate-400">{due.members?.address}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-extrabold text-slate-800">৳{due.amount}</p>
              <p className="text-xs text-red-500 font-bold uppercase">{due.type}</p>
            </div>
          </div>
        )) : (
          <div className="text-center py-10 text-slate-400">আজকের কোনো কালেকশন ডিউ নেই 🎉</div>
        )}
      </div>
    </div>
  );
}