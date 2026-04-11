import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDays,
  ChevronDown,
  FileImage,
  Heart,
  Loader,
  Megaphone,
  MessageSquare,
  Pin,
  Send,
  Share2,
  Video,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { PageHero, PageShell, SectionCard } from '../components/ui';
import ReactionBar from '../components/ReactionBar';
import PrayerWall from '../components/PrayerWall';
import PostSkeleton from '../components/PostSkeleton';
import {
  addCommentToMessagePost,
  subscribeToMessagePosts,
  type MessagePostRecord,
} from '../services/messagePostsService';

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
type CategoryFilter = 'all' | 'announcement' | 'teaching' | 'media' | 'pinned';

const CATEGORY_TABS: { id: CategoryFilter; label: string; icon: string }[] = [
  { id: 'all', label: 'All', icon: '📋' },
  { id: 'announcement', label: 'Announcements', icon: '📢' },
  { id: 'teaching', label: 'Teaching', icon: '📖' },
  { id: 'media', label: 'Media', icon: '🎥' },
  { id: 'pinned', label: 'Pinned', icon: '📌' },
];

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

  // Tabs & filters
  const [activeTab, setActiveTab] = useState<TabId>('feed');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  useEffect(() => {
    const loadingTimeout = window.setTimeout(() => {
      setIsLoading(false);
      setStatusMessage(
        'Firebase is taking too long to respond. Check Firestore rules, project status, or your internet connection.'
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
            : 'No posts yet. The feed is connected, but nothing has been published.'
        );
      },
      error => {
        window.clearTimeout(loadingTimeout);
        setStatusMessage(`Unable to load posts: ${error.message}`);
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
    if (categoryFilter === 'all') return orderedPosts;
    if (categoryFilter === 'pinned') return orderedPosts.filter(p => p.pinned);
    if (categoryFilter === 'media') return orderedPosts.filter(p => p.media !== null);
    return orderedPosts.filter(
      p => p.category.toLowerCase() === categoryFilter
    );
  }, [orderedPosts, categoryFilter]);

  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryFilter, number> = {
      all: orderedPosts.length,
      announcement: orderedPosts.filter(p => p.category.toLowerCase() === 'announcement').length,
      teaching: orderedPosts.filter(p => p.category.toLowerCase() === 'teaching').length,
      media: orderedPosts.filter(p => p.media !== null).length,
      pinned: orderedPosts.filter(p => p.pinned).length,
    };
    return counts;
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

  const toggleComments = (postId: string) => {
    setOpenComments(current => ({
      ...current,
      [postId]: !current[postId],
    }));
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
          title="Ministry posts, prayer & community"
          subtitle="Stay connected with the Practical Love community. Read the latest ministry updates, share prayer requests, and encourage one another in love."
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
                Community
              </p>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                Posts, reactions & comments
              </p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                Prayer Wall
              </p>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                Share & intercede together
              </p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                Real-time
              </p>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                Updates appear instantly
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
                    {CATEGORY_TABS.map(tab => (
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
                        <span>{tab.icon}</span>
                        {tab.label}
                        {categoryCounts[tab.id] > 0 && (
                          <span
                            className={`ml-1 tabular-nums ${categoryFilter === tab.id ? 'text-red-500' : 'text-gray-400'}`}
                          >
                            {categoryCounts[tab.id]}
                          </span>
                        )}
                      </button>
                    ))}
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

                          {/* Media */}
                          {post.media ? (
                            <div className="mt-5 overflow-hidden rounded-2xl border border-orange-100 bg-white">
                              {post.media.resourceType === 'video' ? (
                                <video controls className="max-h-[32rem] w-full bg-black">
                                  <source src={post.media.url} />
                                </video>
                              ) : (
                                <img
                                  src={post.media.url}
                                  alt={post.title}
                                  className="max-h-[32rem] w-full object-cover"
                                />
                              )}
                            </div>
                          ) : null}

                          {/* Body */}
                          <div className="mt-5 rounded-2xl border border-orange-100 bg-white/85 p-5">
                            <p className="whitespace-pre-line leading-8 text-gray-700">
                              {post.body}
                            </p>
                          </div>

                          {/* ── Reaction + Share Bar ────────────────── */}
                          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                            <ReactionBar postId={post.id} reactions={post.reactions} />
                            <button
                              type="button"
                              onClick={() => sharePost(post)}
                              className="inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-white px-3.5 py-1.5 text-sm font-medium text-gray-500 transition hover:border-orange-200 hover:bg-orange-50 hover:text-gray-700"
                            >
                              <Share2 className="h-4 w-4" />
                              Share
                            </button>
                          </div>

                          {/* ── Comments Section ───────────────────── */}
                          <div className="mt-5 rounded-2xl border border-orange-100 bg-[linear-gradient(180deg,_rgba(255,250,245,1),_rgba(255,255,255,1))]">
                            {/* Inline comment preview (latest 2) */}
                            {post.comments.length > 0 && !openComments[post.id] && (
                              <div className="border-b border-orange-100 px-5 py-3">
                                {post.comments.slice(-2).map(comment => (
                                  <p
                                    key={comment.id}
                                    className="truncate text-sm text-gray-600"
                                  >
                                    <span className="font-semibold text-gray-800">
                                      {comment.author}
                                    </span>{' '}
                                    {comment.body}
                                  </p>
                                ))}
                              </div>
                            )}

                            <button
                              type="button"
                              onClick={() => toggleComments(post.id)}
                              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                            >
                              <div className="flex items-center gap-2 text-[#9a5534]">
                                <MessageSquare className="h-5 w-5" />
                                <h4 className="text-lg font-semibold">
                                  Comments ({post.comments.length})
                                </h4>
                              </div>
                              <ChevronDown
                                className={`h-5 w-5 text-[#9a5534] transition-transform ${
                                  openComments[post.id] ? 'rotate-180' : ''
                                }`}
                              />
                            </button>

                            <AnimatePresence>
                              {openComments[post.id] && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="overflow-hidden"
                                >
                                  <div className="border-t border-orange-100 px-5 pb-5 pt-4">
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
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
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
