import React from 'react';
import { useLanguage, Language } from '../lib/i18n';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'topbar' | 'navbar' | 'floating';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'topbar',
  className = '',
}) => {
  const { lang, setLang } = useLanguage();

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
  };

  if (variant === 'topbar') {
    return (
      <div className={`relative flex items-center ${className}`}>
        <div className="flex items-center bg-slate-900/60 rounded-lg p-0.5 border border-slate-700/80 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => handleLanguageChange('bn')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              lang === 'bn'
                ? 'bg-red-600 text-white shadow-sm font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
            title="বাংলা"
            aria-label="Switch language to Bangla"
          >
            <span className="w-3.5 h-3.5 rounded-full overflow-hidden flex items-center justify-center border border-white/20 shrink-0">
              <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
                <rect width="640" height="480" fill="#006a4e"/>
                <circle cx="280" cy="240" r="160" fill="#f42a41"/>
              </svg>
            </span>
            <span>বাংলা</span>
          </button>
          <button
            type="button"
            onClick={() => handleLanguageChange('en')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              lang === 'en'
                ? 'bg-red-600 text-white shadow-sm font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
            title="English"
            aria-label="Switch language to English"
          >
            <span className="w-3.5 h-3.5 rounded-full overflow-hidden flex items-center justify-center border border-white/20 shrink-0">
              <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
                <path fill="#012169" d="M0 0h640v480H0z"/>
                <path fill="#FFF" d="m0 0 640 480M640 0 0 480"/>
                <path stroke="#C8102E" strokeWidth="40" d="m0 0 640 480M640 0 0 480"/>
                <path stroke="#FFF" strokeWidth="80" d="M320 0v480M0 240h640"/>
                <path stroke="#C8102E" strokeWidth="48" d="M320 0v480M0 240h640"/>
              </svg>
            </span>
            <span>English</span>
          </button>
        </div>
      </div>
    );
  }

  // Navbar layout
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
        <button
          type="button"
          onClick={() => handleLanguageChange('bn')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
            lang === 'bn'
              ? 'bg-red-600 text-white shadow-sm font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span className="w-3.5 h-3.5 rounded-full overflow-hidden flex items-center justify-center border border-slate-300 shrink-0">
            <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
              <rect width="640" height="480" fill="#006a4e"/>
              <circle cx="280" cy="240" r="160" fill="#f42a41"/>
            </svg>
          </span>
          <span>বাংলা</span>
        </button>
        <button
          type="button"
          onClick={() => handleLanguageChange('en')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
            lang === 'en'
              ? 'bg-red-600 text-white shadow-sm font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span className="w-3.5 h-3.5 rounded-full overflow-hidden flex items-center justify-center border border-slate-300 shrink-0">
            <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
              <path fill="#012169" d="M0 0h640v480H0z"/>
              <path fill="#FFF" d="m0 0 640 480M640 0 0 480"/>
              <path stroke="#C8102E" strokeWidth="40" d="m0 0 640 480M640 0 0 480"/>
              <path stroke="#FFF" strokeWidth="80" d="M320 0v480M0 240h640"/>
              <path stroke="#C8102E" strokeWidth="48" d="M320 0v480M0 240h640"/>
            </svg>
          </span>
          <span>English</span>
        </button>
      </div>
    </div>
  );
};

