import { BLOG_POSTS } from '../data/blogs';
import { COUNTRIES } from '../data/countries';
import { FEATURED_HOTELS, CITY_LANDING_PAGES } from '../data/hotels';
import { ALL_SERVICES_DATA } from '../data/servicesData';
import { SERVICES } from '../data/services';

const BASE_URL = 'https://dreamsfly.net';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80';
const LOGO_URL = `${BASE_URL}/logo.png`;

export interface SeoMetaData {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  bnUrl: string;
  enUrl: string;
  langAttr: string;
  ogLocale: string;
  ogType: string;
  ogImage: string;
  schemas: any[];
  h1: string;
  prerenderHtml: string;
}

export function generateSeoDataForPath(pathname: string): SeoMetaData {
  let raw = pathname.trim().replace(/\/$/, '') || '/';
  let lang: 'bn' | 'en' = 'bn';
  let cleanPath = raw;

  if (raw === '/bn' || raw.startsWith('/bn/')) {
    lang = 'bn';
    cleanPath = raw.replace(/^\/bn/, '') || '/';
  } else if (raw === '/en' || raw.startsWith('/en/')) {
    lang = 'en';
    cleanPath = raw.replace(/^\/en/, '') || '/';
  }

  const bnUrl = `${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`;
  const enUrl = `${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`;
  
  // Explicit self-referencing canonical
  const canonicalUrl = `${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`;

  const langAttr = lang === 'en' ? 'en' : 'bn';
  const ogLocale = lang === 'en' ? 'en_US' : 'bn_BD';
  const langPrefix = '';

  let title = lang === 'en'
    ? 'Dreams Fly International | Premier Visa Processing & Travel Agency'
    : 'Dreams Fly International | ভিসা প্রসেসিং ও এয়ার টিকিট এজেন্সি বাংলাদেশ';
  let description = lang === 'en'
    ? 'Premier Licensed Travel Consultancy in Dhaka, Bangladesh for Canada, UK, USA, Schengen Visas, Europe Work Permits, Umrah Packages & Air Tickets.'
    : 'ঢাকা, বাংলাদেশের অন্যতম নির্ভরযোগ্য ও সরকার অনুমোদিত ভিসা কনসালটেন্সি এজেন্সি। কানাডা, ইউকে, ইউএসএ, ইউরোপ ওয়ার্ক পারমিট, উমরাহ ও বিমান টিকিটিং সেবা।';
  let keywords = 'visa processing Bangladesh, Canada visitor visa Dhaka, Schengen visa agent, Europe work permit, Umrah packages Bangladesh, air tickets booking Dhaka, Dreams Fly International';
  let ogImage = DEFAULT_IMAGE;
  let ogType = 'website';
  let h1 = lang === 'en'
    ? 'Dreams Fly International - Government Approved Travel Agency'
    : 'ড্রিমস ফ্লাই ইন্টারন্যাশনাল - সরকার অনুমোদিত স্বনামধন্য ট্রাভেল ও ভিসা এজেন্সি';

  let pageSpecificContent = '';
  const schemas: any[] = [];

  // Core Agency Organization Schema
  const baseAgencySchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${BASE_URL}/#organization`,
    'name': 'Dreams Fly International',
    'url': BASE_URL,
    'logo': LOGO_URL,
    'image': DEFAULT_IMAGE,
    'inLanguage': lang === 'en' ? 'en-US' : 'bn-BD',
    'description': description,
    'telephone': '+8801771304219',
    'email': 'dreamsflyinternational@gmail.com',
    'priceRange': '৳৳',
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
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '09:00',
        'closes': '20:00'
      }
    ],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '1420',
      'bestRating': '5',
      'worstRating': '1'
    },
    'sameAs': [
      'https://web.facebook.com/dreamsfly/',
      'https://www.linkedin.com/company/dreams-fly-international/',
      'https://t.me/mjjahanali'
    ]
  };

  const agencyRef = {
    '@type': 'TravelAgency',
    '@id': `${BASE_URL}/#organization`,
    'name': 'Dreams Fly International',
    'url': BASE_URL,
    'telephone': '+8801771304219'
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    'url': BASE_URL,
    'name': 'Dreams Fly International',
    'description': 'Official Visa Processing & Travel Agency Website',
    'inLanguage': lang === 'en' ? 'en-US' : 'bn-BD',
    'publisher': agencyRef,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${BASE_URL}/blog?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  // Route matching logic
  if (cleanPath === '/' || cleanPath === '/home') {
    title = lang === 'en'
      ? 'Dreams Fly International | Visa Processing & Work Permit Agency Dhaka'
      : 'Dreams Fly International | ভিসা প্রসেসিং ও ওয়ার্ক পারমিট কনসালটেন্সি ঢাকা';
    description = lang === 'en'
      ? 'Government Approved Travel Consultancy in Dhaka for Canada, UK, USA, Europe Schengen Visas, Work Permits, Umrah Packages & Air Tickets.'
      : 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত ও লাইসেন্সপ্রাপ্ত ট্রাভেল ও ভিসা কনসালটেন্সি এজেন্সি। কানাডা, ইউকে, ইউএসএ, ইউরোপ ওয়ার্ক পারমিট, উমরাহ ও বিমান টিকিট সেবা।';
    h1 = lang === 'en'
      ? 'Dreams Fly International - Government Approved Visa & Travel Agency'
      : 'ড্রাইমস ফ্লাই ইন্টারন্যাশনাল - সরকার অনুমোদিত স্বনামধন্য ট্রাভেল ও ভিসা এজেন্সি ঢাকা';
    schemas.push(baseAgencySchema, websiteSchema);

    pageSpecificContent = `
      <section style="margin-bottom: 32px;">
        <h2 style="font-size: 24px; font-weight: 700; color: #1e293b; margin-bottom: 12px;">বাংলাদেশের শীর্ষ ভিসা ও ইমিগ্রেশন কনসালটেন্সি সেবা</h2>
        <p style="font-size: 16px; line-height: 1.8; color: #475569; margin-bottom: 16px;">
          ড্রিমস ফ্লাই ইন্টারন্যাশনাল (Dreams Fly International) গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত একটি বিশ্বস্ত ট্রাভেল ও ভিসা প্রসেসিং এজেন্সি। আমরা ঢাকা মিরপুর ১১ ও চাঁপাইনবাবগঞ্জ রহনপুর অফিস থেকে দীর্ঘ অভিজ্ঞতা ও দক্ষতার সাথে বিশ্বজুড়ে ইমিগ্রেশন, ওয়ার্ক পারমিট, ভিজিটর ভিসা, স্টুডেন্ট ভিসা, ভিআইপি উমরাহ প্যাকেজ এবং এয়ার টিকিট বুকিং সেবা প্রদান করে আসছি।
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 24px;">
          <div style="padding: 16px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="font-size: 18px; font-weight: 700; color: #b71c1c; margin-bottom: 8px;">🇨🇦 কানাডা ও আমেরিকা ভিসা</h3>
            <p style="font-size: 14px; color: #64748b; line-height: 1.6;">কানাডা ট্যুরিস্ট, সুপার ভিসা ও ইউএসএ B1/B2 ভিসার জন্য নিখুঁত কাভারিং লেটার, ব্যাংক স্টেটমেন্ট ও অনলাইন ফাইল প্রসেসিং।</p>
            <a href="${langPrefix}/country/canada" style="display: inline-block; margin-top: 8px; color: #b71c1c; font-weight: 600;">বিস্তারিত দেখুন &rarr;</a>
          </div>
          <div style="padding: 16px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="font-size: 18px; font-weight: 700; color: #b71c1c; margin-bottom: 8px;">💼 ইউরোপ শেনজেন ওয়ার্ক পারমিট</h3>
            <p style="font-size: 14px; color: #64748b; line-height: 1.6;">রোমানিয়া, হাঙ্গেরি, ক্রোয়েশিয়া, সার্বিয়া, পোল্যান্ড ও স্লোভেনিয়া কাজের জন্য সরকারি অনুমোদিত জব অফার ও ওয়ার্ক পারমিট।</p>
            <a href="${langPrefix}/work-permit" style="display: inline-block; margin-top: 8px; color: #b71c1c; font-weight: 600;">ওয়ার্ক পারমিট তথ্য &rarr;</a>
          </div>
          <div style="padding: 16px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="font-size: 18px; font-weight: 700; color: #b71c1c; margin-bottom: 8px;">🕋 ভিআইপি ও বাজেট উমরাহ প্যাকেজ</h3>
            <p style="font-size: 14px; color: #64748b; line-height: 1.6;">মক্কা-মদিনা হারাম থেকে ০-১০০ মিটার দূরত্বের ৩, ৪ ও ৫ স্টার হোটেল, সরাসরি বিমান ফ্লাইট ও গাইড সহ উমরাহ প্যাকেজ।</p>
            <a href="${langPrefix}/umrah-hajj" style="display: inline-block; margin-top: 8px; color: #b71c1c; font-weight: 600;">উমরাহ প্যাকেজসমূহ &rarr;</a>
          </div>
        </div>
      </section>
    `;

  } else if (cleanPath.startsWith('/country/')) {
    const countryId = cleanPath.replace('/country/', '').toLowerCase().trim();
    const country = COUNTRIES.find((c) => c.id === countryId || c.code.toLowerCase() === countryId);
    
    if (country) {
      title = lang === 'en'
        ? `${country.name} Visa & Work Permit Processing Guide 2026 | Dreams Fly International`
        : `${country.name} ভিসা ও ওয়ার্ক পারমিট আবেদনের নিয়ম ২০২৬ | Dreams Fly International`;
      description = lang === 'en'
        ? `Complete visa file processing guide for ${country.name}. Requirements, fees, bank solvency, required documents & embassy submission rules in Dhaka.`
        : `${country.name} ভিজিটর, স্টুডেন্ট ও ওয়ার্ক পারমিট ভিসা আবেদনের সুনির্দিষ্ট নিয়ম, প্রয়োজনীয় কাগজপত্র, ব্যাংক সলভেন্সি ও এম্বাসি সাবমিশন নির্দেশিকা।`;
      keywords = `${country.name} visa Bangladesh, ${country.name} work permit, ${country.id} visa process Dhaka, ${country.name} embassy fees, Dreams Fly International`;
      if (country.flag) ogImage = `https://flagcdn.com/w1280/${country.code.toLowerCase()}.png`;
      h1 = lang === 'en'
        ? `${country.name} Visa & Work Permit File Processing Guide`
        : `${country.name} ভিসা ও ওয়ার্ক পারমিট আবেদনের নিয়ম ও নির্দেশিকা ২০২৬`;

      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': `${country.name} Visa & Work Permit Processing`,
        'serviceType': 'Visa & Immigration Service',
        'inLanguage': lang === 'en' ? 'en-US' : 'bn-BD',
        'provider': agencyRef,
        'areaServed': 'Bangladesh',
        'description': description
      });

      pageSpecificContent = `
        <article style="margin-bottom: 32px;">
          <h2 style="font-size: 22px; font-weight: 700; color: #1e293b; margin-bottom: 12px;">${country.name} ভিসা সংক্রান্ত বিস্তারিত তথ্য ও নির্দেশিকা</h2>
          <p style="font-size: 16px; line-height: 1.8; color: #475569; margin-bottom: 16px;">
            ${country.name} ভ্রমণের বা কাজের উদ্দেশ্যে বাংলাদেশ থেকে সঠিক ভিসা প্রসেসিং অত্যন্ত গুরুত্বপূর্ণ। ড্রাইমস ফ্লাই ইন্টারন্যাশনাল আপনার ${country.name} ভ্রমণের স্বপ্ন বাস্তবায়নে অভিজ্ঞ অফিসার দিয়ে ১০০% নির্ভুল ফাইল প্রস্তুত নিশ্চিত করে।
          </p>

          <h3 style="font-size: 18px; font-weight: 700; color: #b71c1c; margin-top: 24px; margin-bottom: 8px;">প্রয়োজনীয় কাগজপত্রের চেকক্লিস্ট</h3>
          <ul style="line-height: 1.8; color: #334155; margin-bottom: 24px; padding-left: 20px;">
            <li>ন্যূনতম ৬ মাসের মেয়াদের পাসপোর্ট (কমপক্ষে ২টি ফাঁকা পেজ সহ)</li>
            <li>বিগত ৬ মাসের হালনাগাদ ব্যাংক স্টেটমেন্ট ও ব্যাংক সলভেন্সি সার্টিফিকেট</li>
            <li>২ কপি পাসপোর্ট সাইজের সদ্য তোলা ছবি (সাদা ব্যাকগ্রাউন্ড, ৮০% মুখমণ্ডল কাভারেজ)</li>
            <li>পেশাগত প্রমাণপত্র (ট্রেড লাইসেন্স, জব আইডি, এনওআইডি বা স্টুডেন্ট আইডি)</li>
            <li>পুলিশ ক্লিয়ারেন্স ও প্রয়োজনীয় ডকুমেন্টের অনুবাদ ও সত্যায়ন</li>
          </ul>

          <h3 style="font-size: 18px; font-weight: 700; color: #b71c1c; margin-top: 24px; margin-bottom: 8px;">কেন ড্রাইমস ফ্লাই ইন্টারন্যাশনালের মাধ্যমে ${country.name} ভিসা করবেন?</h3>
          <p style="font-size: 15px; line-height: 1.7; color: #475569;">
            আমাদের অভিজ্ঞ ফাইল অফিসাররা এম্বাসি ও ভিএফএস গ্লোবালের হালনাগাদ গাইডলাইন অনুযায়ী পেশাদার কভারিং লেটার, ট্রাভেল আইটিনোরারি এবং ফাইন্যান্সিয়াল এসেসমেন্ট তৈরি করেন। ঢাকার মিরপুর ১১ ও চাঁপাইনবাবগঞ্জ রহনপুর অফিস থেকে সরাসরি কনসালটেন্সি সুবিধা গ্রহণ করুন।
          </p>
        </article>
      `;
    } else {
      title = `${countryId.toUpperCase()} Visa Guide 2026 | Dreams Fly International`;
      description = `Visa processing details and requirements for ${countryId.toUpperCase()}. Legal consultancy by Dreams Fly International in Dhaka.`;
      h1 = `${countryId.toUpperCase()} Visa Processing Information`;
    }

  } else if (cleanPath === '/countries') {
    title = lang === 'en'
      ? 'All Countries Visa & Work Permit Guide 2026 | Dreams Fly International'
      : 'সকল দেশের ভিসা ও ওয়ার্ক পারমিট গাইড ২০২৬ | Dreams Fly International';
    description = lang === 'en'
      ? 'Visa processing rules, fees & requirements for 50+ countries including Canada, UK, USA, Schengen Europe, Japan, Saudi Arabia, Dubai & Australia.'
      : 'কানাডা, ইউকে, ইউএসএ, ইউরোপ শেনজেন, জাপান, অস্ট্রেলিয়া, কাতার, দুবাই ও সৌদি আরব সহ ৫০+ দেশের ভিসা ফি, ডকুমেন্টস ও আবেদনের নিয়ম।';
    h1 = lang === 'en' ? '50+ Countries Visa & Work Permit Processing Guide' : '৫০+ দেশের ভিসা ও ওয়ার্ক পারমিট প্রসেসিং গাইড ২০২৬';

    const countriesListHtml = COUNTRIES.map((c) => `
      <a href="${langPrefix}/country/${c.id}" style="padding: 12px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; text-decoration: none; color: #1e293b; display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 20px;">${c.flag || '🏳️'}</span>
        <span style="font-weight: 600;">${c.name}</span>
      </a>
    `).join('');

    pageSpecificContent = `
      <section style="margin-bottom: 32px;">
        <p style="font-size: 16px; line-height: 1.8; color: #475569; margin-bottom: 24px;">
          ড্রাইমস ফ্লাই ইন্টারন্যাশনাল উত্তর আমেরিকা, ইউরোপের শেনজেন অঞ্চল, মধ্যপ্রাচ্য এবং এশিয়ার শীর্ষ ৫০টিরও বেশি দেশের ভিসা আবেদনপত্র ও ইমিগ্রেশন ফাইল সফলভাবে প্রসেস করে। প্রতিটি দেশের বিস্তারিত প্রয়োজনীয় কাগজপত্র ও নিয়মাবলী জানতে নিচে তালিকাভুক্ত দেশে ক্লিক করুন:
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px;">
          ${countriesListHtml}
        </div>
      </section>
    `;

  } else if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '').trim();
    const blog = BLOG_POSTS.find((b) => b.slug === slug || b.id === slug);
    if (blog) {
      title = `${blog.title} | Dreams Fly International`;
      description = blog.excerpt;
      keywords = blog.tags ? blog.tags.join(', ') : 'visa guide, travel news';
      ogImage = blog.image || DEFAULT_IMAGE;
      ogType = 'article';
      h1 = blog.title;

      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': canonicalUrl
        },
        'headline': blog.title,
        'image': ogImage,
        'inLanguage': lang === 'en' ? 'en-US' : 'bn-BD',
        'author': {
          '@type': 'Person',
          'name': blog.author || 'Md. Jahan Ali'
        },
        'publisher': {
          '@id': `${BASE_URL}/#organization`
        },
        'description': blog.excerpt
      });

      pageSpecificContent = `
        <article style="margin-bottom: 32px;">
          <div style="font-size: 14px; color: #64748b; margin-bottom: 12px;">
            লেখক: <strong>${blog.author || 'মোঃ জাহান আলী'}</strong> | প্রকাশিত: ${blog.date} | বিভাগ: ${blog.category || 'ইমিগ্রেশন গাইড'}
          </div>
          <p style="font-size: 18px; line-height: 1.8; font-weight: 600; color: #334155; margin-bottom: 24px; padding: 16px; background: #f1f5f9; border-left: 4px solid #b71c1c; border-radius: 4px;">
            ${blog.excerpt}
          </p>
          <div style="font-size: 16px; line-height: 1.8; color: #334155;">
            ${(blog.content || '').slice(0, 1500).replace(/\n/g, '<br/>')}
          </div>
        </article>
      `;
    } else {
      title = `Immigration Blog & Travel Guide | Dreams Fly International`;
      description = `Latest visa updates, Europe work permit news, Canada immigration guides and travel advice by Dreams Fly International.`;
      h1 = `ইমিগ্রেশন ও ভিসা কনসালটেন্সি ব্লগ`;
    }

  } else if (cleanPath === '/blog') {
    title = lang === 'en'
      ? 'Immigration & Visa Processing Blog 2026 | Dreams Fly International'
      : 'ভিসা প্রসেসিং ও ইমিগ্রেশন ব্লগ ও নির্দেশিকা | Dreams Fly International';
    description = lang === 'en'
      ? 'Latest updates on Europe work permits, Canada visitor visa processing, Schengen refusal recovery, and Umrah travel guides.'
      : 'ইউরোপ ওয়ার্ক পারমিট, কানাডা ভিজিটর ভিসা, শেনজেন ভিসা রিজেকশন সমাধান ও উমরাহ প্যাকেজ সংক্রান্ত সর্বশেষ ইমিগ্রেশন আপডেট ও টিপস।';
    h1 = lang === 'en' ? 'Immigration, Visa Processing & Travel Blog 2026' : 'ইমিগ্রেশন, ভিসা প্রসেসিং ও ট্রাভেল ব্লগ ২০২৬';

    const blogListHtml = BLOG_POSTS.slice(0, 12).map((b) => `
      <div style="padding: 16px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h3 style="font-size: 18px; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
          <a href="${langPrefix}/blog/${b.slug}" style="color: #0f172a; text-decoration: none;">${b.title}</a>
        </h3>
        <p style="font-size: 14px; color: #64748b; line-height: 1.6; margin-bottom: 12px;">${b.excerpt}</p>
        <a href="${langPrefix}/blog/${b.slug}" style="color: #b71c1c; font-weight: 600; font-size: 14px;">সম্পূর্ণ আর্টিকেল পড়ুন &rarr;</a>
      </div>
    `).join('');

    pageSpecificContent = `
      <section style="margin-bottom: 32px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
          ${blogListHtml}
        </div>
      </section>
    `;

  } else if (cleanPath.startsWith('/service/')) {
    const serviceId = cleanPath.replace('/service/', '').trim();
    const service = ALL_SERVICES_DATA.find((s) => s.id === serviceId) || SERVICES.find((s) => s.id === serviceId);

    if (service) {
      const sTitle = (service as any).titleBn || service.title;
      const sDesc = (service as any).overviewBn || (service as any).shortDesc || (service as any).fullDesc || description;
      title = `${sTitle} | Dreams Fly International`;
      description = sDesc;
      h1 = `${sTitle} - ড্রাইমস ফ্লাই ইন্টারন্যাশনাল`;

      pageSpecificContent = `
        <article style="margin-bottom: 32px;">
          <p style="font-size: 17px; line-height: 1.8; color: #334155; margin-bottom: 20px;">${sDesc}</p>
          <div style="padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
            <h3 style="font-size: 18px; font-weight: 700; color: #b71c1c; margin-bottom: 12px;">সেবার সুনির্দিষ্ট সুবিধাসমূহ:</h3>
            <ul style="line-height: 1.8; color: #475569; padding-left: 20px;">
              ${((service as any).benefits || (service as any).features || ['১০০% নির্ভুল ফাইল প্রসেসিং', 'অভিজ্ঞ কনসালট্যান্ট দ্বারা ফাইল অডিট']).map((f: string) => `<li>${f}</li>`).join('')}
            </ul>
          </div>
        </article>
      `;
    }

  } else if (cleanPath === '/services') {
    title = lang === 'en'
      ? 'Travel & Visa Consultancy Services | Dreams Fly International'
      : 'আমাদের ট্রাভেল ও ভিসা সেবাসমূহ | Dreams Fly International';
    description = lang === 'en'
      ? 'Tourist visas, student visas, Europe work permits, VIP Umrah packages, international flight tickets & hotel bookings in Dhaka.'
      : 'ভিজিট ভিসা, স্টুডেন্ট ভিসা, ওয়ার্ক পারমিট, উমরাহ প্যাকেজ, এয়ার টিকেট ও আন্তর্জাতিক হোটেল বুকিং সার্ভিসেস।';
    h1 = lang === 'en' ? 'Our Travel & Visa Consultancy Services' : 'ড্রাইমস ফ্লাই ইন্টারন্যাশনালের সেবাসমূহ';

    pageSpecificContent = `
      <section style="margin-bottom: 32px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
          <div style="padding: 20px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="font-size: 20px; font-weight: 700; color: #b71c1c; margin-bottom: 8px;">ট্যুরিস্ট ভিসা প্রসেসিং</h3>
            <p style="font-size: 14px; color: #64748b; line-height: 1.6;">কানাডা, ইউকে, ইউএসএ, শেনজেন ও এশিয়ার দেশগুলোর নির্ভুল ফাইল প্রসেসিং।</p>
            <a href="${langPrefix}/service/tourist-visa" style="display: inline-block; margin-top: 12px; color: #b71c1c; font-weight: 600;">বিস্তারিত দেখুন &rarr;</a>
          </div>
          <div style="padding: 20px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="font-size: 20px; font-weight: 700; color: #b71c1c; margin-bottom: 8px;">ওয়ার্ক পারমিট ভিসা</h3>
            <p style="font-size: 14px; color: #64748b; line-height: 1.6;">রোমানিয়া, হাঙ্গেরি, ক্রোয়েশিয়া, সার্বিয়া, পোল্যান্ড ও মধ্যপ্রাচ্য ওয়ার্ক পারমিট।</p>
            <a href="${langPrefix}/work-permit" style="display: inline-block; margin-top: 12px; color: #b71c1c; font-weight: 600;">বিস্তারিত দেখুন &rarr;</a>
          </div>
          <div style="padding: 20px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="font-size: 20px; font-weight: 700; color: #b71c1c; margin-bottom: 8px;">উমরাহ ও হজ প্যাকেজ</h3>
            <p style="font-size: 14px; color: #64748b; line-height: 1.6;">মক্কা-মদিনা হারাম সংলগ্ন হোটেল, সরাসরি ফ্লাইট ও পূর্ণাঙ্গ গাইড সহ উমরাহ।</p>
            <a href="${langPrefix}/umrah-hajj" style="display: inline-block; margin-top: 12px; color: #b71c1c; font-weight: 600;">বিস্তারিত দেখুন &rarr;</a>
          </div>
          <div style="padding: 20px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="font-size: 20px; font-weight: 700; color: #b71c1c; margin-bottom: 8px;">আন্তর্জাতিক এয়ার টিকেট</h3>
            <p style="font-size: 14px; color: #64748b; line-height: 1.6;">বিমান বাংলাদেশ, এমিরেটস, কাতার ও সৌদিয়া এয়ারলাইন্সের বেস্ট প্রাইস বুকিং।</p>
            <a href="${langPrefix}/air-tickets" style="display: inline-block; margin-top: 12px; color: #b71c1c; font-weight: 600;">বিস্তারিত দেখুন &rarr;</a>
          </div>
        </div>
      </section>
    `;

  } else if (cleanPath === '/work-permit') {
    title = 'ইউরোপ ও মধ্যপ্রাচ্য ওয়ার্ক পারমিট ভিসা প্রসেসিং | Dreams Fly International';
    description = 'রোমানিয়া, হাঙ্গেরি, ক্রোয়েশিয়া, সার্বিয়া, পোল্যান্ড, দুবাই ও সৌদি আরব জব অফার ও ওয়ার্ক পারমিট আবেদনের বিশ্বস্ত মাধ্যম।';
    keywords = 'europe work permit Bangladesh, romania work permit, hungary work permit, dubai job visa, saudi arabia visa';
    h1 = 'ইউরোপ ও মধ্যপ্রাচ্য ওয়ার্ক পারমিট ভিসা প্রসেসিং ২০২৬';

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Europe & Middle East Work Permit Visa Consultancy',
      'serviceType': 'Employment Visa Processing',
      'provider': agencyRef,
      'areaServed': 'Bangladesh',
      'description': description
    });

    pageSpecificContent = `
      <section style="margin-bottom: 32px;">
        <p style="font-size: 16px; line-height: 1.8; color: #475569; margin-bottom: 24px;">
          ড্রাইমস ফ্লাই ইন্টারন্যাশনাল ইউরোপীয় ইউনিয়ন (EU) এবং মধ্যপ্রাচ্যের শীর্ষ দেশগুলোর সরকারি অনুমোদিত ও আইনি ওয়ার্ক পারমিট ভিসা প্রসেসিং সেবা প্রদান করে। আমরা রোমানিয়া, হাঙ্গেরি, ক্রোয়েশিয়া, সার্বিয়া, পোল্যান্ড, দুবাই এবং সৌদি আরবে দক্ষ ও সাধারণ কর্মীদের বিশ্বস্ত ফাইল প্রস্তুতকরণ সেবা দিই।
        </p>
        <div style="padding: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h3 style="font-size: 18px; font-weight: 700; color: #b71c1c; margin-bottom: 12px;">প্রয়োজনীয় কাগজপত্রের মাস্টার চেকলিস্ট:</h3>
          <ul style="line-height: 1.8; color: #334155; padding-left: 20px;">
            <li>মূল পাসপোর্ট (সর্বনিম্ন ২ বছর মেয়াদসহ)</li>
            <li>পররাষ্ট্র মন্ত্রণালয় (MOFA) সত্যায়িত পুলিশ ক্লিয়ারেন্স সনদ</li>
            <li>অনুমোদিত ডায়াগনস্টিক সেন্টার থেকে মেডিকেল রিপোর্ট</li>
            <li>ইউরোপীয় ফরম্যাট (Europass) সিভি ও ছবি</li>
          </ul>
        </div>
      </section>
    `;

  } else if (cleanPath === '/umrah-hajj' || cleanPath.startsWith('/umrah')) {
    title = 'পবিত্র উমরাহ ও হজ প্যাকেজ ২০২৬ | Dreams Fly International';
    description = 'ঢাকা থেকে সরাসরি ফ্লাইট, ৫/৪ স্টার মাক্কাহ-মদিনা হোটেল, উমরাহ ই-ভিসা ও অভিজ্ঞ মুয়াল্লিম সহ ভিআইপি ও বাজেট উমরাহ প্যাকেজ।';
    keywords = 'umrah package Bangladesh, umrah visa Dhaka, makkah hotels, madinah hotels, Dreams Fly umrah';
    h1 = 'পবিত্র উমরাহ ও হজ সার্ভিসেস ২০২৬ - ড্রাইমস ফ্লাই ইন্টারন্যাশনাল';

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Umrah & Hajj Package Service',
      'serviceType': 'Religious Travel Service',
      'provider': agencyRef,
      'description': description
    });

    pageSpecificContent = `
      <section style="margin-bottom: 32px;">
        <p style="font-size: 16px; line-height: 1.8; color: #475569; margin-bottom: 24px;">
          আল্লাহর ঘর তাওয়াফ ও পবিত্র রওয়াজা মোবারক জিয়ারতের অনুভূতি অবিস্মরণীয় করতে ড্রাইমস ফ্লাই ইন্টারন্যাশনাল নিয়ে এলো প্রিমিয়াম উমরাহ প্যাকেজ। সরাসরি এয়ারলাইন্স টিকিট, ক্বাবা ও মসজিদে নববী সংলগ্ন ৩, ৪ ও ৫ স্টার হোটেল, প্রাইভেট এসি বাস পরিবহন এবং অভিজ্ঞ আলেমে দ্বীন দ্বারা জিয়ারত গাইড প্রদান করা হয়।
        </p>
      </section>
    `;

  } else if (cleanPath === '/air-tickets') {
    title = 'সস্তা এয়ার টিকেট বুকিং ও গ্রুপ ফেয়ার | Dreams Fly International';
    description = 'বিমান বাংলাদেশ, ইউএস-বাংলা, এমিরেটস, কাতার ও সৌদিয়া এয়ারলাইন্সের বেস্ট প্রাইস আন্তর্জাতিক এয়ার টিকেট ঢাকা।';
    keywords = 'air tickets booking Dhaka, cheap flights Bangladesh, biman ticket, emirates ticket discount';
    h1 = 'আন্তর্জাতিক ও অভ্যন্তরীণ এয়ার টিকেট বুকিং সেবা ঢাকা';

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Air Ticket Booking & Flight Reservations',
      'serviceType': 'Flight Ticketing',
      'provider': agencyRef,
      'description': description
    });

    pageSpecificContent = `
      <section style="margin-bottom: 32px;">
        <p style="font-size: 16px; line-height: 1.8; color: #475569; margin-bottom: 24px;">
          ড্রাইমস ফ্লাই ইন্টারন্যাশনাল সরাসরি Sabra, Amadeus ও Galileo GDS নেটওয়ার্ক ব্যবহার করে বিশ্বের যেকোনো গন্তব্যে সেরা মূল্যে এয়ার টিকেট বুকিং সুবিধা দেয়। বিমান বাংলাদেশ, এমিরেটস, কাতার এয়ারওয়েজ, সৌদিয়া এবং ইউএস-বাংলার গ্রুপ ফেয়ার ডিসকাউন্ট উপভোগ করুন।
        </p>
      </section>
    `;

  } else if (cleanPath.startsWith('/hotels') || cleanPath.startsWith('/hotel')) {
    const citySlug = cleanPath.replace(/^\/(hotels|hotel)\/?/, '').trim();
    const cityInfo = CITY_LANDING_PAGES.find((c) => c.slug === citySlug);

    if (cityInfo) {
      title = `${cityInfo.titleBn} | Dreams Fly International`;
      description = cityInfo.overviewBn;
      h1 = `${cityInfo.cityBn} হোটেল বুকিং ও অফার`;
    } else {
      title = 'আন্তর্জাতিক হোটেল বুকিং সার্ভিস | Dreams Fly International';
      description = 'মক্কা, মদিনা, দুবাই, ব্যাংকক, কুয়ালালামপুর ও কক্সবাজারের বেস্ট ৩, ৪ ও ৫ স্টার হোটেল বুকিং ঢাকা।';
      h1 = 'আন্তর্জাতিক হোটেল বুকিং সার্ভিসেস';
    }

  } else if (cleanPath === '/about') {
    title = 'আমাদের সম্পর্কে | Dreams Fly International';
    description = 'ঢাকা মিরপুর ১১ ও চাঁপাইনবাবগঞ্জ রহনপুরের স্বনামধন্য ও লাইসেন্সপ্রাপ্ত ট্রাভেল এজেন্সি ড্রিমস ফ্লাই ইন্টারন্যাশনাল সম্পর্কে বিস্তারিত জানুন।';
    h1 = 'ড্রাইমস ফ্লাই ইন্টারন্যাশনাল সম্পর্কে জানুন';

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'About Dreams Fly International',
      'description': description,
      'mainEntity': agencyRef
    });

    pageSpecificContent = `
      <section style="margin-bottom: 32px;">
        <p style="font-size: 16px; line-height: 1.8; color: #475569; margin-bottom: 20px;">
          ড্রাইমস ফ্লাই ইন্টারন্যাশনাল (Dreams Fly International) বাংলাদেশের অভিবাসন, ভিসা ও ট্রাভেল খাতের অন্যতম শীর্ষ ও সরকার লাইসেন্সপ্রাপ্ত স্বনামধন্য প্রতিষ্ঠান। প্রতিষ্ঠাতা মোঃ জাহান আলীর দক্ষ দিকনির্দেশনায় আমরা স্বচ্ছতা, নির্ভরযোগ্যতা ও প্রফেশনালিজম নিয়ে সেবা দিয়ে আসছি।
        </p>
        <div style="padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
          <h3 style="font-size: 18px; font-weight: 700; color: #b71c1c; margin-bottom: 8px;">অফিস ঠিকানা ও মোবাইল:</h3>
          <p style="font-size: 15px; color: #334155; line-height: 1.6;">
            <strong>ঢাকা হেড অফিস:</strong> রোড ১৬, রূপনগর, মিরপুর ১১, ঢাকা ১২১৬<br/>
            <strong>চাঁপাইনবাবগঞ্জ শাখা:</strong> রহনপুর, গোমস্তাপুর, চাঁপাইনবাবগঞ্জ<br/>
            <strong>হটলাইন:</strong> +৮৮০১৭৭১৩০৪২১৯ | <strong>ইমেইল:</strong> dreamsflyinternational@gmail.com
          </p>
        </div>
      </section>
    `;

  } else if (cleanPath === '/contact') {
    title = 'যোগাযোগ ও অফিস লোকেশন | Dreams Fly International';
    description = 'ড্রিমস ফ্লাই ইন্টারন্যাশনাল মিরপুর ১১ (ঢাকা) অথবা রহনপুর (চাঁপাইনবাবগঞ্জ) অফিসে সরাসরি দেখা করুন। হটলাইন: +৮৮০১৭৭১৩০৪২১৯।';
    h1 = 'যোগাযোগ করুন - ড্রাইমস ফ্লাই ইন্টারন্যাশনাল';

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': 'Contact Dreams Fly International',
      'description': description,
      'mainEntity': agencyRef
    });

    pageSpecificContent = `
      <section style="margin-bottom: 32px;">
        <p style="font-size: 16px; line-height: 1.8; color: #475569; margin-bottom: 20px;">
          যেকোনো ভিসা পরামর্শ, ফাইল অডিট বা উমরাহ ও এয়ার টিকেট অনুসন্ধানের জন্য আমাদের মিরপুর ১১ (ঢাকা) অথবা রহনপুর (চাঁপাইনবাবগঞ্জ) অফিসে সরাসরি দেখা করুন বা হটলাইনে যোগাযোগ করুন।
        </p>
        <div style="padding: 20px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 16px; line-height: 1.8;">
          <p>📞 <strong>মোবাইল / হোয়াটসঅ্যাপ:</strong> +৮৮০১৭৭১৩০৪২১৯</p>
          <p>✉️ <strong>ইমেইল:</strong> dreamsflyinternational@gmail.com</p>
          <p>📍 <strong>মিরপুর অফিস:</strong> রোড ১৬, রূপনগর, মিরপুর ১১, ঢাকা ১২১৬</p>
          <p>📍 <strong>চাঁপাইনবাবগঞ্জ অফিস:</strong> রহনপুর, গোমস্তাপুর, চাঁপাইনবাবগঞ্জ</p>
        </div>
      </section>
    `;

  } else if (cleanPath === '/sitemap') {
    title = 'সাইটম্যাপ ডিরেক্টরি | Dreams Fly International';
    description = 'ড্রিমস ফ্লাই ইন্টারন্যাশনালের সকল পেজ, ভিসা গাইড, হোটেল ও ট্যুর প্যাকেজ নেভিগেশন ডিরেক্টরি।';
    h1 = 'ড্রাইমস ফ্লাই ইন্টারন্যাশনাল সাইটম্যাপ ডিরেক্টরি';

    pageSpecificContent = `
      <section style="margin-bottom: 32px;">
        <p style="font-size: 16px; line-height: 1.8; color: #475569; margin-bottom: 20px;">
          ওয়েবসাইটের সকল মূল পেজ, সার্ভিসেস, দেশের ভিসা নির্দেশিকা এবং ইমিগ্রেশন ব্লগের সরাসরি লিংক নিচে দেওয়া হলো:
        </p>
      </section>
    `;

  } else {
    // Default fallback matching specific tool paths if present
    if (cleanPath === '/eligibility') {
      title = 'Visa Eligibility Checker Tool | Dreams Fly International';
      description = 'Check your Canada, UK, USA & Europe visa approval chances instantly using our free eligibility evaluation tool.';
      h1 = 'ফ্রি ভিসা এলিজিবিলিটি ও প্রোফাইল স্কোর চেকার';
    } else if (cleanPath === '/calculator') {
      title = 'Visa Cost Calculator Tool | Dreams Fly International';
      description = 'Calculate estimated embassy fees, VFS charges, and processing costs for all major visa destinations.';
      h1 = 'ভিসা প্রসেসিং খরচ ও এম্বাসি ফি ক্যালকুলেটর';
    } else if (cleanPath === '/tracker') {
      title = 'Application Status Tracker | Dreams Fly International';
      description = 'Track your visa file processing status, embassy submission, and biometrics status in real time.';
      h1 = 'অনলাইন ভিসা ফাইল ট্র্যাকিং পোর্টাল';
    }
  }

  // Pre-rendered HTML template with semantic headers, content, and full internal links
  const prerenderHtml = `
    <header style="background:#b71c1c; color:#fff; padding:16px 24px;">
      <div style="max-width:1200px; margin:0 auto; display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px;">
        <a href="${langPrefix}" style="color:#fff; font-size:20px; font-weight:800; text-decoration:none;">✈️ Dreams Fly International</a>
        <nav style="display:flex; flex-wrap:wrap; gap:12px; font-size:14px; font-weight:600;">
          <a href="${langPrefix}" style="color:#fff; text-decoration:none;">হোম</a>
          <a href="${langPrefix}/about" style="color:#fff; text-decoration:none;">আমাদের সম্পর্কে</a>
          <a href="${langPrefix}/services" style="color:#fff; text-decoration:none;">সেবাসমূহ</a>
          <a href="${langPrefix}/countries" style="color:#fff; text-decoration:none;">দেশসমূহ</a>
          <a href="${langPrefix}/work-permit" style="color:#fff; text-decoration:none;">ওয়ার্ক পারমিট</a>
          <a href="${langPrefix}/umrah-hajj" style="color:#fff; text-decoration:none;">উমরাহ প্যাকেজ</a>
          <a href="${langPrefix}/air-tickets" style="color:#fff; text-decoration:none;">এয়ার টিকেট</a>
          <a href="${langPrefix}/blog" style="color:#fff; text-decoration:none;">ব্লগ</a>
          <a href="${langPrefix}/contact" style="color:#fff; text-decoration:none;">যোগাযোগ</a>
          <a href="${langPrefix}/sitemap" style="color:#fff; text-decoration:none;">সাইটম্যাপ</a>
        </nav>
      </div>
    </header>

    <main style="max-width:1200px; margin:32px auto; padding:0 24px; font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color:#0f172a;">
      <h1 style="font-size:28px; font-weight:800; color:#0f172a; margin-bottom:16px; line-height:1.3;">${h1}</h1>
      <p style="font-size:16px; line-height:1.8; color:#334155; margin-bottom:24px;">${description}</p>

      ${pageSpecificContent}

      <!-- Internal Navigation & SEO Indexing Link Matrix -->
      <section style="margin-top:48px; padding:24px; background:#f8fafc; border-radius:12px; border:1px solid #e2e8f0;">
        <h2 style="font-size:20px; font-weight:700; color:#1e293b; margin-bottom:16px;">শীর্ষ ভিসা প্রসেসিং ও ইমিগ্রেশন গাইড ডিরেক্টরি</h2>
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:12px; font-size:14px;">
          <a href="${langPrefix}/country/canada" style="color:#b71c1c; text-decoration:none; font-weight:500;">🇨🇦 কানাডা ভিজিটর ও স্টুডেন্ট ভিসা</a>
          <a href="${langPrefix}/country/united-kingdom" style="color:#b71c1c; text-decoration:none; font-weight:500;">🇬🇧 ইউকে ভিসা ফাইল প্রসেসিং</a>
          <a href="${langPrefix}/country/united-states" style="color:#b71c1c; text-decoration:none; font-weight:500;">🇺🇸 ইউএসএ B1/B2 ভিসা কনসালটেন্সি</a>
          <a href="${langPrefix}/country/romania" style="color:#b71c1c; text-decoration:none; font-weight:500;">🇷🇴 রোমানিয়া ওয়ার্ক পারমিট</a>
          <a href="${langPrefix}/country/hungary" style="color:#b71c1c; text-decoration:none; font-weight:500;">🇭🇺 হাঙ্গেরি ওয়ার্ক পারমিট</a>
          <a href="${langPrefix}/country/croatia" style="color:#b71c1c; text-decoration:none; font-weight:500;">🇭🇷 ক্রোয়েশিয়া ওয়ার্ক পারমিট</a>
          <a href="${langPrefix}/country/saudi-arabia" style="color:#b71c1c; text-decoration:none; font-weight:500;">🇸🇦 সৌদি আরব উমরাহ ও ওয়ার্ক ভিসা</a>
          <a href="${langPrefix}/country/united-arab-emirates" style="color:#b71c1c; text-decoration:none; font-weight:500;">🇦🇪 দুবাই ২ বছর মেয়াদী জব ভিসা</a>
          <a href="${langPrefix}/work-permit" style="color:#b71c1c; text-decoration:none; font-weight:500;">💼 ইউরোপ শেনজেন ওয়ার্ক পারমিট ২০২৬</a>
          <a href="${langPrefix}/umrah-hajj" style="color:#b71c1c; text-decoration:none; font-weight:500;">🕋 পবিত্র উমরাহ ও হজ প্যাকেজ</a>
          <a href="${langPrefix}/air-tickets" style="color:#b71c1c; text-decoration:none; font-weight:500;">✈️ আন্তর্জাতিক সস্তা এয়ার টিকেট</a>
          <a href="${langPrefix}/blog" style="color:#b71c1c; text-decoration:none; font-weight:500;">📰 ইমিগ্রেশন ও ভিসা প্রসেসিং ব্লগ</a>
        </div>
      </section>
    </main>

    <footer style="background:#0f172a; color:#f8fafc; padding:40px 24px; margin-top:64px;">
      <div style="max-width:1200px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:32px;">
        <div>
          <h3 style="font-size:18px; font-weight:bold; color:#fff; margin-bottom:12px;">Dreams Fly International</h3>
          <p style="font-size:14px; line-height:1.6; color:#94a3b8;">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত ও লাইসেন্সপ্রাপ্ত স্বনামধন্য ট্রাভেল ও ভিসা কনসালটেন্সি সংস্থা।</p>
        </div>
        <div>
          <h3 style="font-size:18px; font-weight:bold; color:#fff; margin-bottom:12px;">অফিস সমুহ</h3>
          <p style="font-size:14px; line-height:1.6; color:#94a3b8;">
            <strong>ঢাকা অফিস:</strong> রোড ১৬, রূপনগর, মিরপুর ১১, ঢাকা ১২১৬<br/>
            <strong>চাঁপাইনবাবগঞ্জ অফিস:</strong> রহনপুর, গোমস্তাপুর<br/>
            <strong>হটলাইন:</strong> +৮৮০১৭৭১৩০৪২১৯
          </p>
        </div>
        <div>
          <h3 style="font-size:18px; font-weight:bold; color:#fff; margin-bottom:12px;">নেভিগেশন</h3>
          <p style="font-size:14px; line-height:1.8;">
            <a href="${langPrefix}/about" style="color:#cbd5e1; text-decoration:none;">আমাদের সম্পর্কে</a> | 
            <a href="${langPrefix}/services" style="color:#cbd5e1; text-decoration:none;">সেবাসমূহ</a> | 
            <a href="${langPrefix}/countries" style="color:#cbd5e1; text-decoration:none;">দেশসমূহ</a> | 
            <a href="${langPrefix}/contact" style="color:#cbd5e1; text-decoration:none;">যোগাযোগ</a> | 
            <a href="${langPrefix}/sitemap" style="color:#cbd5e1; text-decoration:none;">সাইটম্যাপ</a>
          </p>
        </div>
      </div>
      <div style="text-align:center; border-top:1px solid #334155; margin-top:32px; padding-top:20px; font-size:13px; color:#64748b;">
        © 2026 Dreams Fly International. All Rights Reserved.
      </div>
    </footer>
  `;

  return {
    title,
    description,
    keywords,
    canonicalUrl,
    bnUrl,
    enUrl,
    langAttr,
    ogLocale,
    ogType,
    ogImage,
    schemas,
    h1,
    prerenderHtml
  };
}

