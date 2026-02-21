import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Star, Quote, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAvatarUrl } from '../services/cloudinaryService';
import { PageHero, PageShell } from '../components/ui';
import Logo from '../components/Logo';

interface TestimonyProps {
  name: string;
  role: string;
  image: string;
  testimony: string;
  rating: number;
}

function TestimonyCard({ name, role, image, testimony, rating }: TestimonyProps) {
  // Handle image optimization for Cloudinary
  // Use Cloudinary optimized image if it's a Cloudinary URL
  const isCloudinaryImage = image.includes('cloudinary.com');
  let optimizedImage = image;

  if (isCloudinaryImage) {
    // Extract public ID from Cloudinary URL
    const urlParts = image.split('/');
    const uploadIndex = urlParts.indexOf('upload');
    if (uploadIndex !== -1 && uploadIndex + 1 < urlParts.length) {
      const publicId = urlParts
        .slice(uploadIndex + 1)
        .join('/')
        .split('.')[0];
      optimizedImage = getAvatarUrl(publicId, 200);
    }
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
          {image ? (
            <ImageWithFallback
              src={optimizedImage}
              alt={`${name} profile`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-600 to-orange-600">
              <User className="w-8 h-8 text-white" />
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-gray-500">{role}</p>
          <div className="flex items-center mt-1">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      </div>

      <Quote className="w-8 h-8 text-orange-300 mb-4" />
      <blockquote className="text-gray-600 leading-relaxed italic">"{testimony}"</blockquote>
    </div>
  );
}

export default function TestimoniesPage() {
  // Testimony data - currently empty but ready for submissions
  const testimonies: TestimonyProps[] = [];

  // Main render function
  return (
    <PageShell className="bg-gradient-to-b from-orange-50 via-white to-red-50">
      <PageHero
        badge={
          <>
            <Logo className="w-4 h-4" />
            Community Stories
          </>
        }
        title="Stories of Transformation"
        subtitle="Discover how real people have experienced life-changing growth through genuine, practical love."
        actions={
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/share-testimony"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-sm"
            >
              Share Your Testimony
            </Link>
            <Link
              to="/love-challenge"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/80 border border-orange-200 text-red-700 font-semibold hover:bg-white transition-colors"
            >
              Take the 30-Day Challenge
            </Link>
          </div>
        }
      />

        {testimonies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
            {testimonies.map((testimony, index) => (
              <TestimonyCard
                key={index}
                name={testimony.name}
                role={testimony.role}
                image={testimony.image}
                testimony={testimony.testimony}
                rating={testimony.rating}
              />
            ))}
          </div>
        ) : (
          <div className="mb-14 bg-white rounded-2xl shadow-md border border-orange-100 overflow-hidden">
            <div className="p-8 md:p-10 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                <Logo className="w-8 h-8" />
              </div>
              <p className="text-2xl font-serif text-gray-900 mb-2">Your Story Matters</p>
              <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
                We’re building a library of real-life experiences. If Practical Love has impacted
                your marriage, family, friendships, or faith, your testimony can encourage someone
                today.
              </p>
            </div>
            <div className="border-t border-orange-100 bg-gradient-to-r from-orange-50 to-red-50 p-6">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/share-testimony"
                  className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-sm"
                >
                  Be the First to Share
                </Link>
                <Link
                  to="/characteristics"
                  className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-white border border-orange-200 text-red-700 font-semibold hover:bg-orange-50 transition-colors"
                >
                  Review the 17 Characteristics
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-red-700 to-orange-700 rounded-2xl p-12 md:p-16 text-white text-center shadow-xl">
          <Logo className="w-20 h-20 mx-auto mb-8 animate-pulse" />
          <h3 className="text-3xl md:text-4xl font-serif mb-6">Share Your Transformation Story</h3>
          <p className="text-lg text-orange-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Has practical love changed your relationships, your family, or your life? Your story
            could be the encouragement someone else needs to begin their own journey of
            transformation.
          </p>
          <Link
            to="/share-testimony"
            className="bg-white text-red-600 px-10 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-all hover:shadow-lg inline-block text-lg"
          >
            Share Your Story Now
          </Link>
        </div>
    </PageShell>
  );
}



