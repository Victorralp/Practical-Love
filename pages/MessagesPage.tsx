import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Em, ImageSlot } from '../components/pl/primitives';
import { useEntrance, useStagger } from '../components/pl/motion';
import { formatPostDate, readMinutes, useMessagePosts } from '../components/pl/messagePosts';
import { countMessagePosts, filterMessagePosts, type MessageCategoryFilter } from '../services/messagePostFilters';
import type { MessagePostRecord } from '../services/messagePostsService';

const FILTERS: { id: MessageCategoryFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'teaching', label: 'Teaching' },
  { id: 'announcement', label: 'Updates' },
  { id: 'media', label: 'Watch' },
  { id: 'pinned', label: 'Pinned' },
];

const TILT = [-1.2, 0.8, -0.6, 1.1, -0.9, 0.7];

function FeaturedCard({ post }: { post: MessagePostRecord }) {
  const image = post.media?.resourceType === 'image' ? post.media.url : undefined;
  return (
    <Link
      to={`/messages/${post.id}`}
      data-card
      className="mb-[clamp(16px,2vw,24px)] grid overflow-hidden rounded-[32px] bg-pl-red text-white no-underline [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))] hover:text-white"
    >
      <div className="flex flex-col justify-between gap-8 p-[clamp(28px,4vw,56px)]">
        <span className="self-start rounded-full bg-white px-3 py-[6px] text-[13px] font-bold uppercase tracking-[0.08em] text-pl-red">
          {post.pinned ? 'Pinned' : 'Latest'} · {post.category}
        </span>
        <div>
          <h2 className="m-0 text-[clamp(40px,5vw,72px)] font-extrabold leading-[.92] tracking-[-0.045em]">{post.title}</h2>
          {post.summary && <p className="mt-4 max-w-[36ch] text-[18px] leading-[1.45] text-pl-blush">{post.summary}</p>}
          <p className="pl-serif mt-6 text-[22px]">Read · {readMinutes(post)} min →</p>
        </div>
      </div>
      <div className="relative min-h-[300px] bg-pl-blush">
        <ImageSlot src={image} label="Series artwork" />
      </div>
    </Link>
  );
}

function MessageCard({ post, index, hovered, onHover }: { post: MessagePostRecord; index: number; hovered: boolean; onHover: (on: boolean) => void }) {
  const dark = index % 4 === 2;
  const tone = hovered ? 'bg-pl-blush text-pl-ink' : dark ? 'bg-pl-ink text-white' : 'bg-white text-pl-ink';
  return (
    <Link
      to={`/messages/${post.id}`}
      data-card
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      className={`flex min-h-[280px] flex-col justify-between gap-7 rounded-[28px] border-2 border-pl-ink p-7 no-underline ${tone} hover:text-pl-ink`}
      style={{
        transform: hovered ? `translateY(-8px) rotate(${TILT[index % TILT.length]}deg)` : 'none',
        boxShadow: hovered ? '8px 8px 0 #e1251b' : '0 0 0 #e1251b',
        transition: 'transform .45s cubic-bezier(.3,1.5,.5,1), box-shadow .3s, background .3s',
      }}
    >
      <div className="flex justify-between gap-3 text-[13px] font-semibold uppercase tracking-[0.08em]">
        <span>{post.category}</span>
        <span className="opacity-70">{readMinutes(post)} min</span>
      </div>
      <div>
        <h3 className="m-0 text-[clamp(28px,2.6vw,36px)] font-extrabold leading-[.98] tracking-[-0.035em]">{post.title}</h3>
        {post.summary && <p className="mt-3 text-[16px] leading-[1.45] opacity-85">{post.summary}</p>}
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="pl-serif text-[22px]">Read →</span>
        <span className="text-[13px] opacity-70">{formatPostDate(post.createdAt)}</span>
      </div>
    </Link>
  );
}

export default function MessagesPage() {
  const { posts, loading, error } = useMessagePosts();
  const [filter, setFilter] = useState<MessageCategoryFilter>('all');
  const [hovered, setHovered] = useState(-1);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { hash } = useLocation();
  const navigate = useNavigate();

  // Old deep links pointed at the prayer tab that used to live here.
  useEffect(() => {
    if (hash === '#prayer-wall') navigate('/prayer', { replace: true });
  }, [hash, navigate]);

  const counts = useMemo(() => countMessagePosts(posts), [posts]);
  const featured = filter === 'all' ? posts[0] : undefined;
  const list = useMemo(() => {
    const filtered = filterMessagePosts(posts, filter);
    return featured ? filtered.filter(p => p.id !== featured.id) : filtered;
  }, [posts, filter, featured]);

  useEntrance(rootRef);
  useStagger(rootRef, `${filter}:${posts.length}`);

  return (
    <div ref={rootRef}>
      <section className="pl-wrap pb-[clamp(28px,4vw,48px)] pt-[clamp(48px,8vw,104px)]">
        <h1 data-in className="m-0 text-[clamp(56px,10vw,140px)] font-extrabold leading-[.88] tracking-[-0.055em]">
          Messages <Em>you can live.</Em>
        </h1>
        <p data-in className="pl-lede max-w-[42ch]">
          Short teachings on biblical love, each with one thing to practise before the day ends.
        </p>
        <div className="mt-[clamp(28px,4vw,44px)] flex flex-wrap gap-2" role="group" aria-label="Filter messages">
          {FILTERS.map(f => (
            <button key={f.id} type="button" className="pl-chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label} <span className="pl-chip-count">{counts[f.id]}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="pl-wrap pb-[clamp(64px,9vw,120px)]">
        {loading ? (
          <div className="grid gap-[clamp(16px,2vw,24px)] [grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]" aria-busy="true">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="min-h-[280px] animate-pulse rounded-[28px] bg-pl-blush motion-reduce:animate-none" />
            ))}
          </div>
        ) : error ? (
          <p className="rounded-[28px] border-2 border-pl-ink p-7 text-[18px]" role="alert">
            {error}
          </p>
        ) : posts.length === 0 ? (
          <p className="rounded-[28px] border-2 border-pl-ink p-7 text-[18px]">No messages have been published yet. Please check back soon.</p>
        ) : (
          <>
            {featured && <FeaturedCard post={featured} />}
            {list.length === 0 ? (
              <p className="text-[18px] text-pl-body">Nothing here yet. Try another filter.</p>
            ) : (
              <div className="grid gap-[clamp(16px,2vw,24px)] [grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]">
                {list.map((post, i) => (
                  <MessageCard key={post.id} post={post} index={i} hovered={hovered === i} onHover={on => setHovered(on ? i : -1)} />
                ))}
              </div>
            )}
          </>
        )}

        <Link
          to="/prayer"
          className="mt-[clamp(32px,5vw,56px)] flex items-center justify-between gap-4 rounded-[28px] bg-pl-ink p-7 text-white no-underline hover:text-white"
        >
          <span>
            <span className="block text-[13px] uppercase tracking-[0.08em] opacity-70">Need someone to pray with you?</span>
            <span className="mt-[6px] block text-[clamp(26px,3vw,34px)] font-extrabold tracking-[-0.03em]">Visit the prayer wall</span>
          </span>
          <span className="pl-serif text-[32px] text-pl-coral" aria-hidden="true">
            →
          </span>
        </Link>
      </section>
    </div>
  );
}
