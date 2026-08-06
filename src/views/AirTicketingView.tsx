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
  HelpCircle,
  ChevronDown,
  PhoneCall,
  MessageCircle,
  Download,
  Luggage,
  Award,
  Sparkles,
  ArrowRight,
  Briefcase,
  Layers,
  Zap,
  Globe,
  MapPin,
  BellRing,
  FileText,
  Building2,
  Info,
  CheckSquare,
  AlertTriangle,
  RefreshCw,
  XCircle,
  Tag,
  DollarSign
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
  // Tabs & Tool Modals
  const [activeTab, setActiveTab] = useState<'search' | 'bundle' | 'reqChecker' | 'baggageCalc' | 'airportGuide' | 'dashboard'>('search');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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

  // Multi-City Planner State
  const [multiCityLegs, setMultiCityLegs] = useState([
    { id: 1, from: 'DAC (ঢাকা)', to: 'DXB (দুবাই)', date: '2026-10-15' },
    { id: 2, from: 'DXB (দুবাই)', to: 'LHR (লন্ডন)', date: '2026-10-20' },
    { id: 3, from: 'LHR (লন্ডন)', to: 'DAC (ঢাকা)', date: '2026-10-30' }
  ]);

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

  const domesticRoutes = [
    { route: 'ঢাকা → কক্সবাজার', priceBDT: '৳৪,৫০০', desc: 'দৈনিক ১০+ সরাসরি ফ্লাইট' },
    { route: 'ঢাকা → সিলেট', priceBDT: '৳৩,৮০০', desc: 'সুবিধাজনক সকাল ও বিকালের স্লট' },
    { route: 'ঢাকা → চট্টগ্রাম', priceBDT: '৳৩,৯০০', desc: 'ব্যবসায়িক ট্রাভেলারদের প্রিয় পছন্দ' },
    { route: 'ঢাকা → যশোর', priceBDT: '৳৩,৭০০', desc: 'খুলনা ও যশোরগামী যাত্রীদের জন্য' },
    { route: 'ঢাকা → সৈয়দপুর', priceBDT: '৳৪,২০০', desc: 'উত্তরবঙ্গগামী দ্রুততম ফ্লাইট' },
    { route: 'ঢাকা → বরিশাল', priceBDT: '৳৩,৬০০', desc: 'দ্রুত ও আরামদায়ক আকাশপথ' },
  ];

  const internationalRoutes = [
    { route: 'ঢাকা → দুবাই (DXB)', priceBDT: '৳৩৮,৫০০', desc: 'এমিরেটস, ফ্লাইদুবাই ও ইউএস-বাংলা' },
    { route: 'ঢাকা → সৌদি আরব (জেদ্দা/রিয়াদ)', priceBDT: '৳৪৫,০০০', desc: 'সাউদিয়া ও বিমান বাংলাদেশ' },
    { route: 'ঢাকা → মালয়েশিয়া (KLIA)', priceBDT: '৳৩২,০০০', desc: 'এয়ারএশিয়া ও বিটিকিট' },
    { route: 'ঢাকা → সিঙ্গাপুর (SIN)', priceBDT: '৳৩৬,৫০০', desc: 'সিঙ্গাপুর এয়ারলাইনস ও ইউএস-বাংলা' },
    { route: 'ঢাকা → থাইল্যান্ড (BKK)', priceBDT: '৳২৭,৯০০', desc: 'থাই এয়ারওয়েজ ও ইন্ডিগো' },
    { route: 'ঢাকা → কাতার (DOH)', priceBDT: '৳৪২,০০০', desc: 'কাতার এয়ারওয়েজ প্রিমিয়াম সেবা' },
    { route: 'ঢাকা → ইতালি (রোম/মিলান)', priceBDT: '৳৬৫,০০০', desc: 'বিমান বাংলাদেশ সরাসরি ফ্লাইট' },
    { route: 'ঢাকা → কানাডা (টরোন্টো)', priceBDT: '৳১২৫,০০০', desc: 'বিশাল ব্যাগেজ ও সহজ ট্রানজিট' },
    { route: 'ঢাকা → যুক্তরাজ্য (লন্ডন)', priceBDT: '৳৮৫,০০০', desc: 'লন্ডন হিথ্রো সরাসরি যাত্রা' },
    { route: 'ঢাকা → অস্ট্রেলিয়া (সিডনি)', priceBDT: '৳১০৫,০০০', desc: 'সিঙ্গাপুর ও মালয়েশিয়া ট্রানজিট' },
  ];

  const airlinesList = [
    { name: 'Biman Bangladesh Airlines', code: 'BG', desc: 'জাতীয় পাতাকাবাহী এয়ারলাইন' },
    { name: 'US-Bangla Airlines', code: 'BS', desc: 'জনপ্রিয় প্রাইভেট এয়ারলাইন' },
    { name: 'Novoair', code: 'VQ', desc: 'প্রিমিয়াম ডোমেস্টিক সেবা' },
    { name: 'Emirates', code: 'EK', desc: 'বিশ্বমানের লাক্সারি ফ্লাইট' },
    { name: 'Qatar Airways', code: 'QR', desc: 'ফাইভ স্টার রেটিং এয়ারলাইন' },
    { name: 'Turkish Airlines', code: 'TK', desc: 'সর্বাধিক গন্তব্যে সংযোগ' },
    { name: 'Etihad Airways', code: 'EY', desc: 'আবুধাবি হাবে আরামদায়ক ভ্রমণ' },
    { name: 'Saudia', code: 'SV', desc: 'উমরাহ ও সৌদি ট্রাভেলস' },
    { name: 'Air Arabia', code: 'G9', desc: 'বাজেট ফ্রেন্ডলি ট্রাভেল' },
    { name: 'Flydubai', code: 'FZ', desc: 'দুবাই ও মধ্যপ্রাচ্য রুট' },
    { name: 'Malaysia Airlines', code: 'MH', desc: 'দক্ষিণ-পূর্ব এশিয়ার বিশ্বস্ত নাম' },
    { name: 'Singapore Airlines', code: 'SQ', desc: 'সেরা সার্ভিস ও ইন-ফ্লাইট অভিজ্ঞতা' },
    { name: 'Thai Airways', code: 'TG', desc: 'থাইল্যান্ড ও এশিয়া রুট' },
    { name: 'IndiGo', code: '6E', desc: 'সাশ্রয়ী ডিরেক্ট ফ্লাইট' },
    { name: 'Air India', code: 'AI', desc: 'ভারত ও গ্লোবাল কানেক্টিভিটি' },
  ];

  const bookingSteps = [
    { step: 1, title: 'গন্তব্য নির্বাচন', desc: 'কোথা থেকে কোথায় যাবেন সিলেক্ট করুন' },
    { step: 2, title: 'ভ্রমণের তারিখ নির্বাচন', desc: 'ওয়ান ওয়ে, রাউন্ড ট্রিপ বা তারিখ পছন্দ করুন' },
    { step: 3, title: 'যাত্রীর তথ্য প্রদান', desc: 'পাসপোর্ট অনুযায়ী যাত্রীর নাম ও ফোন দিন' },
    { step: 4, title: 'ফ্লাইট অপশন নির্বাচন', desc: 'পছন্দের সময়, এয়ারলাইনস ও ফেয়ার বেছে নিন' },
    { step: 5, title: 'পেমেন্ট সম্পন্ন', desc: 'অনলাইন ব্যাংকিং, বিকাশ বা কার্ডে পেমেন্ট করুন' },
    { step: 6, title: 'ই-টিকিট ইমেইলে গ্রহণ', desc: 'ইনস্ট্যান্ট ই-টিকিট ডাউনলোড ও হোয়াটসঅ্যাপে পান' },
  ];

  const ticketClasses = [
    {
      title: 'Economy Class',
      desc: 'সাশ্রয়ী মূল্যে আরামদায়ক ভ্রমণ',
      features: ['স্ট্যান্ডার্ড লেগরুম', 'ফ্রি প্রাতরাশ/মিলস', '২০-৩০ কেজি ব্যাগেজ এলাউন্স', 'স্ট্যান্ডার্ড বিনোদন স্কিন']
    },
    {
      title: 'Premium Economy',
      desc: 'অতিরিক্ত লেগরুম ও প্রিমিয়াম সুবিধা',
      features: ['অতিরিক্ত লেগরুম ও প্রশস্ত সিট', 'আলাদা চেক-ইন কাউন্টার', 'অতিরিক্ত ৫-১০ কেজি ব্যাগেজ', 'প্রিমিয়াম মিল মেন্যু']
    },
    {
      title: 'Business Class',
      desc: 'প্রিমিয়াম সিট ও বিমানবন্দর লাউঞ্জ সুবিধা',
      features: ['ফ্ল্যাট-বেড হেলানো সিট', 'ভিআইপি এয়ারপোর্ট লাউঞ্জ এক্সেস', '৪০ কেজি ব্যাগেজ ও প্রায়োরিটি বোর্ডিং', 'ফাইভ স্টার গুরমে ডাইনিং']
    },
    {
      title: 'First Class',
      desc: 'সর্বোচ্চ বিলাসবহুল রাজকীয় ভ্রমণ',
      features: ['প্রাইভেট সুইট ও শাওয়ার সুয়েট', 'ডেডিকেটেড ক্যাবিন ক্রু সেবা', 'আনলিমিটেড গুরমে ক্যাভিয়ার ও ড্রিন্কস', 'প্রাইভেট চাফার ড্রাইভার ট্রান্সফার']
    },
  ];

  const requirementRules: Record<string, { title: string; passport: string; visa: string; health: string; currency: string }> = {
    saudi: {
      title: '🇸🇦 সৌদি আরব ভ্রমণ নির্দেশিকা',
      passport: 'কমপক্ষে ৬ মাসের মেয়াদ থাকতে হবে। পাসপোর্ট কপির সকল পৃষ্ঠা পরিষ্কার হওয়া আবশ্যক।',
      visa: 'উমরাহ, ট্যুরিস্ট বা ওয়ার্ক ভিসা থাকতে হবে। অন-অ্যারাইভাল শুধুমাত্র ইউএস/ইউকে ভিসা হোল্ডারদের জন্য।',
      health: 'মেনিনজাইটিস ভ্যাকসিনেশন ও প্রাথমিক মেডিকেল ফিটনেস কার্ড সাথে রাখা বাঞ্ছনীয়।',
      currency: 'সর্বোচ্চ নগদ ১০,০০০ রিয়াল বা সমপরিমাণ বৈদেশিক মুদ্রা সাথে রাখা যাবে।'
    },
    uae: {
      title: '🇦🇪 সংযুক্ত আরব আমিরাত (দুবাই) নির্দেশিকা',
      passport: 'ভ্রমণের তারিখ থেকে নূন্যতম ৬ মাসের ভ্যালিডিটি বাঞ্ছনীয়।',
      visa: 'ভ্রমণের পূর্বে ই-ভিসা অথবা ভ্যালিড ট্যুরিস্ট এন্ট্রি পারমিট থাকতে হবে। রিটার্ন টিকিট বাধ্যতামূলক।',
      health: 'ভ্রমণ বীমা (Travel Insurance) ও হোটেল বুকিং কপি সাথে রাখা জরুরি।',
      currency: 'ব্যাংক স্টেটমেন্ট বা নূন্যতম ৫০০ ডলার সমপরিমাণ ফান্ড চেক হতে পারে।'
    },
    malaysia: {
      title: '🇲🇾 মালয়েশিয়া ভ্রমণ নির্দেশিকা',
      passport: 'ন্যূনতম ৬ মাসের মেয়াদকাল ও ৩টি খালি পাতা থাকতে হবে।',
      visa: 'মালয়েশিয়া ই-ভিসা (MDAC) ডিজিটালি জমা দিতে হবে ভ্রমণের ৩ দিন পূর্বে।',
      health: 'কোভিড শর্তাবলি শিথিল, তবে ইমিগ্রেশনে বুকিং রসিদ ও রিটার্ন ফ্লাইট নিশ্চিত করতে হবে।',
      currency: 'স্মার্ট কার্ড অথবা ১০০০ ডলার সমপরিমাণ ক্যাশ রাখা ভালো।'
    },
    uk: {
      title: '🇬🇧 যুক্তরাজ্য (লন্ডন) ভ্রমণ নির্দেশিকা',
      passport: 'ভ্রমণ মেয়াদের বেশি পাসপোর্ট মেয়াদের স্থায়িত্ব থাকা প্রয়োজন।',
      visa: 'পূর্বে অনুমোদিত ইউকে স্ট্যান্ডার্ড ভিজিটর বা স্টুডেন্ট ভিসা আবশ্যক।',
      health: 'টিবি টেস্ট (তপশিলি ল্যাব থেকে) স্টুডেন্টদের জন্য প্রযোজ্য।',
      currency: 'পাউন্ড বা ইন্টারন্যাশনাল ডেবিট/ক্রেডিট কার্ড সঙ্গে রাখা বাঞ্ছনীয়।'
    },
    canada: {
      title: '🇨🇦 কানাডা ভ্রমণ নির্দেশিকা',
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-900 space-y-16 animate-in fade-in">
      {/* 1. HERO HEADER BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-gray-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-red-500/20">
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center space-x-2 bg-amber-400 text-gray-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow">
            <Sparkles className="w-4 h-4 text-gray-900" />
            <span>Dream Fly Air Ticketing Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-sans text-white leading-tight">
            দেশীয় ও আন্তর্জাতিক এয়ার টিকিট বুকিং
          </h1>

          <p className="text-sm sm:text-base text-gray-100 font-medium leading-relaxed">
            Dreams Fly International-এর মাধ্যমে বিশ্বের যেকোনো গন্তব্যের জন্য সহজে, নিরাপদে এবং প্রতিযোগিতামূলক মূল্যে এয়ার টিকিট বুক করুন।
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenBookingModal('এয়ার টিকিট বুকিং')}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all flex items-center space-x-2 cursor-pointer"
            >
              <CheckSquare className="w-4 h-4" />
              <span>Book Ticket Now</span>
            </button>

            <button
              onClick={() => handleWhatsApp()}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer flex items-center space-x-2 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Booking (+880 1771-304219)</span>
            </button>

            <button
              onClick={() => setShowFareAlertModal(true)}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer flex items-center space-x-2"
            >
              <BellRing className="w-4 h-4 text-amber-300" />
              <span>Fare Alert সেট করুন</span>
            </button>
          </div>
        </div>

        {/* Floating Flight Icon Accent */}
        <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none hidden lg:block">
          <Plane className="w-96 h-96 text-white" />
        </div>
      </div>

      {/* 2. OUR TICKETING SERVICES BADGES GRID */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            আমাদের সেবা
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            Our Air Ticketing Solutions
          </h2>
          <p className="text-xs text-gray-600">
            আপনার সকল প্রকার আকাশপথ ভ্রমণের একক নির্ভরযোগ্য সমাধান
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {serviceBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-gray-200 hover:border-red-300 hover:shadow-md transition-all text-center flex flex-col items-center justify-center space-y-2 group cursor-pointer"
                onClick={() => onOpenBookingModal(badge.title)}
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#DC2626] group-hover:bg-[#DC2626] group-hover:text-white flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-gray-900 leading-tight">
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. FLIGHT SEARCH ENGINE & INTERACTIVE TAB TOOLS */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-6 py-4 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'search'
                ? 'border-[#DC2626] text-[#DC2626] bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>ফ্লাইট সার্চ ও কোটেশন (Flight Search)</span>
          </button>

          <button
            onClick={() => setActiveTab('bundle')}
            className={`px-6 py-4 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'bundle'
                ? 'border-[#DC2626] text-[#DC2626] bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Tag className="w-4 h-4 text-amber-500" />
            <span>ভিসা + টিকিট বান্ডেল (Visa + Ticket Bundle)</span>
          </button>

          <button
            onClick={() => setActiveTab('reqChecker')}
            className={`px-6 py-4 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'reqChecker'
                ? 'border-[#DC2626] text-[#DC2626] bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Travel Requirement Checker</span>
          </button>

          <button
            onClick={() => setActiveTab('baggageCalc')}
            className={`px-6 py-4 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'baggageCalc'
                ? 'border-[#DC2626] text-[#DC2626] bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Luggage className="w-4 h-4" />
            <span>Baggage Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab('airportGuide')}
            className={`px-6 py-4 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'airportGuide'
                ? 'border-[#DC2626] text-[#DC2626] bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Airport Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-4 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'dashboard'
                ? 'border-[#DC2626] text-[#DC2626] bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Customer Dashboard (ই-টিকিট হাব)</span>
          </button>
        </div>

        {/* Tab Content 1: Search Engine */}
        {activeTab === 'search' && (
          <div className="p-6 sm:p-8">
            <FlightSearchEngine
              currency={currency}
              onBookFlight={(flight) => {
                onOpenBookingModal(`ফ্লাইট বুকিং: ${flight.airline} (${flight.origin} - ${flight.destination})`);
              }}
            />
          </div>
        )}

        {/* Tab Content 2: Visa + Ticket Bundle */}
        {activeTab === 'bundle' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-gradient-to-r from-red-50 to-amber-50 p-6 rounded-2xl border border-red-200">
              <h3 className="text-lg font-black text-gray-900 flex items-center space-x-2">
                <Tag className="w-5 h-5 text-[#DC2626]" />
                <span>স্পেশাল কম্বো প্যাকেজ: ভিসা এবং এয়ার টিকিট একসাথে</span>
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                ভিসা প্রসেসিং এবং ফ্লাইট টিকিট একসাথে বুকিং করলে পাচ্ছেন বিশেষ ১০-১৫% অতিরিক্ত ডিসকাউন্ট।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 hover:border-red-300 transition-all">
                <div className="inline-block bg-red-100 text-[#DC2626] px-3 py-1 rounded-full text-[10px] font-black uppercase">
                  🇦🇪 দুবাই সুপার কম্বো
                </div>
                <h4 className="text-base font-black text-gray-900">দুবাই ৩০ দিন ভিসা + এয়ার টিকিট</h4>
                <p className="text-xs text-gray-600">
                  ইনস্ট্যান্ট ৩০ দিন ইউএই ভিসা প্রসেসিং ও এমিরেটস/ফ্লাইদুবাই টিকিট কনফার্মেশন।
                </p>
                <div className="text-lg font-black text-[#DC2626]">
                  ৳৫৯,৯৯০ <span className="text-xs text-gray-400 line-through">৳৬৮,০০০</span>
                </div>
                <button
                  onClick={() => onOpenBookingModal('দুবাই ভিসা + টিকিট কম্বো')}
                  className="w-full py-2.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  কম্বো বুক করুন
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 hover:border-red-300 transition-all">
                <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                  🇸🇦 সৌদি উমরাহ প্যাকেজ
                </div>
                <h4 className="text-base font-black text-gray-900">সৌদি ১ বছর উমরাহ ভিসা + টিকিট</h4>
                <p className="text-xs text-gray-600">
                  মাল্টিপল এন্ট্রি উমরাহ ভিসা এবং সাউদিয়া/বিমান বাংলাদেশ এয়ার টিকিটসহ।
                </p>
                <div className="text-lg font-black text-[#DC2626]">
                  ৳৭৮,০০০ <span className="text-xs text-gray-400 line-through">৳৮৮,০০০</span>
                </div>
                <button
                  onClick={() => onOpenBookingModal('সৌদি উমরাহ ভিসা + টিকিট কম্বো')}
                  className="w-full py-2.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  কম্বো বুক করুন
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 hover:border-red-300 transition-all">
                <div className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                  🇲🇾 মালয়েশিয়া ই-ভিসা কম্বো
                </div>
                <h4 className="text-base font-black text-gray-900">মালয়েশিয়া ই-ভিসা + এয়ার টিকিট</h4>
                <p className="text-xs text-gray-600">
                  MDAC ডিজিটাল ভিসা প্রসেসিং ও এয়ার এশিয়া রিটার্ন এয়ার টিকিট।
                </p>
                <div className="text-lg font-black text-[#DC2626]">
                  ৳৩৯,৫০০ <span className="text-xs text-gray-400 line-through">৳৪৫,০০০</span>
                </div>
                <button
                  onClick={() => onOpenBookingModal('মালয়েশিয়া ভিসা + টিকিট কম্বো')}
                  className="w-full py-2.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  কম্বো বুক করুন
                </button>
              </div>
            </div>

            <PriceNotice variant="banner" className="mt-4" />
          </div>
        )}

        {/* Tab Content 3: Travel Requirement Checker */}
        {activeTab === 'reqChecker' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <div>
                <h3 className="text-sm font-bold text-gray-900">গন্তব্য দেশ নির্বাচন করুন:</h3>
                <p className="text-xs text-gray-500">ভিসা, পাসপোর্টের মেয়াদ ও ট্রাভেল রুলস দেখে নিন</p>
              </div>
              <select
                value={reqCountry}
                onChange={(e) => setReqCountry(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="saudi">🇸🇦 সৌদি আরব (Saudi Arabia)</option>
                <option value="uae">🇦🇪 সংযুক্ত আরব আমিরাত (UAE - Dubai)</option>
                <option value="malaysia">🇲🇾 মালয়েশিয়া (Malaysia)</option>
                <option value="uk">🇬🇧 যুক্তরাজ্য (United Kingdom)</option>
                <option value="canada">🇨🇦 কানাডা (Canada)</option>
              </select>
            </div>

            {requirementRules[reqCountry] && (
              <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4">
                <h4 className="text-base font-black text-[#DC2626] border-b pb-2 flex items-center gap-2">
                  <CountryFlagSvg countryId={reqCountry === 'saudi' ? 'saudi-arabia' : reqCountry === 'uae' ? 'dubai' : reqCountry} className="w-6 h-4 rounded-xs" />
                  <span>{requirementRules[reqCountry].title.replace(/^[\uD83C-\uDBFF\uDC00-\uDFFF\s]+/, '')}</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-red-50/50 rounded-xl border border-red-100 space-y-1">
                    <span className="font-bold text-gray-900 block flex items-center space-x-1">
                      <FileText className="w-4 h-4 text-[#DC2626]" />
                      <span>পাসপোর্ট প্রয়োজনীয়তা</span>
                    </span>
                    <p className="text-gray-700">{requirementRules[reqCountry].passport}</p>
                  </div>

                  <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100 space-y-1">
                    <span className="font-bold text-gray-900 block flex items-center space-x-1">
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      <span>ভিসা রুলস</span>
                    </span>
                    <p className="text-gray-700">{requirementRules[reqCountry].visa}</p>
                  </div>

                  <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-1">
                    <span className="font-bold text-gray-900 block flex items-center space-x-1">
                      <AlertTriangle className="w-4 h-4 text-blue-600" />
                      <span>স্বাস্থ্য ও ট্রাভেল ইন্স্যুরেন্স</span>
                    </span>
                    <p className="text-gray-700">{requirementRules[reqCountry].health}</p>
                  </div>

                  <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-1">
                    <span className="font-bold text-gray-900 block flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <span>কারেন্সি ও ক্যাশ রুলস</span>
                    </span>
                    <p className="text-gray-700">{requirementRules[reqCountry].currency}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab Content 4: Baggage Calculator */}
        {activeTab === 'baggageCalc' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="max-w-2xl mx-auto bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
              <h3 className="text-base font-black text-gray-900 flex items-center space-x-2">
                <Luggage className="w-5 h-5 text-[#DC2626]" />
                <span>Baggage Allowance & Extra Weight Calculator</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">এয়ারলাইন:</label>
                  <select
                    value={calcAirline}
                    onChange={(e) => setCalcAirline(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-bold"
                  >
                    <option value="emirates">Emirates Airlines</option>
                    <option value="biman">Biman Bangladesh</option>
                    <option value="qatar">Qatar Airways</option>
                    <option value="usbangla">US-Bangla Airlines</option>
                    <option value="saudia">Saudia Airlines</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ক্যাবিনের শ্রেণী:</label>
                  <select
                    value={calcClass}
                    onChange={(e) => setCalcClass(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-bold"
                  >
                    <option value="economy">Economy Class</option>
                    <option value="business">Business Class</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  অতিরিক্ত মালামাল (কেজি): {extraBaggageKg} কেজি
                </label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="5"
                  value={extraBaggageKg}
                  onChange={(e) => setExtraBaggageKg(Number(e.target.value))}
                  className="w-full accent-[#DC2626]"
                />
              </div>

              <div className="p-4 bg-white rounded-xl border border-red-200 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-gray-800">
                  <span>বিনামূল্যে লাগেজ (Free Baggage):</span>
                  <span className="text-[#DC2626]">
                    {calcClass === 'business' ? '৪০ কেজি + ৭ কেজি কেবিন' : '২৫-৩০ কেজি + ৭ কেজি কেবিন'}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-gray-800">
                  <span>অতিরিক্ত লাগেজের আনুমানিক খরচ:</span>
                  <span className="text-emerald-700">
                    ৳{extraBaggageKg * 1200} (প্রায় ${extraBaggageKg * 10})
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 5: Airport Guide */}
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
                        ? 'bg-[#DC2626] text-white shadow'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {item.name} ({item.code})
                  </button>
                );
              })}
            </div>

            {airportGuidesData[selectedAirport] && (
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                <h4 className="text-base font-black text-gray-900 border-b pb-2">
                  {airportGuidesData[selectedAirport].name} ({airportGuidesData[selectedAirport].code}) - {airportGuidesData[selectedAirport].city}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-1">
                    <span className="font-bold text-[#DC2626] block">⏱️ চেক-ইন সময়সীমা:</span>
                    <p className="text-gray-700">{airportGuidesData[selectedAirport].checkin}</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-1">
                    <span className="font-bold text-[#DC2626] block">☕ লাউঞ্জ সুবিধা:</span>
                    <p className="text-gray-700">{airportGuidesData[selectedAirport].lounge}</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-1">
                    <span className="font-bold text-[#DC2626] block">🏢 টার্মিনাল গাইড:</span>
                    <p className="text-gray-700">{airportGuidesData[selectedAirport].terminals}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab Content 6: Customer Dashboard Simulator */}
        {activeTab === 'dashboard' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center space-x-3 border-b pb-4">
              <button
                onClick={() => setDashboardTab('eticket')}
                className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer ${
                  dashboardTab === 'eticket' ? 'bg-[#DC2626] text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                ই-টিকিট ডাউনলোড (E-Ticket)
              </button>
              <button
                onClick={() => setDashboardTab('history')}
                className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer ${
                  dashboardTab === 'history' ? 'bg-[#DC2626] text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                বুকিং হিস্টোরি
              </button>
              <button
                onClick={() => setDashboardTab('invoice')}
                className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer ${
                  dashboardTab === 'invoice' ? 'bg-[#DC2626] text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                ইনভয়েস
              </button>
            </div>

            {dashboardTab === 'eticket' && (
              <div className="bg-white border-2 border-dashed border-red-300 p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <div>
                    <h4 className="text-sm font-black text-gray-900">E-TICKET CONFIRMATION SLIP</h4>
                    <span className="text-[10px] text-gray-500 font-mono">PNR: DF-892410-BD</span>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-full">
                    ISSUED & CONFIRMED
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-gray-400 block text-[10px]">PASSENGER NAME</span>
                    <span className="font-bold text-gray-900">MR MOHAMMAD JAHAN</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">AIRLINE</span>
                    <span className="font-bold text-gray-900">EMIRATES (EK-583)</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">ROUTE</span>
                    <span className="font-bold text-gray-900">DAC ➔ DXB ➔ LHR</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">DEPARTURE</span>
                    <span className="font-bold text-gray-900">10 OCT 2026, 10:15 AM</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => alert('ই-টিকিট পিডিএফ ডাউনলোড শুরু হচ্ছে...')}
                    className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF Ticket</span>
                  </button>
                </div>
              </div>
            )}

            {dashboardTab === 'history' && (
              <div className="text-xs text-gray-600 p-4 bg-gray-50 rounded-xl">
                সফল বুকিং হিস্টোরি: ১টি আইটেম (DAC-LHR কাতার এয়ারওয়েজ - ২৫ সেপ্টেম্বর ২০২৬)
              </div>
            )}

            {dashboardTab === 'invoice' && (
              <div className="text-xs text-gray-600 p-4 bg-gray-50 rounded-xl">
                ইনভয়েস #INV-2026-9042 - সর্বমোট পেমেন্ট: ৳১০৪,০০০ (Paid via Bank Transfer)
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. WHY DREAMS FLY INTERNATIONAL */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-700">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <span className="text-xs font-black text-amber-400 uppercase tracking-widest block">
            কেন আমাদের নির্বাচন করবেন?
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-sans text-white">
            কেন Dreams Fly International?
          </h2>
          <p className="text-xs sm:text-sm text-gray-300">
            নির্ভরযোগ্যতা, স্বচ্ছতা ও সেরা কাস্টমার কেয়ার দিয়ে আপনার ভ্রমণকে করি নির্বিঘ্ন
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-gray-900 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">সকল প্রধান এয়ারলাইন্সের টিকিট</h3>
            <p className="text-xs text-gray-300">IATA অনুমোদিত গ্লোবাল ও লোকাল সকল এয়ারলাইন্সের সাথে সরাসরি সংযোগ।</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-gray-900 flex items-center justify-center font-bold">
              <Tag className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">প্রতিযোগিতামূলক মূল্য</h3>
            <p className="text-xs text-gray-300">হিটেন চার্জবিহীন সর্বনিম্ন বাজারমূল্য ও এক্সক্লুসিভ ফেয়ার অপশন।</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-gray-900 flex items-center justify-center font-bold">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">২৪/৭ কাস্টমার সাপোর্ট</h3>
            <p className="text-xs text-gray-300">যেকোনো জরুরি ফ্লাইট পরিবর্তন বা সহায়তায় ২৪ ঘণ্টা আমাদের টিম সক্রিয়।</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-gray-900 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">দ্রুত বুকিং কনফার্মেশন</h3>
            <p className="text-xs text-gray-300">পেমেন্টের সাথে সাথে কয়েক মিনিটের মধ্যে ই-টিকিট ও PNR কনফার্মেশন।</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-gray-900 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">গ্রুপ ও কর্পোরেট ডিসকাউন্ট</h3>
            <p className="text-xs text-gray-300">১০ বা তার বেশি যাত্রী এবং প্রাতিষ্ঠানিক ভ্রমণের জন্য স্পেশাল ফেয়ার।</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-gray-900 flex items-center justify-center font-bold">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">টিকিট পরিবর্তন ও বাতিলে সহায়তা</h3>
            <p className="text-xs text-gray-300">সহজ উপায়ে ফ্লাইট ডেট চেঞ্জ, রিশিডিউলিং ও দ্রুত রিফান্ড সার্ভিস।</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-gray-900 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">নিরাপদ পেমেন্ট ব্যবস্থা</h3>
            <p className="text-xs text-gray-300">অনলাইন কার্ড, বিকাশ, নগদ ও ব্যাংক একাউন্টের মাধ্যমে শতভাগ নিরাপদ লেনদেন।</p>
          </div>

          <div
            onClick={() => setShowGroupBookingModal(true)}
            className="bg-amber-400 text-gray-900 p-5 rounded-2xl space-y-2 hover:bg-amber-300 transition-colors cursor-pointer flex flex-col justify-center"
          >
            <div className="font-black text-sm uppercase">👥 গ্রুপ ইনকোয়ারি?</div>
            <p className="text-xs font-bold text-gray-800">১০+ যাত্রীর জন্য আলাদা কোটেশন ফর্ম পূরণ করুন ➔</p>
          </div>
        </div>
      </div>

      {/* 5. OUR AIR TICKETING ROUTES */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            আমাদের এয়ার টিকেটিং সেবা
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            Popular Domestic & International Routes
          </h2>
          <p className="text-xs text-gray-600">
            দেশি-বিদেশি জনপ্রিয় প্রধান রুটের প্রারম্ভিক টিকিট মূল্য
          </p>
        </div>

        {/* Domestic Flights Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-gray-900 flex items-center space-x-2 border-b pb-2">
            <Plane className="w-5 h-5 text-[#DC2626]" />
            <span>🛫 Domestic Flights (অভ্যন্তরীণ রুট)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {domesticRoutes.map((r, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:border-red-300 hover:shadow-md transition-all flex justify-between items-center"
              >
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{r.route}</h4>
                  <p className="text-[11px] text-gray-500">{r.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-[#DC2626] block">{r.priceBDT}</span>
                  <button
                    onClick={() => onOpenBookingModal(`ফ্লাইট: ${r.route}`)}
                    className="text-[10px] font-bold text-gray-700 hover:text-[#DC2626] underline cursor-pointer"
                  >
                    বুক করুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* International Flights Grid */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-black text-gray-900 flex items-center space-x-2 border-b pb-2">
            <Globe className="w-5 h-5 text-[#DC2626]" />
            <span>🌍 International Flights (আন্তর্জাতিক রুট)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {internationalRoutes.map((r, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs hover:border-red-300 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <h4 className="text-xs font-extrabold text-gray-900">{r.route}</h4>
                  <p className="text-[10px] text-gray-500 mt-1">{r.desc}</p>
                </div>
                <div className="flex items-center justify-between border-t pt-2">
                  <span className="text-xs font-black text-[#DC2626]">{r.priceBDT}</span>
                  <button
                    onClick={() => onOpenBookingModal(`ফ্লাইট: ${r.route}`)}
                    className="px-2.5 py-1 bg-gray-900 hover:bg-black text-white text-[10px] font-bold rounded-lg cursor-pointer"
                  >
                    বুক করুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. POPULAR AIRLINES */}
      <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-xl sm:text-2xl font-black font-sans text-gray-900">
            জনপ্রিয় এয়ারলাইন্স Partner Network
          </h2>
          <p className="text-xs text-gray-600">
            বিশ্বের সেরা এয়ারলাইন্সের টিকিট বুক করুন সবচেয়ে কম দামে
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {airlinesList.map((airline, idx) => (
            <div
              key={idx}
              className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs hover:border-red-300 transition-all flex items-center space-x-3 cursor-pointer"
              onClick={() => onOpenBookingModal(`এয়ারলাইন অনুসন্ধানের অনুরোধ: ${airline.name}`)}
            >
              <div className="w-8 h-8 rounded-xl bg-red-100 text-[#DC2626] font-black text-xs flex items-center justify-center shrink-0">
                {airline.code}
              </div>
              <div className="overflow-hidden">
                <h3 className="text-xs font-bold text-gray-900 truncate">{airline.name}</h3>
                <p className="text-[10px] text-gray-500 truncate">{airline.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. BOOKING PROCESS */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            বুকিং নির্দেশিকা
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            Booking Process (৬টি সহজ ধাপ)
          </h2>
          <p className="text-xs text-gray-600">
            মাত্র কয়েকটি ক্লিকেই সম্পন্ন করুন আপনার এয়ার টিকিট বুকিং
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {bookingSteps.map((s) => (
            <div
              key={s.step}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs relative flex flex-col justify-between space-y-2 text-center hover:border-red-300 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-[#DC2626] text-white font-black text-xs flex items-center justify-center mx-auto">
                {s.step}
              </div>
              <h3 className="text-xs font-bold text-gray-900">{s.title}</h3>
              <p className="text-[10px] text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 8. TICKET CLASSES */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            Ticket Classes (ক্যাবিন শ্রেণি)
          </h2>
          <p className="text-xs text-gray-600">
            আপনার বাজেট ও স্বাচ্ছন্দ্য অনুযায়ী বেছে নিন উপযুক্ত ক্যাবিন ক্যাটাগরি
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {ticketClasses.map((cls, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 hover:border-red-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h3 className="text-base font-black text-gray-900">{cls.title}</h3>
                <p className="text-xs text-[#DC2626] font-bold">{cls.desc}</p>

                <ul className="space-y-2 pt-2 border-t">
                  {cls.features.map((f, i) => (
                    <li key={i} className="text-xs text-gray-600 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onOpenBookingModal(`ক্যাবিন ক্লাস বুকিং: ${cls.title}`)}
                className="w-full py-2 bg-gray-900 hover:bg-black text-white font-bold rounded-xl text-xs cursor-pointer transition-colors mt-4"
              >
                অনুরোধ জানান
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 9. ADDITIONAL SERVICES & BAGGAGE INFO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Additional Services */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-md space-y-4">
          <h3 className="text-lg font-black text-gray-900 flex items-center space-x-2 border-b pb-3">
            <Sparkles className="w-5 h-5 text-[#DC2626]" />
            <span>অতিরিক্ত সেবাসমূহ (Additional Services)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 text-[#DC2626]" />
              <span className="font-bold text-gray-800">Flight Reschedule & Date Change</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center space-x-2">
              <XCircle className="w-4 h-4 text-[#DC2626]" />
              <span className="font-bold text-gray-800">Ticket Cancellation & Refund</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center space-x-2">
              <Tag className="w-4 h-4 text-[#DC2626]" />
              <span className="font-bold text-gray-800">Name Correction Assistance</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center space-x-2">
              <Luggage className="w-4 h-4 text-[#DC2626]" />
              <span className="font-bold text-gray-800">Extra Baggage Purchase</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center space-x-2">
              <Users className="w-4 h-4 text-[#DC2626]" />
              <span className="font-bold text-gray-800">Wheelchair Assistance</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#DC2626]" />
              <span className="font-bold text-gray-800">Special Meal Request (Halal/Vegan)</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-[#DC2626]" />
              <span className="font-bold text-gray-800">Airport Meet & Greet Service</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#DC2626]" />
              <span className="font-bold text-gray-800">Travel Insurance Coverage</span>
            </div>
          </div>
        </div>

        {/* Baggage Information */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-md space-y-4">
          <h3 className="text-lg font-black text-gray-900 flex items-center space-x-2 border-b pb-3">
            <Luggage className="w-5 h-5 text-[#DC2626]" />
            <span>লাগেজ তথ্য ও নীতি (Baggage Policy)</span>
          </h3>

          <div className="space-y-3 text-xs text-gray-700">
            <div className="p-3 bg-red-50/50 rounded-xl border border-red-100">
              <span className="font-bold text-gray-900 block">🧳 Carry-on Baggage (ক্যাবিন ব্যাগ):</span>
              <p>প্রতিটি যাত্রীর জন্য ৭ থেকে ১০ কেজি ওজনের হ্যান্ড লাগেজ বা ল্যাপটপ ব্যাগ ফ্লাইটে ফ্রি নেওয়া যায়।</p>
            </div>

            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100">
              <span className="font-bold text-gray-900 block">📦 Checked Baggage (চেক-ইন লাগেজ):</span>
              <p>আন্তর্জাতিক রুটে সাধারণ ২০ থেকে ৪০ কেজি এবং ২টি ব্যাগেজ পিস অনুমতি থাকে।</p>
            </div>

            <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
              <span className="font-bold text-gray-900 block">⚠️ অতিরিক্ত লাগেজ চার্জ & নিষিদ্ধ সামগ্রী:</span>
              <p>নির্দিষ্ট ওজনের চেয়ে বেশি মালামালে অতিরিক্ত কেজি প্রতি ফেয়ার প্রযোজ্য। তরল পদার্থ (১০০ মি.লি এর বেশি), ধারালো বস্তু, পাওয়ার ব্যাংক (চেক-ইন ব্যাগে) সম্পূর্ণ নিষিদ্ধ।</p>
            </div>
          </div>
        </div>
      </div>

      {/* 10. FAQ SECTION */}
      <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            প্রায়শই জিজ্ঞাসিত প্রশ্নাবলি
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'কত আগে টিকিট বুক করা উচিত?',
              a: 'আন্তর্জাতিক ফ্লাইটের টিকিট ভ্রমণের অন্তত ২০-৪৫ দিন পূর্বে বুকিং করলে সেরা মূল্যে পাওয়া যায়। শেষ মুহূর্তের বুকিংয়ে এয়ারলাইন্সের ভাড়া বহুলাংশে বেড়ে যায়।'
            },
            {
              q: 'টিকিট বাতিল করলে কি রিফান্ড পাওয়া যাবে?',
              a: 'জি! রিফান্ডেবল টিকিটের ক্ষেত্রে এয়ারলাইন্স ও প্ল্যাটফর্ম ক্যানসেলেশন ফি কেটে অবশিষ্ট অর্থ ব্যাংক একাউন্টে ফেরত দেওয়া হয়। নন-রিফান্ডেবল টিকিটে রিফান্ড প্রযোজ্য নয়।'
            },
            {
              q: 'টিকিটের তারিখ পরিবর্তন করা যাবে?',
              a: 'জি, এয়ারলাইন্সের নীতিমালা অনুযায়ী নির্ধারিত পেনাল্টি চার্জ ও নতুন ফেয়ারের পার্থক্য প্রদান করে ফ্লাইটের তারিখ পরিবর্তন (Reschedule) সম্ভব।'
            },
            {
              q: 'আন্তর্জাতিক ভ্রমণের জন্য কত ঘণ্টা আগে বিমানবন্দরে যেতে হবে?',
              a: 'আন্তর্জাতিক ফ্লাইটের জন্য বিমানবন্দর টার্মিনালে অন্তত ৪ ঘণ্টা পূর্বে এবং অভ্যন্তরীণ (Domestic) ফ্লাইটের জন্য ২ ঘণ্টা পূর্বে উপস্থিতি আবশ্যক।'
            },
            {
              q: 'শিশুর টিকিটের নিয়ম কী?',
              a: '২ বছরের কম বয়সী শিশুদের (Infant) টিকিট চার্জ অত্যন্ত নগণ্য (১০% ফেয়ার)। ২-১১ বছর বয়সীদের (Child) জন্য আসনসহ ৭৫% থেকে ৮০% ডিসকাউন্টেড চাইল্ড ফেয়ার প্রযোজ্য।'
            }
          ].map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-xs sm:text-sm text-gray-900 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaqIndex === idx && (
                <div className="p-4 pt-0 text-xs text-gray-600 border-t border-gray-100 bg-gray-50/50 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 11. SEO LANDING PAGE QUICK CHIPS */}
      <div className="space-y-3 pt-4 border-t">
        <span className="text-xs font-bold text-gray-500 block text-center">
          জনপ্রিয় রুট ও সার্ভিস অনুসন্ধান:
        </span>
        <div className="flex justify-center flex-wrap gap-2 text-[11px]">
          {[
            'Cheap Air Ticket from Bangladesh',
            'Dubai Air Ticket',
            'Saudi Arabia Air Ticket',
            'Malaysia Air Ticket',
            'Singapore Air Ticket',
            'Thailand Air Ticket',
            'UK Air Ticket',
            'Canada Air Ticket',
            'One Way Air Ticket',
            'Round Trip Air Ticket',
            'Group Flight Booking',
            'Corporate Flight Booking'
          ].map((chip, idx) => (
            <span
              key={idx}
              onClick={() => onOpenBookingModal(`খোঁজ: ${chip}`)}
              className="bg-white border border-gray-200 hover:border-red-400 text-gray-700 hover:text-[#DC2626] px-3 py-1 rounded-full cursor-pointer transition-colors shadow-2xs"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* 12. CALL TO ACTION BANNER */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
        <h2 className="text-2xl sm:text-4xl font-black font-sans text-white">
          আজই আপনার ফ্লাইট বুক করুন
        </h2>
        <p className="text-sm sm:text-base text-red-100 max-w-xl mx-auto font-medium">
          ✈️ বিশ্বের যেকোনো গন্তব্যে সবচেয়ে নিরাপদ, বিশ্বস্ত এবং স্বাচ্ছন্দ্যময় এয়ার টিকিট বুকিং সেবা।
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold">
          <a
            href="tel:+8801771304219"
            className="px-6 py-3.5 bg-white text-gray-900 hover:bg-gray-100 rounded-xl shadow-lg flex items-center space-x-2 transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-[#DC2626]" />
            <span>📞 +880 1771-304219</span>
          </a>

          <a
            href="mailto:dreamsflyinternational@gmail.com"
            className="px-6 py-3.5 bg-black/30 text-white hover:bg-black/50 border border-white/20 rounded-xl shadow-lg flex items-center space-x-2 transition-colors"
          >
            <FileText className="w-4 h-4 text-amber-300" />
            <span>📧 dreamsflyinternational@gmail.com</span>
          </a>

          <button
            onClick={() => onOpenBookingModal('ফ্লাইট বুকিং')}
            className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold rounded-xl shadow-lg flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <CheckSquare className="w-4 h-4" />
            <span>Book Flight Now</span>
          </button>
        </div>
      </div>

      {/* FARE ALERT MODAL */}
      {showFareAlertModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-base font-black text-gray-900 flex items-center space-x-2">
                <BellRing className="w-5 h-5 text-[#DC2626]" />
                <span>Fare Alert নোটিফিকেশন সেট করুন</span>
              </h3>
              <button
                onClick={() => setShowFareAlertModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            {fareAlertSuccess ? (
              <div className="p-6 bg-emerald-50 text-emerald-800 text-center rounded-2xl space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm">অভিনন্দন! Fare Alert সক্রিয় হয়েছে</h4>
                <p className="text-xs">
                  এই রুটের ভাড়া কমলে আমরা আপনাকে ইমেইল ও হোয়াটসঅ্যাপে তাৎক্ষণিক বার্তা পাঠাবো।
                </p>
              </div>
            ) : (
              <form onSubmit={handleFareAlertSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">উৎপত্তি (Origin):</label>
                  <input
                    type="text"
                    value={fareAlertRoute.origin}
                    onChange={(e) => setFareAlertRoute({ ...fareAlertRoute, origin: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">গন্তব্য (Destination):</label>
                  <input
                    type="text"
                    value={fareAlertRoute.destination}
                    onChange={(e) => setFareAlertRoute({ ...fareAlertRoute, destination: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">ইমেইল ঠিকানা:</label>
                  <input
                    type="email"
                    value={fareAlertRoute.email}
                    onChange={(e) => setFareAlertRoute({ ...fareAlertRoute, email: e.target.value })}
                    placeholder="example@gmail.com"
                    className="w-full p-2.5 border rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">হোয়াটসঅ্যাপ নম্বর:</label>
                  <input
                    type="tel"
                    value={fareAlertRoute.phone}
                    onChange={(e) => setFareAlertRoute({ ...fareAlertRoute, phone: e.target.value })}
                    placeholder="+88017..."
                    className="w-full p-2.5 border rounded-xl"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-bold rounded-xl shadow cursor-pointer transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-base font-black text-gray-900 flex items-center space-x-2">
                <Users className="w-5 h-5 text-[#DC2626]" />
                <span>Group Flight Booking Request (১০+ জন)</span>
              </h3>
              <button
                onClick={() => setShowGroupBookingModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            {groupSubmitted ? (
              <div className="p-6 bg-emerald-50 text-emerald-800 text-center rounded-2xl space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm">গ্রুপ বুকিং রিকোয়েস্ট সফলভাবে জমা হয়েছে!</h4>
                <p className="text-xs">
                  আমাদের গ্রুপ ডেস্ক অফিসার আপনার সাথে শীঘ্রই স্পেশাল রেট নিয়ে যোগাযোগ করবেন।
                </p>
              </div>
            ) : (
              <form onSubmit={handleGroupSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">নাম:</label>
                    <input
                      type="text"
                      value={groupForm.name}
                      onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })}
                      className="w-full p-2.5 border rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">ফোন নম্বর:</label>
                    <input
                      type="tel"
                      value={groupForm.phone}
                      onChange={(e) => setGroupForm({ ...groupForm, phone: e.target.value })}
                      className="w-full p-2.5 border rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">যাত্রীর সংখ্যা (১০+):</label>
                    <input
                      type="number"
                      min="10"
                      value={groupForm.passengers}
                      onChange={(e) => setGroupForm({ ...groupForm, passengers: Number(e.target.value) })}
                      className="w-full p-2.5 border rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">ভ্রমণের সম্ভাব্য তারিখ:</label>
                    <input
                      type="date"
                      value={groupForm.travelDate}
                      onChange={(e) => setGroupForm({ ...groupForm, travelDate: e.target.value })}
                      className="w-full p-2.5 border rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">{"রুট (From -> To):"}</label>
                  <input
                    type="text"
                    value={`${groupForm.origin} -> ${groupForm.destination}`}
                    onChange={(e) => setGroupForm({ ...groupForm, destination: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-bold rounded-xl shadow cursor-pointer transition-colors"
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
