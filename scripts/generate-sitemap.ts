import fs from 'fs';
import path from 'path';
import { COUNTRIES } from '../src/data/countries';
import { BLOG_POSTS } from '../src/data/blogs';
import { FEATURED_HOTELS, CITY_LANDING_PAGES } from '../src/data/hotels';

const BASE_URL = 'https://dreamsfly.net';
const TODAY = new Date().toISOString().split('T')[0];

const CORE_PATHS = [
  '/',
  '/about',
  '/services',
  '/countries',
  '/work-permit',
  '/air-tickets',
  '/umrah-hajj',
  '/hotel',
  '/blog',
  '/contact',
  '/sitemap',
  '/privacy',
  '/eligibility',
  '/calculator',
  '/tracker',
  '/ai-planner',
  '/checklist',
  '/comparison',
];

const TOUR_PATHS = [
  '/tour/thailand-5d4n',
  '/tour/dubai-4d3n',
  '/tour/kashmir-5d4n',
  '/tour/maldives-3d2n',
  '/tour/singapore-malaysia-6d5n',
  '/tour/coxsbazar-3d2n',
];

const UMRAH_PATHS = [
  '/umrah/economy',
  '/umrah/vip',
  '/umrah/15-days',
  '/umrah/ramadan',
];

export function generateDualLanguageSitemapXml(): string {
  const routesSet = new Set<string>();

  CORE_PATHS.forEach((p) => routesSet.add(p));
  TOUR_PATHS.forEach((p) => routesSet.add(p));
  UMRAH_PATHS.forEach((p) => routesSet.add(p));

  COUNTRIES.forEach((c) => routesSet.add(`/country/${c.id}`));
  BLOG_POSTS.forEach((b) => routesSet.add(`/blog/${b.slug}`));
  FEATURED_HOTELS.forEach((h) => routesSet.add(`/hotel/${h.id}`));
  CITY_LANDING_PAGES.forEach((c) => routesSet.add(`/hotels/${c.slug}`));

  const routes = Array.from(routesSet);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  // Root homepage entry
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}/</loc>\n`;
  xml += `    <lastmod>${TODAY}</lastmod>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="bn" href="${BASE_URL}/bn/"/>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/en/"/>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en/"/>\n`;
  xml += `  </url>\n`;

  for (const route of routes) {
    const routeSuffix = route === '/' ? '' : route;
    const priority = route === '/' ? '1.0' : route.startsWith('/country/') || route.startsWith('/blog/') ? '0.9' : '0.8';

    // Bengali version
    const bnLoc = `${BASE_URL}/bn${routeSuffix}`;
    const enLoc = `${BASE_URL}/en${routeSuffix}`;

    xml += `  <url>\n`;
    xml += `    <loc>${bnLoc}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="bn" href="${bnLoc}"/>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${enLoc}"/>\n`;
    xml += `  </url>\n`;

    // English version
    xml += `  <url>\n`;
    xml += `    <loc>${enLoc}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="bn" href="${bnLoc}"/>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${enLoc}"/>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;
  return xml;
}

// Run script if executed directly
if (process.argv[1] && process.argv[1].includes('generate-sitemap')) {
  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const sitemapXml = generateDualLanguageSitemapXml();
  fs.writeFileSync(outputPath, sitemapXml, 'utf-8');
  console.log(`✅ Dual language XML sitemap generated successfully at public/sitemap.xml!`);
}
