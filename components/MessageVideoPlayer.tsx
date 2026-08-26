import { useState } from 'react';
import { ExternalLink, PlayCircle, Sparkles, Volume2 } from 'lucide-react';
import { resolveVideoEmbed } from '../services/videoEmbed';

type MessageVideoPlayerProps = {
  src?: string;
  videoUrl?: string | null;
  title: string;
  onRespond?: () => void;
};

export default function MessageVideoPlayer({ src, videoUrl, title, onRespond }: MessageVideoPlayerProps) {
  const [showReflection, setShowReflection] = useState(false);
  const embed = resolveVideoEmbed(videoUrl);

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-[#f1c9a8] bg-[linear-gradient(145deg,_#24100c_0%,_#5b2116_46%,_#a44725_100%)] p-3 shadow-[0_24px_52px_rgba(95,53,30,0.22)]">
      <div className="pointer-events-none absolute -left-16 top-8 h-40 w-40 rounded-full bg-[#ffd2af]/18 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-6 h-48 w-48 rounded-full bg-[#ff8a3d]/16 blur-3xl" />

      <div className="relative overflow-hidden rounded-[1.35rem] border border-white/12 bg-black">
        <div className="absolute left-4 top-4 z-10 hidden max-w-[calc(100%-2rem)] items-center gap-2 rounded-full border border-white/12 bg-black/54 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffe4ce] backdrop-blur-md sm:flex">
          <PlayCircle className="h-4 w-4 text-[#ffbd87]" />
          Message watch
        </div>
        {embed?.warning ? (
          <div className="flex min-h-[16rem] flex-col items-center justify-center gap-3 bg-[#fff7ee] p-6 text-center text-[#4a2418]">
            <p className="text-sm leading-6">{embed.warning}</p>
            <a
              href={embed.sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full bg-[#a44f2b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8a3f20]"
            >
              <ExternalLink className="h-4 w-4" />
              Open on {embed.label}
            </a>
          </div>
        ) : embed ? (
          <iframe
            src={embed.embedUrl}
            title={title}
            frameBorder="0"
            scrolling="no"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className={
              embed.kind === 'post'
                ? 'h-[34rem] w-full bg-white'
                : 'aspect-video w-full max-h-[34rem] bg-black'
            }
          />
        ) : (
          <video
            controls
            preload="metadata"
            className="aspect-video max-h-[34rem] w-full bg-black object-contain"
            aria-label={`Video message: ${title}`}
          >
            {src && <source src={src} />}
          </video>
        )}
      </div>

      {embed && !embed.warning ? (
        <p className="relative mt-2 px-1 text-right text-xs text-[#ffe4ce]/85">
          Not loading?{' '}
          <a
            href={embed.sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 font-semibold text-[#ffd2af] underline underline-offset-2 hover:text-white"
          >
            Open on {embed.label}
            <ExternalLink className="h-3 w-3" />
          </a>
        </p>
      ) : null}

      <div className="relative mt-3 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="rounded-[1.15rem] border border-white/10 bg-white/8 px-4 py-3 text-[#fff3e7]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffd2af]">
            Watch with purpose
          </p>
          <p className="mt-1 text-sm leading-6 text-[#fff1e3] opacity-85">
            Listen for one sentence to pray over and one action to practice today.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:w-44">
          <button
            type="button"
            onClick={() => setShowReflection(current => !current)}
            className="rounded-[1rem] border border-white/10 bg-white/8 px-3 py-3 text-center text-[#ffe4ce] transition hover:bg-white/14 focus:outline-none focus:ring-2 focus:ring-[#ffd2af]/70"
            aria-expanded={showReflection}
          >
            <Sparkles className="mx-auto h-4 w-4" />
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em]">Reflect</p>
          </button>
          <button
            type="button"
            onClick={onRespond}
            className="rounded-[1rem] border border-white/10 bg-white/8 px-3 py-3 text-center text-[#ffe4ce] transition hover:bg-white/14 focus:outline-none focus:ring-2 focus:ring-[#ffd2af]/70"
          >
            <Volume2 className="mx-auto h-4 w-4" />
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em]">Respond</p>
          </button>
        </div>
      </div>

      {showReflection ? (
        <div className="relative mt-3 rounded-[1.2rem] border border-white/12 bg-[#fff7ee]/95 p-4 text-[#4a2418] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a44f2b]">
            Reflection guide
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <p className="rounded-[1rem] bg-white/78 p-3 text-sm leading-6">
              What sentence should I remember?
            </p>
            <p className="rounded-[1rem] bg-white/78 p-3 text-sm leading-6">
              Where did this correct my heart?
            </p>
            <p className="rounded-[1rem] bg-white/78 p-3 text-sm leading-6">
              What act of love will I practice today?
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
