import { Heart, Award, Download, Printer, Calendar, Target, Star, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function YellowCardPage() {
  const characteristics = [
    { num: 1, text: "LOVE endures long and is patient and kind" },
    { num: 2, text: "LOVE is never envious or boils over with jealousy" },
    { num: 3, text: "LOVE is not boastful or vainglorious" },
    { num: 4, text: "LOVE does not display itself haughtily" },
    { num: 5, text: "LOVE is not conceited (arrogant and inflated with pride)" },
    { num: 6, text: "LOVE is not rude or unmannerly" },
    { num: 7, text: "LOVE does not act unbecomingly" },
    { num: 8, text: "LOVE (GOD'S LOVE IN US) does not insist on his own way or his own right" },
    { num: 9, text: "LOVE is not self-seeking" },
    { num: 10, text: "LOVE is not fretful, touchy or resentful" },
    { num: 11, text: "LOVE takes no account of evil done to it" },
    { num: 12, text: "LOVE pays no attention to a suffered wrong" },
    { num: 13, text: "LOVE does not rejoice at injustice and unrighteousness but rejoices when right and truth prevail" },
    { num: 14, text: "LOVE bears up under anything that comes" },
    { num: 15, text: "LOVE is ever ready to believe the best of every person" },
    { num: 16, text: "LOVE's hope is fadeless under all circumstances, and it endures everything" },
    { num: 17, text: "LOVE never fails, never fades out, or becomes obsolete, or comes to an end" }
  ];

  const dailyPractices = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Morning Reflection",
      description: "Start your day by reading one characteristic and setting an intention to practice it."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Daily Goal",
      description: "Choose one characteristic to focus on throughout the day in your interactions."
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Evening Review",
      description: "Reflect on how you demonstrated love and where you can improve tomorrow."
    }
  ];



  const benefits = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Transform Your Relationships",
      description: "Apply these principles to strengthen your family, friendships, and professional relationships."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Build Stronger Communities",
      description: "Create positive change in your neighborhood and workplace through practical love."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Experience Personal Growth",
      description: "Develop character and emotional maturity by practicing these timeless principles."
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 py-24 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-8 shadow-xl animate-pulse">
            <Heart className="w-10 h-10 text-red-700 fill-current" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-red-800 mb-6 font-bold">
            The Yellow Card
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            God's Love Language — The 17 Characteristics of Love from 1 Corinthians 13
          </p>
        </div>

        {/* Yellow Card Preview */}
        <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-3xl shadow-2xl p-3 mb-20 relative overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
          <div className="bg-yellow-100 rounded-2xl shadow-lg border border-yellow-200">
            <div className="p-8 md:p-12">
              {/* Card Header */}
              <div className="text-center mb-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2 tracking-wide">Practical Love</h2>
                <p className="text-lg md:text-xl font-bold tracking-wider opacity-90">THE OVERWHELMING WINNING POWER</p>
                <p className="text-sm md:text-base font-medium tracking-widest uppercase opacity-75 mt-1">BEHIND ALL HUMAN ENDEAVOURS</p>
              </div>

              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-bold text-red-800 mb-4">Characteristics of Love</h3>
                <p className="text-red-700 font-bold bg-yellow-200/80 inline-block px-6 py-2 rounded-full text-sm md:text-base shadow-sm border border-yellow-300">
                  INSERT YOUR NAME WHEREVER YOU SEE LOVE
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {characteristics.map((item) => (
                  <div key={item.num} className="flex items-start bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-yellow-50">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-white font-bold text-sm shadow-md">
                      {item.num}
                    </div>
                    <p className="text-gray-800 text-base leading-relaxed font-medium">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t-2 border-yellow-400/50 text-center">
                <p className="text-red-800 font-bold text-xl mb-3 font-serif">
                  1 Corinthians 13 (Amplified Version)
                </p>
                <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 inline-block max-w-4xl">
                  <p className="text-gray-800 text-lg italic font-medium leading-relaxed">
                    "Any family who memorizes and practices these characteristics of Love — IT IS MANDATORY OR COMPULSORY FOR GOD TO BLESS THAT FAMILY!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Practice Guide */}
        <div className="bg-white rounded-3xl p-10 md:p-14 shadow-xl mb-20 border border-gray-100">
          <h2 className="text-3xl md:text-4xl font-serif text-center text-red-800 mb-4 font-bold">Your Daily Practice Guide</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Simple steps to integrate the characteristics of love into your everyday life
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {dailyPractices.map((practice, index) => (
              <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200 hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-lg group">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                  {practice.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-700 transition-colors">{practice.title}</h3>
                <p className="text-gray-600 leading-relaxed">{practice.description}</p>
              </div>
            ))}
          </div>

          {/* 30-Day Challenge Teaser */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-1 shadow-2xl transform hover:scale-[1.01] transition-transform duration-300">
            <div className="bg-white rounded-xl p-8 md:p-10">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-sm font-bold mb-6 tracking-wide uppercase">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Transform Your Life
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                    30-Day Love Challenge
                  </h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl">
                    Embark on a transformative journey. Each day, focus on one characteristic of love to strengthen your relationships and personal character.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                    <Link
                      to="/love-challenge"
                      className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl group"
                    >
                      Start the Challenge
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <div className="flex items-center justify-center text-gray-500 text-sm font-medium bg-gray-50 px-6 py-4 rounded-xl border border-gray-100">
                      <Star className="w-4 h-4 text-yellow-500 mr-2 fill-current" />
                      Join 1,000+ others today
                    </div>
                  </div>
                </div>

                {/* Visual Preview Card */}
                <div className="w-full lg:w-5/12 max-w-md">
                  <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-inner relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full -mr-16 -mt-16 opacity-50 transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">Preview</span>
                        <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full">Day 1</span>
                      </div>
                      <h4 className="text-2xl font-bold text-gray-800 mb-3">Love is Patient</h4>
                      <p className="text-gray-600 text-base mb-6 italic leading-relaxed">
                        "Today, I will choose to breathe and wait before reacting in difficult situations."
                      </p>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                          <div key={i} className={`h-2 flex-1 rounded-full ${i === 0 ? 'bg-red-500' : 'bg-gray-200'}`}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-serif text-center text-red-800 mb-6 font-bold">Benefits of Practicing Love</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Discover the transformative power of incorporating these principles into your daily life
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-orange-400">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-100 to-orange-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-tiny">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Download Section */}
        <div className="bg-gradient-to-r from-red-700 to-orange-600 rounded-3xl p-12 md:p-16 text-white text-center mb-20 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif mb-6 font-bold">Get Your Personal Yellow Card</h2>
            <p className="text-orange-100 mb-10 max-w-2xl mx-auto text-xl leading-relaxed">
              Download your printable version or save it to your phone for daily inspiration. It's free and transformative.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8 print:hidden">
              <button
                onClick={() => window.print()}
                className="bg-white text-red-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 hover:scale-105 transition-all flex items-center justify-center shadow-xl"
              >
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </button>
              <button
                onClick={() => window.print()}
                className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:scale-105 transition-all flex items-center justify-center shadow-lg"
              >
                <Printer className="w-5 h-5 mr-2" />
                Print Version
              </button>
            </div>

            <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20">
              <p className="text-orange-100 text-sm font-semibold">✨ Also available as a mobile app - coming soon!</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-3xl p-12 md:p-16 shadow-xl border border-gray-100">
          <h2 className="text-4xl font-serif text-red-800 mb-6 font-bold">Ready to Begin Your Journey?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Start practicing practical love today and experience the transformation in your relationships and community.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/characteristics"
              className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-red-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
            >
              Detailed Characteristics Guide
            </Link>
            <Link
              to="/bible-passages"
              className="bg-white border-2 border-red-600 text-red-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition-all shadow-md hover:shadow-lg"
            >
              Explore 50 Love Passages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}