import { createHash } from 'node:crypto';
import { createRemoteJWKSet, jwtVerify } from 'jose';

/**
 * Deletes a Cloudinary asset on behalf of a signed-in admin.
 *
 * The Cloudinary API secret lives only in this server-side function
 * (CLOUDINARY_API_SECRET), never in the browser bundle. Callers must send
 * a Firebase ID token for an email on the admin list.
 */

const FIREBASE_JWKS = createRemoteJWKSet(
  new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com')
);

const RESOURCE_TYPES = new Set(['image', 'video']);

function adminEmails() {
  return new Set(
    (process.env.ADMIN_EMAILS ?? process.env.VITE_ADMIN_EMAIL ?? '')
      .split(',')
      .map(email => email.trim().toLowerCase())
      .filter(Boolean)
  );
}

async function verifyAdmin(authorization) {
  const projectId = process.env.FIREBASE_PROJECT_ID ?? process.env.VITE_FIREBASE_PROJECT_ID;
  const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : '';

  if (!projectId || !token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, FIREBASE_JWKS, {
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
    });
    const email = typeof payload.email === 'string' ? payload.email.toLowerCase() : '';

    return payload.email_verified === true && adminEmails().has(email) ? email : null;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const admin = await verifyAdmin(req.headers.authorization);
  if (!admin) {
    return res.status(401).json({ error: 'Admin sign-in required' });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME ?? process.env.VITE_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({ error: 'Cloudinary is not configured on the server' });
  }

  const { publicId, resourceType = 'image' } = req.body ?? {};

  if (typeof publicId !== 'string' || !publicId || publicId.length > 512 || !RESOURCE_TYPES.has(resourceType)) {
    return res.status(400).json({ error: 'Invalid publicId or resourceType' });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHash('sha1')
    .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
    .digest('hex');

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/destroy`, {
    method: 'POST',
    body: new URLSearchParams({
      public_id: publicId,
      api_key: apiKey,
      timestamp: String(timestamp),
      signature,
    }),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    return res.status(502).json({ error: result.error?.message ?? 'Cloudinary deletion failed' });
  }

  return res.status(200).json(result);
}
