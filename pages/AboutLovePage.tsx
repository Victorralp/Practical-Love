import { BookOpen, Compass, HeartHandshake, MapPin, Quote, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { CTASection, FeatureCard, PageHero, PageShell, SectionCard } from '../components/ui';

const ABOUT_ROUTES = [
  {
    title: 'Characteristics of Love',
    description:
      'Study the 17 characteristics from 1 Corinthians 13 and use them as a daily mirror.',
    href: '/characteristics',
    accentColor: 'red' as const,
    icon: <BookOpen className="h-6 w-6" />,
  },
  {
    title: 'Bible Passages',
    description:
      'Read the scriptural passages that anchor the message in God’s standard, not sentiment.',
    href: '/bible-passages',
    accentColor: 'orange' as const,
    icon: <Compass className="h-6 w-6" />,
  },
  {
    title: 'Mission and Vision',
    description:
      'See how household reform, discipleship, and national transformation fit together.',
    href: '/mission-vision',
    accentColor: 'yellow' as const,
    icon: <HeartHandshake className="h-6 w-6" />,
  },
] as const;

const MINISTRY_STORY_POINTS = [
  'Practical Love starts from a simple conviction: biblical love must move from sermon language into household behavior.',
  'The ministry keeps returning to the home because hidden tone, private habits, marriage, parenting, and forgiveness shape what children and communities later call normal.',
  'The burden is not only personal healing. It is also national renewal, beginning with Nigerian homes that learn to practice love deliberately.',
] as const;

const OUTREACH_SNAPSHOTS = [
  {
    src: '/screencapture-127-0-0-1-3000-yellow-card-series-2026-02-21-13_26_48.png',
    alt: 'Yellow Card teaching series preview',
    label: 'Teaching snapshot',
    title: 'The message already has practical tools people can carry.',
    body: 'The yellow card series gives the ministry a concrete teaching format instead of abstract promises.',
  },
  {
    src: '/screencapture-127-0-0-1-3000-love-challenge-2026-02-21-15_26_08.png',
    alt: 'Love challenge experience preview',
    label: 'Household practice',
    title: 'Visitors should immediately see how families can practice the message.',
    body: 'Challenges, devotion prompts, and repeatable actions make the site feel lived-in rather than informational only.',
  },
  {
    src: '/love-hero.png',
    alt: 'Practical Love family ministry visual',
    label: 'Ministry image',
    title: 'The ministry should feel rooted in real homes and visible relationships.',
    body: 'The visual direction should keep reinforcing family life, warmth, and Nigeria-facing relevance.',
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
        subtitle="This page explains how the ministry began, why it starts with the home, and how Practical Love is meant to become visible in Nigerian family life."
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
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">
              Truth
            </p>
            <p className="mt-2 text-lg font-semibold text-[#3d1d17]">
              Love is measurable behavior.
            </p>
          </div>
          <div className="surface-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">
              Burden
            </p>
            <p className="mt-2 text-lg font-semibold text-[#3d1d17]">
              The home is the first battlefield.
            </p>
          </div>
          <div className="surface-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">
              Outcome
            </p>
            <p className="mt-2 text-lg font-semibold text-[#3d1d17]">
              Families shape the future of a nation.
            </p>
          </div>
        </div>
      </PageHero>

      <section className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <SectionCard>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">
            How it began
          </p>
          <h2 className="mt-2 font-serif text-3xl text-[#3d1d17]">
            Practical Love is a ministry burden before it is a website section.
          </h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#6e4737]">
            The message behind Practical Love is direct: the love of God must become a practiced way
            of life. The ministry exists to call people away from vague religious language and back
            into visible love inside marriage, parenting, discipleship, friendship, and public
            conduct.
          </p>

          <div className="mt-6 grid gap-4">
            {MINISTRY_STORY_POINTS.map(point => (
              <div
                key={point}
                className="rounded-[1.5rem] border border-[rgba(176,111,74,0.16)] bg-[linear-gradient(135deg,_rgba(255,255,255,0.92)_0%,_rgba(248,238,227,0.98)_100%)] p-5"
              >
                <p className="leading-7 text-[#6e4737]">{point}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard variant="gradient">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f3dfcb] text-[#9d4b2a]">
              <Quote className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">
                Ministry orientation
              </p>
              <h2 className="mt-2 font-serif text-3xl text-[#3d1d17]">
                The site should introduce the burden quickly and credibly.
              </h2>
            </div>
          </div>

          <blockquote className="mt-6 rounded-[1.5rem] border border-[rgba(176,111,74,0.16)] bg-white/86 p-6 font-serif text-2xl leading-relaxed text-[#3d1d17]">
            Practical Love calls people to practice the love of God until it becomes a household
            culture strong enough to bless communities and the nation.
          </blockquote>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-[rgba(176,111,74,0.16)] bg-white/86 p-5">
              <div className="flex items-center gap-3 text-[#9d4b2a]">
                <MapPin className="h-5 w-5" />
                <p className="text-sm font-semibold uppercase tracking-[0.18em]">Nigeria focus</p>
              </div>
              <p className="mt-3 leading-7 text-[#6e4737]">
                The copy now speaks directly to Nigerian homes, community life, and national
                restoration instead of sounding generic.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-[rgba(176,111,74,0.16)] bg-white/86 p-5">
              <div className="flex items-center gap-3 text-[#9d4b2a]">
                <Users className="h-5 w-5" />
                <p className="text-sm font-semibold uppercase tracking-[0.18em]">Real-life lens</p>
              </div>
              <p className="mt-3 leading-7 text-[#6e4737]">
                The page now shows practical entry points and supporting visuals so visitors can see
                the ministry as active, not theoretical.
              </p>
            </div>
          </div>
        </SectionCard>
      </section>

      <SectionCard>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">
          Orientation
        </p>
        <h2 className="mt-2 font-serif text-3xl text-[#3d1d17]">
          Start with the route that answers your first question.
        </h2>
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

      <SectionCard>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">
          Ministry snapshots
        </p>
        <h2 className="mt-2 font-serif text-3xl text-[#3d1d17]">
          Practical Love should feel visible, active, and rooted in real ministry life.
        </h2>
        <p className="mt-4 max-w-3xl leading-8 text-[#6e4737]">
          These visual anchors reinforce teaching, family practice, and ministry presence so the
          About page does not read like an isolated explanation.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {OUTREACH_SNAPSHOTS.map(snapshot => (
            <article
              key={snapshot.title}
              className="overflow-hidden rounded-[1.75rem] border border-[rgba(138,88,60,0.12)] bg-white/94 shadow-[0_24px_48px_rgba(95,53,30,0.08)]"
            >
              <img
                src={snapshot.src}
                alt={snapshot.alt}
                className="h-56 w-full object-cover object-top"
              />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">
                  {snapshot.label}
                </p>
                <h3 className="mt-3 font-serif text-2xl text-[#3d1d17]">{snapshot.title}</h3>
                <p className="mt-3 leading-7 text-[#6e4737]">{snapshot.body}</p>
              </div>
            </article>
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
