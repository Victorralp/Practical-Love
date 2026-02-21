# 🚨 QUICK FIX: Cloudinary Upload Error

## The Problem

You're seeing: `ERR_NAME_NOT_RESOLVED` or `Failed to fetch`

## The Solution (3 Steps)

### Step 1: Stop Your Development Server

Press `Ctrl+C` in your terminal to stop the running server.

### Step 2: Restart Development Server

```bash
npm run dev
```

### Step 3: Verify Configuration

Navigate to: `http://localhost:3000/env-test`

You should see all green checkmarks ✓

## Why This Happens

Vite (your build tool) only loads environment variables when the server starts. After updating `.env`, you MUST restart the server.

## Your Current Configuration

Your `.env` file already has the correct values:

- ✅ Cloud Name: `dwglljtzn`
- ✅ Upload Preset: `logorhema`
- ✅ API Key: Configured
- ✅ API Secret: Configured

## Test Pages Available

1. **Environment Test**: `/env-test`
   - Verify all environment variables are loaded
   - See configuration status

2. **Cloudinary Demo**: `/cloudinary-demo`
   - Test image upload functionality
   - See optimization examples

3. **Share Testimony**: `/share-testimony`
   - The actual testimony form with image upload

## Still Not Working?

### Check Upload Preset in Cloudinary

1. Go to [cloudinary.com](https://cloudinary.com) and log in
2. Settings → Upload → Upload presets
3. Find preset: `logorhema`
4. Verify:
   - ✅ Signing mode: **Unsigned**
   - ✅ Status: **Enabled**

### Create Upload Preset (if missing)

1. Click "Add upload preset"
2. Name: `logorhema`
3. Signing mode: **Unsigned** ⚠️ IMPORTANT
4. Save

## Need More Help?

See `CLOUDINARY_TROUBLESHOOTING.md` for detailed debugging steps.

## Quick Commands

```bash
# Restart server
npm run dev

# Check environment variables
npm run check-env

# Run tests
npm test
```
