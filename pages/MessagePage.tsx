import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EmTitle, PostMedia, formatPostDate, readMinutes, useMessagePosts } from '../components/pl/messages';
import { animate, heartBurst, prefersReducedMotion, useEntrance, EASE_POP } from '../components/pl/motion';
import { Toast } from '../components/pl/primitives';
import {
  REACTION_TYPES,
  addCommentToMessagePost,
  hasUserReacted,
  toggleReaction,
  type ReactionType,
} from '../services/messagePostsService';

const REACTION_LABELS: Record<ReactionType, string> = { amen: 'Amen', love: '♥ Love', insightful: 'Helpful' };

// The ministry's weekly practice, offered after every message.
const PRACTICES = ['Before you react, pause.', 'Before you answer, listen.', 'Before you correct, love.'] as const;

function readDone(id: string): boolean[] {
  try {
    const raw = JSON.parse(localStorage.getItem(`pl-practise-${id}`) || '[]');
    return PRACTICES.map((_, i) => Boolean(Array.isArray(raw) && raw[i]));
  } catch {
    return PRACTICES.map(() => false);
  }
}

function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  const barRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onScroll = () => {
      const d = document.documentElement;
      const p = Math.min(1, window.scrollY / Math.max(1, d.scrollHeight - window.innerHeight));
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      setProgress(prev => (Math.abs(p - prev) > 0.02 || p === 1 ? p : prev));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return { progress, barRef };
}

