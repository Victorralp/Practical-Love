import { BookOpen, Compass, HeartHandshake, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { CTASection, FeatureCard, PageHero, PageShell, SectionCard } from '../components/ui';

const ABOUT_ROUTES = [
  {
    title: 'Characteristics of Love',
    description: 'Study the 17 characteristics from 1 Corinthians 13 and use them as a daily mirror.',
    href: '/characteristics',
    accentColor: 'red' as const,
    icon: <BookOpen className="h-6 w-6" />,
  },
  {
    title: 'Bible Passages',
    description: 'Read the scriptural passages that anchor the message in God’s standard, not sentiment.',
    href: '/bible-passages',
    accentColor: 'orange' as const,
    icon: <Compass className="h-6 w-6" />,
  },
  {
    title: 'Mission and Vision',
    description: 'See how household reform, discipleship, and national transformation fit together.',
    href: '/mission-vision',
    accentColor: 'yellow' as const,
    icon: <HeartHandshake className="h-6 w-6" />,
  },
] as const;

export default function AboutLovePage() {
  return (
    <PageShell>
      <PageHero
        badge={
          <>
            <Sparkles className="h-4 w-4" />
            About the message
          </>
        }
        icon={
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 text-white shadow-lg">
            <Logo className="h-7 w-7" />
          </div>
        }
        title="What Practical Love is trying to restore"
        subtitle="This is the doctrinal and practical heart of the ministry: biblical love must become visible character, not abstract language."
        actions={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/characteristics" className="btn-brand px-7 py-3">
              Study the characteristics
            </Link>
            <Link to="/mission-vision" className="btn-outline-brand px-7 py-3">
              Read the mission
            </Link>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="surface-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">Truth</p>
            <p className="mt-2 text-lg font-semibold text-[#3d1d17]">Love is measurable behavior.</p>
          </div>
          <div className="surface-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">Burden</p>
            <p className="mt-2 text-lg font-semibold text-[#3d1d17]">The home is the first battlefield.</p>
          </div>
          <div className="surface-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">Outcome</p>
            <p className="mt-2 text-lg font-semibold text-[#3d1d17]">Families shape the future of a nation.</p>
          </div>
        </div>
      </PageHero>

      <SectionCard>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">Orientation</p>
        <h2 className="mt-2 font-serif text-3xl text-[#3d1d17]">Start with the route that answers your first question.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {ABOUT_ROUTES.map(route => (
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
        title="Move from explanation into practice"
        description="Learn the message, read the scriptures behind it, and then put it into household life where it can either stand or fail."
        primaryAction={{ label: 'Start the challenge', href: '/love-challenge' }}
        secondaryAction={{ label: 'Open Bible passages', href: '/bible-passages' }}
      />
    </PageShell>
  );
}
