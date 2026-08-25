import { describe, expect, it } from 'vitest';
import { resolveVideoEmbed } from './videoEmbed';

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
    });
  });

  it.each([
    'https://www.facebook.com/watch/?v=1234567890',
    'https://www.facebook.com/practicallove/videos/1234567890/',
    'https://web.facebook.com/reel/1234567890',
    'https://www.facebook.com/video.php?v=1234567890',
    'https://fb.watch/aBcDeFgHiJ/',
  ])('embeds the Facebook video url %s', url => {
    const embed = resolveVideoEmbed(url);

    expect(embed?.provider).toBe('facebook');
    expect(embed?.label).toBe('Facebook');
    expect(embed?.kind).toBe('video');
    expect(embed?.embedUrl).toBe(
      `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`
    );
  });

  it.each([
    'https://www.facebook.com/practicallove/photos/a.123/456/',
    'https://www.facebook.com/photo/?fbid=1234567890',
    'https://www.facebook.com/photo.php?fbid=1234567890',
    'https://www.facebook.com/practicallove/posts/1234567890',
  ])('embeds the Facebook photo/post url %s', url => {
    const embed = resolveVideoEmbed(url);

    expect(embed?.provider).toBe('facebook');
    expect(embed?.label).toBe('Facebook');
    expect(embed?.kind).toBe('post');
    expect(embed?.embedUrl).toBe(
      `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}&show_text=false`
    );
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
