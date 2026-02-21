import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';

const accentColorVariants = cva(
  'rounded-2xl p-6 md:p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border',
  {
    variants: {
      accentColor: {
        red: 'border-l-4 border-l-red-500 border-red-100 hover:border-red-200',
        orange: 'border-l-4 border-l-orange-500 border-orange-100 hover:border-orange-200',
        yellow: 'border-l-4 border-l-yellow-500 border-yellow-100 hover:border-yellow-200',
        green: 'border-l-4 border-l-amber-500 border-amber-100 hover:border-amber-200',
        blue: 'border-l-4 border-l-orange-500 border-orange-100 hover:border-orange-200',
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
      <h4 className="text-xl font-serif text-gray-900 mb-3">{title}</h4>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default FeatureCard;


