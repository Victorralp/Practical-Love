// Cloudinary service for handling image uploads and transformations
import { Cloudinary } from '@cloudinary/url-gen';
import { auth } from './firebaseService';

// Initialize Cloudinary instance
const getCloudinaryInstance = () => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  if (!cloudName || cloudName === 'your_cloud_name_here') {
    console.warn(
      'Cloudinary cloud name not configured. Please set VITE_CLOUDINARY_CLOUD_NAME in .env file'
    );
  }

  return new Cloudinary({
    cloud: {
      cloudName: cloudName || 'demo', // Use 'demo' as fallback for testing
    },
  });
};

const cld = getCloudinaryInstance();

// Types for Cloudinary upload
export interface CloudinaryUploadResponse {
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  width?: number;
  height?: number;
}

export interface CloudinaryUploadOptions {
  folder?: string;
  tags?: string[];
  transformation?: any;
  resourceType?: 'image' | 'video' | 'raw' | 'auto';
}

/**
 * Upload image to Cloudinary
 * @param file - File to upload
 * @param options - Upload options
 * @returns Promise with upload response
 */
export const uploadToCloudinary = async (
  file: File,
  options: CloudinaryUploadOptions = {}
): Promise<CloudinaryUploadResponse> => {
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  if (!uploadPreset || uploadPreset === 'your_upload_preset_here') {
    throw new Error(
      'Cloudinary upload preset not configured. Please set VITE_CLOUDINARY_UPLOAD_PRESET in .env file'
    );
  }

  if (!cloudName || cloudName === 'your_cloud_name_here') {
    throw new Error(
      'Cloudinary cloud name not configured. Please set VITE_CLOUDINARY_CLOUD_NAME in .env file'
    );
  }

  const resourceType = options.resourceType || 'auto';
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  if (options.folder) {
    formData.append('folder', options.folder);
  }

  if (options.tags && options.tags.length > 0) {
    formData.append('tags', options.tags.join(','));
  }

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Cloudinary upload failed: ${errorData.error?.message || response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

/**
 * Generate optimized image URL with transformations
 * @param publicId - Cloudinary public ID
 * @param width - Desired width
 * @param height - Desired height
 * @param quality - Image quality (default: auto)
 * @returns Optimized image URL
 */
export const getOptimizedImageUrl = (
  publicId: string,
  width: number = 800,
  height: number = 600,
  _quality: string = 'auto'
): string => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo';
  return `https://res.cloudinary.com/${cloudName}/image/upload/c_fill,w_${width},h_${height},q_auto,f_auto/${publicId}`;
};

/**
 * Generate avatar image URL (circular crop)
 * @param publicId - Cloudinary public ID
 * @param size - Avatar size (default: 200)
 * @returns Avatar image URL
 */
export const getAvatarUrl = (publicId: string, size: number = 200): string => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo';
  return `https://res.cloudinary.com/${cloudName}/image/upload/c_fill,w_${size},h_${size},r_max,q_auto,f_auto/${publicId}`;
};

/**
 * Generate thumbnail image URL
 * @param publicId - Cloudinary public ID
 * @param width - Thumbnail width (default: 400)
 * @param height - Thumbnail height (default: 300)
 * @returns Thumbnail image URL
 */
export const getThumbnailUrl = (
  publicId: string,
  width: number = 400,
  height: number = 300
): string => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo';
  return `https://res.cloudinary.com/${cloudName}/image/upload/c_fill,w_${width},h_${height},q_auto,f_auto/${publicId}`;
};

/**
 * Delete asset from Cloudinary via the server-side /api/cloudinary-delete
 * function, which holds the API secret. Only signed-in admins can call it.
 * @param publicId - Cloudinary public ID
 * @param resourceType - Cloudinary resource type ('image' or 'video')
 * @returns Promise with deletion response
 */
export const deleteFromCloudinary = async (
  publicId: string,
  resourceType: 'image' | 'video' = 'image'
): Promise<any> => {
  const idToken = await auth.currentUser?.getIdToken();

  if (!idToken) {
    throw new Error('Sign in as an admin to delete Cloudinary assets');
  }

  const response = await fetch('/api/cloudinary-delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ publicId, resourceType }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Cloudinary deletion failed: ${errorData.error || response.statusText}`);
  }

  return response.json();
};

export default cld;
