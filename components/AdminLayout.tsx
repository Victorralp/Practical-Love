import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  HandHeart,
  HeartHandshake,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  X,
} from 'lucide-react';
import Logo from './Logo';
import { subscribeToAdminAuth, signOutAdmin } from '../services/adminAuthService';
import { cn } from './ui/utils';
import type { User } from 'firebase/auth';

type AdminNavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const ADMIN_NAV: AdminNavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="h-[1.15rem] w-[1.15rem]" /> },
  { label: 'Messages', href: '/admin/messages', icon: <Megaphone className="h-[1.15rem] w-[1.15rem]" /> },
  { label: 'Publications', href: '/admin/publications', icon: <BookOpen className="h-[1.15rem] w-[1.15rem]" /> },
  { label: 'Testimonies', href: '/admin/testimonies', icon: <HandHeart className="h-[1.15rem] w-[1.15rem]" /> },
  { label: 'Prayers', href: '/admin/prayers', icon: <HeartHandshake className="h-[1.15rem] w-[1.15rem]" /> },
];

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAdminAuth(({ user: currentUser }) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // The drawer covers the page, so keep the page behind it from scrolling.
  useEffect(() => {
    if (!mobileOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(href);
  };

  const currentSection = ADMIN_NAV.find(item => isActive(item.href))?.label ?? 'Admin';

  const sidebarContent = (isCollapsed: boolean) => (
    <>
      <div className={cn('flex items-center gap-3 px-4 py-5', isCollapsed && 'justify-center px-2')}>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 text-white shadow-sm">
          <Logo className="h-5 w-5" />
        </span>
        {!isCollapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight text-[#3d1d17]">
              Practical Love
            </p>
            <p className="text-xs text-[#a8735c]">Admin panel</p>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3">
        {!isCollapsed && (
          <p className="px-3 pb-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#c0a695]">
            Manage
          </p>
        )}
        <ul className="space-y-0.5">
          {ADMIN_NAV.map(item => {
            const active = isActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  title={isCollapsed ? item.label : undefined}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition',
                    isCollapsed && 'justify-center px-2',
                    active
                      ? 'bg-[#fdf3ec] text-red-700'
                      : 'text-[#6e4737] hover:bg-[#fdf8f4] hover:text-[#3d1d17]'
                  )}
                >
                  {active && (
                    <span
                      className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-red-600"
                      aria-hidden="true"
                    />
                  )}
                  <span className={cn('shrink-0', active ? 'text-red-600' : 'text-[#bda392]')}>
                    {item.icon}
                  </span>
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-[#f0e2d8] p-3">
        {user && !isCollapsed && (
          <div className="mb-2 flex items-center gap-2.5 rounded-lg px-2 py-2">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt=""
                className="h-8 w-8 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fdf3ec] text-xs font-semibold text-red-700">
                {(user.displayName ?? user.email ?? '?').charAt(0).toUpperCase()}
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[#3d1d17]">
                {user.displayName ?? 'Signed in'}
              </p>
              <p className="truncate text-xs text-[#a8735c]" title={user.email ?? ''}>
                {user.email}
              </p>
            </div>
          </div>
        )}

        <Link
          to="/"
          title={isCollapsed ? 'Back to site' : undefined}
          className={cn(
            'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#6e4737] transition hover:bg-[#fdf8f4] hover:text-[#3d1d17]',
            isCollapsed && 'justify-center px-2'
          )}
        >
          <ChevronLeft className="h-4 w-4 shrink-0" />
          {!isCollapsed && <span>Back to site</span>}
        </Link>

        <button
          type="button"
          onClick={async () => {
            await signOutAdmin();
          }}
          title={isCollapsed ? 'Sign out' : undefined}
          className={cn(
            'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50',
            isCollapsed && 'justify-center px-2'
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!isCollapsed && <span>Sign out</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#fdfaf7]">
      {/* ── Desktop sidebar ──────────────────────────────────────────── */}
      <aside
        className={cn(
          'sticky top-0 hidden h-screen shrink-0 flex-col border-r border-[#f0e2d8] bg-white transition-[width] duration-200 lg:flex',
          collapsed ? 'w-[72px]' : 'w-60'
        )}
      >
        <div className="flex flex-1 flex-col overflow-y-auto">{sidebarContent(collapsed)}</div>

        <button
          type="button"
          onClick={() => setCollapsed(current => !current)}
          className="flex items-center justify-center gap-2 border-t border-[#f0e2d8] px-3 py-2.5 text-xs font-medium text-[#8a6552] transition hover:bg-[#fdf8f4]"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </aside>

      {/* ── Mobile drawer ────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-[#2a140f]/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-[17rem] flex-col bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 rounded-lg p-1.5 text-[#8a6552] transition hover:bg-[#fdf8f4]"
              aria-label="Close admin menu"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex flex-1 flex-col overflow-y-auto">{sidebarContent(false)}</div>
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* ── Mobile top bar ─────────────────────────────────────────── */}
        <div className="sticky top-0 z-40 flex items-center gap-3 border-b border-[#f0e2d8] bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-[#5c3a2b] transition hover:bg-[#fdf8f4]"
            aria-label="Open admin menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold text-[#3d1d17]">{currentSection}</span>
        </div>

        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
