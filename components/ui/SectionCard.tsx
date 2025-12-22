import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const sectionCardVariants = cva(
  "rounded-2xl p-6 md:p-8 shadow-lg transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-white border border-orange-100",
        gradient: "bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200",
        dark: "bg-gray-900 text-white border border-gray-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SectionCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionCardVariants> {
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
    <div
      className={cn(sectionCardVariants({ variant }), className)}
      {...props}
    >
      {title && (
        <h3
          className={cn(
            "text-2xl font-serif mb-6",
            variant === "dark" ? "text-white" : "text-red-800",
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
