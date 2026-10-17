import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Em, Toast } from '../components/pl/primitives';
import { EASE_POP, animate, useEntrance, usePopOnChange } from '../components/pl/motion';

const ACCOUNT_NAME = 'LRF Mission';
const BANK_NAME = 'Stanbic IBTC Bank';

type DonationAccount = {
  currency: 'USD' | 'GBP' | 'EUR' | 'NGN';
  symbol: string;
  label: string;
  accountNumber: string;
  amounts: readonly number[];
  /** Set when the account cannot currently receive transfers. */
  unavailableReason?: string;
};

const DONATION_ACCOUNTS: readonly DonationAccount[] = [
  { currency: 'USD', symbol: '$', label: 'US Dollar', accountNumber: '0002341445', amounts: [20, 50, 100, 250] },
  { currency: 'GBP', symbol: '£', label: 'British Pound', accountNumber: '0002345340', amounts: [20, 50, 100, 250] },
  { currency: 'EUR', symbol: '€', label: 'Euro', accountNumber: '0002345429', amounts: [20, 50, 100, 250] },
  {
    currency: 'NGN',
    symbol: '₦',
    label: 'Nigerian Naira',
    accountNumber: '0001504485',
    amounts: [10000, 25000, 50000, 100000],
    unavailableReason: 'Dormant and frozen — please use another currency for now.',
  },
];

// TODO: sample impact copy from the design; replace with the ministry's real cost figures.
const IMPACT = [
  { share: 0.4, text: 'prints Love Cards to hand out' },
  { share: 1, text: 'helps a family at Christmas outreach' },
  { share: 2, text: 'sponsors a seat at a marriage workshop' },
];

const WAYS_TO_JOIN = [
  {
    title: 'Pray and share love cards',
    text: 'Cover the mission in prayer and help distribute love cards — print them, photocopy them, and place them in the hands of people who need encouragement.',
  },
  {
    title: 'Be present and give',
    text: 'Join us in sharing love cards in everyday spaces, and give so the blessing can reach different places, people and generations.',
  },
];

function formatAccountNumber(value: string) {
  return `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`;
}

function money(account: DonationAccount, value: number) {
  return `${account.symbol}${value.toLocaleString('en-US')}`;
}

