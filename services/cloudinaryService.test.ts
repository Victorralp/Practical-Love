import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('CloudinaryService', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('VITE_CLOUDINARY_CLOUD_NAME', 'test-cloud');
  });

  it('should export required functions', async () => {
    const cloudinaryService = await import('./cloudinaryService');

    expect(cloudinaryService.getOptimizedImageUrl).toBeDefined();
    expect(cloudinaryService.getAvatarUrl).toBeDefined();
    expect(cloudinaryService.getThumbnailUrl).toBeDefined();
    expect(cloudinaryService.uploadToCloudinary).toBeDefined();
    expect(cloudinaryService.deleteFromCloudinary).toBeDefined();
  });

  it('should generate URLs with cloud name', async () => {
    const { getOptimizedImageUrl } = await import('./cloudinaryService');

    const url = getOptimizedImageUrl('test-image');

    expect(url).toBeDefined();
    expect(typeof url).toBe('string');
    expect(url.length).toBeGreaterThan(0);
  });

  it('should handle missing cloud name gracefully', async () => {
    vi.stubEnv('VITE_CLOUDINARY_CLOUD_NAME', 'your_cloud_name_here');

    const consoleWarn = vi.spyOn(console, 'warn');

    await import('./cloudinaryService');

    expect(consoleWarn).toHaveBeenCalledWith(
      'Cloudinary cloud name not configured. Please set VITE_CLOUDINARY_CLOUD_NAME in .env file'
    );
  });
});
