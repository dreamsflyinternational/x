import React from 'react';

interface CountryFlagSvgProps {
  countryId?: string;
  countryName?: string;
  className?: string;
}

export const getCountryCodeFromName = (input: string = ''): string => {
  const str = input.toLowerCase().trim();
  if (!str) return 'unknown';

  if (str.includes('hungary') || str.includes('হাঙ্গেরি')) return 'hungary';
  if (str.includes('slovenia') || str.includes('স্লোভেনিয়া')) return 'slovenia';
  if (str.includes('romania') || str.includes('রোমানিয়া')) return 'romania';
  if (str.includes('serbia') || str.includes('সার্বিয়া')) return 'serbia';
  if (str.includes('montenegro') || str.includes('মন্টেনিগ্রো')) return 'montenegro';
  if (str.includes('dubai') || str.includes('uae') || str.includes('দুবাই') || str.includes('আমিরাত')) return 'dubai';
  if (str.includes('saudi') || str.includes('সৌদি')) return 'saudi-arabia';
  if (str.includes('malaysia') || str.includes('মালয়েশিয়া')) return 'malaysia';
  if (str.includes('canada') || str.includes('কানাডা')) return 'canada';
  if (str.includes('uk') || str.includes('united kingdom') || str.includes('যুক্তরাজ্য') || str.includes('ব্রিটেন')) return 'uk';
  if (str.includes('usa') || str.includes('united states') || str.includes('যুক্তরাষ্ট্র') || str.includes('আমেরিকা')) return 'usa';
  if (str.includes('japan') || str.includes('জাপান')) return 'japan';
  if (str.includes('australia') || str.includes('অস্ট্রেলিয়া')) return 'australia';
  if (str.includes('singapore') || str.includes('সিঙ্গাপুর')) return 'singapore';
  if (str.includes('thailand') || str.includes('থাইল্যান্ড')) return 'thailand';
  if (str.includes('vietnam') || str.includes('ভিয়েতনামী') || str.includes('ভিয়েতনামী') || str.includes('ভিয়েতনাম')) return 'vietnam';
  if (str.includes('turkey') || str.includes('তুর্কি') || str.includes('তুরস্ক')) return 'turkey';
  if (str.includes('italy') || str.includes('ইতালি')) return 'italy';
  if (str.includes('germany') || str.includes('জার্মানি')) return 'germany';
  if (str.includes('france') || str.includes('ফ্রান্স')) return 'france';

  return str;
};

