import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CloudinaryImageUpload from '../components/CloudinaryImageUpload';
import { Em } from '../components/pl/primitives';
import { EASE_POP, animate, useEntrance } from '../components/pl/motion';
import { submitTestimony } from '../services/testimoniesService';
import { sendWeb3Form } from '../services/web3formsService';
import { initials } from '../components/pl/text';

const TAGS = ['Family', 'Marriage', 'Church', 'Work', 'Personal'] as const;
const MIN_CHARS = 50;
const MAX_CHARS = 1000;
const STEPS = 3;

type Form = {
  tag: (typeof TAGS)[number];
  story: string;
  name: string;
  email: string;
  role: string;
  location: string;
  rating: number;
  imageUrl: string;
  imagePublicId: string;
  consent: boolean;
};

const EMPTY: Form = {
  tag: 'Family',
  story: '',
  name: '',
  email: '',
  role: '',
  location: '',
  rating: 5,
  imageUrl: '',
  imagePublicId: '',
  consent: true,
};

const field = 'min-h-[54px] rounded-[16px] border-2 border-pl-ink px-[18px] text-[16px]';

export default function ShareTestimonyPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(EMPTY);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stepRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLElement | null>(null);
  const lastKey = useRef(0);

  useEntrance(rootRef);

  const stepKey = step + (sent ? 10 : 0);
  useEffect(() => {
    const previous = lastKey.current;
    lastKey.current = stepKey;
    if (previous === stepKey) return;
    animate(stepRef.current, [{ transform: `translateX(${stepKey > previous ? 40 : -40}px)`, opacity: 0 }, { transform: 'none', opacity: 1 }], {
      duration: 500,
      easing: 'cubic-bezier(.3,1.3,.5,1)',
    });
    if (sent) {
      animate(cardRef.current, [{ transform: 'rotate(-1.5deg)' }, { transform: 'rotate(2deg) scale(1.04)' }, { transform: 'rotate(-1.5deg)' }], { duration: 700, easing: EASE_POP });
    }
  }, [stepKey, sent]);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (error) setError('');
  };

  const story = form.story.trim();
  const emailOk = /\S+@\S+\.\S+/.test(form.email);
  const canContinue =
    step === 0 || (step === 1 && story.length >= MIN_CHARS) || (step === 2 && form.name.trim() !== '' && emailOk && form.role.trim() !== '' && form.consent);

  const submit = async () => {
    setSending(true);
    setError('');
    const record = {
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role.trim(),
      location: form.location.trim(),
      testimony: story,
      rating: form.rating,
      imageUrl: form.imageUrl,
      imagePublicId: form.imagePublicId,
    };
    // The database entry feeds the admin review queue; the email lets the team know it arrived.
    // Either one getting through means the story is not lost.
    const [saved, emailed] = await Promise.allSettled([
      submitTestimony(record),
      sendWeb3Form({
        subject: 'New Testimony Submission',
        name: record.name,
        email: record.email,
        topic: form.tag,
        role: record.role,
        location: record.location || 'Not provided',
        rating: record.rating,
        testimony: record.testimony,
        image_url: record.imageUrl || 'No image provided',
        publish_consent: 'Yes',
      }),
    ]);
    setSending(false);
    if (saved.status === 'fulfilled' || emailed.status === 'fulfilled') {
      setSent(true);
      return;
    }
    setError(saved.reason instanceof Error ? saved.reason.message : 'Submission failed. Please try again in a moment.');
  };

  const next = () => {
    if (!canContinue || sending) return;
    if (step < STEPS - 1) setStep(step + 1);
    else void submit();
  };

  const progress = sent ? 1 : (step + 1) / (STEPS + 0.2);
  const roleLine = [form.role.trim(), form.location.trim()].filter(Boolean).join(', ');

  return (
    <div ref={rootRef}>
      <header className="sticky top-0 z-30 border-b border-pl-hair bg-white/90 backdrop-blur-[8px]">
        <div className="pl-wrap flex items-center gap-4 py-[14px]">
          <Link to="/testimonies" className="mr-auto flex min-h-[44px] items-center text-[15px] font-semibold text-pl-ink no-underline hover:text-pl-red">
            ← Testimonies
          </Link>
          <span className="text-[14px] font-semibold" aria-live="polite">
            {sent ? 'Sent' : `Step ${step + 1} of ${STEPS}`}
          </span>
        </div>
        <div className="h-[3px] bg-[#f6eeed]">
          <div
            className="h-full w-full origin-left bg-pl-red transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(.3,1.3,.5,1)]"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </header>

      <section className="pl-wrap grid items-start gap-[clamp(40px,6vw,88px)] pb-[clamp(64px,9vw,120px)] pt-[clamp(40px,7vw,88px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
        <div>
          <h1 data-in className="m-0 text-[clamp(48px,8vw,108px)] font-extrabold leading-[.88] tracking-[-0.055em]">
            Share your <Em>love story.</Em>
          </h1>

          <div ref={stepRef} className="mt-[clamp(28px,4vw,44px)] grid gap-[14px]">
            {sent ? (
              <>
                <p className="m-0 text-[clamp(26px,3vw,36px)] font-extrabold tracking-[-0.03em]" role="status">
                  Thank you ♥ We’ll review your story before it goes on the site.
                </p>
                <Link to="/testimonies" className="pl-btn pl-btn-ink justify-self-start">
                  Read other stories
                </Link>
              </>
            ) : step === 0 ? (
              <>
                <p id="st-tag" className="m-0 text-[18px] font-bold">
                  What is your story about?
                </p>
                <div className="flex flex-wrap gap-2" role="group" aria-labelledby="st-tag">
                  {TAGS.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      aria-pressed={form.tag === tag}
                      onClick={() => set('tag', tag)}
                      className={`min-h-[48px] rounded-full border-2 border-pl-ink px-5 text-[16px] font-semibold ${
                        form.tag === tag ? 'bg-pl-red text-white' : 'bg-white text-pl-ink'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </>
            ) : step === 1 ? (
              <>
                <label htmlFor="st-story" className="text-[18px] font-bold">
                  Tell us what changed
                </label>
                <textarea
                  id="st-story"
                  value={form.story}
                  maxLength={MAX_CHARS}
                  onChange={e => set('story', e.target.value)}
                  placeholder="How did you discover practical love? What changed in your family, community, or work?"
                  className="min-h-[180px] resize-y rounded-[20px] border-2 border-pl-ink px-[18px] py-4 text-[17px] leading-[1.5]"
                />
                <span className="text-[14px] text-pl-muted2">
                  {form.story.length} / {MAX_CHARS}
                  {story.length < MIN_CHARS && ` · at least ${MIN_CHARS} characters`}
                </span>
              </>
            ) : (
              <>
                <label htmlFor="st-name" className="text-[16px] font-bold">
                  Your name
                </label>
                <input id="st-name" value={form.name} maxLength={80} autoComplete="name" onChange={e => set('name', e.target.value)} placeholder="Enter your full name" className={`-mt-[6px] ${field}`} />
                <label htmlFor="st-email" className="text-[16px] font-bold">
                  Email <span className="font-normal text-pl-muted2">(never published)</span>
                </label>
                <input id="st-email" type="email" value={form.email} autoComplete="email" onChange={e => set('email', e.target.value)} placeholder="you@example.com" className={`-mt-[6px] ${field}`} />
                <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))]">
                  <div className="grid gap-[8px]">
                    <label htmlFor="st-role" className="text-[16px] font-bold">
                      Role
                    </label>
                    <input id="st-role" value={form.role} onChange={e => set('role', e.target.value)} placeholder="e.g. Mother" className={field} />
                  </div>
                  <div className="grid gap-[8px]">
                    <label htmlFor="st-city" className="text-[16px] font-bold">
                      City <span className="font-normal text-pl-muted2">(optional)</span>
                    </label>
                    <input id="st-city" value={form.location} onChange={e => set('location', e.target.value)} placeholder="e.g. Lagos" className={field} />
                  </div>
                </div>
                <div>
                  <span id="st-rating" className="text-[16px] font-bold">
                    How much has practical love helped?
                  </span>
                  <div className="mt-2 flex gap-1" role="radiogroup" aria-labelledby="st-rating">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n}
                        type="button"
                        role="radio"
                        aria-checked={form.rating === n}
                        aria-label={`${n} of 5`}
                        onClick={() => set('rating', n)}
                        className={`h-11 w-11 rounded-full border-0 bg-transparent text-[26px] ${n <= form.rating ? 'text-pl-red' : 'text-pl-hair2'}`}
                      >
                        ♥
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[16px] font-bold">
                    A photo <span className="font-normal text-pl-muted2">(optional)</span>
                  </span>
                  <div className="mt-2">
                    <CloudinaryImageUpload
                      onImageUpload={(url, publicId) => {
                        set('imageUrl', url);
                        set('imagePublicId', publicId);
                      }}
                      onImageRemove={() => {
                        set('imageUrl', '');
                        set('imagePublicId', '');
                      }}
                      folder="testimonies/uploads"
                      tags={['testimony', 'profile']}
                      maxSizeMB={3}
                      label="Choose image"
                    />
                  </div>
                </div>
                <label className="flex min-h-[44px] cursor-pointer items-center gap-3 text-[16px]">
                  <input type="checkbox" checked={form.consent} onChange={e => set('consent', e.target.checked)} className="h-[22px] w-[22px] accent-pl-red" />
                  You may publish this on the website
                </label>
              </>
            )}
          </div>

          {!sent && (
            <>
              <div className="mt-7 flex gap-[10px]">
                <button
                  type="button"
                  onClick={() => setStep(s => Math.max(0, s - 1))}
                  disabled={step === 0 || sending}
                  className="min-h-[56px] rounded-full border-2 border-pl-ink bg-white px-6 text-[17px] font-bold text-pl-ink disabled:opacity-35"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-disabled={!canContinue || sending}
                  className={`min-h-[56px] rounded-full border-0 px-[30px] text-[17px] font-bold text-white transition-colors duration-200 ${
                    canContinue && !sending ? 'bg-pl-red' : 'cursor-not-allowed bg-[#d9c9c7]'
                  }`}
                >
                  {sending ? 'Sending…' : step < STEPS - 1 ? 'Continue →' : 'Submit story'}
                </button>
              </div>
              {error && (
                <p role="alert" className="mb-0 mt-4 text-[15px] font-semibold text-pl-red">
                  {error}
                </p>
              )}
            </>
          )}
        </div>

        <div className="md:sticky md:top-24">
          <p className="mb-[14px] mt-0 text-[14px] font-bold uppercase tracking-[0.08em] text-pl-muted2">Live preview</p>
          <figure
            ref={cardRef}
            className="m-0 rounded-[28px] border-2 border-pl-ink bg-pl-blush p-[clamp(24px,3vw,36px)] shadow-[12px_12px_0_#e1251b]"
            style={{ transform: 'rotate(-1.5deg)' }}
          >
            <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-pl-press">{form.tag}</span>
            <blockquote className={`pl-serif mx-0 mb-0 mt-[14px] whitespace-pre-line text-[clamp(24px,2.6vw,32px)] leading-[1.22] ${story ? 'text-pl-ink' : 'text-[#9a8a88]'}`}>
              “{story || 'Your words will appear here as you type…'}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              {form.imageUrl ? (
                <img src={form.imageUrl} alt="" className="h-11 w-11 rounded-full object-cover" />
              ) : (
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pl-ink font-extrabold text-white">{initials(form.name)}</span>
              )}
              <span>
                <b className="block text-[17px]">{form.name.trim() || 'Your name'}</b>
                <span className="text-[14px] text-pl-muted">{roleLine || 'Role, city'}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}