export default function MessagePage() {
  const { id = '' } = useParams();
  const { posts, loading, error } = useMessagePosts();
  const index = posts.findIndex(p => p.id === id);
  const post = index >= 0 ? posts[index] : undefined;
  const next = posts.length > 1 && index >= 0 ? posts[(index + 1) % posts.length] : undefined;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const reactRefs = useRef<Partial<Record<ReactionType, HTMLButtonElement | null>>>({});
  const { progress, barRef } = useReadingProgress();
  const [done, setDone] = useState<boolean[]>(() => readDone(id));
  const [active, setActive] = useState<Record<ReactionType, boolean>>(() =>
    Object.fromEntries(REACTION_TYPES.map(t => [t, hasUserReacted(id, t)])) as Record<ReactionType, boolean>
  );
  const [comment, setComment] = useState({ author: '', body: '' });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const clearToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    setDone(readDone(id));
    setActive(Object.fromEntries(REACTION_TYPES.map(t => [t, hasUserReacted(id, t)])) as Record<ReactionType, boolean>);
  }, [id]);

  useEffect(() => {
    if (post) document.title = `${post.title} | Practical Love Messages`;
  }, [post]);

  useEntrance(rootRef, [post?.id]);

  // Paragraphs fade up as they scroll in.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !post || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          animate(
            e.target,
            [
              { transform: 'translateY(28px)', opacity: 0 },
              { transform: 'none', opacity: 1 },
            ],
            { duration: 700, easing: 'cubic-bezier(.3,1.2,.5,1)', fill: 'backwards' }
          );
        }),
      { threshold: 0.2 }
    );
    root.querySelectorAll('[data-r]').forEach(el => {
      if (el.getBoundingClientRect().top > window.innerHeight) io.observe(el);
    });
    return () => io.disconnect();
  }, [post?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const paragraphs = useMemo(
    () =>
      (post?.body || '')
        .split(/\n\s*\n/)
        .map(p => p.trim())
        .filter(Boolean),
    [post?.body]
  );

  const minutes = post ? readMinutes(post) : 1;
  const minsLeft = Math.max(1, Math.ceil(minutes * (1 - progress)));

  const toggleDone = (i: number) =>
    setDone(prev => {
      const nextDone = prev.slice();
      nextDone[i] = !nextDone[i];
      try {
        localStorage.setItem(`pl-practise-${id}`, JSON.stringify(nextDone));
      } catch {
        // Storage can be blocked; the checklist still works for this visit.
      }
      return nextDone;
    });

  const react = async (type: ReactionType) => {
    const on = !active[type];
    setActive(a => ({ ...a, [type]: on }));
    const button = reactRefs.current[type];
    if (on && button) {
      animate(button, [{ transform: 'scale(1)' }, { transform: 'scale(1.15)' }, { transform: 'scale(1)' }], { duration: 400, easing: EASE_POP });
      heartBurst(button, button, { count: 10, min: 40, max: 80, lift: 30, size: [12, 22] });
    }
    try {
      await toggleReaction(id, type);
    } catch {
      setActive(a => ({ ...a, [type]: !on }));
      setToast('Could not save your reaction. Please try again.');
    }
  };

  const share = async () => {
    if (!post) return;
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.summary, url });
        return;
      } catch {
        // Cancelled; fall back to copying.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setToast('Link copied ♥');
    } catch {
      setToast('Copy the address bar to share this message.');
    }
  };

  const submitComment = async (event: FormEvent) => {
    event.preventDefault();
    const body = comment.body.trim();
    if (!body) return;
    setSending(true);
    try {
      await addCommentToMessagePost(id, { author: comment.author.trim() || 'Anonymous visitor', body });
      setComment(c => ({ ...c, body: '' }));
      setToast('Thank you for sharing ♥');
    } catch (err) {
      setToast(err instanceof Error ? err.message : 'Unable to add your response.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div ref={rootRef}>
      <header className="pl-glass sticky top-0 z-30 border-b border-pl-hair bg-white/90 backdrop-blur-[8px]">
        <div className="pl-wrap flex items-center gap-4 py-[14px]">
          <Link to="/messages" className="mr-auto flex min-h-[44px] items-center text-[15px] font-semibold text-pl-ink no-underline hover:text-pl-red">
            ← All messages
          </Link>
          {post && <span className="text-[14px] text-pl-muted2">{minsLeft} min left</span>}
          <Link
            to="/donate"
            className="flex min-h-[44px] items-center rounded-full bg-pl-red px-[22px] text-[15px] font-semibold text-white no-underline hover:bg-pl-press hover:text-white"
          >
            Give
          </Link>
        </div>
        <div ref={barRef} aria-hidden="true" className="absolute -bottom-px left-0 h-[3px] w-full origin-left scale-x-0 bg-pl-red" />
      </header>

      <div>
        {loading ? (
          <div className="mx-auto max-w-[760px] px-[clamp(20px,4.5vw,40px)] py-[clamp(48px,8vw,96px)]" aria-busy="true">
            <div className="h-8 w-56 animate-pulse rounded-full bg-pl-blush motion-reduce:animate-none" />
            <div className="mt-6 h-32 animate-pulse rounded-[28px] bg-pl-blush motion-reduce:animate-none" />
          </div>
        ) : !post ? (
          <div className="mx-auto max-w-[760px] px-[clamp(20px,4.5vw,40px)] py-[clamp(48px,8vw,96px)]">
            <h1 className="pl-h2 m-0">
              Message not <span className="pl-em">found.</span>
            </h1>
            <p className="pl-lede">{error || 'It may have been moved or unpublished.'}</p>
            <Link to="/messages" className="pl-btn pl-btn-ink mt-8">
              See all messages
            </Link>
          </div>
        ) : (
          <>
            <article className="mx-auto max-w-[760px] px-[clamp(20px,4.5vw,40px)] pb-10 pt-[clamp(48px,8vw,96px)]">
              <span data-in className="inline-block rounded-full bg-pl-blush px-3 py-[6px] text-[13px] font-bold uppercase tracking-[0.08em] text-pl-press">
                {post.category} · {minutes} min
              </span>
              <h1 data-in className="mt-5 text-[clamp(52px,9vw,112px)] font-extrabold leading-[.88] tracking-[-0.055em]">
                <EmTitle title={post.title} />
              </h1>
              {post.summary && (
                <p data-in className="mt-6 text-[clamp(19px,2vw,24px)] leading-[1.45] text-pl-body">
                  {post.summary}
                </p>
              )}
              <p data-in className="mt-4 text-[14px] text-pl-muted2">
                {post.author} · {formatPostDate(post.createdAt)}
              </p>
              <div data-in>
                <PostMedia post={post} className="my-[clamp(32px,5vw,56px)]" />
              </div>

              <div className="grid gap-6 text-[clamp(18px,1.7vw,20px)] leading-[1.7] text-[#2a2222]">
                {paragraphs.map((p, i) => (
                  <p key={i} data-r className="m-0 whitespace-pre-line">
                    {p}
                  </p>
                ))}

                <h2 data-r className="mt-6 text-[clamp(30px,3.4vw,42px)] font-extrabold leading-none tracking-[-0.035em]">
                  Practise it today
                </h2>
                {PRACTICES.map((t, i) => (
                  <label
                    key={t}
                    data-r
                    className={`flex min-h-[44px] cursor-pointer items-center gap-4 rounded-[20px] border-2 border-pl-ink px-5 py-[18px] transition-colors ${
                      done[i] ? 'bg-pl-blush' : 'bg-white'
                    }`}
                  >
                    <input type="checkbox" checked={done[i]} onChange={() => toggleDone(i)} className="h-6 w-6 flex-none accent-pl-red" />
                    <span className={`font-semibold ${done[i] ? 'line-through' : ''}`}>{t}</span>
                  </label>
                ))}
              </div>

              <div className="mt-[clamp(40px,6vw,64px)] border-t-2 border-pl-ink pt-7">
                <p className="mb-[14px] font-semibold">Did this help?</p>
                <div className="flex flex-wrap gap-[10px]">
                  {REACTION_TYPES.map(type => (
                    <button
                      key={type}
                      type="button"
                      ref={el => {
                        reactRefs.current[type] = el;
                      }}
                      onClick={() => react(type)}
                      aria-pressed={active[type]}
                      className={`relative min-h-[48px] rounded-full border-2 border-pl-ink px-5 text-[16px] font-semibold transition-colors ${
                        active[type] ? 'bg-pl-red text-white' : 'bg-white text-pl-ink'
                      }`}
                    >
                      {REACTION_LABELS[type]} · {post.reactions[type] || 0}
                    </button>
                  ))}
                  <button type="button" onClick={share} className="pl-btn pl-btn-outline min-h-[48px]">
                    Share
                  </button>
                </div>
              </div>

              <section className="mt-[clamp(40px,6vw,64px)]" aria-labelledby="responses">
                <h2 id="responses" className="text-[clamp(26px,3vw,34px)] font-extrabold tracking-[-0.03em]">
                  Responses {post.comments.length > 0 && <span className="pl-serif font-normal text-pl-red">{post.comments.length}</span>}
                </h2>
                {post.comments.length > 0 && (
                  <ul className="m-0 mt-5 grid list-none gap-3 p-0">
                    {post.comments.map(c => (
                      <li key={c.id} className="rounded-[20px] border border-pl-hair2 bg-white p-5">
                        <p className="m-0 whitespace-pre-line text-[16px] leading-[1.55]">{c.body}</p>
                        <p className="m-0 mt-2 text-[13px] text-pl-muted2">
                          {c.author} · {formatPostDate(c.createdAt)}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
                <form onSubmit={submitComment} className="mt-5 grid gap-3">
                  <label className="pl-label" htmlFor="response-body">
                    Share what you received
                  </label>
                  <textarea
                    id="response-body"
                    required
                    rows={3}
                    value={comment.body}
                    onChange={e => setComment(c => ({ ...c, body: e.target.value }))}
                    className="pl-textarea"
                  />
                  <div className="flex flex-wrap gap-3">
                    <input
                      aria-label="Your name (optional)"
                      placeholder="Your name (optional)"
                      value={comment.author}
                      onChange={e => setComment(c => ({ ...c, author: e.target.value }))}
                      className="pl-input flex-[1_1_220px]"
                    />
                    <button type="submit" disabled={sending} className="pl-btn pl-btn-ink">
                      {sending ? 'Sending…' : 'Post response'}
                    </button>
                  </div>
                </form>
              </section>
            </article>

            {next && (
              <section className="mx-auto max-w-[760px] px-[clamp(20px,4.5vw,40px)] pb-[clamp(64px,9vw,112px)] pt-6">
                <Link
                  to={`/messages/${next.id}`}
                  className="flex items-center justify-between gap-4 rounded-[28px] bg-pl-ink p-7 text-white no-underline hover:text-white"
                >
                  <span>
                    <span className="block text-[13px] uppercase tracking-[0.08em] opacity-70">Next message</span>
                    <span className="mt-[6px] block text-[clamp(26px,3vw,34px)] font-extrabold tracking-[-0.03em]">{next.title}</span>
                  </span>
                  <span className="pl-serif text-[32px] text-pl-coral" aria-hidden="true">
                    →
                  </span>
                </Link>
              </section>
            )}
          </>
        )}
      </div>
      <Toast message={toast} onDone={clearToast} />
    </div>
  );
}
