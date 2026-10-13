import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { User } from 'firebase/auth';
import { subscribeToAdminAuth, signOutAdmin } from '../services/adminAuthService';
import { subscribeToAllTestimonies } from '../services/testimoniesService';
import { filterPrayerRequestsForAdmin, subscribeToAllPrayerRequests } from '../services/messagePostsService';

type NavKey = 'dashboard' | 'messages' | 'publications' | 'testimonies' | 'prayers';

const ADMIN_NAV: { key: NavKey; label: string; short: string; href: string }[] = [
  { key: 'dashboard', label: 'Dashboard', short: 'Home', href: '/admin' },
  { key: 'messages', label: 'Messages', short: 'Msgs', href: '/admin/messages' },
  { key: 'publications', label: 'Publications', short: 'Books', href: '/admin/publications' },
  { key: 'testimonies', label: 'Testimonies', short: 'Stories', href: '/admin/testimonies' },
  { key: 'prayers', label: 'Prayers', short: 'Prayer', href: '/admin/prayers' },
];

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { pathname } = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [pending, setPending] = useState({ testimonies: 0, prayers: 0 });

  useEffect(() => subscribeToAdminAuth(({ user: currentUser }) => setUser(currentUser)), []);

  // Pending counts drive the nav badges, so moderation work is visible from any admin page.
  useEffect(() => {
    const unsubs = [
      subscribeToAllTestimonies(
        list => setPending(p => ({ ...p, testimonies: list.filter(t => t.status === 'pending').length })),
        () => undefined
      ),
      subscribeToAllPrayerRequests(
        list => setPending(p => ({ ...p, prayers: filterPrayerRequestsForAdmin(list, 'pending').length })),
        () => undefined
      ),
    ];
    return () => unsubs.forEach(unsub => unsub());
  }, []);

  const isActive = (href: string) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href));
  const badge = (key: NavKey) => (key === 'testimonies' ? pending.testimonies : key === 'prayers' ? pending.prayers : 0);

  return (
    <div className="flex min-h-screen bg-[#faf7f6] text-pl-ink">
      <aside className="sticky top-0 hidden h-screen w-[248px] flex-none flex-col gap-[6px] bg-pl-ink px-4 py-6 text-white min-[860px]:flex">
        <Link to="/admin" className="px-[10px] pb-5 text-[19px] font-extrabold tracking-[-0.02em] text-white no-underline hover:text-white">
          practical<span className="text-pl-red">♥</span>love <span className="ml-1 text-[12px] font-semibold opacity-60">admin</span>
        </Link>
        <nav aria-label="Admin" className="flex flex-col gap-[6px]">
          {ADMIN_NAV.map(item => {
            const active = isActive(item.href);
            const count = badge(item.key);
            return (
              <Link
                key={item.key}
                to={item.href}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-[46px] items-center justify-between rounded-[12px] px-[14px] text-[15px] font-semibold text-white no-underline transition-colors duration-200 hover:bg-white/10 hover:text-white ${
                  active ? 'bg-white/[.12]' : ''
                }`}
              >
                {item.label}
                {count > 0 && (
                  <span className="min-w-[22px] rounded-full bg-pl-red px-[7px] py-[2px] text-center text-[12px]" aria-label={`${count} pending`}>
                    {count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-white/[.12] px-[10px] pt-[14px] text-[13px] opacity-70">
          <span className="block truncate" title={user?.email ?? ''}>
            {user?.email ?? 'Signed in'}
          </span>
        </div>
        <Link to="/" className="flex min-h-[44px] items-center px-[14px] text-[14px] text-white no-underline opacity-85 hover:text-white hover:opacity-100">
          ← Back to site
        </Link>
        <button
          type="button"
          onClick={() => void signOutAdmin()}
          className="flex min-h-[44px] items-center px-[14px] text-left text-[14px] text-pl-coral opacity-90 hover:opacity-100"
        >
          Sign out
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-[#eadfdc] bg-white px-4 py-2 min-[860px]:hidden">
          <Link to="/admin" className="flex min-h-[44px] items-center text-[17px] font-extrabold tracking-[-0.02em] text-pl-ink no-underline hover:text-pl-ink">
            practical<span className="text-pl-red">♥</span>love <span className="ml-1 text-[12px] font-semibold opacity-60">admin</span>
          </Link>
          <div className="flex items-center gap-1 text-[14px]">
            <Link to="/" className="flex min-h-[44px] items-center px-2 font-semibold text-pl-ink no-underline">
              Site
            </Link>
            <button type="button" onClick={() => void signOutAdmin()} className="min-h-[44px] px-2 font-semibold text-pl-red">
              Sign out
            </button>
          </div>
        </div>

        <div className="min-w-0 flex-1 px-[clamp(16px,3.4vw,40px)] pb-[96px] pt-[clamp(20px,3.4vw,40px)] min-[860px]:pb-12">
          <div className="mx-auto max-w-6xl">{children}</div>
        </div>
      </div>

      <nav
        aria-label="Admin"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 bg-pl-ink pb-[env(safe-area-inset-bottom)] min-[860px]:hidden"
      >
        {ADMIN_NAV.map(item => {
          const active = isActive(item.href);
          const count = badge(item.key);
          return (
            <Link
              key={item.key}
              to={item.href}
              aria-current={active ? 'page' : undefined}
              aria-label={count ? `${item.label}, ${count} pending` : item.label}
              className={`relative flex min-h-[60px] items-center justify-center text-[12px] font-semibold no-underline hover:text-white ${
                active ? 'text-white' : 'text-white/60'
              }`}
            >
              {item.short}
              <span
                aria-hidden="true"
                className={`absolute inset-x-1/4 top-0 h-[3px] bg-pl-red transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`}
              />
              {count > 0 && <span aria-hidden="true" className="absolute right-[22%] top-3 h-2 w-2 rounded-full bg-pl-red" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
