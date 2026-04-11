import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  HandHeart,
  Loader,
  Megaphone,
  Plus,
  TrendingUp,
} from 'lucide-react';
import Logo from '../components/Logo';
import {
  subscribeToMessagePosts,
  subscribeToPrayerRequests,
  type MessagePostRecord,
} from '../services/messagePostsService';
import {
  subscribeToManagedPublications,
} from '../services/publicationsService';
import {
  subscribeToAllTestimonies,
  type TestimonyRecord,
} from '../services/testimoniesService';

type DashboardCounts = {
  messages: number;
  publications: number;
  testimonies: number;
  pendingTestimonies: number;
  prayers: number;
};

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate));
}

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<DashboardCounts>({
    messages: 0,
    publications: 0,
    testimonies: 0,
    pendingTestimonies: 0,
    prayers: 0,
  });
  const [recentMessages, setRecentMessages] = useState<MessagePostRecord[]>([]);
  const [recentTestimonies, setRecentTestimonies] = useState<TestimonyRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLoadedSources] = useState(0);

  useEffect(() => {
    const markLoaded = () => {
      setLoadedSources(prev => {
        const next = prev + 1;
        if (next >= 4) setIsLoading(false);
        return next;
      });
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
      subscribeToPrayerRequests(
        prayers => {
          setCounts(c => ({ ...c, prayers: prayers.length }));
          markLoaded();
        },
        () => markLoaded()
      ),
    ];

    return () => unsubs.forEach(u => u());
  }, []);

  const statCards = [
    {
      label: 'Messages',
      count: counts.messages,
      icon: <Megaphone className="h-6 w-6" />,
      href: '/admin/messages',
      color: 'from-red-500 to-rose-600',
      bgLight: 'bg-red-50 border-red-100',
      textColor: 'text-red-700',
    },
    {
      label: 'Publications',
      count: counts.publications,
      icon: <BookOpen className="h-6 w-6" />,
      href: '/admin/publications',
      color: 'from-orange-500 to-amber-500',
      bgLight: 'bg-orange-50 border-orange-100',
      textColor: 'text-orange-700',
    },
    {
      label: 'Testimonies',
      count: counts.testimonies,
      icon: <HandHeart className="h-6 w-6" />,
      href: '/admin/testimonies',
      color: 'from-emerald-500 to-teal-500',
      bgLight: 'bg-emerald-50 border-emerald-100',
      textColor: 'text-emerald-700',
      badge: counts.pendingTestimonies > 0 ? `${counts.pendingTestimonies} pending` : undefined,
    },
    {
      label: 'Prayer Requests',
      count: counts.prayers,
      icon: <span className="text-2xl leading-none">🙏</span>,
      href: '/admin/prayers',
      color: 'from-violet-500 to-purple-500',
      bgLight: 'bg-violet-50 border-violet-100',
      textColor: 'text-violet-700',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-white px-6 py-4 text-gray-700 shadow-sm">
          <Loader className="h-5 w-5 animate-spin text-red-700" />
          Loading admin dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 text-white shadow-lg">
            <Logo className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Admin Dashboard
            </p>
            <h1 className="mt-1 font-serif text-3xl text-[#3d1d17]">Ministry Overview</h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin/messages#message-editor"
            className="inline-flex items-center gap-2 rounded-2xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            <Plus className="h-4 w-4" />
            New Post
          </Link>
          <Link
            to="/admin/publications#publication-editor"
            className="inline-flex items-center gap-2 rounded-2xl border border-orange-200 bg-white px-5 py-2.5 text-sm font-semibold text-orange-700 transition hover:bg-orange-50"
          >
            <Plus className="h-4 w-4" />
            New Publication
          </Link>
        </div>
      </div>

      {/* ── Stats Grid ──────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(card => (
          <Link
            key={card.label}
            to={card.href}
            className={`group relative overflow-hidden rounded-[1.6rem] border p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 ${card.bgLight}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{card.label}</p>
                <p className={`mt-2 text-4xl font-bold ${card.textColor}`}>{card.count}</p>
                {card.badge && (
                  <span className="mt-2 inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                    {card.badge}
                  </span>
                )}
              </div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-white shadow-sm`}
              >
                {card.icon}
              </div>
            </div>
            {/* Decorative gradient bar */}
            <div
              className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${card.color} opacity-60`}
            />
          </Link>
        ))}
      </div>

      {/* ── Quick Actions ───────────────────────────────────────────── */}
      <div className="rounded-[1.6rem] border border-orange-100 bg-white/90 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <TrendingUp className="h-5 w-5 text-red-600" />
          <h2 className="font-serif text-xl text-[#3d1d17]">Quick Actions</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/admin/messages"
            className="rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/50 p-4 text-center transition hover:shadow-md hover:-translate-y-0.5"
          >
            <Megaphone className="mx-auto h-8 w-8 text-red-500" />
            <p className="mt-2 text-sm font-semibold text-gray-800">Manage Messages</p>
            <p className="mt-1 text-xs text-gray-500">Create & edit ministry posts</p>
          </Link>
          <Link
            to="/admin/publications"
            className="rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/50 p-4 text-center transition hover:shadow-md hover:-translate-y-0.5"
          >
            <BookOpen className="mx-auto h-8 w-8 text-orange-500" />
            <p className="mt-2 text-sm font-semibold text-gray-800">Manage Publications</p>
            <p className="mt-1 text-xs text-gray-500">Upload & publish books</p>
          </Link>
          <Link
            to="/admin/testimonies"
            className="rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/50 p-4 text-center transition hover:shadow-md hover:-translate-y-0.5"
          >
            <HandHeart className="mx-auto h-8 w-8 text-emerald-500" />
            <p className="mt-2 text-sm font-semibold text-gray-800">Review Testimonies</p>
            <p className="mt-1 text-xs text-gray-500">Approve & moderate stories</p>
          </Link>
          <Link
            to="/admin/prayers"
            className="rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/50 p-4 text-center transition hover:shadow-md hover:-translate-y-0.5"
          >
            <span className="mx-auto block text-3xl">🙏</span>
            <p className="mt-2 text-sm font-semibold text-gray-800">Moderate Prayers</p>
            <p className="mt-1 text-xs text-gray-500">Manage prayer requests</p>
          </Link>
        </div>
      </div>

      {/* ── Recent Activity ─────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Messages */}
        <div className="rounded-[1.6rem] border border-orange-100 bg-white/90 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 font-serif text-xl text-[#3d1d17]">
              <Megaphone className="h-5 w-5 text-red-500" />
              Recent Messages
            </h2>
            <Link to="/admin/messages" className="text-sm font-medium text-red-600 hover:underline">
              View all
            </Link>
          </div>
          {recentMessages.length === 0 ? (
            <p className="rounded-2xl border border-orange-100 bg-orange-50 px-4 py-6 text-center text-sm text-gray-500">
              No messages yet.
            </p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map(post => (
                <div
                  key={post.id}
                  className="flex items-start gap-3 rounded-xl border border-orange-50 bg-gradient-to-r from-white to-orange-50/30 p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                    <Megaphone className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-800">{post.title}</p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {post.category} · {formatDate(post.createdAt)}
                    </p>
                  </div>
                  {post.pinned && (
                    <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                      Pinned
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Testimonies */}
        <div className="rounded-[1.6rem] border border-orange-100 bg-white/90 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 font-serif text-xl text-[#3d1d17]">
              <HandHeart className="h-5 w-5 text-emerald-500" />
              Recent Testimonies
            </h2>
            <Link
              to="/admin/testimonies"
              className="text-sm font-medium text-red-600 hover:underline"
            >
              View all
            </Link>
          </div>
          {recentTestimonies.length === 0 ? (
            <p className="rounded-2xl border border-orange-100 bg-orange-50 px-4 py-6 text-center text-sm text-gray-500">
              No testimonies yet.
            </p>
          ) : (
            <div className="space-y-3">
              {recentTestimonies.map(testimony => (
                <div
                  key={testimony.id}
                  className="flex items-start gap-3 rounded-xl border border-orange-50 bg-gradient-to-r from-white to-orange-50/30 p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                    <HandHeart className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-800">
                      {testimony.name}
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">
                      {testimony.testimony}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                      testimony.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : testimony.status === 'pending'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {testimony.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
