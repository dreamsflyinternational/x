import React, { useState, useMemo } from 'react';
import { PriceNotice } from '../components/PriceNotice';
import {
  Building2,
  Hotel,
  MapPin,
  Calendar,
  Users,
  Star,
  CheckCircle2,
  Search,
  ShieldCheck,
  Clock,
  HeartHandshake,
  Coffee,
  Wifi,
  Waves,
  Dumbbell,
  Utensils,
  Car,
  Sparkles,
  PhoneCall,
  Mail,
  Globe,
  ArrowRight,
  Shield,
  Check,
  MessageSquare,
  ChevronDown,
  HelpCircle,
  Briefcase,
  Moon,
  Compass,
  FileCheck,
  Send,
  BedDouble,
  SlidersHorizontal,
  X,
  CreditCard
} from 'lucide-react';
import { FEATURED_HOTELS, POPULAR_DESTINATIONS, CITY_LANDING_PAGES, HotelItem } from '../data/hotels';
import { HotelDetailPageModal } from '../components/HotelDetailPageModal';
import { navigateToPath } from '../lib/router';

interface HotelBookingViewProps {
  currency?: 'BDT' | 'USD';
  onOpenBookingModal: (serviceType?: string) => void;
  initialHotelId?: string | null;
  initialCitySlug?: string;
}

