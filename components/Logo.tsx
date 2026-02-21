import { cn } from './ui/utils';

interface LogoProps {
  className?: string;
}

/**
 * Brand logo: layered heart with warm gradient and subtle outline.
 */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="Practical Love logo"
      className={cn('drop-shadow-sm', className)}
    >
      <defs>
        <linearGradient id="pl-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
        <linearGradient id="pl-glow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff7ed" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff7ed" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="#fff7ed" opacity="0.7" />
      <circle cx="32" cy="32" r="28" fill="url(#pl-glow)" opacity="0.8" />
      <path
        d="M32 49s-17.5-12.2-17.5-24.3C14.5 17.5 19 13 24.6 13c2.9 0 5.8 1.4 7.4 3.8C33.6 14.4 36.5 13 39.4 13c5.6 0 10.1 4.5 10.1 11.7C49.5 36.8 32 49 32 49Z"
        fill="url(#pl-gradient)"
      />
      <path
        d="M32 47.2s-15.1-10.5-15.1-21.4c0-5.5 3.8-9.1 8.1-9.1 2.5 0 5 1.3 6.7 3.6 1.7-2.3 4.2-3.6 6.7-3.6 4.3 0 8.1 3.6 8.1 9.1 0 10.9-15.1 21.4-15.1 21.4Z"
        fill="none"
        stroke="#fff7ed"
        strokeWidth="2.2"
      />
    </svg>
  );
}

export default Logo;
