import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Em } from '../components/pl/primitives';
import { EASE_POP, animate, prefersReducedMotion, useEntrance, useScrollReveal } from '../components/pl/motion';
import type { GrowthSection } from '../components/growth/GrowthNavigation';
import DailyChallengeSection from '../components/growth/DailyChallengeSection';
import GrowthTipsSection from '../components/growth/GrowthTipsSection';
import SelfReflectionSection from '../components/growth/SelfReflectionSection';
import GuidedJourneysSection from '../components/growth/GuidedJourneysSection';
import ProgressDashboard from '../components/growth/ProgressDashboard';
import { dataService } from '../services/dataService';

type Tool = {
  kicker: string;
  title: string;
  text: string;
  keywords: string;
  tone: string;
  shadow: string;
} & ({ href: string; section?: never } | { section: GrowthSection; href?: never });

const TOOLS: Tool[] = [
  {
    kicker: 'Challenge',
    title: 'Build love through action',
    text: 'The 30-day challenge: one trait and one visible act each day.',
    keywords: 'patience kindness action daily 30 days',
    href: '/love-challenge',
    tone: 'bg-pl-red text-white',
    shadow: 'hover:shadow-[10px_10px_0_#141010]',
  },
  {
    kicker: 'Wisdom',
    title: 'Gather practical wisdom',
    text: 'Short tips with exercises for anger, forgiveness, marriage and parenting.',
    keywords: 'tips anger forgiveness marriage parenting family',
    section: 'tips',
    tone: 'bg-white text-pl-ink',
    shadow: 'hover:shadow-[10px_10px_0_#e1251b]',
  },
  {
    kicker: 'Today',
    title: 'Take today’s challenge',
    text: 'One small act of love for today, with room to note how it went.',
    keywords: 'today daily challenge act empathy',
    section: 'challenges',
    tone: 'bg-pl-coral text-pl-ink',
    shadow: 'hover:shadow-[10px_10px_0_#141010]',
  },
  {
    kicker: 'Reflection',
    title: 'Examine the heart',
    text: 'Honest prompts and a private history of what you noticed.',
    keywords: 'reflection pride humility heart motives',
    section: 'reflection',
    tone: 'bg-pl-yellow text-pl-ink',
    shadow: 'hover:shadow-[10px_10px_0_#e1251b]',
  },
  {
    kicker: 'Journeys',
    title: 'Walk through formation',
    text: 'Guided paths that take one area of love step by step over time.',
    keywords: 'journeys characteristics scripture formation guided',
    section: 'journeys',
    tone: 'bg-pl-ink text-white',
    shadow: 'hover:shadow-[10px_10px_0_#e1251b]',
  },
  {
    kicker: 'Progress',
    title: 'See your milestones',
    text: 'What you have completed, what is growing, and where to go next.',
    keywords: 'progress streak milestones history',
    section: 'progress',
    tone: 'bg-pl-blush text-[#7a0f09]',
    shadow: 'hover:shadow-[10px_10px_0_#e1251b]',
  },
];

const SECTION_TITLES: Record<GrowthSection, string> = {
  challenges: 'Today’s challenge',
  tips: 'Practical wisdom',
  reflection: 'Self-reflection',
  journeys: 'Guided journeys',
  progress: 'Your progress',
};

const RESULT_SECTION: Record<string, GrowthSection> = {
  challenge: 'challenges',
  tip: 'tips',
  journey: 'journeys',
  reflection: 'reflection',
};

const RHYTHM = [
  { when: 'Morning', title: 'Start with a challenge', text: 'Read the day’s trait and decide where you’ll need it.' },
  { when: 'Midday', title: 'Support it with a tip', text: 'Open a related tip when you need clarity or an example.' },
  { when: 'Evening', title: 'End with reflection', text: 'Check your motives, patterns and progress honestly.' },
];

