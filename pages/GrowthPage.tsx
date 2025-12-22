/**
 * GrowthPage Component
 * Main page integrating all growth sections with navigation, search, and loading states
 * Requirements: 6.1, 6.3, 6.4
 */

import { useState, useCallback, useEffect } from 'react';
import { Search, X, Heart } from 'lucide-react';
import GrowthNavigation, { type GrowthSection } from '../components/growth/GrowthNavigation';
import DailyChallengeSection from '../components/growth/DailyChallengeSection';
import GrowthTipsSection from '../components/growth/GrowthTipsSection';
import SelfReflectionSection from '../components/growth/SelfReflectionSection';
import GuidedJourneysSection from '../components/growth/GuidedJourneysSection';
import ProgressDashboard from '../components/growth/ProgressDashboard';
import { dataService } from '../services/dataService';
import type { SearchResult } from '../types/growth';

export default function GrowthPage() {
  const [activeSection, setActiveSection] = useState<GrowthSection>('challenges');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim().length >= 2) {
      setIsSearching(true);
      const results = dataService.searchContent(query);
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  }, []);

  // Navigate to section from search result or progress dashboard
  const navigateToSection = useCallback((section: string) => {
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
  }, [clearSearch]);


  // Render active section content
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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col items-center justify-center py-24">
            <div className="animate-pulse">
              <Heart className="w-16 h-16 text-orange-400" />
            </div>
            <p className="mt-4 text-gray-500">Loading growth content...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-red-800 mb-4">Your Love Growth Journey</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Grow in your capacity to love through daily challenges, practical wisdom,
            guided reflection, and transformative spiritual journeys.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search challenges, tips, journeys..."
              className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {isSearching && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
              {searchResults.length > 0 ? (
                <div className="p-2">
                  <p className="text-xs text-gray-500 px-3 py-2">
                    {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                  </p>
                  {searchResults.map((result) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      onClick={() => navigateToSection(result.type)}
                      className="w-full text-left px-3 py-3 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-medium uppercase text-orange-600 bg-orange-100 px-2 py-0.5 rounded">
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
                <div className="p-6 text-center">
                  <p className="text-gray-500">No results found for "{searchQuery}"</p>
                  <p className="text-sm text-gray-400 mt-1">Try different keywords</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <GrowthNavigation
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Section Content */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
