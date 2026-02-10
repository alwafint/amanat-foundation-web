import React from 'react';

export default function Stats() {
  return (
    <section className="container mx-auto px-4 -mt-24 relative z-20 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border-b-4 border-emerald-500 text-center transform transition hover:translate-y-[-5px]">
          <h3 className="text-4xl font-extrabold text-slate-800 font-mono">৫,০০০+</h3>
          <p className="text-slate-500 mt-2 font-medium uppercase tracking-wider text-xs">সক্রিয় মেম্বার</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border-b-4 border-yellow-500 text-center transform transition hover:translate-y-[-5px]">
          <h3 className="text-4xl font-extrabold text-slate-800 font-mono">৬৪</h3>
          <p className="text-slate-500 mt-2 font-medium uppercase tracking-wider text-xs">জেলায় সেবা কার্যক্রম</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border-b-4 border-blue-500 text-center transform transition hover:translate-y-[-5px]">
          <h3 className="text-4xl font-extrabold text-slate-800 font-mono">৯৮%</h3>
          <p className="text-slate-500 mt-2 font-medium uppercase tracking-wider text-xs">সফল উদ্যোক্তা</p>
        </div>
      </div>
    </section>
  );
}