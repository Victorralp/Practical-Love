import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  HandHeart,
  HeartHandshake,
  LayoutDashboard,
  Megaphone,
  Pin,
  Plus,
} from 'lucide-react';
import {
  AdminPageHeader,
  AdminPanel,
  EmptyState,
  LoadingState,
  adminButton,
} from '../components/admin';
import {
  filterPrayerRequestsForAdmin,
  subscribeToMessagePosts,
  subscribeToAllPrayerRequests,
  type MessagePostRecord,
  type PrayerRequest,
} from '../services/messagePostsService';
import { subscribeToManagedPublications } from '../services/publicationsService';
import { subscribeToAllTestimonies, type TestimonyRecord } from '../services/testimoniesService';

type DashboardCounts = {
  messages: number;
  publications: number;
  testimonies: number;
  pendingTestimonies: number;
  prayers: number;
  pendingPrayers: number;
};

const INITIAL_COUNTS: DashboardCounts = {
  messages: 0,
  publications: 0,
  testimonies: 0,
  pendingTestimonies: 0,
  prayers: 0,
  pendingPrayers: 0,
};

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate));
}

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<DashboardCounts>(INITIAL_COUNTS);
  const [recentMessages, setRecentMessages] = useState<MessagePostRecord[]>([]);
  const [recentTestimonies, setRecentTestimonies] = useState<TestimonyRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let loaded = 0;
    const markLoaded = () => {
      loaded += 1;
      if (loaded >= 4) setIsLoading(false);
    };

    const unsubs = [
      subscribeToMessagePosts(posts => {
        setCounts(c => ({ ...c, messages: posts.length }));
        setRecentMessages(posts.slice(0, 5));
        markLoaded();
      }),
      subscribeToManagedPublications(
        pubs => {
          setCounts(c => ({ ...c, publications: pubs.length }));
          markLoaded();
        },
        () => markLoaded()
      ),
      subscribeToAllTestimonies(
        testimonies => {
          setCounts(c => ({
            ...c,
            testimonies: testimonies.length,
            pendingTestimonies: testimonies.filter(t => t.status === 'pending').length,
          }));
          setRecentTestimonies(testimonies.slice(0, 5));
          markLoaded();
        },
        () => markLoaded()
      ),
      subscribeToAllPrayerRequests(
        (prayers: PrayerRequest[]) => {
          setCounts(c => ({
            ...c,
            prayers: prayers.length,
            pendingPrayers: filterPrayerRequestsForAdmin(prayers, 'pending').length,
          }));
          markLoaded();
        },
        () => markLoaded()
      ),
    ];

    return () => unsubs.forEach(unsub => unsub());
  }, []);

  const statCards = useMemo(
    () => [
      {
        label: 'Messages',
        count: counts.messages,
        icon: <Megaphone className="h-4 w-4" />,
        href: '/admin/messages',
        accent: 'bg-red-50 text-red-600 ring-red-100',
      },
      {
        label: 'Publications',
        count: counts.publications,
        icon: <BookOpen className="h-4 w-4" />,
        href: '/admin/publications',
        accent: 'bg-orange-50 text-orange-600 ring-orange-100',
      },
      {
        label: 'Testimonies',
        count: counts.testimonies,
        icon: <HandHeart className="h-4 w-4" />,
        href: '/admin/testimonies',
        accent: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
        pending: counts.pendingTestimonies,
      },
      {
        label: 'Prayer requests',
        count: counts.prayers,
        icon: <HeartHandshake className="h-4 w-4" />,
        href: '/admin/prayers',
        accent: 'bg-violet-50 text-violet-600 ring-violet-100',
        pending: counts.pendingPrayers,
      },
    ],
    [counts]
  );

  const needsReview = counts.pendingTestimonies + counts.pendingPrayers;

  if (isLoading) {
    return <LoadingState label="Loading admin dashboard..." className="min-h-[50vh]" />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Dashboard"
        title="Ministry overview"
        description="What is live on the site and what is waiting for you."
        icon={<LayoutDashboard className="h-5 w-5" />}
        actions={
          <>
            <Link to="/admin/messages#message-editor" className={adminButton.primary}>
              <Plus className="h-4 w-4" />
              New post
            </Link>
            <Link to="/admin/publications#publication-editor" className={adminButton.secondary}>
              <Plus className="h-4 w-4" />
              New publication
            </Link>
          </>
        }
      />

      {needsReview > 0 && (
        <div className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-amber-900">
            <strong className="font-semibold">
              {needsReview} item{needsReview === 1 ? '' : 's'}
            </strong>{' '}
            waiting for review
            {counts.pendingTestimonies > 0 && counts.pendingPrayers > 0
              ? ` — ${counts.pendingTestimonies} testimon${counts.pendingTestimonies === 1 ? 'y' : 'ies'}, ${counts.pendingPrayers} prayer request${counts.pendingPrayers === 1 ? '' : 's'}.`
              : '.'}
          </p>
          <div className="flex flex-wrap gap-2">
            {counts.pendingTestimonies > 0 && (
              <Link
                to="/admin/testimonies"
                className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-sm font-medium text-amber-800 transition hover:bg-amber-100"
              >
                Review testimonies
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
            {counts.pendingPrayers > 0 && (
              <Link
                to="/admin/prayers"
                className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-sm font-medium text-amber-800 transition hover:bg-amber-100"
              >
                Review prayers
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* ── Counts ─────────────────────────────────────────────────── */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(card => (
          <Link
            key={card.label}
            to={card.href}
            className="group rounded-xl border border-[#f0e2d8] bg-white px-4 py-4 transition hover:border-[#e0cbbc] hover:shadow-[0_10px_28px_-18px_rgba(61,29,23,0.35)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#8a6552]">{card.label}</p>
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg ring-1 ${card.accent}`}
                aria-hidden="true"
              >
                {card.icon}
              </span>
            </div>
            <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight text-[#3d1d17]">
              {card.count}
            </p>
            {card.pending ? (
              <p className="mt-1 text-xs font-medium text-amber-700">{card.pending} pending</p>
            ) : (
              <p className="mt-1 text-xs text-[#bda392]">Up to date</p>
            )}
          </Link>
        ))}
      </div>

      {/* ── Recent activity ────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AdminPanel
          eyebrow="Feed"
          title="Recent messages"
          icon={<Megaphone className="h-4 w-4" />}
          actions={
            <Link
              to="/admin/messages"
              className="text-sm font-medium text-red-700 hover:underline"
            >
              View all
            </Link>
          }
          flush
        >
          {recentMessages.length === 0 ? (
            <EmptyState title="No messages yet" className="m-5" />
          ) : (
            <ul className="divide-y divide-[#f6ece4]">
              {recentMessages.map(post => (
                <li key={post.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#3d1d17]">{post.title}</p>
                    <p className="mt-0.5 text-xs text-[#a8735c]">
                      {post.category} · {formatDate(post.createdAt)}
                    </p>
                  </div>
                  {post.pinned && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-amber-700">
                      <Pin className="h-3 w-3" />
                      Pinned
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </AdminPanel>

        <AdminPanel
          eyebrow="Stories"
          title="Recent testimonies"
          icon={<HandHeart className="h-4 w-4" />}
          actions={
            <Link
              to="/admin/testimonies"
              className="text-sm font-medium text-red-700 hover:underline"
            >
              View all
            </Link>
          }
          flush
        >
          {recentTestimonies.length === 0 ? (
            <EmptyState title="No testimonies yet" className="m-5" />
          ) : (
            <ul className="divide-y divide-[#f6ece4]">
              {recentTestimonies.map(testimony => (
                <li key={testimony.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#3d1d17]">{testimony.name}</p>
                    <p className="mt-0.5 truncate text-xs text-[#a8735c]">{testimony.testimony}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-md px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] ${
                      testimony.status === 'approved'
                        ? 'bg-emerald-50 text-emerald-700'
                        : testimony.status === 'pending'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-[#f4ede8] text-[#8a6552]'
                    }`}
                  >
                    {testimony.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </AdminPanel>
      </div>
    </div>
  );
}
