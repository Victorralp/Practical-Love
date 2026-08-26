export type VideoProvider = 'youtube' | 'facebook' | 'vimeo' | 'tiktok' | 'instagram';

export type VideoEmbedKind = 'video' | 'post';

export type VideoEmbed = {
  provider: VideoProvider;
  /** Label shown on post badges. */
  label: string;
  /** URL to feed an <iframe src>. */
  embedUrl: string;
  /**
   * `video` renders inside a 16:9 media player; `post` renders a taller
   * social-post frame (used for Facebook photos and regular posts).
   */
  kind: VideoEmbedKind;
  /** Cleaned original link, used for the "open on Facebook" fallback. */
  sourceUrl: string;
  /** Set when the link will probably fail inside the provider's plugin. */
  warning?: string;
};

const YOUTUBE_HOST_PATTERN = /(^|\.)(youtube\.com|youtube-nocookie\.com|youtu\.be)$/i;

const YOUTUBE_ID_PATTERN =
  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;

const FACEBOOK_HOST_PATTERN = /(^|\.)(facebook\.com|fb\.watch|fb\.com)$/i;

/** Paths that are definitely videos; anything else on Facebook is a photo or post. */
const FACEBOOK_VIDEO_PATH_PATTERN = /\/(watch(?:\/|\?|$)|videos?\/|video\.php|reels?(?:\/|$))/i;

/** `facebook.com/share/p/xxxx` links are redirects the plugin cannot resolve. */
const FACEBOOK_SHARE_PATH_PATTERN = /^\/share\//i;

/**
 * Group posts are never embeddable — the plugin answers "no longer available"
 * even for a public group and a canonical permalink.
 */
const FACEBOOK_GROUP_PATH_PATTERN = /^\/groups\//i;

/**
 * Query params Facebook staples onto links copied from the app or from a feed.
 * The plugin treats a decorated permalink as a different (unknown) object and
 * answers with "This Facebook post is no longer available".
 */
const FACEBOOK_TRACKING_PARAM_PATTERN =
  /^(fbclid|mibextid|extid|rdid|share_url|sfnsn|wtsid|paipv|eav|_rdr|idorvanity|notif_id|notif_t|ref|refid|comment_id|reply_comment_id|__.+)$/i;

const FACEBOOK_SHARE_LINK_WARNING =
  'Facebook share links (facebook.com/share/…) cannot be embedded. Open the post on Facebook, copy the permalink from its date or ⋯ menu, and paste that instead. Group posts cannot be embedded at all — upload the image and paste the text into this post instead.';

const FACEBOOK_GROUP_LINK_WARNING =
  'Facebook group posts cannot be embedded — the plugin only accepts public Page or profile posts. Upload the image below and paste the post text into the message body instead.';

/** Fills the frame instead of the plugin's default 500px column. */
const FACEBOOK_PLUGIN_PARAMS = 'show_text=false&adapt_container_width=true&width=750';

const VIMEO_ID_PATTERN = /^https?:\/\/(?:www\.|player\.)?vimeo\.com\/(?:video\/)?(\d+)/i;

const TIKTOK_VIDEO_PATTERN =
  /^https?:\/\/(?:www\.)?tiktok\.com\/@[\w.-]+\/video\/(\d+)/i;

const INSTAGRAM_MEDIA_PATTERN =
  /^https?:\/\/(?:www\.)?instagram\.com\/(?:[A-Za-z0-9_.]+\/)?(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)/i;

