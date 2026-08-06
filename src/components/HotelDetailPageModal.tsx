import React, { useState } from 'react';
import { PriceNotice } from './PriceNotice';
import {
  Hotel,
  MapPin,
  Star,
  Coffee,
  CheckCircle2,
  X,
  PhoneCall,
  Mail,
  Globe,
  MessageCircle,
  Clock,
  ShieldCheck,
  Building2,
  Send,
  BedDouble,
  Users,
  Calendar,
  Sparkles,
  ArrowLeft,
  Share2,
  Check,
  Wifi,
  Waves,
  Dumbbell,
  Utensils,
  Car,
  ChevronRight,
  HelpCircle,
  FileText
} from 'lucide-react';
import { HotelItem, FEATURED_HOTELS } from '../data/hotels';

interface HotelDetailPageModalProps {
  hotel: HotelItem;
  currency?: 'BDT' | 'USD';
  onClose: () => void;
  onOpenBookingModal?: (serviceType?: string) => void;
  onSelectOtherHotel?: (hotelId: string) => void;
}

export const HotelDetailPageModal: React.FC<HotelDetailPageModalProps> = ({
  hotel,
  currency = 'BDT',
  onClose,
  onOpenBookingModal,
  onSelectOtherHotel
}) => {
  const [activeImage, setActiveImage] = useState<string>(
    hotel.image || (hotel.gallery && hotel.gallery.length > 0 ? hotel.gallery[0] : '')
  );
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'rooms' | 'policies'>('overview');
  
  // Reservation Form State
  const [bookingForm, setBookingForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    roomType: 'Deluxe City/Kaaba View Room',
    guests: '2 Adults, 1 Room',
    specialRequest: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Gallery images array including main image
  const allImages = React.useMemo(() => {
    const list = [hotel.image];
    if (hotel.gallery && hotel.gallery.length > 0) {
      hotel.gallery.forEach((g) => {
        if (g && !list.includes(g)) list.push(g);
      });
    }
    // Add default hotel fallback images if list length is small
    if (list.length < 3) {
      const fallbacks = [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      ];
      fallbacks.forEach((f) => {
        if (list.length < 4 && !list.includes(f)) list.push(f);
      });
    }
    return list;
  }, [hotel]);

  const formatPrice = (priceBDT: number) => {
    if (currency === 'USD') {
      return `$${Math.round(priceBDT / 120)}`;
    }
    return `৳${priceBDT.toLocaleString('en-BD')}`;
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.fullName || !bookingForm.phone) return;

    setIsSubmitting(true);
    try {
      await fetch('/api/inquiry/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Individual Hotel Dedicated Reservation',
          hotelId: hotel.id,
          hotelNameEn: hotel.nameEn,
          hotelNameBn: hotel.nameBn,
          city: hotel.cityEn,
          stars: hotel.stars,
          pricePerNight: formatPrice(hotel.priceBDT),
          ...bookingForm,
        }),
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('Hotel direct reservation error:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleWhatsApp = () => {
    const text = `আসসালামু আলাইকুম, আমি ${hotel.nameBn} (${hotel.nameEn}, ${hotel.cityBn}) হোটেলের বুকিং সম্পর্কিত তথ্য জানতে চাই।`;
    window.open(`https://wa.me/8801771304219?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Related hotels in same city or category
  const relatedHotels = FEATURED_HOTELS.filter(
    (h) => h.id !== hotel.id && (h.cityEn === hotel.cityEn || h.category === hotel.category)
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md overflow-y-auto flex items-start justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-300">
      <div className="bg-white text-gray-900 rounded-3xl max-w-5xl w-full shadow-2xl border border-gray-200 overflow-hidden my-auto relative">
        {/* Sticky Top Header / Navigation Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 py-3 sm:px-6 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-gray-900" />
              <span className="text-xs font-bold hidden sm:inline">ফিরে যান</span>
            </button>
            <div className="text-left">
              <span className="text-[10px] font-bold text-[#DC2626] uppercase tracking-wider block">
                {hotel.flag} {hotel.cityBn} • {hotel.stars}-Star Hotel Page
              </span>
              <h2 className="text-sm sm:text-base font-black text-gray-900 line-clamp-1">
                {hotel.nameBn} ({hotel.nameEn})
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyLink}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer"
              title="শেয়ার লিংক কপি করুন"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600 hidden sm:inline">কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-red-50 hover:bg-red-100 text-[#DC2626] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Main Hero & Gallery Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Interactive Image Gallery */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-gray-200 bg-gray-900 shadow-md">
                <img
                  src={activeImage || hotel.image}
                  alt={hotel.nameEn}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-xl text-xs font-black flex items-center space-x-1.5 shadow-lg">
                  <span>{hotel.flag}</span>
                  <span>{hotel.cityBn}, {hotel.country}</span>
                </div>
                <div className="absolute top-3 right-3 bg-amber-400 text-gray-900 px-3 py-1 rounded-xl text-xs font-black shadow-lg flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 fill-gray-900 text-gray-900" />
                  <span>{hotel.stars}-Star Hotel</span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      activeImage === img ? 'border-[#DC2626] scale-105 shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Hotel Card Brief Summary */}
            <div className="lg:col-span-5 bg-gradient-to-br from-red-50/60 via-white to-amber-50/40 p-5 sm:p-6 rounded-2xl border border-red-100 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 bg-red-100 text-[#B71C1C] rounded-md border border-red-200">
                    {hotel.category === 'umrah' ? '🕌 উমরাহ স্পেশাল হারাম হোটেল' : `${hotel.stars}-Star Accommodation`}
                  </span>
                  <div className="flex items-center space-x-1 text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{hotel.rating} / 5.0</span>
                    <span className="text-[10px] text-gray-500">({hotel.reviewsCount} রিভিউ)</span>
                  </div>
                </div>

                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                    {hotel.nameBn}
                  </h1>
                  <p className="text-xs text-gray-500 font-semibold">{hotel.nameEn}</p>
                </div>

                <div className="flex items-start space-x-2 bg-white p-3 rounded-xl border border-gray-200 text-xs text-gray-700">
                  <MapPin className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold block text-gray-900">অবস্থান ও দূরত্ব:</span>
                    <span className="text-xs font-medium">{hotel.distanceInfo}</span>
                  </div>
                </div>

                {/* Key Inclusions */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {hotel.breakfastIncluded && (
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-900 px-3 py-1 rounded-lg border border-emerald-200 flex items-center space-x-1">
                      <Coffee className="w-3.5 h-3.5 text-emerald-700" />
                      <span>বুফে ব্রেকফাস্ট ফ্রি</span>
                    </span>
                  )}
                  {hotel.freeCancellation && (
                    <span className="text-xs font-bold bg-blue-100 text-blue-900 px-3 py-1 rounded-lg border border-blue-200 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                      <span>ফ্রি বাতিল সুবিধা</span>
                    </span>
                  )}
                </div>

                {/* Pricing Box */}
                <div className="p-4 bg-white rounded-2xl border border-red-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 font-extrabold uppercase block">বিশেষ অফার রেট</span>
                    <span className="text-2xl font-black text-[#DC2626]">
                      {formatPrice(hotel.priceBDT)}
                    </span>
                    <span className="text-[10px] text-gray-500 block font-bold">/ প্রতি রাত (সকল ট্যাক্সসহ)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 block mb-1">
                      ইনস্ট্যান্ট বুকিং এভেলেবল
                    </span>
                    <span className="text-[10px] text-gray-400">USD Rate: ${hotel.priceUSD} / Night</span>
                  </div>
                </div>

                <PriceNotice variant="compact" />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    const elem = document.getElementById('hotel-direct-reservation-form');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-3 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold text-xs uppercase rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>এখনই রুম বুক করুন</span>
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>হোয়াটসঅ্যাপ মেসেজ</span>
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="border-b border-gray-200 flex items-center gap-2 overflow-x-auto pt-2">
            {[
              { id: 'overview', label: 'ওভারভিউ ও বিবরণ' },
              { id: 'amenities', label: 'সুযোগ-সুবিধা (Facilities)' },
              { id: 'rooms', label: 'রুম ক্যাটাগরি ও রেট' },
              { id: 'policies', label: 'হোটেল পলিসি ও নিয়মাবলী' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 font-black text-xs transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#DC2626] text-[#DC2626]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed animate-in fade-in duration-200">
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3">
                <h3 className="text-base font-black text-gray-900 flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-[#DC2626]" />
                  <span>{hotel.nameBn} সম্পর্কে বিস্তারক তথ্য</span>
                </h3>
                <p>{hotel.descriptionBn}</p>
                <p>
                  <strong>Dreams Fly International</strong>-এর বিশেষ হোটেল বুকিং চুক্তির আওতায় আপনি এই হোটেলে সেরা ছাড়ে এবং ১০০% কনফার্মড বুকিং ভাউচার সুবিধায় অবস্থান করতে পারবেন। ভিসার আবেদনের জন্য এই হোটেলের অফিসিয়াল কনফার্মড রিজার্ভেশন কপি প্রদান করা হয়।
                </p>
              </div>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-red-50/50 rounded-2xl border border-red-100 flex items-start space-x-3">
                  <ShieldCheck className="w-6 h-6 text-[#DC2626] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-xs">অফিসিয়াল ভাউচার গ্যারান্টি</h4>
                    <p className="text-[11px] text-gray-600 mt-0.5">এম্বাসি ফাইল ও উমরাহ ভিসার জন্য গ্রহণযোগ্য বৈধ হোটেল ভাউচার।</p>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-start space-x-3">
                  <Clock className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-xs">২৪ ঘণ্টা সাপোর্ট সাপোর্ট</h4>
                    <p className="text-[11px] text-gray-600 mt-0.5">হোটেল চেক-ইন ও অবস্থানের সময়ে যেকোনো সাহায্যে আমাদের হেল্পলাইন ২৪/৭ খোলা।</p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100 flex items-start space-x-3">
                  <Sparkles className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-xs">ভিআইপি চেক-ইন সুবিধা</h4>
                    <p className="text-[11px] text-gray-600 mt-0.5">আমাদের মাধ্যমে বুকিং করা যাত্রীদের দ্রুত চেক-ইন ও বিশেষ অগ্রাধিকার প্রদান।</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'amenities' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-sm font-black text-gray-900">হোটেলের প্রধান প্রধান সুযোগ-সুবিধা ও সার্ভিসসমূহ:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
                {hotel.amenities.map((amenity, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center space-x-2 font-bold text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center space-x-2 font-bold text-gray-800">
                  <Wifi className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>High-Speed Wi-Fi</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center space-x-2 font-bold text-gray-800">
                  <Utensils className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Halal Dining & Buffet</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center space-x-2 font-bold text-gray-800">
                  <Clock className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>24/7 Front Desk & Concierge</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center space-x-2 font-bold text-gray-800">
                  <Car className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Airport Transfer Assistance</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rooms' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-sm font-black text-gray-900">উপলব্ধ রুম টাইপ ও রেট টেবিল:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {[
                  {
                    title: 'Standard Double / Twin Room',
                    desc: '২ জন প্রাপ্তবয়স্ক মানুষের জন্য ১টি কিংশাইজ বা ২টি টুইন বেডসহ সুসজ্জিত রুম।',
                    price: formatPrice(hotel.priceBDT),
                    badge: 'মোস্ট পপুলার',
                  },
                  {
                    title: 'Deluxe City / Kaaba View Room',
                    desc: 'বাইরের চমৎকার দৃষ্টিনন্দন ভিউ, বেশি জায়গা ও বিলাসবহুল বাথরুম সুবিধা।',
                    price: formatPrice(Math.round(hotel.priceBDT * 1.25)),
                    badge: 'প্রিমিয়াম ভিউ',
                  },
                  {
                    title: 'Executive Family Suite (3-4 Pax)',
                    desc: 'পরিবারের জন্য বিশাল রুম বা ২ বেডরুম কানেক্টিং স্যুট। শিশুদের জন্য আদর্শ।',
                    price: formatPrice(Math.round(hotel.priceBDT * 1.65)),
                    badge: 'ফ্যামিলি প্যাক',
                  },
                  {
                    title: 'VIP Presidential Suite',
                    desc: 'লিভিং রুম, নিজস্ব ডাইনিং, ভিআইপি বাটলার সার্ভিস ও সর্বোচ্চ পর্যায়ের আরাম।',
                    price: formatPrice(Math.round(hotel.priceBDT * 2.3)),
                    badge: 'ভিআইপি চয়েস',
                  },
                ].map((room, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-sm text-gray-900">{room.title}</span>
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">{room.badge}</span>
                      </div>
                      <p className="text-gray-600 text-[11px]">{room.desc}</p>
                    </div>

                    <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                      <span className="font-black text-base text-[#DC2626]">{room.price} <span className="text-[10px] text-gray-400 font-normal">/রাত</span></span>
                      <button
                        onClick={() => {
                          setBookingForm({ ...bookingForm, roomType: room.title });
                          const elem = document.getElementById('hotel-direct-reservation-form');
                          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-3 py-1.5 bg-gray-900 hover:bg-[#DC2626] text-white font-extrabold text-[11px] rounded-lg transition-colors cursor-pointer"
                      >
                        সিলেক্ট করুন
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3 text-xs text-gray-700 leading-relaxed animate-in fade-in duration-200">
              <h3 className="text-sm font-black text-gray-900">হোটেলের মূল নিয়মাবলী ও চেক-ইন পলিসি:</h3>
              <ul className="space-y-2 list-disc pl-4">
                <li><strong>চেক-ইন সময় (Check-in):</strong> সাধারণত দুপুর ০২:০০ টা থেকে। (আগে চেক-ইন চাইলে আগাম বুকিং প্রয়োজন)</li>
                <li><strong>চেক-আউট সময় (Check-out):</strong> দুপুর ১২:০০ টার মধ্যে।</li>
                <li><strong>প্রয়োজনীয় কাগজপত্র:</strong> চেক-ইনের সময় মূল পাসপোর্ট, এনআইডি এবং এম্বাসি/উমরাহ ভিসা কপি প্রদর্শন করতে হবে।</li>
                <li><strong>বাতিলকরণ নীতি (Cancellation Policy):</strong> বুকিং নিশ্চিতকরণের ধরন অনুযায়ী চেক-ইনের ৪৮ ঘণ্টা পূর্ব পর্যন্ত বিনামূল্যে বাতিলের সুযোগ বিদ্যমান।</li>
                <li><strong>শিশু নীতি (Child Policy):</strong> ৬ বছরের কম বয়সী শিশুদের জন্য বিদ্যমান বেডে বিনামূল্যে অবস্থান।</li>
              </ul>
            </div>
          )}

          {/* ---------------- DIRECT HOTEL RESERVATION FORM ---------------- */}
          <div id="hotel-direct-reservation-form" className="bg-gradient-to-br from-[#8B0000] to-[#B71C1C] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/20 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  Direct Hotel Reservation Request
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {hotel.nameBn}-এ রুম রিজার্ভেশন অনুসন্ধান
                </h3>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-xs">
                <span className="block text-amber-300 font-extrabold">গ্যারান্টিড বেস্ট রেট:</span>
                <span className="text-base font-black">{formatPrice(hotel.priceBDT)} / রাত</span>
              </div>
            </div>

            {submitted ? (
              <div className="bg-white text-gray-900 p-6 rounded-2xl text-center space-y-2 animate-in zoom-in-95">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-black text-gray-900">অভিনন্দন! আপনার রিজার্ভেশন রিকোয়েস্ট জমা হয়েছে!</h4>
                <p className="text-xs text-gray-600">
                  আমাদের সিনিয়র হোটেল বুকিং স্পেশালিস্ট ১৫ মিনিটের মধ্যে আপনার দেওয়া মোবাইল/হোয়াটসঅ্যাপ নম্বরে চূড়ান্ত কনফার্মেশন ও ভাউচার অফার নিয়ে যোগাযোগ করবেন।
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-red-100 mb-1">আপনার নাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মোঃ আল-আমিন"
                      value={bookingForm.fullName}
                      onChange={(e) => setBookingForm({ ...bookingForm, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-white text-gray-900 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-red-100 mb-1">মোবাইল / হোয়াটসঅ্যাপ নম্বর *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+৮৮০ ১৭১১-XXXXXX"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white text-gray-900 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-red-100 mb-1">ইমেইল এড্রেস</label>
                    <input
                      type="email"
                      placeholder="yourname@gmail.com"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white text-gray-900 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-red-100 mb-1">চেক-ইন তারিখ</label>
                    <input
                      type="date"
                      value={bookingForm.checkIn}
                      onChange={(e) => setBookingForm({ ...bookingForm, checkIn: e.target.value })}
                      className="w-full px-4 py-3 bg-white text-gray-900 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-red-100 mb-1">চেক-আউট তারিখ</label>
                    <input
                      type="date"
                      value={bookingForm.checkOut}
                      onChange={(e) => setBookingForm({ ...bookingForm, checkOut: e.target.value })}
                      className="w-full px-4 py-3 bg-white text-gray-900 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-red-100 mb-1">রুম ক্যাটাগরি</label>
                    <input
                      type="text"
                      value={bookingForm.roomType}
                      onChange={(e) => setBookingForm({ ...bookingForm, roomType: e.target.value })}
                      className="w-full px-4 py-3 bg-white text-gray-900 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-red-100 mb-1">যাত্রীর সংখ্যা / রুম সংখ্যা</label>
                    <input
                      type="text"
                      value={bookingForm.guests}
                      onChange={(e) => setBookingForm({ ...bookingForm, guests: e.target.value })}
                      placeholder="যেমন: ২ Adults, ১ Room"
                      className="w-full px-4 py-3 bg-white text-gray-900 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-red-100 mb-1">বিশেষ কোনো চাহিদা বা প্রশ্ন</label>
                  <textarea
                    rows={2}
                    value={bookingForm.specialRequest}
                    onChange={(e) => setBookingForm({ ...bookingForm, specialRequest: e.target.value })}
                    placeholder="যেমন: হারাম ভিউ রুম চাই / হুইলচেয়ার প্রয়োজন / এয়ারপোর্ট পিক-আপ ড্রপ..."
                    className="w-full px-4 py-3 bg-white text-gray-900 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-gray-900 font-black text-sm uppercase rounded-2xl shadow-xl flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'প্রসেস করা হচ্ছে...' : 'হোটেল বুকিং রিকোয়েস্ট সাবমিট করুন'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Related / Similar Hotels */}
          {relatedHotels.length > 0 && (
            <div className="pt-4 border-t border-gray-200 space-y-4">
              <h3 className="text-base font-black text-gray-900">
                {hotel.cityBn}-এর অন্যান্য সম্পর্কিত জনপ্রিয় হোটেলসমূহ:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedHotels.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectOtherHotel ? onSelectOtherHotel(rel.id) : null}
                    className="p-3 bg-gray-50 rounded-2xl border border-gray-200 hover:border-[#DC2626] transition-all cursor-pointer flex items-center space-x-3 group"
                  >
                    <img src={rel.image} alt={rel.nameEn} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-extrabold text-xs text-gray-900 group-hover:text-[#DC2626] transition-colors line-clamp-1">
                        {rel.nameBn}
                      </h4>
                      <p className="text-[10px] text-gray-500">{rel.stars}-Star • {rel.rating}★</p>
                      <span className="text-xs font-black text-[#DC2626]">{formatPrice(rel.priceBDT)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
