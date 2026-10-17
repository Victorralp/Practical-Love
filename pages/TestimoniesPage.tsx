import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Em } from '../components/pl/primitives';
import { animate, prefersReducedMotion, useEntrance } from '../components/pl/motion';
import { initials } from '../components/pl/text';
import { subscribeToApprovedTestimonies, type TestimonyRecord } from '../services/testimoniesService';

const FEATURED = 3;
const ROTATE_MS = 7000;
const TONES = [
  { card: 'bg-white text-pl-ink', avatar: 'bg-pl-ink text-white' },
  { card: 'bg-pl-blush text-pl-ink', avatar: 'bg-pl-ink text-white' },
  { card: 'bg-pl-ink text-white', avatar: 'bg-pl-red text-white' },
  { card: 'bg-pl-yellow text-pl-ink', avatar: 'bg-pl-ink text-white' },
];

function byNewest(a: TestimonyRecord, b: TestimonyRecord) {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

function Avatar({ t, className }: { t: TestimonyRecord; className: string }) {
  if (t.imageUrl) return <img src={t.imageUrl} alt="" loading="lazy" className={`flex-none rounded-full object-cover ${className}`} />;
  return <span className={`flex flex-none items-center justify-center rounded-full font-extrabold ${className}`}>{initials(t.name)}</span>;
}

function roleLine(t: TestimonyRecord) {
  return [t.role, t.location].filter(Boolean).join(', ');
}

export default function TestimoniesPage() {
  const [items, setItems] = useState<TestimonyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [featured, setFeatured] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const featRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(
    () =>
      subscribeToApprovedTestimonies(
        loaded => {
          setItems([...loaded].sort(byNewest));
          setLoading(false);
        },
        err => {
          setError(`We could not load testimonies right now. ${err.message}`);
          setLoading(false);
        }
      ),
    []
  );

  useEntrance(rootRef);

  const featureCount = Math.min(FEATURED, items.length);

  useEffect(() => {
    if (featureCount < 2) return;
    const timer = window.setInterval(() => setFeatured(f => (f + 1) % featureCount), ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [featureCount]);

  const firstFeature = useRef(true);
  useEffect(() => {
    if (firstFeature.current) {
      firstFeature.current = false;
      return;
    }
    animate(featRef.current, [{ transform: 'translateY(24px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 700, easing: 'cubic-bezier(.3,1.3,.5,1)' });
  }, [featured]);

  // Cards rise in as they scroll into view.
  useEffect(() => {
    const root = gridRef.current;
    if (!root || prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          animate(entry.target as HTMLElement, [{ transform: 'translateY(40px) rotate(-1deg)', opacity: 0 }, { transform: 'none', opacity: 1 }], {
            duration: 750,
            easing: 'cubic-bezier(.3,1.4,.5,1)',
            fill: 'backwards',
          });
        }),
      { threshold: 0.1 }
    );
    root.querySelectorAll('[data-t]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const feat = items[Math.min(featured, Math.max(0, featureCount - 1))];

  return (
    <div ref={rootRef}>
      <section className="bg-pl-red text-white">
        <div className="pl-wrap pb-[clamp(48px,7vw,88px)] pt-[clamp(56px,9vw,120px)]">
          <p data-in className="m-0 text-[14px] font-bold uppercase tracking-[0.08em]">
            Stories of transformation
          </p>
          {feat ? (
            <>
              <div ref={featRef} className="mt-5" aria-live="polite">
                <p className="pl-serif m-0 line-clamp-6 max-w-[24ch] text-[clamp(36px,5.6vw,80px)] leading-[1.04]">“{feat.testimony}”</p>
                <div className="mt-7 flex items-center gap-[14px]">
                  <Avatar t={feat} className="h-[52px] w-[52px] bg-white text-[20px] text-pl-red" />
                  <span>
                    <b className="block text-[19px]">{feat.name}</b>
                    <span className="text-[15px] opacity-85">{roleLine(feat)}</span>
                  </span>
                </div>
              </div>
              {featureCount > 1 && (
                <div className="mt-7 flex gap-1">
                  {Array.from({ length: featureCount }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Story ${i + 1}`}
                      aria-pressed={i === featured}
                      onClick={() => setFeatured(i)}
                      className="flex h-11 w-12 items-center border-0 bg-transparent"
                    >
                      <span className={`block h-1 w-full rounded-sm transition-colors duration-300 ${i === featured ? 'bg-white' : 'bg-white/35'}`} />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p data-in className="pl-serif mb-0 mt-5 max-w-[22ch] text-[clamp(36px,5.6vw,80px)] leading-[1.04]">
              {loading ? 'Gathering stories…' : '“Your story could be the first one here.”'}
            </p>
          )}
        </div>
      </section>

      <section className="pl-wrap py-[clamp(56px,8vw,104px)]">
        <div className="mb-[clamp(24px,3vw,40px)] flex flex-wrap items-end justify-between gap-4">
          <h1 data-in className="m-0 text-[clamp(44px,6.4vw,92px)] font-extrabold leading-[.9] tracking-[-0.05em]">
            Real people. <Em>Real change.</Em>
          </h1>
          <Link to="/share-testimony" className="pl-btn pl-btn-ink">
            Share your story →
          </Link>
        </div>

        {loading ? (
          <div className="[column-gap:16px] [columns:3_300px]" aria-busy="true">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="mb-4 h-48 animate-pulse break-inside-avoid rounded-[26px] bg-pl-blush motion-reduce:animate-none" />
            ))}
          </div>
        ) : error ? (
          <p role="alert" className="rounded-[26px] border-2 border-pl-ink p-7 text-[18px]">
            {error}
          </p>
        ) : items.length === 0 ? (
          <p className="rounded-[26px] border-2 border-pl-ink p-7 text-[18px]">
            No stories have been published yet. Has practical love changed something in your home, church or work? <Link to="/share-testimony">Tell us about it.</Link>
          </p>
        ) : (
          <div ref={gridRef} className="[column-gap:16px] [columns:3_300px]">
            {items.map((t, i) => {
              const tone = TONES[i % TONES.length];
              return (
                <figure key={t.id} data-t className={`m-0 mb-4 break-inside-avoid rounded-[26px] border-2 border-pl-ink p-[26px] ${tone.card}`}>
                  {t.location && <span className="text-[13px] font-bold uppercase tracking-[0.08em] opacity-75">{t.location}</span>}
                  <blockquote className="pl-serif mx-0 mb-0 mt-3 whitespace-pre-line text-[24px] leading-[1.25]">“{t.testimony}”</blockquote>
                  <figcaption className="mt-[18px] flex items-center gap-3">
                    <Avatar t={t} className={`h-10 w-10 ${tone.avatar}`} />
                    <span>
                      <b className="block text-[16px]">{t.name}</b>
                      {t.role && <span className="text-[14px] opacity-75">{t.role}</span>}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
