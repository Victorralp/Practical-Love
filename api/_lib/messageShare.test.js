import { describe, expect, it } from 'vitest';
import {
  DEFAULT_SHARE_IMAGE,
  buildShareHead,
  injectShareHead,
  isValidPostId,
  resolveShareImage,
} from './messageShare.js';

const basePost = {
  title: 'Love is patient',
  summary: 'A short teaching on 1 Corinthians 13.',
  body: 'Body text',
  media: null,
  youtubeUrl: null,
  createdAt: '2026-09-01T08:00:00.000Z',
};

describe('isValidPostId', () => {
  it('accepts Firebase push ids and rejects path tricks', () => {
    expect(isValidPostId('-O8abcDEF_123')).toBe(true);
    expect(isValidPostId('../secrets')).toBe(false);
    expect(isValidPostId('a/b')).toBe(false);
    expect(isValidPostId('')).toBe(false);
    expect(isValidPostId(undefined)).toBe(false);
  });
});

describe('resolveShareImage', () => {
  it('crops Cloudinary images to 1200x630', () => {
    const image = resolveShareImage({
      ...basePost,
      media: {
        url: 'https://res.cloudinary.com/demo/image/upload/v1712/posts/love.png',
        resourceType: 'image',
      },
    });

    expect(image).toEqual({
      url: 'https://res.cloudinary.com/demo/image/upload/c_fill,w_1200,h_630,q_auto,g_auto,f_jpg/v1712/posts/love.png',
      width: 1200,
      height: 630,
    });
  });

  it('turns Cloudinary videos into a JPEG frame', () => {
    const image = resolveShareImage({
      ...basePost,
      media: {
        url: 'https://res.cloudinary.com/demo/video/upload/v1712/posts/sermon.mp4',
        resourceType: 'video',
      },
    });

    expect(image.url).toBe(
      'https://res.cloudinary.com/demo/video/upload/so_1,c_fill,w_1200,h_630,q_auto/v1712/posts/sermon.jpg'
    );
    expect(image.width).toBe(1200);
  });

  it('uses the YouTube thumbnail for linked videos', () => {
    const image = resolveShareImage({
      ...basePost,
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    });

    expect(image.url).toBe('https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg');
  });

  it('falls back to the brand image for text and Facebook-link posts', () => {
    expect(resolveShareImage(basePost)).toBe(DEFAULT_SHARE_IMAGE);
    expect(
      resolveShareImage({ ...basePost, youtubeUrl: 'https://www.facebook.com/share/v/abc123/' })
    ).toBe(DEFAULT_SHARE_IMAGE);
  });
});

describe('buildShareHead', () => {
  it('describes the shared post with its own URL and image', () => {
    const head = buildShareHead(
      {
        ...basePost,
        media: {
          url: 'https://res.cloudinary.com/demo/image/upload/v1/love.jpg',
          resourceType: 'image',
        },
      },
      '-O8abc'
    );

    expect(head).toContain('<meta property="og:url" content="https://logosrhema.org.ng/messages/-O8abc" />');
    expect(head).toContain('<meta property="og:title" content="Love is patient | Practical Love Ministry (Logosrhema)" />');
    expect(head).toContain('<meta property="og:description" content="A short teaching on 1 Corinthians 13." />');
    expect(head).toContain('c_fill,w_1200,h_630');
    expect(head).toContain('<meta property="og:image:width" content="1200" />');
    expect(head).toContain('<meta property="og:type" content="article" />');
  });

  it('escapes post text', () => {
    const head = buildShareHead({ ...basePost, title: '"Love" <script>' }, 'x');
    expect(head).not.toContain('<script>');
    expect(head).toContain('&quot;Love&quot; &lt;script&gt;');
  });

  it('falls back to the messages page when the post is missing', () => {
    const head = buildShareHead(null, 'missing');
    expect(head).toContain('<meta property="og:url" content="https://logosrhema.org.ng/messages" />');
    expect(head).toContain(DEFAULT_SHARE_IMAGE.url);
    expect(head).toContain('noindex');
  });
});

describe('injectShareHead', () => {
  it('replaces existing SEO tags and keeps the app scripts', () => {
    const template = `<html><head>
    <meta charset="UTF-8" />
    <title>Home</title>
    <meta name="description" content="home" />
    <meta property="og:image" content="https://logosrhema.org.ng/old.png" />
    <meta property="og:image:width" content="1024" />
    <link rel="canonical" href="https://logosrhema.org.ng/" />
    <script id="seo-json-ld" type="application/ld+json">{}</script>
    <script type="module" src="/assets/index.js"></script>
  </head><body></body></html>`;

    const html = injectShareHead(template, buildShareHead(basePost, '-O8abc'));

    expect(html).not.toContain('old.png');
    expect(html).not.toContain('content="1024"');
    expect(html).not.toContain('<title>Home</title>');
    expect(html).toContain('<meta charset="UTF-8" />');
    expect(html).toContain('<script type="module" src="/assets/index.js"></script>');
    expect(html.match(/<title>/g)).toHaveLength(1);
    expect(html.match(/property="og:image"/g)).toHaveLength(1);
  });
});
