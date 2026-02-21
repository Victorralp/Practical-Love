import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-700 to-orange-700 text-white">
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-orange-300/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-24 w-80 h-80 rounded-full bg-red-900/25 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center mb-4">
              <Logo className="w-8 h-8 mr-3" />
              <h3 className="text-2xl font-serif">Practical Love</h3>
            </div>
            <p className="text-orange-100 leading-relaxed max-w-md mb-6">
              Discover the winning power behind all human endeavours through practical, biblical
              principles of love that transform lives, relationships, and communities.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-2 gap-x-4">
              <li>
                <Link to="/" className="text-orange-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/testimonies" className="text-orange-100 hover:text-white transition-colors">
                  Testimonies
                </Link>
              </li>
              <li>
                <Link to="/share-testimony" className="text-orange-100 hover:text-white transition-colors">
                  Share Testimony
                </Link>
              </li>
              <li>
                <Link to="/characteristics" className="text-orange-100 hover:text-white transition-colors">
                  Characteristics of Love
                </Link>
              </li>
              <li>
                <Link to="/bible-passages" className="text-orange-100 hover:text-white transition-colors">
                  Bible Passages
                </Link>
              </li>
              <li>
                <Link to="/love-in-nigeria" className="text-orange-100 hover:text-white transition-colors">
                  Love in Nigeria
                </Link>
              </li>
              <li>
                <Link to="/publications" className="text-orange-100 hover:text-white transition-colors">
                  Publications
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-orange-100 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-orange-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-orange-200" />
                </div>
                <span>practicallove.logosrhema.org.ng</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-orange-200" />
                </div>
                <span>+234 123 456 7890</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-orange-200" />
                </div>
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur p-6 md:p-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="max-w-xl">
              <h4 className="text-xl font-semibold mb-1">Stay Connected</h4>
              <p className="text-orange-100">
                Get weekly insights on practical love delivered to your inbox.
              </p>
            </div>
            <div className="w-full md:w-auto md:min-w-[420px]">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-11 px-4 rounded-lg border border-white/30 bg-white/95 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
                <button
                  type="button"
                  className="h-11 px-6 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold hover:from-red-700 hover:to-orange-600 transition-all"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-orange-100 text-sm">© 2024 Practical Love. All rights reserved.</p>
          <div className="flex items-center gap-5 text-sm">
            <a href="#" className="text-orange-100 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-orange-100 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-orange-100 hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

