import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Em, FallingSky, ImageSlot, Marquee } from '../components/pl/primitives';
import { EASE_POP, animate, prefersReducedMotion, usePopOnChange } from '../components/pl/motion';
import { PRIDE_HUMILITY_PAIRS } from '../data/prideHumility';
import { sendWeb3Form } from '../services/web3formsService';

const WORDS = ['coming.', 'patient.', 'kind.', 'near.', 'for you.'] as const;

// Forty acts of love, one a day, each anchored to a verse. In Scripture forty days is
// how God transforms people (Noah, Moses, Elijah, Nineveh, Jesus in the wilderness), so
// the calendar runs forty days and lands on Christmas Day. Awaiting ministry approval.
const ACTS = [
  { act: 'Love as Jesus loved you', verse: 'John 13:34' },
  { act: 'Be a friend who loves at all times', verse: 'Proverbs 17:17' },
  { act: 'Love your neighbour: pray for one by name', verse: 'Matthew 22:39' },
  { act: 'Leave your gift and go make it right', verse: 'Matthew 5:23–24' },
  { act: 'Open your home and share a meal', verse: 'Romans 12:13' },
  { act: 'Be quick to listen, slow to speak', verse: 'James 1:19' },
  { act: 'Love is patient: wait well today', verse: '1 Corinthians 13:4' },
  { act: 'Give in secret, unseen by others', verse: 'Matthew 6:3–4' },
  { act: 'Give thanks: write someone a note', verse: '1 Thessalonians 5:18' },
  { act: 'Forgive as the Lord forgave you', verse: 'Colossians 3:13' },
  { act: 'Love keeps no record of wrongs', verse: '1 Corinthians 13:5' },
  { act: 'Honour your father and mother', verse: 'Exodus 20:12' },
  { act: 'Visit the widow and the orphan', verse: 'James 1:27' },
  { act: 'Guard your mouth today', verse: 'Proverbs 21:23' },
  { act: 'Serve one another humbly in love', verse: 'Galatians 5:13' },
  { act: 'Show kindness to a stranger', verse: 'Hebrews 13:2' },
  { act: 'Carry someone’s burden', verse: 'Galatians 6:2' },
  { act: 'Let the Word dwell richly: share it', verse: 'Colossians 3:16' },
  { act: 'Let the children come: bless a child', verse: 'Mark 10:14' },
  { act: 'Thank God for someone, then tell them', verse: 'Philippians 1:3' },
  { act: 'Rejoice with those who rejoice', verse: 'Romans 12:15' },
  { act: 'Live at peace with everyone at home', verse: 'Romans 12:18' },
  { act: 'Comfort someone as God comforts you', verse: '2 Corinthians 1:4' },
  { act: 'Do good and share what you have', verse: 'Hebrews 13:16' },
  { act: 'Feed someone hungry, as unto Jesus', verse: 'Matthew 25:35' },
  { act: 'Have two coats? Give one away', verse: 'Luke 3:11' },
  { act: 'Honour someone above yourself', verse: 'Romans 12:10' },
  { act: 'Gather two or three and pray', verse: 'Matthew 18:20' },
  { act: 'Welcome someone as Christ welcomed you', verse: 'Romans 15:7' },
  { act: 'Use your gift to serve someone', verse: '1 Peter 4:10' },
  { act: 'Love in deed, not just in word', verse: '1 John 3:18' },
  { act: 'Give a gentle answer', verse: 'Proverbs 15:1' },
  { act: 'Do everything without grumbling', verse: 'Philippians 2:14' },
  { act: 'Set the lonely in a family: invite one', verse: 'Psalm 68:6' },
  { act: 'Let your yes be yes: keep a promise', verse: 'Matthew 5:37' },
  { act: 'Love deeply: cover someone’s fault', verse: '1 Peter 4:8' },
  { act: 'Pray for those in authority', verse: '1 Timothy 2:1–2' },
  { act: 'Love your enemy and pray for them', verse: 'Matthew 5:44' },
  { act: 'Read the Christmas story aloud', verse: 'Luke 2:10–11' },
  { act: 'God so loved: tell someone why Jesus came', verse: 'John 3:16' },
] as const;

const TOTAL_DAYS = ACTS.length; // 40
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const RED_DOORS = new Set([0, 7, 14, 21, 28, 35]);
const MARQUEE = ['Love is patient', 'Love is kind', 'Peace on earth', 'Love one another', 'Joy to the world', 'God is love'];
const DAY = 864e5;

