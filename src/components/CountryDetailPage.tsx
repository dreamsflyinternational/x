import React from 'react';
import { CountryData } from '../types';
import { PriceNotice } from './PriceNotice';
import { CountryFlagSvg } from './CountryFlagSvg';
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building,
  ArrowRight,
  ChevronLeft,
  FileText
} from 'lucide-react';

interface CountryDetailPageProps {
  country: CountryData;
  currency: 'BDT' | 'USD';
  onBack: () => void;
  onOpenBookingModal: (serviceType?: string) => void;
  onSelectCountry: (countryId: string) => void;
}

export const CountryDetailPage: React.FC<CountryDetailPageProps> = ({
  country,
  currency,
  onBack,
  onOpenBookingModal,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-900 space-y-8 animate-in fade-in">
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-bold text-gray-600 hover:text-[#DC2626] transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>সকল গন্তব্যে ফিরে যান</span>
        </button>

        <span className="text-xs text-gray-500 font-medium">
          হোম / ভিসা দেশসমূহ / <strong className="text-gray-900">{country.name} ভিসা</strong>
        </span>
      </div>

      {/* Hero Banner Card */}
      <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-white">
        <div className="absolute inset-0">
          <img
            src={country.heroImage}
            alt={`${country.name} Visa`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/75 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-12 max-w-2xl space-y-4 text-white">
          <div className="flex items-center space-x-3">
            <CountryFlagSvg countryId={country.id} className="w-12 h-9 rounded-lg border border-white/30 shadow-lg" />
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-red-400">
                {country.region} গন্তব্য
              </span>
              <h1 className="text-3xl sm:text-5xl font-black font-sans text-white tracking-tight flex items-center gap-2">
                <span>{country.name} ভিসা</span>
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal">
            {country.overview}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl text-gray-900 text-xs shadow">
              <span className="block text-[10px] text-gray-500 font-bold uppercase">সফলতার হার</span>
              <span className="block text-emerald-700 font-black text-sm">{country.successRate}% অনুমোদিত</span>
            </div>

            <div className="bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl text-gray-900 text-xs shadow">
              <span className="block text-[10px] text-gray-500 font-bold uppercase">প্রসেসিং সময়</span>
              <span className="block text-[#DC2626] font-black text-sm">{country.processingTime}</span>
            </div>

            <div className="bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl text-gray-900 text-xs shadow">
              <span className="block text-[10px] text-gray-500 font-bold uppercase">শুরু খরচ</span>
              <span className="block text-gray-900 font-black text-sm">
                {currency === 'BDT' ? `৳${country.startingCostBDT.toLocaleString()}` : `$${country.startingCostUSD}`}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onOpenBookingModal(`${country.name} ভিসা কনসালটেশন`)}
              className="px-8 py-3.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white rounded-2xl font-extrabold text-sm uppercase tracking-wider shadow-xl transition-all cursor-pointer flex items-center space-x-2"
            >
              <span>এখনই {country.name} ভিসার জন্য আবেদন করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Details & Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Requirements & Visa Types */}
        <div className="lg:col-span-8 space-y-8">
          {/* Available Visa Categories */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-4 shadow-md">
            <h2 className="text-xl font-bold font-sans text-gray-900 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-[#DC2626]" />
              <span>বাংলাদেশি আবেদনকারীদের জন্য উপলব্ধ ভিসার ক্যাটাগরি</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {country.popularVisaTypes.map((vt, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-1">
                  <div className="flex items-center space-x-2 text-gray-900 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{vt}</span>
                  </div>
                  <p className="text-gray-600 text-[11px] leading-relaxed">
                    সম্পূর্ণ ডকুমেন্টস প্রস্তুতকরণ, এসওপি তৈরি এবং VFS বা বায়োমেট্রিক অ্যাপয়েন্টমেন্ট ড্রিমস ফ্লাই সম্পন্ন করে।
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Document Checklist */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-4 shadow-md">
            <h2 className="text-xl font-bold font-sans text-gray-900 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-[#DC2626]" />
              <span>{country.name} ভিসার জন্য প্রয়োজনীয় ডকুমেন্টস চেকলিস্ট</span>
            </h2>

            <div className="space-y-4 text-xs">
              {country.requiredDocuments.map((docGroup, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
                  <h4 className="font-bold text-[#DC2626] text-xs uppercase tracking-wider">{docGroup.category}</h4>
                  <ul className="space-y-1.5">
                    {docGroup.items.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2 text-gray-700">
                        <span className="text-[#DC2626] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step File Process */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-4 shadow-md">
            <h2 className="text-xl font-bold font-sans text-gray-900 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-[#DC2626]" />
              <span>ধাপে ধাপে ফাইল প্রসেসিং ধাপসমূহ</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 space-y-1">
                <span className="font-extrabold text-[#DC2626]">ধাপ ১</span>
                <span className="block font-bold text-gray-900">ফাইল অডিট ও SOP</span>
                <span className="text-[11px] text-gray-600 block">ব্যাংক ও কাগজপত্র মূল্যায়ন</span>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 space-y-1">
                <span className="font-extrabold text-[#DC2626]">ধাপ ২</span>
                <span className="block font-bold text-gray-900">VFS বায়োমেট্রিক</span>
                <span className="text-[11px] text-gray-600 block">অ্যাপয়েন্টমেন্ট বুকিং ঢাকা বা সিলেটে</span>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 space-y-1">
                <span className="font-extrabold text-[#DC2626]">ধাপ ৩</span>
                <span className="block font-bold text-gray-900">এম্বাসি মূল্যায়ন</span>
                <span className="text-[11px] text-gray-600 block">{country.processingTime} প্রসেসিং</span>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 space-y-1">
                <span className="font-extrabold text-[#DC2626]">ধাপ ৪</span>
                <span className="block font-bold text-gray-900">পাসপোর্ট ডেলিভারি</span>
                <span className="text-[11px] text-gray-600 block">স্ট্যাম্পযুক্ত পাসপোর্ট গ্রহণ করুন</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Summary Card */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-4 shadow-md">
            <h3 className="text-lg font-bold font-sans text-gray-900 border-b border-gray-100 pb-3">
              {country.name} ভিসা সংক্রান্ত তথ্য
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center text-gray-600">
                <span>রাজধানী</span>
                <span className="font-bold text-gray-900">{country.capital}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>অফিসিয়াল মুদ্রা</span>
                <span className="font-bold text-gray-900">{country.currency}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>সফলতার হার</span>
                <span className="font-bold text-emerald-700">{country.successRate}%</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>প্রসেসিং সময়</span>
                <span className="font-bold text-gray-900">{country.processingTime}</span>
              </div>
            </div>

            <button
              onClick={() => onOpenBookingModal(`${country.name} ভিসা আবেদন`)}
              className="w-full py-3 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold rounded-xl text-xs uppercase shadow-md transition-all cursor-pointer"
            >
              {country.name} ভিসায় আবেদন শুরু করুন
            </button>
          </div>

          {/* Embassy Info Card */}
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#DC2626] uppercase tracking-wider flex items-center space-x-1.5">
              <Building className="w-4 h-4" />
              <span>{country.embassyInfo.name}</span>
            </h3>
            <p className="text-gray-700 leading-relaxed">{country.embassyInfo.address}</p>
            <p className="text-gray-600 font-mono text-[11px]">{country.embassyInfo.phone}</p>
            <div className="pt-2 flex items-center space-x-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>১০০% আসল ফাইল সাবমিশনের নিশ্চয়তা</span>
            </div>
          </div>

          <PriceNotice variant="compact" />
        </div>
      </div>
    </div>
  );
};
