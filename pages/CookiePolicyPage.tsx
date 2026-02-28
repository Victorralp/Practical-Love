import { Cookie, Settings, Database } from 'lucide-react';
import { PageHero, PageShell } from '../components/ui';
import Logo from '../components/Logo';

export default function CookiePolicyPage() {
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
          icon={<Cookie className="w-10 h-10 text-red-700" />}
          title="Cookie Policy"
          subtitle="How cookies and related technologies are used on this website."
        />

        <section className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 md:p-8 space-y-6 text-gray-700">
          <p className="text-sm text-gray-500">Last updated: February 28, 2026</p>

          <div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">What Are Cookies?</h2>
            <p>
              Cookies are small text files stored in your browser to help websites remember
              preferences and improve user experience.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-800 mb-2 flex items-center gap-2">
              <Settings className="w-5 h-5" /> How We Use Cookies
            </h2>
            <p>
              We use cookies and similar technologies for essential website functionality, analytics,
              and performance monitoring.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-800 mb-2 flex items-center gap-2">
              <Database className="w-5 h-5" /> Third-Party Cookies
            </h2>
            <p>
              Some third-party tools used by our website may place cookies according to their own
              policies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">Managing Cookies</h2>
            <p>
              You can manage or disable cookies through your browser settings. Disabling cookies may
              affect some website features.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
