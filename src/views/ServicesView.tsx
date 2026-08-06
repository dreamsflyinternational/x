import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  PhoneCall,
  MessageCircle,
  FileText,
  Globe,
  Clock,
  ShieldCheck,
  Award,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Calculator,
  Search,
  UploadCloud,
  FileCheck,
  AlertTriangle,
  TrendingUp,
  Building,
  UserCheck,
  Briefcase,
  GraduationCap,
  Heart,
  Users,
  Plane,
  BadgeCheck,
  Download,
  CheckSquare,
  Zap,
  Star,
  Quote,
  Layers,
  MapPin,
  Compass
} from 'lucide-react';
import { VisaEligibilityChecker } from '../components/VisaEligibilityChecker';
import { VisaCostCalculator } from '../components/VisaCostCalculator';
import { ApplicationTracker } from '../components/ApplicationTracker';

interface ServicesViewProps {
  currency?: 'BDT' | 'USD';
  onSelectCountry?: (countryId: string) => void;
  onOpenBookingModal: (serviceType?: string) => void;
  onOpenUploadModal?: () => void;
  onOpenChecklistModal?: () => void;
  onOpenComparisonModal?: () => void;
  onSelectView?: (view: any) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  currency = 'BDT',
  onSelectCountry,
  onOpenBookingModal,
  onOpenUploadModal,
  onOpenChecklistModal,
  onOpenComparisonModal,
  onSelectView,
}) => {
  const [activeInteractiveTool, setActiveInteractiveTool] = useState<'eligibility' | 'calculator' | 'tracker'>('eligibility');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleWhatsApp = (textMsg: string) => {
    const encoded = encodeURIComponent(textMsg);
    window.open(`https://wa.me/8801771304219?text=${encoded}`, '_blank');
  };

  // 1. Visa Categories
  const visaCategories = [
    { title: 'Tourist Visa', titleBn: 'ট্যুরিস্ট ভিসা', icon: Globe, desc: 'ভ্রমন ও সাইটসিয়িং এর জন্য বিশ্বের যে কোনো দেশে সহজ আবেদন।' },
    { title: 'Business Visa', titleBn: 'বিজনেস ভিসা', icon: Briefcase, desc: 'কনফারেন্স, বিজনেস মিটিং ও বাণিজ্যিক সফরের দ্রুত প্রসেসিং।' },
    { title: 'Student Visa', titleBn: 'স্টুডেন্ট ভিসা', icon: GraduationCap, desc: 'উচ্চশিক্ষার জন্য বিশ্ববিদ্যালয় অ্যাডমিশন ও ভিসার পূর্ণ সহায়তা।' },
    { title: 'Work Permit Visa', titleBn: 'ওয়ার্ক পারমিট ভিসা', icon: Building, desc: 'ইউরোপ, মধ্যপ্রাচ্য ও এশিয়ায় বৈধ চাকুরির পারমিট ফাইল প্রসেসিং।' },
    { title: 'Medical Visa', titleBn: 'মেডিকেল ভিসা', icon: Heart, desc: 'ভারত, থাইল্যান্ড, সিঙ্গাপুর ও মালয়েশিয়ায় দ্রুত চিকিৎসা ভিসা।' },
    { title: 'Family Visit Visa', titleBn: 'ফ্যামিলি ভিজিট ভিসা', icon: Users, desc: 'বিদেশে অবস্থানরত পরিবার বা স্বজনদের সাথে সাক্ষাতের ই-ভিসা।' },
    { title: 'Transit Visa', titleBn: 'ট্রানজিট ভিসা', icon: Plane, desc: 'দীর্ঘ লে-ওভার বা সংযোগকারী ফ্লাইটের জন্য দ্রুত ট্রানজিট পারমিট।' },
    { title: 'Umrah Visa', titleBn: 'উমরাহ ভিসা', icon: Sparkles, desc: 'সৌদি আরবের ই-উমরাহ ভিসা এবং গ্রুপ/ইনডিভিজুয়াল টিকিট প্যাকেজ।' },
    { title: 'Hajj Visa', titleBn: 'হজ ভিসা', icon: Award, desc: 'পবিত্র হজ পালনের সরকারি রেজিস্টার্ড এজেন্সি ভিসা ফাইল সার্ভিস।' },
    { title: 'Conference Visa', titleBn: 'কনফারেন্স ভিসা', icon: FileText, desc: 'আন্তর্জাতিক সেমিনার, মেলা ও সামিটের আমন্ত্রণে বিশেষ প্রসেসিং।' },
    { title: 'Investor Visa', titleBn: 'ইনভেস্টর ভিসা', icon: TrendingUp, desc: 'ব্যবসায়িক বিনিয়োগ ও স্থায়ী রেসিডেন্সির জন্য বিশেষজ্ঞ কনসালটেন্সি।' },
  ];

  // 2. Countries We Serve
  const countriesServed = {
    europe: [
      { id: 'italy', name: 'Italy', flag: '🇮🇹' },
      { id: 'germany', name: 'Germany', flag: '🇩🇪' },
      { id: 'france', name: 'France', flag: '🇫🇷' },
      { id: 'portugal', name: 'Portugal', flag: '🇵🇹' },
      { id: 'poland', name: 'Poland', flag: '🇵🇱' },
      { id: 'hungary', name: 'Hungary', flag: '🇭🇺' },
      { id: 'croatia', name: 'Croatia', flag: '🇭🇷' },
      { id: 'romania', name: 'Romania', flag: '🇷🇴' },
      { id: 'malta', name: 'Malta', flag: '🇲🇹' },
      { id: 'spain', name: 'Spain', flag: '🇪🇸' },
    ],
    middleEast: [
      { id: 'saudi-arabia', name: 'Saudi Arabia', flag: '🇸🇦' },
      { id: 'uae', name: 'UAE', flag: '🇦🇪' },
      { id: 'qatar', name: 'Qatar', flag: '🇶🇦' },
      { id: 'oman', name: 'Oman', flag: '🇴🇲' },
      { id: 'kuwait', name: 'Kuwait', flag: '🇰🇼' },
      { id: 'bahrain', name: 'Bahrain', flag: '🇧🇭' },
    ],
    asia: [
      { id: 'malaysia', name: 'Malaysia', flag: '🇲🇾' },
      { id: 'singapore', name: 'Singapore', flag: '🇸🇬' },
      { id: 'japan', name: 'Japan', flag: '🇯🇵' },
      { id: 'south-korea', name: 'South Korea', flag: '🇰🇷' },
      { id: 'thailand', name: 'Thailand', flag: '🇹🇭' },
      { id: 'china', name: 'China', flag: '🇨🇳' },
    ],
    others: [
      { id: 'canada', name: 'Canada', flag: '🇨🇦' },
      { id: 'usa', name: 'USA', flag: '🇺🇸' },
      { id: 'australia', name: 'Australia', flag: '🇦🇺' },
      { id: 'uk', name: 'UK', flag: '🇬🇧' },
      { id: 'new-zealand', name: 'New Zealand', flag: '🇳🇿' },
    ]
  };

  // 3. Visa Processing Steps
  const processingSteps = [
    { step: 1, title: 'Free Consultation', desc: 'আপনার প্রোফাইল ও ভ্রমণ উদ্দেশ্য অনুযায়ী বিনামূল্যে প্রাথমিক মূল্যায়ন।' },
    { step: 2, title: 'Eligibility Assessment', desc: 'আইনগত শর্তাবলী, আর্থিক সচ্ছলতা ও ভিসা পাওয়ার সম্ভাবনা যাচাই।' },
    { step: 3, title: 'Document Collection', desc: 'প্রয়োজনীয় ফাইল সংগ্রহ, যাচাই, অনুবাদ ও নোটারি নিশ্চিতকরণ।' },
    { step: 4, title: 'Application Submission', desc: 'সংশ্লিষ্ট দেশের এম্বাসি বা VFS গ্লোবাল পোর্টালে নিখুঁত অনলাইন ফাইল সাবমিশন।' },
    { step: 5, title: 'Biometric Appointment', desc: 'ফিংগারপ্রিন্ট ও বায়োমেট্রিক অ্যাপয়েন্টমেন্ট শিডিউল নির্ধারণ (যদি প্রয়োজন হয়)।' },
    { step: 6, title: 'Embassy Processing', desc: 'এম্বাসি দ্বারা ভিসা ফাইল পর্যালোচনা ও ব্যাকগ্রাউন্ড ভেরিফিকেশন পর্যবেক্ষণ।' },
    { step: 7, title: 'Visa Decision', desc: 'কনস্যুলেট থেকে ভিসা অনুমোদন ও স্টিকার বা ই-ভিসা ইস্যু নিশ্চিতকরণ।' },
    { step: 8, title: 'Passport Delivery', desc: 'নিরাপদে ক্লায়েন্টের হাতে পাসপোর্ট ও ট্রাভেল ভাউচার বুঝিয়ে দেওয়া।' },
  ];

  // 4. Required Documents
  const requiredDocs = [
    { title: 'Passport', desc: 'কমপক্ষে ৬ মাসের মেয়াদসহ মূল পাসপোর্ট ও সকল পুরাতন পাসপোর্ট' },
    { title: 'Passport Size Photo', desc: 'সাম্প্রতিক ৩৫x৪৫ মিমি সাদা ব্যাকগ্রাউন্ডের ৩ কপি ছবি' },
    { title: 'National ID / NID', desc: 'জাতীয় পরিচয়পত্র বা স্মার্ট কার্ডের স্পষ্ট কপি' },
    { title: 'Bank Statement', desc: 'গত ৬ মাসের ব্যাংক স্টেটমেন্ট ও অরিজিনাল সলভেন্সি লেটার' },
    { title: 'Salary Certificate', desc: 'চাকরিজীবীদের স্যালারি সার্টিফিকেট / পে-স্লিপ / NOC লেটার' },
    { title: 'Trade License (Business)', desc: 'ব্যবসায়ীদের নবায়নকৃত ট্রেড লাইসেন্স, কোম্পানি প্যাড ও মেমোর্যান্ডাম' },
    { title: 'Student ID', desc: 'শিক্ষার্থীদের আইডি কার্ড, নো-অবজেকশন লেটার (NOC) ও ছুটি মঞ্জুরি' },
    { title: 'Marriage Certificate', desc: 'বিবাহিত দম্পতিদের ক্ষেত্রে নিকাহনামা ও নোটারি কপি (প্রয়োজনে)' },
    { title: 'Birth Certificate', desc: 'সন্তানদের সাথে ভ্রমণের ক্ষেত্রে জন্ম নিবন্ধন সনদ' },
    { title: 'Cover Letter', desc: 'ড্রিমস ফ্লাই এক্সপার্ট টিম দ্বারা লিখিত প্রফেশনাল কাভার লেটার' },
    { title: 'Invitation Letter', desc: 'বিজনেস বা ভিজিট ভিসার ক্ষেত্রে অফিসিয়াল ইনভিটেশন' },
    { title: 'Flight Reservation', desc: 'কনফার্মড রিটার্ন এয়ার টিকিট বুকিং ভাউচার' },
    { title: 'Hotel Booking', desc: 'নির্ধারিত মেয়াদের কনফার্মড হোটেল রিজার্ভেশন' },
    { title: 'Travel Insurance', desc: 'ইউরোপ/শেনজেনের জন্য নূন্যতম ৩০,০০০ ইউরো কাভারেজ ট্রাভেল ইন্স্যুরেন্স' },
  ];

  // 5. Visa Information Table
  const visaInfoTable = [
    { country: 'Italy 🇮🇹', type: 'Tourist / Business', time: '15–30 Days', validity: '90 Days', note: 'VFS Global Dhaka' },
    { country: 'Canada 🇨🇦', type: 'Visitor (V-1)', time: '30–60 Days', validity: 'Embassy Decision (Up to Passport Expiry)', note: 'Biometric Required' },
    { country: 'UAE 🇦🇪', type: 'Tourist e-Visa', time: '3–7 Days', validity: '30 / 60 Days', note: 'Paperless e-Visa' },
    { country: 'UK 🇬🇧', type: 'Standard Visitor', time: '15–20 Days', validity: '180 Days / 2–5 Years', note: 'TLScontact Dhaka' },
    { country: 'USA 🇺🇸', type: 'B1/B2 Visitor', time: '15–45 Days', validity: '10 Years Multiple', note: 'Embassy Interview' },
    { country: 'Japan 🇯🇵', type: 'Tourist Visa', time: '7–10 Days', validity: '90 Days Single/Multi', note: 'No Interview Usually' },
    { country: 'Malaysia 🇲🇾', type: 'e-Visa / eVisa', time: '3–5 Days', validity: '30 Days', note: 'Fast Approval' },
    { country: 'Saudi Arabia 🇸🇦', type: 'Umrah / Tourist', time: '3–5 Days', validity: '90 Days Multiple', note: 'Instant E-Visa' },
  ];

  // 6. Processing Time Categories
  const speedCategories = [
    { speed: 'Very Fast', time: '৩–৫ দিন', countries: 'সংযুক্ত আরব আমিরাত (UAE), মালয়েশিয়া e-Visa, সৌদি উমরাহ ই-ভিসা', badge: 'bg-emerald-50 text-emerald-800 border-emerald-300' },
    { speed: 'Standard', time: '৭–১৫ দিন', countries: 'জাপান, ইউকে TLScontact, শেনজেন VFS গ্লোবাল, থাইল্যান্ড', badge: 'bg-blue-50 text-blue-800 border-blue-300' },
    { speed: 'Long Process', time: '১৫–৬০ দিন', countries: 'কানাডা আইআরসিসি, ইউএসএ বি১/বি২, ইউরোপীয় ওয়ার্ক পারমিট ফাইল', badge: 'bg-amber-50 text-amber-800 border-amber-300' },
  ];

  // 7. Why Choose Dreams Fly
  const whyChooseUs = [
    { title: 'Experienced Consultants', desc: 'আইআরসিসি, ভিএফএস ও এম্বাসি ফাইলিংয়ে বহু বছরের অভিজ্ঞতা সম্পন্ন অফিসার।' },
    { title: 'Professional Documentation', desc: 'কাস্টমাইজড SOP, প্রফেশনাল কাভার লেটার ও নির্ভুল ফাইল সাজানো।' },
    { title: 'Transparent Service', desc: 'কোনো গোপন বা অতিরিক্ত চার্জ নেই; সম্পূর্ণ স্পষ্ট চুক্তি ও বিবরণ।' },
    { title: 'No Hidden Charges', desc: 'ফি সম্পর্কিত প্রতিটি খাতের রসিদ প্রদান ও শতভাগ স্বচ্ছতা।' },
    { title: '24/7 Customer Support', desc: 'যেকোনো জরুরি প্রয়োজনে ফোন, হোয়াটসঅ্যাপ ও ইমেইল সাপোর্ট।' },
    { title: 'Secure Document Handling', desc: 'এনক্রিপ্টেড অনলাইন ভল্ট ও নিরাপদ পাসপোর্ট হ্যান্ডলিং প্রোটোকল।' },
    { title: 'Personalized Consultation', desc: 'প্রতিটি গ্রাহকের প্রোফাইল আলাদাভাবে বিশ্লেষণ করে প্রসেসিং দিকনির্দেশনা।' },
    { title: 'Country Experts', desc: 'নির্দিষ্ট দেশের ইমিগ্রেশন আইন ও ভিসা পলিসি স্পেশালিস্ট টিম।' },
  ];

  // 8. Visa Rejection Reasons & Solutions
  const rejectionReasons = [
    'অসম্পূর্ণ বা ত্রুটিপূর্ণ ডকুমেন্ট জমা দেওয়া',
    'ভুল বা অসত্য তথ্য প্রদান করা',
    'দুর্বল আর্থিক প্রমাণ বা ব্যাংক স্টেটমেন্টের গড়মিল',
    'উপযুক্ত Travel History না থাকা বা উদ্দেশ্য অস্পষ্ট হওয়া',
    'অসন্তোষজনক বা নার্ভাস Interview পারফরম্যান্স',
    'Fake বা Unverified Documents উপস্থাপন করা',
  ];

  const approvalSolutions = [
    'Complete & Verified Documents প্রস্তুত রাখা',
    'Strong Financial Proof ও পর্যাপ্ত ব্যাংক সলভেন্সি দেখানো',
    'Proper & Professional Cover Letter সংযুক্ত করা',
    'ভ্রমণের সঠিক ও স্পষ্ট কারণ প্রমাণ করা (Correct Purpose)',
    'পূর্বের ট্রাভেল হিস্ট্রি ও নিজ দেশের সাথে সামাজিক টান উপস্থাপন করা',
    'Dreams Fly Expert দ্বারা ফাইল প্রি-অডিট করিয়ে নেওয়া',
  ];

  // 9. SEO Country Quick Links
  const seoCountryLinks = [
    { name: 'Italy Tourist Visa from Bangladesh', id: 'italy' },
    { name: 'Italy Work Permit Visa', id: 'italy' },
    { name: 'Canada Visitor Visa (V-1)', id: 'canada' },
    { name: 'UK Tourist Visa', id: 'uk' },
    { name: 'Australia Visitor Visa', id: 'australia' },
    { name: 'USA B1/B2 Visitor Visa', id: 'usa' },
    { name: 'Japan Tourist Visa', id: 'japan' },
    { name: 'Malaysia eVisa Processing', id: 'malaysia' },
    { name: 'Saudi Arabia Umrah & Tourist Visa', id: 'saudi-arabia' },
    { name: 'UAE 30/60 Days Tourist Visa', id: 'uae' },
  ];

  // 10. Premium Features
  const premiumFeatures = [
    { title: '⭐ AI Visa Eligibility Checker', desc: 'আপনার বয়স, পেশা ও ব্যাংক ব্যালেন্স অনুযায়ী এআই দ্বারা চান্স স্কোর যাচাই।' },
    { title: '⭐ Visa Cost Calculator', desc: 'সরকারি এম্বাসি ফি, বায়োমেট্রিক ও সার্ভিস চার্জের নিখুঁত হিসাব।' },
    { title: '⭐ Application Tracking System', desc: '২৪/৭ আপনার ফাইল কোন ধাপে আছে লাইভ ট্র্যাক করুন।' },
    { title: '⭐ Document Upload Portal', desc: 'মোবাইল থেকেই নিরাপদে স্ক্যান ফাইল আপলোড করার সুবিধা।' },
    { title: '⭐ Visa Approval Tips & SOP', desc: 'রিজেকশন এড়াতে বিশেষ কাভার লেটার গাইড।' },
    { title: '⭐ Country Comparison Tool', desc: 'দুটি দেশের ভিসার শর্ত ও প্রসেসিং সময় পাশাপাশি তুলনা।' },
    { title: '⭐ Downloadable Document Checklist (PDF)', desc: 'এক ক্লিকেই সব ফাইলের প্রিন্টেবল তালিকা ডাউনলোড।' },
    { title: '⭐ VIP Customer Dashboard', desc: 'নিজের ইনভয়েস, ফাইল আপডেট ও রিওয়ার্ড পয়েন্ট দেখার পোর্টাল।' },
  ];

  // 11. FAQ Items
  const faqs = [
    { q: 'ভিসা হতে কতদিন সময় লাগে?', a: 'দেশ অনুযায়ী ভিন্ন হয়ে থাকে। দুবাই/মালয়েশিয়া ই-ভিসা ৩–৭ দিন, জাপান/ইউকে ৭–২০ দিন এবং কানাডা/ইউএসএ ফাইল প্রসেসিং ১৫–৬০ কার্যদিবস লাগতে পারে।' },
    { q: 'Bank Statement এ কত টাকা থাকা বাধ্যতামূলক?', a: 'দেশ অনুযায়ী পরিবর্তিত হয়। শেনজেন/ইউকে/কানাডার জন্য সাধারণত ৫–১০ লক্ষ+ এবং দুবাই/মালয়েশিয়ার জন্য ৩–৫ লক্ষ টাকা সক্রিয় লেনদেনসহ থাকা শ্রেয়।' },
    { q: 'সরাসরি কোনো Interview দিতে হবে কি?', a: 'আমেরিকা (USA) ভিসার জন্য এম্বাসি ইন্টারভিউ বাধ্যতামূলক। তবে কানাডা, ইউকে ও অধিকাংশ শেনজেন দেশের ক্ষেত্রে শুধু বায়োমেট্রিক (ফিংগারপ্রিন্ট) জমা দিলেই চলে।' },
    { q: 'ভিসা রিজেক্ট বা বাতিল হলে কি ফি রিফান্ড পাওয়া যায়?', a: 'সরকারি এম্বাসি ও ভিএফএস ফি নন-রিফান্ডেবল। তবে ড্রিমস ফ্লাই-এর সার্ভিস রিফান্ড পলিসি চুক্তির শর্ত অনুযায়ী প্রযোজ্য।' },
    { q: 'ভিসা Reject হলে পুনরায় আবেদন করা যাবে?', a: 'অবশ্যই! রিজেকশনের কারণগুলো (Rejection Letter) পর্যালোচনা করে প্রয়োজনীয় সঠিক ডকুমেন্ট যুক্ত করে পুনরায় ফাইল জমা দিলে ভিসা পাওয়ার সম্ভাবনা থাকে।' },
    { q: 'পাসপোর্টের মেয়াদ কতদিন থাকা জরুরি?', a: 'ভ্রমণের তারিখ থেকে পাসপোর্টের মেয়াদের নূন্যতম ৬ মাস থাকা আন্তর্জাতিকভাবে বাধ্যতামূলক।' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-900 space-y-16 animate-in fade-in">
      {/* 1. HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-gray-50 border border-red-200 rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-red-100 text-[#DC2626] border border-red-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#DC2626]" />
            <span>অফিসিয়াল বিশ্বস্ত কনসালটেন্সি</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-sans text-gray-900 leading-tight">
            Visa Processing Services
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-[#DC2626]">
            আপনার স্বপ্নের গন্তব্যে পৌঁছাতে নির্ভরযোগ্য ভিসা সহায়তা
          </h2>

          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed pt-2">
            বাংলাদেশ থেকে বিশ্বের বিভিন্ন দেশের ভিসা আবেদন, ডকুমেন্টেশন এবং প্রসেসিংয়ে Dreams Fly International আপনার বিশ্বস্ত সহযোগী।
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => onOpenBookingModal('ভিসা প্রসেসিং সেবা')}
              className="px-6 py-3.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>✅ Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleWhatsApp('আসসালামু আলাইকুম, আমি ফ্রি ভিসা কনসালটেশন পেতে চাই।')}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer shadow flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>✅ Free Consultation (WhatsApp)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. VISA CATEGORIES */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            আমাদের সার্ভিস সমূহ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            Visa Categories
          </h2>
          <p className="text-xs text-gray-600">
            আপনার প্রয়োজন অনুযায়ী ১১টি বিশেষ ভিসা বিভাগে শতভাগ পেশাদার ফাইল প্রসেসিং
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visaCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-gray-200 hover:border-[#DC2626] transition-all shadow-sm hover:shadow-md flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#DC2626] border border-red-200 flex items-center justify-center group-hover:bg-[#DC2626] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#DC2626] uppercase tracking-wider block">
                      {cat.title}
                    </span>
                    <h3 className="text-xl font-bold font-sans text-gray-900">{cat.titleBn}</h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{cat.desc}</p>
                </div>

                <button
                  onClick={() => onOpenBookingModal(cat.titleBn)}
                  className="w-full py-2.5 bg-gray-100 hover:bg-[#DC2626] text-gray-800 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1"
                >
                  <span>আবেদন করুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. COUNTRIES WE SERVE */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 space-y-8 shadow-sm">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            গ্লোবাল নেটওয়ার্ক
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            Countries We Serve
          </h2>
          <p className="text-xs text-gray-600">
            ইউরোপ, মধ্যপ্রাচ্য, এশিয়া ও উত্তর আমেরিকার শীর্ষ দেশসমূহের ভিসা সার্ভিস
          </p>
        </div>

        <div className="space-y-8">
          {/* Europe */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
              <Globe className="w-5 h-5 text-[#DC2626]" />
              <h3 className="text-lg font-bold text-gray-900">ইউরোপ (Europe & Schengen)</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {countriesServed.europe.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelectCountry && onSelectCountry(c.id)}
                  className="bg-gray-50 hover:bg-red-50 p-3.5 rounded-2xl border border-gray-200 hover:border-red-300 flex items-center space-x-2.5 transition-all text-left cursor-pointer"
                >
                  <span className="text-2xl">{c.flag}</span>
                  <span className="text-xs font-bold text-gray-800">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Middle East & Asia */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
                <Globe className="w-5 h-5 text-[#DC2626]" />
                <h3 className="text-lg font-bold text-gray-900">মধ্যপ্রাচ্য (Middle East)</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {countriesServed.middleEast.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onSelectCountry && onSelectCountry(c.id)}
                    className="bg-gray-50 hover:bg-red-50 p-3.5 rounded-2xl border border-gray-200 hover:border-red-300 flex items-center space-x-2.5 transition-all text-left cursor-pointer"
                  >
                    <span className="text-2xl">{c.flag}</span>
                    <span className="text-xs font-bold text-gray-800">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
                <Globe className="w-5 h-5 text-[#DC2626]" />
                <h3 className="text-lg font-bold text-gray-900">এশিয়া (Asia & Far East)</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {countriesServed.asia.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onSelectCountry && onSelectCountry(c.id)}
                    className="bg-gray-50 hover:bg-red-50 p-3.5 rounded-2xl border border-gray-200 hover:border-red-300 flex items-center space-x-2.5 transition-all text-left cursor-pointer"
                  >
                    <span className="text-2xl">{c.flag}</span>
                    <span className="text-xs font-bold text-gray-800">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Others */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
              <Globe className="w-5 h-5 text-[#DC2626]" />
              <h3 className="text-lg font-bold text-gray-900">অন্যান্য শীর্ষ গন্তব্য (Others)</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {countriesServed.others.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelectCountry && onSelectCountry(c.id)}
                  className="bg-gray-50 hover:bg-red-50 p-3.5 rounded-2xl border border-gray-200 hover:border-red-300 flex items-center space-x-2.5 transition-all text-left cursor-pointer"
                >
                  <span className="text-2xl">{c.flag}</span>
                  <span className="text-xs font-bold text-gray-800">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. VISA PROCESSING STEPS (8 Steps) */}
      <div className="bg-gray-50 p-8 sm:p-12 rounded-3xl border border-gray-200 space-y-8 shadow-sm">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            স্বচ্ছ কার্যপ্রণালী
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            Visa Processing Steps (৮টি ধাপ)
          </h2>
          <p className="text-xs text-gray-600">
            প্রথম ফ্রি কনসালটেশন থেকে পাসপোর্ট ডেলিভারি পর্যন্ত ধাপসমূহ
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {processingSteps.map((s) => (
            <div
              key={s.step}
              className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2 shadow-xs hover:border-[#DC2626] transition-all relative"
            >
              <div className="flex justify-between items-center">
                <span className="w-7 h-7 rounded-full bg-red-50 text-[#DC2626] font-black text-xs flex items-center justify-center border border-red-200">
                  {s.step}
                </span>
                <span className="text-[10px] font-bold uppercase text-gray-400">Step {s.step}</span>
              </div>
              <h3 className="text-sm font-bold text-gray-900 pt-1">{s.title}</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. REQUIRED DOCUMENTS & DOWNLOAD CHECKLIST */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 space-y-8 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-6">
          <div>
            <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
              ফাইলিং রিকোয়ারমেন্টস
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
              Required Documents Checklists
            </h2>
          </div>
          <button
            onClick={() => onOpenChecklistModal && onOpenChecklistModal()}
            className="px-5 py-2.5 bg-[#DC2626] hover:bg-[#B71C1C] text-white font-extrabold rounded-xl text-xs flex items-center space-x-2 shadow cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>ডকুমেন্ট চেকলিস্ট ডাউনলোড (PDF)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {requiredDocs.map((doc, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-xs text-gray-900">{doc.title}</span>
                <span className="block text-[11px] text-gray-600 mt-0.5">{doc.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. VISA INFORMATION TABLE */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6 shadow-sm overflow-hidden">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            দ্রুত এক নজরে
          </span>
          <h2 className="text-2xl font-black font-sans text-gray-900">
            Visa Information Table
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-900 font-extrabold border-b border-gray-200">
                <th className="p-3.5">Country</th>
                <th className="p-3.5">Visa Type</th>
                <th className="p-3.5">Processing Time</th>
                <th className="p-3.5">Validity</th>
                <th className="p-3.5">Requirement Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {visaInfoTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-red-50/40 transition-colors">
                  <td className="p-3.5 font-extrabold text-gray-900">{row.country}</td>
                  <td className="p-3.5 font-bold text-[#DC2626]">{row.type}</td>
                  <td className="p-3.5 font-medium text-gray-700">{row.time}</td>
                  <td className="p-3.5 text-gray-800">{row.validity}</td>
                  <td className="p-3.5 text-gray-600">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 8. PROCESSING TIME SPEED CATEGORIES */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 space-y-6 shadow-sm">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            সময়সীমা
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            Processing Time Overview
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {speedCategories.map((c, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-3xl border border-gray-200 space-y-3">
              <span className={`px-3 py-1 rounded-full text-xs font-black border ${c.badge}`}>
                {c.speed} ({c.time})
              </span>
              <h3 className="text-lg font-bold text-gray-900 pt-1">{c.speed} Processing</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{c.countries}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 9. WHY CHOOSE DREAMS FLY */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            কেন ড্রিমস ফ্লাই
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            Why Choose Dreams Fly?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyChooseUs.map((w, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-red-50 text-[#DC2626] font-black text-xs flex items-center justify-center">
                ✓
              </div>
              <h3 className="text-sm font-bold text-gray-900">{w.title}</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 10. REJECTION REASONS vs APPROVAL SOLUTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Rejection Reasons */}
        <div className="bg-red-50/50 border border-red-200 p-6 sm:p-8 rounded-3xl space-y-4 shadow-sm">
          <div className="flex items-center space-x-3 border-b border-red-200 pb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DC2626] text-white flex items-center justify-center font-bold">
              ✕
            </div>
            <div>
              <h3 className="text-xl font-bold font-sans text-red-900">Visa Rejection Reasons</h3>
              <p className="text-xs text-red-700">ভিসা প্রত্যাখ্যাত হওয়ার সাধারণ ভুলসমূহ</p>
            </div>
          </div>
          <ul className="space-y-2.5 text-xs text-gray-800">
            {rejectionReasons.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 bg-white p-3 rounded-xl border border-red-100">
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Approval Solutions */}
        <div className="bg-emerald-50/50 border border-emerald-200 p-6 sm:p-8 rounded-3xl space-y-4 shadow-sm">
          <div className="flex items-center space-x-3 border-b border-emerald-200 pb-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <h3 className="text-xl font-bold font-sans text-emerald-900">How to Increase Approval Chance</h3>
              <p className="text-xs text-emerald-700">ভিসা পাওয়ার সম্ভাবনা নিশ্চিত করার উপায়</p>
            </div>
          </div>
          <ul className="space-y-2.5 text-xs text-gray-800">
            {approvalSolutions.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 bg-white p-3 rounded-xl border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 11. PREMIUM FEATURES HIGHLIGHT */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 sm:p-12 rounded-3xl space-y-8 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            বিশেষ সুবিধা
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-white">
            Premium Features Suite
          </h2>
          <p className="text-xs text-gray-300">
            যে বৈশিষ্ট্যসমূহ ড্রিমস ফ্লাইকে অন্যদের চেয়ে অনন্য করে তোলে
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {premiumFeatures.map((f, i) => (
            <div key={i} className="bg-white/10 p-5 rounded-2xl border border-white/10 space-y-2 hover:bg-white/20 transition-all">
              <h3 className="text-sm font-bold text-white">{f.title}</h3>
              <p className="text-[11px] text-gray-300 leading-normal">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 12. SUCCESS STORIES & STATS */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 space-y-8 shadow-sm">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            আমাদের অর্জনের রেকর্ড
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            Success Stories & Statistics
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-red-50 rounded-2xl border border-red-200">
            <span className="text-4xl sm:text-5xl font-black text-[#DC2626] block">১০০০+</span>
            <span className="text-xs font-bold text-gray-800 mt-2 block">Visa Approved</span>
          </div>
          <div className="p-6 bg-red-50 rounded-2xl border border-red-200">
            <span className="text-4xl sm:text-5xl font-black text-[#DC2626] block">৮৫+</span>
            <span className="text-xs font-bold text-gray-800 mt-2 block">Countries Served</span>
          </div>
          <div className="p-6 bg-red-50 rounded-2xl border border-red-200">
            <span className="text-4xl sm:text-5xl font-black text-[#DC2626] block">৫০০০+</span>
            <span className="text-xs font-bold text-gray-800 mt-2 block">Happy Clients</span>
          </div>
        </div>
      </div>

      {/* 13. SEO COUNTRY QUICK LINKS DIRECTORY */}
      <div className="bg-gray-50 p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-4">
        <h3 className="text-base font-bold text-gray-900 flex items-center space-x-2">
          <Globe className="w-4 h-4 text-[#DC2626]" />
          <span>SEO Country Visa Hub Quick Links:</span>
        </h3>
        <div className="flex flex-wrap gap-2 text-xs">
          {seoCountryLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => onSelectCountry && onSelectCountry(link.id)}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl hover:border-[#DC2626] hover:text-[#DC2626] font-semibold text-gray-700 transition-colors cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>

      {/* 14. FAQ ACCORDION */}
      <div className="bg-gray-50 p-8 sm:p-12 rounded-3xl border border-gray-200 space-y-6 shadow-sm">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider block">
            সাধারণ জিজ্ঞাসা
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-900">
            Frequently Asked Questions (FAQ)
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-4 sm:p-5 flex justify-between items-center space-x-4 cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0" />
                  <span className="text-sm font-bold text-gray-900">{faq.q}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openFaqIndex === idx ? 'rotate-180 text-[#DC2626]' : ''
                  }`}
                />
              </button>

              {openFaqIndex === idx && (
                <div className="p-4 sm:p-5 bg-red-50/30 border-t border-gray-100 text-xs text-gray-700 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 15. CTA SECTION */}
      <div className="bg-gradient-to-r from-[#DC2626] via-[#B71C1C] to-[#991B1B] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full inline-block">
            স্বপ্নের পথে প্রথম পদক্ষেপ
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-sans">
            আপনার ভিসা আবেদন আজই শুরু করুন
          </h2>
          <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
            যোগাযোগ করুন: 📞 +880 1771-304219 | 📧 dreamsflyinternational@gmail.com
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onOpenBookingModal('ভিসা প্রসেসিং ফ্রি কনসালটেশন')}
            className="px-6 py-3.5 bg-white text-[#DC2626] hover:bg-red-50 font-black rounded-2xl text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <PhoneCall className="w-4 h-4 text-[#DC2626]" />
            <span>Book Consultation</span>
          </button>
          <button
            onClick={() => handleWhatsApp('আসসালামু আলাইকুম, আমি অনলাইন ভিসা আবেদনের সার্ভিস পেতে চাই।')}
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
