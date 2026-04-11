import * as React from 'react';
import { cn } from './utils';
import DailyVerseBanner from '../DailyVerseBanner';

export interface PageShellProps {
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export function PageShell({ className, containerClassName, children }: PageShellProps) {
  return (
    <div
      className={cn(
        'min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.62),_transparent_24%),linear-gradient(180deg,_#f9efe2_0%,_#f6eadb_52%,_#f4e6d4_100%)]',
        className
      )}
    >
      <DailyVerseBanner />
      <div
        className={cn(
          'mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16 section-gap',
          containerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default PageShell;


