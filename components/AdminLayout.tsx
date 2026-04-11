import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  HandHeart,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  X,
} from 'lucide-react';
import Logo from './Logo';
import { subscribeToAdminAuth, signOutAdmin } from '../services/adminAuthService';
import type { User } from 'firebase/auth';

type AdminNavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const ADMIN_NAV: AdminNavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Messages', href: '/admin/messages', icon: <Megaphone className="h-5 w-5" /> },
  { label: 'Publications', href: '/admin/publications', icon: <BookOpen className="h-5 w-5" /> },
  {
    label: 'Testimonies',
    href: '/admin/testimonies',
    icon: <HandHeart className="h-5 w-5" />,
  },
  {
    label: 'Prayers',
    href: '/admin/prayers',
    icon: (
      <span className="text-lg leading-none" aria-hidden="true">
        🙏
      </span>
    ),
  },
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

  const isActive = (href: string) => {
    if (href === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(href);
  };

  const sidebarContent = (
    <>
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 text-white shadow-lg">
          <Logo className="h-6 w-6" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-sm font-bold tracking-wide text-[#3d1d17]">Practical Love</p>
            <p className="text-xs text-[#6e4737]">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-orange-100" />

      {/* Navigation */}
      <nav className="mt-4 flex-1 space-y-1 px-3">
        {ADMIN_NAV.map(item => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              title={collapsed ? item.label : undefined}
              className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md shadow-red-200/40'
                  : 'text-[#6e4737] hover:bg-orange-50 hover:text-red-700'
              }`}
            >
              <span
                className={`shrink-0 ${active ? 'text-white' : 'text-red-400 group-hover:text-red-600'}`}
              >
                {item.icon}
              </span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User info + sign-out */}
      <div className="border-t border-orange-100 px-4 py-4">
        {user && !collapsed && (
          <p className="mb-2 truncate text-xs text-[#6e4737]" title={user.email ?? ''}>
            {user.email}
          </p>
        )}
        <button
          type="button"
          onClick={async () => {
            await signOutAdmin();
          }}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Sign out</span>}
        </button>

        {/* Back to site */}
        <Link
          to="/"
          className="mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[#6e4737] transition hover:bg-orange-50 hover:text-red-700"
        >
          <ChevronLeft className="h-4 w-4" />
          {!collapsed && <span>Back to site</span>}
        </Link>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(254,215,170,0.28),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(248,113,113,0.16),_transparent_34%),linear-gradient(180deg,_#fffaf5_0%,_#ffffff_50%,_#fff7ed_100%)]">
      {/* ── Desktop Sidebar ──────────────────────────────────────────── */}
      <aside
        className={`hidden lg:flex lg:flex-col lg:shrink-0 border-r border-orange-100 bg-white/80 backdrop-blur-xl transition-all duration-300 ${
          collapsed ? 'lg:w-[72px]' : 'lg:w-64'
        }`}
      >
        <div className="flex flex-1 flex-col overflow-y-auto">{sidebarContent}</div>

        {/* Collapse button */}
        <button
          type="button"
          onClick={() => setCollapsed(c => !c)}
          className="mx-3 mb-3 flex items-center justify-center gap-2 rounded-xl border border-orange-100 bg-white px-3 py-2 text-xs text-[#6e4737] transition hover:bg-orange-50"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </aside>

      {/* ── Mobile Hamburger ─────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-orange-500 text-white shadow-xl lg:hidden"
        aria-label="Open admin menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* ── Mobile Drawer ────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between px-4 pt-4">
              <span className="text-sm font-bold text-[#3d1d17]">Admin</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-full p-2 text-[#6e4737] hover:bg-orange-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto">{sidebarContent}</div>
          </aside>
        </div>
      )}

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
