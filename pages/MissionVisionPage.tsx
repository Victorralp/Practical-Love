import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Eye,
  Globe,
  HeartHandshake,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CTASection, FeatureCard, PageHero, PageShell, SectionCard } from '../components/ui';
import Logo from '../components/Logo';

const VISION_POINTS = [
  'Marriages restored through sacrificial love',
  'Leaders serving with integrity and compassion',
  'Communities united beyond tribal lines',
  'Children raised in loving, God-fearing homes',
];

const STRATEGY_STEPS = [
  {
    number: '01',
    title: 'Equip with the yellow card',
    description:
      'Distribute the 17 characteristics of love as a practical, portable tool for daily remembrance and use.',
  },
  {
    number: '02',
    title: 'Teach the characteristics',
    description:
      'Help families understand, memorize, and practice each characteristic until it becomes everyday conduct.',
  },
  {
    number: '03',
    title: 'Build daily practice',
    description:
      'Use the 30-day challenge and other rhythms so love moves from theory into habit and visible transformation.',
  },
] as const;

const CORE_BELIEFS = [
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Family first',
    description: 'Every corrupt or righteous leader comes from a home. Heal the family, heal the nation.',
    accentColor: 'red' as const,
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Love transforms',
    description: 'Love is not weak sentiment. It is the force that can turn selfishness into service and division into unity.',
    accentColor: 'orange' as const,
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "God's promise",
    description: 'Families that practice love position themselves under the blessing that follows honor and obedience.',
    accentColor: 'yellow' as const,
  },
] as const;

const MISSION_LANES = [
  {
    title: 'Heart change',
    description:
      'The ministry aims to remain in the heart of every Nigerian so God’s commands are written on the inside, not only heard from the outside.',
    icon: <HeartHandshake className="h-5 w-5" />,
  },
  {
    title: 'Household change',
    description:
      'The first arena of transformation is the home: husbands, wives, parents, children, and the culture they create together.',
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: 'National change',
    description:
      'When homes are formed by practical love, that formation eventually appears in communities, institutions, and national life.',
    icon: <Globe className="h-5 w-5" />,
  },
] as const;

