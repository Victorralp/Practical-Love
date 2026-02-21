import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';
import { Link } from 'react-router-dom';

const ctaSectionVariants = cva(
  'rounded-2xl p-8 md:p-10 text-center shadow-xl transition-all duration-300',
  {
    variants: {
      variant: {
        gradient: 'bg-gradient-to-r from-red-600 to-orange-600 text-white',
        white: 'bg-white border border-orange-200 text-gray-900',
      },
    },
    defaultVariants: {
      variant: 'gradient',
    },
  }
);

export interface CTAAction {
  label: string;
  href: string;
  onClick?: () => void;
}

export interface CTASectionProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof ctaSectionVariants> {
  title: string;
  description: string;
  primaryAction: CTAAction;
  secondaryAction?: CTAAction;
}

/**
 * CTASection Component
 * A call-to-action section with primary and optional secondary action buttons.
 * Supports gradient and white variants.
 *
 * Requirements: 1.5
 */
export function CTASection({
  title,
  description,
  primaryAction,
  secondaryAction,
  variant,
  className,
  ...props
}: CTASectionProps) {
  const isGradient = variant === 'gradient' || variant === undefined;

  const primaryButtonClasses = cn(
    'px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg min-w-[44px] min-h-[44px]',
    isGradient
      ? 'bg-white text-red-600 hover:bg-orange-50'
      : 'bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700'
  );

  const secondaryButtonClasses = cn(
    'px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 min-w-[44px] min-h-[44px]',
    isGradient
      ? 'bg-transparent border-2 border-white text-white hover:bg-white/10'
      : 'bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-50'
  );

  return (
    <div className={cn(ctaSectionVariants({ variant }), className)} {...props}>
      <h3 className={cn('text-3xl font-serif mb-4', isGradient ? 'text-white' : 'text-red-800')}>
        {title}
      </h3>
      <p
        className={cn(
          'text-xl mb-8 max-w-2xl mx-auto',
          isGradient ? 'text-orange-100' : 'text-gray-600'
        )}
      >
        {description}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {primaryAction.href.startsWith('/') ? (
          <Link
            to={primaryAction.href}
            className={primaryButtonClasses}
            onClick={primaryAction.onClick}
          >
            {primaryAction.label}
          </Link>
        ) : (
          <a
            href={primaryAction.href}
            className={primaryButtonClasses}
            onClick={primaryAction.onClick}
          >
            {primaryAction.label}
          </a>
        )}
        {secondaryAction &&
          (secondaryAction.href.startsWith('/') ? (
            <Link
              to={secondaryAction.href}
              className={secondaryButtonClasses}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Link>
          ) : (
            <a
              href={secondaryAction.href}
              className={secondaryButtonClasses}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </a>
          ))}
      </div>
    </div>
  );
}

export default CTASection;

