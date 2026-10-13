import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { publications } from '../data/publications';
import { animate, prefersReducedMotion } from '../components/pl/motion';
import {
  mergePublicationCatalog,
  subscribeToManagedPublications,
  type ManagedPublicationRecord,
} from '../services/publicationsService';

interface InternetIllustration {
  alt: string;
  caption: string;
  creditLabel: string;
  creditHref: string;
  imageUrl: string;
  kicker: string;
}

const medicineWithoutMedicationIllustrations: Record<number, InternetIllustration> = {
  7: {
    kicker: 'Healthy Beginnings',
    alt: 'People walking for exercise outdoors on a tree-lined path.',
    caption: 'A visual pause before the opening chapter on health, mindset, and daily habits.',
    creditLabel: 'Walkingexercise',
    creditHref: 'https://commons.wikimedia.org/wiki/File:Walkingexercise.jpg',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Walkingexercise.jpg/1280px-Walkingexercise.jpg',
  },
  11: {
    kicker: 'Whole-Life Wellness',
    alt: 'Healthy lifestyle illustration with nutrition and activity symbols.',
    caption: 'This chapter frames the book around everyday choices, balance, and practical care.',
    creditLabel: 'Maintaining a healthy lifestyle',
    creditHref: 'https://commons.wikimedia.org/wiki/File:Maintaining_a_healthy_lifestyle.jpg',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Maintaining_a_healthy_lifestyle.jpg/960px-Maintaining_a_healthy_lifestyle.jpg',
  },
  32: {
    kicker: 'God’s Pharmacy',
    alt: 'Assorted fresh fruits and vegetables arranged together.',
    caption: 'A chapter on healing foods deserves a strong visual anchor in the produce itself.',
    creditLabel: 'Fruits and Vegetables (Unsplash)',
    creditHref: 'https://commons.wikimedia.org/wiki/File:Fruits_and_Vegetables_(Unsplash).jpg',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Fruits_and_Vegetables_%28Unsplash%29.jpg/1280px-Fruits_and_Vegetables_%28Unsplash%29.jpg',
  },
  40: {
    kicker: 'Care Through Seasons',
    alt: 'Pregnant woman photographed in profile outdoors.',
    caption:
      'This section turns toward protection, nourishment, and intentional care during pregnancy.',
    creditLabel: 'PregnantWoman',
    creditHref: 'https://commons.wikimedia.org/wiki/File:PregnantWoman.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/PregnantWoman.jpg',
  },
  50: {
    kicker: 'Steady Strength',
    alt: 'Older couple walking outdoors together.',
    caption:
      'An image of movement and companionship fits a chapter on sustainable body maintenance.',
    creditLabel: 'OlderCoupleWalkg',
    creditHref: 'https://commons.wikimedia.org/wiki/File:OlderCoupleWalkg.jpg',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/OlderCoupleWalkg.jpg/1280px-OlderCoupleWalkg.jpg',
  },
  76: {
    kicker: 'Love In Practice',
    alt: 'A group hug outdoors.',
    caption: 'The closing love chapter now opens with an image of human connection, not just text.',
    creditLabel: 'Group Hug (8737565975)',
    creditHref: 'https://commons.wikimedia.org/wiki/File:Group_Hug_(8737565975).jpg',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Group_Hug_%288737565975%29.jpg/1280px-Group_Hug_%288737565975%29.jpg',
  },
};

const THEMES = [
  { name: 'Light', bg: '#fff', fg: '#141010', bar: 'rgba(255,255,255,.92)', panel: '#fff', chip: '#f6eeed', line: '#f1e4e2' },
  { name: 'Warm', bg: '#fbf3e4', fg: '#2a1d14', bar: 'rgba(251,243,228,.92)', panel: '#fbf3e4', chip: '#efe2c9', line: '#eadcc2' },
  { name: 'Night', bg: '#141010', fg: '#f3e9e7', bar: 'rgba(20,16,16,.92)', panel: '#1d1717', chip: '#2a2222', line: '#2e2626' },
];

const PREFS_KEY = 'pl-reader-prefs';

