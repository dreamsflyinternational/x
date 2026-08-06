import { ViewType } from '../types';

export interface RouteState {
  view: ViewType;
  countryId?: string;
  blogSlug?: string;
  hotelId?: string;
  tourId?: string;
  umrahId?: string;
  airlineId?: string;
  citySlug?: string;
  lang?: 'bn' | 'en';
}

export function parsePath(pathname: string): RouteState {
  let raw = pathname.trim().replace(/\/$/, '') || '/';
  let lang: 'bn' | 'en' | undefined = undefined;

  // Extract /bn/ or /en/ language prefix if present
  if (raw === '/bn' || raw.startsWith('/bn/')) {
    lang = 'bn';
    raw = raw.replace(/^\/bn/, '') || '/';
  } else if (raw === '/en' || raw.startsWith('/en/')) {
    lang = 'en';
    raw = raw.replace(/^\/en/, '') || '/';
  }

  const cleanPath = raw.trim().replace(/\/$/, '') || '/';

  if (cleanPath === '/' || cleanPath === '/home') {
    return { view: 'home', lang };
  }
  if (cleanPath === '/about') {
    return { view: 'about', lang };
  }
  if (cleanPath === '/services' || cleanPath === '/visa') {
    return { view: 'services', lang };
  }
  if (cleanPath === '/countries') {
    return { view: 'countries', lang };
  }
  if (cleanPath.startsWith('/country/')) {
    const countryId = cleanPath.replace('/country/', '').toLowerCase();
    return { view: 'country-detail', countryId: countryId || 'canada', lang };
  }
  if (cleanPath === '/work-permit') {
    return { view: 'work-permit', lang };
  }

  // Umrah routes
  if (cleanPath === '/umrah-hajj' || cleanPath === '/hajj') {
    return { view: 'umrah-hajj', lang };
  }
  if (cleanPath.startsWith('/umrah-package/')) {
    const umrahId = cleanPath.replace('/umrah-package/', '').trim();
    return { view: 'umrah-detail', umrahId, lang };
  }
  if (cleanPath.startsWith('/umrah/')) {
    const umrahId = cleanPath.replace('/umrah/', '').trim();
    if (umrahId) {
      return { view: 'umrah-detail', umrahId, lang };
    }
    return { view: 'umrah-hajj', lang };
  }
  if (cleanPath === '/umrah') {
    return { view: 'umrah-hajj', lang };
  }

  if (cleanPath.startsWith('/airline/')) {
    const airlineId = cleanPath.replace('/airline/', '').trim();
    if (airlineId) {
      return { view: 'airline-detail', airlineId, lang };
    }
    return { view: 'air-tickets', lang };
  }
  if (cleanPath.startsWith('/air-tickets/airline/')) {
    const airlineId = cleanPath.replace('/air-tickets/airline/', '').trim();
    if (airlineId) {
      return { view: 'airline-detail', airlineId, lang };
    }
    return { view: 'air-tickets', lang };
  }

  if (cleanPath === '/air-tickets' || cleanPath === '/tickets') {
    return { view: 'air-tickets', lang };
  }

  // Tour routes
  if (cleanPath.startsWith('/tour/')) {
    const tourId = cleanPath.replace('/tour/', '').trim();
    if (tourId) {
      return { view: 'tour-detail', tourId, lang };
    }
    return { view: 'tours', lang };
  }
  if (cleanPath.startsWith('/tours/')) {
    const tourId = cleanPath.replace('/tours/', '').trim();
    if (tourId) {
      return { view: 'tour-detail', tourId, lang };
    }
    return { view: 'tours', lang };
  }
  if (cleanPath === '/tours') {
    return { view: 'tours', lang };
  }

  // Hotel routes
  if (cleanPath.startsWith('/hotel/')) {
    const hotelId = cleanPath.replace('/hotel/', '').trim();
    if (hotelId) {
      return { view: 'hotel-detail', hotelId, lang };
    }
    return { view: 'hotel', lang };
  }
  if (cleanPath.startsWith('/hotels/')) {
    const citySlug = cleanPath.replace('/hotels/', '').trim();
    if (citySlug) {
      return { view: 'hotel', citySlug, lang };
    }
    return { view: 'hotel', lang };
  }
  if (cleanPath === '/hotel' || cleanPath === '/hotels') {
    return { view: 'hotel', lang };
  }

  // Blog routes
  if (cleanPath.startsWith('/blog/')) {
    const blogSlug = cleanPath.replace('/blog/', '').trim();
    if (blogSlug) {
      return { view: 'blog-detail', blogSlug, lang };
    }
    return { view: 'blog', lang };
  }
  if (cleanPath === '/blog') {
    return { view: 'blog', lang };
  }

  if (cleanPath === '/contact') {
    return { view: 'contact', lang };
  }
  if (cleanPath === '/sitemap') {
    return { view: 'sitemap', lang };
  }
  if (cleanPath === '/privacy') {
    return { view: 'privacy', lang };
  }
  if (cleanPath === '/eligibility') {
    return { view: 'eligibility', lang };
  }
  if (cleanPath === '/calculator') {
    return { view: 'calculator', lang };
  }
  if (cleanPath === '/tracker') {
    return { view: 'tracker', lang };
  }
  if (cleanPath === '/ai-planner') {
    return { view: 'ai-planner', lang };
  }
  if (cleanPath === '/checklist') {
    return { view: 'checklist', lang };
  }
  if (cleanPath === '/comparison') {
    return { view: 'comparison', lang };
  }
  if (cleanPath === '/dashboard') {
    return { view: 'dashboard', lang };
  }

  // Fallback to home
  return { view: 'home', lang };
}

