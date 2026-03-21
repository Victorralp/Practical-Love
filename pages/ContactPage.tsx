import { useState } from 'react';
import {
  Clock3,
  Handshake,
  Mail,
  MapPin,
  MessageSquareHeart,
  Phone,
  Send,
  Sparkles,
} from 'lucide-react';
import { CTASection, PageHero, PageShell, SectionCard } from '../components/ui';
import Logo from '../components/Logo';

const CONTACT_EMAIL = 'logosrhema842@gmail.com';
const CONTACT_PHONE = '+234 123 456 7890';
const CONTACT_LOCATION = 'Lagos, Nigeria';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

const CONTACT_LANES = [
  {
    title: 'General questions',
    description: 'Ask about the ministry, the site, publications, or where to start.',
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: 'Partnership and outreach',
    description: 'Reach out if you want to collaborate, host a session, or support distribution.',
    icon: <Handshake className="h-5 w-5" />,
  },
  {
    title: 'Prayer and testimony',
    description: 'Send a prayer request or share what practical love has changed in your life.',
    icon: <MessageSquareHeart className="h-5 w-5" />,
  },
] as const;

const CONTACT_CHANNELS = [
  {
    title: 'Email us',
    detail: CONTACT_EMAIL,
    helper: 'Best for testimonies, partnership requests, and detailed messages.',
    href: `mailto:${CONTACT_EMAIL}`,
    icon: <Mail className="h-5 w-5" />,
  },
  {
    title: 'Call the team',
    detail: CONTACT_PHONE,
    helper: 'Best for direct conversations and urgent follow-up.',
    href: `tel:${CONTACT_PHONE.replace(/\s+/g, '')}`,
    icon: <Phone className="h-5 w-5" />,
  },
  {
    title: 'Visit our base',
    detail: CONTACT_LOCATION,
    helper: 'Use the contact form first if you need to plan a visit or meeting.',
    href: '#contact-form',
    icon: <MapPin className="h-5 w-5" />,
  },
] as const;

const RESPONSE_NOTES = [
  'General messages usually receive a response within 1 to 3 working days.',
  'Prayer requests and testimonies can also be sent through the form below.',
  'For partnership requests, include your location, audience, and what kind of collaboration you have in mind.',
] as const;

const WHAT_TO_INCLUDE = [
  'Your name and the best way to reach you back',
  'A clear subject so the team can route your message quickly',
  'Enough context for your prayer request, testimony, or partnership idea',
] as const;

