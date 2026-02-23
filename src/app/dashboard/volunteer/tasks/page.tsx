'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ClipboardList, CheckCircle2, Clock, Calendar, 
  ChevronRight, X, MessageSquare, Send, Loader2, AlertCircle
} from "lucide-react";
import { supabase } from '../../../../lib/supabaseClient'; 

export default function OngoingTasks() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Detail Modal & Comments States
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const savedUser = localStorage.getItem('user');
      if (!savedUser) return router.push('/login');
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      fetchTasks(user.id);
    };
    checkUser();
  }, [router]);

  const fetchTasks = async (userId: number) => {
    setLoading(true);
    // শুধুমাত্র সম্পন্ন না হওয়া (Pending/Ongoing) কাজগুলো আনবে
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('assigned_to', userId)
      .neq('status', 'Completed') // সম্পন্ন কাজগুলো এখানে দেখাবে না
      .order('created_at', { ascending: false });

    if (data) setTasks(data);
    setLoading(false);
  };

  // কাজের ডিটেইলস এবং কমেন্ট লোড করা
  const openTask = async (task: any) => {
    setSelectedTask(task);
    const { data } = await supabase
      .from('task_comments')
      .select('*, members(full_name)')
      .eq('task_id', task.id)
      .order('created_at', { ascending: true });
    setComments(data || []);
  };

  // কাজ সম্পন্ন করার লজিক
  const markAsCompleted = async (taskId: number) => {
    if(!confirm("আপনি কি নিশ্চিত কাজটি সম্পন্ন হয়েছে?")) return;
    
    setSubmitting(true);
    const { error } = await supabase
      .from('tasks')
      .update({ status: 'Completed' })
      .eq('id', taskId);

    if (!error) {
      alert("অভিনন্দন! কাজটি সম্পন্ন হয়েছে।");
      setSelectedTask(null);
      fetchTasks(currentUser.id);
    }
    setSubmitting(false);
  };

  // কমেন্ট করার লজিক
  const postComment = async () => {
    if (!newComment.trim()) return;
    const { error } = await supabase.from('task_comments').insert([{
      task_id: selectedTask.id,
      member_id: currentUser.id,
      comment: newComment
    }]);

    if (!error) {
      setNewComment('');
      openTask(selectedTask); // Refresh comments
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <Loader2 className="animate-spin text-[#006A4E]" size={32}/>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10">
      
      {/* --- Top Header Area --- */}
      <div className="bg-[#006A4E] text-white p-8 rounded-b-[3rem] shadow-xl">
        <h1 className="text-2xl font-black flex items-center gap-3">
          <ClipboardList className="text-[#FFB800]"/> চলমান কার্যক্রম
        </h1>
        <p className="text-emerald-100/70 text-sm mt-1">আপনার জন্য বরাদ্দকৃত বর্তমান কাজগুলোর তালিকা</p>
      </div>

      <main className="max-w-xl mx-auto px-6 mt-8 space-y-4">
        
        {tasks.length === 0 ? (
          <div className="bg-white py-20 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center text-center px-6">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
               <CheckCircle2 size={32} className="text-emerald-300"/>
            </div>
            <h3 className="font-bold text-slate-800">সব কাজ সম্পন্ন!</h3>
            <p className="text-sm text-slate-400 mt-1 italic">বর্তমানে আপনার কোনো কাজ বাকি নেই। নতুন কাজের জন্য টিম লিডারের সাথে যোগাযোগ করুন।</p>
          </div>
        ) : (
          tasks.map(task => (
            <div 
              key={task.id} 
              onClick={() => openTask(task)}
              className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between group active:scale-95 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${task.status === 'Ongoing' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                  {task.status === 'Ongoing' ? <Clock size={24}/> : <ClipboardList size={24}/>}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{task.title}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                      <Calendar size={10}/> {new Date(task.created_at).toLocaleDateString('bn-BD')}
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${task.status === 'Ongoing' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                       {task.status === 'Ongoing' ? 'চলমান' : 'বাকি'}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-300 group-hover:text-[#006A4E]"/>
            </div>
          ))
        )}

      </main>

      {/* --- Task Details Bottom Sheet / Modal --- */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-t-[3rem] md:rounded-[3rem] p-8 max-h-[90vh] overflow-y-auto relative animate-in slide-in-from-bottom-10">
            
            <button onClick={() => setSelectedTask(null)} className="absolute top-6 right-8 text-slate-300 hover:text-slate-800"><X/></button>
            
            <div className="flex items-center gap-3 mb-6">
               <div className="p-3 bg-emerald-50 text-[#006A4E] rounded-2xl">
                  <ClipboardList size={28}/>
               </div>
               <h2 className="text-xl font-black text-slate-800 pr-10">{selectedTask.title}</h2>
            </div>

            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 mb-8">
               <p className="text-xs font-bold text-[#006A4E] uppercase tracking-widest mb-2">কাজের বিবরণ:</p>
               <p className="text-sm text-slate-600 leading-relaxed italic">
                 {selectedTask.description || 'এই কাজের কোনো বিস্তারিত বিবরণ টিম লিডার প্রদান করেননি।'}
               </p>
            </div>

            {/* Completion Button */}
            <button 
              onClick={() => markAsCompleted(selectedTask.id)}
              disabled={submitting}
              className="w-full bg-[#006A4E] text-white py-4 rounded-[1.5rem] font-black shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 hover:bg-[#004D39] active:scale-95 transition-all mb-8"
            >
              {submitting ? <Loader2 size={20} className="animate-spin"/> : <CheckCircle2 size={20}/>}
              কাজটি সম্পন্ন হয়েছে
            </button>

            {/* Comment Section */}
            <div className="border-t border-slate-100 pt-6">
              <h3 className="font-black text-slate-800 text-sm mb-4 flex items-center gap-2">
                <MessageSquare size={18} className="text-[#006A4E]"/> মতামত ও আপডেট ({comments.length})
              </h3>
              
              <div className="space-y-4 mb-6 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {comments.map(c => (
                  <div key={c.id} className={`flex gap-3 ${c.member_id === currentUser.id ? 'flex-row-reverse' : ''}`}>
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-[#006A4E] shrink-0 border border-emerald-100">
                      {c.members?.full_name?.[0]}
                    </div>
                    <div className={`p-3 rounded-2xl text-xs max-w-[80%] ${c.member_id === currentUser.id ? 'bg-[#006A4E] text-white rounded-tr-none' : 'bg-slate-100 text-slate-600 rounded-tl-none'}`}>
                      {c.comment}
                    </div>
                  </div>
                ))}
                {comments.length === 0 && <p className="text-center text-[10px] text-slate-400 italic">এখনো কোনো মন্তব্য নেই</p>}
              </div>

              <div className="relative">
                <input 
                  type="text" 
                  placeholder="লিডারকে কিছু জানান..." 
                  value={newComment} 
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-slate-100 border-none p-4 pr-14 rounded-2xl outline-none text-xs font-bold focus:ring-2 ring-emerald-500/10" 
                />
                <button 
                  onClick={postComment}
                  className="absolute right-2 top-2 bg-[#006A4E] text-white p-2.5 rounded-xl active:scale-90 transition-all shadow-md"
                >
                  <Send size={16}/>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- Footer Note --- */}
      <div className="text-center mt-10">
         <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest flex items-center justify-center gap-1">
            <AlertCircle size={12}/> কাজ শেষ হলে বাটনটি চেপে আপডেট দিন
         </p>
      </div>

    </div>
  );
}