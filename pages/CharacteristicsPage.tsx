import { useState } from 'react';
import { Sprout, Bird, Scale, Handshake, Crown, Zap, Heart, Shield, Sun, Star, Anchor, Smile, Gift, Lock, Clock, Sparkles, Infinity, ChevronRight, User, BookOpen, Check } from 'lucide-react';

export default function CharacteristicsPage() {
  const [userName, setUserName] = useState('');
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const characteristics = [
    { num: 1, icon: <Clock className="w-6 h-6" />, text: "Love endures long and is patient", category: 'positive', shortText: "Patient", color: 'from-emerald-500 to-teal-600' },
    { num: 2, icon: <Heart className="w-6 h-6" />, text: "Love is kind", category: 'positive', shortText: "Kind", color: 'from-pink-500 to-rose-600' },
    { num: 3, icon: <Bird className="w-6 h-6" />, text: "Love is never envious or boils over with jealousy", category: 'negative', shortText: "Not Envious", color: 'from-violet-500 to-purple-600' },
    { num: 4, icon: <Scale className="w-6 h-6" />, text: "Love is not boastful or vainglorious", category: 'negative', shortText: "Not Boastful", color: 'from-blue-500 to-indigo-600' },
    { num: 5, icon: <Handshake className="w-6 h-6" />, text: "Love does not display itself haughtily", category: 'negative', shortText: "Not Proud", color: 'from-cyan-500 to-blue-600' },
    { num: 6, icon: <Crown className="w-6 h-6" />, text: "Love is not conceited (arrogant and inflated with pride)", category: 'negative', shortText: "Not Conceited", color: 'from-amber-500 to-orange-600' },
    { num: 7, icon: <Sparkles className="w-6 h-6" />, text: "Love is not rude (unmannerly) and does not act unbecomingly", category: 'negative', shortText: "Not Rude", color: 'from-fuchsia-500 to-pink-600' },
    { num: 8, icon: <Zap className="w-6 h-6" />, text: "Love does not insist on its own rights or its own way, for it is not self-seeking", category: 'negative', shortText: "Not Self-Seeking", color: 'from-yellow-500 to-amber-600' },
    { num: 9, icon: <Shield className="w-6 h-6" />, text: "Love is not touchy or fretful or resentful", category: 'negative', shortText: "Not Resentful", color: 'from-red-500 to-rose-600' },
    { num: 10, icon: <Sun className="w-6 h-6" />, text: "Love takes no account of the evil done to it", category: 'negative', shortText: "Forgives", color: 'from-orange-500 to-red-600' },
    { num: 11, icon: <Star className="w-6 h-6" />, text: "Love does not rejoice at injustice and unrighteousness", category: 'negative', shortText: "Hates Injustice", color: 'from-indigo-500 to-violet-600' },
    { num: 12, icon: <Anchor className="w-6 h-6" />, text: "Love rejoices when right and truth prevail", category: 'positive', shortText: "Loves Truth", color: 'from-sky-500 to-blue-600' },
    { num: 13, icon: <Smile className="w-6 h-6" />, text: "Love bears up under anything and everything that comes", category: 'positive', shortText: "Bears All", color: 'from-lime-500 to-green-600' },
    { num: 14, icon: <Gift className="w-6 h-6" />, text: "Love is ever ready to believe the best of every person", category: 'positive', shortText: "Believes Best", color: 'from-teal-500 to-cyan-600' },
    { num: 15, icon: <Sprout className="w-6 h-6" />, text: "Love's hopes are fadeless under all circumstances", category: 'positive', shortText: "Always Hopes", color: 'from-green-500 to-emerald-600' },
    { num: 16, icon: <Lock className="w-6 h-6" />, text: "Love endures everything without weakening", category: 'positive', shortText: "Endures All", color: 'from-purple-500 to-indigo-600' },
    { num: 17, icon: <Infinity className="w-6 h-6" />, text: "Love never fails, never fades out, or becomes obsolete", category: 'positive', shortText: "Never Fails", color: 'from-rose-500 to-pink-600' }
  ];

  const displayText = (text: string) => {
    if (isPersonalized && userName.trim()) {
      return text.replace(/Love/g, userName);
    }
    return text;
  };

  const positiveCount = characteristics.filter(c => c.category === 'positive').length;
  const negativeCount = characteristics.filter(c => c.category === 'negative').length;

  return (
    <section className="min-h-screen py-16 md:py-24 px-4 md:px-12 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)' }}>
      {/* Colorful Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600 opacity-20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-pink-600 opacity-20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600 opacity-20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-amber-500 opacity-15 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-amber-500/30 text-amber-400 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase mb-6 shadow-[0_0_30px_rgba(251,191,36,0.2)]">
            <BookOpen className="w-4 h-4" />
            1 Corinthians 13:4-8
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight">
            The <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">17 Characteristics</span> of Love
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light max-w-3xl mx-auto">
            Love isn't just a feeling — it's a measurable, actionable set of characteristics.
          </p>
        </div>

        {/* Personalization */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-violet-900/40 via-fuchsia-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Personalize Your Experience</h3>
                <p className="text-purple-300 text-sm">Replace "Love" with your name</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter your name..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="flex-1 px-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-pink-500/50"
              />
              <button
                onClick={() => setIsPersonalized(!isPersonalized)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isPersonalized 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_30px_rgba(236,72,153,0.4)]' 
                    : 'bg-white/10 text-white hover:bg-white/20'
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
          <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-500/30 rounded-full">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
            <span className="text-emerald-300 font-medium">{positiveCount} Positive Traits</span>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-rose-900/40 to-pink-900/40 border border-rose-500/30 rounded-full">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-400 to-pink-400" />
            <span className="text-rose-300 font-medium">{negativeCount} Things Love Avoids</span>
          </div>
        </div>

        {/* Quick Reference */}
        <div className="mb-12 overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-2 min-w-max">
            {characteristics.map((item) => (
              <button
                key={item.num}
                onClick={() => setExpandedCard(expandedCard === item.num ? null : item.num)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  expandedCard === item.num
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {item.num}. {item.shortText}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characteristics.map((item) => (
            <div
              key={item.num}
              onClick={() => setExpandedCard(expandedCard === item.num ? null : item.num)}
              className={`group relative backdrop-blur-xl border rounded-2xl p-6 cursor-pointer transition-all duration-500 overflow-hidden ${
                expandedCard === item.num
                  ? 'bg-white/15 border-white/30 scale-[1.02]'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:-translate-y-1'
              }`}
            >
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${item.color}`} />
              <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${item.color} opacity-10 blur-[60px] rounded-full group-hover:opacity-20 transition-all`} />

              <div className="relative z-10 flex items-start justify-between mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <div className="text-white">{item.icon}</div>
                </div>
                <div className={`font-serif text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br ${item.color} opacity-30 group-hover:opacity-50`}>
                  {item.num < 10 ? `0${item.num}` : item.num}
                </div>
              </div>

              <h3 className="relative z-10 text-lg font-serif text-white/90 group-hover:text-white leading-relaxed">
                {displayText(item.text)}
              </h3>

              <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className={`text-xs font-bold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}>
                  {item.category === 'positive' ? '✓ Positive' : '✗ Avoids'}
                </span>
                <ChevronRight className={`w-4 h-4 text-white/30 transition-transform ${expandedCard === item.num ? 'rotate-90' : ''}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-xl">
            <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              What Love Does
            </h3>
            <ul className="space-y-2 text-gray-300">
              {characteristics.filter(c => c.category === 'positive').map(c => (
                <li key={c.num} className="flex items-center gap-2 text-sm">
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${c.color}`}>●</span> {c.shortText}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-rose-900/30 to-pink-900/30 border border-rose-500/30 rounded-2xl p-6 backdrop-blur-xl">
            <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              What Love Avoids
            </h3>
            <ul className="space-y-2 text-gray-300">
              {characteristics.filter(c => c.category === 'negative').map(c => (
                <li key={c.num} className="flex items-center gap-2 text-sm">
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${c.color}`}>●</span> {c.shortText}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 relative rounded-2xl overflow-hidden border border-white/10 p-8 md:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-pink-900/40 to-amber-900/60" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-pink-500/30 to-purple-600/30 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-amber-500/20 to-orange-600/20 blur-[100px] rounded-full" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200">God's Promise</h2>
            <p className="text-lg md:text-xl text-gray-200 mx-auto mb-8 leading-relaxed">
              "When you memorize and practice these characteristics of love in your family,
              God is <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-400 italic font-semibold">obligated</span> to bless your family!"
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-[0_0_40px_rgba(236,72,153,0.5)] hover:scale-105 transition-all">
                Start the 30-Day Challenge
              </button>
              <button className="bg-white/10 backdrop-blur-xl text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all border border-white/30">
                Get the Yellow Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}