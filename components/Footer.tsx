import { Link } from 'react-router-dom';

const LINKS = [
  { label: 'Prayer wall', href: '/prayer' },
  { label: 'Contact', href: '/contact' },
  { label: 'Testimonies', href: '/testimonies' },
  { label: 'Privacy & terms', href: '/privacy-policy' },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-pl-hair">
      <div className="pl-wrap flex flex-wrap justify-between gap-x-8 gap-y-3 py-8 text-[14px] text-pl-muted2">
        <span>Practical Love Ministry · Logosrhema</span>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map(link => (
            <Link key={link.href} to={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
