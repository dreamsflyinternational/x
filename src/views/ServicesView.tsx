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
  Compass,
  Lock,
  Headphones,
  RefreshCw,
  ExternalLink
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
  const [activeInteractiveTool, setActiveInteractiveTool] = useState<'eligibility' | 'calculator' | 'tracker' | 'none'>('eligibility');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [countrySearch, setCountrySearch] = useState('');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleWhatsApp = (textMsg: string) => {
    const encoded = encodeURIComponent(textMsg);
    window.open(`https://wa.me/8801771304219?text=${encoded}`, '_blank');
  };

  // 1. Visa Categories (Preserving all 11 items and text)
  const visaCategories = [
    { title: 'Tourist Visa', titleBn: 'ট্যুরিস্ট ভিসা', icon: Globe, desc: 'ভ্রমন ও সাইটসিয়িং এর জন্য বিশ্বের যে কোনো দেশে সহজ আবেদন।', tag: 'Popular' },
    { title: 'Business Visa', titleBn: 'বিজনেস ভিসা', icon: Briefcase, desc: 'কনফারেন্স, বিজনেস মিটিং ও বাণিজ্যিক সফরের দ্রুত প্রসেসিং।', tag: 'Fast Track' },
    { title: 'Student Visa', titleBn: 'স্টুডেন্ট ভিসা', icon: GraduationCap, desc: 'উচ্চশিক্ষার জন্য বিশ্ববিদ্যালয় অ্যাডমিশন ও ভিসার পূর্ণ সহায়তা।', tag: 'Full Guidance' },
    { title: 'Work Permit Visa', titleBn: 'ওয়ার্ক পারমিট ভিসা', icon: Building, desc: 'ইউরোপ, মধ্যপ্রাচ্য ও এশিয়ায় বৈধ চাকুরির পারমিট ফাইল প্রসেসিং।', tag: 'Verified Job' },
    { title: 'Medical Visa', titleBn: 'মেডিকেল ভিসা', icon: Heart, desc: 'ভারত, থাইল্যান্ড, সিঙ্গাপুর ও মালয়েশিয়ায় দ্রুত চিকিৎসা ভিসা।', tag: 'Priority' },
    { title: 'Family Visit Visa', titleBn: 'ফ্যামিলি ভিজিট ভিসা', icon: Users, desc: 'বিদেশে অবস্থানরত পরিবার বা স্বজনদের সাথে সাক্ষাতের ই-ভিসা।', tag: 'Easy Process' },
    { title: 'Transit Visa', titleBn: 'ট্রানজিট ভিসা', icon: Plane, desc: 'দীর্ঘ লে-ওভার বা সংযোগকারী ফ্লাইটের জন্য দ্রুত ট্রানজিট পারমিট।', tag: 'Quick Issue' },
    { title: 'Umrah Visa', titleBn: 'উমরাহ ভিসা', icon: Sparkles, desc: 'সৌদি আরবের ই-উমরাহ ভিসা এবং গ্রুপ/ইনডিভিজুয়াল টিকিট প্যাকেজ।', tag: 'Instant' },
    { title: 'Hajj Visa', titleBn: 'হজ ভিসা', icon: Award, desc: 'পবিত্র হজ পালনের সরকারি রেজিস্টার্ড এজেন্সি ভিসা ফাইল সার্ভিস।', tag: 'Govt Registered' },
    { title: 'Conference Visa', titleBn: 'কনফারেন্স ভিসা', icon: FileText, desc: 'আন্তর্জাতিক সেমিনার, মেলা ও সামিটের আমন্ত্রণে বিশেষ প্রসেসিং।', tag: 'Express' },
    { title: 'Investor Visa', titleBn: 'ইনভেস্টর ভিসা', icon: TrendingUp, desc: 'ব্যবসায়িক বিনিয়োগ ও স্থায়ী রেসিডেন্সির জন্য বিশেষজ্ঞ কনসালটেন্সি।', tag: 'PR & Residency' },
  ];

  // 2. Countries We Serve (Preserving all countries and flags)
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

  // 3. Visa Processing Steps (Preserving all 8 steps)
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

  // 4. Required Documents (Preserving all 14 items)
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

  // 5. Visa Information Table (Preserving all 8 rows)
  const visaInfoTable = [
    { country: 'Italy 🇮🇹', countryId: 'italy', type: 'Tourist / Business', time: '15–30 Days', validity: '90 Days', note: 'VFS Global Dhaka' },
    { country: 'Canada 🇨🇦', countryId: 'canada', type: 'Visitor (V-1)', time: '30–60 Days', validity: 'Embassy Decision (Up to Passport Expiry)', note: 'Biometric Required' },
    { country: 'UAE 🇦🇪', countryId: 'uae', type: 'Tourist e-Visa', time: '3–7 Days', validity: '30 / 60 Days', note: 'Paperless e-Visa' },
    { country: 'UK 🇬🇧', countryId: 'uk', type: 'Standard Visitor', time: '15–20 Days', validity: '180 Days / 2–5 Years', note: 'TLScontact Dhaka' },
    { country: 'USA 🇺🇸', countryId: 'usa', type: 'B1/B2 Visitor', time: '15–45 Days', validity: '10 Years Multiple', note: 'Embassy Interview' },
    { country: 'Japan 🇯🇵', countryId: 'japan', type: 'Tourist Visa', time: '7–10 Days', validity: '90 Days Single/Multi', note: 'No Interview Usually' },
    { country: 'Malaysia 🇲🇾', countryId: 'malaysia', type: 'e-Visa / eVisa', time: '3–5 Days', validity: '30 Days', note: 'Fast Approval' },
    { country: 'Saudi Arabia 🇸🇦', countryId: 'saudi-arabia', type: 'Umrah / Tourist', time: '3–5 Days', validity: '90 Days Multiple', note: 'Instant E-Visa' },
  ];

  // 6. Processing Time Categories (Preserving speed categories)
  const speedCategories = [
    { speed: 'Very Fast', time: '৩–৫ দিন', countries: 'সংযুক্ত আরব আমিরাত (UAE), মালয়েশিয়া e-Visa, সৌদি উমরাহ ই-ভিসা', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    { speed: 'Standard', time: '৭–১৫ দিন', countries: 'জাপান, ইউকে TLScontact, শেনজেন VFS গ্লোবাল, থাইল্যান্ড', badge: 'bg-blue-100 text-blue-800 border-blue-300' },
    { speed: 'Long Process', time: '১৫–৬০ দিন', countries: 'কানাডা আইআরসিসি, ইউএসএ বি১/বি২, ইউরোপীয় ওয়ার্ক পারমিট ফাইল', badge: 'bg-amber-100 text-amber-800 border-amber-300' },
  ];

  // 7. Why Choose Dreams Fly (Preserving all 8 items)
  const whyChooseUs = [
    { title: 'Experienced Consultants', desc: 'আইআরসিসি, ভিএফএস ও এম্বাসি ফাইলিংয়ে বহু বছরের অভিজ্ঞতা সম্পন্ন অফিসার।', icon: UserCheck },
    { title: 'Professional Documentation', desc: 'কাস্টমাইজড SOP, প্রফেশনাল কাভার লেটার ও নির্ভুল ফাইল সাজানো।', icon: FileCheck },
    { title: 'Transparent Service', desc: 'কোনো গোপন বা অতিরিক্ত চার্জ নেই; সম্পূর্ণ স্পষ্ট চুক্তি ও বিবরণ।', icon: ShieldCheck },
    { title: 'No Hidden Charges', desc: 'ফি সম্পর্কিত প্রতিটি খাতের রসিদ প্রদান ও শতভাগ স্বচ্ছতা।', icon: BadgeCheck },
    { title: '24/7 Customer Support', desc: 'যেকোনো জরুরি প্রয়োজনে ফোন, হোয়াটসঅ্যাপ ও ইমেইল সাপোর্ট।', icon: Headphones },
    { title: 'Secure Document Handling', desc: 'এনক্রিপ্টেড অনলাইন ভল্ট ও নিরাপদ পাসপোর্ট হ্যান্ডলিং প্রোটোকল।', icon: Lock },
    { title: 'Personalized Consultation', desc: 'প্রতিটি গ্রাহকের প্রোফাইল আলাদাভাবে বিশ্লেষণ করে প্রসেসিং দিকনির্দেশনা।', icon: Sparkles },
    { title: 'Country Experts', desc: 'নির্দিষ্ট দেশের ইমিগ্রেশন আইন ও ভিসা পলিসি স্পেশালিস্ট টিম।', icon: Award },
  ];

  // 8. Visa Rejection Reasons & Solutions (Preserving content)
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

  // 9. SEO Country Quick Links (Preserving all items)
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

  // 10. Premium Features (Preserving all items)
  const premiumFeatures = [
    { title: '⭐ AI Visa Eligibility Checker', desc: 'আপনার বয়স, পেশা ও ব্যাংক ব্যালেন্স অনুযায়ী এআই দ্বারা চান্স স্কোর যাচাই।', toolKey: 'eligibility' as const },
    { title: '⭐ Visa Cost Calculator', desc: 'সরকারি এম্বাসি ফি, বায়োমেট্রিক ও সার্ভিস চার্জের নিখুঁত হিসাব।', toolKey: 'calculator' as const },
    { title: '⭐ Application Tracking System', desc: '২৪/৭ আপনার ফাইল কোন ধাপে আছে লাইভ ট্র্যাক করুন।', toolKey: 'tracker' as const },
    { title: '⭐ Document Upload Portal', desc: 'মোবাইল থেকেই নিরাপদে স্ক্যান ফাইল আপলোড করার সুবিধা।', action: () => onOpenUploadModal && onOpenUploadModal() },
    { title: '⭐ Visa Approval Tips & SOP', desc: 'রিজেকশন এড়াতে বিশেষ কাভার লেটার গাইড।' },
    { title: '⭐ Country Comparison Tool', desc: 'দুটি দেশের ভিসার শর্ত ও প্রসেসিং সময় পাশাপাশি তুলনা।', action: () => onOpenComparisonModal && onOpenComparisonModal() },
    { title: '⭐ Downloadable Document Checklist (PDF)', desc: 'এক ক্লিকেই সব ফাইলের প্রিন্টেবল তালিকা ডাউনলোড।', action: () => onOpenChecklistModal && onOpenChecklistModal() },
    { title: '⭐ VIP Customer Dashboard', desc: 'নিজের ইনভয়েস, ফাইল আপডেট ও রিওয়ার্ড পয়েন্ট দেখার পোর্টাল।' },
  ];

  // 11. FAQ Items (Preserving all items)
  const faqs = [
    { q: 'ভিসা হতে কতদিন সময় লাগে?', a: 'দেশ অনুযায়ী ভিন্ন হয়ে থাকে। দুবাই/মালয়েশিয়া ই-ভিসা ৩–৭ দিন, জাপান/ইউকে ৭–২০ দিন এবং কানাডা/ইউএসএ ফাইল প্রসেসিং ১৫–৬০ কার্যদিবস লাগতে পারে।' },
    { q: 'Bank Statement এ কত টাকা থাকা বাধ্যতামূলক?', a: 'দেশ অনুযায়ী পরিবর্তিত হয়। শেনজেন/ইউকে/কানাডার জন্য সাধারণত ৫–১০ লক্ষ+ এবং দুবাই/মালয়েশিয়ার জন্য ৩–৫ লক্ষ টাকা সক্রিয় লেনদেনসহ থাকা শ্রেয়।' },
    { q: 'সরাসরি কোনো Interview দিতে হবে কি?', a: 'আমেরিকা (USA) ভিসার জন্য এম্বাসি ইন্টারভিউ বাধ্যতামূলক। তবে কানাডা, ইউকে ও অধিকাংশ শেনজেন দেশের ক্ষেত্রে শুধু বায়োমেট্রিক (ফিংগারপ্রিন্ট) জমা দিলেই চলে।' },
    { q: 'ভিসা রিজেক্ট বা বাতিল হলে কি ফি রিফান্ড পাওয়া যায়?', a: 'সরকারি এম্বাসি ও ভিএফএস ফি নন-রিফান্ডেবল। তবে ড্রিমস ফ্লাই-এর সার্ভিস রিফান্ড পলিসি চুক্তির শর্ত অনুযায়ী প্রযোজ্য।' },
    { q: 'ভিসা Reject হলে পুনরায় আবেদন করা যাবে?', a: 'অবশ্যই! রিজেকশনের কারণগুলো (Rejection Letter) পর্যালোচনা করে প্রয়োজনীয় সঠিক ডকুমেন্ট যুক্ত করে পুনরায় ফাইল জমা দিলে ভিসা পাওয়ার সম্ভাবনা থাকে।' },
    { q: 'পাসপোর্টের মেয়াদ কতদিন থাকা জরুরি?', a: 'ভ্রমণের তারিখ থেকে পাসপোর্টের মেয়াদের নূন্যতম ৬ মাস থাকা আন্তর্জাতিকভাবে বাধ্যতামূলক।' },
  ];

  // Filter countries served based on search query
  const matchesSearch = (str: string) => str.toLowerCase().includes(countrySearch.toLowerCase());

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 selection:bg-red-600 selection:text-white">

      {/* Top Header Bar */}
      <div className="bg-slate-900 text-slate-200 py-2.5 px-4 text-xs shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-[11px] sm:text-xs">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-red-600 text-white uppercase tracking-wider">
              Govt & Embassy Authorized
            </span>
            <span className="font-medium">Dreams Fly International — Travel & Visa Consultancy Services</span>
          </div>
          <div className="flex items-center space-x-4 text-xs font-bold">
            <a href="tel:+8801771304219" className="hover:text-red-400 transition-colors flex items-center space-x-1">
              <PhoneCall className="w-3.5 h-3.5 text-red-500" />
              <span>+880 1771-304219</span>
            </a>
            <button onClick={() => handleWhatsApp('আসসালামু আলাইকুম, ড্রাইমস ফ্লাই থেকে ভিসা সার্ভিস কনসালটেশন পেতে চাই।')} className="hover:text-emerald-400 transition-colors flex items-center space-x-1 cursor-pointer">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">

        {/* 1. HERO BANNER */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white shadow-2xl p-6 sm:p-12 border border-slate-800">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center mix-blend-overlay pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 bg-slate-800/90 border border-slate-700/80 px-4 py-1.5 rounded-full text-xs font-bold text-amber-400 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>অফিসিয়াল বিশ্বস্ত ভিসা কনসালটেন্সি সেবা</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                Visa Processing <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-400">Services</span>
              </h1>

              <h2 className="text-lg sm:text-2xl font-bold text-slate-200">
                আপনার স্বপ্নের গন্তব্যে পৌঁছাতে নির্ভরযোগ্য ভিসা সহায়তা
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                বাংলাদেশ থেকে বিশ্বের বিভিন্ন দেশের ভিসা আবেদন, ফাইল রিভিউ, সঠিক ডকুমেন্টেশন এবং দ্রুত প্রসেসিংয়ে Dreams Fly International আপনার সর্বাধুনিক ও বিশ্বস্ত সহযোগী।
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onOpenBookingModal('ভিসা প্রসেসিং সেবা')}
                  className="px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-xl shadow-red-900/30 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Apply Now (আবেদন করুন)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleWhatsApp('আসসালামু আলাইকুম, আমি ফ্রি ভিসা কনসালটেশন পেতে চাই।')}
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-lg flex items-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Free Consultation (WhatsApp)</span>
                </button>
              </div>
            </div>

            {/* Trust Cards & Quick Actions */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2 backdrop-blur-md">
                <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-black">
                  99%
                </div>
                <h3 className="text-xs font-extrabold text-white">High Approval Rate</h3>
                <p className="text-[10px] text-slate-400">নির্ভুল ফাইলিং ও লিগ্যাল সাপোর্ট</p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2 backdrop-blur-md">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                  100%
                </div>
                <h3 className="text-xs font-extrabold text-white">Zero Hidden Charges</h3>
                <p className="text-[10px] text-slate-400">স্বচ্ছ ফি ও অফিশিয়াল রসিদ</p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2 backdrop-blur-md">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                  24/7
                </div>
                <h3 className="text-xs font-extrabold text-white">Live Assistance</h3>
                <p className="text-[10px] text-slate-400">সার্বক্ষণিক কনসালটেন্ট সাপোর্ট</p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2 backdrop-blur-md">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black">
                  85+
                </div>
                <h3 className="text-xs font-extrabold text-white">Global Destinations</h3>
                <p className="text-[10px] text-slate-400">ইউরোপ, এশিয়া, কানাডা, আমেরিকা</p>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE SUITE: AI Eligibility, Cost Calculator, Tracker */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden space-y-6 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-black text-red-600 uppercase tracking-widest block">
                Interactive Smart Tools
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                স্মার্ট ভিসা টুলস অ্যান্ড ক্যালকুলেটর
              </h2>
            </div>

            <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto">
              <button
                onClick={() => setActiveInteractiveTool('eligibility')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  activeInteractiveTool === 'eligibility' ? 'bg-red-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Eligibility Checker</span>
              </button>
              <button
                onClick={() => setActiveInteractiveTool('calculator')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  activeInteractiveTool === 'calculator' ? 'bg-red-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Calculator className="w-3.5 h-3.5 text-amber-500" />
                <span>Cost Calculator</span>
              </button>
              <button
                onClick={() => setActiveInteractiveTool('tracker')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  activeInteractiveTool === 'tracker' ? 'bg-red-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>Live Tracker</span>
              </button>
            </div>
          </div>

          <div className="pt-2">
            {activeInteractiveTool === 'eligibility' && (
              <VisaEligibilityChecker onOpenBookingModal={onOpenBookingModal} />
            )}
            {activeInteractiveTool === 'calculator' && (
              <VisaCostCalculator currency={currency} onOpenBookingModal={onOpenBookingModal} />
            )}
            {activeInteractiveTool === 'tracker' && (
              <ApplicationTracker />
            )}
          </div>
        </section>

        {/* 2. VISA CATEGORIES */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-red-600 uppercase tracking-widest block">
              আমাদের সার্ভিস সমূহ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Visa Categories
            </h2>
            <p className="text-xs text-slate-600">
              আপনার প্রয়োজন অনুযায়ী ১১টি বিশেষ ভিসা বিভাগে শতভাগ পেশাদার ফাইল প্রসেসিং
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visaCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 hover:border-red-500/80 p-6 rounded-3xl transition-all shadow-sm hover:shadow-xl flex flex-col justify-between space-y-4 group hover:-translate-y-1 duration-200"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-amber-800 border border-slate-200">
                        {cat.tag}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">
                        {cat.title}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">{cat.titleBn}</h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{cat.desc}</p>
                  </div>

                  <button
                    onClick={() => onOpenBookingModal(cat.titleBn)}
                    className="w-full py-2.5 bg-slate-100 hover:bg-red-600 text-slate-800 hover:text-white border border-slate-200 hover:border-red-600 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <span>আবেদন করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. COUNTRIES WE SERVE */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-8 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-black text-red-600 uppercase tracking-widest block">
                গ্লোবাল নেটওয়ার্ক
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Countries We Serve
              </h2>
              <p className="text-xs text-slate-600">
                ইউরোপ, মধ্যপ্রাচ্য, এশিয়া ও উত্তর আমেরিকার শীর্ষ দেশসমূহের ভিসা সার্ভিস
              </p>
            </div>

            {/* Quick Country Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search country..."
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="space-y-8">
            {/* Europe */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                <Globe className="w-5 h-5 text-red-600" />
                <h3 className="text-base font-bold text-slate-900">ইউরোপ (Europe & Schengen)</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {countriesServed.europe.filter(c => matchesSearch(c.name)).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onSelectCountry && onSelectCountry(c.id)}
                    className="bg-slate-50 hover:bg-red-50/80 p-3.5 rounded-2xl border border-slate-200 hover:border-red-300 flex items-center space-x-2.5 transition-all text-left cursor-pointer group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">{c.flag}</span>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-red-700 truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Middle East & Asia */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <Globe className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-bold text-slate-900">মধ্যপ্রাচ্য (Middle East)</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {countriesServed.middleEast.filter(c => matchesSearch(c.name)).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => onSelectCountry && onSelectCountry(c.id)}
                      className="bg-slate-50 hover:bg-amber-50/80 p-3.5 rounded-2xl border border-slate-200 hover:border-amber-300 flex items-center space-x-2.5 transition-all text-left cursor-pointer group"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">{c.flag}</span>
                      <span className="text-xs font-bold text-slate-800 group-hover:text-amber-800 truncate">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <Globe className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-bold text-slate-900">এশিয়া (Asia & Far East)</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {countriesServed.asia.filter(c => matchesSearch(c.name)).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => onSelectCountry && onSelectCountry(c.id)}
                      className="bg-slate-50 hover:bg-emerald-50/80 p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-300 flex items-center space-x-2.5 transition-all text-left cursor-pointer group"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">{c.flag}</span>
                      <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-800 truncate">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Others */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">অন্যান্য শীর্ষ গন্তব্য (Others)</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {countriesServed.others.filter(c => matchesSearch(c.name)).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onSelectCountry && onSelectCountry(c.id)}
                    className="bg-slate-50 hover:bg-blue-50/80 p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 flex items-center space-x-2.5 transition-all text-left cursor-pointer group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">{c.flag}</span>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-blue-800 truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. VISA PROCESSING STEPS (8 Steps) */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-red-600 uppercase tracking-widest block">
              স্বচ্ছ কার্যপ্রণালী
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Visa Processing Steps (৮টি ধাপ)
            </h2>
            <p className="text-xs text-slate-600">
              প্রথম ফ্রি কনসালটেশন থেকে পাসপোর্ট ডেলিভারি পর্যন্ত ধাপসমূহ
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {processingSteps.map((s) => (
              <div
                key={s.step}
                className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3 hover:border-red-400 transition-all relative group shadow-xs"
              >
                <div className="flex justify-between items-center">
                  <span className="w-8 h-8 rounded-xl bg-red-100 text-red-700 font-black text-xs flex items-center justify-center border border-red-200 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    0{s.step}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-slate-500">Step {s.step} of 8</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 pt-1">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. REQUIRED DOCUMENTS & DOWNLOAD CHECKLIST */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-8 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-black text-red-600 uppercase tracking-widest block">
                ফাইলিং রিকোয়ারমেন্টস
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Required Documents Checklists
              </h2>
            </div>
            <button
              onClick={() => onOpenChecklistModal && onOpenChecklistModal()}
              className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl text-xs flex items-center space-x-2 shadow-lg transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>ডকুমেন্ট চেকলিস্ট ডাউনলোড (PDF)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {requiredDocs.map((doc, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-start space-x-3 hover:border-slate-300 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-xs text-slate-900">{doc.title}</span>
                  <span className="block text-[11px] text-slate-600 mt-0.5 leading-relaxed">{doc.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. VISA INFORMATION TABLE */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm overflow-hidden">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-black text-red-600 uppercase tracking-widest block">
              দ্রুত এক নজরে
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Visa Information Table
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-extrabold border-b border-slate-200">
                  <th className="p-3.5">Country</th>
                  <th className="p-3.5">Visa Type</th>
                  <th className="p-3.5">Processing Time</th>
                  <th className="p-3.5">Validity</th>
                  <th className="p-3.5">Requirement Note</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visaInfoTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-extrabold text-slate-900">{row.country}</td>
                    <td className="p-3.5 font-bold text-amber-700">{row.type}</td>
                    <td className="p-3.5 font-medium text-slate-700">{row.time}</td>
                    <td className="p-3.5 text-slate-700">{row.validity}</td>
                    <td className="p-3.5 text-slate-500">{row.note}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => onSelectCountry && onSelectCountry(row.countryId)}
                        className="px-3 py-1 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 hover:border-red-600 rounded-lg text-[11px] font-bold transition-all cursor-pointer"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. PROCESSING TIME CATEGORIES */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-black text-red-600 uppercase tracking-widest block">
              সময়সীমা গাইড
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Processing Time Breakdown
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {speedCategories.map((c, idx) => (
              <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${c.badge}`}>
                    {c.speed}
                  </span>
                  <span className="text-xs font-bold text-slate-900">{c.time}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{c.countries}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. WHY CHOOSE DREAMS FLY (8 points) */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-red-600 uppercase tracking-widest block">
              কেন আমরা সেরা
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Why Choose Dreams Fly International?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3 hover:border-red-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 10. REJECTION REASONS vs SOLUTIONS */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-red-600 uppercase tracking-widest block">
              ঝুঁকি কমানোর কৌশল
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Visa Rejection Reasons & Our Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rejections */}
            <div className="bg-red-50/60 p-6 rounded-3xl border border-red-200 space-y-4">
              <div className="flex items-center space-x-2 text-red-700 font-extrabold text-sm border-b border-red-200 pb-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3>সাধারন ভিসা রিজেকশনের প্রধান কারণসমূহ</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700">
                {rejectionReasons.map((r, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="bg-emerald-50/60 p-6 rounded-3xl border border-emerald-200 space-y-4">
              <div className="flex items-center space-x-2 text-emerald-800 font-extrabold text-sm border-b border-emerald-200 pb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3>Dreams Fly এর কার্যকর সল্যুশন ও গ্যারান্টি প্রসেস</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700">
                {approvalSolutions.map((s, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 11. SEO QUICK LINKS */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
          <span className="text-xs font-black text-red-600 uppercase tracking-widest block">
            জনপ্রিয় কান্ট্রি পেজ
          </span>
          <div className="flex flex-wrap gap-2">
            {seoCountryLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => onSelectCountry && onSelectCountry(link.id)}
                className="px-3.5 py-2 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 border border-slate-200 rounded-xl text-xs font-medium transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>
        </section>

        {/* 12. PREMIUM FEATURES GRID */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-black text-red-600 uppercase tracking-widest block">
              ডিজিটাল সুবিধা
            </span>
            <h2 className="text-xl font-black text-slate-900">
              Premium Portal Features
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {premiumFeatures.map((f, i) => (
              <div
                key={i}
                onClick={f.action || (f.toolKey ? () => setActiveInteractiveTool(f.toolKey!) : undefined)}
                className={`p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5 transition-all ${
                  f.action || f.toolKey ? 'hover:border-red-400 cursor-pointer hover:shadow-md' : ''
                }`}
              >
                <h3 className="text-xs font-bold text-slate-900">{f.title}</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 13. FAQ ACCORDION */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-red-600 uppercase tracking-widest block">
              সাধারণ প্রশ্নাবলী
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Frequently Asked Questions (FAQ)
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 sm:p-5 text-xs sm:text-sm font-bold text-slate-900 flex items-center justify-between cursor-pointer hover:bg-slate-100/80 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${openFaqIndex === index ? 'rotate-180 text-red-600' : ''}`} />
                </button>
                {openFaqIndex === index && (
                  <div className="px-4 pb-5 pt-1 text-xs text-slate-600 border-t border-slate-200/60 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 14. BOTTOM CTA BANNER */}
        <section className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-6 overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black tracking-wider uppercase backdrop-blur-md">
              Start Your Journey Today
            </span>
            <h2 className="text-2xl sm:text-4xl font-black leading-tight">
              আজই আপনার ভিসা প্রসেসিং শুরু করতে আমাদের সাথে যোগাযোগ করুন
            </h2>
            <p className="text-xs sm:text-sm text-red-100 max-w-xl mx-auto">
              আমাদের অভিজ্ঞ ইমিগ্রেশন ও ভিসা কনসালটেন্ট টিম আপনাকে বিনামূল্যে গাইড করতে প্রস্তুত।
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onOpenBookingModal('ভিসা পরামর্শ')}
                className="px-8 py-4 bg-white text-red-700 hover:bg-slate-100 font-black rounded-xl text-xs uppercase tracking-wider shadow-2xl transition-all cursor-pointer flex items-center space-x-2"
              >
                <PhoneCall className="w-4 h-4 text-red-600" />
                <span>Book Free Appointment</span>
              </button>

              <button
                onClick={() => handleWhatsApp('আসসালামু আলাইকুম, আমি অনলাইন ভিসা কনসালটেশন পেতে চাই।')}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-2xl transition-all cursor-pointer flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Consultant</span>
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
