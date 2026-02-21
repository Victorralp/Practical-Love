import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Check, Loader, AlertTriangle } from 'lucide-react';
import { uploadToCloudinary, CloudinaryUploadResponse } from '../services/cloudinaryService';

interface CloudinaryImageUploadProps {
  onImageUpload: (imageUrl: string, publicId: string) => void;
  onImageRemove?: () => void;
  folder?: string;
  tags?: string[];
  maxSizeMB?: number;
  allowedTypes?: string[];
  initialImageUrl?: string;
  label?: string;
  required?: boolean;
}

const CloudinaryImageUpload: React.FC<CloudinaryImageUploadProps> = ({
  onImageUpload,
  onImageRemove,
  folder = 'testimonies',
  tags = ['testimony', 'user-uploaded'],
  maxSizeMB = 5,
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  initialImageUrl,
  label = 'Upload Profile Image',
  required = false,
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<CloudinaryUploadResponse | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      setError(`Please upload an image file (${allowedTypes.join(', ')})`);
      return;
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    setError(null);
    handleUpload(file);
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setUploadProgress(0);

    // Create preview URL
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload to Cloudinary
      const result = await uploadToCloudinary(file, { folder, tags });

      clearInterval(progressInterval);
      setUploadProgress(100);

      setUploadedImage(result);
      onImageUpload(result.secure_url, result.public_id);

      // Clean up preview URL
      URL.revokeObjectURL(preview);

      // Set the Cloudinary URL as preview
      setPreviewUrl(result.secure_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
      setPreviewUrl(null);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveImage = () => {
    if (uploadedImage) {
      // Note: In production, you might want to delete from Cloudinary
      // await deleteFromCloudinary(uploadedImage.public_id);
    }

    setUploadedImage(null);
    setPreviewUrl(null);
    setError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (onImageRemove) {
      onImageRemove();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {label && (
        <label className="block text-gray-700 font-semibold mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept={allowedTypes.join(',')}
        className="hidden"
        disabled={uploading}
      />

      {previewUrl ? (
        <div className="relative group">
          <div className="border-2 border-dashed border-orange-300 rounded-2xl p-4 bg-gradient-to-br from-orange-50 to-red-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <ImageIcon className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-gray-800 font-medium">Image Uploaded</span>
              </div>
              {uploadedImage && (
                <div className="flex items-center text-orange-600">
                  <Check className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Upload Complete</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-24 h-24 rounded-xl object-cover border-2 border-white shadow-md"
                />
                {uploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
                    <Loader className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                {uploadedImage && (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Size:</span>{' '}
                      {(uploadedImage.bytes / 1024).toFixed(1)} KB
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Dimensions:</span> {uploadedImage.width} ×{' '}
                      {uploadedImage.height}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Format:</span>{' '}
                      {uploadedImage.format.toUpperCase()}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={uploading}
                  className="mt-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center text-sm"
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove Image
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer
            ${
              uploading
                ? 'border-orange-400 bg-orange-50'
                : error
                  ? 'border-red-300 bg-red-50'
                  : 'border-orange-300 hover:border-orange-400 bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100'
            }`}
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {uploading ? (
            <div className="space-y-4">
              <Loader className="w-12 h-12 mx-auto text-red-600 animate-spin" />
              <div className="space-y-2">
                <p className="text-gray-800 font-medium">Uploading to Cloudinary...</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-red-600 to-orange-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{uploadProgress}%</p>
              </div>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-white" />
              </div>

              <div className="mb-4">
                <p className="text-gray-800 font-medium text-lg mb-2">Upload Profile Image</p>
                <p className="text-gray-600 text-sm">Drag & drop or click to upload</p>
                <p className="text-gray-500 text-xs mt-1">
                  Supports:{' '}
                  {allowedTypes.map(t => t.replace('image/', '').toUpperCase()).join(', ')} • Max:{' '}
                  {maxSizeMB}MB
                </p>
              </div>

              <button
                type="button"
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-medium hover:from-red-700 hover:to-orange-700 transition-all shadow-md hover:shadow-lg"
              >
                Choose Image
              </button>
            </>
          )}
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            {error}
          </p>
        </div>
      )}

      {!error && !uploading && !previewUrl && (
        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-red-600 text-sm">
            <span className="font-medium">Tip:</span> A clear profile photo helps others connect
            with your story. Images are securely stored on Cloudinary.
          </p>
        </div>
      )}
    </div>
  );
};

export default CloudinaryImageUpload;



