import React from 'react';

interface CountryFlagSvgProps {
  countryId: string;
  className?: string;
}

export const CountryFlagSvg: React.FC<CountryFlagSvgProps> = ({ countryId, className = "w-6 h-4" }) => {
  const code = countryId.toLowerCase();

  switch (code) {
    case 'hungary':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-sm overflow-hidden border border-slate-200 shadow-2xs ${className}`}>
          <rect width="640" height="160" fill="#436f4d"/>
          <rect y="160" width="640" height="160" fill="#fff"/>
          <rect y="320" width="640" height="160" fill="#cd2a3e"/>
        </svg>
      );
    case 'slovenia':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-sm overflow-hidden border border-slate-200 shadow-2xs ${className}`}>
          <rect width="640" height="160" fill="#fff"/>
          <rect y="160" width="640" height="160" fill="#005da4"/>
          <rect y="320" width="640" height="160" fill="#ed1c24"/>
        </svg>
      );
    case 'romania':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-sm overflow-hidden border border-slate-200 shadow-2xs ${className}`}>
          <rect width="213.3" height="480" fill="#002b7f"/>
          <rect x="213.3" width="213.3" height="480" fill="#fcd116"/>
          <rect x="426.6" width="213.4" height="480" fill="#ce1126"/>
        </svg>
      );
    case 'serbia':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-sm overflow-hidden border border-slate-200 shadow-2xs ${className}`}>
          <rect width="640" height="160" fill="#c6363c"/>
          <rect y="160" width="640" height="160" fill="#0c4076"/>
          <rect y="320" width="640" height="160" fill="#fff"/>
        </svg>
      );
    case 'montenegro':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-sm overflow-hidden border border-slate-200 shadow-2xs ${className}`}>
          <rect width="640" height="480" fill="#c8102e"/>
          <rect x="20" y="20" width="600" height="440" fill="none" stroke="#d4af37" strokeWidth="20"/>
        </svg>
      );
    case 'dubai':
    case 'uae':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-sm overflow-hidden border border-slate-200 shadow-2xs ${className}`}>
          <rect width="640" height="160" fill="#00732f"/>
          <rect y="160" width="640" height="160" fill="#fff"/>
          <rect y="320" width="640" height="160" fill="#000"/>
          <rect width="180" height="480" fill="#ff0000"/>
        </svg>
      );
    case 'saudi-arabia':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-sm overflow-hidden border border-slate-200 shadow-2xs ${className}`}>
          <rect width="640" height="480" fill="#006c35"/>
          <path fill="#fff" d="M160 260h320v20H160z"/>
        </svg>
      );
    case 'malaysia':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-sm overflow-hidden border border-slate-200 shadow-2xs ${className}`}>
          <rect width="640" height="480" fill="#cc0000"/>
          <rect x="0" y="0" width="320" height="240" fill="#000066"/>
        </svg>
      );
    case 'canada':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-sm overflow-hidden border border-slate-200 shadow-2xs ${className}`}>
          <rect width="160" height="480" fill="#ff0000"/>
          <rect x="160" width="320" height="480" fill="#fff"/>
          <rect x="480" width="160" height="480" fill="#ff0000"/>
          <path fill="#ff0000" d="M320 140l20 60 50-20-30 60 40 40-60 10 10 50-30-30-30 30 10-50-60-10 40-40-30-60 50 20z"/>
        </svg>
      );
    case 'uk':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-sm overflow-hidden border border-slate-200 shadow-2xs ${className}`}>
          <path fill="#012169" d="M0 0h640v480H0z"/>
          <path fill="#FFF" d="m0 0 640 480M640 0 0 480"/>
          <path stroke="#C8102E" strokeWidth="40" d="m0 0 640 480M640 0 0 480"/>
          <path stroke="#FFF" strokeWidth="80" d="M320 0v480M0 240h640"/>
          <path stroke="#C8102E" strokeWidth="48" d="M320 0v480M0 240h640"/>
        </svg>
      );
    case 'usa':
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-sm overflow-hidden border border-slate-200 shadow-2xs ${className}`}>
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
    default:
      return (
        <svg viewBox="0 0 640 480" className={`inline-block rounded-sm overflow-hidden border border-slate-200 shadow-2xs ${className}`}>
          <rect width="640" height="480" fill="#0284c7"/>
          <circle cx="320" cy="240" r="120" fill="#fff"/>
        </svg>
      );
  }
};
