/**
 * Storage Service for local storage operations
 * Requirements: 3.2, 5.3
 */

export interface StorageService {
  save<T>(key: string, data: T): void;
  load<T>(key: string): T | null;
  remove(key: string): void;
  clear(): void;
}

/**
 * Check if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * In-memory fallback storage when localStorage is unavailable
 */
class InMemoryStorage implements StorageService {
  private storage: Map<string, string> = new Map();

  save<T>(key: string, data: T): void {
    this.storage.set(key, JSON.stringify(data));
  }

  load<T>(key: string): T | null {
    const item = this.storage.get(key);
    if (item === undefined) {
      return null;
    }
    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  remove(key: string): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }
}

/**
 * LocalStorage implementation of StorageService
 */
class LocalStorageService implements StorageService {
  save<T>(key: string, data: T): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      // Handle quota exceeded error
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.error('Storage quota exceeded. Consider clearing old data.');
        throw new Error('Storage quota exceeded');
      }
      throw error;
    }
  }

  load<T>(key: string): T | null {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch {
      // Invalid JSON in storage, return null
      return null;
    }
  }

  remove(key: string): void {
    window.localStorage.removeItem(key);
  }

  clear(): void {
    window.localStorage.clear();
  }
}

/**
 * Create the appropriate storage service based on availability
 */
export function createStorageService(): StorageService {
  if (isLocalStorageAvailable()) {
    return new LocalStorageService();
  }
  console.warn('localStorage unavailable, using in-memory storage');
  return new InMemoryStorage();
}

// Default storage service instance
export const storageService: StorageService = createStorageService();
