import React, { useState } from 'react';
import {
  Globe,
  MapPin,
  Plane,
  Briefcase,
  Moon,
  Building,
  FileText,
  Calculator,
  Search,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Compass,
  BookOpen,
  ArrowRight,
  Layers,
  Sparkles,
  Download
} from 'lucide-react';
import { ViewType } from '../types';
import { COUNTRIES } from '../data/countries';
import { BLOG_POSTS } from '../data/blogs';
import { ALL_SERVICES_DATA } from '../data/servicesData';

interface SitemapViewProps {
  onSelectView: (view: ViewType) => void;
  onSelectCountry: (countryId: string) => void;
}

export const SitemapView: React.FC<SitemapViewProps> = ({
  onSelectView,
  onSelectCountry,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering helper
  const matchesSearch = (text: string) => {
    if (!searchTerm.trim()) return true;
    return text.toLowerCase().includes(searchTerm.toLowerCase().trim());
  };

  const mainPages: { name: string; bnName: string; view: ViewType; path: string; desc: string; icon: any }[] = [
    { name: 'Home Page', bnName: 'মূল হোম পেজ', view: 'home', path: '/', desc: 'ড্রিমস ফ্লাই মূল ওয়েবসাইট হোমপেজ', icon: Compass },
    { name: 'About Us', bnName: 'আমাদের সম্পর্কে', view: 'about', path: '/about', desc: 'কোম্পানির ইতিহাস, লাইসেন্স ও টিমের তথ্য', icon: ShieldCheck },
    { name: 'All Services', bnName: 'সকল সেবাসমূহ', view: 'services', path: '/services', desc: 'ভিসা প্রসেসিং, ফাইল রিভিউ ও ডকুমেন্টেশন', icon: Layers },
    { name: 'All Countries', bnName: 'সকল দেশ ও গন্তব্য', view: 'countries', path: '/countries', desc: 'বিশ্বের ৫০+ দেশের ভিসা প্রসেসিং তথ্য', icon: Globe },
    { name: 'Air Tickets', bnName: 'এয়ার টিকিট বুকিং', view: 'air-tickets', path: '/air-tickets', desc: 'সাশ্রয়ী মূল্যে আইএটিএ অনুমোদিত এয়ার টিকিট', icon: Plane },
    { name: 'Work Permit', bnName: 'ওয়ার্ক পারমিট ভিসা', view: 'work-permit', path: '/work-permit', desc: 'ইউরোপ ও মিডল ইস্টের প্রসেসকৃত কাজের ভিসা', icon: Briefcase },
    { name: 'Umrah & Hajj', bnName: 'হজ ও ওমরাহ সার্ভিস', view: 'umrah-hajj', path: '/umrah-hajj', desc: 'মক্কা ও মদিনার প্রিমিয়াম ওমরাহ প্যাকেজ', icon: Moon },
    { name: 'Tour Packages', bnName: 'ট্যুর প্যাকেজসমূহ', view: 'tours', path: '/tours', desc: 'দেশি ও আন্তর্জাতিক লাক্সারি ভ্রমণ প্যাকেজ', icon: Compass },
    { name: 'Hotel Booking', bnName: 'হোটেল বুকিং', view: 'hotel', path: '/hotel', desc: 'বিশ্বজুড়ে ৩-স্টার থেকে ৫-স্টার হোটেল বুকিং', icon: Building },
    { name: 'Blog & Visa Guides', bnName: 'ইনফরমেটিভ ব্লগ ও গাইড', view: 'blog', path: '/blog', desc: 'ভিসা প্রস্তুতি ও ট্রাভেল সংক্রান্ত তথ্যবহুল পোস্ট', icon: BookOpen },
    { name: 'Contact Us', bnName: 'যোগাযোগ ও অফিস ঠিকানা', view: 'contact', path: '/contact', desc: 'ঢাকা ও চাঁপাইনবাবগঞ্জ অফিস ঠিকানা ও ফোন', icon: MapPin },
    { name: 'Privacy Policy', bnName: 'গোপনীয়তা নীতি', view: 'privacy', path: '/privacy', desc: 'সেবার শর্তাবলী ও প্রাইভেসি পলিসি', icon: FileText }
  ];

  const toolsPages: { name: string; bnName: string; view: ViewType; path: string; desc: string; icon: any }[] = [
    { name: 'Visa Eligibility Checker', bnName: 'ভিসা যোগ্যতা যাচাই', view: 'eligibility', path: '/eligibility', desc: 'আপনার প্রোফাইল অনুযায়ী ভিসা আবেদনের সম্ভাবনা', icon: CheckCircle },
    { name: 'Visa Cost Calculator', bnName: 'ভিসা খরচ ক্যালকুলেটর', view: 'calculator', path: '/calculator', desc: 'এম্বাসি ফি, প্রসেসিং ফি ও মোট খরচের হিসেব', icon: Calculator },
    { name: 'Application Tracker', bnName: 'ফাইল ট্র্যাকিং সিস্টেম', view: 'tracker', path: '/tracker', desc: 'আপনার জমা দেওয়া ফাইলের লাইভ আপডেট', icon: Search },
    { name: 'AI Travel Planner', bnName: 'এআই ট্রাভেল প্ল্যানার', view: 'ai-planner', path: '/ai-planner', desc: 'স্মার্ট এআই দ্বারা কাস্টম আইটিনারি তৈরি', icon: Sparkles },
    { name: 'Travel Checklist', bnName: 'ইন্টারেক্টিভ ট্রাভেল চেকলিস্ট', view: 'checklist', path: '/checklist', desc: 'ভ্রমণে বের হওয়ার আগের জরুরী চেকলিস্ট', icon: FileText },
    { name: 'Visa Comparison', bnName: 'ভিসা তুলনা ম্যাট্রিক্স', view: 'comparison', path: '/comparison', desc: 'একাধিক দেশের ভিসার শর্তাবলি তুলনা', icon: Layers }
  ];

  const filteredMain = mainPages.filter(p => matchesSearch(p.name) || matchesSearch(p.bnName) || matchesSearch(p.path));
  const filteredTools = toolsPages.filter(p => matchesSearch(p.name) || matchesSearch(p.bnName) || matchesSearch(p.path));
  const filteredCountries = COUNTRIES.filter(c => matchesSearch(c.name) || matchesSearch(c.capital) || matchesSearch(c.region));
  const filteredServices = ALL_SERVICES_DATA.filter(s => matchesSearch(s.title) || matchesSearch(s.titleBn) || matchesSearch(s.tagline));
  const filteredBlogs = BLOG_POSTS.filter(b => matchesSearch(b.title) || matchesSearch(b.category) || matchesSearch(b.author));

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#B71C1C] via-[#DC2626] to-[#991B1B] text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10 text-white pointer-events-none">
            <Globe className="w-96 h-96" />
          </div>
          
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider border border-white/20">
              <Layers className="w-4 h-4 text-amber-300" />
              <span>dreamsfly.net Site Architecture</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-sans tracking-tight text-white leading-tight">
              সাইটম্যাপ ও পেজ ডিরেক্টরি
            </h1>
            <p className="text-red-100 text-sm sm:text-base leading-relaxed">
              ড্রিমস ফ্লাই ইন্টারন্যাশনালের সকল পেজ, ভিসা গাইড, কান্ট্রি রিকোয়ারমেন্টস, ব্লগ পোস্ট এবং অনলাইন টুলসের এক জায়গায় সাজানো পূর্ণাঙ্গ ডিরেক্টরি।
            </p>

            {/* Quick Actions & XML Link */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-amber-400 hover:bg-amber-300 text-gray-900 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105"
              >
                <Download className="w-4 h-4 text-gray-900" />
                <span>XML Sitemap দেখুন (sitemap.xml)</span>
              </a>
              <span className="text-xs text-red-200">
                • সার্চ ইঞ্জিন সমূহের (Google, Bing, Yahoo) জন্য ইন্ডেক্সকৃত
              </span>
            </div>
          </div>
        </div>

        {/* Live Directory Search Filter */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="যেকোনো পেজ, দেশ বা ব্লগ খুঁজুন..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:bg-white"
            />
          </div>
          <div className="text-xs text-gray-500 font-medium">
            মোট ইন্ডেক্সকৃত পেজ: <strong className="text-[#DC2626] font-bold">{mainPages.length + toolsPages.length + COUNTRIES.length + BLOG_POSTS.length}টি+</strong>
          </div>
        </div>

        {/* Section 1: Main Pages */}
        {filteredMain.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-3">
              <Compass className="w-5 h-5 text-[#DC2626]" />
              <h2 className="text-xl font-extrabold text-gray-900 font-sans">
                ১. মূল নেভিগেশন পেজসমূহ ({filteredMain.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMain.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.view}
                    onClick={() => onSelectView(p.view)}
                    className="p-4 bg-white hover:bg-red-50/50 border border-gray-200 hover:border-red-300 rounded-2xl transition-all cursor-pointer group shadow-sm flex items-start space-x-3.5"
                  >
                    <div className="p-2.5 bg-red-100 text-[#DC2626] rounded-xl group-hover:bg-[#DC2626] group-hover:text-white transition-colors flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#DC2626] transition-colors truncate">
                          {p.bnName}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#DC2626] group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{p.desc}</p>
                      <span className="inline-block mt-2 text-[10px] font-mono text-red-600 font-semibold bg-red-50 px-2 py-0.5 rounded">
                        https://dreamsfly.net{p.path}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 2: Country Visa Pages */}
        {filteredCountries.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-3">
              <Globe className="w-5 h-5 text-[#DC2626]" />
              <h2 className="text-xl font-extrabold text-gray-900 font-sans">
                ২. দেশভিত্তিক ভিসা গাইড ও রিকোয়ারমেন্টস ({filteredCountries.length})
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredCountries.map((c) => (
                <div
                  key={c.id}
                  onClick={() => onSelectCountry(c.id)}
                  className="p-3 bg-white hover:bg-amber-50/60 border border-gray-200 hover:border-amber-400 rounded-xl transition-all cursor-pointer group text-center space-y-1 shadow-sm"
                >
                  <span className="text-3xl block transform group-hover:scale-110 transition-transform">{c.flag}</span>
                  <h3 className="font-bold text-gray-900 text-xs group-hover:text-[#DC2626] transition-colors truncate">
                    {c.name}
                  </h3>
                  <span className="text-[10px] text-gray-500 block">{c.region}</span>
                  <span className="text-[9px] font-mono text-gray-400 block truncate">/country/{c.id}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Interactive Tools */}
        {filteredTools.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-3">
              <Calculator className="w-5 h-5 text-[#DC2626]" />
              <h2 className="text-xl font-extrabold text-gray-900 font-sans">
                ৩. অনলাইন টুলস ও ডিজিটাল ফিচারসমূহ ({filteredTools.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTools.map((t) => {
                const Icon = t.icon;
                return (
                  <div
                    key={t.view}
                    onClick={() => onSelectView(t.view)}
                    className="p-4 bg-white hover:bg-amber-50/50 border border-gray-200 hover:border-amber-400 rounded-2xl transition-all cursor-pointer group shadow-sm flex items-start space-x-3.5"
                  >
                    <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-colors flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#DC2626] transition-colors truncate">
                          {t.bnName}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#DC2626] group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{t.desc}</p>
                      <span className="inline-block mt-2 text-[10px] font-mono text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                        https://dreamsfly.net{t.path}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 4: Blog Articles & Guides */}
        {filteredBlogs.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-[#DC2626]" />
                <h2 className="text-xl font-extrabold text-gray-900 font-sans">
                  ৪. তথ্যবহুল ব্লগ ও ভিসা নির্দেশিকা ({filteredBlogs.length})
                </h2>
              </div>
              <button
                onClick={() => onSelectView('blog')}
                className="text-xs font-bold text-[#DC2626] hover:underline flex items-center space-x-1"
              >
                <span>ব্লগ পেজে যান</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBlogs.map((b) => (
                <div
                  key={b.id}
                  onClick={() => onSelectView('blog')}
                  className="p-4 bg-white hover:bg-red-50/40 border border-gray-200 hover:border-red-300 rounded-2xl transition-all cursor-pointer group shadow-sm flex flex-col justify-between space-y-2"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#DC2626] bg-red-50 px-2 py-0.5 rounded-full">
                      {b.category}
                    </span>
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm group-hover:text-[#DC2626] transition-colors mt-2 leading-snug line-clamp-2">
                      {b.title}
                    </h3>
                  </div>
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                    <span>{b.author}</span>
                    <span className="font-mono text-[9px] text-gray-400">/blog/{b.slug}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer info box */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center space-y-2">
          <h3 className="font-bold text-gray-900 text-sm">
            আপনি কি কাঙ্ক্ষিত তথ্য খুঁজে পাচ্ছেন না?
          </h3>
          <p className="text-xs text-gray-600 max-w-xl mx-auto">
            আমাদের কাস্টমার সাপোর্ট টিমের সাথে সরাসরি কথা বলতে ডায়াল করুন{' '}
            <a href="tel:+8801771304219" className="text-[#DC2626] font-bold hover:underline">
              +৮৮০ ১৭৭১-৩০৪২১৯
            </a>{' '}
            অথবা ইমেইল করুন{' '}
            <a href="mailto:dreamsflyinternational@gmail.com" className="text-[#DC2626] font-bold hover:underline">
              dreamsflyinternational@gmail.com
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};
