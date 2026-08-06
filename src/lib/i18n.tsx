import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';

export type Language = 'bn' | 'en';

const STORAGE_KEY = 'df_user_lang_pref';

export interface TranslationDictionary {
  [key: string]: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    // Common / Global
    'common.appName': 'Dreams Fly International',
    'common.tagline': 'Your Trusted Partner for Travel, Visa & Global Opportunities',
    'common.applyNow': 'Apply Now',
    'common.getStarted': 'Get Started',
    'common.submit': 'Submit Request',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.search': 'Search...',
    'common.details': 'View Details',
    'common.contactUs': 'Contact Us',
    'common.callNow': 'Call Now',
    'common.whatsappUs': 'WhatsApp Us',
    'common.freeConsultation': 'Free Consultation',
    'common.popular': 'Popular',
    'common.verified': 'Verified',
    'common.loading': 'Loading...',
    'common.success': 'Success',
    'common.error': 'Error',

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
    'nav.contact': 'Contact Us',
    'nav.about': 'About Us',
    'nav.track': 'Track Application',
    'nav.dashboard': 'Client Portal',
    'nav.apply_now': 'Apply Now',
    'nav.free_consultation': 'Free Consultation',
    'topbar.location': 'Mirpur 11, Dhaka & Chapainawabganj',
    'topbar.whatsapp': 'WhatsApp Support',
    'topbar.phone': '+880 1771-304219',
    'topbar.email': 'dreamsflyinternational@gmail.com',

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

    // Quick Tools
    'tools.title': 'Smart Travel & Visa Tools',
    'tools.eligibility': 'Visa Eligibility Checker',
    'tools.calculator': 'Cost Estimator',
    'tools.tracker': 'Live Application Status',
    'tools.checklist': 'Document Checklist',
    'tools.ai_planner': 'AI Visa Planner',

    // Services Page & Components
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

    // Work Permits Page
    'workpermit.title': 'Global Work Permit Consultancy',
    'workpermit.subtitle': 'Verified job offer letters, employer contracts, and visa processing for Europe, Middle East & Asia.',
    'workpermit.hungary': 'Hungary (Schengen Area)',
    'workpermit.hungary_desc': 'Factory, Warehouse, Hospitality & Construction jobs with 2-year renewable residence card.',
    'workpermit.slovenia': 'Slovenia (Schengen Area)',
    'workpermit.slovenia_desc': 'Factory production, welding, driving, and general labor permits with EU benefits.',
    'workpermit.romania': 'Romania (Schengen Area)',
    'workpermit.romania_desc': 'Manufacturing, agriculture, construction, and hospitality positions with fast EU entry.',
    'workpermit.dubai': 'Dubai (UAE Job Visa)',
    'workpermit.dubai_desc': '2-Year Employment Visa for hotel staff, security, logistics, drivers, and skilled labor.',
    'workpermit.saudi': 'Saudi Arabia Work Visa',
    'workpermit.saudi_desc': 'Iqama work visas for technical, commercial, retail, and general workforce positions.',
    'workpermit.malaysia': 'Malaysia Calling Visa',
    'workpermit.malaysia_desc': 'Official manufacturing, plantation, and service sector work permits.',

    // Destinations Page
    'destinations.tag': 'Featured Countries',
    'destinations.heading': 'Popular Visa & Work Permit Destinations',
    'destinations.subheading': 'Explore processing times, average salaries, and visa requirement details for leading global destinations.',
    'destinations.filter_all': 'All Regions',
    'destinations.filter_europe': 'Europe',
    'destinations.filter_middle_east': 'Middle East',
    'destinations.filter_asia': 'Asia',
    'destinations.salary': 'Monthly Salary:',
    'destinations.duty': 'Work Schedule:',
    'destinations.processing': 'Processing Time:',
    'destinations.popular': 'Highly Requested',
    'destinations.apply_btn': 'Apply for Destination',

