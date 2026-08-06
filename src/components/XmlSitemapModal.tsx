import React, { useState } from 'react';
import {
  FileCode,
  Check,
  Copy,
  Download,
  ExternalLink,
  Globe,
  X,
  Layers,
  MapPin,
  Hotel,
  Compass,
  FileCheck,
  Sparkles,
  Plane,
  Building,
  CheckCircle2
} from 'lucide-react';
import { COUNTRIES } from '../data/countries';
import { CITY_LANDING_PAGES, FEATURED_HOTELS } from '../data/hotels';
import { BLOG_POSTS } from '../data/blogs';
import { ViewType } from '../types';

interface XmlSitemapModalProps {
  onClose: () => void;
  onSelectView: (view: ViewType) => void;
  onSelectCountry: (countryId: string) => void;
  onSelectCityHotel?: (citySlug: string) => void;
  onSelectHotelDetail?: (hotelId: string) => void;
}

export const XmlSitemapModal: React.FC<XmlSitemapModalProps> = ({
  onClose,
  onSelectView,
  onSelectCountry,
  onSelectCityHotel,
  onSelectHotelDetail,
}) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'raw'>('visual');
  const [copied, setCopied] = useState(false);

  const baseUrl = 'https://dreamsfly.net';
  const currentDate = new Date().toISOString().split('T')[0];

  // Main static routes
  const mainRoutes = [
    { loc: '/', priority: '1.0', changefreq: 'daily', title: 'হোম পেজ (Home Page)', view: 'home' as ViewType },
    { loc: '/about', priority: '0.8', changefreq: 'monthly', title: 'আমাদের সম্পর্কে (About Us)', view: 'about' as ViewType },
    { loc: '/services', priority: '0.9', changefreq: 'weekly', title: 'সকল সেবাসমূহ (All Services)', view: 'services' as ViewType },
    { loc: '/visa', priority: '0.9', changefreq: 'weekly', title: 'ভিসা কনসালটেন্সি (Visa Services)', view: 'visa' as ViewType },
    { loc: '/work-permit', priority: '0.9', changefreq: 'weekly', title: 'ওয়ার্ক পারমিট (Work Permits)', view: 'work-permit' as ViewType },
    { loc: '/air-tickets', priority: '0.9', changefreq: 'daily', title: 'এয়ার টিকিট বুকিং (Air Tickets)', view: 'air-tickets' as ViewType },
    { loc: '/hotel-booking', priority: '0.9', changefreq: 'daily', title: 'হোটেল বুকিং পোর্টাল (Hotels Portal)', view: 'hotel' as ViewType },
    { loc: '/umrah-hajj', priority: '0.9', changefreq: 'weekly', title: 'ওমরাহ ও হজ প্যাকেজ (Umrah & Hajj)', view: 'umrah-hajj' as ViewType },
    { loc: '/tours', priority: '0.9', changefreq: 'weekly', title: 'ট্যুর প্যাকেজসমূহ (Tour Packages)', view: 'tours' as ViewType },
    { loc: '/countries', priority: '0.9', changefreq: 'weekly', title: 'সকল গন্তব্যসমূহ (All Countries)', view: 'countries' as ViewType },
    { loc: '/eligibility', priority: '0.8', changefreq: 'monthly', title: 'ভিসা যোগ্যতা যাচাই (Eligibility Checker)', view: 'eligibility' as ViewType },
    { loc: '/calculator', priority: '0.8', changefreq: 'monthly', title: 'ভিসা খরচ ক্যালকুলেটর (Cost Calculator)', view: 'calculator' as ViewType },
    { loc: '/tracker', priority: '0.8', changefreq: 'daily', title: 'ফাইল ট্র্যাকিং পোর্টাল (Application Tracker)', view: 'tracker' as ViewType },
    { loc: '/blog', priority: '0.7', changefreq: 'weekly', title: 'ট্রাভেল ব্লক ও গাইড (Travel Blog)', view: 'blog' as ViewType },
    { loc: '/contact', priority: '0.8', changefreq: 'monthly', title: 'যোগাযোগ (Contact Us)', view: 'contact' as ViewType },
    { loc: '/privacy', priority: '0.5', changefreq: 'yearly', title: 'গোপনীয়তা নীতি (Privacy Policy)', view: 'privacy' as ViewType },
  ];

  // Country Routes
  const countryRoutes = COUNTRIES.map((c) => ({
    loc: `/country/${c.id}`,
    priority: '0.8',
    changefreq: 'weekly',
    title: `${c.name} ভিসা প্রসেসিং ও প্রয়োজনীয় ফাইল (${c.flag})`,
    id: c.id,
  }));

  // City Hotel Landing Pages
  const cityRoutes = CITY_LANDING_PAGES.map((c) => ({
    loc: `/hotels/${c.slug}`,
    priority: '0.85',
    changefreq: 'weekly',
    title: `${c.titleBn} ${c.flag}`,
    slug: c.slug,
  }));

  // Individual Hotel Detail Pages
  const hotelDetailRoutes = FEATURED_HOTELS.map((h) => ({
    loc: `/hotel/${h.id}`,
    priority: '0.75',
    changefreq: 'weekly',
    title: `${h.nameBn} - ${h.cityBn} (${h.stars}★ ${h.flag})`,
    id: h.id,
    city: h.cityEn,
  }));

  // Individual Blog Detail Pages
  const blogRoutes = BLOG_POSTS.map((b) => ({
    loc: `/blog/${b.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    title: b.title,
    slug: b.slug,
  }));

  // Tour Package Detail Pages
  const tourRoutes = [
    'thailand-5d4n', 'malaysia-4d3n', 'dubai-5d4n', 'maldives-honeymoon-4d3n',
    'singapore-bali-7d6n', 'kashmir-6d5n', 'nepal-5d4n', 'vietnam-5d4n',
    'sri-lanka-5d4n', 'coxs-bazar-3d2n', 'saint-martin-4d3n', 'sajek-bandarban-4d3n',
    'sylhet-3d2n', 'sundarbans-3d2n', 'umrah-5star-14d', 'umrah-plus-turkey-10d9n'
  ].map((id) => ({
    loc: `/tour/${id}`,
    priority: '0.8',
    changefreq: 'weekly',
    title: `ট্যুর প্যাকেজ (${id})`,
    id,
  }));

  // Umrah Package Detail Pages
  const umrahRoutes = [
    'economy', 'standard', 'premium', 'family', 'group', 'ramadan', 'student'
  ].map((id) => ({
    loc: `/umrah/${id}`,
    priority: '0.8',
    changefreq: 'weekly',
    title: `ওমরাহ প্যাকেজ (${id})`,
    id,
  }));

  // Generate Raw XML string
  const generateRawXml = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const allRoutes = [
      ...mainRoutes,
      ...countryRoutes,
      ...cityRoutes,
      ...hotelDetailRoutes,
      ...blogRoutes,
      ...tourRoutes,
      ...umrahRoutes
    ];

    allRoutes.forEach((r) => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${r.loc}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>${r.changefreq}</changefreq>\n`;
      xml += `    <priority>${r.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  };

  const rawXmlContent = generateRawXml();

  const handleCopyXml = () => {
    navigator.clipboard.writeText(rawXmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadXml = () => {
    const element = document.createElement('a');
    const file = new Blob([rawXmlContent], { type: 'text/xml;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'sitemap.xml';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const totalUrlsCount =
    mainRoutes.length +
    countryRoutes.length +
    cityRoutes.length +
    hotelDetailRoutes.length;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-gray-200 my-auto flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#DC2626] via-red-800 to-[#991B1B] text-white p-5 sm:p-6 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 rounded-2xl border border-white/20 text-amber-300">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl sm:text-2xl font-black font-sans tracking-tight">
                  XML Sitemap (এক্সএমএল সাইটম্যাপ)
                </h2>
                <span className="bg-amber-400 text-gray-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                  SEO Validated
                </span>
              </div>
              <p className="text-xs text-red-100 font-medium">
                Google Search Console, Bing & SEO ক্রলারদের জন্য প্রস্তুতকৃত ডাইনামিক সাইটম্যাপ ({totalUrlsCount}টি URL)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls & Tab Selector */}
        <div className="bg-gray-100 border-b border-gray-200 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-2 cursor-pointer ${
                activeTab === 'visual'
                  ? 'bg-[#DC2626] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>ভিউয়াল ল্যান্ডিং পেজ ম্যাপ ({totalUrlsCount})</span>
            </button>
            <button
              onClick={() => setActiveTab('raw')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-2 cursor-pointer ${
                activeTab === 'raw'
                  ? 'bg-[#DC2626] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>র (Raw) XML কোড সংকলন</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyXml}
              className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-extrabold">কপি সম্পন্ন!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-600" />
                  <span>কপি XML</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadXml}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>sitemap.xml ডাউনলোড</span>
            </button>
          </div>
        </div>

        {/* Modal Body Scroll Area */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'visual' ? (
            <div className="space-y-8">
              {/* Category 1: Primary Main Pages */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <h3 className="text-sm font-extrabold text-gray-900 flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-[#DC2626]" />
                    <span>১. মূল সেবা ও ট্রাভেল পেজসমূহ ({mainRoutes.length}টি)</span>
                  </h3>
                  <span className="text-[10px] bg-red-100 text-[#DC2626] px-2 py-0.5 rounded-md font-bold">
                    Priority: 0.8 - 1.0
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {mainRoutes.map((route, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        onSelectView(route.view);
                        onClose();
                      }}
                      className="p-3 bg-gray-50 hover:bg-red-50/60 border border-gray-200 hover:border-red-300 rounded-xl transition-all cursor-pointer group flex items-start justify-between"
                    >
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-gray-900 group-hover:text-[#DC2626]">
                          {route.title}
                        </span>
                        <span className="block text-[10px] text-gray-500 font-mono">
                          {baseUrl}{route.loc}
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#DC2626] shrink-0 ml-1" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 2: Country Visa Pages */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <h3 className="text-sm font-extrabold text-gray-900 flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-[#DC2626]" />
                    <span>২. ডেডিকেটেড কান্ট্রি ভিসা ল্যান্ডিং পেজ ({countryRoutes.length}টি)</span>
                  </h3>
                  <span className="text-[10px] bg-red-100 text-[#DC2626] px-2 py-0.5 rounded-md font-bold">
                    Priority: 0.80
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {countryRoutes.map((route, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        onSelectCountry(route.id);
                        onClose();
                      }}
                      className="p-3 bg-gray-50 hover:bg-red-50/60 border border-gray-200 hover:border-red-300 rounded-xl transition-all cursor-pointer group flex items-start justify-between"
                    >
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-gray-900 group-hover:text-[#DC2626]">
                          {route.title}
                        </span>
                        <span className="block text-[10px] text-gray-500 font-mono">
                          {baseUrl}{route.loc}
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#DC2626] shrink-0 ml-1" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 3: City Hotel Landing Pages */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <h3 className="text-sm font-extrabold text-gray-900 flex items-center space-x-2">
                    <Building className="w-4 h-4 text-[#DC2626]" />
                    <span>৩. সিটি হোটেল বুকিং ল্যান্ডিং পেজসমূহ ({cityRoutes.length}টি)</span>
                  </h3>
                  <span className="text-[10px] bg-red-100 text-[#DC2626] px-2 py-0.5 rounded-md font-bold">
                    Priority: 0.85
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {cityRoutes.map((route, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        onSelectView('hotel');
                        if (onSelectCityHotel) onSelectCityHotel(route.slug);
                        onClose();
                      }}
                      className="p-3 bg-gray-50 hover:bg-red-50/60 border border-gray-200 hover:border-red-300 rounded-xl transition-all cursor-pointer group flex items-start justify-between"
                    >
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-gray-900 group-hover:text-[#DC2626]">
                          {route.title}
                        </span>
                        <span className="block text-[10px] text-gray-500 font-mono">
                          {baseUrl}{route.loc}
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#DC2626] shrink-0 ml-1" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 4: Individual Hotel Detail Pages */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <h3 className="text-sm font-extrabold text-gray-900 flex items-center space-x-2">
                    <Hotel className="w-4 h-4 text-[#DC2626]" />
                    <span>৪. স্বতন্ত্র হোটেল বিস্তারিত পেজসমূহ ({hotelDetailRoutes.length}টি হোটেল)</span>
                  </h3>
                  <span className="text-[10px] bg-red-100 text-[#DC2626] px-2 py-0.5 rounded-md font-bold">
                    Priority: 0.75
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {hotelDetailRoutes.map((route, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        onSelectView('hotel');
                        if (onSelectHotelDetail) onSelectHotelDetail(route.id);
                        onClose();
                      }}
                      className="p-2.5 bg-gray-50 hover:bg-red-50/60 border border-gray-200 hover:border-red-300 rounded-xl transition-all cursor-pointer group flex items-start justify-between"
                    >
                      <div className="space-y-0.5">
                        <span className="text-xs font-semibold text-gray-900 group-hover:text-[#DC2626] line-clamp-1">
                          {route.title}
                        </span>
                        <span className="block text-[9px] text-gray-500 font-mono">
                          {baseUrl}{route.loc}
                        </span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-[#DC2626] shrink-0 ml-1" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Raw XML view */
            <div className="relative">
              <pre className="p-4 bg-gray-950 text-emerald-400 font-mono text-xs rounded-2xl overflow-x-auto leading-relaxed border border-gray-800 shadow-inner max-h-[60vh]">
                {rawXmlContent}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              XML Schema 0.9 স্ট্যান্ডার্ড মেনে স্বয়ংক্রিয়ভাবে আপডেটেড।
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-xl transition-colors cursor-pointer"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
