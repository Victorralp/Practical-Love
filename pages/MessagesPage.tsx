import { useEffect, useMemo, useRef, useState, type ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  CalendarDays,
  FileImage,
  Heart,
  Loader,
  Megaphone,
  MessageSquare,
  Pin,
  ScrollText,
  Send,
  Share2,
  Sparkles,
  Video,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { PageHero, PageShell, SectionCard } from '../components/ui';
import ReactionBar from '../components/ReactionBar';
import PrayerWall from '../components/PrayerWall';
import PostSkeleton from '../components/PostSkeleton';
import MessageVideoPlayer from '../components/MessageVideoPlayer';
import {
  addCommentToMessagePost,
  subscribeToMessagePosts,
  type MessagePostRecord,
} from '../services/messagePostsService';
import {
  countMessagePosts,
  filterMessagePosts,
  type MessageCategoryFilter,
} from '../services/messagePostFilters';

// ── Helpers ─────────────────────────────────────────────────────────

function timeAgo(isoDate: string): string {
  const seconds = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium' }).format(new Date(isoDate));
}

function formatFullDate(isoDate: string) {
  return new Intl.DateTimeFormat('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate));
}

// ── Types ───────────────────────────────────────────────────────────

type TabId = 'feed' | 'prayer';

const CATEGORY_TABS: {
  id: MessageCategoryFilter;
  label: string;
  icon: ComponentType<{ className?: string }>;
}[] = [
  { id: 'all', label: 'All', icon: ScrollText },
  { id: 'announcement', label: 'Updates', icon: Megaphone },
  { id: 'teaching', label: 'Teaching', icon: BookOpen },
  { id: 'media', label: 'Media', icon: Video },
  { id: 'pinned', label: 'Pinned', icon: Pin },
];

const WEEKLY_PRACTICES = [
  'Before you react, pause.',
  'Before you answer, listen.',
  'Before you correct, love.',
] as const;

// ── Share helper ────────────────────────────────────────────────────

async function sharePost(post: MessagePostRecord) {
  const url = window.location.href;
  const text = `${post.title}\n${post.summary}`;

  if (navigator.share) {
    try {
      await navigator.share({ title: post.title, text, url });
      return;
    } catch {
      // User cancelled or share failed — fall through to clipboard
    }
  }

  try {
    await navigator.clipboard.writeText(`${text}\n${url}`);
    // Could show a toast here
  } catch {
    // Clipboard failed
  }
}

// ═══════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════

export default function MessagesPage() {
  const [posts, setPosts] = useState<MessagePostRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('Loading ministry posts...');
  const [commentForms, setCommentForms] = useState<
    Record<string, { author: string; body: string }>
  >({});
  const [submittingCommentId, setSubmittingCommentId] = useState<string | null>(null);
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const commentTextareas = useRef<Record<string, HTMLTextAreaElement | null>>({});

  // Tabs & filters
  const [activeTab, setActiveTab] = useState<TabId>('feed');
  const [categoryFilter, setCategoryFilter] = useState<MessageCategoryFilter>('all');

  useEffect(() => {
    const loadingTimeout = window.setTimeout(() => {
      setIsLoading(false);
      setStatusMessage(
        'Messages are still loading. Please wait a moment, then refresh if nothing appears.'
      );
    }, 8000);

    const unsubscribe = subscribeToMessagePosts(
      loadedPosts => {
        window.clearTimeout(loadingTimeout);
        setPosts(loadedPosts);
        setIsLoading(false);
        setStatusMessage(
          loadedPosts.length > 0
            ? 'Latest ministry posts loaded.'
            : 'No messages have been published yet. Please check back soon.'
        );
      },
      error => {
        window.clearTimeout(loadingTimeout);
        setStatusMessage(`We could not load the messages right now. ${error.message}`);
        setIsLoading(false);
      }
    );

    return () => {
      window.clearTimeout(loadingTimeout);
      unsubscribe();
    };
  }, []);

  // ── Derived data ────────────────────────────────────────────────────

  const orderedPosts = useMemo(
    () =>
      [...posts].sort((a, b) => {
        if (a.pinned !== b.pinned) {
          return a.pinned ? -1 : 1;
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    return filterMessagePosts(orderedPosts, categoryFilter);
  }, [orderedPosts, categoryFilter]);

  const categoryCounts = useMemo(() => {
    return countMessagePosts(orderedPosts);
  }, [orderedPosts]);

  // ── Comment handlers ────────────────────────────────────────────────

  const handleCommentChange = (postId: string, field: 'author' | 'body', value: string) => {
    setCommentForms(current => ({
      ...current,
      [postId]: {
        author: current[postId]?.author || '',
        body: current[postId]?.body || '',
        [field]: value,
      },
    }));
  };

  const handleCommentSubmit = async (postId: string) => {
    const form = commentForms[postId] || { author: '', body: '' };
    const author = form.author.trim() || 'Anonymous visitor';
    const body = form.body.trim();

    if (!body) {
      setStatusMessage('Comment text is required.');
      return;
    }

    setSubmittingCommentId(postId);

    try {
      await addCommentToMessagePost(postId, { author, body });
      setCommentForms(current => ({
        ...current,
        [postId]: {
          author: current[postId]?.author || '',
          body: '',
        },
      }));
      setStatusMessage('Comment added.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to add comment.');
    } finally {
      setSubmittingCommentId(null);
    }
  };

  const handleQuickAmen = async (postId: string) => {
    setSubmittingCommentId(postId);
    try {
      await addCommentToMessagePost(postId, { author: 'Community member', body: '🙏 Amen!' });
    } catch {
      // Silently fail
    } finally {
      setSubmittingCommentId(null);
    }
  };

  const handleRespondToPost = (postId: string) => {
    setOpenComments(current => ({
      ...current,
      [postId]: true,
    }));
    setStatusMessage('Comment box opened. Share what you received from the message.');

    window.setTimeout(() => {
      commentTextareas.current[postId]?.focus();
    }, 150);
  };

  // ══════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════

  return (
    <PageShell className="bg-[radial-gradient(circle_at_top_left,_rgba(254,215,170,0.28),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(248,113,113,0.16),_transparent_34%),linear-gradient(180deg,_#fffaf5_0%,_#ffffff_50%,_#fff7ed_100%)]">
      <div className="space-y-8">
        <PageHero
          compact
          badge={
            <>
              <Megaphone className="h-4 w-4" />
              Community Hub
            </>
          }
          icon={
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 text-white shadow-lg">
              <Logo className="h-7 w-7" />
            </div>
          }
          title="Messages for the Practical Love family"
          subtitle="Read the latest teachings, ministry updates, and prayer focus. Then respond with one practical step of love."
          actions={
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn-brand px-7 py-3">
                Contact the ministry
              </Link>
              <Link to="/resources" className="btn-outline-brand px-7 py-3">
                Explore resources
              </Link>
            </div>
          }
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                Latest teaching
              </p>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                Read, watch & reflect
              </p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                Prayer focus
              </p>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                Share & intercede together
              </p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                Community response
              </p>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                Encourage one another
              </p>
            </div>
          </div>
        </PageHero>

        {/* ── Main Tab Switcher ──────────────────────────────────────── */}
        <div className="flex gap-2 rounded-2xl border border-orange-100 bg-white/90 p-1.5 shadow-sm backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setActiveTab('feed')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
              activeTab === 'feed'
                ? 'bg-gradient-to-r from-red-700 to-red-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-orange-50 hover:text-red-700'
            }`}
          >
            <Megaphone className="h-4 w-4" />
            Message Feed
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('prayer')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
              activeTab === 'prayer'
                ? 'bg-gradient-to-r from-red-700 to-red-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-orange-50 hover:text-red-700'
            }`}
          >
            <Heart className="h-4 w-4" />
            Prayer Wall
          </button>
        </div>

        <SectionCard className="border-orange-100 bg-white/92 shadow-lg">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                This week's love practice
              </p>
              <h2 className="mt-2 text-3xl font-serif text-red-800">
                Let every message become a step.
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-gray-600">
                The feed is not only for information. It is a place to pause, pray, and practice the
                love of God in ordinary life.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {WEEKLY_PRACTICES.map((practice, index) => (
                <div
                  key={practice}
                  className="rounded-[1.35rem] border border-orange-100 bg-orange-50/80 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-red-700">
                    {index + 1}
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-6 text-gray-800">{practice}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* FEED TAB                                                    */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          {activeTab === 'feed' && (
            <motion.div
              key="feed"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <SectionCard className="border-red-100 bg-white/95 shadow-lg">
                {/* Header + Category Filters */}
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                      Public feed
                    </p>
                    <h2 className="mt-2 text-3xl font-serif text-red-800">Latest posts</h2>
                  </div>
                  <p className="text-sm text-gray-500">
                    {isLoading
                      ? statusMessage
                      : `${filteredPosts.length} post(s) available`}
                  </p>
                </div>

                {/* Category Filter Tabs */}
                {!isLoading && orderedPosts.length > 0 && (
                  <div className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {CATEGORY_TABS.map(tab => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setCategoryFilter(tab.id)}
                          className={`inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                            categoryFilter === tab.id
                              ? 'border-red-200 bg-red-50 text-red-700 shadow-sm'
                              : 'border-orange-100 bg-white text-gray-500 hover:border-orange-200 hover:text-gray-700'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {tab.label}
                          {categoryCounts[tab.id] > 0 && (
                            <span
                              className={`ml-1 tabular-nums ${categoryFilter === tab.id ? 'text-red-500' : 'text-gray-400'}`}
                            >
                              {categoryCounts[tab.id]}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Post List */}
                {isLoading ? (
                  <PostSkeleton count={3} />
                ) : filteredPosts.length === 0 ? (
                  <div className="mt-8 rounded-2xl border border-orange-100 bg-orange-50 px-6 py-10 text-center text-gray-700">
                    <p className="text-lg font-semibold text-[#3d1d17]">
                      {categoryFilter === 'all'
                        ? 'No posts available right now.'
                        : `No ${categoryFilter} posts found.`}
                    </p>
                    <p className="mt-3 text-sm leading-7">{statusMessage}</p>
                    {categoryFilter !== 'all' && (
                      <button
                        type="button"
                        onClick={() => setCategoryFilter('all')}
                        className="btn-outline-brand mt-5 px-6 py-3"
                      >
                        Show all posts
                      </button>
                    )}
                    {categoryFilter === 'all' && (
                      <div className="mt-5">
                        <Link to="/contact" className="btn-outline-brand px-6 py-3">
                          Contact the ministry
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-6 space-y-5">
                    <AnimatePresence initial={false}>
                      {filteredPosts.map((post, index) => (
                        <motion.article
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ delay: index * 0.04, duration: 0.35 }}
                          layout
                          className="rounded-[1.8rem] border border-orange-100 bg-[linear-gradient(135deg,_rgba(255,255,255,0.98)_0%,_rgba(255,247,237,0.95)_100%)] p-6 shadow-sm"
                        >
                          {/* Badges */}
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-red-700">
                                {post.category}
                              </span>
                              {post.pinned ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                                  <Pin className="h-3.5 w-3.5" />
                                  Pinned
                                </span>
                              ) : null}
                              {post.media ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-orange-700">
                                  {post.media.resourceType === 'video' ? (
                                    <Video className="h-3.5 w-3.5" />
                                  ) : (
                                    <FileImage className="h-3.5 w-3.5" />
                                  )}
                                  {post.media.resourceType}
                                </span>
                              ) : null}
                              {post.youtubeUrl ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-red-700">
                                  <Video className="h-3.5 w-3.5" />
                                  YouTube
                                </span>
                              ) : null}
                            </div>

                            <h3 className="mt-4 text-2xl font-serif text-gray-900">
                              {post.title}
                            </h3>
                            <p className="mt-3 max-w-3xl text-base leading-7 text-gray-700">
                              {post.summary}
                            </p>
                          </div>

                          {/* Meta row */}
                          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span>By {post.author}</span>
                            <span
                              className="inline-flex items-center gap-1 cursor-help"
                              title={formatFullDate(post.createdAt)}
                            >
                              <CalendarDays className="h-4 w-4" />
                              {timeAgo(post.createdAt)}
                            </span>
                          </div>

                           {/* Media / Video */}
                           {post.youtubeUrl || post.media ? (
                             <div className="mt-5">
                               {post.youtubeUrl ? (
                                 <MessageVideoPlayer
                                   youtubeUrl={post.youtubeUrl}
                                   title={post.title}
                                   onRespond={() => handleRespondToPost(post.id)}
                                 />
                               ) : post.media?.resourceType === 'video' ? (
                                 <MessageVideoPlayer
                                   src={post.media.url}
                                   title={post.title}
                                   onRespond={() => handleRespondToPost(post.id)}
                                 />
                               ) : post.media ? (
                                 <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white">
                                   <img
                                     src={post.media.url}
                                     alt={post.title}
                                     className="max-h-[32rem] w-full object-cover"
                                   />
                                 </div>
                               ) : null}
                             </div>
                           ) : null}

                          {/* Body */}
                          <div className="mt-5 rounded-2xl border border-orange-100 bg-white/85 p-5">
                            <p className="whitespace-pre-line leading-8 text-gray-700">
                              {post.body}
                            </p>
                          </div>

                          <div className="mt-5 grid gap-3 rounded-2xl border border-red-100 bg-red-50/70 p-4 sm:grid-cols-[auto_1fr] sm:items-center">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-red-700">
                              <Sparkles className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                                Practice this message
                              </p>
                              <p className="mt-1 text-sm leading-6 text-gray-700">
                                Pause for one minute, pray over what you received, and choose one
                                act of practical love today.
                              </p>
                            </div>
                          </div>

                          {/* ── Reaction + Share Bar ────────────────── */}
                          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                            <ReactionBar postId={post.id} reactions={post.reactions} />
                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleRespondToPost(post.id)}
                                className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3.5 py-1.5 text-sm font-medium text-red-700 transition hover:border-red-200 hover:bg-red-100"
                              >
                                <MessageSquare className="h-4 w-4" />
                                Respond
                              </button>
                              <button
                                type="button"
                                onClick={() => sharePost(post)}
                                className="inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-white px-3.5 py-1.5 text-sm font-medium text-gray-500 transition hover:border-orange-200 hover:bg-orange-50 hover:text-gray-700"
                              >
                                <Share2 className="h-4 w-4" />
                                Share
                              </button>
                            </div>
                          </div>

                          {/* ── Comments Section ───────────────────── */}
                          <AnimatePresence>
                            {openComments[post.id] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="mt-5 overflow-hidden rounded-2xl border border-orange-100 bg-[linear-gradient(180deg,_rgba(255,250,245,1),_rgba(255,255,255,1))]"
                              >
                                <div className="px-5 py-4">
                                  <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex items-center gap-2 text-[#9a5534]">
                                      <MessageSquare className="h-5 w-5" />
                                      <h4 className="text-lg font-semibold">
                                        Respond ({post.comments.length})
                                      </h4>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setOpenComments(current => ({
                                          ...current,
                                          [post.id]: false,
                                        }))
                                      }
                                      className="rounded-full border border-orange-100 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 transition hover:bg-orange-50"
                                    >
                                      Hide
                                    </button>
                                  </div>

                                  <div className="mt-4 border-t border-orange-100 pt-4">
                                    <div className="space-y-3">
                                      {post.comments.length > 0 ? (
                                        post.comments.map(comment => (
                                          <div
                                            key={comment.id}
                                            className="rounded-2xl border border-orange-100 bg-white p-4"
                                          >
                                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                              <span className="font-semibold text-gray-900">
                                                {comment.author}
                                              </span>
                                              <span title={formatFullDate(comment.createdAt)}>
                                                {timeAgo(comment.createdAt)}
                                              </span>
                                            </div>
                                            <p className="mt-3 whitespace-pre-line leading-7 text-gray-700">
                                              {comment.body}
                                            </p>
                                          </div>
                                        ))
                                      ) : (
                                        <p className="rounded-2xl border border-dashed border-orange-200 bg-orange-50 px-4 py-4 text-sm text-gray-600">
                                          No comments yet. Be the first to respond.
                                        </p>
                                      )}
                                    </div>

                                    {/* Quick Amen */}
                                    <div className="mt-4">
                                      <button
                                        type="button"
                                        onClick={() => handleQuickAmen(post.id)}
                                        disabled={submittingCommentId === post.id}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                                      >
                                        🙏 Quick Amen
                                      </button>
                                    </div>

                                    {/* Comment form */}
                                    <div className="mt-4 grid gap-3">
                                      <input
                                        type="text"
                                        value={commentForms[post.id]?.author || ''}
                                        onChange={event =>
                                          handleCommentChange(
                                            post.id,
                                            'author',
                                            event.target.value
                                          )
                                        }
                                        placeholder="Your name"
                                        className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                      />
                                      <textarea
                                        ref={element => {
                                          commentTextareas.current[post.id] = element;
                                        }}
                                        value={commentForms[post.id]?.body || ''}
                                        onChange={event =>
                                          handleCommentChange(
                                            post.id,
                                            'body',
                                            event.target.value.slice(0, 500)
                                          )
                                        }
                                        rows={3}
                                        maxLength={500}
                                        placeholder="Write a comment..."
                                        className="w-full resize-none rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                      />
                                      <div className="flex items-center gap-3">
                                        <button
                                          type="button"
                                          onClick={() => handleCommentSubmit(post.id)}
                                          disabled={submittingCommentId === post.id}
                                          className="inline-flex items-center gap-2 rounded-2xl bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-70"
                                        >
                                          {submittingCommentId === post.id ? (
                                            <Loader className="h-4 w-4 animate-spin" />
                                          ) : (
                                            <Send className="h-4 w-4" />
                                          )}
                                          {submittingCommentId === post.id
                                            ? 'Posting...'
                                            : 'Post comment'}
                                        </button>
                                        <span className="text-xs text-gray-400">
                                          {(commentForms[post.id]?.body || '').length}/500
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.article>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </SectionCard>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* PRAYER WALL TAB                                            */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {activeTab === 'prayer' && (
            <motion.div
              key="prayer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <SectionCard className="border-red-100 bg-white/95 shadow-lg">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                      Prayer wall
                    </p>
                    <h2 className="mt-2 text-3xl font-serif text-red-800">
                      Pray for one another
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                      "Bear one another's burdens, and so fulfill the law of Christ." — Galatians
                      6:2
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <PrayerWall />
                </div>
              </SectionCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  );
}
