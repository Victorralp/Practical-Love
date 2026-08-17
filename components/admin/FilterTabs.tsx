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
        'inline-flex flex-wrap gap-1 rounded-xl border border-[#f0e2d8] bg-[#fdf8f4] p-1',
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
              'rounded-lg px-3 py-1.5 text-sm font-medium transition',
              active
                ? 'bg-white text-[#3d1d17] shadow-sm ring-1 ring-[#e8d9cd]'
                : 'text-[#8a6552] hover:bg-white/70 hover:text-[#3d1d17]'
            )}
          >
            {tab.label}
            {typeof tab.count === 'number' ? (
              <span
                className={cn(
                  'ml-1.5 text-xs tabular-nums',
                  active ? 'text-[#a8735c]' : 'text-[#bda392]'
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
