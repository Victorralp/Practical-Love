import { describe, it, expect, vi, beforeEach } from 'vitest';
import { app, analytics } from './firebaseService';

describe('FirebaseService', () => {
  beforeEach(() => {
    // Reset environment variables for testing
    vi.stubEnv('VITE_FIREBASE_API_KEY', 'test-api-key');
    vi.stubEnv('VITE_FIREBASE_AUTH_DOMAIN', 'test-auth-domain');
    vi.stubEnv('VITE_FIREBASE_PROJECT_ID', 'test-project-id');
    vi.stubEnv('VITE_FIREBASE_STORAGE_BUCKET', 'test-storage-bucket');
    vi.stubEnv('VITE_FIREBASE_MESSAGING_SENDER_ID', 'test-messaging-sender-id');
    vi.stubEnv('VITE_FIREBASE_APP_ID', 'test-app-id');
    vi.stubEnv('VITE_FIREBASE_MEASUREMENT_ID', 'test-measurement-id');
  });

  it('should initialize Firebase app with correct configuration', () => {
    // The app should be initialized
    expect(app).toBeDefined();

    // Check that app has a name (default Firebase app)
    expect(app.name).toBe('[DEFAULT]');
  });

  it('should not initialize analytics in Node.js environment', () => {
    // Analytics should be null in Node.js test environment
    expect(analytics).toBeNull();
  });

  it('should use environment variables for configuration', () => {
    // The app should be defined
    expect(app).toBeDefined();

    // App should have configuration loaded
    expect(app.options.apiKey).toBeDefined();
    expect(app.options.projectId).toBeDefined();
  });
});
