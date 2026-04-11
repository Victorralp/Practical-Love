import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const DAILY_VERSES = [
  { text: 'Above all, love each other deeply, because love covers over a multitude of sins.', ref: '1 Peter 4:8' },
  { text: 'Dear friends, let us love one another, for love comes from God.', ref: '1 John 4:7' },
  { text: 'Be completely humble and gentle; be patient, bearing with one another in love.', ref: 'Ephesians 4:2' },
  { text: 'Let all that you do be done in love.', ref: '1 Corinthians 16:14' },
  { text: 'Hatred stirs up conflict, but love covers over all wrongs.', ref: 'Proverbs 10:12' },
  { text: 'Love is patient, love is kind. It does not envy, it does not boast.', ref: '1 Corinthians 13:4' },
  { text: 'We love because he first loved us.', ref: '1 John 4:19' },
  { text: 'And over all these virtues put on love, which binds them all together in perfect unity.', ref: 'Colossians 3:14' },
  { text: 'Love does no harm to a neighbor. Therefore love is the fulfillment of the law.', ref: 'Romans 13:10' },
  { text: 'This is how we know what love is: Jesus Christ laid down his life for us.', ref: '1 John 3:16' },
  { text: 'A new command I give you: Love one another. As I have loved you, so you must love one another.', ref: 'John 13:34' },
  { text: 'The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you.', ref: 'Zephaniah 3:17' },
] as const;

function getTodaysVerse() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
}

export default function DailyVerseBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);
  const verse = getTodaysVerse();

  useEffect(() => {
    // Check if dismissed this session
    const dismissed = sessionStorage.getItem('verse-banner-dismissed');
    if (dismissed) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => setIsRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsRevealed(false);
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('verse-banner-dismissed', 'true');
    }, 400);
  };

  if (!isVisible) return null;

  return (
    <div
      className="daily-verse-banner relative overflow-hidden transition-all duration-500"
      style={{
        maxHeight: isRevealed ? '120px' : '0',
        opacity: isRevealed ? 1 : 0,
      }}
    >
      <div className="relative bg-[linear-gradient(135deg,_#3e1e17_0%,_#5a2818_40%,_#7d3a1e_100%)] px-4 py-3 sm:px-6">
        {/* Warm glow accent */}
        <div className="absolute left-1/2 top-0 h-full w-[30rem] -translate-x-1/2 bg-[radial-gradient(ellipse,_rgba(255,200,140,0.08)_0%,_transparent_70%)]" />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {/* Candle dot */}
            <div className="hidden h-2 w-2 shrink-0 rounded-full bg-[#ffb380] shadow-[0_0_8px_rgba(255,179,128,0.6)] sm:block" />

            <p className="min-w-0 truncate font-serif text-sm italic text-[#fff3e7]/80 sm:text-base">
              "{verse.text}"
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden text-xs font-semibold tracking-[0.14em] text-[#ffca9e]/60 sm:inline">
              — {verse.ref}
            </span>
            <button
              onClick={handleDismiss}
              className="flex h-6 w-6 items-center justify-center rounded-full text-white/30 transition-colors hover:bg-white/10 hover:text-white/60"
              aria-label="Dismiss verse"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
