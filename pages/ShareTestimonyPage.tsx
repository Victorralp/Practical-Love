import { useState } from 'react';
import {
  User,
  Mail,
  Star,
  Check,
  Sparkles,
  Quote,
  Upload as UploadIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CloudinaryImageUpload from '../components/CloudinaryImageUpload';
import { PageShell, PageHero, CTASection } from '../components/ui';
import Logo from '../components/Logo';

export default function ShareTestimonyPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    testimony: '',
    role: '',
    location: '',
    imageUrl: '',
    imagePublicId: '',
  });
  const [rating, setRating] = useState(5);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [charCount, setCharCount] = useState(0);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (field === 'testimony') {
      setCharCount(value.length);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';

    if (!formData.testimony.trim()) newErrors.testimony = 'Please share your testimony';
    else if (formData.testimony.length < 50)
      newErrors.testimony = 'Please write at least 50 characters';

    if (!formData.role.trim()) newErrors.role = 'Please tell us your role';

    if (formData.imageUrl && !formData.imageUrl.startsWith('https://')) {
      newErrors.imageUrl = 'Please upload a valid image';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log({ ...formData, rating, hasImage: !!formData.imageUrl, imagePublicId: formData.imagePublicId });
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <PageShell className="bg-gradient-to-b from-red-50 via-orange-50 to-white">
        <div className="max-w-4xl mx-auto py-10">
          <div className="surface-soft p-10 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-orange-500 shadow-lg">
              <Check className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-serif text-red-800">Thank you for sharing!</h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Your testimony will be reviewed and highlighted to encourage other families. Every
                story plants seeds of hope across Nigeria.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/testimonies" className="btn-brand px-6 py-3">
                View testimonies
              </Link>
              <Link to="/" className="btn-outline-brand px-6 py-3">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell className="bg-gradient-to-b from-red-50 via-orange-50 to-white">
      <div className="section-gap">
        <PageHero
          badge={
            <>
              <Logo className="w-4 h-4" />
              Share & Inspire
            </>
          }
          title="Share Your Love Story"
          subtitle="Your journey of practical love can inspire and transform lives across Nigeria."
          actions={
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/testimonies" className="btn-outline-brand">
                Read inspiring stories
              </Link>
              <Link to="/love-challenge" className="btn-brand">
                Join the 30-day challenge
              </Link>
            </div>
          }
        />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 surface p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-wide text-orange-700 font-semibold">
                  Tell Your Story
                </p>
                <p className="text-gray-600">Help others discover the transforming power of love.</p>
              </div>
              <div className="pill">
                <Sparkles className="w-4 h-4" />
                Encouragement
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-red-500 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => handleInputChange('name', e.target.value)}
                      className={`w-full pl-9 pr-3 py-3 rounded-xl border-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition ${
                        errors.name ? 'border-red-300 bg-red-50' : 'border-orange-100 bg-white'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-red-500 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => handleInputChange('email', e.target.value)}
                      className={`w-full pl-9 pr-3 py-3 rounded-xl border-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition ${
                        errors.email ? 'border-red-300 bg-red-50' : 'border-orange-100 bg-white'
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Role/Position *</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={e => handleInputChange('role', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition ${
                      errors.role ? 'border-red-300 bg-red-50' : 'border-orange-100 bg-white'
                    }`}
                    placeholder="e.g., Mother, Pastor, Teacher, Business Owner"
                  />
                  {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Location (Optional)</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-orange-100 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                    placeholder="e.g., Lagos, Nigeria"
                  />
                </div>
              </div>

              <div className="surface-soft border-2 border-dashed border-orange-200 p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-red-600 border border-orange-100">
                    <UploadIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-gray-800">Profile Image (Optional)</h3>
                    <p className="text-sm text-gray-600">
                      Drag & drop or click to upload. JPEG, PNG, WEBP, GIF. Max 3MB.
                    </p>
                    <CloudinaryImageUpload
                      onImageUpload={(url, publicId) => {
                        handleInputChange('imageUrl', url);
                        handleInputChange('imagePublicId', publicId);
                      }}
                      onImageRemove={() => handleInputChange('imageUrl', '')}
                      folder="testimonies/uploads"
                      tags={['testimony', 'profile']}
                      maxSizeMB={3}
                      label="Choose Image"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-600">
                  Tip: A clear photo helps others connect with your story. Images are securely stored on Cloudinary.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  How has practical love impacted you? *
                </label>
                <div className="surface-soft p-4 flex items-center gap-3">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                      {star <= rating ? (
                        <Star className="w-8 h-8 text-yellow-400 fill-current drop-shadow-sm" />
                      ) : (
                        <Star className="w-8 h-8 text-gray-300 hover:text-yellow-300" />
                      )}
                    </button>
                  ))}
                  <span className="text-sm font-medium text-gray-700">
                    {rating === 1 && '⭐ Beginning the journey'}
                    {rating === 2 && '⭐⭐ Growing in love'}
                    {rating === 3 && '⭐⭐⭐ Love is making a difference'}
                    {rating === 4 && '⭐⭐⭐⭐ Deeply transformed'}
                    {rating === 5 && '⭐⭐⭐⭐⭐ Completely life-changing'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Your Love Story *</label>
                <textarea
                  value={formData.testimony}
                  onChange={e => handleInputChange('testimony', e.target.value)}
                  className={`w-full px-4 py-4 rounded-xl border-2 transition focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none ${
                    errors.testimony ? 'border-red-300 bg-red-50' : 'border-orange-100 bg-white hover:border-orange-200'
                  }`}
                  rows={6}
                  placeholder="Share your journey... How did you discover practical love? What changed in your family, community, or work?"
                />
                {errors.testimony && <p className="text-red-600 text-sm mt-1">{errors.testimony}</p>}
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Share specific examples of how love changed your situation.</span>
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-lg ${
                      charCount < 50
                        ? 'text-red-700 bg-red-50'
                        : charCount < 120
                          ? 'text-orange-700 bg-orange-50'
                          : 'text-green-700 bg-green-50'
                    }`}
                  >
                    {charCount}/500
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" disabled={isSubmitting} className="btn-brand w-full py-4 text-base">
                  {isSubmitting ? 'Submitting...' : 'Share Your Testimony'}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-4">
            <div className="surface-soft p-6 space-y-3">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-semibold text-red-800">Writing Tips</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-red-500">•</span> Share specific examples from your life.
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">•</span> Mention which love traits helped most.
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">•</span> Describe the transformation you saw.
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">•</span> Keep it authentic and encouraging.
                </li>
              </ul>
            </div>

            <div className="surface p-6 text-white bg-gradient-to-br from-red-600 to-orange-600">
              <h3 className="text-lg font-semibold mb-2">Your Impact</h3>
              <p className="text-sm text-orange-50 mb-3">
                Your story could be the encouragement someone needs to start their own journey.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Logo className="w-5 h-5" />
                Inspiring others
              </div>
            </div>
          </div>
        </div>

        <div className="surface p-8 section-gap">
          <div>
            <h2 className="text-2xl font-serif text-red-800 mb-3">Stories That Inspire</h2>
            <p className="text-gray-600">
              Real people, real transformations, real hope for Nigerian families.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="surface-soft p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-orange-300" />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                "After 15 years of marriage, I discovered practical love through this ministry. The patience and
                kindness I learned transformed not just my relationship with my husband, but how I parent our children."
              </p>
              <div className="text-sm font-semibold text-gray-900">Adunni Okonkwo</div>
              <div className="text-xs text-gray-500">Marriage Counselor • Lagos</div>
            </div>

            <div className="surface-soft p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-orange-300" />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                "As a pastor, I thought I knew about love. Practical love taught me how to genuinely care for my
                congregation beyond sermons. People now see authentic love in action."
              </p>
              <div className="text-sm font-semibold text-gray-900">James Adeleke</div>
              <div className="text-xs text-gray-500">Pastor & Community Leader • Abuja</div>
            </div>

            <div className="surface-soft p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-orange-300" />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                "At work, conflicts dropped and collaboration improved once I applied these principles. Biblical love works
                in the workplace too."
              </p>
              <div className="text-sm font-semibold text-gray-900">Ngozi E.</div>
              <div className="text-xs text-gray-500">Product Manager • Lagos</div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="surface-soft p-4">
              <div className="text-3xl font-bold text-red-700">500+</div>
              <p className="text-gray-600">Testimonies Shared</p>
            </div>
            <div className="surface-soft p-4">
              <div className="text-3xl font-bold text-red-700">50+</div>
              <p className="text-gray-600">Nigerian Communities</p>
            </div>
            <div className="surface-soft p-4">
              <div className="text-3xl font-bold text-red-700">∞</div>
              <p className="text-gray-600">Lives Transformed</p>
            </div>
          </div>
        </div>

        <CTASection
          className="shadow-2xl"
          title="Your story can change lives"
          description="Every testimony of practical love plants seeds of hope in families. Share yours or invite someone to begin."
          primaryAction={{ label: 'Share your testimony', href: '/share-testimony' }}
          secondaryAction={{ label: 'Read inspiring stories', href: '/testimonies' }}
        />
      </div>
    </PageShell>
  );
}
