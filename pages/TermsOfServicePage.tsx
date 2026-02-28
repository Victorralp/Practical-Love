import { FileText, Handshake, AlertTriangle } from 'lucide-react';
import { PageHero, PageShell } from '../components/ui';
import Logo from '../components/Logo';

export default function TermsOfServicePage() {
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
          icon={<FileText className="w-10 h-10 text-red-700" />}
          title="Terms of Service"
          subtitle="The terms that govern your use of the Practical Love website."
        />

        <section className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 md:p-8 space-y-6 text-gray-700">
          <p className="text-sm text-gray-500">Last updated: February 28, 2026</p>

          <div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">Acceptance of Terms</h2>
            <p>
              By accessing this website, you agree to use it lawfully and in accordance with these
              terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-800 mb-2 flex items-center gap-2">
              <Handshake className="w-5 h-5" /> User Conduct
            </h2>
            <p>
              You agree not to submit unlawful, abusive, defamatory, or misleading content. We may
              remove submissions that violate our values or these terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">Content and Testimonies</h2>
            <p>
              By submitting testimony content, you confirm you have the right to share it and grant
              Practical Love permission to review, edit for clarity, and publish it on ministry
              platforms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Limitation of Liability
            </h2>
            <p>
              The website is provided on an "as is" basis. We do not guarantee uninterrupted service
              and are not liable for indirect or consequential damages from website use.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
