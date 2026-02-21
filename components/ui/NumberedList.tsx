import * as React from 'react';
import { cn } from './utils';

export interface NumberedListItem {
  number: number;
  content: string;
  highlight?: boolean;
}

export interface NumberedListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NumberedListItem[];
  startFrom?: number;
  variant?: 'light' | 'dark';
}

/**
 * NumberedList Component
 * A component for displaying sequential numbered content.
 * Supports highlight option for individual items.
 * Ensures sequential numbering with no gaps.
 *
 * Requirements: 5.3, 6.1
 */
export function NumberedList({
  items,
  startFrom = 1,
  variant = 'light',
  className,
  ...props
}: NumberedListProps) {
  // Ensure sequential numbering starting from startFrom
  const sequentialItems = items.map((item, index) => ({
    ...item,
    number: startFrom + index,
  }));

  const isDark = variant === 'dark';

  return (
    <div className={cn('space-y-4', className)} {...props}>
      {sequentialItems.map(item => (
        <div
          key={item.number}
          className={cn(
            'flex items-start transition-all duration-200',
            item.highlight &&
              !isDark &&
              'bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 -mx-4',
            item.highlight && isDark && 'bg-white/5 rounded-xl p-4 -mx-4'
          )}
        >
          <span
            className={cn(
              'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 mt-0.5 text-lg font-bold',
              isDark
                ? 'bg-gradient-to-br from-yellow-600 to-yellow-800 text-white shadow-lg border border-yellow-500/30'
                : item.highlight
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md'
                  : 'bg-red-100 text-red-800'
            )}
          >
            {item.number}
          </span>
          <p
            className={cn(
              'leading-relaxed flex-1 pt-2',
              isDark
                ? 'font-medium text-lg text-gray-200'
                : item.highlight
                  ? 'font-medium text-gray-900'
                  : 'text-gray-700'
            )}
          >
            {item.content}
          </p>
        </div>
      ))}
    </div>
  );
}

export default NumberedList;

