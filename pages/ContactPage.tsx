import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Em } from '../components/pl/primitives';
import { EASE_POP, animate, useEntrance } from '../components/pl/motion';
import { sendWeb3Form } from '../services/web3formsService';

const CONTACT_EMAIL = 'logosrhema842@gmail.com';

// Each topic maps to the subject line the ministry inbox already filters on.
const TOPICS = [
  { label: 'A question', subject: 'General Inquiry' },
  { label: 'Partnership', subject: 'Partnership Opportunity' },
  { label: 'Testimony', subject: 'Share a Testimony' },
  { label: 'Yellow Card', subject: 'Yellow Card Request' },
  { label: 'Invite us', subject: 'Invitation to Minister' },
] as const;

const EMPTY_FORM = { name: '', email: '', message: '' };

export default function ContactPage() {
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>(TOPICS[0]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heartRef = useRef<HTMLDivElement | null>(null);

  useEntrance(rootRef);

  useEffect(() => {
    if (sent) {
      animate(heartRef.current, [{ transform: 'scale(0) rotate(-20deg)' }, { transform: 'scale(1.2)' }, { transform: 'none' }], { duration: 800, easing: EASE_POP });
    }
  }, [sent]);

  const update = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [event.target.name]: event.target.value }));
    if (error) setError('');
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSending(true);
    setError('');
    try {
      await sendWeb3Form({ subject: topic.subject, name: form.name, email: form.email, message: form.message });
      setForm(EMPTY_FORM);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const field = 'min-h-[54px] rounded-[16px] border-0 px-[18px] text-[16px] text-pl-ink';

  return (
    <div ref={rootRef}>
      <section className="pl-wrap grid items-start gap-[clamp(40px,6vw,88px)] pb-[clamp(64px,9vw,120px)] pt-[clamp(48px,8vw,104px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
        <div>
          <h1 data-in className="m-0 text-[clamp(56px,9vw,128px)] font-extrabold leading-[.88] tracking-[-0.055em]">
            Say <Em>hello.</Em>
          </h1>
          <p data-in className="pl-lede max-w-[36ch]">
            Questions, partnerships, a testimony, or a request to bring Practical Love to your church. We usually reply within one to three working days.
          </p>
          <div data-in className="mt-[clamp(28px,4vw,44px)] grid gap-[10px]">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex min-h-[64px] items-center justify-between gap-3 break-all rounded-[20px] border-2 border-pl-ink px-6 text-[18px] font-semibold text-pl-ink no-underline hover:text-pl-ink"
            >
              {CONTACT_EMAIL}
              <span className="pl-serif text-[24px] text-pl-red" aria-hidden="true">
                →
              </span>
            </a>
            <Link
              to="/prayer"
              className="flex min-h-[64px] items-center justify-between rounded-[20px] bg-pl-blush px-6 text-[18px] font-semibold text-pl-deep no-underline hover:text-pl-deep"
            >
              Need prayer instead?
              <span className="pl-serif text-[24px]" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>

        <div data-in className="rounded-[32px] bg-pl-ink p-[clamp(24px,3.4vw,40px)] text-white">
          {sent ? (
            <div className="py-6 text-center" role="status">
              <div ref={heartRef} className="text-[72px] leading-none text-pl-red" aria-hidden="true">
                ♥
              </div>
              <h2 className="mb-0 mt-4 text-[40px] font-extrabold tracking-[-0.04em]">Message sent.</h2>
              <p className="mb-0 mt-3 text-[18px] text-pl-ondark">Thank you. We’ll be in touch soon.</p>
              <button type="button" onClick={() => setSent(false)} className="pl-btn pl-btn-outline-light mt-6">
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-4">
              <div>
                <span id="contact-topic" className="mb-[10px] block text-[14px] font-semibold">
                  I’m writing about
                </span>
                <div className="flex flex-wrap gap-2" role="group" aria-labelledby="contact-topic">
                  {TOPICS.map(t => {
                    const on = topic.label === t.label;
                    return (
                      <button
                        key={t.label}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setTopic(t)}
                        className={`min-h-[44px] rounded-full border-2 px-[18px] text-[15px] font-semibold text-white transition-colors duration-200 ${
                          on ? 'border-pl-red bg-pl-red' : 'border-white/40 bg-transparent'
                        }`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <label htmlFor="contact-name" className="text-[14px] font-semibold">
                Name
              </label>
              <input id="contact-name" name="name" required autoComplete="name" value={form.name} onChange={update} className={`-mt-2 ${field}`} />
              <label htmlFor="contact-email" className="text-[14px] font-semibold">
                Email
              </label>
              <input id="contact-email" name="email" type="email" required autoComplete="email" value={form.email} onChange={update} className={`-mt-2 ${field}`} />
              <label htmlFor="contact-message" className="text-[14px] font-semibold">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                value={form.message}
                onChange={update}
                className="-mt-2 min-h-[130px] resize-y rounded-[16px] border-0 px-[18px] py-[14px] text-[16px] text-pl-ink"
              />
              <button type="submit" disabled={sending} className="min-h-[58px] rounded-full border-0 bg-pl-red text-[18px] font-bold text-white disabled:opacity-70">
                {sending ? 'Sending…' : 'Send message'}
              </button>
              {error && (
                <p role="alert" className="m-0 text-[15px] font-semibold text-pl-coral">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
