import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';

const sectionCardVariants = cva(
  'rounded-[1.75rem] p-6 md:p-8 shadow-[0_24px_48px_rgba(95,53,30,0.08)] transition-all duration-300',
  {
  variants: {
    variant: {
      default: 'bg-white/92 border border-[rgba(138,88,60,0.12)] backdrop-blur-sm',
      gradient:
        'border border-[rgba(176,111,74,0.16)] bg-[linear-gradient(135deg,_rgba(255,255,255,0.94)_0%,_rgba(248,238,227,0.96)_100%)]',
      dark:
        'border border-[rgba(255,241,230,0.12)] bg-[linear-gradient(160deg,_#2f1713_0%,_#5f2116_42%,_#8e331f_72%,_#d27a3f_100%)] text-white',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface SectionCardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sectionCardVariants> {
  title?: string;
  titleClassName?: string;
}

/**
 * SectionCard Component
 * A card wrapper with consistent padding and border radius.
 * Supports different visual variants for content sections.
 *
 * Requirements: 1.4
 */
export function SectionCard({
  title,
  titleClassName,
  variant,
  className,
  children,
  ...props
}: SectionCardProps) {
  return (
    <div className={cn(sectionCardVariants({ variant }), className)} {...props}>
      {title && (
        <h3
          className={cn(
            'mb-6 text-2xl font-serif',
            variant === 'dark' ? 'text-white' : 'text-[#3d1d17]',
            titleClassName
          )}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

export default SectionCard;

