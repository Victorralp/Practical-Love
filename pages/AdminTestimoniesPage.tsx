import { useEffect, useMemo, useState } from 'react';
import { Archive, Check, HandHeart, RotateCcw, Search, Star, User } from 'lucide-react';
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
  subscribeToAllTestimonies,
  updateTestimonyStatus,
  deleteTestimony,
  type TestimonyRecord,
  type TestimonyStatus,
} from '../services/testimoniesService';

const STATUS_STYLES: Record<TestimonyStatus, { className: string; label: string }> = {
  pending: { className: 'bg-amber-50 text-amber-700', label: 'Pending' },
  approved: { className: 'bg-emerald-50 text-emerald-700', label: 'Approved' },
  archived: { className: 'bg-[#f4ede8] text-[#8a6552]', label: 'Archived' },
};

const FILTERS = ['all', 'pending', 'approved', 'archived'] as const;
type FilterValue = (typeof FILTERS)[number];

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate));
}

export default function AdminTestimoniesPage() {
  const [testimonies, setTestimonies] = useState<TestimonyRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterValue>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAllTestimonies(
      loaded => {
        setTestimonies(loaded);
        setIsLoading(false);
      },
      error => {
        setStatusMessage(`Unable to load testimonies: ${error.message}`);
        setIsLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const filtered = useMemo(() => {
    let result = testimonies;

    if (filterStatus !== 'all') {
      result = result.filter(t => t.status === filterStatus);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        t =>
          t.name.toLowerCase().includes(q) ||
          t.testimony.toLowerCase().includes(q) ||
          t.role.toLowerCase().includes(q) ||
          t.location.toLowerCase().includes(q)
      );
    }

    return result;
  }, [testimonies, filterStatus, searchQuery]);

  const statusCounts = useMemo(
    () => ({
      all: testimonies.length,
      pending: testimonies.filter(t => t.status === 'pending').length,
      approved: testimonies.filter(t => t.status === 'approved').length,
      archived: testimonies.filter(t => t.status === 'archived').length,
    }),
    [testimonies]
  );

  const handleUpdateStatus = async (id: string, status: TestimonyStatus) => {
    try {
      await updateTestimonyStatus(id, status);
      setStatusMessage(
        status === 'approved'
          ? 'Testimony approved and published.'
          : status === 'archived'
            ? 'Testimony archived and pulled from the public page.'
            : 'Testimony restored to pending.'
      );
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to update testimony.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTestimony(id);
      if (expandedId === id) setExpandedId(null);
      setStatusMessage('Testimony deleted permanently.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to delete testimony.');
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Testimonies"
        title="Submitted stories"
        description="Approve what should appear publicly. Approved stories are published without the submitter's email."
        icon={<HandHeart className="h-5 w-5" />}
        accentClassName="bg-emerald-50 text-emerald-600 ring-emerald-100"
        meta={isLoading ? 'Loading...' : `${filtered.length} of ${testimonies.length} shown`}
      />

      {statusMessage ? (
        <StatusBanner message={statusMessage} onDismiss={() => setStatusMessage('')} />
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <FilterTabs
          label="Filter testimonies by status"
          value={filterStatus}
          onChange={setFilterStatus}
          tabs={FILTERS.map(value => ({
            value,
            label: value === 'all' ? 'All' : STATUS_STYLES[value].label,
            count: statusCounts[value],
          }))}
        />

        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#bda392]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search name, story, location..."
            aria-label="Search testimonies"
            className={`${controlClass} pl-9`}
          />
        </div>
      </div>

      <AdminPanel flush>
        {isLoading ? (
          <LoadingState label="Loading testimonies..." className="m-5" />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<HandHeart className="h-5 w-5" />}
            title={
              searchQuery || filterStatus !== 'all'
                ? 'Nothing matches this filter'
                : 'No testimonies yet'
            }
            description={
              searchQuery || filterStatus !== 'all'
                ? 'Try a different status or clear the search.'
                : 'Stories submitted from the public form land here for review.'
            }
            className="m-5"
          />
        ) : (
          <ul className="divide-y divide-[#f6ece4]">
            {filtered.map(testimony => {
              const style = STATUS_STYLES[testimony.status] ?? STATUS_STYLES.pending;
              const isExpanded = expandedId === testimony.id;

              return (
                <li key={testimony.id} className="px-5 py-4 transition hover:bg-[#fdfaf7]">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        {testimony.imageUrl ? (
                          <img
                            src={testimony.imageUrl}
                            alt=""
                            className="h-9 w-9 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fdf3ec] text-[#a8735c]">
                            <User className="h-4 w-4" />
                          </span>
                        )}
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-semibold text-[#3d1d17]">{testimony.name}</p>
                            <span
                              className={`rounded-md px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] ${style.className}`}
                            >
                              {style.label}
                            </span>
                            <span className="flex items-center gap-0.5" aria-label={`${testimony.rating} of 5`}>
                              {Array.from({ length: testimony.rating }).map((_, index) => (
                                <Star
                                  key={index}
                                  className="h-3 w-3 fill-amber-400 text-amber-400"
                                />
                              ))}
                            </span>
                          </div>
                          <p className="truncate text-xs text-[#8a6552]">
                            {[testimony.role, testimony.location].filter(Boolean).join(' · ')}
                          </p>
                        </div>
                      </div>

                      <p
                        className={`mt-3 text-sm leading-6 text-[#5c3a2b] ${
                          isExpanded ? '' : 'line-clamp-3'
                        }`}
                      >
                        “{testimony.testimony}”
                      </p>

                      {testimony.testimony.length > 200 && (
                        <button
                          type="button"
                          onClick={() => setExpandedId(isExpanded ? null : testimony.id)}
                          className="mt-1 text-xs font-medium text-red-700 hover:underline"
                        >
                          {isExpanded ? 'Show less' : 'Read more'}
                        </button>
                      )}

                      <p className="mt-2 text-xs text-[#a8735c]">
                        Submitted {formatDate(testimony.createdAt)}
                        {testimony.email ? ` · ${testimony.email}` : ''}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-1.5 lg:w-40 lg:flex-col">
                      {testimony.status !== 'approved' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(testimony.id, 'approved')}
                          className={adminButton.success}
                        >
                          <Check className="h-3.5 w-3.5" />
                          Approve
                        </button>
                      )}
                      {testimony.status !== 'archived' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(testimony.id, 'archived')}
                          className={adminButton.subtle}
                        >
                          <Archive className="h-3.5 w-3.5" />
                          Archive
                        </button>
                      )}
                      {testimony.status === 'archived' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(testimony.id, 'pending')}
                          className={adminButton.subtle}
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          Restore
                        </button>
                      )}
                      <ConfirmButton onConfirm={() => handleDelete(testimony.id)} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </AdminPanel>
    </div>
  );
}
