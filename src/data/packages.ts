import { TourPackageData } from '../types';

export const TOUR_PACKAGES: TourPackageData[] = [
  {
    id: 'umrah-5star-vip',
    title: '14 Days Premium 5-Star VIP Umrah Package',
    destination: 'Makkah & Madinah',
    country: 'Saudi Arabia',
    category: 'Umrah',
    duration: '14 Days / 13 Nights',
    nights: 13,
    days: 14,
    priceBDT: 185000,
    priceUSD: 1560,
    originalPriceBDT: 205000,
    rating: 4.98,
    reviewsCount: 342,
    featuredImage: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Saudi Umrah e-Visa & Insurance',
      'Direct Roundtrip Flight (Biman / Saudia)',
      '5-Star Makkah Hotel (Clock Tower / 100m from Haram)',
      '5-Star Madinah Hotel (Front Row / 150m from An-Nabawi)',
      'Daily Buffet Breakfast',
      'VIP AC GMC / Bus Transfers',
      'Guided Historical Ziyarah in Makkah & Madinah'
    ],
    highlights: ['Stay adjacent to Masjid al-Haram', 'Personal Muallim for Umrah performance', '24/7 Ground Assistance'],
    itinerarySummary: [
      { day: 1, title: 'Dhaka to Jeddah & Makkah Arrival', desc: 'Direct flight to Jeddah, VIP transfer to Makkah hotel, perform first Umrah with scholar guide.' },
      { day: 2, title: 'Ibadah in Makkah', desc: 'Full day devoted to prayers and Tawaf in Masjid al-Haram.' },
      { day: 5, title: 'Makkah Historical Ziyarah', desc: 'Visit Jabal al-Nour (Cave of Hira), Cave of Thawr, Mina, Muzdalifah, and Arafat.' },
      { day: 8, title: 'Transfer to Madinah Al-Munawwarah', desc: 'Luxury AC Bus ride to Madinah, check-in to 5-star hotel near Prophet Mosque.' },
      { day: 10, title: 'Madinah Ziyarah & Rawdah', desc: 'Salam at Rawdah Rasool (SAW) and visits to Quba Mosque & Mount Uhud.' },
      { day: 14, title: 'Madinah to Dhaka Departure', desc: 'Transfer to Prince Mohammad bin Abdulaziz Airport Madinah for return flight.' }
    ]
  },
  {
    id: 'bangkok-pattaya-phuket',
    title: '7 Days Wonders of Thailand (Bangkok & Phuket)',
    destination: 'Bangkok & Phuket',
    country: 'Thailand',
    category: 'Honeymoon',
    duration: '7 Days / 6 Nights',
    nights: 6,
    days: 7,
    priceBDT: 68500,
    priceUSD: 580,
    originalPriceBDT: 78000,
    rating: 4.92,
    reviewsCount: 215,
    featuredImage: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Thailand Tourist Visa Processing',
      'Roundtrip Airfare (Bangkok Airways / US-Bangla)',
      '4-Star Deluxe Hotel Accommodations with Breakfast',
      'Phi Phi Island Speedboat Tour with Lunch',
      'Bangkok Chao Phraya Princess Dinner Cruise',
      'All Airport & Inter-City Private Transfers'
    ],
    highlights: ['Crystal clear waters of Phi Phi Island', 'Romantic Dinner Cruise in Bangkok', 'Safari World Tour'],
    itinerarySummary: [
      { day: 1, title: 'Arrival in Bangkok & Transfer to Hotel', desc: 'Welcome at Suvarnabhumi Airport, private transfer to 4-star city hotel.' },
      { day: 2, title: 'Bangkok Temple & Dinner Cruise', desc: 'Explore Wat Pho and Wat Arun, evening Chao Phraya luxury cruise.' },
      { day: 3, title: 'Fly to Phuket', desc: 'Short domestic flight to Phuket, evening Bangla Road & Patong Beach walk.' },
      { day: 4, title: 'Full Day Phi Phi & Maya Bay Island Tour', desc: 'Speedboat adventure to Maya Bay, snorkeling, and beachfront buffet lunch.' },
      { day: 7, title: 'Phuket Departure to Dhaka', desc: 'Souvenir shopping and airport transfer.' }
    ]
  },
  {
    id: 'dubai-luxury-escape',
    title: '5 Days Luxury Dubai & Abu Dhabi Experience',
    destination: 'Dubai & Abu Dhabi',
    country: 'UAE',
    category: 'Family',
    duration: '5 Days / 4 Nights',
    nights: 4,
    days: 5,
    priceBDT: 82000,
    priceUSD: 690,
    originalPriceBDT: 95000,
    rating: 4.95,
    reviewsCount: 180,
    featuredImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Dubai 30 Days Tourist e-Visa',
      'Emirates / FlyDubai Flight Ticket',
      '4-Star Bur Dubai Hotel with Daily Breakfast',
      'Burj Khalifa At The Top 124th Floor Entry',
      'Desert Safari with BBQ Dinner & Dune Bashing',
      'Abu Dhabi Sheikh Zayed Grand Mosque Day Tour'
    ],
    highlights: ['Stand on top of the world at Burj Khalifa', 'Thrilling Red Dune Desert Bashing', 'Sheikh Zayed Mosque Tour'],
    itinerarySummary: [
      { day: 1, title: 'Dubai Arrival & Marina Dhow Cruise', desc: 'Landed at DXB airport, evening Marina Dhow dinner cruise.' },
      { day: 2, title: 'Dubai City Tour & Burj Khalifa', desc: 'Photo stop at Burj Al Arab, Dubai Mall visit, entry to 124th floor observation deck.' },
      { day: 3, title: 'Desert Safari Adventure', desc: '4x4 Land Cruiser dune bashing, camel riding, belly dance show & BBQ buffet.' },
      { day: 4, title: 'Abu Dhabi Grand Tour', desc: 'Visit Sheikh Zayed Mosque and Ferrari World Abu Dhabi.' },
      { day: 5, title: 'Departure to Dhaka', desc: 'Duty Free shopping and flight back home.' }
    ]
  },
  {
    id: 'kuala-lumpur-genting',
    title: '5 Days Malaysia Fantasy (Kuala Lumpur & Genting)',
    destination: 'Kuala Lumpur & Genting Highlands',
    country: 'Malaysia',
    category: 'Group',
    duration: '5 Days / 4 Nights',
    nights: 4,
    days: 5,
    priceBDT: 48500,
    priceUSD: 410,
    originalPriceBDT: 56000,
    rating: 4.88,
    reviewsCount: 194,
    featuredImage: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Malaysia eVisa Processing',
      'AirAsia / Batik Air Flight Ticket',
      '4-Star City Hotel near Bukit Bintang',
      'Genting Highlands Cable Car Ticket',
      'Batu Caves & Sunway Lagoon Theme Park Day Pass'
    ],
    highlights: ['Genting SkyWay Cable Car Ride', 'Petronas Twin Towers photo stop', 'Sunway Lagoon rides'],
    itinerarySummary: [
      { day: 1, title: 'Kuala Lumpur Arrival', desc: 'Airport transfer to Bukit Bintang hotel.' },
      { day: 2, title: 'Genting Highlands Day Trip', desc: 'Stop at Batu Caves, cable car ride to Genting SkyWorlds.' },
      { day: 3, title: 'Sunway Lagoon Theme Park', desc: 'Full day enjoying water rides and wildlife park.' },
      { day: 5, title: 'Kuala Lumpur Shopping & Departure', desc: 'Central Market shopping and airport drop.' }
    ]
  }
];
