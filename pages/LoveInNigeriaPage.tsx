import {
  BookOpen,
  Building2,
  DollarSign,
  HeartHandshake,
  Home,
  Landmark,
  MapPin,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  CTASection,
  FeatureCard,
  NumberedList,
  PageHero,
  PageShell,
  SectionCard,
} from '../components/ui';
import Logo from '../components/Logo';

const DIAGNOSIS_POINTS = [
  { number: 1, content: 'We do not love ourselves in Nigeria.', highlight: true },
  {
    number: 2,
    content: 'To make this worse, we can become stubborn in wickedness when love is absent.',
    highlight: true,
  },
  {
    number: 3,
    content: 'The crisis begins at the family level. No home is above the need for repentance and change.',
    highlight: true,
  },
  {
    number: 4,
    content: 'Money and materialism have become the language of love in many homes.',
    highlight: true,
  },
  {
    number: 5,
    content: 'When love of money rules a heart, corruption, injustice, and every other evil can grow from it.',
    highlight: true,
  },
] as const;

const RESTORATION_POINTS = [
  {
    number: 1,
    content:
      'There is a thin line between love of God and love of money. You must work daily to stay on the side of God.',
  },
  {
    number: 2,
    content:
      '“For God so loved the world” includes every Nigerian without exception, tribe, class, or religion.',
  },
  {
    number: 3,
    content:
      'The idea of husband, wife, and family is from God. If family is healed, communities and institutions can also be healed.',
  },
  {
    number: 4,
    content:
      'The yellow card gives a practical language of love that can be learned, memorized, and lived in every home.',
  },
  {
    number: 5,
    content:
      'A family that truly practices the characteristics of love creates the kind of environment where blessing can grow.',
  },
  {
    number: 6,
    content:
      'When husbands, wives, parents, and children honor one another with God’s kind of love, they honor God Himself.',
  },
  {
    number: 7,
    content:
      'Loving and God-fearing homes produce a different kind of person, and that difference eventually touches society.',
  },
  {
    number: 8,
    content:
      'Whatever is truly good in a loving family will not stay inside the house alone; it will influence the community, worship space, and nation.',
  },
] as const;

const IMPACT_AREAS = [
  {
    title: 'Family life',
    description:
      'The first place Nigeria changes is the home. Marriage, parenting, and sibling relationships set the moral atmosphere for the future.',
    icon: <Home className="w-6 h-6" />,
    accentColor: 'red' as const,
  },
  {
    title: 'Community life',
    description:
      'A loving household produces people who are less likely to exploit neighbors and more likely to serve their communities with integrity.',
    icon: <Users className="w-6 h-6" />,
    accentColor: 'orange' as const,
  },
  {
    title: 'National life',
    description:
      'The tone of a nation is shaped by the people it raises. Heal the family, and leadership culture begins to change.',
    icon: <Landmark className="w-6 h-6" />,
    accentColor: 'yellow' as const,
  },
] as const;

const RESPONSE_LANES = [
  {
    title: 'Teach it at home',
    description:
      'Read the 17 characteristics of love in the family, memorize them together, and bring them into daily conduct.',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    title: 'Model it publicly',
    description:
      'Carry practical love into schools, workspaces, markets, churches, mosques, streets, and civic life.',
    icon: <MapPin className="w-5 h-5" />,
  },
  {
    title: 'Reproduce it consistently',
    description:
      'Use the yellow card and related materials to spread the message from one family to another, one community to another.',
    icon: <HeartHandshake className="w-5 h-5" />,
  },
] as const;

const EXAMPLES = [
  {
    name: 'Ngozi Okonjo-Iweala',
    role: 'Public leadership example',
    note:
      'A reminder that disciplined, principled formation can produce national and global impact.',
  },
  {
    name: 'Akinwumi Adesina',
    role: 'Institutional leadership example',
    note:
      'A reminder that healthy values and strong formation can shape service at the highest level.',
  },
] as const;

