import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-orange-100 bg-white/95 p-10 shadow-[0_24px_48px_rgba(95,53,30,0.08)]">
        <p className="font-serif text-8xl font-bold text-red-700/20">404</p>
        <h1 className="mt-4 font-serif text-4xl text-[#3d1d17]">Page not found</h1>
        <p className="mt-4 text-lg leading-8 text-[#6e4737]">
          Sorry, we couldn't find the page you're looking for. It may have been moved or no longer
          exists.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/" className="btn-brand inline-flex items-center justify-center gap-2 px-7 py-3">
            <Home className="h-4 w-4" />
            Go home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-orange-200 bg-white px-7 py-3 font-semibold text-orange-700 transition hover:bg-orange-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