type SubmitState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle', message: '' });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }));
    if (submitState.status !== 'idle') {
      setSubmitState({ status: 'idle', message: '' });
    }
  };

  const getSubjectLabel = (value: string) => {
    const subjects: Record<string, string> = {
      general: 'General Inquiry',
      partnership: 'Partnership Opportunity',
      'yellow-card': 'Yellow Card Request',
      testimony: 'Share a Testimony',
      prayer: 'Prayer Request',
      other: 'Other',
    };
    return subjects[value] || value;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setSubmitState({
        status: 'error',
        message: 'Contact form is not configured yet. Please add VITE_WEB3FORMS_ACCESS_KEY.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitState({ status: 'idle', message: '' });

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: `[Practical Love] ${getSubjectLabel(formData.subject)}`,
          message: formData.message,
          from_name: 'Practical Love Website',
          replyto: formData.email,
          botcheck: '',
        }),
      });

      const result = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to send message right now.');
      }

      setSubmitState({
        status: 'success',
        message: 'Your message has been sent successfully. We will get back to you soon.',
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell className="bg-[radial-gradient(circle_at_top_left,_rgba(254,215,170,0.25),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(248,113,113,0.18),_transparent_34%),linear-gradient(180deg,_#fffaf5_0%,_#ffffff_52%,_#fff7ed_100%)]">
      <div className="space-y-8">
        <PageHero
          badge={
            <>
              <Logo className="w-4 h-4" />
              Get In Touch
            </>
          }
          icon={
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 text-white shadow-lg">
              <Mail className="h-7 w-7" />
            </div>
          }
          title="Contact the Practical Love team"
          subtitle="Reach out with your questions, partnership ideas, prayer requests, testimonies, and outreach conversations. We want the page to feel open, clear, and easy to use."
          actions={
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#contact-form" className="btn-brand px-7 py-3">
                Send a Message
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="btn-outline-brand px-7 py-3">
                Email Directly
              </a>
            </div>
          }
        >
          <div className="grid gap-4 md:grid-cols-3">
            {CONTACT_LANES.map(lane => (
              <div
                key={lane.title}
                className="rounded-2xl border border-white/70 bg-white/80 p-4 backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                  {lane.icon}
                </div>
                <h2 className="mt-4 text-lg font-semibold text-gray-900">{lane.title}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-700">{lane.description}</p>
              </div>
            ))}
          </div>
        </PageHero>

        <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <SectionCard className="border-red-100 bg-white/95 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Contact Routes
            </p>
            <h2 className="mt-2 text-3xl font-serif text-red-800">Choose the best way to reach us</h2>
            <div className="mt-6 space-y-4">
              {CONTACT_CHANNELS.map(channel => (
                <a
                  key={channel.title}
                  href={channel.href}
                  className="block rounded-2xl border border-orange-100 bg-gradient-to-r from-white to-orange-50 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                      {channel.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-700">
                        {channel.title}
                      </p>
                      <h3 className="mt-2 text-xl font-serif text-gray-900">{channel.detail}</h3>
                      <p className="mt-2 leading-7 text-gray-700">{channel.helper}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            variant="dark"
            className="border-red-900 bg-[linear-gradient(160deg,_rgba(127,29,29,1)_0%,_rgba(136,19,55,1)_45%,_rgba(154,52,18,1)_100%)] shadow-xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
              Before You Send
            </p>
            <h2 className="mt-2 text-3xl font-serif text-white">Help the team respond well</h2>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-orange-200" />
                  <h3 className="text-lg font-semibold text-white">Response notes</h3>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-orange-100">
                  {RESPONSE_NOTES.map(note => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                <div className="flex items-center gap-3">
                  <Send className="h-5 w-5 text-orange-200" />
                  <h3 className="text-lg font-semibold text-white">What to include</h3>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-orange-100">
                  {WHAT_TO_INCLUDE.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-200">
                  Ministry Hours
                </p>
                <p className="mt-3 leading-7 text-white">
                  Monday - Friday: 9am - 5pm
                  <br />
                  Saturday: 10am - 2pm
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </SectionCard>
        </section>

        <section id="contact-form" className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <SectionCard className="border-orange-200 bg-white/95 shadow-lg">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                  Message Form
                </p>
                <h2 className="mt-2 text-3xl font-serif text-red-800">Send your message here</h2>
              </div>
              <p className="text-sm text-gray-500">
                Web3Forms powered submission
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {submitState.status !== 'idle' ? (
                <div
                  className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                    submitState.status === 'success'
                      ? 'border border-green-200 bg-green-50 text-green-800'
                      : 'border border-red-200 bg-red-50 text-red-800'
                  }`}
                >
                  {submitState.message}
                </div>
              ) : null}

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-gray-700">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="yellow-card">Yellow Card Request</option>
                  <option value="testimony">Share a Testimony</option>
                  <option value="prayer">Prayer Request</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-700">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={7}
                  className="w-full resize-none rounded-2xl border border-orange-100 bg-white px-4 py-3 transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500"
                  placeholder="Tell us how we can help, pray, collaborate, or respond."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-700 px-8 py-4 font-semibold text-white transition-all hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
              >
                <Send className="h-5 w-5" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </SectionCard>

          <div className="space-y-6">
            <SectionCard className="border-red-100 bg-gradient-to-br from-red-50 via-white to-orange-50 shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Best Uses
              </p>
              <h2 className="mt-2 text-3xl font-serif text-red-800">What people usually contact us about</h2>
              <div className="mt-6 space-y-4">
                {CONTACT_LANES.map(lane => (
                  <div key={lane.title} className="rounded-2xl border border-white/70 bg-white/90 p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{lane.title}</h3>
                    <p className="mt-2 leading-7 text-gray-700">{lane.description}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard className="border-orange-200 bg-white/95 shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Direct Summary
              </p>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                  <p className="text-sm font-semibold text-orange-700">Email</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-1 block text-lg font-semibold text-gray-900 hover:text-red-700"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
                <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                  <p className="text-sm font-semibold text-orange-700">Phone</p>
                  <a
                    href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`}
                    className="mt-1 block text-lg font-semibold text-gray-900 hover:text-red-700"
                  >
                    {CONTACT_PHONE}
                  </a>
                </div>
                <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                  <p className="text-sm font-semibold text-orange-700">Location</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{CONTACT_LOCATION}</p>
                </div>
              </div>
            </SectionCard>
          </div>
        </section>

        <CTASection
          title="Want to partner, testify, or ask for prayer?"
          description="Use the contact form for detailed messages, or go straight to testimony sharing if you want to tell the story of what practical love has done."
          primaryAction={{ label: 'Share Your Testimony', href: '/share-testimony' }}
          secondaryAction={{ label: 'Read The Mission', href: '/mission-vision' }}
        />
      </div>
    </PageShell>
  );
}
