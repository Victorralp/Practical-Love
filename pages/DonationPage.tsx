import { useMemo, useState } from 'react';
import { HeartHandshake, ShieldCheck, Wallet, ArrowRight } from 'lucide-react';
import { PageHero, PageShell } from '../components/ui';
import Logo from '../components/Logo';

const PRESET_AMOUNTS = [5000, 10000, 25000, 50000];

export default function DonationPage() {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [amount, setAmount] = useState<number>(PRESET_AMOUNTS[1]);
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    note: '',
  });
  const [submitMessage, setSubmitMessage] = useState('');

  const finalAmount = useMemo(() => {
    const parsed = Number(customAmount);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
    return amount;
  }, [amount, customAmount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(
      'Donation checkout is ready for backend integration. A backend developer can now connect payment processing and receipt delivery.'
    );
  };

  return (
    <PageShell className="bg-gradient-to-b from-red-50 via-orange-50 to-white">
      <div className="space-y-8">
        <PageHero
          badge={
            <>
              <Logo className="w-4 h-4" />
              Support The Mission
            </>
          }
          icon={<HeartHandshake className="w-10 h-10 text-red-700" />}
          title="Donate to Practical Love"
          subtitle="Your giving helps us spread practical love resources, strengthen families, and equip communities across Nigeria."
        />

        <div className="grid lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-white rounded-2xl border border-orange-100 shadow-sm p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Give Frequency
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFrequency('one-time')}
                    className={`rounded-xl px-4 py-3 border-2 text-sm font-semibold transition ${
                      frequency === 'one-time'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-orange-100 text-gray-700 hover:border-orange-200'
                    }`}
                  >
                    One-time
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`rounded-xl px-4 py-3 border-2 text-sm font-semibold transition ${
                      frequency === 'monthly'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-orange-100 text-gray-700 hover:border-orange-200'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Amount</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {PRESET_AMOUNTS.map(value => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        setAmount(value);
                        setCustomAmount('');
                      }}
                      className={`rounded-xl px-4 py-3 border-2 text-sm font-semibold transition ${
                        amount === value && !customAmount
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-orange-100 text-gray-700 hover:border-orange-200'
                      }`}
                    >
                      NGN {value.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="custom-amount" className="block text-sm font-semibold text-gray-700 mb-2">
                  Or Enter Custom Amount (NGN)
                </label>
                <input
                  id="custom-amount"
                  type="number"
                  min="100"
                  step="100"
                  value={customAmount}
                  onChange={e => setCustomAmount(e.target.value)}
                  placeholder="e.g. 15000"
                  className="w-full px-4 py-3 rounded-xl border-2 border-orange-100 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="full-name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-orange-100 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-orange-100 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-orange-100 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  placeholder="+234 ..."
                />
              </div>

              <div>
                <label htmlFor="note" className="block text-sm font-semibold text-gray-700 mb-2">
                  Prayer / Support Note (Optional)
                </label>
                <textarea
                  id="note"
                  rows={4}
                  value={formData.note}
                  onChange={e => setFormData(prev => ({ ...prev, note: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-orange-100 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition resize-none"
                  placeholder="Share what you want this donation to support."
                />
              </div>

              <button type="submit" className="w-full md:w-auto btn-brand px-8 py-4 inline-flex items-center gap-2">
                Continue to Secure Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              {submitMessage ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 px-4 py-3 text-sm">
                  {submitMessage}
                </div>
              ) : null}
            </form>
          </section>

          <aside className="space-y-4">
            <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-3">Donation Summary</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Frequency:</span> {frequency === 'monthly' ? 'Monthly' : 'One-time'}
                </p>
                <p>
                  <span className="font-semibold">Amount:</span> NGN {finalAmount.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-700 to-orange-600 text-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-orange-200" />
                <h3 className="font-semibold">Integration Notes</h3>
              </div>
              <ul className="text-sm text-orange-100 space-y-2">
                <li>Payment gateway endpoint pending backend setup.</li>
                <li>Webhook verification and receipts pending.</li>
                <li>Donor records and analytics pending.</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <Wallet className="w-5 h-5 text-red-700" />
                <h3 className="font-semibold text-red-800">Ready for Backend</h3>
              </div>
              <p className="text-sm text-gray-700">
                This page now captures donation intent and donor details. Backend can connect
                payment processing, transaction storage, and confirmation emails.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