export default function DonationPage() {
  const [currency, setCurrency] = useState<DonationAccount['currency']>('USD');
  const [amount, setAmount] = useState(50);
  const [other, setOther] = useState('');
  const [showTransfer, setShowTransfer] = useState(false);
  const [toast, setToast] = useState('');
  const rootRef = useRef<HTMLDivElement | null>(null);
  const totalRef = useRef<HTMLSpanElement | null>(null);
  const transferRef = useRef<HTMLDivElement | null>(null);

  const account = DONATION_ACCOUNTS.find(a => a.currency === currency) ?? DONATION_ACCOUNTS[0];
  const typed = parseInt(other.replace(/\D/g, ''), 10);
  const total = typed > 0 ? typed : amount;
  const middle = account.amounts[1];

  useEntrance(rootRef);
  usePopOnChange(totalRef, `${currency}:${total}`, [
    { transform: 'translateY(-30%) scale(.9)', opacity: 0 },
    { transform: 'none', opacity: 1 },
  ]);

  useEffect(() => {
    if (!showTransfer || !transferRef.current) return;
    transferRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    animate(transferRef.current, [{ transform: 'translateY(16px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 500, easing: EASE_POP });
  }, [showTransfer]);

  const pickCurrency = (next: DonationAccount) => {
    setCurrency(next.currency);
    setAmount(next.amounts[1]);
    setOther('');
  };

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(account.accountNumber);
      setToast('Account number copied ♥');
    } catch {
      setToast('Copy failed — please write the number down.');
    }
  };

  const clearToast = useCallback(() => setToast(''), []);

  return (
    <div ref={rootRef} className="pl-scope">
      <section className="pl-wrap grid items-start gap-[clamp(40px,6vw,88px)] pb-[clamp(64px,9vw,120px)] pt-[clamp(48px,8vw,104px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
        <div>
          <h1 data-in className="m-0 text-[clamp(56px,9vw,128px)] font-extrabold leading-[.88] tracking-[-0.055em]">
            Give the gift <Em>that was given first.</Em>
          </h1>
          <p data-in className="pl-lede max-w-[38ch]">
            Your gift prints Love Cards, funds Christmas outreach and keeps every message free.
          </p>
          <div data-in className="mt-[clamp(28px,4vw,44px)] grid gap-[10px]">
            {IMPACT.map(tier => {
              const threshold = Math.round(middle * tier.share);
              const on = total >= threshold;
              return (
                <div
                  key={tier.text}
                  className={`flex items-center gap-4 rounded-[20px] px-5 py-4 transition-colors duration-300 ${on ? 'bg-pl-red text-white' : 'bg-[#f7f2f1] text-pl-muted'}`}
                >
                  <span className="min-w-[4.5em] text-[22px] font-extrabold">{money(account, threshold)}</span>
                  <span className="text-[16px]">{tier.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div data-in className="rounded-[32px] border-2 border-pl-ink bg-white p-[clamp(24px,3.4vw,40px)] shadow-[12px_12px_0_#e1251b]">
          <div className="grid grid-cols-4 rounded-full bg-pl-blush p-1" role="group" aria-label="Currency">
            {DONATION_ACCOUNTS.map(a => (
              <button
                key={a.currency}
                type="button"
                aria-pressed={currency === a.currency}
                onClick={() => pickCurrency(a)}
                className={`min-h-[48px] rounded-full border-0 text-[16px] font-bold transition-colors duration-200 ${
                  currency === a.currency ? 'bg-pl-ink text-white' : 'bg-transparent text-pl-ink'
                }`}
              >
                {a.currency}
              </button>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-[10px]">
            {account.amounts.map(value => {
              const on = !other && amount === value;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setAmount(value);
                    setOther('');
                  }}
                  className={`min-h-[72px] rounded-[20px] border-2 border-pl-ink text-[clamp(22px,2.4vw,28px)] font-extrabold tracking-[-0.03em] transition-[background,color,transform] duration-300 [transition-timing-function:cubic-bezier(.3,1.6,.5,1)] ${
                    on ? 'scale-[1.04] bg-pl-red text-white' : 'bg-white text-pl-ink'
                  }`}
                >
                  {money(account, value)}
                </button>
              );
            })}
          </div>

          <label htmlFor="give-other" className="mt-4 block text-[14px] font-semibold">
            Or enter an amount
          </label>
          <input
            id="give-other"
            inputMode="numeric"
            value={other}
            onChange={e => setOther(e.target.value)}
            placeholder="Other amount"
            className="mt-2 box-border min-h-[56px] w-full rounded-[16px] border-2 border-pl-ink px-5 text-[18px]"
          />

          <div className="mt-6 flex items-baseline justify-between gap-3 border-t-2 border-dashed border-[#f1c9c4] pt-5">
            <span className="text-[16px] text-pl-muted">{account.label}</span>
            <span ref={totalRef} className="text-[clamp(44px,5vw,64px)] font-extrabold leading-none tracking-[-0.05em]">
              {money(account, total)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowTransfer(true)}
            className="mt-5 min-h-[60px] w-full rounded-full border-0 bg-pl-red text-[18px] font-bold text-white"
          >
            Give {money(account, total)} by bank transfer
          </button>
          <p className="mb-0 mt-[14px] text-center text-[14px] text-pl-muted2">Gifts are sent by bank transfer to the ministry account.</p>

          {showTransfer && (
            <div ref={transferRef} className="mt-6 rounded-[24px] bg-pl-ink p-6 text-white" aria-live="polite">
              <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.08em] opacity-70">Send {money(account, total)} to</p>
              {account.unavailableReason ? (
                <p className="mb-0 mt-3 text-[17px] font-semibold text-pl-coral">{account.unavailableReason}</p>
              ) : (
                <>
                  <dl className="m-0 mt-4 grid gap-3 text-[16px]">
                    <div className="flex justify-between gap-3">
                      <dt className="opacity-70">Account name</dt>
                      <dd className="m-0 font-semibold">{ACCOUNT_NAME}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="opacity-70">Bank</dt>
                      <dd className="m-0 font-semibold">{BANK_NAME}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="opacity-70">{account.currency} account</dt>
                      <dd className="m-0 font-mono text-[20px] font-bold tracking-[0.06em]">{formatAccountNumber(account.accountNumber)}</dd>
                    </div>
                  </dl>
                  <button type="button" onClick={copyNumber} className="pl-btn pl-btn-white mt-5 w-full">
                    Copy account number
                  </button>
                  <p className="mb-0 mt-4 text-[14px] leading-[1.5] opacity-80">
                    Please confirm the account name shows as {ACCOUNT_NAME} in your banking app before you send.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="bg-pl-blush">
        <div className="pl-wrap grid gap-[clamp(16px,2vw,24px)] py-[clamp(56px,8vw,96px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
          <h2 className="pl-h2 m-0">
            More ways <Em>to give.</Em>
          </h2>
          {WAYS_TO_JOIN.map((way, i) => (
            <div key={way.title} className="rounded-[28px] border-2 border-pl-ink bg-white p-7">
              <span className="pl-serif text-[28px] text-pl-red">0{i + 1}</span>
              <h3 className="mb-0 mt-2 text-[26px] font-extrabold tracking-[-0.03em]">{way.title}</h3>
              <p className="mb-0 mt-3 text-[16px] leading-[1.5] text-pl-body">{way.text}</p>
            </div>
          ))}
          <Link to="/contact" className="pl-btn pl-btn-ink self-center justify-self-start">
            Talk to the team
          </Link>
        </div>
      </section>

      {toast && <Toast message={toast} onDone={clearToast} />}
    </div>
  );
}
