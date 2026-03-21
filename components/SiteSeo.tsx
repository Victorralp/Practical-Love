import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  buildSeoPayload,
  buildStructuredData,
  resolveRuntimeSiteUrl,
  SITE_NAME,
} from '../src/seo/routeSeo';

function upsertMeta(
  selector: string,
  attributes: Record<string, string>,
  content: string
) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
  element.setAttribute('content', content);
  element.setAttribute('data-seo-managed', 'true');
}

function upsertLink(selector: string, rel: string, href: string) {
  let element = document.head.querySelector(selector) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  element.setAttribute('rel', rel);
  element.setAttribute('href', href);
  element.setAttribute('data-seo-managed', 'true');
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
  let element = document.head.querySelector(`#${id}`) as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.id = id;
    element.setAttribute('data-seo-managed', 'true');
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

export default function SiteSeo() {
  const location = useLocation();

  useEffect(() => {
    const siteUrl = resolveRuntimeSiteUrl();
    const { canonicalUrl, description, imageUrl, keywords, robots, title } = buildSeoPayload(
      location.pathname,
      siteUrl
    );

    document.title = title;
    document.documentElement.lang = 'en';

    upsertMeta('meta[name="description"]', { name: 'description' }, description);
    upsertMeta('meta[name="keywords"]', { name: 'keywords' }, keywords.join(', '));
    upsertMeta('meta[name="robots"]', { name: 'robots' }, robots);
    upsertMeta('meta[name="author"]', { name: 'author' }, SITE_NAME);
    upsertMeta('meta[name="theme-color"]', { name: 'theme-color' }, '#7c2d12');

    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, 'website');
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, SITE_NAME);
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, title);
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, description);
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl);
    upsertMeta('meta[property="og:image"]', { property: 'og:image' }, imageUrl);

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, title);
    upsertMeta(
      'meta[name="twitter:description"]',
      { name: 'twitter:description' },
      description
    );
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, imageUrl);

    upsertLink('link[rel="canonical"]', 'canonical', canonicalUrl);
    upsertJsonLd('seo-json-ld', buildStructuredData(location.pathname, siteUrl));
  }, [location.pathname]);

  return null;
}
