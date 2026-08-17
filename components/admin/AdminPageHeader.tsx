import { cn } from '../ui/utils';

export type AdminPageHeaderProps = {
  /** Small uppercase label above the title. */
  eyebrow: string;
  title: string;
  description?: string;
  /** Icon rendered in the tinted square beside the title. */
  icon?: React.ReactNode;
  /** Tailwind classes for the icon square, so each section can carry its own accent. */
  accentClassName?: string;
  /** Buttons or links aligned to the end of the header. */
  actions?: React.ReactNode;
  /** Short right-aligned status line, e.g. "12 of 40 shown". */
  meta?: React.ReactNode;
  className?: string;
};

/**
 * Compact header for admin pages. The admin shell already names the ministry in
 * the sidebar, so this stays a working title bar instead of a marketing hero.
 */
export function AdminPageHeader({
  eyebrow,
  title,
  description,
  icon,
  accentClassName = 'bg-red-50 text-red-600 ring-red-100',
  actions,
  meta,
  className,
}: AdminPageHeaderProps) {
  return (
    <header
      className={cn(
        'flex flex-col gap-4 border-b border-[#f0e2d8] pb-5 lg:flex-row lg:items-start lg:justify-between',
        className
      )}
    >
      <div className="flex min-w-0 items-start gap-3.5">
        {icon ? (
          <span
            className={cn(
              'mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1',
              accentClassName
            )}
            aria-hidden="true"
          >
            {icon}
          </span>
        ) : null}
        <div className="min-w-0">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#a8735c]">
            {eyebrow}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#3d1d17]">{title}</h1>
          {description ? (
            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[#6e4737]">{description}</p>
          ) : null}
        </div>
      </div>

      {actions || meta ? (
        <div className="flex shrink-0 flex-col items-start gap-2 lg:items-end">
          {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
          {meta ? <p className="text-sm text-[#8a6552]">{meta}</p> : null}
        </div>
      ) : null}
    </header>
  );
}
