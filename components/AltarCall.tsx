import { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const LOVE_WORDS = [
  'patience', 'kindness', 'forgiveness', 'truth', 'hope',
  'grace', 'mercy', 'sacrifice', 'tenderness', 'faithfulness',
  'gentleness', 'compassion', 'humility', 'peace', 'joy',
  'endurance', 'restoration', 'renewal', 'courage', 'steadfastness',
];

function FloatingWhisper({ word, index }: { word: string; index: number }) {
  const style: React.CSSProperties = {
    left: `${8 + Math.random() * 84}%`,
    top: `${5 + Math.random() * 90}%`,
    animationDelay: `${index * 1.7}s`,
    animationDuration: `${12 + Math.random() * 8}s`,
    fontSize: `${0.7 + Math.random() * 0.5}rem`,
  };

  return (
    <span
      className="love-whisper pointer-events-none absolute font-serif italic text-white/[0.06]"
      style={style}
      aria-hidden="true"
    >
      {word}
    </span>
  );
}

function BeatingHeart() {
  return (
    <div className="altar-heart relative mx-auto mb-12 flex h-32 w-32 items-center justify-center">
      {/* Outer pulse rings */}
      <div className="altar-pulse-ring absolute h-full w-full rounded-full border border-white/10" />
      <div className="altar-pulse-ring-delayed absolute h-full w-full rounded-full border border-white/8" />

      {/* Heart glow */}
      <div className="absolute h-24 w-24 rounded-full bg-[radial-gradient(circle,_rgba(220,80,50,0.25)_0%,_transparent_70%)]" />

      {/* Heart icon */}
      <Heart
        className="altar-heart-icon relative z-10 h-14 w-14 text-[#ff8a65] drop-shadow-[0_0_20px_rgba(255,138,101,0.4)]"
        fill="currentColor"
      />
    </div>
  );
}

export default function AltarCall() {
  const [isVisible, setIsVisible] = useState(false);
  const [pledgeText, setPledgeText] = useState('');
  const [isPledged, setIsPledged] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handlePledge = () => {
    if (pledgeText.trim()) {
      setIsPledged(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="altar-call"
      className="relative min-h-[90vh] overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      {/* Deep sacred background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2d1612_0%,_#1d0f0b_40%,_#120907_80%,_#0a0504_100%)]" />

      {/* Cathedral light ray from top */}
      <div className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-gradient-to-b from-[rgba(255,200,140,0.12)] via-[rgba(255,180,120,0.04)] to-transparent" />
      <div className="absolute left-1/2 top-0 h-[60%] w-[40rem] -translate-x-1/2 bg-[radial-gradient(ellipse,_rgba(255,180,100,0.04)_0%,_transparent_70%)]" />

      {/* Floating love whispers */}
      {LOVE_WORDS.map((word, index) => (
        <FloatingWhisper key={word} word={word} index={index} />
      ))}

      {/* Content */}
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Beating heart */}
        <div
          className="transition-all duration-1500"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.8)',
            transition: 'all 1.5s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <BeatingHeart />
        </div>

        {/* Main text */}
        <div
          className="transition-all"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: '0.6s',
          }}
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-[#d4864f]">
            The invitation
          </p>
          <h2 className="font-serif text-5xl leading-[0.9] text-white md:text-6xl lg:text-7xl">
            Love is not finished
            <br />
            <span className="altar-shimmer-text text-[#ffb380]">speaking to you.</span>
          </h2>
        </div>

        <div
          className="transition-all"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: '1.2s',
          }}
        >
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#fff3e7]/70 md:text-xl">
            You have scrolled through scripture, through stories, through the weight of what love
            costs. Now the question is simple:
          </p>
          <p className="mt-6 font-serif text-3xl text-white md:text-4xl">
            Will you let it change you?
          </p>
        </div>

        {/* Pledge section */}
        <div
          className="mt-14 w-full max-w-xl transition-all"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: '1.8s',
          }}
        >
          {!isPledged ? (
            <div className="space-y-4">
              <p className="text-sm font-medium tracking-[0.16em] text-[#ffca9e]/60">
                Write your commitment below. No one sees it but you and God.
              </p>
              <div className="relative">
                <textarea
                  value={pledgeText}
                  onChange={(e) => setPledgeText(e.target.value)}
                  placeholder="Today, I choose to practice love by…"
                  rows={3}
                  maxLength={300}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-6 py-5 font-serif text-lg text-white/90 outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-white/20 focus:border-[#d4864f]/40 focus:bg-white/8 focus:shadow-[0_0_40px_rgba(212,134,79,0.08)]"
                  id="altar-pledge-input"
                />
              </div>
              <button
                onClick={handlePledge}
                disabled={!pledgeText.trim()}
                className="altar-pledge-btn group mx-auto inline-flex items-center gap-3 rounded-full border border-white/16 bg-white/8 px-10 py-4 font-semibold text-white transition-all duration-500 hover:border-[#ffb380]/30 hover:bg-white/12 hover:shadow-[0_0_50px_rgba(255,179,128,0.1)] disabled:cursor-not-allowed disabled:opacity-30"
                id="altar-pledge-button"
              >
                <Heart className="h-5 w-5 text-[#ff8a65] transition-transform duration-300 group-hover:scale-110" />
                I choose love
              </button>
            </div>
          ) : (
            <div className="altar-pledge-response space-y-6">
              <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-[#d4864f]/40 to-transparent" />
              <p className="font-serif text-2xl leading-relaxed text-[#ffca9e] md:text-3xl">
                Heaven has heard you.
              </p>
              <p className="text-lg leading-8 text-white/50">
                Now go. Start today. Start with the person closest to you. Let them
                feel the difference before they hear the explanation.
              </p>
              <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-[#d4864f]/40 to-transparent" />
            </div>
          )}
        </div>

        {/* Final action buttons */}
        <div
          className="mt-14 flex flex-col items-center gap-4 sm:flex-row transition-all"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: '2.4s',
          }}
        >
          <Link
            to="/love-challenge"
            className="btn-brand px-10 py-4 text-base md:text-lg"
          >
            Begin the 30-day challenge
          </Link>
          <Link
            to="/share-testimony"
            className="btn-outline-light px-8 py-4 text-base"
          >
            Share your story
          </Link>
        </div>

        {/* Closing scripture */}
        <div
          className="mt-20 transition-all"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'all 1.5s ease',
            transitionDelay: '3s',
          }}
        >
          <p className="font-serif text-lg italic leading-relaxed text-white/30">
            "And now these three remain: faith, hope, and love.
            <br />
            But the greatest of these is love."
          </p>
          <p className="mt-3 text-sm tracking-[0.2em] text-[#ffca9e]/30">
            — 1 Corinthians 13:13
          </p>
        </div>
      </div>
    </section>
  );
}
