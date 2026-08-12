import routes from './routes.json';

export const SITE_NAME = 'Practical Love Ministry (Logosrhema)';
export const SITE_URL = 'https://logosrhema.org.ng';
export const FACEBOOK_URL = 'https://web.facebook.com/profile.php?id=61590900447700';
export const DEFAULT_IMAGE_PATH = '/love-hero-v2.png';
export const DEFAULT_DESCRIPTION =
  'Practical Love Ministry (Logosrhema) teaches biblical love through 1 Corinthians 13, family discipleship, the Yellow Card, and daily practice for homes, churches, and communities in Nigeria.';
export const DEFAULT_KEYWORDS = [
  'Practical Love',
  'biblical love',
  'family ministry Nigeria',
  '1 Corinthians 13',
];

export type SeoQuestion = {
  question: string;
  answer: string;
};

export type SeoRouteEntry = {
  path: string;
  name: string;
  title: string;
  description: string;
  keywords?: string[];
  changefreq?: string;
  priority?: number;
  indexable?: boolean;
  schemaType?: string;
  headline?: string;
  qa?: SeoQuestion[];
};

export const seoRoutes = routes as SeoRouteEntry[];

export function normalizePathname(pathname: string) {
  const cleaned = pathname.trim().replace(/\/+$/, '');
  return cleaned === '' ? '/' : cleaned;
}

export function getSeoRoute(pathname: string) {
  const normalizedPathname = normalizePathname(pathname);
  return seoRoutes.find(route => normalizePathname(route.path) === normalizedPathname) ?? null;
}

export function resolveRuntimeSiteUrl() {
  if (typeof window === 'undefined') {
    return SITE_URL;
  }

  const { hostname, origin } = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return origin;
  }

  return SITE_URL;
}

export function toAbsoluteUrl(pathname: string, siteUrl = SITE_URL) {
  if (/^https?:\/\//.test(pathname)) {
    return pathname;
  }

  const base = siteUrl.replace(/\/+$/, '');
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

export function buildSeoPayload(pathname: string, siteUrl = SITE_URL) {
  const route = getSeoRoute(pathname);
  const canonicalPath = route?.path ?? pathname;
  const canonicalUrl = toAbsoluteUrl(canonicalPath, siteUrl);
  const imageUrl = toAbsoluteUrl(DEFAULT_IMAGE_PATH, siteUrl);
  const keywords = route?.keywords?.length ? route.keywords : DEFAULT_KEYWORDS;
  const title = route?.title ?? `${SITE_NAME} | Biblical Love for Families and Communities`;
  const description = route?.description ?? DEFAULT_DESCRIPTION;
  const robots = route?.indexable === false ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';

  return {
    route,
    canonicalUrl,
    description,
    imageUrl,
    keywords,
    robots,
    title,
  };
}

export function buildStructuredData(pathname: string, siteUrl = SITE_URL) {
  const { canonicalUrl, description, imageUrl, route, title } = buildSeoPayload(pathname, siteUrl);

  const graph: Array<Record<string, unknown>> = [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: SITE_NAME,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
      email: 'logosrhema842@gmail.com',
      sameAs: [FACEBOOK_URL],
      areaServed: 'Nigeria',
      description: DEFAULT_DESCRIPTION,
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: SITE_NAME,
      inLanguage: 'en-NG',
      description: DEFAULT_DESCRIPTION,
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
    },
    {
      '@type': route?.schemaType ?? 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: title,
      headline: route?.headline ?? title,
      description,
      isPartOf: {
        '@id': `${siteUrl}/#website`,
      },
      about: {
        '@id': `${siteUrl}/#organization`,
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
      inLanguage: 'en-NG',
    },
  ];

  if (route?.qa?.length) {
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
