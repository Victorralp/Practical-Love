import { cn } from '../ui/utils';

/** Shared control styling so every admin input matches. */
export const controlClass =
  'w-full rounded-[12px] border border-[#d9cbc8] bg-white px-[14px] py-3 text-[16px] text-pl-ink placeholder:text-[#a39797] transition focus:border-pl-red focus:outline-none focus:ring-4 focus:ring-pl-red/10 disabled:cursor-not-allowed disabled:bg-[#faf7f6]';

export type FieldProps = {
  label: string;
  /** Omit for groups of controls (radio-style buttons) that have no single input to point at. */
  htmlFor?: string;
  /** Helper text under the control. */
  hint?: string;
  /** Right-aligned note in the label row, e.g. a character count or "Optional". */
  note?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function Field({ label, htmlFor, hint, note, className, children }: FieldProps) {
  return (
    <div className={cn('min-w-0', className)}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        {htmlFor ? (
          <label htmlFor={htmlFor} className="text-[14px] font-semibold text-pl-ink">
            {label}
          </label>
        ) : (
          <span className="text-[14px] font-semibold text-pl-ink">{label}</span>
        )}
        {note ? <span className="text-xs text-[#6b5f5f]">{note}</span> : null}
      </div>
      {children}
      {hint ? <p className="mt-1.5 text-xs leading-5 text-[#6b5f5f]">{hint}</p> : null}
    </div>
  );
}