function safeUrl(url: string): URL | null {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

export function getYouTubeId(url?: string | null) {
  if (!url) return null;

  // Without the host gate the `v/` branch also matches links such as
  // facebook.com/share/v/<id>, which are not YouTube videos.
  const parsed = safeUrl(url);
  if (!parsed || !YOUTUBE_HOST_PATTERN.test(parsed.hostname)) return null;

  const match = url.match(YOUTUBE_ID_PATTERN);
  return match && match[2].length === 11 ? match[2] : null;
}

/**
 * The plugins only resolve plain `www.facebook.com` permalinks, so mobile
 * hosts, the `l.php` link shim and tracking params are stripped first.
 */
function normalizeFacebookUrl(parsed: URL): URL {
  const url = new URL(parsed.href);
  const hostname = url.hostname.toLowerCase();

  if (hostname.endsWith('facebook.com') && url.pathname === '/l.php') {
    const wrapped = url.searchParams.get('u');
    const unwrapped = wrapped ? safeUrl(wrapped) : null;

    if (unwrapped && FACEBOOK_HOST_PATTERN.test(unwrapped.hostname)) {
      return normalizeFacebookUrl(unwrapped);
    }
  }

  url.protocol = 'https:';
  url.hash = '';

  // m./web./mbasic./free. hosts are rejected by the plugin; fb.watch is not.
  if (hostname !== 'fb.watch') {
    url.hostname = 'www.facebook.com';
  }

  for (const key of [...url.searchParams.keys()]) {
    if (FACEBOOK_TRACKING_PARAM_PATTERN.test(key)) {
      url.searchParams.delete(key);
    }
  }

  return url;
}

/**
 * Facebook has no public "video id" embed endpoint — its plugins take the whole
 * permalink URL as an encoded `href`. Videos use the video plugin, while photos
 * and regular posts use the post plugin.
 */
function resolveFacebook(url: string): VideoEmbed | null {
  const parsed = safeUrl(url);
  if (!parsed || !FACEBOOK_HOST_PATTERN.test(parsed.hostname)) return null;

  const normalized = normalizeFacebookUrl(parsed);
  const sourceUrl = normalized.toString();
  const href = encodeURIComponent(sourceUrl);
  const isVideo =
    normalized.hostname === 'fb.watch' || FACEBOOK_VIDEO_PATH_PATTERN.test(normalized.pathname);
  const plugin = isVideo ? 'video.php' : 'post.php';

  const embed: VideoEmbed = {
    provider: 'facebook',
    label: 'Facebook',
    kind: isVideo ? 'video' : 'post',
    embedUrl: `https://www.facebook.com/plugins/${plugin}?href=${href}&${FACEBOOK_PLUGIN_PARAMS}`,
    sourceUrl,
  };

  if (FACEBOOK_GROUP_PATH_PATTERN.test(normalized.pathname)) {
    return { ...embed, warning: FACEBOOK_GROUP_LINK_WARNING };
  }

  if (FACEBOOK_SHARE_PATH_PATTERN.test(normalized.pathname)) {
    return { ...embed, warning: FACEBOOK_SHARE_LINK_WARNING };
  }

  return embed;
}

function resolveVimeo(url: string): VideoEmbed | null {
  const match = url.match(VIMEO_ID_PATTERN);
  if (!match) return null;

  return {
    provider: 'vimeo',
    label: 'Vimeo',
    kind: 'video',
    embedUrl: `https://player.vimeo.com/video/${match[1]}`,
    sourceUrl: url,
  };
}

function resolveTikTok(url: string): VideoEmbed | null {
  const match = url.match(TIKTOK_VIDEO_PATTERN);
  if (!match) return null;

  return {
    provider: 'tiktok',
    label: 'TikTok',
    kind: 'video',
    embedUrl: `https://www.tiktok.com/embed/v2/${match[1]}`,
    sourceUrl: url,
  };
}

function resolveInstagram(url: string): VideoEmbed | null {
  const match = url.match(INSTAGRAM_MEDIA_PATTERN);
  if (!match) return null;

  return {
    provider: 'instagram',
    label: 'Instagram',
    kind: 'video',
    embedUrl: `https://www.instagram.com/p/${match[1]}/embed`,
    sourceUrl: url,
  };
}

export function resolveVideoEmbed(url?: string | null): VideoEmbed | null {
  if (!url) return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  const youtubeId = getYouTubeId(trimmed);
  if (youtubeId) {
    return {
      provider: 'youtube',
      label: 'YouTube',
      kind: 'video',
      embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
      sourceUrl: trimmed,
    };
  }

  const facebookEmbed = resolveFacebook(trimmed);
  if (facebookEmbed) return facebookEmbed;

  // Short TikTok share links (vm.tiktok.com) can't be resolved to a video id
  // client-side, so they are treated as unsupported.
  return resolveVimeo(trimmed) ?? resolveTikTok(trimmed) ?? resolveInstagram(trimmed);
}
