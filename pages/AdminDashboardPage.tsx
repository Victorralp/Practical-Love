import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminPageHeader, AdminPanel, LoadingState, StatusBanner, adminButton } from '../components/admin';
import { EASE_OUT, EASE_POP, animate, prefersReducedMotion } from '../components/pl/motion';
import {
  filterPrayerRequestsForAdmin,
  subscribeToAllPrayerRequests,
  subscribeToMessagePosts,
  type MessagePostRecord,
  type PrayerRequest,
} from '../services/messagePostsService';
import { subscribeToManagedPublications } from '../services/publicationsService';
import { subscribeToAllTestimonies, updateTestimonyStatus, type TestimonyRecord } from '../services/testimoniesService';

const DAY_MS = 24 * 60 * 60 * 1000;
const WEEKDAY = new Intl.DateTimeFormat('en-NG', { weekday: 'short' });
const SHORT_DATE = new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'short' });

/** Prayer requests per day for the last seven days, oldest first, ending today. */
function prayersByDay(prayers: PrayerRequest[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Array.from({ length: 7 }, (_, i) => {
    const start = new Date(today.getTime() - (6 - i) * DAY_MS);
    return { start: start.getTime(), label: i === 6 ? 'Today' : WEEKDAY.format(start), count: 0 };
  });
  prayers.forEach(p => {
    const t = new Date(p.createdAt).getTime();
    const day = days.find(d => t >= d.start && t < d.start + DAY_MS);
    if (day) day.count += 1;
  });
  return days;
}

function CountUp({ value }: { value: number }) {
  const [shown, setShown] = useState(value);
  const from = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(value);
      from.current = value;
      return;
    }
    const start = performance.now();
    const origin = from.current;
    let frame = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / 900);
      const eased = 1 - Math.pow(1 - k, 3);
      setShown(Math.round(origin + (value - origin) * eased));
      if (k < 1) frame = requestAnimationFrame(tick);
      else from.current = value;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{shown}</>;
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessagePostRecord[]>([]);
  const [publicationCount, setPublicationCount] = useState(0);
  const [testimonies, setTestimonies] = useState<TestimonyRecord[]>([]);
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [approving, setApproving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let loaded = 0;
    const markLoaded = () => {
      loaded += 1;
      if (loaded >= 4) setIsLoading(false);
    };

    const unsubs = [
      subscribeToMessagePosts(posts => {
        setMessages(posts);
        markLoaded();
      }),
      subscribeToManagedPublications(
        pubs => {
          setPublicationCount(pubs.length);
          markLoaded();
        },
        () => markLoaded()
      ),
      subscribeToAllTestimonies(
        list => {
          setTestimonies(list);
          markLoaded();
        },
        () => markLoaded()
      ),
      subscribeToAllPrayerRequests(
        list => {
          setPrayers(list);
          markLoaded();
        },
        () => markLoaded()
      ),
    ];

    return () => unsubs.forEach(unsub => unsub());
  }, []);

  const pendingTestimonies = useMemo(() => testimonies.filter(t => t.status === 'pending'), [testimonies]);
  const pendingPrayers = useMemo(() => filterPrayerRequestsForAdmin(prayers, 'pending').length, [prayers]);
  const week = useMemo(() => prayersByDay(prayers), [prayers]);
  const weekMax = Math.max(1, ...week.map(d => d.count));
  const weekTotal = week.reduce((sum, d) => sum + d.count, 0);

  // Stat cards and chart bars animate in once the data has arrived.
  useEffect(() => {
    if (isLoading || prefersReducedMotion()) return;
    rootRef.current?.querySelectorAll<HTMLElement>('[data-stat]').forEach((el, i) =>
      animate(
        el,
        [
          { transform: 'translateY(30px)', opacity: 0 },
          { transform: 'none', opacity: 1 },
        ],
        { duration: 600, delay: i * 70, easing: EASE_POP, fill: 'backwards' }
      )
    );
    chartRef.current?.querySelectorAll<HTMLElement>('[data-bar]').forEach((el, i) =>
      animate(el, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], {
        duration: 700,
        delay: 300 + i * 60,
        easing: EASE_OUT,
        fill: 'backwards',
      })
    );
  }, [isLoading]);

  const approve = async (id: string) => {
    setApproving(id);
    setError(null);
    try {
      await updateTestimonyStatus(id, 'approved');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not approve that testimony.');
    } finally {
      setApproving(null);
    }
  };

  if (isLoading) return <LoadingState label="Loading dashboard" />;

  const stats = [
    { label: 'Messages', value: messages.length, href: '/admin/messages', note: null },
    { label: 'Publications', value: publicationCount, href: '/admin/publications', note: null },
    {
      label: 'Testimonies',
      value: testimonies.length,
      href: '/admin/testimonies',
      note: pendingTestimonies.length ? `${pendingTestimonies.length} waiting` : null,
    },
    {
      label: 'Prayer requests',
      value: prayers.length,
      href: '/admin/prayers',
      note: pendingPrayers ? `${pendingPrayers} to review` : null,
    },
  ];

  return (
    <div ref={rootRef} className="space-y-6">
      <AdminPageHeader
        eyebrow="Dashboard"
        title="Good to see you."
        actions={
          <>
            <Link to="/admin/messages#message-editor" className={adminButton.primary}>
              + New post
            </Link>
            <Link to="/admin/publications#publication-editor" className={adminButton.secondary}>
              + New publication
            </Link>
          </>
        }
      />

      {error ? <StatusBanner message={error} tone="error" onDismiss={() => setError(null)} /> : null}

      <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
        {stats.map(s => (
          <button
            key={s.label}
            type="button"
            data-stat
            onClick={() => navigate(s.href)}
            className="rounded-[20px] border border-[#eadfdc] bg-white p-5 text-left transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-pl-ink motion-reduce:hover:translate-y-0"
          >
            <span className="block text-[14px] font-semibold text-[#6b5f5f]">{s.label}</span>
            <span className="mt-2 block text-[40px] font-extrabold leading-none tracking-[-0.04em] text-pl-ink tabular-nums">
              <CountUp value={s.value} />
            </span>
            <span className={`mt-2 block min-h-[20px] text-[13px] font-semibold ${s.note ? 'text-pl-press' : 'text-[#a39797]'}`}>
              {s.note ?? 'All clear'}
            </span>
          </button>
        ))}
      </div>

      <div className="grid gap-4 min-[1000px]:grid-cols-[1.4fr_1fr]">
        <AdminPanel
          title="Needs review"
          actions={
            <Link to="/admin/testimonies" className={adminButton.ghost}>
              All testimonies →
            </Link>
          }
          flush
        >
          {pendingTestimonies.length ? (
            <ul className="m-0 list-none divide-y divide-[#f3ecea] p-0">
              {pendingTestimonies.slice(0, 5).map(t => (
                <li key={t.id} className="flex items-start justify-between gap-4 px-[18px] py-4">
                  <div className="min-w-0">
                    <p className="m-0 text-[15px] font-bold text-pl-ink">
                      {t.name}
                      <span className="ml-2 text-[13px] font-normal text-[#6b5f5f]">
                        {[t.location, SHORT_DATE.format(new Date(t.createdAt))].filter(Boolean).join(' · ')}
                      </span>
                    </p>
                    <p className="m-0 mt-1 line-clamp-2 text-[14px] leading-[1.5] text-[#5a4f4f]">{t.testimony}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void approve(t.id)}
                    disabled={approving === t.id}
                    className={`${adminButton.success} shrink-0`}
                  >
                    {approving === t.id ? 'Approving…' : 'Approve'}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="m-0 px-[18px] py-10 text-center text-[16px] font-semibold text-[#6b5f5f]">
              All caught up <span className="text-pl-red">♥</span>
            </p>
          )}
        </AdminPanel>

        <AdminPanel
          title="Prayers this week"
          actions={<span className="text-[14px] font-semibold text-[#6b5f5f]">{weekTotal} new</span>}
        >
          <div ref={chartRef} className="flex h-[180px] items-end gap-2" role="img" aria-label={week.map(d => `${d.label}: ${d.count}`).join(', ')}>
            {week.map((d, i) => (
              <div key={d.start} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="text-[12px] font-bold text-pl-ink tabular-nums">{d.count}</span>
                <div
                  data-bar
                  className={`w-full origin-bottom rounded-t-[8px] ${i === 6 ? 'bg-pl-red' : 'bg-[#eadfdc]'}`}
                  style={{ height: `${Math.max(4, (d.count / weekMax) * 130)}px` }}
                />
                <span className="text-[12px] text-[#6b5f5f]">{d.label}</span>
              </div>
            ))}
          </div>
        </AdminPanel>
      </div>

      <AdminPanel
        title="Recent messages"
        actions={
          <Link to="/admin/messages" className={adminButton.ghost}>
            Manage →
          </Link>
        }
        flush
      >
        {messages.length ? (
          <ul className="m-0 list-none divide-y divide-[#f3ecea] p-0">
            {messages.slice(0, 5).map(m => (
              <li key={m.id} className="flex items-center justify-between gap-4 px-[18px] py-[14px]">
                <div className="min-w-0">
                  <p className="m-0 truncate text-[15px] font-bold text-pl-ink">
                    {m.pinned ? <span className="mr-2 text-pl-red" aria-label="Pinned">●</span> : null}
                    {m.title}
                  </p>
                  <p className="m-0 mt-[2px] text-[13px] text-[#6b5f5f]">
                    {[m.category, SHORT_DATE.format(new Date(m.createdAt))].filter(Boolean).join(' · ')}
                  </p>
                </div>
                <span className="shrink-0 text-[13px] text-[#6b5f5f] tabular-nums">{m.comments.length} comments</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="m-0 px-[18px] py-10 text-center text-[15px] text-[#6b5f5f]">No messages yet.</p>
        )}
      </AdminPanel>
    </div>
  );
}
