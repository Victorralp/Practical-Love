import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import SiteSeo from './components/SiteSeo';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';

// ── Lazy-loaded pages (code splitting) ──────────────────────────────
const CharacteristicsPage = lazy(() => import('./pages/CharacteristicsPage'));
const BiblePassagesPage = lazy(() => import('./pages/BiblePassagesPage'));
const LoveInNigeriaPage = lazy(() => import('./pages/LoveInNigeriaPage'));
const MissionVisionPage = lazy(() => import('./pages/MissionVisionPage'));
const YellowCardPage = lazy(() => import('./pages/YellowCardPage'));
const LoveChallengePage = lazy(() => import('./pages/LoveChallengePage'));
const ShareTestimonyPage = lazy(() => import('./pages/ShareTestimonyPage'));
const GrowthPage = lazy(() => import('./pages/GrowthPage'));
const YellowCardSeriesPage = lazy(() => import('./pages/YellowCardSeriesPage'));
const PublicationsPage = lazy(() => import('./pages/PublicationsPage'));
const BookReaderPage = lazy(() => import('./pages/BookReaderPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const TestimoniesPage = lazy(() => import('./pages/TestimoniesPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage'));
const DonationPage = lazy(() => import('./pages/DonationPage'));
const AboutLovePage = lazy(() => import('./pages/AboutLovePage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const FamilyFirstPage = lazy(() => import('./pages/FamilyFirstPage'));
const MessagesPage = lazy(() => import('./pages/MessagesPage'));
const AdminMessagesPage = lazy(() => import('./pages/AdminMessagesPage'));
const AdminPublicationsPage = lazy(() => import('./pages/AdminPublicationsPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const AdminTestimoniesPage = lazy(() => import('./pages/AdminTestimoniesPage'));
const AdminPrayersPage = lazy(() => import('./pages/AdminPrayersPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Dev-only pages — only imported during development
const CloudinaryDemoPage = lazy(() => import('./pages/CloudinaryDemoPage'));
const EnvTestPage = lazy(() => import('./pages/EnvTestPage'));

const isDev = import.meta.env.DEV;

// ── Loading fallback ────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-200 border-t-red-700" />
    </div>
  );
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

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <AdminShortcut />
      <SiteSeo />
      {!isAdminRoute && <Header />}
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about-love" element={<AboutLovePage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/messages" element={<MessagesPage />} />
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
                <Route path="/env-test" element={<EnvTestPage />} />
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
