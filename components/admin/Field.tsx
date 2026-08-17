import { cn } from '../ui/utils';

/** Shared control styling so every admin input matches. */
export const controlClass =
  'w-full rounded-xl border border-[#e8d9cd] bg-white px-3.5 py-2.5 text-sm text-[#3d1d17] placeholder:text-[#bda392] transition focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:bg-[#faf5f1]';

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
          <label htmlFor={htmlFor} className="text-sm font-medium text-[#4a2b20]">
            {label}
          </label>
        ) : (
          <span className="text-sm font-medium text-[#4a2b20]">{label}</span>
        )}
        {note ? <span className="text-xs text-[#a8735c]">{note}</span> : null}
      </div>
      {children}
      {hint ? <p className="mt-1.5 text-xs leading-5 text-[#8a6552]">{hint}</p> : null}
    </div>
  );
}
