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
  { name: 'About', href: '/about-love' },
  { name: 'Messages', href: '/messages' },
  { name: 'Family First', href: '/family-first' },
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
        <div className="glass-border rounded-[1.6rem] bg-[rgba(26,14,11,0.84)] px-4 py-2.5 shadow-[0_18px_42px_rgba(17,8,6,0.18)] backdrop-blur-2xl sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex min-w-0 flex-1 items-center gap-3 xl:max-w-[18rem]">
              <div className="flex h-10 w-10 items-center justify-center rounded-[1rem] bg-white/8">
                <Logo className="h-7 w-7" />
              </div>
              <div className="min-w-0 leading-tight">
                <p
                  title="Practical Love"
                  className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ffcda7]"
                >
                  Practical Love
                </p>
                <p
                  title="Biblical love, practiced daily"
                  className="mt-1 text-xs text-[#f6dfc6] sm:text-sm"
                >
                  Biblical love, practiced daily
                </p>
              </div>
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
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
                      className={`absolute left-0 top-full w-72 pt-3 transition-all ${
                        openDropdown === item.name
                          ? 'visible translate-y-0 opacity-100'
                          : 'invisible -translate-y-2 opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[rgba(31,16,12,0.94)] p-2 shadow-[0_24px_44px_rgba(17,8,6,0.28)]">
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
                  </div>
                );
              })}
            </nav>

            <div className="hidden xl:flex">
              <Link to="/contact" className="btn-brand px-5 py-2.5 text-sm">
                Contact
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(current => !current)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/8 text-[#f9e7d3] transition-colors hover:bg-white/12 xl:hidden"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="mt-4 border-t border-white/10 pt-4 xl:hidden">
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
                <Link
                  to="/family-first"
                  className="pill justify-center border-white/10 bg-white/6 py-3 text-[#ffe0c2]"
                >
                  <Sparkles className="h-4 w-4" />
                  Family first
                </Link>
                <Link to="/contact" className="btn-outline-light py-3 text-sm">
                  Contact the ministry
                </Link>
                <Link to="/love-challenge" className="btn-brand py-3 text-sm">
                  Start challenge
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
