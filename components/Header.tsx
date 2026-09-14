import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, Sparkles, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

type NavChild = {
  name: string;
  href: string;
};

type NavItem = {
  name: string;
  href: string;
  children?: readonly NavChild[];
};

const NAV_ITEMS: readonly NavItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'About',
    href: '/about-love',
    children: [
      { name: 'Family First', href: '/family-first' },
      { name: 'Pride & Humility', href: '/pride-and-humility' },
    ],
  },
  { name: 'Messages', href: '/messages' },
  {
    name: 'Resources',
    href: '/resources',
    children: [
      { name: 'Yellow Card', href: '/yellow-card' },
      { name: 'Yellow Card Series', href: '/yellow-card-series' },
      { name: 'Publications', href: '/publications' },
      { name: 'Bible Passages', href: '/bible-passages' },
      { name: 'Characteristics', href: '/characteristics' },
    ],
  },
  { name: 'Growth', href: '/growth' },
] as const;

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb27a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0e0b]';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;
  const isChildActive = (children?: readonly NavChild[]) =>
    children ? children.some(child => location.pathname === child.href) : false;

  const closeAll = useCallback(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, []);

  // Close everything on navigation.
  useEffect(() => {
    closeAll();
  }, [location.pathname, closeAll]);

  // Compact the bar once the page scrolls away from the top.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes any open menu.
  useEffect(() => {
    if (!isMenuOpen && !openDropdown) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAll();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen, openDropdown, closeAll]);

  // Click outside the desktop nav closes an open dropdown.
  useEffect(() => {
    if (!openDropdown) return;
    const onPointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [openDropdown]);

  // Lock the page behind the mobile drawer.
  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`material-dark sticky top-0 z-50 border-b bg-[rgba(26,14,11,0.92)] backdrop-blur-2xl transition-[border-color,box-shadow] duration-200 ${
          isScrolled || isMenuOpen
            ? 'border-white/10 shadow-[0_10px_30px_rgba(17,8,6,0.28)]'
            : 'border-transparent shadow-none'
        }`}
      >
        <a
          href="#main-content"
          className={`sr-only rounded-full bg-[#1a0e0b] px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-[60] ${FOCUS_RING}`}
        >
          Skip to content
        </a>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* The compact state snaps in: animating padding and max-height reflows every frame and stutters. */}
          <div className={isScrolled ? 'py-1.5' : 'py-3'}>
            <div className="flex items-center justify-between gap-4">
              <Link
                to="/"
                className={`group flex min-w-0 flex-1 items-center gap-3 rounded-[1.2rem] lg:flex-none ${FOCUS_RING}`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] bg-white/8 transition-colors group-hover:bg-white/14">
                  <Logo className="h-7 w-7" />
                </div>
                <div className="min-w-0 leading-tight">
                  <p
                    title="Practical Love Ministry (Logosrhema)"
                    className="truncate text-sm font-semibold uppercase tracking-[0.16em] text-[#ffcda7]"
                  >
                    Practical Love Ministry
                  </p>
                  <p
                    title="Logosrhema: biblical love, practiced daily"
                    className={`mt-1 truncate text-xs text-[#f6dfc6] ${isScrolled ? 'hidden sm:block' : ''}`}
                  >
                    Logosrhema: biblical love, practiced daily
                  </p>
                </div>
              </Link>

              <nav
                ref={navRef}
                aria-label="Primary"
                className="hidden flex-1 items-center justify-center gap-1 lg:flex"
              >
                {NAV_ITEMS.map(item => {
                  const isCurrent = isActive(item.href) || isChildActive(item.children);

                  if (!item.children) {
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        aria-current={isCurrent ? 'page' : undefined}
                        className={`relative flex h-11 items-center rounded-full px-4 text-sm font-medium transition-colors ${FOCUS_RING} ${
                          isCurrent
                            ? 'bg-white/12 text-white'
                            : 'text-[#f6dfc6] hover:bg-white/8 hover:text-white'
                        }`}
                      >
                        {item.name}
                        {isCurrent && (
                          <span className="absolute inset-x-4 bottom-1 h-0.5 rounded-full bg-[#eb9a4f]" />
                        )}
                      </Link>
                    );
                  }

                  const isOpen = openDropdown === item.name;

                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <div
                        className={`flex items-center rounded-full transition-colors ${
                          isCurrent
                            ? 'bg-white/12 text-white'
                            : 'text-[#f6dfc6] hover:bg-white/8 hover:text-white'
                        }`}
                      >
                        <Link
                          to={item.href}
                          aria-current={isCurrent ? 'page' : undefined}
                          className={`relative flex h-11 items-center rounded-full pl-4 pr-1 text-sm font-medium ${FOCUS_RING}`}
                        >
                          {item.name}
                          {isCurrent && (
                            <span className="absolute inset-x-4 bottom-1 h-0.5 rounded-full bg-[#eb9a4f]" />
                          )}
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenDropdown(current => (current === item.name ? null : item.name))
                          }
                          className={`flex h-11 w-11 items-center justify-center rounded-full ${FOCUS_RING}`}
                          aria-label={`Toggle ${item.name} menu`}
                          aria-haspopup="true"
                          aria-expanded={isOpen}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Grows from the top edge under its item: fade + scale 0.96 → 1. */}
                      <div
                        className={`absolute left-1/2 top-full w-72 -translate-x-1/2 origin-top pt-2 transition-[opacity,transform,visibility] duration-150 ease-out motion-reduce:transition-opacity ${
                          isOpen
                            ? 'visible scale-100 opacity-100'
                            : 'pointer-events-none invisible scale-[0.96] opacity-0'
                        }`}
                      >
                        <div className="material-dark overflow-hidden rounded-[1.5rem] border border-white/10 bg-[rgba(31,16,12,0.94)] p-2 shadow-[0_24px_44px_rgba(17,8,6,0.28)] backdrop-blur-2xl">
                          <Link
                            to={item.href}
                            className={`block rounded-[1.1rem] border border-white/8 bg-white/6 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 ${FOCUS_RING}`}
                          >
                            Open {item.name}
                          </Link>
                          <div className="mt-2 space-y-1">
                            {item.children.map(child => (
                              <Link
                                key={child.name}
                                to={child.href}
                                aria-current={isActive(child.href) ? 'page' : undefined}
                                className={`block rounded-[1.1rem] px-4 py-3 text-sm transition-colors ${FOCUS_RING} ${
                                  isActive(child.href)
                                    ? 'bg-white/10 text-white'
                                    : 'text-[#f6dfc6] hover:bg-white/8 hover:text-white'
                                }`}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </nav>

              <div className="hidden lg:flex">
                <Link to="/contact" className="btn-brand px-5 py-2.5 text-sm">
                  Contact
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setIsMenuOpen(current => !current)}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/8 text-[#f9e7d3] transition-colors hover:bg-white/12 lg:hidden ${FOCUS_RING}`}
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu: slides down out of the header's bottom edge and back up the same way. */}
        <div
          className={`absolute inset-x-0 top-full overflow-hidden lg:hidden ${
            isMenuOpen ? '' : 'pointer-events-none'
          }`}
        >
          <div
            id="mobile-navigation"
            className={`max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-b border-white/10 bg-[rgba(26,14,11,0.97)] shadow-[0_24px_44px_rgba(17,8,6,0.35)] transition-[transform,visibility] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none ${
              isMenuOpen ? 'visible translate-y-0' : 'invisible -translate-y-full'
            }`}
          >
            <div className="mx-auto max-w-7xl px-4 pb-6 pt-4 sm:px-6">
              <nav aria-label="Mobile" className="space-y-2">
                {NAV_ITEMS.map(item => {
                  const isCurrent = isActive(item.href) || isChildActive(item.children);

                  if (!item.children) {
                    return (
                      <div key={item.name} className="rounded-[1.4rem] bg-white/4 p-1">
                        <Link
                          to={item.href}
                          aria-current={isCurrent ? 'page' : undefined}
                          className={`block rounded-[1.1rem] px-4 py-3 text-sm font-medium ${FOCUS_RING} ${
                            isCurrent
                              ? 'bg-white/10 text-white'
                              : 'text-[#f6dfc6] hover:bg-white/8 hover:text-white'
                          }`}
                        >
                          {item.name}
                        </Link>
                      </div>
                    );
                  }

                  const isOpen = openDropdown === item.name;

                  return (
                    <div key={item.name} className="rounded-[1.4rem] bg-white/4 p-1">
                      <div className="flex items-center gap-1">
                        <Link
                          to={item.href}
                          aria-current={isCurrent ? 'page' : undefined}
                          className={`min-w-0 flex-1 rounded-[1.1rem] px-4 py-3 text-sm font-medium ${FOCUS_RING} ${
                            isCurrent
                              ? 'bg-white/10 text-white'
                              : 'text-[#f6dfc6] hover:bg-white/8 hover:text-white'
                          }`}
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenDropdown(current => (current === item.name ? null : item.name))
                          }
                          className={`flex h-11 w-12 items-center justify-center rounded-[1.1rem] text-[#f6dfc6] ${FOCUS_RING}`}
                          aria-label={`Toggle ${item.name} menu`}
                          aria-expanded={isOpen}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {isOpen && (
                        <div className="space-y-1 px-2 pb-2 pt-1">
                          {item.children.map(child => (
                            <Link
                              key={child.name}
                              to={child.href}
                              aria-current={isActive(child.href) ? 'page' : undefined}
                              className={`block rounded-[1rem] px-4 py-3 text-sm ${FOCUS_RING} ${
                                isActive(child.href)
                                  ? 'bg-white/10 text-white'
                                  : 'text-[#efd7c0] hover:bg-white/8 hover:text-white'
                              }`}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  to="/family-first"
                  className={`btn-outline-light gap-2 py-3 text-sm ${FOCUS_RING}`}
                >
                  <Sparkles className="h-4 w-4" />
                  Family first
                </Link>
                <Link to="/contact" className={`btn-outline-light py-3 text-sm ${FOCUS_RING}`}>
                  Contact the ministry
                </Link>
                <Link
                  to="/love-challenge"
                  className={`btn-brand py-3 text-sm sm:col-span-2 ${FOCUS_RING}`}
                >
                  Start challenge
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dims the page behind the mobile menu; tapping it closes the menu. Sits outside the
          header because the header's backdrop-filter would trap a fixed child inside it. */}
      <div
        aria-hidden="true"
        onClick={closeAll}
        className={`fixed inset-0 z-40 bg-[rgba(17,8,6,0.5)] transition-opacity duration-300 motion-reduce:transition-none lg:hidden ${
          isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
    </>
  );
}
