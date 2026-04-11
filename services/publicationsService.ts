import { onValue, push, ref, remove, set, update, type Unsubscribe } from 'firebase/database';
import type { PublicationProps } from '../data/publications';
import { realtimeDb } from './firebaseService';

export type PublicationStatus = 'draft' | 'published';

export type ManagedPublicationRecord = {
  id: string;
  title: string;
  author: string;
  description: string;
  type: PublicationProps['type'];
  coverImage: string | null;
  coverPublicId: string | null;
  pdfUrl: string | null;
  pdfPublicId: string | null;
  pageCount: number | null;
  status: PublicationStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

type ManagedPublicationPayload = {
  title: string;
  author: string;
  description: string;
  type: PublicationProps['type'];
  coverImage: string | null;
  coverPublicId: string | null;
  pdfUrl: string | null;
  pdfPublicId: string | null;
  pageCount: number | null;
  status: PublicationStatus;
  featured: boolean;
};

const PUBLICATIONS_PATH = 'publications';

function toArray(value: Record<string, ManagedPublicationRecord> | null | undefined) {
  if (!value) {
    return [];
  }

  return Object.entries(value)
    .map(([id, record]) => ({
      ...record,
      id,
    }))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function subscribeToManagedPublications(
  onData: (publications: ManagedPublicationRecord[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const publicationsRef = ref(realtimeDb, PUBLICATIONS_PATH);

  return onValue(
    publicationsRef,
    snapshot => {
      onData(toArray(snapshot.val() as Record<string, ManagedPublicationRecord> | null));
    },
    error => {
      onError?.(error);
    }
  );
}

export async function createManagedPublication(payload: ManagedPublicationPayload) {
  const publicationsRef = ref(realtimeDb, PUBLICATIONS_PATH);
  const newPublicationRef = push(publicationsRef);
  const now = new Date().toISOString();

  await set(newPublicationRef, {
    ...payload,
    createdAt: now,
    updatedAt: now,
  });
}

export async function updateManagedPublication(id: string, payload: ManagedPublicationPayload) {
  await update(ref(realtimeDb, `${PUBLICATIONS_PATH}/${id}`), {
    ...payload,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteManagedPublication(id: string) {
  await remove(ref(realtimeDb, `${PUBLICATIONS_PATH}/${id}`));
}

export function toPublicationProps(record: ManagedPublicationRecord): PublicationProps {
  return {
    id: record.id,
    title: record.title,
    author: record.author,
    description: record.description,
    type: record.type,
    coverImage: record.coverImage ?? undefined,
    pdfUrl: record.pdfUrl ?? undefined,
    pageCount: record.pageCount ?? undefined,
  };
}

export function mergePublicationCatalog(
  staticPublications: PublicationProps[],
  managedPublications: ManagedPublicationRecord[]
) {
  const publishedOnly = managedPublications.filter(p => p.status === 'published');
  return [...publishedOnly.map(toPublicationProps), ...staticPublications];
}
