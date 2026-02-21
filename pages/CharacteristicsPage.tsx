import { useState } from 'react';
import {
  Sprout,
  Bird,
  Scale,
  Handshake,
  Crown,
  Zap,
  Shield,
  Sun,
  Star,
  Anchor,
  Smile,
  Gift,
  Lock,
  Clock,
  Sparkles,
  Infinity,
  User,
  BookOpen,
  Check,
} from 'lucide-react';
import { PageHero, PageShell } from '../components/ui';
import Logo from '../components/Logo';

export default function CharacteristicsPage() {
  const [userName, setUserName] = useState('');
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  // Define the 17 characteristics of love
  const characteristics = [
    {
      num: 1,
      icon: <Clock className="w-6 h-6" />,
      text: 'Love endures long and is patient',
      category: 'positive',
      shortText: 'Patient',
    },
    {
      num: 2,
      icon: <Logo className="w-6 h-6" />,
      text: 'Love is kind',
      category: 'positive',
      shortText: 'Kind',
    },
    {
      num: 3,
      icon: <Bird className="w-6 h-6" />,
      text: 'Love is never envious or boils over with jealousy',
      category: 'negative',
      shortText: 'Not Envious',
    },
    {
      num: 4,
      icon: <Scale className="w-6 h-6" />,
      text: 'Love is not boastful or vainglorious',
      category: 'negative',
      shortText: 'Not Boastful',
    },
    {
      num: 5,
      icon: <Handshake className="w-6 h-6" />,
      text: 'Love does not display itself haughtily',
      category: 'negative',
      shortText: 'Not Proud',
    },
    {
      num: 6,
      icon: <Crown className="w-6 h-6" />,
      text: 'Love is not conceited (arrogant and inflated with pride)',
      category: 'negative',
      shortText: 'Not Conceited',
    },
    {
      num: 7,
      icon: <Sparkles className="w-6 h-6" />,
      text: 'Love is not rude (unmannerly) and does not act unbecomingly',
      category: 'negative',
      shortText: 'Not Rude',
    },
    {
      num: 8,
      icon: <Zap className="w-6 h-6" />,
      text: 'Love does not insist on its own rights or its own way, for it is not self-seeking',
      category: 'negative',
      shortText: 'Not Self-Seeking',
    },
    {
      num: 9,
      icon: <Shield className="w-6 h-6" />,
      text: 'Love is not touchy or fretful or resentful',
      category: 'negative',
      shortText: 'Not Resentful',
    },
    {
      num: 10,
      icon: <Sun className="w-6 h-6" />,
      text: 'Love takes no account of the evil done to it',
      category: 'negative',
      shortText: 'Forgives',
    },
    {
      num: 11,
      icon: <Star className="w-6 h-6" />,
      text: 'Love does not rejoice at injustice and unrighteousness',
      category: 'negative',
      shortText: 'Hates Injustice',
    },
    {
      num: 12,
      icon: <Anchor className="w-6 h-6" />,
      text: 'Love rejoices when right and truth prevail',
      category: 'positive',
      shortText: 'Loves Truth',
    },
    {
      num: 13,
      icon: <Smile className="w-6 h-6" />,
      text: 'Love bears up under anything and everything that comes',
      category: 'positive',
      shortText: 'Bears All',
    },
    {
      num: 14,
      icon: <Gift className="w-6 h-6" />,
      text: 'Love is ever ready to believe the best of every person',
      category: 'positive',
      shortText: 'Believes Best',
    },
    {
      num: 15,
      icon: <Sprout className="w-6 h-6" />,
      text: "Love's hopes are fadeless under all circumstances",
      category: 'positive',
      shortText: 'Always Hopes',
    },
    {
      num: 16,
      icon: <Lock className="w-6 h-6" />,
      text: 'Love endures everything without weakening',
      category: 'positive',
      shortText: 'Endures All',
    },
    {
      num: 17,
      icon: <Infinity className="w-6 h-6" />,
      text: 'Love never fails, never fades out, or becomes obsolete',
      category: 'positive',
      shortText: 'Never Fails',
    },
  ];

  // Helper function to personalize text with user's name
  const displayText = (text: string) => {
    if (isPersonalized && userName.trim()) {
      return text.replace(/Love/g, userName);
    }
    return text;
  };

  // Calculate statistics
  const positiveCount = characteristics.filter(c => c.category === 'positive').length;
  const negativeCount = characteristics.filter(c => c.category === 'negative').length;

  // Main render function
  return (
    <PageShell
      className="bg-gradient-to-b from-orange-50 to-yellow-100"
      containerClassName="py-16 section-gap"
    >
      <PageHero
        className="mb-12"
        badge={
          <>
            <BookOpen className="w-4 h-4" />
            1 Corinthians 13:4-8
          </>
        }
        icon={
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-sm">
            <Logo className="w-6 h-6" />
          </div>
        }
        title="The 17 Characteristics of Love"
        subtitle="Love isn’t just a feeling — it’s a measurable, actionable set of characteristics that transforms families and communities."
      />

        {/* Personalization Card */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <User className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-gray-800 font-semibold">Personalize Your Experience</h3>
                <p className="text-gray-500 text-sm">
                  Replace "Love" with your name to make it personal
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter your name..."
                value={userName}
                onChange={e => setUserName(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <button
                type="button"
                onClick={() => setIsPersonalized(!isPersonalized)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isPersonalized
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isPersonalized ? <Check className="w-4 h-4" /> : null}
                {isPersonalized ? 'Applied!' : 'Apply'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center gap-3 px-5 py-3 bg-amber-50 border border-amber-200 rounded-full">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-orange-700 font-medium">{positiveCount} Positive Traits</span>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 bg-red-50 border border-red-200 rounded-full">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-red-700 font-medium">{negativeCount} Things Love Avoids</span>
          </div>
        </div>

        {/* Characteristics Grid */}
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-orange-100 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characteristics.map(item => (
              <div
                key={item.num}
                onClick={() => setSelectedCard(selectedCard === item.num ? null : item.num)}
                className={`group relative bg-orange-50 rounded-xl p-6 cursor-pointer transition-all duration-300 border-2 hover:shadow-lg ${
                  item.category === 'positive'
                    ? 'border-amber-200 hover:border-amber-400'
                    : 'border-red-200 hover:border-red-400'
                } ${selectedCard === item.num ? 'ring-2 ring-red-500 shadow-lg' : ''}`}
              >
                {/* Number badge */}
                <span className="absolute top-3 right-3 text-xs font-bold text-orange-400">
                  #{item.num}
                </span>

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    item.category === 'positive'
                      ? 'bg-amber-100 text-orange-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {item.icon}
                </div>

                {/* Text */}
                <h3 className="text-gray-800 font-medium leading-relaxed mb-3">
                  {displayText(item.text)}
                </h3>

                {/* Category badge */}
                <span
                  className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
                    item.category === 'positive'
                      ? 'bg-amber-100 text-orange-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {item.category === 'positive' ? '✓ Positive' : '✗ Avoids'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-amber-500">
            <h3 className="text-xl font-serif text-gray-800 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <Check className="w-5 h-5 text-orange-600" />
              </div>
              What Love Does
            </h3>
            <ul className="space-y-2 text-gray-600">
              {characteristics
                .filter(c => c.category === 'positive')
                .map(c => (
                  <li key={c.num} className="flex items-center gap-2 text-sm">
                    <span className="text-amber-500">●</span> {c.shortText}
                  </li>
                ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-red-500">
            <h3 className="text-xl font-serif text-gray-800 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              What Love Avoids
            </h3>
            <ul className="space-y-2 text-gray-600">
              {characteristics
                .filter(c => c.category === 'negative')
                .map(c => (
                  <li key={c.num} className="flex items-center gap-2 text-sm">
                    <span className="text-red-500">●</span> {c.shortText}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl">
          <Logo className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-serif mb-4">God's Promise</h2>
          <p className="text-lg text-red-100 mx-auto mb-8 leading-relaxed max-w-3xl">
            "When you memorize and practice these characteristics of love in your family, God is{' '}
            <span className="text-yellow-300 italic font-semibold">obligated</span> to bless your
            family!"
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/love-challenge"
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition-all hover:shadow-lg inline-block"
            >
              Start the 30-Day Challenge
            </a>
            <a
              href="/yellow-card"
              className="bg-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-400 transition-all border border-red-400 inline-block"
            >
              Get the Yellow Card
            </a>
          </div>
        </div>
    </PageShell>
  );
}

