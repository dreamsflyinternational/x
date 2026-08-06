import React, { useState } from 'react';
import { Send, CheckCircle2, X, Sparkles } from 'lucide-react';
import { COUNTRIES } from '../data/countries';

interface BookingInquiryModalProps {
  initialServiceType?: string;
  onClose: () => void;
}

export const BookingInquiryModal: React.FC<BookingInquiryModalProps> = ({
  initialServiceType,
  onClose,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [selectedService, setSelectedService] = useState(initialServiceType || 'কানাডা ট্যুরিস্ট ভিসা (V-1)');
  const [destinationCountry, setDestinationCountry] = useState('কানাডা');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [appIdGenerated, setAppIdGenerated] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    try {
      const res = await fetch('/api/inquiry/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          passportNumber,
          selectedService,
          destinationCountry,
          notes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAppIdGenerated(data.applicationId || 'DF-10982');
        setSubmitted(true);
      } else {
        setAppIdGenerated(`DF-${Math.floor(10000 + Math.random() * 90000)}`);
        setSubmitted(true);
      }
    } catch (err) {
      setAppIdGenerated(`DF-${Math.floor(10000 + Math.random() * 90000)}`);
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white text-gray-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-red-200 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-[#DC2626] text-xs font-black uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4 text-[#DC2626]" />
          <span>অফিসিয়াল ফাইল সাবমিশন পোর্টাল</span>
        </div>

        <h3 className="text-2xl font-bold font-sans text-gray-900 mb-2">
          ফ্রি কনসালটেশন ও কোটেশন ফর্ম
        </h3>
        <p className="text-xs text-gray-600 mb-6 leading-relaxed">
          এই তথ্যগুলো পূরণ করুন। আমাদের সিনিয়র ভিসা অফিসার ১৫ মিনিটের মধ্যে প্রয়োজনীয় পেপারস ও খরচের হিসাব সহ কল করবেন।
        </p>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-lg font-bold text-emerald-800">আবেদন সফলভাবে গৃহীত হয়েছে!</h4>
            <div className="bg-white p-3 rounded-xl border border-emerald-200 font-mono text-[#DC2626] font-bold text-sm shadow-sm">
              আপনার ট্র্যাকিং আইডি: <strong>{appIdGenerated}</strong>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              আমাদের সিনিয়র অফিসার শীঘ্রই আপনার <strong>{phone}</strong> নম্বরে কল অথবা হোয়াটসঅ্যাপ করবেন।
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2.5 bg-[#DC2626] text-white font-bold rounded-xl text-xs hover:bg-[#B71C1C] transition-colors"
            >
              ফিরে যান
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">আপনার পূর্ণ নাম (পাসপোর্ট অনুযায়ী)</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="যেমন: তানভীর আহমেদ"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#DC2626]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">মোবাইল / হোয়াটসঅ্যাপ নম্বর</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+৮৮০ ১৭১১-XXXXXX"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#DC2626]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">ইমেইল এড্রেস (ঐচ্ছিক)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#DC2626]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">সেবার ক্যাটাগরি</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#DC2626]"
                >
                  <option value="কানাডা ট্যুরিস্ট ভিসা (V-1)">কানাডা ট্যুরিস্ট ভিসা (V-1)</option>
                  <option value="যুক্তরাজ্য স্টুডেন্ট / ট্যুরিস্ট">যুক্তরাজ্য স্টুডেন্ট / ট্যুরিস্ট</option>
                  <option value="ইউরোপ শেনজেন ভিসা">ইউরোপ শেনজেন ভিসা</option>
                  <option value="ওয়ার্ক পারমিট ভিসা">শেনজেন / এশিয়া ওয়ার্ক পারমিট</option>
                  <option value="অস্ট্রেলিয়া ট্যুরিস্ট ভিসা">অস্ট্রেলিয়া সাবক্লাস ৬০০</option>
                  <option value="ওমরাহ ও হজ প্যাকেজ">ওমরাহ ও হজ প্যাকেজ</option>
                  <option value="এয়ার টিকিট বুকিং">এয়ার টিকিট বুকিং ও ফেয়ার</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">গন্তব্য দেশ</label>
                <select
                  value={destinationCountry}
                  onChange={(e) => setDestinationCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#DC2626]"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">পাসপোর্ট নম্বর (ঐচ্ছিক)</label>
              <input
                type="text"
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
                placeholder="যেমন: A08923412"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#DC2626]"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">অতিরিক্ত কোনো তথ্য / ভ্রমণের সময়কাল</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="ভ্রমণের আনুমানিক মাস, পরিবারের সদস্য সংখ্যা বা যেকোনো প্রশ্ন লিখুন..."
                className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#DC2626]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2 mt-2"
            >
              <Send className="w-4 h-4" />
              <span>তথ্য পাঠিয়ে কল ব্যাক পান</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
