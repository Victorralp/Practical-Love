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
        'relative overflow-hidden rounded-[2rem] border border-[rgba(138,88,60,0.12)] bg-[linear-gradient(135deg,_rgba(255,255,255,0.92)_0%,_rgba(250,242,233,0.94)_52%,_rgba(247,231,214,0.94)_100%)] px-6 py-10 shadow-[0_24px_48px_rgba(95,53,30,0.08)] md:px-10 md:py-12',
        className
      )}
    >
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
      <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-red-200/18 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(164,112,79,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(164,112,79,0.05)_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent_86%)]" />

      <div className="relative">
        {(badge || icon) && (
          <div className="flex items-center gap-3">
            {icon ? <div className="shrink-0">{icon}</div> : null}
            {badge ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(138,88,60,0.16)] bg-white/72 px-4 py-2 text-sm font-semibold text-[#9a5534] shadow-[0_12px_24px_rgba(117,74,51,0.06)]">
                {badge}
              </div>
            ) : null}
          </div>
        )}

        <h1 className="mt-5 font-serif text-4xl text-[#3d1d17] md:text-5xl">{title}</h1>

        {subtitle ? (
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#6e4737]">{subtitle}</p>
        ) : null}

        {actions ? <div className="mt-7">{actions}</div> : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </div>
  );
}

export default PageHero;