    // About Page
    'about.badge': 'Your Trusted Travel & Visa Solution Partner',
    'about.title': 'Dreams Fly International',
    'about.intro1': 'Dreams Fly International is a premier licensed visa consultancy firm in Bangladesh dedicated to making international travel, employment, and education seamless and transparent.',
    'about.intro2': 'We believe in honest guidance, clear timelines, and 100% legal compliance. Every client profile is handled with utmost care and confidentiality.',
    'about.cta_book': 'Book Free Consultation',
    'about.cta_whatsapp': 'WhatsApp Us (+880 1771-304219)',
    'about.owner_title': 'Founder & Owner Message',
    'about.owner_name': 'MD Jahan Ali',
    'about.owner_sub': 'Founder & Owner, Dreams Fly International',
    'about.owner_quote': '"Our mission is to maintain maximum transparency, genuine guidance, and 100% professionalism at every step of global travel. We never believe in false promises."',
    'about.mission_title': 'Our Mission',
    'about.mission_desc': 'To empower travelers, professionals, and students from Bangladesh with legitimate, reliable, and swift visa consultancy services.',
    'about.vision_title': 'Our Vision',
    'about.vision_desc': 'To be recognized as Bangladesh\'s most trusted global visa and travel brand built on integrity, success, and client satisfaction.',

    // Contact Page
    'contact.tag': 'Get In Touch',
    'contact.heading': 'Contact Our Consultancy Desk',
    'contact.subheading': 'Visit our offices in Dhaka or Chapainawabganj, or talk to an advisor online today.',
    'contact.office_dhaka': 'Dhaka HQ Office',
    'contact.dhaka_addr': 'Road 16, Rupnagar, Mirpur 11, Dhaka-1216',
    'contact.office_chapai': 'Chapainawabganj Branch',
    'contact.chapai_addr': 'Rohanpur, Gomastapur, Chapainawabganj',
    'contact.form_name': 'Full Name',
    'contact.form_phone': 'Phone Number',
    'contact.form_service': 'Service / Country Interest',
    'contact.form_message': 'Your Message / Inquiry',
    'contact.form_submit': 'Submit Consultation Inquiry',

    // Blog Page
    'blog.tag': 'Travel & Visa News',
    'blog.heading': 'Latest Updates, Guides & Embassy News',
    'blog.subheading': 'Stay informed with official embassy policy updates, visa processing guides, and airfare tips.',
    'blog.read_more': 'Read Full Article',
    'blog.search_placeholder': 'Search articles, country guides...',

    // Air Tickets & Umrah & Tours & Hotels
    'air.title': 'Global Air Ticket Reservations',
    'air.subtitle': 'Lowest airfares for Biman, Emirates, Saudia, Qatar Airways, US-Bangla, Singapore Airlines, and 100+ global carriers.',
    'umrah.title': 'Holy Umrah & Hajj Services',
    'umrah.subtitle': 'VIP 5-Star, 4-Star & Economy Umrah Packages with e-Visa, Haramain Hotels, Flight & Dedicated Guide.',
    'tours.title': 'International Tour Packages',
    'tours.subtitle': 'Customized travel itineraries for Malaysia, Thailand, Singapore, Dubai, Turkey, Vietnam, and Europe.',
    'hotels.title': 'Worldwide Hotel Bookings',
    'hotels.subtitle': 'Direct reservations with instant confirmation in Makkah, Madinah, Bangkok, Dubai, Kuala Lumpur, and global hubs.',

    // Process & FAQ
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
    'faq.tag': 'Frequently Asked Questions',
    'faq.heading': 'Have Questions? We Have Answers',
    'faq.subheading': 'Everything you need to know about our visa processing timeline, requirements, and services.',
    'faq.q1': 'How long does a Work Permit visa application take?',
    'faq.a1': 'Processing times vary by destination. Middle East (Dubai, Saudi Arabia) takes 30–60 days, Malaysia takes 2–3 months, and European countries (Hungary, Slovenia, Romania) take up to 6 months.',
    'faq.q2': 'What are the basic eligibility requirements for Europe Work Permits?',
    'faq.a2': 'A valid passport (minimum 2 years validity), police clearance certificate, passport-size photographs, and relevant work experience in factory, construction, or hospitality sectors.',
    'faq.q3': 'Can I visit your offices for a free consultation?',
    'faq.a3': 'Yes! Walk-in consultation is available at our Mirpur 11, Dhaka office and Chapainawabganj branch Saturday to Thursday, 9:00 AM to 8:00 PM.',
    'faq.q4': 'Are your Umrah and flight tickets customizable?',
    'faq.a4': 'Absolutely. We provide customized 5-star, 4-star, or economy Umrah packages, direct or connecting flight ticketing, and tailored group tours.',

    // Testimonials
    'testimonials.tag': 'Client Success Stories',
    'testimonials.heading': 'What Our Travelers Say',
    'testimonials.subheading': 'Real stories from professionals, students, and families who achieved their travel dreams with us.',

