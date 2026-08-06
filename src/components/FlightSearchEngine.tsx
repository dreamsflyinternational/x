import React, { useState } from 'react';
import {
  Plane,
  Search,
  ArrowRightLeft,
  Briefcase,
  Sparkles
} from 'lucide-react';

interface FlightSearchEngineProps {
  currency: 'BDT' | 'USD';
  onBookFlight: (flightDetails: any) => void;
}

const AIRPORTS = [
  { code: 'DAC', city: 'ঢাকা', airport: 'হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর (DAC)', country: 'বাংলাদেশ' },
  { code: 'CGP', city: 'চট্টগ্রাম', airport: 'শাহ আমানত আন্তর্জাতিক বিমানবন্দর (CGP)', country: 'বাংলাদেশ' },
  { code: 'ZYL', city: 'সিলেট', airport: 'ওসমানী আন্তর্জাতিক বিমানবন্দর (ZYL)', country: 'বাংলাদেশ' },
  { code: 'DXB', city: 'দুবাই', airport: 'দুবাই আন্তর্জাতিক বিমানবন্দর (DXB)', country: 'সংযুক্ত আরব আমিরাত' },
  { code: 'JED', city: 'জেদ্দা', airport: 'কিং আব্দুলআজিজ আন্তর্জাতিক বিমানবন্দর (JED)', country: 'সৌদি আরব' },
  { code: 'LHR', city: 'লন্ডন', airport: 'হিথ্রো বিমানবন্দর (LHR)', country: 'যুক্তরাজ্য' },
  { code: 'YYZ', city: 'টরোন্টো', airport: 'পিয়ারসন আন্তর্জাতিক বিমানবন্দর (YYZ)', country: 'কানাডা' },
  { code: 'KUL', city: 'কুয়ালালামপুর', airport: 'কেএলআইএ (KUL)', country: 'মালয়েশিয়া' },
  { code: 'BKK', city: 'ব্যাংকক', airport: 'সুবর্ণভূমি আন্তর্জাতিক বিমানবন্দর (BKK)', country: 'থাইল্যান্ড' },
  { code: 'SIN', city: 'সিঙ্গাপুর', airport: 'চাঙ্গি আন্তর্জাতিক বিমানবন্দর (SIN)', country: 'সিঙ্গাপুর' },
  { code: 'FCO', city: 'রোম', airport: 'ফিয়ামিসিনো বিমানবন্দর (FCO)', country: 'ইতালি' },
];

const MOCK_FLIGHT_RESULTS = [
  {
    id: 'fl-1',
    airline: 'এমিরেটস এয়ারলাইনস',
    flightNo: 'EK-583 / EK-241',
    origin: 'DAC (ঢাকা)',
    destination: 'YYZ (টরোন্টো)',
    departureTime: '১০:১৫ সকাল',
    arrivalTime: '০৮:৪৫ রাত',
    duration: '২১ঘণ্টা ৩০মি',
    stops: '১টি স্টপ (দুবাই DXB)',
    baggage: '২ x ২৩ কেজি চেক-ইন + ৭ কেজি কেবিন',
    priceBDT: 142000,
    priceUSD: 1200,
    refundable: true,
  },
  {
    id: 'fl-2',
    airline: 'বিমান বাংলাদেশ এয়ারলাইনস',
    flightNo: 'BG-201 ডিরেক্ট',
    origin: 'DAC (ঢাকা)',
    destination: 'LHR (লন্ডন হিথ্রো)',
    departureTime: '০৮:৩০ সকাল',
    arrivalTime: '০৩:১৫ দুপুর',
    duration: '১১ঘণ্টা ৪৫মি',
    stops: 'সরাসরি নন-স্টপ ফ্লাইট',
    baggage: '২ x ২৩ কেজি চেক-ইন + ৭ কেজি কেবিন',
    priceBDT: 98000,
    priceUSD: 830,
    refundable: true,
  },
  {
    id: 'fl-3',
    airline: 'কাতার এয়ারওয়েজ',
    flightNo: 'QR-641 / QR-003',
    origin: 'DAC (ঢাকা)',
    destination: 'LHR (লন্ডন হিথ্রো)',
    departureTime: '০৩:৪৫ ভোর',
    arrivalTime: '০১:১০ দুপুর',
    duration: '১৪ঘণ্টা ২৫মি',
    stops: '১টি স্টপ (দোহা DOH)',
    baggage: '৩০ কেজি চেক-ইন + ৭ কেজি কেবিন',
    priceBDT: 104000,
    priceUSD: 880,
    refundable: true,
  },
  {
    id: 'fl-4',
    airline: 'সাউদিয়া এয়ারলাইনস',
    flightNo: 'SV-803 ডিরেক্ট',
    origin: 'DAC (ঢাকা)',
    destination: 'JED (জেদ্দা)',
    departureTime: '০১:২০ দুপুর',
    arrivalTime: '০৫:৩০ বিকেল',
    duration: '৭ঘণ্টা ১০মি',
    stops: 'সরাসরি নন-স্টপ',
    baggage: '২ x ২৩ কেজি চেক-ইন + জমজম ৫ লিটার',
    priceBDT: 56000,
    priceUSD: 475,
    refundable: true,
  },
  {
    id: 'fl-5',
    airline: 'ইউএস-বাংলা এয়ারলাইনস',
    flightNo: 'BS-315',
    origin: 'DAC (ঢাকা)',
    destination: 'BKK (ব্যাংকক)',
    departureTime: '১১:৪০ সকাল',
    arrivalTime: '০৩:১০ দুপুর',
    duration: '২ঘণ্টা ৩০মি',
    stops: 'সরাসরি নন-স্টপ',
    baggage: '২০ কেজি চেক-ইন + ৭ কেজি কেবিন',
    priceBDT: 28500,
    priceUSD: 240,
    refundable: false,
  }
];

