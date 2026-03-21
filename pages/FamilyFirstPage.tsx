import {
  ArrowRight,
  BookOpen,
  HeartHandshake,
  House,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { CTASection, FeatureCard, PageHero, PageShell, SectionCard } from '../components/ui';

const FAMILY_PILLARS = [
  {
    title: 'Character is trained at close range',
    description:
      'The family is where habits are repeated, tempers are tested, and children learn what is normal before the wider world names it.',
    accentColor: 'red' as const,
    icon: <House className="h-6 w-6" />,
  },
  {
    title: 'Love must survive ordinary pressure',
    description:
      'If love only appears in public performance, it is not mature yet. The home is where patience, kindness, humility, and restraint prove themselves.',
    accentColor: 'orange' as const,
    icon: <HeartHandshake className="h-6 w-6" />,
  },
  {
    title: 'Nations inherit household patterns',
    description:
      'The values reproduced in homes become the values reproduced in communities, institutions, and leadership later on.',
    accentColor: 'yellow' as const,
    icon: <Users className="h-6 w-6" />,
  },
] as const;

const PRACTICE_LANES = [
  {
    label: 'Speak the standard',
    body: 'Read the characteristics of love aloud until everyone in the house knows the language of the standard.',
  },
  {
    label: 'Correct the tone',
    body: 'Watch the small daily moments: impatience, harshness, pride, resentment, selfishness, and truthfulness.',
  },
  {
    label: 'Repeat the discipline',
    body: 'Use scripture, the yellow card, and guided challenges to keep the home from drifting back into old patterns.',
  },
] as const;

export default function FamilyFirstPage() {
  return (
    <PageShell>
      <PageHero
        badge={
          <>
            <Sparkles className="h-4 w-4" />
            Family first
          </>
        }
        icon={
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 text-white shadow-lg">
            <Logo className="h-7 w-7" />
          </div>
        }
        title="Why the family comes first"
        subtitle="Practical Love begins with the home because the home is where private conduct becomes culture, and culture eventually becomes the future."
        actions={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/characteristics" className="btn-brand px-7 py-3">
              Study the characteristics
            </Link>
            <Link to="/love-challenge" className="btn-outline-brand px-7 py-3">
              Start the challenge
            </Link>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-4">
          <div className="surface-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">Starting point</p>
            <p className="mt-2 text-lg font-semibold text-[#3d1d17]">Reform begins at home.</p>
          </div>
          <div className="surface-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">Why</p>
            <p className="mt-2 text-lg font-semibold text-[#3d1d17]">Children absorb what is repeated.</p>
          </div>
          <div className="surface-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">Test</p>
            <p className="mt-2 text-lg font-semibold text-[#3d1d17]">Love must survive pressure.</p>
          </div>
          <div className="surface-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">Result</p>
            <p className="mt-2 text-lg font-semibold text-[#3d1d17]">Homes shape nations.</p>
          </div>
        </div>
      </PageHero>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionCard>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">Core idea</p>
          <h2 className="mt-2 font-serif text-3xl text-[#3d1d17]">
            The home is the first place where pretense fails.
          </h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#6e4737]">
            Public image can be managed. Household life cannot. The family exposes impatience,
            pride, selfishness, harshness, truthfulness, and tenderness in repeatable ways. That is
            why Practical Love insists on family first: what the home rehearses, the future will
            eventually reproduce.
          </p>

          <div className="mt-8 rounded-[1.75rem] border border-[rgba(176,111,74,0.16)] bg-[linear-gradient(135deg,_rgba(255,255,255,0.9)_0%,_rgba(248,238,227,0.96)_100%)] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">Household conviction</p>
            <blockquote className="mt-4 font-serif text-2xl leading-relaxed text-[#3d1d17]">
              The standard of love is most believable when it rules marriage, parenting, speech,
              correction, forgiveness, and daily conduct inside the home.
            </blockquote>
          </div>
        </SectionCard>

        <SectionCard variant="gradient">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">Practice lanes</p>
          <h2 className="mt-2 font-serif text-3xl text-[#3d1d17]">How to make “family first” visible</h2>
          <div className="mt-6 space-y-4">
            {PRACTICE_LANES.map((lane, index) => (
              <div
                key={lane.label}
                className="rounded-[1.5rem] border border-[rgba(176,111,74,0.16)] bg-white/82 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f3dfcb] text-[#9d4b2a]">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-[#3d1d17]">{lane.label}</h3>
                    <p className="mt-2 leading-7 text-[#6e4737]">{lane.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <SectionCard>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">Why it matters</p>
        <h2 className="mt-2 font-serif text-3xl text-[#3d1d17]">
          Three reasons this ministry keeps returning to the household.
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {FAMILY_PILLARS.map(pillar => (
            <FeatureCard
              key={pillar.title}
              icon={pillar.icon}
              title={pillar.title}
              description={pillar.description}
              accentColor={pillar.accentColor}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard variant="dark">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffd2af]">Next move</p>
            <h2 className="mt-2 font-serif text-3xl text-white">
              If the family is first, the next question is simple: what should the family practice?
            </h2>
            <p className="mt-4 max-w-2xl leading-8 text-[#fff1e3] opacity-85">
              Start with the characteristics of love, then use the challenge and yellow card to keep
              the standard in front of the home until it becomes ordinary behavior.
            </p>
          </div>

          <div className="grid gap-4">
            <Link
              to="/characteristics"
              className="flex items-center justify-between rounded-[1.5rem] border border-white/14 bg-white/8 px-5 py-4 text-[#fff4e7] transition-colors hover:bg-white/12"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-[#ffd2af]" />
                <span className="font-medium">Open the 17 characteristics</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/yellow-card"
              className="flex items-center justify-between rounded-[1.5rem] border border-white/14 bg-white/8 px-5 py-4 text-[#fff4e7] transition-colors hover:bg-white/12"
            >
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-[#ffd2af]" />
                <span className="font-medium">Carry the yellow card</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </SectionCard>

      <CTASection
        title="Keep the standard inside the home"
        description="Read the scripture, train the tone of the household, and practice love until private life starts matching the language of the message."
        primaryAction={{ label: 'Start the 30 day challenge', href: '/love-challenge' }}
        secondaryAction={{ label: 'Read mission and vision', href: '/mission-vision' }}
      />
    </PageShell>
  );
}