export default function GrowthPage() {
  const [query, setQuery] = useState('');
  const [section, setSection] = useState<GrowthSection | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);

  useEntrance(rootRef);
  useScrollReveal(rootRef);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    gridRef.current?.querySelectorAll<HTMLElement>('[data-tool]').forEach((el, i) =>
      animate(
        el,
        [
          { transform: 'translateY(50px) scale(.95)', opacity: 0 },
          { transform: 'none', opacity: 1 },
        ],
        { duration: 700, delay: 250 + i * 90, easing: EASE_POP, fill: 'backwards' }
      )
    );
  }, []);

  const q = query.trim().toLowerCase();
  const tools = TOOLS.filter(t => !q || `${t.title} ${t.text} ${t.keywords}`.toLowerCase().includes(q));
  const results = useMemo(() => (q.length >= 2 ? dataService.searchContent(q).slice(0, 8) : []), [q]);

  const open = (next: GrowthSection) => {
    setSection(next);
    requestAnimationFrame(() =>
      panelRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
    );
  };

  const navigateToSection = (name: string) => {
    const key = name.toLowerCase().replace(/s$/, '');
    open(RESULT_SECTION[key] ?? (key === 'progres' ? 'progress' : 'challenges'));
  };

  const cardClass = (t: Tool) =>
    `flex min-h-[240px] flex-col justify-between gap-9 rounded-[28px] border-2 border-pl-ink p-7 text-left no-underline transition-[transform,box-shadow] [transition-duration:450ms] [transition-timing-function:cubic-bezier(.3,1.5,.5,1)] hover:-translate-y-2 motion-reduce:hover:translate-y-0 ${t.tone} ${t.shadow} group`;

  const cardBody = (t: Tool) => (
    <>
      <span className="flex items-center justify-between">
        <span className="text-[13px] font-bold uppercase tracking-[0.08em]">{t.kicker}</span>
        <span
          aria-hidden="true"
          className="pl-serif text-[28px] transition-transform [transition-duration:400ms] [transition-timing-function:cubic-bezier(.3,1.5,.5,1)] group-hover:translate-x-2"
        >
          →
        </span>
      </span>
      <span>
        <span className="block text-[clamp(30px,3.2vw,44px)] font-extrabold leading-[.95] tracking-[-0.04em]">{t.title}</span>
        <span className="mt-[10px] block max-w-[40ch] text-[17px] leading-[1.45] opacity-85">{t.text}</span>
      </span>
    </>
  );

  return (
    <div ref={rootRef}>
      <section className="pl-wrap pb-[clamp(28px,4vw,48px)] pt-[clamp(48px,8vw,104px)]">
        <h1 data-in className="m-0 text-[clamp(56px,10vw,140px)] font-extrabold leading-[.88] tracking-[-0.055em]">
          Grow in <Em>love.</Em>
        </h1>
        <div data-in className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <p className="m-0 max-w-[40ch] text-[clamp(18px,1.8vw,22px)] leading-[1.45] text-pl-body">
            Challenges, wisdom, reflection and progress in one place. Pick what you need today.
          </p>
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search patience, forgiveness, family…"
            aria-label="Search growth tools"
            className="min-h-[54px] w-full flex-[0_1_360px] rounded-full border-2 border-pl-ink bg-white px-[22px] text-[16px] text-pl-ink"
          />
        </div>
      </section>

      <section className="pl-wrap pb-[clamp(56px,8vw,96px)]">
        <div ref={gridRef} className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
          {tools.map(t =>
            t.href ? (
              <Link key={t.kicker} to={t.href} data-tool className={`${cardClass(t)} hover:text-inherit`}>
                {cardBody(t)}
              </Link>
            ) : (
              <button
                key={t.kicker}
                type="button"
                data-tool
                aria-expanded={section === t.section}
                aria-controls="growth-panel"
                onClick={() => open(t.section as GrowthSection)}
                className={cardClass(t)}
              >
                {cardBody(t)}
              </button>
            )
          )}
        </div>
        {!tools.length && !results.length && (
          <p className="mb-0 mt-6 text-[20px] text-pl-muted">Nothing matches “{query}”. Try “anger” or “family”.</p>
        )}
        {results.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 mt-0 text-[14px] font-bold uppercase tracking-[0.08em] text-pl-red">Inside the tools</p>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {results.map(r => (
                <li key={`${r.type}-${r.id}`}>
                  <button
                    type="button"
                    onClick={() => navigateToSection(r.type)}
                    className="min-h-[44px] rounded-full border-2 border-pl-ink bg-white px-[18px] text-left text-[15px] font-semibold text-pl-ink transition-colors hover:bg-pl-blush"
                  >
                    <span className="mr-2 text-[12px] uppercase tracking-[0.08em] text-pl-muted">{r.type}</span>
                    {r.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {section && (
        <section ref={panelRef} id="growth-panel" className="pl-wrap scroll-mt-24 pb-[clamp(56px,8vw,96px)]" aria-label={SECTION_TITLES[section]}>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-pl-ink pt-8">
            <h2 className="m-0 text-[clamp(32px,4vw,52px)] font-extrabold leading-[.95] tracking-[-0.04em]">{SECTION_TITLES[section]}</h2>
            <button
              type="button"
              onClick={() => setSection(null)}
              className="min-h-[44px] rounded-full border-2 border-pl-ink px-[18px] text-[15px] font-semibold text-pl-ink"
            >
              Close
            </button>
          </div>
          <div className="mt-8">
            {section === 'challenges' && <DailyChallengeSection />}
            {section === 'tips' && <GrowthTipsSection />}
            {section === 'reflection' && <SelfReflectionSection />}
            {section === 'journeys' && <GuidedJourneysSection />}
            {section === 'progress' && <ProgressDashboard onNavigateToSection={navigateToSection} />}
          </div>
        </section>
      )}

      <section className="bg-pl-ink text-white">
        <div className="pl-wrap py-[clamp(56px,8vw,112px)]">
          <h2 data-reveal className="mb-[clamp(28px,4vw,48px)] mt-0 text-[clamp(36px,5vw,64px)] font-extrabold leading-[.95] tracking-[-0.045em]">
            A daily <span className="pl-serif text-pl-coral">rhythm</span>
          </h2>
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
            {RHYTHM.map(r => (
              <div key={r.when} data-reveal className="rounded-[28px] border border-white/20 p-7">
                <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-pl-coral">{r.when}</span>
                <h3 className="mb-0 mt-3 text-[28px] font-extrabold tracking-[-0.03em]">{r.title}</h3>
                <p className="mb-0 mt-[10px] text-[17px] leading-[1.5] text-pl-ondark">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
