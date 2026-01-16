import { Target, Eye, Heart, Users, Globe, BookOpen, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MissionVisionPage() {
  const visionPoints = [
    "Marriages restored through sacrificial love",
    "Leaders serving with integrity and compassion",
    "Communities united beyond tribal lines",
    "Children raised in loving, God-fearing homes"
  ];

  const strategySteps = [
    { 
      number: 1, 
      title: 'Equip with the Yellow Card',
      description: 'Distribute the 17 Characteristics of Love to every believer as a daily reminder and guide.'
    },
    { 
      number: 2, 
      title: 'Teach the Characteristics',
      description: 'Help families memorize and understand each characteristic through practical teaching.'
    },
    { 
      number: 3, 
      title: 'Launch the 30-Day Challenge',
      description: 'Guide participants through daily practice until love becomes second nature.'
    },
  ];

  const coreBeliefs = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Family First",
      description: "Every corrupt leader comes from a family. Heal the family, heal the nation."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Love Transforms",
      description: "Love is the only force capable of turning an enemy into a friend."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "God's Promise",
      description: "Families who practice love are guaranteed God's blessing — it's mandatory."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-orange-50 to-yellow-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 border border-red-200 text-red-700 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Our Purpose & Direction
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-red-800 mb-6">
            Mission & Vision
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transforming Nigeria through the overwhelming, winning power of God's practical love — one family at a time.
          </p>
        </div>

        {/* Mission Statement - Featured */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-orange-100 mb-12 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-8 h-8 text-red-600" />
          </div>
          <span className="text-sm font-bold text-red-600 uppercase tracking-wider">Our Mission</span>
          <h2 className="text-2xl md:text-3xl font-serif text-gray-800 mt-3 mb-4">
            To equip every Nigerian family with the practical tools to love like God loves
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
            We believe that when families learn and practice the 17 Characteristics of Love from 1 Corinthians 13, 
            transformation is inevitable — in homes, communities, and the entire nation.
          </p>
          <div className="bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-6 text-left max-w-3xl mx-auto">
            <p className="text-gray-700 leading-relaxed mb-3">
              <span className="font-semibold text-red-700">This Love Ministry</span>, using the Love Card, aims to remain in the heart of every Nigerian — 
              the heart of flesh — so that God can write His commandments in our hearts, starting with every family.
            </p>
            <p className="text-gray-600 italic text-sm">
              <span className="font-semibold">"I will give you a new heart and put a new spirit in you; I will remove from you your heart of stone and give you a heart of flesh."</span> — Ezekiel 36:26
            </p>
            <p className="text-gray-600 italic text-sm mt-2">
              <span className="font-semibold">"I will put my law in their minds and write it on their hearts. I will be their God, and they will be my people."</span> — Jeremiah 31:33
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-yellow-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <span className="text-xs font-bold text-yellow-600 uppercase tracking-wider">The Vision</span>
                <h3 className="text-xl font-serif text-gray-800">What We See</h3>
              </div>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              To see every Nigerian family transformed by the power of God's love — breaking the cycle of 
              corruption, wickedness, and materialism through the root of all change: 
              <span className="text-red-600 font-semibold italic"> the heart.</span>
            </p>
            <ul className="space-y-3">
              {visionPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-red-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">The Why</span>
                <h3 className="text-xl font-serif text-gray-800">Why Focus on Love?</h3>
              </div>
            </div>
            <div className="space-y-4">
              {coreBeliefs.map((belief, index) => (
                <div key={index} className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-red-600 shadow-sm">
                      {belief.icon}
                    </div>
                    <h4 className="font-semibold text-gray-800">{belief.title}</h4>
                  </div>
                  <p className="text-gray-600 text-sm pl-11">{belief.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strategy Section */}
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-orange-100 mb-12">
          <div className="text-center mb-10">
            <span className="text-sm font-bold text-green-600 uppercase tracking-wider">Our Strategy</span>
            <h2 className="text-2xl md:text-3xl font-serif text-gray-800 mt-2">
              Reproduction & Distribution
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              A simple, reproducible approach that any believer can follow to spread practical love.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {strategySteps.map((step) => (
              <div key={step.number} className="relative">
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200 h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
                {step.number < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-orange-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scripture Quote */}
        <div className="bg-gradient-to-r from-red-700 to-red-800 rounded-2xl p-8 md:p-10 text-center mb-12 shadow-xl">
          <BookOpen className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
          <blockquote className="text-xl md:text-2xl font-serif text-white mb-4 italic max-w-3xl mx-auto">
            "For God so loved the world that He gave His only begotten Son, that whoever believes in Him 
            should not perish but have everlasting life."
          </blockquote>
          <cite className="text-yellow-400 font-medium">— John 3:16</cite>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-orange-100 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 text-red-500 fill-current" />
          <h2 className="text-2xl md:text-3xl font-serif text-gray-800 mb-4">
            Ready to Join the Movement?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Be part of the transformation. Start practicing love today and help us change Nigeria one heart at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/love-challenge" 
              className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all hover:shadow-lg"
            >
              Start the 30-Day Challenge
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/yellow-card" 
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              Get the Yellow Card
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
