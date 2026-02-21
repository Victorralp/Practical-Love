# Cloudinary Upload Error - Troubleshooting Guide

## Error: `ERR_NAME_NOT_RESOLVED` or `Failed to fetch`

This error occurs when the Cloudinary environment variables are not loaded properly.

## Quick Fix Steps

### 1. Restart Development Server

After updating `.env` file, you MUST restart the development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### 2. Verify Environment Variables

Check if variables are loaded in your browser console:

```javascript
console.log('Cloud Name:', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
console.log('Upload Preset:', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
```

Expected output:

```
Cloud Name: dwglljtzn
Upload Preset: logorhema
```

If you see `undefined` or placeholder values, the server needs to be restarted.

### 3. Verify Upload Preset in Cloudinary

1. Go to [cloudinary.com](https://cloudinary.com) and log in
2. Navigate to **Settings** → **Upload** → **Upload presets**
3. Find your preset: `logorhema`
4. Verify settings:
   - **Signing mode**: Must be "Unsigned" for client-side uploads
   - **Folder**: Optional (e.g., "testimonies/profiles")
   - **Allowed formats**: jpg, png, webp, gif
   - **Max file size**: 3MB or higher

### 4. Create Upload Preset (If Missing)

If the preset doesn't exist:

1. Click **Add upload preset**
2. Configure:
   - **Preset name**: `logorhema`
   - **Signing mode**: Select **Unsigned**
   - **Folder**: `testimonies/profiles` (optional)
   - **Tags**: `testimony,profile,practical-love` (optional)
   - **Allowed formats**: jpg, png, webp, gif
   - **Max file size**: 3145728 (3MB)
3. Click **Save**

## Current Configuration

Your `.env` file has:

```
VITE_CLOUDINARY_CLOUD_NAME=dwglljtzn
VITE_CLOUDINARY_API_KEY=727794839772922
VITE_CLOUDINARY_API_SECRET=955H3la9p1e3EWWjOVA1ba2mlf0
VITE_CLOUDINARY_UPLOAD_PRESET=logorhema
```

## Testing Upload

### Option 1: Use the Demo Page

1. Navigate to `/cloudinary-demo` in your browser
2. Try uploading a test image
3. Check browser console for detailed error messages

### Option 2: Test with cURL

Test the Cloudinary API directly:

```bash
curl -X POST \
  https://api.cloudinary.com/v1_1/dwglljtzn/image/upload \
  -F "file=@/path/to/test-image.jpg" \
  -F "upload_preset=logorhema"
```

Expected response:

```json
{
  "public_id": "...",
  "secure_url": "https://res.cloudinary.com/...",
  "format": "jpg",
  ...
}
```

## Common Issues

### Issue 1: "Invalid upload preset"

**Solution**:

- Verify preset name matches exactly: `logorhema`
- Ensure preset is set to "Unsigned" mode
- Check preset is enabled (not disabled)

### Issue 2: "Upload preset must be whitelisted"

**Solution**:

- In Cloudinary dashboard, go to Settings → Security
- Under "Allowed upload presets", add `logorhema`
- Or set "Restrict upload presets" to OFF

### Issue 3: "CORS error"

**Solution**:

- In Cloudinary dashboard, go to Settings → Security
- Under "Allowed fetch domains", add your domain
- Add `localhost:3000` for development

### Issue 4: File size too large

**Solution**:

- Check file size is under 3MB
- Compress image before uploading
- Or increase max file size in upload preset settings

## Debugging Steps

### 1. Check Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Try uploading an image
4. Look for request to `api.cloudinary.com`
5. Check:
   - Request URL (should contain your cloud name)
   - Request payload (should contain file and upload_preset)
   - Response (error details)

### 2. Check Console Logs

Look for these messages:

- ✅ "Cloudinary cloud name not configured" - Restart server
- ✅ "Cloudinary upload preset not configured" - Check .env file
- ✅ "Cloudinary upload failed: ..." - Check error message details

### 3. Verify Cloudinary Account

1. Log in to Cloudinary dashboard
2. Check account status (free tier limits)
3. Verify API credentials are correct
4. Check usage statistics (not exceeded limits)

## Still Having Issues?

### Check Environment Variables Loading

Create a test component:

```typescript
export default function EnvTest() {
  return (
    <div>
      <h1>Environment Variables Test</h1>
      <pre>
        {JSON.stringify({
          cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
          uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
          hasApiKey: !!import.meta.env.VITE_CLOUDINARY_API_KEY
        }, null, 2)}
      </pre>
    </div>
  );
}
```

### Alternative: Use Cloudinary Widget

If direct upload continues to fail, use Cloudinary's Upload Widget:

```bash
npm install @cloudinary/react
```

```typescript
import { CloudinaryUploadWidget } from '@cloudinary/react';

<CloudinaryUploadWidget
  cloudName="dwglljtzn"
  uploadPreset="logorhema"
  onSuccess={(result) => {
    console.log('Upload success:', result);
  }}
/>
```

## Contact Support

If none of these solutions work:

1. Check Cloudinary status: [status.cloudinary.com](https://status.cloudinary.com)
2. Review Cloudinary docs: [cloudinary.com/documentation](https://cloudinary.com/documentation)
3. Contact Cloudinary support with:
   - Cloud name: `dwglljtzn`
   - Upload preset: `logorhema`
   - Error message from console
   - Network request details

## Quick Checklist

- [ ] Restarted development server after updating `.env`
- [ ] Verified environment variables in browser console
- [ ] Checked upload preset exists in Cloudinary dashboard
- [ ] Verified preset is set to "Unsigned" mode
- [ ] Tested with small image file (< 1MB)
- [ ] Checked browser console for detailed errors
- [ ] Checked Network tab for API request details
- [ ] Verified Cloudinary account is active
- [ ] Checked not exceeding free tier limits
