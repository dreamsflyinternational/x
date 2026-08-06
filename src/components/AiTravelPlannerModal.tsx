import React, { useState } from 'react';
import {
  Sparkles,
  Loader2,
  X
} from 'lucide-react';
import { COUNTRIES } from '../data/countries';

interface AiTravelPlannerModalProps {
  onClose: () => void;
  onOpenBookingModal: (serviceType?: string) => void;
}

export const AiTravelPlannerModal: React.FC<AiTravelPlannerModalProps> = ({
  onClose,
  onOpenBookingModal,
}) => {
  const [destination, setDestination] = useState('ইতালি');
  const [durationDays, setDurationDays] = useState(7);
  const [travelerType, setTravelerType] = useState('পারিবারিক ভ্রমণ');
  const [interests, setInterests] = useState('ঐতিহাসিক স্থান, স্থানীয় খাবার, দর্শনীয় স্থান');
  const [budgetTier, setBudgetTier] = useState('মিড-রেঞ্জ / ডিলাক্স');

  const [loading, setLoading] = useState(false);
  const [planResult, setPlanResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/gemini/plan-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          durationDays,
          travelerType,
          interests,
          budgetTier,
        }),
      });

      const data = await res.json();
      if (data.success && data.plan) {
        setPlanResult(data.plan);
      } else {
        setErrorMsg(data.error || 'ভ্রমণ পরিকল্পনা তৈরি করা যায়নি। আবার চেষ্টা করুন।');
      }
    } catch (err: any) {
      setErrorMsg('নেটওয়ার্ক ত্রুটি। এআই ট্রাভেল প্ল্যানারে সংযোগ করা যায়নি।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-gray-900 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-red-200 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#DC2626] border border-red-200 flex items-center justify-center shadow">
            <Sparkles className="w-6 h-6 text-[#DC2626] animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-black font-sans text-gray-900">
              এআই ট্রাভেল প্ল্যানার
            </h2>
            <p className="text-xs text-gray-600">
              গুগল জেমিনি এআই ও ড্রিমস ফ্লাই ভিসা বিশেষজ্ঞদের দ্বারা চালিত
            </p>
          </div>
        </div>

        {!planResult ? (
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">গন্তব্য দেশ</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#DC2626]"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.flag} {c.name} ({c.capital})
                    </option>
                  ))}
                  <option value="তুরস্ক (ইস্তাম্বুল ও কাপাডোকিয়া)">🇹🇷 তুরস্ক (ইস্তাম্বুল ও কাপাডোকিয়া)</option>
                  <option value="সুইজারল্যান্ড (আল্পস)">🇨🇭 সুইজারল্যান্ড (জারম্যাট ও লুসার্ন)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ভ্রমণের সময়কাল (দিন)</label>
                <select
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#DC2626]"
                >
                  <option value={3}>৩ দিনের শর্ট ট্যুর</option>
                  <option value={5}>৫ দিনের এক্সপ্রেস ট্রিপ</option>
                  <option value={7}>৭ দিনের স্ট্যান্ডার্ড ট্যুর</option>
                  <option value={10}>১০ দিনের গ্র্যান্ড ভ্রমণ</option>
                  <option value={14}>১৪ দিনের সম্পূর্ণ ভ্যাকেশন</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">যাত্রীর ধরন</label>
                <select
                  value={travelerType}
                  onChange={(e) => setTravelerType(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#DC2626]"
                >
                  <option value="পারিবারিক ভ্রমণ">পরিবার সহ ভ্রমণ</option>
                  <option value="হানিফুন কাপল">হানিফুন ও রোমান্টিক কাপল</option>
                  <option value="একলা ভ্রমণ">একক ভ্রমণকারী</option>
                  <option value="কর্পোরেট / বিসনেস">কর্পোরেট / বিজনেস ট্রিপ</option>
                  <option value="বন্ধুদের গ্রুপ">বন্ধুদের দল</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">বাজেট প্রেফারেন্স</label>
                <select
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#DC2626]"
                >
                  <option value="বাজেট ফ্রেন্ডলি">বাজেট ফ্রেন্ডলি</option>
                  <option value="মিড-রেঞ্জ / ডিলাক্স">মিড-রেঞ্জ ৪-স্টার স্ট্যান্ডার্ড</option>
                  <option value="লুক্সারি / ৫-স্টার ভিআইপি">৫-স্টার লাক্সারি ভিআইপি</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">বিশেষ আকর্ষণ / আগ্রহ</label>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="যেমন: ঐতিহাসিক স্থান, শপিং, থিম পার্ক, সমুদ্র সৈকত, হালাল খাবার"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#DC2626]"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-[#DC2626]">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-black rounded-xl text-sm uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 cursor-pointer mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>জেমিনি এআই ভ্রমণ প্ল্যান প্রস্তুত করছে...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>এআই ট্যুর প্ল্যান ও ভিসা পরামর্শ তৈরি করুন</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-6 animate-in fade-in max-h-[65vh] overflow-y-auto pr-2">
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2">
              <span className="text-xs font-bold text-[#DC2626] uppercase tracking-wider">
                কাস্টম এআই ভ্রমণ পরিকল্পনা
              </span>
              <h3 className="text-2xl font-bold font-sans text-gray-900">{planResult.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{planResult.summary}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                  <span className="block text-[10px] text-gray-500 font-bold">ভ্রমণের সেরা সময়</span>
                  <span className="block font-bold text-gray-900">{planResult.recommendedBestTime}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                  <span className="block text-[10px] text-gray-500 font-bold">আনুমানিক বাজেট / ব্যক্তি</span>
                  <span className="block font-bold text-[#DC2626]">{planResult.estimatedBudgetUSD}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-gray-200 col-span-2 sm:col-span-1">
                  <span className="block text-[10px] text-gray-500 font-bold">প্রস্তাবিত সার্ভিস</span>
                  <span className="block font-bold text-emerald-700 truncate">ড্রিমস ফ্লাই ফাইল অডিট</span>
                </div>
              </div>
            </div>

            {/* Visa Tips */}
            <div className="bg-red-50 border border-red-200 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-[#DC2626] uppercase tracking-wider block">
                {destination} ভিসার ফাইল তৈরির গুরুত্বপূর্ণ টিপস
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-700">
                {planResult.visaTips?.map((tip: string, idx: number) => (
                  <li key={idx} className="bg-white p-2.5 rounded-xl border border-gray-200">
                    <span className="font-bold text-[#DC2626]">✓ </span> {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Day By Day */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                দিনভিত্তিক বিস্তারিত সময়সূচি
              </h4>
              <div className="space-y-3">
                {planResult.dayByDay?.map((day: any, idx: number) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-[#DC2626] uppercase">দিন {day.day}</span>
                      <span className="text-xs font-bold text-gray-900">{day.theme}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-700 pt-1">
                      <div><strong className="text-gray-900">সকাল:</strong> {day.morning}</div>
                      <div><strong className="text-[#DC2626]">দুপুর:</strong> {day.afternoon}</div>
                      <div><strong className="text-purple-700">সন্ধ্যা:</strong> {day.evening}</div>
                    </div>
                    {day.insiderTip && (
                      <p className="text-[11px] text-emerald-700 italic pt-1 border-t border-gray-200">
                        💡 ড্রিমস ফ্লাই বিশেষ টিপ: {day.insiderTip}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setPlanResult(null)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs cursor-pointer"
              >
                নতুন ভ্রমণ প্ল্যান করুন
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenBookingModal(`${destination} ভ্রমণ বুকিং (${durationDays} দিন এআই প্ল্যান)`);
                }}
                className="flex-1 py-3 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-black rounded-xl text-xs cursor-pointer shadow-lg"
              >
                ড্রিমস ফ্লাই এর মাধ্যমে ফ্লাইট ও প্যাকেজ বুক করুন
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
