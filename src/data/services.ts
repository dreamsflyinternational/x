import { VisaServiceData } from '../types';

export const SERVICES: VisaServiceData[] = [
  {
    id: 'air-ticket-booking',
    title: 'Air Ticket Booking',
    category: 'Flight Services',
    iconName: 'Plane',
    shortDesc: 'Instant domestic & international flight reservations with exclusive GDS fares, group discounts, and 24/7 date change support.',
    fullDesc: 'Dreams Fly International connects you directly to SABRE, AMADEUS, and GALILEO global distribution networks. We offer competitive rates on Emirates, Qatar Airways, Biman Bangladesh, Singapore Airlines, Saudia, Kuwait Airways, Turkish Airlines, and all major low-cost carriers.',
    processingDays: 'Instant Confirmation',
    startingPriceBDT: 3500,
    features: ['Direct Airline API Rates', 'Group Flight Booking Discounts', 'Free Seat Selection & Meal Preference', '24/7 Emergency Date Change & Cancellation Support', 'Student Baggage Allowance Extensions'],
    popularCountries: ['UAE', 'Saudi Arabia', 'Canada', 'UK', 'USA', 'Malaysia', 'Singapore', 'Thailand']
  },
  {
    id: 'tourist-visa',
    title: 'Tourist Visa Processing',
    category: 'Visa Services',
    iconName: 'Compass',
    shortDesc: 'Comprehensive tourist visa processing with 98.7% approval rate, expert cover letter drafting, and appointment scheduling.',
    fullDesc: 'Whether exploring North America, Schengen Europe, Asia, or the Middle East, our senior visa officers meticulously audit every document to eliminate potential refusal reasons.',
    processingDays: '3 to 20 Days',
    startingPriceBDT: 8500,
    features: ['Document Audit & Gap Analysis', 'Schengen / Embassy Cover Letter Drafting', 'Hotel & Flight Itinerary Vouchers', 'Embassy VFS / Appointment Booking', 'Financial Solvency Structuring Advice'],
    popularCountries: ['Canada', 'Australia', 'UK', 'USA', 'Italy', 'France', 'Japan', 'Thailand', 'UAE']
  },
  {
    id: 'student-visa',
    title: 'Student Visa Consultancy',
    category: 'Education Services',
    iconName: 'GraduationCap',
    shortDesc: 'End-to-end higher education admissions, scholarship guidance, SOP writing, and visa file preparation.',
    fullDesc: 'Study at top-ranked universities in Canada, UK, Australia, USA, Germany, Hungary, and South Korea. From CAS/I-20/LOA procurement to visa interview coaching.',
    processingDays: '15 to 45 Days',
    startingPriceBDT: 25000,
    features: ['University Application & Admission Procurement', 'Plagiarism-Free Personal SOP Writing', 'Scholarship & Blocked Account Guidance', 'Bank Sponsor & Financial File Compilation', 'Embassy Mock Interview Sessions'],
    popularCountries: ['Canada', 'UK', 'Australia', 'USA', 'Germany', 'Hungary', 'South Korea', 'Japan']
  },
  {
    id: 'work-permit',
    title: 'Work Permit Processing',
    category: 'Employment Visas',
    iconName: 'Briefcase',
    shortDesc: 'Authorized work visa processing for skilled labor, professionals, and job seeker permits.',
    fullDesc: 'Process official work permits for Romania, Poland, Croatia, Malta, Portugal, Saudi Arabia, and UAE with verified Ministry of Foreign Affairs (MOFA) attestation.',
    processingDays: '30 to 90 Days',
    startingPriceBDT: 35000,
    features: ['Official Work Authorization Verification', 'Police Clearance MOFA Attestation', 'GAMCA / Embassy Medical Test Coordination', 'VFS & Embassy File Submission', 'Airport Arrival Pickup Setup'],
    popularCountries: ['Romania', 'Poland', 'Croatia', 'Malta', 'Portugal', 'Saudi Arabia', 'UAE', 'Qatar']
  },
  {
    id: 'umrah-hajj',
    title: 'Umrah & Hajj Packages',
    category: 'Religious Tours',
    iconName: 'Moon',
    shortDesc: 'Govt. approved luxury 5-star & economy Umrah packages with near-Haram hotels and Nusuk e-visa handling.',
    fullDesc: 'Fulfill your spiritual journey with Dreams Fly International. We offer tailored Umrah packages featuring 3-Star to 5-Star luxury hotels in Makkah and Madinah, VIP transport, and guided Ziyarah.',
    processingDays: '24 to 72 Hours',
    startingPriceBDT: 135000,
    features: ['Direct Nusuk Saudi Umrah e-Visa Issue', 'Biman / Saudia / US-Bangla Direct Flights', 'Hotels within 100m - 300m of Masjid al-Haram & Masjid an-Nabawi', 'AC Bus Transport in Makkah & Madinah', 'Experienced Scholar / Guide for Ziyarah'],
    popularCountries: ['Saudi Arabia']
  },
  {
    id: 'hotel-booking',
    title: 'Hotel Booking Worldwide',
    category: 'Accommodation',
    iconName: 'Building',
    shortDesc: 'Guaranteed hotel vouchers accepted by all global embassies for visa applications and luxury holiday stays.',
    fullDesc: 'Access over 1,200,000 verified hotel properties globally with instant confirmable booking vouchers.',
    processingDays: 'Instant',
    startingPriceBDT: 2500,
    features: ['Visa-Compliant Prepaid Hotel Vouchers', 'Free Cancellation Options', 'Luxury Resorts & Budget Apartments', 'Special Corporate Travel Rates'],
    popularCountries: ['Canada', 'UK', 'USA', 'Thailand', 'Malaysia', 'UAE', 'Saudi Arabia', 'Italy']
  },
  {
    id: 'travel-insurance',
    title: 'Schengen & Travel Insurance',
    category: 'Protection',
    iconName: 'ShieldCheck',
    shortDesc: 'Official Schengen embassy-approved travel insurance policy with up to €100,000 emergency medical coverage.',
    fullDesc: 'Instant travel insurance policies issued through licensed insurance partners, fully compliant with VFS Global and Schengen requirements.',
    processingDays: '10 Minutes',
    startingPriceBDT: 1800,
    features: ['€30,000 to €100,000 Medical Coverage', 'COVID-19 Hospitalization Protection', 'Flight Delay & Lost Baggage Reimbursement', 'Instant PDF E-Policy Delivery'],
    popularCountries: ['Schengen Area', 'UK', 'USA', 'Canada', 'Australia']
  },
  {
    id: 'document-attestation',
    title: 'Document Attestation & MOFA',
    category: 'Legal Services',
    iconName: 'FileText',
    shortDesc: 'Apostille, Notary Public, Education Ministry, and Ministry of Foreign Affairs (MOFA) attestation services.',
    fullDesc: 'Ensure your birth certificate, marriage certificate, police clearance, and academic transcripts are legally recognized worldwide.',
    processingDays: '3 to 7 Days',
    startingPriceBDT: 1500,
    features: ['Notary Public Attestation', 'Education Ministry & Board Verification', 'MOFA Bangladesh Attestation', 'Foreign Embassy Legalization Stamp'],
    popularCountries: ['Romania', 'Poland', 'Portugal', 'Saudi Arabia', 'UAE', 'Qatar', 'UK']
  }
];
