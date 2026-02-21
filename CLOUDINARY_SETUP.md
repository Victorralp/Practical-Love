# Cloudinary Integration for Testimony Page

## Overview

This project now includes Cloudinary integration for handling image uploads in the testimony submission form. Users can upload profile images when sharing their testimonies, and these images are optimized and served through Cloudinary's CDN.

## Setup Instructions

### 1. Create a Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com) and sign up for a free account
2. Verify your email address
3. Log in to your Cloudinary dashboard

### 2. Get Your Cloudinary Credentials

From your Cloudinary dashboard:

- **Cloud Name**: Found in the dashboard header (e.g., "mycloud123")
- **API Key**: Go to Account Settings → Security → API Keys
- **API Secret**: Same location as API Key (keep this secret!)
- **Upload Preset**: Go to Settings → Upload → Upload presets → Create new preset

### 3. Configure Environment Variables

Update your `.env` file with your Cloudinary credentials:

```bash
# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
VITE_CLOUDINARY_API_KEY=your_actual_api_key
VITE_CLOUDINARY_API_SECRET=your_actual_api_secret
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_name
```

### 4. Configure Upload Preset

In Cloudinary dashboard:

1. Go to Settings → Upload → Upload presets
2. Click "Add upload preset"
3. Configure:
   - **Name**: Choose a name (e.g., "testimony_uploads")
   - **Signing mode**: "Unsigned" (for client-side uploads)
   - **Folder**: "testimonies/profiles" (optional)
   - **Tags**: "testimony,profile,practical-love" (optional)
   - **Allowed formats**: jpg, png, webp, gif
   - **Max file size**: 3MB
4. Click "Save"

## Features

### 1. Image Upload Component (`components/CloudinaryImageUpload.tsx`)

- Drag & drop or click to upload
- Image preview with progress indicator
- File validation (type, size)
- Automatic optimization
- Secure upload to Cloudinary

### 2. Cloudinary Service (`services/cloudinaryService.ts`)

- **Upload images**: `uploadToCloudinary(file, options)`
- **Optimized URLs**: `getOptimizedImageUrl(publicId, width, height, quality)`
- **Avatar URLs**: `getAvatarUrl(publicId, size)` - circular images
- **Thumbnail URLs**: `getThumbnailUrl(publicId, width, height)`
- **Delete images**: `deleteFromCloudinary(publicId)` (server-side recommended)

### 3. Updated Testimony Pages

#### Share Testimony Page (`pages/ShareTestimonyPage.tsx`)

- Added Cloudinary image upload component
- Image validation in form
- Stores Cloudinary URL and public ID

#### Testimonies Page (`pages/TestimoniesPage.tsx`)

- Uses Cloudinary optimized images
- Fallback to gradient avatar if no image
- Automatic image optimization

## Usage Examples

### Uploading an Image in a Component

```typescript
import { uploadToCloudinary } from '../services/cloudinaryService';

const handleImageUpload = async (file: File) => {
  try {
    const result = await uploadToCloudinary(file, {
      folder: 'testimonies/profiles',
      tags: ['testimony', 'user-uploaded'],
    });

    console.log('Uploaded:', result.secure_url);
    console.log('Public ID:', result.public_id);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

### Displaying Optimized Images

```typescript
import { getAvatarUrl } from '../services/cloudinaryService';

// For profile avatars
const avatarUrl = getAvatarUrl('public_id_here', 200);

// For optimized display
const optimizedUrl = getOptimizedImageUrl('public_id_here', 800, 600, 'auto');

// For thumbnails
const thumbnailUrl = getThumbnailUrl('public_id_here', 400, 300);
```

## Security Considerations

1. **API Secret**: Never expose in client-side code (already handled)
2. **Upload Preset**: Use unsigned uploads for client-side
3. **File Validation**: Implemented in both frontend and Cloudinary
4. **Rate Limiting**: Cloudinary free tier has limits
5. **Storage Management**: Regularly clean up unused images

## Testing

Run Cloudinary service tests:

```bash
npm test -- services/cloudinaryService.test.ts
```

## Troubleshooting

### Common Issues

1. **"Cloudinary cloud name not configured"**
   - Check `.env` file has correct values
   - Restart development server after updating `.env`

2. **Upload fails with "Invalid upload preset"**
   - Verify upload preset exists in Cloudinary
   - Check preset is set to "Unsigned" mode

3. **Images not displaying**
   - Check Cloudinary URL in browser console
   - Verify public ID is correct
   - Check CORS settings in Cloudinary

4. **File size too large**
   - Default limit is 3MB
   - Adjust `maxSizeMB` prop in `CloudinaryImageUpload`

### Debugging

1. Check browser console for Cloudinary errors
2. Verify environment variables are loaded:
   ```bash
   npm run check-env
   ```
3. Test Cloudinary API directly:
   ```javascript
   console.log('Cloud Name:', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
   ```

## Performance Benefits

1. **Automatic Optimization**: Images are resized, compressed, and converted to WebP
2. **CDN Delivery**: Global content delivery network
3. **Lazy Loading**: Built into Cloudinary URLs
4. **Responsive Images**: Automatic device-specific sizing

## Cost Considerations

- **Free Tier**: 25 credits/month (approx. 25GB bandwidth + 25GB storage)
- **Pricing**: See [cloudinary.com/pricing](https://cloudinary.com/pricing)
- **Optimization**: Use appropriate quality settings to reduce bandwidth

## Next Steps

1. Implement server-side image processing for additional security
2. Add image moderation (Cloudinary offers AI moderation)
3. Implement batch processing for multiple images
4. Add video upload support for testimony videos
5. Implement image cropping before upload
