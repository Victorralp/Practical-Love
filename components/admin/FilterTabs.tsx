import { cn } from '../ui/utils';

export type FilterTab<T extends string> = {
  value: T;
  label: string;
  count?: number;
};

export type FilterTabsProps<T extends string> = {
  tabs: readonly FilterTab<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name for the group, e.g. "Filter testimonies by status". */
  label: string;
  className?: string;
};

/** Segmented filter row shared by the moderation pages. */
export function FilterTabs<T extends string>({
  tabs,
  value,
  onChange,
  label,
  className,
}: FilterTabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        'flex flex-wrap gap-[6px]',
        className
      )}
    >
      {tabs.map(tab => {
        const active = tab.value === value;

        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.value)}
            className={cn(
              'min-h-[40px] rounded-full border px-[14px] text-[14px] font-semibold transition-colors',
              active
                ? 'border-pl-ink bg-pl-ink text-white'
                : 'border-[#d9cbc8] bg-white text-pl-ink hover:border-pl-ink'
            )}
          >
            {tab.label}
            {typeof tab.count === 'number' ? (
              <span
                className={cn(
                  'ml-1.5 text-xs tabular-nums',
                  'opacity-60'
                )}
              >
                {tab.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
