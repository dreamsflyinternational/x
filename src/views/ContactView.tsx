import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Globe,
  CheckCircle2
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('কানাডা ট্যুরিস্ট ভিসা');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    try {
      await fetch('/api/inquiry/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Contact Us Direct Message',
          name,
          phone,
          email,
          service: subject,
          message,
        }),
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
      }, 5000);
    } catch (err) {
      console.error('Contact form submission error:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-900 space-y-12 animate-in fade-in">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
          ২৪/৭ লাইভ ভিসা সাপোর্ট
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-sans text-gray-900">
          যোগাযোগ করুন
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          মিরপুর ১১ (ঢাকা) ও রহনপুর (চাঁপাইনবাবগঞ্জ) অফিসে সরাসরি আসার জন্য বা যেকোনো প্রয়োজনে ফোন অথবা হোয়াটসঅ্যাপে যোগাযোগ করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-4 shadow-md">
            <h3 className="text-lg font-bold font-sans text-gray-900 border-b border-gray-100 pb-3">
              সরাসরি যোগাযোগের ঠিকানা
            </h3>

            <a
              href="tel:+8801771304219"
              className="flex items-start space-x-3.5 p-3 rounded-2xl bg-gray-50 border border-gray-200 hover:border-[#DC2626] transition-all"
            >
              <div className="p-2.5 bg-red-50 text-[#DC2626] rounded-xl border border-red-200">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-bold text-sm text-gray-900">+৮৮০ ১৭৭১-৩০৪২১৯</span>
                <span className="text-xs text-gray-500">২৪/৭ হটলাইন ও হোয়াটসঅ্যাপ অনলাইন</span>
              </div>
            </a>

            <a
              href="mailto:dreamsflyinternational@gmail.com"
              className="flex items-start space-x-3.5 p-3 rounded-2xl bg-gray-50 border border-gray-200 hover:border-[#DC2626] transition-all"
            >
              <div className="p-2.5 bg-red-50 text-[#DC2626] rounded-xl border border-red-200">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-bold text-sm text-gray-900 break-all">dreamsflyinternational@gmail.com</span>
                <span className="text-xs text-gray-500">অফিসিয়াল ইমেইল এড্রেস</span>
              </div>
            </a>

            {/* Office 1 */}
            <div className="flex items-start space-x-3.5 p-3 rounded-2xl bg-gray-50 border border-gray-200">
              <div className="p-2.5 bg-red-50 text-[#DC2626] rounded-xl border border-red-200">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-bold text-sm text-gray-900">Office 1 (ঢাকা শাখা)</span>
                <span className="text-xs text-gray-600">
                  রোড নং ১৬, রূপনগর, মিরপুর ১১, ঢাকা ১২১৬
                </span>
              </div>
            </div>

            {/* Office 2 */}
            <div className="flex items-start space-x-3.5 p-3 rounded-2xl bg-gray-50 border border-gray-200">
              <div className="p-2.5 bg-red-50 text-[#DC2626] rounded-xl border border-red-200">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-bold text-sm text-gray-900">Office 2 (চাঁপাইনবাবগঞ্জ শাখা)</span>
                <span className="text-xs text-gray-600">
                  রহনপুর, গোমস্তাপুর, চাঁপাইনবাবগঞ্জ
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 p-3 rounded-2xl bg-gray-50 border border-gray-200">
              <div className="p-2.5 bg-red-50 text-[#DC2626] rounded-xl border border-red-200">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-bold text-sm text-gray-900">অফিসিয়াল ওয়েবসাইট</span>
                <a href="https://dreamsfly.net/" target="_blank" rel="noopener noreferrer" className="text-xs text-[#DC2626] hover:underline font-bold">
                  https://dreamsfly.net/
                </a>
              </div>
            </div>

            {/* Social Media Buttons */}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <span className="block font-bold text-xs text-gray-700">অফিসিয়াল সোশ্যাল মিডিয়া পেজ:</span>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://web.facebook.com/dreamsfly/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold text-center transition-all shadow-sm"
                >
                  Facebook Page
                </a>
                <a
                  href="https://www.linkedin.com/company/dreams-fly-international/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-bold text-center transition-all shadow-sm"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xl space-y-4">
          <h3 className="text-2xl font-bold font-sans text-gray-900">সরাসরি মেসেজ পাঠান</h3>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-emerald-800">মেসেজ সফলভাবে পাঠানো হয়েছে!</h4>
              <p className="text-xs text-gray-600">
                আমাদের প্রতিনিধি ১৫ মিনিটের মধ্যে আপনার {phone} নম্বরে যোগাযোগ করবেন।
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">আপনার নাম</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: তানভীর আহমেদ"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#DC2626]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">মোবাইল / হোয়াটসঅ্যাপ</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+৮৮০ ১৭১১-XXXXXX"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#DC2626]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">ইমেইল এড্রেস</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#DC2626]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">প্রয়োজনীয় সেবা</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#DC2626]"
                  >
                    <option value="কানাডা ট্যুরিস্ট ভিসা">কানাডা ট্যুরিস্ট ভিসা</option>
                    <option value="যুক্তরাজ্য স্টুডেন্ট ভিসা">যুক্তরাজ্য স্টুডেন্ট ভিসা</option>
                    <option value="শেনজেন ভিসা">ইউরোপ শেনজেন ভিসা</option>
                    <option value="শেনজেন ওয়ার্ক পারমিট">রোমানিয়া / ক্রোয়েশিয়া ওয়ার্ক পারমিট</option>
                    <option value="ওমরাহ প্যাকেজ">৫-স্টার ভিআইপি ওমরাহ প্যাকেজ</option>
                    <option value="এয়ার টিকিট ফেয়ার">ডিসকাউন্ট এয়ার টিকিট</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">আপনার বার্তা বা প্রশ্ন</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="আপনার ভ্রমণের পরিকল্পনা, ব্যাংক স্টেটমেন্ট সংক্রান্ত তথ্য বা অন্য কোনো বিষয় লিখুন..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#DC2626]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>সিনিয়র কন্সালট্যান্টকে মেসেজ পাঠান</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
