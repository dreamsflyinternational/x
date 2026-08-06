import React, { useEffect } from 'react';
import { ViewType } from '../types';
import { COUNTRIES } from '../data/countries';
import { BLOG_POSTS } from '../data/blogs';
import { FEATURED_HOTELS, CITY_LANDING_PAGES } from '../data/hotels';

interface SeoHeadManagerProps {
  currentView: ViewType;
  selectedCountryId?: string;
  selectedBlogSlug?: string;
  selectedHotelId?: string | null;
  selectedTourId?: string;
  selectedUmrahId?: string;
  selectedCitySlug?: string;
}

const BASE_URL = 'https://dreamsfly.net';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80';

export const SeoHeadManager: React.FC<SeoHeadManagerProps> = ({
  currentView,
  selectedCountryId,
  selectedBlogSlug,
  selectedHotelId,
  selectedTourId,
  selectedUmrahId,
  selectedCitySlug,
}) => {
  useEffect(() => {
    let title = 'Dreams Fly International | Visa Processing & Tour Packages Agency';
    let description = 'Dreams Fly International - Premier Licensed Travel Consultancy in Dhaka, Bangladesh. Specialists in Canada, UK, USA, Schengen Visas, Europe Work Permits, Umrah Packages, Air Tickets & Custom Tours.';
    let keywords = 'visa processing Bangladesh, Canada visitor visa Dhaka, Schengen visa agent, Europe work permit, Umrah packages Bangladesh, air tickets booking Dhaka, Dreams Fly International';
    let canonicalUrl = `${BASE_URL}/`;
    let ogImage = DEFAULT_IMAGE;
    let schemaJson: any = null;

    if (currentView === 'home') {
      title = 'Dreams Fly International | Premier Visa Processing & Tour Agency Bangladesh';
      description = 'Top Government Approved Travel Consultancy in Dhaka for Canada, UK, USA, Europe Schengen Visas, Work Permits, Umrah Packages & Air Tickets.';
      canonicalUrl = `${BASE_URL}/`;
      schemaJson = {
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        'name': 'Dreams Fly International',
        'url': BASE_URL,
        'logo': `${BASE_URL}/logo.png`,
        'image': DEFAULT_IMAGE,
        'description': description,
        'telephone': '+8801771304219',
        'email': 'dreamsflyinternational@gmail.com',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Office 1: Road 16, Rupnagar, Mirpur 11, Dhaka 1216 | Office 2: Rohanpur, Gomastapur, Chapainawabganj',
          'addressLocality': 'Dhaka',
          'postalCode': '1212',
          'addressCountry': 'BD'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': '23.7925',
          'longitude': '90.4167'
        },
        'openingHours': 'Mo-Sa 09:00-20:00',
        'priceRange': '৳৳',
        'sameAs': [
          'https://facebook.com/dreamsflyinternational',
          'https://t.me/mjjahanali'
        ]
      };
    } else if (currentView === 'country-detail' && selectedCountryId) {
      const country = COUNTRIES.find((c) => c.id === selectedCountryId);
      if (country) {
        title = `${country.name} (Visa Guide) | Dreams Fly International`;
        description = `${country.name} ভিজিটর, স্টুডেন্ট ও ফাইল প্রসেসিং সার্ভিস। ভিসা রিকোয়ারমেন্টস, স্পন্সর ফাইল, ব্যাংক সলভেন্সি ও সরকারি ফি সম্পর্কে জানুন।`;
        keywords = `${country.name} ভিসা, ${country.id} visa processing, visa requirement Bangladesh, Dreams Fly International`;
        canonicalUrl = `${BASE_URL}/country/${country.id}`;
        if (country.flag) ogImage = `https://flagcdn.com/w1280/${country.code.toLowerCase()}.png`;
        schemaJson = {
          '@context': 'https://schema.org',
          '@type': 'Service',
          'name': `${country.name} Visa Processing Service`,
          'provider': {
            '@type': 'TravelAgency',
            'name': 'Dreams Fly International'
          },
          'areaServed': 'Bangladesh',
          'description': description
        };
      }
    } else if (currentView === 'countries') {
      title = 'দেশভিত্তিক ভিসা প্রসেসিং ও গাইডলাইন | Dreams Fly International';
      description = 'কানাডা, ইউকে, ইউএসএ, অস্ট্রেলিয়া, জার্মানি, ইতালি, রোমানিয়া সহ ৪০+ দেশের ভিসা রিকোয়ারমেন্ট ও ফাইল প্রসেসিং গাইড।';
      canonicalUrl = `${BASE_URL}/countries`;
    } else if (currentView === 'blog-detail' && selectedBlogSlug) {
      const blog = BLOG_POSTS.find((b) => b.slug === selectedBlogSlug);
      if (blog) {
        title = `${blog.title} | Dreams Fly International`;
        description = blog.excerpt;
        keywords = blog.tags.join(', ');
        canonicalUrl = `${BASE_URL}/blog/${blog.slug}`;
        if (blog.image) ogImage = blog.image;
        schemaJson = {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          'headline': blog.title,
          'image': blog.image,
          'author': {
            '@type': 'Person',
            'name': blog.author
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'Dreams Fly International',
            'logo': {
              '@type': 'ImageObject',
              'url': `${BASE_URL}/logo.png`
            }
          },
          'description': blog.excerpt
        };
      }
    } else if (currentView === 'blog') {
      title = 'ট্রাভেল ব্লগ ও ভিসা গাইডলাইন ২০২৬ | Dreams Fly International';
      description = 'ভিসা রিজেকশন এড়ানোর টিপস, ব্যাংক স্টেটমেন্ট ফরম্যাট, আইআরসিসি আপডেট ও আন্তর্জাতিক ভ্রমণ নির্দেশিকা।';
      canonicalUrl = `${BASE_URL}/blog`;
    } else if (currentView === 'hotel-detail' && selectedHotelId) {
      const hotel = FEATURED_HOTELS.find((h) => h.id === selectedHotelId);
      if (hotel) {
        title = `${hotel.nameBn} (${hotel.nameEn}) - ${hotel.cityBn} হোটেল বুকিং | Dreams Fly International`;
        description = `${hotel.nameBn} - ${hotel.cityBn}। হারাম শরীফের দূরত্ব, ফাইভ স্টার সার্ভিস ও রুম বুকিং সুবিধা।`;
        canonicalUrl = `${BASE_URL}/hotel/${hotel.id}`;
        if (hotel.image) ogImage = hotel.image;
        schemaJson = {
          '@context': 'https://schema.org',
          '@type': 'LodgingBusiness',
          'name': hotel.nameEn,
          'description': description,
          'image': hotel.image,
          'starRating': {
            '@type': 'Rating',
            'ratingValue': hotel.stars
          }
        };
      }
    } else if (currentView === 'hotels-city' && selectedCitySlug) {
      const city = CITY_LANDING_PAGES.find((c) => c.slug === selectedCitySlug);
      if (city) {
        title = `${city.cityBn} হোটেল বুকিং ও অফারসমূহ | Dreams Fly International`;
        description = `${city.titleBn}। ${city.tagline}। সাশ্রয়ী হোটেল রিজার্ভেশন সুবিধা।`;
        canonicalUrl = `${BASE_URL}/hotels/${city.slug}`;
      }
    } else if (currentView === 'hotel') {
      title = 'মাক্কাহ, মাদিনাহ, দুবাই ও ব্যাংকক হোটেল রিজার্ভেশন | Dreams Fly International';
      description = 'হারামাইন শরীফাইনের নিকটতম ফাইভ স্টার হোটেল ও বিশ্বখ্যাত ট্যুরিস্ট গন্তব্যের কম খরচে হোটেল বুকিং সার্ভিস।';
      canonicalUrl = `${BASE_URL}/hotel`;
    } else if (currentView === 'tour-detail' && selectedTourId) {
      title = `ট্যুর প্যাকেজ বিস্তারিত (${selectedTourId}) | Dreams Fly International`;
      description = `আন্তর্জাতিক ও দেশীয় আকর্ষণীয় ট্যুর প্যাকেজ ${selectedTourId}। এয়ার টিকেট, হোটেল, সাইটসিয়িং সহ অল ইনক্লুসিভ প্যাকেজ।`;
      canonicalUrl = `${BASE_URL}/tour/${selectedTourId}`;
    } else if (currentView === 'tours') {
      title = 'দেশি ও বিদেশি আকর্ষণীয় বাজেট ট্যুর প্যাকেজ | Dreams Fly International';
      description = 'থাইল্যান্ড, মালয়েশিয়া, দুবাই, মালদ্বীপ, কাশ্মীর, সজেক ও কক্সবাজার অল ইনক্লুসিভ ট্যুর প্যাকেজ।';
      canonicalUrl = `${BASE_URL}/tours`;
    } else if (currentView === 'umrah-detail' && selectedUmrahId) {
      title = `উমরাহ প্যাকেজ বিস্তারিত (${selectedUmrahId}) | Dreams Fly International`;
      description = 'ঢাকা থেকে সরাসরি ফ্লাইট, ৫/৪ স্টার হোটেল, উমরাহ ই-ভিসা ও অভিজ্ঞ মুয়াল্লিম সহ উমরাহ প্যাকেজ।';
      canonicalUrl = `${BASE_URL}/umrah/${selectedUmrahId}`;
    } else if (currentView === 'umrah-hajj') {
      title = 'ভিআইপি ও বাজেট উমরাহ প্যাকেজ ২০২৬ | Dreams Fly International';
      description = 'পবিত্র উমরাহ পালনকারীদের জন্য সাশ্রয়ী মূল্যে ৫ স্টার ও ৪ স্টার সার্ভিস সমৃদ্ধ কাস্টমাইজড উমরাহ প্যাকেজ।';
      canonicalUrl = `${BASE_URL}/umrah-hajj`;
    } else if (currentView === 'work-permit') {
      title = 'ইউরোপ ও মধ্যপ্রাচ্য ওয়ার্ক পারমিট ভিসা প্রসেসিং | Dreams Fly International';
      description = 'রোমানিয়া, ক্রোয়েশিয়া, বুলগেরিয়া ও সৌদি আরব জব অফার লেটার ও ওয়ার্ক পারমিট প্রসেসিং গাইডলাইন।';
      canonicalUrl = `${BASE_URL}/work-permit`;
    } else if (currentView === 'air-tickets') {
      title = 'সস্তা এয়ার টিকেট বুকিং ও গ্রুপ ফেয়ার | Dreams Fly International';
      description = 'বিমান বাংলাদেশ, ইউএস-বাংলা, এমিরেটস, কাতার ও সৌদিয়া এয়ারলাইন্সের বেস্ট প্রাইস আন্তর্জাতিক এয়ার টিকেট।';
      canonicalUrl = `${BASE_URL}/air-tickets`;
    } else if (currentView === 'services') {
      title = 'আমাদের সকল ট্রাভেল ও ভিসা সেবাসমূহ | Dreams Fly International';
      description = 'ভিজিট ভিসা, স্টুডেন্ট ভিসা, উমরাহ প্যাকেজ, এয়ার টিকেট, ওয়ার্ক পারমিট ও হোটেল বুকিং সার্ভিসেস।';
      canonicalUrl = `${BASE_URL}/services`;
    } else if (currentView === 'eligibility') {
      title = 'অনলাইন ভিসা যোগ্যতা ফ্রি চেক করুন | Dreams Fly International';
      description = 'আপনার প্রোফাইল, ব্যাংক ফান্ড ও ট্রাভেল হিস্ট্রি দিয়ে যেকোনো দেশের ভিসা পাওয়ার সম্ভাবনা নিখুঁতভাবে পরীক্ষা করুন।';
      canonicalUrl = `${BASE_URL}/eligibility`;
    } else if (currentView === 'calculator') {
      title = 'ভিসা ফি ও সার্ভিস চার্জ ক্যালকুলেটর | Dreams Fly International';
      description = 'কানাডা, ইউকে, ইউএসএ ও শেনজেন ভিসার এম্বাসি ফি, বায়োমেট্রিক ফি ও সার্ভিস চার্জ ক্যালকুলেট করুন।';
      canonicalUrl = `${BASE_URL}/calculator`;
    } else if (currentView === 'tracker') {
      title = 'লাইব ফাইল ও ভিসা অ্যাপ্লিকেশন ট্র্যাকার | Dreams Fly International';
      description = 'আপনার ভিসা পাসপোর্ট ফাইল ও অ্যাপ্লিকেশন স্ট্যাটাস মোবাইল নম্বর ও পাসপোর্ট আইডি দিয়ে রিয়েল-টাইমে ট্র্যাক করুন।';
      canonicalUrl = `${BASE_URL}/tracker`;
    } else if (currentView === 'about') {
      title = 'আমাদের সম্পর্কে | Dreams Fly International';
      description = 'ঢাকা মিরপুর ১১ ও চাঁপাইনবাবগঞ্জ রহনপুরের অন্যতম শীর্ষ ট্রাভেল কনসালট্যান্সি ফার্ম সম্পর্কে বিস্তারিত জানুন।';
      canonicalUrl = `${BASE_URL}/about`;
    } else if (currentView === 'contact') {
      title = 'যোগাযোগ ও অফিস লোকেশন | Dreams Fly International';
      description = 'আমাদের মিরপুর ১১ বা রহনপুর অফিসে সরাসরি চলে আসুন বা ফোন/হোয়াটসঅ্যাপে পরামর্শ নিন: +8801771304219।';
      canonicalUrl = `${BASE_URL}/contact`;
    } else if (currentView === 'sitemap') {
      title = 'সাইটম্যাপ ডিরেক্টরি | Dreams Fly International';
      description = 'ড্রিমস ফ্লাই ইন্টারন্যাশনালের সকল পেজ, ভিসা গাইড, হোটেল ও ট্যুর প্যাকেজ নেভিগেশন ডিরেক্টরি।';
      canonicalUrl = `${BASE_URL}/sitemap`;
    }

    // Update document title
    document.title = title;

    // Helper for hreflang links
    const updateHreflang = (langCode: string, href: string) => {
      let tag = document.querySelector(`link[rel="alternate"][hreflang="${langCode}"]`);
      if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', 'alternate');
        tag.setAttribute('hreflang', langCode);
        document.head.appendChild(tag);
      }
      tag.setAttribute('href', href);
    };

    const pathname = window.location.pathname;
    let raw = pathname.trim().replace(/\/$/, '') || '/';
    let cleanPath = raw;
    if (raw === '/bn' || raw.startsWith('/bn/')) cleanPath = raw.replace(/^\/bn/, '') || '/';
    if (raw === '/en' || raw.startsWith('/en/')) cleanPath = raw.replace(/^\/en/, '') || '/';

    const bnUrl = `${BASE_URL}/bn${cleanPath === '/' ? '' : cleanPath}`;
    const enUrl = `${BASE_URL}/en${cleanPath === '/' ? '' : cleanPath}`;

    updateHreflang('bn', bnUrl);
    updateHreflang('en', enUrl);
    updateHreflang('x-default', enUrl);

    // Update <html lang="...">
    const currentLang = raw.startsWith('/en') ? 'en' : 'bn';
    document.documentElement.setAttribute('lang', currentLang);

    // Helper to update or create meta tag
    const updateMetaTag = (selector: string, attrName: string, attrVal: string, contentVal: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentVal);
    };

    // Helper for link rel="canonical"
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // Update Meta Tags
    updateMetaTag('meta[name="description"]', 'name', 'description', description);
    updateMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);

    // Open Graph
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);

    // Twitter
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // Dynamic JSON-LD Schema Script
    let schemaScript = document.getElementById('dynamic-seo-schema');
    if (schemaJson) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'dynamic-seo-schema';
        schemaScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schemaJson);
    } else if (schemaScript) {
      schemaScript.remove();
    }
  }, [
    currentView,
    selectedCountryId,
    selectedBlogSlug,
    selectedHotelId,
    selectedTourId,
    selectedUmrahId,
    selectedCitySlug,
  ]);

  return null;
};
