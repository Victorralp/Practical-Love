import { AlertTriangle, CheckCircle2, Info, Loader, X } from 'lucide-react';
import { cn } from '../ui/utils';

export type StatusTone = 'info' | 'success' | 'error' | 'busy';

const TONE_STYLES: Record<StatusTone, { wrapper: string; icon: React.ReactNode }> = {
  info: {
    wrapper: 'border-[#e8d9cd] bg-[#fdf8f4] text-[#5c3a2b]',
    icon: <Info className="h-4 w-4 text-[#a8735c]" />,
  },
  success: {
    wrapper: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    icon: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
  },
  error: {
    wrapper: 'border-red-200 bg-red-50 text-red-800',
    icon: <AlertTriangle className="h-4 w-4 text-red-600" />,
  },
  busy: {
    wrapper: 'border-[#e8d9cd] bg-[#fdf8f4] text-[#5c3a2b]',
    icon: <Loader className="h-4 w-4 animate-spin text-[#a8735c]" />,
  },
};

/** Words that mean the write failed, whatever service produced the message. */
const FAILURE_HINTS = [
  'permission_denied',
  'unable',
  'failed',
  'error',
  'required',
  'must be',
  'not allowed',
];

const SUCCESS_HINTS = [
  'success',
  'published',
  'updated',
  'created',
  'deleted',
  'approved',
  'archived',
  'restored',
  'saved',
  'hidden',
];

/**
 * Guess the tone from the message so every page gets red errors and green
 * confirmations without threading a second piece of state through each handler.
 */
export function inferStatusTone(message: string): StatusTone {
  const text = message.toLowerCase();

  if (FAILURE_HINTS.some(hint => text.includes(hint))) return 'error';
  if (text.includes('...')) return 'busy';
  if (SUCCESS_HINTS.some(hint => text.includes(hint))) return 'success';

  return 'info';
}

export type StatusBannerProps = {
  message: string;
  /** Overrides the tone inferred from the message. */
  tone?: StatusTone;
  onDismiss?: () => void;
  className?: string;
};

export function StatusBanner({ message, tone, onDismiss, className }: StatusBannerProps) {
  if (!message) return null;

  const resolvedTone = tone ?? inferStatusTone(message);
  const styles = TONE_STYLES[resolvedTone];

  return (
    <div
      role={resolvedTone === 'error' ? 'alert' : 'status'}
      aria-live={resolvedTone === 'error' ? 'assertive' : 'polite'}
      className={cn(
        'flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-sm',
        styles.wrapper,
        className
      )}
    >
      <span className="mt-0.5 shrink-0">{styles.icon}</span>
      <p className="min-w-0 flex-1 leading-6 break-words">{message}</p>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          className="-mr-1 shrink-0 rounded-lg p-1 opacity-60 transition hover:bg-black/5 hover:opacity-100"
          aria-label="Dismiss message"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
