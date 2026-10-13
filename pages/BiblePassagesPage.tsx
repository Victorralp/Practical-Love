import { useEffect, useMemo, useRef, useState } from 'react';
import { Em } from '../components/pl/primitives';
import { EASE_POP, animate, prefersReducedMotion, useEntrance, usePopOnChange } from '../components/pl/motion';
import { PASSAGES } from '../data/lovePassages';

const GROUPS = ['All', 'Gospels', 'Paul', 'Letters'] as const;
type Group = (typeof GROUPS)[number];

const GOSPELS = ['Matthew', 'Mark', 'Luke', 'John'];
const PAUL = [
  'Romans',
  '1 Corinthians',
  '2 Corinthians',
  'Galatians',
  'Ephesians',
  'Philippians',
  'Colossians',
  '1 Thessalonians',
  '2 Thessalonians',
  '1 Timothy',
  '2 Timothy',
  'Titus',
  'Philemon',
];

function groupOf(reference: string): Exclude<Group, 'All'> {
  const book = reference.replace(/\s+\d+(:.*)?$/, '');
  if (GOSPELS.includes(book)) return 'Gospels';
  if (PAUL.includes(book)) return 'Paul';
  return 'Letters';
}

const START = Math.max(
  0,
  PASSAGES.findIndex(p => p.reference === 'John 3:16')
);

export default function BiblePassagesPage() {
  const [group, setGroup] = useState<Group>('All');
  const [query, setQuery] = useState('');
  const [spot, setSpot] = useState(START);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const spotRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const copyTimer = useRef<number | undefined>(undefined);

  useEntrance(rootRef);
  usePopOnChange(spotRef, spot, [
    { transform: 'translateY(24px)', opacity: 0 },
    { transform: 'none', opacity: 1 },
  ]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    listRef.current?.querySelectorAll<HTMLElement>('[data-v]').forEach((el, i) =>
      animate(
        el,
        [
          { transform: 'translateY(40px)', opacity: 0 },
          { transform: 'none', opacity: 1 },
        ],
        { duration: 650, delay: 200 + Math.min(i, 12) * 50, easing: EASE_POP, fill: 'backwards' }
      )
    );
  }, []);

  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PASSAGES.map((p, i) => ({ p, i })).filter(
      ({ p }) => (group === 'All' || groupOf(p.reference) === group) && (!q || `${p.reference} ${p.text}`.toLowerCase().includes(q))
    );
  }, [group, query]);

  const current = PASSAGES[spot];

  const pick = (i: number) => {
    setSpot(i);
    setCopied(false);
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  const shuffle = () => {
    let next = spot;
    while (next === spot) next = Math.floor(Math.random() * PASSAGES.length);
    setSpot(next);
    setCopied(false);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`“${current.text}” ${current.reference}`);
      setCopied(true);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked; the verse stays on screen to copy by hand.
    }
  };

  return (
    <div ref={rootRef}>
      <section className="bg-pl-red text-white">
        <div className="pl-wrap py-[clamp(48px,8vw,104px)]">
          <p data-in className="m-0 text-[14px] font-bold uppercase tracking-[0.08em]">
            Verse spotlight
          </p>
          <div ref={spotRef} aria-live="polite">
            <p className="pl-serif mb-0 mt-4 max-w-[22ch] text-[clamp(36px,5.6vw,80px)] not-italic leading-[1.04] tracking-[-0.01em]">
              “{current.text}”
            </p>
            <p className="mb-0 mt-5 text-[20px] font-extrabold">{current.reference}</p>
            <p className="mb-0 mt-2 max-w-[48ch] text-[17px] leading-[1.45] text-white/85">
              <span className="font-bold text-white">Practise it:</span> {current.application}
            </p>
          </div>
          <div data-in className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={shuffle} className="pl-btn pl-btn-white">
              Another verse ↻
            </button>
            <button type="button" onClick={copy} className="pl-btn pl-btn-outline-light">
              {copied ? 'Copied ✓' : 'Copy verse'}
            </button>
          </div>
        </div>
      </section>

      <section className="pl-wrap pb-[clamp(24px,3vw,40px)] pt-[clamp(48px,7vw,88px)]">
        <h1 data-in className="m-0 text-[clamp(48px,8vw,112px)] font-extrabold leading-[.88] tracking-[-0.055em]">
          Love passages <Em>to read aloud.</Em>
        </h1>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by book group">
            {GROUPS.map(g => (
              <button
                key={g}
                type="button"
                aria-pressed={group === g}
                onClick={() => setGroup(g)}
                className={`min-h-[44px] rounded-full border-2 border-pl-ink px-[18px] text-[15px] font-semibold transition-colors duration-200 ${
                  group === g ? 'bg-pl-ink text-white' : 'bg-white text-pl-ink'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search a word, e.g. enemy"
            aria-label="Search passages"
            className="min-h-[52px] w-full flex-[0_1_320px] rounded-full border-2 border-pl-ink bg-white px-5 text-[16px] text-pl-ink"
          />
        </div>
      </section>

      <section className="pl-wrap pb-[clamp(64px,9vw,120px)]">
        <p className="mb-4 mt-0 text-[15px] text-pl-muted" aria-live="polite">
          {list.length ? `${list.length} passages · tap one to put it in the spotlight` : `No passage matches “${query}”.`}
        </p>
        <div ref={listRef} className="[column-gap:16px] [columns:3_300px]">
          {list.map(({ p, i }) => (
            <button
              key={p.reference}
              type="button"
              data-v
              onClick={() => pick(i)}
              aria-current={i === spot ? 'true' : undefined}
              className={`mb-4 block w-full break-inside-avoid rounded-[24px] border-2 border-pl-ink p-6 text-left text-pl-ink transition-[background-color,transform] duration-[350ms] [transition-timing-function:cubic-bezier(.3,1.5,.5,1)] hover:-translate-y-1 motion-reduce:hover:translate-y-0 ${
                i === spot ? 'bg-pl-blush' : 'bg-white'
              }`}
            >
              <span className="block text-[15px] font-extrabold text-pl-red">{p.reference}</span>
              <span className="pl-serif mt-[10px] block text-[23px] not-italic leading-[1.25]">{p.text}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
