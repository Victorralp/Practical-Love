import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Compass,
  Lightbulb,
  Map,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import GrowthNavigation, { type GrowthSection } from '../components/growth/GrowthNavigation';
import DailyChallengeSection from '../components/growth/DailyChallengeSection';
import GrowthTipsSection from '../components/growth/GrowthTipsSection';
import SelfReflectionSection from '../components/growth/SelfReflectionSection';
import GuidedJourneysSection from '../components/growth/GuidedJourneysSection';
import ProgressDashboard from '../components/growth/ProgressDashboard';
import { dataService } from '../services/dataService';
import type { SearchResult } from '../types/growth';
import { PageShell, PageHero, SectionCard } from '../components/ui';
import Logo from '../components/Logo';

const SECTION_DETAILS: Record<
  GrowthSection,
  {
    label: string;
    title: string;
    description: string;
    accent: string;
    icon: React.ReactNode;
  }
> = {
  challenges: {
    label: 'Daily Challenge',
    title: 'Build love through action',
    description:
      'Step into one focused challenge for today and practice love in visible, measurable ways.',
    accent: 'from-red-50 to-orange-50',
    icon: <Target className="h-5 w-5" />,
  },
  tips: {
    label: 'Growth Tips',
    title: 'Gather practical wisdom',
    description:
      'Study practical guidance and exercises that help love become skillful, not vague.',
    accent: 'from-orange-50 to-amber-50',
    icon: <Lightbulb className="h-5 w-5" />,
  },
  reflection: {
    label: 'Reflection',
    title: 'Slow down and examine the heart',
    description:
      'Use prompts and history to notice patterns, repent clearly, and keep growing deliberately.',
    accent: 'from-rose-50 to-orange-50',
    icon: <Sparkles className="h-5 w-5" />,
  },
  journeys: {
    label: 'Guided Journeys',
    title: 'Walk through structured formation',
    description:
      'Follow longer tracks that guide your growth over time instead of only one day at a time.',
    accent: 'from-orange-50 to-white',
    icon: <Map className="h-5 w-5" />,
  },
  progress: {
    label: 'Progress',
    title: 'See momentum and milestones',
    description:
      'Review what you have completed, which habits are growing, and where your next steps should go.',
    accent: 'from-red-50 to-white',
    icon: <TrendingUp className="h-5 w-5" />,
  },
};

const QUICK_SEARCH_TERMS = [
  'patience',
  'forgiveness',
  'kindness',
  'trust',
  'family',
  'hope',
] as const;

