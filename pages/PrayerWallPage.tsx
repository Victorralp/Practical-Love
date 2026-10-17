import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Em } from '../components/pl/primitives';
import { EASE_POP, animate, useEntrance, useStagger } from '../components/pl/motion';
import {
  hasUserPrayed,
  incrementPrayedCount,
  submitPrayerRequest,
  subscribeToPrayerRequests,
  type PrayerRequest,
  type PrayerRequestVisibility,
} from '../services/messagePostsService';

const TILT = [-1, 0.8, -0.5, 1.2, -0.9, 0.6];
const MAX_CHARS = 500;

function timeAgo(isoDate: string) {
  const seconds = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
  if (Number.isNaN(seconds)) return '';
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium' }).format(new Date(isoDate));
}

function PrayerCard({ request, index, prayed, onPray }: { request: PrayerRequest; index: number; prayed: boolean; onPray: (btn: HTMLButtonElement) => void }) {
  const red = index % 5 === 2;
  const tone = red ? 'bg-pl-red text-white' : index % 5 === 4 ? 'bg-pl-blush text-pl-ink' : 'bg-white text-pl-ink';
  const button = prayed
    ? red
      ? 'border-white bg-white text-pl-red'
      : 'border-pl-ink bg-pl-ink text-white'
    : red
      ? 'border-white bg-transparent text-white'
      : 'border-pl-ink bg-transparent text-pl-ink';
  return (
    <div
      data-card
      className={`mb-[clamp(16px,2vw,24px)] break-inside-avoid rounded-[24px] border-2 border-pl-ink p-6 ${tone}`}
      style={{ transform: `rotate(${TILT[index % TILT.length]}deg)` }}
    >
      <p className="pl-serif m-0 whitespace-pre-line text-[clamp(22px,2vw,26px)] not-italic leading-[1.2]">{request.body}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-[14px] opacity-75">
          {request.author || 'Anonymous'} · {timeAgo(request.createdAt)}
        </span>
        <button
          type="button"
          onClick={e => onPray(e.currentTarget)}
          disabled={prayed}
          aria-pressed={prayed}
          className={`min-h-[44px] flex-none rounded-full border-2 px-4 text-[14px] font-semibold disabled:cursor-default ${button}`}
        >
          🙏 {prayed ? 'Prayed' : 'I prayed'} · {request.prayedCount || 0}
        </button>
      </div>
    </div>
  );
}

