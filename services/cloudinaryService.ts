// Cloudinary service for handling image uploads and transformations
import { Cloudinary } from '@cloudinary/url-gen';

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
  width: number;
  height: number;
}

export interface CloudinaryUploadOptions {
  folder?: string;
  tags?: string[];
  transformation?: any;
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
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

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
 * Delete image from Cloudinary
 * @param publicId - Cloudinary public ID
 * @returns Promise with deletion response
 */
export const deleteFromCloudinary = async (publicId: string): Promise<any> => {
  const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
  const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  if (
    !apiKey ||
    apiKey === 'your_api_key_here' ||
    !apiSecret ||
    apiSecret === 'your_api_secret_here'
  ) {
    throw new Error(
      'Cloudinary API credentials not configured. Please set VITE_CLOUDINARY_API_KEY and VITE_CLOUDINARY_API_SECRET in .env file'
    );
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = await generateSignature(publicId, timestamp);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_id: publicId,
        api_key: apiKey,
        timestamp: timestamp,
        signature: signature,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Cloudinary deletion failed: ${errorData.error?.message || response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    throw error;
  }
};

/**
 * Generate Cloudinary signature for secure operations
 * @param publicId - Cloudinary public ID
 * @param timestamp - Unix timestamp
 * @returns Signature string
 */
const generateSignature = async (_publicId: string, _timestamp: number): Promise<string> => {
  // In a real application, this should be done on the server side
  // For client-side, we're using the upload preset approach which doesn't require signatures
  // This is a placeholder for server-side implementation
  console.warn('Signature generation should be done server-side for security');
  return '';
};

export default cld;
