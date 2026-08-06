export type LanguageCode = 'bn' | 'en';

export interface GeoLocationInfo {
  countryCode: string;
  countryName: string;
  isBangladesh: boolean;
  detectedLang: LanguageCode;
}

const STORAGE_KEY = 'df_user_lang_pref';

/**
 * Get user's saved manual language preference if any
 */
export function getSavedLanguagePreference(): LanguageCode | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (saved === 'bn' || saved === 'en') {
      return saved;
    }
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
  return null;
}

/**
 * Get current language from URL if present (/bn/ or /en/)
 */
export function getLanguageFromUrl(): LanguageCode | null {
  if (typeof window === 'undefined') return null;
  const p = window.location.pathname;
  if (p === '/bn' || p.startsWith('/bn/')) return 'bn';
  if (p === '/en' || p.startsWith('/en/')) return 'en';
  return null;
}

/**
 * Apply Google Translate cookie, update DOM select element, and sync URL pathname
 */
export function applyLanguage(
  lang: LanguageCode,
  savePreference = true,
  reloadOnSwitch = false
) {
  if (savePreference) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';

  if (lang === 'bn') {
    document.cookie = 'googtrans=/bn/bn; path=/;';
    document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    if (hostname) {
      document.cookie = `googtrans=/bn/bn; path=/; domain=${hostname};`;
      document.cookie = `googtrans=/bn/bn; path=/; domain=.${hostname};`;
      document.cookie = `googtrans=; path=/; domain=${hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
      document.cookie = `googtrans=; path=/; domain=.${hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    }
  } else {
    document.cookie = 'googtrans=/bn/en; path=/;';
    if (hostname) {
      document.cookie = `googtrans=/bn/en; path=/; domain=${hostname};`;
      document.cookie = `googtrans=/bn/en; path=/; domain=.${hostname};`;
    }
  }

  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname;
    let cleanPath = currentPath;
    if (cleanPath === '/bn' || cleanPath.startsWith('/bn/')) {
      cleanPath = cleanPath.replace(/^\/bn/, '') || '/';
    } else if (cleanPath === '/en' || cleanPath.startsWith('/en/')) {
      cleanPath = cleanPath.replace(/^\/en/, '') || '/';
    }
    const targetPath = cleanPath === '/' ? `/${lang}` : `/${lang}${cleanPath}`;

    if (currentPath !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }

    // Try instant translation via Google Translate combo box
    const triggerCombo = () => {
      const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (selectEl) {
        selectEl.value = lang;
        selectEl.dispatchEvent(new Event('change'));
        return true;
      }
      return false;
    };

    const success = triggerCombo();

    if (!success) {
      // Retry combo trigger after 100ms
      setTimeout(() => {
        const retrySuccess = triggerCombo();
        if (!retrySuccess && reloadOnSwitch) {
          if (currentPath !== targetPath) {
            window.location.href = targetPath;
          } else {
            window.location.reload();
          }
        }
      }, 100);
    } else if (reloadOnSwitch) {
      // If combo box was triggered, force a quick reload if needed or let instant translate work
      // If user clicked manually, reloading after setting cookies ensures 100% full SSR/SSG html translation
      setTimeout(() => {
        const iframe = document.querySelector('iframe.goog-te-banner-frame');
        if (!iframe && currentPath !== targetPath) {
          window.location.href = targetPath;
        }
      }, 200);
    }
  }
}

let cachedGeoPromise: Promise<GeoLocationInfo> | null = null;

/**
 * Auto-detect IP location and apply language accordingly
 * BD IP -> Bengali (bn)
 * Non-BD IP -> English (en)
 */
export function detectIpAndApplyLanguage(): Promise<GeoLocationInfo> {
  if (cachedGeoPromise) {
    return cachedGeoPromise;
  }

  cachedGeoPromise = (async () => {
    // If URL explicitly contains /bn/ or /en/, honor URL first!
    const urlLang = getLanguageFromUrl();
    if (urlLang) {
      applyLanguage(urlLang, false, false);
      const isBD = urlLang === 'bn';
      return {
        countryCode: isBD ? 'BD' : 'INTL',
        countryName: isBD ? 'Bangladesh' : 'International',
        isBangladesh: isBD,
        detectedLang: urlLang,
      };
    }

    // If user already explicitly chose a language, preserve their choice
    const manualPref = getSavedLanguagePreference();
    if (manualPref) {
      applyLanguage(manualPref, false, false);
      const isBD = manualPref === 'bn';
      return {
        countryCode: isBD ? 'BD' : 'INTL',
        countryName: isBD ? 'Bangladesh' : 'International',
        isBangladesh: isBD,
        detectedLang: manualPref,
      };
    }

    let countryCode = '';
    let countryName = '';
    let isBD = false;

    // 1. Fast 0ms Browser language & time zone check
    const navLang = (typeof navigator !== 'undefined' ? (navigator.language || navigator.languages?.[0] || '') : '').toLowerCase();
    let tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch(e){}

    if (navLang.includes('bn') || navLang.includes('bd') || tz.includes('Dhaka') || tz.includes('Asia/Dhaka')) {
      isBD = true;
      countryCode = 'BD';
      countryName = 'Bangladesh';
    }

    // 2. Try internal /api/geo-ip endpoint if running on fullstack node server
    if (!countryCode) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 800);
        const res = await fetch('/api/geo-ip', { signal: controller.signal }).catch(() => null);
        clearTimeout(timer);
        if (res && res.ok) {
          const data = await res.json();
          isBD = !!data.isBangladesh;
          countryCode = data.countryCode || (isBD ? 'BD' : 'INTL');
          countryName = data.countryName || (isBD ? 'Bangladesh' : 'International');
        }
      } catch (err) {
        // Silent catch
      }
    }

    // 3. Fallback default
    if (!countryCode) {
      countryCode = 'INTL';
      countryName = 'International';
      isBD = false;
    }

    const autoLang: LanguageCode = isBD ? 'bn' : 'en';

    // Apply auto-detected language
    applyLanguage(autoLang, false);

    return {
      countryCode,
      countryName: countryName || (isBD ? 'Bangladesh' : 'International'),
      isBangladesh: isBD,
      detectedLang: autoLang,
    };
  })();

  return cachedGeoPromise;
}

/**
 * Initialize Google Translate widget in background
 */
export function initGoogleTranslateScript() {
  if (document.getElementById('google-translate-script')) return;

  // Create hidden container if not present
  if (!document.getElementById('google_translate_element')) {
    const div = document.createElement('div');
    div.id = 'google_translate_element';
    div.style.display = 'none';
    document.body.appendChild(div);
  }

  // Define global init function
  window.googleTranslateElementInit = () => {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'bn',
          includedLanguages: 'bn,en',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    }
  };

  const script = document.createElement('script');
  script.id = 'google-translate-script';
  script.type = 'text/javascript';
  script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);
}

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}
