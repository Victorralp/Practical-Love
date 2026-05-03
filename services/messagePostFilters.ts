import type { MessagePostRecord } from './messagePostsService';

export type MessageCategoryFilter = 'all' | 'announcement' | 'teaching' | 'media' | 'pinned';

function normalizeCategory(category: string) {
  return category.trim().toLowerCase();
}

function isAnnouncementCategory(category: string) {
  const normalized = normalizeCategory(category);
  return (
    normalized.includes('announcement') ||
    normalized.includes('ministry update') ||
    normalized.includes('event notice') ||
    normalized.includes('prayer focus')
  );
}

function isTeachingCategory(category: string) {
  return normalizeCategory(category).includes('teaching');
}

export function filterMessagePosts(
  posts: MessagePostRecord[],
  filter: MessageCategoryFilter
): MessagePostRecord[] {
  if (filter === 'all') return posts;
  if (filter === 'pinned') return posts.filter(post => post.pinned);
  if (filter === 'media') return posts.filter(post => post.media !== null);
  if (filter === 'announcement') return posts.filter(post => isAnnouncementCategory(post.category));
  if (filter === 'teaching') return posts.filter(post => isTeachingCategory(post.category));

  return posts;
}

export function countMessagePosts(posts: MessagePostRecord[]) {
  return {
    all: posts.length,
    announcement: filterMessagePosts(posts, 'announcement').length,
    teaching: filterMessagePosts(posts, 'teaching').length,
    media: filterMessagePosts(posts, 'media').length,
    pinned: filterMessagePosts(posts, 'pinned').length,
  } satisfies Record<MessageCategoryFilter, number>;
}
