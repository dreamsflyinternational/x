export interface AirlineRoute {
  destination: string;
  destinationBn: string;
  origin: string;
  duration: string;
  frequency: string;
  priceBDT: number;
  priceUSD: number;
  baggage: string;
  isDirect: boolean;
}

export interface AirlineCabinClass {
  name: string;
  nameBn: string;
  seatPitch: string;
  baggage: string;
  features: string[];
}

export interface AirlineData {
  id: string;
  name: string;
  nameBn: string;
  code: string;
  countryId: string;
  badge: string;
  taglineBn: string;
  rating: number;
  reviewsCount: number;
  heroImage: string;
  logoColor: string;
  overviewBn: string;
  hub: string;
  fleetSize: string;
  destinationsCount: string;
  baggagePolicy: {
    economyChecked: string;
    economyCabin: string;
    businessChecked: string;
    businessCabin: string;
    extraBaggageNotes: string;
  };
  cabinClasses: AirlineCabinClass[];
  popularRoutes: AirlineRoute[];
  specialFeaturesBn: string[];
  cancellationPolicyBn: string;
  officeInfo: {
    address: string;
    phone: string;
    email: string;
    location: string;
  };
  faqs: { question: string; answer: string }[];
}

export const ALL_AIRLINES: AirlineData[] = [
  {
    id: 'emirates',
    name: 'Emirates Airlines',
    nameBn: 'ইমিরেটস এয়ারলাইনস',
    code: 'EK',
    countryId: 'uae',
    badge: '5-Star Luxury',
    taglineBn: 'বিশ্বমানের লাক্সারি ৫-স্টার কেবিন সার্ভিস ও গ্লোবাল কানেক্টিভিটি',
    rating: 4.9,
    reviewsCount: 1420,
    heroImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    logoColor: 'from-red-600 to-red-700',
    hub: 'Dubai International Airport (DXB), UAE',
    fleetSize: '260+ Wide-body Aircraft (A380 & Boeing 777)',
    destinationsCount: '150+ Destinations (6 Continents)',
    overviewBn: 'ইমিরেটস হলো সংযুক্ত আরব আমিরাতের দুবাই ভিত্তিক বিশ্ববিখ্যাত ৫-স্টার প্রিমিয়াম এয়ারলাইন। ঢাকা (DAC) থেকে প্রতিদিন দুবাই হয়ে ইউরোপ, আমেরিকা, কানাডা, মধ্যপ্রাচ্য ও আফ্রিকায় শত শত ওয়ান-স্টপ ফ্লাইট পরিচালনা করে। বিশ্ববিখ্যাত ice ইন-ফ্লাইট এন্টারটেইনমেন্ট, ১০০% হালাল ক্যাটারিং এবং বিলাসবহুল সেবার জন্য ইমিরেটস বাংলাদেশি যাত্রীদের মাঝে অত্যন্ত জনপ্রিয়।',
    baggagePolicy: {
      economyChecked: '25 - 35 kg (টিকিট ফেয়ার ক্লাস অনুযায়ী)',
      economyCabin: '7 kg (1 Piece max)',
      businessChecked: '40 kg (2 Pieces max 32 kg each)',
      businessCabin: '14 kg (2 Pieces)',
      extraBaggageNotes: 'শিক্ষার্থীদের জন্য অতিরিক্ত ১০ কেজি স্পেশাল স্টুডেন্ট ব্যাগেজ এলাউন্স দেওয়া হয়।'
    },
    cabinClasses: [
      {
        name: 'Economy Class',
        nameBn: 'ইকোনমি ক্লাস',
        seatPitch: '32-34 inches with ergonomic recline',
        baggage: '30 kg checked + 7 kg cabin',
        features: ['6,500+ চ্যানেলের ice টিভি', '১০০% গ্যারান্টিড হালাল খাবার ও পানীয়', 'ইন-সিট পাওয়ার ও ইউএসবি চার্জিং', 'ফ্রি ওয়াইফাই মেসেজিং']
      },
      {
        name: 'Premium Economy Class',
        nameBn: 'প্রিমিয়াম ইকোনমি ক্লাস',
        seatPitch: '40 inches with legrest & footrest',
        baggage: '35 kg checked + 10 kg cabin',
        features: ['অতিরিক্ত লেগরুম ও চামড়ার সিট', 'প্রোডাক্ট ওয়েলকাম ড্রিংকস', 'লক্সারি উডেন ডাইনিং ট্রে', 'প্রিমিয়াম এয়ারপোর্ট চেক-ইন Priority']
      },
      {
        name: 'Business Class',
        nameBn: 'বিজনেস ক্লাস',
        seatPitch: 'Flat-bed seat (78 inches full lie-flat)',
        baggage: '40 kg checked + 14 kg cabin',
        features: ['লাই-ফ্ল্যাট বেড সিট', 'অন-বোর্ড লাউঞ্জ ও বার (A380)', 'বুলগারি অ্যামেনিটি কিট', 'এয়ারপোর্ট লাউঞ্জ অ্যাক্সেস']
      }
    ],
    popularRoutes: [
      {
        destination: 'Dubai (DXB)',
        destinationBn: 'ঢাকা → দুবাই',
        origin: 'Dhaka (DAC)',
        duration: '4 hours 45 mins',
        frequency: 'Daily 3 Direct Flights',
        priceBDT: 38500,
        priceUSD: 350,
        baggage: '30 kg',
        isDirect: true
      },
      {
        destination: 'London Heathrow (LHR)',
        destinationBn: 'ঢাকা → লন্ডন (দুবাই হয়ে)',
        origin: 'Dhaka (DAC)',
        duration: '13 hours 30 mins',
        frequency: 'Daily Flights',
        priceBDT: 85000,
        priceUSD: 770,
        baggage: '30 kg',
        isDirect: false
      },
      {
        destination: 'Toronto (YYZ)',
        destinationBn: 'ঢাকা → টরোন্টো (দুবাই হয়ে)',
        origin: 'Dhaka (DAC)',
        duration: '18 hours 15 mins',
        frequency: 'Daily Flights',
        priceBDT: 125000,
        priceUSD: 1130,
        baggage: '2 Pieces (23kg each)',
        isDirect: false
      },
      {
        destination: 'New York (JFK)',
        destinationBn: 'ঢাকা → নিউ ইয়র্ক (দুবাই হয়ে)',
        origin: 'Dhaka (DAC)',
        duration: '17 hours 45 mins',
        frequency: 'Daily Flights',
        priceBDT: 115000,
        priceUSD: 1040,
        baggage: '2 Pieces (23kg each)',
        isDirect: false
      }
    ],
    specialFeaturesBn: [
      'ঢাকা থেকে সরাসরি দুবাই এবং বিশ্বব্যাপী মসৃণ কানেক্টিভিটি',
      'শিক্ষার্থীদের জন্য বিশেষ ডিসকাউন্ট ও ১০ কেজি অতিরিক্ত ব্যাগেজ ছাড়',
      'উমরাহ যাত্রীদের জন্য বিনামূল্যে ৫ লিটার জমজমের পানি বহন সুবিধা',
      '২৪ ঘণ্টা বিনামূল্যে রিশিডিউলিং সহায়তাসহ গ্যারান্টিড ফেয়ার'
    ],
    cancellationPolicyBn: 'ফ্লাইটের ২৪ ঘণ্টা আগে ক্যানসেল করলে এয়ারলাইন্স রুলস অনুযায়ী স্ট্যান্ডার্ড পেনাল্টি চার্জ কেটে রিফান্ড প্রদান করা হয়। Dreams Fly-এর মাধ্যমে রিশিডিউলিং বা রিকনফার্মেশন অত্যন্ত দ্রুত প্রসেস করা হয়।',
    officeInfo: {
      address: 'Gulshan-1, Dhaka & Hazrat Shahjalal International Airport Counter',
      phone: '+8801771304219',
      email: 'flights@dreamsfly.com.bd',
      location: 'Dhaka, Bangladesh'
    },
    faqs: [
      {
        question: 'ঢাকা থেকে ইমিরেটসের সরাসরি ফ্লাইট কয়টি?',
        answer: 'ঢাকা হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর (DAC) থেকে প্রতিদিন ৩টি সরাসরি ফ্লাইট দুবাই (DXB) রুটে পরিচালিত হয়।'
      },
      {
        question: 'ইমিরেটসে কত কেজি ব্যাগেজ বহন করা যায়?',
        answer: 'সাধারণ ইকোনমি টিকিটে ৩০ কেজি চেকড ব্যাগেজ এবং ৭ কেজি কেবিন ব্যাগেজ এলাউড। টিকিট ক্লাসের উপর নির্ভর করে এটি ৩৫ কেজিও হতে পারে।'
      },
      {
        question: 'শিক্ষার্থীদের কি অতিরিক্ত ব্যাগেজ দেওয়া হয়?',
        answer: 'হ্যাঁ, বৈvalid স্টুডেন্ট আইডি ও ভিসা থাকলে ইমিরেটসে অতিরিক্ত ১০ কেজি ফ্রিতে পাওয়া যায়।'
      }
    ]
  },
  {
    id: 'qatar-airways',
    name: 'Qatar Airways',
    nameBn: 'কাতার এয়ারওয়েজ',
    code: 'QR',
    countryId: 'qatar',
    badge: 'World\'s Best Airline',
    taglineBn: 'দোহা হামাদ হাব হয়ে আমেরিকা, ইউরোপ ও বিশ্বব্যাপী দ্রুততম ট্রান্সফার',
    rating: 5.0,
    reviewsCount: 1280,
    heroImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    logoColor: 'from-purple-800 to-purple-900',
    hub: 'Hamad International Airport (DOH), Doha, Qatar',
    fleetSize: '250+ Modern Aircraft (A350, Boeing 787 Dreamliner & 777)',
    destinationsCount: '170+ Global Destinations',
    overviewBn: 'কাতার এয়ারওয়েজ একাধিকবার Skytrax কর্তৃক বিশ্বসেরা এয়ারলাইন হিসেবে ভূষিত হয়েছে। দোহার অত্যাধুনিক হামাদ আন্তর্জাতিক বিমানবন্দর (DOH) হাবের মাধ্যমে ঢাকা থেকে যুক্তরাষ্ট্র, যুক্তরাজ্য, কানাডা, ইউরোপ ও আফ্রিকায় বিশ্বসেরা কমফোর্ট নিশ্চিত করে। বাংলাদেশি প্রবাসী, শিক্ষার্থী ও ব্যবসায়ীদের কাছে কাতার এয়ারওয়েজ অত্যন্ত ভরসাযোগ্য।',
    baggagePolicy: {
      economyChecked: '25 - 30 kg (Piece concept in USA/Canada: 2x23kg)',
      economyCabin: '7 kg (1 Piece)',
      businessChecked: '40 kg (Piece concept: 2x32kg)',
      businessCabin: '15 kg (2 Pieces)',
      extraBaggageNotes: 'স্টুডেন্ট ক্লাব মেম্বারদের জন্য অতিরিক্ত ১০ কেজি এবং বিনামূল্যে ডেট চেঞ্জ সুবিধা।'
    },
    cabinClasses: [
      {
        name: 'Economy Class',
        nameBn: 'ইকোনমি ক্লাস',
        seatPitch: '31-33 inches with wide reclining angle',
        baggage: '30 kg checked + 7 kg cabin',
        features: ['Oryx One ইন-ফ্লাইট বিনোদন (৪০০০+ শো)', 'সুস্বাদু Gourmet হালাল মিল', 'হাই-স্পিড সুপার-ওয়াইফাই', 'ইউএসবি চার্জিং অ্যান্ড পাওয়ার পোর্ট']
      },
      {
        name: 'Qsuite Business Class',
        nameBn: 'কিউসুইট বিজনেস ক্লাস (বিশ্বসেরা)',
        seatPitch: 'Private suite with sliding door & fully flat double bed',
        baggage: '40 kg checked + 15 kg cabin',
        features: ['স্লাইডিং ডোরসহ প্রাইভেট সুইট', 'ডাবল বেড কনফিগারেশন', 'Diptyque প্যারিস অ্যামেনিটি', 'হামাদ এয়ারপোর্ট আল মারজান লাউঞ্জ']
      }
    ],
    popularRoutes: [
      {
        destination: 'Doha (DOH)',
        destinationBn: 'ঢাকা → দোহা',
        origin: 'Dhaka (DAC)',
        duration: '4 hours 30 mins',
        frequency: 'Daily 3 Direct Flights',
        priceBDT: 42000,
        priceUSD: 380,
        baggage: '30 kg',
        isDirect: true
      },
      {
        destination: 'London (LHR)',
        destinationBn: 'ঢাকা → লন্ডন (দোহা হয়ে)',
        origin: 'Dhaka (DAC)',
        duration: '13 hours 45 mins',
        frequency: 'Daily Flights',
        priceBDT: 88000,
        priceUSD: 795,
        baggage: '30 kg',
        isDirect: false
      },
      {
        destination: 'New York (JFK)',
        destinationBn: 'ঢাকা → নিউ ইয়র্ক (দোহা হয়ে)',
        origin: 'Dhaka (DAC)',
        duration: '18 hours 00 mins',
        frequency: 'Daily Flights',
        priceBDT: 118000,
        priceUSD: 1060,
        baggage: '2 Pieces (23kg each)',
        isDirect: false
      },
      {
        destination: 'Rome (FCO)',
        destinationBn: 'ঢাকা → রোম (দোহা হয়ে)',
        origin: 'Dhaka (DAC)',
        duration: '12 hours 30 mins',
        frequency: 'Daily Flights',
        priceBDT: 68000,
        priceUSD: 615,
        baggage: '30 kg',
        isDirect: false
      }
    ],
    specialFeaturesBn: [
      'দোহা হামাদ এয়ারপোর্টে বিলাসবহুল ট্রানজিট ও ফ্রি সিটি ট্যুর সুবিধা',
      'স্টুডেন্ট ক্লাসে জয়েন করলে অতিরিক্ত ১০ কেজি ব্যাগেজ ও ফ্রি ডেট চেঞ্জ',
      'প্রি-অর্ডারড হালাল চাইল্ড ও স্পেশাল ডায়েট মিল সার্ভিস',
      'আমেরিকা ও ইউরোপের দ্রুততম কানেক্টিভিটি হাব'
    ],
    cancellationPolicyBn: 'টিকেট ইস্যুর পর ক্যানসেলেশন ও রিশিডিউলিং নিয়মাবলী ফেয়ার ক্যাটাগরি অনুসারে প্রযোজ্য। নো-শো পেনাল্টি এড়াতে যাত্রার ২৪ ঘণ্টা আগে Dreams Fly টিমকে অবহিত করুন।',
    officeInfo: {
      address: 'Banani & Airport Sales Counter, Dhaka',
      phone: '+8801771304219',
      email: 'flights@dreamsfly.com.bd',
      location: 'Dhaka, Bangladesh'
    },
    faqs: [
      {
        question: 'কাতার এয়ারওয়েজে ইউএসএ/কানাডার জন্য লাগেজ লিমিট কত?',
        answer: 'উত্তর আমেরিকা রুটে সাধারণত ২টি ব্যাগ (প্রতিটি সর্বোচ্চ ২৩ কেজি) ফ্রিতে বহন করা যায়।'
      },
      {
        question: 'দোহায় লং ট্রানজিট হলে হোটেল পাওয়া যায়?',
        answer: '৮ ঘণ্টার বেশি ট্রানজিট থাকলে কাতার এয়ারওয়েজের ট্রানজিট একমোডেশন প্যাকেজ বুকিং দেওয়া সম্ভব।'
      }
    ]
  },
  {
    id: 'biman-bangladesh',
    name: 'Biman Bangladesh Airlines',
    nameBn: 'বিমান বাংলাদেশ এয়ারলাইনস',
    code: 'BG',
    countryId: 'bangladesh',
    badge: 'National Carrier',
    taglineBn: 'বাংলাদেশের জাতীয় পতাকাবাহী এয়ারলাইনস – নন-স্টপ ডাইরেক্ট ফ্লাইট',
    rating: 4.6,
    reviewsCount: 2150,
    heroImage: 'https://images.unsplash.com/photo-1519074069444-1ba4edd16be1?auto=format&fit=crop&w=1200&q=80',
    logoColor: 'from-emerald-700 to-emerald-800',
    hub: 'Hazrat Shahjalal International Airport (DAC), Dhaka',
    fleetSize: '21 Modern Aircraft (Boeing 787 Dreamliner, 777-300ER, 737-800)',
    destinationsCount: '23 International & Domestic Cities',
    overviewBn: 'বিমান বাংলাদেশ এয়ারলাইনস বাংলাদেশের একমাত্র জাতীয় পতাকাবাহী রাষ্ট্রীয় বিমান সংস্থা। ঢাকা, সিলেট ও চট্টগ্রাম থেকে সরাসরি লন্ডন, টরোন্টো, রোম, টোকিও, জেদ্দা, মদিনা, রিয়াদ, দুবাই, গুয়াংজু, ব্যাংকক ও কুয়ালালামপুরে বোয়িং ৭৮৭ ড্রিমলাইনার দিয়ে নন-স্টপ ফ্লাইট পরিচালনা করে। যাত্রীদের জন্য বেশি ব্যাগেজ এলাউন্স ও বাংলা ভাষার অন-বোর্ড সার্ভিসই বিমানের মূল আকর্ষণ।',
    baggagePolicy: {
      economyChecked: '30 - 35 kg (2 Pieces allowed on UK/USA/Canada)',
      economyCabin: '7 kg (1 Piece max)',
      businessChecked: '40 - 45 kg (2 Pieces)',
      businessCabin: '10 kg (1 Piece)',
      extraBaggageNotes: 'লন্ডন, রোম ও টরোন্টো রুটে অতিরিক্ত ওজনের জন্য অত্যন্ত সাশ্রয়ী হার রয়েছে।'
    },
    cabinClasses: [
      {
        name: 'Economy Class',
        nameBn: 'ইকোনমি ক্লাস',
        seatPitch: '31-32 inches in Dreamliner 787',
        baggage: '35 kg checked + 7 kg cabin',
        features: ['অফিসিয়াল বাংলা সার্ভিস ও ক্রু', 'দেশীয় রন্ধনশৈলীর সুস্বাদু গরম খাবার', 'ইন-ফ্লাইট পার্সোনাল স্ক্রিন মিউজিক ও সিনেমা', 'উমরাহ যাত্রীদের বিশেষ সেবা']
      },
      {
        name: 'Business Class',
        nameBn: 'বিজনেস ক্লাস',
        seatPitch: '74 inches Lie-Flat Seats in Dreamliner',
        baggage: '45 kg checked + 10 kg cabin',
        features: ['লাই-ফ্ল্যাট আরামদায়ক সিট', 'ভিআইপি এয়ারপোর্ট লাউঞ্জ সুবিধা', 'প্রিমিয়াম বাংলা ও কন্টিনেন্টাল খাবার', 'ফাস্ট-ট্র্যাক ইমিগ্রেশন ও চেক-ইন']
      }
    ],
    popularRoutes: [
      {
        destination: 'London (LHR)',
        destinationBn: 'ঢাকা / সিলেট → লন্ডন (সরাসরি)',
        origin: 'Dhaka (DAC) / Sylhet (ZYL)',
        duration: '10 hours 30 mins (Non-stop)',
        frequency: 'Daily Direct Flights',
        priceBDT: 85000,
        priceUSD: 770,
        baggage: '35 kg / 2 Pcs',
        isDirect: true
      },
      {
        destination: 'Toronto (YYZ)',
        destinationBn: 'ঢাকা → টরোন্টো (ডাইরেক্ট ৭৮৭ ড্রিমলাইনার)',
        origin: 'Dhaka (DAC)',
        duration: '16 hours 15 mins (Direct)',
        frequency: '3 Weekly Flights',
        priceBDT: 125000,
        priceUSD: 1130,
        baggage: '2 Pieces (23kg each)',
        isDirect: true
      },
      {
        destination: 'Rome (FCO)',
        destinationBn: 'ঢাকা → রোম (সরাসরি ফ্লাইট)',
        origin: 'Dhaka (DAC)',
        duration: '9 hours 45 mins (Non-stop)',
        frequency: '3 Weekly Flights',
        priceBDT: 65000,
        priceUSD: 590,
        baggage: '30 kg',
        isDirect: true
      },
      {
        destination: 'Jeddah (JED)',
        destinationBn: 'ঢাকা / চট্টগ্রাম → জেদ্দা (হাজ্জ ও উমরাহ)',
        origin: 'Dhaka (DAC)',
        duration: '6 hours 15 mins (Direct)',
        frequency: 'Daily Direct Flights',
        priceBDT: 45000,
        priceUSD: 410,
        baggage: '30 kg + 5L Zamzam',
        isDirect: true
      }
    ],
    specialFeaturesBn: [
      'লন্ডন, টরোন্টো, রোম ও টোকিও রুটে সম্পূর্ণ নন-স্টপ ডাইরেক্ট ফ্লাইট',
      'বাংলা ভাষাভাষী বিনয়ী ও আন্তরিক কেবিন ক্রু সার্ভিস',
      'উমরাহ যাত্রীদের ফ্রিতে ৫ লিটার জমজমের পানি বহন করার নিয়ম',
      'প্রবাসী শ্রমিকদের জন্য সুলভ মূল্যে টিকেট কাটার সুযোগ'
    ],
    cancellationPolicyBn: 'বিমান বাংলাদেশ এয়ারলাইনসের টিকেট বাতিলের জন্য নিয়মাবলী বেশ সহজ। ডেট চেইঞ্জ ও রিফান্ড রিকোয়েস্ট Dreams Fly-এর অফিশিয়াল হেল্পডেস্কে কল দিয়ে তাৎক্ষণিক সম্পাদন করতে পারবেন।',
    officeInfo: {
      address: 'Balaka Bhaban, Kurmitola & Dreams Fly Sales Counter',
      phone: '+8801771304219',
      email: 'biman@dreamsfly.com.bd',
      location: 'Dhaka, Bangladesh'
    },
    faqs: [
      {
        question: 'ঢাকা থেকে সিলেটে হয়ে লন্ডনে সরাসরি বিমান যায়?',
        answer: 'হ্যাঁ, বিমান বাংলাদেশ প্রতিদিন ঢাকা ও সিলেট বিমানবন্দর থেকে লন্ডনের হিথ্রোতে সরাসরি ড্রিমলাইনার ফ্লাইট পরিচালনা করে।'
      },
      {
        question: 'টরোন্টো ফ্লাইটে কয়টি ব্যাগ নেওয়া যায়?',
        answer: 'ইকোনমি ক্লাসে ২টি ব্যাগ (প্রতিটি সর্বোচ্চ ২৩ কেজি) এবং বিজনেস ক্লাসে ২টি ব্যাগ (প্রতিটি ৩২ কেজি) এলাউড।'
      }
    ]
  },
  {
    id: 'us-bangla',
    name: 'US-Bangla Airlines',
    nameBn: 'ইউএস-বাংলা এয়ারলাইনস',
    code: 'BS',
    countryId: 'bangladesh',
    badge: 'Popular Choice',
    taglineBn: 'বাংলাদেশের শীর্ষস্থানীয় প্রাইভেট এয়ারলাইন – সর্বোচ্চ সময়ানুবর্তিতা',
    rating: 4.8,
    reviewsCount: 1890,
    heroImage: 'https://images.unsplash.com/photo-1524592714635-d77511a4834d?auto=format&fit=crop&w=1200&q=80',
    logoColor: 'from-blue-700 to-indigo-800',
    hub: 'Hazrat Shahjalal International Airport (DAC), Dhaka',
    fleetSize: '24+ Aircraft (Airbus A330-300, Boeing 737-800, ATR 72-600)',
    destinationsCount: '12 International & Domestic Destinations',
    overviewBn: 'ইউএস-বাংলা এয়ারলাইনস বাংলাদেশের বৃহত্তম এবং সবচেয়ে নির্ভরযোগ্য বেসরকারি বিমান সংস্থা। অভ্যন্তরীণ রুটের পাশাপাশি দুবাই, শারজাহ, আবু ধাবি, দোহার মতো মধ্যপ্রাচ্যের গুরুত্বপূর্ণ শহর এবং ব্যাংকক, সিঙ্গাপুর, গুয়াংজু ও চেন্নাইতে ওয়াইড-বডি এয়ারবাস A330 দিয়ে চমৎকার সেবায় সরাসরি ফ্লাইট পরিচালনা করে। অন-টাইম ফ্লাইট ডিপারচারের জন্য ইউএস-বাংলা খ্যাত।',
    baggagePolicy: {
      economyChecked: '25 - 30 kg Checked Baggage',
      economyCabin: '7 kg Cabin Baggage',
      businessChecked: '35 - 40 kg Checked Baggage',
      businessCabin: '10 kg Cabin Baggage',
      extraBaggageNotes: 'মেডিকেল যাত্রীদের জন্য চেন্নাই ও ব্যাংকক রুটে বিশেষ লাগেজ ডিসকাউন্ট সুবিধা রয়েছে।'
    },
    cabinClasses: [
      {
        name: 'Economy Class',
        nameBn: 'ইকোনমি ক্লাস',
        seatPitch: '30-32 inches comfortable seating',
        baggage: '30 kg checked + 7 kg cabin',
        features: ['অফিসিয়াল বাংলা খাবার ও নাস্তা', 'বিনয়ী সেবা ও অন-টাইম পারফরম্যান্স', 'আরামদায়ক রিক্লাইনার সিট', 'চেন্নাই মেডিকেল সহায়ক সুবিধা']
      },
      {
        name: 'Business Class (A330 / B737)',
        nameBn: 'বিজনেস ক্লাস',
        seatPitch: 'Plush Leather Lie-Flat & Premium Recliners',
        baggage: '40 kg checked + 10 kg cabin',
        features: ['প্রিমিয়াম কেবিন প্রাইভেসি', 'ভিআইপি লাউঞ্জ সুবিধা', 'স্পেশাল হট মিল কনসেপ্ট', 'প্রায়োরিটি ব্যাগ ট্যাগিং']
      }
    ],
    popularRoutes: [
      {
        destination: 'Dubai (DXB)',
        destinationBn: 'ঢাকা / চট্টগ্রাম → দুবাই',
        origin: 'Dhaka (DAC)',
        duration: '4 hours 50 mins',
        frequency: 'Daily Direct Flights',
        priceBDT: 36500,
        priceUSD: 330,
        baggage: '30 kg',
        isDirect: true
      },
      {
        destination: 'Bangkok (BKK)',
        destinationBn: 'ঢাকা → ব্যাংকক (ডাইরেক্ট)',
        origin: 'Dhaka (DAC)',
        duration: '2 hours 30 mins',
        frequency: '5 Weekly Flights',
        priceBDT: 27900,
        priceUSD: 250,
        baggage: '30 kg',
        isDirect: true
      },
      {
        destination: 'Singapore (SIN)',
        destinationBn: 'ঢাকা → সিঙ্গাপুর',
        origin: 'Dhaka (DAC)',
        duration: '4 hours 00 mins',
        frequency: 'Daily Direct Flights',
        priceBDT: 36500,
        priceUSD: 330,
        baggage: '30 kg',
        isDirect: true
      },
      {
        destination: 'Chennai (MAA)',
        destinationBn: 'ঢাকা → চেন্নাই (মেডিকেল রুট)',
        origin: 'Dhaka (DAC)',
        duration: '2 hours 20 mins',
        frequency: 'Daily Direct Flights',
        priceBDT: 22000,
        priceUSD: 200,
        baggage: '30 kg',
        isDirect: true
      }
    ],
    specialFeaturesBn: [
      '৯৮%+ অন-টাইম ফ্লাইট ডিপারচার রেকর্ড (কোনো রকম অনাকাঙ্ক্ষিত দেরি ছাড়া)',
      'চিকিৎসার জন্য ভারতগামী (চেন্নাই/কলকাতা) যাত্রীদের বিশেষ এয়ারপোর্ট সাপোর্ট',
      'সহজ টিকিট রিশিডিউলিং ও ক্যানসেলেশন পলিসি',
      'প্রি-বুকড সিট সিলেক্টর এবং হট মিলস'
    ],
    cancellationPolicyBn: 'ইউএস-বাংলার টিকেট পরিবর্তন ও বাতিলের ফি খুবই রিজনেবল। ফ্লাইট ছাড়ার ৬ ঘণ্টা আগ পর্যন্ত Dreams Fly-এর সাহায্যে মোবাইল ব্যাংকিং বা কার্ড পেমেন্টের মাধ্যমে খুব সহজে টিকেট প্রসেস করা যায়।',
    officeInfo: {
      address: 'Baridhara & Airport Hub Office, Dhaka',
      phone: '+8801771304219',
      email: 'usbangla@dreamsfly.com.bd',
      location: 'Dhaka, Bangladesh'
    },
    faqs: [
      {
        question: 'ইউএস-বাংলা কি সরাসরি দুবাই ফ্লাইট চালায়?',
        answer: 'হ্যাঁ, ঢাকা এবং চট্টগ্রাম উভয় বিমানবন্দর থেকে ইউএস-বাংলা এয়ারবাস A330 দিয়ে সরাসরি দুবাই ও শারজাহ রুটে ফ্লাইট পরিচালনা করে।'
      },
      {
        question: 'মেডিকেল ট্যুরিস্টদের জন্য কি স্পেশাল সুবিধা আছে?',
        answer: 'চেন্নাই এবং কলকাতা রুটে অসুস্থ ও জ্যেষ্ঠ নাগরিকদের জন্য এয়ারপোর্টে ফ্রিতে হুইলচেয়ার এবং অগ্রাধিকার চেক-ইন দেওয়া হয়।'
      }
    ]
  },
  {
    id: 'saudia',
    name: 'Saudia Airlines',
    nameBn: 'সৌদিয়া অ্যারাবিয়ান এয়ারলাইনস',
    code: 'SV',
    countryId: 'saudi-arabia',
    badge: 'SkyTeam Alliance',
    taglineBn: 'সৌদি আরবের জাতীয় পতাকাবাহী এয়ারলাইন – হজ্ব ও উমরাহের সেরা পছন্দ',
    rating: 4.7,
    reviewsCount: 1650,
    heroImage: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1200&q=80',
    logoColor: 'from-amber-700 to-yellow-800',
    hub: 'King Abdulaziz International Airport (JED), Jeddah & RUH Riyadh',
    fleetSize: '150+ Fleet (Boeing 777-300ER, 787 Dreamliner & A330)',
    destinationsCount: '100+ Global Destinations',
    overviewBn: 'সৌদিয়া (Saudia) সৌদি আরবের জাতীয় পতাকাবাহী বিমান সংস্থা। ঢাকা ও চট্টগ্রাম থেকে সরাসরি জেদ্দা, রিয়াদ ও মদিনায় প্রতিদিন একাধিক ওয়াইড-বডি বোয়িং ফ্লাইট পরিচালনা করে। বিশ্বজুড়ে লক্ষ লক্ষ হাজী ও উমরাহ পালনকারী এবং সৌদি প্রবাসীদের কাছে সৌদিয়ার অন-বোর্ড সালাত স্পেস, ঐতিহ্যবাহী আরবি কফি (কাহওয়া) এবং প্রিমিয়াম সার্ভিস সুপরিচিত।',
    baggagePolicy: {
      economyChecked: '2 Pieces (23 kg each) = Total 46 kg',
      economyCabin: '7 kg Cabin Baggage',
      businessChecked: '2 Pieces (32 kg each) = Total 64 kg',
      businessCabin: '12 kg Cabin Baggage',
      extraBaggageNotes: 'সকল উমরাহ ও হাজী যাত্রীদের জন্য বিনামূল্যে ১ গ্যালন (৫ লিটার) জমজমের পানি পরিবহনের অনুমতি দেওয়া হয়।'
    },
    cabinClasses: [
      {
        name: 'Guest Class (Economy)',
        nameBn: 'গেস্ট ক্লাস (ইকোনমি)',
        seatPitch: '32-34 inches with generous legroom',
        baggage: '2 Pieces (23 kg each) + 7 kg cabin',
        features: ['২টি ব্যাগের সুবিধা (মোট ৪৬ কেজি)', 'অন-বোর্ড প্রার্থনা স্থান (Prayer Area)', 'সুস্বাদু হালাল অ্যারাবিয়ান ও এশিয়ান খাবার', 'ব্যক্তিগত টাচস্ক্রিন বিনোদন']
      },
      {
        name: 'Business Class',
        nameBn: 'বিজনেস ক্লাস',
        seatPitch: 'Fully Lie-Flat Bed with privacy divider',
        baggage: '2 Pieces (32 kg each) + 12 kg cabin',
        features: ['লাই-ফ্ল্যাট বেড সিট', 'আল ফুরসান ভিআইপি লাউঞ্জ অ্যাক্সেস', 'অন-ডিমান্ড অ্যারাবিয়ান কাহওয়া ও খেজুড়', 'প্রিমিয়াম অ্যামেনিটি কিট']
      }
    ],
    popularRoutes: [
      {
        destination: 'Jeddah (JED)',
        destinationBn: 'ঢাকা → জেদ্দা (উমরাহ ডাইরেক্ট)',
        origin: 'Dhaka (DAC)',
        duration: '6 hours 15 mins',
        frequency: 'Daily 2-3 Direct Flights',
        priceBDT: 45000,
        priceUSD: 410,
        baggage: '46 kg (2 Pcs)',
        isDirect: true
      },
      {
        destination: 'Riyadh (RUH)',
        destinationBn: 'ঢাকা → রিয়াদ (ডাইরেক্ট)',
        origin: 'Dhaka (DAC)',
        duration: '5 hours 50 mins',
        frequency: 'Daily Direct Flights',
        priceBDT: 44000,
        priceUSD: 400,
        baggage: '46 kg (2 Pcs)',
        isDirect: true
      },
      {
        destination: 'Medina (MED)',
        destinationBn: 'ঢাকা → মদিনা মনওয়ারা (সরাসরি)',
        origin: 'Dhaka (DAC)',
        duration: '6 hours 30 mins',
        frequency: '4 Weekly Flights',
        priceBDT: 48000,
        priceUSD: 435,
        baggage: '46 kg (2 Pcs)',
        isDirect: true
      }
    ],
    specialFeaturesBn: [
      'ইকোনমি ক্লাসে মোট ৪৬ কেজি (২৩ কেজি × ২টি) বিশাল ব্যাগেজ সুবিধা',
      'বিমান চলাকালীন জামাতে সালাত আদায়ের জন্য ডেডিকেটেড প্রেয়ার এরিয়া',
      'উমরাহ যাত্রীদের জন্য জেদ্দা/মদিনা থেকে ফ্রি জমজমের পানি পরিবহন সুবিধা',
      'সৌদি স্টপওভার ভিসাধারীদের জন্য বিনামূল্যে ৪ দিন ট্রানজিট স্টে'
    ],
    cancellationPolicyBn: 'সৌদিয়া টিকেটের রিফান্ড বা তারিখ পরিবর্তন সংক্রান্ত কাজগুলো খুব সহজেই Dreams Fly এজেন্সির মাধ্যমে কম খরচে সম্পাদন করা যায়।',
    officeInfo: {
      address: 'Panthapath & Airport Sales Desk, Dhaka',
      phone: '+8801771304219',
      email: 'saudia@dreamsfly.com.bd',
      location: 'Dhaka, Bangladesh'
    },
    faqs: [
      {
        question: 'সৌদিয়া এয়ারলাইনে ব্যাগেজ লিমিট কত?',
        answer: 'ইকোনমি ক্লাসের যাত্রীরা ২৩ কেজি ওজনের ২টি ব্যাগ (মোট ৪৬ কেজি) ফ্রিতে চেক-ইন করতে পারেন।'
      },
      {
        question: 'উমরাহ শেষ করে আসার সময় জমজমের পানি নেওয়া যাবে?',
        answer: 'হ্যাঁ, সৌদিয়ার ফ্লাইট কাউন্টারে ৫ লিটারের প্যাক করা জমজমের পানির গ্যালেক্স ফ্রিতে বুক করা যায়।'
      }
    ]
  },
  {
    id: 'singapore-airlines',
    name: 'Singapore Airlines',
    nameBn: 'সিঙ্গাপুর এয়ারলাইনস',
    code: 'SQ',
    countryId: 'singapore',
    badge: 'Premium Excellence',
    taglineBn: 'কিংবদন্তিতুল্য এশিয়ান আতিথেয়তা ও চাঙ্গি হাব কানেক্টিভিটি',
    rating: 4.9,
    reviewsCount: 950,
    heroImage: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=1200&q=80',
    logoColor: 'from-amber-600 to-blue-900',
    hub: 'Singapore Changi Airport (SIN), Singapore',
    fleetSize: '150+ Modern Aircraft (A380, A350-900 & B787-10)',
    destinationsCount: '130+ Global Destinations',
    overviewBn: 'সিঙ্গাপুর এয়ারওয়েজ বিশ্বের অন্যতম সম্মানিত ও পুরস্কৃত এয়ারলাইন। ঢাকা (DAC) থেকে সরাসরি সিঙ্গাপুরের চাঙ্গি বিমানবন্দর (বিশ্বের সেরা বিমানবন্দর) হয়ে অস্ট্রেলিয়া, নিউজিল্যান্ড, জাপান, মার্কিন যুক্তরাষ্ট্র ও দক্ষিণ-পূর্ব এশিয়ায় আন্তর্জাতিক ফ্লাইটের জন্য সুপরিচিত। সিঙ্গাপুর গার্ল কেবিন ক্রু সার্ভিস ও বিশ্বমানের ইন-ফ্লাইট ডাইনিং বিশ্বব্যাপী সমাদৃত।',
    baggagePolicy: {
      economyChecked: '25 - 30 kg Checked Baggage',
      economyCabin: '7 kg Cabin Baggage',
      businessChecked: '40 kg Checked Baggage',
      businessCabin: '2 Pieces (7 kg each)',
      extraBaggageNotes: 'ক্রিসফ্লায়ার (KrisFlyer) মেম্বারদের জন্য অতিরিক্ত ১০-২০ কেজি লাগেজ সুবিধা রয়েছে।'
    },
    cabinClasses: [
      {
        name: 'Economy Class',
        nameBn: 'ইকোনমি ক্লাস',
        seatPitch: '32 inches with adjustable headrest',
        baggage: '30 kg checked + 7 kg cabin',
        features: ['KrisWorld ইন-ফ্লাইট বিনোদন (১৯০০+ আইটেম)', 'আন্তর্জাতিক খ্যাতনামা শেফ দ্বারা প্রস্তুতকৃত হালাল খাবার', 'ফ্রি অন-বোর্ড ওয়াইফাই (KrisFlyer মেম্বারদের)', 'এইচডি মেগাস্কিন টিভি স্ক্রিন']
      },
      {
        name: 'Business Class',
        nameBn: 'বিজনেস ক্লাস',
        seatPitch: '78-inch lie-flat bed with direct aisle access',
        baggage: '40 kg checked + 14 kg cabin',
        features: ['লাই-ফ্ল্যাট বেড উইথ ফাইন কটন লিনেন', 'বুক দ্য শেফ (Book the Chef) ফাইন ডাইনিং', 'সিলভারক্রিস লাউঞ্জ অ্যাক্সেস', 'পেনহালিগনস অ্যামেনিটি কিট']
      }
    ],
    popularRoutes: [
      {
        destination: 'Singapore (SIN)',
        destinationBn: 'ঢাকা → সিঙ্গাপুর (সরাসরি)',
        origin: 'Dhaka (DAC)',
        duration: '4 hours 00 mins',
        frequency: 'Daily Direct Flights',
        priceBDT: 36500,
        priceUSD: 330,
        baggage: '30 kg',
        isDirect: true
      },
      {
        destination: 'Sydney (SYD)',
        destinationBn: 'ঢাকা → সিডনি (সিঙ্গাপুর হয়ে)',
        origin: 'Dhaka (DAC)',
        duration: '14 hours 15 mins',
        frequency: 'Daily Flights',
        priceBDT: 95000,
        priceUSD: 860,
        baggage: '30 kg',
        isDirect: false
      },
      {
        destination: 'Tokyo (NRT/HND)',
        destinationBn: 'ঢাকা → টোকিও (সিঙ্গাপুর হয়ে)',
        origin: 'Dhaka (DAC)',
        duration: '11 hours 40 mins',
        frequency: 'Daily Flights',
        priceBDT: 72000,
        priceUSD: 650,
        baggage: '30 kg',
        isDirect: false
      }
    ],
    specialFeaturesBn: [
      'বিশ্বের ১ নম্বর এয়ারপোর্ট "সিঙ্গাপুর চাঙ্গি"-তে ফ্রি জুয়েল ওয়াটারফল ট্যুর',
      'উচ্চমানের ইন-ফ্লাইট ইন্টারনেট ওয়াই-ফাই সংযোগ',
      'প্রি-অর্ডার হালাল ও এশিয়ান স্পেশাল এয়ারলাইন মিল',
      'অস্ট্রেলিয়া ও নিউজিল্যান্ডের সহজতম এবং আরামদায়ক রুট'
    ],
    cancellationPolicyBn: 'সিঙ্গাপুর এয়ারলাইন্সে টিকেট পরিবর্তন ও ক্যানসেলেশন প্রসেস করা খুব দ্রুত ও নিখুঁত। Dreams Fly-এর মাধ্যমে সাপোর্ট টিম সার্বক্ষণিক সহায়তা দেয়।',
    officeInfo: {
      address: 'Gulshan-2 & Airport Counter, Dhaka',
      phone: '+8801771304219',
      email: 'singapore@dreamsfly.com.bd',
      location: 'Dhaka, Bangladesh'
    },
    faqs: [
      {
        question: 'ঢাকা থেকে সিঙ্গাপুর এয়ারলাইন্সের প্রতিদিন ফ্লাইট আছে?',
        answer: 'হ্যাঁ, ঢাকা থেকে প্রতিদিন সরাসরি বোয়িং ৭৮৭/এ৩৫০ দিয়ে সিঙ্গাপুরে ফ্লাইট চলাচল করে।'
      },
      {
        question: 'অস্ট্রেলিয়াগামী শিক্ষার্থীদের জন্য কি সুবিধা রয়েছে?',
        answer: 'অস্ট্রেলিয়া ও সিডনিগামী শিক্ষার্থীদের জন্য অতিরিক্ত ব্যাগেজ ও নমনীয় টিকেট চেঞ্জ পলিসি রয়েছে।'
      }
    ]
  },
  {
    id: 'turkish-airlines',
    name: 'Turkish Airlines',
    nameBn: 'টার্কিশ এয়ারলাইনস',
    code: 'TK',
    countryId: 'turkey',
    badge: 'Global Leader',
    taglineBn: 'বিশ্বের সবচেয়ে বেশি দেশে ফ্লাইট পরিচালনকারী তারকা এয়ারলাইন',
    rating: 4.8,
    reviewsCount: 1100,
    heroImage: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1200&q=80',
    logoColor: 'from-red-700 to-slate-900',
    hub: 'Istanbul Airport (IST), Istanbul, Turkey',
    fleetSize: '400+ Aircraft (A350, B787 Dreamliner, B777-300ER)',
    destinationsCount: '340+ Destinations (129 Countries)',
    overviewBn: 'টার্কিশ এয়ারলাইনস বিশ্বের সর্বাধিক দেশে ও গন্তব্যে ফ্লাইট পরিচালনা করে। ইস্তাম্বুল বিমানবন্দর (IST) হাবের মাধ্যমে ঢাকা থেকে ইউরোপের প্রায় প্রতিটি প্রধান শহর, উত্তর আমেরিকা, দক্ষিণ আমেরিকা ও আফ্রিকায় অনন্য সার্ভিস প্রদান করে। ফ্লাইটে বিখ্যাত Flying Chefs দ্বারা প্রস্তুত তুর্কি ও হালাল খাবার টার্কিশ এয়ারলাইন্সের বিশেষ আকর্ষণ।',
    baggagePolicy: {
      economyChecked: '30 kg (Piece concept 2x23kg in Americas)',
      economyCabin: '8 kg Cabin Baggage',
      businessChecked: '40 kg (2x32kg in Americas)',
      businessCabin: '2 Pieces (8 kg each)',
      extraBaggageNotes: 'ইউরোপ ও আমেরিকা রুটে অতিরিক্ত ব্যাগেজ প্রসেসিং সুবিধা সহজলভ্য।'
    },
    cabinClasses: [
      {
        name: 'Economy Class',
        nameBn: 'ইকোনমি ক্লাস',
        seatPitch: '31-32 inches with plush headrest',
        baggage: '30 kg checked + 8 kg cabin',
        features: ['অন-বোর্ড ফ্লাইং শেফ প্রিপেয়ার্ড মিলস', 'Planet ইন-ফ্লাইট এন্টারটেইনমেন্ট', 'আমেনো কাস্টমাইজড ট্রাভেল কিট', 'ইউএসবি ও সিট পাওয়ার কানেক্টর']
      },
      {
        name: 'Business Class',
        nameBn: 'বিজনেস ক্লাস',
        seatPitch: '76 inches fully lie-flat bed',
        baggage: '40 kg checked + 16 kg cabin',
        features: ['বিশ্বখ্যাত ফ্লাইং শেফ টেবিল সার্ভিস', 'ইস্তাম্বুল লাউঞ্জ বিজনেস (বিশ্বসেরা)', 'সালভাতোর ফেরাগামো ট্রাভেল কিট', 'ফ্রি ১০০ এমবি অন-বোর্ড ওয়াইফাই']
      }
    ],
    popularRoutes: [
      {
        destination: 'Istanbul (IST)',
        destinationBn: 'ঢাকা → ইস্তাম্বুল (সরাসরি)',
        origin: 'Dhaka (DAC)',
        duration: '7 hours 50 mins',
        frequency: 'Daily Direct Flights',
        priceBDT: 62000,
        priceUSD: 560,
        baggage: '30 kg',
        isDirect: true
      },
      {
        destination: 'Frankfurt (FRA)',
        destinationBn: 'ঢাকা → ফ্রাঙ্কফুর্ট (ইস্তাম্বুল হয়ে)',
        origin: 'Dhaka (DAC)',
        duration: '12 hours 30 mins',
        frequency: 'Daily Flights',
        priceBDT: 78000,
        priceUSD: 700,
        baggage: '30 kg',
        isDirect: false
      },
      {
        destination: 'Toronto (YYZ)',
        destinationBn: 'ঢাকা → টরোন্টো (ইস্তাম্বুল হয়ে)',
        origin: 'Dhaka (DAC)',
        duration: '18 hours 30 mins',
        frequency: 'Daily Flights',
        priceBDT: 122000,
        priceUSD: 1100,
        baggage: '2 Pieces (23kg each)',
        isDirect: false
      }
    ],
    specialFeaturesBn: [
      'ইস্তাম্বুলে ৯ ঘণ্টার বেশি স্টপওভার থাকলে বিনামূল্যে Touristanbul ফ্রি সিটি ট্যুর',
      '১২ ঘণ্টার বেশি লে-ওভার থাকলে টার্কিশ এয়ারলাইন্সের ফ্রি ট্রানজিট হোটেল রুম',
      'ইউরোপ ও শেঙ্গেন দেশগুলোতে দ্রুততম ওয়ান-স্টপ ফ্লাইট অপশন',
      'ফ্লাইং শেফ দ্বারা পরিবেশন করা তাজা তুর্কি ও আন্তর্জাতিক খাবার'
    ],
    cancellationPolicyBn: 'টিকেট রিফান্ড ও ডেট চেইঞ্জ সম্পর্কিত আন্তর্জাতিক নীতি অত্যন্ত স্বচ্ছ। Dreams Fly-এর এক্সপার্টদের মাধ্যমে খুব সহজে প্রসেস সম্পন্ন হয়।',
    officeInfo: {
      address: 'Tejgaon & Airport Counter, Dhaka',
      phone: '+8801771304219',
      email: 'turkish@dreamsfly.com.bd',
      location: 'Dhaka, Bangladesh'
    },
    faqs: [
      {
        question: 'ইস্তাম্বুলে ট্রানজিট থাকলে ফ্রি হোটেল বা ট্যুর পাওয়া যায়?',
        answer: 'হ্যাঁ, টার্কিশ এয়ারলাইন্সের নির্দিষ্ট ট্রানজিট টাইমের ক্ষেত্রে ফ্রি ইস্তাম্বুল সিটি ট্যুর বা ৫-স্টার হোটেল রুম দেওয়া হয়।'
      }
    ]
  },
  {
    id: 'air-arabia',
    name: 'Air Arabia',
    nameBn: 'এয়ার এরাবিয়া',
    code: 'G9',
    countryId: 'uae',
    badge: 'Budget Friendly',
    taglineBn: 'মধ্যপ্রাচ্যের শীর্ষ সাশ্রয়ী বাজেট এয়ারলাইন – শারজাহ হাব',
    rating: 4.5,
    reviewsCount: 1560,
    heroImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    logoColor: 'from-red-600 to-rose-700',
    hub: 'Sharjah International Airport (SHJ), UAE',
    fleetSize: '60+ Modern Airbus A320 & A321neo Aircraft',
    destinationsCount: '190+ Destinations across Middle East, Asia & Europe',
    overviewBn: 'এয়ার এরাবিয়া মধ্যপ্রাচ্য ও উত্তর আফ্রিকার প্রথম ও বৃহত্তম লো-কস্ট বাজেট এয়ারলাইন। ঢাকা ও চট্টগ্রাম থেকে সরাসরি শারজাহ (SHJ) হয়ে দুবাই, আবুধাবি, মাসকাট, রিয়াদ, জেদ্দায় প্রতিদিন ফ্লাইট পরিচালনা করে। সাশ্রয়ী ফেয়ার এবং প্রয়োজন অনুযায়ী ব্যাগেজ ও মিল যুক্ত করার সুবিধার কারণে প্রবাসী ভাইদের কাছে অত্যন্ত জনপ্রিয়।',
    baggagePolicy: {
      economyChecked: '20 kg / 30 kg / 40 kg (পছন্দ অনুযায়ী কেনা যায়)',
      economyCabin: '10 kg Cabin Baggage (Includes Laptop bag)',
      businessChecked: 'Not Applicable (Low Cost Carrier)',
      businessCabin: '10 kg Cabin Baggage',
      extraBaggageNotes: 'টিকেট কেনার সময় ব্যাগেজ আগে থেকেই যুক্ত করলে ৫০% পর্যন্ত সাশ্রয় হয়।'
    },
    cabinClasses: [
      {
        name: 'Economy Class',
        nameBn: 'ইকোনমি ক্লাস',
        seatPitch: '32 inches (Largest seat pitch in budget airlines)',
        baggage: 'Choice of 20kg, 30kg or 40kg + 10kg cabin',
        features: ['স্কাইক্যাফে (SkyCafe) সুস্বাদু অন-বোর্ড খাবার', 'ফ্রি ওয়াইফাই স্ট্রিমিং এন্টারটেইনমেন্ট (SkyTime)', 'সুপ্রশস্ত সিট পিচ (৩২ ইঞ্চি)', 'অন-ডিমান্ড ব্যাগেজ পারচেজ']
      }
    ],
    popularRoutes: [
      {
        destination: 'Sharjah / Dubai (SHJ)',
        destinationBn: 'ঢাকা / চট্টগ্রাম → শারজাহ (দুবাই)',
        origin: 'Dhaka (DAC)',
        duration: '4 hours 30 mins',
        frequency: 'Daily 2 Direct Flights',
        priceBDT: 32000,
        priceUSD: 290,
        baggage: '20-30 kg',
        isDirect: true
      },
      {
        destination: 'Jeddah (JED)',
        destinationBn: 'ঢাকা → জেদ্দা (শারজাহ হয়ে)',
        origin: 'Dhaka (DAC)',
        duration: '8 hours 15 mins',
        frequency: 'Daily Flights',
        priceBDT: 39500,
        priceUSD: 355,
        baggage: '30 kg',
        isDirect: false
      }
    ],
    specialFeaturesBn: [
      'মধ্যপ্রাচ্য রুটে সবচেয়ে সাশ্রয়ী মূল্যে এয়ার টিকিট পাওয়ার গ্যারান্টি',
      'শারজাহ বিমানবন্দর থেকে মাত্র ৩০ মিনিটে দুবাই বা আজমান পৌঁছানোর সুবিধা',
      'প্রয়োজন অনুসারে ২০, ৩০ বা ৪০ কেজি ব্যাগেজ সিলেক্ট করার সুবিধা',
      'Dreams Fly-এ ইনস্ট্যান্ট বুকিং ও হোয়াটসঅ্যাপে ই-টিকিট প্রদান'
    ],
    cancellationPolicyBn: 'এয়ার এরাবিয়া টিকেটের টাকা সাধারণত ক্রেডিট ভাউচার হিসেবে জমা থাকে যা পরবর্তী ১ বছরের মধ্যে অন্য টিকিট কাটতে ব্যবহার করা যায়।',
    officeInfo: {
      address: 'Motijheel & Airport Sales Desk, Dhaka',
      phone: '+8801771304219',
      email: 'airarabia@dreamsfly.com.bd',
      location: 'Dhaka, Bangladesh'
    },
    faqs: [
      {
        question: 'এয়ার এরাবিয়া টিকিটে কি খাবার ও লাগেজ ফ্রি?',
        answer: 'টিকেট কাটার সময় আপনি খাবার ও লাগেজের অপশন সিলেক্ট করতে পারেন। আমাদের প্যাকেজে সাধারণত ৩০ কেজি লাগেজ ও মিল অন্তর্ভুক্ত থাকে।'
      }
    ]
  },
  {
    id: 'flydubai',
    name: 'Flydubai',
    nameBn: 'ফ্লাইদুবাই',
    code: 'FZ',
    countryId: 'uae',
    badge: 'Emirates Partner',
    taglineBn: 'ইমিরেটস পার্টনার – দুবাই হাব হয়ে সহজ ও সাশ্রয়ী ফ্লাইট',
    rating: 4.6,
    reviewsCount: 1320,
    heroImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    logoColor: 'from-orange-500 to-blue-600',
    hub: 'Dubai International Airport (DXB Terminal 2 & 3), UAE',
    fleetSize: '80+ Boeing 737 MAX 8 Aircraft',
    destinationsCount: '120+ Destinations',
    overviewBn: 'ফ্লাইদুবাই দুবাই সরকারের মালিকানাধীন শীর্ষস্থানীয় এয়ারলাইন। ইমিরেটস (Emirates)-এর অফিসিয়াল পার্টনার হিসেবে পরিচালিত হয়। ঢাকা ও চট্টগ্রাম থেকে সরাসরি দুবাই (DXB) টার্মিনালে উড্ডয়ন করে এবং সেখান থেকে ইমিরেটসের গ্লোবাল নেটওয়ার্কের সাথে সহজেই কানেক্ট করে।',
    baggagePolicy: {
      economyChecked: '20 kg / 30 kg / 40 kg Checked',
      economyCabin: '7 kg Cabin Baggage',
      businessChecked: '40 kg Checked Baggage',
      businessCabin: '14 kg (2 Pieces)',
      extraBaggageNotes: 'ইমিরেটস কোডশেয়ার টিকিটে ইমিরেটসের ব্যাগেজ পলিসি প্রযোজ্য।'
    },
    cabinClasses: [
      {
        name: 'Economy Class',
        nameBn: 'ইকোনমি ক্লাস',
        seatPitch: '30-31 inches ergonomically designed seats',
        baggage: '20-30 kg checked + 7 kg cabin',
        features: ['এইচডি অন-বোর্ড টাচস্ক্রিন মিডিয়া', 'সুস্বাদু হালাল প্রি-অর্ডারড মিলস', 'দুবাই এয়ারপোর্ট টার্মিনাল ৩ কোডশেয়ার সুবিধা', 'ইন-সিট ইউএসবি চার্জিং']
      },
      {
        name: 'Business Class',
        nameBn: 'বিজনেস ক্লাস',
        seatPitch: 'Lie-flat seats on Boeing 737 MAX',
        baggage: '40 kg checked + 14 kg cabin',
        features: ['লাই-ফ্ল্যাট আরামদায়ক ফ্ল্যাগশিপ সিট', 'প্রাইভেট কেবিন আতিথেয়তা', 'দুবাই বিজনেস লাউঞ্জ অ্যাক্সেস', 'অন-ডিমান্ড ইতালিয়ান অ্যান্ড এশিয়ান খাবার']
      }
    ],
    popularRoutes: [
      {
        destination: 'Dubai (DXB)',
        destinationBn: 'ঢাকা / চট্টগ্রাম → দুবাই (DXB)',
        origin: 'Dhaka (DAC)',
        duration: '4 hours 45 mins',
        frequency: 'Daily Direct Flights',
        priceBDT: 35000,
        priceUSD: 315,
        baggage: '30 kg',
        isDirect: true
      }
    ],
    specialFeaturesBn: [
      'ইমিরেটসের সাথে সিমলেস কোডশেয়ার এবং লাগেজ থ্রু-চেকইন',
      'দুবাই আন্তর্জাতিক বিমানবন্দরে (DXB) সরাসরি অবতরণ',
      'সাশ্রয়ী মূল্যে ব্যবসায়িক ও পারিবারিক ভ্রমণের সুব্যবস্থা'
    ],
    cancellationPolicyBn: 'ফ্লাইদুবাই টিকেটের ক্যানসেলেশন ও ডেট চেঞ্জ চার্জ অত্যন্ত সহজ। Dreams Fly থেকে দ্রুত সমাধান মিলবে।',
    officeInfo: {
      address: 'Gulshan-1 & Airport Desk, Dhaka',
      phone: '+8801771304219',
      email: 'flydubai@dreamsfly.com.bd',
      location: 'Dhaka, Bangladesh'
    },
    faqs: [
      {
        question: 'ফ্লাইদুবাই কি দুবাই মেইন বিমানবন্দর (DXB)-তে নামায়?',
        answer: 'হ্যাঁ, ফ্লাইদুবাই সরাসরি দুবাই আন্তর্জাতিক বিমানবন্দর (DXB)-এর টার্মিনাল ২ এবং টার্মিনাল ৩-এ ফ্লাইট চালায়।'
      }
    ]
  },
  {
    id: 'kuwait-airways',
    name: 'Kuwait Airways',
    nameBn: 'কুয়েত এয়ারওয়েজ',
    code: 'KU',
    countryId: 'kuwait',
    badge: 'Full Service Carrier',
    taglineBn: 'কুয়েতের জাতীয় পতাকাবাহী এয়ারলাইন – মধ্যপ্রাচ্য ও ইউরোপের আরামদায়ক সফর',
    rating: 4.6,
    reviewsCount: 880,
    heroImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    logoColor: 'from-blue-800 to-sky-600',
    hub: 'Kuwait International Airport (KWI Terminal 4), Kuwait',
    fleetSize: '30+ Modern Fleet (Boeing 777-300ER & Airbus A330neo)',
    destinationsCount: '60+ Global Destinations',
    overviewBn: 'কুয়েত এয়ারওয়েজ কুয়েতের জাতীয় পতাকাবাহী পূর্ণাঙ্গ সেবাদানকারী বিমান সংস্থা। ঢাকা থেকে কুয়েত (KWI) হয়ে মধ্যপ্রাচ্য, ইউরোপ, লন্ডন ও নিউ ইয়র্কে চমৎকার কানেক্টিভিটি অফার করে। এতে যাত্রীদের জন্য সর্বোচ্চ ২ টুকরো ব্যাগেজ সুবিধা (মোট ৪৬ কেজি) দেওয়া হয় যা প্রবাসীদের জন্য অত্যন্ত আকর্ষণীয়।',
    baggagePolicy: {
      economyChecked: '2 Pieces (23 kg each) = 46 kg Total',
      economyCabin: '7 kg Cabin Baggage',
      businessChecked: '2 Pieces (32 kg each) = 64 kg Total',
      businessCabin: '11 kg Cabin Baggage',
      extraBaggageNotes: 'ইকোনমি ক্লাসেই ফ্রিতে ২টি ব্যাগ (৪৬ কেজি) নেওয়ার সুযোগ সুবিধা রয়েছে।'
    },
    cabinClasses: [
      {
        name: 'Economy Class',
        nameBn: 'ইকোনমি ক্লাস',
        seatPitch: '32-34 inches generous legroom',
        baggage: '2 Pieces (23 kg each) + 7 kg cabin',
        features: ['৪৬ কেজি ফ্রিতে লাগেজ এলাউন্স (২টি ব্যাগ)', '১০০% হালাল অ্যারাবিয়ান ডাইনিং', 'ব্যক্তিগত টাচস্ক্রিন সিনেমা ও গেমস', 'পরিবার ও শিশুদের বিশেষ উপহার']
      },
      {
        name: 'Royal & Business Class',
        nameBn: 'রয়েল ও বিজনেস ক্লাস',
        seatPitch: 'Full Lie-Flat Suites',
        baggage: '2 Pieces (32 kg each) + 11 kg cabin',
        features: ['স্লাইডিং ডোরসহ প্রাইভেট রয়েল সুইট', 'টার্মিনাল ৪ ভিআইপি লাউঞ্জ সুবিধা', 'প্রি-অর্ডারড ফাইন ডাইনিং']
      }
    ],
    popularRoutes: [
      {
        destination: 'Kuwait (KWI)',
        destinationBn: 'ঢাকা → কুয়েত (সরাসরি)',
        origin: 'Dhaka (DAC)',
        duration: '5 hours 30 mins',
        frequency: 'Daily Direct Flights',
        priceBDT: 41000,
        priceUSD: 370,
        baggage: '46 kg (2 Pcs)',
        isDirect: true
      },
      {
        destination: 'London (LHR)',
        destinationBn: 'ঢাকা → লন্ডন (কুয়েত হয়ে)',
        origin: 'Dhaka (DAC)',
        duration: '14 hours 00 mins',
        frequency: 'Daily Flights',
        priceBDT: 82000,
        priceUSD: 740,
        baggage: '46 kg (2 Pcs)',
        isDirect: false
      }
    ],
    specialFeaturesBn: [
      'ইকোনমি ক্লাসে ২টি ব্যাগ (মোট ৪৬ কেজি) ফ্রি লাগেজ বহন করার সুবিধা',
      'সম্পূর্ণ হালাল সার্ভিস ও নো-অ্যালকোহল অন-বোর্ড পরিবেশ',
      'লন্ডন ও নিউ ইয়র্কের সাশ্রয়ী আন্তর্জাতিক রুট'
    ],
    cancellationPolicyBn: 'টিকেট বাতিল বা পরিবর্তনের জন্য কুয়েত এয়ারওয়েজের চার্জ খুবই সাশ্রয়ী।',
    officeInfo: {
      address: 'Naya Paltan & Airport Counter, Dhaka',
      phone: '+8801771304219',
      email: 'kuwait@dreamsfly.com.bd',
      location: 'Dhaka, Bangladesh'
    },
    faqs: [
      {
        question: 'কুয়েত এয়ারওয়েজে কত কেজি ব্যাগেজ দেওয়া হয়?',
        answer: 'ইকোনমি ক্লাসে প্রতি যাত্রী ২টি ব্যাগ (প্রতিটি সর্বোচ্চ ২৩ কেজি, মোট ৪৬ কেজি) ফ্রিতে বহন করতে পারেন।'
      }
    ]
  },
  {
    id: 'gulf-air',
    name: 'Gulf Air',
    nameBn: 'গালফ এয়ার',
    code: 'GF',
    countryId: 'bahrain',
    badge: 'Boutique Airline',
    taglineBn: 'বাহরাইনের জাতীয় পতাকাবাহী বুটিক এয়ারলাইন – প্রিমিয়াম অ্যারাবিয়ান সার্ভিস',
    rating: 4.6,
    reviewsCount: 760,
    heroImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    logoColor: 'from-amber-700 to-amber-900',
    hub: 'Bahrain International Airport (BAH), Bahrain',
    fleetSize: '40+ Fleet (Boeing 787-9 Dreamliner & A321neo)',
    destinationsCount: '50+ Destinations',
    overviewBn: 'গালফ এয়ার মধ্যপ্রাচ্যের অন্যতম ঐতিহ্যবাহী এবং বাহরাইনের জাতীয় পতাকাবাহী বুটিক বিমান সংস্থা। ঢাকা থেকে বাহরাইন (BAH) হয়ে রিয়াদ, জেদ্দা, দাম্মাম, কায়রো, লন্ডন ও ইউরোপীয় শহরগুলোতে আধুনিক বোয়িং ৭৮৭ ড্রিমলাইনার দিয়ে প্রিমিয়াম সেবা প্রদান করে।',
    baggagePolicy: {
      economyChecked: '30 - 40 kg Checked Baggage',
      economyCabin: '7 kg Cabin Baggage',
      businessChecked: '40 kg Checked Baggage',
      businessCabin: '9 kg Cabin Baggage',
      extraBaggageNotes: 'ফ্যালকনফ্লাইয়ার (FalconFlyer) মেম্বারদের জন্য বাড়তি সুবিধা।'
    },
    cabinClasses: [
      {
        name: 'Economy Class',
        nameBn: 'ইকোনমি ক্লাস',
        seatPitch: '32 inches Dreamliner seats',
        baggage: '30-40 kg checked + 7 kg cabin',
        features: ['অ্যারাবিয়ান ভ্যালু মিল সার্ভিস', 'ড্রিমলাইনার ৭৮৭ ইলেকট্রনিক শেড উইন্ডো', 'ইন-ফ্লাইট এন্টারটেইনমেন্ট স্ক্রিন']
      },
      {
        name: 'Falcon Gold (Business Class)',
        nameBn: 'ফ্যালকন গোল্ড (বিজনেস ক্লাস)',
        seatPitch: 'Lie-flat Apex Suite',
        baggage: '40 kg checked + 9 kg cabin',
        features: ['Apex Suite প্রাইভেট ফ্ল্যাট বেড', 'বাহরাইন এয়ারপোর্ট ফ্যালকন গোল্ড লাউঞ্জ', 'অন-বোর্ড শেফ সার্ভিস']
      }
    ],
    popularRoutes: [
      {
        destination: 'Bahrain (BAH)',
        destinationBn: 'ঢাকা → বাহরাইন (সরাসরি)',
        origin: 'Dhaka (DAC)',
        duration: '5 hours 15 mins',
        frequency: 'Daily Direct Flights',
        priceBDT: 39000,
        priceUSD: 350,
        baggage: '30 kg',
        isDirect: true
      }
    ],
    specialFeaturesBn: [
      'নতুন বাহরাইন ইন্টারন্যাশনাল এয়ারপোর্টের আধুনিক দ্রুত ট্রান্সফার হাব',
      'প্রবাসীদের জন্য আকর্ষণীয় দামে মধ্যপ্রাচ্যের কানেক্টিভিটি'
    ],
    cancellationPolicyBn: 'টিকেট রিফান্ড ও তারিখ পরিবর্তন সুবিধা সহজ শর্তে প্রযোজ্য।',
    officeInfo: {
      address: 'Gulshan-1 & Airport Desk, Dhaka',
      phone: '+8801771304219',
      email: 'gulfair@dreamsfly.com.bd',
      location: 'Dhaka, Bangladesh'
    },
    faqs: [
      {
        question: 'ঢাকা থেকে গালফ এয়ারের ফ্লাইট আছে?',
        answer: 'হ্যাঁ, ঢাকা থেকে প্রতিদিন সরাসরি বোয়িং ৭৮৭ ড্রিমলাইনার দিয়ে বাহরাইনে ফ্লাইট চলাচল করে।'
      }
    ]
  },
  {
    id: 'malaysia-airlines',
    name: 'Malaysia Airlines',
    nameBn: 'মালয়েশিয়া এয়ারলাইনস',
    code: 'MH',
    countryId: 'malaysia',
    badge: 'Oneworld Alliance',
    taglineBn: 'মালয়েশিয়ার জাতীয় পতাকাবাহী এয়ারলাইন – ওয়ানওয়ার্ল্ড অ্যালায়েন্স মেম্বার',
    rating: 4.7,
    reviewsCount: 1140,
    heroImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    logoColor: 'from-blue-700 to-red-600',
    hub: 'Kuala Lumpur International Airport (KUL Terminal 1), Malaysia',
    fleetSize: '80+ Aircraft (Airbus A350-900, A330 & B737-800)',
    destinationsCount: '60+ Destinations',
    overviewBn: 'মালয়েশিয়া এয়ারলাইনস মালয়েশিয়ার জাতীয় পতাকাবাহী বিমান সংস্থা এবং বিখ্যাত Oneworld অ্যালায়েন্সের সদস্য। ঢাকা থেকে সরাসরি কুয়ালালামপুর (KUL) হয়ে অস্ট্রেলিয়া, নিউজিল্যান্ড, চীন, জাপান, যুক্তরাজ্য ও দক্ষিণ-পূর্ব এশিয়ায় মসৃণ ওয়ান-স্টপ ফ্লাইট ও ঐতিহ্যবাহী মালয়েশিয়ান আতিথেয়তা প্রদান করে।',
    baggagePolicy: {
      economyChecked: '30 kg Checked Baggage',
      economyCabin: '7 kg Cabin Baggage',
      businessChecked: '40 kg Checked Baggage',
      businessCabin: '2 Pieces (7 kg each)',
      extraBaggageNotes: 'স্টুডেন্টদের জন্য অতিরিক্ত ১০ কেজি ফ্রিতে দেওয়া হয়।'
    },
    cabinClasses: [
      {
        name: 'Economy Class',
        nameBn: 'ইকোনমি ক্লাস',
        seatPitch: '32 inches comfortable seating',
        baggage: '30 kg checked + 7 kg cabin',
        features: ['মালয়েশিয়ান প্রথাগত নাসি লেমাক ও হালাল খাবার', 'MHstudio ইন-ফ্লাইট সিনেমা ও গান', 'ইন-সিট পাওয়ার চার্জিং']
      },
      {
        name: 'Business Class',
        nameBn: 'বিজনেস ক্লাস',
        seatPitch: 'Full Lie-Flat Bed (A350/A330)',
        baggage: '40 kg checked + 14 kg cabin',
        features: ['লাই-ফ্ল্যাট আরামদায়ক বেড', 'কেএলআইএ স্যাটেলাইট গোল্ড লাউঞ্জ', 'সাতায় অন-বোর্ড সিগনেচার ডিশ']
      }
    ],
    popularRoutes: [
      {
        destination: 'Kuala Lumpur (KUL)',
        destinationBn: 'ঢাকা → কুয়ালালামপুর (সরাসরি)',
        origin: 'Dhaka (DAC)',
        duration: '3 hours 55 mins',
        frequency: 'Daily 2 Direct Flights',
        priceBDT: 34000,
        priceUSD: 310,
        baggage: '30 kg',
        isDirect: true
      }
    ],
    specialFeaturesBn: [
      'অস্ট্রেলিয়া ও নিউজিল্যান্ডের বিশ্ববিদ্যালয়গামী শিক্ষার্থীদের পছন্দের এয়ারলাইন',
      'প্রথাগত সাউথ-ইস্ট এশিয়ান হালাল খাবার ও প্রিমিয়াম সেবা'
    ],
    cancellationPolicyBn: 'ফ্লেক্সি ফেস সুবিধায় ফ্রিতে ডেট চেঞ্জ করা সম্ভব। Dreams Fly স্পেশাল ডিসকাউন্ট সাপোর্ট দেয়।',
    officeInfo: {
      address: 'Motijheel & Airport Desk, Dhaka',
      phone: '+8801771304219',
      email: 'malaysia@dreamsfly.com.bd',
      location: 'Dhaka, Bangladesh'
    },
    faqs: [
      {
        question: 'মালয়েশিয়া এয়ারলাইনসে স্টুডেন্ট ডিসকাউন্ট পাওয়া যায়?',
        answer: 'হ্যাঁ, MHexplorer স্টুডেন্ট প্রোগ্রামের আওতায় অতিরিক্ত ব্যাগেজ ও টিকেটে ১০-১৫% ছাড় পাওয়া যায়।'
      }
    ]
  },
  {
    id: 'thai-airways',
    name: 'Thai Airways',
    nameBn: 'থাই এয়ারওয়েজ',
    code: 'TG',
    countryId: 'thailand',
    badge: 'Star Alliance',
    taglineBn: 'থাইল্যান্ডের জাতীয় পতাকাবাহী এয়ারলাইন – স্মুথ এজ সিল্ক সেবা',
    rating: 4.8,
    reviewsCount: 920,
    heroImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    logoColor: 'from-purple-900 to-amber-500',
    hub: 'Suvarnabhumi Airport (BKK), Bangkok, Thailand',
    fleetSize: '70+ Aircraft (A350-900, B777-300ER & B787)',
    destinationsCount: '60+ Destinations',
    overviewBn: 'থাই এয়ারওয়েজ থাইল্যান্ডের জাতীয় পতাকাবাহী পূর্ণাঙ্গ বিমান সংস্থা এবং Star Alliance-এর প্রতিষ্ঠাতা সদস্য। "Smooth as Silk" স্লোগানে পরিচালিত থাই এয়ারওয়েজ ঢাকা থেকে ব্যাংককের সুবর্ণভূমি বিমানবন্দর (BKK) হয়ে টোকিও, সিউল, সিডনি, ইউরোপ ও মার্কিন যুক্তরাষ্ট্রে দ্রুততম ওয়ান-স্টপ আন্তর্জাতিক কানেক্টিভিটি প্রদান করে।',
    baggagePolicy: {
      economyChecked: '30 kg Checked Baggage',
      economyCabin: '7 kg Cabin Baggage',
      businessChecked: '40 kg Checked Baggage',
      businessCabin: '7 kg Cabin Baggage',
      extraBaggageNotes: 'রয়্যাল অর্কিড প্লাস মেম্বারদের বাড়তি সুবিধা।'
    },
    cabinClasses: [
      {
        name: 'Economy Class',
        nameBn: 'ইকোনমি ক্লাস',
        seatPitch: '32-34 inches wide seats',
        baggage: '30 kg checked + 7 kg cabin',
        features: ['থাই ও আন্তর্জাতিক প্রিমিয়াম হালাল খাবার', 'ব্যক্তিগত এন্টারটেইনমেন্ট স্ক্রিন', 'থাই সিল্ক আরামদায়ক কম্বল ও বালিশ']
      },
      {
        name: 'Royal Silk Class (Business)',
        nameBn: 'রয়্যাল সিল্ক ক্লাস (বিজনেস)',
        seatPitch: '180 degree Lie-Flat Shell Seats',
        baggage: '40 kg checked + 7 kg cabin',
        features: ['লাই-ফ্ল্যাট বেড সিট', 'ব্যাংকক সুবর্ণভূমি রয়্যাল অর্কিড লাউঞ্জ', 'থাই স্পা সার্ভিস ও ফাইন ডাইনিং']
      }
    ],
    popularRoutes: [
      {
        destination: 'Bangkok (BKK)',
        destinationBn: 'ঢাকা → ব্যাংকক (সরাসরি)',
        origin: 'Dhaka (DAC)',
        duration: '2 hours 30 mins',
        frequency: 'Daily Direct Flights',
        priceBDT: 29500,
        priceUSD: 265,
        baggage: '30 kg',
        isDirect: true
      }
    ],
    specialFeaturesBn: [
      'ঢাকা থেকে মাত্র ২ ঘণ্টা ৩০ মিনিটে থাইল্যান্ডের ব্যাংককে পৌঁছানোর চমৎকার সুযোগ',
      'জাপান, অস্ট্রেলিয়া ও কোরিয়ার অন্যতম সেরা রুট'
    ],
    cancellationPolicyBn: 'ফ্লেক্সি টিকিট হলে সামান্য সার্ভিস ফি দিয়ে তারিখ পরিবর্তন করা সম্ভব।',
    officeInfo: {
      address: 'Gulshan-1 & Airport Counter, Dhaka',
      phone: '+8801771304219',
      email: 'thaiairways@dreamsfly.com.bd',
      location: 'Dhaka, Bangladesh'
    },
    faqs: [
      {
        question: 'থাই এয়ারওয়েজে কি হালাল খাবার দেওয়া হয়?',
        answer: 'হ্যাঁ, ঢাকা থেকে ছাড়ার ফ্লাইটগুলোতে ১০০% হালাল সার্টিফাইড খাবার পরিবেশন করা হয়।'
      }
    ]
  },
  {
    id: 'airasia',
    name: 'AirAsia',
    nameBn: 'এয়ার এশিয়া',
    code: 'AK',
    countryId: 'malaysia',
    badge: 'World\'s Best LCC',
    taglineBn: 'টানা ১৪ বার বিশ্বসেরা বাজেট এয়ারলাইন – "Now Everyone Can Fly"',
    rating: 4.5,
    reviewsCount: 1750,
    heroImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    logoColor: 'from-red-600 to-red-800',
    hub: 'Kuala Lumpur International Airport (KUL Terminal 2 / klia2), Malaysia',
    fleetSize: '200+ Airbus A320 & A330 (AirAsia X) Fleet',
    destinationsCount: '160+ Destinations in Asia & Australia',
    overviewBn: 'এয়ার এশিয়া বিশ্বখ্যাত মালয়েশিয়ান বাজেট এয়ারলাইন যা টানা ১৪ বার Skytrax কর্তৃক বিশ্বসেরা লো-কস্ট এয়ারলাইন হিসেবে নির্বাচিত হয়েছে। ঢাকা থেকে সরাসরি কুয়ালালামপুরে প্রতিদিন অত্যন্ত সাশ্রয়ী ভাড়ায় ফ্লাইট পরিচালনা করে। ব্যাকপ্যাকার, ট্যুরিস্ট ও বাজেট যাত্রীদের জন্য এটি ১ নম্বর চয়েস।',
    baggagePolicy: {
      economyChecked: '20kg, 25kg, 30kg, 40kg (প্রয়োজন অনুযায়ী কেনা যায়)',
      economyCabin: '7 kg (2 small pieces combined)',
      businessChecked: '40 kg (Premium Flatbed)',
      businessCabin: '7 kg Cabin Baggage',
      extraBaggageNotes: 'টিকেট কাটার সময় ব্যাগেজ সিলেক্ট করলে সবচেয়ে কম খরচ পড়ে।'
    },
    cabinClasses: [
      {
        name: 'Value Pack / Economy',
        nameBn: 'ইকোনমি ক্লাস',
        seatPitch: '29-30 inches standard seats',
        baggage: '20-30 kg option + 7 kg cabin',
        features: ['Santan অন-বোর্ড হালাল ডাইনিং', 'হট সিট উইথ এক্সট্রা লেগরুম অপশন', 'সবচেয়ে কম মূল্যের প্লেন ভাড়া']
      },
      {
        name: 'Premium Flatbed (AirAsia X)',
        nameBn: 'প্রিমিয়াম ফ্ল্যাটবেড',
        seatPitch: 'Full Recline Lie-Flat Bed',
        baggage: '40 kg checked + 7 kg cabin',
        features: ['ফ্ল্যাটবেড সিট', 'ফ্রি ৪০ কেজি লাগেজ ও খাবার', 'প্রাইওরিটি চেক-ইন ও বোর্ডিং']
      }
    ],
    popularRoutes: [
      {
        destination: 'Kuala Lumpur (KUL)',
        destinationBn: 'ঢাকা → কুয়ালালামপুর (সরাসরি)',
        origin: 'Dhaka (DAC)',
        duration: '3 hours 55 mins',
        frequency: 'Daily 2 Direct Flights',
        priceBDT: 31000,
        priceUSD: 280,
        baggage: '20-30 kg',
        isDirect: true
      }
    ],
    specialFeaturesBn: [
      'দক্ষিণ-পূর্ব এশিয়ায় সবচেয়ে সস্তায় বিমানে ভ্রমণের সুযোগ',
      'অনলাইন ও মোবাইল অ্যাপে সহজ চেক-ইন সিস্টেম'
    ],
    cancellationPolicyBn: 'এয়ার এশিয়া টিকেটের টাকা এয়ারএশিয়া ক্রেডিট অ্যাকাউন্টে ফেরত পাওয়া যায়।',
    officeInfo: {
      address: 'Uttara & Airport Counter, Dhaka',
      phone: '+8801771304219',
      email: 'airasia@dreamsfly.com.bd',
      location: 'Dhaka, Bangladesh'
    },
    faqs: [
      {
        question: 'এয়ার এশিয়ার টিকিটে লাগেজ অন্তর্ভুক্ত থাকে?',
        answer: 'প্রমোশনাল টিকেটে লাগেজ আলাদা থাকে। তবে Dreams Fly বুকিং অপশনে ২০ বা ৩০ কেজি লাগেজ সহ টিকেট দেওয়া হয়।'
      }
    ]
  }
];

export function getAirlineById(id: string): AirlineData | undefined {
  if (!id) return undefined;
  const cleanId = id.toLowerCase().trim();
  return ALL_AIRLINES.find(a => a.id === cleanId || a.code.toLowerCase() === cleanId);
}
