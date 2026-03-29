import { get, onValue, push, ref, remove, set, update, type Unsubscribe } from 'firebase/database';
import { realtimeDb } from './firebaseService';

export type MessageMedia = {
  url: string;
  publicId: string;
  resourceType: 'image' | 'video';
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
};

export type MessageComment = {
  id: string;
  author: string;
  body: string;
  createdAt: string;
};

export type MessagePostRecord = {
  id: string;
  title: string;
  category: string;
  summary: string;
  body: string;
  author: string;
  pinned: boolean;
  media: MessageMedia | null;
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
};

const MESSAGES_PATH = 'messages';

function toArray(value: Record<string, MessagePostRecord> | null | undefined) {
  if (!value) {
    return [];
  }

  return Object.entries(value)
    .map(([id, record]) => ({
      ...record,
      id,
      comments: Array.isArray(record.comments)
        ? [...record.comments].sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        : [],
    }))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function subscribeToMessagePosts(
  onData: (posts: MessagePostRecord[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const messagesRef = ref(realtimeDb, MESSAGES_PATH);

  return onValue(
    messagesRef,
    snapshot => {
      onData(toArray(snapshot.val() as Record<string, MessagePostRecord> | null));
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
