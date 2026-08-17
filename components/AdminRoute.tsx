import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader, Lock, LogOut } from 'lucide-react';
import { StatusBanner, adminButton } from './admin';
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
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="inline-flex items-center gap-2.5 text-sm text-[#8a6552]">
          <Loader className="h-4 w-4 animate-spin text-red-600" />
          Checking admin access...
        </div>
      </div>
    );
  }

  if (isAllowedAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#fdfaf7] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-[#f0e2d8] bg-white p-6 shadow-[0_1px_2px_rgba(61,29,23,0.04),0_10px_28px_-18px_rgba(61,29,23,0.25)]">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fdf3ec] text-red-600">
          <Lock className="h-5 w-5" />
        </span>

        <h1 className="mt-4 text-xl font-semibold tracking-tight text-[#3d1d17]">
          Admin sign-in required
        </h1>
        <p className="mt-1.5 text-sm leading-6 text-[#6e4737]">
          This area is restricted to approved ministry Google accounts.
        </p>

        {user ? (
          <StatusBanner
            className="mt-4"
            tone="error"
            message={`Signed in as ${user.email}, but this account is not on the admin list.`}
          />
        ) : null}

        {errorMessage ? (
          <StatusBanner
            className="mt-3"
            tone="error"
            message={errorMessage}
            onDismiss={() => setErrorMessage('')}
          />
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
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
            className={adminButton.primary}
          >
            Sign in with Google
          </button>

          {user ? (
            <button
              type="button"
              onClick={async () => {
                await signOutAdmin();
              }}
              className={adminButton.secondary}
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          ) : null}

          <Link to="/messages" className={adminButton.ghost}>
            Go to public feed
          </Link>
        </div>
      </div>
    </div>
  );
}
