import { cn } from '../ui/utils';

export type AdminPageHeaderProps = {
  /** Small uppercase label above the title. */
  eyebrow: string;
  title: string;
  description?: string;
  /** Kept for call-site compatibility; the redesign shows no icon in page headers. */
  icon?: React.ReactNode;
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
export function AdminPageHeader({ eyebrow, title, description, actions, meta, className }: AdminPageHeaderProps) {
  return (
    <header className={cn('flex flex-wrap items-end justify-between gap-x-6 gap-y-3', className)}>
      <div className="min-w-0">
        <p className="m-0 text-[13px] font-bold uppercase tracking-[0.08em] text-pl-press">{eyebrow}</p>
        <h1 className="mb-0 mt-[6px] text-[clamp(30px,3.6vw,44px)] font-extrabold leading-none tracking-[-0.04em] text-pl-ink">
          {title}
        </h1>
        {description ? <p className="mb-0 mt-2 max-w-2xl text-[15px] leading-[1.5] text-[#5a4f4f]">{description}</p> : null}
      </div>

      {actions || meta ? (
        <div className="flex shrink-0 flex-col items-start gap-2 lg:items-end">
          {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
          {meta ? <p className="m-0 text-[14px] text-[#6b5f5f]">{meta}</p> : null}
        </div>
      ) : null}
    </header>
  );
}
