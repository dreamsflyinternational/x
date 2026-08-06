import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';

export type Language = 'bn' | 'en';

const STORAGE_KEY = 'df_user_lang_pref';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Topbar & Nav
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.work_permits': 'Work Permits',
    'nav.destinations': 'Destinations',
    'nav.umrah_hajj': 'Umrah & Hajj',
    'nav.air_tickets': 'Air Tickets',
    'nav.tours': 'Tour Packages',
    'nav.hotels': 'Hotels',
    'nav.blog': 'News & Blog',
    'nav.contact': 'Contact',
    'nav.about': 'About Us',
    'nav.track': 'Track Application',
    'nav.dashboard': 'Client Portal',
    'nav.apply_now': 'Apply Now',
    'nav.free_consultation': 'Free Consultation',
    'topbar.location': 'Mirpur 11, Dhaka & Chapainawabganj',
    'topbar.whatsapp': 'WhatsApp Support',
    'topbar.phone': '+880 1771-304219',
    
    // Hero Section
    'hero.badge': 'Licensed & Authorized Visa Consultancy Agency in Dhaka',
    'hero.title_prefix': 'Your Gateway to Global',
    'hero.title_highlight': 'Visas & Work Permits',
    'hero.subtitle': 'Trusted processing for Canada, UK, USA, Europe Schengen, Japan, Australia, Umrah, and Global Air Ticketing. High approval rate with 100% transparent guidance.',
    'hero.cta_apply': 'Get Started Now',
    'hero.cta_planner': 'AI Visa Guide',
    'hero.stat_approval': '98.6%',
    'hero.stat_approval_label': 'Visa Success Rate',
    'hero.stat_clients': '14,200+',
    'hero.stat_clients_label': 'Happy Travelers',
    'hero.stat_countries': '45+',
    'hero.stat_countries_label': 'Global Destinations',
    'hero.stat_experience': '12+ Yrs',
    'hero.stat_experience_label': 'Industry Excellence',
    
    // Quick Tools / Search
    'tools.title': 'Smart Travel & Visa Tools',
    'tools.eligibility': 'Visa Eligibility Checker',
    'tools.calculator': 'Cost Estimator',
    'tools.tracker': 'Live Application Status',
    'tools.checklist': 'Document Checklist',

    // Services
    'services.tag': 'Our Core Services',
    'services.heading': 'Enterprise Travel & Visa Solutions',
    'services.subheading': 'Complete end-to-end guidance from initial file evaluation to visa stamping and flight departure.',
    'services.work_permit': 'Work Permit Processing',
    'services.work_permit_desc': 'Legitimate employment contracts, job offer letters, and work visa processing for Europe & Middle East.',
    'services.visa_assistance': 'Global Visa Consultancy',
    'services.visa_assistance_desc': 'Expert documentation for Canada, UK, USA, Schengen, Japan, Australia, and Asian countries.',
    'services.air_tickets': 'Air Ticket Booking',
    'services.air_tickets_desc': 'Discounted IATA flight reservations across all major global airlines with instant ticketing.',
    'services.umrah': 'Umrah & Hajj Packages',
    'services.umrah_desc': 'Customized e-Visa, premium Haramain hotel bookings, dedicated Muallim services, and flight transfers.',
    'services.tours': 'Global Tour Packages',
    'services.tours_desc': 'All-inclusive family, honeymoon, and corporate tour packages with guided sightseeing.',
    'services.hotels': 'World Hotel Booking',
    'services.hotels_desc': 'Instant reservations in Makkah, Madinah, Dubai, Bangkok, Kuala Lumpur, and major global hubs.',
    'services.view_details': 'Explore Details',

    // Destinations
    'destinations.tag': 'Featured Countries',
    'destinations.heading': 'Popular Visa & Work Permit Destinations',
    'destinations.subheading': 'Explore processing times, average salaries, and visa requirement details for leading global destinations.',
    'destinations.filter_all': 'All Regions',
    'destinations.filter_europe': 'Europe (Schengen & Non-Schengen)',
    'destinations.filter_middle_east': 'Middle East',
    'destinations.filter_asia': 'Asia & Pacific',
    'destinations.salary': 'Monthly Salary:',
    'destinations.duty': 'Work Schedule:',
    'destinations.processing': 'Processing Time:',
    'destinations.popular': 'Highly Requested',
    'destinations.apply_btn': 'Apply for Destination',

    // Process Timeline
    'process.tag': 'Step-by-Step Journey',
    'process.heading': 'How Our Process Works',
    'process.subheading': 'Clear 6-step roadmap engineered for speed, transparency, and accuracy.',
    'process.step1_title': '1. Free Consultation',
    'process.step1_desc': 'Profile evaluation and destination selection according to your career goals and budget.',
    'process.step2_title': '2. Eligibility Audit',
    'process.step2_desc': 'In-depth review of passport validity, educational history, skills, and police clearance.',
    'process.step3_title': '3. Document Preparation',
    'process.step3_desc': 'Professional translation, notary verification, legalizations, and cover letter drafting.',
    'process.step4_title': '4. File Submission',
    'process.step4_desc': 'Official submission to verified employers or embassy portal with error-free file tracking.',
    'process.step5_title': '5. Real-Time Tracking',
    'process.step5_desc': 'Continuous tracking of work permit approval, biometrics schedule, and embassy status.',
    'process.step6_title': '6. Stamping & Departure',
    'process.step6_desc': 'Passport visa stamping, flight booking, pre-departure orientation, and arrival briefing.',

    // Why Choose Us
    'why.tag': 'Excellence & Trust',
    'why.heading': 'Why Dreams Fly International?',
    'why.subheading': 'We combine deep regulatory expertise with client-focused dedication for stress-free visa outcomes.',
    'why.feature1_title': 'Licensed & Experienced Consultants',
    'why.feature1_desc': 'Certified team with over a decade of experience handling complex visa profile applications.',
    'why.feature2_title': '100% Transparent Fee Structure',
    'why.feature2_desc': 'No hidden fees or unexpected charges. Payment milestones are agreed upon in writing.',
    'why.feature3_title': 'Secure Document Vault',
    'why.feature3_desc': 'Your passports and sensitive files are protected with strict security standards.',
    'why.feature4_title': '24/7 Dedicated Client Support',
    'why.feature4_desc': 'Direct phone and WhatsApp support available for immediate updates and advisory.',

    // Testimonials
    'testimonials.tag': 'Client Success Stories',
    'testimonials.heading': 'What Our Travelers Say',
    'testimonials.subheading': 'Real stories from professionals, students, and families who achieved their travel dreams with us.',

    // FAQ
    'faq.tag': 'Frequently Asked Questions',
    'faq.heading': 'Have Questions? We Have Answers',
    'faq.subheading': 'Everything you need to know about our visa processing timeline, requirements, and services.',

    // Contact
    'contact.tag': 'Get In Touch',
    'contact.heading': 'Contact Our Consultancy Desk',
    'contact.subheading': 'Visit our offices in Dhaka or Chapainawabganj, or talk to an advisor online today.',
    'contact.office_dhaka': 'Dhaka Office',
    'contact.dhaka_addr': 'Road 16, Rupnagar, Mirpur 11, Dhaka 1216',
    'contact.office_chapai': 'Chapainawabganj Office',
    'contact.chapai_addr': 'Rohanpur, Gomastapur, Chapainawabganj',
    'contact.form_name': 'Full Name',
    'contact.form_phone': 'Phone Number',
    'contact.form_service': 'Service / Country Interest',
    'contact.form_message': 'Your Message / Inquiry',
    'contact.form_submit': 'Submit Consultation Inquiry',

    // Footer
    'footer.company_desc': 'Official Licensed Travel & Visa Consultancy Firm in Bangladesh. Specializing in Europe, UK, USA, Canada visas, Work Permits, Umrah Packages, and Air Ticketing.',
    'footer.quick_links': 'Quick Navigation',
    'footer.our_services': 'Our Services',
    'footer.top_countries': 'Top Destinations',
    'footer.copyright': '© 2026 Dreams Fly International. All Rights Reserved.',
    'footer.license': 'Ministry of Civil Aviation & Tourism License Holder',

    // Modals & General
    'modal.close': 'Close',
    'modal.submit': 'Submit Request',
    'badge.popular': 'Popular',
    'badge.verified': 'Verified'
  },
  bn: {
    // Topbar & Nav
    'nav.home': 'হোম',
    'nav.services': 'সেবাসমূহ',
    'nav.work_permits': 'ওয়ার্ক পারমিট',
    'nav.destinations': 'গন্তব্যসমূহ',
    'nav.umrah_hajj': 'উমরাহ ও হজ',
    'nav.air_tickets': 'এয়ার টিকিট',
    'nav.tours': 'ট্যুর প্যাকেজ',
    'nav.hotels': 'হোটেল বুকিং',
    'nav.blog': 'ব্লগ ও খবর',
    'nav.contact': 'যোগাযোগ',
    'nav.about': 'আমাদের সম্পর্কে',
    'nav.track': 'আবেদন ট্র্যাকিং',
    'nav.dashboard': 'ক্লায়েন্ট পোর্টাল',
    'nav.apply_now': 'আবেদন করুন',
    'nav.free_consultation': 'ফ্রি পরামর্শ',
    'topbar.location': 'মিরপুর ১১, ঢাকা ও চাঁপাইনবাবগঞ্জ',
    'topbar.whatsapp': 'হোয়াটসঅ্যাপ সাপোর্ট',
    'topbar.phone': '+৮৮০ ১৭৭১-৩০৪২১৯',

    // Hero Section
    'hero.badge': 'ঢাকার অনুমোদিত ও লাইসেন্সপ্রাপ্ত বিশ্বস্ত ট্রাভেল এজেন্সি',
    'hero.title_prefix': 'আপনার আন্তর্জাতিক স্বপ্নের সেতু',
    'hero.title_highlight': 'ভিসা ও ওয়ার্ক পারমিট প্রসেসিং',
    'hero.subtitle': 'কানাডা, যুক্তরাজ্য, যুক্তরাষ্ট্র, ইউরোপ শেনজেন, জাপান, অস্ট্রেলিয়া, উমরাহ এবং এয়ার টিকিট বুকিংয়ের শতভাগ নির্ভরযোগ্য বিশ্বস্ত ট্রাভেল সল্যুশন।',
    'hero.cta_apply': 'এখনই আবেদন করুন',
    'hero.cta_planner': 'এআই ভিসা গাইড',
    'hero.stat_approval': '৯৮.৬%',
    'hero.stat_approval_label': 'ভিসা অনুমোদনের হার',
    'hero.stat_clients': '১৪,২০০+',
    'hero.stat_clients_label': 'সফল আবেদনকারী',
    'hero.stat_countries': '৪৫+',
    'hero.stat_countries_label': 'বিশ্বব্যাপী গন্তব্য',
    'hero.stat_experience': '১২+ বছর',
    'hero.stat_experience_label': 'অভিজ্ঞতার আস্থা',

    // Quick Tools
    'tools.title': 'স্মার্ট ভিসা ও ট্রাভেল টুলস',
    'tools.eligibility': 'ভিসা যোগ্যতা যাচাই',
    'tools.calculator': 'খরচ ক্যালকুলেটর',
    'tools.tracker': 'লাইভ আবেদন ট্র্যাকিং',
    'tools.checklist': 'ডকুমেন্ট চেকলিস্ট',

    // Services
    'services.tag': 'আমাদের মূল সেবাসমূহ',
    'services.heading': 'আন্তর্জাতিক মানের ট্রাভেল ও ভিসা সেবা',
    'services.subheading': 'ফাইল অ্যাসেসমেন্ট থেকে শুরু করে এম্বাসি ফেস এবং ডিপার্চার পর্যন্ত শতভাগ বিশ্বস্ত সহায়তা।',
    'services.work_permit': 'ওয়ার্ক পারমিট প্রসেসিং',
    'services.work_permit_desc': 'ইউরোপ ও মধ্যপ্রাচ্যের বিভিন্ন দেশের বৈধ ওয়ার্ক পারমিট, জব অফার লেটার ও ভিসা আবেদন।',
    'services.visa_assistance': 'গ্লোবাল ভিসা সহায়তা',
    'services.visa_assistance_desc': 'কানাডা, যুক্তরাজ্য, যুক্তরাষ্ট্র, শেনজেন ইউরোপ ও অস্ট্রেলিয়ার ট্যুরিস্ট ও স্টুডেন্ট ভিসা।',
    'services.air_tickets': 'এয়ার টিকিট বুকিং',
    'services.air_tickets_desc': 'দেশি-বিদেশি সকল এয়ারলাইন্সের টিকিটে বিশেষ ডিসকাউন্ট ও তাতক্ষণিক কনফার্মেশন।',
    'services.umrah': 'উমরাহ ও হজ সার্ভিস',
    'services.umrah_desc': 'পবিত্র উমরাহ ভিসা, হারামাইনের কাছে ফাইভ স্টার ও বাজেট হোটেল বুকিং এবং মুয়াল্লিম সেবা।',
    'services.tours': 'আকর্ষণীয় ট্যুর প্যাকেজ',
    'services.tours_desc': 'ফ্যামিলি, কাপল ও গ্রুপ ট্রাভেলারদের জন্য বাজেট ফ্রেন্ডলি অল-ইনক্লুসিভ ভ্রমণ প্যাকেজ।',
    'services.hotels': 'বিশ্বব্যাপী হোটেল বুকিং',
    'services.hotels_desc': 'মক্কা, মদিনা, দুবাই, ব্যাংকক ও কুয়ালালামপুর সহ বিশ্বজুড়ে সাশ্রয়ী মূল্যে হোটেল রুম বুকিং।',
    'services.view_details': 'বিস্তারিত দেখুন',

    // Destinations
    'destinations.tag': 'জনপ্রিয় দেশসমূহ',
    'destinations.heading': 'ওয়ার্ক পারমিট ও ভিসা গন্তব্য',
    'destinations.subheading': 'ইউরোপ, মধ্যপ্রাচ্য ও এশিয়ার অন্যতম চাহিদাসম্পন্ন দেশসমূহের বেতন ও প্রসেসিং তথ্য।',
    'destinations.filter_all': 'সকল গন্তব্য',
    'destinations.filter_europe': 'ইউরোপ (শেনজেন ও অন্যান্য)',
    'destinations.filter_middle_east': 'মধ্যপ্রাচ্য',
    'destinations.filter_asia': 'এশিয়া ও প্যাসিফিক',
    'destinations.salary': 'মাসিক বেতন:',
    'destinations.duty': 'ডিউটি সময়:',
    'destinations.processing': 'প্রসেসিং সময়:',
    'destinations.popular': 'সর্বোচ্চ চাহিদা',
    'destinations.apply_btn': 'দেশ বেছে আবেদন করুন',

    // Process Timeline
    'process.tag': 'সুনির্দিষ্ট কাজের ধাপ',
    'process.heading': 'আমাদের প্রসেসিং পদ্ধতি',
    'process.subheading': 'পরিকল্পনা থেকে শুরু করে সাফল্য অর্জন পর্যন্ত ৬টি সহজ ও শতভাগ স্বচ্ছ ধাপ।',
    'process.step1_title': '১. ফ্রি কনসালটেশন',
    'process.step1_desc': 'আপনার উদ্দেশ্য ও বাজেট অনুযায়ী উপযুক্ত দেশ ও ক্যাটাগরি নির্বাচন।',
    'process.step2_title': '২. যোগ্যতা যাচাই',
    'process.step2_desc': 'পাসপোর্ট, বয়স, শিক্ষাগত যোগ্যতা ও কাজের অভিজ্ঞতার নিখুঁত মূল্যায়ন।',
    'process.step3_title': '৩. ডকুমেন্ট প্রস্তুতি',
    'process.step3_desc': 'প্রয়োজনীয় ফাইল অনুবাদ, নোটারি সত্যায়ন ও কভার লেটার তৈরি।',
    'process.step4_title': '৪. আবেদন সাবমিশন',
    'process.step4_desc': 'নিয়োগকর্তা বা এম্বাসি পোর্টালে নির্ভুলভাবে আবেদনপত্র জমা দান।',
    'process.step5_title': '৫. লাইভ ট্র্যাকিং',
    'process.step5_desc': 'ওয়ার্ক পারমিট ইস্যু, বায়োমেট্রিক অ্যাপয়েন্টমেন্ট ও নিয়মিত আপডেট।',
    'process.step6_title': '৬. ভিসা ও ডিপার্চার',
    'process.step6_desc': 'পাসপোর্ট ভিসা স্ট্যাম্পিং, ফ্লাইট টিকিট ও ডিপার্চার ব্রিফিং।',

    // Why Choose Us
    'why.tag': 'বিশ্বাস ও পেশাদারিত্ব',
    'why.heading': 'কেন ড্রিমস ফ্লাই ইন্টারন্যাশনাল?',
    'why.subheading': 'সততা, স্বচ্ছতা এবং অভিজ্ঞ কনসালটেন্ট টিমের মাধ্যমে নিরাপদ ভবিষ্যৎ নিশ্চিতকরণ।',
    'why.feature1_title': 'অভিজ্ঞ ও অনুমোদিত কনসালটেন্ট',
    'why.feature1_desc': 'দীর্ঘ ১২ বছরের অভিজ্ঞতাসম্পন্ন দল যা আপনার ফাইল শতভাগ নিখুঁতভাবে তৈরি করে।',
    'why.feature2_title': 'শতভাগ স্বচ্ছ পেমেন্ট চুক্তি',
    'why.feature2_desc': 'কোনো অপ্রকাশিত চার্জ নেই। লিখিত চুক্তির মাধ্যমে নির্ধারিত ধাপে ধাপে পেমেন্ট গ্রহণ।',
    'why.feature3_title': 'নিরাপদ ডকুমেন্টেশন',
    'why.feature3_desc': 'আপনার মূল পাসপোর্ট ও ডকুমেন্টের সর্বোচ্চ নিরাপত্তা নিশ্চিত করা হয়।',
    'why.feature4_title': '২৪/৭ সরাসরি কাস্টমার সাপোর্ট',
    'why.feature4_desc': 'জরুরি প্রয়োজনে ফোন ও হোয়াটসঅ্যাপে সরাসরি পরামর্শ ও আপডেট পাওয়ার সুবিধা।',

    // Testimonials
    'testimonials.tag': 'সাফল্যের গল্প',
    'testimonials.heading': 'আমাদের ক্লায়েন্টদের অভিজ্ঞতা',
    'testimonials.subheading': 'যাঁরা ড্রিমস ফ্লাই ইন্টারন্যাশনালের সেবায় সন্তুষ্ট হয়ে সুদূরপ্রসারী স্বপ্নের দেখা পেয়েছেন।',

    // FAQ
    'faq.tag': 'সাধারণ জিজ্ঞাসা',
    'faq.heading': 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী',
    'faq.subheading': 'আমাদের সেবা, সময়সীমা ও আবেদন সংক্রান্ত প্রয়োজনীয় তথ্যাবলী।',

    // Contact
    'contact.tag': 'যোগাযোগ করুন',
    'contact.heading': 'আমাদের সাথে সরাসরি কথা বলুন',
    'contact.subheading': 'ঢাকা অথবা চাঁপাইনবাবগঞ্জ অফিসে সরাসরি ভিজিট করুন অথবা অনলাইন কনসালটেশন নিন।',
    'contact.office_dhaka': 'ঢাকা প্রধান কার্যালয়',
    'contact.dhaka_addr': 'রোড ১৬, রূপনগর, মিরপুর ১১, ঢাকা ১২১৬',
    'contact.office_chapai': 'চাঁপাইনবাবগঞ্জ শাখা',
    'contact.chapai_addr': 'রহনপুর, গোমস্তাপুর, চাঁপাইনবাবগঞ্জ',
    'contact.form_name': 'আপনার নাম',
    'contact.form_phone': 'মোবাইল নম্বর',
    'contact.form_service': 'আগ্রহের সার্ভিস বা দেশ',
    'contact.form_message': 'আপনার বার্তা বা প্রশ্ন',
    'contact.form_submit': 'পরামর্শের জন্য জমা দিন',

    // Footer
    'footer.company_desc': 'বাংলাদেশ সরকার অনুমোদিত লাইসেন্সপ্রাপ্ত ট্রাভেল ও ভিসা কনসালট্যান্সি। ওয়ার্ক পারমিট, উমরাহ, এয়ার টিকিট ও গ্লোবাল ট্যুরিজমে বিশ্বস্ত অংশীদার।',
    'footer.quick_links': 'দ্রুত লিংক',
    'footer.our_services': 'আমাদের সেবাসমূহ',
    'footer.top_countries': 'শীর্ষ গন্তব্যসমূহ',
    'footer.copyright': '© ২০২৬ ড্রিমস ফ্লাই ইন্টারন্যাশনাল। সর্বস্বত্ব সংরক্ষিত।',
    'footer.license': 'বেসামরিক বিমান পরিবহন ও পর্যটন মন্ত্রণালয় লাইসেন্সধারী',

    // Modals & General
    'modal.close': 'বন্ধ করুন',
    'modal.submit': 'আবেদন পাঠান',
    'badge.popular': 'জনপ্রিয়',
    'badge.verified': 'অনুমোদিত'
  }
};

