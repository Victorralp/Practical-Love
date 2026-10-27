import { lazy, Suspense, useEffect, type ComponentType } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import SiteSeo from './components/SiteSeo';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';

// ── Lazy-loaded pages (code splitting) ──────────────────────────────
// Public pages register their loader so they can be prefetched once the
// browser is idle; otherwise every first click waits on a chunk download.
const publicPageLoaders: Array<() => Promise<unknown>> = [];

function publicPage<T extends ComponentType<any>>(load: () => Promise<{ default: T }>) {
  publicPageLoaders.push(load);
  return lazy(load);
}

const CharacteristicsPage = publicPage(() => import('./pages/CharacteristicsPage'));
const BiblePassagesPage = publicPage(() => import('./pages/BiblePassagesPage'));
const LoveInNigeriaPage = publicPage(() => import('./pages/LoveInNigeriaPage'));
const MissionVisionPage = publicPage(() => import('./pages/MissionVisionPage'));
const YellowCardPage = publicPage(() => import('./pages/YellowCardPage'));
const LoveChallengePage = publicPage(() => import('./pages/LoveChallengePage'));
const ShareTestimonyPage = publicPage(() => import('./pages/ShareTestimonyPage'));
const GrowthPage = publicPage(() => import('./pages/GrowthPage'));
const YellowCardSeriesPage = publicPage(() => import('./pages/YellowCardSeriesPage'));
const PublicationsPage = publicPage(() => import('./pages/PublicationsPage'));
const BookReaderPage = publicPage(() => import('./pages/BookReaderPage'));
const ContactPage = publicPage(() => import('./pages/ContactPage'));
const TestimoniesPage = publicPage(() => import('./pages/TestimoniesPage'));
const PrivacyPolicyPage = publicPage(() => import('./pages/PrivacyPolicyPage'));
const TermsOfServicePage = publicPage(() => import('./pages/TermsOfServicePage'));
const CookiePolicyPage = publicPage(() => import('./pages/CookiePolicyPage'));
const DonationPage = publicPage(() => import('./pages/DonationPage'));
const PrayerWallPage = publicPage(() => import('./pages/PrayerWallPage'));
const AboutLovePage = publicPage(() => import('./pages/AboutLovePage'));
const ResourcesPage = publicPage(() => import('./pages/ResourcesPage'));
const FamilyFirstPage = publicPage(() => import('./pages/FamilyFirstPage'));
const PrideHumilityPage = publicPage(() => import('./pages/PrideHumilityPage'));
const MessagesPage = publicPage(() => import('./pages/MessagesPage'));
const AdminMessagesPage = lazy(() => import('./pages/AdminMessagesPage'));
const AdminPublicationsPage = lazy(() => import('./pages/AdminPublicationsPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const AdminTestimoniesPage = lazy(() => import('./pages/AdminTestimoniesPage'));
const AdminPrayersPage = lazy(() => import('./pages/AdminPrayersPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Dev-only pages — only imported during development
const CloudinaryDemoPage = lazy(() => import('./pages/CloudinaryDemoPage'));

const isDev = import.meta.env.DEV;

// ── Loading fallback ────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-200 border-t-red-700" />
    </div>
  );
}

function PrefetchPages() {
  const { pathname } = useLocation();
  const isPublicRoute = !pathname.startsWith('/admin');

  useEffect(() => {
    if (!isPublicRoute) {
      return;
    }

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) {
      return;
    }

    const prefetch = () => {
      publicPageLoaders.forEach(load => {
        load().catch(() => {});
      });
    };

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }

    const id = setTimeout(prefetch, 2000);
    return () => clearTimeout(id);
  }, [isPublicRoute]);

  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function AdminShortcut() {
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingTarget =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (isTypingTarget) {
        return;
      }

      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'a') {
        event.preventDefault();
        navigate('/admin');
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [navigate]);

  return null;
}

function AppLayout() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');
  // The book reader has its own sticky toolbar with Home/Close actions.
  const isReaderRoute = pathname.startsWith('/read/');

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <PrefetchPages />
      <AdminShortcut />
      <SiteSeo />
      {!isAdminRoute && !isReaderRoute && <Header />}
      <main id="main-content" className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about-love" element={<AboutLovePage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/prayer" element={<PrayerWallPage />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminDashboardPage />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/messages"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminMessagesPage />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/publications"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminPublicationsPage />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/testimonies"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminTestimoniesPage />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/prayers"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminPrayersPage />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route path="/family-first" element={<FamilyFirstPage />} />
            <Route path="/pride-and-humility" element={<PrideHumilityPage />} />
            <Route path="/characteristics" element={<CharacteristicsPage />} />
            <Route path="/bible-passages" element={<BiblePassagesPage />} />
            <Route path="/love-in-nigeria" element={<LoveInNigeriaPage />} />
            <Route path="/mission-vision" element={<MissionVisionPage />} />
            <Route path="/yellow-card" element={<YellowCardPage />} />
            <Route path="/yellow-card-series" element={<YellowCardSeriesPage />} />
            <Route path="/love-challenge" element={<LoveChallengePage />} />
            <Route path="/share-testimony" element={<ShareTestimonyPage />} />
            <Route path="/growth" element={<GrowthPage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/read/:id" element={<BookReaderPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/testimonies" element={<TestimoniesPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/donate" element={<DonationPage />} />

            {/* Dev-only debug routes — tree-shaken out of production builds */}
            {isDev && (
              <>
                <Route path="/cloudinary-demo" element={<CloudinaryDemoPage />} />
              </>
            )}

            {/* 404 catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return <AppLayout />;
}
