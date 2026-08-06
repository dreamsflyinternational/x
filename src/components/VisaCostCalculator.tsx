import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import { PriceNotice } from './PriceNotice';
import { COUNTRIES } from '../data/countries';

interface VisaCostCalculatorProps {
  currency: 'BDT' | 'USD';
  onOpenBookingModal: (serviceType?: string) => void;
}

export const VisaCostCalculator: React.FC<VisaCostCalculatorProps> = ({
  currency,
  onOpenBookingModal,
}) => {
  const [selectedCountryId, setSelectedCountryId] = useState('canada');
  const [visaCategory, setVisaCategory] = useState('Tourist Visa');
  const [serviceTier, setServiceTier] = useState<'standard' | 'express' | 'vip'>('standard');
  const [includeInsurance, setIncludeInsurance] = useState(true);

  const country = COUNTRIES.find((c) => c.id === selectedCountryId) || COUNTRIES[0];

  // Fee Math Calculation
  let baseEmbassyBDT = country.startingCostBDT * 0.55;
  let vfsChargesBDT = 4500;
  let agencyFeeBDT = 12000;
  let insuranceBDT = includeInsurance ? 2500 : 0;

  if (visaCategory.includes('Work') || visaCategory.includes('Permit')) {
    baseEmbassyBDT += 10000;
    agencyFeeBDT += 15000;
  } else if (visaCategory.includes('Student')) {
    baseEmbassyBDT += 5000;
    agencyFeeBDT += 8000;
  }

  if (serviceTier === 'express') agencyFeeBDT += 6000;
  if (serviceTier === 'vip') agencyFeeBDT += 15000;

  const totalCostBDT = Math.round(baseEmbassyBDT + vfsChargesBDT + agencyFeeBDT + insuranceBDT);
  const totalCostUSD = Math.round(totalCostBDT / 118);

  return (
    <div className="bg-white text-gray-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-red-200">
      <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 pb-4">
        <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-[#DC2626]">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black font-sans text-gray-900">
            স্বচ্ছ ভিসা খরচ ক্যালকুলেটর
          </h2>
          <p className="text-xs text-gray-600">
            কোনো গোপন চার্জ নেই। এম্বাসি ফি, VFS চার্জ এবং সার্ভিস চার্জের আলাদা হিসাব দেখুন।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Controls */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">গন্তব্য দেশ নির্বাচন করুন</label>
            <select
              value={selectedCountryId}
              onChange={(e) => setSelectedCountryId(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#DC2626] cursor-pointer"
            >
              {COUNTRIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.flag} {c.name} ({c.region})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">ভিসার ধরন</label>
              <select
                value={visaCategory}
                onChange={(e) => setVisaCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#DC2626] cursor-pointer"
              >
                <option value="Tourist Visa">ট্যুরিস্ট / ভিজিটর ভিসা</option>
                <option value="Student Visa">স্টুডেন্ট ভিসা (উচ্চশিক্ষা)</option>
                <option value="Work Permit">ওয়ার্ক পারমিট / জব ভিসা</option>
                <option value="Business Visa">বিজনেস ভিজিট ভিসা</option>
                <option value="Medical Visa">মেডিকেল ভিজিট ভিসা</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">সার্ভিস ক্যাটাগরি</label>
              <select
                value={serviceTier}
                onChange={(e) => setServiceTier(e.target.value as any)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#DC2626] cursor-pointer"
              >
                <option value="standard">স্ট্যান্ডার্ড প্রসেসিং</option>
                <option value="express">এক্সপ্রেস জরুরি প্রসেসিং (+৳৬,০০০)</option>
                <option value="vip">ভিআইপি এক্সিকিউটিভ প্রসেসিং (+৳১৫,০০০)</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer">
              <input
                type="checkbox"
                checked={includeInsurance}
                onChange={(e) => setIncludeInsurance(e.target.checked)}
                className="w-4 h-4 text-[#DC2626] rounded"
              />
              <span className="text-xs text-gray-700">
                এম্বাসি অনুমোদিত শেনজেন / ট্রাভেল হেলথ ইন্স্যুরেন্স যুক্ত করুন (৩০,০০০ ইউরো কাভারেজ)
              </span>
            </label>
          </div>
        </div>

        {/* Itemized Calculation Summary */}
        <div className="lg:col-span-5 bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-4 flex flex-col justify-between shadow-sm">
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-xs font-bold text-[#DC2626] uppercase tracking-wider">খরচের বিবরণ</span>
              <span className="text-xs font-bold text-[#DC2626] uppercase tracking-wider">পরিমাণ</span>
            </div>

            <div className="flex justify-between text-xs text-gray-700">
              <span>অফিসিয়াল এম্বাসি ভিসা ফি</span>
              <span className="font-bold text-gray-900">
                {currency === 'BDT' ? `৳${Math.round(baseEmbassyBDT).toLocaleString()}` : `$${Math.round(baseEmbassyBDT / 118)}`}
              </span>
            </div>

            <div className="flex justify-between text-xs text-gray-700">
              <span>VFS / বায়োমেট্রিক সেন্টার ফি</span>
              <span className="font-bold text-gray-900">
                {currency === 'BDT' ? `৳${vfsChargesBDT.toLocaleString()}` : `$${Math.round(vfsChargesBDT / 118)}`}
              </span>
            </div>

            <div className="flex justify-between text-xs text-gray-700">
              <span>ড্রিমস ফ্লাই ফাইল প্রসেসিং চার্জ</span>
              <span className="font-bold text-gray-900">
                {currency === 'BDT' ? `৳${agencyFeeBDT.toLocaleString()}` : `$${Math.round(agencyFeeBDT / 118)}`}
              </span>
            </div>

            {includeInsurance && (
              <div className="flex justify-between text-xs text-gray-700">
                <span>শেনজেন / ট্রাভেল ইন্স্যুরেন্স পলিসি</span>
                <span className="font-bold text-gray-900">
                  {currency === 'BDT' ? `৳${insuranceBDT.toLocaleString()}` : `$${Math.round(insuranceBDT / 118)}`}
                </span>
              </div>
            )}

            <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
              <div>
                <span className="block text-xs uppercase text-gray-500 font-bold">সর্বমোট আনুমানিক খরচ</span>
                <span className="block text-2xl font-black text-[#DC2626]">
                  {currency === 'BDT' ? `৳${totalCostBDT.toLocaleString()}` : `$${totalCostUSD}`}
                </span>
              </div>
              <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300 font-bold">
                ন্যায্য মূল্য নিশ্চিত
              </span>
            </div>

            <PriceNotice variant="compact" />
          </div>

          <button
            onClick={() =>
              onOpenBookingModal(
                `${country.name} ${visaCategory} - ৳${totalCostBDT.toLocaleString()}`
              )
            }
            className="w-full py-3.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>{country.name} ভিসার আবেদন করুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
