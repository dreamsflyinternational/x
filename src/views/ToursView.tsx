import React, { useState, useEffect } from 'react';
import { PriceNotice } from '../components/PriceNotice';
import {
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  PhoneCall,
  MessageCircle,
  Download,
  Calculator,
  ArrowRight,
  Star,
  Hotel,
  Plane,
  ShieldCheck,
  Award,
  HelpCircle,
  ChevronDown,
  Layers,
  Heart,
  Briefcase,
  Building,
  GraduationCap,
  Percent,
  CheckSquare,
  Upload,
  Info,
  ChevronRight,
  Zap,
  Globe,
  Tag,
  Share2,
  Compass,
  FileText
} from 'lucide-react';

import { navigateToPath } from '../lib/router';

interface ToursViewProps {
  currency?: 'BDT' | 'USD';
  onOpenBookingModal: (serviceType?: string) => void;
  initialTourId?: string;
}

interface TourPackage {
  id: string;
  title: string;
  titleBn: string;
  category: 'domestic' | 'international' | 'religious' | 'honeymoon' | 'family' | 'corporate';
  country: string;
  duration: string;
  priceBDT: number;
  priceUSD: number;
  popular?: boolean;
  image: string;
  totalSeats: number;
  bookedSeats: number;
  nextDeparture: string;
  highlights: string[];
  overview: string;
  includes: string[];
  excludes: string[];
  hotelInfo: {
    name: string;
    stars: number;
    location: string;
  };
  flightInfo: {
    airline: string;
    departure: string;
    baggage: string;
    meal: string;
  };
  pricing: {
    economy: number;
    standard: number;
    premium: number;
  };
  itinerary: {
    day: number;
    title: string;
    details: string;
  }[];
  gallery: string[];
}

