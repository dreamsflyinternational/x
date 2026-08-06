import React from 'react';
import {
  Award,
  ShieldCheck,
  Users,
  Plane,
  Globe,
  Briefcase,
  Compass,
  Hotel,
  Shield,
  FileText,
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  MessageCircle,
  CheckSquare,
  ExternalLink,
  MapPin,
  Clock,
  HeartHandshake
} from 'lucide-react';

interface AboutViewProps {
  onOpenBookingModal: (serviceType?: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenBookingModal }) => {
  const handleWhatsApp = (msg?: string) => {
    const defaultText = msg || 'আসসালামু আলাইকুম, ড্রিমস ফ্লাই ইন্টারন্যাশনাল সম্পর্কে বিস্তারিত জানতে চাই।';
    window.open(`https://wa.me/8801771304219?text=${encodeURIComponent(defaultText)}`, '_blank');
  };

  const services = [
    {
      icon: Plane,
      title: 'Air Ticketing',
      desc: 'দেশীয় ও আন্তর্জাতিক সকল রুটের এয়ার টিকিট বুকিং।',
      action: 'এয়ার টিকিট বুকিং'
    },
    {
      icon: Globe,
      title: 'Visa Processing',
      desc: 'Tourist, Business, Student, Work Permit, Medical ও Visit Visa প্রসেসিং সহায়তা।',
      action: 'ভিসা প্রসেসিং'
    },
    {
      icon: Briefcase,
      title: 'Work Permit',
      desc: 'বিভিন্ন দেশের বৈধ ওয়ার্ক পারমিট সংক্রান্ত পরামর্শ ও আবেদন সহায়তা।',
      action: 'ওয়ার্ক পারমিট'
    },
    {
      icon: ShieldCheck,
      title: 'Umrah & Hajj',
      desc: 'উমরাহ ও হজের জন্য সম্পূর্ণ প্যাকেজ, ভিসা, টিকিট, হোটেল এবং গাইডেন্স।',
      action: 'উমরাহ ও হজ'
    },
    {
      icon: Compass,
      title: 'Tour Packages',
      desc: 'দেশীয় ও আন্তর্জাতিক ট্যুর প্যাকেজ, হানিমুন, ফ্যামিলি, গ্রুপ এবং কর্পোরেট ট্যুর।',
      action: 'ট্যুর প্যাকেজ'
    },
    {
      icon: Hotel,
      title: 'Hotel Booking',
      desc: 'বিশ্বের বিভিন্ন দেশে নির্ভরযোগ্য হোটেল বুকিং সেবা।',
      action: 'হোটেল বুকিং'
    },
    {
      icon: Shield,
      title: 'Travel Insurance',
      desc: 'আন্তর্জাতিক ভ্রমণের জন্য ট্রাভেল ইন্স্যুরেন্স ব্যবস্থা।',
      action: 'ট্রাভেল ইন্স্যুরেন্স'
    },
    {
      icon: FileText,
      title: 'Travel Consultation',
      desc: 'ভ্রমণ পরিকল্পনা, ডকুমেন্টেশন এবং সম্পূর্ণ ট্রাভেল গাইডেন্স।',
      action: 'ট্রাভেল কনসালটেশন'
    },
  ];

  const whyChooseUs = [
    'অভিজ্ঞ ও দক্ষ কনসালটেন্ট টিম',
    'গ্রাহককেন্দ্রিক সেবা',
    'স্বচ্ছ ও নির্ভরযোগ্য প্রক্রিয়া',
    'প্রতিযোগিতামূলক সার্ভিস চার্জ',
    'দ্রুত ও পেশাদার সহায়তা',
    'ডকুমেন্টেশন সহায়তা',
    'ভ্রমণের পূর্ব ও পরবর্তী সাপোর্ট',
    '২৪/৭ অনলাইন কাস্টমার সাপোর্ট'
  ];

  const steps = [
    {
      num: '১',
      title: 'ফ্রি কনসালটেশন',
      desc: 'আপনার প্রয়োজন ও লক্ষ্য সম্পর্কে বিস্তারিত আলোচনা করা হয়।'
    },
    {
      num: '২',
      title: 'ডকুমেন্ট যাচাই',
      desc: 'প্রয়োজনীয় কাগজপত্র পর্যালোচনা ও নিখুঁতভাবে প্রস্তুত করা হয়।'
    },
    {
      num: '৩',
      title: 'আবেদন প্রক্রিয়া',
      desc: 'দূতাবাসের নির্ধারিত নিয়ম অনুযায়ী ডিজিটাল আবেদন সম্পন্ন করা হয়।'
    },
    {
      num: '৪',
      title: 'নিয়মিত আপডেট',
      desc: 'প্রতিটি ধাপে আবেদনকারীর সঙ্গে সার্বক্ষণিক যোগাযোগ রাখা হয়।'
    },
    {
      num: '৫',
      title: 'সফল ভ্রমণ',
      desc: 'সফলভাবে ভিসা ও ভ্রমণ সম্পন্ন করতে সর্বোচ্চ সহায়তা প্রদান করা হয়।'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-900 space-y-16 animate-in fade-in">
      {/* 1. HERO TITLE HEADER BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-800 to-gray-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-red-500/20">
        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="inline-flex items-center space-x-2 bg-amber-400 text-gray-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow">
            <Sparkles className="w-4 h-4 text-gray-900" />
            <span>আপনার বিশ্বস্ত ট্রাভেল ও ভিসা সল্যুশন পার্টনার</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-sans text-white leading-tight">
            Dreams Fly International
          </h1>

          <p className="text-sm sm:text-base text-gray-100 font-normal leading-relaxed">
            <strong>Dreams Fly International</strong> একটি নির্ভরযোগ্য ট্রাভেল ও ভিসা কনসালটেন্সি প্রতিষ্ঠান, যা বাংলাদেশ থেকে বিশ্বের বিভিন্ন দেশে ভ্রমণ, শিক্ষা, চাকরি এবং ধর্মীয় সফরের জন্য পেশাদার সেবা প্রদান করে। আমাদের লক্ষ্য হলো প্রতিটি গ্রাহকের বিদেশ ভ্রমণের স্বপ্নকে সহজ, নিরাপদ এবং ঝামেলামুক্ত করা।
          </p>

          <p className="text-xs sm:text-sm text-gray-200 font-light leading-relaxed">
            আমরা বিশ্বাস করি, সঠিক পরামর্শ, স্বচ্ছ প্রক্রিয়া এবং আন্তরিক সেবাই একজন গ্রাহকের আস্থা অর্জনের সবচেয়ে বড় ভিত্তি। তাই প্রতিটি ক্লায়েন্টের প্রয়োজন ও লক্ষ্য অনুযায়ী ব্যক্তিগতভাবে পরামর্শ প্রদান করে সর্বোত্তম সমাধান নিশ্চিত করার চেষ্টা করি।
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenBookingModal('ফ্রি কনসালটেশন')}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
            >
              <CheckSquare className="w-4 h-4" />
              <span>ফ্রি কনসালটেশন বুক করুন</span>
            </button>

            <button
              onClick={() => handleWhatsApp()}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer flex items-center space-x-2 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>হোয়াটসঅ্যাপ মেসেজ করুন (+880 1771-304219)</span>
            </button>
          </div>
        </div>

        {/* Subtle Decorative Background Graphic */}
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none hidden md:block">
          <Globe className="w-96 h-96 text-white" />
        </div>
      </div>

      {/* 2. FOUNDER & AGENCY OWNER PROFILE CARD */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-xl space-y-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          {/* Owner Photo Box */}
          <div className="relative group flex-shrink-0 flex flex-col items-center">
            <div className="w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400 bg-gray-900 relative">
              <img
                src="https://lh3.googleusercontent.com/d/1mUdnFkm_-jt_1TI3xxhpRgjZ_ua_HLfX"
                alt="MD Jahan Ali - Founder & Owner"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.dataset.tried) {
                    target.dataset.tried = 'true';
                    target.src = 'https://drive.google.com/uc?export=view&id=1mUdnFkm_-jt_1TI3xxhpRgjZ_ua_HLfX';
                  }
                }}
              />
              <div className="absolute top-3 left-3 z-10">
                <span className="px-3 py-1 bg-[#DC2626] text-white text-[11px] font-black rounded-md uppercase tracking-wider shadow-lg border border-red-500">
                  FOUNDER & OWNER
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 text-white z-10">
                <h3 className="text-xl font-black text-white font-sans drop-shadow-md">MD Jahan Ali</h3>
                <p className="text-xs text-amber-300 font-bold">Founder & Agency Owner</p>
              </div>
            </div>

            {/* Prominent, crystal-clear agency label badge below photo */}
            <div className="mt-4 px-6 py-2.5 bg-gradient-to-r from-red-900 via-red-700 to-red-900 text-white rounded-xl shadow-xl border-2 border-amber-400 text-center w-full max-w-[280px]">
              <span className="text-amber-300 font-extrabold text-xs sm:text-sm tracking-wider uppercase block drop-shadow-sm">
                ★ Dreams Fly International ★
              </span>
            </div>
          </div>

          {/* Owner Bio & Social Details */}
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <div className="space-y-1">
              <span className="text-xs font-black text-[#DC2626] uppercase tracking-widest block">
                প্রতিষ্ঠাতা ও স্বত্বাধিকারীর বার্তা (Founder & Owner Message)
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
                MD Jahan Ali
              </h2>
              <p className="text-xs sm:text-sm font-bold text-amber-600">
                Founder & Owner, Dreams Fly International
              </p>
            </div>

            <blockquote className="text-xs sm:text-sm text-gray-700 italic bg-red-50/60 p-4 sm:p-5 rounded-2xl border-l-4 border-[#DC2626] leading-relaxed">
              "আমাদের লক্ষ্য হলো বৈশ্বিক ভ্রমণের প্রতিটি পদক্ষেপে সঠিক দিকনির্দেশনা, সর্বোচ্চ স্বচ্ছতা ও শতভাগ পেশাদারিত্ব বজায় রাখা। আমরা কখনোই মিথ্যা প্রতিশ্রুতি বা অবাস্তব গ্যারান্টিতে বিশ্বাস করি না। আপনার সততা ও আমাদের কঠোর পরিশ্রম দিয়েই আজ ড্রিমস ফ্লাই ইন্টারন্যাশনাল বাংলাদেশের অন্যতম বিশ্বস্ত ভিসা ও ট্রাভেল এজেন্সিতে পরিণত হয়েছে।"
            </blockquote>

            <p className="text-xs text-gray-600 leading-relaxed">
              জনাব <strong>MD Jahan Ali</strong>-এর সুদূরপ্রসারী নেতৃত্বে ড্রিমস ফ্লাই ইন্টারন্যাশনাল বিশ্বমানের সেবা প্রদান করে আসছে। যেকোনো পরামর্শ বা বিশ্বস্ত ভিসা ও টিকিট সেবার জন্য ওনার সোশ্যাল মিডিয়া প্রোফাইলে যুক্ত হতে পারেন:
            </p>

            {/* Social Media Links Provided by User */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {/* Facebook */}
              <a
                href="https://web.facebook.com/mjjahan2/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#1877F2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shadow cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook Profile</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/mjjahan/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#0A66C2] hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shadow cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.77a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
                </svg>
                <span>LinkedIn Profile</span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/mjjahanali/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-90 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shadow cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram Profile</span>
              </a>

              {/* Twitter / X */}
              <a
                href="https://x.com/MJJAHAN6"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-black hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shadow cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>X (Twitter) Profile</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MISSION & VISION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission Card */}
        <div className="bg-gradient-to-br from-red-50 via-white to-amber-50/40 p-8 rounded-3xl border border-red-200 shadow-md space-y-4 hover:border-red-300 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#DC2626] text-white flex items-center justify-center font-bold shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black font-sans text-gray-900">
            আমাদের লক্ষ্য (Our Mission)
          </h3>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
            মানসম্মত, নির্ভরযোগ্য এবং স্বচ্ছ ট্রাভেল ও ভিসা সেবা প্রদান করে দেশের মানুষের আন্তর্জাতিক ভ্রমণকে আরও সহজ ও নিরাপদ করে তোলা। আমরা প্রতিটি গ্রাহকের আস্থা অর্জনকে আমাদের সর্বোচ্চ সাফল্য হিসেবে বিবেচনা করি।
          </p>
        </div>

        {/* Vision Card */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-red-950 p-8 rounded-3xl border border-gray-700 text-white shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-gray-900 flex items-center justify-center font-bold shadow-lg">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black font-sans text-white">
            আমাদের ভিশন (Our Vision)
          </h3>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal">
            বাংলাদেশের অন্যতম বিশ্বস্ত এবং আন্তর্জাতিক মানের ট্রাভেল ও ভিসা সার্ভিস ব্র্যান্ড হিসেবে প্রতিষ্ঠিত হওয়া, যেখানে গ্রাহকরা এক ছাতার নিচে সকল ভ্রমণ-সংক্রান্ত সেবা পাবেন।
          </p>
        </div>
      </div>

      {/* 4. OUR SERVICES GRID */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-widest block">
            আমাদের সার্ভিসসমূহ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            আমরা যেসব সেবা প্রদান করি
          </h2>
          <p className="text-xs text-gray-600">
            আন্তর্জাতিক মানের সেবা ও নিবেদিত সাপোর্ট দিয়ে আপনার বিদেশ যাত্রাকে মসৃণ করি
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv, idx) => {
            const IconComponent = srv.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-red-300 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-red-50 text-[#DC2626] group-hover:bg-[#DC2626] group-hover:text-white transition-colors flex items-center justify-center shadow-sm">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-black font-sans text-gray-900">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <button
                  onClick={() => onOpenBookingModal(srv.action)}
                  className="w-full py-2.5 bg-gray-50 hover:bg-[#DC2626] text-gray-800 hover:text-white border border-gray-200 hover:border-red-600 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center space-x-1"
                >
                  <span>আবেদন বা তথ্য নিন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. WHY DREAMS FLY INTERNATIONAL? */}
      <div className="bg-gradient-to-r from-red-50 via-white to-red-50 p-8 sm:p-12 rounded-3xl border border-red-200 shadow-lg space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-widest block">
            সেরা পছন্দের কারণ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            কেন Dreams Fly International?
          </h2>
          <p className="text-xs text-gray-600">
            যে কারণে হাজারো পাসপোর্ট হোল্ডার আমাদের উপর শতভাগ ভরসা রাখেন
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyChooseUs.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl border border-gray-200 flex items-center space-x-3 shadow-sm hover:border-red-300 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-800 leading-tight">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. OUR WORK PROCESS (আমাদের কাজের ধাপ) */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-widest block">
            কর্মপদ্ধতি
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            আমাদের কাজের সহজ ৫টি ধাপ
          </h2>
          <p className="text-xs text-gray-600">
            স্বচ্ছতা ও নিয়মানুবর্তিতার মাধ্যমে নিখুঁত সার্ভিস নিশ্চিতকরণ
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative space-y-3 hover:shadow-md transition-all text-center flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 mx-auto rounded-full bg-[#DC2626] text-white font-black text-sm flex items-center justify-center shadow-md mb-3">
                  {st.num}
                </div>
                <h3 className="text-sm font-black text-gray-900">{st.title}</h3>
                <p className="text-[11px] text-gray-600 leading-relaxed mt-1">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. OUR COMMITMENT (আমাদের অঙ্গীকার) */}
      <div className="bg-gray-900 text-white p-8 sm:p-10 rounded-3xl border border-gray-800 shadow-2xl space-y-4">
        <div className="flex items-center space-x-3 text-amber-400">
          <HeartHandshake className="w-8 h-8" />
          <h2 className="text-xl sm:text-2xl font-black font-sans text-white">
            আমাদের অঙ্গীকার (Our Commitment)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
          <strong>Dreams Fly International</strong> সবসময় বৈধ, নৈতিক এবং স্বচ্ছ ব্যবসায়িক নীতিতে বিশ্বাস করে। আমরা কখনোই মিথ্যা প্রতিশ্রুতি বা অবাস্তব গ্যারান্টি প্রদান করি না। প্রতিটি আবেদন সংশ্লিষ্ট দেশের দূতাবাস বা ইমিগ্রেশন কর্তৃপক্ষের নিয়ম অনুযায়ী পরিচালিত হয়। আমাদের মূল লক্ষ্য হলো সঠিক তথ্য, পেশাদার পরামর্শ এবং নির্ভরযোগ্য সেবার মাধ্যমে প্রতিটি গ্রাহকের সাথে দীর্ঘমেয়াদি বিশ্বস্ত সম্পর্ক গড়ে তোলা।
        </p>
      </div>

      {/* 8. CONTACT INFORMATION & DIRECT CONNECT */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-xl space-y-6">
        <div className="border-b pb-4 space-y-1">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-widest block">
            সরাসরি যোগাযোগ
          </span>
          <h2 className="text-2xl font-black font-sans text-gray-900">
            Dreams Fly International — যোগাযোগ তথ্য
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Website */}
          <div className="p-5 bg-red-50/60 rounded-2xl border border-red-100 space-y-2">
            <div className="flex items-center space-x-2 text-[#DC2626] font-bold">
              <Globe className="w-5 h-5" />
              <span className="text-sm font-black">অফিসিয়াল ওয়েবসাইট</span>
            </div>
            <p className="text-gray-600">আমাদের সকল সেবা ও সর্বশেষ আপডেট দেখতে ভিজিট করুন:</p>
            <a
              href="https://dreamsfly.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-sm font-black text-[#DC2626] hover:underline"
            >
              <span>https://dreamsfly.net/</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Phone */}
          <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-100 space-y-2">
            <div className="flex items-center space-x-2 text-amber-700 font-bold">
              <Phone className="w-5 h-5" />
              <span className="text-sm font-black">ফোন ও হোয়াটসঅ্যাপ</span>
            </div>
            <p className="text-gray-600">২৪/৭ অনলাইন কাস্টমার সার্ভিস ও দ্রুত রেসপন্স:</p>
            <a
              href="tel:+8801771304219"
              className="block text-sm font-black text-gray-900 hover:text-[#DC2626]"
            >
              +880 1771-304219
            </a>
          </div>

          {/* Email */}
          <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2">
            <div className="flex items-center space-x-2 text-blue-700 font-bold">
              <Mail className="w-5 h-5" />
              <span className="text-sm font-black">অফিসিয়াল ইমেইল</span>
            </div>
            <p className="text-gray-600">আপনার প্রশ্ন বা ফাইল যাচাইয়ের জন্য ইমেইল করুন:</p>
            <a
              href="mailto:dreamsflyinternational@gmail.com"
              className="block text-sm font-black text-blue-800 hover:underline break-all"
            >
              dreamsflyinternational@gmail.com
            </a>
          </div>
        </div>

        {/* Office Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
            <div className="flex items-center space-x-2 text-[#DC2626] font-bold mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-extrabold text-gray-900">Office 1 (ঢাকা শাখা)</span>
            </div>
            <p className="text-gray-700 font-medium">
              রোড নং ১৬, রূপনগর, মিরপুর ১১, ঢাকা ১২১৬
            </p>
          </div>

          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
            <div className="flex items-center space-x-2 text-[#DC2626] font-bold mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-extrabold text-gray-900">Office 2 (চাঁপাইনবাবগঞ্জ শাখা)</span>
            </div>
            <p className="text-gray-700 font-medium">
              রহনপুর, গোমস্তাপুর, চাঁপাইনবাবগঞ্জ
            </p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="p-5 bg-slate-100 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <span className="font-extrabold text-gray-900 block text-sm">কোম্পানির সোশ্যাল মিডিয়া পেজ:</span>
            <span className="text-gray-500">সর্বশেষ খবরাখবর ও সোশ্যাল মিডিয়া আপডেটের জন্য আমাদের ফলো করুন</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://web.facebook.com/dreamsfly/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-sm"
            >
              Facebook Page
            </a>
            <a
              href="https://www.linkedin.com/company/dreams-fly-international/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-xl font-bold transition-all shadow-sm"
            >
              LinkedIn Page
            </a>
          </div>
        </div>

        {/* Closing Slogan Banner */}
        <div className="p-6 bg-gradient-to-r from-red-700 to-gray-900 rounded-2xl text-white text-center space-y-2 shadow-lg">
          <p className="text-sm sm:text-base font-black">
            আপনার স্বপ্নের গন্তব্যে পৌঁছানোর যাত্রা শুরু হোক Dreams Fly International-এর সাথে।
          </p>
          <p className="text-xs text-amber-300 font-bold tracking-wider uppercase">
            Dreams Fly International — Your Trusted Partner for Travel, Visa & Global Opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};
