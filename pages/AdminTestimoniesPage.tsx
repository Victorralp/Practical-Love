import { useEffect, useMemo, useState } from 'react';
import {
  Check,
  Archive,
  HandHeart,
  Loader,
  Search,
  Star,
  Trash2,
  User,
} from 'lucide-react';
import {
  subscribeToAllTestimonies,
  updateTestimonyStatus,
  deleteTestimony,
  type TestimonyRecord,
  type TestimonyStatus,
} from '../services/testimoniesService';

const STATUS_STYLES: Record<TestimonyStatus, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Pending' },
  approved: { bg: 'bg-green-100', text: 'text-green-700', label: 'Approved' },
  archived: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Archived' },
};

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate));
}

export default function AdminTestimoniesPage() {
  const [testimonies, setTestimonies] = useState<TestimonyRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('Manage submitted testimonies from this page.');
  const [filterStatus, setFilterStatus] = useState<TestimonyStatus | 'all'>('all');
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

  const statusCounts = useMemo(() => {
    return {
      all: testimonies.length,
      pending: testimonies.filter(t => t.status === 'pending').length,
      approved: testimonies.filter(t => t.status === 'approved').length,
      archived: testimonies.filter(t => t.status === 'archived').length,
    };
  }, [testimonies]);

  const handleUpdateStatus = async (id: string, status: TestimonyStatus) => {
    try {
      await updateTestimonyStatus(id, status);
      setStatusMessage(`Testimony ${status === 'approved' ? 'approved' : status === 'archived' ? 'archived' : 'updated'}.`);
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
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <HandHeart className="h-5 w-5 text-emerald-600" />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Testimonies
            </p>
          </div>
          <h1 className="mt-1 font-serif text-3xl text-[#3d1d17]">Manage Testimonies</h1>
        </div>
        <p className="text-sm text-gray-500">
          {isLoading ? 'Loading...' : `${filtered.length} of ${testimonies.length} shown`}
        </p>
      </div>

      {/* ── Status message ──────────────────────────────────────────── */}
      <p className="rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm text-gray-700">
        {statusMessage}
      </p>

      {/* ── Filter tabs + search ────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(['all', 'pending', 'approved', 'archived'] as const).map(status => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filterStatus === status
                  ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-sm'
                  : 'border border-orange-100 bg-white text-[#6e4737] hover:bg-orange-50'
              }`}
            >
              {status === 'all' ? 'All' : STATUS_STYLES[status].label}
              <span className="ml-1.5 opacity-75">({statusCounts[status]})</span>
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search testimonies..."
            className="w-full rounded-2xl border border-orange-100 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 sm:w-72"
          />
        </div>
      </div>

      {/* ── Testimonies list ────────────────────────────────────────── */}
      {isLoading ? (
        <div className="flex items-center justify-center gap-3 rounded-2xl border border-orange-100 bg-white px-6 py-10 text-gray-700">
          <Loader className="h-5 w-5 animate-spin text-red-700" />
          Loading testimonies from Firebase...
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-orange-100 bg-white px-6 py-10 text-center text-gray-500">
          {searchQuery || filterStatus !== 'all'
            ? 'No testimonies match your filter criteria.'
            : 'No testimonies have been submitted yet.'}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(testimony => {
            const style = STATUS_STYLES[testimony.status] ?? STATUS_STYLES.pending;
            const isExpanded = expandedId === testimony.id;

            return (
              <article
                key={testimony.id}
                className="rounded-[1.6rem] border border-orange-100 bg-white/95 p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  {/* Left: content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${style.bg} ${style.text}`}
                      >
                        {style.label}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: testimony.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      {testimony.imageUrl ? (
                        <img
                          src={testimony.imageUrl}
                          alt={testimony.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-orange-100 text-red-600">
                          <User className="h-5 w-5" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">{testimony.name}</p>
                        <p className="text-sm text-gray-500">
                          {testimony.role}
                          {testimony.location ? ` · ${testimony.location}` : ''}
                        </p>
                      </div>
                    </div>

                    <p className={`mt-3 text-sm leading-relaxed text-gray-700 ${!isExpanded ? 'line-clamp-3' : ''}`}>
                      "{testimony.testimony}"
                    </p>

                    {testimony.testimony.length > 200 && (
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : testimony.id)}
                        className="mt-1 text-sm font-medium text-red-600 hover:underline"
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                    )}

                    <p className="mt-2 text-xs text-gray-400">
                      Submitted {formatDate(testimony.createdAt)}
                      {testimony.email ? ` · ${testimony.email}` : ''}
                    </p>
                  </div>

                  {/* Right: actions */}
                  <div className="flex flex-wrap gap-2 lg:flex-col">
                    {testimony.status !== 'approved' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(testimony.id, 'approved')}
                        className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-100"
                      >
                        <Check className="h-4 w-4" />
                        Approve
                      </button>
                    )}
                    {testimony.status !== 'archived' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(testimony.id, 'archived')}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                      >
                        <Archive className="h-4 w-4" />
                        Archive
                      </button>
                    )}
                    {testimony.status === 'archived' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(testimony.id, 'pending')}
                        className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-100"
                      >
                        Restore
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(testimony.id)}
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
    </div>
  );
}
