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
        'rounded-[20px] border border-[#eadfdc] bg-white',
        className
      )}
    >
      {hasHeader ? (
        <div className="flex flex-col gap-3 border-b border-[#f3ecea] px-[18px] py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            {icon ? (
              <span
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pl-blush text-pl-red"
                aria-hidden="true"
              >
                {icon}
              </span>
            ) : null}
            <div className="min-w-0">
              {eyebrow ? (
                <p className="m-0 text-[12px] font-bold uppercase tracking-[0.08em] text-pl-press">
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h2 className="m-0 mt-0.5 text-[18px] font-extrabold tracking-[-0.02em] text-pl-ink">
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p className="mb-0 mt-1 text-[14px] leading-6 text-[#5a4f4f]">{description}</p>
              ) : null}
            </div>
          </div>
          {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
        </div>
      ) : null}

      <div className={cn(flush ? '' : 'p-[18px]', bodyClassName)}>{children}</div>
    </section>
  );
}
