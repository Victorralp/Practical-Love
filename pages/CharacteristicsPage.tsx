import { useMemo, useState } from 'react';
import {
  Anchor,
  Bird,
  BookOpen,
  Check,
  Clock,
  Crown,
  Gift,
  Handshake,
  Infinity,
  Lock,
  Scale,
  Shield,
  Smile,
  Sparkles,
  Sprout,
  Star,
  Sun,
  User,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CTASection, FeatureCard, PageHero, PageShell, SectionCard } from '../components/ui';
import Logo from '../components/Logo';
import LoveSelfAssessment from '../components/LoveSelfAssessment';

const CHARACTERISTICS = [
  {
    num: 1,
    icon: <Clock className="w-6 h-6" />,
    text: 'Love endures long and is patient',
    category: 'positive',
    shortText: 'Patient',
  },
  {
    num: 2,
    icon: <Logo className="w-6 h-6" />,
    text: 'Love is kind',
    category: 'positive',
    shortText: 'Kind',
  },
  {
    num: 3,
    icon: <Bird className="w-6 h-6" />,
    text: 'Love is never envious or boils over with jealousy',
    category: 'guardrail',
    shortText: 'Not Envious',
  },
  {
    num: 4,
    icon: <Scale className="w-6 h-6" />,
    text: 'Love is not boastful or vainglorious',
    category: 'guardrail',
    shortText: 'Not Boastful',
  },
  {
    num: 5,
    icon: <Handshake className="w-6 h-6" />,
    text: 'Love does not display itself haughtily',
    category: 'guardrail',
    shortText: 'Not Proud',
  },
  {
    num: 6,
    icon: <Crown className="w-6 h-6" />,
    text: 'Love is not conceited, arrogant, or inflated with pride',
    category: 'guardrail',
    shortText: 'Not Conceited',
  },
  {
    num: 7,
    icon: <Sparkles className="w-6 h-6" />,
    text: 'Love is not rude and does not act unbecomingly',
    category: 'guardrail',
    shortText: 'Not Rude',
  },
  {
    num: 8,
    icon: <Zap className="w-6 h-6" />,
    text: 'Love does not insist on its own rights or its own way, for it is not self-seeking',
    category: 'guardrail',
    shortText: 'Not Self-Seeking',
  },
  {
    num: 9,
    icon: <Shield className="w-6 h-6" />,
    text: 'Love is not touchy, fretful, or resentful',
    category: 'guardrail',
    shortText: 'Not Resentful',
  },
  {
    num: 10,
    icon: <Sun className="w-6 h-6" />,
    text: 'Love takes no account of the evil done to it',
    category: 'guardrail',
    shortText: 'Forgives',
  },
  {
    num: 11,
    icon: <Star className="w-6 h-6" />,
    text: 'Love does not rejoice at injustice and unrighteousness',
    category: 'guardrail',
    shortText: 'Hates Injustice',
  },
  {
    num: 12,
    icon: <Anchor className="w-6 h-6" />,
    text: 'Love rejoices when right and truth prevail',
    category: 'positive',
    shortText: 'Loves Truth',
  },
  {
    num: 13,
    icon: <Smile className="w-6 h-6" />,
    text: 'Love bears up under anything and everything that comes',
    category: 'positive',
    shortText: 'Bears All',
  },
  {
    num: 14,
    icon: <Gift className="w-6 h-6" />,
    text: 'Love is ever ready to believe the best of every person',
    category: 'positive',
    shortText: 'Believes Best',
  },
  {
    num: 15,
    icon: <Sprout className="w-6 h-6" />,
    text: "Love's hopes are fadeless under all circumstances",
    category: 'positive',
    shortText: 'Always Hopes',
  },
  {
    num: 16,
    icon: <Lock className="w-6 h-6" />,
    text: 'Love endures everything without weakening',
    category: 'positive',
    shortText: 'Endures All',
  },
  {
    num: 17,
    icon: <Infinity className="w-6 h-6" />,
    text: 'Love never fails, never fades out, or becomes obsolete',
    category: 'positive',
    shortText: 'Never Fails',
  },
] as const;