const RHYTHM_STEPS = [
  {
    title: 'Start with a challenge',
    description: 'Use the daily challenge as the first practical action of your growth rhythm.',
  },
  {
    title: 'Support it with a tip',
    description: 'Open a related tip when you need more clarity, examples, or exercises.',
  },
  {
    title: 'End with reflection',
    description: 'Close the day by checking your motives, patterns, and progress honestly.',
  },
] as const;

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

  const counts = useMemo(
    () => ({
      challenges: dataService.getChallenges().length,
      tips: dataService.getTips().length,
      journeys: dataService.getJourneys().length,
      reflections: dataService.getReflectionPrompts().length,
    }),
    []
  );

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

  const activeMeta = SECTION_DETAILS[activeSection];

  if (isLoading) {
    return (
      <PageShell className="bg-[radial-gradient(circle_at_top,_rgba(254,215,170,0.32),_transparent_36%),linear-gradient(180deg,_#fff7ed_0%,_#ffffff_60%,_#fff1f2_100%)]">
        <div className="flex flex-col items-center justify-center py-32">
          <div className="animate-pulse rounded-[1.5rem] bg-white p-4 shadow-lg">
            <Logo className="h-16 w-16" />
          </div>
          <p className="mt-5 text-gray-600">Loading your growth hub...</p>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell className="bg-[radial-gradient(circle_at_top_left,_rgba(254,215,170,0.26),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(248,113,113,0.16),_transparent_34%),linear-gradient(180deg,_#fffaf5_0%,_#ffffff_48%,_#fff7ed_100%)]">
      <div className="section-gap">
        <PageHero
          badge={
            <>
              <Logo className="w-4 h-4" />
              Growth & Practice
            </>
          }
          icon={
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 text-white shadow-lg">
              <Compass className="h-7 w-7" />
            </div>
          }
          title="Your Love Growth Journey"
          subtitle="Move through challenges, wisdom, reflection, journeys, and progress from one central growth hub that feels active, guided, and easy to navigate."
          actions={
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setActiveSection('challenges')}
                className="btn-brand"
              >
                Today&apos;s challenge
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('progress')}
                className="btn-outline-brand"
              >
                View progress
              </button>
              <Link to="/share-testimony" className="btn-outline-brand">
                Share testimony
              </Link>
            </div>
          }
        >
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                Challenges
              </p>
              <p className="mt-2 text-2xl font-bold text-gray-900">{counts.challenges}</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">Tips</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">{counts.tips}</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                Journeys
              </p>
              <p className="mt-2 text-2xl font-bold text-gray-900">{counts.journeys}</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                Prompts
              </p>
              <p className="mt-2 text-2xl font-bold text-gray-900">{counts.reflections}</p>
            </div>
          </div>
        </PageHero>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionCard className="border-red-100 bg-white/95 shadow-lg">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                  Growth Atlas
                </p>
                <h2 className="mt-2 text-3xl font-serif text-red-800">
                  Choose the lane you need now
                </h2>
              </div>
              <div className="rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3">
                <p className="text-sm font-medium text-orange-700">Active now</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">{activeMeta.label}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {(
                Object.entries(SECTION_DETAILS) as [
                  GrowthSection,
                  (typeof SECTION_DETAILS)[GrowthSection],
                ][]
              ).map(([section, meta]) => {
                const isActive = activeSection === section;

                return (
                  <button
                    key={section}
                    type="button"
                    onClick={() => setActiveSection(section)}
                    className={`rounded-2xl border bg-gradient-to-br p-5 text-left transition-all duration-200 ${
                      isActive
                        ? `border-red-300 bg-gradient-to-br ${meta.accent} shadow-md`
                        : 'border-orange-100 from-white to-orange-50 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                      {meta.icon}
                    </div>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
                      {meta.label}
                    </p>
                    <h3 className="mt-2 text-xl font-serif text-gray-900">{meta.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{meta.description}</p>
                  </button>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard
            variant="dark"
            className="border-red-900 bg-[linear-gradient(160deg,_rgba(127,29,29,1)_0%,_rgba(136,19,55,1)_45%,_rgba(154,52,18,1)_100%)] shadow-xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
              Growth Rhythm
            </p>
            <h2 className="mt-2 text-3xl font-serif text-white">
              Use the hub like a practice cycle
            </h2>
            <div className="mt-6 space-y-4">
              {RHYTHM_STEPS.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-orange-100">{step.description}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <SectionCard className="border-orange-200 bg-white/95 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Search Studio
            </p>
            <h2 className="mt-2 text-3xl font-serif text-red-800">Find content fast</h2>
            <p className="mt-3 leading-7 text-gray-700">
              Search by topic, action, or theme. This hub scans challenges, tips, journeys, and
              reflection prompts together.
            </p>

            <form
              onSubmit={event => {
                event.preventDefault();
                handleSearch(searchQuery);
              }}
              className="mt-6 space-y-4"
            >
              <div className="flex items-center gap-3 rounded-2xl border-2 border-orange-100 bg-white px-3 py-2 shadow-sm focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-400">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={event => handleSearch(event.target.value)}
                  placeholder="Search patience, forgiveness, family, journeys..."
                  className="flex-1 border-none bg-transparent text-base text-gray-800 focus:outline-none focus:ring-0"
                />
                {searchQuery ? (
                  <button
                    onClick={clearSearch}
                    className="text-gray-400 transition hover:text-gray-700"
                    aria-label="Clear search"
                    type="button"
                  >
                    <X className="h-5 w-5" />
                  </button>
                ) : null}
                <button type="submit" className="btn-brand px-4 py-2 text-sm shadow-none">
                  Search
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {QUICK_SEARCH_TERMS.map(term => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleSearch(term)}
                    className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700 transition hover:border-orange-200 hover:bg-orange-100"
                  >
                    {term}
                  </button>
                ))}
              </div>

              {isSearching ? (
                <div className="max-h-80 overflow-y-auto rounded-2xl border border-orange-100 bg-white shadow-xl">
                  {searchResults.length > 0 ? (
                    <div className="space-y-1 p-2">
                      <p className="px-3 py-1 text-xs text-gray-500">
                        {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                      </p>
                      {searchResults.map(result => (
                        <button
                          key={`${result.type}-${result.id}`}
                          onClick={() => navigateToSection(result.type)}
                          className="w-full rounded-xl px-3 py-3 text-left transition hover:bg-orange-50"
                          type="button"
                        >
                          <div className="flex items-start gap-3">
                            <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold uppercase text-orange-700">
                              {result.type}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-medium text-gray-800">{result.title}</p>
                              {result.description ? (
                                <p className="truncate text-sm text-gray-500">
                                  {result.description}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">
                      No results for &ldquo;{searchQuery}&rdquo;.
                    </div>
                  )}
                </div>
              ) : null}
            </form>
          </SectionCard>

          <SectionCard className="border-orange-200 bg-gradient-to-br from-orange-50 via-white to-red-50 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Active Focus
            </p>
            <h2 className="mt-2 text-3xl font-serif text-red-800">{activeMeta.title}</h2>
            <p className="mt-3 max-w-2xl leading-7 text-gray-700">{activeMeta.description}</p>

            <div className="mt-6 rounded-[1.75rem] border border-white/80 bg-white/90 p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                  {activeMeta.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">
                    Current section
                  </p>
                  <p className="text-xl font-semibold text-gray-900">{activeMeta.label}</p>
                </div>
              </div>
              <p className="mt-4 leading-7 text-gray-700">
                Use the section rail below to switch lanes at any time. The goal is to keep the
                whole growth system feeling connected, not isolated.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setActiveSection('progress')}
                className="btn-brand"
              >
                Open progress
              </button>
              <Link to="/love-challenge" className="btn-outline-brand">
                Open love challenge
              </Link>
            </div>
          </SectionCard>
        </section>

        <section>
          <SectionCard className="border-orange-200 bg-white/95 shadow-lg">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                  Section Canvas
                </p>
                <h2 className="mt-2 text-3xl font-serif text-red-800">{activeMeta.label}</h2>
              </div>
              <div className="rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3">
                <p className="text-sm font-medium text-orange-700">Now exploring</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">{activeMeta.title}</p>
              </div>
            </div>
            <p className="mt-4 max-w-3xl leading-7 text-gray-700">{activeMeta.description}</p>

            <div className="mt-6">
              <GrowthNavigation activeSection={activeSection} onSectionChange={setActiveSection} />
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-orange-100 bg-gradient-to-br from-white to-orange-50 px-4 py-6 sm:px-6 md:px-8">
              {renderSection()}
            </div>
          </SectionCard>
        </section>

        <div className="flex justify-center">
          <Link
            to="/love-challenge"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-700 transition hover:text-red-800"
          >
            Continue into the 30-day love challenge
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
