import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const publicDir = path.join(projectRoot, 'public');
const distIndexPath = path.join(distDir, 'index.html');
const routesPath = path.join(projectRoot, 'src', 'seo', 'routes.json');

const SITE_NAME = 'Practical Love';
const SITE_URL = 'https://logosrhema.org.ng';
const DEFAULT_IMAGE_PATH = '/love-hero-v2.png';
const DEFAULT_DESCRIPTION =
  'Practical Love teaches biblical love through 1 Corinthians 13, family discipleship, the Yellow Card, and daily practice for homes, churches, and communities in Nigeria.';

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function ensureDirectory(targetPath) {
  fs.mkdirSync(targetPath, { recursive: true });
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function escapeJsonLd(value) {
  return value.replaceAll('<', '\\u003c');
}

function normalizePathname(pathname) {
  const cleaned = pathname.trim().replace(/\/+$/, '');
  return cleaned === '' ? '/' : cleaned;
}

function toAbsoluteUrl(value) {
  if (/^https?:\/\//.test(value)) {
    return value;
  }

  const base = SITE_URL.replace(/\/+$/, '');
  const pathname = value.startsWith('/') ? value : `/${value}`;
  return `${base}${pathname}`;
}

function buildStructuredData(route) {
  const canonicalUrl = toAbsoluteUrl(route.path);
  const imageUrl = toAbsoluteUrl(DEFAULT_IMAGE_PATH);

  const graph = [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
      email: 'logosrhema842@gmail.com',
      areaServed: 'Nigeria',
      description: DEFAULT_DESCRIPTION,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: 'en-NG',
      description: DEFAULT_DESCRIPTION,
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
    },
    {
      '@type': route.schemaType || 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: route.title,
      headline: route.headline || route.title,
      description: route.description,
      isPartOf: {
        '@id': `${SITE_URL}/#website`,
      },
      about: {
        '@id': `${SITE_URL}/#organization`,
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
      inLanguage: 'en-NG',
    },
  ];

  if (Array.isArray(route.qa) && route.qa.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faq`,
      mainEntity: route.qa.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

function buildSeoHead(route) {
  const canonicalUrl = toAbsoluteUrl(route.path);
  const imageUrl = toAbsoluteUrl(DEFAULT_IMAGE_PATH);
  const keywords = Array.isArray(route.keywords) ? route.keywords.join(', ') : '';
  const robots =
    route.indexable === false
      ? 'noindex,nofollow'
      : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';
  const structuredData = escapeJsonLd(JSON.stringify(buildStructuredData(route)));

  return `
    <title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}" />
    <meta name="keywords" content="${escapeHtml(keywords)}" />
    <meta name="robots" content="${escapeHtml(robots)}" />
    <meta name="author" content="${escapeHtml(SITE_NAME)}" />
    <meta name="theme-color" content="#7c2d12" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:title" content="${escapeHtml(route.title)}" />
    <meta property="og:description" content="${escapeHtml(route.description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(route.title)}" />
    <meta name="twitter:description" content="${escapeHtml(route.description)}" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
    <script id="seo-json-ld" type="application/ld+json">${structuredData}</script>
  `.trim();
}

function injectSeoHead(html, route) {
  const seoTagPattern =
    /<title>[\s\S]*?<\/title>|<meta[^>]+(?:name|property)=["'](?:description|keywords|robots|author|theme-color|twitter:card|twitter:title|twitter:description|twitter:image|og:type|og:site_name|og:title|og:description|og:url|og:image)["'][^>]*>\s*|<link[^>]+rel=["']canonical["'][^>]*>\s*|<script[^>]+id=["']seo-json-ld["'][\s\S]*?<\/script>\s*/gi;

  const sanitized = html.replace(seoTagPattern, '');
  return sanitized.replace('</head>', `  ${buildSeoHead(route)}\n  </head>`);
}

function writeRouteHtml(route, templateHtml) {
  const routeHtml = injectSeoHead(templateHtml, route);

  if (normalizePathname(route.path) === '/') {
    fs.writeFileSync(distIndexPath, routeHtml, 'utf8');
    return;
  }

  const routePath = route.path.replace(/^\/+/, '');
  const targetDir = path.join(distDir, ...routePath.split('/'));
  ensureDirectory(targetDir);
  fs.writeFileSync(path.join(targetDir, 'index.html'), routeHtml, 'utf8');
}

function buildSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  routes
    .filter(route => route.indexable !== false)
    .forEach(route => {
      lines.push('  <url>');
      lines.push(`    <loc>${toAbsoluteUrl(route.path)}</loc>`);
      lines.push(`    <lastmod>${today}</lastmod>`);
      if (route.changefreq) {
        lines.push(`    <changefreq>${route.changefreq}</changefreq>`);
      }
      if (typeof route.priority === 'number') {
        lines.push(`    <priority>${route.priority.toFixed(1)}</priority>`);
      }
      lines.push('  </url>');
    });

  lines.push('</urlset>');
  return `${lines.join('\n')}\n`;
}

function buildRobots() {
  return `User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function main() {
  if (!fs.existsSync(distIndexPath)) {
    throw new Error('dist/index.html was not found. Run the Vite build before generating SEO assets.');
  }

  const routes = readJson(routesPath);
  const templateHtml = fs.readFileSync(distIndexPath, 'utf8');
  const sitemap = buildSitemap(routes);
  const robots = buildRobots();

  routes.forEach(route => {
    writeRouteHtml(route, templateHtml);
  });

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robots, 'utf8');

  ensureDirectory(publicDir);
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf8');
}

main();
