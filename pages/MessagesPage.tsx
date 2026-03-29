import { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  ChevronDown,
  FileImage,
  Loader,
  Megaphone,
  MessageSquare,
  Pin,
  Send,
  Video,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { PageHero, PageShell, SectionCard } from '../components/ui';
import {
  addCommentToMessagePost,
  subscribeToMessagePosts,
  type MessagePostRecord,
} from '../services/messagePostsService';

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate));
}

export default function MessagesPage() {
  const [posts, setPosts] = useState<MessagePostRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('Loading ministry posts...');
  const [commentForms, setCommentForms] = useState<
    Record<string, { author: string; body: string }>
  >({});
  const [submittingCommentId, setSubmittingCommentId] = useState<string | null>(null);
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});

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

  const toggleComments = (postId: string) => {
    setOpenComments(current => ({
      ...current,
      [postId]: !current[postId],
    }));
  };

  return (
    <PageShell className="bg-[radial-gradient(circle_at_top_left,_rgba(254,215,170,0.28),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(248,113,113,0.16),_transparent_34%),linear-gradient(180deg,_#fffaf5_0%,_#ffffff_50%,_#fff7ed_100%)]">
      <div className="space-y-8">
        <PageHero
          compact
          badge={
            <>
              <Megaphone className="h-4 w-4" />
              Ministry Messages
            </>
          }
          icon={
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 text-white shadow-lg">
              <Logo className="h-7 w-7" />
            </div>
          }
          title="Current ministry posts and announcements"
          subtitle="This is the public message feed for Practical Love. Visitors can read the latest notices, teaching highlights, media posts, and pinned ministry updates here."
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
                Feed type
              </p>
              <p className="mt-2 text-lg font-semibold text-gray-900">Public ministry updates</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                Media
              </p>
              <p className="mt-2 text-lg font-semibold text-gray-900">Images and videos included</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                Priority
              </p>
              <p className="mt-2 text-lg font-semibold text-gray-900">Pinned posts stay on top</p>
            </div>
          </div>
        </PageHero>

        <SectionCard className="border-red-100 bg-white/95 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Public feed
              </p>
              <h2 className="mt-2 text-3xl font-serif text-red-800">Latest posts</h2>
            </div>
            <p className="text-sm text-gray-500">
              {isLoading ? statusMessage : `${orderedPosts.length} post(s) available`}
            </p>
          </div>

          {isLoading ? (
            <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl border border-orange-100 bg-orange-50 px-6 py-10 text-gray-700">
              <Loader className="h-5 w-5 animate-spin text-red-700" />
              {statusMessage}
            </div>
          ) : orderedPosts.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-orange-100 bg-orange-50 px-6 py-10 text-center text-gray-700">
              <p className="text-lg font-semibold text-[#3d1d17]">No posts available right now.</p>
              <p className="mt-3 text-sm leading-7">{statusMessage}</p>
              <div className="mt-5">
                <Link to="/contact" className="btn-outline-brand px-6 py-3">
                  Contact the ministry
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              {orderedPosts.map(post => (
                <article
                  key={post.id}
                  className="rounded-[1.8rem] border border-orange-100 bg-[linear-gradient(135deg,_rgba(255,255,255,0.98)_0%,_rgba(255,247,237,0.95)_100%)] p-6 shadow-sm"
                >
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

                    <h3 className="mt-4 text-2xl font-serif text-gray-900">{post.title}</h3>
                    <p className="mt-3 max-w-3xl text-base leading-7 text-gray-700">
                      {post.summary}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span>By {post.author}</span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      {formatDate(post.createdAt)}
                    </span>
                  </div>

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

                  <div className="mt-5 rounded-2xl border border-orange-100 bg-white/85 p-5">
                    <p className="whitespace-pre-line leading-8 text-gray-700">{post.body}</p>
                  </div>

                  <div className="mt-5 rounded-2xl border border-orange-100 bg-[linear-gradient(180deg,_rgba(255,250,245,1),_rgba(255,255,255,1))]">
                    <button
                      type="button"
                      onClick={() => toggleComments(post.id)}
                      className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                    >
                      <div className="flex items-center gap-2 text-[#9a5534]">
                        <MessageSquare className="h-5 w-5" />
                        <h4 className="text-lg font-semibold">Comments ({post.comments.length})</h4>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-[#9a5534] transition-transform ${
                          openComments[post.id] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {openComments[post.id] ? (
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
                                  <span>{formatDate(comment.createdAt)}</span>
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

                        <div className="mt-5 grid gap-3">
                          <input
                            type="text"
                            value={commentForms[post.id]?.author || ''}
                            onChange={event =>
                              handleCommentChange(post.id, 'author', event.target.value)
                            }
                            placeholder="Your name"
                            className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                          />
                          <textarea
                            value={commentForms[post.id]?.body || ''}
                            onChange={event =>
                              handleCommentChange(post.id, 'body', event.target.value)
                            }
                            rows={3}
                            placeholder="Write a comment..."
                            className="w-full resize-none rounded-2xl border border-orange-100 bg-white px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                          />
                          <div>
                            <button
                              type="button"
                              onClick={() => handleCommentSubmit(post.id)}
                              disabled={submittingCommentId === post.id}
                              className="inline-flex items-center gap-2 rounded-2xl bg-red-700 px-6 py-3 font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                              {submittingCommentId === post.id ? (
                                <Loader className="h-4 w-4 animate-spin" />
                              ) : (
                                <Send className="h-4 w-4" />
                              )}
                              {submittingCommentId === post.id ? 'Posting...' : 'Post comment'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          )}
        </SectionCard>
      </div>
    </PageShell>
  );
}
