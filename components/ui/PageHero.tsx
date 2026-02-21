import * as React from 'react';
import { cn } from './utils';

export interface PageHeroProps {
  badge?: React.ReactNode;
  icon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({
  badge,
  icon,
  title,
  subtitle,
  actions,
  children,
  className,
}: PageHeroProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-orange-100 bg-gradient-to-br from-white via-orange-50 to-red-50 shadow-sm px-6 py-10 md:px-10 md:py-12',
        className
      )}
    >
      <div className="absolute -top-28 -right-28 w-72 h-72 bg-orange-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-red-200/35 rounded-full blur-3xl" />

      <div className="relative">
        {(badge || icon) && (
          <div className="flex items-center gap-3">
            {icon ? <div className="shrink-0">{icon}</div> : null}
            {badge ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 border border-orange-100 text-red-700 rounded-full text-sm font-semibold">
                {badge}
              </div>
            ) : null}
          </div>
        )}

        <h1 className="mt-5 text-4xl md:text-5xl font-serif text-red-800">{title}</h1>

        {subtitle ? (
          <p className="mt-4 text-lg text-gray-700 max-w-3xl leading-relaxed">{subtitle}</p>
        ) : null}

        {actions ? <div className="mt-7">{actions}</div> : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </div>
  );
}

export default PageHero;


