import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, EyeOff, Loader, Lock, RotateCcw, Search, Trash2 } from 'lucide-react';
import {
  approvePrayerRequest,
  deletePrayerRequest,
  filterPrayerRequestsForAdmin,
  hidePrayerRequest,
  subscribeToAllPrayerRequests,
  togglePrayerRequestActive,
  type AdminPrayerFilter,
  type PrayerRequest,
} from '../services/messagePostsService';

const FILTER_LABELS: Record<AdminPrayerFilter, string> = {
  all: 'All',
  pending: 'Pending',
  approved: 'Approved',
  private: 'Private',
  hidden: 'Hidden',
};

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate));
}

function getStatusClasses(prayer: PrayerRequest) {
  if (prayer.visibility === 'private') {
    return 'bg-violet-100 text-violet-700';
  }

  if (prayer.status === 'pending') {
    return 'bg-amber-100 text-amber-700';
  }

  if (prayer.status === 'hidden') {
    return 'bg-gray-200 text-gray-600';
  }

  return 'bg-green-100 text-green-700';
}

function getStatusLabel(prayer: PrayerRequest) {
  if (prayer.visibility === 'private') return 'Private';
  if (prayer.status === 'pending') return 'Pending approval';
  if (prayer.status === 'hidden') return 'Hidden';
  return 'Approved public';
}

export default function AdminPrayersPage() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState(
    'Review pending public requests, protect private submissions, and moderate the prayer wall.'
  );
  const [filterActive, setFilterActive] = useState<AdminPrayerFilter>('pending');
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

  const counts = useMemo(() => {
    return {
      all: prayers.length,
      pending: filterPrayerRequestsForAdmin(prayers, 'pending').length,
      approved: filterPrayerRequestsForAdmin(prayers, 'approved').length,
      private: filterPrayerRequestsForAdmin(prayers, 'private').length,
      hidden: filterPrayerRequestsForAdmin(prayers, 'hidden').length,
    } satisfies Record<AdminPrayerFilter, number>;
  }, [prayers]);

  const filtered = useMemo(() => {
    let result = filterPrayerRequestsForAdmin(prayers, filterActive);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        prayer => prayer.body.toLowerCase().includes(q) || prayer.author.toLowerCase().includes(q)
      );
    }

    return result;
  }, [prayers, filterActive, searchQuery]);

  const handleApprove = async (id: string) => {
    try {
      await approvePrayerRequest(id);
      setStatusMessage('Prayer request approved for the public wall.');
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : 'Unable to approve prayer request.'
      );
    }
  };

  const handleHide = async (id: string) => {
    try {
      await hidePrayerRequest(id);
      setStatusMessage('Prayer request hidden from the public wall.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to hide prayer request.');
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await togglePrayerRequestActive(id, true);
      setStatusMessage('Prayer request restored to the public wall.');
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : 'Unable to restore prayer request.'
      );
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">
              PR
            </span>
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

      <p className="rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm text-gray-700">
        {statusMessage}
      </p>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex flex-wrap gap-2">
          {(['pending', 'approved', 'private', 'hidden', 'all'] as const).map(filter => (
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
              {FILTER_LABELS[filter]}
              <span className="ml-1.5 opacity-75">({counts[filter]})</span>
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
            placeholder="Search prayers..."
            className="w-full rounded-2xl border border-orange-100 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 lg:w-72"
          />
        </div>
      </div>

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
          {filtered.map(prayer => (
            <article
              key={prayer.id}
              className={`rounded-[1.6rem] border p-5 shadow-sm transition-shadow hover:shadow-md ${
                prayer.status === 'hidden'
                  ? 'border-gray-200 bg-gray-50/80 opacity-80'
                  : 'border-orange-100 bg-white/95'
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${getStatusClasses(prayer)}`}
                    >
                      {getStatusLabel(prayer)}
                    </span>
                    <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                      {prayer.prayedCount} prayed
                    </span>
                    {prayer.visibility === 'private' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                        <Lock className="h-3.5 w-3.5" />
                        Admin only
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-base leading-relaxed text-gray-800">"{prayer.body}"</p>

                  <p className="mt-2 text-sm text-gray-500">
                    By <strong>{prayer.author}</strong> · {formatDate(prayer.createdAt)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 sm:flex-col">
                  {prayer.visibility === 'public' && prayer.status === 'pending' && (
                    <button
                      type="button"
                      onClick={() => handleApprove(prayer.id)}
                      className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-100"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Approve
                    </button>
                  )}
                  {prayer.status === 'hidden' ? (
                    <button
                      type="button"
                      onClick={() => handleRestore(prayer.id)}
                      className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-100"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Restore
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleHide(prayer.id)}
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                    >
                      <EyeOff className="h-4 w-4" />
                      Hide
                    </button>
                  )}
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
          ))}
        </div>
      )}

      {!isLoading && prayers.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-amber-100 bg-amber-50/60 px-5 py-4 text-center">
            <p className="text-3xl font-bold text-amber-700">{counts.pending}</p>
            <p className="text-sm text-gray-600">Pending review</p>
          </div>
          <div className="rounded-2xl border border-green-100 bg-green-50/60 px-5 py-4 text-center">
            <p className="text-3xl font-bold text-green-700">{counts.approved}</p>
            <p className="text-sm text-gray-600">Approved public</p>
          </div>
          <div className="rounded-2xl border border-violet-100 bg-violet-50/60 px-5 py-4 text-center">
            <p className="text-3xl font-bold text-violet-700">{counts.private}</p>
            <p className="text-sm text-gray-600">Private requests</p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/60 px-5 py-4 text-center">
            <p className="text-3xl font-bold text-orange-700">
              {prayers.reduce((sum, prayer) => sum + prayer.prayedCount, 0)}
            </p>
            <p className="text-sm text-gray-600">Total prayers offered</p>
          </div>
        </div>
      )}
    </div>
  );
}
