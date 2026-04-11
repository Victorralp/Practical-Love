import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import { auth } from './firebaseService';

export const ALLOWED_ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL ?? '').toLowerCase();

const googleProvider = new GoogleAuthProvider();

export function subscribeToAdminAuth(
  callback: (payload: { user: User | null; isAllowedAdmin: boolean }) => void
) {
  return onAuthStateChanged(auth, user => {
    callback({
      user,
      isAllowedAdmin: Boolean(user?.email && user.email.toLowerCase() === ALLOWED_ADMIN_EMAIL),
    });
  });
}

export async function signInAdminWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function signOutAdmin() {
  return signOut(auth);
}
