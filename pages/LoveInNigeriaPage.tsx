import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageSlot, Marquee } from '../components/pl/primitives';
import { useEntrance, usePopOnChange, useScrollReveal } from '../components/pl/motion';

const MARQUEE = ['Heal the home', 'Heal the nation', 'Love one another', 'Serve, don’t rule', 'Truth in love'];

const ROOTS = [
  {
    kicker: 'Where the crisis begins',
    title: 'Corruption is learned before it is practised.',
    text: 'Long before an office is abused, a child learns at home that rules bend for the powerful and love is earned, not given.',
  },
  {
    kicker: 'What changes everything',
    title: 'Love, practised daily, forms a different citizen.',
    text: 'Patience, honesty and service, learned at the table, become the habits a nation runs on.',
  },
];

// TODO: no photos for these areas yet; ImageSlot shows a labelled placeholder until they exist.
const AREAS = [
  {
    title: 'Family life',
    text: 'Homes where husbands, wives and children speak with patience and correct with kindness.',
    list: ['Parents who apologise', 'Children taught to serve', 'Marriages without score-keeping'],
    label: 'A Nigerian family at home',
  },
  {
    title: 'Community life',
    text: 'Streets, markets and churches where honesty is normal and the vulnerable are seen.',
    list: ['Fair dealing in business', 'Neighbours who check on each other', 'Churches that serve the street'],
    label: 'A community gathering',
  },
  {
    title: 'National life',
    text: 'Leaders formed in loving homes who treat public office as service, not ownership.',
    list: ['Integrity in public office', 'Justice for the poor', 'Unity across tribe and faith'],
    label: 'A national or civic scene',
  },
];

const MOVES = [
  { title: 'Teach it at home', text: 'Parents teach the 17 characteristics around the table, one a week.' },
  { title: 'Model it publicly', text: 'Leaders, pastors and teachers show it in how they treat the least powerful.' },
  { title: 'Reproduce it consistently', text: 'Every person who learns it hands a Yellow Card to someone else.' },
];

export default function LoveInNigeriaPage() {
  const [tab, setTab] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const area = AREAS[tab];

  useEntrance(rootRef);
  useScrollReveal(rootRef);
  usePopOnChange(panelRef, tab, [
    { transform: 'translateY(20px) scale(.98)', opacity: 0.3 },
    { transform: 'none', opacity: 1 },
  ]);

  return (
    <div ref={rootRef}>
      <section className="relative overflow-hidden bg-pl-red text-white">
        <div className="pl-wrap grid items-end gap-[clamp(32px,5vw,72px)] pb-[clamp(48px,7vw,96px)] pt-[clamp(56px,9vw,120px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
          <h1 data-in className="m-0 text-[clamp(52px,9vw,128px)] font-extrabold leading-[.88] tracking-[-0.055em]">
            Love in <span className="pl-serif">Nigeria.</span>
          </h1>
          <p data-in className="m-0 max-w-[40ch] text-[clamp(18px,1.8vw,22px)] leading-[1.45]">
            A national call to confront corruption at the root, restore the family as the training ground of character, and make God’s kind of love visible in everyday Nigerian life.
          </p>
        </div>
        <Marquee items={MARQUEE} duration={30000} gap={40} className="h-16 bg-pl-ink" itemClassName="text-[22px] font-bold" />
      </section>

      <section className="pl-wrap grid gap-[clamp(32px,5vw,72px)] py-[clamp(56px,8vw,112px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]">
        {ROOTS.map(root => (
          <div key={root.title} data-reveal>
            <p className="m-0 text-[14px] font-bold uppercase tracking-[0.08em] text-pl-red">{root.kicker}</p>
            <h2 className="mb-0 mt-3 text-[clamp(32px,4vw,52px)] font-extrabold leading-[.98] tracking-[-0.04em]">{root.title}</h2>
            <p className="mb-0 mt-4 text-[18px] leading-[1.55] text-pl-body">{root.text}</p>
          </div>
        ))}
      </section>

      <section className="pl-wrap pb-[clamp(56px,8vw,112px)]">
        <div role="tablist" aria-label="Where love changes Nigeria" className="flex flex-wrap gap-2">
          {AREAS.map((a, i) => (
            <button
              key={a.title}
              type="button"
              role="tab"
              id={`ng-tab-${i}`}
              aria-selected={tab === i}
              aria-controls="ng-panel"
              onClick={() => setTab(i)}
              className={`min-h-[48px] rounded-full border-2 border-pl-ink px-6 text-[16px] font-bold transition-colors duration-[250ms] ${
                tab === i ? 'bg-pl-ink text-white' : 'bg-white text-pl-ink'
              }`}
            >
              {a.title}
            </button>
          ))}
        </div>
        <div
          ref={panelRef}
          id="ng-panel"
          role="tabpanel"
          aria-labelledby={`ng-tab-${tab}`}
          className="mt-4 grid overflow-hidden rounded-[32px] border-2 border-pl-ink [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]"
        >
          <div className="bg-pl-blush p-[clamp(24px,4vw,48px)]">
            <h3 className="m-0 text-[clamp(32px,4vw,52px)] font-extrabold leading-[.95] tracking-[-0.04em]">{area.title}</h3>
            <p className="mb-0 mt-4 text-[18px] leading-[1.55]">{area.text}</p>
            <ul className="m-0 mt-5 grid list-none gap-[10px] p-0">
              {area.list.map(item => (
                <li key={item} className="flex gap-[10px] text-[17px] font-semibold">
                  <span className="text-pl-red" aria-hidden="true">
                    ♥
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[300px] bg-[#f6eeed]">
            <ImageSlot label={area.label} alt={area.label} />
          </div>
        </div>
      </section>

      <section className="bg-pl-ink text-white">
        <div className="pl-wrap py-[clamp(56px,8vw,112px)]">
          <h2 data-reveal className="mb-[clamp(28px,4vw,48px)] mt-0 text-[clamp(36px,5vw,64px)] font-extrabold leading-[.95] tracking-[-0.045em]">
            How the message <span className="pl-serif text-pl-coral">moves</span>
          </h2>
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
            {MOVES.map((move, i) => (
              <div key={move.title} data-reveal className="rounded-[28px] border border-white/20 p-7">
                <span className="pl-serif text-[52px] leading-[.8] text-pl-red">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mb-0 mt-4 text-[28px] font-extrabold tracking-[-0.03em]">{move.title}</h3>
                <p className="mb-0 mt-[10px] text-[17px] leading-[1.5] text-pl-ondark">{move.text}</p>
              </div>
            ))}
          </div>
          <Link to="/family-first" className="pl-btn pl-btn-red mt-[clamp(36px,5vw,56px)]">
            Start where it begins: the family →
          </Link>
        </div>
      </section>
    </div>
  );
}
