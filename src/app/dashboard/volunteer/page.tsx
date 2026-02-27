'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, ClipboardList, MapPin, LogOut, Phone, Loader2, 
  ShieldCheck, User, Star, ChevronRight, Camera, X, 
  MessageSquare, Send, CheckCircle2, Stethoscope, Leaf, Home, 
  TreePine, Snowflake, BookOpen, Trophy, Droplets, Recycle, 
  Briefcase, Gift, Heart, ArrowRight, LayoutDashboard, Edit2
} from "lucide-react";
import { supabase } from '../../../lib/supabaseClient'; 

export default function VolunteerDashboard() {
  const router = useRouter();
  const[currentUser, setCurrentUser] = useState<any>(null);
  const [teamLeader, setTeamLeader] = useState<any>(null);
  const [teammates, setTeammates] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const[activeTab, setActiveTab] = useState('overview'); // overview, tasks, team

  // Profile Edit States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const[editName, setEditName] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const[submitting, setSubmitting] = useState(false);

  // Task Detail & Comment States
  const[selectedTask, setSelectedTask] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      const savedUser = localStorage.getItem('user');
      if (!savedUser) return router.push('/login');
      const user = JSON.parse(savedUser);
      if (user.role !== 'volunteer') return router.push('/login');
      
      await loadVolunteerData(user);
    };
    init();
  }, [router]);

  const loadVolunteerData = async (user: any) => {
    setLoading(true);
    try {
      // ১. ভলান্টিয়ারের নিজস্ব ডাটা (volunteers টেবিল থেকে)
      const { data: me } = await supabase.from('volunteers').select('*').eq('mobile', user.mobile).maybeSingle();
      
      if (me) {
        setCurrentUser(me);
        setEditName(me.full_name);
        setEditAvatar(me.photo_url || '');

        // ২. টিম লিডারের ডাটা (members টেবিল থেকে referred_by দিয়ে)
        if (me.referred_by) {
          const { data: leader } = await supabase.from('members').select('*').eq('mobile', me.referred_by).maybeSingle();
          if (leader) setTeamLeader(leader);

          // ৩. টিমের অন্যান্য ভলান্টিয়ারদের ডাটা
          const { data: mates } = await supabase.from('volunteers')
            .select('*').eq('referred_by', me.referred_by).neq('id', me.id);
          if (mates) setTeammates(mates);
        }

        // ৪. অ্যাসাইন করা কাজ (Tasks)
        const { data: tks } = await supabase.from('tasks').select('*').eq('assigned_to', me.id).order('created_at', { ascending: false });
        if (tks) setTasks(tks ||[]);
      }
    } catch (err) { 
      console.error(err); 
    }
    setLoading(false);
  };

  // --- Profile Update ---
  const handleUpdateProfile = async () => {
    setSubmitting(true);
    const { error } = await supabase.from('volunteers')
      .update({ full_name: editName, photo_url: editAvatar })
      .eq('id', currentUser.id);
    
    if (!error) {
      alert("প্রোফাইল আপডেট সফল হয়েছে!");
      setIsEditModalOpen(false);
      loadVolunteerData({ mobile: currentUser.mobile, role: 'volunteer' });
    } else {
      alert("সমস্যা হয়েছে: " + error.message);
    }
    setSubmitting(false);
  };

  // --- Task Details & Comments ---
  const openTaskDetail = async (task: any) => {
    setSelectedTask(task);
    fetchComments(task.id);
  };

  const fetchComments = async (taskId: number) => {
    const { data } = await supabase.from('task_comments')
      .select('*, members(full_name, photo_url), volunteers(full_name, photo_url)')
      .eq('task_id', taskId)
      .order('created_at', { ascending: true });
    setComments(data ||[]);
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    setCommentLoading(true);
    const { error } = await supabase.from('task_comments').insert([{
      task_id: selectedTask.id,
      volunteer_id: currentUser.id, // ভলান্টিয়ার আইডি
      comment: newComment
    }]);
    if (!error) {
      setNewComment('');
      fetchComments(selectedTask.id);
    }
    setCommentLoading(false);
  };

  const handleLogout = () => {
    if (window.confirm("লগআউট করতে চান?")) {
      localStorage.clear();
      router.push('/login');
    }
  };

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

  if (loading && !currentUser) return <div className="h-screen flex items-center justify-center bg-[#F3F4F6]"><Loader2 className="animate-spin text-[#006A4E]" size={40}/></div>;

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans pb-24">
      
      {/* --- Top Navbar/Header --- */}
      <div className="bg-[#0f172a] text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#006A4E] rounded-full blur-[100px] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-5 w-full md:w-auto">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-800 rounded-2xl flex items-center justify-center font-bold text-3xl border border-slate-700 shadow-inner overflow-hidden text-[#00A86B]">
                {currentUser?.photo_url ? (
                  <img src={currentUser.photo_url} alt="profile" className="w-full h-full object-cover" />
                ) : currentUser?.full_name?.charAt(0)}
              </div>
              <button onClick={() => setIsEditModalOpen(true)} className="absolute -bottom-2 -right-2 bg-[#FFB800] p-2 rounded-xl text-[#0f172a] shadow-lg hover:scale-110 transition-transform">
                <Edit2 size={14} strokeWidth={3} />
              </button>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black flex items-center gap-2 tracking-tight">
                {currentUser?.full_name} <ShieldCheck size={20} className="text-[#FFB800]" />
              </h2>
              <p className="text-slate-400 text-sm flex items-center gap-1 mt-1 font-medium">
                <MapPin size={14} className="text-[#00A86B]" /> {currentUser?.village}, {currentUser?.union_name}
              </p>
            </div>
          </div>

          {/* Stats & Logout Card */}
          <div className="flex items-center gap-3 w-full md:w-auto bg-white/10 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
             <div className="flex-1 text-center px-4 border-r border-white/10">
                <p className="text-[10px] text-emerald-200 uppercase font-bold tracking-widest mb-1">অ্যাসাইন করা কাজ</p>
                <p className="text-xl font-black text-white">{tasks.length}</p>
             </div>
             <div className="flex-1 text-center px-4 border-r border-white/10 hidden sm:block">
                <p className="text-[10px] text-emerald-200 uppercase font-bold tracking-widest mb-1">টিম মেম্বার</p>
                <p className="text-xl font-black text-[#FFB800]">{teammates.length}</p>
             </div>
             <button onClick={handleLogout} className="px-4 py-3 bg-red-500/20 hover:bg-red-500 text-red-100 rounded-xl transition-all text-xs font-bold flex items-center gap-2">
               <LogOut size={16} /> <span className="hidden sm:inline">লগআউট</span>
             </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 mt-8">
        
        {/* --- TABS --- */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex gap-2 p-1.5 bg-white rounded-2xl shadow-sm border border-slate-100">
            <button onClick={()=>setActiveTab('overview')} className={`px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 ${activeTab==='overview' ? 'bg-[#006A4E] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
              <LayoutDashboard size={16}/> ওভারভিউ
            </button>
            <button onClick={()=>setActiveTab('tasks')} className={`px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 ${activeTab==='tasks' ? 'bg-[#006A4E] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
              <ClipboardList size={16}/> আমার কাজ
            </button>
            <button onClick={()=>setActiveTab('team')} className={`px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 ${activeTab==='team' ? 'bg-[#006A4E] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
              <Users size={16}/> আমাদের টিম
            </button>
          </div>
        </div>

        {/* --- TAB CONTENT: OVERVIEW (12 INITIATIVES) --- */}
        {activeTab === 'overview' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-10">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 text-rose-600 text-xs font-black uppercase tracking-widest border border-rose-100 mb-4">
                  <Heart size={14} className="fill-current"/> আমাদের ১২টি সামাজিক উদ্যোগ
                </span>
                <h2 className="text-2xl md:text-4xl font-black text-slate-800 mb-4">
                  মানুষের কল্যাণে <span className="text-[#006A4E]">সারা বছর জুড়ে</span> আয়োজন
                </h2>
                <p className="text-slate-500 md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                  আমরা শুধু আর্থিক প্রতিষ্ঠান নই, আমরা একটি পরিবার। সমাজের প্রতিটি স্তরে আমাদের ভলান্টিয়াররা কাজ করে যাচ্ছে।
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {initiatives.map((item) => (
                <div key={item.id} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group text-center flex flex-col items-center relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-full h-32 ${item.bg} opacity-50 rounded-b-[3rem] -z-10 transition-transform group-hover:scale-y-110 origin-top`}></div>
                    <div className={`w-20 h-20 rounded-[1.5rem] ${item.bg} ${item.color} flex items-center justify-center mb-6 shadow-sm border border-white rotate-3 group-hover:rotate-0 transition-transform`}>
                      {item.icon}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{item.subtitle}</p>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                    <p className={`text-sm font-bold ${item.color} mb-3 italic`}>{item.quote}</p>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB CONTENT: TASKS --- */}
        {activeTab === 'tasks' && (
          <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><ClipboardList className="text-[#006A4E]"/> অ্যাসাইন করা কাজসমূহ</h3>
            {tasks.length === 0 ? (
               <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200">
                  <ClipboardList size={48} className="mx-auto text-slate-300 mb-4"/>
                  <p className="text-slate-500 font-medium">আপনাকে এখনো কোনো কাজ দেওয়া হয়নি।</p>
               </div>
            ) : (
              tasks.map(task => (
                <div key={task.id} onClick={() => openTaskDetail(task)} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-[#006A4E] active:scale-[0.98] cursor-pointer transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${task.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {task.status === 'Completed' ? <CheckCircle2 size={24}/> : <ClipboardList size={24}/>}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg leading-tight mb-1">{task.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">{new Date(task.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <ChevronRight size={24} className="text-slate-300 group-hover:text-[#006A4E] transition-all"/>
                </div>
              ))
            )}
          </div>
        )}

        {/* --- TAB CONTENT: TEAM --- */}
        {activeTab === 'team' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
            {/* Team Leader Card */}
            {teamLeader && (
              <div className="bg-[#006A4E] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="absolute right-0 top-0 opacity-10"><Star size={150}/></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    <div className="w-20 h-20 bg-white/20 rounded-[1.5rem] flex items-center justify-center font-black text-4xl border-2 border-white/30 shadow-inner">
                        {teamLeader.photo_url ? <img src={teamLeader.photo_url} className="w-full h-full object-cover rounded-[1.2rem]"/> : teamLeader.full_name[0]}
                    </div>
                    <div>
                        <h3 className="text-[10px] font-bold uppercase text-[#FFB800] mb-1 tracking-widest flex items-center justify-center md:justify-start gap-1">
                          <Star size={12} className="fill-[#FFB800]"/> আমার টিম লিডার
                        </h3>
                        <p className="font-black text-2xl mb-1">{teamLeader.full_name}</p>
                        <p className="text-sm text-emerald-100 font-medium flex items-center justify-center md:justify-start gap-1">
                          <Phone size={14}/> {teamLeader.mobile}
                        </p>
                    </div>
                </div>
                <a href={`tel:${teamLeader.mobile}`} className="relative z-10 bg-[#FFB800] text-[#006A4E] px-6 py-3 rounded-xl shadow-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform w-full md:w-auto justify-center">
                    <Phone size={18} /> কল করুন
                </a>
              </div>
            )}

            {/* Teammates Grid */}
            <div>
               <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Users className="text-[#006A4E]"/> আমাদের টিম মেম্বারবৃন্দ</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teammates.map(mate => (
                    <div key={mate.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-emerald-50 text-[#006A4E] rounded-2xl flex items-center justify-center font-bold text-xl border border-emerald-100">
                           {mate.photo_url ? <img src={mate.photo_url} className="w-full h-full object-cover rounded-xl"/> : mate.full_name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{mate.full_name}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-0.5">Volunteer</p>
                        </div>
                      </div>
                      <a href={`tel:${mate.mobile}`} className="w-10 h-10 bg-slate-50 hover:bg-emerald-50 text-slate-400 hover:text-[#006A4E] rounded-full flex items-center justify-center transition-colors">
                        <Phone size={18}/>
                      </a>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}
      </main>

      {/* --- TASK DETAIL MODAL & COMMENTS --- */}
      {selectedTask && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
           <div className="bg-white w-full max-w-xl rounded-t-[3rem] md:rounded-[3rem] p-8 max-h-[90vh] overflow-y-auto relative animate-in slide-in-from-bottom-10">
              <button onClick={()=>setSelectedTask(null)} className="absolute top-6 right-8 text-slate-300 hover:text-red-500 bg-slate-50 p-2 rounded-full"><X size={20}/></button>
              <h2 className="text-xl font-black text-slate-800 pr-10">{selectedTask.title}</h2>
              <div className="bg-slate-50 p-5 rounded-3xl text-sm text-slate-500 leading-relaxed my-6 border border-slate-100 italic">
                  {selectedTask.description || 'এই কাজের কোনো অতিরিক্ত বিবরণ নেই।'}
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h3 className="font-black text-sm mb-4 flex items-center gap-2"><MessageSquare size={16} className="text-[#006A4E]"/> মন্তব্য ({comments.length})</h3>
                <div className="space-y-4 max-h-60 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                  {comments.map(c => {
                     // Since comments can be from admin/leader (members) or volunteer (volunteers)
                     const name = c.members?.full_name || c.volunteers?.full_name || 'Unknown';
                     const initial = name.charAt(0);
                     return (
                        <div key={c.id} className="flex gap-3">
                          <div className="w-8 h-8 bg-[#006A4E] text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">{initial}</div>
                          <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none border border-slate-100">
                            <p className="text-[10px] font-black text-[#006A4E] mb-1">{name}</p>
                            <p className="text-xs text-slate-600">{c.comment}</p>
                          </div>
                        </div>
                     )
                  })}
                </div>
                <div className="relative">
                  <input type="text" placeholder="কিছু লিখুন..." value={newComment} onChange={(e)=>setNewComment(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 pr-14 rounded-2xl outline-none focus:border-[#006A4E] text-sm font-medium" />
                  <button onClick={handlePostComment} disabled={commentLoading} className="absolute right-2 top-2 bg-[#006A4E] text-white p-2.5 rounded-xl hover:bg-emerald-800 active:scale-95 transition-all">
                    {commentLoading ? <Loader2 size={18} className="animate-spin"/> : <Send size={18}/>}
                  </button>
                </div>
              </div>
           </div>
        </div>
      )}

      {/* --- PROFILE EDIT MODAL --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
           <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 shadow-2xl relative animate-in zoom-in-95">
              <button onClick={()=>setIsEditModalOpen(false)} className="absolute top-6 right-8 text-slate-400 hover:text-red-500 bg-slate-50 p-2 rounded-full transition"><X size={20}/></button>
              <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2"><Camera className="text-[#006A4E]" /> প্রোফাইল আপডেট</h3>
              <div className="space-y-4">
                 <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">আপনার নাম</label>
                    <input type="text" value={editName} onChange={(e)=>setEditName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none focus:border-[#006A4E] font-bold text-slate-700" />
                 </div>
                 <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">ছবির লিঙ্ক (URL)</label>
                    <input type="text" value={editAvatar} onChange={(e)=>setEditAvatar(e.target.value)} placeholder="https://..." className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none focus:border-[#006A4E] text-sm font-medium text-slate-600" />
                 </div>
                 <button onClick={handleUpdateProfile} disabled={submitting} className="w-full bg-[#006A4E] text-white py-4 rounded-xl font-black shadow-lg shadow-emerald-900/20 active:scale-95 transition-all mt-4">
                    {submitting ? "সেভ হচ্ছে..." : "সংরক্ষণ করুন"}
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-lg border-t border-slate-100 px-6 py-3 flex justify-between items-center z-40 md:hidden pb-safe">
            <button onClick={()=>setActiveTab('overview')} className={`flex flex-col items-center gap-1 flex-1 py-1 ${activeTab==='overview' ? 'text-[#006A4E]' : 'text-slate-400'}`}>
                <LayoutDashboard size={20}/><span className="text-[10px] font-bold">ওভারভিউ</span>
            </button>
            <button onClick={()=>setActiveTab('tasks')} className={`flex flex-col items-center gap-1 flex-1 py-1 ${activeTab==='tasks' ? 'text-[#006A4E]' : 'text-slate-400'}`}>
                <ClipboardList size={20}/><span className="text-[10px] font-bold">আমার কাজ</span>
            </button>
            <button onClick={()=>setActiveTab('team')} className={`flex flex-col items-center gap-1 flex-1 py-1 ${activeTab==='team' ? 'text-[#006A4E]' : 'text-slate-400'}`}>
                <Users size={20}/><span className="text-[10px] font-bold">আমার টিম</span>
            </button>
      </nav>

    </div>
  );
}