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
  XCircle,
  Tag,
  DollarSign,
  Star,
  Send,
  Check,
  Compass,
  Headphones
} from 'lucide-react';
import { FlightSearchEngine } from '../components/FlightSearchEngine';

interface AirTicketingViewProps {
  currency?: 'BDT' | 'USD';
  onOpenBookingModal: (serviceType?: string) => void;
}

export const AirTicketingView: React.FC<AirTicketingViewProps> = ({
  currency = 'BDT',
  onOpenBookingModal
}) => {
  // Navigation Tabs & Tools
  const [activeTab, setActiveTab] = useState<'search' | 'bundle' | 'reqChecker' | 'baggageCalc' | 'airportGuide' | 'dashboard'>('search');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Hero Search Widget State
  const [tripType, setTripType] = useState<'oneway' | 'round' | 'multicity'>('oneway');
  const [heroForm, setHeroForm] = useState({
    origin: 'DAC (Dhaka)',
    destination: 'DXB (Dubai)',
    departDate: '',
    returnDate: '',
    passengers: '1 Passenger',
    cabinClass: 'Economy'
  });

  // Dedicated Embedded Inquiry Form State
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    origin: 'Dhaka (DAC)',
    destination: 'Dubai (DXB)',
    departDate: '',
    returnDate: '',
    passengers: '1',
    cabin: 'Economy',
    specialRequest: ''
  });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquirySubmitting, setInquirySubmitting] = useState(false);

  // Fare Alert Modal State
  const [showFareAlertModal, setShowFareAlertModal] = useState(false);
  const [fareAlertRoute, setFareAlertRoute] = useState({ origin: 'DAC', destination: 'DXB', email: '', phone: '' });
  const [fareAlertSuccess, setFareAlertSuccess] = useState(false);

  // Group Booking Modal State
  const [showGroupBookingModal, setShowGroupBookingModal] = useState(false);
  const [groupForm, setGroupForm] = useState({
    name: '',
    phone: '',
    email: '',
    origin: 'Dhaka (DAC)',
    destination: 'Jeddah (JED)',
    passengers: 12,
    travelDate: '',
    company: '',
    notes: ''
  });
  const [groupSubmitted, setGroupSubmitted] = useState(false);

  // Travel Requirement Checker State
  const [reqCountry, setReqCountry] = useState('saudi');

  // Baggage Calculator State
  const [calcAirline, setCalcAirline] = useState('emirates');
  const [calcClass, setCalcClass] = useState('economy');
  const [extraBaggageKg, setExtraBaggageKg] = useState(10);

  // Airport Guide State
  const [selectedAirport, setSelectedAirport] = useState('dac');

  // Customer Dashboard Simulator State
  const [dashboardTab, setDashboardTab] = useState<'history' | 'eticket' | 'invoice'>('eticket');

  // Testimonials Active Slide index
  const [activeTestimonial, setActiveTestimonial] = useState(0);

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
          type: 'Direct Air Ticket Flight Quote Request',
          ...inquiryForm
        })
      });
    } catch (err) {
      console.error('Inquiry submit error:', err);
    }
    setInquirySubmitting(false);
    setInquirySubmitted(true);
  };

  // Data Arrays
  const serviceBadges = [
    { title: 'Domestic Flight Booking', icon: Plane, label: '✈️ ডোমেস্টিক ফ্লাইট' },
    { title: 'International Flight Booking', icon: Globe, label: '🌍 ইন্টারন্যাশনাল ফ্লাইট' },
    { title: 'Family Booking', icon: Users, label: '👨‍👩‍👧‍👦 ফ্যামিলি বুকিং' },
    { title: 'Corporate Travel', icon: Building2, label: '🏢 কর্পোরেট ট্রাভেল' },
    { title: 'Group Booking', icon: Users, label: '👥 গ্রুপ বুকিং (১০+ জন)' },
    { title: 'Multi-City Booking', icon: MapPin, label: '🧳 মাল্টি-সিটি প্ল্যানার' },
    { title: 'Flight Rescheduling', icon: RefreshCw, label: '🔄 ফ্লাইট রিশিডিউল' },
    { title: 'Ticket Cancellation', icon: XCircle, label: '❌ টিকিট ক্যানসেলেশন' },
    { title: 'Seat Selection', icon: Tag, label: '💺 সিট সিলেকশন' },
    { title: 'Travel Insurance', icon: ShieldCheck, label: '🧾 ট্রাভেল ইন্স্যুরেন্স' },
  ];

  const popularRoutes = [
    {
      countryId: 'uae',
      route: 'Dhaka → Dubai',
      routeBn: 'ঢাকা → দুবাই (DXB)',
      duration: '4h 45m (Direct)',
      airlines: 'Emirates, Flydubai, US-Bangla',
      price: '৳৩৮,৫০০',
      priceUSD: '$350',
      tag: 'Most Popular'
    },
    {
      countryId: 'malaysia',
      route: 'Dhaka → Kuala Lumpur',
      routeBn: 'ঢাকা → কুয়ালালামপুর (KUL)',
      duration: '3h 55m (Direct)',
      airlines: 'AirAsia, Malaysia Airlines, Biman',
      price: '৳৩২,০০০',
      priceUSD: '$290',
      tag: 'Best Value'
    },
    {
      countryId: 'uk',
      route: 'Dhaka → London',
      routeBn: 'ঢাকা → লন্ডন (LHR)',
      duration: '10h 30m (Direct/1 Stop)',
      airlines: 'Biman Bangladesh, Qatar Airways',
      price: '৳৮৫,০০০',
      priceUSD: '$770',
      tag: 'Trending'
    },
    {
      countryId: 'canada',
      route: 'Dhaka → Toronto',
      routeBn: 'ঢাকা → টরোন্টো (YYZ)',
      duration: '16h 15m (1 Stop)',
      airlines: 'Biman Bangladesh, Emirates, Qatar',
      price: '৳১২৫,০০০',
      priceUSD: '$1,130',
      tag: 'Student Choice'
    },
    {
      countryId: 'italy',
      route: 'Dhaka → Rome',
      routeBn: 'ঢাকা → রোম (FCO)',
      duration: '9h 45m (Direct Biman)',
      airlines: 'Biman Bangladesh, Turkish Airlines',
      price: '৳৬৫,০০০',
      priceUSD: '$590',
      tag: 'Direct Flight'
    },
    {
      countryId: 'thailand',
      route: 'Dhaka → Bangkok',
      routeBn: 'ঢাকা → ব্যাংকক (BKK)',
      duration: '2h 30m (Direct)',
      airlines: 'Thai Airways, US-Bangla, Biman',
      price: '৳২৭,৯০০',
      priceUSD: '$250',
      tag: 'Vacation Favorite'
    },
    {
      countryId: 'singapore',
      route: 'Dhaka → Singapore',
      routeBn: 'ঢাকা → সিঙ্গাপুর (SIN)',
      duration: '4h 00m (Direct)',
      airlines: 'Singapore Airlines, US-Bangla, Biman',
      price: '৳৩৬,৫০০',
      priceUSD: '$330',
      tag: 'Luxury Hub'
    },
    {
      countryId: 'saudi-arabia',
      route: 'Dhaka → Jeddah / Riyadh',
      routeBn: 'ঢাকা → জেদ্দা / রিয়াদ',
      duration: '6h 15m (Direct)',
      airlines: 'Saudia, Biman Bangladesh',
      price: '৳৪৫,০০০',
      priceUSD: '$410',
      tag: 'Umrah & Job'
    }
  ];

  const premiumAirlines = [
    {
      name: 'Emirates Airlines',
      code: 'EK',
      countryId: 'uae',
      desc: 'বিশ্বমানের লাক্সারি ৫-স্টার কেবিন সার্ভিস ও ইন-ফ্লাইট বিনোদন।',
      routes: 'Dubai, London, Toronto, New York',
      baggage: '30 kg Checked + 7 kg Cabin',
      badge: '5-Star Rated'
    },
    {
      name: 'Qatar Airways',
      code: 'QR',
      countryId: 'qatar',
      desc: 'দোহা হাব হয়ে আমেরিকা ও ইউরোপের দ্রুততম সংযোগ ব্যবস্থা।',
      routes: 'Doha, London, Rome, Paris, JFK',
      baggage: '30 kg Checked + 7 kg Cabin',
      badge: 'World\'s Best Airline'
    },
    {
      name: 'Singapore Airlines',
      code: 'SQ',
      countryId: 'singapore',
      desc: 'কিংবদন্তিতুল্য সার্ভিস, প্রিমিয়াম কমফোর্ট ও চাঙ্গি হাব।',
      routes: 'Singapore, Sydney, Tokyo, LA',
      baggage: '30 kg Checked + 7 kg Cabin',
      badge: 'Premium Excellence'
    },
    {
      name: 'Turkish Airlines',
      code: 'TK',
      countryId: 'turkey',
      desc: 'বিশ্বের সর্বাধিক দেশে ফ্লাইট পরিচালনাকারী এয়ারলাইন।',
      routes: 'Istanbul, Frankfurt, Milan, Toronto',
      baggage: '30 kg Checked + 8 kg Cabin',
      badge: 'Global Leader'
    },
    {
      name: 'Biman Bangladesh Airlines',
      code: 'BG',
      countryId: 'bangladesh',
      desc: 'বাংলাদেশের জাতীয় পতাকাবাহী এয়ারলাইনস – নন-স্টপ ফ্লাইট।',
      routes: 'London, Toronto, Rome, Jeddah, Tokyo',
      baggage: '35 kg Checked + 7 kg Cabin',
      badge: 'National Carrier'
    },
    {
      name: 'US-Bangla Airlines',
      code: 'BS',
      countryId: 'bangladesh',
      desc: 'বাংলাদেশের শীর্ষস্থানীয় প্রাইভেট এয়ারলাইন – দ্রুত প্রসারমান।',
      routes: 'Dubai, Bangkok, Singapore, Guangzhou',
      baggage: '25-30 kg Checked + 7 kg Cabin',
      badge: 'Popular Choice'
    }
  ];

  const whyChooseUs = [
    {
      title: 'Lowest Fare Guarantee',
      titleBn: 'সর্বনিম্ন ফেয়ার সহায়তা',
      desc: 'GDS সিস্টেম সরাসরি অ্যাক্সেস করে হিডেন চার্জ ছাড়াই বাজার সেরা দামে টিকিট নিশ্চিত করি।',
      icon: DollarSign,
      color: 'from-amber-500 to-amber-600'
    },
    {
      title: 'Instant E-Ticket Issuance',
      titleBn: 'দ্রুততম ই-টিকিট প্রদান',
      desc: 'পেমেন্ট অনুমোদনের ৫ থেকে ১৫ মিনিটের মধ্যে ইমেইল ও হোয়াটসঅ্যাপে অফিসিয়াল ই-টিকিট গ্রহণ করুন।',
      icon: Zap,
      color: 'from-red-600 to-red-700'
    },
    {
      title: '24/7 Dedicated Support',
      titleBn: '২৪/৭ সাপোর্ট টিম',
      desc: 'জরুরি ফ্লাইট পরিবর্তন, রিশিডিউলিং বা সিট পছন্দের ক্ষেত্রে দিন-রাত সর্বদা পাশে পাবেন আমাদের এজেন্টদের।',
      icon: Headphones,
      color: 'from-blue-600 to-blue-700'
    },
    {
      title: 'Visa + Ticket Combo Package',
      titleBn: 'ভিসা + টিকিট বান্ডেল',
      desc: 'ভিসা প্রসেসিং এবং এয়ার টিকিট একসাথে বুকিং করলে পাচ্ছেন বিশেষ ১০-১৫% অতিরিক্ত ডিসকাউন্ট।',
      icon: Tag,
      color: 'from-emerald-600 to-emerald-700'
    },
    {
      title: 'Safe & Secure Payment',
      titleBn: '১০০% নিরাপদ পেমেন্ট',
      desc: 'ব্যাংক ট্রান্সফার, বিকাশ, নগদ কিংবা ভিসা/মাস্টারকার্ডের মাধ্যমে ক্যাশলেস ও নিরাপদ পেমেন্ট।',
      icon: ShieldCheck,
      color: 'from-purple-600 to-purple-700'
    },
    {
      title: 'IATA & ATAB Certified',
      titleBn: 'আইএটিএ ও অটাব সার্টিফাইড',
      desc: '১২+ বছরের বাস্তব অভিজ্ঞতাসম্পন্ন দক্ষ ইমিগ্রেশন ও এয়ার টিকেট এক্সপার্টদের সুপরামর্শ।',
      icon: Award,
      color: 'from-indigo-600 to-indigo-700'
    }
  ];

  const testimonials = [
    {
      name: 'Md. Kamrul Hasan',
      role: 'Business Traveler',
      route: 'Dhaka → London (Biman Non-stop)',
      review: 'ডাইরেক্ট লন্ডন ফ্লাইটের টিকিট মাত্র ২ ঘণ্টার মধ্যে পেয়েছি। ড্রিমস ফ্লাই টিম খুবই পেশাদার এবং এয়ারপোর্টে সব নিয়ম সম্পর্কে আগে থেকেই গাইড করেছিল।',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Syeda Afroza Begum',
      role: 'Family Umrah Trip',
      route: 'Dhaka → Jeddah (Saudia)',
      review: 'পরিবারের ৬ জনের উমরাহ ভিসা ও সাউদিয়ার টিকিট একসাথে বুক করেছিলাম। তারা আমাদের বয়স্ক মা-বাবার জন্য হুইলচেয়ার অ্যাসিস্ট্যান্সও ফ্রি ব্যবস্থা করে দিয়েছিল।',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Tanvir Ahmed Siddiqui',
      role: 'Student in Canada',
      route: 'Dhaka → Toronto (Emirates)',
      review: 'কানাডা স্টুডেন্ট টিকিটের জন্য অতিরিক্ত ১০ কেজি ব্যাগেজ ও ভালো ট্রানজিট দরকার ছিল। ড্রিমস ফ্লাই এমিরেটসের বেস্ট ডিল দিয়েছিল। অসাধারণ সাপোর্ট!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    }
  ];

  const bookingSteps = [
    { step: '01', title: 'Submit Flight Request', titleBn: '১. ইনকোয়ারি জমা দিন', desc: 'উৎপত্তি, গন্তব্য ও তারিখ নির্বাচন করে ফর্ম পূরণ করুন বা কল দিন।' },
    { step: '02', title: 'Receive Best Fare Quotes', titleBn: '২. বেস্ট ফেয়ার গ্রহণ করুন', desc: 'আমাদের এজেন্টরা GDS থেকে সর্বনিম্ন মূল্যের ৩টি এয়ারলাইন ডিল পাঠাবে।' },
    { step: '03', title: 'Confirm & Secure Payment', titleBn: '৩. কনফার্ম ও পেমেন্ট', desc: 'পছন্দের টিকিট নির্বাচন করে অনলাইন ব্যাংক, কার্ড বা বিকাশে পরিশোধ করুন।' },
    { step: '04', title: 'Get Official E-Ticket', titleBn: '৪. ইনস্ট্যান্ট ই-টিকিট পান', desc: 'ইমেইল ও হোয়াটসঅ্যাপে PNR সহ ভ্যালিড ই-টিকিট পিডিএফ ডাউনলোড করুন।' }
  ];

  const faqList = [
    {
      q: 'কত আগে টিকিট বুক করলে সবচেয়ে কম দামে পাওয়া যায়?',
      a: 'আন্তর্জাতিক ফ্লাইটের টিকিট ভ্রমণের অন্তত ২০ থেকে ৪৫ দিন পূর্বে বুকিং করলে সেরা ফেয়ার ব্র্যাকেট পাওয়া যায়। পিক সিজনে (যেমন উমরাহ ও সামার ভ্যাকেশন) আরও আগে বুক করা বাঞ্ছনীয়।'
    },
    {
      q: 'টিকিট বুকিং করার পর কীভাবে পেমেন্ট করবো?',
      a: 'আপনি আমাদের অফিসিয়াল ব্যাংক অ্যাকাউন্ট (BRAC, City Bank, Prime Bank), বিকাশ, নগদ অথবা শোরুমে এসে ক্যাশে সুবিধাজনকভাবে পেমেন্ট করতে পারবেন।'
    },
    {
      q: 'টিকিটের তারিখ পরিবর্তন (Reschedule) বা ক্যানসেল করা যাবে?',
      a: 'জি! সংশ্লিষ্ট এয়ারলাইন্সের পলিসি অনুযায়ী নির্ধারিত ক্যানসেলেশন ফি বা ডেট চেঞ্জ পেনাল্টি দিয়ে ফ্লাইট রিশিডিউল বা বাতিল করা সম্ভব। আমাদের টিম সার্বক্ষণিক সহায়তা প্রদান করে।'
    },
    {
      q: 'ক্যাবিন ও চেক-ইন ব্যাগেজ কত কেজি পর্যন্ত নেওয়া যায়?',
      a: 'সাধারণত ইকোনমি ক্লাসে ২০ থেকে ৩৫ কেজি চেক-ইন ব্যাগেজ এবং ৭ কেজি হ্যান্ড ক্যাবিনে নেওয়ার অনুমতি থাকে। বিজনেস ক্লাসে ৪০ কেজি চেক-ইন ব্যাগেজ থাকে।'
    },
    {
      q: 'পাসপোর্টের মেয়াদ কতদিন থাকা বাধ্যতামূলক?',
      a: 'আন্তর্জাতিক ভ্রমণের জন্য যেকোনো গন্তব্যে ভ্রমণের দিন থেকে পাসপোর্টের নূন্যতম ৬ মাসের ভ্যালিডিটি বা মেয়াদের বাধ্যবাধকতা থাকে।'
    }
  ];

  const requirementRules: Record<string, { title: string; passport: string; visa: string; health: string; currency: string }> = {
    saudi: {
      title: 'সৌদি আরব ভ্রমণ নির্দেশিকা',
      passport: 'কমপক্ষে ৬ মাসের মেয়াদ থাকতে হবে। পাসপোর্ট কপির সকল পৃষ্ঠা পরিষ্কার হওয়া আবশ্যক।',
      visa: 'উমরাহ, ট্যুরিস্ট বা ওয়ার্ক ভিসা থাকতে হবে। অন-অ্যারাইভাল শুধুমাত্র ইউএস/ইউকে ভিসা হোল্ডারদের জন্য।',
      health: 'মেনিনজাইটিস ভ্যাকসিনেশন ও প্রাথমিক মেডিকেল ফিটনেস কার্ড সাথে রাখা বাঞ্ছনীয়।',
      currency: 'সর্বোচ্চ নগদ ১০,০০০ রিয়াল বা সমপরিমাণ বৈদেশিক মুদ্রা সাথে রাখা যাবে।'
    },
    uae: {
      title: 'সংযুক্ত আরব আমিরাত (দুবাই) নির্দেশিকা',
      passport: 'ভ্রমণের তারিখ থেকে নূন্যতম ৬ মাসের ভ্যালিডিটি বাঞ্ছনীয়।',
      visa: 'ভ্রমণের পূর্বে ই-ভিসা অথবা ভ্যালিড ট্যুরিস্ট এন্ট্রি পারমিট থাকতে হবে। রিটার্ন টিকিট বাধ্যতামূলক।',
      health: 'ভ্রমণ বীমা (Travel Insurance) ও হোটেল বুকিং কপি সাথে রাখা জরুরি।',
      currency: 'ব্যাংক স্টেটমেন্ট বা নূন্যতম ৫০০ ডলার সমপরিমাণ ফান্ড চেক হতে পারে।'
    },
    malaysia: {
      title: 'মালয়েশিয়া ভ্রমণ নির্দেশিকা',
      passport: 'ন্যূনতম ৬ মাসের মেয়াদকাল ও ৩টি খালি পাতা থাকতে হবে।',
      visa: 'মালয়েশিয়া ই-ভিসা (MDAC) ডিজিটালি জমা দিতে হবে ভ্রমণের ৩ দিন পূর্বে।',
      health: 'কোভিড শর্তাবলি শিথিল, তবে ইমিগ্রেশনে বুকিং রসিদ ও রিটার্ন ফ্লাইট নিশ্চিত করতে হবে।',
      currency: 'স্মার্ট কার্ড অথবা ১০০০ ডলার সমপরিমাণ ক্যাশ রাখা ভালো।'
    },
    uk: {
      title: 'যুক্তরাজ্য (লন্ডন) ভ্রমণ নির্দেশিকা',
      passport: 'ভ্রমণ মেয়াদের বেশি পাসপোর্ট মেয়াদের স্থায়িত্ব থাকা প্রয়োজন।',
      visa: 'পূর্বে অনুমোদিত ইউকে স্ট্যান্ডার্ড ভিজিটর বা স্টুডেন্ট ভিসা আবশ্যক।',
      health: 'টিবি টেস্ট (তপশিলি ল্যাব থেকে) স্টুডেন্টদের জন্য প্রযোজ্য।',
      currency: 'পাউন্ড বা ইন্টারন্যাশনাল ডেবিট/ক্রেডিট কার্ড সঙ্গে রাখা বাঞ্ছনীয়।'
    },
    canada: {
      title: 'কানাডা ভ্রমণ নির্দেশিকা',
      passport: 'পাসপোর্টের মেয়াদ পুরো ভ্রমণের স্থায়িত্বকাল পর্যন্ত বৈধ হতে হবে।',
      visa: 'কানাডা ট্যুরিস্ট/স্টুডেন্ট সুপার ভিসা ও বায়োমেট্রিক ডিক্লেয়ারেশন।',
      health: 'ইমিগ্রেশন রিলেটেড হেলথ কার্ড বুকিং ও ট্রাভেল ইন্স্যুরেন্স।',
      currency: 'কানাডিয়ান ডলার বা ইউএসডি ক্যাশ বা কার্ড।'
    }
  };

  const airportGuidesData: Record<string, { name: string; code: string; city: string; checkin: string; lounge: string; terminals: string }> = {
    dac: {
      name: 'হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর',
      code: 'DAC',
      city: 'ঢাকা, বাংলাদেশ',
      checkin: 'আন্তর্জাতিক ফ্লাইটের জন্য ৪ ঘণ্টা পূর্বে এবং অভ্যন্তরীণ ফ্লাইটের জন্য ২ ঘণ্টা পূর্বে বিমানবন্দরে পৌঁছাতে হবে।',
      lounge: 'টার্মিনাল ১ ও ২-এ স্কাইলাউঞ্জ, বালাকা বলাকা লাউঞ্জ এবং এমিরেটস/কাতার এক্সক্লুসিভ লাউঞ্জ রয়েছে।',
      terminals: 'টার্মিনাল ১ (ইন্টারন্যাশনাল), টার্মিনাল ২ (ইন্টারন্যাশনাল) এবং ডোমেস্টিক টার্মিনাল পৃথক ভবন।'
    },
    dxb: {
      name: 'দুবাই আন্তর্জাতিক বিমানবন্দর',
      code: 'DXB',
      city: 'দুবাই, ইউএই',
      checkin: 'ফ্লাইটের অন্তত ৩.৫ ঘণ্টা আগে চেক-ইন কাউন্টার খোলে। অনলাইন চেক-ইন করলে দ্রুত ইমিগ্রেশন সম্ভব।',
      lounge: 'মারহাবা লাউঞ্জ, এমিরেটস ফার্স্ট/বিজনেস লাউঞ্জ এবং প্লাজা প্রিমিয়াম লাউঞ্জ বিদ্যমান।',
      terminals: 'টার্মিনাল ৩ শুধুমাত্র এমিরেটস ফ্লাইটের জন্য; টার্মিনাল ১ গ্লোবাল এয়ারলাইন্স ও টার্মিনাল ২ বাজেট ফ্লাইটের জন্য।'
    },
    kul: {
      name: 'কুয়ালালামপুর আন্তর্জাতিক বিমানবন্দর',
      code: 'KUL / KLIA',
      city: 'কুয়ালালামপুর, মালয়েশিয়া',
      checkin: 'KLIA1 ও KLIA2 টার্মিনালে ৩ ঘণ্টা পূর্বে চেক-ইন কাউন্টার ও সেলফ কিওস্ক ব্যাগ ড্রপ উপলব্ধ।',
      lounge: 'প্লাজা প্রিমিয়াম লাউঞ্জ ও মালয়েশিয়া এয়ারলাইনস গোল্ডেন লাউঞ্জ।',
      terminals: 'KLIA1 (ফুল সার্ভিস এয়ারলাইন্স) এবং KLIA2 (এয়ারএশিয়া ও বাজেট ক্যারিয়ার)।'
    },
    lhr: {
      name: 'লন্ডন হিথ্রো বিমানবন্দর',
      code: 'LHR',
      city: 'লন্ডন, যুক্তরাজ্য',
      checkin: 'ফ্লাইটের অন্তত ৪ ঘণ্টা পূর্বে উপস্থিত থাকা শ্রেয়। সিকিউরিটি চেকিং এ তরল পদার্থের নিয়ম প্রযোজ্য।',
      lounge: 'টার্মিনাল ২, ৩, ৪ ও ৫ প্রতিটি ভবনে একাধিক ভিআইপি প্লাজা প্রিমিয়াম লাউঞ্জ উপলব্ধ।',
      terminals: 'টার্মিনাল ২, ৩, ৪ ও ৫। টার্মিনাল স্থানান্তরের জন্য বিনামূল্যে হিথ্রো এক্সপ্রেস ট্রেন ব্যবহার করা যায়।'
    }
  };

  // Structured Schema markup for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqList.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-24 lg:pb-16 selection:bg-red-600 selection:text-white">
      {/* FAQ Schema Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Dynamic SEO Meta Title Announcement / Top Info Bar */}
      <div className="bg-slate-950/80 border-b border-slate-800 text-slate-300 py-2.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-[11px] sm:text-xs">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-red-600 text-white uppercase tracking-wider">
              IATA Verified
            </span>
            <span>Dreams Fly Air Ticketing Portal — Guaranteed Lowest Airfares in Bangladesh</span>
          </div>
          <div className="flex items-center space-x-4 text-xs font-bold text-slate-200">
            <a href="tel:+8801771304219" className="hover:text-amber-400 transition-colors flex items-center space-x-1">
              <PhoneCall className="w-3.5 h-3.5 text-red-500" />
              <span>+880 1771-304219</span>
            </a>
            <button onClick={() => handleWhatsApp()} className="hover:text-emerald-400 transition-colors flex items-center space-x-1 cursor-pointer">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>WhatsApp Direct</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">

        {/* ================= HERO SECTION ================= */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl p-6 sm:p-10 lg:p-12">
          {/* Subtle Aircraft Backdrop Overlay */}
          <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center mix-blend-overlay pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            {/* Headline and Description */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center space-x-2 bg-slate-800/90 border border-slate-700/80 px-4 py-1.5 rounded-full text-xs font-bold text-amber-400 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Premier Air Ticket Booking Platform Bangladesh</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                সহজে বুক করুন <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-400">দেশি ও আন্তর্জাতিক</span> ফ্লাইট
              </h1>
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
                Emirates, Qatar Airways, Biman Bangladesh, US-Bangla সহ বিশ্বের ১০০+ সেরা এয়ারলাইন্সের টিকিট পান সর্বনিম্ন বাজার মূল্যে এবং ইনস্ট্যান্ট ই-টিকিট কনফার্মেশনে।
              </p>
            </div>

            {/* Glassmorphic Flight Search Style Booking Card */}
            <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl shadow-2xl p-5 sm:p-8 backdrop-blur-xl max-w-5xl mx-auto space-y-6">

              {/* Trip Type Selector */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setTripType('oneway')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      tripType === 'oneway' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    One Way (একমুখী)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripType('round')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      tripType === 'round' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Round Trip (দ্বিমুখী)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripType('multicity')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      tripType === 'multicity' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Multi-City (মাল্টি-সিটি)
                  </button>
                </div>

                <div className="flex items-center space-x-3 text-xs font-semibold text-slate-300">
                  <span className="flex items-center space-x-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Instant PNR</span>
                  </span>
                  <span className="flex items-center space-x-1 text-amber-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Zero Hidden Fees</span>
                  </span>
                </div>
              </div>

              {/* Input Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Origin */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 hover:border-slate-700 transition-colors">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span>কোথা থেকে (From)</span>
                  </label>
                  <input
                    type="text"
                    value={heroForm.origin}
                    onChange={(e) => setHeroForm({ ...heroForm, origin: e.target.value })}
                    className="w-full bg-transparent text-sm font-bold text-white focus:outline-none placeholder-slate-500"
                    placeholder="e.g. Dhaka (DAC)"
                  />
                </div>

                {/* Destination */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 hover:border-slate-700 transition-colors">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-1">
                    <Compass className="w-3 h-3 text-emerald-400" />
                    <span>কোথায় যাবেন (To)</span>
                  </label>
                  <input
                    type="text"
                    value={heroForm.destination}
                    onChange={(e) => setHeroForm({ ...heroForm, destination: e.target.value })}
                    className="w-full bg-transparent text-sm font-bold text-white focus:outline-none placeholder-slate-500"
                    placeholder="e.g. Dubai (DXB)"
                  />
                </div>

                {/* Departure Date */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 hover:border-slate-700 transition-colors">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>যাত্রার তারিখ (Departure)</span>
                  </label>
                  <input
                    type="date"
                    value={heroForm.departDate}
                    onChange={(e) => setHeroForm({ ...heroForm, departDate: e.target.value })}
                    className="w-full bg-transparent text-xs font-bold text-white focus:outline-none"
                  />
                </div>

                {/* Return Date / Class */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 hover:border-slate-700 transition-colors">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-1">
                    <Users className="w-3 h-3 text-blue-400" />
                    <span>যাত্রী ও ক্লাস (Cabin & Pax)</span>
                  </label>
                  <select
                    value={heroForm.cabinClass}
                    onChange={(e) => setHeroForm({ ...heroForm, cabinClass: e.target.value })}
                    className="w-full bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Economy" className="bg-slate-900 text-white">1 Passenger, Economy</option>
                    <option value="Premium Economy" className="bg-slate-900 text-white">Premium Economy</option>
                    <option value="Business" className="bg-slate-900 text-white">Business Class</option>
                    <option value="First Class" className="bg-slate-900 text-white">First Class</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center space-x-3 text-xs text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>কোটেশন পেতে সময় লাগে মাত্র ৫ মিনিট</span>
                  </span>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleWhatsApp(`আসসালামু আলাইকুম, আমি ${heroForm.origin} থেকে ${heroForm.destination} ফ্লাইটের রেট জানতে চাই।`)}
                    className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg w-full sm:w-auto"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Booking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenBookingModal(`এয়ার টিকিট অনুসন্ধান: ${heroForm.origin} -> ${heroForm.destination}`)}
                    className="px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl shadow-red-900/30 flex items-center justify-center space-x-2 cursor-pointer w-full sm:w-auto"
                  >
                    <Search className="w-4 h-4" />
                    <span>Get Flight Quote</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4 text-center">
              <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-center space-x-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-left">
                  <h3 className="text-xs font-extrabold text-white">Best Fare Guarantee</h3>
                  <p className="text-[10px] text-slate-400">সর্বনিম্ন দামের নিশ্চয়তা</p>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-center space-x-2.5">
                <Zap className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-left">
                  <h3 className="text-xs font-extrabold text-white">Instant Ticket</h3>
                  <p className="text-[10px] text-slate-400">ইনস্ট্যান্ট ই-টিকিট ইস্যু</p>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-center space-x-2.5">
                <Headphones className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="text-left">
                  <h3 className="text-xs font-extrabold text-white">24/7 Support</h3>
                  <p className="text-[10px] text-slate-400">দিনরাত ২৪ ঘণ্টা সেবা</p>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-center space-x-2.5">
                <Award className="w-5 h-5 text-purple-400 shrink-0" />
                <div className="text-left">
                  <h3 className="text-xs font-extrabold text-white">IATA Certified</h3>
                  <p className="text-[10px] text-slate-400">অনুমোদিত টিকিট এজেন্সি</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= AIRLINE PARTNERS ================= */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-black text-red-500 uppercase tracking-widest block">
              Official Airline Network
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              আমাদের অফিসিয়াল পার্টনার এয়ারলাইন্স
            </h2>
            <p className="text-xs text-slate-400">
              বিশ্বের সেরা ও জনপ্রিয় এয়ারলাইন্সের টিকিট বুকিং সুবিধা
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { name: 'Emirates', code: 'EK', countryId: 'uae' },
              { name: 'Qatar Airways', code: 'QR', countryId: 'qatar' },
              { name: 'Singapore Airlines', code: 'SQ', countryId: 'singapore' },
              { name: 'Turkish Airlines', code: 'TK', countryId: 'turkey' },
              { name: 'Saudia', code: 'SV', countryId: 'saudi-arabia' },
              { name: 'Biman Bangladesh', code: 'BG', countryId: 'bangladesh' },
              { name: 'US-Bangla', code: 'BS', countryId: 'bangladesh' },
              { name: 'AirAsia', code: 'AK', countryId: 'malaysia' },
              { name: 'Flydubai', code: 'FZ', countryId: 'dubai' },
              { name: 'Etihad Airways', code: 'EY', countryId: 'uae' },
              { name: 'Thai Airways', code: 'TG', countryId: 'thailand' },
              { name: 'IndiGo', code: '6E', countryId: 'india' }
            ].map((airline, idx) => (
              <div
                key={idx}
                onClick={() => onOpenBookingModal(`এয়ারলাইন অনুসন্ধান: ${airline.name}`)}
                className="bg-slate-950/60 border border-slate-800 hover:border-red-500/50 p-3.5 rounded-2xl flex items-center space-x-3 group transition-all cursor-pointer hover:bg-slate-800/50"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-red-500 group-hover:bg-red-600 group-hover:text-white font-black text-xs flex items-center justify-center transition-colors shrink-0 border border-slate-800">
                  {airline.code}
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-xs font-bold text-slate-200 group-hover:text-white truncate flex items-center gap-1.5">
                    <CountryFlagSvg countryId={airline.countryId} className="w-3.5 h-2.5 rounded-2xs inline-block" />
                    <span>{airline.name}</span>
                  </h3>
                  <span className="text-[10px] text-slate-500 block">Direct GDS Booking</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= INTERACTIVE TABBED TOOLS & FLIGHT SEARCH ENGINE ================= */}
        <section className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
          {/* Tabs Navigation Header */}
          <div className="flex border-b border-slate-800 bg-slate-900/90 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-6 py-4 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'search'
                  ? 'border-red-500 text-red-400 bg-slate-950'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>ফ্লাইট সার্চ ইনজাইন (Search Engine)</span>
            </button>

            <button
              onClick={() => setActiveTab('bundle')}
              className={`px-6 py-4 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'bundle'
                  ? 'border-red-500 text-red-400 bg-slate-950'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Tag className="w-4 h-4 text-amber-400" />
              <span>ভিসা + টিকিট কম্বো প্যাকেজ</span>
            </button>

            <button
              onClick={() => setActiveTab('reqChecker')}
              className={`px-6 py-4 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'reqChecker'
                  ? 'border-red-500 text-red-400 bg-slate-950'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Travel Requirement Checker</span>
            </button>

            <button
              onClick={() => setActiveTab('baggageCalc')}
              className={`px-6 py-4 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'baggageCalc'
                  ? 'border-red-500 text-red-400 bg-slate-950'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Luggage className="w-4 h-4" />
              <span>Baggage Calculator</span>
            </button>

            <button
              onClick={() => setActiveTab('airportGuide')}
              className={`px-6 py-4 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'airportGuide'
                  ? 'border-red-500 text-red-400 bg-slate-950'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Airport Guide</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-4 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'border-red-500 text-red-400 bg-slate-950'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Customer E-Ticket Hub</span>
            </button>
          </div>

          {/* Tab 1: Flight Search Engine */}
          {activeTab === 'search' && (
            <div className="p-6 sm:p-8 bg-slate-900/50">
              <FlightSearchEngine
                currency={currency}
                onBookFlight={(flight) => {
                  onOpenBookingModal(`ফ্লাইট বুকিং: ${flight.airline} (${flight.origin} - ${flight.destination})`);
                }}
              />
            </div>
          )}

          {/* Tab 2: Visa + Ticket Combo Package */}
          {activeTab === 'bundle' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="bg-gradient-to-r from-red-950/60 to-amber-950/60 p-6 rounded-2xl border border-red-900/40">
                <h3 className="text-lg font-black text-white flex items-center space-x-2">
                  <Tag className="w-5 h-5 text-red-500" />
                  <span>স্পেশাল কম্বো প্যাকেজ: ভিসা এবং এয়ার টিকিট একসাথে</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  ভিসা প্রসেসিং এবং ফ্লাইট টিকিট একসাথে বুকিং করলে পাচ্ছেন বিশেষ ১০-১৫% অতিরিক্ত ডিসকাউন্ট ও নিশ্চিত অ্যাসিস্ট্যান্স।
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-red-500/50 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="inline-flex items-center space-x-1.5 bg-red-950 text-red-400 border border-red-800 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                      <CountryFlagSvg countryId="dubai" className="w-3.5 h-2.5 rounded-2xs" />
                      <span>দুবাই সুপার কম্বো</span>
                    </div>
                    <h4 className="text-base font-black text-white">দুবাই ৩০ দিন ভিসা + এয়ার টিকিট</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      ইনস্ট্যান্ট ৩০ দিন ইউএই ভিসা প্রসেসিং ও এমিরেটস/ফ্লাইদুবাই টিকিট কনফার্মেশন।
                    </p>
                    <div className="text-xl font-black text-red-400">
                      ৳৫৯,৯৯০ <span className="text-xs text-slate-500 line-through font-normal">৳৬৮,০০০</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenBookingModal('দুবাই ভিসা + টিকিট কম্বো')}
                    className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors"
                  >
                    কম্বো বুক করুন
                  </button>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-amber-500/50 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="inline-flex items-center space-x-1.5 bg-amber-950 text-amber-400 border border-amber-800 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                      <CountryFlagSvg countryId="saudi-arabia" className="w-3.5 h-2.5 rounded-2xs" />
                      <span>সৌদি উমরাহ প্যাকেজ</span>
                    </div>
                    <h4 className="text-base font-black text-white">সৌদি ১ বছর উমরাহ ভিসা + টিকিট</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      মাল্টিপল এন্ট্রি উমরাহ ভিসা এবং সাউদিয়া/বিমান বাংলাদেশ এয়ার টিকিটসহ।
                    </p>
                    <div className="text-xl font-black text-amber-400">
                      ৳৭৮,০০০ <span className="text-xs text-slate-500 line-through font-normal">৳৮৮,০০০</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenBookingModal('সৌদি উমরাহ ভিসা + টিকিট কম্বো')}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs cursor-pointer transition-colors"
                  >
                    কম্বো বুক করুন
                  </button>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-emerald-500/50 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="inline-flex items-center space-x-1.5 bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                      <CountryFlagSvg countryId="malaysia" className="w-3.5 h-2.5 rounded-2xs" />
                      <span>মালয়েশিয়া ই-ভিসা কম্বো</span>
                    </div>
                    <h4 className="text-base font-black text-white">মালয়েশিয়া ই-ভিসা + এয়ার টিকিট</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      MDAC ডিজিটাল ভিসা প্রসেসিং ও এয়ার এশিয়া রিটার্ন এয়ার টিকিট।
                    </p>
                    <div className="text-xl font-black text-emerald-400">
                      ৳৩৯,৫০০ <span className="text-xs text-slate-500 line-through font-normal">৳৪৫,০০০</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenBookingModal('মালয়েশিয়া ভিসা + টিকিট কম্বো')}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors"
                  >
                    কম্বো বুক করুন
                  </button>
                </div>
              </div>

              <PriceNotice variant="banner" className="mt-4" />
            </div>
          )}

          {/* Tab 3: Travel Requirement Checker */}
          {activeTab === 'reqChecker' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-white">গন্তব্য দেশ নির্বাচন করুন:</h3>
                  <p className="text-xs text-slate-400">ভিসা, পাসপোর্টের মেয়াদ ও ট্রাভেল রুলস দেখে নিন</p>
                </div>
                <select
                  value={reqCountry}
                  onChange={(e) => setReqCountry(e.target.value)}
                  className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                >
                  <option value="saudi">সৌদি আরব (Saudi Arabia)</option>
                  <option value="uae">সংযুক্ত আরব আমিরাত (UAE - Dubai)</option>
                  <option value="malaysia">মালয়েশিয়া (Malaysia)</option>
                  <option value="uk">যুক্তরাজ্য (United Kingdom)</option>
                  <option value="canada">কানাডা (Canada)</option>
                </select>
              </div>

              {requirementRules[reqCountry] && (
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-base font-black text-red-400 border-b border-slate-800 pb-2 flex items-center gap-2">
                    <CountryFlagSvg countryId={reqCountry === 'saudi' ? 'saudi-arabia' : reqCountry === 'uae' ? 'dubai' : reqCountry} className="w-6 h-4 rounded-xs" />
                    <span>{requirementRules[reqCountry].title}</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <span className="font-bold text-slate-200 block flex items-center space-x-1.5">
                        <FileText className="w-4 h-4 text-red-500" />
                        <span>পাসপোর্ট প্রয়োজনীয়তা</span>
                      </span>
                      <p className="text-slate-400">{requirementRules[reqCountry].passport}</p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <span className="font-bold text-slate-200 block flex items-center space-x-1.5">
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>ভিসা রুলস</span>
                      </span>
                      <p className="text-slate-400">{requirementRules[reqCountry].visa}</p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <span className="font-bold text-slate-200 block flex items-center space-x-1.5">
                        <AlertTriangle className="w-4 h-4 text-blue-400" />
                        <span>স্বাস্থ্য ও ট্রাভেল ইন্স্যুরেন্স</span>
                      </span>
                      <p className="text-slate-400">{requirementRules[reqCountry].health}</p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <span className="font-bold text-slate-200 block flex items-center space-x-1.5">
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                        <span>কারেন্সি ও ক্যাশ রুলস</span>
                      </span>
                      <p className="text-slate-400">{requirementRules[reqCountry].currency}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Baggage Calculator */}
          {activeTab === 'baggageCalc' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="max-w-2xl mx-auto bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-base font-black text-white flex items-center space-x-2">
                  <Luggage className="w-5 h-5 text-red-500" />
                  <span>Baggage Allowance & Extra Weight Calculator</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">এয়ারলাইন:</label>
                    <select
                      value={calcAirline}
                      onChange={(e) => setCalcAirline(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-bold text-white"
                    >
                      <option value="emirates">Emirates Airlines</option>
                      <option value="biman">Biman Bangladesh</option>
                      <option value="qatar">Qatar Airways</option>
                      <option value="usbangla">US-Bangla Airlines</option>
                      <option value="saudia">Saudia Airlines</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">ক্যাবিনের শ্রেণী:</label>
                    <select
                      value={calcClass}
                      onChange={(e) => setCalcClass(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-bold text-white"
                    >
                      <option value="economy">Economy Class</option>
                      <option value="business">Business Class</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    অতিরিক্ত মালামাল (কেজি): {extraBaggageKg} কেজি
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="5"
                    value={extraBaggageKg}
                    onChange={(e) => setExtraBaggageKg(Number(e.target.value))}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between font-bold text-slate-200">
                    <span>বিনামূল্যে লাগেজ (Free Baggage):</span>
                    <span className="text-red-400">
                      {calcClass === 'business' ? '৪০ কেজি + ৭ কেজি কেবিন' : '২৫-৩০ কেজি + ৭ কেজি কেবিন'}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-200">
                    <span>অতিরিক্ত লাগেজের আনুমানিক খরচ:</span>
                    <span className="text-emerald-400 font-extrabold">
                      ৳{extraBaggageKg * 1200} (প্রায় ${extraBaggageKg * 10})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Airport Guide */}
          {activeTab === 'airportGuide' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex justify-center flex-wrap gap-2">
                {Object.keys(airportGuidesData).map((key) => {
                  const item = airportGuidesData[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedAirport(key)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                        selectedAirport === key
                          ? 'bg-red-600 text-white shadow'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {item.name} ({item.code})
                    </button>
                  );
                })}
              </div>

              {airportGuidesData[selectedAirport] && (
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-base font-black text-white border-b border-slate-800 pb-2">
                    {airportGuidesData[selectedAirport].name} ({airportGuidesData[selectedAirport].code}) - {airportGuidesData[selectedAirport].city}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                      <span className="font-bold text-red-400 block">⏱️ চেক-ইন সময়সীমা:</span>
                      <p className="text-slate-300">{airportGuidesData[selectedAirport].checkin}</p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                      <span className="font-bold text-red-400 block">☕ লাউঞ্জ সুবিধা:</span>
                      <p className="text-slate-300">{airportGuidesData[selectedAirport].lounge}</p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                      <span className="font-bold text-red-400 block">🏢 টার্মিনাল গাইড:</span>
                      <p className="text-slate-300">{airportGuidesData[selectedAirport].terminals}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 6: Customer E-Ticket Hub */}
          {activeTab === 'dashboard' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
                <button
                  onClick={() => setDashboardTab('eticket')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer ${
                    dashboardTab === 'eticket' ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  ই-টিকিট ডাউনলোড (E-Ticket)
                </button>
                <button
                  onClick={() => setDashboardTab('history')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer ${
                    dashboardTab === 'history' ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  বুকিং হিস্টোরি
                </button>
                <button
                  onClick={() => setDashboardTab('invoice')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer ${
                    dashboardTab === 'invoice' ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  ইনভয়েস
                </button>
              </div>

              {dashboardTab === 'eticket' && (
                <div className="bg-slate-900 border-2 border-dashed border-red-500/40 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="text-sm font-black text-white">E-TICKET CONFIRMATION SLIP</h4>
                      <span className="text-[10px] text-slate-400 font-mono">PNR: DF-892410-BD</span>
                    </div>
                    <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-black rounded-full">
                      ISSUED & CONFIRMED
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-slate-500 block text-[10px]">PASSENGER NAME</span>
                      <span className="font-bold text-white">MR MOHAMMAD JAHAN</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">AIRLINE</span>
                      <span className="font-bold text-white">EMIRATES (EK-583)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">ROUTE</span>
                      <span className="font-bold text-white">DAC ➔ DXB ➔ LHR</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">DEPARTURE</span>
                      <span className="font-bold text-white">10 OCT 2026, 10:15 AM</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => alert('ই-টিকিট পিডিএফ ডাউনলোড শুরু হচ্ছে...')}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF Ticket</span>
                    </button>
                  </div>
                </div>
              )}

              {dashboardTab === 'history' && (
                <div className="text-xs text-slate-300 p-4 bg-slate-900 rounded-xl border border-slate-800">
                  সফল বুকিং হিস্টোরি: ১টি আইটেম (DAC-LHR কাতার এয়ারওয়েজ - ২৫ সেপ্টেম্বর ২০২৬)
                </div>
              )}

              {dashboardTab === 'invoice' && (
                <div className="text-xs text-slate-300 p-4 bg-slate-900 rounded-xl border border-slate-800">
                  ইনভয়েস #INV-2026-9042 - সর্বমোট পেমেন্ট: ৳১০৪,০০০ (Paid via Bank Transfer)
                </div>
              )}
            </div>
          )}
        </section>

        {/* ================= WHY BOOK WITH US ================= */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-red-500 uppercase tracking-widest block">
              Why Book With Dreams Fly
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              কেন হাজার হাজার যাত্রী আমাদের থেকে টিকিট নেন?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              স্বচ্ছ দাম, আইএটিএ সার্টিফিকেশন ও ২৪ ঘণ্টা নিরবচ্ছিন্ন সেবা নিশ্চয়তা
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl space-y-3 transition-all group hover:scale-[1.01]"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {item.titleBn} ({item.title})
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= POPULAR ROUTES ================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-black text-red-500 uppercase tracking-widest block">
                Top Destinations & Fares
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                জনপ্রিয় আন্তর্জাতিক ফ্লাইট রুটসমূহ
              </h2>
            </div>
            <button
              onClick={() => onOpenBookingModal('অল ফ্লাইট রুট ইনকোয়ারি')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center space-x-1 cursor-pointer"
            >
              <span>সকল রুটের কোটেশন পান</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((r, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 hover:border-red-500/50 p-5 rounded-2xl space-y-4 transition-all hover:shadow-xl flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CountryFlagSvg countryId={r.countryId} className="w-7 h-5 rounded-xs border border-slate-700 shadow-sm" />
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-300 bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-800">
                        {r.tag}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-white group-hover:text-red-400 transition-colors">
                      {r.routeBn}
                    </h3>
                    <span className="text-xs text-slate-400 block font-mono mt-0.5">
                      ⏱️ {r.duration}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-tight">
                    <strong className="text-slate-300">Airlines:</strong> {r.airlines}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Starting From</span>
                    <span className="text-base font-black text-red-400">{r.price}</span>
                  </div>
                  <button
                    onClick={() => onOpenBookingModal(`ফ্লাইট রুট: ${r.route}`)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors"
                  >
                    বুক করুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= PREMIUM AIRLINES CARDS ================= */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-black text-red-500 uppercase tracking-widest block">
              Featured Airlines
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              প্রিমিয়াম এয়ারলাইন্স বিবরণ ও সুবিধা
            </h2>
            <p className="text-xs text-slate-400">
              পছন্দের এয়ারলাইন্সের সেবা, ব্যাগেজ সুবিধা ও রুট দেখে টিকিট বুক করুন
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumAirlines.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <CountryFlagSvg countryId={item.countryId} className="w-7 h-5 rounded-xs" />
                      <h3 className="text-base font-extrabold text-white">{item.name}</h3>
                    </div>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="space-y-1.5 pt-2 text-xs text-slate-400 border-t border-slate-800">
                    <div>
                      <strong className="text-slate-200">জনপ্রিয় রুট:</strong> {item.routes}
                    </div>
                    <div>
                      <strong className="text-slate-200">লাগেজ:</strong> {item.baggage}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenBookingModal(`এয়ারলাইন অনুসন্ধান: ${item.name}`)}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  {item.name} টিকিট বুক করুন
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ================= BOOKING PROCESS TIMELINE ================= */}
        <section className="bg-slate-950 p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-red-500 uppercase tracking-widest block">
              Easy 4-Step Booking
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              কীভাবে সহজ ৪টি ধাপে আপনার টিকিট বুক করবেন?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              কোনো জটিলতা ছাড়াই ঘরে বসে যেকোনো এয়ারলাইনসের টিকিট পান মিনিটের মধ্যে
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {bookingSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3 relative hover:border-red-500/40 transition-all text-center sm:text-left"
              >
                <div className="w-10 h-10 rounded-2xl bg-red-600 text-white font-black text-sm flex items-center justify-center shadow-md sm:mx-0 mx-auto">
                  {step.step}
                </div>
                <h3 className="text-sm font-bold text-white">{step.titleBn}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= WHY CUSTOMERS TRUST US (STATS) ================= */}
        <section className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-950 border border-red-900/30 p-8 sm:p-12 rounded-3xl shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-black text-white tracking-tight">৫০,০০০+</span>
              <p className="text-xs font-bold text-red-400 uppercase tracking-wider">ইস্যুকৃত ই-টিকিট</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-black text-white tracking-tight">৩৫,০০০+</span>
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">সন্তুষ্ট নিয়মিত যাত্রী</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-black text-white tracking-tight">৮৫+</span>
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">গন্তব্য ও দেশ</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-black text-white tracking-tight">১২+</span>
              <p className="text-xs font-bold text-purple-400 uppercase tracking-wider">বছরের অভিজ্ঞতা</p>
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIALS SLIDER / CARDS ================= */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-black text-red-500 uppercase tracking-widest block">
              Passenger Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              আমাদের যাত্রীদের অভিজ্ঞতা ও রিভিউ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{t.review}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-slate-800">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-white">{t.name}</h3>
                    <span className="text-[10px] text-red-400 block font-semibold">{t.route}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= EMBEDDED DIRECT BOOKING INQUIRY FORM ================= */}
        <section className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-red-500 uppercase tracking-widest block">
              Direct Flight Quote Request
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              এয়ার টিকিট ফেয়ার অনুসন্ধান ফর্ম
            </h2>
            <p className="text-xs text-slate-400">
              নিচে আপনার ট্রাভেল বিস্তারিত জমা দিন, আমাদের টিম সর্বনিম্ন মূল্যের টিকিট অফার পাঠাবে।
            </p>
          </div>

          {inquirySubmitted ? (
            <div className="p-8 bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-center rounded-2xl space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="font-extrabold text-lg text-white">ধন্যবাদ! আপনার এয়ার টিকিট আবেদন জমা হয়েছে</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                আমাদের টিকিট কনসালটেন্ট আপনার উল্লেখিত ফোন নম্বর বা হোয়াটসঅ্যাপে দ্রুততম সময়ে ৩টি এয়ারলাইন্সের ফেয়ার কম্প্যারিজন অফার পাঠাবেন।
              </p>
              <button
                onClick={() => setInquirySubmitted(false)}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                নতুন কোটেশন পাঠান
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">আপনার পূর্ণ নাম *</label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    placeholder="e.g. Mohammad Ali"
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">মোবাইল / ফোন নম্বর *</label>
                  <input
                    type="tel"
                    required
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    placeholder="01712345678"
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">হোয়াটসঅ্যাপ নম্বর</label>
                  <input
                    type="tel"
                    value={inquiryForm.whatsapp}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, whatsapp: e.target.value })}
                    placeholder="+88017..."
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">ইমেইল ঠিকানা</label>
                  <input
                    type="email"
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    placeholder="example@gmail.com"
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">কোথা থেকে (Origin) *</label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.origin}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, origin: e.target.value })}
                    placeholder="e.g. Dhaka (DAC)"
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">কোথায় যাবেন (Destination) *</label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.destination}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, destination: e.target.value })}
                    placeholder="e.g. Dubai (DXB)"
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">যাত্রার তারিখ *</label>
                  <input
                    type="date"
                    required
                    value={inquiryForm.departDate}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, departDate: e.target.value })}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">যাত্রীর সংখ্যা *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={inquiryForm.passengers}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, passengers: e.target.value })}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">ক্যাবিন ক্লাস</label>
                  <select
                    value={inquiryForm.cabin}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, cabin: e.target.value })}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                  >
                    <option value="Economy">Economy Class</option>
                    <option value="Premium Economy">Premium Economy</option>
                    <option value="Business">Business Class</option>
                    <option value="First Class">First Class</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">বিশেষ অনুরোধ / পছন্দসই এয়ারলাইন</label>
                <textarea
                  rows={2}
                  value={inquiryForm.specialRequest}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, specialRequest: e.target.value })}
                  placeholder="e.g. পছন্দসই এয়ারলাইন: Emirates, অতিরিক্তি ১০ কেজি লাগেজ বা হুইলচেয়ার অ্যাসিস্ট্যান্স প্রয়োজন"
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <button
                type="submit"
                disabled={inquirySubmitting}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black rounded-xl text-sm uppercase tracking-wider transition-all shadow-xl shadow-red-950 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {inquirySubmitting ? (
                  <span>জমা হচ্ছে...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>ফ্লাইট কোটেশন সাবমিট করুন</span>
                  </>
                )}
              </button>
            </form>
          )}
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="bg-slate-950 p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-black text-red-500 uppercase tracking-widest block">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              এয়ার টিকিট বুকিং সংক্রান্ত সচরাচর প্রশ্নাবলি
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqList.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-white flex justify-between items-center cursor-pointer hover:bg-slate-800/60"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-red-400 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaqIndex === idx && (
                  <div className="p-4 pt-0 text-xs text-slate-300 border-t border-slate-800/80 bg-slate-950/40 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ================= FIXED MOBILE STICKY BOTTOM BAR ================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800 p-3 backdrop-blur-md flex items-center justify-between gap-3 shadow-2xl">
        <a
          href="tel:+8801771304219"
          className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-colors border border-slate-700"
        >
          <PhoneCall className="w-4 h-4 text-red-400" />
          <span>Call Agent</span>
        </a>

        <button
          onClick={() => handleWhatsApp()}
          className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-xl flex items-center justify-center space-x-1.5 transition-colors shadow-lg"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={() => onOpenBookingModal('ফ্লাইট বুকিং ইনকোয়ারি')}
          className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-black rounded-xl flex items-center justify-center space-x-1.5 transition-colors shadow-lg"
        >
          <Search className="w-4 h-4" />
          <span>Quote</span>
        </button>
      </div>

      {/* FARE ALERT MODAL */}
      {showFareAlertModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 text-slate-100">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center space-x-2">
                <BellRing className="w-5 h-5 text-red-500" />
                <span>Fare Alert নোটিফিকেশন সেট করুন</span>
              </h3>
              <button
                onClick={() => setShowFareAlertModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            {fareAlertSuccess ? (
              <div className="p-6 bg-emerald-950 text-emerald-200 text-center rounded-2xl space-y-2 border border-emerald-800">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-sm">অভিনন্দন! Fare Alert সক্রিয় হয়েছে</h4>
                <p className="text-xs text-slate-300">
                  এই রুটের ভাড়া কমলে আমরা আপনাকে ইমেইল ও হোয়াটসঅ্যাপে তাৎক্ষণিক বার্তা পাঠাবো।
                </p>
              </div>
            ) : (
              <form onSubmit={handleFareAlertSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">উৎপত্তি (Origin):</label>
                  <input
                    type="text"
                    value={fareAlertRoute.origin}
                    onChange={(e) => setFareAlertRoute({ ...fareAlertRoute, origin: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">গন্তব্য (Destination):</label>
                  <input
                    type="text"
                    value={fareAlertRoute.destination}
                    onChange={(e) => setFareAlertRoute({ ...fareAlertRoute, destination: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">ইমেইল ঠিকানা:</label>
                  <input
                    type="email"
                    value={fareAlertRoute.email}
                    onChange={(e) => setFareAlertRoute({ ...fareAlertRoute, email: e.target.value })}
                    placeholder="example@gmail.com"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">হোয়াটসঅ্যাপ নম্বর:</label>
                  <input
                    type="tel"
                    value={fareAlertRoute.phone}
                    onChange={(e) => setFareAlertRoute({ ...fareAlertRoute, phone: e.target.value })}
                    placeholder="+88017..."
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow cursor-pointer transition-colors"
                >
                  নোটিফিকেশন সেভ করুন
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* GROUP BOOKING MODAL */}
      {showGroupBookingModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 text-slate-100">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center space-x-2">
                <Users className="w-5 h-5 text-red-500" />
                <span>Group Flight Booking Request (১০+ জন)</span>
              </h3>
              <button
                onClick={() => setShowGroupBookingModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            {groupSubmitted ? (
              <div className="p-6 bg-emerald-950 text-emerald-200 text-center rounded-2xl space-y-2 border border-emerald-800">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-sm">গ্রুপ বুকিং রিকোয়েস্ট সফলভাবে জমা হয়েছে!</h4>
                <p className="text-xs text-slate-300">
                  আমাদের গ্রুপ ডেস্ক অফিসার আপনার সাথে শীঘ্রই স্পেশাল রেট নিয়ে যোগাযোগ করবেন।
                </p>
              </div>
            ) : (
              <form onSubmit={handleGroupSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">নাম:</label>
                    <input
                      type="text"
                      value={groupForm.name}
                      onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">ফোন নম্বর:</label>
                    <input
                      type="tel"
                      value={groupForm.phone}
                      onChange={(e) => setGroupForm({ ...groupForm, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">যাত্রীর সংখ্যা (১০+):</label>
                    <input
                      type="number"
                      min="10"
                      value={groupForm.passengers}
                      onChange={(e) => setGroupForm({ ...groupForm, passengers: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">ভ্রমণের সম্ভাব্য তারিখ:</label>
                    <input
                      type="date"
                      value={groupForm.travelDate}
                      onChange={(e) => setGroupForm({ ...groupForm, travelDate: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">{"রুট (From -> To):"}</label>
                  <input
                    type="text"
                    value={`${groupForm.origin} -> ${groupForm.destination}`}
                    onChange={(e) => setGroupForm({ ...groupForm, destination: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow cursor-pointer transition-colors"
                >
                  গ্রুপ কোটেশন সাবমিট করুন
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
