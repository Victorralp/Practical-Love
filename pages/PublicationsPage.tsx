import { ArrowRight, BookOpen, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { publications } from '../data/publications';
import { FocusRail, type FocusRailItem } from '../components/ui/focus-rail';
import { PageHero, PageShell } from '../components/ui';
import Logo from '../components/Logo';

export default function PublicationsPage() {
  // Transform publications data for the carousel
  // Transform publications to FocusRailItem format
  const railItems: FocusRailItem[] = publications.map(book => ({
    id: book.id,
    title: book.title,
    description: book.description,
    imageSrc:
      book.coverImage ||
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop',
    href: `/read/${book.id}`,
    meta: `${book.type} • ${book.author}`,
  }));

  // Main render function
  return (
    <PageShell>
      <PageHero
        badge={
          <>
            <BookOpen className="w-4 h-4" />
            Free Publications
          </>
        }
        icon={
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-sm">
            <Logo className="w-6 h-6" />
          </div>
        }
        title={
          <>
            Free <span className="text-orange-700">Publications</span>
          </>
        }
        subtitle={
          <>
            Download our free books and discover the transformative power of love.
            <span className="block text-sm font-semibold text-orange-700 mt-2">
              Feel free to reproduce and distribute these materials freely.
            </span>
          </>
        }
      />

        {/* Focus Rail Carousel */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
          <FocusRail items={railItems} autoPlay={true} interval={5000} loop={true} />
        </div>
        {/* Publications Grid */}
        <h2 className="text-2xl font-serif text-red-800 mb-6 text-center">All Publications</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {publications.map(book => {
            const readablePageCount = book.pageCount ?? book.pages?.length;

            return (
              <div
                key={book.id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-orange-100 hover:shadow-2xl hover:border-orange-300 transition-all duration-300 transform hover:-translate-y-2"
              >
              {/* Book Cover */}
              <div className="relative h-80 bg-gradient-to-br from-red-900 to-orange-800 overflow-hidden">
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover opacity-40"
                  />
                ) : null}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white text-center leading-tight">
                    {book.title}
                  </h2>
                </div>
                {/* Free Badge */}
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  FREE
                </div>
              </div>

              {/* Book Details */}
              <div className="p-8">
                <div className="mb-4">
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Author</p>
                  <p className="text-lg font-semibold text-gray-800">{book.author}</p>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">{book.description}</p>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                    {book.type}
                  </span>
                  {readablePageCount ? (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                      {readablePageCount} Pages
                    </span>
                  ) : null}
                  {book.pdfUrl && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                      PDF
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to={`/read/${book.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold px-6 py-3 rounded-xl hover:from-red-700 hover:to-orange-700 transition-all shadow-md hover:shadow-lg"
                  >
                    <BookOpen className="w-5 h-5" />
                    {readablePageCount ? 'Read Book' : book.pdfUrl ? 'Open PDF' : 'Read Online'}
                  </Link>
                  {book.pdfUrl ? (
                    <a
                      href={book.pdfUrl}
                      download
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-white border-2 border-orange-600 text-orange-600 font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition-all"
                      title="Download PDF"
                    >
                      <Download className="w-5 h-5" />
                      Download PDF
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-white border-2 border-orange-600 text-orange-600 font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition-all"
                      title="Print to PDF using your browser"
                    >
                      <Download className="w-5 h-5" />
                      Print / Save PDF
                    </button>
                  )}
                </div>
              </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-8 md:p-10 text-center shadow-xl mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
            Share the Message of Love
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            These publications are free to reproduce and distribute. Help spread the message of love
            and transformation to every corner of your nation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/bible-passages"
              className="inline-flex items-center justify-center gap-2 bg-white text-red-600 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-all shadow-lg"
            >
              Explore Bible Passages
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/characteristics"
              className="inline-flex items-center justify-center gap-2 bg-orange-800 text-white font-bold px-8 py-4 rounded-xl hover:bg-orange-900 transition-all shadow-lg"
            >
              Learn About Love
              <Logo className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white rounded-2xl shadow-md border border-orange-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Free to Read</h3>
            <p className="text-gray-600 text-sm">
              All publications are completely free to read online or download.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md border border-orange-100">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Free to Share</h3>
            <p className="text-gray-600 text-sm">
              Reproduce and distribute these materials to anyone, anywhere.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md border border-orange-100">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Logo className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Transform Lives</h3>
            <p className="text-gray-600 text-sm">
              Help spread the message of love and bring blessings to nations.
            </p>
          </div>
        </div>
    </PageShell>
  );
}

