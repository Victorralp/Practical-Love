import { describe, expect, it } from 'vitest';
import { resolveVideoEmbed } from './videoEmbed';

const FACEBOOK_PLUGIN_PARAMS = 'show_text=false&adapt_container_width=true&width=750';

function facebookPluginUrl(plugin: 'post.php' | 'video.php', href: string) {
  return `https://www.facebook.com/plugins/${plugin}?href=${encodeURIComponent(
    href
  )}&${FACEBOOK_PLUGIN_PARAMS}`;
}

describe('resolveVideoEmbed', () => {
  it.each([
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://youtu.be/dQw4w9WgXcQ',
    'https://www.youtube.com/shorts/dQw4w9WgXcQ',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
  ])('embeds the YouTube url %s', url => {
    expect(resolveVideoEmbed(url)).toEqual({
      provider: 'youtube',
      label: 'YouTube',
      kind: 'video',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      sourceUrl: url,
    });
  });

  it.each([
    ['https://www.facebook.com/watch/?v=1234567890', 'https://www.facebook.com/watch/?v=1234567890'],
    [
      'https://www.facebook.com/practicallove/videos/1234567890/',
      'https://www.facebook.com/practicallove/videos/1234567890/',
    ],
    ['https://web.facebook.com/reel/1234567890', 'https://www.facebook.com/reel/1234567890'],
    [
      'https://www.facebook.com/video.php?v=1234567890',
      'https://www.facebook.com/video.php?v=1234567890',
    ],
    ['https://fb.watch/aBcDeFgHiJ/', 'https://fb.watch/aBcDeFgHiJ/'],
  ])('embeds the Facebook video url %s', (url, canonical) => {
    expect(resolveVideoEmbed(url)).toEqual({
      provider: 'facebook',
      label: 'Facebook',
      kind: 'video',
      embedUrl: facebookPluginUrl('video.php', canonical),
      sourceUrl: canonical,
    });
  });

  it.each([
    [
      'https://www.facebook.com/practicallove/photos/a.123/456/',
      'https://www.facebook.com/practicallove/photos/a.123/456/',
    ],
    ['https://www.facebook.com/photo/?fbid=1234567890', 'https://www.facebook.com/photo/?fbid=1234567890'],
    [
      'https://www.facebook.com/photo.php?fbid=1234567890',
      'https://www.facebook.com/photo.php?fbid=1234567890',
    ],
    [
      'https://www.facebook.com/practicallove/posts/1234567890',
      'https://www.facebook.com/practicallove/posts/1234567890',
    ],
  ])('embeds the Facebook photo/post url %s', (url, canonical) => {
    expect(resolveVideoEmbed(url)).toEqual({
      provider: 'facebook',
      label: 'Facebook',
      kind: 'post',
      embedUrl: facebookPluginUrl('post.php', canonical),
      sourceUrl: canonical,
    });
  });

  it.each([
    // Mobile and regional hosts are rejected by the plugin.
    ['https://m.facebook.com/photo.php?fbid=123', 'https://www.facebook.com/photo.php?fbid=123'],
    ['https://mbasic.facebook.com/photo.php?fbid=123', 'https://www.facebook.com/photo.php?fbid=123'],
    ['http://web.facebook.com/photo.php?fbid=123', 'https://www.facebook.com/photo.php?fbid=123'],
    // Tracking params make the plugin resolve a different (unknown) object.
    [
      'https://www.facebook.com/photo.php?fbid=123&mibextid=abc&rdid=xyz&__cft__[0]=q',
      'https://www.facebook.com/photo.php?fbid=123',
    ],
    [
      'https://www.facebook.com/practicallove/posts/123?fbclid=IwAR9&ref=share#comments',
      'https://www.facebook.com/practicallove/posts/123',
    ],
    // The l.php link shim wraps the real permalink in ?u=.
    [
      'https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebook.com%2Fphoto.php%3Ffbid%3D123&h=AT0',
      'https://www.facebook.com/photo.php?fbid=123',
    ],
  ])('normalizes %s before embedding it', (url, canonical) => {
    const embed = resolveVideoEmbed(url);

    expect(embed?.sourceUrl).toBe(canonical);
    expect(embed?.embedUrl).toBe(facebookPluginUrl('post.php', canonical));
    expect(embed?.warning).toBeUndefined();
  });

  it.each([
    'https://www.facebook.com/share/p/1AbCdEfGhI/',
    'https://web.facebook.com/share/v/1AbCdEfGhI/?mibextid=abc',
  ])('flags the unembeddable share link %s', url => {
    const embed = resolveVideoEmbed(url);

    expect(embed?.provider).toBe('facebook');
    expect(embed?.warning).toContain('share links');
  });

  it.each([
    'https://www.facebook.com/groups/3834297119985924/posts/27871510005837966/',
    'https://www.facebook.com/groups/3834297119985924/permalink/27871510005837966/?rdid=d8F3IQ',
  ])('flags the unembeddable group post %s', url => {
    const embed = resolveVideoEmbed(url);

    expect(embed?.provider).toBe('facebook');
    expect(embed?.kind).toBe('post');
    expect(embed?.warning).toContain('group posts');
  });

  it.each([
    ['https://vimeo.com/76979871', 'https://player.vimeo.com/video/76979871'],
    ['https://www.vimeo.com/76979871', 'https://player.vimeo.com/video/76979871'],
    ['https://vimeo.com/video/76979871', 'https://player.vimeo.com/video/76979871'],
    ['https://player.vimeo.com/video/76979871', 'https://player.vimeo.com/video/76979871'],
  ])('embeds the Vimeo url %s', (url, embedUrl) => {
    expect(resolveVideoEmbed(url)).toEqual({
      provider: 'vimeo',
      label: 'Vimeo',
      kind: 'video',
      embedUrl,
      sourceUrl: url,
    });
  });

  it.each([
    [
      'https://www.tiktok.com/@practicallove/video/7123456789012345678',
      'https://www.tiktok.com/embed/v2/7123456789012345678',
    ],
  ])('embeds the TikTok url %s', (url, embedUrl) => {
    expect(resolveVideoEmbed(url)).toEqual({
      provider: 'tiktok',
      label: 'TikTok',
      kind: 'video',
      embedUrl,
      sourceUrl: url,
    });
  });

  it.each([
    [
      'https://www.instagram.com/reel/CxAbCdEfGhI/',
      'https://www.instagram.com/p/CxAbCdEfGhI/embed',
    ],
    [
      'https://www.instagram.com/p/CxAbCdEfGhI/',
      'https://www.instagram.com/p/CxAbCdEfGhI/embed',
    ],
  ])('embeds the Instagram url %s', (url, embedUrl) => {
    expect(resolveVideoEmbed(url)).toEqual({
      provider: 'instagram',
      label: 'Instagram',
      kind: 'video',
      embedUrl,
      sourceUrl: url,
    });
  });

  it.each([
    undefined,
    null,
    '',
    '   ',
    'not a url',
    // Short TikTok share links can't be resolved to an embeddable video id.
    'https://vm.tiktok.com/ZMabcdefg/',
    // Vimeo must be a numeric video url.
    'https://vimeo.com/practicallove',
  ])('returns null for %s', value => {
    expect(resolveVideoEmbed(value)).toBeNull();
  });

  it('trims surrounding whitespace before matching', () => {
    expect(resolveVideoEmbed('  https://youtu.be/dQw4w9WgXcQ  ')?.provider).toBe('youtube');
  });
});
