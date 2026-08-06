import React from 'react';
import {
  Phone,
  CheckCircle2,
  Sparkles,
  Award,
  Briefcase,
  Send,
  UserCheck,
  ArrowRight,
  ShieldCheck,
  Globe2
} from 'lucide-react';
import { ViewType } from '../types';
import { useLanguage } from '../lib/i18n';
import { CountUpNumber } from './CountUpNumber';
import { CountryFlagSvg } from './CountryFlagSvg';

interface HeroBannerProps {
  currency: 'BDT' | 'USD';
  onSelectView: (view: ViewType) => void;
  onSelectCountry: (countryId: string) => void;
  onOpenBookingModal: (serviceType?: string) => void;
  onOpenAiPlanner: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCountry,
  onOpenBookingModal,
  onOpenAiPlanner,
}) => {
  const { t } = useLanguage();
  const ceoPhotoUrl = "https://lh3.googleusercontent.com/d/1mUdnFkm_-jt_1TI3xxhpRgjZ_ua_HLfX";

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white py-12 lg:py-20">
      {/* Background Layer with Dark Gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/95 to-slate-900" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Ambient Radial Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Handcrafted Enterprise Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm font-semibold backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-red-400" />
              <span data-i18n="hero.badge">
                {t('hero.badge', 'Licensed & Authorized Visa Consultancy Agency in Dhaka')}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-none text-white font-sans">
              <span data-i18n="hero.title_prefix">{t('hero.title_prefix', 'Your Gateway to Global')}</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-amber-200" data-i18n="hero.title_highlight">
                {t('hero.title_highlight', 'Visas & Work Permits')}
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed" data-i18n="hero.subtitle">
              {t('hero.subtitle', 'কানাডা, যুক্তরাজ্য, যুক্তরাষ্ট্র, ইউরোপ শেনজেন, হাঙ্গেরি, রোমানিয়া, দুবাই, সৌদি আরব, মালয়েশিয়া ও বিশ্বের বিভিন্ন দেশের বিশ্বস্ত ভিসা ও ওয়ার্ক পারমিট প্রসেসিং।')}
            </p>

            {/* Country Flag Badges Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              {[
                { id: 'canada', name: 'কানাডা' },
                { id: 'uk', name: 'যুক্তরাজ্য' },
                { id: 'usa', name: 'যুক্তরাষ্ট্র' },
                { id: 'hungary', name: 'হাঙ্গেরি' },
                { id: 'slovenia', name: 'স্লোভেনিয়া' },
                { id: 'romania', name: 'রোমানিয়া' },
                { id: 'dubai', name: 'দুবাই' },
                { id: 'saudi-arabia', name: 'সৌদি আরব' },
                { id: 'malaysia', name: 'মালয়েশিয়া' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelectCountry(c.id)}
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-slate-900/80 hover:bg-red-950/80 border border-slate-800 hover:border-red-600/50 rounded-lg text-[11px] font-bold text-slate-200 transition-all shadow-xs cursor-pointer"
                >
                  <CountryFlagSvg countryId={c.id} className="w-3.5 h-2.5" />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onOpenBookingModal('Apply for Work Permit')}
                className="px-7 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-red-600/20 transition-all cursor-pointer text-sm sm:text-base flex items-center space-x-2.5 group"
              >
                <Briefcase className="w-5 h-5 text-white" />
                <span data-i18n="hero.cta_apply">{t('hero.cta_apply', 'Get Started Now')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenAiPlanner}
                className="px-7 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold rounded-xl border border-slate-700/80 shadow-md transition-all cursor-pointer text-sm sm:text-base flex items-center space-x-2.5"
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span data-i18n="hero.cta_planner">{t('hero.cta_planner', 'AI Visa Guide')}</span>
              </button>

              <a
                href="https://wa.me/8801771304219?text=Hello%20Dreams%20Fly%20International,%20I%20want%20to%20apply"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-emerald-700/90 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-sm sm:text-base flex items-center space-x-2"
              >
                <Send className="w-4 h-4 text-white" />
                <span data-i18n="topbar.whatsapp">{t('topbar.whatsapp', 'WhatsApp Support')}</span>
              </a>
            </div>

            {/* Enterprise Success Metric Counters with IntersectionObserver */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-center">
                  <CountUpNumber end={98.6} decimals={1} suffix="%" className="text-red-400" />
                </div>
                <div className="text-xs text-slate-400 font-medium" data-i18n="hero.stat_approval_label">
                  {t('hero.stat_approval_label', 'Visa Success Rate')}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-center">
                  <CountUpNumber end={14200} suffix="+" className="text-amber-300" />
                </div>
                <div className="text-xs text-slate-400 font-medium" data-i18n="hero.stat_clients_label">
                  {t('hero.stat_clients_label', 'Happy Travelers')}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-center">
                  <CountUpNumber end={45} suffix="+" className="text-emerald-400" />
                </div>
                <div className="text-xs text-slate-400 font-medium" data-i18n="hero.stat_countries_label">
                  {t('hero.stat_countries_label', 'Global Destinations')}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-center">
                  <CountUpNumber end={12} suffix="+" className="text-sky-400" />
                </div>
                <div className="text-xs text-slate-400 font-medium" data-i18n="hero.stat_experience_label">
                  {t('hero.stat_experience_label', 'Industry Excellence')}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Founder & Executive Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-5 text-center relative overflow-hidden group">
              
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full text-amber-300 text-xs font-semibold">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>প্রতিষ্ঠাতা, চেয়ারম্যান ও সিইও</span>
              </div>

              {/* CEO Frame Photo */}
              <div className="relative mx-auto w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border border-slate-700 shadow-xl bg-slate-950 group-hover:border-amber-400/60 transition-colors">
                <img
                  src={ceoPhotoUrl}
                  alt="MD Jahan Ali - CEO Dreams Fly International"
                  width="192"
                  height="192"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  মো: জাহান আলী
                </h3>
                <p className="text-xs sm:text-sm text-amber-400 font-medium">
                  প্রতিষ্ঠাতা ও সিইও, ড্রিমস ফ্লাই ইন্টারন্যাশনাল
                </p>
              </div>

              <p className="text-xs text-slate-300 italic bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
                "আমাদের মূল উদ্দেশ্য হলো বিদেশে গমনেচ্ছু প্রতিটি মানুষকে সততা, স্বচ্ছতা এবং শতভাগ পেশাদারিত্বের সাথে সঠিক নির্দেশনা প্রদান করা।"
              </p>

              <button
                onClick={() => onOpenBookingModal('CEO Consultation')}
                className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>সরাসরি ফ্রি পরামর্শের জন্য বুক করুন</span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
