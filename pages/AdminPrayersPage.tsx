import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, EyeOff, HeartHandshake, Lock, RotateCcw, Search } from 'lucide-react';
import {
  AdminPageHeader,
  AdminPanel,
  ConfirmButton,
  EmptyState,
  FilterTabs,
  LoadingState,
  StatusBanner,
  adminButton,
  controlClass,
} from '../components/admin';
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

const FILTER_ORDER = ['pending', 'approved', 'private', 'hidden', 'all'] as const;

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

function getStatusStyle(prayer: PrayerRequest) {
  if (prayer.visibility === 'private') return 'bg-violet-50 text-violet-700';
  if (prayer.status === 'pending') return 'bg-amber-50 text-amber-700';
  if (prayer.status === 'hidden') return 'bg-[#f4ede8] text-[#8a6552]';
  return 'bg-emerald-50 text-emerald-700';
}

function getStatusLabel(prayer: PrayerRequest) {
  if (prayer.visibility === 'private') return 'Private';
  if (prayer.status === 'pending') return 'Pending';
  if (prayer.status === 'hidden') return 'Hidden';
  return 'Public';
}

export default function AdminPrayersPage() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
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

  const counts = useMemo(
    () =>
      ({
        all: prayers.length,
        pending: filterPrayerRequestsForAdmin(prayers, 'pending').length,
        approved: filterPrayerRequestsForAdmin(prayers, 'approved').length,
        private: filterPrayerRequestsForAdmin(prayers, 'private').length,
        hidden: filterPrayerRequestsForAdmin(prayers, 'hidden').length,
      }) satisfies Record<AdminPrayerFilter, number>,
    [prayers]
  );

  const totalPrayed = useMemo(
    () => prayers.reduce((sum, prayer) => sum + prayer.prayedCount, 0),
    [prayers]
  );

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

  const runAction = async (action: () => Promise<void>, successMessage: string, failure: string) => {
    try {
      await action();
      setStatusMessage(successMessage);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : failure);
    }
  };

  const summaryStats = [
    { label: 'Pending review', value: counts.pending, className: 'text-amber-700' },
    { label: 'Approved public', value: counts.approved, className: 'text-emerald-700' },
    { label: 'Private requests', value: counts.private, className: 'text-violet-700' },
    { label: 'Prayers offered', value: totalPrayed, className: 'text-red-700' },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Prayers"
        title="Prayer requests"
        description="Approve public requests for the prayer wall. Private requests stay visible to admins only."
        icon={<HeartHandshake className="h-5 w-5" />}
        accentClassName="bg-violet-50 text-violet-600 ring-violet-100"
        meta={isLoading ? 'Loading...' : `${filtered.length} of ${prayers.length} shown`}
      />

      {statusMessage ? (
        <StatusBanner message={statusMessage} onDismiss={() => setStatusMessage('')} />
      ) : null}

      {!isLoading && prayers.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {summaryStats.map(stat => (
            <div
              key={stat.label}
              className="rounded-xl border border-[#f0e2d8] bg-white px-4 py-3.5"
            >
              <p className={`text-2xl font-semibold tabular-nums ${stat.className}`}>{stat.value}</p>
              <p className="mt-0.5 text-xs text-[#8a6552]">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <FilterTabs
          label="Filter prayer requests"
          value={filterActive}
          onChange={setFilterActive}
          tabs={FILTER_ORDER.map(value => ({
            value,
            label: FILTER_LABELS[value],
            count: counts[value],
          }))}
        />

        <div className="relative lg:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#bda392]" />
          <input
            type="text"
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
            placeholder="Search request or author..."
            aria-label="Search prayer requests"
            className={`${controlClass} pl-9`}
          />
        </div>
      </div>

      <AdminPanel flush>
        {isLoading ? (
          <LoadingState label="Loading prayer requests..." className="m-5" />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<HeartHandshake className="h-5 w-5" />}
            title={
              searchQuery || filterActive !== 'all'
                ? 'Nothing matches this filter'
                : 'No prayer requests yet'
            }
            description={
              searchQuery || filterActive !== 'all'
                ? 'Try another filter or clear the search.'
                : 'Requests submitted from the public wall appear here.'
            }
            className="m-5"
          />
        ) : (
          <ul className="divide-y divide-[#f6ece4]">
            {filtered.map(prayer => (
              <li
                key={prayer.id}
                className={`px-5 py-4 transition hover:bg-[#fdfaf7] ${
                  prayer.status === 'hidden' ? 'opacity-70' : ''
                }`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`rounded-md px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] ${getStatusStyle(prayer)}`}
                      >
                        {getStatusLabel(prayer)}
                      </span>
                      <span className="rounded-md bg-[#fdf3ec] px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#a8735c]">
                        {prayer.prayedCount} prayed
                      </span>
                      {prayer.visibility === 'private' && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-[#f4ede8] px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#8a6552]">
                          <Lock className="h-3 w-3" />
                          Admin only
                        </span>
                      )}
                    </div>

                    <p className="mt-2.5 text-sm leading-6 text-[#3d1d17]">“{prayer.body}”</p>
                    <p className="mt-2 text-xs text-[#a8735c]">
                      {prayer.author} · {formatDate(prayer.createdAt)}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-1.5 sm:w-40 sm:flex-col">
                    {prayer.visibility === 'public' && prayer.status === 'pending' && (
                      <button
                        type="button"
                        onClick={() =>
                          runAction(
                            () => approvePrayerRequest(prayer.id),
                            'Prayer request approved for the public wall.',
                            'Unable to approve prayer request.'
                          )
                        }
                        className={adminButton.success}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Approve
                      </button>
                    )}
                    {prayer.status === 'hidden' ? (
                      <button
                        type="button"
                        onClick={() =>
                          runAction(
                            () => togglePrayerRequestActive(prayer.id, true),
                            'Prayer request restored to the public wall.',
                            'Unable to restore prayer request.'
                          )
                        }
                        className={adminButton.success}
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Restore
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          runAction(
                            () => hidePrayerRequest(prayer.id),
                            'Prayer request hidden from the public wall.',
                            'Unable to hide prayer request.'
                          )
                        }
                        className={adminButton.subtle}
                      >
                        <EyeOff className="h-3.5 w-3.5" />
                        Hide
                      </button>
                    )}
                    <ConfirmButton
                      onConfirm={() =>
                        runAction(
                          () => deletePrayerRequest(prayer.id),
                          'Prayer request deleted permanently.',
                          'Unable to delete prayer request.'
                        )
                      }
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminPanel>
    </div>
  );
}
