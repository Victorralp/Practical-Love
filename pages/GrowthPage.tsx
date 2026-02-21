import { useState, useCallback, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import GrowthNavigation, { type GrowthSection } from '../components/growth/GrowthNavigation';
import DailyChallengeSection from '../components/growth/DailyChallengeSection';
import GrowthTipsSection from '../components/growth/GrowthTipsSection';
import SelfReflectionSection from '../components/growth/SelfReflectionSection';
import GuidedJourneysSection from '../components/growth/GuidedJourneysSection';
import ProgressDashboard from '../components/growth/ProgressDashboard';
import { dataService } from '../services/dataService';
import type { SearchResult } from '../types/growth';
import { PageShell, PageHero } from '../components/ui';
import Logo from '../components/Logo';

export default function GrowthPage() {
  const [activeSection, setActiveSection] = useState<GrowthSection>('challenges');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim().length >= 2) {
      setIsSearching(true);
      setSearchResults(dataService.searchContent(query));
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  }, []);

  const navigateToSection = useCallback(
    (section: string) => {
      const sectionMap: Record<string, GrowthSection> = {
        challenge: 'challenges',
        challenges: 'challenges',
        tip: 'tips',
        tips: 'tips',
        journey: 'journeys',
        journeys: 'journeys',
        reflection: 'reflection',
        progress: 'progress',
      };
      const targetSection = sectionMap[section.toLowerCase()] || 'challenges';
      setActiveSection(targetSection);
      clearSearch();
    },
    [clearSearch]
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'challenges':
        return <DailyChallengeSection />;
      case 'tips':
        return <GrowthTipsSection />;
      case 'reflection':
        return <SelfReflectionSection />;
      case 'journeys':
        return <GuidedJourneysSection />;
      case 'progress':
        return <ProgressDashboard onNavigateToSection={navigateToSection} />;
      default:
        return <DailyChallengeSection />;
    }
  };

  if (isLoading) {
    return (
      <PageShell className="bg-gradient-to-b from-red-50 via-orange-50 to-white">
        <div className="flex flex-col items-center justify-center py-32">
          <div className="animate-pulse">
            <Logo className="w-16 h-16" />
          </div>
          <p className="mt-4 text-gray-600">Loading growth content...</p>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell className="bg-gradient-to-b from-red-50 via-orange-50 to-white">
      <div className="section-gap">
        <PageHero
          badge={
            <>
              <Logo className="w-4 h-4" />
              Growth & Practice
            </>
          }
          title="Your Love Growth Journey"
          subtitle="Grow daily through challenges, practical wisdom, guided reflection, and transformative journeys."
          actions={
            <div className="flex flex-col sm:flex-row gap-3">
              <button type="button" onClick={() => setActiveSection('challenges')} className="btn-brand">
                Today’s challenge
              </button>
              <button type="button" onClick={() => setActiveSection('progress')} className="btn-outline-brand">
                View progress
              </button>
              <Link to="/share-testimony" className="btn-outline-brand">
                Share testimony
              </Link>
            </div>
          }
        />

        <div className="surface p-5 space-y-3">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="pill">Daily growth</span>
            <span className="pill">Practical wisdom</span>
            <span className="pill">Guided journeys</span>
            <span className="text-xs text-gray-500">Search by keyword or verse.</span>
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSearch(searchQuery);
            }}
            className="relative space-y-2"
          >
            <div className="flex items-center gap-3 bg-white border-2 border-orange-100 rounded-xl shadow-lg px-3 py-2 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                placeholder="Search challenges, tips, journeys..."
                className="flex-1 border-none focus:outline-none focus:ring-0 text-base text-gray-800"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="text-gray-400 hover:text-gray-700"
                  aria-label="Clear search"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <button
                type="submit"
                className="btn-brand px-4 py-2 text-sm shadow-none hover:-translate-y-0.5"
              >
                Search
              </button>
            </div>

            {isSearching && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-orange-100 max-h-80 overflow-y-auto z-50">
                {searchResults.length > 0 ? (
                  <div className="p-2 space-y-1">
                    <p className="text-xs text-gray-500 px-3 py-1">
                      {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                    </p>
                    {searchResults.map(result => (
                      <button
                        key={`${result.type}-${result.id}`}
                        onClick={() => navigateToSection(result.type)}
                        className="w-full text-left px-3 py-2 hover:bg-orange-50 rounded-lg transition"
                        type="button"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-xs font-semibold uppercase text-orange-700 bg-orange-100 px-2 py-0.5 rounded">
                            {result.type}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 truncate">{result.title}</p>
                            {result.description && (
                              <p className="text-sm text-gray-500 truncate">{result.description}</p>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-gray-500">No results for “{searchQuery}”.</div>
                )}
              </div>
            )}
          </form>
        </div>

        <div className="surface-soft">
          <GrowthNavigation activeSection={activeSection} onSectionChange={setActiveSection} />
        </div>

        <div className="surface">
          <div className="px-4 sm:px-6 md:px-8 py-6">{renderSection()}</div>
        </div>
      </div>
    </PageShell>
  );
}
