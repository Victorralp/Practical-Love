import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Em } from '../components/pl/primitives';
import { useEntrance, useStagger } from '../components/pl/motion';
import { publications } from '../data/publications';
import {
  mergePublicationCatalog,
  subscribeToManagedPublications,
  type ManagedPublicationRecord,
} from '../services/publicationsService';

// Fallback faces for publications added through admin without a cover.
const PALETTE = [
  'bg-pl-red text-white',
  'bg-white text-pl-ink',
  'bg-pl-ink text-white',
  'bg-pl-yellow text-pl-ink',
  'bg-pl-blush text-pl-deep',
];

export default function PublicationsPage() {
  const [managed, setManaged] = useState<ManagedPublicationRecord[]>([]);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(
    () =>
      subscribeToManagedPublications(setManaged, error => {
        console.error('Unable to load managed publications:', error);
      }),
    []
  );

  const catalog = useMemo(() => mergePublicationCatalog(publications, managed), [managed]);
  const needle = query.trim().toLowerCase();
  const books = needle
    ? catalog.filter(b => `${b.title} ${b.author} ${b.description}`.toLowerCase().includes(needle))
    : catalog;

  useEntrance(rootRef);
  useStagger(gridRef, catalog.length, { selector: '[data-book]', delay: 250, step: 60 });

  return (
    <div ref={rootRef}>
      <section className="pl-wrap pb-[clamp(28px,4vw,48px)] pt-[clamp(48px,7vw,96px)]">
        <h1 data-in className="m-0 text-[clamp(56px,10vw,140px)] font-extrabold leading-[.88] tracking-[-0.055em]">
          The <Em>library.</Em>
        </h1>
        <div data-in className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <p className="m-0 max-w-[40ch] text-[clamp(18px,1.8vw,22px)] leading-[1.45] text-pl-body">
            Booklets on love, family, health and nation. Free to read, free to print, free to share.
          </p>
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={`Search ${catalog.length} books`}
            aria-label="Search publications"
            className="min-h-[54px] min-w-0 flex-[0_1_340px] rounded-full border-2 border-pl-ink px-[22px] text-[16px]"
          />
        </div>
      </section>

      <section className="pl-wrap pb-[clamp(64px,9vw,120px)]">
        <div ref={gridRef} className="grid gap-x-[clamp(14px,2vw,28px)] gap-y-[clamp(20px,3vw,40px)] [grid-template-columns:repeat(auto-fill,minmax(min(46%,220px),1fr))]">
          {books.map((book, i) => {
            const pages = book.pageCount ?? book.pages?.length;
            return (
              <Link key={book.id} to={`/read/${book.id}`} data-book className="group block text-pl-ink no-underline hover:text-pl-ink">
                <div
                  className={`relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-[6px_18px_18px_6px] border-2 border-pl-ink p-[clamp(14px,1.6vw,22px)] shadow-[4px_4px_0_#141010] transition-[transform,box-shadow] duration-500 [transition-timing-function:cubic-bezier(.3,1.5,.5,1)] group-hover:-translate-y-3 group-hover:shadow-[10px_12px_0_#141010] motion-reduce:group-hover:translate-y-0 ${
                    i % 2 ? 'group-hover:rotate-2' : 'group-hover:-rotate-2'
                  } ${book.coverImage ? 'bg-pl-ink' : PALETTE[i % PALETTE.length]}`}
                >
                  {book.coverImage ? (
                    <img src={book.coverImage} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <>
                      <span className="pl-[10px] text-[11px] font-bold uppercase tracking-[0.08em]">{book.type}</span>
                      <span className="pl-[10px] text-[clamp(20px,2vw,28px)] font-extrabold leading-[.95] tracking-[-0.035em]">{book.title}</span>
                      <span className="pl-serif pl-[10px] text-[18px]">practical♥love</span>
                    </>
                  )}
                  <span className="absolute bottom-0 left-[10px] top-0 w-[2px] bg-current opacity-25" aria-hidden="true" />
                </div>
                <h2 className="mb-0 mt-3 text-[17px] font-bold leading-[1.2] tracking-[-0.01em]">{book.title}</h2>
                <div className="mt-1 flex items-baseline justify-between gap-2 text-[14px]">
                  <span className="text-pl-muted">{pages ? `${pages} pages` : book.pdfUrl ? 'PDF' : book.type}</span>
                  <span className="pl-serif text-[19px] text-pl-red opacity-50 transition-opacity duration-300 group-hover:opacity-100">Read →</span>
                </div>
              </Link>
            );
          })}
        </div>
        {books.length === 0 && (
          <p className="mb-0 mt-10 text-[20px] text-pl-muted">
            No book matches “{query}”. Try “love” or “family”.
          </p>
        )}
      </section>

      <section className="bg-pl-red text-white">
        <div className="pl-wrap flex flex-wrap items-center justify-between gap-x-12 gap-y-6 py-[clamp(48px,7vw,96px)]">
          <h2 className="m-0 max-w-[16ch] text-[clamp(36px,5vw,72px)] font-extrabold leading-[.92] tracking-[-0.045em]">
            Reproduce them. <span className="pl-serif">Give them away.</span>
          </h2>
          <p className="m-0 max-w-[36ch] text-[18px] leading-[1.5]">
            Every booklet is free to print and distribute. Help the message of love reach every home.
          </p>
        </div>
      </section>
    </div>
  );
}