export const FlightSearchEngine: React.FC<FlightSearchEngineProps> = ({
  currency,
  onBookFlight,
}) => {
  const [tripType, setTripType] = useState<'round' | 'oneway' | 'multi'>('round');
  const [fromAirport, setFromAirport] = useState('DAC');
  const [toAirport, setToAirport] = useState('DXB');
  const [departDate, setDepartDate] = useState('2026-08-15');
  const [returnDate, setReturnDate] = useState('2026-08-30');
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('Economy');
  const [searched, setSearched] = useState(false);

  const swapLocations = () => {
    const temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200 text-gray-900">
      {/* Trip Type Selector */}
      <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-gray-200 pb-4">
        <button
          type="button"
          onClick={() => setTripType('round')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            tripType === 'round'
              ? 'bg-[#DC2626] text-white shadow'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          রাউন্ড ট্রিপ (আসা-যাওয়া)
        </button>
        <button
          type="button"
          onClick={() => setTripType('oneway')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            tripType === 'oneway'
              ? 'bg-[#DC2626] text-white shadow'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          ওয়ান ওয়ে (একমুখী)
        </button>
        <button
          type="button"
          onClick={() => setTripType('multi')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            tripType === 'multi'
              ? 'bg-[#DC2626] text-white shadow'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          মাল্টি সিটি
        </button>

        <div className="ml-auto flex items-center space-x-2 text-xs text-[#DC2626] bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
          <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
          <span className="font-bold">লাইভ সেবার ও আমাডিউস GDS টিকিট ফেয়ার</span>
        </div>
      </div>

      {/* Flight Search Form */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* From */}
        <div className="lg:col-span-3 bg-gray-50 p-3.5 rounded-2xl border border-gray-300">
          <label className="block text-[10px] font-black uppercase text-[#DC2626] tracking-wider mb-1">
            কোথা থেকে যাবেন
          </label>
          <select
            value={fromAirport}
            onChange={(e) => setFromAirport(e.target.value)}
            className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none cursor-pointer"
          >
            {AIRPORTS.map((a) => (
              <option key={a.code} value={a.code} className="bg-white text-gray-900">
                {a.city} ({a.code}) - {a.country}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
          <button
            type="button"
            onClick={swapLocations}
            className="p-2.5 bg-red-50 hover:bg-[#DC2626] hover:text-white text-[#DC2626] rounded-full transition-all border border-red-200 cursor-pointer shadow-sm"
            title="স্থান পরিবর্তন করুন"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        {/* To */}
        <div className="lg:col-span-3 bg-gray-50 p-3.5 rounded-2xl border border-gray-300">
          <label className="block text-[10px] font-black uppercase text-[#DC2626] tracking-wider mb-1">
            কোথায় যাবেন
          </label>
          <select
            value={toAirport}
            onChange={(e) => setToAirport(e.target.value)}
            className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none cursor-pointer"
          >
            {AIRPORTS.map((a) => (
              <option key={a.code} value={a.code} className="bg-white text-gray-900">
                {a.city} ({a.code}) - {a.country}
              </option>
            ))}
          </select>
        </div>

        {/* Dates */}
        <div className="lg:col-span-3 bg-gray-50 p-3.5 rounded-2xl border border-gray-300 flex space-x-2">
          <div className="flex-1">
            <label className="block text-[10px] font-black uppercase text-[#DC2626] tracking-wider mb-1">
              যাওয়ার তারিখ
            </label>
            <input
              type="date"
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-bold text-gray-900 focus:outline-none"
            />
          </div>
          {tripType === 'round' && (
            <div className="flex-1 border-l border-gray-300 pl-2">
              <label className="block text-[10px] font-black uppercase text-[#DC2626] tracking-wider mb-1">
                ফেরার তারিখ
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-bold text-gray-900 focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Passengers & Class */}
        <div className="lg:col-span-2 bg-gray-50 p-3.5 rounded-2xl border border-gray-300 flex space-x-2">
          <div className="flex-1">
            <label className="block text-[10px] font-bold uppercase text-gray-600 tracking-wider mb-1">
              যাত্রী
            </label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="w-full bg-transparent text-xs font-bold text-gray-900 focus:outline-none cursor-pointer"
            >
              <option value={1} className="bg-white">১ জন প্রাপ্তবয়স্ক</option>
              <option value={2} className="bg-white">২ জন প্রাপ্তবয়স্ক</option>
              <option value={3} className="bg-white">৩ জন যাত্রী</option>
              <option value={4} className="bg-white">৪+ পরিবার</option>
            </select>
          </div>
          <div className="flex-1 border-l border-gray-300 pl-2">
            <label className="block text-[10px] font-bold uppercase text-gray-600 tracking-wider mb-1">
              ক্লাস
            </label>
            <select
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value)}
              className="w-full bg-transparent text-xs font-bold text-gray-900 focus:outline-none cursor-pointer"
            >
              <option value="Economy" className="bg-white">ইকোনমি</option>
              <option value="Premium Economy" className="bg-white">প্রিমিয়াম</option>
              <option value="Business" className="bg-white">বিজনেস</option>
              <option value="First" className="bg-white">ফার্স্ট ক্লাস</option>
            </select>
          </div>
        </div>

        {/* Search Submit Button */}
        <div className="lg:col-span-12 mt-2">
          <button
            type="submit"
            className="w-full py-4 bg-[#DC2626] hover:bg-[#B71C1C] text-white rounded-2xl font-black text-base uppercase tracking-wider shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Search className="w-5 h-5" />
            <span>ফ্লাইট অনুসন্ধান ও সর্বনিম্ন ফেয়ার দেখুন</span>
          </button>
        </div>
      </form>

      {/* Flight Search Results */}
      {searched && (
        <div className="mt-8 pt-8 border-t border-gray-200 animate-in fade-in duration-300">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold font-sans text-gray-900">
                {fromAirport} → {toAirport} এর উপচে পড়া সেরা ফ্লাইটসমূহ
              </h3>
              <p className="text-xs text-gray-600">
                ট্যাক্স ও সব ধরণের চার্জ অন্তর্ভুক্ত
              </p>
            </div>
            <span className="text-xs font-bold text-[#DC2626] bg-red-50 px-3 py-1 rounded-full border border-red-200">
              ৫টি বিকল্প পাওয়া গেছে
            </span>
          </div>

          <div className="space-y-4">
            {MOCK_FLIGHT_RESULTS.map((f) => (
              <div
                key={f.id}
                className="bg-gray-50 rounded-2xl p-5 border border-gray-200 hover:border-[#DC2626] transition-all flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm"
              >
                {/* Airline & Flight Info */}
                <div className="flex items-center space-x-4 w-full md:w-auto">
                  <div className="w-12 h-12 rounded-xl bg-red-50 p-1 flex items-center justify-center overflow-hidden flex-shrink-0 border border-red-200">
                    <Plane className="w-6 h-6 text-[#DC2626]" />
                  </div>
                  <div>
                    <span className="block font-bold text-base text-gray-900">{f.airline}</span>
                    <span className="block text-xs text-[#DC2626] font-mono font-bold">{f.flightNo}</span>
                    <span className="text-[11px] text-gray-600 flex items-center space-x-1 mt-0.5">
                      <Briefcase className="w-3 h-3 text-[#DC2626]" />
                      <span>{f.baggage}</span>
                    </span>
                  </div>
                </div>

                {/* Timing */}
                <div className="flex items-center space-x-6 text-center">
                  <div>
                    <span className="block text-lg font-black text-gray-900">{f.departureTime}</span>
                    <span className="block text-xs text-gray-600 font-semibold">{f.origin}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-[#DC2626] font-bold">{f.duration}</span>
                    <div className="w-20 h-0.5 bg-[#DC2626] my-1" />
                    <span className="text-[10px] text-emerald-700 font-bold">{f.stops}</span>
                  </div>
                  <div>
                    <span className="block text-lg font-black text-gray-900">{f.arrivalTime}</span>
                    <span className="block text-xs text-gray-600 font-semibold">{f.destination}</span>
                  </div>
                </div>

                {/* Pricing & Booking */}
                <div className="text-right w-full md:w-auto flex md:flex-col justify-between items-center md:items-end border-t md:border-t-0 border-gray-200 pt-3 md:pt-0">
                  <div>
                    <span className="block text-2xl font-black text-[#DC2626]">
                      {currency === 'BDT' ? `৳${f.priceBDT.toLocaleString()}` : `$${f.priceUSD}`}
                    </span>
                    <span className="block text-[10px] text-emerald-700 font-bold">
                      {f.refundable ? '✓ রিফান্ডেবল টিকিট' : 'নন-রিফান্ডেবল'}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      onBookFlight({
                        airline: f.airline,
                        from: fromAirport,
                        to: toAirport,
                        price: currency === 'BDT' ? `৳${f.priceBDT}` : `$${f.priceUSD}`,
                      })
                    }
                    className="mt-2 px-5 py-2.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold rounded-xl text-xs shadow transition-all cursor-pointer"
                  >
                    টিকিট বুক করুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
