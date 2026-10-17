import { Loader } from 'lucide-react';
import { cn } from '../ui/utils';

export type EmptyStateProps = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-dashed border-[#d9cbc8] bg-[#faf7f6] px-6 py-12 text-center',
        className
      )}
    >
      {icon ? (
        <span
          className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#6b5f5f] ring-1 ring-[#eadfdc]"
          aria-hidden="true"
        >
          {icon}
        </span>
      ) : null}
      <p className="text-sm font-semibold text-[#141010]">{title}</p>
      {description ? (
        <p className="mx-auto mt-1.5 max-w-md text-sm leading-6 text-[#6b5f5f]">{description}</p>
      ) : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function LoadingState({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2.5 rounded-xl border border-[#eadfdc] bg-[#faf7f6] px-6 py-12 text-sm text-[#5a4f4f]',
        className
      )}
    >
      <Loader className="h-4 w-4 animate-spin text-[#6b5f5f]" />
      {label}
    </div>
  );
}
