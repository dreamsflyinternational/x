export type ViewType = 
  | 'home'
  | 'about'
  | 'services'
  | 'countries'
  | 'country-detail'
  | 'visa'
  | 'air-tickets'
  | 'airline-detail'
  | 'work-permit'
  | 'umrah-hajj'
  | 'umrah-detail'
  | 'hotel'
  | 'hotel-detail'
  | 'hotels-city'
  | 'tours'
  | 'tour-detail'
  | 'insurance'
  | 'blog'
  | 'blog-detail'
  | 'success-stories'
  | 'faq'
  | 'contact'
  | 'eligibility'
  | 'calculator'
  | 'tracker'
  | 'checklist'
  | 'comparison'
  | 'ai-planner'
  | 'dashboard'
  | 'admin'
  | 'privacy'
  | 'sitemap';

export interface CountryData {
  id: string;
  name: string;
  code: string;
  region: 'Europe' | 'Americas' | 'Middle East' | 'Asia' | 'Oceania' | 'Africa';
  flag: string;
  image: string;
  heroImage: string;
  capital: string;
  currency: string;
  successRate: number;
  processingTime: string;
  startingCostBDT: number;
  startingCostUSD: number;
  overview: string;
  popularVisaTypes: string[];
  visaRequirements: Record<string, {
    eligibility: string[];
    validity: string;
    stayDuration: string;
    interviewRequired: boolean;
    financialProof: string;
  }>;
  requiredDocuments: {
    category: string;
    items: string[];
  }[];
  embassyInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    appointmentWebsite: string;
    openingHours: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface VisaServiceData {
  id: string;
  title: string;
  category: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  processingDays: string;
  startingPriceBDT: number;
  features: string[];
  popularCountries: string[];
}

export interface TourPackageData {
  id: string;
  title: string;
  destination: string;
  country: string;
  category: 'Family' | 'Honeymoon' | 'Group' | 'Corporate' | 'Umrah' | 'Hajj';
  duration: string;
  nights: number;
  days: number;
  priceBDT: number;
  priceUSD: number;
  originalPriceBDT?: number;
  rating: number;
  reviewsCount: number;
  featuredImage: string;
  inclusions: string[];
  highlights: string[];
  itinerarySummary: { day: number; title: string; desc: string }[];
}

export interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  authorRole: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
}

export interface SuccessStoryData {
  id: string;
  clientName: string;
  destination: string;
  visaType: string;
  processingDays: number;
  date: string;
  quote: string;
  avatar: string;
  visaStampImage: string;
  rating: number;
}

export interface ApplicationStatusData {
  id: string;
  applicantName: string;
  country: string;
  visaType: string;
  submissionDate: string;
  status: string;
  progressPercent: number;
  estimatedCompletion: string;
  assignedConsultant: string;
  passportNumber: string;
  embassyReference: string;
  timeline: {
    step: string;
    date: string;
    completed: boolean;
    note: string;
  }[];
}

export interface InquiryFormData {
  type: string;
  name: string;
  phone: string;
  email: string;
  service?: string;
  country?: string;
  date?: string;
  travelersCount?: number;
  notes?: string;
}
