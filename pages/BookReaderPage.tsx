import { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import {
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Home,
  Download,
  ExternalLink,
} from 'lucide-react';
import { publications } from '../data/publications';

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
    caption: 'This section turns toward protection, nourishment, and intentional care during pregnancy.',
    creditLabel: 'PregnantWoman',
    creditHref: 'https://commons.wikimedia.org/wiki/File:PregnantWoman.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/PregnantWoman.jpg',
  },
  50: {
    kicker: 'Steady Strength',
    alt: 'Older couple walking outdoors together.',
    caption: 'An image of movement and companionship fits a chapter on sustainable body maintenance.',
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

export default function BookReaderPage() {
  const { id } = useParams();
  const book = publications.find(p => p.id === id);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [loadedPages, setLoadedPages] = useState(book?.pages ?? []);
  const [isLoadingPages, setIsLoadingPages] = useState(false);
  const navigate = useNavigate();

  if (!book) {
    return <Navigate to="/publications" replace />;
  }

  useEffect(() => {
    let cancelled = false;

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

  const nextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPage = (index: number) => {
    setCurrentPageIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-red-50">
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-red-600" />
              <div>
                <h1 className="text-lg font-bold text-gray-800 line-clamp-1">{book.title}</h1>
                <p className="text-sm text-gray-500">{book.author}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/')}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Home"
              >
                <Home className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/publications')}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Close Reader"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {totalPages > 0 ? (
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-500">
              Page <span className="font-bold text-red-600">{currentPageIndex + 1}</span> of{' '}
              {totalPages}
            </div>

            <div className="hidden md:flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 10) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentPageIndex ? 'bg-red-600 w-8' : 'bg-gray-300 hover:bg-red-400'
                  }`}
                  title={`Go to page ${index + 1}`}
                />
              ))}
              {totalPages > 10 && (
                <span className="text-xs text-gray-400 ml-1">+{totalPages - 10}</span>
              )}
            </div>
          </div>
        ) : null}

        {hasPdf ? (
          <div className="mb-6 flex flex-col sm:flex-row gap-3 justify-end">
            <a
              href={currentPdfPageUrl || book.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition-all hover:bg-red-700 shadow-md"
            >
              <ExternalLink className="w-5 h-5" />
              Open This PDF Page
            </a>
            <a
              href={book.pdfUrl}
              download
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-orange-600 bg-white px-6 py-3 font-bold text-orange-600 transition-all hover:bg-orange-50"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </a>
          </div>
        ) : null}

        {hasTextContent ? (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-orange-100 overflow-hidden">
              <div className="p-8 md:p-12 lg:p-16 min-h-[600px]">
                <div className="mb-10 border-b border-orange-100 pb-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-orange-600">
                    Text Edition
                  </p>
                  {currentPage?.title ? (
                    <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                      {currentPage.title}
                    </h2>
                  ) : (
                    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                      Page {currentSourcePageNumber}
                    </h2>
                  )}
                  <p className="mt-3 text-sm text-gray-500">
                    Reading page {currentPageIndex + 1} of {totalPages}. Original PDF page:{' '}
                    {currentSourcePageNumber}.
                  </p>
                </div>

                {currentIllustration ? (
                  <figure className="mb-10 overflow-hidden rounded-[2rem] border border-orange-100 bg-stone-950 shadow-[0_30px_80px_rgba(120,53,15,0.18)]">
                    <div className="relative">
                      <img
                        src={currentIllustration.imageUrl}
                        alt={currentIllustration.alt}
                        className={`w-full object-cover ${
                          isChapterDivider ? 'h-[340px] md:h-[430px]' : 'h-[260px] md:h-[320px]'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200">
                          {currentIllustration.kicker}
                        </p>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-100/90 md:text-base">
                          {currentIllustration.caption}
                        </p>
                      </div>
                    </div>
                    <figcaption className="flex flex-col gap-3 border-t border-white/10 bg-stone-950 px-6 py-4 text-sm text-stone-300 md:flex-row md:items-center md:justify-between">
                      <span>Internet image source</span>
                      <a
                        href={currentIllustration.creditHref}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-orange-200 transition-colors hover:text-orange-100"
                      >
                        {currentIllustration.creditLabel}
                      </a>
                    </figcaption>
                  </figure>
                ) : null}

                {currentPageHasText ? (
                  currentPageIsPlainText ? (
                    isChapterDivider ? (
                      <article className="mx-auto flex min-h-[260px] max-w-3xl items-center justify-center whitespace-pre-line text-center font-serif text-4xl leading-tight text-gray-800 md:text-5xl">
                        {currentPageContent}
                      </article>
                    ) : (
                      <article className="mx-auto max-w-3xl whitespace-pre-line font-serif text-[1.05rem] leading-8 text-gray-700">
                        {currentPageContent}
                      </article>
                    )
                  ) : (
                    <div className="prose prose-lg max-w-none">{currentPageContent}</div>
                  )
                ) : (
                  <div className="mx-auto max-w-2xl rounded-2xl border border-orange-200 bg-orange-50 p-8 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-600">
                      Image-Based Page
                    </p>
                    <h3 className="mt-4 text-2xl font-bold text-gray-900">
                      This page is better viewed from the original PDF.
                    </h3>
                    <p className="mt-3 text-gray-600">
                      Some pages use cover art or special layout that do not convert cleanly to
                      text. Open the matching PDF page when you need the exact original layout.
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-orange-100 bg-orange-50/50 px-8 py-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={prevPage}
                    disabled={currentPageIndex === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                      currentPageIndex === 0
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-red-600 hover:bg-red-100 hover:shadow-md'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  <div className="text-sm font-medium text-gray-600">
                    {currentPageIndex + 1} / {totalPages}
                  </div>

                  <button
                    onClick={nextPage}
                    disabled={currentPageIndex === totalPages - 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                      currentPageIndex === totalPages - 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-red-600 hover:bg-red-100 hover:shadow-md'
                    }`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : isLoadingPages ? (
          <div className="rounded-2xl border-2 border-orange-100 bg-white p-10 text-center shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-600">
              Preparing Text Edition
            </p>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Loading readable pages...</h2>
            <p className="mt-3 text-gray-600">
              The original PDF is available above while the text edition finishes loading.
            </p>
          </div>
        ) : hasImages ? (
          <div className="bg-white rounded-2xl shadow-xl border-2 border-orange-100 overflow-hidden">
            <div className="p-8 flex items-center justify-center min-h-[600px]">
              <img
                src={book.images![currentPageIndex]}
                alt={`Page ${currentPageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>

            <div className="border-t border-orange-100 bg-orange-50/50 px-8 py-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={prevPage}
                  disabled={currentPageIndex === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    currentPageIndex === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-red-600 hover:bg-red-100 hover:shadow-md'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="text-sm font-medium text-gray-600">
                  {currentPageIndex + 1} / {totalPages}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPageIndex === totalPages - 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    currentPageIndex === totalPages - 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-red-600 hover:bg-red-100 hover:shadow-md'
                  }`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : hasPdf ? (
          <div className="bg-white rounded-2xl shadow-xl border-2 border-orange-100 overflow-hidden">
            <iframe src={book.pdfUrl} title={book.title} className="w-full h-[80vh]" />
          </div>
        ) : null}

        {totalPages > 0 && currentPageIndex === totalPages - 1 ? (
          <div className="mt-8 bg-gradient-to-r from-amber-50 to-red-50 rounded-2xl p-8 text-center border-2 border-amber-200">
            <h3 className="text-2xl font-bold text-orange-800 mb-4">You've completed this book!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for reading. Feel free to share this message of love with others.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setCurrentPageIndex(0)}
                className="px-6 py-3 bg-white border-2 border-orange-600 text-orange-600 font-bold rounded-xl hover:bg-amber-50 transition-all"
              >
                Read Again
              </button>
              <button
                onClick={() => navigate('/publications')}
                className="px-6 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-all shadow-md"
              >
                Browse More Books
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {totalPages > 0 && currentPageIndex > 0 ? (
        <button
          onClick={prevPage}
          className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center bg-white text-red-600 border-2 border-red-200 rounded-full shadow-lg hover:shadow-xl hover:bg-red-50 transition-all hover:scale-110"
          title="Previous Page"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      ) : null}

      {totalPages > 0 && currentPageIndex < totalPages - 1 ? (
        <button
          onClick={nextPage}
          className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center bg-white text-red-600 border-2 border-red-200 rounded-full shadow-lg hover:shadow-xl hover:bg-red-50 transition-all hover:scale-110"
          title="Next Page"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      ) : null}
    </div>
  );
}
