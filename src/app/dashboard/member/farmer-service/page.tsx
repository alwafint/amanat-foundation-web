'use client';

import React, { useState, useEffect } from 'react';
import { 
  Tractor, Wheat, Sprout, ShoppingCart, 
  PhoneCall, X, Calendar, Ruler, Info,
  Banknote, Truck, CalendarCheck // <--- এখানে CalendarCheck যোগ করা হয়েছে
} from "lucide-react";
// আপনার ফোল্ডার স্ট্রাকচার অনুযায়ী পাথ ঠিক রাখুন
import { supabase } from '../../../../lib/supabaseClient'; 

// --- কনফিগারেশন ডাটা ---
const machines = [
  { id: 1, name: "পাওয়ার টিলার", desc: "জমি চাষ ও মই দেওয়ার জন্য।" },
  { id: 2, name: "বেড প্লান্টার", desc: "আলু ও সরিষার জন্য বেড বা নালা তৈরি করতে।" },
  { id: 3, name: "রাইস ট্রান্সপ্লান্টার", desc: "চারা তুলে মেশিনের মাধ্যমে সারিবদ্ধভাবে ধান রোপণ।" },
  { id: 4, name: "গুটি ইউরিয়া অ্যাপলিকেটর", desc: "সঠিক গভীরে ইউরিয়া সার প্রয়োগের যন্ত্র।" },
  { id: 5, name: "নিড়ানি যন্ত্র", desc: "ধানের জমির আগাছা পরিষ্কার করার জন্য।" },
  { id: 6, name: "কম্বাইন হারভেস্টার", desc: "একই সাথে ধান কাটা, মাড়াই ও ঝাড়াই করা যায়।" },
  { id: 7, name: "পটেটো প্লান্টার", desc: "স্বয়ংক্রিয়ভাবে আলুর বীজ রোপণ করার যন্ত্র।" },
  { id: 8, name: "পটেটো ডিগার", desc: "মাটির নিচ থেকে আলু তোলার যন্ত্র।" },
  { id: 9, name: "সিড ড্রিল মেশিন", desc: "সারিবদ্ধভাবে নির্দিষ্ট দূরত্বে বীজ বপন করা যায়।" },
  { id: 10, name: "পাওয়ার স্প্রেয়ার", desc: "কীটনাশক স্প্রে করার জন্য।" },
  { id: 11, name: "গ্রেইন ময়েশ্চার মিটার", desc: "আর্দ্রতা মাপার যন্ত্র।" }
];

