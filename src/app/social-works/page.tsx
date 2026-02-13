'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Heart, Users, Calendar, ArrowRight, CheckCircle } from 'lucide-react';

// রিলেটিভ পাথ ব্যবহার করুন (২ ধাপ পেছনে)
import Navbar from '../../components/layout/Navbar';
import SiteFooter from '../../components/layout/SiteFooter';

// ... বাকি কোড যেমন ছিল তেমনই থাকবে ...

export default function SocialWorkPage() {
  
  // কার্যক্রমের ডাটা
  const activities = [
    {
      id: 1,
      title: "শীতবস্ত্র বিতরণ ২০২৩",
      date: "১৫ জানুয়ারি, ২০২৩",
      category: "ত্রাণ সহায়তা",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop",
      desc: "উত্তরাঞ্চলের হাড়কাঁপানো শীতে অসহায় ৫০০০ পরিবারের মাঝে আমরা কম্বল ও গরম কাপড় পৌঁছে দিয়েছি।"
    },
    {
      id: 2,
      title: "বন্যা দুর্গতদের পাশে",
      date: "২০ আগস্ট, ২০২৩",
      category: "দুর্যোগ মোকাবিলা",
      image: "https://images.unsplash.com/photo-1547082688-9077fe60b8f9?q=80&w=1000&auto=format&fit=crop",
      desc: "সাঘাটার চরাঞ্চলে বন্যার্ত মানুষের মাঝে শুকনো খাবার, বিশুদ্ধ পানি এবং জরুরি ঔষধ সরবরাহ কার্যক্রম।"
    },
    {
      id: 3,
      title: "বিনামূল্যে চক্ষু শিবির",
      date: "১০ অক্টোবর, ২০২৩",
      category: "স্বাস্থ্য সেবা",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop",
      desc: "১০০০+ রোগীকে বিনামূল্যে চোখের চিকিৎসা এবং ১০০ জন ছানি পড়া রোগীর অপারেশন ও লেন্স সংযোজন।"
    },
    {
      id: 4,
      title: "এতিম শিশুদের শিক্ষা",
      date: "চলমান কার্যক্রম",
      category: "শিক্ষা",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop",
      desc: "বাবা-মা হারা শিশুদের শিক্ষার আলোয় আলোকিত করতে আমাদের নিজস্ব মাদ্রাসায় বিনামূল্যে পাঠদান।"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-emerald-900/80 z-10"></div>

        <div className="relative z-20 container mx-auto px-4">
          <span className="inline-block py-1 px-4 rounded-full bg-yellow-400 text-emerald-900 text-sm font-bold mb-4 animate-fadeIn">
            মানবতার সেবায় নিবেদিত
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            মানুষের কল্যাণে <br/> <span className="text-emerald-300">আমানত ফাউন্ডেশন</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto mb-8">
            আমাদের প্রতিটি উদ্যোগের লক্ষ্য একটাই— সমাজের অবহেলিত মানুষের মুখে হাসি ফোটানো এবং একটি সমৃদ্ধ সমাজ গড়া।
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-bold transition shadow-lg flex items-center justify-center gap-2">
              <Heart size={20} /> দান করুন
            </button>
            <button className="bg-white hover:bg-slate-100 text-emerald-800 px-8 py-3 rounded-full font-bold transition shadow-lg">
              আমাদের কাজ দেখুন
            </button>
          </div>
        </div>
      </div>

      {/* --- VIDEO SECTION --- */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              ভিডিও গ্যালারি: <span className="text-emerald-600">বাস্তব চিত্র</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              ছবি কথা বলে, কিন্তু ভিডিও বাস্তবতাকে তুলে ধরে। গত বন্যায় আমাদের স্বেচ্ছাসেবকদের অক্লান্ত পরিশ্রম এবং মানুষের দুর্দশার কিছু মুহূর্ত এখানে তুলে ধরা হলো।
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-full text-emerald-600"><CheckCircle size={20}/></div>
                <span className="font-medium text-slate-700">স্বচ্ছ ত্রাণ বিতরণ প্রক্রিয়া</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-full text-emerald-600"><CheckCircle size={20}/></div>
                <span className="font-medium text-slate-700">দুর্গম চরাঞ্চলে কার্যক্রম</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-full text-emerald-600"><CheckCircle size={20}/></div>
                <span className="font-medium text-slate-700">স্বেচ্ছাসেবকদের সরাসরি অংশগ্রহণ</span>
              </div>
            </div>

            <button className="text-emerald-700 font-bold hover:underline flex items-center gap-2 mt-4">
              ইউটিউব চ্যানেল ভিজিট করুন <ArrowRight size={18}/>
            </button>
          </div>

          {/* Video Player Wrapper */}
          <div className="lg:w-1/2 w-full relative group">
            <div className="absolute inset-0 bg-emerald-600 rounded-2xl transform rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-300"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-video bg-black">
              {/* YouTube Embed (Replace ID) */}
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/LXb3EKWsInQ?si=placeholder" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
              
              {/* Play Button Overlay (Optional if not auto playing) */}
              {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition">
                  <Play fill="white" className="text-white ml-1" size={32} />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="bg-emerald-800 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="text-4xl font-extrabold">৫০+</h3>
            <p className="text-emerald-200">এতিম শিশু</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-extrabold">৫০০০+</h3>
            <p className="text-emerald-200">পরিবারকে সহায়তা</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-extrabold">১২+</h3>
            <p className="text-emerald-200">ফ্রি মেডিকেল ক্যাম্প</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-extrabold">১০০%</h3>
            <p className="text-emerald-200">সফল প্রজেক্ট</p>
          </div>
        </div>
      </section>

      {/* --- RECENT ACTIVITIES GRID --- */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">আমাদের কার্যক্রম</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">সাম্প্রতিক ইভেন্টসমূহ</h2>
          <div className="w-20 h-1.5 bg-emerald-500 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-slate-100 flex flex-col h-full">
              
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
                  <Calendar size={14} />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-emerald-700 transition">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                  {item.desc}
                </p>
                <Link href={`/social-work/${item.id}`} className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-800 transition">
                  আরও পড়ুন <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="bg-emerald-900 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                আপনার একটু সহযোগিতাই পারে <br/> <span className="text-yellow-400">কারো জীবন বদলে দিতে</span>
              </h2>
              <p className="text-emerald-100 text-lg">
                আমরা যাকাত, সদকা এবং সাধারণ অনুদান গ্রহণ করি। আপনার দান ১০০% স্বচ্ছতার সাথে সঠিক মানুষের কাছে পৌঁছে দেওয়া হবে।
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <button className="bg-yellow-400 text-emerald-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition shadow-lg">
                  দান করতে চাই
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition">
                  স্বেচ্ছাসেবক হোন
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}