export function formatPath(
  view: ViewType,
  params?: {
    countryId?: string;
    blogSlug?: string;
    hotelId?: string;
    tourId?: string;
    umrahId?: string;
    airlineId?: string;
    citySlug?: string;
  } | string,
  lang?: 'bn' | 'en'
): string {
  const p = typeof params === 'string' ? { countryId: params } : params || {};

  let basePath = '/';
  switch (view) {
    case 'home':
      basePath = '/';
      break;
    case 'about':
      basePath = '/about';
      break;
    case 'services':
    case 'visa':
      basePath = '/services';
      break;
    case 'countries':
      basePath = '/countries';
      break;
    case 'country-detail':
      basePath = `/country/${p.countryId || 'canada'}`;
      break;
    case 'work-permit':
      basePath = '/work-permit';
      break;
    case 'umrah-hajj':
      basePath = p.umrahId ? `/umrah/${p.umrahId}` : '/umrah-hajj';
      break;
    case 'umrah-detail':
      basePath = `/umrah/${p.umrahId || 'economy'}`;
      break;
    case 'air-tickets':
      basePath = p.airlineId ? `/airline/${p.airlineId}` : '/air-tickets';
      break;
    case 'airline-detail':
      basePath = `/airline/${p.airlineId || 'emirates'}`;
      break;
    case 'tours':
      basePath = p.tourId ? `/tour/${p.tourId}` : '/tours';
      break;
    case 'tour-detail':
      basePath = `/tour/${p.tourId || 'thailand-5d4n'}`;
      break;
    case 'hotel':
      basePath = p.citySlug ? `/hotels/${p.citySlug}` : p.hotelId ? `/hotel/${p.hotelId}` : '/hotel';
      break;
    case 'hotel-detail':
      basePath = `/hotel/${p.hotelId || 'makkah-swissotel-clock'}`;
      break;
    case 'blog':
      basePath = p.blogSlug ? `/blog/${p.blogSlug}` : '/blog';
      break;
    case 'blog-detail':
      basePath = `/blog/${p.blogSlug || 'canada-visitor-visa-guide-bangladesh'}`;
      break;
    case 'contact':
      basePath = '/contact';
      break;
    case 'sitemap':
      basePath = '/sitemap';
      break;
    case 'privacy':
      basePath = '/privacy';
      break;
    case 'eligibility':
      basePath = '/eligibility';
      break;
    case 'calculator':
      basePath = '/calculator';
      break;
    case 'tracker':
      basePath = '/tracker';
      break;
    case 'ai-planner':
      basePath = '/ai-planner';
      break;
    case 'checklist':
      basePath = '/checklist';
      break;
    case 'comparison':
      basePath = '/comparison';
      break;
    case 'dashboard':
      basePath = '/dashboard';
      break;
    default:
      basePath = '/';
  }

  if (lang === 'bn' || lang === 'en') {
    return basePath;
  }

  return basePath;
}

export function navigateToPath(path: string) {
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path);
  }
}

