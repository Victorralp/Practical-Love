import { ArrowRight, HandHeart, Mail, MapPin, Phone, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const QUICK_LINKS = [
  { label: 'Messages', href: '/messages' },
  { label: 'Characteristics', href: '/characteristics' },
  { label: 'Bible Passages', href: '/bible-passages' },
  { label: 'Yellow Card Series', href: '/yellow-card-series' },
  { label: 'Growth Hub', href: '/growth' },
  { label: 'Testimonies', href: '/testimonies' },
  { label: 'Donate', href: '/donate' },
] as const;

const ACTION_LINKS = [
  { label: "Today's devotion", href: '/messages#daily-devotion' },
  { label: 'Prayer wall', href: '/messages#prayer-wall' },
  { label: 'Share a testimony', href: '/share-testimony' },
  { label: 'Read the mission', href: '/mission-vision' },
  { label: 'Browse publications', href: '/publications' },
  { label: 'Enter the challenge', href: '/love-challenge' },
] as const;

const CONTACT_ITEMS = [
  {
    label: 'Email',
    value: 'logosrhema842@gmail.com',
    href: 'mailto:logosrhema842@gmail.com',
    icon: Mail,
  },
  {
    label: 'Phone',
    value: '+234 123 456 7890',
    href: 'tel:+2341234567890',
    icon: Phone,
  },
  {
    label: 'Location',
    value: 'Lagos, Nigeria',
    href: '/contact',
    icon: MapPin,
  },
  {
    label: 'Facebook',
    value: 'Practical Love Ministry',
    href: 'https://web.facebook.com/profile.php?id=61590900447700',
    icon: Share2,
  },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(165deg,_#1d0f0c_0%,_#3f1911_42%,_#6b2617_72%,_#a34a24_100%)] px-4 pb-10 pt-6 text-[#fff4e7] sm:px-6 lg:px-8">
      <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-[#f7bc84]/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-white/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl space-y-8">
        <div className="rounded-[2rem] border border-white/12 bg-white/8 p-8 shadow-[0_24px_54px_rgba(13,5,4,0.22)] backdrop-blur-xl md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-white/10">
                  <Logo className="h-9 w-9" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ffcea7]">
                    Practical Love Ministry
                  </p>
                  <h2 className="font-serif text-3xl text-white md:text-4xl">
                    A ministry for households that want reform, not performance.
                  </h2>
                </div>
              </div>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#ffeede] opacity-80 md:text-lg">
                The message is simple and demanding: love God, reject the rule of money, practice
                biblical love at home, and let the consequences reach the wider world.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Link
                to="/messages#prayer-wall"
                className="btn-brand group px-6 py-4 text-base"
              >
                <HandHeart className="mr-2 h-5 w-5" />
                Ask for prayer
              </Link>
              <Link to="/contact" className="btn-outline-light px-6 py-4 text-base">
                Contact the ministry
              </Link>
              <Link to="/share-testimony" className="btn-outline-light px-6 py-4 text-base">
                Share your testimony
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.78fr_0.72fr_1fr]">
          <div className="rounded-[1.8rem] border border-white/12 bg-black/10 p-6 backdrop-blur-xl">
            <h3 className="font-serif text-2xl text-white">Quick routes</h3>
            <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {QUICK_LINKS.map(link => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="rounded-[1rem] px-3 py-2 text-sm text-[#ffe7d1] transition-colors hover:bg-white/8 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/12 bg-black/10 p-6 backdrop-blur-xl">
            <h3 className="font-serif text-2xl text-white">Next actions</h3>
            <div className="mt-5 space-y-2">
              {ACTION_LINKS.map(link => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="flex items-center justify-between rounded-[1rem] px-3 py-3 text-sm text-[#ffe7d1] transition-colors hover:bg-white/8 hover:text-white"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/12 bg-black/10 p-6 backdrop-blur-xl">
            <h3 className="font-serif text-2xl text-white">Stay reachable</h3>
            <div className="mt-5 space-y-4">
              {CONTACT_ITEMS.map(item => {
                const Icon = item.icon;

                return item.href.startsWith('/') ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="flex items-start gap-4 rounded-[1rem] px-3 py-3 text-[#ffe7d1] transition-colors hover:bg-white/8 hover:text-white"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-white/8 text-[#ffca9d]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffca9d]">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm leading-6">{item.value}</p>
                    </div>
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="flex items-start gap-4 rounded-[1rem] px-3 py-3 text-[#ffe7d1] transition-colors hover:bg-white/8 hover:text-white"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-white/8 text-[#ffca9d]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffca9d]">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm leading-6">{item.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/12 pt-6 text-sm text-[#ffe7d1] opacity-80 md:flex-row md:items-center md:justify-between">
          <p>{currentYear} Practical Love Ministry (Logosrhema). All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="transition-colors hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
