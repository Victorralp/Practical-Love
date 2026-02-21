import * as React from 'react';
import { cn } from './utils';

export interface PageShellProps {
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export function PageShell({ className, containerClassName, children }: PageShellProps) {
  return (
    <div className={cn('min-h-screen bg-gradient-to-b from-orange-50 to-white', className)}>
      <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14', containerClassName)}>
        {children}
      </div>
    </div>
  );
}

export default PageShell;


