'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, MapPin, Loader2, ShieldCheck, LogOut, Camera, X, Edit2,
  Stethoscope, Leaf, Home, TreePine, Snowflake, BookOpen, 
  Trophy, Droplets, Recycle, Briefcase, Gift, Heart, ArrowRight
} from "lucide-react";
import { supabase } from '../../../lib/supabaseClient';

export default function TeamLeaderDashboard() {
  const router = useRouter();
  
  // --- States ---
  const [currentUser, setCurrentUser] = useState<any>(null);
  const[villageName, setVillageName] = useState<string>('');
  const [volunteerCount, setVolunteerCount] = useState<number>(0);
  
  // Loading States
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Edit Profile States
  const[isEditModalOpen, setIsEditModalOpen] = useState(false);
  const[editName, setEditName] = useState('');
  const [editPhoto, setEditPhoto] = useState('');

  const MAX_VOLUNTEERS = 100;

  // --- Initial Check & Fetch ---
  useEffect(() => {
    const checkSession = async () => {
      const savedUser = localStorage.getItem('user');
      if (!savedUser) return router.push('/login');
      
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.role !== 'team-leader' && parsedUser.role !== 'team_leader') {
         return router.push('/login');
      }

      setCurrentUser(parsedUser);
      await fetchTeamLeaderData(parsedUser.mobile);
    };
    checkSession();
  }, [router]);

  const fetchTeamLeaderData = async (leaderMobile: string) => {
    setFetching(true);
    try {
      // ১. লিডারের ডিটেইলস
      const { data: leaderData } = await supabase
        .from('members')
        .select('*')
        .eq('mobile', leaderMobile)
        .maybeSingle();
        
      if (leaderData) {
        setCurrentUser(leaderData);
        setEditName(leaderData.full_name);
        setEditPhoto(leaderData.photo_url || ''); 
        setVillageName(leaderData.union_name || leaderData.village || 'N/A');
      }

      // ২. ভলান্টিয়ার কাউন্ট (শুধুমাত্র সংখ্যা আনা হচ্ছে)
      const { count } = await supabase
        .from('members')
        .select('*', { count: 'exact', head: true })
        .eq('referred_by', leaderMobile) 
        .eq('role', 'volunteer');

      setVolunteerCount(count || 0);
    } catch (error) { 
      console.error(error); 
    } finally {
      setFetching(false);
    }
  };

  // --- প্রোফাইল আপডেট লজিক ---
  const handleUpdateProfile = async () => {
    setSubmitting(true);
    const { error } = await supabase
      .from('members')
      .update({ full_name: editName, photo_url: editPhoto })
      .eq('id', currentUser.id);

    if (error) alert(error.message);
    else {
      alert("প্রোফাইল আপডেট সফল হয়েছে!");
      setIsEditModalOpen(false);
      fetchTeamLeaderData(currentUser.mobile);
    }
    setSubmitting(false);
  };

  const handleLogout = () => {
    if (confirm("লগআউট করতে চান?")) {
      localStorage.clear();
      router.push('/login');
    }
  };

  if (fetching && !currentUser) return <div className="h-screen flex items-center justify-center bg-[#F3F4F6]"><Loader2 className="animate-spin text-[#006A4E]" size={40}/></div>;

  // --- ১২টি সামাজিক উদ্যোগের ডাটা ---
  const initiatives =[
    { id: 1, title: 'প্রজেক্ট শিফা', subtitle: 'PROJECT SHIFA', quote: '"সুস্থ গ্রাম, সমৃদ্ধ জীবন!"', desc: 'বিনামূল্যে বেসিক হেলথ ক্যাম্প ও চেকআপ।', icon: <Stethoscope size={28}/>, color: 'text-rose-500', bg: 'bg-rose-50' },
    { id: 2, title: 'মিশন গ্রিন ভিলেজ', subtitle: 'MISSION GREEN VILLAGE', quote: '"পরিচ্ছন্নতা ঈমানের অঙ্গ, সুন্দর হোক সঙ্গ!"', desc: 'পরিষ্কার গ্রাম অভিযান ও সচেতনতা বৃদ্ধি।', icon: <Leaf size={28}/>, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 3, title: 'প্রজেক্ট ছায়া', subtitle: 'PROJECT CHHAYA', quote: '"অসহায়ের মাথার ওপর ভালোবাসার ছাদ!"', desc: 'এতিম ও বিধবা সহায়তা কার্যক্রম।', icon: <Home size={28}/>, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 4, title: 'সবুজায়ন', subtitle: 'SOBUJAYON', quote: '"একটি গাছ, একটি প্রাণ!"', desc: 'আগামী প্রজন্মের জন্য বৃক্ষরোপণ উৎসব।', icon: <TreePine size={28}/>, color: 'text-green-600', bg: 'bg-green-50' },
    { id: 5, title: 'উষ্ণতার ছোঁয়া', subtitle: 'TOUCH OF WARMTH', quote: '"হাড়কাঁপানো শীতে ভালোবাসার চাদর!"', desc: 'দরিদ্র মানুষের মাঝে শীতবস্ত্র বিতরণ।', icon: <Snowflake size={28}/>, color: 'text-sky-500', bg: 'bg-sky-50' },
    { id: 6, title: 'আলোকিত মক্তব', subtitle: 'ALOKITO MAKTOB', quote: '"শিশুকাল থেকেই গড়বো নৈতিকতার ভিত্তি!"', desc: 'মক্তব উন্নয়ন ও শিশু শিক্ষা প্রকল্প।', icon: <BookOpen size={28}/>, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 7, title: 'সম্প্রীতি টুর্নামেন্ট', subtitle: 'HARMONY CUP', quote: '"খেলাধুলায় বাড়ে বল, মাদক ছেড়ে মাঠে চল!"', desc: 'টিম লিডার কাপ ও ক্রীড়া প্রতিযোগিতা।', icon: <Trophy size={28}/>, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 8, title: 'সুরক্ষা স্যানিটেশন', subtitle: 'PROJECT SUROKKHA', quote: '"সুস্থ থাকার প্রথম রতন!"', desc: 'পরিচ্ছন্ন টয়লেট ও স্যানিটেশন ক্যাম্পেইন।', icon: <Droplets size={28}/>, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { id: 9, title: 'ইকো-গার্ড', subtitle: 'ECO-GUARD', quote: '"প্লাস্টিক বর্জন করি, পরিবেশ রক্ষা করি!"', desc: 'প্লাস্টিক বর্জন ও ডাস্টবিন প্রকল্প।', icon: <Recycle size={28}/>, color: 'text-lime-600', bg: 'bg-lime-50' },
    { id: 10, title: 'প্রজেক্ট স্বাবলম্বী', subtitle: 'PROJECT SWABOLOMBI', quote: '"দক্ষ হাত, উন্নত ভবিষ্যৎ!"', desc: 'যুব প্রশিক্ষণ ও নারীদের স্কিল ডেভেলপমেন্ট।', icon: <Briefcase size={28}/>, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { id: 11, title: 'মিশন এহসান', subtitle: 'MISSION EHSAN', quote: '"ঈদের খুশি ছড়িয়ে যাক প্রতিটি ঘরে!"', desc: 'রমাদান ও ঈদের আনন্দ ভাগাভাগি।', icon: <Gift size={28}/>, color: 'text-pink-500', bg: 'bg-pink-50' },
    { id: 12, title: 'প্রজেক্ট ৩৬৫', subtitle: 'PROJECT 365', quote: '"ছোট ছোট ভালো কাজ, গড়বে সুখের সমাজ!"', desc: 'ভলান্টিয়ারদের প্রতিদিন একটি করে ভালো কাজ।', icon: <Heart size={28}/>, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F6] pb-10 font-sans">
      
      {/* --- Top Navbar/Header --- */}
      <div className="bg-[#0f172a] text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#006A4E] rounded-full blur-[100px] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-5 w-full md:w-auto">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center font-bold text-3xl border border-slate-700 shadow-inner overflow-hidden text-[#00A86B]">
                {currentUser?.photo_url ? (
                  <img src={currentUser.photo_url} alt="profile" className="w-full h-full object-cover" />
                ) : currentUser?.full_name?.charAt(0)}
              </div>
              <button onClick={() => setIsEditModalOpen(true)} className="absolute -bottom-2 -right-2 bg-[#FFB800] p-2 rounded-xl text-[#0f172a] shadow-lg hover:scale-110 transition-transform">
                <Edit2 size={14} strokeWidth={3} />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-black flex items-center gap-2 tracking-tight">
                {currentUser?.full_name} <ShieldCheck size={20} className="text-[#FFB800]" />
              </h2>
              <p className="text-slate-400 text-sm flex items-center gap-1 mt-1 font-medium">
                <MapPin size={14} className="text-[#00A86B]" /> কর্মএলাকা: <span className="text-white font-bold">{villageName}</span>
              </p>
            </div>
          </div>

          {/* Volunteer Count Card */}
          <div className="flex items-center gap-4 bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-md w-full md:w-auto">
             <div className="bg-[#006A4E] p-4 rounded-xl shadow-inner">
                <Users size={28} className="text-white"/>
             </div>
             <div className="pr-4">
                <p className="text-[11px] text-emerald-200 uppercase font-bold tracking-widest mb-1">মোট ভলান্টিয়ার</p>
                <p className="text-2xl font-black text-white leading-none">
                  {volunteerCount} <span className="text-sm text-slate-400 font-medium">/ {MAX_VOLUNTEERS}</span>
                </p>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* --- Initiatives Section Header --- */}
        <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 text-rose-600 text-xs font-black uppercase tracking-widest border border-rose-100 mb-4">
               <Heart size={14} className="fill-current"/> আমাদের ১২টি সামাজিক উদ্যোগ
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-slate-800 mb-4">
               মানুষের কল্যাণে <span className="text-[#006A4E]">সারা বছর জুড়ে</span> আমাদের আয়োজন
            </h2>
            <p className="text-slate-500 md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
               আমরা শুধু আর্থিক প্রতিষ্ঠান নই, আমরা একটি পরিবার। সমাজের প্রতিটি স্তরে আমাদের ভলান্টিয়াররা কাজ করে যাচ্ছে।
            </p>
        </div>

        {/* --- 12 Initiatives Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {initiatives.map((item) => (
             <div key={item.id} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group text-center flex flex-col items-center relative overflow-hidden">
                
                {/* Top Soft Background Blob */}
                <div className={`absolute top-0 left-0 w-full h-32 ${item.bg} opacity-50 rounded-b-[3rem] -z-10 transition-transform group-hover:scale-y-110 origin-top`}></div>

                <div className={`w-20 h-20 rounded-[1.5rem] ${item.bg} ${item.color} flex items-center justify-center mb-6 shadow-sm border border-white rotate-3 group-hover:rotate-0 transition-transform`}>
                   {item.icon}
                </div>
                
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{item.subtitle}</p>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                <p className={`text-sm font-bold ${item.color} mb-3 italic`}>{item.quote}</p>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{item.desc}</p>
                
                <button className={`mt-auto inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${item.color} hover:opacity-70 transition-opacity`}>
                   বিস্তারিত দেখুন <ArrowRight size={14}/>
                </button>
             </div>
           ))}
        </div>
      </div>

      {/* --- Edit Profile Modal --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button onClick={() => setIsEditModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-red-500 bg-slate-100 hover:bg-red-50 p-2 rounded-full transition"><X size={20}/></button>
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2 border-b pb-4"><Camera className="text-[#006A4E]" /> প্রোফাইল আপডেট</h3>
            <div className="space-y-5">
              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">পূর্ণ নাম</label>
                <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none focus:border-[#006A4E] font-bold text-slate-700" />
              </div>
              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">ছবির লিঙ্ক (URL)</label>
                <input type="text" value={editPhoto} onChange={e => setEditPhoto(e.target.value)} placeholder="https://image-link.com" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none focus:border-[#006A4E] text-sm text-slate-600" />
              </div>
              <button onClick={handleUpdateProfile} disabled={submitting} className="w-full bg-[#006A4E] text-white py-4 rounded-xl font-black shadow-lg shadow-emerald-900/20 active:scale-95 transition-all mt-4">
                {submitting ? "সেভ হচ্ছে..." : "সংরক্ষণ করুন"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}