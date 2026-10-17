/** Shared class strings so the growth tools match the redesigned pages. */

/** Ink-bordered white card. */
export const CARD = 'rounded-[28px] border-2 border-pl-ink bg-white';

/** Springy lift with the red offset shadow, as on the growth tool cards. */
export const CARD_HOVER =
  'transition-[transform,box-shadow] [transition-duration:450ms] [transition-timing-function:cubic-bezier(.3,1.5,.5,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0_#e1251b] motion-reduce:transition-none motion-reduce:hover:translate-y-0';

/** Small uppercase label. */
export const KICKER = 'text-[13px] font-bold uppercase tracking-[0.08em]';

/** Red uppercase heading used inside cards ("Do this today"). */
export const LABEL = 'text-[14px] font-bold uppercase tracking-[0.08em] text-pl-red';

/** Category pill. */
export const TAG = 'pl-tag bg-pl-blush text-pl-deep';

/** Quiet inset panel inside a card. */
export const INSET = 'rounded-[20px] bg-pl-blush p-5';

/** Secondary text link styled button. */
export const TEXT_LINK = 'min-h-[44px] font-semibold text-pl-muted underline underline-offset-4 hover:text-pl-ink';

/** Pill progress track and fill. */
export const TRACK = 'h-3 w-full overflow-hidden rounded-full border-2 border-pl-ink bg-white';
export const FILL = 'h-full rounded-full bg-pl-red transition-[width] duration-500 motion-reduce:transition-none';

export const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
