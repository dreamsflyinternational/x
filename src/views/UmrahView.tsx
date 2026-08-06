import React, { useState, useEffect } from 'react';
import { PriceNotice } from '../components/PriceNotice';
import { navigateToPath } from '../lib/router';
import {
  Star,
  CheckCircle2,
  XCircle,
  Users,
  PhoneCall,
  HelpCircle,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  Hotel,
  Plane,
  Award,
  Calendar,
  Clock,
  HeartHandshake,
  Heart,
  BadgeCheck,
  FileText,
  X,
  Info
} from 'lucide-react';

interface UmrahViewProps {
  currency: 'BDT' | 'USD';
  onOpenBookingModal: (serviceType?: string) => void;
  initialUmrahId?: string;
}

export const UmrahView: React.FC<UmrahViewProps> = ({ currency, onOpenBookingModal, initialUmrahId }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedUmrahDetail, setSelectedUmrahDetail] = useState<any | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const umrahPackages = [
    {
      id: 'economy',
      badge: 'ইকোনমি উমরাহ (৩★)',
      color: 'bg-emerald-600',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      title: 'ইকোনমি উমরাহ প্যাকেজ (৩★)',
      duration: '৭ / ১০ / ১৪ দিন',
      priceBDT: 115000,
      priceUSD: 980,
      priceText: '৳১,১৫,০০০ থেকে',
      hotel: '৩-স্টার হোটেল (মক্কা ও মদিনা)',
      features: [
        'উমরাহ ভিসা ও ইন্স্যুরেন্স',
        'রিটার্ন এয়ার টিকিট (ঢাকা-জিস্দাহ/মদিনা)',
        '৩-স্টার মানসম্মত হোটেল',
        'শেয়ারড বা চার বেডের রুম',
        'এয়ারপোর্ট পিকআপ ও ড্রপ',
        'মক্কা ও মদিনা ঐতিহাসিক স্থান জিয়ারত',
        'অভিজ্ঞ বাংলা ভাষাভাষী গাইড',
      ],
      popular: false,
    },
    {
      id: 'standard',
      badge: 'স্ট্যান্ডার্ড উমরাহ (৪★)',
      color: 'bg-blue-600',
      badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
      title: 'স্ট্যান্ডার্ড উমরাহ প্যাকেজ (৪★)',
      duration: '১০ / ১৪ দিন',
      priceBDT: 135000,
      priceUSD: 1150,
      priceText: '৳১,৩৫,০০০ থেকে',
      hotel: 'হারামের কাছাকাছি ৪-স্টার হোটেল',
      features: [
        'সৌদি ই-ওমরাহ ভিসা প্রসেসিং',
        'রিটার্ন এয়ার টিকিট',
        'হারামের কাছাকাছি ৪-স্টার হোটেল',
        'সকল অভ্যন্তরীণ এসি পরিবহন',
        'মক্কা ও মদিনার সম্পূর্ণ জিয়ারত',
        'অভিজ্ঞ ট্যুর গাইড ও মুয়াল্লিম',
        '২৪/৭ কাস্টমার সাপোর্ট সার্ভিস',
      ],
      popular: true,
    },
    {
      id: 'premium',
      badge: 'প্রিমিয়াম উমরাহ (৫★ VIP)',
      color: 'bg-purple-600',
      badgeBg: 'bg-purple-50 text-purple-800 border-purple-200',
      title: 'প্রিমিয়াম উমরাহ প্যাকেজ (৫★ VIP)',
      duration: '১৪ দিন',
      priceBDT: 165000,
      priceUSD: 1400,
      priceText: '৳১,৬৫,০০০ থেকে',
      hotel: 'বিলাসবহুল ৫-স্টার হোটেল (হারাম ভিউ)',
      features: [
        'ভিআইপি উমরাহ ভিসা সার্ভিস',
        'সরাসরি বা সুবিধাজনক প্রিমিয়াম ফ্লাইট',
        'হারামের একদম নিকটবর্তী ৫-স্টার হোটেল',
        'প্রাইভেট ভিআইপি ট্রান্সপোর্টেশন',
        'ব্যক্তিগত সহায়তা ও মেন্টরিং',
        'সম্পূর্ণ জিয়ারত ও প্রিমিয়াম খাবার সার্ভিস',
      ],
      popular: false,
    },
    {
      id: 'family',
      badge: 'ফ্যামিলি উমরাহ',
      color: 'bg-amber-600',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
      title: 'ফ্যামিলি উমরাহ প্যাকেজ',
      duration: '১৪ দিন',
      priceBDT: 0,
      priceUSD: 0,
      priceText: 'কাস্টম কোটেশন',
      hotel: 'পারিবারিক ৩★/৪★/৫★ হোটেল',
      features: [
        'পরিবারের সদস্যদের নিয়ে আরামদায়ক সফর',
        'পরিবারভিত্তিক প্রাইভেট ফ্যামিলি রুম',
        'শিশু ও বয়স্কদের বিশেষ সুবিধা ও কেয়ার',
        'পারিবারিক ধর্মীয় গাইডেন্স ও টিপস',
        'প্রয়োজন অনুযায়ী ব্যক্তিগত প্রাইভেট ট্রান্সপোর্ট',
      ],
      popular: false,
    },
    {
      id: 'group',
      badge: 'গ্রুপ উমরাহ',
      color: 'bg-indigo-600',
      badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      title: 'গ্রুপ উমরাহ প্যাকেজ (দলীয়)',
      duration: '১০ - ১৪ দিন',
      priceBDT: 0,
      priceUSD: 0,
      priceText: 'বিশেষ গ্রুপ ডিসকাউন্ট',
      hotel: '৩-স্টার / ৪-স্টার গ্রুপ হোটেল',
      features: [
        'মসজিদ, প্রতিষ্ঠান, ক্লাব বা বড় দলের জন্য',
        'আকর্ষণীয় বিশেষ গ্রুপ ডিসকাউন্ট',
        'অভিজ্ঞ গ্রুপ লিডার ও ধর্মীয় মুয়াল্লিম',
        'সমন্বিত ভ্রমণ ও রিজার্ভ বাস ট্রান্সপোর্ট',
        'দলীয় জিয়ারত ও স্পেশাল কেয়ার',
      ],
      popular: false,
    },
    {
      id: 'ramadan',
      badge: 'রমজান উমরাহ',
      color: 'bg-red-600',
      badgeBg: 'bg-red-50 text-red-800 border-red-200',
      title: 'রমজান বিশেষ উমরাহ প্যাকেজ',
      duration: '১০ - ১৫ দিন',
      priceBDT: 185000,
      priceUSD: 1580,
      priceText: '৳১,৮৫,০০০ থেকে',
      hotel: '৩★ / ৪★ / ৫★ হোটেল',
      features: [
        'রমজান মাসের বিশেষ ইবাদতের আবহাওয়া',
        'রমজানের নির্ধারিত বিশেষ ফ্লাইট সময়সূচি',
        'ইফতার ও সেহরির ব্যবস্থা (প্যাকেজভেদে)',
        'অতিরিক্ত ইবাদতের জন্য হারামের নিকটে অবস্থান',
        'অভিজ্ঞ আলেম দ্বারা বিশেষ গাইডেন্স',
      ],
      popular: false,
    },
    {
      id: 'student',
      badge: 'স্টুডেন্ট উমরাহ',
      color: 'bg-teal-600',
      badgeBg: 'bg-teal-50 text-teal-800 border-teal-200',
      title: 'স্টুডেন্ট বাজেট উমরাহ প্যাকেজ',
      duration: '১০ দিন',
      priceBDT: 110000,
      priceUSD: 940,
      priceText: '৳১,১০,০০০ থেকে',
      hotel: 'বাজেট হোটেল (শেয়ারিং)',
      features: [
        'শিক্ষার্থী ও তরুণদের জন্য সাশ্রয়ী অফার',
        'উমরাহ ভিসা ও রিটার্ন টিকিট',
        'বাজেট-ফ্রেন্ডলি শেয়ারড হোটেল বাসস্থান',
        'গ্রুপের সাথে মক্কা-মদিনা সফর',
        'সহজ ও দ্রুত প্রসেসিং গাইডলাইন',
      ],
      popular: false,
    },
  ];

  const handleSelectUmrahPackage = (pkg: any) => {
    setSelectedUmrahDetail(pkg);
    navigateToPath(`/umrah/${pkg.id}`);
  };

  const handleCloseUmrahPackage = () => {
    setSelectedUmrahDetail(null);
    navigateToPath('/umrah-hajj');
  };

  useEffect(() => {
    if (initialUmrahId) {
      const found = umrahPackages.find((p) => p.id === initialUmrahId);
      if (found) {
        setSelectedUmrahDetail(found);
      }
    }
  }, [initialUmrahId]);

  const inclusions = [
    'উমরাহ ই-ভিসা ও মেডিকেল ইন্স্যুরেন্স',
    'ঢাকা-জেদ্দা-ঢাকা রিটার্ন এয়ার টিকিট',
    'মক্কা ও মদিনায় নির্ধারিত হোটেল অবস্থান',
    'এয়ারপোর্ট পিকআপ ও ড্রপ সার্ভিস',
    'অভ্যন্তরীণ এসি বাসে যাতায়াত',
    'মক্কা ও মদিনার ঐতিহাসিক স্থানসমূহে জিয়ারত',
    'অভিজ্ঞ বাংলা ভাষাভাষী ধর্মীয় গাইড',
    'ভ্রমণের পূর্বে বিস্তারিত নির্দেশনামূলক ব্রিফিং',
    'সৌদি আরবে ২৪/৭ কাস্টমার ও ইমার্জেন্সি সাপোর্ট',
  ];

  const exclusions = [
    'ব্যক্তিগত কেনাকাটা ও শপিং খরচ',
    'অতিরিক্ত খাবার ও পানীয় (প্যাকেজে উল্লেখ না থাকলে)',
    'পাসপোর্ট তৈরি বা নবায়ন খরচ',
    'অতিরিক্ত লাগেজ বা ব্যক্তিগত ক্যারিয়ার চার্জ',
    'ঐচ্ছিক বা ব্যক্তিগত অতিরিক্ত ভ্রমণ কার্যক্রম',
  ];

  const whyChooseUs = [
    { title: 'অভিজ্ঞ উমরাহ কনসালটেন্ট', desc: 'অভিজ্ঞ ও দক্ষ টিম দ্বারা সঠিক নিয়মে ফাইল প্রসেসিং।' },
    { title: 'নির্ভরযোগ্য ভিসা সহায়তা', desc: 'সৌদি সরকার অনুমোদিত এজেন্সি দ্বারা ই-ভিসা ইস্যু।' },
    { title: 'মানসম্মত হোটেল', desc: 'হারামের কাছাকাছি পরিষ্কার ও আধুনিক সুবিধাসম্পন্ন হোটেল।' },
    { title: 'প্রতিযোগিতামূলক মূল্য', desc: 'কোনো লুকানো খরচ ছাড়াই সাশ্রয়ী প্যাকেজ।' },
    { title: 'অভিজ্ঞ ধর্মীয় গাইড', desc: 'সহিহ সুন্নাহ মোতাবেক উমরাহ ও জিয়ারত সম্পন্ন করার দিকনির্দেশনা।' },
    { title: '২৪/৭ সহায়তা', desc: 'বাংলাদেশ ও সৌদি আরবে সার্বক্ষণিক কাস্টমার কেয়ার সেবা।' },
    { title: 'স্বচ্ছ ও নির্ভরযোগ্য সেবা', desc: 'চুক্তি অনুযায়ী শতভাগ সুবিধা প্রদান।' },
    { title: 'পরিবার ও গ্রুপের জন্য বিশেষ সুবিধা', desc: 'ফ্যামিলি ও বড় গ্রুপের জন্য কাস্টমাইজড ডিসকাউন্ট প্যাকেজ।' },
  ];

  const bookingProcess = [
    { step: 'ধাপ ১', title: 'ফ্রি কনসালটেশন', desc: 'আপনার বাজেট ও পছন্দ অনুযায়ী উমরাহ পরামর্শ নিন।' },
    { step: 'ধাপ ২', title: 'প্যাকেজ নির্বাচন', desc: 'ইকোনমি, স্ট্যান্ডার্ড, প্রিমিয়াম বা ফ্যামিলি প্যাকেজ বেছে নিন।' },
    { step: 'ধাপ ৩', title: 'ডকুমেন্ট জমা', desc: 'পাসপোর্ট ও প্রয়োজনীয় তথ্য ড্রিমস ফ্লাই অফিসে জমা দিন।' },
    { step: 'ধাপ ৪', title: 'ভিসা প্রসেসিং', desc: 'সৌদি ই-উমরাহ ভিসা দ্রুততম সময়ে ইস্যু করা হয়।' },
    { step: 'ধাপ ৫', title: 'টিকিট ও হোটেল নিশ্চিতকরণ', desc: 'ফ্লাইট টিকিট এবং মক্কা-মদিনার হোটেল ভাউচার বুঝে নিন।' },
    { step: 'ধাপ ৬', title: 'প্রি-ডিপার্চার ব্রিফিং', desc: 'উমরাহ নিয়মকানুন ও ট্রাভেল সংক্রান্ত দিকনির্দেশনা প্রদান।' },
    { step: 'ধাপ ৭', title: 'পবিত্র উমরাহ যাত্রা', desc: 'সুন্দর ও নিরাপদভাবে পবিত্র উমরাহ পালন নিশ্চিতকরণ।' },
  ];

  const requiredDocuments = [
    'বৈধ পাসপোর্ট (কমপক্ষে ৬ মাসের মেয়াদী)',
    'সাম্প্রতিক পাসপোর্ট সাইজ ছবি (সাদা ব্যাকগ্রাউন্ড)',
    'জাতীয় পরিচয়পত্র (NID) / জন্ম নিবন্ধন সনদ',
    'কোভিড/স্বাস্থ্য সংক্রান্ত নথি (যদি প্রযোজ্য হয়)',
    'অন্যান্য প্রয়োজনীয় কাগজপত্র (প্রয়োজনে পরামর্শক জানাবেন)',
  ];

  const faqs = [
    {
      q: 'উমরাহ ভিসা পেতে কতদিন লাগে?',
      a: 'সাধারণত ৩ থেকে ৫ কার্যদিবসের মধ্যে সৌদি ই-উমরাহ ভিসা প্রক্রিয়াকরণ সম্পন্ন হয়। তবে পিক সিজনে বা সরকারি পরিবর্তনের কারণে কিছুটা কম-বেশি হতে পারে।',
    },
    {
      q: 'উমরাহ প্যাকেজে খাবার অন্তর্ভুক্ত থাকে?',
      a: 'প্যাকেজভেদে খাবার অন্তর্ভুক্ত বা বাদ থাকতে পারে। হাফ-বোর্ড (বুফে প্রাতরাশ) বা ফুল-বোর্ড সার্ভিস বুকিংয়ের সময় নির্ধারণ করা যায়।',
    },
    {
      q: 'পরিবার নিয়ে উমরাহ করা যাবে?',
      a: 'অবশ্যই! আমাদের বিশেষ ফ্যামিলি উমরাহ প্যাকেজে প্রাইভেট ফ্যামিলি রুম, চাইল্ড ফ্রেন্ডলি সুবিধা এবং প্রাইভেট গাড়ি বুকিংয়ের চমৎকার সুবিধা রয়েছে।',
    },
  ];

  const handleWhatsAppInquiry = (pkgTitle: string) => {
    const text = encodeURIComponent(`আসসালামু আলাইকুম, আমি ড্রিমস ফ্লাই ইন্টারন্যাশনাল থেকে ${pkgTitle} সম্পর্কে জানতে চাই।`);
    window.open(`https://wa.me/8801771304219?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-900 space-y-16 animate-in fade-in">
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-red-50 border border-amber-200 rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-100 text-[#B45309] border border-amber-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>পবিত্র উমরাহ পালনের জন্য নির্ভরযোগ্য সঙ্গী</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-sans text-gray-900 leading-tight">
            উমরাহ প্যাকেজসমূহ
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-[#DC2626]">
            স্বপ্নের পবিত্র সফরের নিশ্চিত ও পেশাদার আয়োজন
          </h2>

          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal pt-2">
            Dreams Fly International-এর সাথে সম্পূর্ণ নিশ্চিন্তে ও সুন্দরভাবে পবিত্র উমরাহ পালন করুন। আমরা আপনার বাজেট, সময় এবং প্রয়োজন অনুযায়ী বিভিন্ন ধরনের উমরাহ প্যাকেজ প্রদান করি।
          </p>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            ভিসা থেকে শুরু করে বিমান টিকিট, হোটেল, পরিবহন এবং জিয়ারতের ব্যবস্থা—সবকিছুই একসাথে একটি প্যাকেজে নিশ্চিত করার চেষ্টা করি।
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => onOpenBookingModal('উমরাহ ফ্রি কনসালটেশন')}
              className="px-6 py-3.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>ফ্রি কনসালটেশন বুক করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleWhatsAppInquiry('হজ ও উমরাহ প্যাকেজসমূহ')}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer flex items-center space-x-2 shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>হোয়াটসঅ্যাপে ইনকোয়ারি করুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            আমাদের অফারসমূহ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            আমাদের উমরাহ প্যাকেজসমূহ
          </h2>
          <p className="text-xs text-gray-600">
            আপনার বাজেট ও পছন্দ অনুযায়ী সেরা উমরাহ প্যাকেজটি বেছে নিন
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {umrahPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-3xl border ${
                pkg.popular ? 'border-[#DC2626] shadow-xl ring-2 ring-red-400/30' : 'border-gray-200 shadow-md'
              } p-6 flex flex-col justify-between space-y-6 hover:shadow-xl transition-all relative`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 right-6 bg-[#DC2626] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                  সর্বাধিক জনপ্রিয়
                </div>
              )}

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className={`text-[11px] font-black uppercase px-3 py-1 rounded-full border ${pkg.badgeBg}`}>
                    {pkg.badge}
                  </span>
                  <div className="flex items-center text-xs font-bold text-gray-500 space-x-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-sans text-gray-900">{pkg.title}</h3>
                  <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-2xl sm:text-3xl font-black text-[#DC2626]">
                      {pkg.priceBDT > 0
                        ? currency === 'BDT'
                          ? `৳${pkg.priceBDT.toLocaleString()}`
                          : `$${pkg.priceUSD}`
                        : pkg.priceText}
                    </span>
                    {pkg.priceBDT > 0 && <span className="text-xs text-gray-500 font-semibold">/ প্রতি ব্যক্তি</span>}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs text-gray-700 flex items-center space-x-2">
                  <Hotel className="w-4 h-4 text-[#DC2626] flex-shrink-0" />
                  <span className="font-semibold text-gray-800">{pkg.hotel}</span>
                </div>

                <div className="space-y-2 border-t border-gray-100 pt-4">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    প্যাকেজে অন্তর্ভুক্ত সুবিধাসমূহ:
                  </span>
                  <ul className="space-y-2 text-xs text-gray-700">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <button
                  onClick={() => handleSelectUmrahPackage(pkg)}
                  className="w-full py-2.5 px-3 bg-gray-900 hover:bg-black text-white font-extrabold rounded-xl text-xs cursor-pointer shadow text-center flex items-center justify-center space-x-1"
                >
                  <Info className="w-3.5 h-3.5 text-red-500" />
                  <span>প্যাকেজ বিস্তারিত দেখুন</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onOpenBookingModal(`বুকিং আবেদন: ${pkg.title}`)}
                    className="py-2.5 px-3 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow text-center"
                  >
                    বুক করুন
                  </button>
                  <button
                    onClick={() => handleWhatsAppInquiry(pkg.title)}
                    className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow text-center flex items-center justify-center space-x-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package Comparison Summary Table */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6 shadow-sm overflow-hidden">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            এক নজরে তুলনা
          </span>
          <h2 className="text-2xl font-black font-sans text-gray-900">
            উমরাহ প্যাকেজ ফি ও সময়কাল সমূহের সামারি
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-900 font-extrabold border-b border-gray-200">
                <th className="p-3.5">প্যাকেজ</th>
                <th className="p-3.5">সময়কাল</th>
                <th className="p-3.5">শুরু মূল্য (প্রতি ব্যক্তি)</th>
                <th className="p-3.5">অন্তর্ভুক্ত সার্ভিসেস</th>
                <th className="p-3.5 text-center">ইনকোয়ারি</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {umrahPackages.map((p) => (
                <tr key={p.id} className="hover:bg-red-50/40 transition-colors">
                  <td className="p-3.5 font-bold text-gray-900 flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]"></span>
                    <span>{p.title}</span>
                  </td>
                  <td className="p-3.5 font-semibold text-gray-700">{p.duration}</td>
                  <td className="p-3.5 font-black text-[#DC2626] text-sm">
                    {p.priceBDT > 0 ? `৳${p.priceBDT.toLocaleString()} থেকে` : p.priceText}
                  </td>
                  <td className="p-3.5 text-gray-600 max-w-xs">{p.features.slice(0, 3).join(', ')} ইত্যাদি।</td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => onOpenBookingModal(`উমরাহ প্যাকেজ তথ্য: ${p.title}`)}
                      className="px-3 py-1.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-bold rounded-lg text-[11px] cursor-pointer"
                    >
                      বুক করুন
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PriceNotice variant="banner" className="mt-4" />
      </div>

      {/* Package Inclusions & Exclusions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inclusions */}
        <div className="bg-emerald-50/50 border border-emerald-200 p-6 sm:p-8 rounded-3xl space-y-4 shadow-sm">
          <div className="flex items-center space-x-3 border-b border-emerald-200 pb-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <h3 className="text-xl font-bold font-sans text-emerald-900">প্যাকেজে যা যা অন্তর্ভুক্ত</h3>
              <p className="text-xs text-emerald-700">আমাদের সকল মূল প্যাকেজে দেওয়া সুবিধাসমূহ</p>
            </div>
          </div>
          <ul className="space-y-2.5 text-xs text-gray-800">
            {inclusions.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Exclusions */}
        <div className="bg-red-50/40 border border-red-200 p-6 sm:p-8 rounded-3xl space-y-4 shadow-sm">
          <div className="flex items-center space-x-3 border-b border-red-200 pb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DC2626] text-white flex items-center justify-center font-bold">
              ✕
            </div>
            <div>
              <h3 className="text-xl font-bold font-sans text-red-900">প্যাকেজে যা অন্তর্ভুক্ত নয়</h3>
              <p className="text-xs text-red-700">স্বচ্ছতার স্বার্থে অতিরিক্ত সার্ভিসসমূহ</p>
            </div>
          </div>
          <ul className="space-y-2.5 text-xs text-gray-800">
            {exclusions.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 bg-white p-3 rounded-xl border border-red-100 shadow-2xs">
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Why Dreams Fly International */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            কেন আমরা সেরা
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            কেন Dreams Fly International বেছে নেবেন?
          </h2>
          <p className="text-xs text-gray-600">
            পবিত্র উমরাহ পালনের বিশ্বস্ত ও নির্ভরযোগ্য ট্রাভেল পার্টনার
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyChooseUs.map((w, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-[#DC2626] transition-all space-y-2 shadow-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center font-bold text-xs">
                ✓
              </div>
              <h3 className="text-sm font-bold text-gray-900">{w.title}</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 7 Step Booking Process */}
      <div className="bg-gray-50 p-8 sm:p-12 rounded-3xl border border-gray-200 space-y-8 shadow-sm">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            সহজ প্রসেসিং
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            আমাদের উমরাহ বুকিং প্রক্রিয়া
          </h2>
          <p className="text-xs text-gray-600">
            ৭টি ধাপে সম্পূর্ণ ঝামেলামুক্ত উমরাহ প্রসেসিং
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {bookingProcess.map((b, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 relative shadow-xs hover:border-[#DC2626] transition-all"
            >
              <span className="text-[10px] font-black uppercase bg-red-50 text-[#DC2626] px-2 py-0.5 rounded border border-red-200 inline-block">
                {b.step}
              </span>
              <h3 className="text-xs font-bold text-gray-900 pt-1">{b.title}</h3>
              <p className="text-[10px] text-gray-600 leading-normal">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Required Documents */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6 shadow-sm max-w-3xl mx-auto">
        <div className="flex items-center space-x-3 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#DC2626] border border-red-200 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-sans text-gray-900">প্রয়োজনীয় ডকুমেন্টসমূহ</h3>
            <p className="text-xs text-gray-500">উমরাহ ভিসা ও ফাইলিংয়ের জন্য যা প্রয়োজন</p>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-800">
          {requiredDocuments.map((doc, idx) => (
            <li key={idx} className="flex items-center space-x-2.5 bg-gray-50 p-3 rounded-xl border border-gray-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="font-semibold text-gray-900">{doc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 p-8 sm:p-12 rounded-3xl border border-gray-200 space-y-6 shadow-sm">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            জিজ্ঞাসাবাদ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            প্রায়শই জিজ্ঞাসিত প্রশ্ন (FAQ)
          </h2>
          <p className="text-xs text-gray-600">
            উমরাহ সফর সংক্রান্ত সাধারণ জিজ্ঞাসা ও উত্তর
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-4 sm:p-5 flex justify-between items-center space-x-4 cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0" />
                  <span className="text-sm font-bold text-gray-900">{faq.q}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openFaqIndex === idx ? 'rotate-180 text-[#DC2626]' : ''
                  }`}
                />
              </button>

              {openFaqIndex === idx && (
                <div className="p-4 sm:p-5 bg-red-50/30 border-t border-gray-100 text-xs text-gray-700 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="bg-gradient-to-r from-[#DC2626] via-[#B71C1C] to-[#991B1B] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full inline-block">
            পবিত্র উমরাহ যাত্রা
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-sans">
            আজই আপনার উমরাহ যাত্রা শুরু করুন
          </h2>
          <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
            আল্লাহর ঘর জিয়ারতের পবিত্র সফরকে সহজ, নিরাপদ ও স্মরণীয় করতে Dreams Fly International সর্বদা আপনার পাশে।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onOpenBookingModal('উমরাহ প্যাকেজ বুকিং')}
            className="px-8 py-4 bg-white text-[#DC2626] hover:bg-red-50 font-black rounded-2xl text-sm uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <PhoneCall className="w-4 h-4 text-[#DC2626]" />
            <span>ফ্রি কনসালটেশন নিন</span>
          </button>
        </div>
      </div>

      {/* DETAILED UMRAH PACKAGE MODAL */}
      {selectedUmrahDetail && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden relative border border-gray-200 my-8 p-6 sm:p-8 space-y-6">
            <button
              onClick={handleCloseUmrahPackage}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center font-bold cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <span className={`text-xs font-black uppercase px-3 py-1 rounded-full border ${selectedUmrahDetail.badgeBg}`}>
                {selectedUmrahDetail.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
                {selectedUmrahDetail.title}
              </h2>
              <div className="flex items-center space-x-3 text-xs text-gray-600">
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-[#DC2626]" />
                  <span>সময়সীমা: {selectedUmrahDetail.duration}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Hotel className="w-4 h-4 text-[#DC2626]" />
                  <span>{selectedUmrahDetail.hotel}</span>
                </span>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-gray-600 block">প্যাকেজ মূল্য (প্রতি ব্যক্তি):</span>
                <span className="text-2xl font-black text-[#DC2626]">
                  {selectedUmrahDetail.priceBDT > 0
                    ? currency === 'BDT'
                      ? `৳${selectedUmrahDetail.priceBDT.toLocaleString()} টাকা`
                      : `$${selectedUmrahDetail.priceUSD} USD`
                    : selectedUmrahDetail.priceText}
                </span>
              </div>
              <span className="text-xs font-semibold text-gray-500">সকল ট্যাক্সসহ অন্তর্ভুক্ত</span>
            </div>

            <PriceNotice />

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
                প্যাকেজের অন্তর্ভুক্ত সুবিধাসমূহ:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                {selectedUmrahDetail.features.map((feat: string, idx: number) => (
                  <li key={idx} className="flex items-start space-x-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const title = selectedUmrahDetail.title;
                  handleCloseUmrahPackage();
                  onOpenBookingModal(`উমরাহ প্যাকেজ বুকিং: ${title}`);
                }}
                className="flex-1 py-3.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow cursor-pointer text-center"
              >
                বুকিং আবেদন করুন
              </button>
              <a
                href={`https://wa.me/8801973133230?text=${encodeURIComponent('আসসালামু আলাইকুম, ' + selectedUmrahDetail.title + ' সম্পর্কে আরও জানতে চাই।')}`}
                target="_blank"
                rel="noreferrer"
                className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow text-center flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>হোয়াটসঅ্যাপে যোগাযোগ</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
