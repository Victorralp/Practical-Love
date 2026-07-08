import { get, onValue, push, ref, remove, set, update, type Unsubscribe } from 'firebase/database';
import { realtimeDb } from './firebaseService';

// ── Media ───────────────────────────────────────────────────────────
export type MessageMedia = {
  url: string;
  publicId: string;
  resourceType: 'image' | 'video';
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
};

// ── Reactions ───────────────────────────────────────────────────────
export type ReactionType = 'amen' | 'love' | 'insightful';

export type ReactionsMap = Record<ReactionType, number>;

export const REACTION_CONFIG: Record<ReactionType, { emoji: string; label: string }> = {
  amen: { emoji: '🙏', label: 'Amen' },
  love: { emoji: '❤️', label: 'Love' },
  insightful: { emoji: '💡', label: 'Insightful' },
};

export const REACTION_TYPES = Object.keys(REACTION_CONFIG) as ReactionType[];

// ── Comments ────────────────────────────────────────────────────────
export type MessageComment = {
  id: string;
  author: string;
  body: string;
  createdAt: string;
};

// ── Message Posts ───────────────────────────────────────────────────
export type MessagePostRecord = {
  id: string;
  title: string;
  category: string;
  summary: string;
  body: string;
  author: string;
  pinned: boolean;
  media: MessageMedia | null;
  youtubeUrl?: string | null;
  reactions: ReactionsMap;
  comments: MessageComment[];
  createdAt: string;
  updatedAt: string;
};

type MessagePostPayload = {
  title: string;
  category: string;
  summary: string;
  body: string;
  author: string;
  pinned: boolean;
  media: MessageMedia | null;
  youtubeUrl?: string | null;
};

// ── Prayer Requests ─────────────────────────────────────────────────
export type PrayerRequest = {
  id: string;
  body: string;
  author: string;
  prayedCount: number;
  createdAt: string;
  isActive?: boolean;
  status?: PrayerRequestStatus;
  visibility?: PrayerRequestVisibility;
};

export type PrayerRequestStatus = 'pending' | 'approved' | 'hidden';
export type PrayerRequestVisibility = 'public' | 'private';
export type AdminPrayerFilter = 'all' | PrayerRequestStatus | 'private';

// ── Paths ───────────────────────────────────────────────────────────
const MESSAGES_PATH = 'messages';
const PRAYER_REQUESTS_PATH = 'prayerRequests';

// ── Local reaction tracking (anonymous, localStorage) ───────────────
const REACTIONS_STORAGE_KEY = 'pl_reactions';
const PRAYED_STORAGE_KEY = 'pl_prayed';

function getLocalSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function saveLocalSet(key: string, items: Set<string>): void {
  try {
    localStorage.setItem(key, JSON.stringify([...items]));
  } catch {
    // localStorage unavailable — silently degrade
  }
}

/** Check if current visitor already reacted with this type on this post */
export function hasUserReacted(postId: string, reactionType: ReactionType): boolean {
  return getLocalSet(REACTIONS_STORAGE_KEY).has(`${postId}:${reactionType}`);
}

/** Check if current visitor already prayed for this request */
export function hasUserPrayed(requestId: string): boolean {
  return getLocalSet(PRAYED_STORAGE_KEY).has(requestId);
}

// ── Helpers ─────────────────────────────────────────────────────────
const DEFAULT_REACTIONS: ReactionsMap = { amen: 0, love: 0, insightful: 0 };

