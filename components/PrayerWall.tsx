import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Loader, Send, Users } from 'lucide-react';
import {
  subscribeToPrayerRequests,
  submitPrayerRequest,
  incrementPrayedCount,
  hasUserPrayed,
  type PrayerRequest,
} from '../services/messagePostsService';

function timeAgo(isoDate: string): string {
  const seconds = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium' }).format(new Date(isoDate));
}

export default function PrayerWall() {
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newRequestBody, setNewRequestBody] = useState('');
  const [newRequestAuthor, setNewRequestAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prayedIds, setPrayedIds] = useState<Set<string>>(new Set());
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToPrayerRequests(
      loaded => {
        setRequests(loaded);
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const handleSubmit = async () => {
    const body = newRequestBody.trim();
    if (!body || body.length < 5) return;

    setIsSubmitting(true);
    try {
      await submitPrayerRequest(body, newRequestAuthor);
      setNewRequestBody('');
      setNewRequestAuthor('');
    } catch {
      // Silently fail — real-time listener will show the request if it succeeded
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePray = async (requestId: string) => {
    if (hasUserPrayed(requestId) || prayedIds.has(requestId)) return;

    setAnimatingId(requestId);
    setPrayedIds(prev => new Set(prev).add(requestId));

    try {
      await incrementPrayedCount(requestId);
    } catch {
      setPrayedIds(prev => {
        const next = new Set(prev);
        next.delete(requestId);
        return next;
      });
    }

    setTimeout(() => setAnimatingId(null), 600);
  };

  const charCount = newRequestBody.length;
  const maxChars = 500;

  return (
    <div className="space-y-6">
      {/* Submit prayer request form */}
      <div className="rounded-[1.8rem] border border-orange-100 bg-[linear-gradient(135deg,_rgba(255,247,237,0.95)_0%,_rgba(255,255,255,0.98)_100%)] p-6 shadow-sm">
        <div className="flex items-center gap-2 text-red-700">
          <Heart className="h-5 w-5 fill-red-200" />
          <h3 className="text-lg font-semibold font-serif">Share a prayer request</h3>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Your request will be visible to the community. You can remain anonymous.
        </p>

        <div className="mt-4 grid gap-3">
          <input
            type="text"
            value={newRequestAuthor}
            onChange={e => setNewRequestAuthor(e.target.value)}
            placeholder="Your name (optional)"
            maxLength={50}
            className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
          />
          <div className="relative">
            <textarea
              value={newRequestBody}
              onChange={e => setNewRequestBody(e.target.value.slice(0, maxChars))}
              rows={3}
              placeholder="What would you like prayer for?"
              className="w-full resize-none rounded-2xl border border-orange-100 bg-white px-4 py-3 pr-16 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
            <span
              className={`absolute bottom-3 right-4 text-xs tabular-nums ${charCount > maxChars * 0.9 ? 'text-red-500' : 'text-gray-300'}`}
            >
              {charCount}/{maxChars}
            </span>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || charCount < 5}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-700 to-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-red-800 hover:to-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </div>

      {/* Prayer requests list */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="animate-pulse rounded-[1.8rem] border border-orange-100 bg-white/80 p-6"
            >
              <div className="h-4 w-24 rounded-lg bg-orange-100" />
              <div className="mt-3 h-4 w-full rounded-lg bg-orange-50" />
              <div className="mt-2 h-4 w-3/4 rounded-lg bg-orange-50" />
            </div>
          ))}
        </div>
      ) : requests.length === 0 ? (
        <div className="rounded-[1.8rem] border border-dashed border-orange-200 bg-orange-50/60 px-6 py-10 text-center">
          <Heart className="mx-auto h-10 w-10 text-orange-300" />
          <p className="mt-3 font-serif text-lg text-[#3d1d17]">No prayer requests yet</p>
          <p className="mt-2 text-sm text-gray-500">
            Be the first to share — your community is here for you.
          </p>
        </div>
      ) : (
        <AnimatePresence initial={false}>
          <div className="space-y-4">
            {requests.map((request, index) => {
              const alreadyPrayed = hasUserPrayed(request.id) || prayedIds.has(request.id);

              return (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="rounded-[1.8rem] border border-orange-100 bg-white/95 p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                        <span className="font-semibold text-gray-700">{request.author}</span>
                        <span>·</span>
                        <span>{timeAgo(request.createdAt)}</span>
                      </div>
                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-700">
                        {request.body}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <motion.button
                      type="button"
                      onClick={() => handlePray(request.id)}
                      disabled={alreadyPrayed}
                      whileTap={alreadyPrayed ? {} : { scale: 0.92 }}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                        alreadyPrayed
                          ? 'border-red-200 bg-red-50 text-red-700 shadow-sm'
                          : 'border-orange-100 bg-white text-gray-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700'
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={animatingId === request.id ? 'animating' : 'static'}
                          initial={
                            animatingId === request.id ? { scale: 0.3, opacity: 0 } : false
                          }
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                          className="text-base"
                        >
                          🙏
                        </motion.span>
                      </AnimatePresence>
                      {alreadyPrayed ? 'Prayed' : 'I prayed for this'}
                    </motion.button>

                    {request.prayedCount > 0 && (
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Users className="h-3.5 w-3.5" />
                        <span className="tabular-nums">{request.prayedCount}</span>
                        {request.prayedCount === 1 ? ' person' : ' people'}
                        {' prayed'}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
