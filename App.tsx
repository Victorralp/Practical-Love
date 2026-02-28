import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import CharacteristicsPage from './pages/CharacteristicsPage';
import BiblePassagesPage from './pages/BiblePassagesPage';
import LoveInNigeriaPage from './pages/LoveInNigeriaPage';
import MissionVisionPage from './pages/MissionVisionPage';
import YellowCardPage from './pages/YellowCardPage';
import LoveChallengePage from './pages/LoveChallengePage';
import ShareTestimonyPage from './pages/ShareTestimonyPage';
import GrowthPage from './pages/GrowthPage';
import YellowCardSeriesPage from './pages/YellowCardSeriesPage';
import PublicationsPage from './pages/PublicationsPage';
import BookReaderPage from './pages/BookReaderPage';
import ContactPage from './pages/ContactPage';
import TestimoniesPage from './pages/TestimoniesPage';
import CloudinaryDemoPage from './pages/CloudinaryDemoPage';
import EnvTestPage from './pages/EnvTestPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import DonationPage from './pages/DonationPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
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
          <Route path="/cloudinary-demo" element={<CloudinaryDemoPage />} />
          <Route path="/env-test" element={<EnvTestPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/donate" element={<DonationPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
