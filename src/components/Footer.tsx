import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Send,
  Globe,
  ChevronRight,
  FileCode,
  CheckCircle2,
  PlaneTakeoff,
  Sparkles
} from 'lucide-react';
import { ViewType } from '../types';
import { COUNTRIES } from '../data/countries';
import { useLanguage } from '../lib/i18n';
import { CountryFlagSvg } from './CountryFlagSvg';

interface FooterProps {
  onSelectView: (view: ViewType) => void;
  onSelectCountry: (countryId: string) => void;
  onOpenSitemapModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectView,
  onSelectCountry,
  onOpenSitemapModal,
}) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onSelectView('home')}
              className="flex items-center space-x-3 cursor-pointer group inline-flex"
            >
              <div className="w-11 h-11 bg-gradient-to-tr from-red-600 via-red-700 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300 border border-white/20">
                <PlaneTakeoff className="w-6 h-6 text-white transform -rotate-6 group-hover:rotate-0 transition-transform duration-300 drop-shadow-md" />
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="text-xl font-black text-white tracking-tight uppercase">
                    Dreams Fly
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <span className="block text-[10px] uppercase tracking-[0.22em] text-red-400 font-extrabold flex items-center gap-1">
                  <Globe className="w-2.5 h-2.5 inline text-amber-400" />
                  <span>International</span>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md" data-i18n="footer.about">
              {t('footer.about', 'Dreams Fly International is a leading authorized travel and visa consultancy in Bangladesh. Specializing in Work Permits, Student Visas, Schengen Visas, Umrah, and Global Flight Ticketing.')}
            </p>

            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-300 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span data-i18n="hero.badge">{t('hero.badge', 'Licensed & Authorized Consultancy')}</span>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2" data-i18n="footer.newsletter_label">
                {t('footer.newsletter_label', 'Subscribe for Visa Updates & Airfare Offers')}
              </span>
              <form onSubmit={handleSubscribe} className="flex max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-l-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-r-xl transition-colors flex items-center space-x-1.5 text-xs cursor-pointer shadow-md"
                >
                  <span data-i18n="footer.subscribe">{t('footer.subscribe', 'Subscribe')}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              {subscribed && (
                <span className="block text-xs text-emerald-400 mt-2 font-semibold">
                  ✓ Thank you for subscribing to Dreams Fly newsletter.
                </span>
              )}
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2.5" data-i18n="nav.services">
              {t('nav.services', 'Core Services')}
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onSelectView('work-permit')} className="hover:text-white transition-colors flex items-center space-x-1.5 cursor-pointer" data-i18n="services.work_permit">
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>{t('services.work_permit', 'Work Permit Processing')}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('visa')} className="hover:text-white transition-colors flex items-center space-x-1.5 cursor-pointer" data-i18n="services.visa_assistance">
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>{t('services.visa_assistance', 'Global Visa Consultancy')}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('air-tickets')} className="hover:text-white transition-colors flex items-center space-x-1.5 cursor-pointer" data-i18n="services.air_tickets">
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>{t('services.air_tickets', 'Air Ticket Booking')}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('umrah-hajj')} className="hover:text-white transition-colors flex items-center space-x-1.5 cursor-pointer" data-i18n="services.umrah">
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>{t('services.umrah', 'Umrah & Hajj Packages')}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('tours')} className="hover:text-white transition-colors flex items-center space-x-1.5 cursor-pointer" data-i18n="services.tours">
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>{t('services.tours', 'Global Tour Packages')}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('hotel')} className="hover:text-white transition-colors flex items-center space-x-1.5 cursor-pointer" data-i18n="services.hotels">
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>{t('services.hotels', 'Hotel Bookings')}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Destinations */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2.5" data-i18n="destinations.heading">
              {t('destinations.heading', 'Popular Destinations')}
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onSelectCountry('hungary')} className="hover:text-white transition-colors flex items-center space-x-2 cursor-pointer">
                  <CountryFlagSvg countryId="hungary" className="w-4 h-3" />
                  <span>Hungary Work Permit</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCountry('slovenia')} className="hover:text-white transition-colors flex items-center space-x-2 cursor-pointer">
                  <CountryFlagSvg countryId="slovenia" className="w-4 h-3" />
                  <span>Slovenia Work Permit</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCountry('romania')} className="hover:text-white transition-colors flex items-center space-x-2 cursor-pointer">
                  <CountryFlagSvg countryId="romania" className="w-4 h-3" />
                  <span>Romania Work Permit</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCountry('dubai')} className="hover:text-white transition-colors flex items-center space-x-2 cursor-pointer">
                  <CountryFlagSvg countryId="dubai" className="w-4 h-3" />
                  <span>Dubai Job Visa</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCountry('saudi-arabia')} className="hover:text-white transition-colors flex items-center space-x-2 cursor-pointer">
                  <CountryFlagSvg countryId="saudi-arabia" className="w-4 h-3" />
                  <span>Saudi Arabia Work & Umrah</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCountry('canada')} className="hover:text-white transition-colors flex items-center space-x-2 cursor-pointer">
                  <CountryFlagSvg countryId="canada" className="w-4 h-3" />
                  <span>Canada Visit & Work</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Locations */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2.5" data-i18n="topbar.hotline">
              {t('topbar.hotline', 'Contact & Offices')}
            </h3>
            <div className="space-y-3 text-xs">
              <a href="tel:+8801771304219" className="flex items-start space-x-2.5 text-slate-300 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="block font-bold text-white">+880 1771-304219</span>
                  <span className="text-[11px] text-slate-400">24/7 Hotline & WhatsApp</span>
                </div>
              </a>

              <a href="mailto:dreamsflyinternational@gmail.com" className="flex items-start space-x-2.5 text-slate-300 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="break-all">dreamsflyinternational@gmail.com</span>
              </a>

              <div className="flex items-start space-x-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <span className="block font-bold text-slate-200">Dhaka HQ:</span>
                  <span>Road 16, Rupnagar, Mirpur 11, Dhaka-1216</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dreams Fly International. All rights reserved.</p>

          <div className="flex items-center space-x-4">
            <button onClick={() => onSelectView('privacy')} className="hover:text-slate-300 transition-colors">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => onSelectView('privacy')} className="hover:text-slate-300 transition-colors">Terms of Service</button>
            <span>•</span>
            <button onClick={() => onSelectView('sitemap')} className="hover:text-slate-300 transition-colors">Sitemap</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
