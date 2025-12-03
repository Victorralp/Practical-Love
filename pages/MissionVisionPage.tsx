import { Target, Eye, Heart, Users, Globe, BookOpen, Award, TrendingUp, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MissionVisionPage() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-orange-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block bg-red-600 rounded-full p-4 md:p-6 mb-6 shadow-xl">
            <Heart className="w-12 h-12 md:w-16 md:h-16 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-red-800 mb-6">
            Our Mission & Vision
          </h1>
          <p className="text-xl md:text-2xl font-bold text-gray-800 max-w-3xl mx-auto leading-relaxed">
            Transforming Nigeria through the overwhelming winning power of God's practical love
          </p>
        </div>

        {/* Vision Section */}
        <div className="mb-12 md:mb-16">
          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border-l-8 border-blue-600">
            <div className="flex items-center mb-6 md:mb-8">
              <div className="bg-blue-600 rounded-full p-3 md:p-4 mr-4">
                <Eye className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-blue-800">Our Vision</h2>
            </div>
            <div className="space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed">
              <p className="text-gray-800 font-semibold text-lg md:text-xl">
                To see every Nigerian family transformed by the power of God's love, breaking the cycle of 
                corruption, wickedness, and materialism that has plagued our nation.
              </p>
              <p className="text-gray-900 font-bold text-lg md:text-xl">
                We envision a Nigeria where:
              </p>
              <ul className="space-y-3 ml-2 md:ml-4">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-gray-800 text-base md:text-lg font-medium">Love of God replaces love of money in every home</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-gray-800 text-base md:text-lg font-medium">Families practice the 17 characteristics of love from 1 Corinthians 13 daily</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-gray-800 text-base md:text-lg font-medium">Loving, God-fearing homes produce citizens who transform communities and society</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-gray-800 text-base md:text-lg font-medium">Every Nigerian experiences God's mandatory blessing through practicing love</span>
                </li>
              </ul>
              <div className="bg-blue-600 rounded-xl p-6 mt-6 shadow-lg">
                <p className="font-black text-white text-xl md:text-2xl text-center">
                  "For God so loved the world" (John 3:16)
                </p>
                <p className="text-white text-center mt-2 text-lg md:text-xl font-bold">
                  This includes every Nigerian — NO EXCEPTION!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-12 md:mb-16">
          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border-l-8 border-red-600">
            <div className="flex items-center mb-6 md:mb-8">
              <div className="bg-red-600 rounded-full p-3 md:p-4 mr-4">
                <Target className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-red-800">Our Mission</h2>
            </div>
            <div className="space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed">
              <p className="text-gray-800 font-bold text-xl md:text-2xl">
                To equip every Nigerian with the Yellow Card and empower them to practice God's love daily.
              </p>
              <div className="bg-red-50 rounded-xl p-4 md:p-6 mt-4 border-2 border-red-200">
                <h3 className="font-bold text-red-800 text-xl md:text-2xl mb-4">We Are Committed To:</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-red-600 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white font-bold text-sm md:text-base mr-3 flex-shrink-0">
                      1
                    </div>
                    <p className="text-gray-800 text-sm md:text-base font-medium">Distributing the Yellow Card to every Nigerian family</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-red-600 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white font-bold text-sm md:text-base mr-3 flex-shrink-0">
                      2
                    </div>
                    <p className="text-gray-800 text-sm md:text-base font-medium">Teaching families to insert their name wherever they see "LOVE" in 1 Corinthians 13</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-red-600 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white font-bold text-sm md:text-base mr-3 flex-shrink-0">
                      3
                    </div>
                    <p className="text-gray-800 text-sm md:text-base font-medium">Helping Nigerians work hard DAILY to be on the side of God's love</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-red-600 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white font-bold text-sm md:text-base mr-3 flex-shrink-0">
                      4
                    </div>
                    <p className="text-gray-800 text-sm md:text-base font-medium">Demonstrating that loving, God-fearing families produce good citizens</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-red-600 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white font-bold text-sm md:text-base mr-3 flex-shrink-0">
                      5
                    </div>
                    <p className="text-gray-800 text-sm md:text-base font-medium">Proving that God is MANDATORY to bless families who practice love</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-red-600 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white font-bold text-sm md:text-base mr-3 flex-shrink-0">
                      6
                    </div>
                    <p className="text-gray-800 text-sm md:text-base font-medium">Reproducing and giving the Yellow Card to every Nigerian</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-red-800 text-center mb-10">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border-t-4 border-red-600">
              <div className="bg-red-600 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 text-center">God's Love First</h3>
              <p className="text-gray-700 text-center leading-relaxed text-sm md:text-base">
                We believe that love of God is the root of all blessings, while love of money is the root of all evils. 
                We must work DAILY to stay on God's side.
              </p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border-t-4 border-green-600">
              <div className="bg-green-600 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Home className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 text-center">Family Transformation</h3>
              <p className="text-gray-700 text-center leading-relaxed text-sm md:text-base">
                We focus on transforming families because loving, godly homes produce citizens who impact society positively.
              </p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border-t-4 border-blue-600">
              <div className="bg-blue-600 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 text-center">Biblical Foundation</h3>
              <p className="text-gray-700 text-center leading-relaxed text-sm md:text-base">
                We are rooted in Scripture, particularly 1 Corinthians 13 and the 50 love passages in the New Testament.
              </p>
            </div>
          </div>
        </div>

        {/* The Challenge We Address */}
        <div className="mb-16 md:mb-20">
          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl">
            <div className="flex items-center justify-center mb-8">
              <Globe className="w-10 h-10 md:w-12 md:h-12 text-red-600 mr-4" />
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">The Challenge We Address</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-600">
                <h3 className="font-bold text-red-800 text-xl md:text-2xl mb-4">The Problem</h3>
                <ul className="space-y-2 text-gray-800 text-sm md:text-base">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 font-bold">•</span>
                    <span>We do not love ourselves in Nigeria</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 font-bold">•</span>
                    <span>We are stubborn in wickedness</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 font-bold">•</span>
                    <span>All families are guilty, including our own</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 font-bold">•</span>
                    <span>Money and materialism have become the language of love</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 font-bold">•</span>
                    <span>Love of money is the root of all evils</span>
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-600">
                <h3 className="font-bold text-green-800 text-xl md:text-2xl mb-4">The Solution</h3>
                <ul className="space-y-2 text-gray-800 text-sm md:text-base">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">•</span>
                    <span>Work hard DAILY to be on the side of God's love</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">•</span>
                    <span>Practice the 17 characteristics of love</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">•</span>
                    <span>Build loving, God-fearing homes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">•</span>
                    <span>Honor God through loving family relationships</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">•</span>
                    <span>Transform society through transformed families</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-6 md:p-8 shadow-lg">
              <p className="text-gray-900 font-bold text-lg md:text-xl lg:text-2xl text-center leading-relaxed">
                "Any family who memorizes and practices the characteristics of Love — 
                IT IS MANDATORY OR COMPULSORY FOR GOD TO BLESS THAT FAMILY!"
              </p>
            </div>
          </div>
        </div>

        {/* Impact & Goals */}
        <div className="mb-24">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-red-800 text-center mb-12">Our Impact Goals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center bg-white p-6 md:p-8 rounded-2xl shadow-xl">
              <div className="bg-red-600 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-red-700 mb-3">Every Family</h3>
              <p className="text-gray-700 text-base md:text-lg font-medium">Reach every Nigerian family with the Yellow Card</p>
            </div>
            <div className="text-center bg-white p-6 md:p-8 rounded-2xl shadow-xl">
              <div className="bg-green-600 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-green-700 mb-3">Transform Society</h3>
              <p className="text-gray-700 text-base md:text-lg font-medium">Impact communities, churches, mosques, and society at large</p>
            </div>
            <div className="text-center bg-white p-6 md:p-8 rounded-2xl shadow-xl">
              <div className="bg-blue-600 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-blue-700 mb-3">God's Blessing</h3>
              <p className="text-gray-700 text-base md:text-lg font-medium">See God's mandatory blessing on practicing families</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6">Join the Love Revolution</h3>
          <p className="text-lg md:text-xl font-medium text-white mb-8 max-w-3xl mx-auto leading-relaxed">
            Together, we can transform Nigeria one family at a time. Get your Yellow Card and start 
            practicing God's love today. Honor God, and He will honor you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
            <Link
              to="/yellow-card"
              className="w-full sm:w-auto inline-block bg-yellow-400 text-gray-900 px-8 md:px-10 py-4 md:py-5 rounded-xl font-bold text-lg md:text-xl transition-all hover:bg-yellow-300 hover:scale-105 shadow-xl"
            >
              Get Your Yellow Card
            </Link>
            <Link
              to="/characteristics"
              className="w-full sm:w-auto inline-block bg-white text-red-600 px-8 md:px-10 py-4 md:py-5 rounded-xl font-bold text-lg md:text-xl transition-all hover:bg-gray-100 hover:scale-105 shadow-xl"
            >
              View 17 Characteristics
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