export default function FarmerServicePage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  // --- STATES: MODALS OPEN/CLOSE ---
  const [activeModal, setActiveModal] = useState<null | 'machine' | 'grain' | 'input' | 'sell'>(null);

  // --- STATES: FORM DATA ---
  // Machinery
  const [selectedMachine, setSelectedMachine] = useState('');
  const [landAmount, setLandAmount] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  
  // Grain Bank
  const [cropType, setCropType] = useState('');
  const [cropQuantity, setCropQuantity] = useState('');
  const [depositDate, setDepositDate] = useState('');
  const [needLoan, setNeedLoan] = useState(false);

  // Seed & Fertilizer
  const [inputType, setInputType] = useState<'Seed' | 'Fertilizer'>('Seed');
  const [inputName, setInputName] = useState('');
  const [inputQty, setInputQty] = useState('');
  const [paymentMode, setPaymentMode] = useState('cash');

  // Crop Sell
  const [sellCropName, setSellCropName] = useState('');
  const [sellQty, setSellQty] = useState('');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');

  // --- INITIALIZATION ---
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(localUser);
    const today = new Date().toISOString().split('T')[0];
    setBookingDate(today);
    setDepositDate(today);
  }, []);

  const currentMachineDetails = machines.find(m => m.name === selectedMachine);

  // --- COMMON SUBMIT HANDLER ---
  const submitData = async (category: string, item: string, qty: string, extraInfo: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.from('bookings').insert([{
        member_name: user?.full_name || 'Guest',
        mobile: user?.mobile,
        service_category: category,
        item_name: item,
        quantity: qty,
        required_date: bookingDate || depositDate, // তারিখ যেটা সেট থাকবে
        status: 'pending',
        assigned_staff: extraInfo
      }]);

      if (error) throw error;
      alert("আবেদন সফল হয়েছে! আমাদের প্রতিনিধি শীঘ্রই যোগাযোগ করবেন।");
      setActiveModal(null); // মডাল বন্ধ
      
      // রিসেট ফিল্ডস (Reset)
      setSelectedMachine(''); setLandAmount('');
      setCropType(''); setCropQuantity(''); setNeedLoan(false);
      setInputName(''); setInputQty('');
      setSellCropName(''); setSellQty(''); setExpectedPrice('');

    } catch (err: any) {
      alert("সমস্যা হয়েছে: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-600 rounded-2xl p-6 md:p-8 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">কৃষক সেবা কেন্দ্র</h1>
          <p className="text-emerald-100 text-sm md:text-base opacity-90">
            আধুনিক কৃষি প্রযুক্তি, বীজ-সার এবং ন্যায্য মূল্যে ফসল বিক্রির বিশ্বস্ত মাধ্যম।
          </p>
        </div>
      </div>

      {/* --- SERVICE CARDS GRID --- 
          পরিবর্তন: lg:grid-cols-4 করা হয়েছে যাতে ল্যাপটপে ৪টি কার্ড এক সারিতে থাকে 
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 1. কৃষি যন্ত্রপাতি */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-emerald-300 transition group hover:-translate-y-1 duration-300 relative overflow-hidden h-full flex flex-col">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-emerald-100"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <Tractor size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">কৃষি যন্ত্রপাতি</h3>
            <p className="text-slate-500 mb-6 text-sm flex-grow">পাওয়ার টিলার, হারভেস্টার সহ আধুনিক সব যন্ত্রপাতি ভাড়া নিন।</p>
            <button onClick={() => setActiveModal('machine')} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 mt-auto">
              বুকিং দিন
            </button>
          </div>
        </div>

        {/* 2. শস্য ব্যাংক */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-yellow-300 transition group hover:-translate-y-1 duration-300 relative overflow-hidden h-full flex flex-col">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-50 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-yellow-100"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-14 h-14 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <Wheat size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">শস্য ব্যাংক</h3>
            <p className="text-slate-500 mb-6 text-sm flex-grow">ফসল গোডাউনে রেখে লোন নিন অথবা পরে বেশি দামে বিক্রি করুন।</p>
            <button onClick={() => setActiveModal('grain')} className="w-full bg-yellow-500 text-white py-3 rounded-xl font-bold hover:bg-yellow-600 transition shadow-lg shadow-yellow-200 mt-auto">
              আবেদন করুন
            </button>
          </div>
        </div>

        {/* 3. বীজ ও সার */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 transition group hover:-translate-y-1 duration-300 relative overflow-hidden h-full flex flex-col">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-blue-100"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <Sprout size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">বীজ ও সার</h3>
            <p className="text-slate-500 mb-6 text-sm flex-grow">উন্নত মানের বীজ এবং সার বাকিতে বা ভর্তুকি মূল্যে অর্ডার করুন।</p>
            <button onClick={() => setActiveModal('input')} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 mt-auto">
              অর্ডার করুন
            </button>
          </div>
        </div>

        {/* 4. ফসল বিক্রি */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-purple-300 transition group hover:-translate-y-1 duration-300 relative overflow-hidden h-full flex flex-col">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-purple-100"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-14 h-14 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <ShoppingCart size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">ফসল বিক্রি</h3>
            <p className="text-slate-500 mb-6 text-sm flex-grow">মধ্যস্বত্বভোগী ছাড়া সরাসরি পাইকারদের কাছে ফসল বিক্রি করুন।</p>
            <button onClick={() => setActiveModal('sell')} className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-200 mt-auto">
              বিক্রির তথ্য দিন
            </button>
          </div>
        </div>

      </div>

      {/* ================= MODALS (UNCHANGED) ================= */}

      {/* 1. MACHINERY MODAL */}
      {activeModal === 'machine' && (
        <ModalWrapper title="কৃষি যন্ত্রপাতি বুকিং" icon={<Tractor size={24} className="text-yellow-300"/>} onClose={() => setActiveModal(null)} colorClass="from-emerald-700 to-emerald-600">
          <p className="text-yellow-200 text-xs mb-4 font-medium bg-black/20 p-3 rounded-lg border border-white/10 leading-relaxed">
            বিঃদ্রঃ যন্ত্রপাতির পরিবহন, জ্বালানি ও অপারেটরের খরচ আপনাকে বহন করতে হবে।
          </p>
          <form onSubmit={(e) => { e.preventDefault(); submitData('Machinery', selectedMachine, landAmount + ' শতাংশ', 'Rental'); }} className="space-y-6">
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">যন্ত্রের নাম <span className="text-red-500">*</span></label>
              <select required value={selectedMachine} onChange={(e) => setSelectedMachine(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-emerald-500">
                <option value="">তালিকায় ক্লিক করুন...</option>
                {machines.map((m) => <option key={m.id} value={m.name}>{m.name}</option>)}
              </select>
              {currentMachineDetails && (
                <div className="mt-3 p-3 bg-emerald-50 border border-emerald-100 rounded-lg flex gap-3 text-sm text-emerald-800 font-medium">
                  <Info className="shrink-0" size={18} /> {currentMachineDetails.desc}
                </div>
              )}
            </div>
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">জমির পরিমাণ (শতাংশ) <span className="text-red-500">*</span></label>
              <div className="relative"><Ruler className="absolute left-4 top-4 text-slate-400" size={20} />
              <input type="number" required value={landAmount} onChange={(e) => setLandAmount(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-emerald-500" placeholder="৩০" /></div>
            </div>
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">কবে লাগবে? <span className="text-red-500">*</span></label>
              <div className="relative"><Calendar className="absolute left-4 top-4 text-slate-400" size={20} />
              <input type="date" required value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-emerald-500" /></div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-emerald-700 text-white py-4 rounded-xl text-lg font-bold hover:bg-emerald-800 transition shadow-lg">{loading ? 'অপেক্ষা করুন...' : 'বুকিং নিশ্চিত করুন'}</button>
          </form>
        </ModalWrapper>
      )}

      {/* 2. GRAIN BANK MODAL */}
      {activeModal === 'grain' && (
        <ModalWrapper title="শস্য ব্যাংক আবেদন" icon={<Wheat size={24} className="text-white"/>} onClose={() => setActiveModal(null)} colorClass="from-yellow-600 to-orange-500">
          <p className="text-yellow-100 text-xs mb-4 font-medium bg-white/20 p-3 rounded-lg border border-white/20">শর্তাবলী: ফসল অবশ্যই শুকানো (১৪% আর্দ্রতা) এবং ঝাড়াই করা পরিষ্কার হতে হবে।</p>
          <form onSubmit={(e) => { e.preventDefault(); submitData('GrainBank', cropType, cropQuantity + ' মন', needLoan ? 'Loan Requested' : 'Storage Only'); }} className="space-y-6">
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">ফসলের ধরন <span className="text-red-500">*</span></label>
              <select required value={cropType} onChange={(e) => setCropType(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-yellow-500">
                <option value="">নির্বাচন করুন...</option>
                {['ধান', 'ভুট্টা', 'গম', 'সরিষা', 'আলু'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">পরিমাণ (মন) <span className="text-red-500">*</span></label>
              <input type="number" required value={cropQuantity} onChange={(e) => setCropQuantity(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-yellow-500" placeholder="৫০" />
            </div>
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">গুদামে কবে আনবেন? <span className="text-red-500">*</span></label>
              <input type="date" required value={depositDate} onChange={(e) => setDepositDate(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-yellow-500" />
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 flex items-center gap-3">
              <input type="checkbox" checked={needLoan} onChange={(e) => setNeedLoan(e.target.checked)} className="w-5 h-5 text-yellow-600 rounded focus:ring-yellow-500" />
              <label className="text-slate-700 font-medium">তাৎক্ষণিক লোন প্রয়োজন?</label>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-yellow-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-yellow-700 transition shadow-lg">{loading ? 'অপেক্ষা করুন...' : 'আবেদন নিশ্চিত করুন'}</button>
          </form>
        </ModalWrapper>
      )}

      {/* 3. SEED & FERTILIZER MODAL */}
      {activeModal === 'input' && (
        <ModalWrapper title="বীজ ও সার অর্ডার" icon={<Sprout size={24} className="text-white"/>} onClose={() => setActiveModal(null)} colorClass="from-blue-600 to-cyan-500">
          <form onSubmit={(e) => { e.preventDefault(); submitData('AgriInput', `${inputType}: ${inputName}`, inputQty, paymentMode === 'credit' ? 'Credit Request' : 'Cash'); }} className="space-y-6">
            <div className="flex p-1 bg-slate-100 rounded-xl mb-4">
              {['Seed', 'Fertilizer'].map((type) => (
                <button key={type} type="button" onClick={() => setInputType(type as any)} className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${inputType === type ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>
                  {type === 'Seed' ? 'বীজ (Seeds)' : 'সার (Fertilizer)'}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">পণ্যের নাম <span className="text-red-500">*</span></label>
              <select required value={inputName} onChange={(e) => setInputName(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-blue-500">
                <option value="">নির্বাচন করুন...</option>
                {inputType === 'Seed' 
                  ? ['BR-28 ধান বীজ', 'হাইব্রিড ধান বীজ', 'ভুট্টা বীজ (পাইওনিয়ার)', 'সরিষা বীজ'].map(i => <option key={i} value={i}>{i}</option>)
                  : ['ইউরিয়া', 'টিএসপি', 'পটাশ', 'জিপসাম', 'জিংক'].map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">পরিমাণ (কেজি/বস্তা) <span className="text-red-500">*</span></label>
              <input type="text" required value={inputQty} onChange={(e) => setInputQty(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-blue-500" placeholder="১০ কেজি" />
            </div>
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">পেমেন্ট পদ্ধতি</label>
              <div className="grid grid-cols-2 gap-4">
                <div onClick={() => setPaymentMode('cash')} className={`border-2 p-4 rounded-xl cursor-pointer text-center ${paymentMode === 'cash' ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}`}>
                  <Banknote className="mx-auto mb-2 text-blue-600"/> <span className="font-bold text-slate-700">নগদ</span>
                </div>
                <div onClick={() => setPaymentMode('credit')} className={`border-2 p-4 rounded-xl cursor-pointer text-center ${paymentMode === 'credit' ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}`}>
                  <CalendarCheck className="mx-auto mb-2 text-blue-600"/> <span className="font-bold text-slate-700">বাকিতে (ফসল উঠলে)</span>
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition shadow-lg">{loading ? 'অপেক্ষা করুন...' : 'অর্ডার নিশ্চিত করুন'}</button>
          </form>
        </ModalWrapper>
      )}

      {/* 4. CROP SELL MODAL */}
      {activeModal === 'sell' && (
        <ModalWrapper title="ফসল বিক্রি" icon={<ShoppingCart size={24} className="text-white"/>} onClose={() => setActiveModal(null)} colorClass="from-purple-700 to-pink-600">
          <form onSubmit={(e) => { e.preventDefault(); submitData('CropSell', sellCropName, `${sellQty} মন (দর: ${expectedPrice})`, deliveryMethod); }} className="space-y-6">
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">কী বিক্রি করবেন? <span className="text-red-500">*</span></label>
              <select required value={sellCropName} onChange={(e) => setSellCropName(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-purple-500">
                <option value="">নির্বাচন করুন...</option>
                {['ধান', 'ভুট্টা', 'পাট', 'সরিষা', 'আলু'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-bold text-slate-700 mb-2">পরিমাণ (মন)</label>
                <input type="number" required value={sellQty} onChange={(e) => setSellQty(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-purple-500" placeholder="৫০" />
              </div>
              <div>
                <label className="block text-base font-bold text-slate-700 mb-2">চাহিদা দর (প্রতি মন)</label>
                <input type="number" value={expectedPrice} onChange={(e) => setExpectedPrice(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-purple-500" placeholder="১২০০" />
              </div>
            </div>
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">ডেলিভারি পদ্ধতি</label>
              <div className="grid grid-cols-2 gap-4">
                <div onClick={() => setDeliveryMethod('pickup')} className={`border-2 p-4 rounded-xl cursor-pointer text-center ${deliveryMethod === 'pickup' ? 'border-purple-500 bg-purple-50' : 'border-slate-200'}`}>
                  <Truck className="mx-auto mb-2 text-purple-600"/> <span className="font-bold text-slate-700 text-sm">নিয়ে যান (Pickup)</span>
                </div>
                <div onClick={() => setDeliveryMethod('dropoff')} className={`border-2 p-4 rounded-xl cursor-pointer text-center ${deliveryMethod === 'dropoff' ? 'border-purple-500 bg-purple-50' : 'border-slate-200'}`}>
                  <Tractor className="mx-auto mb-2 text-purple-600"/> <span className="font-bold text-slate-700 text-sm">দিয়ে আসব (Drop)</span>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-center text-sm font-medium text-purple-800">
              আজকের বাজার দর জানতে কল করুন: 017XX-XXXXXX
            </div>
            <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-purple-700 transition shadow-lg">{loading ? 'অপেক্ষা করুন...' : 'বিক্রির প্রস্তাব দিন'}</button>
          </form>
        </ModalWrapper>
      )}

    </div>
  );
}

// --- REUSABLE MODAL WRAPPER COMPONENT ---
function ModalWrapper({ title, icon, onClose, colorClass, children }: any) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className={`bg-gradient-to-r ${colorClass} p-5 text-white shrink-0 flex justify-between items-center`}>
          <h3 className="text-xl font-bold flex items-center gap-2">{icon} {title}</h3>
          <button onClick={onClose} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition text-white"><X size={24} /></button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}