import { useEffect, useId, useRef } from 'react';
import { adminButton } from './buttons';
import { cn } from '../ui/utils';

export type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * Modal confirmation built on the native <dialog>, so focus trapping, Escape and
 * the top layer come from the browser. Focus starts on the safe choice.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      cancelRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={event => {
        event.preventDefault();
        onCancel();
      }}
      onClick={event => {
        // A click on the dialog element itself (not its content) landed on the backdrop.
        if (event.target === event.currentTarget) onCancel();
      }}
      className="m-auto w-[min(26rem,calc(100vw-2rem))] rounded-2xl border border-[#f0e2d8] bg-white p-0 text-[#3d1d17] shadow-[0_24px_60px_rgba(61,29,23,0.25)] backdrop:bg-[rgba(26,14,11,0.45)] open:animate-in open:fade-in-0 open:zoom-in-95 open:duration-150"
    >
      <div className="p-5">
        <h2 id={titleId} className="text-base font-semibold">
          {title}
        </h2>
        {description ? (
          <p id={descriptionId} className="mt-2 text-sm leading-6 text-[#6e4737]">
            {description}
          </p>
        ) : null}
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button ref={cancelRef} type="button" onClick={onCancel} className={adminButton.secondary}>
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={cn(adminButton.danger, 'border-red-500 bg-red-600 text-white hover:bg-red-700')}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