/** Next Christmas Day, local time. Stays on this year's date until Dec 25 has fully passed. */
function christmasTarget(now: number) {
  const year = new Date(now).getFullYear();
  const thisYear = new Date(year, 11, 25);
  return now >= thisYear.getTime() + DAY ? new Date(year + 1, 11, 25) : thisYear;
}

/** Day n (1-based) of the forty, counted back so day 40 is Christmas Day. */
function doorDate(year: number, n: number) {
  return new Date(year, 11, 25 - (TOTAL_DAYS - n));
}

function shortDate(d: Date) {
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

function countdownParts(now: number) {
  const diff = Math.max(0, christmasTarget(now).getTime() - now);
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    d: String(Math.floor(diff / DAY)),
    h: pad(Math.floor(diff / 36e5) % 24),
    m: pad(Math.floor(diff / 6e4) % 60),
    s: pad(Math.floor(diff / 1e3) % 60),
  };
}

function useNow(interval = 1000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), interval);
    return () => window.clearInterval(t);
  }, [interval]);
  return now;
}

function FlipDigit({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  usePopOnChange(ref, value, [
    { transform: 'translateY(-40%)', opacity: 0 },
    { transform: 'none', opacity: 1 },
  ]);
  return (
    <div className="overflow-hidden rounded-[clamp(16px,2vw,28px)] bg-white px-[clamp(10px,2vw,28px)] py-[clamp(14px,2.4vw,32px)] text-pl-ink">
      <div ref={ref} className="text-[clamp(44px,9vw,148px)] font-extrabold leading-[.9] tracking-[-0.05em] [font-variant-numeric:tabular-nums]">
        {value}
      </div>
      <div className="mt-[10px] text-[clamp(13px,1.3vw,17px)] font-semibold uppercase tracking-[0.06em] text-pl-press">{label}</div>
    </div>
  );
}

function Ribbon() {
  const ref = useRef<SVGPathElement | null>(null);
  useEffect(() => {
    const p = ref.current;
    if (!p || prefersReducedMotion()) return;
    const len = p.getTotalLength();
    p.style.strokeDasharray = String(len);
    const a = p.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
      duration: 2600,
      delay: 400,
      easing: 'cubic-bezier(.6,0,.2,1)',
      fill: 'both',
    });
    return () => a.cancel();
  }, []);
  return (
    <svg
      viewBox="0 0 1200 300"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-0 h-[clamp(140px,24vw,300px)] w-full"
    >
      <path
        ref={ref}
        d="M-40 230 C 200 170, 340 290, 560 210 S 800 40, 900 110 C 970 160, 920 230, 860 205 C 800 180, 840 100, 920 80 C 1030 50, 1100 140, 1250 90"
        fill="none"
        stroke="#e1251b"
        strokeWidth="18"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AdventDoor({
  n,
  date,
  act,
  verse,
  unlocked,
  peeking,
  onPeek,
}: {
  n: number;
  date: string;
  act: string;
  verse: string;
  unlocked: boolean;
  peeking: boolean;
  onPeek: (on: boolean) => void;
}) {
  const red = RED_DOORS.has(n - 1);
  const last = n === TOTAL_DAYS;
  const rot = peeking ? (unlocked ? -105 : -32) : 0;
  return (
    <button
      type="button"
      data-door
      onMouseEnter={() => onPeek(true)}
      onMouseLeave={() => onPeek(false)}
      onFocus={() => onPeek(true)}
      onBlur={() => onPeek(false)}
      onClick={() => onPeek(!peeking)}
      aria-label={unlocked ? `Day ${n}, ${date}: ${act}, ${verse}` : `Day ${n}, locked until ${date}`}
      className="relative aspect-square cursor-pointer border-0 bg-transparent p-0 text-left [perspective:700px]"
    >
      <div
        className={`absolute inset-0 flex flex-col justify-between rounded-[18px] p-3 text-[clamp(13px,1.2vw,15px)] font-semibold leading-[1.25] ${
          last ? 'bg-pl-ink text-white' : 'bg-pl-blush text-pl-deep'
        }`}
      >
        <span className="pl-serif text-[18px]">{date}</span>
        {unlocked ? (
          <span>
            {act}
            <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.04em] opacity-70">{verse}</span>
          </span>
        ) : (
          `Opens ${date}. Come back then ♥`
        )}
      </div>
      <div
        className={`absolute inset-0 box-border flex origin-left flex-col justify-between rounded-[18px] border-2 border-pl-ink p-3 [backface-visibility:hidden] ${
          red ? 'bg-pl-red text-white' : 'bg-white text-pl-ink'
        }`}
        style={{ transform: `rotateY(${rot}deg)`, transition: 'transform .7s cubic-bezier(.3,1.4,.4,1)' }}
      >
        <span className="text-[12px] font-semibold uppercase tracking-[0.06em] opacity-75">{unlocked ? 'Open' : 'Locked'}</span>
        <span className="text-[clamp(34px,4vw,52px)] font-extrabold leading-[.85] tracking-[-0.04em]">{n}</span>
      </div>
    </button>
  );
}

