import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Em } from '../components/pl/primitives';
import { useEntrance, useStagger } from '../components/pl/motion';

const TILES = [
  {
    title: 'Yellow Card',
    text: 'Keep the 17 characteristics in your hand so they stay in front of your reactions.',
    kind: 'Card',
    to: '/yellow-card',
    cta: 'Get the card',
    tone: 'bg-pl-yellow text-pl-ink hover:text-pl-ink',
    shadow: 'hover:shadow-[10px_10px_0_#e1251b]',
  },
  {
    title: 'Yellow Card Series',
    text: 'Three cards: 17 characteristics, 50 love passages, and the summary message.',
    kind: 'Print set',
    to: '/yellow-card-series',
    cta: 'Print the set',
    tone: 'bg-white text-pl-ink hover:text-pl-ink',
    shadow: 'hover:shadow-[10px_10px_0_#e1251b]',
  },
  {
    title: 'Publications',
    text: 'Read, download, and give away ministry booklets freely.',
    kind: 'Library',
    to: '/publications',
    cta: 'Browse the library',
    tone: 'bg-pl-ink text-white hover:text-white',
    shadow: 'hover:shadow-[10px_10px_0_#e1251b]',
  },
  {
    title: '30 Day Challenge',
    text: 'A structured route into reflection, accountability, and daily acts of love.',
    kind: 'Challenge',
    to: '/love-challenge',
    cta: 'Start day one',
    tone: 'bg-pl-red text-white hover:text-white',
    shadow: 'hover:shadow-[10px_10px_0_#141010]',
  },
];

export default function ResourcesPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const tilesRef = useRef<HTMLDivElement | null>(null);

  useEntrance(rootRef);
  useStagger(tilesRef, 'tiles', { delay: 250, step: 110 });

  return (
    <div ref={rootRef}>
      <section className="pl-wrap pb-[clamp(32px,5vw,56px)] pt-[clamp(48px,8vw,104px)]">
        <h1 data-in className="m-0 max-w-[11ch] text-[clamp(56px,10vw,140px)] font-extrabold leading-[.88] tracking-[-0.055em]">
          Keep love <Em>in your hand.</Em>
        </h1>
        <p data-in className="pl-lede max-w-[42ch]">
          These tools move love from inspiration into repetition: carry it, read it, teach it, and give it away. All free.
        </p>
      </section>

      <section
        ref={tilesRef}
        className="pl-wrap grid gap-[clamp(16px,2vw,24px)] pb-[clamp(64px,9vw,120px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,520px),1fr))]"
      >
        {TILES.map((tile, i) => (
          <Link
            key={tile.to}
            to={tile.to}
            data-card
            className={`group relative flex min-h-[clamp(280px,30vw,380px)] flex-col justify-between gap-12 overflow-hidden rounded-[32px] border-2 border-pl-ink p-[clamp(24px,3vw,40px)] no-underline transition-[transform,box-shadow] duration-[450ms] [transition-timing-function:cubic-bezier(.3,1.5,.5,1)] hover:-translate-y-2 motion-reduce:hover:translate-y-0 ${tile.tone} ${tile.shadow}`}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="pl-serif text-[clamp(56px,6vw,88px)] leading-[.8]" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="rounded-full border-2 border-current px-3 py-[6px] text-[13px] font-bold uppercase tracking-[0.08em]">{tile.kind}</span>
            </div>
            <div>
              <h2 className="m-0 text-[clamp(36px,4vw,56px)] font-extrabold leading-[.92] tracking-[-0.045em]">{tile.title}</h2>
              <p className="mb-0 mt-3 max-w-[34ch] text-[17px] leading-[1.45] opacity-85">{tile.text}</p>
              <span className="pl-serif mt-5 inline-flex text-[24px] transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(.3,1.5,.5,1)] group-hover:translate-x-2">
                {tile.cta} →
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section className="bg-pl-red text-white">
        <div className="pl-wrap flex flex-wrap items-center justify-between gap-x-12 gap-y-6 py-[clamp(48px,7vw,96px)]">
          <h2 className="m-0 max-w-[14ch] text-[clamp(36px,5vw,72px)] font-extrabold leading-[.92] tracking-[-0.045em]">
            Put something practical in your hand <span className="pl-serif">today.</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/yellow-card-series" className="pl-btn pl-btn-white">
              Open the card series
            </Link>
            <Link to="/love-challenge" className="pl-btn pl-btn-outline-light">
              Enter the challenge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
