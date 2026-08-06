import React, { useState } from 'react';
import {
  Plane,
  PlaneTakeoff,
  ChevronDown,
  Menu,
  X,
  Compass,
  Sparkles,
  Briefcase,
  Moon,
  Globe,
  PhoneCall,
  Building,
  ShieldCheck,
  FileCheck,
  MessageCircle,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Headphones
} from 'lucide-react';
import { ViewType } from '../types';
import { useLanguage } from '../lib/i18n';
import { LanguageSelector } from './LanguageSelector';

interface NavbarProps {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  onSelectCountry: (countryId: string) => void;
  onOpenBookingModal: (serviceType?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  onOpenBookingModal,
}) => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Handcrafted Enterprise Brand Logo with Travel Icon */}
          <div
            onClick={() => {
              onSelectView('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 bg-gradient-to-tr from-red-600 via-red-700 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <PlaneTakeoff className="w-6 h-6 text-white transform -rotate-6 group-hover:rotate-0 transition-transform duration-300 drop-shadow-md" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="font-black text-lg sm:text-xl tracking-tight uppercase leading-none font-sans text-white drop-shadow-xs">
                  Dreams Fly
                </span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse hidden sm:inline-block" />
              </div>
              <span className="text-[10px] tracking-[0.22em] font-extrabold text-red-400 uppercase mt-0.5 flex items-center gap-1">
                <Globe className="w-2.5 h-2.5 inline text-amber-400" />
                <span>International</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <button
              onClick={() => onSelectView('home')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                currentView === 'home'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
              data-i18n="nav.home"
            >
              {t('nav.home', 'Home')}
            </button>

            <button
              onClick={() => onSelectView('about')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                currentView === 'about'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
              data-i18n="nav.about"
            >
              {t('nav.about', 'About Us')}
            </button>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('services')}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-800/70 transition-all cursor-pointer"
              >
                <span data-i18n="nav.services">{t('nav.services', 'Services')}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {activeDropdown === 'services' && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 mt-2 w-72 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 py-2 z-50 animate-in fade-in duration-150"
                >
                  <button
                    onClick={() => {
                      onSelectView('work-permit');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-3 text-xs sm:text-sm hover:bg-slate-800 flex items-center space-x-3 text-slate-200 hover:text-white transition-colors cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4 text-red-500" />
                    <span data-i18n="services.work_permit">{t('services.work_permit', 'Work Permit Processing')}</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectView('visa');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-3 text-xs sm:text-sm hover:bg-slate-800 flex items-center space-x-3 text-slate-200 hover:text-white transition-colors cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-sky-400" />
                    <span data-i18n="services.visa_assistance">{t('services.visa_assistance', 'Global Visa Consultancy')}</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectView('air-tickets');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-3 text-xs sm:text-sm hover:bg-slate-800 flex items-center space-x-3 text-slate-200 hover:text-white transition-colors cursor-pointer"
                  >
                    <Plane className="w-4 h-4 text-emerald-400" />
                    <span data-i18n="services.air_tickets">{t('services.air_tickets', 'Air Ticket Booking')}</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectView('hotel');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-3 text-xs sm:text-sm hover:bg-slate-800 flex items-center space-x-3 text-slate-200 hover:text-white transition-colors cursor-pointer"
                  >
                    <Building className="w-4 h-4 text-amber-400" />
                    <span data-i18n="services.hotels">{t('services.hotels', 'Hotel Booking Services')}</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectView('umrah-hajj');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-3 text-xs sm:text-sm hover:bg-slate-800 flex items-center space-x-3 text-slate-200 hover:text-white transition-colors cursor-pointer"
                  >
                    <Moon className="w-4 h-4 text-amber-400" />
                    <span data-i18n="services.umrah">{t('services.umrah', 'Umrah & Hajj Packages')}</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectView('tours');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-3 text-xs sm:text-sm hover:bg-slate-800 flex items-center space-x-3 text-slate-200 hover:text-white transition-colors cursor-pointer"
                  >
                    <Globe className="w-4 h-4 text-purple-400" />
                    <span data-i18n="services.tours">{t('services.tours', 'Global Tour Packages')}</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => onSelectView('blog')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                currentView === 'blog'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
              data-i18n="nav.blog"
            >
              {t('nav.blog', 'News & Blog')}
            </button>

            <button
              onClick={() => onSelectView('contact')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                currentView === 'contact'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
              data-i18n="nav.contact"
            >
              {t('nav.contact', 'Contact')}
            </button>
          </nav>

          {/* Right Area CTA & Instant Language Selector */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSelector variant="topbar" />
            
            <button
              onClick={() => onOpenBookingModal()}
              className="flex items-center space-x-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span data-i18n="nav.free_consultation">{t('nav.free_consultation', 'Free Consultation')}</span>
            </button>
          </div>

          {/* Mobile Menu & Language Selector */}
          <div className="lg:hidden flex items-center space-x-3">
            <LanguageSelector variant="topbar" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-xl bg-slate-800 border border-slate-700 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-t border-slate-800 px-4 py-6 space-y-5 animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto shadow-2xl">
          
          {/* Top Branding & Status Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 p-4 rounded-2xl border border-slate-800 flex items-center justify-between shadow-inner">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white shadow-md shadow-red-950/50">
                <PlaneTakeoff className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider">Dreams Fly Int.</h4>
                <p className="text-[10px] font-bold text-amber-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" />
                  <span>Govt Reg #10842 • 100% Verified</span>
                </p>
              </div>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
              Online 24/7
            </span>
          </div>

          {/* Quick Highlight Cards (2x2 Grid) */}
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-1">
              Popular Services / জনপ্রিয় সেবা
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  onSelectView('work-permit');
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden group ${
                  currentView === 'work-permit'
                    ? 'bg-gradient-to-br from-red-950/80 to-slate-900 border-red-500/80 ring-1 ring-red-500/50'
                    : 'bg-slate-900/90 border-slate-800 hover:border-red-500/40 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-black bg-red-600 text-white px-1.5 py-0.5 rounded-md uppercase">
                    Hot
                  </span>
                </div>
                <div className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">Work Permit</div>
                <div className="text-[10px] text-slate-400 font-medium">ওয়ার্ক পারমিট ভিসা</div>
              </button>

              <button
                onClick={() => {
                  onSelectView('services');
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden group ${
                  currentView === 'services'
                    ? 'bg-gradient-to-br from-sky-950/80 to-slate-900 border-sky-500/80 ring-1 ring-sky-500/50'
                    : 'bg-slate-900/90 border-slate-800 hover:border-sky-500/40 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-sky-600/20 border border-sky-500/30 text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-black bg-sky-600 text-white px-1.5 py-0.5 rounded-md uppercase">
                    99% Approval
                  </span>
                </div>
                <div className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">Visa Consultancy</div>
                <div className="text-[10px] text-slate-400 font-medium">গ্লোবাল ভিসা প্রসেসিং</div>
              </button>

              <button
                onClick={() => {
                  onSelectView('air-tickets');
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden group ${
                  currentView === 'air-tickets'
                    ? 'bg-gradient-to-br from-emerald-950/80 to-slate-900 border-emerald-500/80 ring-1 ring-emerald-500/50'
                    : 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plane className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-black bg-emerald-600 text-white px-1.5 py-0.5 rounded-md uppercase">
                    Discount
                  </span>
                </div>
                <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">Air Tickets</div>
                <div className="text-[10px] text-slate-400 font-medium">বিমান টিকিট বুকিং</div>
              </button>

              <button
                onClick={() => {
                  onSelectView('umrah-hajj');
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden group ${
                  currentView === 'umrah-hajj'
                    ? 'bg-gradient-to-br from-amber-950/80 to-slate-900 border-amber-500/80 ring-1 ring-amber-500/50'
                    : 'bg-slate-900/90 border-slate-800 hover:border-amber-500/40 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-600/20 border border-amber-500/30 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Moon className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-black bg-amber-600 text-white px-1.5 py-0.5 rounded-md uppercase">
                    VIP Packages
                  </span>
                </div>
                <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">Umrah & Hajj</div>
                <div className="text-[10px] text-slate-400 font-medium">পবিত্র উমরাহ ও হজ</div>
              </button>
            </div>
          </div>

          {/* Navigation Items List */}
          <div className="space-y-1 bg-slate-900/50 p-2 rounded-2xl border border-slate-800/80">
            <div className="px-3 py-1.5 text-[10px] font-black uppercase text-slate-500 tracking-wider">
              Navigation Menu / নেভিগেশন
            </div>

            <button
              onClick={() => {
                onSelectView('home');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                currentView === 'home'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Compass className={`w-4 h-4 ${currentView === 'home' ? 'text-white' : 'text-red-500'}`} />
                <span>{t('nav.home', 'Home')}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => {
                onSelectView('about');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                currentView === 'about'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-3">
                <ShieldCheck className={`w-4 h-4 ${currentView === 'about' ? 'text-white' : 'text-amber-400'}`} />
                <span>{t('nav.about', 'About Us')}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => {
                onSelectView('hotel');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                currentView === 'hotel'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Building className={`w-4 h-4 ${currentView === 'hotel' ? 'text-white' : 'text-amber-400'}`} />
                <span>{t('services.hotels', 'Hotel Booking Services')}</span>
              </div>
              <span className="text-[9px] font-extrabold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md border border-amber-500/30">
                500k+ Hotels
              </span>
            </button>

            <button
              onClick={() => {
                onSelectView('tours');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                currentView === 'tours'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Globe className={`w-4 h-4 ${currentView === 'tours' ? 'text-white' : 'text-purple-400'}`} />
                <span>{t('services.tours', 'Global Tour Packages')}</span>
              </div>
              <span className="text-[9px] font-extrabold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-md border border-purple-500/30">
                Best Deals
              </span>
            </button>

            <button
              onClick={() => {
                onSelectView('blog');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                currentView === 'blog'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Sparkles className={`w-4 h-4 ${currentView === 'blog' ? 'text-white' : 'text-blue-400'}`} />
                <span>{t('nav.blog', 'News & Travel Updates')}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => {
                onSelectView('contact');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                currentView === 'contact'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Headphones className={`w-4 h-4 ${currentView === 'contact' ? 'text-white' : 'text-emerald-400'}`} />
                <span>{t('nav.contact', 'Contact Us & Office Location')}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>

          {/* Action CTAs & Direct Contact */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
            <button
              onClick={() => {
                onOpenBookingModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3.5 bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-wider text-center shadow-lg shadow-red-950/60 flex items-center justify-center space-x-2 transition-all cursor-pointer"
              data-i18n="nav.free_consultation"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>{t('nav.free_consultation', 'Free Consultation (ফ্রি পরামর্শ)')}</span>
            </button>

            <a
              href="https://wa.me/8801771304219?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%82%E0%A6%95%E0%A7%81%E0%A6%AE"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-emerald-600/15 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 rounded-2xl font-bold text-xs text-center flex items-center justify-center space-x-2.5 transition-all cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 inline" />
              <span>Direct WhatsApp (+880 1771-304219)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </a>

            <div className="pt-1 flex items-center justify-center space-x-2 text-[10px] text-slate-400 font-medium">
              <MapPin className="w-3 h-3 text-red-500" />
              <span>Motijheel C/A, Dhaka-1000 • Govt Licensed</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
