import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Globe,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../lib/i18n';

export const ContactView: React.FC = () => {
  const { t } = useLanguage();
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-900 space-y-12 animate-in fade-in font-sans">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block" data-i18n="contact.tag">
          {t('contact.tag', 'Get In Touch')}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900" data-i18n="contact.heading">
          {t('contact.heading', 'Contact Our Consultancy Desk')}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed" data-i18n="contact.subheading">
          {t('contact.subheading', 'Visit our offices in Dhaka or Chapainawabganj, or talk to an advisor online today.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-4 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3" data-i18n="contact.office_dhaka">
              {t('contact.office_dhaka', 'Dhaka HQ Office')}
            </h3>

            <a
              href="tel:+8801771304219"
              className="flex items-start space-x-3.5 p-3 rounded-2xl bg-gray-50 border border-gray-200 hover:border-[#DC2626] transition-all"
            >
              <div className="p-2.5 bg-red-50 text-[#DC2626] rounded-xl border border-red-200">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-bold text-sm text-gray-900" data-i18n="topbar.phone">{t('topbar.phone', '+880 1771-304219')}</span>
                <span className="text-xs text-gray-500" data-i18n="topbar.whatsapp">{t('topbar.whatsapp', 'WhatsApp Support')}</span>
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
                <span className="block font-bold text-sm text-gray-900 break-all" data-i18n="topbar.email">{t('topbar.email', 'dreamsflyinternational@gmail.com')}</span>
                <span className="text-xs text-gray-500">Official Contact Email</span>
              </div>
            </a>

            {/* Office 1 */}
            <div className="flex items-start space-x-3.5 p-3 rounded-2xl bg-gray-50 border border-gray-200">
              <div className="p-2.5 bg-red-50 text-[#DC2626] rounded-xl border border-red-200">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-bold text-sm text-gray-900" data-i18n="contact.office_dhaka">{t('contact.office_dhaka', 'Dhaka HQ Office')}</span>
                <span className="text-xs text-gray-600" data-i18n="contact.dhaka_addr">
                  {t('contact.dhaka_addr', 'Road 16, Rupnagar, Mirpur 11, Dhaka-1216')}
                </span>
              </div>
            </div>

            {/* Office 2 */}
            <div className="flex items-start space-x-3.5 p-3 rounded-2xl bg-gray-50 border border-gray-200">
              <div className="p-2.5 bg-red-50 text-[#DC2626] rounded-xl border border-red-200">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-bold text-sm text-gray-900" data-i18n="contact.office_chapai">{t('contact.office_chapai', 'Chapainawabganj Branch')}</span>
                <span className="text-xs text-gray-600" data-i18n="contact.chapai_addr">
                  {t('contact.chapai_addr', 'Rohanpur, Gomastapur, Chapainawabganj')}
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 p-3 rounded-2xl bg-gray-50 border border-gray-200">
              <div className="p-2.5 bg-red-50 text-[#DC2626] rounded-xl border border-red-200">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-bold text-sm text-gray-900">Official Website Portal</span>
                <a href="https://dreamsfly.net/" target="_blank" rel="noopener noreferrer" className="text-xs text-[#DC2626] hover:underline font-bold">
                  https://dreamsfly.net/
                </a>
              </div>
            </div>

            {/* Social Media Buttons */}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <span className="block font-bold text-xs text-gray-700">Official Social Media Pages:</span>
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
          <h3 className="text-2xl font-bold text-gray-900" data-i18n="contact.form_submit">
            {t('contact.form_submit', 'Submit Consultation Inquiry')}
          </h3>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-emerald-800" data-i18n="common.success">
                {t('common.success', 'Success')}
              </h4>
              <p className="text-xs text-gray-600">
                Our consultancy desk will reach out to you on {phone} within 15 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1" data-i18n="contact.form_name">
                    {t('contact.form_name', 'Full Name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#DC2626]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1" data-i18n="contact.form_phone">
                    {t('contact.form_phone', 'Phone Number')}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1711-XXXXXX"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#DC2626]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#DC2626]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1" data-i18n="contact.form_service">
                    {t('contact.form_service', 'Service / Country Interest')}
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#DC2626]"
                  >
                    <option value="Canada Visit Visa">Canada Visit Visa</option>
                    <option value="UK Student Visa">UK Student Visa</option>
                    <option value="Schengen Visa">Europe Schengen Visa</option>
                    <option value="Schengen Work Permit">Romania / Hungary Work Permit</option>
                    <option value="Umrah Package">5-Star VIP Umrah Package</option>
                    <option value="Air Ticket">Discounted Flight Booking</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1" data-i18n="contact.form_message">
                  {t('contact.form_message', 'Your Message / Inquiry')}
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details about your travel history, bank statement status or specific queries..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#DC2626]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
                data-i18n="contact.form_submit"
              >
                <Send className="w-4 h-4" />
                <span>{t('contact.form_submit', 'Submit Consultation Inquiry')}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