export const HotelBookingView: React.FC<HotelBookingViewProps> = ({
  currency = 'BDT',
  onOpenBookingModal,
  initialHotelId,
  initialCitySlug
}) => {
  // City Landing Page selection state
  const [selectedCitySlug, setSelectedCitySlug] = useState<string>(initialCitySlug || 'all');

  // Selected Hotel Modal
  const [selectedHotelModal, setSelectedHotelModal] = useState<HotelItem | null>(null);

  const handleSelectHotel = (hotel: HotelItem) => {
    setSelectedHotelModal(hotel);
    navigateToPath(`/hotel/${hotel.id}`);
  };

  const handleCloseHotelModal = () => {
    setSelectedHotelModal(null);
    if (selectedCitySlug && selectedCitySlug !== 'all') {
      navigateToPath(`/hotels/${selectedCitySlug}`);
    } else {
      navigateToPath('/hotel');
    }
  };

  // Auto select hotel if initialHotelId is provided
  React.useEffect(() => {
    if (initialHotelId) {
      const found = FEATURED_HOTELS.find((h) => h.id === initialHotelId);
      if (found) {
        setSelectedHotelModal(found);
      }
    }
  }, [initialHotelId]);

  React.useEffect(() => {
    if (initialCitySlug) {
      setSelectedCitySlug(initialCitySlug);
    }
  }, [initialCitySlug]);

  // Search Bar State (Expedia / Booking.com Style)
  const [searchDestination, setSearchDestination] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [roomsCount, setRoomsCount] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(100000);

  // Active Tab for Featured Hotel Gallery
  const [activeHotelTab, setActiveHotelTab] = useState<string>('all');

  const [modalBookingSubmitted, setModalBookingSubmitted] = useState<boolean>(false);
  const [modalBookingForm, setModalBookingForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: '2 Guests, 1 Room',
    specialRequest: '',
  });

  // Bottom Inquiry Form State
  const [inquiryForm, setInquiryForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    destination: 'Makkah / Madinah',
    checkInDate: '',
    checkOutDate: '',
    roomType: '⭐⭐⭐⭐ Premium Hotel',
    guestsCount: '2 Adults',
    notes: '',
  });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Active City Info if a specific city landing page is selected
  const activeCityInfo = useMemo(() => {
    if (selectedCitySlug === 'all') return null;
    return CITY_LANDING_PAGES.find((c) => c.slug === selectedCitySlug) || null;
  }, [selectedCitySlug]);

  // Filtered Hotels Logic
  const filteredHotels = useMemo(() => {
    return FEATURED_HOTELS.filter((h) => {
      // City Landing Page Filter
      if (selectedCitySlug !== 'all') {
        const cityObj = CITY_LANDING_PAGES.find((c) => c.slug === selectedCitySlug);
        if (cityObj) {
          const matchedCity = h.cityEn.toLowerCase().includes(cityObj.cityEn.toLowerCase()) ||
            h.cityBn.toLowerCase().includes(cityObj.cityBn.toLowerCase()) ||
            h.country.toLowerCase().includes(cityObj.countryEn.toLowerCase());
          if (!matchedCity) return false;
        }
      }

      // Category filter
      if (activeHotelTab !== 'all' && h.category !== activeHotelTab) {
        return false;
      }

      // Search destination filter
      if (searchDestination.trim() !== '') {
        const destLower = searchDestination.toLowerCase();
        const matchesName =
          h.nameEn.toLowerCase().includes(destLower) ||
          h.nameBn.toLowerCase().includes(destLower) ||
          h.cityEn.toLowerCase().includes(destLower) ||
          h.cityBn.toLowerCase().includes(destLower) ||
          h.country.toLowerCase().includes(destLower);
        if (!matchesName) return false;
      }
      // Price filter
      if (h.priceBDT > maxPrice) return false;

      return true;
    });
  }, [selectedCitySlug, activeHotelTab, searchDestination, maxPrice]);

  // Handle Bottom Inquiry Form Submit
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.fullName || !inquiryForm.phone) return;

    setIsSubmittingInquiry(true);
    try {
      await fetch('/api/inquiry/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Worldwide Hotel Booking Inquiry',
          ...inquiryForm,
        }),
      });
      setInquirySubmitted(true);
      setTimeout(() => {
        setInquirySubmitted(false);
        setInquiryForm({
          fullName: '',
          phone: '',
          email: '',
          destination: 'Makkah / Madinah',
          checkInDate: '',
          checkOutDate: '',
          roomType: '⭐⭐⭐⭐ Premium Hotel',
          guestsCount: '2 Adults',
          notes: '',
        });
      }, 5000);
    } catch (err) {
      console.error('Hotel inquiry submission error:', err);
      setInquirySubmitted(true);
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  // Handle Quick Modal Booking Submit
  const handleModalBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalBookingForm.fullName || !modalBookingForm.phone) return;

    try {
      await fetch('/api/inquiry/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Direct Hotel Room Reservation',
          hotelName: selectedHotelModal?.nameEn || selectedHotelModal?.nameBn,
          hotelCity: selectedHotelModal?.cityEn,
          hotelPriceBDT: selectedHotelModal?.priceBDT,
          ...modalBookingForm,
        }),
      });
      setModalBookingSubmitted(true);
      setTimeout(() => {
        setModalBookingSubmitted(false);
        setSelectedHotelModal(null);
        setModalBookingForm({
          fullName: '',
          phone: '',
          email: '',
          checkIn: '',
          checkOut: '',
          guests: '2 Guests, 1 Room',
          specialRequest: '',
        });
      }, 3000);
    } catch (err) {
      console.error('Modal booking submit error:', err);
      setModalBookingSubmitted(true);
    }
  };

  const formatPrice = (priceBDT: number) => {
    if (currency === 'USD') {
      return `$${Math.round(priceBDT / 120)}`;
    }
    return `৳${priceBDT.toLocaleString('en-BD')}`;
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      {/* ------------------- HERO BANNER & SEARCH ENGINE ------------------- */}
      <section className="relative bg-gradient-to-br from-[#8B0000] via-[#B71C1C] to-[#990000] text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 shadow-2xl overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-4 shadow-sm">
              <Hotel className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
                World-Class Hotel Reservation Partner
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase font-sans">
              হোটেল বুকিং সার্ভিসেস
            </h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-red-100 font-medium leading-relaxed">
              বিশ্বের যেকোনো গন্তব্যে নির্ভরযোগ্য, নিরাপদ এবং সাশ্রয়ী মূল্যে হোটেল ও রিসোর্ট বুকিং সেবা
            </p>
          </div>

          {/* Booking.com / Expedia Style Hotel Search Box */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-2xl text-gray-800 border border-red-100">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
              <div className="flex items-center space-x-2 text-sm font-extrabold text-[#B71C1C]">
                <Building2 className="w-5 h-5 text-[#DC2626]" />
                <span>হোটেল অনুসন্ধান ইঞ্জিন (Hotel Search Engine)</span>
              </div>
              <span className="text-xs font-semibold text-gray-500 hidden sm:inline-block">
                ১০,০০০০০+ আন্তর্জাতিক ও স্থানীয় হোটেল
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Destination Input */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>গন্তব্য শহর বা হোটেল</span>
                </label>
                <input
                  type="text"
                  placeholder="যেমন: Makkah, Dubai, Bangkok"
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#DC2626] focus:bg-white outline-none transition-all"
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-red-600" />
                    <span>চেক-ইন</span>
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-2.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-900 focus:ring-2 focus:ring-[#DC2626] focus:bg-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-red-600" />
                    <span>চেক-আউট</span>
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-2.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-900 focus:ring-2 focus:ring-[#DC2626] focus:bg-white outline-none"
                  />
                </div>
              </div>

              {/* Guests & Room Category */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5 text-red-600" />
                  <span>গেস্ট ও টাইপ</span>
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-900 focus:ring-2 focus:ring-[#DC2626] focus:bg-white outline-none"
                >
                  <option value="all">সব ক্যাটাগরি (All Types)</option>
                  <option value="umrah">🕌 Umrah Hotels (Makkah & Madinah)</option>
                  <option value="luxury">⭐⭐⭐⭐⭐ Luxury Hotels</option>
                  <option value="resort">🏖️ Beach & Nature Resorts</option>
                  <option value="business">🏢 Business & City Center</option>
                  <option value="family">👨‍👩‍👧 Family Hotels</option>
                  <option value="budget">⭐⭐⭐ Budget Hotels</option>
                </select>
              </div>

              {/* Action Button */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    const elem = document.getElementById('featured-hotels-section');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold text-sm rounded-xl uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 transition-all cursor-pointer transform active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  <span>হোটেল খুঁজুন</span>
                </button>
              </div>
            </div>

            {/* Price Slider Filter Bar */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-3">
                <SlidersHorizontal className="w-4 h-4 text-red-600" />
                <span className="font-bold text-gray-700">সর্বোচ্চ বাজেট প্রতি রাত:</span>
                <input
                  type="range"
                  min="2000"
                  max="60000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-32 sm:w-48 accent-[#DC2626] cursor-pointer"
                />
                <span className="font-extrabold text-red-700 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                  {formatPrice(maxPrice)}
                </span>
              </div>
              <div className="text-gray-500 font-medium">
                ফলাফল প্রদর্শিত: <strong className="text-gray-900">{filteredHotels.length}টি</strong> সেরা হোটেল
              </div>
            </div>
          </div>

          {/* Quick SEO City Search Shortcuts & Dedicated City Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="font-bold text-red-200 mr-1">শহর সিলেক্ট করুন (City Landing Pages):</span>
            <button
              onClick={() => {
                setSelectedCitySlug('all');
                setSearchDestination('');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                selectedCitySlug === 'all'
                  ? 'bg-amber-400 text-gray-900 border-amber-300 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              🌐 সকল শহর (All Cities)
            </button>
            {CITY_LANDING_PAGES.map((city) => (
              <button
                key={city.slug}
                onClick={() => {
                  setSelectedCitySlug(city.slug);
                  setSearchDestination('');
                  const elem = document.getElementById('city-landing-hero-section') || document.getElementById('featured-hotels-section');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer flex items-center space-x-1 ${
                  selectedCitySlug === city.slug
                    ? 'bg-amber-400 text-gray-900 border-amber-300 shadow-md scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
              >
                <span>{city.flag}</span>
                <span>{city.titleBn.split('(')[0].trim()}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------- DEDICATED CITY LANDING HERO BANNER (WHEN A CITY IS SELECTED) ------------------- */}
      {activeCityInfo && (
        <section id="city-landing-hero-section" className="py-10 bg-gradient-to-r from-red-900 via-red-800 to-amber-950 text-white border-b border-red-700 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center space-x-2 bg-amber-400 text-gray-900 px-3 py-1 rounded-full text-xs font-black shadow-sm">
                  <span>{activeCityInfo.flag}</span>
                  <span>DEDICATED CITY LANDING PAGE</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {activeCityInfo.titleBn}
                </h2>
                <p className="text-sm sm:text-base text-amber-200 font-bold leading-relaxed">
                  {activeCityInfo.tagline}
                </p>
                <p className="text-xs sm:text-sm text-red-100 leading-relaxed font-normal">
                  {activeCityInfo.overviewBn}
                </p>

                {/* Highlights list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {activeCityInfo.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl text-xs font-bold text-white border border-white/15">
                      <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Popular areas */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-amber-300">জনপ্রিয় এলাকা (Popular Areas):</span>
                  {activeCityInfo.popularAreas.map((area, idx) => (
                    <span key={idx} className="bg-black/30 text-red-100 px-2.5 py-1 rounded-md border border-white/10 font-semibold">
                      📍 {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side Card Image */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-2xl group">
                  <img
                    src={activeCityInfo.heroImage}
                    alt={activeCityInfo.cityBn}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-xs font-bold text-amber-300 uppercase">
                      {activeCityInfo.countryEn}
                    </span>
                    <h3 className="text-xl font-black">
                      {activeCityInfo.cityBn} ({activeCityInfo.cityEn})
                    </h3>
                    <div className="mt-2 flex items-center justify-between border-t border-white/20 pt-2">
                      <span className="text-xs font-extrabold text-amber-300">
                        হোটেল শুরু মাত্র ৳{activeCityInfo.startingPriceBDT.toLocaleString('en-BD')}/রাত
                      </span>
                      <button
                        onClick={() => setSelectedCitySlug('all')}
                        className="text-[10px] bg-white text-gray-900 font-extrabold px-2.5 py-1 rounded-md hover:bg-amber-300 transition-colors"
                      >
                        সব শহরে ফিরে যান ✕
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ------------------- INTRO & OVERVIEW SECTION ------------------- */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-red-800 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-red-600" />
                <span>Premier Hotel & Resort Booking Partner</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug">
                বিশ্বের যেকোনো গন্তব্যে আরামদায়ক ও নিশ্চিন্ত হোটেল বুকিং সেবা
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                <strong>Dreams Fly International</strong> আপনার ভ্রমণকে আরও আরামদায়ক, নিরাপদ এবং স্মরণীয় করে তুলতে বিশ্বের বিভিন্ন দেশের মানসম্মত হোটেল বুকিং সেবা প্রদান করে। ব্যবসায়িক সফর, পারিবারিক ভ্রমণ, অবকাশ যাপন, হানিমুন, উমরাহ বা কর্পোরেট ট্রিপ—যে উদ্দেশ্যেই ভ্রমণ করুন না কেন, আমরা আপনার বাজেট, পছন্দ এবং ভ্রমণ পরিকল্পনা অনুযায়ী উপযুক্ত হোটেল নির্বাচন করতে সহায়তা করি।
              </p>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                আমাদের লক্ষ্য শুধুমাত্র একটি হোটেল বুক করা নয়, বরং আপনার পুরো ভ্রমণ অভিজ্ঞতাকে আরও সহজ, নিরাপদ এবং ঝামেলামুক্ত করা।
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-gray-800">
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ইনস্ট্যান্ট কনফার্মেশন ভাউচার</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ভিসা আবেদনের জন্য হোটেল ভাউচার</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>২৪/৭ কাস্টমার কেয়ার সাপোর্ট</span>
                </div>
              </div>
            </div>

            {/* Highlight Box */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-2xl p-6 border border-red-200/80 shadow-md space-y-4">
                <div className="flex items-center space-x-3 text-[#B71C1C]">
                  <ShieldCheck className="w-8 h-8 text-[#DC2626]" />
                  <div>
                    <h3 className="font-extrabold text-base">১০০% ভেরিফাইড হোটেল গ্যারান্টি</h3>
                    <p className="text-xs text-gray-600">কোনো লোকানো চার্জ ছাড়াই সর্বোচ্চ স্বচ্ছতা</p>
                  </div>
                </div>
                <hr className="border-red-200/60" />
                <ul className="space-y-2.5 text-xs text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-600 font-bold">✓</span>
                    <span><strong>সহজ বাতিল সুবিধা:</strong> নির্ধারিত শর্তে বিনামূল্যে বাতিলের সুযোগ।</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-600 font-bold">✓</span>
                    <span><strong>হারাম ভিউ রুম:</strong> মক্কা ও মদিনায় হারামের নিকটতম ৩-৫ তারকা হোটেল।</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-600 font-bold">✓</span>
                    <span><strong>গ্রুপ ও কর্পোরেট ছাড়:</strong> বড় গ্রুপের জন্য আকর্ষক ডিসকাউন্ট।</span>
                  </li>
                </ul>
                <button
                  onClick={() => {
                    const elem = document.getElementById('hotel-inquiry-form');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-bold text-xs uppercase rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  সরাসরি কাস্টম হোটেল রিকোয়েস্ট পাঠান
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------- WHY BOOK WITH DREAMS FLY INTERNATIONAL ------------------- */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase font-sans">
              কেন Dreams Fly International-এর মাধ্যমে হোটেল বুক করবেন?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 font-medium">
              আমরা আপনাকে সঠিক তথ্য ও বিশ্বস্ত বুকিং পার্টনারের মাধ্যমে সর্বোচ্চ মানের আবাসন সেবা দিই
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                icon: Globe,
                title: 'বিশ্বব্যাপী হোটেল নেটওয়ার্ক',
                desc: 'বিশ্বের হাজার হাজার হোটেল, রিসোর্ট, সার্ভিসড অ্যাপার্টমেন্ট এবং বিজনেস হোটেলের বুকিং সুবিধা।',
                badge: '১০,০০০০০+ হোটেল',
              },
              {
                icon: ShieldCheck,
                title: 'সেরা মূল্য নিশ্চিতের চেষ্টা',
                desc: 'প্রতিযোগিতামূলক মূল্যে মানসম্মত আবাসনের ব্যবস্থা করতে আমরা সর্বোচ্চ চেষ্টা করি।',
                badge: 'সেরা মূল্য',
              },
              {
                icon: CreditCard,
                title: 'নিরাপদ ও নির্ভরযোগ্য বুকিং',
                desc: 'বিশ্বস্ত বুকিং পার্টনারদের মাধ্যমে দ্রুত ও নিরাপদ রিজার্ভেশন ভাউচার প্রদান করা হয়।',
                badge: '১০০% নিরাপদ',
              },
              {
                icon: HeartHandshake,
                title: 'ব্যক্তিগতকৃত পরামর্শ',
                desc: 'আপনার বাজেট, অবস্থান, ভ্রমণের উদ্দেশ্য এবং প্রয়োজন অনুযায়ী উপযুক্ত হোটেল নির্বাচন।',
                badge: 'কাস্টম অপশন',
              },
              {
                icon: Clock,
                title: '২৪/৭ গ্রাহক সহায়তা',
                desc: 'বুকিংয়ের আগে, ভ্রমণের সময় এবং প্রয়োজনে পরবর্তী সময়েও আমাদের সাপোর্ট টিম পাশে থাকবে।',
                badge: '২৪/৭ সাপোর্ট',
              },
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 bg-red-50 text-[#DC2626] rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md mb-2">
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-extrabold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------- TYPES OF HOTELS WE BOOK ------------------- */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase font-sans">
              আমরা যেসব ধরনের হোটেল বুকিং করি
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 font-medium">
              আপনার প্রয়োজন ও বাজেটের সাথে সামঞ্জস্য রেখে প্রতিটি ক্যাটাগরিতে সেরা প্রস্তাব
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: '⭐⭐⭐ Budget Hotels',
                desc: 'সাশ্রয়ী মূল্যে পরিষ্কার, নিরাপদ এবং আরামদায়ক আবাসন। একা বা ছোট বাজেটের জন্য উপযুক্ত।',
                tag: 'বাজেট ফ্রেন্ডলি',
                color: 'border-blue-200 bg-blue-50/50',
                btnText: 'বাজেট হোটেল দেখুন',
                cat: 'budget',
              },
              {
                title: '⭐⭐⭐⭐ Premium Hotels',
                desc: 'আধুনিক সুযোগ-সুবিধা, উন্নত সেবা, সুস্বাদু খাবার এবং পরিবারের জন্য আদর্শ আবাসন পরিবেশ।',
                tag: 'পারিবারিক পছন্দ',
                color: 'border-emerald-200 bg-emerald-50/50',
                btnText: 'প্রিমিয়াম হোটেল দেখুন',
                cat: 'family',
              },
              {
                title: '⭐⭐⭐⭐⭐ Luxury Hotels',
                desc: 'বিশ্বমানের আতিথেয়তা, প্রিমিয়াম লোকেশন, বিশ্বখ্যাত শেফ রেস্তোরাঁ ও বিলাসবহুল অভিজ্ঞতা।',
                tag: 'বিলাসবহুল ৫-স্টার',
                color: 'border-amber-200 bg-amber-50/50',
                btnText: 'লাক্সারি হোটেল দেখুন',
                cat: 'luxury',
              },
              {
                title: '🏖️ Resorts',
                desc: 'ছুটি, অবকাশ যাপন, সমুদ্র সৈকত এবং হানিমুনের জন্য মনোরম পরিবেশের প্রিমিয়াম রিসোর্ট।',
                tag: 'হানিমুন ও রিসোর্ট',
                color: 'border-cyan-200 bg-cyan-50/50',
                btnText: 'রিসোর্ট কালেকশন দেখুন',
                cat: 'resort',
              },
              {
                title: '🏢 Business Hotels',
                desc: 'ব্যবসায়িক ভ্রমণকারীদের জন্য সুবিধাজনক লোকেশন, হাই-স্পিড ওয়াইফাই ও মিটিং রুম সুবিধা।',
                tag: 'কর্পোরেট স্পেশাল',
                color: 'border-purple-200 bg-purple-50/50',
                btnText: 'বিজনেস হোটেল দেখুন',
                cat: 'business',
              },
              {
                title: '👨‍👩‍👧 Family Hotels',
                desc: 'পরিবারের জন্য বড় রুম, স্পেসিয়াস ফ্যামিলি স্যুট, শিশু-বান্ধব পরিবেশ ও অতিরিক্ত সুবিধা।',
                tag: 'ফ্যামিলি স্যুট',
                color: 'border-[#DC2626]/20 bg-red-50/50',
                btnText: 'ফ্যামিলি হোটেল দেখুন',
                cat: 'family',
              },
              {
                title: '🕌 Umrah Hotels',
                desc: 'মক্কা ও মদিনায় হারামের নিকটবর্তী বিভিন্ন মানের (৩★, ৪★ ও ৫★) হারাম ভিউ হোটেল।',
                tag: 'হারাম সংলগ্ন',
                color: 'border-amber-300 bg-amber-50/70',
                btnText: 'উমরাহ হোটেল দেখুন',
                cat: 'umrah',
              },
              {
                title: '🏢 Serviced Apartments',
                desc: 'দীর্ঘমেয়াদী থাকার জন্য কিচেন, ওয়াশিং মেশিনসহ নিজস্ব ফ্ল্যাটের মতো অনুভূতি।',
                tag: 'লং স্টে অপশন',
                color: 'border-slate-200 bg-slate-50/50',
                btnText: 'অ্যাপার্টমেন্টস দেখুন',
                cat: 'all',
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`p-5 rounded-2xl border ${card.color} shadow-sm hover:shadow-md transition-all flex flex-col justify-between`}
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-white text-gray-800 rounded-md shadow-xs border border-gray-200 mb-3 inline-block">
                    {card.tag}
                  </span>
                  <h3 className="text-base font-extrabold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">{card.desc}</p>
                </div>
                <button
                  onClick={() => {
                    setActiveHotelTab(card.cat);
                    const elem = document.getElementById('featured-hotels-section');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2 bg-white hover:bg-gray-100 text-gray-900 font-bold text-xs rounded-xl border border-gray-300 shadow-xs flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                >
                  <span>{card.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-red-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------- FEATURED HOTELS CATALOGUE (BOOKING.COM STYLE) ------------------- */}
      <section id="featured-hotels-section" className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-red-100 text-[#B71C1C] rounded-md text-xs font-bold mb-2">
                <Hotel className="w-3.5 h-3.5" />
                <span>জনপ্রিয় হোটেল কালেকশন</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase font-sans">
                টপ-রেটেড আন্তর্জাতিক হোটেলসমূহ
              </h2>
            </div>

            {/* Hotel Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-xs">
              {[
                { label: 'সব হোটেল', cat: 'all' },
                { label: '🕌 উমরাহ (মক্কা-মদিনা)', cat: 'umrah' },
                { label: '⭐⭐⭐⭐⭐ লাক্সারি', cat: 'luxury' },
                { label: '🏖️ রিসোর্ট', cat: 'resort' },
                { label: '🏢 বিজনেস', cat: 'business' },
                { label: '👨‍👩‍👧 ফ্যামিলি', cat: 'family' },
              ].map((tab) => (
                <button
                  key={tab.cat}
                  onClick={() => setActiveHotelTab(tab.cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    activeHotelTab === tab.cat
                      ? 'bg-[#DC2626] text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hotel Grid */}
          {filteredHotels.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-gray-200 max-w-lg mx-auto">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800">কোনো হোটেল পাওয়া যায়নি</h3>
              <p className="text-xs text-gray-500 mt-1">
                আপনার ফিল্টার বা বাজেটের সাথে মিল পাওয়া যায়নি। দয়া করে অনুসন্ধান পরিবর্তন করুন অথবা সরাসরি আমাদের টিমকে লিখুন।
              </p>
              <button
                onClick={() => {
                  setSearchDestination('');
                  setActiveHotelTab('all');
                  setMaxPrice(60000);
                }}
                className="mt-4 px-4 py-2 bg-[#DC2626] text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                ফিল্টার রিসেট করুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  onClick={() => handleSelectHotel(hotel)}
                >
                  <div>
                    {/* Image & Badge Overlay */}
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <img
                        src={hotel.image}
                        alt={hotel.nameEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1">
                        <span>{hotel.flag}</span>
                        <span>{hotel.cityBn}</span>
                      </div>
                      <div className="absolute top-3 right-3 bg-amber-400 text-gray-900 px-2 py-0.5 rounded-md text-[11px] font-black shadow-md flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-gray-900 text-gray-900" />
                        <span>{hotel.stars}-Star</span>
                      </div>
                    </div>

                    {/* Body Info */}
                    <div className="p-4 space-y-2.5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-extrabold text-sm text-gray-900 line-clamp-1 group-hover:text-[#DC2626] transition-colors">
                            {hotel.nameBn}
                          </h3>
                          <p className="text-[11px] text-gray-500 font-semibold">{hotel.nameEn}</p>
                        </div>
                      </div>

                      {/* Location & Rating */}
                      <div className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg border border-gray-100">
                        <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <span className="text-[11px] font-semibold line-clamp-1">{hotel.distanceInfo}</span>
                      </div>

                      {/* Amenities Pills */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {hotel.breakfastIncluded && (
                          <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 flex items-center space-x-0.5">
                            <Coffee className="w-2.5 h-2.5" />
                            <span>ব্রেকফাস্ট ফ্রি</span>
                          </span>
                        )}
                        {hotel.freeCancellation && (
                          <span className="text-[10px] font-bold bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                            ফ্রি ক্যানসেলেশন
                          </span>
                        )}
                        <span className="text-[10px] font-bold bg-purple-50 text-purple-800 px-2 py-0.5 rounded border border-purple-200">
                          {hotel.rating}★ ({hotel.reviewsCount})
                        </span>
                      </div>

                      <p className="text-[11px] text-gray-600 line-clamp-2 pt-1 font-normal">
                        {hotel.descriptionBn}
                      </p>
                    </div>
                  </div>

                  {/* Pricing Footer & Book CTA */}
                  <div className="p-4 pt-0 border-t border-gray-100 mt-2 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold block">প্রতি রাত থেকে</span>
                      <span className="text-base font-black text-[#DC2626]">
                        {formatPrice(hotel.priceBDT)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectHotel(hotel);
                        }}
                        className="px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white font-extrabold text-[11px] rounded-xl transition-all cursor-pointer"
                      >
                        বিস্তারিত
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectHotel(hotel);
                        }}
                        className="px-3 py-2 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold text-[11px] rounded-xl shadow-xs transition-all cursor-pointer"
                      >
                        বুক করুন
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ------------------- POPULAR DESTINATIONS GRID ------------------- */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase font-sans">
              জনপ্রিয় গন্তব্যসমূহ (Popular Destinations)
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 font-medium">
              বিশ্বের সবচেয়ে কাঙ্ক্ষিত শহরে আপনার পছন্দের আবাসন নিশ্চিত করুন
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_DESTINATIONS.map((dest, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-72 flex flex-col justify-end p-5 cursor-pointer border border-gray-200"
                onClick={() => {
                  setSelectedCitySlug(dest.slug);
                  setSearchDestination('');
                  const elem = document.getElementById('city-landing-hero-section') || document.getElementById('featured-hotels-section');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {/* Image Background */}
                <img
                  src={dest.image}
                  alt={dest.cityBn}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content */}
                <div className="relative z-10 text-white space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{dest.flag}</span>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                      {dest.countryEn}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white leading-tight">
                    {dest.cityBn} ({dest.cityEn})
                  </h3>
                  <p className="text-xs text-gray-200 line-clamp-1 font-medium">{dest.tagline}</p>

                  <div className="pt-2 flex items-center justify-between border-t border-white/20">
                    <span className="text-xs font-extrabold text-amber-200">
                      শুরু ৳{dest.startingPriceBDT.toLocaleString('en-BD')}/রাত
                    </span>
                    <span className="text-[10px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-white font-bold">
                      {dest.hotelCount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <PriceNotice variant="banner" className="mt-8" />
        </div>
      </section>

      {/* ------------------- INCLUDED SERVICES & AMENITIES GRID ------------------- */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Column: What's Included */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#DC2626] bg-red-50 px-3 py-1 rounded-full border border-red-200">
                  Services Included
                </span>
                <h3 className="text-xl font-black text-gray-900 mt-2">
                  আমাদের হোটেল বুকিং সেবার অন্তর্ভুক্ত
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'বিশ্বব্যাপী হোটেল অনুসন্ধান',
                  'রুম রিজার্ভেশন কনফার্মেশন',
                  'Luxury ও Budget Hotel Booking',
                  'Airport Hotel Booking',
                  'Family Room Booking',
                  'Group Hotel Reservation',
                  'Corporate Hotel Booking',
                  'Honeymoon Resort Booking',
                  'Long Stay Accommodation',
                  'Serviced Apartment Booking',
                  'Early Check-in / Late Check-out অনুরোধ',
                  'Airport Transfer Arrangement',
                  'Breakfast Included Options',
                  'Free Cancellation Options',
                ].map((inc, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs font-bold text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Hotel Amenities */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#DC2626] bg-red-50 px-3 py-1 rounded-full border border-red-200">
                  Hotel Facilities
                </span>
                <h3 className="text-xl font-black text-gray-900 mt-2">
                  হোটেল সুবিধাসমূহ (Hotel Amenities)
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  হোটেলভেদে নিম্নোক্ত বিশ্বমানের সুবিধাগুলো পাওয়া যেতে পারে—
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Free Wi-Fi', icon: Wifi },
                  { name: 'Complimentary Breakfast', icon: Coffee },
                  { name: 'Swimming Pool', icon: Waves },
                  { name: 'Fitness Center', icon: Dumbbell },
                  { name: 'Spa & Wellness', icon: Sparkles },
                  { name: 'Restaurant', icon: Utensils },
                  { name: 'Room Service', icon: BedDouble },
                  { name: 'Meeting Room', icon: Briefcase },
                  { name: 'Airport Shuttle', icon: Car },
                  { name: 'Free Parking', icon: Car },
                  { name: '24-Hour Reception', icon: Clock },
                  { name: 'Concierge Service', icon: HeartHandshake },
                ].map((item, idx) => {
                  const IconC = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 p-2.5 bg-gray-50 rounded-xl border border-gray-100 text-xs font-semibold text-gray-800"
                    >
                      <IconC className="w-4 h-4 text-red-600 shrink-0" />
                      <span className="line-clamp-1">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------- BOOKING PROCESS (STEP 01 to 06) ------------------- */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase font-sans">
              সহজ ৬-ধাপের হোটেল বুকিং প্রক্রিয়া
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 font-medium">
              আপনার চাহিদা অনুযায়ী পছন্দের হোটেল বুক করার সবচেয়ে সহজ উপায়
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              { step: '01', title: 'তথ্য জানান', desc: 'আপনার গন্তব্য, ভ্রমণের তারিখ এবং বাজেট আমাদের জানান।' },
              { step: '02', title: 'অপশন প্রদান', desc: 'আমাদের টিম আপনার জন্য উপযুক্ত হোটেল অপশন প্রস্তুত করবে।' },
              { step: '03', title: 'হোটেল নির্বাচন', desc: 'আপনার পছন্দের হোটেলটি নির্বাচন করুন।' },
              { step: '04', title: 'তথ্য নিশ্চিত', desc: 'প্রয়োজনীয় অতিথি তথ্য ও বুকিং ডিটেইলস নিশ্চিত করুন।' },
              { step: '05', title: 'পেমেন্ট সম্পন্ন', desc: 'সহজ ও নিরাপদ মাধ্যমে পেমেন্ট সম্পন্ন করুন।' },
              { step: '06', title: 'ভাউচার গ্রহণ', desc: 'ইমেইল ও WhatsApp-এ Booking Confirmation গ্রহণ করুন।' },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-5 rounded-2xl border border-gray-200 text-center relative group hover:bg-red-50/50 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-[#DC2626] text-white font-black text-sm rounded-full flex items-center justify-center mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform">
                  {step.step}
                </div>
                <h3 className="text-sm font-extrabold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-[11px] text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------- WHY BOOK EARLY & SPECIALIZED SERVICES ------------------- */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Why Book Early */}
            <div className="bg-gradient-to-br from-[#8B0000] to-[#B71C1C] text-white p-7 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                  Smart Travel Tip
                </span>
                <h3 className="text-2xl font-black mt-3 mb-4">কেন আগেভাগে বুকিং করবেন?</h3>
                <ul className="space-y-3 text-xs sm:text-sm text-red-100">
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-300 font-bold">✔</span>
                    <span><strong>আরও ভালো রেট পাওয়ার সম্ভাবনা:</strong> আগে বুকিংয়ে হোটেলগুলো ডিসকাউন্ট রেট দেয়।</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-300 font-bold">✔</span>
                    <span><strong>বেশি হোটেল অপশন:</strong> পছন্দের রুম টাইপ ও ক্যাটাগরি খালি পাওয়া যায়।</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-300 font-bold">✔</span>
                    <span><strong>জনপ্রিয় হোটেলে রুম নিশ্চিতকরণ:</strong> পিক সিজনে হোটেল ফুল হওয়া থেকে বাঁচায়।</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-300 font-bold">✔</span>
                    <span><strong>ভ্রমণ পরিকল্পনা সহজ হয়:</strong> হঠাৎ মূল্য বৃদ্ধির ঝুঁকি কমে যায়।</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-white/20">
                <button
                  onClick={() => {
                    const elem = document.getElementById('hotel-inquiry-form');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-black text-xs uppercase rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  আজই আগাম বুকিং রিকোয়েস্ট পাঠান
                </button>
              </div>
            </div>

            {/* Specialized Services */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626] bg-red-50 px-3 py-1 rounded-full border border-red-200">
                  Special Add-Ons
                </span>
                <h3 className="text-2xl font-black text-gray-900 mt-3 mb-4">আমাদের বিশেষ সেবা</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center space-x-2 text-sm font-extrabold text-gray-900 mb-1">
                      <span className="text-lg">✈️</span>
                      <span>Flight + Hotel Combo</span>
                    </div>
                    <p className="text-xs text-gray-600">একসাথে ফ্লাইট ও হোটেল বুকিং করে পান আকর্ষণীয় প্যাকেজ ছাড়।</p>
                  </div>

                  <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center space-x-2 text-sm font-extrabold text-gray-900 mb-1">
                      <span className="text-lg">🛂</span>
                      <span>Visa + Hotel Assistance</span>
                    </div>
                    <p className="text-xs text-gray-600">ভিসা আবেদনের জন্য অফিশিয়াল হোটেল ভাউচার সহায়তা।</p>
                  </div>

                  <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center space-x-2 text-sm font-extrabold text-gray-900 mb-1">
                      <span className="text-lg">🕋</span>
                      <span>Umrah Hotel Packages</span>
                    </div>
                    <p className="text-xs text-gray-600">মক্কা ও মদিনায় বিভিন্ন বাজেটের ৩-৫ তারকা হোটেল কাস্টমাইজড প্যাকেজ।</p>
                  </div>

                  <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center space-x-2 text-sm font-extrabold text-gray-900 mb-1">
                      <span className="text-lg">💼</span>
                      <span>Corporate Hotel Solutions</span>
                    </div>
                    <p className="text-xs text-gray-600">প্রতিষ্ঠান ও ব্যবসায়িক প্রতিনিধিদের জন্য স্পেশাল বুকিং ও ইনভয়েসিং।</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------- FAQ ACCORDION SECTION ------------------- */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase font-sans">
              প্রায়শই জিজ্ঞাসিত প্রশ্ন (FAQ)
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 font-medium">
              হোটেল বুকিং সংক্রান্ত সাধারণ প্রশ্নের নির্ভরযোগ্য উত্তর
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'আমি কি নির্দিষ্ট হোটেল নির্বাচন করতে পারব?',
                a: 'অবশ্যই। আপনি চাইলে নির্দিষ্ট হোটেলের নাম জানাতে পারেন অথবা আমরা আপনার বাজেট অনুযায়ী কয়েকটি উপযুক্ত বিকল্প প্রস্তাব করব।',
              },
              {
                q: 'বুকিং নিশ্চিত হতে কত সময় লাগে?',
                a: 'বেশিরভাগ ক্ষেত্রে আমাদের টিম থেকে খুব দ্রুত কনফার্মেশন প্রদান করা হয় এবং আপনি ইমেইল ও হোয়াটসঅ্যাপে ভাউচার পেয়ে যাবেন।',
              },
              {
                q: 'হোটেল বুকিং পরিবর্তন বা বাতিল করা যাবে?',
                a: 'এটি সংশ্লিষ্ট হোটেলের নীতিমালার উপর নির্ভরশীল। বুকিংয়ের আগে আমরা আপনাকে সেই শর্তগুলো (Free Cancellation Policy) জানিয়ে দেব।',
              },
              {
                q: 'Breakfast কি অন্তর্ভুক্ত থাকে?',
                a: 'হোটেল ও নির্বাচিত রুম প্ল্যান অনুযায়ী Breakfast অন্তর্ভুক্ত বা বাদ থাকতে পারে। বুকিংয়ের সময় অপশন নির্বাচন করা যায়।',
              },
              {
                q: 'ভিসা আবেদনের জন্য হোটেল কনফার্মেশন ভাউচার কি দেওয়া হয়?',
                a: 'হ্যাঁ, দূতাবাস বা ভিসা সেন্টারে জমা দেওয়ার জন্য ড্রিমস ফ্লাই ইন্টারন্যাশনাল থেকে অফিশিয়াল কনফার্মেশন ভাউচার প্রদান করা হয়।',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-sm text-gray-900 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <span className="flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      openFaqIndex === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="p-4 bg-white text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------- DIRECT INQUIRY & RESERVATION FORM ------------------- */}
      <section id="hotel-inquiry-form" className="py-12 bg-gray-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
                  Contact Us Worldwide
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mt-3 text-white uppercase font-sans">
                  আপনার পরবর্তী ভ্রমণের জন্য আজই হোটেল বুক করুন
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
                  Dreams Fly International-এর মাধ্যমে বিশ্বের যেকোনো শহরে নিরাপদ ও মানসম্মত হোটেল বুকিং সার্ভিস গ্রহণ করুন।
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center space-x-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <PhoneCall className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-gray-400">Phone Hotline</span>
                    <a href="tel:+8801771304219" className="font-extrabold text-white hover:text-amber-300">
                      +880 1771-304219
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-gray-400">Official Email</span>
                    <a href="mailto:dreamsflyinternational@gmail.com" className="font-extrabold text-white hover:text-amber-300">
                      dreamsflyinternational@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <Globe className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-gray-400">Official Website</span>
                    <a href="https://dreamsfly.net/" target="_blank" rel="noopener noreferrer" className="font-extrabold text-white hover:text-amber-300">
                      https://dreamsfly.net/
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-950/60 rounded-2xl border border-red-800/50 text-xs text-red-200">
                <strong className="text-white block mb-1">Dreams Fly International</strong>
                Your Trusted Hotel Booking Partner Worldwide.
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-7 bg-white text-gray-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100">
              <h3 className="text-xl font-black text-gray-900 mb-1">
                অনলাইন হোটেল বুকিং অনুসন্ধান (Hotel Inquiry Form)
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                ফর্মটি পূরণ করুন; আমাদের সিনিয়র কনসালট্যান্ট ১৫ মিনিটের মধ্যে মেসেজ/কল দেবেন।
              </p>

              {inquirySubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-emerald-900">ধন্যবাদ! বুকিং রিকোয়েস্ট গৃহীত হয়েছে।</h4>
                  <p className="text-xs text-emerald-700">
                    আপনার হোটেল অনুসন্ধানের তথ্য সফলভাবে আমাদের ইমেইল সিস্টেমে প্রেরিত হয়েছে। আমাদের প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবেন।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">আপনার পূর্ণ নাম *</label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: মোঃ কামরুল হাসান"
                        value={inquiryForm.fullName}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-900 focus:ring-2 focus:ring-[#DC2626] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">মোবাইল / হোয়াটসঅ্যাপ নম্বর *</label>
                      <input
                        type="tel"
                        required
                        placeholder="017XXXXXXXX"
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-900 focus:ring-2 focus:ring-[#DC2626] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">ইমেইল অ্যাড্রেস</label>
                      <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-900 focus:ring-2 focus:ring-[#DC2626] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">গন্তব্য শহর/দেশ *</label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: Makkah, Dubai, Bangkok"
                        value={inquiryForm.destination}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, destination: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-900 focus:ring-2 focus:ring-[#DC2626] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">চেক-ইন তারিখ</label>
                      <input
                        type="date"
                        value={inquiryForm.checkInDate}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, checkInDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-900 focus:ring-2 focus:ring-[#DC2626] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">চেক-আউট তারিখ</label>
                      <input
                        type="date"
                        value={inquiryForm.checkOutDate}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, checkOutDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-900 focus:ring-2 focus:ring-[#DC2626] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">হোটেল স্টার ক্যাটাগরি</label>
                      <select
                        value={inquiryForm.roomType}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, roomType: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-900 focus:ring-2 focus:ring-[#DC2626] outline-none"
                      >
                        <option value="⭐⭐⭐⭐ Premium Hotel">⭐⭐⭐⭐ 4-Star Premium</option>
                        <option value="⭐⭐⭐⭐⭐ Luxury Hotel">⭐⭐⭐⭐⭐ 5-Star Luxury</option>
                        <option value="🕌 Umrah Haram View">🕌 Umrah Haram View Hotel</option>
                        <option value="🏖️ Resort">🏖️ Beach Resort</option>
                        <option value="⭐⭐⭐ Budget Hotel">⭐⭐⭐ 3-Star Budget</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">বিশেষ কোনো অনুরোধ বা বাজেট নোট</label>
                    <textarea
                      rows={2}
                      placeholder="যেমন: হারামের কাছে হতে হবে / সুইমিং পুল সুবিধা প্রয়োজন..."
                      value={inquiryForm.notes}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-900 focus:ring-2 focus:ring-[#DC2626] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingInquiry}
                    className="w-full py-3.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-black text-sm uppercase rounded-2xl shadow-xl flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmittingInquiry ? 'প্রসেস করা হচ্ছে...' : 'হোটেল বুকিং রিকোয়েস্ট পাঠান'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------- INDIVIDUAL HOTEL DEDICATED DETAIL PAGE ------------------- */}
      {selectedHotelModal && (
        <HotelDetailPageModal
          hotel={selectedHotelModal}
          currency={currency}
          onClose={handleCloseHotelModal}
          onOpenBookingModal={onOpenBookingModal}
          onSelectOtherHotel={(hotelId) => {
            const found = FEATURED_HOTELS.find((h) => h.id === hotelId);
            if (found) setSelectedHotelModal(found);
          }}
        />
      )}
    </div>
  );
};
