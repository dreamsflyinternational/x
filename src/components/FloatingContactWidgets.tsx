import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageCircle,
  X,
  PhoneCall,
  Sparkles,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface FloatingContactWidgetsProps {
  onOpenBookingModal: (serviceType?: string) => void;
}

export const FloatingContactWidgets: React.FC<FloatingContactWidgetsProps> = ({
  onOpenBookingModal,
}) => {
  const [showMessenger, setShowMessenger] = useState(false);
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackService, setCallbackService] = useState('কানাডা ট্যুরিস্ট ভিসা');
  const [callbackSent, setCallbackSent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeen = sessionStorage.getItem('hasSeenCallbackPopup');
      if (!hasSeen) {
        setShowCallbackModal(true);
        sessionStorage.setItem('hasSeenCallbackPopup', 'true');
      }
    }, 45000);

    return () => clearTimeout(timer);
  }, []);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (callbackName && callbackPhone) {
      setCallbackSent(true);
      setTimeout(() => {
        setCallbackSent(false);
        setShowCallbackModal(false);
      }, 3000);
    }
  };

  return (
    <>
      {/* Floating Action Buttons Column (Right Side) */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col space-y-3 items-end">
        {/* Messenger Chat Popover Toggle */}
        <button
          onClick={() => setShowMessenger(!showMessenger)}
          className="w-12 h-12 bg-[#0084FF] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer group relative"
          title="Facebook Messenger Chat"
          aria-label="Toggle Messenger Chat"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-14 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            মেসেঞ্জার চ্যাট
          </span>
        </button>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/8801771304219?text=হ্যালো%20ড্রিমস%20ফ্লাই%20ইন্টারন্যাশনাল,%20ভিসা%20ও%20এয়ার%20টিকিট%20সম্পর্কে%20জানতে%20চাই।"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer group relative animate-bounce"
          title="WhatsApp Support (+880 1771-304219)"
          aria-label="Contact WhatsApp Support"
        >
          <Phone className="w-7 h-7" />
          <span className="hidden sm:inline-block absolute right-16 bg-[#DC2626] text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl border border-white/20 pointer-events-none select-none">
            💬 হোয়াটসঅ্যাপ লাইভ সাপোর্ট
          </span>
        </a>
      </div>

      {/* Messenger Simulation Modal */}
      {showMessenger && (
        <div className="fixed bottom-24 right-4 sm:right-20 z-50 w-80 bg-white text-gray-900 rounded-2xl shadow-2xl border border-red-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          <div className="bg-[#DC2626] p-3.5 flex justify-between items-center text-white">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-[#DC2626] font-black flex items-center justify-center text-xs">
                DF
              </div>
              <div>
                <span className="block font-bold text-sm">ড্রিমস ফ্লাই অ্যাসিস্ট্যান্ট</span>
                <span className="block text-[10px] text-red-100">ইনস্ট্যান্ট উত্তর দেওয়া হয়</span>
              </div>
            </div>
            <button
              onClick={() => setShowMessenger(false)}
              className="text-white/80 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-3 text-xs bg-gray-50">
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-gray-800 space-y-1 shadow-sm">
              <p className="font-bold text-[#DC2626]">👋 ড্রিমস ফ্লাই ইন্টারন্যাশনালে স্বাগতম!</p>
              <p>আজ কিভাবে আমাদের সিনিয়র কনসালট্যান্ট আপনাকে সাহায্য করতে পারেন?</p>
            </div>

            <div className="space-y-1.5 pt-1">
              <a
                href="https://wa.me/8801771304219?text=হ্যালো,%20কানাডা%20ভিসা%20সম্পর্কে%20জানতে%20চাই"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 bg-red-50 hover:bg-red-100 text-[#DC2626] font-bold rounded-lg border border-red-200 text-left transition-colors"
              >
                🇨🇦 কানাডা ভিসা তথ্য জানুন
              </a>
              <a
                href="https://wa.me/8801771304219?text=হ্যালো,%20ইউরোপ%20শেনজেন%20ভিসা%20সম্পর্কে%20জানতে%20চাই"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 bg-red-50 hover:bg-red-100 text-[#DC2626] font-bold rounded-lg border border-red-200 text-left transition-colors"
              >
                🇪🇺 ইউরোপ শেনজেন ভিসা তথ্য
              </a>
              <a
                href="https://wa.me/8801771304219?text=হ্যালো,%20এয়ার%20টিকিট%20ফেয়ার%20জানতে%20চাই"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 bg-red-50 hover:bg-red-100 text-[#DC2626] font-bold rounded-lg border border-red-200 text-left transition-colors"
              >
                ✈️ সেরা এয়ার টিকিট ফেয়ার চেক করুন
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Exit Intent / Timed Call Back Request Modal */}
      {showCallbackModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white text-gray-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-red-200 relative overflow-hidden">
            <button
              onClick={() => setShowCallbackModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-[#DC2626] text-xs font-black uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-[#DC2626]" />
              <span>বিনামূল্যে ১-অন-১ ভিসা কনসালটেশন</span>
            </div>

            <h3 className="text-xl font-bold font-sans mb-2 text-gray-900">
              ১৫ মিনিটের মধ্যে কল ব্যাক এর জন্য অনুরোধ পাঠান
            </h3>
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              কানাডা, যুক্তরাজ্য, যুক্তরাষ্ট্র, শেনজেন, ওমরাহ অথবা টিকিট বুকিং বিষয়ে সরাসরি কথা বলুন অভিজ্ঞ ভিসা অফিসারের সাথে।
            </p>

            {callbackSent ? (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center text-emerald-800 space-y-2 my-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <span className="block font-bold text-sm">অনুরোধ গৃহীত হয়েছে!</span>
                <p className="text-xs text-gray-600">
                  আমাদের সিনিয়র কনসালট্যান্ট শীঘ্রই {callbackPhone} নম্বরে কল দেবেন।
                </p>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">আপনার নাম</label>
                  <input
                    type="text"
                    required
                    value={callbackName}
                    onChange={(e) => setCallbackName(e.target.value)}
                    placeholder="যেমন: তানভীর আহমেদ"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#DC2626]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">ফোন নম্বর (হোয়াটসঅ্যাপ)</label>
                  <input
                    type="tel"
                    required
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    placeholder="+৮৮০ ১৭১১-XXXXXX"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#DC2626]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">কাঙ্খিত সেবা</label>
                  <select
                    value={callbackService}
                    onChange={(e) => setCallbackService(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#DC2626]"
                  >
                    <option value="কানাডা ট্যুরিস্ট ভিসা">কানাডা ট্যুরিস্ট ভিসা (১০ বছর)</option>
                    <option value="যুক্তরাজ্য স্টুডেন্ট/ট্যুরিস্ট">যুক্তরাজ্য স্টুডেন্ট ও ভিজিটর ভিসা</option>
                    <option value="শেনজেন ওয়ার্ক পারমিট">ইউরোপ শেনজেন ওয়ার্ক পারমিট</option>
                    <option value="অস্ট্রেলিয়া ভিসা">অস্ট্রেলিয়া সাবক্লাস ৬০০ / ৫০০</option>
                    <option value="ওমরাহ প্যাকেজ">৫-স্টার / ইকোনমি ওমরাহ প্যাকেজ</option>
                    <option value="এয়ার টিকিট বুকিং">এয়ার টিকিট বুকিং ও ফেয়ার</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold rounded-xl shadow-lg transition-all cursor-pointer text-sm"
                >
                  এখনই কল ব্যাক এর জন্য পাঠান
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Sticky Quick Inquiry Bar (Bottom Mobile Bar) */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#B71C1C]/95 backdrop-blur-md border-t border-red-700 p-2.5 z-30 lg:hidden flex items-center justify-around">
        <a
          href="tel:+8801771304219"
          className="flex-1 mr-1.5 py-2.5 bg-white text-[#DC2626] rounded-xl text-center font-black text-xs flex items-center justify-center space-x-1.5 shadow-md"
        >
          <PhoneCall className="w-3.5 h-3.5 text-[#DC2626]" />
          <span>কল দিন</span>
        </a>

        <a
          href="https://wa.me/8801771304219?text=হ্যালো%20ড্রিমস%20ফ্লাই"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 mx-1.5 py-2.5 bg-[#25D366] text-white rounded-xl text-center font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>হোয়াটসঅ্যাপ</span>
        </a>

        <button
          onClick={() => onOpenBookingModal()}
          className="flex-1 ml-1.5 py-2.5 bg-amber-300 text-slate-950 rounded-xl text-center font-black text-xs flex items-center justify-center space-x-1.5 shadow-md cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>আবেদন করুন</span>
        </button>
      </div>
    </>
  );
};
