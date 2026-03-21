import { BadgeCheck, BookOpen, Download, Sparkles, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { CTASection, FeatureCard, PageHero, PageShell, SectionCard } from '../components/ui';

const RESOURCE_ROUTES = [
  {
    title: 'Yellow Card',
    description: 'Keep the 17 characteristics in your hand so they stay in front of your reactions.',
    href: '/yellow-card',
    accentColor: 'yellow' as const,
    icon: <BadgeCheck className="h-6 w-6" />,
  },
  {
    title: 'Yellow Card Series',
    description: 'Go deeper into the logic, urgency, and practical force behind the message.',
    href: '/yellow-card-series',
    accentColor: 'orange' as const,
    icon: <BookOpen className="h-6 w-6" />,
  },
  {
    title: 'Publications',
    description: 'Read, download, and distribute ministry resources freely to others.',
    href: '/publications',
    accentColor: 'red' as const,
    icon: <Download className="h-6 w-6" />,
  },
  {
    title: '30 Day Challenge',
    description: 'Use a structured route into reflection, accountability, and daily acts of love.',
    href: '/love-challenge',
    accentColor: 'green' as const,
    icon: <Target className="h-6 w-6" />,
  },
] as const;

export default function ResourcesPage() {
  return (
    <PageShell>
      <PageHero
        badge={
          <>
            <Sparkles className="h-4 w-4" />
            Practical tools
          </>
        }
        icon={
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 text-white shadow-lg">
            <Logo className="h-7 w-7" />
          </div>
        }
        title="Resources that keep the message in motion"
        subtitle="These tools exist to move love from inspiration into repetition: carry it, read it, teach it, and distribute it."
        actions={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/yellow-card" className="btn-brand px-7 py-3">
              Get the yellow card
            </Link>
            <Link to="/publications" className="btn-outline-brand px-7 py-3">
              Browse publications
            </Link>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-4">
          <div className="surface-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">Portable</p>
            <p className="mt-2 text-lg font-semibold text-[#3d1d17]">Carry the standard with you.</p>
          </div>
          <div className="surface-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">Repeatable</p>
            <p className="mt-2 text-lg font-semibold text-[#3d1d17]">Return to it daily under pressure.</p>
          </div>
          <div className="surface-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">Shareable</p>
            <p className="mt-2 text-lg font-semibold text-[#3d1d17]">Reproduce and distribute freely.</p>
          </div>
          <div className="surface-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">Practical</p>
            <p className="mt-2 text-lg font-semibold text-[#3d1d17]">Use it inside household life.</p>
          </div>
        </div>
      </PageHero>

      <SectionCard>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">Toolset</p>
        <h2 className="mt-2 font-serif text-3xl text-[#3d1d17]">Choose the format that helps you keep practicing.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {RESOURCE_ROUTES.map(route => (
            <Link key={route.href} to={route.href} className="block">
              <FeatureCard
                icon={route.icon}
                title={route.title}
                description={route.description}
                accentColor={route.accentColor}
                className="h-full"
              />
            </Link>
          ))}
        </div>
      </SectionCard>

      <CTASection
        title="Put something practical in your hand today"
        description="Resources matter when they keep biblical love visible in memory, conversation, and action."
        primaryAction={{ label: 'Open the yellow card series', href: '/yellow-card-series' }}
        secondaryAction={{ label: 'Enter the challenge', href: '/love-challenge' }}
      />
    </PageShell>
  );
}
