import { describe, expect, it } from 'vitest';
import { normalizeMessagePost, type MessagePostRecord } from './messagePostsService';

describe('normalizeMessagePost', () => {
  it('fills in every field a legacy post is missing so it stays editable', () => {
    const post = normalizeMessagePost('legacy-1', {
      title: 'Old post',
      summary: 'Written before the current editor existed.',
      body: 'Body text.',
      createdAt: '2025-01-01T00:00:00.000Z',
    } as Partial<MessagePostRecord>);

    expect(post).toMatchObject({
      id: 'legacy-1',
      category: 'Ministry update',
      author: 'Practical Love Team',
      pinned: false,
      media: null,
      youtubeUrl: null,
      reactions: { amen: 0, love: 0, insightful: 0 },
      comments: [],
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    });
  });

  it('reads comments stored as a keyed object, not only as an array', () => {
    const post = normalizeMessagePost('legacy-2', {
      title: 'Old post',
      createdAt: '2025-01-01T00:00:00.000Z',
      comments: {
        'comment-b': { id: 'comment-b', author: 'Ada', body: 'Second', createdAt: '2025-01-03T00:00:00.000Z' },
        'comment-a': { author: 'Bode', body: 'First', createdAt: '2025-01-02T00:00:00.000Z' },
      },
    } as unknown as Partial<MessagePostRecord>);

    expect(post.comments.map(comment => comment.id)).toEqual(['comment-a', 'comment-b']);
    expect(post.comments[0].body).toBe('First');
  });

  it('falls back to a sortable date when the post has no timestamps', () => {
    const post = normalizeMessagePost('legacy-3', { title: 'Undated' } as Partial<MessagePostRecord>);

    expect(Number.isNaN(new Date(post.createdAt).getTime())).toBe(false);
    expect(post.updatedAt).toBe(post.createdAt);
  });

  it('keeps existing values untouched', () => {
    const post = normalizeMessagePost('modern-1', {
      title: 'Current post',
      category: 'Teaching note',
      summary: 'Summary',
      body: 'Body',
      author: 'Pastor',
      pinned: true,
      media: null,
      youtubeUrl: 'https://www.facebook.com/practicallove/posts/123',
      reactions: { amen: 4, love: 2, insightful: 1 },
      comments: [],
      createdAt: '2026-08-01T00:00:00.000Z',
      updatedAt: '2026-08-02T00:00:00.000Z',
    } as Partial<MessagePostRecord>);

    expect(post.reactions).toEqual({ amen: 4, love: 2, insightful: 1 });
    expect(post.pinned).toBe(true);
    expect(post.updatedAt).toBe('2026-08-02T00:00:00.000Z');
  });
});