export const CountryFlagSvg: React.FC<CountryFlagSvgProps> = ({ countryId, countryName, className = "w-5 h-3.5" }) => {
  const code = getCountryCodeFromName(countryId || countryName || '');

  switch (code) {
    case 'hungary':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <rect width="640" height="160" fill="#436f4d"/>
          <rect y="160" width="640" height="160" fill="#fff"/>
          <rect y="320" width="640" height="160" fill="#cd2a3e"/>
        </svg>
      );
    case 'slovenia':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <rect width="640" height="160" fill="#fff"/>
          <rect y="160" width="640" height="160" fill="#005da4"/>
          <rect y="320" width="640" height="160" fill="#ed1c24"/>
        </svg>
      );
    case 'romania':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <rect width="213.3" height="480" fill="#002b7f"/>
          <rect x="213.3" width="213.3" height="480" fill="#fcd116"/>
          <rect x="426.6" width="213.4" height="480" fill="#ce1126"/>
        </svg>
      );
    case 'serbia':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <rect width="640" height="160" fill="#c6363c"/>
          <rect y="160" width="640" height="160" fill="#0c4076"/>
          <rect y="320" width="640" height="160" fill="#fff"/>
        </svg>
      );
    case 'montenegro':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <rect width="640" height="480" fill="#c8102e"/>
          <rect x="20" y="20" width="600" height="440" fill="none" stroke="#d4af37" strokeWidth="20"/>
        </svg>
      );
    case 'dubai':
    case 'uae':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <rect width="640" height="160" fill="#00732f"/>
          <rect y="160" width="640" height="160" fill="#fff"/>
          <rect y="320" width="640" height="160" fill="#000"/>
          <rect width="180" height="480" fill="#ff0000"/>
        </svg>
      );
    case 'saudi-arabia':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <rect width="640" height="480" fill="#006c35"/>
          <path fill="#fff" d="M160 260h320v20H160z"/>
        </svg>
      );
    case 'malaysia':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <rect width="640" height="480" fill="#cc0000"/>
          <rect x="0" y="0" width="320" height="240" fill="#000066"/>
        </svg>
      );
    case 'canada':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <rect width="160" height="480" fill="#ff0000"/>
          <rect x="160" width="320" height="480" fill="#fff"/>
          <rect x="480" width="160" height="480" fill="#ff0000"/>
          <path fill="#ff0000" d="M320 140l20 60 50-20-30 60 40 40-60 10 10 50-30-30-30 30 10-50-60-10 40-40-30-60 50 20z"/>
        </svg>
      );
    case 'uk':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <path fill="#012169" d="M0 0h640v480H0z"/>
          <path fill="#FFF" d="m0 0 640 480M640 0 0 480"/>
          <path stroke="#C8102E" strokeWidth="40" d="m0 0 640 480M640 0 0 480"/>
          <path stroke="#FFF" strokeWidth="80" d="M320 0v480M0 240h640"/>
          <path stroke="#C8102E" strokeWidth="48" d="M320 0v480M0 240h640"/>
        </svg>
      );
    case 'usa':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <rect width="640" height="480" fill="#bb133e"/>
          <rect y="37" width="640" height="37" fill="#fff"/>
          <rect y="111" width="640" height="37" fill="#fff"/>
          <rect y="185" width="640" height="37" fill="#fff"/>
          <rect y="259" width="640" height="37" fill="#fff"/>
          <rect y="333" width="640" height="37" fill="#fff"/>
          <rect y="407" width="640" height="37" fill="#fff"/>
          <rect width="280" height="259" fill="#002147"/>
        </svg>
      );
    case 'japan':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <rect width="640" height="480" fill="#fff"/>
          <circle cx="320" cy="240" r="140" fill="#bc002d"/>
        </svg>
      );
    case 'australia':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <rect width="640" height="480" fill="#00008b"/>
          <rect width="320" height="240" fill="#012169"/>
          <path stroke="#fff" strokeWidth="30" d="M0 0l320 240M320 0L0 240M160 0v240M0 120h320"/>
          <circle cx="480" cy="360" r="24" fill="#fff"/>
          <circle cx="540" cy="200" r="20" fill="#fff"/>
        </svg>
      );
    case 'singapore':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <rect width="640" height="240" fill="#ef3340"/>
          <rect y="240" width="640" height="240" fill="#fff"/>
        </svg>
      );
    case 'thailand':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <rect width="640" height="80" fill="#ed1c24"/>
          <rect y="80" width="640" height="80" fill="#fff"/>
          <rect y="160" width="640" height="160" fill="#241d4f"/>
          <rect y="320" width="640" height="80" fill="#fff"/>
          <rect y="400" width="640" height="80" fill="#ed1c24"/>
        </svg>
      );
    case 'vietnam':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <rect width="640" height="480" fill="#da251d"/>
          <polygon fill="#ffff00" points="320,120 353,222 460,222 374,285 407,387 320,324 233,387 266,285 180,222 287,222"/>
        </svg>
      );
    case 'turkey':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <rect width="640" height="480" fill="#e30a17"/>
          <circle cx="280" cy="240" r="120" fill="#fff"/>
          <circle cx="310" cy="240" r="96" fill="#e30a17"/>
        </svg>
      );
    case 'italy':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <rect width="213.3" height="480" fill="#009246"/>
          <rect x="213.3" width="213.3" height="480" fill="#fff"/>
          <rect x="426.6" width="213.4" height="480" fill="#ce2b37"/>
        </svg>
      );
    case 'germany':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <rect width="640" height="160" fill="#000"/>
          <rect y="160" width="640" height="160" fill="#dd0000"/>
          <rect y="320" width="640" height="160" fill="#ffce00"/>
        </svg>
      );
    case 'france':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <rect width="213.3" height="480" fill="#002395"/>
          <rect x="213.3" width="213.3" height="480" fill="#fff"/>
          <rect x="426.6" width="213.4" height="480" fill="#ed2939"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0 ${className}`}>
          <rect width="640" height="480" fill="#0284c7"/>
          <circle cx="320" cy="240" r="120" fill="#fff"/>
        </svg>
      );
  }
};
