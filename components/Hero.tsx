import { useEffect, useRef } from 'react';
import { animate, createTimeline, stagger } from 'animejs';
import EmberParticles from './EmberParticles';
import ScriptureMirror from './ScriptureMirror';
import PrayerPause from './PrayerPause';
import TestimonyHeartbeat from './TestimonyHeartbeat';
import LoveLetterToYou from './LoveLetterToYou';
import TheWeightOfWords from './TheWeightOfWords';
import AltarCall from './AltarCall';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  BookHeart,
  BookOpen,
  Camera,
  Globe,
  HandHeart,
  House,
  Mail,
  MoveRight,
  PlayCircle,
  Quote,
  ScrollText,
  Sparkles,
  SunMedium,
  Target,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { STARTING_POINTS, TODAY_LOVE_PRACTICES } from './homeContent';

const IMPACT_SIGNALS = [
  { label: '17 characteristics', value: 'A visible pattern of love you can practice at home.' },
  {
    label: '30 day challenge',
    value: 'A disciplined rhythm for hearts that want change, not hype.',
  },
  { label: 'Nationwide burden', value: 'Heal the family first, then watch communities change.' },
] as const;

const PILLARS: Array<{
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    step: '01',
    title: 'Start where pretending cannot survive',
    description:
      'Transformation begins at the family level, where words, habits, and private behavior are impossible to fake for long.',
    icon: House,
  },
  {
    step: '02',
    title: 'Speak scripture until it becomes personal',
    description:
      'Put your name inside 1 Corinthians 13 and let the standard of love expose what must change in you first.',
    icon: ScrollText,
  },
  {
    step: '03',
    title: 'Train love like a daily discipline',
    description:
      'Love is not vague inspiration. It is patience, kindness, restraint, humility, honesty, and courage practiced repeatedly.',
    icon: HandHeart,
  },
  {
    step: '04',
    title: 'Send the change outward',
    description:
      'Homes formed by practical love raise different children, shape different leaders, and eventually influence the nation.',
    icon: Globe,
  },
] as const;

const ROUTES: Array<{
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: LucideIcon;
}> = [
  {
    title: 'The 17 characteristics of love',
    description:
      'Study the pattern of biblical love until it becomes visible in speech, attitude, and action.',
    href: '/characteristics',
    cta: 'Study the pattern',
    icon: BookOpen,
  },
  {
    title: 'Bible passages for daily renewal',
    description:
      'Walk through scriptural anchors that keep love from turning into sentiment or empty language.',
    href: '/bible-passages',
    cta: 'Read the passages',
    icon: BookHeart,
  },
  {
    title: 'The Yellow Card movement',
    description:
      'Carry the message in a practical format you can remember, share, and return to during pressure.',
    href: '/yellow-card-series',
    cta: 'Get the yellow card',
    icon: BadgeCheck,
  },
  {
    title: 'A guided love challenge',
    description:
      'Build a daily rhythm with reflection, accountability, and applied acts of love in real life.',
    href: '/love-challenge',
    cta: 'Enter the challenge',
    icon: Target,
  },
] as const;



const VISITOR_GUIDES: Array<{
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: LucideIcon;
}> = [
  {
    title: 'Learn what this ministry is about',
    description:
      'Read the mission, vision, and scriptural foundation behind Practical Love and why the home is the starting point.',
    href: '/mission-vision',
    cta: 'Learn more',
    icon: Sparkles,
  },
  {
    title: 'Follow the teaching messages',
    description:
      'Move through the yellow card series, Bible passages, and publications to keep the message active in daily life.',
    href: '/yellow-card-series',
    cta: 'Read messages',
    icon: PlayCircle,
  },
  {
    title: 'Reach the ministry directly',
    description:
      'Use the contact page for prayer requests, partnership discussions, testimonies, and ministry questions.',
    href: '/contact',
    cta: 'Contact',
    icon: Mail,
  },
] as const;

const RECENT_ACTIVITY = [
  {
    label: 'Recent teaching',
    title: 'Yellow Card Series',
    description:
      'A practical sequence for learning, remembering, and sharing the standard of love.',
    href: '/yellow-card-series',
    imageSrc: '/screencapture-127-0-0-1-3000-yellow-card-series-2026-02-21-13_26_48.png',
  },
  {
    label: 'Recent growth tool',
    title: '30 Day Love Challenge',
    description:
      'A guided rhythm of reflection, action, and accountability for households that want change.',
    href: '/love-challenge',
    imageSrc: '/screencapture-127-0-0-1-3000-love-challenge-2026-02-21-15_26_08.png',
  },
  {
    label: 'Recent study path',
    title: 'Bible Passages',
    description:
      'Scripture-based teaching that keeps the ministry rooted in God’s word rather than sentiment.',
    href: '/bible-passages',
    imageSrc: '/screencapture-127-0-0-1-3000-bible-passages-2026-02-21-13_25_43.png',
  },
] as const;

