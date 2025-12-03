import { Heart, Award, Download, Printer, Calendar, Target, Star } from 'lucide-react';
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Mother of Two",
      content: "The Yellow Card transformed how I communicate with my children. Patient love has brought us closer than ever before.",
      rating: 5
    },
    {
      name: "Michael Okafor",
      role: "Community Leader",
      content: "Implementing these principles in our community projects has led to remarkable collaboration and success.",
      rating: 5
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
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 shadow-lg">
            <Heart className="w-8 h-8 text-red-700 fill-current" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-red-800 mb-4">
            The Yellow Card
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            God's Love Language — The 17 Characteristics of Love from 1 Corinthians 13
          </p>
        </div>

        {/* Yellow Card Preview */}
        <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-2xl shadow-2xl p-2 mb-12 relative overflow-hidden">
          <div className="bg-yellow-100 rounded-xl shadow-lg">
            <div className="p-6 md:p-8">
              {/* Card Header */}
              <div className="text-center mb-6 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-4 text-white">
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-1">Practical Love</h2>
                <p className="text-lg font-semibold">THE OVERWHELMING WINNING POWER</p>
                <p className="text-sm">BEHIND ALL HUMAN ENDEAVOURS</p>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-red-800 mb-2">Characteristics of Love</h3>
                <p className="text-red-700 font-semibold bg-yellow-200 inline-block px-4 py-2 rounded-lg">
                  INSERT YOUR NAME WHEREVER YOU SEE LOVE
                </p>
              </div>

              <div className="space-y-3">
                {characteristics.map((item) => (
                  <div key={item.num} className="flex items-start bg-white rounded-lg p-3 shadow-sm">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-white font-bold text-sm">
                      {item.num}
                    </div>
                    <p className="text-gray-800 text-sm md:text-base leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t-2 border-yellow-400 text-center">
                <p className="text-red-800 font-bold text-lg mb-2">
                  1 Corinthians 13 (Amplified Version)
                </p>
                <p className="text-gray-700 text-sm italic">
                  "Any family who memorizes and practices these characteristics of Love — IT IS MANDATORY OR COMPULSORY FOR GOD TO BLESS THAT FAMILY!"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Practice Guide */}
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-12">
          <h2 className="text-3xl font-serif text-center text-red-800 mb-2">Your Daily Practice Guide</h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Simple steps to integrate the characteristics of love into your everyday life
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {dailyPractices.map((practice, index) => (
              <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg flex items-center justify-center mb-4">
                  {practice.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{practice.title}</h3>
                <p className="text-gray-600">{practice.description}</p>
              </div>
            ))}
          </div>

          {/* Progress Tracker */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-100">
            <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500 fill-current" />
              30-Day Love Challenge
            </h3>
            <p className="text-gray-700 mb-4">
              Track your progress as you practice each characteristic daily. Mark each day you successfully demonstrate practical love.
            </p>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {Array.from({ length: 30 }).map((_, index) => (
                <div key={index} className="h-10 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                  {index + 1}
                </div>
              ))}
            </div>
            <Link to="/love-challenge" className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all inline-block">
              Start Challenge
            </Link>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-3xl font-serif text-center text-red-800 mb-2">Success Stories</h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Hear from people who have transformed their lives through the Yellow Card
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-serif text-center text-red-800 mb-2">Benefits of Practicing Love</h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Discover the transformative power of incorporating these principles into your daily life
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-100 to-orange-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Download Section */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white text-center mb-12 shadow-xl">
          <h2 className="text-3xl font-serif mb-2">Get Your Personal Yellow Card</h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto text-lg">
            Download your printable version or save it to your phone for daily inspiration
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button className="bg-white text-red-600 px-8 py-4 rounded-lg font-medium hover:bg-orange-50 transition-colors flex items-center justify-center shadow-lg">
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-red-600 transition-colors flex items-center justify-center shadow-lg">
              <Printer className="w-5 h-5 mr-2" />
              Print Version
            </button>
          </div>
          
          <div className="text-orange-200 text-sm">
            <p>Also available as a mobile app - coming soon!</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-serif text-red-800 mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
            Start practicing practical love today and experience the transformation in your relationships and community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/characteristics" 
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all shadow-lg"
            >
              View All 17 Characteristics
            </Link>
            <Link 
              to="/bible-passages" 
              className="border-2 border-red-500 text-red-500 px-8 py-4 rounded-lg font-medium hover:bg-red-50 transition-colors shadow-lg"
            >
              Explore 50 Love Passages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}