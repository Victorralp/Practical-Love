import { useEffect, useState } from 'react';
import { subscribeToMessagePosts, type MessagePostRecord } from '../../services/messagePostsService';
import { resolveVideoEmbed } from '../../services/videoEmbed';
import { Em } from './primitives';

/** Pinned first, then newest. */
export function orderMessagePosts(posts: MessagePostRecord[]) {
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

/** Renders a title with its last word as the italic red emphasis. */
export function EmTitle({ title }: { title: string }) {
  const trimmed = title.trim();
  const cut = trimmed.lastIndexOf(' ');
  if (cut < 0) return <Em>{trimmed}</Em>;
  return (
    <>
      {trimmed.slice(0, cut)} <Em>{trimmed.slice(cut + 1)}</Em>
    </>
  );
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

/** Image, uploaded video or embedded video for a post, framed like the design's hero slot. */
export function PostMedia({ post, className = '' }: { post: MessagePostRecord; className?: string }) {
  const embed = resolveVideoEmbed(post.youtubeUrl);

  if (embed) {
    if (embed.warning) {
      return (
        <div className={`flex flex-col items-center justify-center gap-4 rounded-[28px] border-2 border-pl-ink bg-pl-blush p-8 text-center ${className}`}>
          <p className="m-0 max-w-[44ch] text-[16px] leading-[1.5] text-pl-body">{embed.warning}</p>
          <a href={embed.sourceUrl} target="_blank" rel="noreferrer noopener" className="pl-btn pl-btn-ink">
            Open on {embed.label}
          </a>
        </div>
      );
    }
    return (
      <div className={`relative overflow-hidden rounded-[28px] border-2 border-pl-ink bg-pl-ink ${embed.kind === 'post' ? 'aspect-[4/5]' : 'aspect-video'} ${className}`}>
        <iframe
          src={embed.embedUrl}
          title={post.title}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  if (!post.media) return null;

  return (
    <div className={`relative aspect-video overflow-hidden rounded-[28px] border-2 border-pl-ink bg-pl-blush ${className}`}>
      {post.media.resourceType === 'video' ? (
        <video src={post.media.url} controls preload="metadata" className="absolute inset-0 h-full w-full bg-pl-ink object-contain" />
      ) : (
        <img src={post.media.url} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      )}
    </div>
  );
}
