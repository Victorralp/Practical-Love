// Builds the <head> tags that Facebook, WhatsApp and X read when a
// /messages/:postId link is shared. Crawlers do not run JavaScript, so these
// tags have to be in the HTML the server returns.

export const SITE_URL = 'https://logosrhema.org.ng';
export const SITE_NAME = 'Practical Love Ministry (Logosrhema)';
export const DEFAULT_DESCRIPTION =
  'Read the latest teachings, ministry updates, and prayer focus from Practical Love Ministry (Logosrhema).';

export const DEFAULT_SHARE_IMAGE = {
  url: `${SITE_URL}/brand/practical-love-share.jpg`,
  width: 1200,
  height: 630,
};

/** Facebook's recommended link-preview size. */
const SHARE_WIDTH = 1200;
const SHARE_HEIGHT = 630;

/** Firebase push ids and hand-made keys: letters, digits, `-` and `_`. */
const POST_ID_PATTERN = /^[A-Za-z0-9_-]{1,128}$/;

const YOUTUBE_HOST_PATTERN = /(^|\.)(youtube\.com|youtube-nocookie\.com|youtu\.be)$/i;
const YOUTUBE_ID_PATTERN =
  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;

const CLOUDINARY_HOST = 'res.cloudinary.com';

export function isValidPostId(postId) {
  return typeof postId === 'string' && POST_ID_PATTERN.test(postId);
}

function safeUrl(value) {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function getYouTubeId(url) {
  const parsed = typeof url === 'string' ? safeUrl(url.trim()) : null;
  if (!parsed || !YOUTUBE_HOST_PATTERN.test(parsed.hostname)) return null;

  const match = url.trim().match(YOUTUBE_ID_PATTERN);
  return match && match[2].length === 11 ? match[2] : null;
}

/**
 * Cloudinary can crop an upload to 1200x630 on the fly, and render a video
 * frame as a JPEG, so every post gets a correctly sized preview image.
 */
function toCloudinaryShareImage(mediaUrl, resourceType) {
  const parsed = safeUrl(mediaUrl);
  if (!parsed || parsed.hostname !== CLOUDINARY_HOST) return null;

  const size = `c_fill,w_${SHARE_WIDTH},h_${SHARE_HEIGHT},q_auto`;

  if (resourceType === 'video' && parsed.pathname.includes('/video/upload/')) {
    parsed.pathname = parsed.pathname
      .replace('/video/upload/', `/video/upload/so_1,${size}/`)
      .replace(/\.[A-Za-z0-9]+$/, '.jpg');
    parsed.search = '';
    return { url: parsed.toString(), width: SHARE_WIDTH, height: SHARE_HEIGHT };
  }

  if (resourceType === 'image' && parsed.pathname.includes('/image/upload/')) {
    parsed.pathname = parsed.pathname.replace('/image/upload/', `/image/upload/${size},g_auto,f_jpg/`);
    return { url: parsed.toString(), width: SHARE_WIDTH, height: SHARE_HEIGHT };
  }

  return null;
}

/** Picks the best preview image for a post: its upload, its video, then the brand image. */
export function resolveShareImage(post) {
  const media = post && typeof post.media === 'object' ? post.media : null;

  if (media && typeof media.url === 'string') {
    const cloudinaryImage = toCloudinaryShareImage(media.url, media.resourceType);
    if (cloudinaryImage) return cloudinaryImage;

    const parsed = safeUrl(media.url);
    if (media.resourceType === 'image' && parsed?.protocol === 'https:') {
      return {
        url: parsed.toString(),
        width: typeof media.width === 'number' ? media.width : undefined,
        height: typeof media.height === 'number' ? media.height : undefined,
      };
    }
  }

  const youtubeId = getYouTubeId(post?.youtubeUrl);
  if (youtubeId) {
    return { url: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`, width: 480, height: 360 };
  }

  return DEFAULT_SHARE_IMAGE;
}

function toPlainText(value, maxLength) {
  if (typeof value !== 'string') return '';

  const collapsed = value.replace(/\s+/g, ' ').trim();
  if (collapsed.length <= maxLength) return collapsed;

  return `${collapsed.slice(0, maxLength - 1).trimEnd()}…`;
}

export function buildShareHead(post, postId) {
  const hasPost = Boolean(post && typeof post.title === 'string' && post.title.trim());
  const pageUrl = hasPost
    ? `${SITE_URL}/messages/${encodeURIComponent(postId)}`
    : `${SITE_URL}/messages`;
  const title = hasPost
    ? `${toPlainText(post.title, 90)} | ${SITE_NAME}`
    : `Messages | ${SITE_NAME}`;
  const description = hasPost
    ? toPlainText(post.summary, 200) || toPlainText(post.body, 200) || DEFAULT_DESCRIPTION
    : DEFAULT_DESCRIPTION;
  const image = hasPost ? resolveShareImage(post) : DEFAULT_SHARE_IMAGE;
  const imageAlt = hasPost ? toPlainText(post.title, 120) : SITE_NAME;

  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${hasPost ? 'index,follow,max-image-preview:large' : 'noindex,follow'}" />`,
    `<link rel="canonical" href="${escapeHtml(pageUrl)}" />`,
    `<meta property="og:type" content="${hasPost ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${escapeHtml(pageUrl)}" />`,
    `<meta property="og:image" content="${escapeHtml(image.url)}" />`,
    `<meta property="og:image:secure_url" content="${escapeHtml(image.url)}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />`,
  ];

  if (image.width && image.height) {
    tags.push(
      `<meta property="og:image:width" content="${image.width}" />`,
      `<meta property="og:image:height" content="${image.height}" />`
    );
  }

  if (hasPost && typeof post.createdAt === 'string') {
    tags.push(`<meta property="article:published_time" content="${escapeHtml(post.createdAt)}" />`);
  }

  tags.push(
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image.url)}" />`
  );

  return tags.join('\n    ');
}

const SEO_TAG_PATTERN =
  /<title>[\s\S]*?<\/title>\s*|<meta[^>]+(?:name|property)=["'](?:description|keywords|robots|twitter:[a-z:_]+|og:[a-z:_]+|article:[a-z:_]+)["'][^>]*>\s*|<link[^>]+rel=["']canonical["'][^>]*>\s*|<script[^>]+id=["']seo-json-ld["'][\s\S]*?<\/script>\s*/gi;

/** Replaces the page-level SEO tags of the built index.html with the post's tags. */
export function injectShareHead(html, head) {
  return html.replace(SEO_TAG_PATTERN, '').replace('</head>', `  ${head}\n  </head>`);
}
