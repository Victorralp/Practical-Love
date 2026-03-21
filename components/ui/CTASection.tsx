import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';
import { Link } from 'react-router-dom';

const ctaSectionVariants = cva(
  'rounded-[2rem] p-8 text-center shadow-[0_26px_56px_rgba(63,25,14,0.16)] transition-all duration-300 md:p-10',
  {
    variants: {
      variant: {
        gradient:
          'bg-[linear-gradient(135deg,_#2b1511_0%,_#5d2015_42%,_#8f351f_72%,_#d67d3e_100%)] text-white',
        white:
          'border border-[rgba(176,111,74,0.16)] bg-[linear-gradient(135deg,_rgba(255,255,255,0.94)_0%,_rgba(248,238,227,0.96)_100%)] text-gray-900',
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
    'min-h-[44px] min-w-[44px] rounded-full px-8 py-4 text-lg font-bold transition-all duration-300 shadow-lg',
    isGradient
      ? 'bg-white text-red-700 hover:-translate-y-0.5 hover:bg-orange-50'
      : 'bg-gradient-to-r from-red-600 to-orange-600 text-white hover:-translate-y-0.5 hover:from-red-700 hover:to-orange-700'
  );

  const secondaryButtonClasses = cn(
    'min-h-[44px] min-w-[44px] rounded-full px-8 py-4 text-lg font-bold transition-all duration-300',
    isGradient
      ? 'border border-white/40 bg-transparent text-white hover:-translate-y-0.5 hover:bg-white/10'
      : 'border border-red-600 text-red-600 hover:-translate-y-0.5 hover:bg-red-50'
  );

  return (
    <div className={cn(ctaSectionVariants({ variant }), className)} {...props}>
      <h3 className={cn('mb-4 text-3xl font-serif', isGradient ? 'text-white' : 'text-[#3d1d17]')}>
        {title}
      </h3>
      <p
        className={cn(
          'mx-auto mb-8 max-w-2xl text-xl',
          isGradient ? 'text-orange-100' : 'text-[#6e4737]'
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

