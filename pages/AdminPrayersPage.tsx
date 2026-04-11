import { useEffect, useMemo, useState } from 'react';
import {
  Eye,
  EyeOff,
  Loader,
  Search,
  Trash2,
} from 'lucide-react';
import {
  subscribeToAllPrayerRequests,
  togglePrayerRequestActive,
  deletePrayerRequest,
  type PrayerRequest,
} from '../services/messagePostsService';

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate));
}

export default function AdminPrayersPage() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState(
    'Moderate public prayer submissions from this page.'
  );
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'hidden'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToAllPrayerRequests(
      loaded => {
        setPrayers(loaded);
        setIsLoading(false);
      },
      error => {
        setStatusMessage(`Unable to load prayer requests: ${error.message}`);
        setIsLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const filtered = useMemo(() => {
    let result = prayers;

    if (filterActive === 'active') {
      result = result.filter(p => p.isActive !== false);
    } else if (filterActive === 'hidden') {
      result = result.filter(p => p.isActive === false);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.body.toLowerCase().includes(q) || p.author.toLowerCase().includes(q)
      );
    }

    return result;
  }, [prayers, filterActive, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: prayers.length,
      active: prayers.filter(p => p.isActive !== false).length,
      hidden: prayers.filter(p => p.isActive === false).length,
    };
  }, [prayers]);

  const handleToggleActive = async (prayer: PrayerRequest) => {
    const nextState = prayer.isActive === false ? true : false;
    try {
      await togglePrayerRequestActive(prayer.id, nextState);
      setStatusMessage(nextState ? 'Prayer request restored to public.' : 'Prayer request hidden from public.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to update prayer request.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePrayerRequest(id);
      setStatusMessage('Prayer request deleted permanently.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to delete prayer request.');
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🙏</span>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">
              Prayer Requests
            </p>
          </div>
          <h1 className="mt-1 font-serif text-3xl text-[#3d1d17]">Moderate Prayers</h1>
        </div>
        <p className="text-sm text-gray-500">
          {isLoading ? 'Loading...' : `${filtered.length} of ${prayers.length} shown`}
        </p>
      </div>

      {/* ── Status message ──────────────────────────────────────────── */}
      <p className="rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm text-gray-700">
        {statusMessage}
      </p>

      {/* ── Filter tabs + search ────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(['all', 'active', 'hidden'] as const).map(filter => (
            <button
              key={filter}
              type="button"
              onClick={() => setFilterActive(filter)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filterActive === filter
                  ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-sm'
                  : 'border border-orange-100 bg-white text-[#6e4737] hover:bg-orange-50'
              }`}
            >
              {filter === 'all' ? 'All' : filter === 'active' ? 'Active' : 'Hidden'}
              <span className="ml-1.5 opacity-75">({counts[filter]})</span>
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search prayers..."
            className="w-full rounded-2xl border border-orange-100 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 sm:w-72"
          />
        </div>
      </div>

      {/* ── Prayer list ─────────────────────────────────────────────── */}
      {isLoading ? (
        <div className="flex items-center justify-center gap-3 rounded-2xl border border-orange-100 bg-white px-6 py-10 text-gray-700">
          <Loader className="h-5 w-5 animate-spin text-red-700" />
          Loading prayer requests from Firebase...
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-orange-100 bg-white px-6 py-10 text-center text-gray-500">
          {searchQuery || filterActive !== 'all'
            ? 'No prayer requests match your filter.'
            : 'No prayer requests have been submitted yet.'}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(prayer => {
            const isActive = prayer.isActive !== false;

            return (
              <article
                key={prayer.id}
                className={`rounded-[1.6rem] border p-5 shadow-sm transition-shadow hover:shadow-md ${
                  isActive
                    ? 'border-orange-100 bg-white/95'
                    : 'border-gray-200 bg-gray-50/80 opacity-75'
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                          isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {isActive ? 'Active' : 'Hidden'}
                      </span>
                      <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                        🙏 {prayer.prayedCount} prayed
                      </span>
                    </div>

                    <p className="mt-3 text-base leading-relaxed text-gray-800">
                      "{prayer.body}"
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      By <strong>{prayer.author}</strong> · {formatDate(prayer.createdAt)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 sm:flex-col">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(prayer)}
                      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition ${
                        isActive
                          ? 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                          : 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
                      }`}
                    >
                      {isActive ? (
                        <>
                          <EyeOff className="h-4 w-4" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4" />
                          Restore
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(prayer.id)}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* ── Summary bar ─────────────────────────────────────────────── */}
      {!isLoading && prayers.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-violet-100 bg-violet-50/60 px-5 py-4 text-center">
            <p className="text-3xl font-bold text-violet-700">{counts.all}</p>
            <p className="text-sm text-gray-600">Total requests</p>
          </div>
          <div className="rounded-2xl border border-green-100 bg-green-50/60 px-5 py-4 text-center">
            <p className="text-3xl font-bold text-green-700">{counts.active}</p>
            <p className="text-sm text-gray-600">Active (public)</p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/60 px-5 py-4 text-center">
            <p className="text-3xl font-bold text-orange-700">
              {prayers.reduce((sum, p) => sum + p.prayedCount, 0)}
            </p>
            <p className="text-sm text-gray-600">Total prayers offered</p>
          </div>
        </div>
      )}
    </div>
  );
}
