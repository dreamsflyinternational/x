import React, { useState } from 'react';
import { PriceNotice } from '../components/PriceNotice';
import { CountryFlagSvg } from '../components/CountryFlagSvg';
import {
  Plane,
  Calendar,
  Users,
  Search,
  CheckCircle2,
  ShieldCheck,
  Clock,
  ChevronDown,
  PhoneCall,
  MessageCircle,
  Download,
  Luggage,
  Award,
  Sparkles,
  ArrowRight,
  Briefcase,
  Zap,
  Globe,
  MapPin,
  BellRing,
  FileText,
  Building2,
  CheckSquare,
  AlertTriangle,
  RefreshCw,
  Tag,
  DollarSign,
  Star,
  Send,
  Headphones
} from 'lucide-react';
import { FlightSearchEngine } from '../components/FlightSearchEngine';
import { ALL_AIRLINES } from '../data/airlinesData';

interface AirTicketingViewProps {
  currency?: 'BDT' | 'USD';
  onOpenBookingModal: (serviceType?: string) => void;
  onSelectAirline?: (airlineId: string) => void;
}

export const AirTicketingView: React.FC<AirTicketingViewProps> = ({
  currency = 'BDT',
  onOpenBookingModal,
  onSelectAirline
}) => {
  const [activeTool, setActiveTool] = useState<'none' | 'bundle' | 'reqChecker' | 'baggageCalc'>('none');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Quick Flight Inquiry Form State
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    origin: 'Dhaka (DAC)',
    destination: 'Dubai (DXB)',
    departDate: '',
    passengers: '1',
    cabin: 'Economy'
  });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquirySubmitting, setInquirySubmitting] = useState(false);

  // Modals
  const [showFareAlertModal, setShowFareAlertModal] = useState(false);
  const [fareAlertRoute, setFareAlertRoute] = useState({ origin: 'DAC', destination: 'DXB', email: '', phone: '' });
  const [fareAlertSuccess, setFareAlertSuccess] = useState(false);

  const [showGroupBookingModal, setShowGroupBookingModal] = useState(false);
  const [groupForm, setGroupForm] = useState({
    name: '',
    phone: '',
    origin: 'Dhaka (DAC)',
    destination: 'Jeddah (JED)',
    passengers: 12,
    travelDate: ''
  });
  const [groupSubmitted, setGroupSubmitted] = useState(false);

  // Tools states
  const [reqCountry, setReqCountry] = useState('saudi');
  const [calcAirline, setCalcAirline] = useState('emirates');
  const [extraBaggageKg, setExtraBaggageKg] = useState(10);

  const handleWhatsApp = (msg?: string) => {
    const defaultText = msg || 'আসসালামু আলাইকুম, ড্রিমস ফ্লাই থেকে এয়ার টিকিট বুকিং ও তথ্য জানতে চাই।';
    window.open(`https://wa.me/8801771304219?text=${encodeURIComponent(defaultText)}`, '_blank');
  };

  const handleFareAlertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/inquiry/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Air Fare Alert Subscription',
          ...fareAlertRoute,
        }),
      });
    } catch (err) {
      console.error('Fare alert submit error:', err);
    }
    setFareAlertSuccess(true);
    setTimeout(() => {
      setFareAlertSuccess(false);
      setShowFareAlertModal(false);
      setFareAlertRoute({ origin: 'DAC', destination: 'DXB', email: '', phone: '' });
    }, 2000);
  };

  const handleGroupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/inquiry/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Group Flight Booking Request (10+ Passengers)',
          ...groupForm,
        }),
      });
    } catch (err) {
      console.error('Group booking submit error:', err);
    }
    setGroupSubmitted(true);
    setTimeout(() => {
      setGroupSubmitted(false);
      setShowGroupBookingModal(false);
    }, 2000);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitting(true);
    try {
      await fetch('/api/inquiry/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Direct Air Ticket Quote Request',
          ...inquiryForm
        })
      });
    } catch (err) {
      console.error('Inquiry submit error:', err);
    }
    setInquirySubmitting(false);
    setInquirySubmitted(true);
  };

  // Popular routes
  const popularRoutes = [
    {
      countryId: 'uae',
      routeBn: 'ঢাকা → দুবাই (DXB)',
      duration: '4h 45m (Direct)',
      airlines: 'Emirates, Flydubai, US-Bangla',
      price: '৳৩৮,৫০০',
      priceUSD: '$350',
      tag: 'সবচেয়ে জনপ্রিয়'
    },
    {
      countryId: 'malaysia',
      routeBn: 'ঢাকা → কুয়ালালামপুর (KUL)',
      duration: '3h 55m (Direct)',
      airlines: 'AirAsia, Malaysia Airlines, Biman',
      price: '৳৩২,০০০',
      priceUSD: '$290',
      tag: 'সেরা ভ্যালু'
    },
    {
      countryId: 'saudi-arabia',
      routeBn: 'ঢাকা → জেদ্দা / রিয়াদ',
      duration: '6h 15m (Direct)',
      airlines: 'Saudia, Biman Bangladesh',
      price: '৳৪৫,০০০',
      priceUSD: '$410',
      tag: 'উমরাহ ও জব'
    },
    {
      countryId: 'uk',
      routeBn: 'ঢাকা → লন্ডন (LHR)',
      duration: '10h 30m (Direct/1 Stop)',
      airlines: 'Biman Bangladesh, Qatar Airways',
      price: '৳৮৫,০০০',
      priceUSD: '$770',
      tag: 'ট্রেন্ডিং'
    },
    {
      countryId: 'thailand',
      routeBn: 'ঢাকা → ব্যাংকক (BKK)',
      duration: '2h 30m (Direct)',
      airlines: 'Thai Airways, US-Bangla, Biman',
      price: '৳২৭,৯০০',
      priceUSD: '$250',
      tag: 'ভ্যাকেশন ফেভারিট'
    },
    {
      countryId: 'singapore',
      routeBn: 'ঢাকা → সিঙ্গাপুর (SIN)',
      duration: '4h 00m (Direct)',
      airlines: 'Singapore Airlines, US-Bangla, Biman',
      price: '৳৩৬,৫০০',
      priceUSD: '$330',
      tag: 'লাক্সারি হাব'
    },
    {
      countryId: 'canada',
      routeBn: 'ঢাকা → টরোন্টো (YYZ)',
      duration: '16h 15m (1 Stop)',
      airlines: 'Biman Bangladesh, Emirates, Qatar',
      price: '৳১২৫,০০০',
      priceUSD: '$1,130',
      tag: 'স্টুডেন্ট চয়েস'
    },
    {
      countryId: 'italy',
      routeBn: 'ঢাকা → রোম (FCO)',
      duration: '9h 45m (Direct)',
      airlines: 'Biman Bangladesh, Turkish Airlines',
      price: '৳৬৫,০০০',
      priceUSD: '$590',
      tag: 'ডাইরেক্ট ফ্লাইট'
    }
  ];

  // Requirements
  const requirementRules: Record<string, { title: string; passport: string; visa: string; health: string }> = {
    saudi: {
      title: 'সৌদি আরব ভ্রমণ নির্দেশিকা',
      passport: 'কমপক্ষে ৬ মাসের মেয়াদ থাকতে হবে।',
      visa: 'উমরাহ, ট্যুরিস্ট বা ওয়ার্ক ভিসা থাকতে হবে।',
      health: 'ভ্যাকসিনেশন কার্ড সাথে রাখা বাঞ্ছনীয়।'
    },
    uae: {
      title: 'সংযুক্ত আরব আমিরাত (দুবাই) নির্দেশিকা',
      passport: 'ন্যূনতম ৬ মাসের ভ্যালিডিটি থাকা আবশ্যক।',
      visa: 'ই-ভিসা অথবা ভ্যালিড ট্যুরিস্ট এন্ট্রি পারমিট ও রিটার্ন টিকিট।',
      health: 'ট্রাভেল ইন্স্যুরেন্স ও হোটেল বুকিং কপি সাথে রাখুন।'
    },
    malaysia: {
      title: 'মালয়েশিয়া ভ্রমণ নির্দেশিকা',
      passport: 'ন্যূনতম ৬ মাসের মেয়াদকাল ও ৩টি খালি পাতা।',
      visa: 'মালয়েশিয়া ই-ভিসা (MDAC) ডিজিটালি জমা দিতে হবে।',
      health: 'রিটার্ন টিকিট ও হোটেল বুকিং রসিদ আবশ্যক।'
    },
    uk: {
      title: 'যুক্তরাজ্য (লন্ডন) ভ্রমণ নির্দেশিকা',
      passport: 'ভ্রমণ মেয়াদের বেশি পাসপোর্ট মেয়াদ।',
      visa: 'ইউকে স্ট্যান্ডার্ড ভিজিটর বা স্টুডেন্ট ভিসা আবশ্যক।',
      health: 'টিবি টেস্ট সার্টিফাইড ল্যাব থেকে (স্টুডেন্টদের জন্য)।'
    }
  };

  const faqList = [
    {
      q: 'কত আগে টিকিট বুক করলে সবচেয়ে কম দামে পাওয়া যায়?',
      a: 'আন্তর্জাতিক ফ্লাইটের টিকিট ভ্রমণের অন্তত ২০ থেকে ৪৫ দিন পূর্বে বুকিং করলে সেরা ফেয়ার ব্র্যাকেট পাওয়া যায়।'
    },
    {
      q: 'টিকিট বুকিং করার পর কীভাবে পেমেন্ট করবো?',
      a: 'আপনি আমাদের ব্যাংক অ্যাকাউন্ট (BRAC, City Bank, Prime Bank), বিকাশ, নগদ অথবা শোরুমে এসে ক্যাশে পেমেন্ট করতে পারবেন।'
    },
    {
      q: 'টিকিটের তারিখ পরিবর্তন (Reschedule) বা ক্যানসেল করা যাবে?',
      a: 'জি! এয়ারলাইন্সের পলিসি অনুযায়ী নির্ধারিত ফি দিয়ে ফ্লাইট রিশিডিউল বা বাতিল করা সম্ভব। আমাদের টিম সার্বক্ষণিক সহায়তা দেয়।'
    },
    {
      q: 'ক্যাবিন ও চেক-ইন ব্যাগেজ কত কেজি নেওয়া যায়?',
      a: 'সাধারণত ইকোনমি ক্লাসে ২০-৩৫ কেজি চেক-ইন ব্যাগেজ এবং ৭ কেজি হ্যান্ড ক্যাবিনে নেওয়ার অনুমতি থাকে।'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 selection:bg-red-600 selection:text-white">

      {/* Top Hotline Bar */}
      <div className="bg-slate-900 text-slate-200 py-2 px-4 text-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase">
              IATA Verified
            </span>
            <span className="hidden sm:inline font-medium">জরুরি এয়ার টিকিট ও এয়ারলাইন বুকিং সেবা</span>
          </div>
          <div className="flex items-center space-x-4 font-bold text-xs">
            <a href="tel:+8801771304219" className="hover:text-amber-400 flex items-center space-x-1">
              <PhoneCall className="w-3.5 h-3.5 text-red-500" />
              <span>+880 1771-304219</span>
            </a>
            <button onClick={() => handleWhatsApp()} className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 cursor-pointer">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10">

        {/* ================= HERO HEADER & SEARCH ENGINE ================= */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-red-950 text-white rounded-3xl p-5 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>গ্যারান্টেড সর্বনিম্ন এয়ার ফেয়ার ও দ্রুততম ই-টিকিট</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              সহজে খুঁজুন ও বুক করুন <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-300">দেশি-বিদেশি ফ্লাইট</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Emirates, Qatar, Biman, US-Bangla, Saudia সহ বিশ্বের সকল জনপ্রিয় এয়ারলাইনসের আসল ফেয়ার দেখুন
            </p>
          </div>

          {/* Quick Service Shortcuts Bar */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-1">
            <button
              onClick={() => setShowFareAlertModal(true)}
              className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs font-bold text-amber-300 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <BellRing className="w-3.5 h-3.5" />
              <span>ফেয়ার অ্যালার্ট সেট করুন</span>
            </button>
            <button
              onClick={() => setShowGroupBookingModal(true)}
              className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs font-bold text-emerald-300 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Users className="w-3.5 h-3.5" />
              <span>গ্রুপ বুকিং (১০+ জন)</span>
            </button>
            <button
              onClick={() => handleWhatsApp('আসসালামু আলাইকুম, আমি সরাসরি কাস্টম ফ্লাইট কোটেশন জানতে চাই।')}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp সরাসরি রেট জানুন</span>
            </button>
          </div>

          {/* Integrated Flight Search Engine Component */}
          <div className="bg-white text-slate-900 rounded-2xl p-4 sm:p-6 shadow-2xl">
            <FlightSearchEngine
              currency={currency}
              onBookFlight={(flight) => {
                onOpenBookingModal(`ফ্লাইট বুকিং: ${flight.airline} (${flight.origin} - ${flight.destination})`);
              }}
            />
          </div>
        </section>

        {/* ================= TRUST HIGHLIGHTS ================= */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center space-x-3 shadow-xs">
            <ShieldCheck className="w-7 h-7 text-emerald-600 shrink-0" />
            <div>
              <h3 className="text-xs font-extrabold text-slate-900">IATA Verified</h3>
              <p className="text-[11px] text-slate-500">অনুমোদিত এজেন্সি</p>
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center space-x-3 shadow-xs">
            <DollarSign className="w-7 h-7 text-amber-600 shrink-0" />
            <div>
              <h3 className="text-xs font-extrabold text-slate-900">Best Price Guarantee</h3>
              <p className="text-[11px] text-slate-500">হিডেন চার্জ ছাড়া ফেয়ার</p>
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center space-x-3 shadow-xs">
            <Zap className="w-7 h-7 text-red-600 shrink-0" />
            <div>
              <h3 className="text-xs font-extrabold text-slate-900">Instant E-Ticket</h3>
              <p className="text-[11px] text-slate-500">৫-১৫ মিনিটে ই-টিকিট</p>
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center space-x-3 shadow-xs">
            <Headphones className="w-7 h-7 text-blue-600 shrink-0" />
            <div>
              <h3 className="text-xs font-extrabold text-slate-900">24/7 Agent Support</h3>
              <p className="text-[11px] text-slate-500">সার্বক্ষণিক তথ্য সেবা</p>
            </div>
          </div>
        </section>

        {/* ================= POPULAR ROUTES & BEST FARES ================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900">
                জনপ্রিয় ফ্লাইট রুট ও বর্তমান ফেয়ার
              </h2>
              <p className="text-xs text-slate-500">বাংলাদেশ থেকে সর্বাধিক ট্রাভেল হওয়া গন্তব্যসমূহ</p>
            </div>
            <button
              onClick={() => onOpenBookingModal('ফ্লাইট কোটেশন সাপোর্ট')}
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center space-x-1 cursor-pointer"
            >
              <span>সকল রুট দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularRoutes.map((r, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 hover:border-red-400 p-4 rounded-2xl space-y-3 transition-all hover:shadow-lg flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <CountryFlagSvg countryId={r.countryId} className="w-6 h-4 rounded-xs border border-slate-200" />
                    <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      {r.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-red-600 transition-colors">
                      {r.routeBn}
                    </h3>
                    <span className="text-[11px] text-slate-400 block font-mono">⏱️ {r.duration}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    <span className="font-semibold text-slate-700">এয়ারলাইনস:</span> {r.airlines}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">শুরু</span>
                    <span className="text-sm font-black text-red-600">{currency === 'USD' ? r.priceUSD : r.price}</span>
                  </div>
                  <button
                    onClick={() => onOpenBookingModal(`ফ্লাইট বুকিং: ${r.routeBn}`)}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-sm shadow-red-600/20"
                  >
                    বুক করুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FEATURED AIRLINES DIRECTORY ================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900">
                পার্টনার এয়ারলাইনস ডিরেক্টরি
              </h2>
              <p className="text-xs text-slate-500">এয়ারলাইনসের নামের ওপর ক্লিক করে তার স্বতন্ত্র গাইড ও টিকিটের দাম দেখুন</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {ALL_AIRLINES.slice(0, 12).map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectAirline && onSelectAirline(item.id)}
                className="bg-white border border-slate-200 hover:border-red-500 p-3.5 rounded-2xl text-center space-y-2 cursor-pointer transition-all hover:shadow-md group"
              >
                <CountryFlagSvg countryId={item.countryId} className="w-7 h-4 mx-auto rounded-xs border border-slate-200 shadow-xs" />
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
                    {item.nameBn}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                    [{item.code}]
                  </span>
                </div>
                <span className="inline-block text-[10px] text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-full border border-red-100 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  গাইড দেখুন →
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ================= STREAMLINED DIRECT FLIGHT QUOTE FORM ================= */}
        <section className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-xl max-w-3xl mx-auto space-y-5">
          <div className="text-center space-y-1">
            <span className="text-xs font-black text-red-600 uppercase tracking-widest block">
              Quick Flight Inquiry
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              সরাসরি সেরা ফেয়ারের আবেদন পাঠান
            </h2>
            <p className="text-xs text-slate-500">
              আপনার তথ্য দিন, আমাদের এজেন্ট দ্রুততম সময়ে ৩টি সেরা এয়ারলাইন্সের অফার পাঠাবে
            </p>
          </div>

          {inquirySubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 text-center rounded-2xl space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-extrabold text-sm text-slate-900">ধন্যবাদ! আপনার আবেদন সফলভাবে জমা হয়েছে</h3>
              <p className="text-xs text-slate-600">
                আমাদের এয়ার টিকিট টিম দ্রুততম সময়ে হোয়াটসঅ্যাপ বা ফোনে অফার পাঠাবে।
              </p>
              <button
                onClick={() => setInquirySubmitted(false)}
                className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                পুনরায় ক্যোয়ারি পাঠান
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">আপনার নাম *</label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    placeholder="e.g. Mohammad Ali"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">ফোন / হোয়াটসঅ্যাপ *</label>
                  <input
                    type="tel"
                    required
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value, whatsapp: e.target.value })}
                    placeholder="01712345678"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">কোথা থেকে (Origin) *</label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.origin}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, origin: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">কোথায় যাবেন (Destination) *</label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.destination}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, destination: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">যাত্রার তারিখ *</label>
                  <input
                    type="date"
                    required
                    value={inquiryForm.departDate}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, departDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={inquirySubmitting}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/20 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {inquirySubmitting ? (
                  <span>জমা হচ্ছে...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>সেরা ফেয়ার কোটেশন পান</span>
                  </>
                )}
              </button>
            </form>
          )}
        </section>

        {/* ================= OPTIONAL UTILITIES TOGGLE (Travel Rules & Baggage) ================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => setActiveTool(activeTool === 'reqChecker' ? 'none' : 'reqChecker')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTool === 'reqChecker' ? 'bg-slate-900 text-white border-slate-900 shadow' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Globe className="w-4 h-4 text-emerald-500" />
              <span>দেশভিত্তিক ট্রাভেল রুলস দেখে নিন</span>
            </button>
            <button
              onClick={() => setActiveTool(activeTool === 'baggageCalc' ? 'none' : 'baggageCalc')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTool === 'baggageCalc' ? 'bg-slate-900 text-white border-slate-900 shadow' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Luggage className="w-4 h-4 text-amber-500" />
              <span>ব্যাগেজ এলাউন্স ক্যালকুলেটর</span>
            </button>
          </div>

          {activeTool === 'reqChecker' && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 max-w-2xl mx-auto space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-extrabold text-slate-900">গন্তব্য দেশ নির্বাচন করুন:</h3>
                <select
                  value={reqCountry}
                  onChange={(e) => setReqCountry(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold cursor-pointer"
                >
                  <option value="saudi">সৌদি আরব</option>
                  <option value="uae">সংযুক্ত আরব আমিরাত (দুবাই)</option>
                  <option value="malaysia">মালয়েশিয়া</option>
                  <option value="uk">যুক্তরাজ্য</option>
                </select>
              </div>

              {requirementRules[reqCountry] && (
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <strong className="text-slate-900 block">পাসপোর্ট:</strong>
                    <span className="text-slate-600">{requirementRules[reqCountry].passport}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <strong className="text-slate-900 block">ভিসা রুলস:</strong>
                    <span className="text-slate-600">{requirementRules[reqCountry].visa}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <strong className="text-slate-900 block">স্বাস্থ্য ও অন্যান্য:</strong>
                    <span className="text-slate-600">{requirementRules[reqCountry].health}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTool === 'baggageCalc' && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 max-w-xl mx-auto space-y-3 animate-in fade-in duration-200">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center space-x-1.5">
                <Luggage className="w-4 h-4 text-red-600" />
                <span>ব্যাগেজ ও অতিরিক্ত ওয়েট হিসাব</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 mb-1 font-semibold">এয়ারলাইন:</label>
                  <select
                    value={calcAirline}
                    onChange={(e) => setCalcAirline(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
                  >
                    <option value="emirates">Emirates Airlines</option>
                    <option value="biman">Biman Bangladesh</option>
                    <option value="qatar">Qatar Airways</option>
                    <option value="saudia">Saudia Airlines</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 mb-1 font-semibold">অতিরিক্ত ওয়েট (কেজি): {extraBaggageKg} কেজি</label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="5"
                    value={extraBaggageKg}
                    onChange={(e) => setExtraBaggageKg(Number(e.target.value))}
                    className="w-full accent-red-600"
                  />
                </div>
              </div>

              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs space-y-1">
                <div className="flex justify-between text-slate-800">
                  <span>বিনামূল্যে অনুমোদিত:</span>
                  <span className="font-bold text-red-600">২৫-৩০ কেজি চেক-ইন + ৭ কেজি কেবিন</span>
                </div>
                <div className="flex justify-between text-slate-800">
                  <span>অতিরিক্ত ওয়েট ফি (আনুমানিক):</span>
                  <span className="font-extrabold text-emerald-700">৳{extraBaggageKg * 1200}</span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ================= FAQ ACCORDION ================= */}
        <section className="bg-white p-5 sm:p-8 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-black text-slate-900">
              সচরাচর প্রশ্নাবলি (FAQ)
            </h2>
            <p className="text-xs text-slate-500">এয়ার টিকিট বুকিং সংক্রান্ত জরুরী তথ্য</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-2">
            {faqList.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-3 text-left font-extrabold text-slate-900 flex justify-between items-center cursor-pointer hover:bg-slate-50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-red-600 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaqIndex === idx && (
                  <div className="p-3 pt-0 text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* FIXED MOBILE STICKY BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-slate-200 p-2.5 backdrop-blur-md flex items-center justify-between gap-2 shadow-2xl">
        <a
          href="tel:+8801771304219"
          className="flex-1 py-2.5 bg-slate-100 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center space-x-1 border border-slate-300"
        >
          <PhoneCall className="w-3.5 h-3.5 text-red-600" />
          <span>কল দিন</span>
        </a>

        <button
          onClick={() => handleWhatsApp()}
          className="flex-1 py-2.5 bg-emerald-600 text-white text-xs font-extrabold rounded-xl flex items-center justify-center space-x-1 shadow-md"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={() => onOpenBookingModal('ফ্লাইট বুকিং ইনকোয়ারি')}
          className="flex-1 py-2.5 bg-red-600 text-white text-xs font-black rounded-xl flex items-center justify-center space-x-1 shadow-md"
        >
          <Search className="w-3.5 h-3.5" />
          <span>বুকিং</span>
        </button>
      </div>

      {/* FARE ALERT MODAL */}
      {showFareAlertModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl text-slate-900">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-sm font-black text-slate-900 flex items-center space-x-1.5">
                <BellRing className="w-4 h-4 text-red-600" />
                <span>Fare Alert সেভ করুন</span>
              </h3>
              <button onClick={() => setShowFareAlertModal(false)} className="text-slate-400 font-bold hover:text-slate-700">✕</button>
            </div>

            {fareAlertSuccess ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 text-center rounded-xl space-y-1 text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold">Fare Alert সক্রিয় হয়েছে!</h4>
              </div>
            ) : (
              <form onSubmit={handleFareAlertSubmit} className="space-y-2.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">উৎপত্তি (From):</label>
                  <input
                    type="text"
                    value={fareAlertRoute.origin}
                    onChange={(e) => setFareAlertRoute({ ...fareAlertRoute, origin: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">গন্তব্য (To):</label>
                  <input
                    type="text"
                    value={fareAlertRoute.destination}
                    onChange={(e) => setFareAlertRoute({ ...fareAlertRoute, destination: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ফোন / হোয়াটসঅ্যাপ:</label>
                  <input
                    type="tel"
                    value={fareAlertRoute.phone}
                    onChange={(e) => setFareAlertRoute({ ...fareAlertRoute, phone: e.target.value })}
                    placeholder="01712345678"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-red-600 text-white font-bold rounded-xl shadow cursor-pointer"
                >
                  সেভ করুন
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* GROUP BOOKING MODAL */}
      {showGroupBookingModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl text-slate-900">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-sm font-black text-slate-900 flex items-center space-x-1.5">
                <Users className="w-4 h-4 text-red-600" />
                <span>Group Booking (১০+ জন)</span>
              </h3>
              <button onClick={() => setShowGroupBookingModal(false)} className="text-slate-400 font-bold hover:text-slate-700">✕</button>
            </div>

            {groupSubmitted ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 text-center rounded-xl space-y-1 text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold">গ্রুপ রিকোয়েস্ট জমা হয়েছে!</h4>
              </div>
            ) : (
              <form onSubmit={handleGroupSubmit} className="space-y-2.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">আপনার নাম:</label>
                  <input
                    type="text"
                    value={groupForm.name}
                    onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ফোন নম্বর:</label>
                  <input
                    type="tel"
                    value={groupForm.phone}
                    onChange={(e) => setGroupForm({ ...groupForm, phone: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">যাত্রী (১০+):</label>
                    <input
                      type="number"
                      min="10"
                      value={groupForm.passengers}
                      onChange={(e) => setGroupForm({ ...groupForm, passengers: Number(e.target.value) })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">তারিখ:</label>
                    <input
                      type="date"
                      value={groupForm.travelDate}
                      onChange={(e) => setGroupForm({ ...groupForm, travelDate: e.target.value })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-red-600 text-white font-bold rounded-xl shadow cursor-pointer"
                >
                  গ্রুপ কোটেশন আবেদন করুন
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