/**
 * Get current saved language preference
 */
export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'bn';
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Language;
    if (saved === 'bn' || saved === 'en') return saved;
  } catch (e) {
    // Ignore storage restrictions
  }
  return 'bn';
}

/**
 * Perform instant DOM text replacement for any element with `data-i18n`
 */
export function applyInstantLanguage(lang: Language) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {
    // Ignore
  }

  // Sync html lang attribute
  document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';

  const dict = translations[lang] || translations.bn;

  // 1. Target all elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key && dict[key]) {
      // Add subtle fade animation class briefly
      el.classList.add('transition-opacity', 'duration-150');
      (el as HTMLElement).innerText = dict[key];
    }
  });

  // 2. Dispatch a custom window event for React components that use state
  window.dispatchEvent(new CustomEvent('df-language-change', { detail: { lang } }));
}

interface LanguageContextType {
  lang: Language;
  setLang: (newLang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'bn',
  setLang: () => {},
  t: (key: string, fallback?: string) => fallback || key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>('bn');

  useEffect(() => {
    const initialLang = getStoredLanguage();
    setLangState(initialLang);

    const handleLangChangeEvent = (e: Event) => {
      const customEvt = e as CustomEvent<{ lang: Language }>;
      if (customEvt.detail && customEvt.detail.lang) {
        setLangState(customEvt.detail.lang);
      }
    };

    window.addEventListener('df-language-change', handleLangChangeEvent);
    return () => window.removeEventListener('df-language-change', handleLangChangeEvent);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    applyInstantLanguage(newLang);
  };

  const t = (key: string, fallback?: string): string => {
    return translations[lang]?.[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