export default function HomePage() {
  const now = useNow();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const wordRef = useRef<HTMLSpanElement | null>(null);
  const thanksRef = useRef<HTMLParagraphElement | null>(null);
  const adventRef = useRef<HTMLElement | null>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [peek, setPeek] = useState(-1);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const target = christmasTarget(now);
  const year = target.getFullYear();
  const parts = countdownParts(now);
  const firstDay = doorDate(year, 1);
  const firstDayLabel = shortDate(firstDay);
  const daysUntilStart = Math.max(0, Math.ceil((firstDay.getTime() - now) / DAY));
  const nowDate = new Date(now);

  // Rotating word.
  useEffect(() => {
    const t = window.setInterval(() => setWordIndex(i => (i + 1) % WORDS.length), 2400);
    return () => window.clearInterval(t);
  }, []);
  usePopOnChange(wordRef, wordIndex, [
    { transform: 'translateY(100%) rotate(-4deg)', opacity: 0 },
    { transform: 'none', opacity: 1 },
  ]);
  usePopOnChange(thanksRef, status === 'sent');

  // Hero words, entrance items and floating tags.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const anims: (Animation | null)[] = [];
    root.querySelectorAll('[data-word]').forEach((el, i) =>
      anims.push(
        animate(
          el,
          [
            { transform: 'translateY(60px) rotate(6deg) scale(.9)', opacity: 0 },
            { transform: 'none', opacity: 1 },
          ],
          { duration: 900, delay: 120 + i * 160, easing: 'cubic-bezier(.2,.9,.2,1.15)', fill: 'both' }
        )
      )
    );
    root.querySelectorAll('[data-in]').forEach((el, i) =>
      anims.push(
        animate(
          el,
          [
            { transform: 'translateY(20px)', opacity: 0 },
            { transform: 'none', opacity: 1 },
          ],
          { duration: 700, delay: 600 + i * 120, easing: 'cubic-bezier(.3,0,0,1)', fill: 'both' }
        )
      )
    );
    root.querySelectorAll('[data-float]').forEach((el, k) =>
      anims.push(
        animate(el, [{ translate: '0 0' }, { translate: `0 ${k % 2 ? 10 : -12}px` }], {
          duration: 3200 + k * 700,
          direction: 'alternate',
          iterations: Infinity,
          easing: 'ease-in-out',
        })
      )
    );
    return () => anims.forEach(a => a?.cancel());
  }, []);

  // Doors pop in once the Advent grid scrolls into view.
  useEffect(() => {
    const section = adventRef.current;
    if (!section || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      entries => {
        if (!entries.some(e => e.isIntersecting)) return;
        io.disconnect();
        section.querySelectorAll('[data-door]').forEach((el, i) =>
          animate(
            el,
            [
              { transform: 'scale(.6) translateY(30px)', opacity: 0 },
              { transform: 'none', opacity: 1 },
            ],
            { duration: 700, delay: i * 40, easing: EASE_POP.replace('1.6', '1.5'), fill: 'backwards' }
          )
        );
      },
      { threshold: 0.15 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await sendWeb3Form({
        subject: 'Advent reminder sign-up',
        email,
        message: `Please send the daily door of the 40 days of love to ${email} from ${firstDayLabel}.`,
      });
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div ref={rootRef} className="relative overflow-x-clip">
      <section id="top" className="relative flex min-h-[min(92vh,880px)] flex-col justify-center overflow-hidden">
        <FallingSky />
        <Ribbon />
        <div className="pl-wrap relative grid items-center gap-[clamp(40px,5vw,72px)] pb-[clamp(140px,22vw,260px)] pt-[clamp(48px,8vw,96px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
          <div>
            <p data-in className="mb-[18px] inline-flex items-center gap-[10px] rounded-full bg-pl-blush px-[14px] py-2 text-[14px] font-semibold uppercase tracking-[0.08em] text-pl-red">
              {daysUntilStart > 0 ? `40 days of love begin in ${daysUntilStart} days` : '40 days of love are here'}
            </p>
            <h1 className="m-0 text-[clamp(64px,12vw,168px)] font-extrabold leading-[.88] tracking-[-0.055em]">
              <span data-word className="inline-block">
                Love
              </span>{' '}
              <span data-word className="inline-block">
                is
              </span>
              <span className="block h-[1.05em] overflow-hidden pb-[.08em]" aria-live="off">
                <span ref={wordRef} className="pl-em inline-block">
                  {WORDS[wordIndex]}
                </span>
              </span>
            </h1>
            <p data-in className="pl-lede max-w-[34ch]">
              Christmas is coming. In the Bible, God used forty days to transform lives. Give him forty days of love you can actually practise, one small act and one verse a day.
            </p>
            <div data-in className="mt-[clamp(24px,3vw,36px)] flex flex-wrap gap-3">
              <a href="#countdown" className="pl-btn pl-btn-ink">
                Remind me on {firstDayLabel}
              </a>
              <a href="#advent" className="pl-btn pl-btn-outline">
                Peek at the doors
              </a>
              <Link to="/donate" className="pl-btn pl-btn-red">
                Give a gift
              </Link>
            </div>
          </div>
          <div data-in className="relative my-6 aspect-[4/5] w-[min(100%,460px)] justify-self-center">
            <div data-float className="absolute inset-0 rotate-[3deg] overflow-hidden rounded-[32px] border-2 border-pl-ink bg-pl-blush shadow-[12px_12px_0_#e1251b]">
              <ImageSlot label="Photo: a family around the table at Christmas" alt="A family around the table at Christmas" />
            </div>
            <div data-float className="absolute -right-[14px] -top-[18px] rotate-[4deg] whitespace-nowrap rounded-full border-2 border-pl-ink bg-white px-[18px] py-[10px] text-[16px] font-extrabold">
              <span className="text-pl-red">{parts.d}</span> days to Christmas
            </div>
            <div data-float className="absolute -left-[22px] bottom-7 w-[220px] -rotate-6 rounded-[20px] bg-pl-red px-[18px] py-4 text-white shadow-[6px_6px_0_#141010]">
              <div className="pl-serif text-[20px]">Day 1 · {firstDayLabel}</div>
              <div className="mt-[6px] text-[18px] font-bold leading-[1.2]">{ACTS[0].act}.</div>
              <div className="mt-1 text-[13px] font-semibold uppercase tracking-[0.04em] opacity-80">{ACTS[0].verse}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="countdown" className="relative overflow-hidden bg-pl-red text-white">
        <div className="pl-wrap py-[clamp(56px,8vw,112px)]">
          <h2 className="pl-serif m-0 text-[clamp(28px,3.4vw,44px)]">Christmas Day in</h2>
          <div className="mt-[clamp(20px,3vw,36px)] grid grid-cols-4 gap-[clamp(8px,2vw,24px)]" role="timer" aria-label={`${parts.d} days, ${parts.h} hours, ${parts.m} minutes to Christmas`}>
            <FlipDigit value={parts.d} label="Days" />
            <FlipDigit value={parts.h} label="Hours" />
            <FlipDigit value={parts.m} label="Minutes" />
            <FlipDigit value={parts.s} label="Seconds" />
          </div>
          <div className="mt-[clamp(32px,4vw,56px)] flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <p className="m-0 max-w-[40ch] text-[clamp(17px,1.6vw,20px)] leading-[1.45]">
              Get one door a day by email from {firstDayLabel}, forty in all, ending on Christmas Day. No spam, just a verse and one act of love.
            </p>
            {status === 'sent' ? (
              <p ref={thanksRef} className="m-0 text-[clamp(22px,2.4vw,30px)] font-extrabold" role="status">
                You’re on the list ♥ See you {firstDayLabel}.
              </p>
            ) : (
              <form onSubmit={submit} className="flex max-w-[480px] flex-[1_1_320px] flex-wrap gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-label="Email"
                  className="min-h-[54px] flex-[1_1_200px] rounded-full border-0 px-5 text-[16px] text-pl-ink outline-pl-ink"
                />
                <button type="submit" disabled={status === 'sending'} className="pl-btn pl-btn-ink min-h-[54px] px-[26px] text-[16px]">
                  {status === 'sending' ? 'Sending…' : 'Remind me'}
                </button>
                {status === 'error' && (
                  <p className="m-0 w-full text-[15px] font-semibold text-white" role="alert">
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      <section id="advent" ref={adventRef} className="pl-wrap pl-section">
        <div className="mb-[clamp(28px,4vw,48px)] flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 className="m-0 max-w-[12ch] text-[clamp(44px,6.4vw,92px)] font-extrabold leading-[.92] tracking-[-0.05em]">
            40 days of <Em>practical</Em> love
          </h2>
          <p className="m-0 max-w-[40ch] text-[18px] leading-[1.5] text-pl-body">
            Noah’s rain, Moses on Sinai, Elijah’s journey, Jesus in the wilderness: in Scripture, forty days is how God changes a life. Each
            door is one act of love and one verse, unlocking on its day and ending on Christmas. Hover one to peek.
          </p>
        </div>
        <div className="grid gap-[clamp(8px,1.2vw,14px)] [grid-template-columns:repeat(auto-fill,minmax(clamp(92px,15vw,150px),1fr))]">
          {ACTS.map(({ act, verse }, k) => (
            <AdventDoor
              key={act}
              n={k + 1}
              date={shortDate(doorDate(year, k + 1))}
              act={act}
              verse={verse}
              unlocked={nowDate >= doorDate(year, k + 1)}
              peeking={peek === k}
              onPeek={on => setPeek(on ? k : -1)}
            />
          ))}
        </div>
      </section>

      <section id="pride-humility" className="bg-pl-ink text-white">
        <div className="pl-wrap py-[clamp(56px,8vw,112px)]">
          <div className="mb-[clamp(28px,4vw,48px)] flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <h2 className="m-0 max-w-[14ch] text-[clamp(40px,5.6vw,80px)] font-extrabold leading-[.92] tracking-[-0.05em]">
              Pride closes. <span className="pl-serif text-pl-coral">Humility opens.</span>
            </h2>
            <p className="pl-serif m-0 max-w-[30ch] text-[clamp(20px,2vw,26px)] leading-[1.25]">
              “God opposes the proud but shows favour to the humble.”{' '}
              <span className="font-sans text-[13px] font-bold not-italic tracking-[0.08em]">JAMES 4:6</span>
            </p>
          </div>
          <div className="grid gap-[10px]">
            {PRIDE_HUMILITY_PAIRS.map(pair => (
              <div key={pair.pride} className="grid gap-[10px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
                <div className="rounded-[20px] border border-white/25 px-6 py-5 text-[19px] text-[#cbbcba] line-through decoration-pl-red">
                  <span className="sr-only">Pride says: </span>
                  {pair.pride}
                </div>
                <div className="rounded-[20px] bg-pl-red px-6 py-5 text-[19px] font-semibold">
                  <span className="sr-only">Humility says: </span>
                  {pair.humility}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-[clamp(28px,4vw,44px)] flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="m-0 max-w-[44ch] text-[18px] leading-[1.5] text-[#cbbcba]">
              Love “does not boast, it is not proud” (1 Corinthians 13:4). Take the honest mirror and see where pride is closing doors.
            </p>
            <Link to="/pride-and-humility" className="pl-btn pl-btn-white">
              Take the pride mirror
            </Link>
          </div>
        </div>
      </section>

      <section id="give" className="bg-pl-blush">
        <div className="pl-wrap flex flex-wrap items-center justify-between gap-x-10 gap-y-6 py-[clamp(48px,7vw,96px)]">
          <div className="max-w-[44ch]">
            <h2 className="m-0 text-[clamp(36px,5vw,68px)] font-extrabold leading-[.95] tracking-[-0.045em]">
              Love in <Em>deed</Em>, not just word
            </h2>
            <p className="mb-0 mt-4 text-[18px] leading-[1.5] text-pl-body">
              “Let us not love with words or speech but with actions and in truth” (1 John 3:18). Your gift helps carry practical love to
              families this Christmas.
            </p>
          </div>
          <Link to="/donate" className="pl-btn pl-btn-red">
            Donate now ♥
          </Link>
        </div>
      </section>

      <Marquee items={MARQUEE} className="h-[72px] bg-pl-ink text-white" itemClassName="text-[26px] font-semibold" />
    </div>
  );
}
