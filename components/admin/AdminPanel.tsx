import { cn } from '../ui/utils';

export type AdminPanelProps = {
  id?: string;
  /** Small uppercase label above the panel title. */
  eyebrow?: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  /** Controls aligned to the end of the panel header. */
  actions?: React.ReactNode;
  /** Removes the inner padding so tables and lists can sit flush. */
  flush?: boolean;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
};

/** The one card shape every admin page uses. */
export function AdminPanel({
  id,
  eyebrow,
  title,
  description,
  icon,
  actions,
  flush = false,
  className,
  bodyClassName,
  children,
}: AdminPanelProps) {
  const hasHeader = Boolean(eyebrow || title || description || actions);

  return (
    <section
      id={id}
      className={cn(
        'rounded-2xl border border-[#f0e2d8] bg-white shadow-[0_1px_2px_rgba(61,29,23,0.04),0_10px_28px_-18px_rgba(61,29,23,0.25)]',
        className
      )}
    >
      {hasHeader ? (
        <div className="flex flex-col gap-3 border-b border-[#f6ece4] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            {icon ? (
              <span
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fdf3ec] text-red-600"
                aria-hidden="true"
              >
                {icon}
              </span>
            ) : null}
            <div className="min-w-0">
              {eyebrow ? (
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#a8735c]">
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h2 className="mt-0.5 text-lg font-semibold tracking-tight text-[#3d1d17]">
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p className="mt-1 text-sm leading-6 text-[#6e4737]">{description}</p>
              ) : null}
            </div>
          </div>
          {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
        </div>
      ) : null}

      <div className={cn(flush ? '' : 'px-5 py-5', bodyClassName)}>{children}</div>
    </section>
  );
}
