import { Target, Eye, Heart, Users, Globe, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const strategySteps = [
  { number: 1, content: 'Equip every believer with the "Yellow Card"' },
  { number: 2, content: 'Teach the 17 Characteristics of Love' },
  { number: 3, content: 'Launch the 30-Day Love Challenge' },
];

const visionPoints = [
  "Marriages restored through sacrificial love",
  "Leaders serving with integrity and compassion",
  "Communities united beyond tribal lines"
];

export default function MissionVisionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-orange-400 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Our Purpose & Direction
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6">
            Our <span className="text-yellow-300">Manifesto</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Transforming Nigeria through the overwhelming, winning power of God's practical love.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-12">
        
        {/* Vision Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="text-white/80 text-sm font-medium">01</span>
              <h2 className="text-2xl md:text-3xl font-serif text-white">The Vision</h2>
            </div>
          </div>
          <div className="p-8 md:p-10">
            <p className="text-xl md:text-2xl text-gray-800 font-medium mb-6">
              To see every Nigerian family transformed by the power of God's love.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We envision a nation breaking the cycle of corruption, wickedness, and materialism 
              through the root of all change: <span className="text-red-600 font-medium italic">the heart.</span>
            </p>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <h3 className="text-sm font-bold text-green-800 uppercase tracking-wide mb-4">What We See</h3>
              <ul className="space-y-4">
                {visionPoints.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Logic Card */}
        <div className="bg-gradient-to-br from-red-700 to-red-900 rounded-3xl shadow-xl overflow-hidden text-white">
          <div className="p-6 border-b border-white/10 flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-xl">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="text-white/60 text-sm font-medium">02</span>
              <h2 className="text-2xl md:text-3xl font-serif">The Logic</h2>
            </div>
          </div>
          <div className="p-8 md:p-10">
            <p className="text-xl md:text-2xl font-medium mb-8">Why focus on Love?</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-6 h-6 text-yellow-400" />
                  <h3 className="font-bold text-yellow-400">Family Roots</h3>
                </div>
                <p className="text-white/80">
                  Every corrupt leader comes from a family. Heal the family, heal the leader.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-6 h-6 text-yellow-400" />
                  <h3 className="font-bold text-yellow-400">National Impact</h3>
                </div>
                <p className="text-white/80">
                  Love is the only force capable of turning an enemy into a friend.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Strategy Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-orange-500 p-6 flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="text-white/80 text-sm font-medium">03</span>
              <h2 className="text-2xl md:text-3xl font-serif text-white">Our Strategy</h2>
            </div>
          </div>
          <div className="p-8 md:p-10">
            <p className="text-xl text-gray-600 font-serif italic mb-8">
              "Reproduction & Distribution"
            </p>
            <ol className="space-y-4">
              {strategySteps.map((step, index) => (
                <li key={step.number} className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
                  <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-yellow-500 to-orange-500 text-white font-bold rounded-full text-lg shadow-lg">
                    {index + 1}
                  </span>
                  <span className="text-lg text-gray-800 font-medium">{step.content}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Ready to Join the Movement?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Be part of the transformation. Start practicing love today and help us change Nigeria one heart at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/love-challenge" 
              className="inline-flex items-center justify-center gap-2 bg-white text-red-700 px-8 py-4 rounded-full font-bold hover:bg-yellow-50 transition-colors shadow-lg"
            >
              Start the 30-Day Challenge
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/yellow-card" 
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-full font-bold border-2 border-white/50 hover:bg-white/10 transition-colors"
            >
              Get the Yellow Card
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
