'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, CheckCircle2, Calendar, Search, 
  ChevronRight, X, MessageSquare, Loader2, Award, ArrowLeft
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient'; 

export default function ReportHistory() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [completedTasks, setCompletedTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Detail Modal States
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const checkUser = async () => {
      const savedUser = localStorage.getItem('user');
      if (!savedUser) return router.push('/login');
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      fetchHistory(user.id);
    };
    checkUser();
  }, [router]);

  const fetchHistory = async (userId: number) => {
    setLoading(true);
    // শুধুমাত্র সম্পন্ন (Completed) কাজগুলো ফিল্টার করা হচ্ছে
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('assigned_to', userId)
      .eq('status', 'Completed')
      .order('created_at', { ascending: false });

    if (data) setCompletedTasks(data);
    setLoading(false);
  };

  // বিস্তারিত দেখার সময় কমেন্টগুলো আনা
  const openDetails = async (task: any) => {
    setSelectedTask(task);
    const { data } = await supabase
      .from('task_comments')
      .select('*, members(full_name)')
      .eq('task_id', task.id)
      .order('created_at', { ascending: true });
    setComments(data || []);
  };

  // সার্চ ফিল্টার লজিক
  const filteredTasks = completedTasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-[#006A4E]" size={32}/>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10">
      
      {/* --- Top Header Area --- */}
      <div className="bg-[#006A4E] text-white p-8 rounded-b-[3.5rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
        
        <button onClick={() => router.back()} className="mb-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">
            <ArrowLeft size={20}/>
        </button>
        
        <h1 className="text-2xl font-black flex items-center gap-3">
          <FileText className="text-[#FFB800]"/> রিপোর্ট ইতিহাস
        </h1>
        <div className="flex items-center justify-between mt-4">
            <p className="text-emerald-100/70 text-xs font-bold uppercase tracking-widest">মোট সম্পন্ন কাজ</p>
            <span className="bg-[#FFB800] text-[#006A4E] px-3 py-1 rounded-full text-xs font-black shadow-lg">
                {completedTasks.length} টি
            </span>
        </div>
      </div>

      <main className="max-w-xl mx-auto px-6 -mt-6">
        
        {/* Search Bar */}
        <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2 mb-6">
            <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                <Search size={18}/>
            </div>
            <input 
                type="text" 
                placeholder="পুরানো কাজ খুঁজুন..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-slate-700"
            />
        </div>

        {/* List Content */}
        <div className="space-y-4">
            {filteredTasks.length === 0 ? (
                <div className="bg-white py-16 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center text-center px-8">
                    <FileText size={48} className="text-slate-200 mb-3"/>
                    <p className="text-slate-400 text-sm font-medium italic">কোনো সম্পন্ন কাজের রেকর্ড পাওয়া যায়নি</p>
                </div>
            ) : (
                filteredTasks.map(task => (
                    <div 
                        key={task.id} 
                        onClick={() => openDetails(task)}
                        className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between group active:scale-95 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                                <CheckCircle2 size={24}/>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{task.title}</h4>
                                <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mt-1 uppercase tracking-widest">
                                    <Calendar size={10}/> {new Date(task.created_at).toLocaleDateString('bn-BD')}
                                </p>
                            </div>
                        </div>
                        <ChevronRight size={20} className="text-slate-300 group-hover:text-[#006A4E]"/>
                    </div>
                ))
            )}
        </div>

      </main>

      {/* --- Detail Modal --- */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-t-[3rem] md:rounded-[3rem] p-8 max-h-[90vh] overflow-y-auto relative animate-in slide-in-from-bottom-10 shadow-2xl">
            
            <button onClick={() => setSelectedTask(null)} className="absolute top-6 right-8 text-slate-300 hover:text-slate-800"><X/></button>
            
            <div className="flex items-center gap-3 mb-6">
               <div className="p-3 bg-emerald-50 text-[#006A4E] rounded-2xl">
                  <Award size={28}/>
               </div>
               <div>
                    <h2 className="text-xl font-black text-slate-800 leading-tight">কাজের বিস্তারিত</h2>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">সফলভাবে সম্পন্ন</span>
               </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 mb-8">
               <h4 className="text-sm font-black text-slate-800 mb-2">{selectedTask.title}</h4>
               <p className="text-xs text-slate-500 leading-relaxed italic">
                 {selectedTask.description || 'বিবরণ দেওয়া হয়নি।'}
               </p>
            </div>

            {/* Comment/Feedback Archive */}
            <div className="border-t border-slate-100 pt-6">
              <h3 className="font-black text-slate-800 text-sm mb-4 flex items-center gap-2">
                <MessageSquare size={18} className="text-[#006A4E]"/> মন্তব্য ও ফিডব্যাক ({comments.length})
              </h3>
              
              <div className="space-y-4 mb-2">
                {comments.map(c => (
                  <div key={c.id} className="flex gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-black text-[#006A4E] shrink-0 border border-emerald-100 uppercase">
                      {c.members?.full_name?.[0]}
                    </div>
                    <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none border border-slate-100 flex-1">
                      <p className="text-[10px] font-black text-slate-400 mb-1">{c.members?.full_name}</p>
                      <p className="text-xs text-slate-600 font-medium">{c.comment}</p>
                    </div>
                  </div>
                ))}
                {comments.length === 0 && <p className="text-center text-[10px] text-slate-300 italic py-4">কোনো মন্তব্য পাওয়া যায়নি</p>}
              </div>
            </div>

            <button 
              onClick={() => setSelectedTask(null)}
              className="w-full mt-6 bg-[#006A4E] text-white py-4 rounded-[1.5rem] font-black shadow-lg transition-all active:scale-95"
            >
              বন্ধ করুন
            </button>

          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="text-center mt-12 px-10">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">আমানত ফাউন্ডেশন ফিল্ড ম্যানেজমেন্ট</p>
      </div>

    </div>
  );
}