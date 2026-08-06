import React, { useState } from 'react';
import {
  Search,
  UserCheck,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { ApplicationStatusData } from '../types';

export const ApplicationTracker: React.FC = () => {
  const [appIdInput, setAppIdInput] = useState('DF-98231');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [appData, setAppData] = useState<ApplicationStatusData | null>({
    id: 'DF-98231',
    applicantName: 'তানভীর আহমেদ',
    country: 'কানাডা',
    visaType: 'ট্যুরিস্ট ভিসা (V-1)',
    submissionDate: '২০২৬-০৭-১০',
    status: 'হাই কমিশন এম্বাসি প্রসেসিং',
    progressPercent: 75,
    estimatedCompletion: '২০২৬-০৮-০৫',
    assignedConsultant: 'জনাব জাহাঙ্গীর আলম (সিনিয়র ভিসা অফিসার)',
    passportNumber: 'A08923412',
    embassyReference: 'CAN-DHK-88129',
    timeline: [
      { step: 'আবেদন জমা গ্রহণ', date: '২০২৬-০৭-১০', completed: true, note: 'ড্রিমস ফ্লাই টিম ফাইল গ্রহণ ও প্রাথমিক যাচাই সম্পন্ন করেছে' },
      { step: 'ডকুমেন্ট ভেরিফিকেশন', date: '২০২৬-০৭-১২', completed: true, note: 'ব্যাংক স্টেটমেন্ট ও এনওসি (NOC) অডিটিং সম্পন্ন' },
      { step: 'এম্বাসি অ্যাপয়েন্টমেন্ট ও বায়োমেট্রিক', date: '২০২৬-০৭-১৮', completed: true, note: 'VFS গ্লোবাল ঢাকা কেন্দ্রে বায়োমেট্রিক সম্পন্ন' },
      { step: 'হাই কমিশন ফাইল প্রসেসিং', date: '২০২৬-০৭-২০', completed: true, note: 'কানাডা হাই কমিশনে ফাইল পর্যালোচনায় রয়েছে' },
      { step: 'পাসপোর্ট স্ট্যাম্পিং ও ডেলিভারি', date: 'প্রক্রিয়াধীন', completed: false, note: 'পাসপোর্ট ডেলিভারির জন্য অপেক্ষমাণ' },
    ]
  });

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appIdInput.trim()) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/application/track/${encodeURIComponent(appIdInput.trim())}`);
      const data = await res.json();

      if (data.success && data.data) {
        setAppData(data.data);
      } else {
        setErrorMsg(data.message || `কোনো রেকর্ড পাওয়া যায়নি। পরীক্ষা করুন: DF-98231, DF-10492, অথবা DF-55102.`);
      }
    } catch (err) {
      setErrorMsg('সার্ভারে সংযোগ করা যাচ্ছে না। দয়া করে আপনার নেটওয়ার্ক চেক করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-red-200">
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-red-50 text-[#DC2626] rounded-full text-xs font-black border border-red-200 mb-2 shadow-sm">
          <Search className="w-3.5 h-3.5" />
          <span>রিয়েল-টাইম পাসপোর্ট ও ভিসা ট্র্যাকিং</span>
        </div>
        <h2 className="text-2xl font-black font-sans text-gray-900">
          আপনার আবেদনের লাইভ আপডেট ট্র্যাকিং
        </h2>
        <p className="text-xs text-gray-600 mt-1">
          আপনার ফাইল ট্র্যাকিং আইডি (যেমন: DF-98231, DF-10492, DF-55102) দিয়ে রিয়েল-টাইম এম্বাসি স্ট্যাটাস চেক করুন।
        </p>

        {/* Input Form */}
        <form onSubmit={handleTrack} className="mt-4 flex max-w-md mx-auto">
          <input
            type="text"
            value={appIdInput}
            onChange={(e) => setAppIdInput(e.target.value)}
            placeholder="অ্যাপ্লিকেশন আইডি লিখুন (যেমন: DF-98231)"
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-l-xl text-sm font-mono text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#DC2626]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold rounded-r-xl text-xs uppercase transition-colors flex items-center space-x-1 cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <span>ট্র্যাক করুন</span>}
          </button>
        </form>

        {errorMsg && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center justify-center space-x-2">
            <AlertCircle className="w-4 h-4 text-[#DC2626] flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {appData && (
        <div className="max-w-3xl mx-auto bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-6 animate-in fade-in shadow-sm">
          {/* Header Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4 gap-4">
            <div>
              <span className="text-xs font-mono font-black text-[#DC2626] uppercase">
                আবেদন আইডি: {appData.id}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-0.5">
                {appData.applicantName} ({appData.country} - {appData.visaType})
              </h3>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-red-100 text-[#DC2626] font-extrabold text-xs rounded-full border border-red-200">
                বর্তমান অবস্থা: {appData.status}
              </span>
              <span className="block text-[11px] text-gray-500 mt-1 font-medium">
                সম্ভাব্য সম্পন্ন তারিখ: {appData.estimatedCompletion}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-xs text-gray-700 font-bold mb-1.5">
              <span>ফাইল প্রসেসিং এর অগ্রগতি</span>
              <span className="text-[#DC2626]">{appData.progressPercent}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden p-0.5 border border-gray-300">
              <div
                className="h-full bg-[#DC2626] rounded-full transition-all duration-1000"
                style={{ width: `${appData.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-black text-gray-700 uppercase tracking-wider">
              ধাপভিত্তিক লাইভ ট্র্যাকিং টাইমলাইন
            </h4>
            <div className="space-y-3 relative pl-6 border-l-2 border-red-200">
              {appData.timeline.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Circle Marker */}
                  <div
                    className={`absolute -left-[31px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      item.completed
                        ? 'bg-[#DC2626] text-white'
                        : 'bg-gray-200 text-gray-500 border border-gray-300'
                    }`}
                  >
                    {item.completed ? '✓' : idx + 1}
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-bold ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {item.step}
                      </span>
                      <span className="text-xs text-[#DC2626] font-mono font-bold">{item.date}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consultant Bar */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-red-50 text-[#DC2626] flex items-center justify-center font-bold border border-red-200">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-gray-500 font-semibold">দায়িত্বপ্রাপ্ত অফিসার</span>
                <span className="block text-gray-900 font-bold">{appData.assignedConsultant}</span>
              </div>
            </div>

            <a
              href="https://wa.me/8801771304219?text=হ্যালো%20অফিসার,%20DF-98231%20ফাইলের%20স্ট্যাটাস%20জানতে%20চাই"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#25D366] text-white rounded-lg font-bold text-xs hover:bg-emerald-600 transition-colors shadow-sm"
            >
              অফিসারের সাথে সরাসরি হোয়াটসঅ্যাপ
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
