import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { usePopOnChange } from '../components/pl/motion';

const CONTACT_EMAIL = 'logosrhema842@gmail.com';
const LAST_UPDATED = 'February 28, 2026';

export type LegalDoc = 'privacy' | 'terms' | 'cookies';

const DOCS: Record<LegalDoc, { tab: string; path: string; title: string; summary: string; sections: [string, string][] }> = {
  privacy: {
    tab: 'Privacy',
    path: '/privacy-policy',
    title: 'Privacy Policy',
    summary: 'How Practical Love collects, uses, and protects your information.',
    sections: [
      ['Information we collect', 'We may collect information you provide directly, including your name, email address, testimony content, and any optional profile image you upload.'],
      ['How we use information', 'We use your information to respond to messages, review and publish testimonies when appropriate, improve ministry services, and maintain website security and reliability.'],
      ['Third-party services', 'Our website uses third-party services including Web3Forms (form submissions) and Cloudinary (image hosting). Information submitted through these services is subject to their terms and privacy policies.'],
      ['Your rights', `You may request access, correction, or deletion of your submitted personal information by contacting us at ${CONTACT_EMAIL}.`],
    ],
  },
  terms: {
    tab: 'Terms',
    path: '/terms-of-service',
    title: 'Terms of Service',
    summary: 'The terms that govern your use of the Practical Love website.',
    sections: [
      ['Acceptance of terms', 'By accessing this website, you agree to use it lawfully and in accordance with these terms.'],
      ['User conduct', 'You agree not to submit unlawful, abusive, defamatory, or misleading content. We may remove submissions that violate our values or these terms.'],
      ['Content and testimonies', 'By submitting testimony content, you confirm you have the right to share it and grant Practical Love permission to review, edit for clarity, and publish it on ministry platforms.'],
      ['Limitation of liability', 'The website is provided on an “as is” basis. We do not guarantee uninterrupted service and are not liable for indirect or consequential damages from website use.'],
    ],
  },
  cookies: {
    tab: 'Cookies',
    path: '/cookie-policy',
    title: 'Cookie Policy',
    summary: 'How cookies and related technologies are used on this website.',
    sections: [
      ['What are cookies?', 'Cookies are small text files stored in your browser to help websites remember preferences and improve user experience.'],
      ['How we use cookies', 'We use cookies and similar technologies for essential website functionality, analytics, and performance monitoring.'],
      ['Third-party cookies', 'Some third-party tools used by our website may place cookies according to their own policies.'],
      ['Managing cookies', 'You can manage or disable cookies through your browser settings. Disabling cookies may affect some website features.'],
    ],
  },
};

const ORDER: LegalDoc[] = ['privacy', 'terms', 'cookies'];

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const docRef = useRef<HTMLDivElement | null>(null);
  const current = DOCS[doc];

  usePopOnChange(docRef, doc, [
    { transform: 'translateY(20px)', opacity: 0 },
    { transform: 'none', opacity: 1 },
  ]);

  return (
    <section className="mx-auto box-border max-w-[880px] px-[clamp(20px,4.5vw,40px)] pb-[clamp(64px,9vw,120px)] pt-[clamp(48px,8vw,96px)]">
      <nav aria-label="Legal documents" className="inline-flex flex-wrap gap-1 rounded-full bg-[#f6eeed] p-1">
        {ORDER.map(key => {
          const on = key === doc;
          return (
            <Link
              key={key}
              to={DOCS[key].path}
              aria-current={on ? 'page' : undefined}
              className={`flex min-h-[44px] items-center rounded-full px-5 text-[15px] font-semibold no-underline transition-colors duration-200 ${
                on ? 'bg-pl-ink text-white hover:text-white' : 'bg-transparent text-pl-ink hover:text-pl-red'
              }`}
            >
              {DOCS[key].tab}
            </Link>
          );
        })}
      </nav>

      <div ref={docRef}>
        <h1 className="mb-0 mt-7 text-[clamp(48px,8vw,96px)] font-extrabold leading-[.9] tracking-[-0.05em]">{current.title}</h1>
        <p className="mb-0 mt-4 text-[19px] leading-[1.5] text-pl-body">{current.summary}</p>
        <p className="mb-0 mt-3 text-[14px] text-pl-muted">Last updated: {LAST_UPDATED}</p>
        <div className="mt-[clamp(28px,4vw,44px)]">
          {current.sections.map(([heading, body], i) => (
            <div key={heading} className="grid gap-4 border-t-2 border-pl-ink py-6 [grid-template-columns:clamp(40px,6vw,64px)_minmax(0,1fr)]">
              <span className="pl-serif text-[30px] leading-none text-pl-red">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h2 className="m-0 text-[24px] font-extrabold tracking-[-0.02em]">{heading}</h2>
                <p className="mb-0 mt-2 text-[17px] leading-[1.6] text-pl-body">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mb-0 mt-6 rounded-[20px] bg-pl-blush px-6 py-5 text-[16px]">
        Questions? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </section>
  );
}
