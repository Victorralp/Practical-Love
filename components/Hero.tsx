import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sun, Heart, Leaf, BookOpen, Users, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate();

  const handleStartWithLove = () => {
    navigate('/bible-passages');
  };

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Love Ministry for Nigeria",
      description: "God's love is the root of all blessings, while love of money is the root of all evils in our families"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Transform Nigerian Families",
      description: "Break the cycle of corruption and wickedness through loving, God-fearing homes"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Yellow Card Revolution",
      description: "Get your Yellow Card and practice the 17 characteristics of love in your daily life"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-red-600 via-orange-500 to-red-700 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0">
          {/* Sun icon */}
          <Sun className="absolute top-20 right-20 w-16 h-16 text-yellow-300 opacity-60" />

          {/* Heart icon */}
          <Heart className="absolute bottom-32 right-32 w-12 h-12 text-red-300 opacity-50 fill-current" />

          {/* Leaf icon */}
          <Leaf className="absolute bottom-40 left-20 w-10 h-10 text-orange-300 opacity-40" />
        </div>

        {/* Family Love Image */}
        <div className="absolute right-0 lg:right-10 top-1/2 transform -translate-y-1/2 hidden lg:block overflow-hidden rounded-2xl shadow-2xl border-4 border-white/20">
          <img
            src="/love-hero-v2.png"
            alt="Family embracing in warm light"
            className="w-[400px] h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
          />
        </div>

        <div className="relative z-10 flex items-center min-h-screen px-6">
          <div className="max-w-6xl mx-auto w-full">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight">
                Practical<br />Love
              </h1>

              <h2 className="text-xl md:text-3xl text-white mb-8 tracking-wide font-medium">
                Can we be honest for a moment? You are tired.
              </h2>

              <p className="text-lg text-white mb-10 max-w-xl leading-relaxed">
                Behind the smile, behind the hustle, there is a secret weight you carry. You've chased success, status, and security, yet the deep hunger in your heart remains unfed.
                <br /><br />
                We want to hand you the key to unlocking the life you were made for. It starts with a simple whisper. Take 1 Corinthians 13 and put your name in place of the word "love." Say it: <span className="italic text-orange-200 font-medium">"I am patient... I am kind..."</span>
                <br /><br />
                Do you feel that? That is your soul finally taking a breath. Come home to Love.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleStartWithLove}
                  className="group bg-orange-400 hover:bg-orange-300 text-white px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-lg font-semibold shadow-lg hover:shadow-xl"
                >
                  <span>Begin Your Journey</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  to="/yellow-card-series"
                  className="bg-white text-red-600 hover:bg-orange-50 px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-lg font-semibold shadow-lg hover:shadow-xl"
                >
                  <span>Get Your Yellow Card</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nigeria Focus Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-red-800 mb-6">
            Love Ministry for Nigeria
          </h2>
          <div className="bg-red-50 rounded-xl p-8 border-2 border-red-200 shadow-lg">
            <p className="text-lg text-gray-800 mb-4 leading-relaxed font-medium">
              "We do not love ourselves in Nigeria. All families in Nigeria are guilty including my own and your own families."
            </p>
            <p className="text-lg text-gray-800 mb-4 leading-relaxed font-medium">
              "Love of money is the root of all evils; name any evil you find in Nigeria."
            </p>
            <p className="text-xl text-red-700 font-bold bg-yellow-100 p-4 rounded-lg">
              "There's a thin line between LOVE of God and LOVE of money; you need to work hard DAILY to be on the side of God."
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-red-800 mb-4">Why Love Ministry for Nigeria?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              "For God so loved the world" (John 3:16) — This includes every Nigerian, NO EXCEPTION!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
            Transform Nigeria Through Love
          </h2>
          <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
            "There is no way something good will come out of loving and godly families that will not impact the family, community, church, mosque and society at large."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartWithLove}
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-medium hover:bg-orange-50 transition-colors shadow-lg text-lg"
            >
              Explore Bible Passages
            </button>
            <button
              onClick={() => navigate('/mission-vision')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-red-600 transition-colors text-lg"
            >
              Our Mission & Vision
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}