export function injectSeoIntoHtml(htmlIndex: string, pathname: string): string {
  const seo = generateSeoDataForPath(pathname);

  let modifiedHtml = htmlIndex;

  // Replace <html lang="...">
  modifiedHtml = modifiedHtml.replace(/<html\s+lang=".*?"/gi, `<html lang="${seo.langAttr}"`);

  // Replace title
  if (modifiedHtml.includes('<title>')) {
    modifiedHtml = modifiedHtml.replace(
      /<title>.*?<\/title>/gi,
      `<title>${seo.title}</title>`
    );
  } else {
    modifiedHtml = modifiedHtml.replace('</head>', `<title>${seo.title}</title>\n</head>`);
  }

  // Replace or add meta description
  if (modifiedHtml.includes('<meta name="description"')) {
    modifiedHtml = modifiedHtml.replace(
      /<meta name="description" content=".*?" \/>/gi,
      `<meta name="description" content="${seo.description.replace(/"/g, '&quot;')}" />`
    );
  } else {
    modifiedHtml = modifiedHtml.replace('</head>', `<meta name="description" content="${seo.description.replace(/"/g, '&quot;')}" />\n</head>`);
  }

  // Replace or add meta keywords
  if (modifiedHtml.includes('<meta name="keywords"')) {
    modifiedHtml = modifiedHtml.replace(
      /<meta name="keywords" content=".*?" \/>/gi,
      `<meta name="keywords" content="${seo.keywords.replace(/"/g, '&quot;')}" />`
    );
  }

  // Replace or add canonical link
  if (modifiedHtml.includes('<link rel="canonical"')) {
    modifiedHtml = modifiedHtml.replace(
      /<link rel="canonical" href=".*?" \/>/gi,
      `<link rel="canonical" href="${seo.canonicalUrl}" />`
    );
  } else {
    modifiedHtml = modifiedHtml.replace('</head>', `<link rel="canonical" href="${seo.canonicalUrl}" />\n</head>`);
  }

  // Strip any pre-existing JSON-LD scripts from template to prevent duplicate aggregate ratings
  modifiedHtml = modifiedHtml.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

  // Replace OG tags
  modifiedHtml = modifiedHtml.replace(
    /<meta property="og:title" content=".*?" \/>/gi,
    `<meta property="og:title" content="${seo.title.replace(/"/g, '&quot;')}" />`
  );
  modifiedHtml = modifiedHtml.replace(
    /<meta property="og:description" content=".*?" \/>/gi,
    `<meta property="og:description" content="${seo.description.replace(/"/g, '&quot;')}" />`
  );
  modifiedHtml = modifiedHtml.replace(
    /<meta property="og:url" content=".*?" \/>/gi,
    `<meta property="og:url" content="${seo.canonicalUrl}" />`
  );
  modifiedHtml = modifiedHtml.replace(
    /<meta property="og:image" content=".*?" \/>/gi,
    `<meta property="og:image" content="${seo.ogImage}" />`
  );

  // Normalize asset paths
  modifiedHtml = modifiedHtml
    .replaceAll('src="./assets/', 'src="/assets/')
    .replaceAll('href="./assets/', 'href="/assets/')
    .replaceAll('href="./favicon', 'href="/favicon');

  // Prepare hreflang & og:locale tags
  const hreflangTags = `
    <link rel="canonical" href="${seo.canonicalUrl}" />
    <meta property="og:locale" content="${seo.ogLocale}" />
  `.trim();

  // Inject Schemas and hreflang before </head>
  const schemaScriptsHtml = seo.schemas
    .map((s) => `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`)
    .join('\n');

  modifiedHtml = modifiedHtml.replace('</head>', `${hreflangTags}\n${schemaScriptsHtml}\n</head>`);

  // Inject pre-rendered SEO HTML DOM inside <div id="root"></div>
  if (modifiedHtml.includes('<div id="root"></div>')) {
    modifiedHtml = modifiedHtml.replace('<div id="root"></div>', `<div id="root">${seo.prerenderHtml}</div>`);
  } else if (modifiedHtml.includes('<div id="root">')) {
    modifiedHtml = modifiedHtml.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${seo.prerenderHtml}</div>`);
  }

  return modifiedHtml;
}
