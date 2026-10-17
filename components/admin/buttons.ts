/**
 * Button recipes for the admin panel. Kept as plain strings so pages can drop
 * them onto buttons, links, and file-input labels alike.
 */
const base =
  'inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full text-[14px] font-semibold no-underline transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pl-red/15 disabled:cursor-not-allowed disabled:opacity-60';

export const adminButton = {
  primary: `${base} min-h-[46px] bg-pl-red px-5 text-[15px] font-bold text-white hover:bg-pl-press hover:text-white`,
  secondary: `${base} min-h-[46px] border border-[#d9cbc8] bg-white px-5 text-pl-ink hover:border-pl-ink hover:text-pl-ink`,
  ghost: `${base} px-3 text-pl-ink hover:bg-[#f3ecea]`,
  subtle: `${base} border border-[#d9cbc8] bg-white px-[14px] text-[13px] text-pl-ink hover:border-pl-ink`,
  danger: `${base} border border-[#f3c6c2] bg-white px-[14px] text-[13px] text-pl-press hover:bg-pl-blush`,
  success: `${base} bg-pl-ink px-[14px] text-[13px] text-white hover:bg-black hover:text-white`,
} as const;
