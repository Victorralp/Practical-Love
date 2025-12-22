import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { Star, Quote, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

interface TestimonyProps {
  name: string
  role: string
  image: string
  testimony: string
  rating: number
}

function TestimonyCard({ name, role, image, testimony, rating }: TestimonyProps) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          <ImageWithFallback
            src={image}
            alt={`${name} profile`}
            className="w-full h-full object-cover"
          />
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

      <Quote className="w-8 h-8 text-purple-300 mb-4" />
      <blockquote className="text-gray-600 leading-relaxed italic">
        "{testimony}"
      </blockquote>
    </div>
  )
}

export default function TestimoniesPage() {
  const testimonies: TestimonyProps[] = [];

  return (
    <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-green-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-purple-800 mb-6">
            Stories of Transformation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how real people have experienced life-changing transformation through the practice of genuine, practical love.
          </p>
        </div>

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
          <div className="text-center mb-20 py-16 bg-white rounded-2xl shadow-md border border-purple-100">
            <Heart className="w-16 h-16 mx-auto mb-6 text-purple-300" />
            <p className="text-2xl text-gray-700 font-medium mb-2">
              Your Story Matters
            </p>
            <p className="text-lg text-gray-500 max-w-md mx-auto">
              Be the first to share how Practical Love has transformed your life and inspired your journey.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-12 md:p-16 text-white text-center shadow-xl">
          <Heart className="w-20 h-20 mx-auto mb-8 text-pink-300 fill-current animate-pulse" />
          <h3 className="text-3xl md:text-4xl font-serif mb-6">Share Your Transformation Story</h3>
          <p className="text-lg text-purple-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Has practical love changed your relationships, your family, or your life? Your story could be the encouragement someone else needs to begin their own journey of transformation.
          </p>
          <Link to="/share-testimony" className="bg-white text-purple-600 px-10 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all hover:shadow-lg inline-block text-lg">
            Share Your Story Now
          </Link>
        </div>
      </div>
    </section>
  )
}