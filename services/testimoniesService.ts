import { get, onValue, push, ref, set, update, type Unsubscribe } from 'firebase/database';
import { realtimeDb } from './firebaseService';

// ── Types ───────────────────────────────────────────────────────────
export type TestimonyStatus = 'pending' | 'approved' | 'archived';

export type TestimonyRecord = {
  id: string;
  name: string;
  email: string;
  role: string;
  location: string;
  testimony: string;
  rating: number;
  imageUrl: string;
  imagePublicId: string;
  status: TestimonyStatus;
  createdAt: string;
  updatedAt: string;
};

type TestimonyPayload = {
  name: string;
  email: string;
  role: string;
  location: string;
  testimony: string;
  rating: number;
  imageUrl: string;
  imagePublicId: string;
};

// ── Paths ───────────────────────────────────────────────────────────
const TESTIMONIES_PATH = 'testimonies';
/**
 * Approved testimonies are mirrored here without the submitter's email so the
 * public page can read them. The main node stays admin-only because it holds
 * contact details and unapproved submissions.
 */
const PUBLIC_TESTIMONIES_PATH = 'publicTestimonies';

export type PublicTestimony = Omit<TestimonyRecord, 'email'>;

function toPublicTestimony(record: TestimonyRecord): Omit<PublicTestimony, 'id'> {
  return {
    name: record.name,
    role: record.role ?? '',
    location: record.location ?? '',
    testimony: record.testimony,
    rating: record.rating,
    imageUrl: record.imageUrl ?? '',
    imagePublicId: record.imagePublicId ?? '',
    status: 'approved',
    createdAt: record.createdAt,
    updatedAt: new Date().toISOString(),
  };
}

// ── Helpers ─────────────────────────────────────────────────────────
function toArray(value: Record<string, TestimonyRecord> | null | undefined): TestimonyRecord[] {
  if (!value) return [];

  return Object.entries(value)
    .map(([id, record]) => ({ ...record, id }))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// ══════════════════════════════════════════════════════════════════════
// SUBSCRIPTIONS
// ══════════════════════════════════════════════════════════════════════

/** Subscribe to ALL testimonies (admin use — includes pending/archived) */
export function subscribeToAllTestimonies(
  onData: (testimonies: TestimonyRecord[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const testimoniesRef = ref(realtimeDb, TESTIMONIES_PATH);

  return onValue(
    testimoniesRef,
    snapshot => {
      onData(toArray(snapshot.val() as Record<string, TestimonyRecord> | null));
    },
    error => {
      onError?.(error);
    }
  );
}

/** Subscribe to APPROVED testimonies only (public use) */
export function subscribeToApprovedTestimonies(
  onData: (testimonies: TestimonyRecord[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const testimoniesRef = ref(realtimeDb, PUBLIC_TESTIMONIES_PATH);

  return onValue(
    testimoniesRef,
    snapshot => {
      onData(toArray(snapshot.val() as Record<string, TestimonyRecord> | null));
    },
    error => {
      onError?.(error);
    }
  );
}

// ══════════════════════════════════════════════════════════════════════
// CRUD
// ══════════════════════════════════════════════════════════════════════

/** Submit a new testimony (from the public form — status starts as "pending") */
export async function submitTestimony(payload: TestimonyPayload): Promise<void> {
  const testimoniesRef = ref(realtimeDb, TESTIMONIES_PATH);
  const newRef = push(testimoniesRef);
  const now = new Date().toISOString();

  await set(newRef, {
    ...payload,
    status: 'pending' as TestimonyStatus,
    createdAt: now,
    updatedAt: now,
  });
}

/** Update the status of a testimony (admin action) */
export async function updateTestimonyStatus(id: string, status: TestimonyStatus): Promise<void> {
  const snapshot = await get(ref(realtimeDb, `${TESTIMONIES_PATH}/${id}`));
  const existing = snapshot.val() as TestimonyRecord | null;

  if (!existing) return;

  const now = new Date().toISOString();

  // Approving publishes a copy without the submitter's email; any other status
  // pulls that copy back down.
  await update(ref(realtimeDb), {
    [`${TESTIMONIES_PATH}/${id}/status`]: status,
    [`${TESTIMONIES_PATH}/${id}/updatedAt`]: now,
    [`${PUBLIC_TESTIMONIES_PATH}/${id}`]:
      status === 'approved' ? toPublicTestimony({ ...existing, id }) : null,
  });
}

/** Delete a testimony permanently (admin action) */
export async function deleteTestimony(id: string): Promise<void> {
  await update(ref(realtimeDb), {
    [`${TESTIMONIES_PATH}/${id}`]: null,
    [`${PUBLIC_TESTIMONIES_PATH}/${id}`]: null,
  });
}

/** Get the count of testimonies by status */
export async function getTestimonyCounts(): Promise<Record<TestimonyStatus, number>> {
  const snapshot = await get(ref(realtimeDb, TESTIMONIES_PATH));
  const data = snapshot.val() as Record<string, TestimonyRecord> | null;
  const all = toArray(data);

  return {
    pending: all.filter(t => t.status === 'pending').length,
    approved: all.filter(t => t.status === 'approved').length,
    archived: all.filter(t => t.status === 'archived').length,
  };
}
