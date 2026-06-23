import { describe, expect, it } from 'vitest';
import { filterMessagePosts, type MessageCategoryFilter } from './messagePostFilters';
import type { MessagePostRecord } from './messagePostsService';

function makePost(
  id: string,
  category: string,
  overrides: Partial<MessagePostRecord> = {}
): MessagePostRecord {
  return {
    id,
    title: id,
    category,
    summary: '',
    body: '',
    author: 'Practical Love Team',
    pinned: false,
    media: null,
    reactions: { amen: 0, love: 0, insightful: 0 },
    comments: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  };
}

describe('message post filters', () => {
  it.each([
    ['announcement', ['ministry-update', 'event-notice', 'announcement', 'pinned-post']],
    ['teaching', ['teaching-note', 'video-post', 'youtube-post']],
    ['media', ['video-post', 'youtube-post']],
    ['pinned', ['pinned-post']],
  ] satisfies Array<[MessageCategoryFilter, string[]]>)(
    'returns the expected posts for %s',
    (filter, expectedIds) => {
      const posts = [
        makePost('ministry-update', 'Ministry update'),
        makePost('event-notice', 'Event notice'),
        makePost('announcement', 'Announcement'),
        makePost('teaching-note', 'Teaching note'),
        makePost('video-post', 'Teaching note', {
          media: {
            url: 'https://example.com/video.mp4',
            publicId: 'video',
            resourceType: 'video',
          },
        }),
        makePost('youtube-post', 'Teaching note', {
          youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        }),
        makePost('pinned-post', 'Prayer focus', { pinned: true }),
      ];

      expect(filterMessagePosts(posts, filter).map(post => post.id)).toEqual(expectedIds);
    }
  );
});
