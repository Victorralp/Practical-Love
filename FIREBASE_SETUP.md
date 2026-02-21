# Firebase Setup for Practical Love Project

## Environment Variables

The Firebase configuration is stored in environment variables. The following variables are required:

- `VITE_FIREBASE_API_KEY`: Your Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN`: Your Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID`: Your Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID`: Your Firebase app ID
- `VITE_FIREBASE_MEASUREMENT_ID`: Your Firebase measurement ID

## Setup Instructions

1. **Copy the environment file:**

   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file** with your Firebase configuration values.

3. **Install Firebase dependencies:**

   ```bash
   npm install firebase
   ```

4. **The Firebase service is automatically initialized** in `services/firebaseService.ts`

## Using Firebase in Components

Import the Firebase service in your components:

```typescript
import { app, analytics } from '../services/firebaseService';

// Use the Firebase app instance
console.log('Firebase app:', app.name);

// Use analytics for tracking
// analytics.logEvent('event_name', { param: 'value' });
```

## Testing

Run the Firebase service tests:

```bash
npm test -- services/firebaseService.test.ts
```

## Security Notes

- The `.env` file is excluded from Git (see `.gitignore`)
- Never commit actual API keys to version control
- Use `.env.example` as a template for required variables
- Firebase API keys are safe to expose in client-side code (they're meant to be public)

## Available Firebase Services

Currently initialized:

1. **Firebase App** - Core Firebase instance
2. **Firebase Analytics** - User analytics and tracking

To add more Firebase services (Auth, Firestore, Storage, etc.):

1. Import the service in `services/firebaseService.ts`:

   ```typescript
   import { getAuth } from 'firebase/auth';
   import { getFirestore } from 'firebase/firestore';
   ```

2. Initialize and export the service:

   ```typescript
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   ```

3. Use in your components:
   ```typescript
   import { auth, db } from '../services/firebaseService';
   ```
