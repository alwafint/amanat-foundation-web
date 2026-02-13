'use client';

import React, { useState, useEffect } from 'react';
import { 
  Scale, FileCheck, Ruler, Users, FileText, 
  ShieldCheck, X, Calendar, MapPin, PenTool 
} from "lucide-react";
// আপনার ফোল্ডার স্ট্রাকচার অনুযায়ী পাথ ঠিক রাখুন
import { supabase } from '../../../../lib/supabaseClient'; 

export default function LegalAidPage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  // --- STATES: MODALS OPEN/CLOSE ---
  const [activeModal, setActiveModal] = useState<null | 'deed' | 'survey' | 'arbitration' | 'lawyer' | 'agreement' | 'gd'>(null);

  // --- STATES: FORM DATA ---
  const [mobile, setMobile] = useState('');
  
  // 1. Deed Verification
  const [deedNo, setDeedNo] = useState('');
  const [mouzaName, setMouzaName] = useState('');
  
  // 2. Land Survey
  const [landAmount, setLandAmount] = useState('');
  const [location, setLocation] = useState('');
  const [surveyDate, setSurveyDate] = useState('');

  // 3. Arbitration
  const [opponentName, setOpponentName] = useState('');
  const [disputeType, setDisputeType] = useState('জমি সংক্রান্ত');
  const [disputeDetails, setDisputeDetails] = useState('');

  // 4. Lawyer
  const [caseType, setCaseType] = useState('দেওয়ানি (Civil)');
  const [consultTime, setConsultTime] = useState('');

  // 5. Agreement (New)
  const [docType, setDocType] = useState('হলফনামা (Affidavit)');
  const [docDetails, setDocDetails] = useState('');

  // 6. GD Drafting (New)
  const [thanaName, setThanaName] = useState('');
  const [gdSubject, setGdSubject] = useState('');

  // --- INITIALIZATION ---
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(localUser);
    if(localUser?.mobile) setMobile(localUser.mobile);
    
    const today = new Date().toISOString().split('T')[0];
    setSurveyDate(today);
  }, []);

  // --- COMMON SUBMIT HANDLER ---
  const submitData = async (serviceName: string, details: string, scheduleDate: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.from('bookings').insert([{
        member_name: user?.full_name || 'Guest',
        mobile: mobile,
        service_category: 'Legal Aid',
        item_name: serviceName,
        description: details,
        required_date: scheduleDate,
        status: 'pending'
      }]);

      if (error) throw error;
      alert("আবেদন সফল হয়েছে! আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।");
      setActiveModal(null);
      
      // রিসেট
      setDeedNo(''); setMouzaName('');
      setLandAmount(''); setLocation('');
      setOpponentName(''); setDisputeDetails('');
      setDocDetails(''); setGdSubject('');

    } catch (err: any) {
      alert("সমস্যা হয়েছে: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-800 rounded-2xl p-6 md:p-8 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">আইনি সহায়তা কেন্দ্র</h1>
          <p className="text-indigo-100 text-sm md:text-base opacity-90">
            গ্রামের মানুষের জন্য সহজ ও সাশ্রয়ী আইনি সেবা।
          </p>
        </div>
      </div>

      {/* --- SERVICE CARDS GRID (6 Services) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. দলিল যাচাই */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-emerald-300 transition group hover:-translate-y-1 duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-emerald-100"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <FileCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">দলিল যাচাই</h3>
            <p className="text-slate-500 mb-6 text-sm h-10">জমি কেনার আগে দলিল আসল না নকল তা আইনজীবীর মাধ্যমে যাচাই করুন।</p>
            <button onClick={() => setActiveModal('deed')} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">
              যাচাই করুন
            </button>
          </div>
        </div>

        {/* 2. জমি মাপা (সার্ভে) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 transition group hover:-translate-y-1 duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-blue-100"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <Ruler size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">জমি মাপা (সার্ভে)</h3>
            <p className="text-slate-500 mb-6 text-sm h-10">ডিজিটাল মেশিনে অভিজ্ঞ সার্ভেয়ার বা আমিন দিয়ে জমি মাপজোক।</p>
            <button onClick={() => setActiveModal('survey')} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
              আমিন ডাকুন
            </button>
          </div>
        </div>

        {/* 3. পারিবারিক সালিশ */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-purple-300 transition group hover:-translate-y-1 duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-purple-100"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">পারিবারিক সালিশ</h3>
            <p className="text-slate-500 mb-6 text-sm h-10">পারিবারিক কলহ বা বিবাদ মেটাতে স্থানীয় সালিশের ব্যবস্থা।</p>
            <button onClick={() => setActiveModal('arbitration')} className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-200">
              আবেদন করুন
            </button>
          </div>
        </div>

        {/* 4. আইনজীবীর পরামর্শ */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-300 transition group hover:-translate-y-1 duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-indigo-100"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <Scale size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">আইনজীবীর পরামর্শ</h3>
            <p className="text-slate-500 mb-6 text-sm h-10">মামলা-মোকদ্দমা বা আইনি নোটিশের জন্য উকিলের সাথে কথা বলুন।</p>
            <button onClick={() => setActiveModal('lawyer')} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
              পরামর্শ নিন
            </button>
          </div>
        </div>

        {/* 5. চুক্তিপত্র ও হলফনামা (NEW) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-cyan-300 transition group hover:-translate-y-1 duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-50 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-cyan-100"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <FileText size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">চুক্তিপত্র ও হলফনামা</h3>
            <p className="text-slate-500 mb-6 text-sm h-10">জমি বন্ধক, দোকান ভাড়া, এফিডেভিট বা স্ট্যাম্পের কাজ।</p>
            <button onClick={() => setActiveModal('agreement')} className="w-full bg-cyan-600 text-white py-3 rounded-xl font-bold hover:bg-cyan-700 transition shadow-lg shadow-cyan-200">
              ড্রাফট তৈরি করুন
            </button>
          </div>
        </div>

        {/* 6. জিডি ড্রাফটিং (NEW) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-red-300 transition group hover:-translate-y-1 duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-red-100"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-red-100 text-red-700 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">জিডি ড্রাফটিং</h3>
            <p className="text-slate-500 mb-6 text-sm h-10">হারানো বিজ্ঞপ্তি বা নিরাপত্তার জন্য থানায় জিডি লিখে দেওয়া হয়।</p>
            <button onClick={() => setActiveModal('gd')} className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-200">
              জিডি লিখুন
            </button>
          </div>
        </div>

      </div>

      {/* ================= MODALS ================= */}

      {/* 1. DEED VERIFICATION */}
      {activeModal === 'deed' && (
        <ModalWrapper title="দলিল যাচাই" icon={<FileCheck size={24} className="text-white"/>} onClose={() => setActiveModal(null)} colorClass="from-emerald-700 to-emerald-600">
          <form onSubmit={(e) => { e.preventDefault(); submitData('দলিল যাচাই', `মৌজা: ${mouzaName}, দলিল নং: ${deedNo}`, 'N/A'); }} className="space-y-6">
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">মৌজার নাম</label>
              <input type="text" required value={mouzaName} onChange={(e) => setMouzaName(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-emerald-500" placeholder="রসুলপুর" />
            </div>
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">দলিল নম্বর</label>
              <input type="text" value={deedNo} onChange={(e) => setDeedNo(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-emerald-500" placeholder="12345" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-emerald-700 text-white py-4 rounded-xl text-lg font-bold hover:bg-emerald-800 transition shadow-lg">আবেদন করুন</button>
          </form>
        </ModalWrapper>
      )}

      {/* 2. LAND SURVEY */}
      {activeModal === 'survey' && (
        <ModalWrapper title="জমি মাপা / আমিন" icon={<Ruler size={24} className="text-white"/>} onClose={() => setActiveModal(null)} colorClass="from-blue-600 to-blue-500">
          <form onSubmit={(e) => { e.preventDefault(); submitData('জমি মাপা', `পরিমাণ: ${landAmount} শতাংশ, স্থান: ${location}`, surveyDate); }} className="space-y-6">
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">জমির পরিমাণ (শতাংশ)</label>
              <input type="number" required value={landAmount} onChange={(e) => setLandAmount(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-blue-500" placeholder="৩০" />
            </div>
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">জমির ঠিকানা</label>
              <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">কবে মাপতে চান?</label>
              <input type="date" required value={surveyDate} onChange={(e) => setSurveyDate(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-blue-500" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition shadow-lg">বুকিং দিন</button>
          </form>
        </ModalWrapper>
      )}

      {/* 3. ARBITRATION */}
      {activeModal === 'arbitration' && (
        <ModalWrapper title="সালিশের আবেদন" icon={<Users size={24} className="text-white"/>} onClose={() => setActiveModal(null)} colorClass="from-purple-700 to-purple-600">
          <form onSubmit={(e) => { e.preventDefault(); submitData('গ্রাম্য সালিশ', `ধরণ: ${disputeType}, প্রতিপক্ষ: ${opponentName}, বিবরণ: ${disputeDetails}`, 'Call for Date'); }} className="space-y-6">
             <div>
              <label className="block text-base font-bold text-slate-700 mb-2">বিরোধের বিষয়</label>
              <select required value={disputeType} onChange={(e) => setDisputeType(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-purple-500">
                <option value="জমি সংক্রান্ত">জমি সংক্রান্ত</option>
                <option value="পারিবারিক কলহ">পারিবারিক কলহ</option>
                <option value="টাকা লেনদেন">টাকা লেনদেন</option>
              </select>
            </div>
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">প্রতিপক্ষের নাম</label>
              <input type="text" value={opponentName} onChange={(e) => setOpponentName(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">বিবরণ (সংক্ষেপে)</label>
              <textarea required value={disputeDetails} onChange={(e) => setDisputeDetails(e.target.value)} rows={3} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-purple-500"></textarea>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-purple-700 transition shadow-lg">আবেদন করুন</button>
          </form>
        </ModalWrapper>
      )}

      {/* 4. LAWYER */}
      {activeModal === 'lawyer' && (
        <ModalWrapper title="আইনজীবীর অ্যাপয়েন্টমেন্ট" icon={<Scale size={24} className="text-white"/>} onClose={() => setActiveModal(null)} colorClass="from-indigo-600 to-indigo-500">
          <form onSubmit={(e) => { e.preventDefault(); submitData('আইনজীবীর পরামর্শ', `মামলা: ${caseType}, সময়: ${consultTime}`, consultTime); }} className="space-y-6">
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">মামলার ধরণ</label>
              <select required value={caseType} onChange={(e) => setCaseType(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-500">
                <option value="দেওয়ানি (Civil)">দেওয়ানি (জমিজমা)</option>
                <option value="ফৌজদারি (Criminal)">ফৌজদারি (মারামারি)</option>
                <option value="পারিবারিক (Family)">পারিবারিক (তালাক)</option>
              </select>
            </div>
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">কখন কথা বলবেন?</label>
              <input type="datetime-local" required value={consultTime} onChange={(e) => setConsultTime(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-500" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition shadow-lg">অ্যাপয়েন্টমেন্ট নিন</button>
          </form>
        </ModalWrapper>
      )}

      {/* 5. AGREEMENT (NEW) */}
      {activeModal === 'agreement' && (
        <ModalWrapper title="চুক্তিপত্র / দলিল ড্রাফট" icon={<FileText size={24} className="text-white"/>} onClose={() => setActiveModal(null)} colorClass="from-cyan-600 to-cyan-500">
          <form onSubmit={(e) => { e.preventDefault(); submitData('চুক্তিপত্র', `ধরণ: ${docType}, বিবরণ: ${docDetails}`, 'Within 2 days'); }} className="space-y-6">
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">দলিলের ধরণ</label>
              <select required value={docType} onChange={(e) => setDocType(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-cyan-500">
                <option value="হলফনামা (Affidavit)">হলফনামা (Affidavit)</option>
                <option value="দোকান ভাড়া চুক্তি">দোকান ভাড়া চুক্তি</option>
                <option value="জমি বন্ধক (কট)">জমি বন্ধক (কট)</option>
                <option value="বণ্টননামা">বণ্টননামা</option>
              </select>
            </div>
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">প্রয়োজনীয় তথ্য</label>
              <textarea required value={docDetails} onChange={(e) => setDocDetails(e.target.value)} rows={4} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-cyan-500" placeholder="নাম, ঠিকানা এবং শর্তাবলী সংক্ষেপে লিখুন..."></textarea>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-cyan-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-cyan-700 transition shadow-lg">অর্ডার করুন</button>
          </form>
        </ModalWrapper>
      )}

      {/* 6. GD DRAFTING (NEW) */}
      {activeModal === 'gd' && (
        <ModalWrapper title="থানায় জিডি ড্রাফট" icon={<ShieldCheck size={24} className="text-white"/>} onClose={() => setActiveModal(null)} colorClass="from-red-600 to-red-500">
          <form onSubmit={(e) => { e.preventDefault(); submitData('জিডি ড্রাফটিং', `থানা: ${thanaName}, বিষয়: ${gdSubject}`, 'Urgent'); }} className="space-y-6">
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">থানার নাম</label>
              <input type="text" required value={thanaName} onChange={(e) => setThanaName(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-red-500" placeholder="যেমন: কোতোয়ালী থানা" />
            </div>
            <div>
              <label className="block text-base font-bold text-slate-700 mb-2">জিডির বিষয়</label>
              <input type="text" required value={gdSubject} onChange={(e) => setGdSubject(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-red-500" placeholder="যেমন: এনআইডি কার্ড হারিয়েছে" />
            </div>
            <p className="text-xs text-red-500 bg-red-50 p-2 rounded">বিঃদ্রঃ আমরা শুধু আইনি ভাষায় সুন্দর করে জিডি লিখে দিব, যা আপনি থানায় জমা দিতে পারবেন।</p>
            <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-red-700 transition shadow-lg">জিডি লিখুন</button>
          </form>
        </ModalWrapper>
      )}

    </div>
  );
}

// --- REUSABLE MODAL WRAPPER ---
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