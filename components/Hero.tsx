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
  House,
  MoveRight,
  Sparkles,
  SunMedium,
  Target,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { TODAY_LOVE_PRACTICES } from './homeContent';

const EXPLORE_CARDS: Array<{
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
    title: 'Start with Family First',
    description:
      'See why private conduct, family tone, marriage, and parenting are the first proving ground of love.',
    href: '/family-first',
    cta: 'Heal the home',
    icon: House,
  },
  {
    title: 'A guided love challenge',
    description:
      'Build a daily rhythm with reflection, accountability, and applied acts of love in real life.',
    href: '/love-challenge',
    cta: 'Enter the challenge',
    icon: Target,
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
    title: 'Learn what this ministry is about',
    description:
      'Read the mission, vision, and scriptural foundation behind Practical Love.',
    href: '/mission-vision',
    cta: 'Learn more',
    icon: Sparkles,
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

      <TestimonyHeartbeat />

      <TheWeightOfWords />

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl" data-reveal-group>
          <div
            data-reveal-item
            className="reveal-item mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b76840]">
              Explore the ministry
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-[0.94] text-[#341a15] md:text-5xl">
              Enter through the door that matches where your heart is today.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {EXPLORE_CARDS.map(card => {
              const Icon = card.icon;

              return (
                <Link
                  key={card.href}
                  to={card.href}
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
                    {card.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-[#684132]">{card.description}</p>
                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#b86b43]">
                    {card.cta}
                  </p>
                </Link>
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

      <PrayerPause />

      <AltarCall />
    </div>
  );
}
