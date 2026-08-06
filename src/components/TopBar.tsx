import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

interface TopBarProps {
  currency?: 'BDT' | 'USD';
  onCurrencyChange?: (currency: 'BDT' | 'USD') => void;
  onSelectView?: (view: any) => void;
}

export const TopBar: React.FC<TopBarProps> = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#B71C1C] text-white text-xs border-b border-red-700 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
        {/* Left Info */}
        <div className="flex items-center space-x-6 font-medium">
          <a
            href="tel:+8801771304219"
            className="flex items-center space-x-1.5 hover:text-red-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-bold" data-i18n="topbar.phone">{t('topbar.phone', '+৮৮০ ১৭৭১-৩০৪২১৯')}</span>
          </a>
          <a
            href="mailto:dreamsflyinternational@gmail.com"
            className="flex items-center space-x-1.5 hover:text-red-200 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-white" />
            <span data-i18n="topbar.email">{t('topbar.email', 'dreamsflyinternational@gmail.com')}</span>
          </a>
          <div className="flex items-center space-x-1.5 text-red-100">
            <MapPin className="w-3.5 h-3.5 text-amber-300" />
            <span data-i18n="topbar.location">{t('topbar.location', 'মিরপুর ১১, ঢাকা ও চাঁপাইনবাবগঞ্জ')}</span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-3.5">
          {/* Social Links */}
          <div className="flex items-center space-x-2 border-r border-red-700/80 pr-3.5">
            <a
              href="https://web.facebook.com/dreamsfly/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 bg-red-900/80 hover:bg-white hover:text-[#1877F2] rounded-full flex items-center justify-center transition-all text-white shadow-sm"
              title="Facebook"
              aria-label="Visit Dreams Fly Facebook Page"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/dreams-fly-international/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 bg-red-900/80 hover:bg-white hover:text-[#0A66C2] rounded-full flex items-center justify-center transition-all text-white shadow-sm"
              title="LinkedIn"
              aria-label="Visit Dreams Fly LinkedIn Page"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-1.25 1.02-2.27 2.27-2.27s2.27 1.02 2.27 2.27v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>
          </div>

          <a
            href="https://wa.me/8801771304219?text=Hello%20Dreams%20Fly"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 bg-white text-[#B71C1C] rounded font-black uppercase text-[10px] tracking-wider hover:bg-gray-100 transition-colors shadow-sm"
            data-i18n="topbar.whatsapp"
          >
            {t('topbar.whatsapp', 'হোয়াটসঅ্যাপ সাপোর্ট')}
          </a>
        </div>
      </div>
    </div>
  );
};
