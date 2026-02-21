import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cloud, Upload, Check, Image as ImageIcon, User, Star, Globe, Shield } from 'lucide-react';
import CloudinaryImageUpload from '../components/CloudinaryImageUpload';
import { getOptimizedImageUrl, getAvatarUrl, getThumbnailUrl } from '../services/cloudinaryService';
import { PageHero, PageShell } from '../components/ui';

export default function CloudinaryDemoPage() {
  const [uploadedImage, setUploadedImage] = useState<{ url: string; publicId: string } | null>(
    null
  );
  const [demoPublicId, setDemoPublicId] = useState('sample/woman');

  const handleImageUpload = (url: string, publicId: string) => {
    setUploadedImage({ url, publicId });
  };

  const demoImages = [
    { id: 'sample/woman', label: 'Sample Woman', type: 'avatar' },
    { id: 'sample/man', label: 'Sample Man', type: 'avatar' },
    { id: 'sample/landscape', label: 'Landscape', type: 'optimized' },
    { id: 'sample/portrait', label: 'Portrait', type: 'thumbnail' },
  ];

  return (
    <PageShell
      className="bg-gradient-to-br from-orange-50 to-red-50"
      containerClassName="py-10"
    >
      <PageHero
        className="mb-10"
        badge="Developer Tools"
        icon={
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center shadow-sm">
            <Cloud className="w-6 h-6 text-white" />
          </div>
        }
        title="Cloudinary Integration Demo"
        subtitle="Test uploads and see how Cloudinary optimizes and delivers images for testimony profiles."
      />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Upload Demo */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100">
            <div className="flex items-center mb-6">
              <Upload className="w-6 h-6 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Image Upload</h2>
            </div>

            <p className="text-gray-700 mb-6">
              Try uploading a profile image. Images are automatically optimized and stored on
              Cloudinary's CDN.
            </p>

            <CloudinaryImageUpload
              onImageUpload={handleImageUpload}
              onImageRemove={() => setUploadedImage(null)}
              folder="testimonies/demo"
              tags={['demo', 'testimony']}
              maxSizeMB={3}
              label="Upload Test Image"
            />

            {uploadedImage && (
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center mb-2">
                  <Check className="w-5 h-5 text-orange-600 mr-2" />
                  <span className="font-medium text-orange-800">Upload Successful!</span>
                </div>
                <div className="text-sm text-gray-700 space-y-1">
                  <div>
                    <span className="font-medium">URL:</span>{' '}
                    <span className="text-red-600 truncate block">{uploadedImage.url}</span>
                  </div>
                  <div>
                    <span className="font-medium">Public ID:</span>{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded">{uploadedImage.publicId}</code>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Optimization Demo */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100">
            <div className="flex items-center mb-6">
              <ImageIcon className="w-6 h-6 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Image Optimization</h2>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-3">Select Demo Image</label>
              <div className="grid grid-cols-2 gap-3">
                {demoImages.map(image => (
                  <button
                    key={image.id}
                    onClick={() => setDemoPublicId(image.id)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      demoPublicId === image.id
                        ? 'border-red-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-600" />
                      <span className="font-medium">{image.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  Avatar (Circular)
                </h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={getAvatarUrl(demoPublicId, 100)}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                  />
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">URL:</div>
                    <code className="bg-gray-100 px-2 py-1 rounded block truncate">
                      {getAvatarUrl(demoPublicId, 100)}
                    </code>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Optimized Display</h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={getOptimizedImageUrl(demoPublicId, 300, 200)}
                    alt="Optimized"
                    className="w-48 h-32 rounded-lg border-2 border-gray-200 shadow-sm object-cover"
                  />
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">URL:</div>
                    <code className="bg-gray-100 px-2 py-1 rounded block truncate">
                      {getOptimizedImageUrl(demoPublicId, 300, 200)}
                    </code>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Thumbnail</h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={getThumbnailUrl(demoPublicId, 150, 100)}
                    alt="Thumbnail"
                    className="w-36 h-24 rounded border border-gray-200 shadow-sm object-cover"
                  />
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">URL:</div>
                    <code className="bg-gray-100 px-2 py-1 rounded block truncate">
                      {getThumbnailUrl(demoPublicId, 150, 100)}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-8 text-white shadow-xl mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Benefits of Cloudinary Integration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-10 p-6 rounded-xl">
              <div className="text-3xl font-bold mb-2">⚡</div>
              <h3 className="font-bold text-lg mb-2">Automatic Optimization</h3>
              <p className="text-orange-100">
                Images are automatically resized, compressed, and converted to optimal formats
              </p>
            </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-xl">
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-white/15 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">Global CDN</h3>
              <p className="text-orange-100">
                Images are delivered through Cloudinary's global content delivery network
              </p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-xl">
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-white/15 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">Secure Storage</h3>
              <p className="text-orange-100">Images are securely stored with backup and versioning</p>
            </div>
          </div>
        </div>

        {/* Integration Info */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Integration Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Used in Testimony Pages</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Share Testimony Page:</strong> Users can upload profile images when
                    sharing their stories
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Testimonies Page:</strong> Displays optimized profile images from
                    Cloudinary
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Automatic Fallbacks:</strong> Gradient avatars for users without images
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Technical Implementation</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-orange-100 text-red-600 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 text-xs font-bold">
                    1
                  </div>
                  <span>
                    <code>services/cloudinaryService.ts</code> - Core service for uploads and URL
                    generation
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-orange-100 text-red-600 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 text-xs font-bold">
                    2
                  </div>
                  <span>
                    <code>components/CloudinaryImageUpload.tsx</code> - Reusable upload component
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-orange-100 text-red-600 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 text-xs font-bold">
                    3
                  </div>
                  <span>
                    <code>.env</code> - Secure configuration with environment variables
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div>
                <p className="text-gray-700 font-medium">
                  Cloud Name:{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    {import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'Not configured'}
                  </code>
                </p>
              </div>
              <div className="flex space-x-4">
                <Link
                  to="/share-testimony"
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-medium hover:from-red-700 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
                >
                  Try Testimony Upload
                </Link>
                <Link
                  to="/testimonies"
                  className="px-6 py-3 border-2 border-red-500 text-red-600 rounded-lg font-medium hover:bg-orange-50 transition-all"
                >
                  View Testimonies
                </Link>
              </div>
            </div>
          </div>
        </div>
    </PageShell>
  );
}