export default function MissionVisionPage() {
  return (
    <PageShell
      className="bg-[radial-gradient(circle_at_top_left,_rgba(254,215,170,0.24),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(248,113,113,0.16),_transparent_34%),linear-gradient(180deg,_#fffaf5_0%,_#ffffff_48%,_#fff7ed_100%)]"
      containerClassName="py-14 section-gap"
    >
      <PageHero
        badge={
          <>
            <Sparkles className="w-4 h-4" />
            Our Purpose & Direction
          </>
        }
        icon={
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 text-white shadow-lg">
            <Logo className="h-7 w-7" />
          </div>
        }
        title="Mission & Vision"
        subtitle="Transforming Nigeria through the overwhelming, winning power of God’s practical love, one family at a time."
        actions={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/yellow-card" className="btn-brand px-7 py-3">
              Get the yellow card
            </Link>
            <Link to="/love-challenge" className="btn-outline-brand px-7 py-3">
              Start the challenge
            </Link>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">Mission</p>
            <p className="mt-2 text-lg font-semibold text-gray-900">Equip every family to love like God loves</p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">Vision</p>
            <p className="mt-2 text-lg font-semibold text-gray-900">A nation changed from the heart outward</p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">Method</p>
            <p className="mt-2 text-lg font-semibold text-gray-900">Teach, practice, reproduce love daily</p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">Focus</p>
            <p className="mt-2 text-lg font-semibold text-gray-900">Family as the root of national change</p>
          </div>
        </div>
      </PageHero>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionCard className="border-red-100 bg-white/95 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700">
              <Target className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Our Mission
              </p>
              <h2 className="mt-2 text-3xl font-serif text-red-800">
                Equip every Nigerian family with practical tools for love
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-gray-700">
                We believe that when families learn and practice the 17 characteristics of love from
                1 Corinthians 13, transformation becomes possible in homes, communities, and the
                nation.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-red-50 p-6 shadow-sm">
            <p className="leading-8 text-gray-700">
              This Love Ministry, using the Love Card, aims to remain in the heart of every
              Nigerian so that God can write His commandments in hearts of flesh, beginning with the
              family.
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-orange-100 bg-white/90 p-4">
                <p className="text-sm italic leading-7 text-gray-700">
                  &ldquo;I will give you a new heart and put a new spirit in you; I will remove
                  from you your heart of stone and give you a heart of flesh.&rdquo;
                </p>
                <p className="mt-2 text-sm font-semibold text-red-700">Ezekiel 36:26</p>
              </div>
              <div className="rounded-2xl border border-orange-100 bg-white/90 p-4">
                <p className="text-sm italic leading-7 text-gray-700">
                  &ldquo;I will put my law in their minds and write it on their hearts. I will be
                  their God, and they will be my people.&rdquo;
                </p>
                <p className="mt-2 text-sm font-semibold text-red-700">Jeremiah 31:33</p>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard className="border-orange-200 bg-gradient-to-br from-orange-50 via-white to-red-50 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700">
              <Eye className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Our Vision
              </p>
              <h2 className="mt-2 text-3xl font-serif text-red-800">What we see ahead</h2>
              <p className="mt-4 leading-8 text-gray-700">
                We want to see every Nigerian family transformed by the power of God’s love,
                breaking the cycle of corruption, wickedness, and materialism through transformation
                of the heart.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {VISION_POINTS.map(point => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm"
              >
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                <p className="leading-7 text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {CORE_BELIEFS.map(belief => (
          <FeatureCard
            key={belief.title}
            icon={belief.icon}
            title={belief.title}
            description={belief.description}
            accentColor={belief.accentColor}
          />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <SectionCard className="border-red-100 bg-white/95 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            Mission Lanes
          </p>
          <h2 className="mt-2 text-3xl font-serif text-red-800">How the vision becomes practical</h2>
          <div className="mt-6 space-y-4">
            {MISSION_LANES.map(lane => (
              <div
                key={lane.title}
                className="rounded-2xl border border-orange-100 bg-gradient-to-r from-white to-orange-50 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                    {lane.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-gray-900">{lane.title}</h3>
                    <p className="mt-2 leading-7 text-gray-700">{lane.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          variant="dark"
          className="border-red-900 bg-[linear-gradient(160deg,_rgba(127,29,29,1)_0%,_rgba(136,19,55,1)_45%,_rgba(154,52,18,1)_100%)] shadow-xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
            Strategy Flow
          </p>
          <h2 className="mt-2 text-3xl font-serif text-white">Reproduction and distribution</h2>
          <div className="mt-6 space-y-4">
            {STRATEGY_STEPS.map((step, index) => (
              <div key={step.number} className="relative rounded-2xl border border-white/10 bg-white/10 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-red-700 text-sm font-bold shadow-sm">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-white">{step.title}</h3>
                    <p className="mt-2 leading-7 text-orange-100">{step.description}</p>
                  </div>
                </div>
                {index < STRATEGY_STEPS.length - 1 ? (
                  <ArrowRight className="mt-4 h-5 w-5 text-orange-200" />
                ) : null}
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <SectionCard className="border-orange-200 bg-white/95 shadow-lg text-center">
        <BookOpen className="mx-auto h-12 w-12 text-red-600" />
        <blockquote className="mx-auto mt-6 max-w-4xl text-2xl font-serif italic leading-relaxed text-gray-900 md:text-3xl">
          &ldquo;For God so loved the world that He gave His only begotten Son, that whoever
          believes in Him should not perish but have everlasting life.&rdquo;
        </blockquote>
        <cite className="mt-5 block text-lg font-medium text-red-700">John 3:16</cite>
      </SectionCard>

      <CTASection
        title="Ready to join the movement?"
        description="Start practicing practical love today and help change Nigeria one heart, one family, and one community at a time."
        primaryAction={{ label: 'Start the 30-Day Challenge', href: '/love-challenge' }}
        secondaryAction={{ label: 'Get the Yellow Card', href: '/yellow-card' }}
      />
    </PageShell>
  );
}
