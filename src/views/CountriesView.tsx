import React, { useState } from 'react';
import { COUNTRIES } from '../data/countries';
import { Search } from 'lucide-react';
import { PriceNotice } from '../components/PriceNotice';

interface CountriesViewProps {
  currency: 'BDT' | 'USD';
  onSelectCountry: (countryId: string) => void;
  onOpenBookingModal: (serviceType?: string) => void;
}

export const CountriesView: React.FC<CountriesViewProps> = ({
  currency,
  onSelectCountry,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const filtered = COUNTRIES.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-900 space-y-10 animate-in fade-in">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
          বিশ্বের {COUNTRIES.length}টি+ দেশের ভিসা সেবা
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-sans text-gray-900">
          সকল দেশের ভিসা প্রসেসিং তথ্য
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          প্রয়োজনীয় ডকুমেন্টস তালিকা, এম্বাসি প্রসেসিং সময়, ব্যাংক স্টেটমেন্ট রিকোয়ারমেন্ট এবং সফলতার বিবরণ দেখতে যেকোনো দেশ নির্বাচন করুন।
        </p>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 max-w-xl mx-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="দেশের নাম লিখুন (যেমন: কানাডা, ইতালি, জাপান...)"
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-2xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#DC2626] shadow-sm"
            />
          </div>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-300 rounded-2xl text-xs text-gray-900 focus:outline-none focus:border-[#DC2626] cursor-pointer font-bold shadow-sm"
          >
            <option value="All">সকল অঞ্চল ({COUNTRIES.length})</option>
            <option value="Americas">আমেরিকা</option>
            <option value="Europe">ইউরোপ (শেনজেন)</option>
            <option value="Middle East">মিডল ইস্ট</option>
            <option value="Oceania">ওশেনিয়া</option>
            <option value="Asia">এশিয়া</option>
            <option value="Africa">আফ্রিকা</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((c) => (
          <div
            key={c.id}
            onClick={() => onSelectCountry(c.id)}
            className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#DC2626] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl cursor-pointer group flex flex-col justify-between"
          >
            <div className="relative h-44 overflow-hidden">
              <img src={c.heroImage} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
              <span className="absolute top-3 left-3 text-3xl shadow-lg">{c.flag}</span>
              <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-emerald-700 border border-emerald-200 font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-sm">
                {c.successRate}% সফলতা
              </span>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-[#DC2626] tracking-wider block">
                  {c.region}
                </span>
                <h3 className="text-xl font-bold font-sans text-gray-900 group-hover:text-[#DC2626] transition-colors">
                  {c.name}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2 mt-1 leading-relaxed">
                  {c.overview}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                <div>
                  <span className="block text-[10px] text-gray-500 font-medium">প্রসেসিং সময়</span>
                  <span className="block font-bold text-gray-800">{c.processingTime}</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-gray-500 font-medium">শুরু খরচ</span>
                  <span className="block font-black text-[#DC2626]">
                    {currency === 'BDT' ? `৳${c.startingCostBDT.toLocaleString()}` : `$${c.startingCostUSD}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Special Price Notice */}
      <div className="mt-8">
        <PriceNotice variant="banner" />
      </div>
    </div>
  );
};
