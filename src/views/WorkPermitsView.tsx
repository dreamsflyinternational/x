import React, { useState } from 'react';
import { PriceNotice } from '../components/PriceNotice';
import { CountryFlagSvg } from '../components/CountryFlagSvg';
import {
  Briefcase,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Globe,
  Users,
  Clock,
  HelpCircle,
  ArrowRight,
  PhoneCall,
  Award,
  ChevronDown,
  Sparkles,
  BadgeCheck,
  Building2,
  Wrench,
  GraduationCap
} from 'lucide-react';

interface WorkPermitsViewProps {
  onOpenBookingModal: (serviceType?: string) => void;
}

export const WorkPermitsView: React.FC<WorkPermitsViewProps> = ({ onOpenBookingModal }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'europe' | 'middle-east' | 'asia'>('all');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // The 10 Official Work Permit Destinations
  const WORK_PERMIT_DESTINATIONS = [
    // Europe
    {
      id: 'hungary',
      name: 'Hungary',
      nameBn: 'হাঙ্গেরি',
      flag: '🇭🇺',
      region: 'europe',
      regionName: 'ইউরোপ',
      salary: '€950–€1000 / মাস',
      duty: 'সপ্তাহে ৫ দিন • প্রতিদিন ৮ ঘণ্টা',
      processingTime: 'সর্বোচ্চ ৬ মাস',
      jobs: ['Factory Worker', 'Construction Worker', 'Agriculture Worker', 'Hotel & Restaurant Staff', 'General Worker'],
      popular: true
    },
    {
      id: 'slovenia',
      name: 'Slovenia',
      nameBn: 'স্লোভেনিয়া',
      flag: '🇸🇮',
      region: 'europe',
      regionName: 'ইউরোপ',
      salary: '€1250–€1350 / মাস',
      duty: 'সপ্তাহে ৫ দিন • প্রতিদিন ৮ ঘণ্টা',
      processingTime: 'সর্বোচ্চ ৬ মাস',
      jobs: ['Factory Worker', 'Construction Worker', 'Hotel Staff', 'Agriculture', 'General Worker'],
      popular: true
    },
    {
      id: 'romania',
      name: 'Romania',
      nameBn: 'রোমানিয়া',
      flag: '🇷🇴',
      region: 'europe',
      regionName: 'ইউরোপ',
      salary: '€650–€700 / মাস',
      duty: 'সপ্তাহে ৫ দিন • প্রতিদিন ৮ ঘণ্টা',
      processingTime: 'সর্বোচ্চ ৬ মাস',
      jobs: ['Factory Worker', 'Agriculture', 'Hotel Staff', 'Construction', 'General Worker'],
      popular: true
    },
    {
      id: 'serbia',
      name: 'Serbia',
      nameBn: 'সার্বিয়া',
      flag: '🇷🇸',
      region: 'europe',
      regionName: 'ইউরোপ',
      salary: '€550–€600 / মাস',
      duty: 'সপ্তাহে ৫ দিন • প্রতিদিন ৮ ঘণ্টা',
      processingTime: 'সর্বোচ্চ ৬ মাস',
      jobs: ['Factory Worker', 'Construction Worker', 'Agriculture Worker', 'General Worker']
    },
    {
      id: 'montenegro',
      name: 'Montenegro',
      nameBn: 'মন্টেনিগ্রো',
      flag: '🇲🇪',
      region: 'europe',
      regionName: 'ইউরোপ',
      salary: '€550–€600 / মাস',
      duty: 'সপ্তাহে ৫ দিন • প্রতিদিন ৮ ঘণ্টা',
      processingTime: 'সর্বোচ্চ ৬ মাস',
      jobs: ['Hotel Staff', 'Construction Worker', 'General Worker']
    },
    {
      id: 'north-macedonia',
      name: 'North Macedonia',
      nameBn: 'নর্থ ম্যাসেডোনিয়া',
      flag: '🇲🇰',
      region: 'europe',
      regionName: 'ইউরোপ',
      salary: '€550–€600 / মাস',
      duty: 'সপ্তাহে ৫ দিন • প্রতিদিন ৮ ঘণ্টা',
      processingTime: 'সর্বোচ্চ ৬ মাস',
      jobs: ['Factory Worker', 'Agriculture Worker', 'General Worker']
    },
    {
      id: 'albania',
      name: 'Albania',
      nameBn: 'আলবেনিয়া',
      flag: '🇦🇱',
      region: 'europe',
      regionName: 'ইউরোপ',
      salary: '€550–€600 / মাস',
      duty: 'সপ্তাহে ৫ দিন • প্রতিদিন ৮ ঘণ্টা',
      processingTime: 'সর্বোচ্চ ৬ মাস',
      jobs: ['Factory Worker', 'Construction Worker', 'General Worker']
    },
    // Middle East
    {
      id: 'dubai',
      name: 'Dubai (UAE)',
      nameBn: 'দুবাই (সংযুক্ত আরব আমিরাত)',
      flag: '🇦🇪',
      region: 'middle-east',
      regionName: 'মধ্যপ্রাচ্য',
      salary: 'AED 1200–1400 / মাস',
      duty: 'সপ্তাহে ৬ দিন • প্রতিদিন ৮ ঘণ্টা',
      processingTime: '৪৫–৬০ দিন',
      jobs: ['Hotel & Restaurant Staff', 'Warehouse Worker', 'Cleaner', 'Helper', 'General Worker'],
      popular: true
    },
    {
      id: 'saudi-arabia',
      name: 'Saudi Arabia',
      nameBn: 'সৌদি আরব',
      flag: '🇸🇦',
      region: 'middle-east',
      regionName: 'মধ্যপ্রাচ্য',
      salary: 'SAR 1200 / মাস (খাবার ভাতা আলাদা SAR 200)',
      duty: 'সপ্তাহে ৬ দিন • প্রতিদিন ৯ ঘণ্টা',
      processingTime: '৩০–৪৫ দিন',
      jobs: ['General Worker', 'Cleaner', 'Helper', 'Packaging Worker', 'Loading & Unloading Staff'],
      popular: true
    },
    // Asia
    {
      id: 'malaysia',
      name: 'Malaysia',
      nameBn: 'মালয়েশিয়া',
      flag: '🇲🇾',
      region: 'asia',
      regionName: 'এশিয়া',
      salary: 'MYR 1700 / মাস',
      duty: 'সপ্তাহে ৬ দিন • প্রতিদিন ৮ ঘণ্টা',
      processingTime: '২–৩ মাস',
      jobs: ['Factory Worker', 'Plantation Worker', 'Construction Worker', 'General Worker'],
      popular: true
    }
  ];

  const filteredDestinations = selectedRegion === 'all'
    ? WORK_PERMIT_DESTINATIONS
    : WORK_PERMIT_DESTINATIONS.filter(d => d.region === selectedRegion);

  const whyChooseUs = [
    {
      title: 'অভিজ্ঞ পরামর্শক দল',
      desc: 'আমাদের অভিজ্ঞ কনসালটেন্টরা বিভিন্ন দেশের ওয়ার্ক পারমিট ও ইমিগ্রেশন নীতিমালা সম্পর্কে সর্বশেষ তথ্যের ভিত্তিতে সঠিক পরামর্শ প্রদান করেন।',
      icon: Users,
    },
    {
      title: 'সম্পূর্ণ ডকুমেন্ট সহায়তা',
      desc: 'আবেদনের জন্য প্রয়োজনীয় সকল ডকুমেন্ট যাচাই, প্রস্তুত ও সাজানোর ক্ষেত্রে আমরা পূর্ণ সহযোগিতা করি।',
      icon: FileText,
    },
    {
      title: 'স্বচ্ছ ও নির্ভরযোগ্য সেবা',
      desc: 'প্রতিটি ধাপ সম্পর্কে আপনাকে পরিষ্কারভাবে জানানো হবে এবং আবেদন প্রক্রিয়ার অগ্রগতি নিয়মিত আপডেট দেওয়া হবে।',
      icon: ShieldCheck,
    },
    {
      title: 'দ্রুত ও সঠিক প্রসেসিং নির্দেশনা',
      desc: 'সঠিকভাবে আবেদন সম্পন্ন করতে আমরা প্রয়োজনীয় দিকনির্দেশনা প্রদান করি, যাতে অপ্রয়োজনীয় বিলম্ব কমে।',
      icon: Clock,
    },
    {
      title: 'সার্বক্ষণিক সহায়তা',
      desc: 'আবেদন শুরু থেকে ভিসা প্রাপ্তি পর্যন্ত আমাদের সাপোর্ট টিম আপনার পাশে থাকবে।',
      icon: PhoneCall,
    },
  ];

  const processSteps = [
    {
      step: 'ধাপ ১',
      title: 'ফ্রি কনসালটেশন',
      desc: 'আপনার যোগ্যতা, পছন্দের দেশ এবং কাজের ধরন অনুযায়ী প্রাথমিক পরামর্শ প্রদান করা হবে।',
    },
    {
      step: 'ধাপ ২',
      title: 'ডকুমেন্ট প্রস্তুতি',
      desc: 'প্রয়োজনীয় কাগজপত্র সংগ্রহ, যাচাই এবং আবেদন উপযোগী করে প্রস্তুত করা হবে।',
    },
    {
      step: 'ধাপ ৩',
      title: 'আবেদন জমা',
      desc: 'সংশ্লিষ্ট দেশের নিয়ম অনুযায়ী আবেদন সম্পন্ন করা হবে।',
    },
    {
      step: 'ধাপ ৪',
      title: 'আবেদন পর্যবেক্ষণ',
      desc: 'আবেদনের অগ্রগতি নিয়মিত পর্যবেক্ষণ করা হবে এবং প্রয়োজনে অতিরিক্ত ডকুমেন্ট জমা দিতে সহায়তা করা হবে।',
    },
    {
      step: 'ধাপ ৫',
      title: 'ভিসা অনুমোদন ও ভ্রমণ প্রস্তুতি',
      desc: 'ভিসা অনুমোদনের পর টিকিট, ট্রাভেল গাইডলাইন এবং প্রয়োজনীয় পরামর্শ প্রদান করা হবে।',
    },
  ];

  const requiredDocuments = [
    'বৈধ পাসপোর্ট (কমপক্ষে ৬ মাসের মেয়াদসহ)',
    'সাম্প্রতিক পাসপোর্ট সাইজ ছবি (সাদা ব্যাকগ্রাউন্ড)',
    'জাতীয় পরিচয়পত্র (NID) / জন্ম নিবন্ধন',
    'শিক্ষাগত সনদপত্র (যদি প্রযোজ্য হয়)',
    'অভিজ্ঞতার সনদ (যদি প্রয়োজন হয়)',
    'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট',
    'মেডিকেল টেস্ট রিপোর্ট',
    'হালনাগাদ জীবনবৃত্তান্ত বা সিভি (CV)',
    'চাকরির অফার লেটার বা এমপ্লয়মেন্ট কন্ট্রাক্ট (যদি প্রযোজ্য হয়)',
  ];

  const jobCategories = [
    { title: 'Factory Worker', icon: Building2 },
    { title: 'General Worker', icon: Users },
    { title: 'Construction Worker', icon: Wrench },
    { title: 'Agriculture Worker', icon: Globe },
    { title: 'Hotel & Restaurant Staff', icon: Award },
    { title: 'Warehouse Worker', icon: Building2 },
    { title: 'Cleaner', icon: ShieldCheck },
    { title: 'Helper', icon: ShieldCheck },
    { title: 'Packaging Worker', icon: Building2 },
    { title: 'Loading & Unloading Staff', icon: Wrench },
  ];

  const legalBenefits = [
    'বৈধভাবে বিদেশে কাজ করার সুযোগ',
    'আইনগত নিরাপত্তা ও সরকারি সুরক্ষা',
    'নির্ধারিত বেতন ও নির্দিষ্ট কর্মপরিবেশ',
    'স্বাস্থ্য ও অন্যান্য কর্মী সুবিধা পাওয়ার সুযোগ',
    'ভবিষ্যতে রেসিডেন্সি বা অন্যান্য সুবিধার সম্ভাবনা (দেশভেদে)',
  ];

  const faqs = [
    {
      q: 'ওয়ার্ক পারমিট ভিসা পেতে কত সময় লাগে?',
      a: 'দেশ, নিয়োগকর্তা এবং সংশ্লিষ্ট সরকারি কর্তৃপক্ষের প্রসেসিং নিয়মের উপর সময় নির্ভর করে। যেমন- সৌদি আরব ও দুবাইয়ের ক্ষেত্রে ৩০ থেকে ৬০ দিন, মালয়েশিয়ার ক্ষেত্রে ২-৩ মাস এবং ইউরোপের ক্ষেত্রে সর্বোচ্চ ৬ মাস সময় লাগে।',
    },
    {
      q: 'IELTS ছাড়া কি আবেদন করা যায়?',
      a: 'হ্যাঁ! আমাদের সকল ১০টি দেশের ওয়ার্ক পারমিটের ক্ষেত্রে IELTS বাধ্যতামূলক নয়। সাধারণ কাজের অভিজ্ঞতা থাকলে সহজে আবেদন করা যায়।',
    },
    {
      q: 'অভিজ্ঞতা না থাকলেও কি আবেদন করা যাবে?',
      a: 'অবশ্যই। এন্ট্রি-লেভেল, ফ্যাক্টরি, হেল্পার ও সাধারণ ক্লিনারের মতো অনেক পদে অভিজ্ঞতা ছাড়াও আবেদন গ্রহণ করা হয়।',
    },
    {
      q: 'পরিবারকে পরে নিয়ে যাওয়া যাবে?',
      a: 'ইউরোপের দেশের ক্ষেত্রে নির্দিষ্ট সময় ও আয়ের শর্ত পূরণ সাপেক্ষে পরিবারকে স্পন্সর করে নিয়ে যাওয়া সম্ভব।',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-900 space-y-16 animate-in fade-in font-sans">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-slate-50 border border-red-200 rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-red-100 text-[#DC2626] border border-red-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#DC2626]" />
            <span>১০০% বৈধ ও সরকারি নিবন্ধিত ওয়ার্ক পারমিট সার্ভিস</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            ওয়ার্ক পারমিট ভিসা (Work Permit Visa)
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-[#DC2626]">
            বিদেশে বৈধভাবে কাজ করার বিশ্বস্ত ও নির্ভরযোগ্য সমাধান
          </h2>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal pt-2">
            Dreams Fly International বিদেশে বৈধভাবে কাজের স্বপ্ন পূরণে ইউরোপ, মধ্যপ্রাচ্য ও এশিয়ার ১০টি প্রধান দেশের জন্য শতভাগ বিশ্বস্ত ওয়ার্ক পারমিট ভিসা প্রসেসিং ও ইমিগ্রেশন কনসালট্যান্সি সেবা প্রদান করে।
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => onOpenBookingModal('ওয়ার্ক পারমিট ফ্রি কনসালটেশন')}
              className="px-6 py-3.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Briefcase className="w-4 h-4" />
              <span>ফ্রি কনসালটেশন বুক করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenBookingModal('১০টি দেশের প্রসেসিং সময় ও বেতন স্কেল')}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer shadow"
            >
              প্রসেসিং সময় ও বেতন জানুন
            </button>
          </div>
        </div>
      </div>

      {/* 10 Work Permit Countries Grid (MAIN FOCUS SECTION) */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider px-3.5 py-1 bg-red-50 rounded-full inline-block border border-red-200">
            Work Permit Destinations ({WORK_PERMIT_DESTINATIONS.length} Countries)
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            ওয়ার্ক পারমিট গন্তব্যসমূহ (ইউরোপ, মধ্যপ্রাচ্য ও এশিয়া)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            আমাদের অনুমোদিত ১০টি নির্ধারিত ওয়ার্ক পারমিট দেশের বিস্তারিত বেতন স্কেল, ডিউটি ঘণ্টা, প্রসেসিং সময় ও জব পজিশনসমূহ
          </p>

          {/* Region Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <button
              onClick={() => setSelectedRegion('all')}
              className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                selectedRegion === 'all'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              সকল ১০টি দেশ ({WORK_PERMIT_DESTINATIONS.length})
            </button>
            <button
              onClick={() => setSelectedRegion('europe')}
              className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                selectedRegion === 'europe'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              🇪🇺 ইউরোপ (৭টি দেশ)
            </button>
            <button
              onClick={() => setSelectedRegion('middle-east')}
              className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                selectedRegion === 'middle-east'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              🕌 মধ্যপ্রাচ্য (২টি দেশ)
            </button>
            <button
              onClick={() => setSelectedRegion('asia')}
              className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                selectedRegion === 'asia'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              🌏 এশিয়া (১টি দেশ)
            </button>
          </div>
        </div>

        {/* Countries Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-500 transition-all duration-300 p-6 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-3">
                    <CountryFlagSvg countryId={item.id} className="w-8 h-6 rounded border border-slate-200 shadow-2xs" />
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors flex items-center gap-1.5">
                        <span>{item.name}</span>
                        <span className="text-xs font-normal text-slate-500">({item.nameBn})</span>
                      </h3>
                      <span className="text-[11px] font-extrabold uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {item.regionName}
                      </span>
                    </div>
                  </div>
                  {item.popular && (
                    <span className="bg-red-100 text-red-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                {/* Salary & Details */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-emerald-900 font-semibold">মাসিক বেতন:</span>
                    <span className="font-extrabold text-emerald-700 text-sm">{item.salary}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span>ডিউটি সময়:</span>
                    <span className="font-bold text-slate-800">{item.duty}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span>প্রসেসিং সময়:</span>
                    <span className="font-bold text-sky-700">{item.processingTime}</span>
                  </div>
                </div>

                {/* Jobs list */}
                {item.jobs && item.jobs.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-500 block mb-1.5 uppercase">
                      জনপ্রিয় চাকরির পদসমূহ:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.jobs.map((job, jIdx) => (
                        <span key={jIdx} className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded-md border border-slate-200/60">
                          • {job}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-5 mt-5 border-t border-slate-100">
                <button
                  onClick={() => onOpenBookingModal(`Work Permit Inquiry: ${item.name}`)}
                  className="w-full py-3 bg-slate-900 group-hover:bg-[#DC2626] text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center space-x-2 shadow"
                >
                  <span>আবেদন বা বিস্তারিত জানুন</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Job Categories */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 space-y-8 shadow-sm">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            জব ক্যাটাগরি (Job Categories)
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-slate-900">
            জনপ্রিয় ১০টি চাকরির ধরন
          </h2>
          <p className="text-xs text-slate-600">
            ইউরোপ, মধ্যপ্রাচ্য ও এশিয়ার অন্যতম চাহিদা সম্পন্ন কর্মসংস্থান ক্ষেত্রসমূহ
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {jobCategories.map((job, idx) => {
            const Icon = job.icon;
            return (
              <div
                key={idx}
                onClick={() => onOpenBookingModal(`Job Category Inquiry: ${job.title}`)}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-[#DC2626] hover:bg-red-50/40 transition-all flex flex-col items-center text-center space-y-2 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-[#DC2626] border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#DC2626] transition-colors">{job.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why Choose Dreams Fly International */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            আমাদের বিশেষত্ব
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-slate-900">
            কেন Dreams Fly International?
          </h2>
          <p className="text-xs text-slate-600">
            আমরা স্বচ্ছতা ও পেশাদারিত্বের সাথে আপনার বৈদেশিক কর্মসংস্থানের সুযোগ সুনিশ্চিত করি।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-[#DC2626] transition-all shadow-sm hover:shadow-md space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#DC2626] border border-red-200 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Work Permit Process */}
      <div className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200 space-y-8 shadow-sm">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            স্বচ্ছ ৫-ধাপ প্রসেস
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-slate-900">
            আমাদের ওয়ার্ক পারমিট প্রসেস
          </h2>
          <p className="text-xs text-slate-600">
            প্রাথমিক পরামর্শ থেকে শুরু করে ফ্লাইটের দিন পর্যন্ত আমাদের নিরবচ্ছিন্ন সেবা
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {processSteps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 relative shadow-sm hover:border-[#DC2626] transition-all"
            >
              <span className="text-[10px] font-black uppercase tracking-wider bg-red-50 text-[#DC2626] px-2.5 py-1 rounded-md border border-red-200 inline-block">
                {s.step}
              </span>
              <h3 className="text-sm font-bold text-slate-900 pt-1">{s.title}</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Documents & Legal Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Required Documents */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#DC2626] border border-red-200 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-sans text-slate-900">প্রয়োজনীয় ডকুমেন্ট</h3>
              <p className="text-xs text-slate-500">সাধারণত নিচের ডকুমেন্টগুলো প্রয়োজন হতে পারে</p>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-700">
            {requiredDocuments.map((doc, i) => (
              <li key={i} className="flex items-start space-x-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="font-medium text-slate-800">{doc}</span>
              </li>
            ))}
          </ul>

          <p className="text-[11px] text-slate-500 italic bg-red-50 p-3 rounded-xl border border-red-200">
            <strong>বিঃদ্রঃ</strong> দেশ ও নিয়োগকর্তা অনুযায়ী প্রয়োজনীয় ডকুমেন্ট ও শর্তাবলী ভিন্ন হতে পারে।
          </p>
        </div>

        {/* Why Legal Work Permit Matters */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#DC2626] border border-red-200 flex items-center justify-center">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-sans text-slate-900">কেন বৈধ ওয়ার্ক পারমিট গুরুত্বপূর্ণ?</h3>
                <p className="text-xs text-slate-500">ঝুঁকিমুক্ত ও নিরাপদ প্রবাস জীবনের মূল চাবিকাঠি</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-700">
              {legalBenefits.map((b, i) => (
                <li key={i} className="flex items-start space-x-3 bg-red-50/50 p-3.5 rounded-xl border border-red-200">
                  <ShieldCheck className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                  <span className="font-bold text-slate-900">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <button
              onClick={() => onOpenBookingModal('বৈধ ওয়ার্ক পারমিট ফাইল চেক')}
              className="w-full py-3.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>আপনার প্রোফাইল এলিজিবিলিটি চেক করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            জিজ্ঞাসাবাদ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-slate-900">
            প্রায়শই জিজ্ঞাসিত প্রশ্ন (FAQ)
          </h2>
          <p className="text-xs text-slate-600">
            ওয়ার্ক পারমিট সংক্রান্ত সাধারণ প্রশ্ন ও উত্তর
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-4 sm:p-5 flex justify-between items-center space-x-4 cursor-pointer hover:bg-slate-50"
              >
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0" />
                  <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 transition-transform ${
                    openFaqIndex === idx ? 'rotate-180 text-[#DC2626]' : ''
                  }`}
                />
              </button>

              {openFaqIndex === idx && (
                <div className="p-4 sm:p-5 bg-red-50/30 border-t border-slate-100 text-xs text-slate-700 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Special Price Notice */}
      <PriceNotice variant="banner" />

      {/* CTA Bottom Banner */}
      <div className="bg-gradient-to-r from-[#DC2626] to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full inline-block">
            স্বপ্নের পথচলা শুরু করুন
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-sans">
            আজই আপনার বিদেশে কাজের যাত্রা শুরু করুন
          </h2>
          <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
            বিদেশে বৈধভাবে কাজ করার স্বপ্ন পূরণে Dreams Fly International-এর অভিজ্ঞ টিম আপনার পাশে রয়েছে।
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-[11px] font-bold text-red-100">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span>ফ্রি প্রাথমিক পরামর্শ</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span>সম্পূর্ণ ডকুমেন্ট সহায়তা</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span>আবেদন প্রক্রিয়ায় গাইডলাইন</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span>নির্ভরযোগ্য কাস্টমার সাপোর্ট</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span>নিয়মিত প্রসেস আপডেট</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onOpenBookingModal('ওয়ার্ক পারমিট সরাসরি যোগাযোগ')}
          className="px-8 py-4 bg-white text-[#DC2626] hover:bg-red-50 font-black rounded-2xl text-sm uppercase tracking-wider shadow-lg transition-all cursor-pointer flex-shrink-0 flex items-center space-x-2"
        >
          <PhoneCall className="w-4 h-4 text-[#DC2626]" />
          <span>আজই আমাদের সাথে যোগাযোগ করুন</span>
        </button>
      </div>
    </div>
  );
};
