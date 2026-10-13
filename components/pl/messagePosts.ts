import { useEffect, useState } from 'react';
import { subscribeToMessagePosts, type MessagePostRecord } from '../../services/messagePostsService';

/** Pinned first, then newest. */
function orderMessagePosts(posts: MessagePostRecord[]) {
  return [...posts].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

/** Reading time at ~200 words a minute, never less than one. */
export function readMinutes(post: Pick<MessagePostRecord, 'body' | 'summary'>) {
  const words = `${post.summary} ${post.body}`.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatPostDate(isoDate: string) {
  const date = new Date(isoDate);
  return Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium' }).format(date);
}

type PostsState = { posts: MessagePostRecord[]; loading: boolean; error: string };

/** Live list of published message posts, ordered pinned-first. */
export function useMessagePosts(): PostsState {
  const [state, setState] = useState<PostsState>({ posts: [], loading: true, error: '' });

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setState(s => (s.loading ? { ...s, loading: false, error: 'Messages are taking a while to load. Refresh if nothing appears.' } : s)),
      8000
    );
    const unsubscribe = subscribeToMessagePosts(
      posts => {
        window.clearTimeout(timeout);
        setState({ posts: orderMessagePosts(posts), loading: false, error: '' });
      },
      error => {
        window.clearTimeout(timeout);
        setState(s => ({ ...s, loading: false, error: `We could not load the messages right now. ${error.message}` }));
      }
    );
    return () => {
      window.clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  return state;
}
