import { useEffect, useState } from 'react';
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
    name: 'About Love',
    href: '/about-love',
    children: [
      { name: 'Characteristics of Love', href: '/characteristics' },
      { name: 'Bible Passages', href: '/bible-passages' },
      { name: 'Mission and Vision', href: '/mission-vision' },
    ],
  },
  {
    name: 'Resources',
    href: '/resources',
    children: [
      { name: 'Yellow Card', href: '/yellow-card' },
      { name: 'Yellow Card Series', href: '/yellow-card-series' },
      { name: 'Publications', href: '/publications' },
    ],
  },
  { name: 'Love in Nigeria', href: '/love-in-nigeria' },
  { name: 'Growth', href: '/growth' },
  { name: 'Donate', href: '/donate' },
  { name: 'Contact', href: '/contact' },
] as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;
  const isChildActive = (children?: readonly NavChild[]) =>
    children ? children.some(child => location.pathname === child.href) : false;

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 px-3 py-3 sm:px-4">
      <div className="mx-auto max-w-7xl">
        <div className="glass-border rounded-[1.9rem] bg-[rgba(26,14,11,0.76)] px-4 py-3 shadow-[0_18px_42px_rgba(17,8,6,0.18)] backdrop-blur-2xl sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[1.25rem] bg-white/8">
                <Logo className="h-8 w-8" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold uppercase tracking-[0.22em] text-[#ffcda7]">
                  Practical Love
                </p>
                <p className="truncate font-serif text-xl text-white">Come home to the standard</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_ITEMS.map(item => {
                const isCurrent = isActive(item.href) || isChildActive(item.children);

                if (!item.children) {
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        isCurrent
                          ? 'bg-white/12 text-white'
                          : 'text-[#f6dfc6] hover:bg-white/8 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                }

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
                      <Link to={item.href} className="rounded-full px-4 py-2 text-sm font-medium">
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDropdown(current => (current === item.name ? null : item.name))
                        }
                        className="rounded-full px-3 py-2 text-sm"
                        aria-label={`Toggle ${item.name} menu`}
                        aria-expanded={openDropdown === item.name}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openDropdown === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>

                    <div
                      className={`absolute left-0 top-full mt-3 w-72 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[rgba(31,16,12,0.94)] p-2 shadow-[0_24px_44px_rgba(17,8,6,0.28)] transition-all ${
                        openDropdown === item.name
                          ? 'visible translate-y-0 opacity-100'
                          : 'invisible -translate-y-2 opacity-0'
                      }`}
                    >
                      <Link
                        to={item.href}
                        className="block rounded-[1.1rem] border border-white/8 bg-white/6 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                      >
                        Open {item.name}
                      </Link>
                      <div className="mt-2 space-y-1">
                        {item.children.map(child => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={`block rounded-[1.1rem] px-4 py-3 text-sm transition-colors ${
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
                );
              })}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <Link
                to="/family-first"
                className={`pill border-white/10 bg-white/6 text-[#ffe0c2] transition-colors hover:bg-white/12 ${
                  isActive('/family-first') ? 'bg-white/12 text-white' : ''
                }`}
              >
                <Sparkles className="h-4 w-4" />
                Family first.
              </Link>
              <Link to="/love-challenge" className="btn-brand px-5 py-2.5 text-sm">
                Start challenge
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(current => !current)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/8 text-[#f9e7d3] transition-colors hover:bg-white/12 lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="mt-4 border-t border-white/10 pt-4 lg:hidden">
              <div className="space-y-2">
                {NAV_ITEMS.map(item => {
                  const isCurrent = isActive(item.href) || isChildActive(item.children);

                  if (!item.children) {
                    return (
                      <div key={item.name} className="rounded-[1.4rem] bg-white/4 p-1">
                        <Link
                          to={item.href}
                          className={`block rounded-[1.1rem] px-4 py-3 text-sm font-medium ${
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

                  return (
                    <div key={item.name} className="rounded-[1.4rem] bg-white/4 p-1">
                      <div className="flex items-center gap-1">
                        <Link
                          to={item.href}
                          className={`min-w-0 flex-1 rounded-[1.1rem] px-4 py-3 text-sm font-medium ${
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
                          className="rounded-[1.1rem] px-4 py-3 text-[#f6dfc6]"
                          aria-label={`Toggle ${item.name} menu`}
                          aria-expanded={openDropdown === item.name}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              openDropdown === item.name ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {openDropdown === item.name && (
                        <div className="space-y-1 px-2 pb-2 pt-1">
                          {item.children.map(child => (
                            <Link
                              key={child.name}
                              to={child.href}
                              className={`block rounded-[1rem] px-4 py-3 text-sm ${
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
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link to="/family-first" className="pill justify-center border-white/10 bg-white/6 py-3 text-[#ffe0c2]">
                  <Sparkles className="h-4 w-4" />
                  Family first.
                </Link>
                <Link to="/love-challenge" className="btn-brand py-3 text-sm">
                  Start the 30 day challenge
                </Link>
                <Link to="/contact" className="btn-outline-light py-3 text-sm">
                  Contact the ministry
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
