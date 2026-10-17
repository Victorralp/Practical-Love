import { buildShareHead, injectShareHead, isValidPostId } from './_lib/messageShare.js';

// Serves /messages/:postId (see vercel.json). The SPA shell is returned with
// the post's Open Graph tags so Facebook shows the post title and image.

const FIREBASE_TIMEOUT_MS = 3000;

function getDatabaseUrl() {
  const explicit = process.env.FIREBASE_DATABASE_URL;
  if (explicit) return explicit.replace(/\/+$/, '');

  const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
  return projectId ? `https://${projectId}-default-rtdb.firebaseio.com` : null;
}

async function fetchPost(postId) {
  const databaseUrl = getDatabaseUrl();
  if (!databaseUrl || !isValidPostId(postId)) return null;

  try {
    const response = await fetch(`${databaseUrl}/messages/${postId}.json`, {
      signal: AbortSignal.timeout(FIREBASE_TIMEOUT_MS),
    });
    if (!response.ok) return null;

    const post = await response.json();
    return post && typeof post === 'object' ? post : null;
  } catch {
    return null;
  }
}

async function fetchAppShell(origin) {
  try {
    const response = await fetch(`${origin}/index.html`, {
      signal: AbortSignal.timeout(FIREBASE_TIMEOUT_MS),
    });
    return response.ok ? await response.text() : null;
  } catch {
    return null;
  }
}

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const postId = requestUrl.searchParams.get('postId') ?? '';

  const [post, shell] = await Promise.all([fetchPost(postId), fetchAppShell(requestUrl.origin)]);
  const head = buildShareHead(post, postId);

  if (!shell) {
    // Crawlers still get the tags; people are sent to the feed.
    const fallback = `<!doctype html><html lang="en"><head><meta charset="UTF-8" />\n    ${head}\n  <meta http-equiv="refresh" content="0; url=/messages" /></head><body></body></html>`;
    return new Response(fallback, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }

  return new Response(injectShareHead(shell, head), {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
    },
  });
}

export const HEAD = GET;
