import { CheckCircle, XCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { PageHero, PageShell } from '../components/ui';

export default function EnvTestPage() {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
  const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

  const isCloudNameValid = Boolean(cloudName && cloudName !== 'your_cloud_name_here');
  const isUploadPresetValid = Boolean(uploadPreset && uploadPreset !== 'your_upload_preset_here');
  const isApiKeyValid = Boolean(apiKey && apiKey !== 'your_api_key_here');
  const isApiSecretValid = Boolean(apiSecret && apiSecret !== 'your_api_secret_here');

  const allValid = isCloudNameValid && isUploadPresetValid && isApiKeyValid && isApiSecretValid;

  const StatusIcon = ({ valid }: { valid: boolean }) => {
    if (valid) return <CheckCircle className="w-5 h-5 text-amber-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  return (
    <PageShell
      className="bg-gradient-to-br from-orange-50 to-red-50"
      containerClassName="max-w-4xl py-10"
    >
      <div className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100">
        <PageHero
          className="mb-8"
          badge="Cloudinary Setup"
          title="Environment Variables Test"
          subtitle="Verify that your Cloudinary environment variables are configured correctly for uploads and image optimization."
        />

        {allValid ? (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start">
            <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-orange-800 mb-1">
                All Environment Variables Configured!
              </h3>
              <p className="text-orange-700">Your Cloudinary integration is ready to use.</p>
            </div>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
            <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-yellow-800 mb-1">Configuration Issues Detected</h3>
              <p className="text-yellow-700">
                Please update your .env file and restart the development server.
              </p>
            </div>
          </div>
        )}

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">VITE_CLOUDINARY_CLOUD_NAME</h3>
                <StatusIcon valid={isCloudNameValid} />
              </div>
              <div className="bg-gray-50 p-3 rounded font-mono text-sm break-all">
                {cloudName || '<not set>'}
              </div>
              {!isCloudNameValid && (
                <p className="text-red-600 text-sm mt-2 inline-flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Please set your Cloudinary cloud name in .env file
                </p>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">VITE_CLOUDINARY_UPLOAD_PRESET</h3>
                <StatusIcon valid={isUploadPresetValid} />
              </div>
              <div className="bg-gray-50 p-3 rounded font-mono text-sm break-all">
                {uploadPreset || '<not set>'}
              </div>
              {!isUploadPresetValid && (
                <p className="text-red-600 text-sm mt-2 inline-flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Please set your Cloudinary upload preset in .env file
                </p>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">VITE_CLOUDINARY_API_KEY</h3>
                <StatusIcon valid={isApiKeyValid} />
              </div>
              <div className="bg-gray-50 p-3 rounded font-mono text-sm break-all">
                {apiKey ? `${apiKey.substring(0, 10)}...` : '<not set>'}
              </div>
              {!isApiKeyValid && (
                <p className="text-red-600 text-sm mt-2 inline-flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Please set your Cloudinary API key in .env file
                </p>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">VITE_CLOUDINARY_API_SECRET</h3>
                <StatusIcon valid={isApiSecretValid} />
              </div>
              <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                {isApiSecretValid ? '••••••••••••••••' : '<not set>'}
              </div>
              {!isApiSecretValid && (
                <p className="text-red-600 text-sm mt-2 inline-flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Please set your Cloudinary API secret in .env file
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 p-6 bg-orange-50 border border-orange-200 rounded-lg">
            <h3 className="font-bold text-red-900 mb-3">Next Steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-red-800">
              <li>
                Update your <code className="bg-orange-100 px-2 py-1 rounded">.env</code> file with
                actual Cloudinary credentials
              </li>
              <li>
                Restart your development server (stop with Ctrl+C, then run{' '}
                <code className="bg-orange-100 px-2 py-1 rounded">npm run dev</code>)
              </li>
              <li>Refresh this page to verify the changes</li>
              <li>
                Test image upload on the{' '}
                <a href="/cloudinary-demo" className="text-red-600 underline">
                  Cloudinary Demo page
                </a>
              </li>
            </ol>
          </div>

          <div className="mt-6 p-6 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-3">Cloudinary Upload URL:</h3>
            <code className="bg-white p-3 rounded border border-gray-200 block text-sm break-all">
              https://api.cloudinary.com/v1_1/{cloudName || 'YOUR_CLOUD_NAME'}/image/upload
            </code>
            {isCloudNameValid && (
              <p className="text-orange-600 text-sm mt-2">
                ✓ This URL will be used for image uploads
              </p>
            )}
          </div>
      </div>
    </PageShell>
  );
}



