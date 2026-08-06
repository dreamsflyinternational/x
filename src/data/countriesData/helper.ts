import { CountryData } from '../../types';

export function createCountry(data: {
  id: string;
  name: string;
  code: string;
  region: 'Europe' | 'Americas' | 'Middle East' | 'Asia' | 'Oceania' | 'Africa';
  flag: string;
  capital: string;
  currency: string;
  successRate?: number;
  processingTime?: string;
  startingCostBDT?: number;
  startingCostUSD?: number;
  overview?: string;
  image?: string;
  heroImage?: string;
  popularVisaTypes?: string[];
  visaRequirements?: Record<string, {
    eligibility: string[];
    validity: string;
    stayDuration: string;
    interviewRequired: boolean;
    financialProof: string;
  }>;
  requiredDocuments?: { category: string; items: string[] }[];
  embassyInfo?: {
    name: string;
    address: string;
    phone: string;
    email: string;
    appointmentWebsite: string;
    openingHours: string;
  };
  faqs?: { question: string; answer: string }[];
}): CountryData {
  const defaultDocs = [
    {
      category: 'Personal Documents',
      items: [
        'Original Passport with min 6 months validity & prior passports',
        '2 Recent Passport Size Photos (35mm x 45mm, white background)',
        'National ID Card (NID) & Birth Certificate (English translation)',
        'Marriage Certificate (if applicable)'
      ]
    },
    {
      category: 'Financial Documents',
      items: [
        'Bank Statement of last 6 months with Solvency Certificate',
        'Income Tax Return (ITR) & TIN Certificate',
        'Property / Asset documents & valuation'
      ]
    },
    {
      category: 'Professional / Business Documents',
      items: [
        'NOC from employer or Business Trade License',
        'Pay slips (last 6 months) or Company Visiting Card'
      ]
    }
  ];

  const defaultEmbassy = {
    name: `Embassy / High Commission / VFS Center of ${data.name}`,
    address: 'Gulshan / Baridhara Diplomatic Zone, Dhaka, Bangladesh',
    phone: '+880 (2) 988-0000',
    email: `visa@${data.id.replace(/-/g, '')}embassy-dhaka.org`,
    appointmentWebsite: `https://www.vfsglobal.com/${data.id}`,
    openingHours: 'Sunday to Thursday: 9:00 AM - 4:00 PM'
  };

  const defaultFaqs = [
    {
      question: `What is the standard processing time for a ${data.name} visa from Bangladesh?`,
      answer: `Standard visa processing for ${data.name} takes approximately ${data.processingTime || '10 - 20 Working Days'} depending on embassy workload.`
    },
    {
      question: `Is an interview required at the embassy for ${data.name}?`,
      answer: `In most cases, biometrics and document submission are required at VFS / Embassy. An interview may be requested depending on individual file assessment.`
    },
    {
      question: `Can Dreams Fly International help with ${data.name} visa processing?`,
      answer: `Yes! Dreams Fly International provides full file preparation, invitation support, appointment booking, and visa file filing assistance for ${data.name}.`
    }
  ];

  return {
    id: data.id,
    name: data.name,
    code: data.code,
    region: data.region,
    flag: data.flag,
    capital: data.capital,
    currency: data.currency,
    successRate: data.successRate ?? 97.5,
    processingTime: data.processingTime ?? '10 - 20 Working Days',
    startingCostBDT: data.startingCostBDT ?? 18000,
    startingCostUSD: data.startingCostUSD ?? 150,
    overview: data.overview ?? `${data.name} offers great opportunities for travel, business, and study. Dreams Fly International provides complete visa guidance, document verification, and filing services for ${data.name}.`,
    image: data.image ?? 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    heroImage: data.heroImage ?? 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80',
    popularVisaTypes: data.popularVisaTypes ?? ['Tourist Visa', 'Business Visa', 'Student Visa', 'Work Permit'],
    visaRequirements: data.visaRequirements ?? {
      'Tourist Visa': {
        eligibility: ['Valid Passport', 'Minimum bank balance BDT 500,000+', 'Proof of employment or business'],
        validity: '30 Days to 1 Year',
        stayDuration: 'Up to 30 Days per visit',
        interviewRequired: false,
        financialProof: 'Last 6 Months Bank Statement & Solvency'
      },
      'Business Visa': {
        eligibility: ['Invitation letter from company in ' + data.name, 'Bangladeshi trade license / company NOC', 'Solvent bank account'],
        validity: '90 Days to 1 Year',
        stayDuration: '30 Days per entry',
        interviewRequired: false,
        financialProof: 'Company Bank Statement last 6 months'
      }
    },
    requiredDocuments: data.requiredDocuments ?? defaultDocs,
    embassyInfo: data.embassyInfo ?? defaultEmbassy,
    faqs: data.faqs ?? defaultFaqs
  };
}
