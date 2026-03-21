import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';

const accentColorVariants = cva(
  'rounded-[1.75rem] bg-white/92 p-6 shadow-[0_24px_48px_rgba(95,53,30,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_56px_rgba(95,53,30,0.12)] md:p-8 backdrop-blur-sm border',
  {
    variants: {
      accentColor: {
        red: 'border-l-4 border-l-red-500 border-[rgba(185,28,28,0.12)] hover:border-[rgba(185,28,28,0.2)]',
        orange:
          'border-l-4 border-l-orange-500 border-[rgba(234,88,12,0.12)] hover:border-[rgba(234,88,12,0.2)]',
        yellow:
          'border-l-4 border-l-yellow-500 border-[rgba(245,158,11,0.12)] hover:border-[rgba(245,158,11,0.2)]',
        green:
          'border-l-4 border-l-amber-500 border-[rgba(217,119,6,0.12)] hover:border-[rgba(217,119,6,0.2)]',
        blue: 'border-l-4 border-l-orange-500 border-[rgba(234,88,12,0.12)] hover:border-[rgba(234,88,12,0.2)]',
      },
    },
    defaultVariants: {
      accentColor: 'red',
    },
  }
);

const iconBackgroundVariants = cva('w-12 h-12 rounded-xl flex items-center justify-center mb-4', {
  variants: {
    accentColor: {
      red: 'bg-red-100 text-red-600',
      orange: 'bg-orange-100 text-orange-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      green: 'bg-amber-100 text-orange-600',
      blue: 'bg-orange-100 text-red-600',
    },
  },
  defaultVariants: {
    accentColor: 'red',
  },
});

export interface FeatureCardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof accentColorVariants> {
  icon: React.ReactNode;
  title: string;
  description: string;
}

/**
 * FeatureCard Component
 * A card with icon, title, and description layout.
 * Supports multiple accent colors (red, orange, yellow, green, blue).
 *
 * Requirements: 1.4
 */
export function FeatureCard({
  icon,
  title,
  description,
  accentColor,
  className,
  ...props
}: FeatureCardProps) {
  return (
    <div className={cn(accentColorVariants({ accentColor }), className)} {...props}>
      <div className={iconBackgroundVariants({ accentColor })}>{icon}</div>
      <h4 className="mb-3 text-xl font-serif text-[#3d1d17]">{title}</h4>
      <p className="leading-relaxed text-[#6e4737]">{description}</p>
    </div>
  );
}

export default FeatureCard;


