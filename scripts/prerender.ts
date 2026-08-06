import fs from 'fs';
import path from 'path';
import { injectSeoIntoHtml } from '../src/lib/serverSeo';
import { generateDualLanguageSitemapXml } from './generate-sitemap';

async function prerender() {
  console.log('🚀 Generating Dual Language XML Sitemap & Starting Pre-rendering SSG...');

  const distDir = path.join(process.cwd(), 'dist');
  const distIndexHtmlPath = path.join(distDir, 'index.html');
  const publicSitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');

  // First, generate fresh dual-language sitemap
  const sitemapXmlContent = generateDualLanguageSitemapXml();
  fs.writeFileSync(publicSitemapPath, sitemapXmlContent, 'utf-8');
  console.log('✅ Generated public/sitemap.xml with dual language (/bn/ & /en/) URLs!');

  if (!fs.existsSync(distIndexHtmlPath)) {
    console.error('❌ Error: dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  // Copy sitemap.xml to dist/sitemap.xml
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXmlContent, 'utf-8');

  const baseHtml = fs.readFileSync(distIndexHtmlPath, 'utf-8');

  // Extract all URLs from sitemap.xml
  let urls: string[] = ['/', '/bn', '/en'];
  if (fs.existsSync(publicSitemapPath)) {
    const sitemapXml = fs.readFileSync(publicSitemapPath, 'utf-8');
    const matches = sitemapXml.match(/<loc>(.*?)<\/loc>/g) || [];
    const extracted = matches
      .map((m) => m.replace(/<\/?loc>/g, '').trim())
      .map((fullUrl) => {
        try {
          const u = new URL(fullUrl);
          return u.pathname;
        } catch {
          return fullUrl.replace('https://dreamsfly.net', '');
        }
      })
      .filter((p) => p && p.length > 0);

    urls = Array.from(new Set(['/', '/bn', '/en', ...extracted]));
  }

  console.log(`📄 Found ${urls.length} URLs to pre-render static HTML for...`);

  let count = 0;
  for (const urlPath of urls) {
    const cleanPath = urlPath.trim().replace(/\/$/, '') || '/';
    const seoHtml = injectSeoIntoHtml(baseHtml, cleanPath);

    if (cleanPath === '/') {
      fs.writeFileSync(path.join(distDir, 'index.html'), seoHtml, 'utf-8');
    } else {
      const relativeClean = cleanPath.replace(/^\//, '');

      // 1. Write folder index.html e.g. dist/bn/blog/some-slug/index.html
      const folderPath = path.join(distDir, relativeClean);
      fs.mkdirSync(folderPath, { recursive: true });
      fs.writeFileSync(path.join(folderPath, 'index.html'), seoHtml, 'utf-8');

      // 2. Write direct .html file e.g. dist/bn/blog/some-slug.html
      const parentDir = path.dirname(path.join(distDir, relativeClean));
      fs.mkdirSync(parentDir, { recursive: true });
      fs.writeFileSync(path.join(distDir, `${relativeClean}.html`), seoHtml, 'utf-8');
    }
    count++;
  }

  // Create dist/404.html
  const notFoundSeoHtml = injectSeoIntoHtml(baseHtml, '/404');
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundSeoHtml, 'utf-8');

  console.log(`✅ Pre-rendering complete! Generated ${count} static SEO HTML pages in dist/`);
}

prerender().catch((err) => {
  console.error('❌ Pre-render failed:', err);
  process.exit(1);
});
