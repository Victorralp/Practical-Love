import { Video } from 'lucide-react';
import { resolveVideoEmbed } from '../services/videoEmbed';

type VideoProviderBadgeProps = {
  url?: string | null;
  /** `sm` matches the admin list chips, `md` the public post chips. */
  size?: 'sm' | 'md';
};

const TONE = {
  youtube: { sm: 'bg-red-50 text-red-700', md: 'bg-red-100 text-red-700' },
  facebook: { sm: 'bg-blue-50 text-blue-700', md: 'bg-blue-100 text-blue-700' },
  vimeo: { sm: 'bg-sky-50 text-sky-800', md: 'bg-sky-100 text-sky-800' },
  tiktok: { sm: 'bg-neutral-100 text-neutral-800', md: 'bg-neutral-200 text-neutral-900' },
  instagram: {
    sm: 'bg-pink-50 text-pink-700',
    md: 'bg-pink-100 text-pink-700',
  },
} as const;

export default function VideoProviderBadge({ url, size = 'md' }: VideoProviderBadgeProps) {
  const embed = resolveVideoEmbed(url);

  if (!embed) return null;

  const layout =
    size === 'sm'
      ? 'rounded-md px-2 py-0.5 text-[0.68rem] tracking-[0.1em]'
      : 'rounded-full px-3 py-1 text-xs tracking-[0.16em]';
  const iconSize = size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5';

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold uppercase ${layout} ${
        TONE[embed.provider][size]
      }`}
    >
      <Video className={iconSize} />
      {embed.label}
    </span>
  );
}
