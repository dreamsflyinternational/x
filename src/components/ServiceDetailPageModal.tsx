import React, { useState } from 'react';
import { PriceNotice } from './PriceNotice';
import {
  X,
  CheckCircle2,
  Clock,
  ShieldCheck,
  PhoneCall,
  MessageCircle,
  FileText,
  Building,
  HelpCircle,
  ArrowRight,
  Send,
  Sparkles,
  Globe,
  Briefcase,
  GraduationCap,
  Heart,
  Users,
  Plane,
  Award,
  TrendingUp,
  CreditCard
} from 'lucide-react';

export interface ServiceDetailItem {
  id: string;
  title: string;
  titleBn: string;
  category: string;
  tagline: string;
  overviewBn: string;
  processingTime: string;
  startingPriceBDT: number;
  startingPriceUSD: number;
  benefits: string[];
  requiredDocuments: string[];
  processSteps: { step: number; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}

interface ServiceDetailPageModalProps {
  service: ServiceDetailItem;
  currency?: 'BDT' | 'USD';
  onClose: () => void;
  onOpenBookingModal: (serviceType?: string) => void;
}

export const ServiceDetailPageModal: React.FC<ServiceDetailPageModalProps> = ({
  service,
  currency = 'BDT',
  onClose,
  onOpenBookingModal,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleWhatsApp = () => {
    const textMsg = `আসসালামু আলাইকুম, আমি ${service.titleBn} (${service.title}) প্রসেসিং সম্পর্কে জানতে চাচ্ছি।`;
    const encoded = encodeURIComponent(textMsg);
    window.open(`https://wa.me/8801771304219?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-gray-200 my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#DC2626] via-red-800 to-[#991B1B] text-white p-6 relative flex items-start justify-between shadow-md">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-amber-400 text-gray-900 font-extrabold rounded-full text-xs uppercase shadow-sm">
              {service.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-sans tracking-tight">
              {service.titleBn} ({service.title})
            </h2>
            <p className="text-xs sm:text-sm text-red-100 font-medium leading-relaxed">
              {service.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer shrink-0 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {/* Overview & Key Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-200 pb-2">
                সেবার বিস্তারিত বিবরণ (Service Overview)
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                {service.overviewBn}
              </p>

              {/* Benefits Checklist */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  মূল সুবিধাসমূহ (Key Benefits):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-2 bg-red-50/70 p-2.5 rounded-xl border border-red-100 text-xs font-bold text-gray-800">
                      <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Pricing & Instant Action Card */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-4 h-fit">
              <div>
                <span className="text-[10px] text-gray-500 font-extrabold uppercase block">
                  আনুমানিক প্রসেসিং ফি
                </span>
                <span className="text-2xl font-black text-[#DC2626]">
                  {currency === 'BDT'
                    ? `৳${service.startingPriceBDT.toLocaleString('en-BD')}`
                    : `$${service.startingPriceUSD}`}
                </span>
                <span className="text-xs text-gray-500 block font-medium">থেকে শুরু (শর্তসাপেক্ষ)</span>
              </div>

              <div className="space-y-2 text-xs border-t border-b border-gray-200 py-3 text-gray-700">
                <div className="flex items-center justify-between">
                  <span className="font-bold">প্রসেসিং সময়:</span>
                  <span className="font-extrabold text-gray-900">{service.processingTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold">ফাইল রিভিউ:</span>
                  <span className="font-extrabold text-emerald-600">১০০% ফ্রি ফ্রন্ট রিভিউ</span>
                </div>
              </div>

              <PriceNotice variant="compact" />

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onOpenBookingModal(service.title);
                  }}
                  className="w-full py-3 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold text-xs uppercase rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  সরাসরি বুকিং / ফাইল রিভিউ
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>হোয়াটসঅ্যাপে তাৎক্ষণিক কথা বলুন</span>
                </button>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-200 pb-2">
              আবেদন করার ধাপসমূহ (Step-by-Step Process)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {service.processSteps.map((step) => (
                <div key={step.step} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-red-100 text-[#DC2626] font-black text-sm flex items-center justify-center">
                    {step.step}
                  </span>
                  <h4 className="text-xs font-bold text-gray-900">{step.title}</h4>
                  <p className="text-[11px] text-gray-600 leading-relaxed font-normal">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div className="space-y-3 bg-red-50/50 p-5 rounded-2xl border border-red-100">
            <h3 className="text-sm font-extrabold text-gray-900 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#DC2626]" />
              <span>প্রয়োজনীয় কাগজপত্রের তালিকা (Required Documents)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-800">
              {service.requiredDocuments.map((doc, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-white p-2.5 rounded-xl border border-gray-200 font-semibold">
                  <span className="text-red-600 font-black">•</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          {service.faqs.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-200 pb-2">
                সাধারণ জিজ্ঞাসাবলী (FAQ)
              </h3>
              <div className="space-y-2">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-1">
                    <h4 className="text-xs font-bold text-gray-900">প্রশ্ন: {faq.question}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">উত্তর: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Contact Form */}
          <div className="bg-gradient-to-br from-red-900 to-amber-950 text-white p-6 rounded-3xl space-y-4 shadow-xl">
            <div className="text-center max-w-lg mx-auto space-y-1">
              <h3 className="text-lg font-black">
                {service.titleBn} সম্পর্কিত যে কোনো প্রশ্নের উত্তর পেতে যোগাযোগ করুন
              </h3>
              <p className="text-xs text-amber-200 font-medium">
                আমাদের অভিজ্ঞ কনসালট্যান্ট আপনাকে সঠিক তথ্য দিয়ে সাহায্য করবে
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl text-center space-y-2 border border-white/30">
                <CheckCircle2 className="w-8 h-8 text-amber-300 mx-auto" />
                <h4 className="font-extrabold text-sm">ধন্যবাদ! আপনার ইনকোয়ারি জমা হয়েছে।</h4>
                <p className="text-xs text-red-100">
                  ড্রিমস ফ্লাই ইন্টারন্যাশনালের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <input
                  type="text"
                  required
                  placeholder="আপনার পূর্ণ নাম"
                  value={inquiryForm.fullName}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, fullName: e.target.value })}
                  className="px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-red-200 outline-none focus:border-amber-300"
                />
                <input
                  type="tel"
                  required
                  placeholder="মোবাইল নম্বর"
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                  className="px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-red-200 outline-none focus:border-amber-300"
                />
                <button
                  type="submit"
                  className="py-2.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold rounded-xl shadow transition-colors cursor-pointer"
                >
                  বার্তা পাঠান
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            <ShieldCheck className="w-4 h-4 text-[#DC2626]" />
            <span>১০০% অফিসিয়াল ফাইল ফাইল প্রসেসিং গ্যারান্টি</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-800 hover:bg-gray-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
