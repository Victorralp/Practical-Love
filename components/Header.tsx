import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'About', href: '/about-love' },
  { label: 'Messages', href: '/messages' },
  { label: 'Resources', href: '/resources' },
  { label: 'Prayer wall', href: '/prayer' },
] as const;

/** Everything reachable from the compact menu, grouped like the old dropdowns. */
const MENU_GROUPS = [
  {
    title: 'Start here',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About love', href: '/about-love' },
      { label: 'Mission & vision', href: '/mission-vision' },
      { label: 'Family first', href: '/family-first' },
      { label: 'Pride & humility', href: '/pride-and-humility' },
      { label: 'Love in Nigeria', href: '/love-in-nigeria' },
    ],
  },
  {
    title: 'Read & practise',
    links: [
      { label: 'Messages', href: '/messages' },
      { label: 'Resources', href: '/resources' },
      { label: 'Yellow Card', href: '/yellow-card' },
      { label: 'Publications', href: '/publications' },
      { label: 'Characteristics', href: '/characteristics' },
      { label: 'Bible passages', href: '/bible-passages' },
      { label: 'Love challenge', href: '/love-challenge' },
      { label: 'Growth', href: '/growth' },
    ],
  },
  {
    title: 'Together',
    links: [
      { label: 'Prayer wall', href: '/prayer' },
      { label: 'Testimonies', href: '/testimonies' },
      { label: 'Share a testimony', href: '/share-testimony' },
      { label: 'Contact', href: '/contact' },
      { label: 'Give a gift', href: '/donate' },
    ],
  },
] as const;

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`text-[20px] font-extrabold tracking-[-0.02em] ${className}`}>
      practical<span className="text-pl-red">♥</span>love
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="pl-glass sticky top-0 z-50 border-b border-pl-hair bg-white/90 backdrop-blur-[8px]">
      <a
        href="#main-content"
        className="sr-only rounded-full bg-pl-ink px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60]"
      >
        Skip to content
      </a>
      <div className="pl-wrap flex items-center gap-[clamp(16px,3vw,32px)] py-[14px]">
        <Link to="/" className="mr-auto flex min-h-[44px] items-center text-pl-ink no-underline hover:text-pl-ink" aria-label="Practical Love home">
          <Wordmark />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-[clamp(16px,3vw,32px)] min-[880px]:flex">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `flex min-h-[44px] items-center text-[15px] no-underline transition-colors hover:text-pl-red ${
                  isActive ? 'font-semibold text-pl-red' : 'text-pl-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Link
          to="/donate"
          className="flex min-h-[44px] items-center rounded-full bg-pl-red px-[22px] text-[15px] font-semibold text-white no-underline transition-colors hover:bg-pl-press hover:text-white"
        >
          Give a gift
        </Link>
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          aria-controls="pl-menu"
          className="flex min-h-[44px] items-center rounded-full border-2 border-pl-ink px-[18px] text-[15px] font-semibold text-pl-ink min-[880px]:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <div id="pl-menu" className="min-[880px]:hidden fixed inset-x-0 bottom-0 top-[73px] z-40 overflow-y-auto border-t border-pl-hair bg-white">
          <nav aria-label="All pages" className="pl-wrap grid gap-10 py-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
            {MENU_GROUPS.map(group => (
              <div key={group.title}>
                <p className="pl-eyebrow mb-4 text-pl-red">{group.title}</p>
                <ul className="m-0 list-none space-y-1 p-0">
                  {group.links.map(link => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="flex min-h-[44px] items-center text-[clamp(22px,2.4vw,28px)] font-extrabold tracking-[-0.03em] text-pl-ink no-underline hover:text-pl-red"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
