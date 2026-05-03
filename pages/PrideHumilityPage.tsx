import {
  ArrowRight,
  HeartHandshake,
  Scale,
  ShieldCheck,
  Sprout,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PrideHumilityDiagram from '../components/PrideHumilityDiagram';
import { CTASection, PageHero, PageShell, SectionCard } from '../components/ui';

const PRIDE_HIDES = [
  {
    title: 'Always defending yourself',
    body: 'Pride makes correction feel like an attack, even when truth is trying to help.',
  },
  {
    title: 'Needing to be noticed',
    body: 'Pride can serve loudly because it wants applause more than love.',
  },
  {
    title: 'Refusing to apologize plainly',
    body: 'Pride says sorry with excuses. Humility says, “I was wrong.”',
  },
  {
    title: 'Looking down on others',
    body: 'Pride measures people from above. Love chooses honor from beside them.',
  },
] as const;

const HEART_TEST = [
  'Do I become angry when someone corrects me?',
  'Do I blame people before I examine myself?',
  'Can I apologize without explaining myself away?',
  'Do I secretly enjoy feeling better than others?',
  'Do I listen when my family tells me the truth?',
  'Do I depend on God, or only on my own strength?',
] as const;

const WAY_BACK = [
  {
    label: 'Notice it',
    body: 'Pay attention to the moment your heart becomes defensive, harsh, or superior.',
  },
  {
    label: 'Name it',
    body: 'Call pride what it is. Do not dress it up as wisdom, strength, or confidence.',
  },
  {
    label: 'Confess it',
    body: 'Bring it to God quickly, then make peace with the person affected where needed.',
  },
  {
    label: 'Practice humility',
    body: 'Receive correction, serve quietly, honor others, and keep choosing love.',
  },
] as const;

export default function PrideHumilityPage() {
  return (
    <PageShell>
      <PageHero
        badge={
          <>
            <Scale className="h-4 w-4" />
            Pride and humility
          </>
        }
        icon={
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-[#5f2116] via-[#9a3c22] to-[#d27a3f] text-white shadow-lg">
            <HeartHandshake className="h-7 w-7" />
          </div>
        }
        title="The hidden battle of the heart"
        subtitle="Pride closes the heart. Humility opens it to God, correction, love, and peace. This page is a gentle mirror for anyone who wants practical love to become real."
        actions={
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#heart-check" className="btn-brand px-7 py-3">
              Examine my heart
            </a>
            <a href="#way-back" className="btn-outline-brand px-7 py-3">
              Choose humility
            </a>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="surface-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">
              Pride
            </p>
            <p className="mt-2 text-lg font-semibold text-[#3d1d17]">
              Turns the heart inward.
            </p>
          </div>
          <div className="surface-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">
              Humility
            </p>
            <p className="mt-2 text-lg font-semibold text-[#3d1d17]">
              Makes the heart teachable.
            </p>
          </div>
          <div className="surface-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">
              Love
            </p>
            <p className="mt-2 text-lg font-semibold text-[#3d1d17]">
              Grows where pride is confessed.
            </p>
          </div>
        </div>
      </PageHero>

      <SectionCard id="heart-check">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">
          Heart diagram
        </p>
        <h2 className="mt-2 font-serif text-3xl text-[#3d1d17]">
          Pride and humility often show themselves in ordinary reactions.
        </h2>
        <p className="mt-4 max-w-3xl leading-8 text-[#6e4737]">
          The goal is not shame. The goal is truth. When the heart becomes honest, love has room to
          grow.
        </p>

        <PrideHumilityDiagram />
      </SectionCard>

      <section className="grid gap-6 lg:grid-cols-[0.98fr_1.02fr]">
        <SectionCard variant="gradient">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f3dfcb] text-[#9d4b2a]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">
                How pride hides
              </p>
              <h2 className="mt-2 font-serif text-3xl text-[#3d1d17]">
                Pride does not always look loud.
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {PRIDE_HIDES.map(item => (
              <div
                key={item.title}
                className="rounded-[1.5rem] border border-[rgba(176,111,74,0.16)] bg-white/82 p-5"
              >
                <h3 className="font-serif text-2xl text-[#3d1d17]">{item.title}</h3>
                <p className="mt-2 leading-7 text-[#6e4737]">{item.body}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">
            A simple heart test
          </p>
          <h2 className="mt-2 font-serif text-3xl text-[#3d1d17]">
            Ask these questions slowly, without defending yourself.
          </h2>

          <div className="mt-6 grid gap-3">
            {HEART_TEST.map((question, index) => (
              <div
                key={question}
                className="rounded-[1.35rem] border border-[rgba(176,111,74,0.16)] bg-[linear-gradient(135deg,_rgba(255,255,255,0.9)_0%,_rgba(248,238,227,0.96)_100%)] p-4"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3dfcb] text-sm font-semibold text-[#9d4b2a]">
                    {index + 1}
                  </div>
                  <p className="leading-7 text-[#6e4737]">{question}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <SectionCard id="way-back" variant="dark">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffd2af]">
          The way back
        </p>
        <h2 className="mt-2 font-serif text-3xl text-white">
          Humility is practiced one honest step at a time.
        </h2>
        <p className="mt-4 max-w-3xl leading-8 text-[#fff1e3] opacity-85">
          Think of it like opening a locked room. You do not tear the whole house down. You turn the
          key, open the door, let light in, and clean what has been hidden.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {WAY_BACK.map((step, index) => (
            <div
              key={step.label}
              className="rounded-[1.5rem] border border-white/14 bg-white/8 p-5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-[#ffd2af]">
                {index + 1}
              </div>
              <h3 className="mt-5 font-serif text-2xl text-white">{step.label}</h3>
              <p className="mt-3 text-sm leading-6 text-[#fff1e3] opacity-85">{step.body}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a45f3c]">
              Scripture direction
            </p>
            <h2 className="mt-2 font-serif text-3xl text-[#3d1d17]">
              Love becomes practical when the heart becomes teachable.
            </h2>
            <p className="mt-4 max-w-3xl leading-8 text-[#6e4737]">
              Pride makes a person hard to correct. Humility makes correction useful. This is why
              practical love must deal with the heart, not only outward behavior.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-[rgba(176,111,74,0.16)] bg-[linear-gradient(135deg,_rgba(255,255,255,0.92)_0%,_rgba(248,238,227,0.96)_100%)] p-6">
            <Sprout className="h-8 w-8 text-[#9d4b2a]" />
            <blockquote className="mt-5 font-serif text-2xl leading-relaxed text-[#3d1d17]">
              The humble heart can be shaped. The proud heart keeps explaining why it should not
              change.
            </blockquote>
          </div>
        </div>
      </SectionCard>

      <CTASection
        title="Let humility make room for practical love"
        description="Study the characteristics of love, practice the daily challenge, and keep returning to the heart until love becomes visible."
        primaryAction={{ label: 'Study the 17 characteristics', href: '/characteristics' }}
        secondaryAction={{ label: 'Start the 30 day challenge', href: '/love-challenge' }}
      />

      <div className="flex justify-center">
        <Link
          to="/family-first"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#9d4b2a]"
        >
          Return to Family First
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </PageShell>
  );
}