function readPrefs(): { fs: number; theme: number } {
  try {
    const saved = JSON.parse(localStorage.getItem(PREFS_KEY) ?? '{}');
    return {
      fs: typeof saved.fs === 'number' ? Math.min(28, Math.max(16, saved.fs)) : 20,
      theme: typeof saved.theme === 'number' && THEMES[saved.theme] ? saved.theme : 0,
    };
  } catch {
    return { fs: 20, theme: 0 };
  }
}

export default function BookReaderPage() {
  const { id } = useParams();
  const [managedPublications, setManagedPublications] = useState<ManagedPublicationRecord[]>([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);
  const catalog = useMemo(() => mergePublicationCatalog(publications, managedPublications), [managedPublications]);
  const staticBook = publications.find(publication => publication.id === id);
  const book = catalog.find(p => p.id === id);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [loadedPages, setLoadedPages] = useState(book?.pages ?? []);
  const [isLoadingPages, setIsLoadingPages] = useState(false);

  const [prefs, setPrefs] = useState(readPrefs);
  const [tocOpen, setTocOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const directionRef = useRef(1);
  const shownIndexRef = useRef(0);

  useEffect(() => {
    const unsubscribe = subscribeToManagedPublications(
      loadedPublications => {
        setManagedPublications(loadedPublications);
        setIsLoadingCatalog(false);
      },
      error => {
        console.error('Unable to load managed publications:', error);
        setIsLoadingCatalog(false);
      }
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (!book) {
      setCurrentPageIndex(0);
      setLoadedPages([]);
      setIsLoadingPages(false);
      return () => {
        cancelled = true;
      };
    }

    setCurrentPageIndex(0);
    setLoadedPages(book.pages ?? []);

    if (!book.pages && book.loadPages) {
      setIsLoadingPages(true);
      book
        .loadPages()
        .then(pages => {
          if (!cancelled) {
            setLoadedPages(pages);
          }
        })
        .catch(error => {
          console.error('Unable to load publication pages:', error);
          if (!cancelled) {
            setLoadedPages([]);
          }
        })
        .finally(() => {
          if (!cancelled) {
            setIsLoadingPages(false);
          }
        });
    } else {
      setIsLoadingPages(false);
    }

    return () => {
      cancelled = true;
    };
  }, [book]);

  useEffect(() => {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch {
      // Preferences are a convenience; ignore blocked storage.
    }
  }, [prefs]);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      setScrollProgress(Math.min(1, window.scrollY / Math.max(1, doc.scrollHeight - window.innerHeight)));
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setTocOpen(false);
        setFocus(false);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  // Slide the new page in from the direction of travel.
  useEffect(() => {
    if (shownIndexRef.current === currentPageIndex) return;
    shownIndexRef.current = currentPageIndex;
    if (prefersReducedMotion()) return;
    animate(
      pageRef.current,
      [
        { transform: `translateX(${directionRef.current * 40}px)`, opacity: 0 },
        { transform: 'none', opacity: 1 },
      ],
      { duration: 600, easing: 'cubic-bezier(.3,1.2,.5,1)' }
    );
  }, [currentPageIndex]);

  const shouldWaitForCatalog = isLoadingCatalog && !staticBook;
  const th = THEMES[prefs.theme];

  if (shouldWaitForCatalog) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <p className="pl-serif m-0 text-[28px] text-pl-muted">Opening the book…</p>
      </div>
    );
  }

  if (!book) {
    return <Navigate to="/publications" replace />;
  }

  const hasTextContent = loadedPages.length > 0;
  const hasImages = !!(book.images && book.images.length > 0);
  const hasPdf = !!book.pdfUrl;
  const totalPages = hasTextContent ? loadedPages.length : hasImages ? book.images!.length : 0;
  const currentPage = hasTextContent ? loadedPages[currentPageIndex] : null;
  const currentPageContent = currentPage?.content;
  const currentPageIsPlainText = typeof currentPageContent === 'string';
  const currentSourcePageNumber = currentPage?.sourcePageNumber ?? currentPageIndex + 1;
  const currentPdfPageUrl = book.pdfUrl ? `${book.pdfUrl}#page=${currentSourcePageNumber}` : '';
  const currentPageHasText =
    typeof currentPageContent === 'string'
      ? currentPageContent.trim().length > 0
      : Boolean(currentPageContent);
  const plainTextLength = currentPageIsPlainText ? currentPageContent.trim().length : 0;
  const isChapterDivider = currentPageHasText && currentPageIsPlainText && plainTextLength <= 90;
  const currentIllustration =
    book.id === 'medicine-without-medication'
      ? medicineWithoutMedicationIllustrations[currentSourcePageNumber]
      : undefined;

  const pageLabel = (index: number) => {
    if (!hasTextContent) return `Page ${index + 1}`;
    const page = loadedPages[index];
    return page.title || `Page ${page.sourcePageNumber ?? index + 1}`;
  };

  const goToPage = (index: number) => {
    if (index < 0 || index >= totalPages || index === currentPageIndex) return;
    directionRef.current = index > currentPageIndex ? 1 : -1;
    setCurrentPageIndex(index);
    setTocOpen(false);
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  const atStart = currentPageIndex === 0;
  const atEnd = totalPages === 0 || currentPageIndex === totalPages - 1;
  // Whole-book progress: finished pages plus how far down this one you are.
  const progress = totalPages > 0 ? (currentPageIndex + scrollProgress) / totalPages : scrollProgress;
  const chip = { background: th.chip };

  return (
    <div
      className="min-h-screen transition-[background-color,color] duration-500"
      style={{ background: th.bg, color: th.fg }}
    >
      <header
        className="sticky top-0 z-30 border-b backdrop-blur-[8px] transition-[transform,background-color] [transition-duration:450ms] [transition-timing-function:cubic-bezier(.3,0,0,1)]"
        style={{ background: th.bar, borderColor: th.line, transform: focus ? 'translateY(-100%)' : 'none' }}
      >
        <div className="mx-auto flex max-w-[1280px] items-center gap-2 px-[clamp(16px,4vw,40px)] py-[10px]">
          <Link
            to="/publications"
            className="mr-auto flex min-h-[44px] items-center text-[15px] font-semibold no-underline"
            style={{ color: 'inherit' }}
          >
            ← Library
          </Link>
          {totalPages > 1 && (
            <button
              type="button"
              onClick={() => setTocOpen(open => !open)}
              aria-expanded={tocOpen}
              className="min-h-[44px] rounded-full border-2 border-current bg-transparent px-4 text-[14px] font-semibold text-inherit"
            >
              Contents
            </button>
          )}
          {hasTextContent && (
            <>
              <button
                type="button"
                onClick={() => setPrefs(p => ({ ...p, fs: Math.max(16, p.fs - 2) }))}
                aria-label="Smaller text"
                className="hidden h-11 w-11 rounded-full border-0 text-[14px] font-bold text-inherit sm:block"
                style={chip}
              >
                A−
              </button>
              <button
                type="button"
                onClick={() => setPrefs(p => ({ ...p, fs: Math.min(28, p.fs + 2) }))}
                aria-label="Larger text"
                className="hidden h-11 w-11 rounded-full border-0 text-[18px] font-bold text-inherit sm:block"
                style={chip}
              >
                A+
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => setPrefs(p => ({ ...p, theme: (p.theme + 1) % THEMES.length }))}
            aria-label={`Theme: ${th.name}. Change theme`}
            className="min-h-[44px] rounded-full border-0 px-4 text-[14px] font-semibold text-inherit"
            style={chip}
          >
            {th.name}
          </button>
          <button
            type="button"
            onClick={() => setFocus(f => !f)}
            className="hidden min-h-[44px] rounded-full border-0 bg-pl-red px-4 text-[14px] font-semibold text-white sm:block"
          >
            Focus
          </button>
        </div>
        <div className="h-[3px]" style={{ background: th.line }}>
          <div
            className="h-full w-full origin-left bg-pl-red transition-transform duration-200 ease-linear"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </header>

      {totalPages > 1 && (
        <>
          <aside
            aria-label="Contents"
            className="fixed bottom-0 left-0 top-0 z-40 box-border w-[min(86vw,360px)] overflow-y-auto border-r-2 p-6 transition-[transform,visibility] duration-500 [transition-timing-function:cubic-bezier(.3,1.1,.4,1)]"
            style={{ background: th.panel, color: th.fg, borderColor: th.fg, transform: tocOpen ? 'none' : 'translateX(-105%)', visibility: tocOpen ? 'visible' : 'hidden' }}
          >
            <div className="flex items-center justify-between">
              <b className="text-[14px] uppercase tracking-[0.08em]">Contents</b>
              <button
                type="button"
                onClick={() => setTocOpen(false)}
                aria-label="Close contents"
                className="h-11 w-11 rounded-full border-0 text-[18px] text-inherit"
                style={chip}
              >
                ✕
              </button>
            </div>
            <div className="mt-5 grid gap-[6px]">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToPage(i)}
                  aria-current={i === currentPageIndex ? 'page' : undefined}
                  className="flex min-h-[52px] items-baseline gap-[14px] rounded-[14px] border-0 px-[14px] py-[10px] text-left text-[17px] font-semibold"
                  style={i === currentPageIndex ? { background: '#e1251b', color: '#fff' } : { background: 'transparent', color: th.fg }}
                >
                  <span className="pl-serif text-[20px] opacity-80">{String(i + 1).padStart(2, '0')}</span>
                  <span className="line-clamp-2">{pageLabel(i)}</span>
                </button>
              ))}
            </div>
          </aside>
          <div
            onClick={() => setTocOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 z-[35] bg-[rgba(20,16,16,.4)] transition-opacity [transition-duration:400ms]"
            style={{ opacity: tocOpen ? 1 : 0, pointerEvents: tocOpen ? 'auto' : 'none' }}
          />
        </>
      )}

      {focus && (
        <button
          type="button"
          onClick={() => setFocus(false)}
          className="fixed bottom-5 right-5 z-30 min-h-[48px] rounded-full border-0 bg-pl-red px-5 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,.2)]"
        >
          Exit focus
        </button>
      )}

      <article
        className="mx-auto px-[clamp(20px,5vw,40px)] pb-10 pt-[clamp(40px,7vw,88px)] transition-[max-width] duration-300"
        style={{ maxWidth: hasTextContent ? (focus ? '40em' : '46em') : '64em' }}
      >
        <p className="m-0 text-[13px] font-bold uppercase tracking-[0.08em] text-pl-red">
          {book.title}
          {totalPages > 0 && ` · Page ${currentPageIndex + 1} of ${totalPages}`}
        </p>

        {hasPdf && (
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-semibold">
            <a href={currentPdfPageUrl || book.pdfUrl} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
              Open this PDF page ↗
            </a>
            <a href={book.pdfUrl} download style={{ color: 'inherit' }}>
              Download PDF
            </a>
          </div>
        )}

        <div ref={pageRef}>
          {hasTextContent ? (
            <>
              {!isChapterDivider && (
                <h1 className="mb-0 mt-[14px] text-[clamp(40px,6.5vw,80px)] font-extrabold leading-[.92] tracking-[-0.05em]">
                  {pageLabel(currentPageIndex)}
                </h1>
              )}

              {currentIllustration && (
                <figure className="mx-0 mb-0 mt-[clamp(28px,4vw,44px)] overflow-hidden rounded-[24px] border-2 border-current">
                  <img
                    src={currentIllustration.imageUrl}
                    alt={currentIllustration.alt}
                    className={`block w-full object-cover ${isChapterDivider ? 'h-[clamp(260px,40vw,430px)]' : 'h-[clamp(220px,30vw,320px)]'}`}
                  />
                  <figcaption className="grid gap-1 px-5 py-4 text-[14px]" style={{ background: th.chip }}>
                    <b className="text-[12px] uppercase tracking-[0.08em] text-pl-red">{currentIllustration.kicker}</b>
                    <span>{currentIllustration.caption}</span>
                    <span className="opacity-70">
                      Image:{' '}
                      <a href={currentIllustration.creditHref} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
                        {currentIllustration.creditLabel}
                      </a>{' '}
                      (Wikimedia Commons)
                    </span>
                  </figcaption>
                </figure>
              )}

              {currentPageHasText ? (
                isChapterDivider ? (
                  <p className="m-0 flex min-h-[40vh] items-center justify-center whitespace-pre-line text-center text-[clamp(40px,6vw,72px)] font-extrabold leading-[.95] tracking-[-0.045em]">
                    {currentPageContent}
                  </p>
                ) : (
                  <div
                    className={`mt-[clamp(28px,4vw,44px)] font-['Source_Serif_4',Georgia,serif] leading-[1.7] transition-[font-size] [transition-duration:250ms] ${
                      currentPageIsPlainText ? 'whitespace-pre-line' : 'grid gap-[1.1em] [&_h2]:font-sans [&_h3]:font-sans [&_p]:m-0'
                    }`}
                    style={
                      currentPageIsPlainText || prefs.theme === 0
                        ? { fontSize: prefs.fs }
                        : // Rich pages carry light-theme colours, so they sit on paper in Warm and Night.
                          { fontSize: prefs.fs, background: '#fff', color: '#141010', borderRadius: 24, padding: 'clamp(20px,4vw,40px)' }
                    }
                  >
                    {currentPageContent}
                  </div>
                )
              ) : (
                <div className="mt-[clamp(28px,4vw,44px)] rounded-[24px] p-[clamp(24px,4vw,40px)]" style={{ background: th.chip }}>
                  <p className="m-0 text-[13px] font-bold uppercase tracking-[0.08em] text-pl-red">Image page</p>
                  <p className="mb-0 mt-3 text-[clamp(22px,2.4vw,28px)] font-bold leading-[1.2]">This page reads best in the original PDF.</p>
                  <p className="mb-0 mt-2 text-[16px] leading-[1.5] opacity-80">
                    Cover art and special layouts don’t convert cleanly to text.
                    {hasPdf && ' Use “Open this PDF page” above for the exact layout.'}
                  </p>
                </div>
              )}
            </>
          ) : isLoadingPages ? (
            <div className="mt-[clamp(28px,4vw,44px)]">
              <h1 className="m-0 text-[clamp(40px,6.5vw,80px)] font-extrabold leading-[.92] tracking-[-0.05em]">Preparing the text…</h1>
              <p className="mb-0 mt-4 text-[18px] opacity-80">
                {hasPdf ? 'The original PDF is linked above while the readable pages load.' : 'Loading readable pages.'}
              </p>
            </div>
          ) : hasImages ? (
            <img
              src={book.images![currentPageIndex]}
              alt={`Page ${currentPageIndex + 1}`}
              className="mx-auto mt-8 block max-h-[80vh] max-w-full rounded-[12px] border-2 border-current object-contain"
            />
          ) : hasPdf ? (
            <iframe
              src={book.pdfUrl}
              title={book.title}
              className="mt-8 h-[80vh] w-full rounded-[16px] border-2 border-current"
            />
          ) : null}
        </div>

        {totalPages > 1 && (
          <nav aria-label="Page navigation" className="mt-[clamp(48px,7vw,80px)] grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => goToPage(currentPageIndex - 1)}
              disabled={atStart}
              className="min-h-[72px] rounded-[20px] border-2 border-current bg-transparent px-5 py-3 text-left text-inherit disabled:cursor-default"
              style={{ opacity: atStart ? 0.3 : 1 }}
            >
              <span className="block text-[13px] opacity-70">← Previous</span>
              <b className="line-clamp-1 text-[17px]">{atStart ? 'Start' : pageLabel(currentPageIndex - 1)}</b>
            </button>
            <button
              type="button"
              onClick={() => goToPage(currentPageIndex + 1)}
              disabled={atEnd}
              className="min-h-[72px] rounded-[20px] border-0 bg-pl-red px-5 py-3 text-right text-white disabled:cursor-default"
              style={{ opacity: atEnd ? 0.3 : 1 }}
            >
              <span className="block text-[13px] opacity-85">Next →</span>
              <b className="line-clamp-1 text-[17px]">{atEnd ? 'The end' : pageLabel(currentPageIndex + 1)}</b>
            </button>
          </nav>
        )}

        {totalPages > 0 && atEnd && (
          <section className="mt-10 rounded-[28px] bg-pl-red p-[clamp(24px,4vw,40px)] text-white">
            <p className="pl-serif m-0 text-[clamp(32px,4vw,48px)] leading-none">You finished it.</p>
            <p className="mb-0 mt-3 max-w-[40ch] text-[17px] leading-[1.5]">
              Thank you for reading. Share this message of love with someone today.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => goToPage(0)} className="pl-btn pl-btn-white">
                Read again
              </button>
              <Link to="/publications" className="pl-btn pl-btn-outline-light">
                Browse more books
              </Link>
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
