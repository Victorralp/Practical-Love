import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import { auth } from './firebaseService';

export const ALLOWED_ADMIN_EMAILS = new Set(
  (import.meta.env.VITE_ADMIN_EMAIL ?? '')
    .split(',')
    .map((e: string) => e.trim().toLowerCase())
    .filter(Boolean)
);

const googleProvider = new GoogleAuthProvider();

export function subscribeToAdminAuth(
  callback: (payload: { user: User | null; isAllowedAdmin: boolean }) => void
) {
  return onAuthStateChanged(auth, user => {
    callback({
      user,
      isAllowedAdmin: Boolean(user?.email && ALLOWED_ADMIN_EMAILS.has(user.email.toLowerCase())),
    });
  });
}

export async function signInAdminWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function signOutAdmin() {
  return signOut(auth);
}