export default function Hero() {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revertibles: Array<{ revert: () => void }> = [];
    const revealGroups = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal-group]'));
    const pushAnimation = (target: Element | null, animation: Parameters<typeof animate>[1]) => {
      if (!target) {
        return;
      }

      revertibles.push(animate(target, animation));
    };

    const showImmediately = () => {
      root.querySelectorAll<HTMLElement>('.hero-line, .reveal-item').forEach(element => {
        element.classList.add('is-visible');
        element.style.opacity = '1';
        element.style.transform = 'none';
      });
    };

    if (prefersReducedMotion) {
      showImmediately();
      return;
    }

    const introTimeline = createTimeline({
      defaults: {
        duration: 1100,
        ease: 'spring(1, 82, 12, 0)',
      },
    });

    introTimeline
      .add(root.querySelectorAll('.ambient-orb'), {
        opacity: [0, 1],
        scale: [0.72, 1],
        delay: stagger(140),
        duration: 1500,
      })
      .add(
        root.querySelectorAll('[data-hero-badge]'),
        {
          opacity: [0, 1],
          y: [24, 0],
          scale: [0.95, 1],
          duration: 800,
        },
        120
      )
      .add(
        root.querySelectorAll('.hero-line'),
        {
          opacity: [0, 1],
          y: [56, 0],
          delay: stagger(130),
          duration: 1000,
        },
        '-=640'
      )
      .add(
        root.querySelectorAll('[data-hero-copy]'),
        {
          opacity: [0, 1],
          y: [26, 0],
          delay: stagger(120),
          duration: 860,
        },
        '-=760'
      )
      .add(
        root.querySelectorAll('[data-hero-panel]'),
        {
          opacity: [0, 1],
          y: [42, 0],
          scale: [0.96, 1],
          delay: stagger(120),
          duration: 980,
        },
        '-=840'
      );

    revertibles.push(introTimeline);

    pushAnimation(root.querySelector('.ambient-orb-a'), {
      x: [0, 42],
      y: [0, -34],
      scale: [1, 1.1],
      duration: 4200,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    });
    pushAnimation(root.querySelector('.ambient-orb-b'), {
      x: [0, -48],
      y: [0, 28],
      scale: [1.08, 0.94],
      duration: 5600,
      ease: 'inOutQuad',
      loop: true,
      alternate: true,
    });
    pushAnimation(root.querySelector('.ambient-orb-c'), {
      x: [0, 26],
      y: [0, 18],
      scale: [0.96, 1.12],
      duration: 5100,
      ease: 'inOutQuad',
      loop: true,
      alternate: true,
    });
    pushAnimation(root.querySelector('[data-float-panel]'), {
      y: [0, -14],
      rotate: [0, -1.25],
      duration: 5200,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    });

    revertibles.push(
      animate(root.querySelectorAll('[data-floating-chip]'), {
        y: [0, -10],
        duration: 2400,
        delay: stagger(180),
        ease: 'inOutSine',
        loop: true,
        alternate: true,
      })
    );

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            return;
          }

          const group = entry.target as HTMLElement;

          if (group.dataset.revealed === 'true') {
            observer.unobserve(group);
            return;
          }

          group.dataset.revealed = 'true';

          const items = group.querySelectorAll<HTMLElement>('[data-reveal-item]');

          const revealAnimation = animate(items, {
            opacity: [0, 1],
            y: [36, 0],
            scale: [0.97, 1],
            delay: stagger(110),
            duration: 920,
            ease: 'spring(1, 80, 10, 0)',
            onComplete: () => {
              items.forEach(item => item.classList.add('is-visible'));
            },
          });

          revertibles.push(revealAnimation);
          observer.unobserve(group);
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    revealGroups.forEach(group => observer.observe(group));

    return () => {
      observer.disconnect();
      revertibles.forEach(item => item.revert());
    };
  }, []);

  return (
    <div ref={rootRef} className="relative overflow-hidden bg-[#f6eadb] text-[#2a1712]">
      <section className="texture-noise warm-grid relative isolate overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,244,234,0.42),_transparent_24%),linear-gradient(150deg,_#2f1713_0%,_#5f2116_34%,_#8e331f_68%,_#d27a3f_100%)] px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
        <div className="ambient-orb ambient-orb-a absolute left-[-8%] top-[10%] h-72 w-72 rounded-full bg-[#ffd9a6]/18 blur-3xl" />
        <div className="ambient-orb ambient-orb-b absolute right-[-4%] top-[18%] h-96 w-96 rounded-full bg-[#f3a061]/18 blur-3xl" />
        <div className="ambient-orb ambient-orb-c absolute bottom-[-8%] left-[34%] h-80 w-80 rounded-full bg-[#fff1df]/10 blur-3xl" />
        <EmberParticles />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="max-w-4xl pt-10 lg:pt-16">
              <div
                data-hero-badge
                className="pill glass-border inline-flex items-center gap-2 bg-white/10 text-[#fff3e7]"
              >
                <Logo className="h-4 w-4" />
                Practical Love for homes, churches, and communities that want reform.
              </div>

              <div className="mt-7 space-y-2 text-[#fff6ec]">
                <div className="hero-line font-serif text-[clamp(3.6rem,10vw,7.4rem)] leading-[0.86] tracking-[-0.04em]">
                  Come home
                </div>
                <div className="hero-line font-serif text-[clamp(3.4rem,9vw,6.8rem)] leading-[0.88] tracking-[-0.04em] text-[#ffd8bb]">
                  to practical
                </div>
                <div className="hero-line font-serif text-[clamp(3.8rem,11vw,8.2rem)] leading-[0.82] tracking-[-0.05em]">
                  love
                </div>
              </div>

              <p
                data-hero-copy
                className="reveal-item mt-8 max-w-2xl text-lg leading-8 text-[#fff0e3] opacity-90 md:text-xl"
              >
                Welcome to Practical Love, a Christian ministry for individuals, families, churches,
                and communities who want to practice biblical love in everyday life. Here you will
                find scripture, teaching resources, practical challenges, and direct ways to stay
                connected to the ministry.
              </p>

              <p
                data-hero-copy
                className="reveal-item mt-5 max-w-2xl text-base leading-7 text-[#ffe7d3] opacity-80"
              >
                Behind the hustle, status, and survival instinct, many homes are carrying silent
                exhaustion. Practical Love exists to move people from rhetoric into a disciplined,
                biblical pattern of love that restores the family and reaches the nation.
              </p>

              <div data-hero-copy className="reveal-item mt-10 flex flex-col gap-4 lg:flex-row">
                <button
                  onClick={() => navigate('/mission-vision')}
                  className="btn-brand group px-8 py-4 text-base md:text-lg"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <Link
                  to="/messages"
                  className="btn-outline-light group px-8 py-4 text-base md:text-lg"
                >
                  Read messages
                  <MoveRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/contact"
                  className="btn-outline-light group px-8 py-4 text-base md:text-lg"
                >
                  Contact
                  <MoveRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              <div data-hero-copy className="reveal-item mt-12 grid gap-3 sm:grid-cols-3">
                {IMPACT_SIGNALS.map(signal => (
                  <div
                    key={signal.label}
                    className="glass-border rounded-[1.5rem] bg-white/8 p-4 text-[#fff3e7]"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ffcfa8]">
                      {signal.label}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[#fff3e7] opacity-80">
                      {signal.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:pt-10">
              <div
                data-hero-panel
                data-float-panel
                className="editorial-panel reveal-item mx-auto max-w-[34rem] p-4 sm:p-5"
              >
                <div className="overflow-hidden rounded-[1.6rem] border border-white/10">
                  <img
                    src="/love-hero-v2.png"
                    alt="Family embracing in warm light"
                    className="h-[28rem] w-full object-cover sm:h-[34rem]"
                  />
                </div>

                <div className="grid gap-3 p-3 sm:grid-cols-[1.15fr_0.85fr]">
                  <div className="rounded-[1.35rem] bg-[#1f0f0b]/48 p-5 text-[#fff3e7]">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffca9e]">
                      Daily whisper
                    </p>
                    <p className="mt-3 font-serif text-3xl leading-none">
                      &quot;I am patient. I am kind.&quot;
                    </p>
                    <p className="mt-4 text-sm leading-6 text-[#fff3e7] opacity-80">
                      Put your name into the text until love stops being poetry and becomes a
                      mirror.
                    </p>
                  </div>

                  <div className="rounded-[1.35rem] bg-white/10 p-5 text-[#fff3e7]">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffca9e]">
                      Starting point
                    </p>
                    <p className="mt-3 text-lg font-semibold">The family level.</p>
                    <p className="mt-3 text-sm leading-6 text-[#fff3e7] opacity-80">
                      Where private conduct, marriage, parenting, and tone reveal what truly rules a
                      heart.
                    </p>
                  </div>
                </div>
              </div>

              <div
                data-hero-panel
                data-floating-chip
                className="reveal-item glass-border absolute -left-12 top-14 hidden max-w-[12rem] rounded-[1.5rem] bg-[#fff5ea]/92 p-4 text-[#5b2d21] shadow-[0_24px_48px_rgba(39,18,12,0.22)] min-[1680px]:block"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f6dfc6]">
                    <SunMedium className="h-5 w-5 text-[#9d4a27]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b55b32]">
                      Hidden burden
                    </p>
                    <p className="mt-1 text-sm leading-5">
                      Homes look fine in public while breaking quietly in private.
                    </p>
                  </div>
                </div>
              </div>

              <div
                data-hero-panel
                data-floating-chip
                className="reveal-item glass-border absolute -bottom-4 -right-10 hidden max-w-[13rem] rounded-[1.5rem] bg-[#20100c]/74 p-4 text-[#fff6eb] shadow-[0_24px_48px_rgba(39,18,12,0.28)] min-[1680px]:block"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffca9e]">
                  Mission pulse
                </p>
                <p className="mt-3 text-lg font-semibold">Heal the home. Raise the standard.</p>
                <p className="mt-3 text-sm leading-6 text-[#fff6eb] opacity-80">
                  The nation feels whatever the family rehearses long enough.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div
          className="mx-auto max-w-7xl rounded-[2rem] border border-[rgba(176,111,74,0.16)] bg-[linear-gradient(135deg,_rgba(255,255,255,0.92)_0%,_rgba(248,238,227,0.96)_100%)] p-6 shadow-[0_24px_48px_rgba(95,53,30,0.08)] md:p-8"
          data-reveal-group
        >
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div data-reveal-item className="reveal-item">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b76840]">
                Today's love practice
              </p>
              <h2 className="mt-3 max-w-xl font-serif text-4xl leading-[0.94] text-[#341a15] md:text-5xl">
                Let the message become one small action.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#6e4737]">
                Practical Love becomes real when a visitor leaves with something clear to practice
                before the day ends.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {TODAY_LOVE_PRACTICES.map((practice, index) => (
                <div
                  key={practice}
                  data-reveal-item
                  className="reveal-item rounded-[1.5rem] border border-[rgba(176,111,74,0.14)] bg-white/82 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3dfcb] text-sm font-semibold text-[#9d4b2a]">
                    {index + 1}
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-6 text-[#3d1d17]">
                    {practice}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ScriptureMirror />

      <LoveLetterToYou />

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div
          className="mx-auto grid max-w-7xl gap-6 lg:items-start lg:grid-cols-[0.96fr_1.04fr]"
          data-reveal-group
        >
          <div
            data-reveal-item
            className="reveal-item surface relative overflow-hidden bg-[linear-gradient(145deg,_#f6ede1_0%,_#fff8f1_52%,_#f2e2ce_100%)] p-8 md:p-10"
          >
            <div className="absolute right-6 top-6 rounded-full bg-[#fff1df] p-3 text-[#9c4f2d]">
              <Quote className="h-5 w-5" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ab603c]">
              A direct word
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-[0.92] text-[#3e1e17] md:text-5xl">
              Love must become a household culture, not a public performance.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6b4332]">
              The crisis is not only political or economic. It is moral, relational, and domestic.
              Homes teach a language long before society hears it out loud.
            </p>
          </div>

        </div>
      </section>

      <TestimonyHeartbeat />

      <TheWeightOfWords />

      <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl" data-reveal-group>
          <div
            data-reveal-item
            className="reveal-item mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b76840]">
                Choose your starting point
              </p>
              <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-[0.94] text-[#341a15] md:text-5xl">
                Enter through the door that matches where your heart is today.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[#6e4737]">
              Some visitors need teaching. Some need household repair. Some need a heart check.
              Practical Love gives each person a first step.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {STARTING_POINTS.map((point, index) => (
              <Link
                key={point.href}
                to={point.href}
                data-reveal-item
                className="reveal-item surface group overflow-hidden bg-[linear-gradient(135deg,_rgba(255,255,255,0.96)_0%,_rgba(249,239,228,0.96)_100%)] p-7 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-[#f3dfcb] font-serif text-2xl text-[#9a4a29] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                    {index + 1}
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 text-[#a55b37] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#b86b43]">
                  {point.label}
                </p>
                <h3 className="mt-3 max-w-md font-serif text-3xl leading-[0.96] text-[#301814]">
                  {point.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#684132]">{point.description}</p>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#b86b43]">
                  {point.cta}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl" data-reveal-group>
          <div
            data-reveal-item
            className="reveal-item mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b76840]">
                Start here
              </p>
              <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-[0.94] text-[#341a15] md:text-5xl">
                What this ministry is, who it is for, and where to begin.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-[#6e4737]">
              Practical Love is for people who want the love of God to become visible in private
              life, family culture, discipleship, and community influence.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {VISITOR_GUIDES.map(guide => {
              const Icon = guide.icon;

              return (
                <Link
                  key={guide.href}
                  to={guide.href}
                  data-reveal-item
                  className="reveal-item surface group overflow-hidden bg-[linear-gradient(135deg,_rgba(255,255,255,0.96)_0%,_rgba(249,239,228,0.96)_100%)] p-7 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-[#f3dfcb] text-[#9a4a29] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <ArrowRight className="mt-1 h-5 w-5 text-[#a55b37] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <h3 className="mt-6 max-w-md font-serif text-3xl leading-[0.96] text-[#301814]">
                    {guide.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-[#684132]">{guide.description}</p>
                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#b86b43]">
                    {guide.cta}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl" data-reveal-group>
          <div
            data-reveal-item
            className="reveal-item mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b76840]">
                The pathway
              </p>
              <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-[0.94] text-[#341a15] md:text-5xl">
                Four movements from exhaustion to order.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[#6e4737]">
              This is the shape of the message: return to the home, submit to scripture, practice
              love daily, and let the result move outward.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {PILLARS.map(pillar => {
              const Icon = pillar.icon;

              return (
                <article
                  key={pillar.step}
                  data-reveal-item
                  className="reveal-item surface group bg-[linear-gradient(180deg,_rgba(255,255,255,0.94),_rgba(247,236,221,0.9))] p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b36c46]">
                      Step {pillar.step}
                    </span>
                    <div className="rounded-2xl bg-[#f3dfcb] p-3 text-[#9d4b2a] transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-6 font-serif text-3xl leading-[0.95] text-[#351913]">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-[#674132]">{pillar.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl" data-reveal-group>
          <div
            data-reveal-item
            className="reveal-item mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b76840]">
                Recent activity
              </p>
              <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-[0.94] text-[#341a15] md:text-5xl">
                Recent messages and study paths visitors can step into now.
              </h2>
            </div>
            <div className="pill bg-white/70 text-[#8d4a2b]">
              <Camera className="h-4 w-4" />
              Current ministry paths
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {RECENT_ACTIVITY.map(item => (
              <Link
                key={item.href}
                to={item.href}
                data-reveal-item
                className="reveal-item surface group overflow-hidden bg-[linear-gradient(180deg,_rgba(255,255,255,0.97),_rgba(247,236,221,0.9))] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="overflow-hidden border-b border-[#ecd9c7]">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="h-52 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b86b43]">
                    {item.label}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl leading-[0.96] text-[#301814]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-[#684132]">{item.description}</p>
                  <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#b86b43]">
                    Open now
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl" data-reveal-group>
          <div
            data-reveal-item
            className="reveal-item mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b76840]">
                Build the rhythm
              </p>
              <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-[0.94] text-[#341a15] md:text-5xl">
                Enter the message through the route that fits your household right now.
              </h2>
            </div>
            <div className="pill bg-white/70 text-[#8d4a2b]">
              <Sparkles className="h-4 w-4" />A sharper landing page means nothing if it does not
              lead to practice.
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {ROUTES.map(route => {
              const Icon = route.icon;

              return (
                <Link
                  key={route.href}
                  to={route.href}
                  data-reveal-item
                  className="reveal-item surface group overflow-hidden bg-[linear-gradient(135deg,_rgba(255,255,255,0.96)_0%,_rgba(249,239,228,0.96)_100%)] p-7 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-[#f3dfcb] text-[#9a4a29] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-6 max-w-md font-serif text-3xl leading-[0.96] text-[#301814]">
                        {route.title}
                      </h3>
                    </div>
                    <ArrowRight className="mt-1 h-5 w-5 text-[#a55b37] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <p className="mt-4 max-w-xl text-base leading-7 text-[#684132]">
                    {route.description}
                  </p>
                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#b86b43]">
                    {route.cta}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
        <div className="mx-auto max-w-7xl" data-reveal-group>
          <div className="grid gap-6 lg:items-start lg:grid-cols-[0.92fr_1.08fr]">
            <div
              data-reveal-item
              className="reveal-item surface relative overflow-hidden bg-[linear-gradient(155deg,_#2d1612_0%,_#5a2015_44%,_#8e351f_76%,_#d07a40_100%)] p-8 text-[#fff3e7] md:p-10"
            >
              <div className="absolute -right-10 top-8 h-36 w-36 rounded-full bg-white/10 blur-3xl" />
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ffd2ad]">
                Personal welcome
              </p>
              <h2 className="mt-4 max-w-xl font-serif text-4xl leading-[0.92] text-white md:text-5xl">
                A short word from Dr. Moses Aderemi Owoeye.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#fff0e1] opacity-90">
                This ministry is built around one burden: that the love of God should become a daily
                practice in homes, not only a message people admire from a distance.
              </p>
              <p className="mt-4 text-base leading-7 text-[#ffe7d3] opacity-80">
                If you are new here, begin with the mission, study the scriptures, and take one
                practical step that your household can repeat consistently.
              </p>
              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/10 px-4 py-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/12 font-serif text-lg text-white">
                  MO
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffd2ad]">
                    Ministry voice
                  </p>
                  <p className="text-sm text-[#fff3e7]">
                    Author and teacher behind Practical Love resources
                  </p>
                </div>
              </div>
            </div>

            <div data-reveal-item className="reveal-item grid content-start gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <article className="surface overflow-hidden bg-white/90">
                  <img
                    src="/love-hero.png"
                    alt="Practical Love ministry visual for families and relationships"
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b86b43]">
                      Ministry image
                    </p>
                    <h3 className="mt-3 font-serif text-2xl text-[#301814]">
                      Family life is the first ministry field.
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#684132]">
                      The home is where the message proves whether it is real, repeated, and strong
                      enough to shape the future.
                    </p>
                  </div>
                </article>

                <article className="surface bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(247,236,221,0.92))] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b86b43]">
                    What visitors will find
                  </p>
                  <h3 className="mt-3 font-serif text-2xl text-[#301814]">
                    Scripture, practical tools, and active ministry contact points.
                  </h3>
                  <ul className="mt-5 space-y-3 text-sm leading-6 text-[#684132]">
                    <li>Shorter, clearer sections that explain the ministry quickly.</li>
                    <li>Direct links to study resources, recent teaching, and contact routes.</li>
                    <li>Visible ministry activity so the site feels current and lived-in.</li>
                  </ul>
                </article>
              </div>

              <article className="surface bg-[linear-gradient(135deg,_rgba(255,255,255,0.96)_0%,_rgba(249,239,228,0.96)_100%)] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b86b43]">
                  Start here next
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[1.35rem] border border-[rgba(176,111,74,0.16)] bg-white/80 p-4">
                    <p className="text-sm font-semibold text-[#301814]">Mission</p>
                    <p className="mt-2 text-sm leading-6 text-[#684132]">
                      Read the burden and vision behind the ministry.
                    </p>
                  </div>
                  <div className="rounded-[1.35rem] border border-[rgba(176,111,74,0.16)] bg-white/80 p-4">
                    <p className="text-sm font-semibold text-[#301814]">Scripture</p>
                    <p className="mt-2 text-sm leading-6 text-[#684132]">
                      Study the passages and characteristics that define practical love.
                    </p>
                  </div>
                  <div className="rounded-[1.35rem] border border-[rgba(176,111,74,0.16)] bg-white/80 p-4">
                    <p className="text-sm font-semibold text-[#301814]">Practice</p>
                    <p className="mt-2 text-sm leading-6 text-[#684132]">
                      Move into challenges, testimony, and ministry contact routes.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <PrayerPause />

      <AltarCall />
    </div>
  );
}
