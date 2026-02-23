'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, ClipboardList, MapPin, LogOut, Phone, Loader2, 
  Calendar, ShieldCheck, User, Star, Award, ChevronRight,
  Camera, X, MessageSquare, Send, CheckCircle2
} from "lucide-react";
import { supabase } from '../../../lib/supabaseClient'; 

export default function VolunteerDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [teamLeader, setTeamLeader] = useState<any>(null);
  const [teammates, setTeammates] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tasks'); // tasks, team

  // Profile Edit States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editAvatar, setEditAvatar] = useState('');

  // Task Detail & Comment States
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      const savedUser = localStorage.getItem('user');
      if (!savedUser) return router.push('/login');
      const user = JSON.parse(savedUser);
      if (user.role !== 'volunteer') return router.push('/login');
      
      setCurrentUser(user);
      await loadVolunteerData(user);
    };
    init();
  }, [router]);

  const loadVolunteerData = async (user: any) => {
    setLoading(true);
    try {
      const { data: me } = await supabase.from('members').select('*, villages(name)').eq('id', user.id).maybeSingle();
      if (me) {
        setCurrentUser(me);
        setEditName(me.full_name);
        setEditAvatar(me.avatar_url || '');
      }

      if (user.parent_id) {
        const { data: leader } = await supabase.from('members').select('*').eq('id', user.parent_id).maybeSingle();
        if (leader) setTeamLeader(leader);

        const { data: mates } = await supabase.from('members')
          .select('*').eq('parent_id', user.parent_id).eq('role', 'volunteer').neq('id', user.id);
        if (mates) setTeammates(mates);
      }

      const { data: tks } = await supabase.from('tasks').select('*').eq('assigned_to', user.id).order('created_at', { ascending: false });
      if (tks) setTasks(tks || []);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  // --- Profile Update ---
  const handleUpdateProfile = async () => {
    const { error } = await supabase.from('members')
      .update({ full_name: editName, avatar_url: editAvatar })
      .eq('id', currentUser.id);
    
    if (!error) {
      alert("প্রোফাইল আপডেট সফল হয়েছে!");
      setIsEditModalOpen(false);
      loadVolunteerData(currentUser);
    }
  };

  // --- Task Details & Comments ---
  const openTaskDetail = async (task: any) => {
    setSelectedTask(task);
    fetchComments(task.id);
  };

  const fetchComments = async (taskId: number) => {
    const { data } = await supabase.from('task_comments')
      .select('*, members(full_name, avatar_url)')
      .eq('task_id', taskId)
      .order('created_at', { ascending: true });
    setComments(data || []);
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    setCommentLoading(true);
    const { error } = await supabase.from('task_comments').insert([{
      task_id: selectedTask.id,
      member_id: currentUser.id,
      comment: newComment
    }]);
    if (!error) {
      setNewComment('');
      fetchComments(selectedTask.id);
    }
    setCommentLoading(false);
  };

  const handleLogout = () => {
    if (confirm("লগআউট করতে চান?")) {
      localStorage.clear();
      router.push('/login');
    }
  };

  if (loading && !currentUser) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-[#006A4E]" size={32}/></div>;

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-sans text-slate-900 pb-24">
      
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <h1 className="text-center font-black text-[#006A4E] text-xl mb-6">আমানত ফাউন্ডেশন - ভলান্টিয়ার ড্যাশবোর্ড</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Personal Card with Edit Option */}
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200 relative overflow-hidden">
               <div className="relative flex flex-col items-center text-center">
                  <div className="relative group">
                    <div className="w-24 h-24 bg-emerald-50 text-[#006A4E] rounded-[2.5rem] flex items-center justify-center text-4xl font-black mb-4 border-4 border-white shadow-xl overflow-hidden">
                      {currentUser?.avatar_url ? <img src={currentUser.avatar_url} className="w-full h-full object-cover" /> : currentUser?.full_name?.[0]}
                    </div>
                    <button onClick={() => setIsEditModalOpen(true)} className="absolute bottom-2 right-0 bg-[#FFB800] p-2 rounded-xl text-[#006A4E] shadow-lg border-2 border-white active:scale-90 transition-all">
                        <Camera size={16}/>
                    </button>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-800">{currentUser?.full_name}</h2>
                  <p className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mt-2 uppercase tracking-widest">Active Volunteer</p>
                  <div className="flex items-center gap-1 text-slate-400 text-sm mt-3 font-medium">
                    <MapPin size={14} className="text-[#FFB800]"/> {currentUser?.villages?.name}
                  </div>
               </div>
               <button onClick={handleLogout} className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-rose-50 text-rose-500 rounded-2xl font-bold text-xs border border-rose-100">
                  <LogOut size={16}/> লগআউট করুন
               </button>
            </div>

            {/* Team Leader Card */}
            {teamLeader && (
              <div className="bg-[#006A4E] p-6 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                <h3 className="text-[10px] font-bold uppercase text-emerald-200 mb-4 tracking-widest flex items-center gap-2">
                    <Star size={14} className="text-[#FFB800] fill-[#FFB800]"/> আমার টিম লিডার
                </h3>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center font-black text-xl border border-white/30">
                        {teamLeader.full_name[0]}
                    </div>
                    <div>
                        <p className="font-bold text-lg leading-tight">{teamLeader.full_name}</p>
                        <p className="text-xs text-emerald-100 opacity-80">{teamLeader.mobile}</p>
                    </div>
                    <a href={`tel:${teamLeader.mobile}`} className="ml-auto bg-[#FFB800] text-[#006A4E] p-3 rounded-2xl shadow-lg active:scale-90 transition-all">
                        <Phone size={22} />
                    </a>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-8">
            <div className="flex gap-2 mb-6 bg-slate-200/50 p-1.5 rounded-2xl">
                <button onClick={()=>setActiveTab('tasks')} className={`flex-1 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${activeTab==='tasks' ? 'bg-[#006A4E] text-white shadow-lg' : 'text-slate-500'}`}>
                  <ClipboardList size={16}/> আমার কাজ
                </button>
                <button onClick={()=>setActiveTab('team')} className={`flex-1 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${activeTab==='team' ? 'bg-[#006A4E] text-white shadow-lg' : 'text-slate-500'}`}>
                  <Users size={16}/> আমাদের টিম
                </button>
            </div>

            {activeTab === 'tasks' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                {tasks.map(task => (
                  <div key={task.id} onClick={() => openTaskDetail(task)} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group active:scale-[0.98] cursor-pointer transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${task.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        <ClipboardList size={24}/>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{task.title}</h4>
                        <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">{task.status === 'Completed' ? 'সম্পন্ন' : 'চলমান'}</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-[#006A4E] transition-all"/>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'team' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
                {teammates.map(mate => (
                  <div key={mate.id} className="bg-white p-4 rounded-[1.5rem] border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 text-[#006A4E] rounded-2xl flex items-center justify-center font-bold text-xl">{mate.full_name[0]}</div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{mate.full_name}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Volunteer</p>
                      </div>
                    </div>
                    <a href={`tel:${mate.mobile}`} className="w-9 h-9 bg-emerald-50 text-[#006A4E] rounded-full flex items-center justify-center"><Phone size={16}/></a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* --- TASK DETAIL MODAL & COMMENTS --- */}
      {selectedTask && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
           <div className="bg-white w-full max-w-xl rounded-t-[3rem] md:rounded-[3rem] p-8 max-h-[90vh] overflow-y-auto relative animate-in slide-in-from-bottom-10">
              <button onClick={()=>setSelectedTask(null)} className="absolute top-6 right-8 text-slate-300"><X/></button>
              <h2 className="text-xl font-black text-slate-800 pr-10">{selectedTask.title}</h2>
              <div className="bg-slate-50 p-5 rounded-3xl text-sm text-slate-500 leading-relaxed my-6 border border-slate-100 italic">
                  {selectedTask.description || 'এই কাজের কোনো অতিরিক্ত বিবরণ নেই।'}
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h3 className="font-black text-sm mb-4 flex items-center gap-2"><MessageSquare size={16} className="text-[#006A4E]"/> মন্তব্য ({comments.length})</h3>
                <div className="space-y-4 max-h-60 overflow-y-auto mb-6 pr-2">
                  {comments.map(c => (
                    <div key={c.id} className="flex gap-3">
                      <div className="w-8 h-8 bg-[#006A4E] text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">{c.members?.full_name[0]}</div>
                      <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none border border-slate-100">
                        <p className="text-[10px] font-black text-[#006A4E] mb-1">{c.members?.full_name}</p>
                        <p className="text-xs text-slate-600">{c.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="relative">
                  <input type="text" placeholder="কিছু লিখুন..." value={newComment} onChange={(e)=>setNewComment(e.target.value)} className="w-full bg-slate-100 border-none p-4 pr-12 rounded-2xl outline-none text-xs font-bold" />
                  <button onClick={handlePostComment} disabled={commentLoading} className="absolute right-2 top-2 bg-[#006A4E] text-white p-2 rounded-xl active:scale-95 transition-all">
                    {commentLoading ? <Loader2 size={16} className="animate-spin"/> : <Send size={16}/>}
                  </button>
                </div>
              </div>
           </div>
        </div>
      )}

      {/* --- PROFILE EDIT MODAL --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-6 animate-in fade-in">
           <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 relative animate-in zoom-in-95">
              <button onClick={()=>setIsEditModalOpen(false)} className="absolute top-6 right-8 text-slate-300"><X/></button>
              <h2 className="text-xl font-black mb-6">প্রোফাইল এডিট</h2>
              <div className="space-y-4">
                 <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">আপনার নাম</label>
                    <input type="text" value={editName} onChange={(e)=>setEditName(e.target.value)} className="w-full bg-slate-50 border-none p-4 rounded-2xl outline-none ring-1 ring-slate-100 focus:ring-2 focus:ring-[#006A4E] font-bold" />
                 </div>
                 <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">ছবির URL</label>
                    <input type="text" value={editAvatar} onChange={(e)=>setEditAvatar(e.target.value)} placeholder="https://..." className="w-full bg-slate-50 border-none p-4 rounded-2xl outline-none ring-1 ring-slate-100 focus:ring-2 focus:ring-[#006A4E] font-bold" />
                 </div>
                 <button onClick={handleUpdateProfile} className="w-full bg-[#006A4E] text-white py-4 rounded-2xl font-black shadow-lg shadow-emerald-900/20 active:scale-95 transition-all">সংরক্ষণ করুন</button>
              </div>
           </div>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-lg border-t border-slate-100 px-12 py-4 flex justify-between items-center z-50 md:hidden">
            <button onClick={()=>setActiveTab('tasks')} className={`flex flex-col items-center gap-1 ${activeTab==='tasks' ? 'text-[#006A4E]' : 'text-slate-300'}`}>
                <ClipboardList size={22}/><span className="text-[9px] font-black uppercase">My Tasks</span>
            </button>
            <button onClick={()=>setActiveTab('team')} className={`flex flex-col items-center gap-1 ${activeTab==='team' ? 'text-[#006A4E]' : 'text-slate-300'}`}>
                <Users size={22}/><span className="text-[9px] font-black uppercase">My Team</span>
            </button>
      </nav>

    </div>
  );
}