export default function LoveInNigeriaPage() {
  return (
    <PageShell
      className="bg-[radial-gradient(circle_at_top_left,_rgba(254,215,170,0.24),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(248,113,113,0.16),_transparent_34%),linear-gradient(180deg,_#fffaf5_0%,_#ffffff_48%,_#fff7ed_100%)]"
      containerClassName="py-16 section-gap"
    >
      <PageHero
        badge={
          <>
            <Logo className="w-4 h-4" />
            Love Ministry for Nigeria
          </>
        }
        icon={
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 text-white shadow-lg">
            <Building2 className="h-7 w-7" />
          </div>
        }
        title="Transforming Nigeria through practical love"
        subtitle="A national call to confront corruption at the root, restore the family as the training ground of character, and build a culture where God’s kind of love becomes visible in everyday Nigerian life."
        actions={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/yellow-card" className="btn-brand px-7 py-3">
              Get the yellow card
            </Link>
            <Link to="/characteristics" className="btn-outline-brand px-7 py-3">
              Start practicing love
            </Link>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">Root Issue</p>
            <p className="mt-2 text-lg font-semibold text-gray-900">Love replaced by materialism</p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">Starting Point</p>
            <p className="mt-2 text-lg font-semibold text-gray-900">Heal the family first</p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">Tool</p>
            <p className="mt-2 text-lg font-semibold text-gray-900">The 17 characteristics of love</p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">Goal</p>
            <p className="mt-2 text-lg font-semibold text-gray-900">Homes that bless the nation</p>
          </div>
        </div>
      </PageHero>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionCard className="border-red-100 bg-white/95 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            National Diagnosis
          </p>
          <h2 className="mt-2 text-3xl font-serif text-red-800">Where the crisis begins</h2>
          <p className="mt-3 leading-7 text-gray-700">
            This message is direct on purpose. A nation cannot heal what it refuses to name.
          </p>
          <div className="mt-6">
            <NumberedList items={[...DIAGNOSIS_POINTS]} />
          </div>
        </SectionCard>

        <SectionCard className="border-orange-200 bg-gradient-to-br from-orange-50 via-white to-red-50 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            Restoration Architecture
          </p>
          <h2 className="mt-2 text-3xl font-serif text-red-800">What changes everything</h2>
          <p className="mt-3 leading-7 text-gray-700">
            The answer is not vague sentiment. It is disciplined, repeatable, practical love
            anchored in God and worked out inside real homes.
          </p>
          <div className="mt-6">
            <NumberedList items={[...RESTORATION_POINTS]} />
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {IMPACT_AREAS.map(area => (
          <FeatureCard
            key={area.title}
            icon={area.icon}
            title={area.title}
            description={area.description}
            accentColor={area.accentColor}
          />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionCard className="border-orange-200 bg-white/95 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            Response Lanes
          </p>
          <h2 className="mt-2 text-3xl font-serif text-red-800">How the message should move</h2>
          <div className="mt-6 grid gap-4">
            {RESPONSE_LANES.map(lane => (
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
            Three-Part Summary
          </p>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-orange-200" />
                <h3 className="text-xl font-serif text-white">The problem</h3>
              </div>
              <p className="mt-3 leading-7 text-orange-100">
                Money and materialism have replaced real love in too many homes, and national life
                reflects that distortion.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <div className="flex items-center gap-3">
                <Logo className="h-5 w-5 text-orange-200" />
                <h3 className="text-xl font-serif text-white">The solution</h3>
              </div>
              <p className="mt-3 leading-7 text-orange-100">
                Replace love of money with the love of God, and train homes to live the 17
                characteristics of love every day.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-orange-200" />
                <h3 className="text-xl font-serif text-white">The promise</h3>
              </div>
              <p className="mt-3 leading-7 text-orange-100">
                A nation shaped by loving and God-fearing families will not stay broken forever.
                Blessing follows honor.
              </p>
            </div>
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionCard className="border-red-100 bg-gradient-to-br from-red-50 via-white to-orange-50 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            Leadership Examples
          </p>
          <h2 className="mt-2 text-3xl font-serif text-red-800">Why formation matters</h2>
          <p className="mt-3 leading-7 text-gray-700">
            The page’s core idea is that what is cultivated in a family eventually appears in
            public life. Strong formation produces visible impact.
          </p>
          <div className="mt-6 grid gap-4">
            {EXAMPLES.map(example => (
              <div key={example.name} className="rounded-2xl border border-white/80 bg-white/90 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
                  {example.role}
                </p>
                <h3 className="mt-2 text-xl font-serif text-gray-900">{example.name}</h3>
                <p className="mt-3 leading-7 text-gray-700">{example.note}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard className="border-orange-200 bg-white/95 shadow-lg text-center">
          <Sparkles className="mx-auto h-12 w-12 text-red-600" />
          <blockquote className="mt-6 text-2xl font-serif italic leading-relaxed text-gray-900 md:text-3xl">
            &quot;For God so loved the world that He gave His only begotten Son, that whoever
            believes in Him should not perish but have everlasting life.&quot;
          </blockquote>
          <cite className="mt-5 block text-lg font-medium text-red-700">John 3:16</cite>
          <p className="mx-auto mt-6 max-w-2xl leading-7 text-gray-700">
            This message is universal and practical. It includes every Nigerian, and it calls every
            family to become a place where that love is translated into daily conduct.
          </p>
        </SectionCard>
      </section>

      <CTASection
        title="Start the transformation where it actually begins"
        description="Begin inside the home, practice the 17 characteristics of love, and let that discipline move outward into the community and the nation."
        primaryAction={{ label: 'Get Your Yellow Card', href: '/yellow-card' }}
        secondaryAction={{ label: 'Read 50 Love Passages', href: '/bible-passages' }}
      />
    </PageShell>
  );
}
