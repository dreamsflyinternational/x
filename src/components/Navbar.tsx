import React, { useState } from 'react';
import {
  Plane,
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
  FileCheck
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
          
          {/* Handcrafted Enterprise Brand Logo */}
          <div
            onClick={() => {
              onSelectView('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-red-500/30">
              <span className="text-white font-extrabold text-lg tracking-tight">DF</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight uppercase leading-none font-sans text-white">
                Dreams Fly
              </span>
              <span className="text-[10px] tracking-[0.2em] font-bold text-red-400 uppercase mt-0.5">
                International
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
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => {
              onSelectView('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-white hover:bg-slate-800"
            data-i18n="nav.home"
          >
            {t('nav.home', 'Home')}
          </button>
          <button
            onClick={() => {
              onSelectView('about');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-white hover:bg-slate-800"
            data-i18n="nav.about"
          >
            {t('nav.about', 'About Us')}
          </button>
          <button
            onClick={() => {
              onSelectView('work-permit');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-white hover:bg-slate-800"
            data-i18n="services.work_permit"
          >
            {t('services.work_permit', 'Work Permit Processing')}
          </button>
          <button
            onClick={() => {
              onSelectView('visa');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-white hover:bg-slate-800"
            data-i18n="services.visa_assistance"
          >
            {t('services.visa_assistance', 'Global Visa Consultancy')}
          </button>
          <button
            onClick={() => {
              onSelectView('air-tickets');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-white hover:bg-slate-800"
            data-i18n="services.air_tickets"
          >
            {t('services.air_tickets', 'Air Ticket Booking')}
          </button>
          <button
            onClick={() => {
              onSelectView('contact');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-white hover:bg-slate-800"
            data-i18n="nav.contact"
          >
            {t('nav.contact', 'Contact')}
          </button>

          <div className="pt-2">
            <button
              onClick={() => {
                onOpenBookingModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3.5 bg-red-600 text-white rounded-xl font-bold text-sm text-center shadow"
              data-i18n="nav.free_consultation"
            >
              {t('nav.free_consultation', 'Free Consultation')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
