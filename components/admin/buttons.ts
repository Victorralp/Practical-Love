/**
 * Button recipes for the admin panel. Kept as plain strings so pages can drop
 * them onto buttons, links, and file-input labels alike.
 */
const base =
  'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-500/15 disabled:cursor-not-allowed disabled:opacity-60';

export const adminButton = {
  primary: `${base} bg-red-700 px-4 py-2.5 text-white hover:bg-red-800`,
  secondary: `${base} border border-[#e8d9cd] bg-white px-4 py-2.5 text-[#5c3a2b] hover:bg-[#fdf8f4]`,
  ghost: `${base} px-3 py-2 text-[#6e4737] hover:bg-[#fdf3ec]`,
  subtle: `${base} border border-[#f0e2d8] bg-[#fdf8f4] px-3 py-1.5 text-[#5c3a2b] hover:bg-white`,
  danger: `${base} border border-red-200 bg-white px-3 py-1.5 text-red-700 hover:bg-red-50`,
  success: `${base} border border-emerald-200 bg-white px-3 py-1.5 text-emerald-700 hover:bg-emerald-50`,
} as const;
