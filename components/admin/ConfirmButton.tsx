import { useEffect, useRef, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { adminButton } from './buttons';
import { cn } from '../ui/utils';

export type ConfirmButtonProps = {
  onConfirm: () => void | Promise<void>;
  /** Idle label. */
  label?: string;
  /** Label shown while the button waits for the second click. */
  confirmLabel?: string;
  icon?: React.ReactNode;
  className?: string;
};

/**
 * Two-step destructive action. Deletes here are permanent and used to fire on a
 * single stray click, so the button asks once and resets itself if ignored.
 */
export function ConfirmButton({
  onConfirm,
  label = 'Delete',
  confirmLabel = 'Confirm delete',
  icon = <Trash2 className="h-3.5 w-3.5" />,
  className,
}: ConfirmButtonProps) {
  const [armed, setArmed] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const disarm = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    setArmed(false);
  };

  return (
    <button
      type="button"
      onClick={async () => {
        if (!armed) {
          setArmed(true);
          timeoutRef.current = window.setTimeout(() => setArmed(false), 4000);
          return;
        }

        disarm();
        await onConfirm();
      }}
      onBlur={disarm}
      className={cn(
        armed ? `${adminButton.danger} border-red-500 bg-red-600 text-white hover:bg-red-700` : adminButton.danger,
        className
      )}
    >
      {icon}
      {armed ? confirmLabel : label}
    </button>
  );
}
