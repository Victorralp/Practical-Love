import { HeartHandshake, HelpingHand, MoveRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CTASection, PageHero, PageShell, SectionCard } from '../components/ui';
import Logo from '../components/Logo';
import GivingHeart from '../components/GivingHeart';

const JOIN_US_STEPS = [
  {
    number: '01',
    title: 'Pray and share love cards',
    description:
      'Cover the mission in prayer and help distribute love cards — print them, photocopy them, and place them in the hands of people who need encouragement.',
    icon: <HeartHandshake className="w-6 h-6 text-red-700" />,
  },
  {
    number: '02',
    title: 'Be present and give',
    description:
      'Join us physically in sharing love cards in everyday spaces, and feel free to donate so the full blessing can be shared across different places, people, and generations.',
    icon: <Users className="w-6 h-6 text-red-700" />,
  },
] as const;



const DONATION_ACCOUNTS = [
  {
    currency: 'NGN',
    label: 'Nigeria Naira',
    accountName: 'Add verified account name',
    bank: 'Add bank name',
    accountNumber: '0000000000',
  },
] as const;

export default function DonationPage() {
  return (
    <PageShell className="bg-[radial-gradient(circle_at_top,_rgba(254,215,170,0.45),_transparent_36%),linear-gradient(180deg,_#fff7ed_0%,_#ffffff_55%,_#fff1f2_100%)]">
      <div className="space-y-8">
        <PageHero
          badge={
            <>
              <Logo className="w-4 h-4" />
              Join The Practical Love Mission
            </>
          }
          icon={<HelpingHand className="w-10 h-10 text-red-700" />}
          title="Join us in making Nigeria and the world a better place"
          subtitle="Stand with us in prayer, distribution, physical outreach, and giving so the blessing of practical love reaches lives, homes, and generations."
          className="shadow-lg"
          actions={
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#donation-accounts"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
              >
                View Donation Accounts
                <MoveRight className="w-4 h-4" />
              </a>
              <Link
                to="/yellow-card"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white/80 px-6 py-3 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-white"
              >
                View Love Cards
              </Link>
            </div>
          }
        />

        <GivingHeart />

        <section className="grid gap-5 grid-cols-1 md:grid-cols-2">
          {JOIN_US_STEPS.map(step => (
            <SectionCard
              key={step.number}
              className="relative overflow-hidden border-orange-200 bg-white/95 shadow-md"
            >
              <div className="absolute right-4 top-4 text-5xl font-serif text-red-100">{step.number}</div>
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
                  {step.icon}
                </div>
                <h2 className="mt-5 max-w-sm text-2xl font-serif text-red-800">{step.title}</h2>
                <p className="mt-3 text-base leading-7 text-gray-700">{step.description}</p>
              </div>
            </SectionCard>
          ))}
        </section>

        <SectionCard
          title="Where and how to share love cards"
          className="border-orange-200 bg-white/95 shadow-md"
        >
          <p className="max-w-2xl text-gray-700 leading-7">
            Start where people already live and move. Print the cards in batches,
            photocopy them when needed, and hand them out with gentleness and respect
            in places like schools, markets, hospitals, churches, and workplaces.
          </p>
          <div className="mt-4">
            <Link
              to="/yellow-card"
              className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
            >
              Open The Love Card
              <MoveRight className="w-4 h-4" />
            </Link>
          </div>
        </SectionCard>

        <section
          id="donation-accounts"
          className="rounded-[2rem] border border-orange-200 bg-gradient-to-br from-red-950 via-red-900 to-orange-900 p-6 text-white shadow-xl md:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-200">
                Donation
              </p>
              <h2 className="mt-3 text-3xl font-serif">
                Share the blessing with yourself and your generation
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-orange-100">
                Feel free to donate in order to help us share the full blessing more widely. Use
                the right account and currency below once your verified payment details are added.
              </p>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-orange-100">
                Replace the placeholder account details below with your real verified ministry
                accounts before publishing this page live.
              </div>
            </div>

            <div className="max-w-md">
              {DONATION_ACCOUNTS.map(account => (
                <div
                  key={account.currency}
                  className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">
                        {account.currency}
                      </p>
                      <h3 className="mt-2 text-xl font-serif text-white">{account.label}</h3>
                    </div>
                    <div className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-orange-100">
                      Active Soon
                    </div>
                  </div>
                  <dl className="mt-5 space-y-3 text-sm">
                    <div>
                      <dt className="text-orange-200">Account name</dt>
                      <dd className="mt-1 text-white">{account.accountName}</dd>
                    </div>
                    <div>
                      <dt className="text-orange-200">Bank</dt>
                      <dd className="mt-1 text-white">{account.bank}</dd>
                    </div>
                    <div>
                      <dt className="text-orange-200">Account number</dt>
                      <dd className="mt-1 font-semibold tracking-[0.16em] text-white">
                        {account.accountNumber}
                      </dd>
                    </div>
                  </dl>
                </div>
              ))}
              <p className="mt-4 text-sm text-orange-200">
                Additional currency accounts (USD, GBP, EUR) will be available soon.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          title="Join us with prayer, presence, and practical support"
          description="Every prayer, every love card, every visit, and every gift helps carry this work further across Nigeria and beyond."
          primaryAction={{ label: 'Contact The Team', href: '/contact' }}
          secondaryAction={{ label: 'Read The Mission', href: '/mission-vision' }}
        />
      </div>
    </PageShell>
  );
}
