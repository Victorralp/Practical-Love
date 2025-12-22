import * as React from "react";
import { cn } from "./utils";

export interface PageHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

/**
 * PageHeader Component
 * A reusable header component for page titles with icon, title, subtitle, and optional badge.
 * Supports gradient backgrounds and consistent typography.
 * 
 * Requirements: 1.1, 1.2, 1.3
 */
export function PageHeader({
  icon,
  title,
  subtitle,
  badge,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("text-center mb-16", className)}>
      {/* Icon Section */}
      <div className="flex items-center justify-center mb-6">
        {icon}
      </div>

      {/* Badge (optional) */}
      {badge && (
        <span className="inline-block bg-gradient-to-r from-red-100 to-orange-100 text-red-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-red-200">
          {badge}
        </span>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-serif text-red-800 mb-6">
        {title}
      </h1>

      {/* Subtitle (optional) */}
      {subtitle && (
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageHeader;