const PRACTICE_STEPS = [
  {
    title: 'Read one characteristic aloud',
    description: 'Slow the page down and let one line become your focus for the day.',
    accentColor: 'red' as const,
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    title: 'Test it in relationships',
    description: 'Ask how that characteristic should shape your speech, pace, tone, and reactions.',
    accentColor: 'orange' as const,
    icon: <User className="w-6 h-6" />,
  },
  {
    title: 'Repeat until it becomes habit',
    description: 'Use the yellow card and challenge flow so the words become daily behavior.',
    accentColor: 'yellow' as const,
    icon: <Check className="w-6 h-6" />,
  },
] as const;

export default function CharacteristicsPage() {
  const [userName, setUserName] = useState('');
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number>(1);

  const selectedCharacteristic =
    CHARACTERISTICS.find(item => item.num === selectedCard) ?? CHARACTERISTICS[0];

  const displayText = (text: string) => {
    if (isPersonalized && userName.trim()) {
      return text.replace(/Love/g, userName.trim());
    }
    return text;
  };

  const positiveTraits = useMemo(
    () => CHARACTERISTICS.filter(item => item.category === 'positive'),
    []
  );
  const guardrailTraits = useMemo(
    () => CHARACTERISTICS.filter(item => item.category === 'guardrail'),
    []
  );

  return (
    <PageShell
      className="bg-[radial-gradient(circle_at_top_left,_rgba(254,215,170,0.24),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(248,113,113,0.16),_transparent_34%),linear-gradient(180deg,_#fffaf5_0%,_#ffffff_48%,_#fff7ed_100%)]"
      containerClassName="py-16 section-gap"
    >
      <PageHero
        badge={
          <>
            <BookOpen className="w-4 h-4" />
            1 Corinthians 13:4-8
          </>
        }
        icon={
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 text-white shadow-lg">
            <Logo className="h-7 w-7" />
          </div>
        }
        title="The 17 Characteristics of Love"
        subtitle="Love is not vague feeling. It is a visible pattern of behavior that can be studied, practiced, measured, and carried into the home, the community, and the nation."
        actions={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/love-challenge" className="btn-brand px-7 py-3">
              Start the 30-day challenge
            </Link>
            <Link to="/yellow-card" className="btn-outline-brand px-7 py-3">
              Get the yellow card
            </Link>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">Total</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">17 traits</p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">Positive</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{positiveTraits.length}</p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">Guardrails</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{guardrailTraits.length}</p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">Use</p>
            <p className="mt-2 text-lg font-semibold text-gray-900">Daily self-examination</p>
          </div>
        </div>
      </PageHero>

      <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <SectionCard className="border-red-100 bg-white/95 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            Personalization Studio
          </p>
          <h2 className="mt-2 text-3xl font-serif text-red-800">Put your name inside the passage</h2>
          <p className="mt-3 leading-7 text-gray-700">
            Replace the word &ldquo;Love&rdquo; with your own name to turn the passage into a mirror.
            The goal is not decoration. The goal is conviction and practice.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 to-white p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Personal mode</p>
                <p className="text-sm text-gray-600">Read the characteristics as a self-test, not just a definition.</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="Enter your name..."
                value={userName}
                onChange={event => setUserName(event.target.value)}
                className="flex-1 rounded-2xl border border-orange-100 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="button"
                onClick={() => setIsPersonalized(prev => !prev)}
                className={`inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold transition ${
                  isPersonalized
                    ? 'bg-red-700 text-white hover:bg-red-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isPersonalized ? <Check className="h-4 w-4" /> : null}
                {isPersonalized ? 'Applied' : 'Apply'}
              </button>
            </div>

            <div className="rounded-[1.75rem] border border-orange-100 bg-gradient-to-br from-red-50 via-white to-orange-50 p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">
                Sample preview
              </p>
              <p className="mt-4 text-xl font-serif leading-relaxed text-gray-900">
                {displayText(selectedCharacteristic.text)}
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard className="border-orange-200 bg-gradient-to-br from-orange-50 via-white to-red-50 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            Characteristic Focus
          </p>
          <div className="mt-4 rounded-[1.75rem] border border-white/80 bg-white/90 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                  selectedCharacteristic.category === 'positive'
                    ? 'bg-amber-100 text-orange-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {selectedCharacteristic.icon}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
                  Characteristic {selectedCharacteristic.num}
                </p>
                <h2 className="mt-2 text-3xl font-serif text-gray-900">
                  {selectedCharacteristic.shortText}
                </h2>
                <p className="mt-4 leading-8 text-gray-700">
                  {displayText(selectedCharacteristic.text)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-orange-100 bg-white/90 p-4">
              <p className="text-sm font-semibold text-orange-700">Category</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                {selectedCharacteristic.category === 'positive'
                  ? 'What love actively does'
                  : 'What love refuses to become'}
              </p>
            </div>
            <div className="rounded-2xl border border-orange-100 bg-white/90 p-4">
              <p className="text-sm font-semibold text-orange-700">Application</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                Ask where this should shape your conduct today
              </p>
            </div>
          </div>
        </SectionCard>
      </section>

      <LoveSelfAssessment />

      <SectionCard className="border-red-100 bg-white/95 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Full Reference Grid
            </p>
            <h2 className="mt-2 text-3xl font-serif text-red-800">Study all 17 characteristics</h2>
            <p className="mt-3 max-w-3xl leading-7 text-gray-700">
              Select any card to make it the active focus above. This grid is meant to feel like a
              reference wall you can return to often.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {CHARACTERISTICS.map(item => (
            <button
              key={item.num}
              type="button"
              onClick={() => setSelectedCard(item.num)}
              className={`group relative rounded-2xl border p-6 text-left transition-all duration-200 ${
                item.category === 'positive'
                  ? 'border-amber-200 bg-gradient-to-br from-orange-50 to-white hover:border-amber-300'
                  : 'border-red-200 bg-gradient-to-br from-red-50 to-white hover:border-red-300'
              } ${
                selectedCard === item.num ? 'ring-2 ring-red-500 shadow-lg' : 'hover:-translate-y-0.5 hover:shadow-md'
              }`}
            >
              <span className="absolute right-4 top-4 text-xs font-bold uppercase tracking-[0.16em] text-orange-400">
                #{item.num}
              </span>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  item.category === 'positive'
                    ? 'bg-amber-100 text-orange-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {item.icon}
              </div>

              <h3 className="mt-5 text-xl font-serif text-gray-900">{item.shortText}</h3>
              <p className="mt-3 leading-7 text-gray-700">{displayText(item.text)}</p>

              <span
                className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  item.category === 'positive'
                    ? 'bg-amber-100 text-orange-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {item.category === 'positive' ? 'Positive trait' : 'Protective guardrail'}
              </span>
            </button>
          ))}
        </div>
      </SectionCard>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <SectionCard className="border-orange-200 bg-white/95 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            Summary Rails
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-orange-700">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-serif text-gray-900">What love does</h3>
              </div>
              <ul className="mt-5 space-y-2 text-sm leading-7 text-gray-700">
                {positiveTraits.map(item => (
                  <li key={item.num}>
                    <span className="font-semibold text-orange-700">{item.num}.</span> {item.shortText}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-red-200 bg-gradient-to-br from-red-50 to-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-700">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-serif text-gray-900">What love avoids</h3>
              </div>
              <ul className="mt-5 space-y-2 text-sm leading-7 text-gray-700">
                {guardrailTraits.map(item => (
                  <li key={item.num}>
                    <span className="font-semibold text-red-700">{item.num}.</span> {item.shortText}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionCard>

        <SectionCard className="border-red-100 bg-gradient-to-br from-red-50 via-white to-orange-50 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            Practice Path
          </p>
          <h2 className="mt-2 text-3xl font-serif text-red-800">Turn the list into a life rhythm</h2>
          <div className="mt-6 grid gap-4">
            {PRACTICE_STEPS.map(step => (
              <FeatureCard
                key={step.title}
                icon={step.icon}
                title={step.title}
                description={step.description}
                accentColor={step.accentColor}
                className="hover:translate-y-0"
              />
            ))}
          </div>
        </SectionCard>
      </section>

      <CTASection
        title="Practice the characteristics until they become your language"
        description="Memorize them, test them in family life, and use the challenge plus the yellow card to keep practical love in front of you daily."
        primaryAction={{ label: 'Start the 30-Day Challenge', href: '/love-challenge' }}
        secondaryAction={{ label: 'Get the Yellow Card', href: '/yellow-card' }}
      />
    </PageShell>
  );
}