    // Footer
    'footer.about': 'Dreams Fly International is a leading authorized travel and visa consultancy in Bangladesh. Specializing in Work Permits, Student Visas, Schengen Visas, Umrah, and Global Flight Ticketing.',
    'footer.newsletter_label': 'Subscribe for Visa Updates & Airfare Offers',
    'footer.subscribe': 'Subscribe',
    'footer.copyright': '© 2026 Dreams Fly International. All rights reserved.',
    'footer.license': 'Ministry of Civil Aviation & Tourism License Holder',

    // Modals
    'modal.close': 'Close',
    'modal.submit': 'Submit Request',
    'badge.popular': 'Popular',
    'badge.verified': 'Verified'
  },
  bn: {
    // Common / Global
    'common.appName': 'ড্রিমস ফ্লাই ইন্টারন্যাশনাল',
    'common.tagline': 'ভ্রমণ, ভিসা ও আন্তর্জাতিক সুযোগের বিশ্বস্ত মাধ্যম',
    'common.applyNow': 'এখনই আবেদন করুন',
    'common.getStarted': 'শুরু করুন',
    'common.submit': 'আবেদন পাঠান',
    'common.close': 'বন্ধ করুন',
    'common.back': 'ফিরে যান',
    'common.search': 'খুঁজুন...',
    'common.details': 'বিস্তারিত দেখুন',
    'common.contactUs': 'যোগাযোগ করুন',
    'common.callNow': 'এখনই কল করুন',
    'common.whatsappUs': 'হোয়াটসঅ্যাপ মেসেজ',
    'common.freeConsultation': 'ফ্রি পরামর্শ',
    'common.popular': 'জনপ্রিয়',
    'common.verified': 'অনুমোদিত',
    'common.loading': 'লোড হচ্ছে...',
    'common.success': 'সফল',
    'common.error': 'ত্রুটি',

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
    'nav.contact': 'যোগাযোগ করুন',
    'nav.about': 'আমাদের সম্পর্কে',
    'nav.track': 'আবেদন ট্র্যাকিং',
    'nav.dashboard': 'ক্লায়েন্ট পোর্টাল',
    'nav.apply_now': 'আবেদন করুন',
    'nav.free_consultation': 'ফ্রি পরামর্শ',
    'topbar.location': 'মিরপুর ১১, ঢাকা ও চাঁপাইনবাবগঞ্জ',
    'topbar.whatsapp': 'হোয়াটসঅ্যাপ সাপোর্ট',
    'topbar.phone': '+৮৮০ ১৭৭১-৩০৪২১৯',
    'topbar.email': 'dreamsflyinternational@gmail.com',

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
    'tools.ai_planner': 'এআই ভিসা প্ল্যানার',

    // Services Page & Components
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

    // Work Permits Page
    'workpermit.title': 'গ্লোবাল ওয়ার্ক পারমিট প্রসেসিং',
    'workpermit.subtitle': 'ইউরোপ, মধ্যপ্রাচ্য ও এশিয়ার বিভিন্ন দেশের সরকারি অনুমোদিত কাজের ভিসা ও নিয়োগ চুক্তিপত্র।',
    'workpermit.hungary': 'হাঙ্গেরি (শেনজেন এলাকা)',
    'workpermit.hungary_desc': 'ফ্যাক্টরি, ওয়্যারহাউজ, হোটেল ও কনস্ট্রাকশনে কাজ এবং ২ বছরের রিন্যুয়েবল রেসিডেন্স কার্ড।',
    'workpermit.slovenia': 'স্লোভেনিয়া (শেনজেন এলাকা)',
    'workpermit.slovenia_desc': 'প্রোডাকশন ওয়ার্কার, ওয়েল্ডিং, ড্রাইভিং ও জেনারেল লেবার হিসেবে ইইউ সুযোগ-সুবিধা।',
    'workpermit.romania': 'রোমানিয়া (শেনজেন এলাকা)',
    'workpermit.romania_desc': 'ম্যানুফ্যাকচারিং, কৃষি, নির্মাণ ও রেস্টুরেন্ট খাতে দ্রুত প্রসেসিং ভিসা।',
    'workpermit.dubai': 'দুবাই (সংযুক্ত আরব আমিরাত জব ভিসা)',
    'workpermit.dubai_desc': '২ বছরের এমপ্লয়মেন্ট ভিসা - হোটেল স্টাফ, সিকিউরিটি, ড্রাইভার ও ওয়্যারহাউজ কর্মী।',
    'workpermit.saudi': 'সৌদি আরব ওয়ার্ক ভিসা',
    'workpermit.saudi_desc': 'টেকনিক্যাল, শপ ও জেনারেল ওয়ার্কারদের ইকামাধারী সরকারি কাজের ভিসা।',
    'workpermit.malaysia': 'মালয়েশিয়া কলিং ভিসা',
    'workpermit.malaysia_desc': 'ফ্যাক্টরি, প্ল্যান্টেশন ও সার্ভিস খাতের সরকারি অনুমোদিত ওয়ার্ক পারমিট।',

    // Destinations Page
    'destinations.tag': 'জনপ্রিয় দেশসমূহ',
    'destinations.heading': 'ওয়ার্ক পারমিট ও ভিসা গন্তব্য',
    'destinations.subheading': 'ইউরোপ, মধ্যপ্রাচ্য ও এশিয়ার অন্যতম চাহিদাসম্পন্ন দেশসমূহের বেতন ও প্রসেসিং তথ্য।',
    'destinations.filter_all': 'সকল গন্তব্য',
    'destinations.filter_europe': 'ইউরোপ',
    'destinations.filter_middle_east': 'মধ্যপ্রাচ্য',
    'destinations.filter_asia': 'এশিয়া',
    'destinations.salary': 'মাসিক বেতন:',
    'destinations.duty': 'ডিউটি সময়:',
    'destinations.processing': 'প্রসেসিং সময়:',
    'destinations.popular': 'সর্বোচ্চ চাহিদা',
    'destinations.apply_btn': 'দেশ বেছে আবেদন করুন',

    // About Page
    'about.badge': 'আপনার বিশ্বস্ত ট্রাভেল ও ভিসা সল্যুশন পার্টনার',
    'about.title': 'Dreams Fly International',
    'about.intro1': 'Dreams Fly International একটি নির্ভরযোগ্য ট্রাভেল ও ভিসা কনসালটেন্সি প্রতিষ্ঠান, যা বাংলাদেশ থেকে বিশ্বের বিভিন্ন দেশে ভ্রমণ, শিক্ষা, চাকরি এবং ধর্মীয় সফরের জন্য পেশাদার সেবা প্রদান করে।',
    'about.intro2': 'আমরা বিশ্বাস করি, সঠিক পরামর্শ, স্বচ্ছ প্রক্রিয়া এবং আন্তরিক সেবাই একজন গ্রাহকের আস্থা অর্জনের সবচেয়ে বড় ভিত্তি।',
    'about.cta_book': 'ফ্রি কনসালটেশন বুক করুন',
    'about.cta_whatsapp': 'হোয়াটসঅ্যাপে যোগাযোগ করুন (+৮৮০ ১৭৭১-৩০৪২১৯)',
    'about.owner_title': 'প্রতিষ্ঠাতা ও স্বত্বাধিকারীর বার্তা',
    'about.owner_name': 'মো: জাহান আলী',
    'about.owner_sub': 'প্রতিষ্ঠাতা ও সিইও, ড্রিমস ফ্লাই ইন্টারন্যাশনাল',
    'about.owner_quote': '"আমাদের লক্ষ্য হলো বৈশ্বিক ভ্রমণের প্রতিটি পদক্ষেপে সঠিক দিকনির্দেশনা, সর্বোচ্চ স্বচ্ছতা ও শতভাগ পেশাদারিত্ব বজায় রাখা। আমরা কখনোই মিথ্যা প্রতিশ্রুতি বা অবাস্তব গ্যারান্টিতে বিশ্বাস করি না।"',
    'about.mission_title': 'আমাদের লক্ষ্য',
    'about.mission_desc': 'মানসম্মত, নির্ভরযোগ্য এবং স্বচ্ছ ট্রাভেল ও ভিসা সেবা প্রদান করে দেশের মানুষের আন্তর্জাতিক ভ্রমণকে সহজ ও নিরাপদ করা।',
    'about.vision_title': 'আমাদের ভিশন',
    'about.vision_desc': 'বাংলাদেশের অন্যতম বিশ্বস্ত এবং আন্তর্জাতিক মানের ট্রাভেল ও ভিসা সার্ভিস ব্র্যান্ড হিসেবে প্রতিষ্ঠিত হওয়া।',

    // Contact Page
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

    // Blog Page
    'blog.tag': 'ট্রাভেল ও ভিসা আপডেট',
    'blog.heading': 'সর্বশেষ খবর, গাইড ও এম্বাসি বিজ্ঞপ্তি',
    'blog.subheading': 'এম্বাসি পলিসি, ভিসা আবেদন সহায়িকা ও টিকিটের অফার সম্পর্কে নিয়মিত আপডেট থাকুন।',
    'blog.read_more': 'সম্পূর্ণ ব্লগ পড়ুন',
    'blog.search_placeholder': 'ব্লগ বা কান্ট্রি গাইড খুঁজুন...',

    // Air Tickets & Umrah & Tours & Hotels
    'air.title': 'আন্তর্জাতিক এয়ার টিকিট বুকিং',
    'air.subtitle': 'বিমান বাংলাদেশ, এমিরেটস, সাউদিয়া, কাতার এয়ারওয়েজ সহ বিশ্বখ্যাত ১০০+ এয়ারলাইন্সের টিকিট ডিসকাউন্ট।',
    'umrah.title': 'পবিত্র উমরাহ ও হজ সার্ভিস',
    'umrah.subtitle': 'ফাইভ স্টার, ফোর স্টার ও বাজেট উমরাহ প্যাকেজ - ভিসা, হারামাইন হোটেল, গাইড ও ট্রান্সপোর্টেশন সহ।',
    'tours.title': 'আকর্ষণীয় আন্তর্জাতিক ট্যুর প্যাকেজ',
    'tours.subtitle': 'মালয়েশিয়া, থাইল্যান্ড, সিঙ্গাপুর, দুবাই, তুরস্ক, ভিয়েতনাম ও ইউরোপের অল-ইনক্লুসিভ ভ্রমণ প্যাকেজ।',
    'hotels.title': 'বিশ্বব্যাপী আন্তর্জাতিক হোটেল বুকিং',
    'hotels.subtitle': 'মক্কা, মদিনা, দুবাই, ব্যাংকক, কুয়ালালামপুর ও গ্লোবাল সিটিতে ইন্সট্যান্ট কনফার্মেশনে রুম বুকিং।',

    // Process & FAQ
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
    'faq.tag': 'সাধারণ জিজ্ঞাসা',
    'faq.heading': 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী',
    'faq.subheading': 'আমাদের সেবা, সময়সীমা ও আবেদন সংক্রান্ত প্রয়োজনীয় তথ্যাবলী।',
    'faq.q1': 'ওয়ার্ক পারমিট প্রসেসিংয়ে কত সময় লাগে?',
    'faq.a1': 'দেশভেদে প্রসেসিং সময়ের তারতম্য ঘটে। দুবাই ও সৌদি আরব ৩০–৬০ দিন, মালয়েশিয়া ২–৩ মাস এবং ইউরোপের দেশগুলো (হাঙ্গেরি, স্লোভেনিয়া, রোমানিয়া) সর্বোচ্চ ৬ মাস সময় নেয়।',
    'faq.q2': 'ইউরোপ ওয়ার্ক পারমিটের জন্য কী কী ডকুমেন্ট প্রয়োজন?',
    'faq.a2': 'ন্যূনতম ২ বছর মেয়াদসহ মূল পাসপোর্ট, পুলিশ ক্লিয়ারেন্স সার্টিফিকেট, পাসপোর্ট সাইজ ছবি এবং সংশ্লিষ্ট খাতের অভিজ্ঞতা সার্টিফিকেট।',
    'faq.q3': 'আপনাদের অফিসে সরাসরি গিয়ে ফ্রি কনসালটেশন নেওয়া যাবে?',
    'faq.a3': 'হ্যাঁ! আমাদের মিরপুর ১১, ঢাকা কার্যালয় এবং রহনপুর, চাঁপাইনবাবগঞ্জ শাখায় শনিবার থেকে বৃহস্পতিবার সকাল ৯টা থেকে রাত ৮টা পর্যন্ত সরাসরি কনসালটেশন নেওয়া যায়।',
    'faq.q4': 'উমরাহ ও এয়ার টিকিট প্যাকেজ কি কাস্টমাইজ করা যায়?',
    'faq.a4': 'অবশ্যই। আপনার বাজেট ও সময়সূচী অনুযায়ী ৫-তারকা, ৪-তারকা বা বাজেট প্যাকেজ এবং ডিরেক্ট বা কানেক্টিং ফ্লাইট টিকিট কাস্টমাইজ করে দেওয়া হয়।',

    // Testimonials
    'testimonials.tag': 'সাফল্যের গল্প',
    'testimonials.heading': 'আমাদের ক্লায়েন্টদের অভিজ্ঞতা',
    'testimonials.subheading': 'যাঁরা ড্রিমস ফ্লাই ইন্টারন্যাশনালের সেবায় সন্তুষ্ট হয়ে সুদূরপ্রসারী স্বপ্নের দেখা পেয়েছেন।',

    // Footer
    'footer.about': 'বাংলাদেশ সরকার অনুমোদিত লাইসেন্সপ্রাপ্ত ট্রাভেল ও ভিসা কনসালট্যান্সি। ওয়ার্ক পারমিট, উমরাহ, এয়ার টিকিট ও গ্লোবাল ট্যুরিজমে বিশ্বস্ত অংশীদার।',
    'footer.newsletter_label': 'ভিসা আপডেট ও এয়ার টিকিটের স্পেশাল অফার পেতে সাবস্ক্রাইব করুন',
    'footer.subscribe': 'সাবস্ক্রাইব',
    'footer.copyright': '© ২০২৬ ড্রিমস ফ্লাই ইন্টারন্যাশনাল। সর্বস্বত্ব সংরক্ষিত।',
    'footer.license': 'বেসামরিক বিমান পরিবহন ও পর্যটন মন্ত্রণালয় লাইসেন্সধারী',

    // Modals
    'modal.close': 'বন্ধ করুন',
    'modal.submit': 'আবেদন পাঠান',
    'badge.popular': 'জনপ্রিয়',
    'badge.verified': 'অনুমোদিত'
  }
};

