import { ShieldCheck, Lock, Eye } from 'lucide-react';
import { PageHero, PageShell } from '../components/ui';
import Logo from '../components/Logo';

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <div className="space-y-8">
        <PageHero
          badge={
            <>
              <Logo className="w-4 h-4" />
              Legal
            </>
          }
          icon={<ShieldCheck className="w-10 h-10 text-red-700" />}
          title="Privacy Policy"
          subtitle="How Practical Love collects, uses, and protects your information."
        />

        <section className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 md:p-8 space-y-6 text-gray-700">
          <p className="text-sm text-gray-500">Last updated: February 28, 2026</p>

          <div>
            <h2 className="text-xl font-semibold text-red-800 mb-2 flex items-center gap-2">
              <Lock className="w-5 h-5" /> Information We Collect
            </h2>
            <p>
              We may collect information you provide directly, including your name, email address,
              testimony content, and any optional profile image you upload.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">How We Use Information</h2>
            <p>
              We use your information to respond to messages, review and publish testimonies when
              appropriate, improve ministry services, and maintain website security and reliability.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-800 mb-2 flex items-center gap-2">
              <Eye className="w-5 h-5" /> Third-Party Services
            </h2>
            <p>
              Our website uses third-party services including Web3Forms (form submissions) and
              Cloudinary (image hosting). Information submitted through these services is subject to
              their terms and privacy policies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">Your Rights</h2>
            <p>
              You may request access, correction, or deletion of your submitted personal information
              by contacting us at logosrhema842@gmail.com.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
