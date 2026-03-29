import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader, Lock, LogOut } from 'lucide-react';
import {
  subscribeToAdminAuth,
  signInAdminWithGoogle,
  signOutAdmin,
} from '../services/adminAuthService';
import type { User } from 'firebase/auth';

type AdminRouteProps = {
  children: React.ReactNode;
};

export default function AdminRoute({ children }: AdminRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAllowedAdmin, setIsAllowedAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToAdminAuth(({ user: currentUser, isAllowedAdmin }) => {
      setUser(currentUser);
      setIsAllowedAdmin(isAllowedAdmin);
      setIsChecking(false);
    });

    return unsubscribe;
  }, []);

  if (isChecking) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="inline-flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50 px-6 py-4 text-gray-700">
          <Loader className="h-5 w-5 animate-spin text-red-700" />
          Checking admin access...
        </div>
      </div>
    );
  }

  if (isAllowedAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-orange-100 bg-white/95 p-8 text-center shadow-[0_24px_48px_rgba(95,53,30,0.08)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-700">
          <Lock className="h-7 w-7" />
        </div>
        <h1 className="mt-5 font-serif text-4xl text-[#3d1d17]">Admin access required</h1>
        <p className="mt-4 text-lg leading-8 text-[#6e4737]">
          This page is restricted to the approved admin Google account.
        </p>
        {user ? (
          <p className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            Signed in as <strong>{user.email}</strong>, but this account is not allowed to manage
            posts.
          </p>
        ) : null}
        {errorMessage ? (
          <p className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={async () => {
              setErrorMessage('');
              try {
                await signInAdminWithGoogle();
              } catch (error) {
                setErrorMessage(
                  error instanceof Error ? error.message : 'Unable to sign in with Google.'
                );
              }
            }}
            className="btn-brand px-7 py-3"
          >
            Sign in with Google
          </button>
          {user ? (
            <button
              type="button"
              onClick={async () => {
                await signOutAdmin();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-orange-200 bg-white px-7 py-3 font-semibold text-orange-700 transition hover:bg-orange-50"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          ) : null}
          <Link to="/messages" className="btn-outline-brand px-7 py-3">
            Go to public feed
          </Link>
        </div>
      </div>
    </div>
  );
}
