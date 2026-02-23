'use client';

import React, { useEffect, useState } from 'react';
import { 
  MapPin, Plus, Trash2, ChevronRight, 
  Loader2, Building2, Map, Navigation, Home, Search 
} from "lucide-react";
// এই লাইনটি ৮ নম্বর লাইনে রিপ্লেস করুন
import { supabase } from '../../../../../lib/supabaseClient';

export default function LocationManagement() {
  const [loading, setLoading] = useState(false);
  
  // Data States (Original Data)
  const [districts, setDistricts] = useState<any[]>([]);
  const [upazilas, setUpazilas] = useState<any[]>([]);
  const [unions, setUnions] = useState<any[]>([]);
  const [villages, setVillages] = useState<any[]>([]);

  // Selection States
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [selectedUpazila, setSelectedUpazila] = useState<any>(null);
  const [selectedUnion, setSelectedUnion] = useState<any>(null);

  // Input/Search States
  const [districtInput, setDistrictInput] = useState('');
  const [upazilaInput, setUpazilaInput] = useState('');
  const [unionInput, setUnionInput] = useState('');
  const [villageInput, setVillageInput] = useState('');
  const [newWard, setNewWard] = useState('');

  // --- Initial Load: Districts ---
  useEffect(() => {
    fetchDistricts();
  }, []);

  const fetchDistricts = async () => {
    const { data } = await supabase.from('districts').select('*').order('name');
    if (data) setDistricts(data);
  };

  // --- Filtered Data (Search Logic) ---
  // ইউজার ইনপুট অনুযায়ী ডাটা ফিল্টার করা হচ্ছে
  const filteredDistricts = districts.filter(d => d.name.toLowerCase().includes(districtInput.toLowerCase()));
  const filteredUpazilas = upazilas.filter(u => u.name.toLowerCase().includes(upazilaInput.toLowerCase()));
  const filteredUnions = unions.filter(u => u.name.toLowerCase().includes(unionInput.toLowerCase()));
  const filteredVillages = villages.filter(v => v.name.toLowerCase().includes(villageInput.toLowerCase()));

  // --- Fetch Children when Parent Selected ---
  const handleDistrictSelect = async (district: any) => {
    setSelectedDistrict(district);
    setSelectedUpazila(null); 
    setSelectedUnion(null);
    setUpazilas([]); setUnions([]); setVillages([]);
    
    // সিলেকশনের পর ইনপুট ক্লিয়ার বা ভ্যালু সেট করতে পারেন (অপশনাল)
    // setDistrictInput(''); 

    const { data } = await supabase.from('upazilas').select('*').eq('district_id', district.id).order('name');
    if (data) setUpazilas(data);
  };

  const handleUpazilaSelect = async (upazila: any) => {
    setSelectedUpazila(upazila);
    setSelectedUnion(null);
    setUnions([]); setVillages([]);

    const { data } = await supabase.from('unions').select('*').eq('upazila_id', upazila.id).order('name');
    if (data) setUnions(data);
  };

  const handleUnionSelect = async (union: any) => {
    setSelectedUnion(union);
    setVillages([]);

    const { data } = await supabase.from('villages').select('*').eq('union_id', union.id).order('ward_no');
    if (data) setVillages(data);
  };

  // --- Add Functions (Same logic, using input state) ---
  const addDistrict = async () => {
    if (!districtInput.trim()) return;
    setLoading(true);
    const { error } = await supabase.from('districts').insert([{ name: districtInput }]);
    if (error) alert("Error: " + error.message);
    else {
        setDistrictInput('');
        fetchDistricts();
    }
    setLoading(false);
  };

  const addUpazila = async () => {
    if (!upazilaInput.trim() || !selectedDistrict) return;
    setLoading(true);
    const { error } = await supabase.from('upazilas').insert([{ district_id: selectedDistrict.id, name: upazilaInput }]);
    if (error) alert("Error: " + error.message);
    else {
        setUpazilaInput('');
        handleDistrictSelect(selectedDistrict);
    }
    setLoading(false);
  };

  const addUnion = async () => {
    if (!unionInput.trim() || !selectedUpazila) return;
    setLoading(true);
    const { error } = await supabase.from('unions').insert([{ upazila_id: selectedUpazila.id, name: unionInput }]);
    if (error) alert("Error: " + error.message);
    else {
        setUnionInput('');
        handleUpazilaSelect(selectedUpazila);
    }
    setLoading(false);
  };

  const addVillage = async () => {
    if (!villageInput.trim() || !selectedUnion) return;
    setLoading(true);
    const { error } = await supabase.from('villages').insert([{ 
      union_id: selectedUnion.id, 
      name: villageInput, 
      ward_no: newWard 
    }]);
    if (error) alert("Error: " + error.message);
    else {
        setVillageInput('');
        setNewWard('');
        handleUnionSelect(selectedUnion);
    }
    setLoading(false);
  };

  const deleteItem = async (table: string, id: number, refreshCallback: () => void) => {
    if(!confirm("আপনি কি নিশ্চিত এই আইটেমটি ডিলিট করতে চান?")) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) refreshCallback();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 text-slate-800">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <MapPin className="text-[#006A4E]" /> লোকেশন সেটআপ
          </h2>
          <p className="text-slate-500 text-sm mt-1">সার্চ করুন অথবা নতুন লোকেশন যুক্ত করুন</p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 h-[calc(100vh-220px)] min-h-[600px]">
        
        {/* Column 1: DISTRICT */}
        <LocationColumn 
          title={`জেলা তালিকা (${filteredDistricts.length})`}
          icon={<Map size={18} />}
          color="border-[#006A4E]"
          headerColor="bg-[#006A4E]"
        >
          <SearchInput 
            value={districtInput} 
            onChange={setDistrictInput} 
            onAdd={addDistrict} 
            placeholder="জেলা খুঁজুন বা লিখুন..."
            loading={loading}
          />
          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
            {filteredDistricts.map(item => (
              <LocationItem 
                key={item.id} 
                label={item.name} 
                isActive={selectedDistrict?.id === item.id}
                onClick={() => handleDistrictSelect(item)}
                onDelete={() => deleteItem('districts', item.id, fetchDistricts)}
              />
            ))}
            {filteredDistricts.length === 0 && <EmptyState text="জেলা পাওয়া যায়নি" />}
          </div>
        </LocationColumn>

        {/* Column 2: UPAZILA */}
        <LocationColumn 
          title={`উপজেলা তালিকা (${filteredUpazilas.length})`} 
          icon={<Building2 size={18} />}
          color="border-blue-600"
          headerColor="bg-blue-600"
          disabled={!selectedDistrict}
        >
          <SearchInput 
            value={upazilaInput} 
            onChange={setUpazilaInput} 
            onAdd={addUpazila} 
            placeholder={selectedDistrict ? "উপজেলা খুঁজুন..." : "আগে জেলা বাছুন"}
            loading={loading}
            disabled={!selectedDistrict}
          />
          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
            {filteredUpazilas.map(item => (
              <LocationItem 
                key={item.id} 
                label={item.name} 
                isActive={selectedUpazila?.id === item.id}
                onClick={() => handleUpazilaSelect(item)}
                onDelete={() => deleteItem('upazilas', item.id, () => handleDistrictSelect(selectedDistrict))}
              />
            ))}
            {selectedDistrict && filteredUpazilas.length === 0 && <EmptyState text="উপজেলা নেই, যুক্ত করুন" />}
          </div>
        </LocationColumn>

        {/* Column 3: UNION */}
        <LocationColumn 
          title={`ইউনিয়ন তালিকা (${filteredUnions.length})`}
          icon={<Navigation size={18} />}
          color="border-[#FFB800]"
          headerColor="bg-[#FFB800]"
          textColor="text-slate-900"
          disabled={!selectedUpazila}
        >
          <SearchInput 
            value={unionInput} 
            onChange={setUnionInput} 
            onAdd={addUnion} 
            placeholder={selectedUpazila ? "ইউনিয়ন খুঁজুন..." : "আগে উপজেলা বাছুন"}
            loading={loading}
            disabled={!selectedUpazila}
            btnClass="bg-[#FFB800] text-slate-900 hover:bg-amber-400"
          />
          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
            {filteredUnions.map(item => (
              <LocationItem 
                key={item.id} 
                label={item.name} 
                isActive={selectedUnion?.id === item.id}
                onClick={() => handleUnionSelect(item)}
                onDelete={() => deleteItem('unions', item.id, () => handleUpazilaSelect(selectedUpazila))}
              />
            ))}
            {selectedUpazila && filteredUnions.length === 0 && <EmptyState text="ইউনিয়ন নেই, যুক্ত করুন" />}
          </div>
        </LocationColumn>

        {/* Column 4: VILLAGE */}
        <LocationColumn 
          title={`গ্রাম ও ওয়ার্ড (${filteredVillages.length})`}
          icon={<Home size={18} />}
          color="border-purple-600"
          headerColor="bg-purple-600"
          disabled={!selectedUnion}
        >
          <div className="p-3 border-b border-slate-100 flex flex-col gap-2">
            <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="গ্রাম খুঁজুন..." 
                  className="flex-[2] bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-600 disabled:bg-slate-100"
                  value={villageInput}
                  onChange={(e) => setVillageInput(e.target.value)}
                  disabled={!selectedUnion}
                />
                <input 
                  type="text" 
                  placeholder="ওয়ার্ড" 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-600 disabled:bg-slate-100"
                  value={newWard}
                  onChange={(e) => setNewWard(e.target.value)}
                  disabled={!selectedUnion}
                />
            </div>
            <button onClick={addVillage} disabled={loading || !selectedUnion} className="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2 text-xs font-bold">
              <Plus size={14} /> যুক্ত করুন
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
            {filteredVillages.map(item => (
              <div key={item.id} className="group flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-all">
                <div>
                    <p className="text-sm font-bold text-slate-700">{item.name}</p>
                    <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md font-bold">
                        ওয়ার্ড: {item.ward_no || 'N/A'}
                    </span>
                </div>
                <button 
                  onClick={() => deleteItem('villages', item.id, () => handleUnionSelect(selectedUnion))}
                  className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {selectedUnion && filteredVillages.length === 0 && <EmptyState text="গ্রাম নেই, যুক্ত করুন" />}
          </div>
        </LocationColumn>

      </div>
    </div>
  );
}

// --- Helper Components ---

function LocationColumn({ title, icon, children, color, headerColor, textColor = "text-white", disabled }: any) {
    return (
        <div className={`flex flex-col bg-white rounded-2xl shadow-sm border-t-4 ${color} ${disabled ? 'opacity-50 pointer-events-none grayscale' : ''} transition-all duration-300 h-full overflow-hidden`}>
            <div className={`${headerColor} p-3 flex items-center gap-2`}>
                <div className={`p-1.5 bg-white/20 rounded-lg ${textColor}`}>
                    {icon}
                </div>
                <h3 className={`font-bold text-sm ${textColor}`}>{title}</h3>
            </div>
            {children}
        </div>
    );
}

function SearchInput({ value, onChange, onAdd, placeholder, loading, disabled, btnClass = "bg-[#006A4E] text-white hover:bg-emerald-800" }: any) {
  return (
    <div className="p-3 border-b border-slate-100 flex gap-2">
      <div className="relative flex-1">
        <input 
          type="text" 
          placeholder={placeholder}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:border-[#006A4E] disabled:bg-slate-100"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
        <Search size={14} className="absolute left-2.5 top-2.5 text-slate-400"/>
      </div>
      <button onClick={onAdd} disabled={loading || disabled} className={`${btnClass} p-2 rounded-lg disabled:opacity-50`}>
        <Plus size={18} />
      </button>
    </div>
  );
}

function LocationItem({ label, isActive, onClick, onDelete }: any) {
    return (
        <div 
            onClick={onClick}
            className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all ${
                isActive 
                ? 'bg-[#006A4E] border-[#006A4E] text-white shadow-lg shadow-emerald-900/20' 
                : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-white hover:border-[#006A4E]/30 hover:shadow-md'
            }`}
        >
            <div className="flex items-center gap-2">
                {isActive && <div className="w-1.5 h-1.5 bg-[#FFB800] rounded-full animate-pulse"></div>}
                <span className="text-sm font-medium">{label}</span>
            </div>
            
            <div className="flex items-center">
                {isActive ? (
                    <ChevronRight size={16} className="text-[#FFB800]"/>
                ) : (
                    <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(); }}
                        className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    >
                        <Trash2 size={14} />
                    </button>
                )}
            </div>
        </div>
    );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-slate-400">
      <Map size={32} className="mb-2 opacity-20"/>
      <p className="text-xs">{text}</p>
    </div>
  );
}