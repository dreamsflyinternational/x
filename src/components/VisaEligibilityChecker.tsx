import React, { useState } from 'react';
import {
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  PhoneCall,
  Loader2
} from 'lucide-react';
import { COUNTRIES } from '../data/countries';

interface VisaEligibilityCheckerProps {
  onOpenBookingModal: (serviceType?: string) => void;
}

export const VisaEligibilityChecker: React.FC<VisaEligibilityCheckerProps> = ({
  onOpenBookingModal,
}) => {
  const [targetCountry, setTargetCountry] = useState('Canada');
  const [occupation, setOccupation] = useState('Private Job Holder');
  const [bankBalanceBDT, setBankBalanceBDT] = useState('1200000');
  const [travelHistory, setTravelHistory] = useState('Schengen / UAE / Thailand');
  const [purpose, setPurpose] = useState('Tourist Visit');
  const [citizenship] = useState('Bangladesh');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/visa-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetCountry,
          citizenship,
          occupation,
          bankBalanceBDT,
          travelHistory,
          purpose,
        }),
      });

      const data = await res.json();
      if (data.success && data.assessment) {
        setResult(data.assessment);
      } else {
        calculateLocalResult();
      }
    } catch (err) {
      calculateLocalResult();
    } finally {
      setLoading(false);
    }
  };

  const calculateLocalResult = () => {
    const numBank = Number(bankBalanceBDT) || 0;
    let score = 65;

    if (numBank >= 1000000) score += 20;
    if (travelHistory.includes('Schengen') || travelHistory.includes('UK') || travelHistory.includes('USA')) score += 15;
    if (occupation.includes('Govt') || occupation.includes('Business')) score += 10;

    score = Math.min(score, 98);

    setResult({
      eligibilityScorePercent: score,
      statusCategory: score > 80 ? 'ভিসা পাওয়ার উচ্চ সম্ভাবনা' : 'মাঝারি সম্ভাবনাময় ফাইল',
      keyStrengths: [
        'ব্যাংক স্টেটমেন্টে পর্যাপ্ত আর্থিক সচ্ছলতা পরিলক্ষিত',
        'নিজ দেশের সাথে সুদৃঢ় সামাজিক ও অর্থনৈতিক সম্পর্ক (বাংলাদেশ)',
        'সুনির্দিষ্ট ভ্রমণের উদ্দেশ্য ও অতীত ভ্রমণ ইতিহাস'
      ],
      riskFactors: [
        'একবারে হঠাৎ বড় অঙ্কের টাকা জমা না দেওয়ার পরামর্শ দেওয়া হচ্ছে',
        'ট্যাক্স রিটার্ন (ITR) ও ব্যাংক লেনদেনের সামঞ্জস্য নিশ্চিত করুন'
      ],
      actionableSteps: [
        'ব্যাংক থেকে সলভেন্সি সার্টিফিকেট ও ৬ মাসের লেনদেনের কপি সংগ্রহ করুন',
        'ট্রেড লাইসেন্স / NOC ইংরেজি অনুবাদ ও নোটারি নিশ্চিত করুন',
        'ড্রিমস ফ্লাই অভিজ্ঞ অফিসার দ্বারা কাস্টমাইজড কাভার লেটার তৈরি করিয়ে নিন'
      ],
      recommendedDocuments: [
        'মূল পাসপোর্ট (নূন্যতম ৬ মাস মেয়াদ)',
        'ব্যাংক স্টেটমেন্ট ও সলভেন্সি সার্টিফিকেট',
        'এনওসি (NOC) বা ট্রেড লাইসেন্স',
        'ইনকাম ট্যাক্স সার্টিফিকেট (TIN & ITR)'
      ],
      dreamsFlyAssistanceNote: 'ড্রিমস ফ্লাই ইন্টারন্যাশনাল ১০০% নির্ভুল ফাইল প্রসেসিং এবং স্ট্রং SOP রাইটিং নিশ্চিত করে।'
    });
  };

  return (
    <div className="bg-white text-gray-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-red-200">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-red-50 text-[#DC2626] rounded-full text-xs font-black border border-red-200 mb-3 shadow-sm">
          <Sparkles className="w-4 h-4 text-[#DC2626]" />
          <span>স্মার্ট এআই ভিসা যোগ্যতা যাচাইকারী</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-gray-900">
          আপনার ভিসা অনুমোদনের সম্ভাবনা কতটুকু?
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
          আপনার কাঙ্ক্ষিত দেশ, ব্যাংক ব্যালেন্স এবং পেশা সংক্রান্ত ৫টি প্রশ্নের উত্তর দিয়ে মুহূর্তেই জেনে নিন আনুমানিক স্কোরের ফলাফল।
        </p>
      </div>

      {!result ? (
        <form onSubmit={handleCheck} className="max-w-2xl mx-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">গন্তব্য দেশ নির্বাচন করুন</label>
              <select
                value={targetCountry}
                onChange={(e) => setTargetCountry(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#DC2626] cursor-pointer"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.flag} {c.name} ({c.region})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">পেশাগত স্ট্যাটাস</label>
              <select
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#DC2626] cursor-pointer"
              >
                <option value="Private Job Holder (NOC)">বেসরকারি চাকরিজীবী (NOC সহ)</option>
                <option value="Government Service Officer">সরকারি কর্মকর্তা / কর্মচারী</option>
                <option value="Business Owner / Managing Director">ব্যবসায়ী / প্রতিষ্ঠান প্রধান</option>
                <option value="Doctor / Engineer / Architect">ডাক্তার / প্রকৌশলী / আইনজীবী</option>
                <option value="University Student">বিশ্ববিদ্যালয় শিক্ষার্থী</option>
                <option value="Freelancer / IT Professional">আইটি প্রফেশনাল / ফ্রিল্যান্সার</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">আনুমানিক ব্যাংক ব্যালেন্স (টাকা)</label>
              <select
                value={bankBalanceBDT}
                onChange={(e) => setBankBalanceBDT(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#DC2626] cursor-pointer"
              >
                <option value="300000">৳ ৩,০০,০০০ - ৳ ৫,০০,০০০</option>
                <option value="800000">৳ ৫,০০,০০০ - ৳ ১০,০০,০০০</option>
                <option value="1500000">৳ ১০,০০,০০০ - ৳ ২৫,০০,০০০</option>
                <option value="3000000">৳ ২৫,০০,০০০+</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">পূর্ববর্তী বিদেশ ভ্রমণের ইতিহাস</label>
              <select
                value={travelHistory}
                onChange={(e) => setTravelHistory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#DC2626] cursor-pointer"
              >
                <option value="Schengen / UK / USA / Canada">শেনজেন / যুক্তরাজ্য / যুক্তরাষ্ট্র / কানাডা</option>
                <option value="UAE / Saudi / Qatar / Malaysia">ইউএই / সৌদি / মালয়েশিয়া / থাইল্যান্ড</option>
                <option value="India / Nepal / Sri Lanka">ভারত / নেপাল / শ্রীলঙ্কা</option>
                <option value="Fresh Passport / First Time Abroad">প্রথমবার বিদেশ ভ্রমণ (ফ্রেশ পাসপোর্ট)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#DC2626] hover:bg-[#B71C1C] text-white rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>ফাইল অ্যাসেসমেন্ট করা হচ্ছে...</span>
              </>
            ) : (
              <>
                <FileCheck className="w-5 h-5" />
                <span>আমার যোগ্যতার পয়েন্ট চেক করুন</span>
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in">
          {/* Result Card */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            {/* Score Circle */}
            <div className="relative w-32 h-32 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="54" stroke="#e2e8f0" strokeWidth="12" fill="transparent" />
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  stroke={result.eligibilityScorePercent > 80 ? '#10b981' : '#DC2626'}
                  strokeWidth="12"
                  strokeDasharray="339.29"
                  strokeDashoffset={339.29 - (339.29 * result.eligibilityScorePercent) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black text-gray-900">{result.eligibilityScorePercent}%</span>
                <span className="text-[10px] text-gray-500 uppercase font-bold">স্কোর</span>
              </div>
            </div>

            <div>
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-extrabold text-xs rounded-full border border-emerald-300 mb-2">
                {result.statusCategory}
              </span>
              <h3 className="text-xl font-bold font-sans text-gray-900">
                {targetCountry} ভিসার ফাইল অ্যাসেসমেন্ট
              </h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {result.dreamsFlyAssistanceNote}
              </p>
            </div>
          </div>

          {/* Strengths & Risks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>ফাইলের শক্তিশালী দিকসমূহ</span>
              </div>
              <ul className="space-y-1.5 text-gray-700">
                {result.keyStrengths?.map((s: string, idx: number) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-amber-800 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>যেসব বিষয়ে মনোযোগ দরকার</span>
              </div>
              <ul className="space-y-1.5 text-gray-700">
                {result.riskFactors?.map((r: string, idx: number) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-amber-600 font-bold">!</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actionable Steps */}
          <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl space-y-3">
            <h4 className="font-bold text-sm text-[#DC2626] uppercase tracking-wider">
              প্রয়োজনীয় পেপারস প্রস্তুতির পদক্ষেপ
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {result.actionableSteps?.map((step: string, idx: number) => (
                <div key={idx} className="bg-white p-3 rounded-xl border border-gray-200 space-y-1 shadow-sm">
                  <span className="font-black text-[#DC2626]">ধাপ {idx + 1}</span>
                  <p className="text-gray-700 leading-snug">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setResult(null)}
              className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer border border-gray-300"
            >
              <RotateCcw className="w-4 h-4" />
              <span>অন্য দেশ চেক করুন</span>
            </button>
            <button
              onClick={() => onOpenBookingModal(`${targetCountry} ভিসার জন্য ফাইল রিভিউ`)}
              className="flex-1 py-3 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
            >
              <PhoneCall className="w-4 h-4" />
              <span>সিনিয়র ভিসা অফিসারের পরামর্শ নিন</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
