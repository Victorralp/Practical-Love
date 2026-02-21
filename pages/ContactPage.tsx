import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { PageHero, PageShell } from '../components/ui';
import Logo from '../components/Logo';

const CONTACT_EMAIL = 'info@example.com'; // Change this to your actual email

export default function ContactPage() {
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Helper function to get subject label
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`[Practical Love] ${getSubjectLabel(formData.subject)}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Subject: ${getSubjectLabel(formData.subject)}\n\n` +
        `Message:\n${formData.message}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  // Main render function
  return (
    <PageShell>
      <PageHero
        badge={
          <>
            <Logo className="w-4 h-4" />
            Get In Touch
          </>
        }
        title="Contact Us"
        subtitle="Have questions about the Love Ministry? Want to partner with us? We’d love to hear from you."
      />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md border border-orange-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-gray-600 text-sm hover:text-red-700 hover:underline underline-offset-4"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-orange-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <a
                    href="tel:+2340000000000"
                    className="text-gray-600 text-sm hover:text-red-700 hover:underline underline-offset-4"
                  >
                    +234 000 000 0000
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-orange-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Location</h3>
                  <p className="text-gray-600 text-sm">Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            {/* Ministry Hours */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 text-white">
              <Logo className="w-8 h-8 mb-3" />
              <h3 className="font-semibold mb-2">Ministry Hours</h3>
              <p className="text-red-100 text-sm">
                Monday - Friday: 9am - 5pm
                <br />
                Saturday: 10am - 2pm
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-orange-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
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
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-700 transition-all"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
    </PageShell>
  );
}

