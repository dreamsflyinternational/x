import React, { useState } from 'react';
import { HeroBanner } from '../components/HeroBanner';
import { PriceNotice } from '../components/PriceNotice';
import { CountryFlagSvg } from '../components/CountryFlagSvg';
import { ViewType } from '../types';
import { useLanguage } from '../lib/i18n';
import {
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Phone,
  Mail,
  Compass,
  Plane,
  Briefcase,
  Moon,
  Globe,
  Award,
  Users,
  ShieldCheck,
  Hotel,
  Quote,
  Sparkles,
  MapPin,
  Clock,
  TrendingUp,
  FileText,
  Building2,
  Search,
  Check,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface HomeViewProps {
  currency: 'BDT' | 'USD';
  onSelectView: (view: ViewType) => void;
  onSelectCountry: (countryId: string) => void;
  onOpenBookingModal: (serviceType?: string) => void;
  onOpenAiPlanner: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currency,
  onSelectView,
  onSelectCountry,
  onOpenBookingModal,
  onOpenAiPlanner,
}) => {
  const { t, lang } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'europe' | 'middle-east' | 'asia'>('all');

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const WORK_PERMIT_DESTINATIONS = [
    {
      id: 'hungary',
      name: 'Hungary',
      nameBn: 'হাঙ্গেরি',
      region: 'europe',
      regionName: lang === 'en' ? 'Europe (Schengen)' : 'ইউরোপ (শেনজেন)',
      salary: '€950–€1000 / month',
      salaryBn: '€৯৫০–€১০০০ / মাস',
      duty: '5 days/week • 8 hours/day',
      dutyBn: 'সপ্তাহে ৫ দিন • প্রতিদিন ৮ ঘণ্টা',
      processingTime: 'Up to 6 Months',
      processingTimeBn: 'সর্বোচ্চ ৬ মাস',
      jobs: ['Factory Worker', 'Construction', 'Agriculture', 'Hotel Staff'],
      popular: true
    },
    {
      id: 'slovenia',
      name: 'Slovenia',
      nameBn: 'স্লোভেনিয়া',
      region: 'europe',
      regionName: lang === 'en' ? 'Europe (Schengen)' : 'ইউরোপ (শেনজেন)',
      salary: '€1250–€1350 / month',
      salaryBn: '€১২৫০–€১৩৫০ / মাস',
      duty: '5 days/week • 8 hours/day',
      dutyBn: 'সপ্তাহে ৫ দিন • প্রতিদিন ৮ ঘণ্টা',
      processingTime: 'Up to 6 Months',
      processingTimeBn: 'সর্বোচ্চ ৬ মাস',
      jobs: ['Factory Worker', 'Construction', 'Hotel Staff', 'General Worker'],
      popular: true
    },
    {
      id: 'romania',
      name: 'Romania',
      nameBn: 'রোমানিয়া',
      region: 'europe',
      regionName: lang === 'en' ? 'Europe (Schengen)' : 'ইউরোপ (শেনজেন)',
      salary: '€650–€700 / month',
      salaryBn: '€৬৫০–€৭০০ / মাস',
      duty: '5 days/week • 8 hours/day',
      dutyBn: 'সপ্তাহে ৫ দিন • প্রতিদিন ৮ ঘণ্টা',
      processingTime: 'Up to 6 Months',
      processingTimeBn: 'সর্বোচ্চ ৬ মাস',
      jobs: ['Factory Worker', 'Agriculture', 'Hotel Staff', 'Construction'],
      popular: true
    },
    {
      id: 'serbia',
      name: 'Serbia',
      nameBn: 'সার্বিয়া',
      region: 'europe',
      regionName: lang === 'en' ? 'Europe' : 'ইউরোপ',
      salary: '€550–€600 / month',
      salaryBn: '€৫৫০–€৬০০ / মাস',
      duty: '5 days/week • 8 hours/day',
      dutyBn: 'সপ্তাহে ৫ দিন • প্রতিদিন ৮ ঘণ্টা',
      processingTime: 'Up to 6 Months',
      processingTimeBn: 'সর্বোচ্চ ৬ মাস',
      jobs: ['Factory Worker', 'Construction', 'Agriculture']
    },
    {
      id: 'dubai',
      name: 'Dubai (UAE)',
      nameBn: 'দুবাই (সংযুক্ত আরব আমিরাত)',
      region: 'middle-east',
      regionName: lang === 'en' ? 'Middle East' : 'মধ্যপ্রাচ্য',
      salary: 'AED 1200–1400 / month',
      salaryBn: 'AED ১২০০–১৪০০ / মাস',
      duty: '6 days/week • 8 hours/day',
      dutyBn: 'সপ্তাহে ৬ দিন • প্রতিদিন ৮ ঘণ্টা',
      processingTime: '45–60 Days',
      processingTimeBn: '৪৫–৬০ দিন',
      jobs: ['Hotel Staff', 'Warehouse Worker', 'Cleaner', 'Helper'],
      popular: true
    },
    {
      id: 'saudi-arabia',
      name: 'Saudi Arabia',
      nameBn: 'সৌদি আরব',
      region: 'middle-east',
      regionName: lang === 'en' ? 'Middle East' : 'মধ্যপ্রাচ্য',
      salary: 'SAR 1200 / month',
      salaryBn: 'SAR ১২০০ / মাস',
      duty: '6 days/week • 9 hours/day',
      dutyBn: 'সপ্তাহে ৬ দিন • প্রতিদিন ৯ ঘণ্টা',
      processingTime: '30–45 Days',
      processingTimeBn: '৩০–৪৫ দিন',
      jobs: ['General Worker', 'Cleaner', 'Packaging', 'Warehouse Staff'],
      popular: true
    },
    {
      id: 'malaysia',
      name: 'Malaysia',
      nameBn: 'মালয়েশিয়া',
      region: 'asia',
      regionName: lang === 'en' ? 'Asia' : 'এশিয়া',
      salary: 'MYR 1700 / month',
      salaryBn: 'MYR ১৭০০ / মাস',
      duty: '6 days/week • 8 hours/day',
      dutyBn: 'সপ্তাহে ৬ দিন • প্রতিদিন ৮ ঘণ্টা',
      processingTime: '2–3 Months',
      processingTimeBn: '২–৩ মাস',
      jobs: ['Factory Worker', 'Plantation', 'Construction'],
      popular: true
    }
  ];

  const filteredDestinations = selectedRegion === 'all'
    ? WORK_PERMIT_DESTINATIONS
    : WORK_PERMIT_DESTINATIONS.filter(d => d.region === selectedRegion);

  const POPULAR_JOBS = [
    { title: lang === 'en' ? 'Factory Worker' : 'ফ্যাক্টরি ওয়ার্কার', code: 'FAC' },
    { title: lang === 'en' ? 'General Worker' : 'জেনারেল ওয়ার্কার', code: 'GEN' },
    { title: lang === 'en' ? 'Construction Worker' : 'কনস্ট্রাকশন ওয়ার্কার', code: 'CON' },
    { title: lang === 'en' ? 'Agriculture & Farm Staff' : 'কৃষি ও ফার্ম কর্মী', code: 'AGR' },
    { title: lang === 'en' ? 'Hotel & Hospitality' : 'হোটেল ও রেস্টুরেন্ট স্টাফ', code: 'HOT' },
    { title: lang === 'en' ? 'Logistics & Warehouse' : 'লজিস্টিকস ও ওয়ারহাউজ', code: 'LOG' },
  ];

  const OUR_SERVICES = [
    {
      id: 'work-permit',
      icon: <Briefcase className="w-6 h-6 text-red-600" />,
      titleKey: 'services.work_permit',
      descKey: 'services.work_permit_desc',
      badgeKey: 'badge.verified',
      view: 'work-permit' as ViewType,
      featured: true
    },
    {
      id: 'visa-assistance',
      icon: <Compass className="w-6 h-6 text-slate-700" />,
      titleKey: 'services.visa_assistance',
      descKey: 'services.visa_assistance_desc',
      badgeKey: 'badge.popular',
      view: 'countries' as ViewType
    },
    {
      id: 'air-ticket',
      icon: <Plane className="w-6 h-6 text-slate-700" />,
      titleKey: 'services.air_tickets',
      descKey: 'services.air_tickets_desc',
      badgeKey: 'badge.verified',
      view: 'air-tickets' as ViewType
    },
    {
      id: 'umrah-hajj',
      icon: <Moon className="w-6 h-6 text-amber-600" />,
      titleKey: 'services.umrah',
      descKey: 'services.umrah_desc',
      badgeKey: 'badge.popular',
      view: 'umrah-hajj' as ViewType
    },
    {
      id: 'tour-packages',
      icon: <Globe className="w-6 h-6 text-slate-700" />,
      titleKey: 'services.tours',
      descKey: 'services.tours_desc',
      badgeKey: 'badge.verified',
      view: 'tours' as ViewType
    },
    {
      id: 'hotel-booking',
      icon: <Hotel className="w-6 h-6 text-slate-700" />,
      titleKey: 'services.hotels',
      descKey: 'services.hotels_desc',
      badgeKey: 'badge.verified',
      view: 'hotel' as ViewType
    }
  ];

  const TESTIMONIALS = [
    {
      name: lang === 'en' ? 'Rafiqul Islam' : 'রফিকুল ইসলাম',
      destination: lang === 'en' ? 'Hungary Schengen Work Permit' : 'হাঙ্গেরি শেনজেন ওয়ার্ক পারমিট',
      text: lang === 'en' 
        ? 'Dreams Fly International made my Europe work permit process smooth and transparent. Obtained my visa within 5 months!'
        : 'ড্রিমস ফ্লাই ইন্টারন্যাশনালের মাধ্যমে হাঙ্গেরি ওয়ার্ক পারমিটের প্রক্রিয়া অত্যন্ত স্বচ্ছ ছিল। ৫ মাসের মধ্যে ভিসা পেয়েছি।',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: 5
    },
    {
      name: lang === 'en' ? 'Tanvir Ahmed' : 'তানভীর আহমেদ',
      destination: lang === 'en' ? 'Canada Visit & Tourist Visa' : 'কানাডা ভিজিট ভিসা',
      text: lang === 'en'
        ? 'Professional file preparation and genuine support. Their legal advisory helped my Canada visa get approved in first attempt.'
        : 'পেশাদার ফাইল সাবমিশন ও সঠিক নির্দেশনার জন্য প্রথমবারেই আমার কানাডা ভিজিট ভিসা অনুমোদিত হয়েছে।',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5
    },
    {
      name: lang === 'en' ? 'Shahida Begum' : 'শাহিদা বেগম',
      destination: lang === 'en' ? 'VIP Umrah Package' : 'ভিআইপি উমরাহ প্যাকেজ',
      text: lang === 'en'
        ? 'Flawless hotel accommodations near Haramain and excellent support during our holy Umrah journey.'
        : 'পবিত্র উমরাহ যাত্রায় হারামাইনের কাছে ফাইভ স্টার হোটেল ও মুয়াল্লিম সেবা অত্যন্ত চমৎকার ছিল।',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      rating: 5
    }
  ];

  const FAQS = [
    {
      qKey: 'faq.q1',
      qFallback: 'How long does a Work Permit visa application take?',
      aKey: 'faq.a1',
      aFallback: 'Processing times vary by destination. Middle East (Dubai, Saudi Arabia) takes 30–60 days, Malaysia takes 2–3 months, and European countries (Hungary, Slovenia, Romania) take up to 6 months.'
    },
    {
      qKey: 'faq.q2',
      qFallback: 'What are the basic eligibility requirements for Europe Work Permits?',
      aKey: 'faq.a2',
      aFallback: 'A valid passport (minimum 2 years validity), police clearance certificate, passport-size photographs, and relevant work experience in factory, construction, or hospitality sectors.'
    },
    {
      qKey: 'faq.q3',
      qFallback: 'Can I visit your offices for a free consultation?',
      aKey: 'faq.a3',
      aFallback: 'Yes! Walk-in consultation is available at our Mirpur 11, Dhaka office and Chapainawabganj branch Saturday to Thursday, 9:00 AM to 8:00 PM.'
    },
    {
      qKey: 'faq.q4',
      qFallback: 'Are your Umrah and flight tickets customizable?',
      aKey: 'faq.a4',
      aFallback: 'Absolutely. We provide customized 5-star, 4-star, or economy Umrah packages, direct or connecting flight ticketing, and tailored group tours.'
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 space-y-20 pb-20 font-sans">
      
      {/* 1. Hero Banner */}
      <HeroBanner
        currency={currency}
        onSelectView={onSelectView}
        onSelectCountry={onSelectCountry}
        onOpenBookingModal={onOpenBookingModal}
        onOpenAiPlanner={onOpenAiPlanner}
      />

      {/* 2. Interactive Quick Tools Navigation Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-200/90 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => onSelectView('eligibility')}
            className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-left transition-all hover:border-red-500/50 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mb-3 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 group-hover:text-red-600 transition-colors" data-i18n="tools.eligibility">
              {t('tools.eligibility', 'Visa Eligibility Checker')}
            </h4>
            <p className="text-xs text-slate-500 mt-1">Check profile match</p>
          </button>

          <button
            onClick={() => onSelectView('calculator')}
            className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-left transition-all hover:border-red-500/50 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 group-hover:text-red-600 transition-colors" data-i18n="tools.calculator">
              {t('tools.calculator', 'Cost Estimator')}
            </h4>
            <p className="text-xs text-slate-500 mt-1">Estimate processing fees</p>
          </button>

          <button
            onClick={() => onSelectView('tracker')}
            className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-left transition-all hover:border-red-500/50 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 group-hover:text-red-600 transition-colors" data-i18n="tools.tracker">
              {t('tools.tracker', 'Live Application Status')}
            </h4>
            <p className="text-xs text-slate-500 mt-1">Track file progression</p>
          </button>

          <button
            onClick={() => onSelectView('checklist')}
            className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-left transition-all hover:border-red-500/50 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-3 group-hover:bg-sky-600 group-hover:text-white transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 group-hover:text-red-600 transition-colors" data-i18n="tools.checklist">
              {t('tools.checklist', 'Document Checklist')}
            </h4>
            <p className="text-xs text-slate-500 mt-1">Required papers list</p>
          </button>
        </div>
      </section>

      {/* 3. Featured Work Permit & Visa Destinations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100" data-i18n="destinations.tag">
              {t('destinations.tag', 'Featured Countries')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" data-i18n="destinations.heading">
              {t('destinations.heading', 'Popular Visa & Work Permit Destinations')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed" data-i18n="destinations.subheading">
              {t('destinations.subheading', 'Explore processing times, average salaries, and visa requirement details for leading global destinations.')}
            </p>
          </div>

          {/* Region Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedRegion('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRegion === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All Regions
            </button>
            <button
              onClick={() => setSelectedRegion('europe')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRegion === 'europe'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Europe
            </button>
            <button
              onClick={() => setSelectedRegion('middle-east')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRegion === 'middle-east'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Middle East
            </button>
            <button
              onClick={() => setSelectedRegion('asia')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRegion === 'asia'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Asia
            </button>
          </div>
        </div>

        {/* Handcrafted Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((country) => (
            <div
              key={country.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 p-6 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center space-x-3">
                    <CountryFlagSvg countryId={country.id} className="w-8 h-6 rounded border border-slate-200" />
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                        {lang === 'en' ? country.name : country.nameBn}
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase">
                        {country.regionName}
                      </span>
                    </div>
                  </div>
                  {country.popular && (
                    <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-red-100" data-i18n="badge.popular">
                      {t('badge.popular', 'Popular')}
                    </span>
                  )}
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-600 font-medium" data-i18n="destinations.salary">
                      {t('destinations.salary', 'Monthly Salary:')}
                    </span>
                    <span className="font-bold text-slate-900">
                      {lang === 'en' ? country.salary : country.salaryBn}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span data-i18n="destinations.duty">{t('destinations.duty', 'Work Schedule:')}</span>
                    <span className="font-semibold text-slate-800">
                      {lang === 'en' ? country.duty : country.dutyBn}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span data-i18n="destinations.processing">{t('destinations.processing', 'Processing Time:')}</span>
                    <span className="font-semibold text-red-600">
                      {lang === 'en' ? country.processingTime : country.processingTimeBn}
                    </span>
                  </div>
                </div>

                {country.jobs && (
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {country.jobs.map((job, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 text-[11px] px-2.5 py-1 rounded-md border border-slate-200/60 font-medium">
                          {job}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100">
                <button
                  onClick={() => onOpenBookingModal(`Inquiry: ${country.name}`)}
                  className="w-full py-3 bg-slate-900 group-hover:bg-red-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span data-i18n="destinations.apply_btn">{t('destinations.apply_btn', 'Apply for Destination')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Asymmetric Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3.5 py-1 rounded-full border border-red-100" data-i18n="services.tag">
            {t('services.tag', 'Our Core Services')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" data-i18n="services.heading">
            {t('services.heading', 'Enterprise Travel & Visa Solutions')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed" data-i18n="services.subheading">
            {t('services.subheading', 'Complete end-to-end guidance from initial file evaluation to visa stamping and flight departure.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OUR_SERVICES.map((s) => (
            <div
              key={s.id}
              onClick={() => onSelectView(s.view)}
              className={`rounded-2xl p-7 border transition-all duration-300 group cursor-pointer flex flex-col justify-between ${
                s.featured
                  ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white border-slate-800 shadow-xl'
                  : 'bg-white text-slate-900 border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    s.featured ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {s.icon}
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                    s.featured ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-slate-100 text-slate-600'
                  }`} data-i18n={s.badgeKey}>
                    {t(s.badgeKey)}
                  </span>
                </div>

                <div>
                  <h3 className={`text-xl font-bold ${s.featured ? 'text-white' : 'text-slate-900 group-hover:text-red-600'} transition-colors`} data-i18n={s.titleKey}>
                    {t(s.titleKey)}
                  </h3>
                  <p className={`text-xs leading-relaxed mt-2 ${s.featured ? 'text-slate-300' : 'text-slate-600'}`} data-i18n={s.descKey}>
                    {t(s.descKey)}
                  </p>
                </div>
              </div>

              <div className={`pt-5 mt-5 border-t flex items-center justify-between text-xs font-bold ${
                s.featured ? 'border-slate-700/80 text-red-400' : 'border-slate-100 text-red-600'
              }`}>
                <span data-i18n="services.view_details">{t('services.view_details', 'Explore Details')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Process Roadmap Timeline */}
      <section className="bg-slate-900 text-white py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-3.5 py-1 rounded-full border border-red-500/20" data-i18n="process.tag">
              {t('process.tag', 'Step-by-Step Journey')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight" data-i18n="process.heading">
              {t('process.heading', 'How Our Process Works')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed" data-i18n="process.subheading">
              {t('process.subheading', 'Clear 6-step roadmap engineered for speed, transparency, and accuracy.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center">1</span>
              <h3 className="text-base font-bold text-white" data-i18n="process.step1_title">{t('process.step1_title')}</h3>
              <p className="text-xs text-slate-300 leading-relaxed" data-i18n="process.step1_desc">{t('process.step1_desc')}</p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center">2</span>
              <h3 className="text-base font-bold text-white" data-i18n="process.step2_title">{t('process.step2_title')}</h3>
              <p className="text-xs text-slate-300 leading-relaxed" data-i18n="process.step2_desc">{t('process.step2_desc')}</p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center">3</span>
              <h3 className="text-base font-bold text-white" data-i18n="process.step3_title">{t('process.step3_title')}</h3>
              <p className="text-xs text-slate-300 leading-relaxed" data-i18n="process.step3_desc">{t('process.step3_desc')}</p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center">4</span>
              <h3 className="text-base font-bold text-white" data-i18n="process.step4_title">{t('process.step4_title')}</h3>
              <p className="text-xs text-slate-300 leading-relaxed" data-i18n="process.step4_desc">{t('process.step4_desc')}</p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center">5</span>
              <h3 className="text-base font-bold text-white" data-i18n="process.step5_title">{t('process.step5_title')}</h3>
              <p className="text-xs text-slate-300 leading-relaxed" data-i18n="process.step5_desc">{t('process.step5_desc')}</p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center">6</span>
              <h3 className="text-base font-bold text-white" data-i18n="process.step6_title">{t('process.step6_title')}</h3>
              <p className="text-xs text-slate-300 leading-relaxed" data-i18n="process.step6_desc">{t('process.step6_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Client Success Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3.5 py-1 rounded-full border border-red-100" data-i18n="testimonials.tag">
            {t('testimonials.tag', 'Client Success Stories')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" data-i18n="testimonials.heading">
            {t('testimonials.heading', 'What Our Travelers Say')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed" data-i18n="testimonials.subheading">
            {t('testimonials.subheading', 'Real stories from professionals, students, and families who achieved their travel dreams with us.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div key={idx} className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <Quote className="w-8 h-8 text-red-500/20" />
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center space-x-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                  <span className="text-[11px] text-red-600 font-semibold block">{item.destination}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-200 px-3.5 py-1 rounded-full" data-i18n="faq.tag">
            {t('faq.tag', 'Frequently Asked Questions')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" data-i18n="faq.heading">
            {t('faq.heading', 'Have Questions? We Have Answers')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed" data-i18n="faq.subheading">
            {t('faq.subheading', 'Everything you need to know about our visa processing timeline, requirements, and services.')}
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 text-left font-bold text-sm text-slate-900 flex justify-between items-center cursor-pointer hover:text-red-600 transition-colors"
                aria-expanded={openFaq === idx}
              >
                <span data-i18n={faq.qKey}>{t(faq.qKey, faq.qFallback)}</span>
                <ChevronDown className={`w-4 h-4 text-red-600 transition-transform ${openFaq === idx ? 'transform rotate-180' : ''}`} />
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50" data-i18n={faq.aKey}>
                  {t(faq.aKey, faq.aFallback)}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. Enterprise CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-700 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              আজই আপনার ভিসা আবেদনের প্রক্রিয়া শুরু করুন
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              সরাসরি আমাদের কনসালটেন্ট টিমের সাথে কথা বলে ফ্রি প্রোফাইল ইভালুয়েশন পান।
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <button
              onClick={() => onOpenBookingModal('Final CTA Booking')}
              className="px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 font-extrabold rounded-xl text-sm transition-colors shadow-md cursor-pointer flex items-center space-x-2"
            >
              <Briefcase className="w-4 h-4 text-red-600" />
              <span>বিনামূল্যে কনসালটেশন নিন</span>
            </button>
            <a
              href="tel:+8801771304219"
              className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-xl text-sm transition-colors shadow-md cursor-pointer flex items-center space-x-2"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>কল করুন: +৮৮০ ১৭৭১-৩০৪২১৯</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