export const ToursView: React.FC<ToursViewProps> = ({
  currency = 'BDT',
  onOpenBookingModal,
  initialTourId
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPackageDetail, setSelectedPackageDetail] = useState<TourPackage | null>(null);

  const handleSelectTourPackage = (pkg: TourPackage) => {
    setSelectedPackageDetail(pkg);
    navigateToPath(`/tour/${pkg.id}`);
  };

  const handleCloseTourPackage = () => {
    setSelectedPackageDetail(null);
    navigateToPath('/tours');
  };
  const [comparisonPackages, setComparisonPackages] = useState<TourPackage[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);
  const [showCustomTourModal, setShowCustomTourModal] = useState<boolean>(false);
  const [showCalcModal, setShowCalcModal] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Calculator State
  const [calcDestination, setCalcDestination] = useState<string>('thailand');
  const [calcTravelers, setCalcTravelers] = useState<number>(2);
  const [calcHotelStar, setCalcHotelStar] = useState<number>(4);
  const [calcIncludeFlight, setCalcIncludeFlight] = useState<boolean>(true);

  // Custom Tour Request Form State
  const [customForm, setCustomForm] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
    travelDate: '',
    travelers: 2,
    budget: '',
    hotelType: '4-star',
    message: ''
  });
  const [customFormSubmitted, setCustomFormSubmitted] = useState(false);

  // Direct Booking Form State inside Detail Modal
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    travelDate: '',
    travelers: 2,
    message: ''
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Countdown timer simulation for next tour departure
  const [countdown, setCountdown] = useState({ days: 12, hours: 8, mins: 42, secs: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsApp = (pkgTitle?: string) => {
    const text = encodeURIComponent(
      pkgTitle
        ? `আসসালামু আলাইকুম, আমি ড্রিমস ফ্লাই থেকে ${pkgTitle} প্যাকেজ সম্পর্কে বুকিং ও তথ্য জানতে চাই।`
        : `আসসালামু আলাইকুম, আমি ড্রিমস ফ্লাই ইন্টারন্যাশনাল ট্যুর প্যাকেজ সম্পর্কে পরামর্শ পেতে চাই।`
    );
    window.open(`https://wa.me/8801771304219?text=${text}`, '_blank');
  };

  const tourCategoriesList = [
    { id: 'all', title: 'সব ট্যুর', icon: Compass },
    {
      id: 'domestic',
      title: '🇧🇩 Domestic Tour',
      subtext: "Cox's Bazar, Saint Martin, Sajek, Bandarban, Rangamati, Sylhet, Sundarbans, Kuakata",
      icon: MapPin
    },
    {
      id: 'international',
      title: '🌏 International Tour',
      subtext: 'Thailand, Malaysia, Singapore, Bali, Dubai, Saudi Arabia, Turkey, Maldives, Nepal, India',
      icon: Globe
    },
    {
      id: 'religious',
      title: '🕋 Religious Tour',
      subtext: 'Umrah, Hajj, Islamic Historical Tour',
      icon: Sparkles
    },
    {
      id: 'honeymoon',
      title: '❤️ Honeymoon Package',
      subtext: 'Maldives, Bali, Thailand, Kashmir',
      icon: Heart
    },
    {
      id: 'family',
      title: '👨‍👩‍👧 Family Tour',
      subtext: 'Family Friendly Resorts, Kids Activities, Private Transport',
      icon: Users
    },
    {
      id: 'corporate',
      title: '🏢 Corporate Tour',
      subtext: 'Office Trip, Incentive Tour, Team Building',
      icon: Briefcase
    }
  ];

  const packagesData: TourPackage[] = [
    // INTERNATIONAL PACKAGES
    {
      id: 'thailand-5d4n',
      title: 'Thailand Highlights & Beach Tour',
      titleBn: '🇹🇭 থাইল্যান্ড স্পেশাল ট্যুর (ব্যাংকক ও পাতায়া)',
      category: 'international',
      country: 'Thailand',
      duration: '৫ দিন / ৪ রাত',
      priceBDT: 49990,
      priceUSD: 425,
      popular: true,
      totalSeats: 12,
      bookedSeats: 8,
      nextDeparture: '১০ অক্টোবর ২০২৬',
      image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'ব্যাংকক সিটি ও বুদ্ধিস্ট মন্দির দর্শন',
        'পাতায়া কোরাল আইল্যান্ড স্পিডবোট রাইড',
        'বিলাসবহুল ৪-স্টার হোটেল অবস্থান',
        'এয়ারপোর্ট প্রাইভেট পিকআপ ও ড্রপ',
        'অভিজ্ঞ গাইড ও রিফ্রেশমেন্ট'
      ],
      overview: 'থাইল্যান্ডের প্রাণবন্ত শহর ব্যাংকক এবং প্রাকৃতিক সুন্দর সৈকত শহর পাতায়ার যৌথ অ্যাডভেঞ্চার ও রিল্যাক্সেশন প্যাকেজ। এতে থাকছে বিলাসবহুল ৪-স্টার হোটেল, প্রাইভেট কারে যাতায়াত এবং সম্পূর্ণ গাইডেন্স।',
      includes: [
        '৪-স্টার হোটেল একোমডেশন (ব্যাংকক ও পাতায়া)',
        'প্রতিদিনের বুফে প্রাতরাশ (Breakfast)',
        'এয়ারপোর্ট প্রাইভেট ট্রান্সফার (Pickup & Drop)',
        'কোরাল আইল্যান্ড লাঞ্চসহ ফুল-ডে ট্যুর',
        'অভিজ্ঞ স্থানীয় বাংলা/ইংরেজি ট্যুর গাইড',
        'সাইটসিয়িং ও এন্ট্রি টিকিট',
        'ভিসা প্রসেসিং অ্যাসিস্ট্যান্স'
      ],
      excludes: [
        'ব্যক্তিগত খরচ ও কেনাকাটা',
        'দুপুরের ও রাতের খাবার (নির্দিষ্ট মেন্যু বাদে)',
        'এয়ার ফার বা এয়ার টিকিট (অপশনাল অ্যাড-অন)',
        'ব্যক্তিগত টিপস ও ড্রাইভার বকশিস'
      ],
      hotelInfo: {
        name: 'The Seasons Bangkok & Grand Palace Pattaya',
        stars: 4,
        location: 'Pratunam, Bangkok & Central Pattaya Beach'
      },
      flightInfo: {
        airline: 'Thai Airways / US-Bangla Airlines',
        departure: 'DAC 10:30 AM -> BKK 02:00 PM',
        baggage: '৩০ কেজি চেক-ইন + ৭ কেজি হ্যান্ড লাগেজ',
        meal: 'হট ইন-ফ্লাইট মিল অন্তর্ভুক্ত'
      },
      pricing: {
        economy: 49990,
        standard: 65000,
        premium: 89000
      },
      itinerary: [
        { day: 1, title: 'Arrival & Pattaya Transfer', details: 'সুবর্ণভূমি এয়ারপোর্টে স্বাগতম। প্রাইভেট এসি গাড়িতে পাতায়ায় ট্রান্সফার ও হোটেল চেক-ইন। সন্ধ্যায় সৈকতে অবসর।' },
        { day: 2, title: 'Coral Island Speedboat Tour', details: 'সকালে সুস্বাদু প্রাতরাশ শেষে কোরাল আইল্যান্ডে স্পিডবোট সাফারি ও ওয়াটার স্পোর্টস। দ্বীপে স্পেশাল লাঞ্চ।' },
        { day: 3, title: 'Transfer to Bangkok & City Tour', details: 'ব্যাংককে ফিরে হোটেল চেক-ইন। গোল্ডেন বুদ্ধ মন্দির ও মার্বেল টেম্পল দর্শন। প্রতুল মার্কেট শপিং।' },
        { day: 4, title: 'Safari World & Free Evening', details: 'সাফারি ওয়ার্ল্ড ও মেরিন পার্কের চমকপ্রদ শো উপভোগ। সন্ধ্যায় শপিং মল ও ক্যাফে এক্সপ্লোর।' },
        { day: 5, title: 'Departure to Dhaka', details: 'হোটেল চেক-আউট শেষে সুবর্ণভূমি এয়ারপোর্টে ড্রপ এবং ঢাকার উদ্দেশ্যে শুভ যাত্রা।' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'malaysia-4d3n',
      title: 'Truly Asia Malaysia Explorer',
      titleBn: '🇲🇾 মালয়েশিয়া ট্রুলি এশিয়া ট্যুর (কুয়ালালামপুর ও জেন্টিং)',
      category: 'international',
      country: 'Malaysia',
      duration: '৪ দিন / ৩ রাত',
      priceBDT: 55000,
      priceUSD: 470,
      popular: false,
      totalSeats: 15,
      bookedSeats: 10,
      nextDeparture: '১৫ অক্টোবর ২০২৬',
      image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'পেট্রোনাস টুইন টাওয়ারস ও কেএলসিসি পার্ক',
        'বাতু কেভস রামায়ণ মন্দির ও ক্যাবল কার রাইড',
        'জেন্টিন হাইল্যান্ডস থিম পার্ক ও ক্যাসিনো ভিউ',
        'রিটার্ন এয়ার টিকিটসহ সম্পূর্ণ প্যাকেজ',
        'ই-ভিসা প্রসেসিং সাপোর্ট'
      ],
      overview: 'মালয়েশিয়ার রাজধানী কুয়ালালামপুরের আধুনিক স্কাইস্ক্রেপার এবং প্রাকৃতিক জেন্টিং হাইল্যান্ডসের অসাধারণ ভ্রমণ অভিজ্ঞতা। ফ্লাইটের টিকিট ও হোটেল বাসস্থানসহ ঝামেলামুক্ত ট্যুর।',
      includes: [
        'রিটার্ন ফ্লাইট টিকিট (ঢাকা-কেএল-ঢাকা)',
        '৩-স্টার/৪-স্টার সিটি সেন্টার হোটেল',
        'প্রতিদিন প্রাতরাশ',
        'এয়ারপোর্ট পিকআপ ও ড্রপ',
        'কেএল সিটি ট্যুর ও বাতু কেভস ভিজিট',
        'জেন্টিন হাইল্যান্ডস ক্যাবল কার টিকিট',
        'মালয়েশিয়া ই-ভিসা সার্ভিস'
      ],
      excludes: [
        'ব্যক্তিগত শপিং ও খাবার',
        'ট্যুরিজম ট্যাক্স (হোটেল সরাসরি প্রদান্য)',
        'ঐচ্ছিক রাইড বা থিম পার্ক টিকিট'
      ],
      hotelInfo: {
        name: 'Hotel Royale Chulan Bukit Bintang',
        stars: 4,
        location: 'Bukit Bintang, Kuala Lumpur'
      },
      flightInfo: {
        airline: 'Biman Bangladesh / AirAsia',
        departure: 'DAC 11:15 PM -> KUL 05:30 AM',
        baggage: '২৫ কেজি চেক-ইন + ৭ কেজি ক্যারি-অন',
        meal: 'হট মিলস অন্তর্ভুক্ত'
      },
      pricing: {
        economy: 55000,
        standard: 68000,
        premium: 92000
      },
      itinerary: [
        { day: 1, title: 'Kuala Lumpur Arrival', details: 'কেএলআইএ এয়ারপোর্টে অবতরণ। হোটেলে আর্লি চেক-ইন ও বিশ্রাম। বিকেলে বুকিত বিন্তাং নাইট মার্কেট।' },
        { day: 2, title: 'Batu Caves & Genting Highlands', details: 'বাতু কেভসের ঐতিহাসিক সিঁড়ি দর্শন। ক্যাবল কারে চড়ে সমুদ্রপৃষ্ঠ থেকে ৬০০০ ফুট উঁচুতে জেন্টিং হাইল্যান্ডসে দিনব্যাপী ট্রিপ।' },
        { day: 3, title: 'Kuala Lumpur City Sightseeing', details: 'টুইন টাওয়ার, কিংস প্যালেস, ন্যাশনাল মস্ক ও চায়না টাউন শপিং।' },
        { day: 4, title: 'Shopping & Flight Back', details: 'সকালে স্মারক কেনাকাটা ও বিকেলে এয়ারপোর্টে ট্রান্সফার নিয়ে ঢাকায় প্রত্যাবর্তন।' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'dubai-5d4n',
      title: 'Luxury Dubai & Desert Safari',
      titleBn: '🇦🇪 দুবাই লাক্সারি ও ডেজার্ট সাফারি ট্যুর',
      category: 'international',
      country: 'Dubai',
      duration: '৫ দিন / ৪ রাত',
      priceBDT: 75000,
      priceUSD: 640,
      popular: true,
      totalSeats: 10,
      bookedSeats: 7,
      nextDeparture: '২৫ অক্টোবর ২০২৬',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'বুর্জ খলিফা ১২৪/১২৫ ফ্লোর অবজারভেশন ডেক',
        '৪x৪ ল্যান্ড ক্রুজারে রেড ডিউন ডেজার্ট সাফারি',
        'বেলি ড্যান্স, তানোরা শো ও বিবিএকিউ ডিনার',
        'দুবাই মেরিনা ডাউ ক্রুজ প্রিমিয়াম বুফে ডিনার',
        'দুবাই ফ্রেম ও মিরাকেল গার্ডেন ট্যুর'
      ],
      overview: 'আধুনিকতার বিস্ময় দুবাই শহরের অনন্য অভিজ্ঞতা। মরুভূমির শ্বাসরুদ্ধকর ডেজার্ট সাফারি, বুর্জ খলিফা, মেরিনা ক্রুজ ডিনার এবং চোখ ধাঁধানো শপিং মলের সমন্বয়ে স্মরণীয় সফর।',
      includes: [
        'ইউএই প্রসেসড এক্সপ্রেস ভিসা',
        '৪-স্টার স্টারলিংক সিটি হোটেল',
        'প্রতিদিনের বুফে ব্রেকফাস্ট',
        'প্রাইভেট এয়ারপোর্ট ট্রান্সফার',
        '৪x৪ ডেজার্ট সাফারি উইথ বার্বিকিউ ডিনার',
        'মেরিনা ডাউ ক্রুজ উইথ ডিনার',
        'বুর্জ খলিফা এন্ট্রি টিকিট'
      ],
      excludes: [
        'দুবাই ট্যুরিজম ডিরহাম ফি',
        'ব্যক্তিগত কেনাকাটা',
        'আন্তর্জাতিক ফ্লাইট (অপশনাল যোগ করা যাবে)'
      ],
      hotelInfo: {
        name: 'Novotel Bur Dubai / Millennium Place',
        stars: 4,
        location: 'Bur Dubai & Al Barsha'
      },
      flightInfo: {
        airline: 'Emirates / FlyDubai',
        departure: 'DAC 07:45 PM -> DXB 11:15 PM',
        baggage: '৩০ কেজি লগেজ',
        meal: 'প্রিমিয়াম স্ন্যাক্স ও মিলস'
      },
      pricing: {
        economy: 75000,
        standard: 95000,
        premium: 135000
      },
      itinerary: [
        { day: 1, title: 'Arrival in Golden Dubai', details: 'দুবাই আন্তর্জাতিক এয়ারপোর্টে মারহাবা অভ্যর্থনা। প্রাইভেট ল্যান্ড ক্রুজারে হোটেলে স্থানান্তর ও আরাম।' },
        { day: 2, title: 'Dubai Modern City Tour & Burj Khalifa', details: 'দুবাই ফ্রেম, জুমেইরাহ বিচ, বুর্জ আল আরব ফটোরোম ও বিশ্বের সর্বোচ্চ ভবন বুর্জ খলিফার ১২৪ ফ্লোরে ট্রিপ।' },
        { day: 3, title: 'Desert Safari with BBQ Dinner', details: 'বিকেলে রোমাঞ্চকর ডেজার্ট সাফারি, সাণ্ড বোর্ডিং, উটের পিঠে চড়া এবং সন্ধ্যায় ডেজার্ট ক্যাম্প সাইটে লাইভ কালচারাল শো ও বিবিএকিউ ডিনার।' },
        { day: 4, title: 'Dhow Cruise & Shopping', details: 'দিনে গোল্ড সুক ও মিরাকেল গার্ডেন এক্সপ্লোর। সন্ধ্যায় মেরিনা ক্রুজে রোমান্টিক বুফে ডিনার।' },
        { day: 5, title: 'Airport Return', details: 'স্মৃতিময় দুবাই সফর শেষে ঢাকার ফ্লাইটে আরোহণ।' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'maldives-honeymoon-4d3n',
      title: 'Romantic Maldives Resort & Lagoon',
      titleBn: '❤️ মালদ্বীপ কাপল ও হানিমুন প্রিমিয়াম প্যাকেজ',
      category: 'honeymoon',
      country: 'Maldives',
      duration: '৪ দিন / ৩ রাত',
      priceBDT: 115000,
      priceUSD: 980,
      popular: true,
      totalSeats: 8,
      bookedSeats: 6,
      nextDeparture: '১৫ নভেম্বর ২০২৬',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'ওয়াটার ভিলা / প্রাইভেট সি-ভিউ আইল্যান্ড রিসোর্ট',
        'স্পিডবোট এয়ারপোর্ট ট্রান্সফার',
        'রোমান্টিক ক্যান্ডেললাইট বিচ ডিনার',
        'স্নোরকেলিং গিয়ার ও গাফ ফিশিং ট্রিপ',
        'হানিমুন কেক ও রুম ডেকোরেশন'
      ],
      overview: 'স্বচ্ছ নীল পানির স্বর্গরাজ্য মালদ্বীপে নবদম্পতি ও দম্পতিদের জন্য ড্রিম হানিমুন প্যাকেজ। রোমান্টিক ক্যান্ডেললাইট ক্যান্ডেল ডিনার, বিচে ওয়াটার স্পোর্টস ও প্রিমিয়াম ভিলা কেয়ার।',
      includes: [
        'অন-অ্যারাইভাল ভিসা অ্যাসিস্ট্যান্স',
        'বিলাসবহুল সি-ভিউ রিসোর্ট / ওয়াটার ভিলা',
        'হাফ-বোর্ড (প্রাতরাশ ও বুফে নৈশভোজ)',
        'স্পিডবোট রিটার্ন এয়ারপোর্ট ট্রান্সফার',
        'হানিমুন স্পেশাল কেক ও কাপল রুম ডেকোরেশন',
        'স্নোরকেলিং অ্যাডভেঞ্চার গিয়ার'
      ],
      excludes: [
        'ব্যক্তিগত বিমান টিকিট (আমরা সরাসরি যুক্ত করে দেব)',
        'স্পা ও পার্সোনাল ওয়েলনেস সার্ভিস'
      ],
      hotelInfo: {
        name: 'Sun Siyam Olhuveli / Adaaran Select Hudhuranfushi',
        stars: 5,
        location: 'South Male Atoll, Maldives'
      },
      flightInfo: {
        airline: 'US-Bangla / Maldivian / SriLankan',
        departure: 'DAC 12:45 PM -> MLE 04:15 PM',
        baggage: '৩০ কেজি চেক-ইন',
        meal: 'ইন্টারন্যাশনাল মিলস'
      },
      pricing: {
        economy: 115000,
        standard: 145000,
        premium: 195000
      },
      itinerary: [
        { day: 1, title: 'Male Airport Arrival & Speedboat Ride', details: 'মালে এয়ারপোর্টে পৌঁছামাত্র স্পিডবোটে নীল সাগরের ওপর দিয়ে প্রাইভেট রিসোর্ট দ্বীপে যাত্রা। রোমান্টিক ওয়েলকাম ড্রিন্কস।' },
        { day: 2, title: 'Snorkeling & Sunset Cruise', details: 'সকালে লগুন ওয়াটারে ক্যাজুয়াল সুইমিং ও স্নোরকেলিং। বিকেলে সানসেট ক্রুজে ডলফিন ওয়াচিং।' },
        { day: 3, title: 'Private Candlelight Beach Dinner', details: 'দিনে ওয়াটার স্পোর্টস ও রিসোর্ট অ্যামেনিটিজ উপভোগ। সন্ধ্যায় সাগরের তীরে ক্যান্ডেললাইট রোমান্টিক ডিনার।' },
        { day: 4, title: 'Farewell Maldives', details: 'প্রাতরাশ শেষে স্পিডবোটে এয়ারপোর্টে ফিরে ঢাকার উদ্দেশ্যে যাত্রা।' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'singapore-bali-7d6n',
      title: 'Singapore City & Bali Island Fantasy',
      titleBn: '🇸🇬 🇮🇩 সিঙ্গাপুর সিটি ও বালি আইল্যান্ড ডাবল ট্রিপ',
      category: 'international',
      country: 'Singapore & Bali',
      duration: '৭ দিন / ৬ রাত',
      priceBDT: 125000,
      priceUSD: 1060,
      popular: true,
      totalSeats: 12,
      bookedSeats: 9,
      nextDeparture: '১৮ নভেম্বর ২০২৬',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'ম্যারিনা বে স্যান্ডস স্কাইপার্ক ও মারলায়ন পার্ক',
        'সানতোসা আইল্যান্ড ক্যাবল কার রাইড & উইংস অব টাইম',
        'বালি উবুদ ফরেস্ট সুইং ও তানাহ লোত সমুদ্র মন্দির',
        'নুসা পেনিস্ডা ওয়াটার স্পোর্টস ও কেলিংকিং বিচ',
        '৪-স্টার লাক্সারি রিসোর্ট ও ৩ দেশ রিটার্ন ফ্লাইট'
      ],
      overview: 'দক্ষিণ-পূর্ব এশিয়ার আধুনিকতার প্রতীক সিঙ্গাপুর এবং প্রবাল দ্বীপ বালি-র জোড়া রোমাঞ্চকর ভ্রমণ। বিলাসবহুল রিসোর্ট, আইল্যান্ড ক্রুজ ও আকর্ষণীয় সাইটসিয়িং নিয়ে পূর্ণাঙ্গ প্যাকেজ।',
      includes: [
        'সিঙ্গাপুর ভিসা প্রসেসিং ও ইন্দোনেশিয়া অন-অ্যারাইভাল ভিসা',
        'ঢাকা-সিঙ্গাপুর-বালি-ঢাকা এয়ার টিকিট',
        '৪-স্টার হোটেল ও বালি সি-ভিউ প্রাইভেট রিসোর্ট',
        'প্রতিদিন সুস্বাদু প্রাতরাশ',
        'প্রাইভেট এসি ট্রান্সফার ও ফুল ডে উবুদ ট্যুর',
        'সানতোসা ক্যাবল কার ও এন্ট্রি টিকিট'
      ],
      excludes: [
        'ব্যক্তিগত কেনাকাটা',
        'ট্যুরিস্ট ট্যাক্স ও হোটেল ডিপোজিট'
      ],
      hotelInfo: {
        name: 'Hotel Boss Singapore & Grand Mirage Resort Bali',
        stars: 4,
        location: 'Victoria St, Singapore & Nusa Dua, Bali'
      },
      flightInfo: {
        airline: 'Singapore Airlines / Batik Air',
        departure: 'DAC 11:55 PM -> SIN 06:10 AM',
        baggage: '৩০ কেজি চেক-ইন + ৭ কেজি হ্যান্ড লাগেজ',
        meal: 'প্রিমিয়াম হট মিলস'
      },
      pricing: {
        economy: 125000,
        standard: 155000,
        premium: 198000
      },
      itinerary: [
        { day: 1, title: 'Singapore Arrival & Marina Bay', details: 'চাঙ্গি এয়ারপোর্টে অবতরণ। জুয়েল চাঙ্গি ওয়াটারফল দর্শন ও মারলায়ন পার্ক ফটোরোম।' },
        { day: 2, title: 'Sentosa Island & Cable Car', details: 'সানতোসা আইল্যান্ডে ট্রিপ, ক্যাবল কারে আকাশপথে ভ্রমণ ও সন্ধ্যায় লেজার লাইট শো।' },
        { day: 3, title: 'Flight to Bali & Beach Walk', details: 'বিমানে বালি গমন। ডেনপাসার এয়ারপোর্ট থেকে রিসোর্টে পিকআপ। কুটা বিচ নাইট লাইফ।' },
        { day: 4, title: 'Ubud Swing & Coffee Plantation', details: 'উবুদ রাইস টেরেস, জাঙ্গল সুইমিং সুইং ও ঐতিহ্যবাহী তানাহ লোত সূর্যাস্ত মন্দির।' },
        { day: 5, title: 'Nusa Penida Island Tour', details: 'স্পিডবোটে প্রবাল দ্বীপ নুসা পেনিস্ডায় গমন, কেলেংকিং টি-রেক্স বিচ ও স্নোরকেলিং।' },
        { day: 6, title: 'Spa & Souvenir Shopping', details: 'ঐতিহ্যবাহী বালি স্পা মাসাজ ও স্যুভেনির শপিং।' },
        { day: 7, title: 'Flight Back to Dhaka', details: 'মনে রাখার মতো মিষ্টি স্মৃতি নিয়ে ঢাকায় প্রত্যাবর্তন।' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'kashmir-6d5n',
      title: 'Kashmir Heaven on Earth & Gulmarg Snow',
      titleBn: '🇮🇳 কাশ্মীর স্বর্গরাজ্য, শ্রীনগর ডাললেক ও গুলমার্গ স্নো',
      category: 'international',
      country: 'India',
      duration: '৬ দিন / ৫ রাত',
      priceBDT: 62000,
      priceUSD: 520,
      popular: true,
      totalSeats: 16,
      bookedSeats: 12,
      nextDeparture: '২০ অক্টোবর ২০২৬',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'শ্রীনগর ডাললেকে রঙিন শিকারা রাইড',
        'ডাললেকের ওপর প্রিমিয়াম হাউজবোটে ১ রাত অবস্থান',
        'গুলমার্গ গন্ডোলা ক্যাবল কার রাইড (ফেজ ১ & ফেজ ২)',
        'পাহালগাম বেতাব ভ্যালি ও আরু ভ্যালি ট্যুর',
        'সোনামার্গের বরফাচ্ছন্ন শৃঙ্গ ও সিন্ধ নদী'
      ],
      overview: 'পৃথিবীর ভূস্বর্গ কাশ্মীর ভ্রমণের অনন্য অনুভূতি। ডাললেকে রঙিন শিকারায় চড়া, গুলমার্গের বরফ ঢাকা পাহাড়ে ক্যাবল কার রাইড এবং পাহালগামের মনোরম পাইন বনের ছায়ায় ছুটির আনন্দ।',
      includes: [
        'ইন্ডিয়ান ভিসা প্রসেসিং অ্যাসিস্ট্যান্স',
        'ঢাকা-কলকাতা-শ্রীনগর রিটার্ন ফ্লাইট টিকিট',
        'শ্রীনগরে প্রিমিয়াম হোটেল ও ১ রাত লাক্সারি হাউজবোট',
        'প্রতিদিনের বুফে প্রাতরাশ ও রাতের খাবার (Half Board)',
        'সকল সাইটসিয়িং এর জন্য নন-এসি/এসি প্রাইভট কার',
        'ডাললেকে ১ ঘণ্টার রোমান্টিক শিকারা রাইড'
      ],
      excludes: [
        'গুলমার্গ গন্ডোলা এন্ট্রি টিকেট ও ঘোড়া সওয়ারি ফি',
        'ব্যক্তিগত কেনাকাটা ও টিপস'
      ],
      hotelInfo: {
        name: 'Hotel Grand Mumtaz Srinagar & Luxury Houseboat',
        stars: 4,
        location: 'Dal Lake & Boulevard Road, Srinagar'
      },
      flightInfo: {
        airline: 'IndiGo / Air India',
        departure: 'DAC 08:15 AM -> SXR 02:45 PM',
        baggage: '২০ কেজি চেক-ইন + ৭ কেজি হ্যান্ড লাগেজ',
        meal: 'ইন-ফ্লাইট স্নেকস'
      },
      pricing: {
        economy: 62000,
        standard: 78000,
        premium: 98000
      },
      itinerary: [
        { day: 1, title: 'Arrival in Srinagar & Houseboat Check-in', details: 'শ্রীনগর বিমানবন্দরে অবতরণ। ডাললেকে হাউজবোটে শুভ আগমন। বিকেলে শিকারায় সুর্যাস্ত ভিউ।' },
        { day: 2, title: 'Srinagar to Gulmarg Snow Trip', details: 'বিশ্বের অন্যতম উঁচু গন্ডোলা ক্যাবল কারে বরফাচ্ছন্ন গুলমার্গ শৃঙ্গে আরোহণ। স্নো স্কেটিং।' },
        { day: 3, title: 'Pahalgam Valley Exploration', details: 'পাইন বনের দেশ পাহালগাম ভ্রমণ। বেতাব ভ্যালি ও লিডার রিভার ব্যাংক এক্সপ্লোর।' },
        { day: 4, title: 'Sonamarg Meadow of Gold', details: 'সিন্ধ নদীর পাশে বরফের উপত্যকা সোনামার্গে ভ্রমণ ও থাজিসিয়ার হিমবাহ দর্শন।' },
        { day: 5, title: 'Mughal Gardens & Local Shopping', details: 'শালিমার বাগ, নিশাত বাগ ও হযরতবাল দরগাহ দর্শন। কাশ্মীরি কেসর ও শাল শপিং।' },
        { day: 6, title: 'Srinagar Departure to Dhaka', details: 'মনোমুগ্ধকর অভিজ্ঞতা নিয়ে ঢাকার উদ্দেশ্যে রওনা।' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'nepal-5d4n',
      title: 'Nepal Kathmandu, Nagarkot & Pokhara Valley',
      titleBn: '🇳🇵 নেপাল কাঠমান্ডু, নাগোরকোট ও পোখরা লেক ভিউ',
      category: 'international',
      country: 'Nepal',
      duration: '৫ দিন / ৪ রাত',
      priceBDT: 42000,
      priceUSD: 355,
      popular: false,
      totalSeats: 15,
      bookedSeats: 8,
      nextDeparture: '২৫ অক্টোবর ২০২৬',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'পোখরা ফেওয়া লেকে রোমান্টিক বোট রাইড',
        'সারংকোট থেকে মাছাপুচ্ছ্রে ও অন্নপূর্ণা পর্বতমালার সূর্যোদয়',
        'নাগোরকোট পাহাড়ের চূড়ায় ১ রাত হিল রিসোর্ট স্টে',
        'কাঠমান্ডু পশুপতিনাথ ও স্বয়ম্ভূনাথ স্তুপা ভিজিট',
        'অন-অ্যারাইভাল ভিসা ও রিটার্ন ফ্লাইট সহ'
      ],
      overview: 'হিমালয়ের কোলঘেঁষা নেপালের শান্ত সবুজ উপত্যকা ও হ্রদের শহর পোখরা। নাগোরকোট থেকে হিমালয়ের বরফ শৃঙ্গে সূর্যোদয় দেখার অপরূপ অভিজ্ঞতা নিয়ে তৈরি বিশেষ প্যাকেজ।',
      includes: [
        'নেপাল ফ্রি অন-অ্যারাইভাল ভিসা গাইডেন্স',
        'ঢাকা-কাঠমান্ডু-ঢাকা বিমান টিকিট (Biman Nepal)',
        '৩-স্টার/৪-স্টার হোটেল ও নাগোরকোট হিল রিসোর্ট',
        'প্রতিদিন প্রাতরাশ (Breakfast)',
        'প্রাইভেট ট্রান্সপোর্টে কাঠমান্ডু-পোখরা যাতায়াত',
        'ফেওয়া লেকে বোটিং টিকিট'
      ],
      excludes: [
        'ঐচ্ছিক প্যারাগ্লাইডিং বা মাউন্টেন ফ্লাইট ফি',
        'ব্যক্তিগত খরচ'
      ],
      hotelInfo: {
        name: 'Hotel Landmark Pokhara & Nagarkot Fort Resort',
        stars: 3,
        location: 'Lakeside Pokhara & Nagarkot Hilltop'
      },
      flightInfo: {
        airline: 'Biman Bangladesh Airlines / Himalaya Airlines',
        departure: 'DAC 01:30 PM -> KTM 03:00 PM',
        baggage: '৩০ কেজি লগেজ',
        meal: 'হট মিলস'
      },
      pricing: {
        economy: 42000,
        standard: 54000,
        premium: 72000
      },
      itinerary: [
        { day: 1, title: 'Arrival Kathmandu & Nagarkot Transfer', details: 'ত্রিশূলী নদী ঘেঁষে নাগোরকোট পর্বতে হোটেল চেক-ইন। সন্ধ্যায় পর্বতমালায় সূর্যাস্ত ভিউ।' },
        { day: 2, title: 'Nagarkot Sunrise & Drive to Pokhara', details: 'সকালে মাউন্ট এভারেস্ট ও হিমালয় শৃঙ্গে সূর্যোদয়। সুন্দর পাহাড়ি পথ দিয়ে পোখরায় যাত্রা।' },
        { day: 3, title: 'Sarangkot Sunrise & Pokhara Sightseeing', details: 'সারংকোট থেকে অন্নপূর্ণা রেঞ্জে সূর্যোদয়। ডেভিস ফলস, গুপ্তেশ্বর গুহা ও ফেওয়া লেকে বোটিং।' },
        { day: 4, title: 'Drive to Kathmandu & Thamel Walk', details: 'কাঠমান্ডুতে প্রত্যাবর্তন। থামেল ট্যুরিস্ট এরিয়াতে নৈশ শপিং ও ক্যাফে ভিউ।' },
        { day: 5, title: 'Pashupatinath Temple & Flight Back', details: 'ঐতিহাসিক মন্দির দর্শন শেষে এয়ারপোর্টে ড্রপ।' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'vietnam-5d4n',
      title: 'Vietnam Hanoi & Ha Long Bay Cruise',
      titleBn: '🇻🇳 ভিয়েতনাম হা লং বে ক্রুজ ও হ্যানয় শহর',
      category: 'international',
      country: 'Vietnam',
      duration: '৫ দিন / ৪ রাত',
      priceBDT: 68000,
      priceUSD: 575,
      popular: true,
      totalSeats: 12,
      bookedSeats: 10,
      nextDeparture: '০৮ নভেম্বর ২০২৬',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'ইউনেস্কো হেরিটেজ হা লং বে-তে ওভারনাইট লাক্সারি ক্রুজ',
        'হা লং বে-তে কায়াকিং ও সানসেট পার্টি',
        'হ্যানয় ওল্ড কোয়ার্টার ও হোয়ান কিম লেক ট্যুর',
        'হ্যানয় নাইট ফুড ট্যুর ও এগ কফি টেস্ট',
        'ভিয়েতনাম ই-ভিসা এপ্রুভাল লেটার অন্তর্ভুক্ত'
      ],
      overview: 'ভিয়েতনামের প্রাকৃতির অনন্য নিদর্শন হা লং বে-এর পান্না রঙের পানি ও চুনাপাথরের দ্বীপের মাঝে রাতে লাক্সারি ক্রুজে থাকার রাজকীয় অনুভূতি। সাথে ঐতিহাসিক হ্যানয় শহর ভ্রমণ।',
      includes: [
        'ভিয়েতনামী ই-ভিসা প্রসেসিং',
        'ঢাকা-হ্যানয়-ঢাকা রিটার্ন ফ্লাইট টিকিট',
        '৪-স্টার হ্যানয় হোটেল ও ১ রাত লাক্সারি ৪-স্টার হা লং বে ক্রুজ',
        'ক্রুজে ৪ বেলা আন্তর্জাতিক ও ভিয়েতনামি বুফে মিলস',
        'কায়াকিং, কেভ এক্সপ্লোরেশন ও স্কুইড ফিশিং গিয়ার',
        'প্রাইভেট এয়ারপোর্ট ও ইন্টার-সিটি বাস ট্রান্সফার'
      ],
      excludes: [
        'ব্যক্তিগত খরচ ও ড্রিংকস',
        'টিপস ও ড্রাইভার সার্ভিস ফি'
      ],
      hotelInfo: {
        name: 'Solaria Hanoi Hotel & Syrena Cruise Ha Long',
        stars: 4,
        location: 'Old Quarter Hanoi & Ha Long Bay'
      },
      flightInfo: {
        airline: 'Vietnam Airlines / AirAsia',
        departure: 'DAC 11:30 PM -> HAN 06:10 AM',
        baggage: '২০ কেজি বুকিং লগেজ',
        meal: 'হট মিলস'
      },
      pricing: {
        economy: 68000,
        standard: 84000,
        premium: 112000
      },
      itinerary: [
        { day: 1, title: 'Arrival Hanoi & City Walk', details: 'হ্যানয় নোই বাই এয়ারপোর্টে রিসিভ। হোটেলে চেক-ইন। ওল্ড কোয়ার্টারে বিখ্যাত এগ কফি ও ফুড ট্যুর।' },
        { day: 2, title: 'Boarding Ha Long Bay Cruise', details: 'হা লং বে বন্দরে আগমন। ৪-স্টার লাক্সারি ক্রুজে বোর্ডিং। চুনাপাথরের হাজারো দ্বীপের মাঝে ক্রুজ ও মধ্যাহ্নভোজ।' },
        { day: 3, title: 'Sung Sot Cave & Return Hanoi', details: 'সকালে ক্রুজের ছাদে তাই-চি ব্যায়াম ও প্রাতরাশ। বিশাল সুং সত গুহা পরিভ্রমণ শেষে হ্যানয়ে প্রত্যাবর্তন।' },
        { day: 4, title: 'Tran Quoc Pagoda & St Joseph Cathedral', details: 'হ্যানয়ের প্রাচীন পগোডা ও ঐতিহাসিক ক্যাথেড্রাল ভিজিট। ফরাসী স্থাপত্য এক্সপ্লোর।' },
        { day: 5, title: 'Shopping & Flight back to Dhaka', details: 'স্থানীয় মার্কেটে স্মারক শপিং শেষে এয়ারপোর্টে স্থানান্তর।' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'sri-lanka-5d4n',
      title: 'Sri Lanka Hill Country & Beach Getaway',
      titleBn: '🇱🇰 শ্রীলঙ্কা নুওয়ারা এলিয়া, ক্যান্ডি ও কলম্বো ট্যুর',
      category: 'international',
      country: 'Sri Lanka',
      duration: '৫ দিন / ৪ রাত',
      priceBDT: 58000,
      priceUSD: 490,
      popular: false,
      totalSeats: 14,
      bookedSeats: 9,
      nextDeparture: '১২ নভেম্বর ২০২৬',
      image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'পিন্নাওয়ালা হাতি এতিমখানা (Pinnawala Elephant Orphanage)',
        'ক্যান্ডি টু নুওয়ারা এলিয়া বিখ্যাত পাহাড়ি ট্রেন জার্নি',
        'সিলন চা বাগান ও ক্যাস্কেডিং ঝর্ণা ট্রিপ',
        'বেনতোতা বিচে স্পিডবোট ও ওয়াটার স্পোর্টস',
        'কলম্বো লোটাস টাওয়ার ও শপিং'
      ],
      overview: 'চা বাগানের সবুজ দেশ শ্রীলঙ্কার পাহাড়ি সৌন্দর্য ক্যান্ডি ও নুওয়ারা এলিয়া। পিন্নাওয়ালায় হস্তী শিবিরের মনোরম দৃশ্য এবং বেনতোতার প্রশান্ত মহাসাগরীয় সৈকত ট্রিপ।',
      includes: [
        'শ্রীলঙ্কা ইটিএ (ETA) ই-ভিসা প্রসেসিং',
        'ঢাকা-কলম্বো-ঢাকা সরাসরি এয়ার টিকিট (SriLankan Airlines)',
        '৪-স্টার লাক্সারি রিসোর্ট একোমডেশন',
        'প্রতিদিনের বুফে প্রাতরাশ',
        'প্রাইভেট এসি কার ও অল-ওয়ে গাইড',
        'পাহাড়ি ট্রেন জার্নি টিকিট'
      ],
      excludes: [
        'ব্যক্তিগত রাইড ও লাঞ্চ/ডিনার',
        'ঐচ্ছিক ওয়াটার স্পোর্টস ফি'
      ],
      hotelInfo: {
        name: 'The Grand Hotel Nuwara Eliya & Earls Regency Kandy',
        stars: 4,
        location: 'Kandy, Nuwara Eliya & Colombo'
      },
      flightInfo: {
        airline: 'SriLankan Airlines',
        departure: 'DAC 01:10 PM -> CMB 04:30 PM',
        baggage: '৩০ কেজি চেক-ইন',
        meal: 'প্রিমিয়াম ইন-ফ্লাইট মিল'
      },
      pricing: {
        economy: 58000,
        standard: 72000,
        premium: 95000
      },
      itinerary: [
        { day: 1, title: 'Arrival Colombo & Transfer to Kandy', details: 'কলম্বো বিমানবন্দরে স্বাগতম। পিন্নাওয়ালায় হাতিদের স্নান দৃশ্য দেখে ক্যান্ডি হোটেলে চেক-ইন।' },
        { day: 2, title: 'Kandy to Nuwara Eliya Scenic Train', details: 'শ্রীলঙ্কার ঐতিহ্যবাহী নীল পাহাড়ি ট্রেনে নুওয়ারা এলিয়া ভ্রমণ। চা বাগান ও ওয়াটারফল ভিজিট।' },
        { day: 3, title: 'Bentota Ocean Resort', details: 'নুওয়ারা এলিয়া থেকে সমুদ্র উপকূলবর্তী বেনতোতায় স্থানান্তর। সাগরে ওয়াটার স্পোর্টস।' },
        { day: 4, title: 'Colombo City & Lotus Tower', details: 'কলম্বো ক্যাপিটাল সিটি ট্যুর, লোটাস টাওয়ার ফটোরোম ও গাল ফেস গ্রিন শপিং।' },
        { day: 5, title: 'Departure to Dhaka', details: 'শ্রীলঙ্কান এয়ারলাইন্সের ফ্লাইটে ঢাকায় স্থানান্তর।' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80'
      ]
    },

    // DOMESTIC PACKAGES
    {
      id: 'coxs-bazar-3d2n',
      title: 'Coxs Bazar Beach Resort & Marine Drive',
      titleBn: '🇧🇩 কক্সবাজার লাক্সারি সি বিচ ও হিমছড়ি ট্যুর',
      category: 'domestic',
      country: 'Bangladesh',
      duration: '৩ দিন / ২ রাত',
      priceBDT: 9500,
      priceUSD: 80,
      popular: true,
      totalSeats: 25,
      bookedSeats: 18,
      nextDeparture: '০৫ অক্টোবর ২০২৬',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'বিশ্বের দীর্ঘতম সমুদ্র সৈকতে ৪-স্টার সি-ভিউ রিসোর্ট',
        'ইনানী বিচ ও মেরিন ড্রাইভ ওপেন জিপ ড্রাইভিং',
        'হিমছড়ি পাহাড় ও ঝর্ণা সাইটসিয়িং',
        'লাবণী ও সুগন্ধা বিচে সুর্যাস্ত ও লাইভ সি-ফুড ডিনার',
        'ঢাকা-কক্সবাজার নন-স্টপ এসি স্ক্যানিয়া বাস'
      ],
      overview: 'বিশ্বের দীর্ঘতম অবিচ্ছিন্ন বালুকাময় সমুদ্র সৈকত কক্সবাজারে প্রশান্তির ছুটি। ৪-স্টার সি-ভিউ হোটেলে থাকার আনন্দ, মেরিন ড্রাইভে খোলামেলা সফর এবং তাজা সি-ফুড টেস্ট।',
      includes: [
        'ঢাকা-কক্সবাজার-ঢাকা এসি স্ক্যানিয়া/হুন্দাই বাস টিকিট',
        '৪-স্টার সি-ভিউ হোটেল রয়াল টিউলিপ/সায়মন রিসোর্ট অবস্থান',
        'প্রতিদিনের বুফে প্রাতরাশ (Breakfast)',
        'ইনানী ও হিমছড়ি মেরিন ড্রাইভ প্রাইভট ট্রান্সপোর্ট',
        '১টি স্পেশাল সামুদ্রিক ফ্রাইড ফিশ ডিনার'
      ],
      excludes: [
        'ব্যক্তিগত কেনাকাটা',
        'প্যারাসেইলিং বা ওয়াটার বাইক রাইড'
      ],
      hotelInfo: {
        name: 'Ocean Paradise Hotel & Resort / Long Beach Hotel',
        stars: 4,
        location: 'Kolatoli Beach, Coxs Bazar'
      },
      flightInfo: {
        airline: 'AC Scania Bus Transfer / Optional Novoair Flight',
        departure: 'Dhaka 11:00 PM Departure',
        baggage: '২৫ কেজি বুকিং',
        meal: 'সুস্বাদু প্রাতরাশ'
      },
      pricing: {
        economy: 9500,
        standard: 13500,
        premium: 19500
      },
      itinerary: [
        { day: 1, title: 'Arrival & Beach Relaxation', details: 'সকালে কক্সবাজার পৌঁছে হোটেলে চেক-ইন। দুপুরে লাবণী বিচে গোসল। বিকেলে সূর্যাস্ত ও সুগন্ধা বিচ পয়েন্ট।' },
        { day: 2, title: 'Inani Beach & Marine Drive Tour', details: 'মেরিন ড্রাইভে খোলা জিপে ড্রাইভ। ইনানী বিচে প্রবাল পাথর দর্শন ও হিমছড়ি পাহাড়ে ট্র্যাকিং।' },
        { day: 3, title: 'Shopping & Return Journey', details: 'সকালে বার্মিজ মার্কেটে আচার ও ড্রাগ শপিং। রাতে ঢাকা ফেরত বাসে আরোহণ।' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'saint-martin-4d3n',
      title: 'Saint Martin Coral Island & Chera Dwip',
      titleBn: '🇧🇩 সেন্ট মার্টিন দ্বীপ ও ছেঁড়া দ্বীপ প্রবাল সাফারি',
      category: 'domestic',
      country: 'Bangladesh',
      duration: '৪ দিন / ৩ রাত',
      priceBDT: 11800,
      priceUSD: 100,
      popular: true,
      totalSeats: 20,
      bookedSeats: 16,
      nextDeparture: '১৫ নভেম্বর ২০২৬',
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'টেকনাফ থেকে কেয়ারী সিনদাবাদ / বে ওয়ান লাক্সারি শিপ ক্রুজ',
        'সেন্ট মার্টিন দ্বীপে সমুদ্রতীরে বিচ রিসোর্ট নাইট স্টে',
        'ছেঁড়া দ্বীপে স্পিডবোট রাইড ও ওয়াটার ওয়াচিং',
        'প্রবাল দ্বীপে তাজা ডাব ও রুপচাঁদা মাছের বার্বিকিউ পার্টি',
        'নক্ষত্রখচিত রাতে বিচে ক্যাম্পফায়ার ও মিউজিক'
      ],
      overview: 'বাংলাদেশের একমাত্র প্রবাল দ্বীপ সেন্ট মার্টিনের নীল জলরাশি ও নারকেল বীথি। আধুনিক ক্রুজ জাহাজে নাফ নদী পেরিয়ে দ্বীপে যাওয়া এবং ছেঁড়া দ্বীপের প্রবাল পাথরে রোমাঞ্চকর অ্যাডভেঞ্চার।',
      includes: [
        'ঢাকা-টেকনাফ-ঢাকা এসি বাস টিকিট',
        'টেকনাফ-সেন্টমার্টিন-টেকনাফ রিটার্ন শিপ ওপেন ডেক টিকিট',
        'সেন্টমার্টিন সি-ভিউ বিচ রিসোর্ট অবস্থান (২ রাত)',
        'সকল ব্রেকফাস্ট, লাঞ্চ ও সি-ফুড ডিনার',
        '১টি স্পেশাল বিচ বার্বিকিউ নাইট',
        'ছেঁড়া দ্বীপ বোট রাইড টিকিট'
      ],
      excludes: [
        'ব্যক্তিগত শপিং ও স্ন্যাক্স'
      ],
      hotelInfo: {
        name: 'Fantasy Kingdom Beach Resort & Blue Marine Saint Martin',
        stars: 3,
        location: 'West Beach, Saint Martin Island'
      },
      flightInfo: {
        airline: 'AC Hyundai Bus + Cruise Ship Transfer',
        departure: 'Dhaka 09:30 PM Departure',
        baggage: '২০ কেজি বুকিং',
        meal: 'দেশি ও সামুদ্রিক তাজা খাবার'
      },
      pricing: {
        economy: 11800,
        standard: 15500,
        premium: 21000
      },
      itinerary: [
        { day: 1, title: 'Dhaka to Teknaf & Ship Cruise', details: 'রাতে বাস যাত্রা। সকালে টেকনাফ জাহাজে উঠে নাফ নদী দিয়ে সেন্ট মার্টিন দ্বীপে প্রবেশ। রিসোর্টে চেক-ইন।' },
        { day: 2, title: 'Chera Dwip Coral Exploration', details: 'সকালে ভাটার সময় স্পিডবোটে ছেঁড়া দ্বীপে গমন। স্বচ্ছ পানিতে প্রবাল দর্শন। রাতে সৈকতে বার্বিকিউ ডিনার।' },
        { day: 3, title: 'West Beach Walk & Free Time', details: 'পশ্চিম সৈকতে ডাবের মিষ্টি পানি খাওয়া ও লাল কাঁকড়া পয়েন্টে ট্রিপ।' },
        { day: 4, title: 'Return Cruise to Dhaka', details: 'দুপুরে জাহাজে চড়ে টেকনাফে ফেরত আসা এবং বাসে ঢাকায় প্রত্যাবর্তন।' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'sajek-bandarban-4d3n',
      title: 'Sajek Valley & Bandarban Cloud Adventure',
      titleBn: '🇧🇩 সাজেক ভ্যালি ও বান্দরবান মেঘের রাজ্য ট্যুর',
      category: 'domestic',
      country: 'Bangladesh',
      duration: '৪ দিন / ৩ রাত',
      priceBDT: 14500,
      priceUSD: 125,
      popular: false,
      totalSeats: 20,
      bookedSeats: 14,
      nextDeparture: '১২ অক্টোবর ২০২৬',
      image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'সাজেক কংলাক পাহাড় ও কংলাক পাড়া এক্সপ্লোর',
        'হেলিপ্যাড সানসেট ও রুইলুই পাড়া নাইট ভিউ',
        'বান্দরবান নীলগিরি, নীলাচল ও শৈলপ্রপাত',
        'জিপ গাড়ি (চাঁদের গাড়ি) রিজার্ভ ট্রান্সপোর্ট',
        'পাহাড়ী রিসোর্টে অবস্থান ও বার্বিকিউ নাইট'
      ],
      overview: 'পাহাড়ের মেঘের ছোঁয়া পেতে বাংলাদেশ ট্যুরিজমের সেরা রুট সাজেক ও বান্দরবান। সংরক্ষিত চানঁদের গাড়িতে রোমাঞ্চকর পাহাড়ি আঁকাবাঁকা পথ ভ্রমণ ও কংলাক পাহাড়ের চূড়ায় সূর্যোদয় দর্শন।',
      includes: [
        'ঢাকা-খাগড়াছড়ি-ঢাকা এসি বাস টিকিট',
        'সাজেক ও বান্দরবান সংরক্ষিত চাঁদের গাড়ি',
        'সাজেক হিল রিসোর্ট ও বান্দরবান হোটেল অবস্থান',
        'সকল ব্রেকফাস্ট, লাঞ্চ ও ডিনার',
        'বার্বিকিউ নাইট ও ক্যাম্পফায়ার',
        'অভিজ্ঞ ট্রাভেল গাইড সার্ভিস'
      ],
      excludes: [
        'ব্যক্তিগত কেনাকাটা ও খাবার',
        'ব্যক্তিগত ক্যামেরা রাইড ফি'
      ],
      hotelInfo: {
        name: 'Sajek Resort & Resort Nilgiri',
        stars: 3,
        location: 'Ruilui Para, Sajek & Bandarban'
      },
      flightInfo: {
        airline: 'AC Scania Bus Transfer',
        departure: 'Dhaka 10:30 PM Departure',
        baggage: '২০ কেজি বুকিং',
        meal: 'দেশি সুস্বাদু ব্রেকফাস্ট'
      },
      pricing: {
        economy: 14500,
        standard: 18500,
        premium: 24000
      },
      itinerary: [
        { day: 1, title: 'Dhaka to Khagrachari & Sajek Valley', details: 'রাতে ঢাকা থেকে বাস যাত্রা। সকালে খাগড়াছড়ি পৌঁছে দীঘিনালা হয়ে সেনাবাহিনীর এস্কোর্টে সাজেক পৌঁছানো। বিকেলে কংলাক পাহাড়ে সূর্যাস্ত।' },
        { day: 2, title: 'Sajek Sunrise & Bandarban Transfer', details: 'সকালে সাজেকের হেলিপ্যাডে তুলোর মতো মেঘ দেখা। দুপুরে খাগড়াছড়ি হয়ে বান্দরবানে যাত্রা।' },
        { day: 3, title: 'Nilgiri & Nilachal Exploration', details: 'নীলগিরির মেঘের চূড়ায় ট্রিপ, নীলাচল ও শৈলপ্রপাত ঝর্ণার ঠাণ্ডা পানিতে স্নান।' },
        { day: 4, title: 'Return Journey to Dhaka', details: 'বান্দরবান শহরের গোল্ডেন টেম্পল দর্শন শেষে রাতে বাসে ঢাকার উদ্দেশ্যে রওনা।' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'sylhet-3d2n',
      title: 'Sylhet Ratargul, Jaflong & Bisnakandi',
      titleBn: '🇧🇩 সিলেট রাতারগুল, জাফলং ও শ্রীমঙ্গল ৩ দিন / ২ রাত',
      category: 'domestic',
      country: 'Bangladesh',
      duration: '৩ দিন / ২ রাত',
      priceBDT: 8500,
      priceUSD: 72,
      popular: false,
      totalSeats: 18,
      bookedSeats: 11,
      nextDeparture: '০৮ অক্টোবর ২০২৬',
      image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'রাতারগুল সোয়াম্প ফরেস্ট ডিঙ্গি নৌকা সাফারি',
        'জাফলং জিরো পয়েন্ট ও পিয়াইন নদী জলপ্রপাত',
        'বিছানাকান্দি স্বচ্ছ পানির ঝর্ণা ও পাহাড়ি নদী',
        'শ্রীমঙ্গল চা বাগান ও ঐতিহাসিক ৭ স্তরের চা',
        'শাহজালাল (রঃ) ও শাহপরান (রঃ) মাজার জিয়ারত'
      ],
      overview: 'সবুজ দুটি পাতা একটি কুঁড়ির দেশ সিলেটের প্রাকৃতিক বিস্ময়। জলমগ্ন বন রাতারগুল, জাফলংয়ের স্বচ্ছ পানি এবং শ্রীমঙ্গলের মাইলের পর মাইল বিস্তৃত চা বাগানের প্রশান্তিদায়ক ভ্রমণ।',
      includes: [
        'ঢাকা-সিলেট-ঢাকা এসি হাইচেয়ার বাস বা উপবন এক্সপ্রসেস ট্রেন',
        '৩-স্টার এসি হোটেল জিসান মেট্রো সিলেট স্টে (২ রাত)',
        'প্রতিদিনের বুফে প্রাতরাশ',
        'রাতারগুল ডিঙ্গি নৌকা ও বিছানাকান্দি ট্রাফলার ইঞ্জিন বোট',
        'মাইক্রোবাসে অল-ডে সাইটসিয়িং ট্রান্সপোর্ট'
      ],
      excludes: [
        'ব্যক্তিগত লাঞ্চ ও ডিনার (পছন্দ অনুযায়ী খাবারের স্বাধীনতা)'
      ],
      hotelInfo: {
        name: 'Grand Palace Hotel & Resort Sylhet',
        stars: 3,
        location: 'Zindabazar, Sylhet City'
      },
      flightInfo: {
        airline: 'AC Bus Transfer / Train',
        departure: 'Dhaka 11:30 PM Departure',
        baggage: '২০ কেজি বুকিং',
        meal: 'সিলেটি সুস্বাদু খাবার'
      },
      pricing: {
        economy: 8500,
        standard: 12000,
        premium: 16500
      },
      itinerary: [
        { day: 1, title: 'Ratargul Swamp Forest & Mazar Ziyarat', details: 'সকালে সিলেটে পৌঁছে হোটেলে ফ্রেশ হওয়া। ডিঙ্গি নৌকায় রাতারগুল জলমগ্ন বন ভ্রমণ। বিকেলে শাহজালাল (রঃ) মাজার।' },
        { day: 2, title: 'Jaflong & Bisnakandi Tour', details: 'জাফলং জিরো পয়েন্টে খাসিয়া পুঞ্জি ভিজিট। বিছানাকান্দিতে পাহাড়ি শীতল ঝর্ণার জলে স্নান।' },
        { day: 3, title: 'Sreemangal Tea Garden & Return', details: 'শ্রীমঙ্গলের লউয়াছড়া জাতীয় উদ্যান ও নীলকন্ঠ ৭ স্তরের চা খেয়ে রাতে ঢাকায় যাত্রা।' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'sundarbans-3d2n',
      title: 'Sundarbans Mangrove Forest & Cruise Safari',
      titleBn: '🇧🇩 সুন্দরবন ম্যানগ্রোভ বন ও লাক্সারি শিপ সাফারি',
      category: 'domestic',
      country: 'Bangladesh',
      duration: '৩ দিন / ২ রাত',
      priceBDT: 16500,
      priceUSD: 140,
      popular: true,
      totalSeats: 25,
      bookedSeats: 19,
      nextDeparture: '২২ অক্টোবর ২০২৬',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'মোংলা থেকে বিলাসবহুল ৩-তলা শীতাতপ নিয়ন্ত্রিত ট্যুরিস্ট ক্রুজ',
        'করমজল ওয়াচ টাওয়ার, হরিণ ও কুম্ভীর প্রজনন কেন্দ্র',
        'হারবাড়িয়া ম্যানগ্রোভ কাঠের ট্রেইল ও কটকা ওয়াচ টাওয়ার',
        'রয়্যাল বেঙ্গল টাইগার, হরিণ ও ডলফিন স্পটিং',
        'শিপের শেফ দ্বারা ৫ বেলা সুস্বাদু সামুদ্রিক ও দেশি বুফে ফুড'
      ],
      overview: 'বিশ্বের বৃহত্তম ম্যানগ্রোভ বন সুন্দরবনের গহীনে রোমাঞ্চকর সাফারি। নদীর বুক চিরে লাক্সারি ক্রুজ জাহাজে ভাসতে ভাসতে বন্যপ্রাণী ও রয়েল বেঙ্গল টাইগারের পদচিহ্ন খোঁজার অবিস্মরণীয় অভিজ্ঞতা।',
      includes: [
        'ঢাকা-মোংলা-ঢাকা এসি বাস ট্রান্সফার',
        'বিলাসবহুল ৩-তলা ট্যুর ক্রুজ কেবিন স্টে (২ রাত)',
        'বন বিভাগের অনুমতিপত্র ও সশস্ত্র গানম্যান নিরাপত্তা',
        'শিপের ক্যাটারিং দ্বারা প্রতিদিন ৩ বেলা বুফে ও ২ বেলা স্ন্যাক্স',
        'ছোট নৌকায় বনের সরু খালে নীরব ট্রিপ'
      ],
      excludes: [
        'ভিডিও ক্যামেরা স্পেশাল ভিডিও অনুমতি ফি (যদি থাকে)'
      ],
      hotelInfo: {
        name: 'MV Crown / MV Zabeel Tourist Luxury Ship',
        stars: 4,
        location: 'Sundarbans Forest Reserve'
      },
      flightInfo: {
        airline: 'AC Bus to Mongla + Cruise Ship',
        departure: 'Dhaka 10:00 PM Departure',
        baggage: '২০ কেজি বুকিং',
        meal: '৫ বেলা স্পেশাল বুফে ক্যাটারিং'
      },
      pricing: {
        economy: 16500,
        standard: 21000,
        premium: 28500
      },
      itinerary: [
        { day: 1, title: 'Mongla Boarding & Karamjal Visit', details: 'সকালে মোংলা বন্দরে জাহাজে বোর্ডিং। বনের ভেতরে ক্রুজ শুরু। করমজল কুমির প্রজনন কেন্দ্র ভিজিট।' },
        { day: 2, title: 'Harbaria & Kotka Wildlife Watch', details: 'হারবাড়িয়া ট্রেইল ও কটকা সৈকতে ট্র্যাকিং। ওয়াচ টাওয়ার থেকে চিত্রা হরিণ ও বুনো শূকর দেখা।' },
        { day: 3, title: 'Herobhanga Canal & Return to Dhaka', details: 'সকালে নৌকায় সরু খালের ভেতর ডলফিন দেখা। দুপুরে মোংলায় জাহাজ ভিরে বাসে ঢাকায় ফেরত।' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
      ]
    },

    // RELIGIOUS PACKAGES
    {
      id: 'umrah-5star-14d',
      title: '14 Days Premium 5-Star VIP Umrah Package',
      titleBn: '🕋 ১৪ দিন প্রিমিয়াম ৫-স্টার ভিআইপি উমরাহ প্যাকেজ',
      category: 'religious',
      country: 'Saudi Arabia',
      duration: '১৪ দিন / ১৩ রাত',
      priceBDT: 185000,
      priceUSD: 1560,
      popular: true,
      totalSeats: 30,
      bookedSeats: 24,
      nextDeparture: '০১ নভেম্বর ২০২৬',
      image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'মক্কা ক্লক টাওয়ার / হারাম প্রাঙ্গণে ৫-স্টার হোটেল (১০০ মিটার দূরত্ব)',
        'মদিনা নববী প্রাঙ্গণে ৫-স্টার হোটেল (১৫০ মিটার দূরত্ব)',
        'সৌদি উমরাহ ই-ভিসা, হেলথ ইন্স্যুরেন্স ও এসি বাস ট্রান্সফার',
        'অভিজ্ঞ আলেম দ্বারা সহিহ নিয়মে উমরাহ সম্পাদন ও প্রফেশনাল মুয়াল্লিম',
        'মক্কা ও মদিনা শরীফের ঐতিহাসিক স্থানসমূহে ভিআইপি জিয়ারত'
      ],
      overview: 'সম্মানিত হাজীদের খেদমতে আমাদের ফ্ল্যাগশিপ ৫-স্টার ভিআইপি উমরাহ প্যাকেজ। মক্কা ও মদিনার হারামের অতি নিকটবর্তী বিলাসবহুল হোটেলে অবস্থান, সরাসরি এয়ার টিকিট এবং সার্বক্ষণিক আলেম দ্বারা উমরাহ পরিচালনা।',
      includes: [
        'সৌদি উমরাহ ভিসা ও হেলথ ইন্স্যুরেন্স',
        'সরাসরি রিটার্ন এয়ার টিকিট (Biman / Saudia)',
        '৫-স্টার মক্কা হোটেল (মক্কা ক্লক টাওয়ার / আনজুম)',
        '৫-স্টার মদিনা হোটেল (মিলেনিয়াম তইবা / আনসার)',
        'প্রতিদিনের বুফে প্রাতরাশ',
        'হাই-স্পিড হারামাইন ট্রেইন / জিএমসি প্রাইভেট ট্রান্সফার',
        'মক্কা ও মদিনায় ঐতিহাসিক জিয়ারত'
      ],
      excludes: [
        'ব্যক্তিগত কেনাকাটা ও কোরবানি ফি'
      ],
      hotelInfo: {
        name: 'Pullman Zamzam Makkah & Dar Al Taqwa Madinah',
        stars: 5,
        location: 'Clock Tower Makkah & Front Row Madinah'
      },
      flightInfo: {
        airline: 'Saudia Airlines / Biman Bangladesh',
        departure: 'DAC 11:30 AM -> JED 03:45 PM',
        baggage: '৪০০ কেজি ব্যাগেজ + ৫ লিটার জমজম পানি',
        meal: 'হালাল প্রিমিয়াম মিলস'
      },
      pricing: {
        economy: 185000,
        standard: 220000,
        premium: 280000
      },
      itinerary: [
        { day: 1, title: 'Dhaka to Jeddah & Makkah Umrah', details: 'জেদ্দায় পৌঁছে প্রাইভেট জিএমসিতে মক্কায় হোটেলে চেক-ইন এবং মুয়াল্লিমের সাথে প্রথম উমরাহ সম্পাদন।' },
        { day: 2, title: 'Ibadah in Makkah Mukarramah', details: 'মসজিদে হারামে ৫ ওয়াক্ত সালাত আদায় ও নফল তাওয়াফ।' },
        { day: 5, title: 'Makkah Ziyarat', details: 'জাবালে নূর (হেরা গুহা), সাওর পাহাড়, মিনা, মুজদালিফা ও আরাফাত জিয়ারত।' },
        { day: 8, title: 'Transfer to Madinah Al Munawwarah', details: 'হারামাইন এক্সপ্রেস ট্রেনে মদিনা শরীফে যাত্রা। মসজিদে নববীতে সালাম পেশ।' },
        { day: 10, title: 'Madinah Rawdah Rasool & Ziyarat', details: 'রিয়াজুল জান্নাতে সালাত আদায়, মসজিদে কুবা, ওহুদ পাহাড় ও ঐতিহাসিক খেজুর বাগান জিয়ারত।' },
        { day: 14, title: 'Return to Dhaka', details: 'মদিনা এয়ারপোর্ট থেকে সরাসরি ঢাকায় প্রত্যাবর্তন।' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'umrah-plus-turkey-10d9n',
      title: 'Umrah & Istanbul Islamic History Tour',
      titleBn: '🕋 উমরাহ ও ইস্তাম্বুল ইসলামিক হিস্ট্রি স্পেশাল',
      category: 'religious',
      country: 'Saudi & Turkey',
      duration: '১০ দিন / ৯ রাত',
      priceBDT: 185000,
      priceUSD: 1580,
      popular: true,
      totalSeats: 15,
      bookedSeats: 11,
      nextDeparture: '০৫ নভেম্বর ২০২৬',
      image: 'https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'পবিত্র মক্কা ও মদিনা শরীফে ৬ দিন অবস্থান',
        'ইস্তাম্বুল ব্লু মস্ক & হাগিয়া সোফিয়া জিয়ারত',
        'বস্ফরাস প্রণালী ক্রুজ ট্রিপ',
        'সৌদি ও টার্কিশ প্রসেসড ই-ভিসা',
        'অভিজ্ঞ আলেম ও প্রফেশনাল মুয়াল্লিম'
      ],
      overview: 'একই সফরে পবিত্র উমরাহ পালন এবং ইসলামিক ইতিহাসের প্রাণকেন্দ্র তুরস্কের ইস্তাম্বুল নগরী পরিদর্শনের সুবর্ণ সুযোগ। মুয়াল্লিমের সান্নিধ্যে জিয়ারত ও ঐতিহাসিক নিদর্শন শিক্ষা।',
      includes: [
        'সৌদি উমরাহ ভিসা ও টার্কিশ ই-ভিসা',
        'ঢাকা-জেদ্দা-ইস্তাম্বুল-ঢাকা এয়ার টিকিট',
        'হারামের নিকটবর্তী ৪-স্টার হোটেল অবস্থান',
        'ইস্তাম্বুলে প্রিমিয়াম হোটেল ও প্রাতরাশ',
        'এসি বাসে যাতায়াত ও মক্কা-মদিনা জিয়ারত',
        'বস্ফরাস বোট ক্রুজ টিকিট'
      ],
      excludes: [
        'ব্যক্তিগত কেনাকাটা',
        'ঐচ্ছিক ব্যক্তিগত শপিং'
      ],
      hotelInfo: {
        name: 'Pullman Zamzam Makkah & Ramada Istanbul',
        stars: 4,
        location: 'Abraj Al Bait Makkah & Taksim Square Istanbul'
      },
      flightInfo: {
        airline: 'Saudia / Turkish Airlines',
        departure: 'DAC 02:30 AM -> JED 06:15 AM',
        baggage: '৪০০ কেজি / ৩০ কেজি ব্যাগেজ + জমজম পানি',
        meal: 'হালাল ফুল মিলস'
      },
      pricing: {
        economy: 185000,
        standard: 215000,
        premium: 275000
      },
      itinerary: [
        { day: 1, title: 'Dhaka to Jeddah & Makkah Umrah', details: 'জেদ্দায় পৌঁছে এসি বাসে মক্কায় হোটেলের আর্লি চেক-ইন এবং সহিহ নিয়মে পবিত্র উমরাহ সম্পন্ন।' },
        { day: 2, title: 'Makkah Mukarramah Ziyarat', details: 'জাবালে নূর, সাওর পাহাড়, মিনা, মুজদালিফা ও আরাফাত ময়দান জিয়ারত।' },
        { day: 3, title: 'Transfer to Madinah Al Munawwarah', details: 'হাই-স্পিড হারামাইন ট্রেনে মদিনা শরীফে যাত্রা। মসজিদে নববীতে নামাজ আদায়।' },
        { day: 4, title: 'Madinah Historical Places', details: 'মসজিদে কুবা, খন্দক, উহুদ পাহাড় ও ঐতিহাসিক খেজুর বাগান দর্শন।' },
        { day: 5, title: 'Flight to Istanbul, Turkey', details: 'মদিনা এয়ারপোর্ট থেকে ইস্তাম্বুলে যাত্রা। হোটেলে বিশ্রাম।' },
        { day: 6, title: 'Hagia Sophia & Blue Mosque', details: 'বিশ্বখ্যাত হাগিয়া সোফিয়া, ব্লু মস্ক, তোপক্যাপি প্যালেস ও গ্র্যান্ড বাজার পরিভ্রমণ।' },
        { day: 7, title: 'Bosphorus Boat Cruise', details: 'ইউরোপ ও এশিয়ার সীমানা বিভক্তকারী বস্ফরাস প্রণালীতে ক্রুজ বোট ট্রিপ।' },
        { day: 8, title: 'Return Journey to Dhaka', details: 'ঐতিহাসিক অভিজ্ঞতা নিয়ে ঢাকায় প্রত্যাবর্তন।' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&w=800&q=80'
      ]
    }
  ];

  React.useEffect(() => {
    if (initialTourId) {
      const found = packagesData.find((p) => p.id === initialTourId);
      if (found) {
        setSelectedPackageDetail(found);
      }
    }
  }, [initialTourId]);

  const filteredPackages = packagesData.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  // Calculate estimated trip cost
  const getCalculatedCost = () => {
    let base = 50000;
    if (calcDestination === 'thailand') base = 49990;
    if (calcDestination === 'malaysia') base = 55000;
    if (calcDestination === 'dubai') base = 75000;
    if (calcDestination === 'maldives') base = 115000;
    if (calcDestination === 'domestic') base = 14500;

    let starMultiplier = 1;
    if (calcHotelStar === 4) starMultiplier = 1.25;
    if (calcHotelStar === 5) starMultiplier = 1.6;

    let flightCost = calcIncludeFlight ? 25000 : 0;
    if (calcDestination === 'domestic') flightCost = calcIncludeFlight ? 6000 : 0;

    const perPerson = Math.round((base * starMultiplier) + flightCost);
    const totalCost = perPerson * calcTravelers;

    return { perPerson, totalCost };
  };

  const handleToggleComparison = (pkg: TourPackage) => {
    if (comparisonPackages.some((p) => p.id === pkg.id)) {
      setComparisonPackages(comparisonPackages.filter((p) => p.id !== pkg.id));
    } else {
      if (comparisonPackages.length >= 2) {
        setComparisonPackages([comparisonPackages[1], pkg]);
      } else {
        setComparisonPackages([...comparisonPackages, pkg]);
      }
    }
  };

  const handleCustomFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/inquiry/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Custom Tour Package Request',
          ...customForm,
        }),
      });
    } catch (err) {
      console.error('Custom tour submit error:', err);
    }
    setCustomFormSubmitted(true);
    setTimeout(() => {
      setCustomFormSubmitted(false);
      setShowCustomTourModal(false);
      setCustomForm({
        name: '',
        phone: '',
        email: '',
        destination: '',
        travelDate: '',
        travelers: 2,
        budget: '',
        hotelType: '4-star',
        message: ''
      });
    }, 2500);
  };

  const handleModalBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/inquiry/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Tour Package Direct Booking',
          packageTitle: selectedPackageDetail?.titleBn || selectedPackageDetail?.title,
          packageId: selectedPackageDetail?.id,
          packagePrice: selectedPackageDetail?.priceBDT,
          ...bookingForm,
        }),
      });
    } catch (err) {
      console.error('Package booking submit error:', err);
    }
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setSelectedPackageDetail(null);
      setBookingForm({
        name: '',
        phone: '',
        email: '',
        travelDate: '',
        travelers: 2,
        message: ''
      });
    }, 2500);
  };

  const faqs = [
    {
      q: 'ট্যুর প্যাকেজ কতদিন আগে বুকিং করতে হবে?',
      a: 'আন্তর্জাতিক ট্যুরের ক্ষেত্রে প্রসেসিং, ভিসা ও এয়ার টিকিট সাশ্রয়ী মূল্যে পেতে নূন্যতম ১৫ থেকে ৩০ দিন আগে বুকিং করা উত্তম। অভ্যন্তরীণ (Domestic) ট্যুরের জন্য ৭-১০ দিন আগে বুকিং যথেষ্ট।'
    },
    {
      q: 'পাসপোর্টের মেয়াদ কতদিন থাকতে হবে?',
      a: 'আন্তর্জাতিক যেকোনো ট্যুর বা ভিসার ক্ষেত্রে ভ্রমণের সম্ভাব্য তারিখ থেকে পাসের মেয়াদের নূন্যতম ৬ মাস বৈধতা থাকা আন্তর্জাতিক ইমিগ্রেশন আইন অনুযায়ী বাধ্যতামূলক।'
    },
    {
      q: 'শিশুদের জন্য আলাদা ট্যুর চার্জ কেমন?',
      a: '২ বছরের কম বয়সী শিশুদের (Infant) ক্ষেত্রে এয়ার টিকিট ও সার্ভিস ফি নগণ্য। ২-১১ বছর বয়সী বাচ্চাদের জন্য বেড ছাড়া বা এক্সট্রা বেডসহ বিশেষ ছাড়যুক্ত চাইল্ড রেট (Child Rate) প্রযোজ্য।'
    },
    {
      q: 'কিস্তিতে (0% EMI) পেমেন্ট করার সুবিধা আছে কি?',
      a: 'জি! ড্রিমস ফ্লাই ইন্টারন্যাশনাল দেশের শীর্ষস্থানীয় ব্যাংকসমূহের ক্রেডিট কার্ডে ৩, ৬ ও ১২ মাসের ০% ইএমআই (0% EMI) সুবিধায় ট্যুর বুকিং গ্রহণ করে থাকে।'
    },
    {
      q: 'ট্যুর বাতিল বা তারিখ পরিবর্তন হলে নীতি কী?',
      a: 'যাত্রার ৭ দিন আগে বাতিল করলে এয়ারলাইনস ও হোটেল ক্যানসেলেশন ফি বাদে অবশিষ্ট অর্থ রিফান্ড করা হয়। বিশদ ক্যানসেলেশন পলিসি বুকিং রসিদে উল্লেখ থাকে।'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-900 space-y-16 animate-in fade-in">
      {/* 1. HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-amber-50 border border-red-200 rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-red-100 text-[#DC2626] border border-red-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#DC2626]" />
            <span>Explore the World with Dreams Fly International</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-sans text-gray-900 leading-tight">
            আপনার স্বপ্নের ভ্রমণকে বাস্তবে রূপ দিন
          </h1>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
            দেশীয় ও আন্তর্জাতিক ট্যুর প্যাকেজ, সাশ্রয়ী মূল্য, মানসম্মত সেবা এবং নির্ভরযোগ্য গাইডেন্স—সবকিছু একসাথে।
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenBookingModal('ট্যুর প্যাকেজ বুকিং')}
              className="px-6 py-3.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
            >
              <CheckSquare className="w-4 h-4" />
              <span>Book Your Tour Today</span>
            </button>
            <button
              onClick={() => handleWhatsApp()}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer flex items-center space-x-2 shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>📞 +880 1771-304219 (WhatsApp)</span>
            </button>
            <button
              onClick={() => setShowCustomTourModal(true)}
              className="px-6 py-3.5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer flex items-center space-x-2 shadow"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>কাস্টম ট্যুর রিকোয়েস্ট</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. UPCOMING DEPARTURE COUNTDOWN & LIVE SEAT BAR */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6 sm:p-8 rounded-3xl border border-gray-700 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 bg-red-600/80 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>পরবর্তী আসন্ন গ্রুপ ট্যুর কাউন্টডাউন</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-sans text-white">
            🇹🇭 থাইল্যান্ড স্পেশাল গ্রুপ ট্যুর (১০ অক্টোবর)
          </h2>
          <p className="text-xs text-gray-300">
            ১২টি সিটের মধ্যে <span className="text-amber-400 font-bold">৮টি বুকড</span> (আর মাত্র ৪টি সিট বাকি!)
          </p>
        </div>

        {/* Countdown Box */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="bg-white/10 p-3 rounded-2xl text-center min-w-[60px] border border-white/10">
            <span className="text-xl sm:text-2xl font-black text-amber-400 block">{countdown.days}</span>
            <span className="text-[10px] uppercase font-bold text-gray-300">দিন</span>
          </div>
          <span className="text-xl font-bold text-gray-500">:</span>
          <div className="bg-white/10 p-3 rounded-2xl text-center min-w-[60px] border border-white/10">
            <span className="text-xl sm:text-2xl font-black text-amber-400 block">{countdown.hours}</span>
            <span className="text-[10px] uppercase font-bold text-gray-300">ঘণ্টা</span>
          </div>
          <span className="text-xl font-bold text-gray-500">:</span>
          <div className="bg-white/10 p-3 rounded-2xl text-center min-w-[60px] border border-white/10">
            <span className="text-xl sm:text-2xl font-black text-amber-400 block">{countdown.mins}</span>
            <span className="text-[10px] uppercase font-bold text-gray-300">মি.</span>
          </div>
          <span className="text-xl font-bold text-gray-500">:</span>
          <div className="bg-white/10 p-3 rounded-2xl text-center min-w-[60px] border border-white/10">
            <span className="text-xl sm:text-2xl font-black text-amber-400 block">{countdown.secs}</span>
            <span className="text-[10px] uppercase font-bold text-gray-300">সে.</span>
          </div>
        </div>
      </div>

      {/* 3. TOOLBAR: TRIP COST CALCULATOR & COMPARISON TOOL SHORTCUTS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-gray-200 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#DC2626] flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">স্মার্ট ট্যুর টুলস</h3>
            <p className="text-xs text-gray-500">আপনার ভ্রমণের আনুমানিক খরচ হিসাব করুন বা দুটি প্যাকেজ তুলনা করুন</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={() => setShowCalcModal(true)}
            className="flex-1 sm:flex-initial px-4 py-2.5 bg-red-50 hover:bg-red-100 text-[#DC2626] font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer border border-red-200"
          >
            <Calculator className="w-4 h-4" />
            <span>Trip Cost Calculator</span>
          </button>
          <button
            onClick={() => setShowComparisonModal(true)}
            className="flex-1 sm:flex-initial px-4 py-2.5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>
              Package Comparison ({comparisonPackages.length}/2)
            </span>
          </button>
        </div>
      </div>

      {/* 4. TOUR CATEGORIES FILTERS */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            বিভাগ নির্বাচন করুন
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            Tour Categories
          </h2>
          <p className="text-xs text-gray-600">
            আপনার পছন্দের ভ্রমণের ধরণ ও গন্তব্য ফিল্টার করুন
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 sm:gap-3">
          {tourCategoriesList.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 border ${
                  isActive
                    ? 'bg-[#DC2626] text-white border-[#DC2626] shadow-md scale-105'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. FEATURED TOUR PACKAGES GRID */}
      <div className="space-y-8">
        <div className="flex justify-between items-end border-b border-gray-200 pb-4">
          <div>
            <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
              সেরা অফারসমূহ
            </span>
            <h2 className="text-2xl font-black font-sans text-gray-900">
              Featured Tour Packages
            </h2>
          </div>
          <span className="text-xs text-gray-500 font-semibold">
            {filteredPackages.length} টি প্যাকেজ পাওয়া গেছে
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => {
            const isCompared = comparisonPackages.some((p) => p.id === pkg.id);
            return (
              <div
                key={pkg.id}
                className={`bg-white rounded-3xl border ${
                  pkg.popular ? 'border-[#DC2626] shadow-xl ring-2 ring-red-400/20' : 'border-gray-200 shadow-md'
                } overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all group`}
              >
                {/* Image Top */}
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {pkg.popular && (
                    <div className="absolute top-3 right-3 bg-[#DC2626] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                      পপুলার
                    </div>
                  )}

                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-900 text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>{pkg.duration}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-bold text-amber-300 block">
                      {pkg.country}
                    </span>
                    <h3 className="text-lg font-black font-sans leading-snug line-clamp-1">{pkg.titleBn}</h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Price Tag */}
                    <div className="flex items-baseline justify-between border-b border-gray-100 pb-3">
                      <div>
                        <span className="text-xs text-gray-400 font-medium block">শুরু মূল্য</span>
                        <span className="text-2xl font-black text-[#DC2626]">
                          {currency === 'BDT' ? `৳${pkg.priceBDT.toLocaleString()}` : `$${pkg.priceUSD}`}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        {pkg.hotelInfo.stars}★ হোটেল ইনক্লুডেড
                      </span>
                    </div>

                    {/* Seat Progress Bar */}
                    <div className="space-y-1 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                      <div className="flex justify-between text-[11px] font-bold text-gray-700">
                        <span>সিট বুকিং স্ট্যাটাস</span>
                        <span className="text-[#DC2626]">{pkg.bookedSeats} / {pkg.totalSeats} সিট বুকড</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#DC2626] h-full rounded-full transition-all"
                          style={{ width: `${(pkg.bookedSeats / pkg.totalSeats) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] text-gray-500 block pt-0.5">
                        পরবর্তী ট্যুর ছাড়বে: <strong className="text-gray-800">{pkg.nextDeparture}</strong>
                      </span>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold text-gray-800 uppercase block">প্রধান আকর্ষণসমূহ:</span>
                      <ul className="space-y-1 text-xs text-gray-600">
                        {pkg.highlights.slice(0, 3).map((h, i) => (
                          <li key={i} className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span className="line-clamp-1">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-100 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleSelectTourPackage(pkg)}
                        className="py-2.5 px-3 bg-gray-900 hover:bg-black text-white font-extrabold rounded-xl text-xs cursor-pointer shadow text-center flex items-center justify-center space-x-1"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>বিস্তারিত দেখুন</span>
                      </button>
                      <button
                        onClick={() => handleWhatsApp(pkg.titleBn)}
                        className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow text-center flex items-center justify-center space-x-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </button>
                    </div>

                    <button
                      onClick={() => handleToggleComparison(pkg)}
                      className={`w-full py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center space-x-1 border ${
                        isCompared
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <Layers className="w-3 h-3" />
                      <span>{isCompared ? 'তুলনা তালিকা থেকে সরান' : 'প্যাকেজ তুলনা যুক্ত করুন'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <PriceNotice variant="banner" className="mt-8" />
      </div>

      {/* 6. PACKAGE COMPARISON MODAL */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 relative border border-gray-200 my-8">
            <button
              onClick={() => setShowComparisonModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
                তুলনামূলক তথ্য
              </span>
              <h2 className="text-2xl font-black font-sans text-gray-900">
                Tour Package Side-by-Side Comparison
              </h2>
            </div>

            {comparisonPackages.length === 0 ? (
              <div className="text-center py-12 space-y-3 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                <Layers className="w-12 h-12 text-gray-400 mx-auto" />
                <p className="text-sm text-gray-600 font-semibold">
                  কোনো প্যাকেজ তুলনা তালিকায় যুক্ত করা হয়নি।
                </p>
                <p className="text-xs text-gray-400">
                  প্যাকেজ কার্ডের "প্যাকেজ তুলনা যুক্ত করুন" বাটনে ক্লিক করে অন্তত ২টি প্যাকেজ যুক্ত করুন।
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-gray-900 font-extrabold border-b border-gray-200">
                      <th className="p-3 w-1/4">বিষয়</th>
                      {comparisonPackages.map((p) => (
                        <th key={p.id} className="p-3 text-center border-l border-gray-200">
                          {p.titleBn}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-gray-800">
                    <tr>
                      <td className="p-3 font-bold text-gray-900">শুরু মূল্য</td>
                      {comparisonPackages.map((p) => (
                        <td key={p.id} className="p-3 text-center font-black text-[#DC2626] text-sm border-l border-gray-200">
                          ৳{p.priceBDT.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-gray-900">সময়কাল</td>
                      {comparisonPackages.map((p) => (
                        <td key={p.id} className="p-3 text-center border-l border-gray-200">{p.duration}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-gray-900">হোটেল ক্যাটাগরি</td>
                      {comparisonPackages.map((p) => (
                        <td key={p.id} className="p-3 text-center border-l border-gray-200">{p.hotelInfo.stars}★ ({p.hotelInfo.name})</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-gray-900">অন্তর্ভুক্ত সুবিধা</td>
                      {comparisonPackages.map((p) => (
                        <td key={p.id} className="p-3 border-l border-gray-200">
                          <ul className="space-y-1 text-[11px]">
                            {p.includes.map((inc, i) => (
                              <li key={i} className="flex items-center space-x-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                                <span>{inc}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-gray-900">আবেদন ও ইনকোয়ারি</td>
                      {comparisonPackages.map((p) => (
                        <td key={p.id} className="p-3 text-center border-l border-gray-200">
                          <button
                            onClick={() => {
                              setShowComparisonModal(false);
                              onOpenBookingModal(p.titleBn);
                            }}
                            className="px-4 py-2 bg-[#DC2626] text-white font-bold rounded-xl text-xs cursor-pointer hover:bg-[#B71C1C]"
                          >
                            বুক করুন
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 7. TRIP COST CALCULATOR MODAL */}
      {showCalcModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 relative border border-gray-200 my-8">
            <button
              onClick={() => setShowCalcModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#DC2626] mx-auto flex items-center justify-center font-bold">
                <Calculator className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-black font-sans text-gray-900">
                Trip Cost Calculator
              </h2>
              <p className="text-xs text-gray-500">আপনার ট্রাভেল বাজেট এবং আনুমানিক খরচের হিসেব করুন</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-800 mb-1">গন্তব্য নির্বাচন (Destination)</label>
                <select
                  value={calcDestination}
                  onChange={(e) => setCalcDestination(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl font-medium focus:ring-2 focus:ring-[#DC2626] outline-none"
                >
                  <option value="thailand">🇹🇭 থাইল্যান্ড (Thailand)</option>
                  <option value="malaysia">🇲🇾 মালয়েশিয়া (Malaysia)</option>
                  <option value="dubai">🇦🇪 দুবাই (Dubai UAE)</option>
                  <option value="maldives">🇲🇻 মালদ্বীপ (Maldives)</option>
                  <option value="domestic">🇧🇩 সাজেক / কক্সবাজার (Domestic)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-800 mb-1">ভ্রমণকারীর সংখ্যা (Travelers)</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={calcTravelers}
                    onChange={(e) => setCalcTravelers(Number(e.target.value))}
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl font-medium focus:ring-2 focus:ring-[#DC2626] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-800 mb-1">হোটেল মান (Hotel Rating)</label>
                  <select
                    value={calcHotelStar}
                    onChange={(e) => setCalcHotelStar(Number(e.target.value))}
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl font-medium focus:ring-2 focus:ring-[#DC2626] outline-none"
                  >
                    <option value={3}>৩-স্টার (3★ Economy)</option>
                    <option value={4}>৪-স্টার (4★ Deluxe)</option>
                    <option value={5}>৫-স্টার (5★ Luxury)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
                <input
                  type="checkbox"
                  id="calcFlight"
                  checked={calcIncludeFlight}
                  onChange={(e) => setCalcIncludeFlight(e.target.checked)}
                  className="w-4 h-4 text-[#DC2626] rounded focus:ring-[#DC2626]"
                />
                <label htmlFor="calcFlight" className="font-bold text-gray-800 cursor-pointer">
                  এয়ার টিকিট প্যাকেজে অন্তর্ভুক্ত রাখবেন?
                </label>
              </div>

              {/* Calculated Result Box */}
              <div className="bg-red-50 p-5 rounded-2xl border border-red-200 space-y-2 text-center">
                <span className="text-[11px] font-bold text-[#DC2626] uppercase tracking-wider block">
                  আনুমানিক আনুমানিক খরচ
                </span>
                <div className="text-3xl font-black text-[#DC2626]">
                  ৳{getCalculatedCost().totalCost.toLocaleString()}
                </div>
                <span className="text-xs text-gray-600 font-medium block">
                  (প্রতি ব্যক্তি আনুমানিক: ৳{getCalculatedCost().perPerson.toLocaleString()})
                </span>
              </div>

              <button
                onClick={() => {
                  setShowCalcModal(false);
                  onOpenBookingModal(`ক্যালকুলেটেড ট্যুর: ${calcDestination}`);
                }}
                className="w-full py-3.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow cursor-pointer"
              >
                এই খরচে বুকিং ইনকোয়ারি করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. CUSTOM TOUR REQUEST MODAL */}
      {showCustomTourModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 relative border border-gray-200 my-8">
            <button
              onClick={() => setShowCustomTourModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
                কাস্টমাইজড প্ল্যান
              </span>
              <h2 className="text-2xl font-black font-sans text-gray-900">
                Custom Tour Request Form
              </h2>
              <p className="text-xs text-gray-500">আপনার নিজস্ব পছন্দ ও বাজেট অনুযায়ী আমরা তৈরি করব সেরা প্ল্যান</p>
            </div>

            {customFormSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-900">ধন্যবাদ! আপনার অনুরোধ গৃহীত হয়েছে</h3>
                <p className="text-xs text-emerald-700">আমাদের ট্যুর কনসালটেন্ট দ্রুতই আপনার সাথে যোগাযোগ করবেন।</p>
              </div>
            ) : (
              <form onSubmit={handleCustomFormSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-800 mb-1">আপনার নাম *</label>
                  <input
                    type="text"
                    required
                    value={customForm.name}
                    onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                    placeholder="যেমন: মোঃ জহিরুল ইসলাম"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#DC2626] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-800 mb-1">মোবাইল নম্বর *</label>
                    <input
                      type="tel"
                      required
                      value={customForm.phone}
                      onChange={(e) => setCustomForm({ ...customForm, phone: e.target.value })}
                      placeholder="01711..."
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#DC2626] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-800 mb-1">ইমেইল ঠিকানা</label>
                    <input
                      type="email"
                      value={customForm.email}
                      onChange={(e) => setCustomForm({ ...customForm, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#DC2626] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-800 mb-1">পছন্দের দেশ / স্থান</label>
                    <input
                      type="text"
                      value={customForm.destination}
                      onChange={(e) => setCustomForm({ ...customForm, destination: e.target.value })}
                      placeholder="যেমন: থাইল্যান্ড বা মালদ্বীপ"
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#DC2626] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-800 mb-1">ভ্রমণকারীদের সংখ্যা</label>
                    <input
                      type="number"
                      min="1"
                      value={customForm.travelers}
                      onChange={(e) => setCustomForm({ ...customForm, travelers: Number(e.target.value) })}
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#DC2626] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-800 mb-1">বিশেষ অনুরোধ বা বাজেট বিবরণ</label>
                  <textarea
                    rows={3}
                    value={customForm.message}
                    onChange={(e) => setCustomForm({ ...customForm, message: e.target.value })}
                    placeholder="হোটেল ক্যাটাগরি, খাবারের পছন্দ বা অন্যান্য তথ্য..."
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#DC2626] outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow cursor-pointer"
                >
                  কাস্টম অনুরোধ পাঠান
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 9. DETAILED PACKAGE EXPANDED MODAL (Overview, Highlights, Itinerary, Includes/Excludes, Pricing Table, Flight/Hotel, Booking Form) */}
      {selectedPackageDetail && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative border border-gray-200 my-8">
            <button
              onClick={handleCloseTourPackage}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center font-bold cursor-pointer"
            >
              ✕
            </button>

            {/* Modal Top Header Image */}
            <div className="relative h-64 sm:h-80 bg-gray-900">
              <img
                src={selectedPackageDetail.image}
                alt={selectedPackageDetail.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="bg-[#DC2626] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">
                  {selectedPackageDetail.country} • {selectedPackageDetail.duration}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black font-sans">{selectedPackageDetail.titleBn}</h2>
                <div className="text-amber-400 font-extrabold text-lg">
                  ৳{selectedPackageDetail.priceBDT.toLocaleString()} / প্রতি ব্যক্তি থেকে শুরু
                </div>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
              {/* Overview */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                  <Info className="w-5 h-5 text-[#DC2626]" />
                  <span>1. Overview (প্যাকেজ পরিচিতি)</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  {selectedPackageDetail.overview}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-[#DC2626]" />
                  <span>2. Tour Highlights (প্রধান আকর্ষণসমূহ)</span>
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-800">
                  {selectedPackageDetail.highlights.map((h, i) => (
                    <li key={i} className="flex items-center space-x-2 bg-red-50/50 p-3 rounded-xl border border-red-100">
                      <CheckCircle2 className="w-4 h-4 text-[#DC2626] flex-shrink-0" />
                      <span className="font-semibold">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Day-by-Day Itinerary */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-[#DC2626]" />
                  <span>3. Day-by-Day Itinerary (ভ্রমণ সময়সূচি)</span>
                </h3>
                <div className="space-y-3">
                  {selectedPackageDetail.itinerary.map((day) => (
                    <div key={day.day} className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-1">
                      <span className="text-[10px] font-black uppercase text-[#DC2626] bg-red-100 px-2 py-0.5 rounded">
                        Day {day.day}
                      </span>
                      <h4 className="text-sm font-bold text-gray-900 pt-1">{day.title}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{day.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200 space-y-2">
                  <h4 className="text-sm font-bold text-emerald-900 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Package Includes</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-800">
                    {selectedPackageDetail.includes.map((inc, i) => (
                      <li key={i} className="flex items-center space-x-1.5">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50/40 p-4 rounded-2xl border border-red-200 space-y-2">
                  <h4 className="text-sm font-bold text-red-900 flex items-center space-x-1.5">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span>Package Excludes</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-800">
                    {selectedPackageDetail.excludes.map((exc, i) => (
                      <li key={i} className="flex items-center space-x-1.5">
                        <span className="text-red-600 font-bold">✕</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Hotel & Flight Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center space-x-2">
                    <Hotel className="w-4 h-4 text-[#DC2626]" />
                    <span>Hotel Information</span>
                  </h4>
                  <div className="text-xs text-gray-700 space-y-1">
                    <p><strong>Hotel Name:</strong> {selectedPackageDetail.hotelInfo.name}</p>
                    <p><strong>Rating:</strong> {selectedPackageDetail.hotelInfo.stars} Star (⭐⭐⭐⭐)</p>
                    <p><strong>Location:</strong> {selectedPackageDetail.hotelInfo.location}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center space-x-2">
                    <Plane className="w-4 h-4 text-[#DC2626]" />
                    <span>Flight Information</span>
                  </h4>
                  <div className="text-xs text-gray-700 space-y-1">
                    <p><strong>Airline:</strong> {selectedPackageDetail.flightInfo.airline}</p>
                    <p><strong>Flight Schedule:</strong> {selectedPackageDetail.flightInfo.departure}</p>
                    <p><strong>Baggage:</strong> {selectedPackageDetail.flightInfo.baggage}</p>
                  </div>
                </div>
              </div>

              {/* Pricing Options Table */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-gray-900">প্যাকেজ প্রাইসিং ক্যাটাগরি</h4>
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="bg-gray-100 p-3 rounded-xl border border-gray-200">
                    <span className="font-bold block text-gray-700">Economy (৩★)</span>
                    <span className="text-base font-black text-[#DC2626] block mt-1">
                      ৳{selectedPackageDetail.pricing.economy.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-red-50 p-3 rounded-xl border border-red-200">
                    <span className="font-bold block text-red-900">Standard (৪★)</span>
                    <span className="text-base font-black text-[#DC2626] block mt-1">
                      ৳{selectedPackageDetail.pricing.standard.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-xl border border-purple-200">
                    <span className="font-bold block text-purple-900">Premium (৫★)</span>
                    <span className="text-base font-black text-[#DC2626] block mt-1">
                      ৳{selectedPackageDetail.pricing.premium.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Booking Form Inside Detail */}
              <div className="bg-gray-900 text-white p-6 rounded-3xl space-y-4">
                <h3 className="text-lg font-bold flex items-center space-x-2">
                  <CheckSquare className="w-5 h-5 text-amber-400" />
                  <span>বুকিং বা ইনকোয়ারি ফর্ম</span>
                </h3>

                {bookingSubmitted ? (
                  <div className="bg-emerald-600 text-white p-4 rounded-xl text-center text-xs font-bold">
                    ✓ আপনার বুকিং রিকোয়েস্ট সফলভাবে জমা হয়েছে! দ্রুতই প্রতিনিধি যোগাযোগ করবে।
                  </div>
                ) : (
                  <form onSubmit={handleModalBookingSubmit} className="space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="আপনার পূর্ণ নাম *"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        className="p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 outline-none"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="মোবাইল নম্বর *"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        className="p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="date"
                        required
                        value={bookingForm.travelDate}
                        onChange={(e) => setBookingForm({ ...bookingForm, travelDate: e.target.value })}
                        className="p-3 bg-white/10 border border-white/20 rounded-xl text-white outline-none"
                      />
                      <input
                        type="number"
                        min="1"
                        placeholder="যাত্রী সংখ্যা"
                        value={bookingForm.travelers}
                        onChange={(e) => setBookingForm({ ...bookingForm, travelers: Number(e.target.value) })}
                        className="p-3 bg-white/10 border border-white/20 rounded-xl text-white outline-none"
                      />
                    </div>

                    <div className="flex items-center space-x-3 pt-2">
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold rounded-xl uppercase tracking-wider cursor-pointer shadow"
                      >
                        অনলাইন বুকিং জমা দিন
                      </button>
                      <button
                        type="button"
                        onClick={() => handleWhatsApp(selectedPackageDetail.titleBn)}
                        className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl cursor-pointer flex items-center space-x-1"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. EASY INSTALLMENT (0% EMI) OPTION */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-full text-xs font-black uppercase">
              <Percent className="w-3.5 h-3.5 text-amber-600" />
              <span>সহজ কিস্তি সুবিধা</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900 mt-2">
              0% EMI Easy Installment Option
            </h2>
          </div>
          <p className="text-xs text-gray-500 max-w-md">
            আপনার পছন্দের ট্যুর বেছে নিন এবং ৩, ৬ বা ১২ মাসের সহজ ০% ইএমআই সুদে ক্রেডিট কার্ড দিয়ে পেমেন্ট করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
            <span className="text-2xl font-black text-[#DC2626]">৩ মাস EMI</span>
            <p className="text-xs text-gray-600 mt-1">০% সুদে কোনো অতিরিক্ত চার্জ ছাড়া</p>
          </div>
          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
            <span className="text-2xl font-black text-[#DC2626]">৬ মাস EMI</span>
            <p className="text-xs text-gray-600 mt-1">সাশ্রয়ী মাসিক কিস্তিতে ভ্রমণ</p>
          </div>
          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
            <span className="text-2xl font-black text-[#DC2626]">১২ মাস EMI</span>
            <p className="text-xs text-gray-600 mt-1">দীর্ঘমেয়াদী সহজ কিস্তি প্ল্যান</p>
          </div>
        </div>
      </div>

      {/* 11. FAQ ACCORDION */}
      <div className="bg-gray-50 p-8 sm:p-12 rounded-3xl border border-gray-200 space-y-6 shadow-sm">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            জিজ্ঞাসাবাদ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            ট্যুর প্যাকেজ সংক্রান্ত সাধারণ প্রশ্ন (FAQ)
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
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

      {/* 12. CUSTOMER REVIEWS & SUCCESS STORIES */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 space-y-8 shadow-sm">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            গ্রাহক মতামত
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            Customer Reviews & Ratings
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-3">
            <div className="flex items-center text-amber-500 space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-gray-700 italic">
              "থাইল্যান্ডের ৫ দিনের ট্যুরটি অত্যন্ত সুশৃঙ্খল ও চমৎকার ছিল। গাইড এবং হোটেল দুটোই খুব ভালো মানের ছিল।"
            </p>
            <span className="text-xs font-bold text-gray-900 block">— তানভীর আহমেদ (ঢাকাবাসী)</span>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-3">
            <div className="flex items-center text-amber-500 space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-gray-700 italic">
              "মালদ্বীপে আমাদের হানিমুন ট্রিপ ড্রিমস ফ্লাই চমৎকারভাবে আয়োজন করেছিল। রিসোর্ট ও ডিনার ডেকোরেশন অসাধারণ!"
            </p>
            <span className="text-xs font-bold text-gray-900 block">— ফারহানা ও আসিফ</span>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-3">
            <div className="flex items-center text-amber-500 space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-gray-700 italic">
              "দুবাই ডেজার্ট সাফারি ও বুর্জ খলিফা ট্যুর এক কথায় চমৎকার। সঠিক সময়ে ফ্লাইট ও সার্ভিস পেয়েছি।"
            </p>
            <span className="text-xs font-bold text-gray-900 block">— ড. শফিকুল ইসলাম</span>
          </div>
        </div>
      </div>

      {/* 13. BOTTOM CTA BANNER */}
      <div className="bg-gradient-to-r from-[#DC2626] via-[#B71C1C] to-[#991B1B] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full inline-block">
            স্বপ্নের ভ্রমণ
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-sans">
            আপনার পরবর্তী ভ্রমণের পরিকল্পনা আজই শুরু করুন
          </h2>
          <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
            স্বপ্নের যেকোনো গন্তব্যে নিশ্চিন্তে ও নিরাপদ সফরে ড্রিমস ফ্লাই সর্বদা আপনার সাথে রয়েছে।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onOpenBookingModal('ট্যুর প্যাকেজ অনলাইন বুকিং')}
            className="px-8 py-4 bg-white text-[#DC2626] hover:bg-red-50 font-black rounded-2xl text-sm uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <PhoneCall className="w-4 h-4 text-[#DC2626]" />
            <span>📞 Call Now: +880 1771-304219</span>
          </button>
          <button
            onClick={() => handleWhatsApp()}
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-sm transition-all cursor-pointer flex items-center justify-center space-x-2 shadow"
          >
            <MessageCircle className="w-4 h-4" />
            <span>💬 WhatsApp Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