/**
 * Get current saved language preference (Strictly Bangla)
 */
export function getStoredLanguage(): Language {
  return 'bn';
}

/**
 * Perform instant DOM translation for elements matching data-i18n attributes
 */
export function applyInstantLanguage(lang: Language = 'bn', root: ParentNode = document) {
  if (typeof window === 'undefined') return;

  // Sync document level language attribute
  document.documentElement.lang = 'bn';

  const dict = translations.bn;

  // 1. Target all elements with data-i18n attribute (text or innerHTML)
  const textElements = root.querySelectorAll('[data-i18n]');
  textElements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key && dict[key]) {
      (el as HTMLElement).innerText = dict[key];
    }
  });

  // 2. Target placeholders
  const placeholderElements = root.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && dict[key]) {
      (el as HTMLInputElement).placeholder = dict[key];
    }
  });

  // 3. Target titles
  const titleElements = root.querySelectorAll('[data-i18n-title]');
  titleElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    if (key && dict[key]) {
      (el as HTMLElement).title = dict[key];
    }
  });

  // 4. Target aria-labels
  const ariaElements = root.querySelectorAll('[data-i18n-aria]');
  ariaElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    if (key && dict[key]) {
      (el as HTMLElement).setAttribute('aria-label', dict[key]);
    }
  });

  // 5. Target alt text
  const altElements = root.querySelectorAll('[data-i18n-alt]');
  altElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-alt');
    if (key && dict[key]) {
      (el as HTMLImageElement).alt = dict[key];
    }
  });
}

// Attach a global translation manager to `window.i18n` and `window.translationManager`
if (typeof window !== 'undefined') {
  const manager = {
    getLanguage: () => 'bn',
    setLanguage: () => applyInstantLanguage('bn'),
    t: (key: string, fallback?: string): string => {
      return translations.bn?.[key] || fallback || key;
    },
    translateDOM: (targetRoot?: ParentNode) => {
      applyInstantLanguage('bn', targetRoot || document);
    }
  };

  (window as any).i18n = manager;
  (window as any).translationManager = manager;

  // Set up MutationObserver to automatically apply Bangla text to newly inserted DOM nodes
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            applyInstantLanguage('bn', node as Element);
          }
        });
      });
    });

    // Start observing when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.body, { childList: true, subtree: true });
        applyInstantLanguage('bn');
      });
    } else {
      observer.observe(document.body, { childList: true, subtree: true });
      applyInstantLanguage('bn');
    }
  }
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
  useEffect(() => {
    applyInstantLanguage('bn');
  }, []);

  const setLang = () => {
    applyInstantLanguage('bn');
  };

  const t = (key: string, fallback?: string): string => {
    return translations.bn?.[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ lang: 'bn', setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