function toPostArray(value: Record<string, MessagePostRecord> | null | undefined) {
  if (!value) {
    return [];
  }

  return Object.entries(value)
    .map(([id, record]) => ({
      ...record,
      id,
      reactions: { ...DEFAULT_REACTIONS, ...record.reactions },
      comments: Array.isArray(record.comments)
        ? [...record.comments].sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        : [],
    }))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function normalizePrayerRequest(id: string, record: PrayerRequest): PrayerRequest {
  const visibility: PrayerRequestVisibility = record.visibility ?? 'public';
  const status: PrayerRequestStatus =
    record.status ?? (record.isActive === false ? 'hidden' : 'approved');

  return {
    ...record,
    id,
    author: record.author?.trim() || 'Anonymous',
    prayedCount: record.prayedCount || 0,
    visibility,
    status,
    isActive: status === 'approved',
  };
}

export function shouldShowPrayerRequestPublicly(request: PrayerRequest): boolean {
  const normalized = normalizePrayerRequest(request.id, request);
  return normalized.visibility === 'public' && normalized.status === 'approved';
}

export function filterPrayerRequestsForAdmin(
  requests: PrayerRequest[],
  filter: AdminPrayerFilter
): PrayerRequest[] {
  if (filter === 'all') {
    return requests;
  }

  if (filter === 'private') {
    return requests.filter(
      request => normalizePrayerRequest(request.id, request).visibility === 'private'
    );
  }

  return requests.filter(request => {
    const normalized = normalizePrayerRequest(request.id, request);
    return normalized.status === filter && normalized.visibility === 'public';
  });
}

function toPrayerArray(value: Record<string, PrayerRequest> | null | undefined) {
  if (!value) {
    return [];
  }

  return Object.entries(value)
    .map(([id, record]) => normalizePrayerRequest(id, record))
    .filter(shouldShowPrayerRequestPublicly)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// ══════════════════════════════════════════════════════════════════════
// MESSAGE POSTS
// ══════════════════════════════════════════════════════════════════════

export function subscribeToMessagePosts(
  onData: (posts: MessagePostRecord[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const messagesRef = ref(realtimeDb, MESSAGES_PATH);

  return onValue(
    messagesRef,
    snapshot => {
      onData(toPostArray(snapshot.val() as Record<string, MessagePostRecord> | null));
    },
    error => {
      onError?.(error);
    }
  );
}

export async function createMessagePost(payload: MessagePostPayload) {
  const messagesRef = ref(realtimeDb, MESSAGES_PATH);
  const newPostRef = push(messagesRef);
  const now = new Date().toISOString();

  await set(newPostRef, {
    ...payload,
    reactions: DEFAULT_REACTIONS,
    comments: [],
    createdAt: now,
    updatedAt: now,
  });
}

export async function updateMessagePost(id: string, payload: MessagePostPayload) {
  await update(ref(realtimeDb, `${MESSAGES_PATH}/${id}`), {
    ...payload,
    updatedAt: new Date().toISOString(),
  });
}

export async function updateMessagePinnedState(id: string, pinned: boolean) {
  await update(ref(realtimeDb, `${MESSAGES_PATH}/${id}`), {
    pinned,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteMessagePost(id: string) {
  await remove(ref(realtimeDb, `${MESSAGES_PATH}/${id}`));
}

// ── Reactions ───────────────────────────────────────────────────────

export async function toggleReaction(postId: string, reactionType: ReactionType) {
  const localSet = getLocalSet(REACTIONS_STORAGE_KEY);
  const key = `${postId}:${reactionType}`;
  const postRef = ref(realtimeDb, `${MESSAGES_PATH}/${postId}`);
  const snapshot = await get(postRef);
  const existing = snapshot.val() as MessagePostRecord | null;

  if (!existing) return;

  const currentReactions: ReactionsMap = { ...DEFAULT_REACTIONS, ...existing.reactions };

  if (localSet.has(key)) {
    // Remove reaction
    currentReactions[reactionType] = Math.max(0, currentReactions[reactionType] - 1);
    localSet.delete(key);
  } else {
    // Add reaction
    currentReactions[reactionType] += 1;
    localSet.add(key);
  }

  saveLocalSet(REACTIONS_STORAGE_KEY, localSet);

  await update(postRef, {
    reactions: currentReactions,
    updatedAt: new Date().toISOString(),
  });
}

// ── Comments ────────────────────────────────────────────────────────

export async function addCommentToMessagePost(
  id: string,
  payload: { author: string; body: string }
) {
  const postRef = ref(realtimeDb, `${MESSAGES_PATH}/${id}`);
  const snapshot = await get(postRef);
  const existing = snapshot.val() as MessagePostRecord | null;
  const nextComments = Array.isArray(existing?.comments) ? [...existing.comments] : [];

  nextComments.push({
    id: `comment-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    author: payload.author,
    body: payload.body,
    createdAt: new Date().toISOString(),
  });

  await update(postRef, {
    comments: nextComments,
    updatedAt: new Date().toISOString(),
  });
}

// ══════════════════════════════════════════════════════════════════════
// PRAYER REQUESTS
// ══════════════════════════════════════════════════════════════════════

export function subscribeToPrayerRequests(
  onData: (requests: PrayerRequest[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const prayerRef = ref(realtimeDb, PRAYER_REQUESTS_PATH);

  return onValue(
    prayerRef,
    snapshot => {
      onData(toPrayerArray(snapshot.val() as Record<string, PrayerRequest> | null));
    },
    error => {
      onError?.(error);
    }
  );
}

export async function submitPrayerRequest(
  body: string,
  author?: string,
  visibility: PrayerRequestVisibility = 'public'
) {
  const prayerRef = ref(realtimeDb, PRAYER_REQUESTS_PATH);
  const newRef = push(prayerRef);
  const status: PrayerRequestStatus = visibility === 'public' ? 'pending' : 'approved';

  await set(newRef, {
    body: body.trim().slice(0, 500),
    author: author?.trim() || 'Anonymous',
    prayedCount: 0,
    createdAt: new Date().toISOString(),
    visibility,
    status,
    isActive: status === 'approved',
  });
}

export async function incrementPrayedCount(requestId: string) {
  const localSet = getLocalSet(PRAYED_STORAGE_KEY);

  if (localSet.has(requestId)) return; // Already prayed

  const requestRef = ref(realtimeDb, `${PRAYER_REQUESTS_PATH}/${requestId}`);
  const snapshot = await get(requestRef);
  const existing = snapshot.val() as PrayerRequest | null;

  if (!existing) return;

  localSet.add(requestId);
  saveLocalSet(PRAYED_STORAGE_KEY, localSet);

  await update(requestRef, {
    prayedCount: (existing.prayedCount || 0) + 1,
  });
}

// ══════════════════════════════════════════════════════════════════════
// PRAYER REQUEST MODERATION (Admin)
// ══════════════════════════════════════════════════════════════════════

/** Toggle the active state of a prayer request (admin moderation) */
export async function togglePrayerRequestActive(requestId: string, isActive: boolean) {
  const requestRef = ref(realtimeDb, `${PRAYER_REQUESTS_PATH}/${requestId}`);
  await update(requestRef, {
    isActive,
    status: isActive ? 'approved' : 'hidden',
  });
}

/** Approve a pending public prayer request */
export async function approvePrayerRequest(requestId: string) {
  const requestRef = ref(realtimeDb, `${PRAYER_REQUESTS_PATH}/${requestId}`);
  await update(requestRef, {
    status: 'approved',
    visibility: 'public',
    isActive: true,
  });
}

/** Hide a prayer request from the public wall without deleting it */
export async function hidePrayerRequest(requestId: string) {
  const requestRef = ref(realtimeDb, `${PRAYER_REQUESTS_PATH}/${requestId}`);
  await update(requestRef, {
    status: 'hidden',
    isActive: false,
  });
}

/** Delete a prayer request permanently (admin action) */
export async function deletePrayerRequest(requestId: string) {
  await remove(ref(realtimeDb, `${PRAYER_REQUESTS_PATH}/${requestId}`));
}

/** Subscribe to ALL prayer requests including inactive (admin use) */
export function subscribeToAllPrayerRequests(
  onData: (requests: PrayerRequest[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const prayerRef = ref(realtimeDb, PRAYER_REQUESTS_PATH);

  return onValue(
    prayerRef,
    snapshot => {
      const value = snapshot.val() as Record<string, PrayerRequest> | null;
      if (!value) {
        onData([]);
        return;
      }

      const all = Object.entries(value)
        .map(([id, record]) => normalizePrayerRequest(id, record))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      onData(all);
    },
    error => {
      onError?.(error);
    }
  );
}
