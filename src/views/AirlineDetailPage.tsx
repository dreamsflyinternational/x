import React, { useState } from 'react';
import { getAirlineById, ALL_AIRLINES, AirlineData } from '../data/airlinesData';
import { CountryFlagSvg } from '../components/CountryFlagSvg';
import { PriceNotice } from '../components/PriceNotice';
import {
  Plane,
  ArrowLeft,
  Calendar,
  Users,
  Luggage,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  Star,
  Globe,
  Building2,
  Clock,
  Sparkles,
  Info,
  ChevronDown,
  Tag,
  AlertTriangle,
  HelpCircle,
  Send,
  MapPin,
  Check,
  Headphones,
  Zap,
  DollarSign
} from 'lucide-react';

interface AirlineDetailPageProps {
  airlineId: string;
  currency?: 'BDT' | 'USD';
  onBack: () => void;
  onSelectAirline: (airlineId: string) => void;
  onOpenBookingModal: (serviceType?: string) => void;
}

export const AirlineDetailPage: React.FC<AirlineDetailPageProps> = ({
  airlineId,
  currency = 'BDT',
  onBack,
  onSelectAirline,
  onOpenBookingModal
}) => {
  const airline: AirlineData = getAirlineById(airlineId) || ALL_AIRLINES[0];

  // Embedded Inquiry Form State
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    origin: 'Dhaka (DAC)',
    destination: '',
    departDate: '',
    returnDate: '',
    passengers: '1',
    cabin: 'Economy',
    specialRequest: ''
  });
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Active Tab / FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleWhatsApp = (text?: string) => {
    const msg = text || `আসসালামু আলাইকুম, আমি ${airline.nameBn} (${airline.name})-এর টিকেট ও ফেয়ার সর্ম্পকে জানতে চাই।`;
    window.open(`https://wa.me/8801771304219?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitting(true);
    try {
      await fetch('/api/inquiry/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: `Direct Airline Quote Request: ${airline.name} (${airline.code})`,
          ...inquiryForm
        })
      });
    } catch (err) {
      console.error('Airline inquiry submit error:', err);
    }
    setInquirySubmitting(false);
    setInquirySubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4 text-red-400" />
            <span>সকল এয়ারলাইনসে ফিরে যান</span>
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 hidden sm:inline">সরাসরি কল করুন:</span>
            <a
              href="tel:+8801771304219"
              className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center space-x-1"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>+880 1771-304219</span>
            </a>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="relative bg-slate-900 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(${airline.heroImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/80" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <CountryFlagSvg countryId={airline.countryId} className="w-8 h-6 rounded-xs border border-white/20 shadow-md" />
            <span className="px-3 py-1 rounded-full bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-sm">
              IATA CODE: {airline.code}
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-xs">
              {airline.badge}
            </span>
            <div className="flex items-center space-x-1 bg-slate-800/80 px-2.5 py-1 rounded-full text-xs text-amber-400 border border-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-black text-white">{airline.rating}</span>
              <span className="text-slate-400">({airline.reviewsCount} রিভিউ)</span>
            </div>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {airline.nameBn} <span className="text-slate-400 text-2xl sm:text-3xl font-normal">({airline.name})</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              {airline.taglineBn}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 max-w-4xl text-xs">
            <div className="bg-slate-800/70 border border-slate-700/60 p-3 rounded-2xl">
              <span className="text-slate-400 block text-[11px]">প্রধান হাব (Main Hub)</span>
              <strong className="text-white font-bold block truncate mt-0.5">{airline.hub}</strong>
            </div>
            <div className="bg-slate-800/70 border border-slate-700/60 p-3 rounded-2xl">
              <span className="text-slate-400 block text-[11px]">বহর ও উড়োজাহাজ</span>
              <strong className="text-white font-bold block truncate mt-0.5">{airline.fleetSize}</strong>
            </div>
            <div className="bg-slate-800/70 border border-slate-700/60 p-3 rounded-2xl">
              <span className="text-slate-400 block text-[11px]">আন্তর্জাতিক গন্তব্য</span>
              <strong className="text-white font-bold block truncate mt-0.5">{airline.destinationsCount}</strong>
            </div>
            <div className="bg-slate-800/70 border border-slate-700/60 p-3 rounded-2xl">
              <span className="text-slate-400 block text-[11px]">টিকিট প্রসেসিং সময়</span>
              <strong className="text-emerald-400 font-bold block truncate mt-0.5">৫-১৫ মিনিটের মধ্যে</strong>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onOpenBookingModal(`${airline.nameBn} (${airline.name}) টিকেট ফেয়ার অনুসন্ধান`)}
              className="px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs sm:text-sm rounded-2xl uppercase tracking-wider transition-all shadow-lg shadow-red-950 flex items-center space-x-2 cursor-pointer"
            >
              <Plane className="w-4 h-4" />
              <span>{airline.nameBn} ফেয়ার কোটেশন বুক করুন</span>
            </button>
            <button
              onClick={() => handleWhatsApp()}
              className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-2xl transition-all flex items-center space-x-2 cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>হোয়াটসঅ্যাপে রেট জানুন</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <PriceNotice />

        {/* OVERVIEW SECTION */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-red-600">
            <Building2 className="w-5 h-5" />
            <h2 className="text-xl font-black text-slate-900">
              {airline.nameBn} সম্পর্কে বিস্তারিত বিবরণ
            </h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            {airline.overviewBn}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
            {airline.specialFeaturesBn.map((feat, idx) => (
              <div key={idx} className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-slate-700">{feat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* POPULAR ROUTES FROM BANGLADESH */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-black text-red-600 uppercase tracking-widest block">
                Top Flight Routes
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                {airline.nameBn}-এর জনপ্রিয় আন্তর্জাতিক রুট ও টিকিট ফেয়ার
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              * ফেয়ার সময় ও সিট প্রাপ্যতার ওপর পরিবর্তনশীল
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {airline.popularRoutes.map((r, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-xs hover:border-red-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${r.isDirect ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                      {r.isDirect ? '✈️ Direct Flight' : '🔄 Connecting Flight'}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      ⏱️ {r.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      {r.destinationBn}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      ফ্লাইট ফ্রিকোয়েন্সি: <strong className="text-slate-700">{r.frequency}</strong>
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-slate-600 pt-1">
                    <div className="flex items-center space-x-1">
                      <Luggage className="w-3.5 h-3.5 text-red-600" />
                      <span>লাগেজ: <strong>{r.baggage}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">শুরু মাত্র</span>
                    <span className="text-lg font-black text-red-600">
                      {currency === 'USD' ? `$${r.priceUSD}` : `৳${r.priceBDT.toLocaleString('bn-BD')}`}
                    </span>
                  </div>
                  <button
                    onClick={() => onOpenBookingModal(`ফ্লাইট বুকিং: ${r.destinationBn} (${airline.name})`)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-sm shadow-red-600/20"
                  >
                    বুক করুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BAGGAGE POLICY SECTION */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-red-400">
              <Luggage className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-widest text-red-400">Official Baggage Policy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {airline.nameBn}-এর ব্যাগেজ এলাউন্স ও নিয়মাবলী
            </h2>
            <p className="text-xs text-slate-300">
              আন্তর্জাতিক ভ্রমণের ক্ষেত্রে ব্যাগেজ সংক্রান্ত সম্পূর্ণ তথ্য
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-800/90 border border-slate-700/80 p-5 rounded-2xl space-y-2">
              <span className="font-extrabold text-amber-400 text-sm block">🧳 ইকোনমি ক্লাস ব্যাগেজ (Economy Class)</span>
              <p className="text-slate-200"><strong>চেকড লাগেজ (Checked):</strong> {airline.baggagePolicy.economyChecked}</p>
              <p className="text-slate-200"><strong>কেবিন লাগেজ (Hand Carry):</strong> {airline.baggagePolicy.economyCabin}</p>
            </div>

            <div className="bg-slate-800/90 border border-slate-700/80 p-5 rounded-2xl space-y-2">
              <span className="font-extrabold text-amber-400 text-sm block">💼 বিজনেস ক্লাস ব্যাগেজ (Business Class)</span>
              <p className="text-slate-200"><strong>চেকড লাগেজ (Checked):</strong> {airline.baggagePolicy.businessChecked}</p>
              <p className="text-slate-200"><strong>কেবিন লাগেজ (Hand Carry):</strong> {airline.baggagePolicy.businessCabin}</p>
            </div>
          </div>

          {airline.baggagePolicy.extraBaggageNotes && (
            <div className="p-4 bg-amber-950/40 border border-amber-800/60 rounded-2xl text-amber-200 text-xs flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>বিশেষ টিপস:</strong> {airline.baggagePolicy.extraBaggageNotes}</span>
            </div>
          )}
        </section>

        {/* CABIN CLASSES & AMENITIES */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-black text-red-600 uppercase tracking-widest block">
              Cabin Comfort & Features
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              কেবিন ক্লাস ও অন-বোর্ড সুবিধাসমূহ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {airline.cabinClasses.map((cls, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="pb-3 border-b border-slate-100">
                    <h3 className="text-base font-black text-slate-900">{cls.nameBn}</h3>
                    <span className="text-xs text-slate-500 font-mono block mt-0.5">{cls.name}</span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <p><strong>সিট লেগরুম:</strong> {cls.seatPitch}</p>
                    <p><strong>লাগেজ:</strong> {cls.baggage}</p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold text-slate-800 block">অন্যান্য সুবিধাসমূহ:</span>
                    {cls.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-center space-x-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onOpenBookingModal(`ক্লস বুকিং: ${cls.nameBn} (${airline.name})`)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  {cls.nameBn} এর ফেয়ার জানুন
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CANCELLATION & RESCHEDULING POLICY */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-base font-black text-slate-900">
              রিফান্ড ও ডেট চেঞ্জ সংক্রান্ত পলিসি
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {airline.cancellationPolicyBn}
          </p>
        </section>

        {/* DIRECT INQUIRY FORM */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-red-600 uppercase tracking-widest block">
              Instant Quote Request
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {airline.nameBn} টিকিট অনুসন্ধান ফর্ম
            </h2>
            <p className="text-xs text-slate-600">
              ফর্মটি পূরণ করুন, আমাদের সেলস টিম আপনার সাথে দ্রুততম সময়ে কম ভাড়ার টিকেট কোটেশন দিয়ে যোগাযোগ করবে।
            </p>
          </div>

          {inquirySubmitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 text-emerald-800 text-center rounded-2xl space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-extrabold text-lg text-slate-900">ধন্যবাদ! আপনার রিকোয়েস্ট সফলভাবে গৃহীত হয়েছে</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                আমাদের এয়ার টিকিট এক্সপার্ট ১৫ মিনিটের মধ্যে আপনার ফোন বা হোয়াটসঅ্যাপে সেরা ফেয়ার অপশন পাঠাবেন।
              </p>
              <button
                onClick={() => setInquirySubmitted(false)}
                className="px-6 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-500 cursor-pointer shadow-md"
              >
                নতুন কোটেশন পাঠান
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">আপনার পূর্ণ নাম *</label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    placeholder="01712345678"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">কোথা থেকে (Origin) *</label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.origin}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, origin: e.target.value })}
                    placeholder="e.g. Dhaka (DAC)"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">গন্তব্য (Destination) *</label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.destination}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, destination: e.target.value })}
                    placeholder="e.g. Dubai, London, Toronto..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">যাত্রার তারিখ *</label>
                  <input
                    type="date"
                    required
                    value={inquiryForm.departDate}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, departDate: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">যাত্রীর সংখ্যা</label>
                  <input
                    type="number"
                    min="1"
                    value={inquiryForm.passengers}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, passengers: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">ক্যাবিন ক্লাস</label>
                  <select
                    value={inquiryForm.cabin}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, cabin: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500 cursor-pointer"
                  >
                    <option value="Economy">Economy Class</option>
                    <option value="Premium Economy">Premium Economy</option>
                    <option value="Business">Business Class</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">বিশেষ অনুরোধ / বার্তা</label>
                <textarea
                  rows={2}
                  value={inquiryForm.specialRequest}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, specialRequest: e.target.value })}
                  placeholder="e.g. স্টুডেন্ট ডিসকাউন্ট অথবা অতিরিক্ত ব্যাগেজ প্রসেসিং সুবিধা প্রয়োজন"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500"
                />
              </div>

              <button
                type="submit"
                disabled={inquirySubmitting}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black rounded-xl text-sm uppercase tracking-wider transition-all shadow-xl shadow-red-600/20 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {inquirySubmitting ? (
                  <span>জমা হচ্ছে...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{airline.nameBn} টিকিটের আবেদন জমা দিন</span>
                  </>
                )}
              </button>
            </form>
          )}
        </section>

        {/* FAQS SECTION */}
        {airline.faqs && airline.faqs.length > 0 && (
          <section className="bg-slate-100 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="text-xl font-black text-slate-900">
              {airline.nameBn} টিকিট সংক্রান্ত সচরাচর প্রশ্নাবলি (FAQ)
            </h3>
            <div className="space-y-3">
              {airline.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex justify-between items-center cursor-pointer hover:bg-slate-50"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-red-600 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaqIndex === idx && (
                    <div className="p-4 pt-0 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* OTHER POPULAR AIRLINES GRID */}
        <section className="space-y-6 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">
              অন্যান্য জনপ্রিয় প্রিমিয়াম এয়ারলাইনস
            </h3>
            <button
              onClick={onBack}
              className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
            >
              সব এয়ারলাইনস দেখুন →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {ALL_AIRLINES.filter(a => a.id !== airline.id).slice(0, 6).map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectAirline(item.id)}
                className="bg-white border border-slate-200 p-3.5 rounded-2xl hover:border-red-400 hover:shadow-md transition-all text-center space-y-2 cursor-pointer group"
              >
                <CountryFlagSvg countryId={item.countryId} className="w-7 h-5 mx-auto rounded-xs border border-slate-200 shadow-xs" />
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-red-600 transition-colors line-clamp-1">
                  {item.nameBn}
                </h4>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">
                  Code: {item.code}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
