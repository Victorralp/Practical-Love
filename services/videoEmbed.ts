export type VideoProvider = 'youtube' | 'facebook' | 'vimeo' | 'tiktok' | 'instagram';

export type VideoEmbed = {
  provider: VideoProvider;
  /** Label shown on post badges. */
  label: string;
  /** URL to feed an <iframe src>. */
  embedUrl: string;
};

const YOUTUBE_ID_PATTERN =
  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;

const FACEBOOK_HOST_PATTERN = /(^|\.)(facebook\.com|fb\.watch|fb\.com)$/i;

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
  const match = url.match(YOUTUBE_ID_PATTERN);
  return match && match[2].length === 11 ? match[2] : null;
}

function isFacebookVideoUrl(url: string) {
  const parsed = safeUrl(url);
  return parsed ? FACEBOOK_HOST_PATTERN.test(parsed.hostname) : false;
}

/**
 * Facebook has no public "video id" embed endpoint — its plugin takes the whole
 * post/video URL as an encoded `href`, so any watch/reel/video permalink works.
 */
function toFacebookEmbedUrl(url: string) {
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    url
  )}&show_text=false`;
}

function resolveVimeo(url: string): VideoEmbed | null {
  const match = url.match(VIMEO_ID_PATTERN);
  if (!match) return null;

  return {
    provider: 'vimeo',
    label: 'Vimeo',
    embedUrl: `https://player.vimeo.com/video/${match[1]}`,
  };
}

function resolveTikTok(url: string): VideoEmbed | null {
  const match = url.match(TIKTOK_VIDEO_PATTERN);
  if (!match) return null;

  return {
    provider: 'tiktok',
    label: 'TikTok',
    embedUrl: `https://www.tiktok.com/embed/v2/${match[1]}`,
  };
}

function resolveInstagram(url: string): VideoEmbed | null {
  const match = url.match(INSTAGRAM_MEDIA_PATTERN);
  if (!match) return null;

  return {
    provider: 'instagram',
    label: 'Instagram',
    embedUrl: `https://www.instagram.com/p/${match[1]}/embed`,
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
      embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
    };
  }

  if (isFacebookVideoUrl(trimmed)) {
    return {
      provider: 'facebook',
      label: 'Facebook',
      embedUrl: toFacebookEmbedUrl(trimmed),
    };
  }

  // Short TikTok share links (vm.tiktok.com) can't be resolved to a video id
  // client-side, so they are treated as unsupported.
  return resolveVimeo(trimmed) ?? resolveTikTok(trimmed) ?? resolveInstagram(trimmed);
}