export default function PrayerWallPage() {
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [visibility, setVisibility] = useState<PrayerRequestVisibility>('public');
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState('');
  const [prayed, setPrayed] = useState<Set<string>>(new Set());
  const rootRef = useRef<HTMLDivElement | null>(null);
  const noticeRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(
    () =>
      subscribeToPrayerRequests(
        loaded => {
          setRequests(loaded);
          setLoading(false);
        },
        error => {
          setLoadError(`We could not load the prayer wall right now. ${error.message}`);
          setLoading(false);
        }
      ),
    []
  );

  useEntrance(rootRef);
  useStagger(rootRef, loading, { delay: 300, step: 80 });

  useEffect(() => {
    if (notice) animate(noticeRef.current, [{ transform: 'translateY(-10px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 500, easing: EASE_POP });
  }, [notice]);

  const total = requests.reduce((sum, r) => sum + (r.prayedCount || 0), 0);
  const isPrayed = (id: string) => prayed.has(id) || hasUserPrayed(id);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const body = text.trim();
    if (body.length < 5) {
      setNotice('Please write a few more words so we know how to pray.');
      return;
    }
    setSending(true);
    setNotice('');
    try {
      await submitPrayerRequest(body, name, visibility);
      setText('');
      setNotice(
        visibility === 'public'
          ? 'Thank you ♥ Your request will appear on the wall once it has been reviewed.'
          : 'Thank you ♥ Your private request has gone to the ministry team.'
      );
    } catch {
      setNotice('We could not send your request right now. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const pray = async (id: string, btn: HTMLButtonElement) => {
    if (isPrayed(id)) return;
    setPrayed(prev => new Set(prev).add(id));
    animate(btn, [{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }], { duration: 400, easing: EASE_POP });
    try {
      await incrementPrayedCount(id);
    } catch {
      setPrayed(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  return (
    <div ref={rootRef} className="pl-scope">
      <section className="pl-wrap grid items-end gap-[clamp(32px,5vw,72px)] pb-[clamp(32px,5vw,56px)] pt-[clamp(48px,8vw,104px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
        <div>
          <h1 data-in className="m-0 text-[clamp(56px,10vw,140px)] font-extrabold leading-[.88] tracking-[-0.055em]">
            Lift a name <Em>up.</Em>
          </h1>
          <p data-in className="pl-lede max-w-[36ch]">
            Share a request, or tap “I prayed” on someone else’s. Nobody carries it alone.
          </p>
          {total > 0 && (
            <p data-in className="mt-5 text-[22px] font-extrabold">
              <span className="text-pl-red">{total.toLocaleString('en-US')}</span> prayers prayed on this wall
            </p>
          )}
        </div>
        <form data-in onSubmit={submit} className="grid gap-3 rounded-[28px] bg-pl-red p-[clamp(20px,3vw,32px)] text-white">
          <label htmlFor="pw-name" className="text-[14px] font-semibold">
            Your first name (optional)
          </label>
          <input
            id="pw-name"
            value={name}
            maxLength={50}
            onChange={e => setName(e.target.value)}
            placeholder="Anonymous"
            className="min-h-[52px] rounded-[16px] border-0 px-[18px] text-[16px] text-pl-ink"
          />
          <label htmlFor="pw-text" className="text-[14px] font-semibold">
            What can we pray for?
          </label>
          <textarea
            id="pw-text"
            required
            value={text}
            onChange={e => setText(e.target.value.slice(0, MAX_CHARS))}
            placeholder="e.g. Healing between my brother and me"
            className="min-h-[110px] resize-y rounded-[16px] border-0 px-[18px] py-[14px] text-[16px] text-pl-ink"
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Who can see this request">
              {(
                [
                  ['public', 'Wall, after review'],
                  ['private', 'Ministry team only'],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={visibility === value}
                  onClick={() => setVisibility(value)}
                  className={`min-h-[40px] rounded-full border-2 border-white px-4 text-[14px] font-semibold ${
                    visibility === value ? 'bg-white text-pl-red' : 'bg-transparent text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <span className="text-[13px] tabular-nums opacity-80">
              {text.length}/{MAX_CHARS}
            </span>
          </div>
          <button type="submit" disabled={sending} className="min-h-[54px] rounded-full border-0 bg-pl-ink text-[17px] font-bold text-white disabled:opacity-70">
            {sending ? 'Sending…' : 'Post to the wall'}
          </button>
          {notice && (
            <p ref={noticeRef} role="status" className="m-0 text-[15px] font-semibold">
              {notice}
            </p>
          )}
        </form>
      </section>

      <section className="pl-wrap pb-[clamp(64px,9vw,120px)]">
        {loading ? (
          <div className="pl-masonry" aria-busy="true">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="mb-6 h-40 animate-pulse break-inside-avoid rounded-[24px] bg-pl-blush motion-reduce:animate-none" />
            ))}
          </div>
        ) : loadError ? (
          <p role="alert" className="text-[18px]">
            {loadError}
          </p>
        ) : requests.length === 0 ? (
          <p className="text-[18px] text-pl-body">The wall is quiet right now. Be the first to share a request.</p>
        ) : (
          <div className="[column-gap:clamp(16px,2vw,24px)] [columns:3_300px]">
            {requests.map((r, i) => (
              <PrayerCard key={r.id} request={r} index={i} prayed={isPrayed(r.id)} onPray={btn => pray(r.id, btn)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
