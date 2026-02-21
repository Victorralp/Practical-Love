import { Award, Download, Printer, Calendar, Target, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero, PageShell } from '../components/ui';
import Logo from '../components/Logo';

export default function YellowCardPage() {
  const characteristics = [
    { num: 1, text: 'LOVE endures long and is patient and kind' },
    { num: 2, text: 'LOVE is never envious or boils over with jealousy' },
    { num: 3, text: 'LOVE is not boastful or vainglorious' },
    { num: 4, text: 'LOVE does not display itself haughtily' },
    { num: 5, text: 'LOVE is not conceited (arrogant and inflated with pride)' },
    { num: 6, text: 'LOVE is not rude or unmannerly' },
    { num: 7, text: 'LOVE does not act unbecomingly' },
    { num: 8, text: "LOVE (GOD'S LOVE IN US) does not insist on his own way or his own right" },
    { num: 9, text: 'LOVE is not self-seeking' },
    { num: 10, text: 'LOVE is not fretful, touchy or resentful' },
    { num: 11, text: 'LOVE takes no account of evil done to it' },
    { num: 12, text: 'LOVE pays no attention to a suffered wrong' },
    {
      num: 13,
      text: 'LOVE does not rejoice at injustice and unrighteousness but rejoices when right and truth prevail',
    },
    { num: 14, text: 'LOVE bears up under anything that comes' },
    { num: 15, text: 'LOVE is ever ready to believe the best of every person' },
    { num: 16, text: "LOVE's hope is fadeless under all circumstances, and it endures everything" },
    { num: 17, text: 'LOVE never fails, never fades out, or becomes obsolete, or comes to an end' },
  ];

  const dailyPractices = [
    {
      icon: <Logo className="w-6 h-6" />,
      title: 'Morning Reflection',
      description: 'Read one characteristic and set your intention for the day.',
      accent: 'Step 01',
      tip: 'Set the tone for every interaction.',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Daily Goal',
      description: 'Choose one trait to practice intentionally in every interaction.',
      accent: 'Step 02',
      tip: 'Carry one focus word with you.',
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Evening Review',
      description: 'Reflect on how you loved today and note one improvement for tomorrow.',
      accent: 'Step 03',
      tip: 'Celebrate one small win nightly.',
    },
  ];

  const benefits = [
    {
      icon: <Logo className="w-8 h-8" />,
      title: 'Transform Relationships',
      description: 'Strengthen family, friendships, and work through lived-out love.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Build Communities',
      description: 'Create positive change in your neighborhood and workplace.',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Grow Personally',
      description: 'Develop character and emotional maturity with daily practice.',
    },
  ];

  return (
    <PageShell className="bg-gradient-to-b from-yellow-50 via-white to-orange-50" containerClassName="py-16 section-gap">
      <PageHero
        className="surface-soft mb-8"
        badge={
          <>
            <Sparkles className="w-4 h-4" />
            God&apos;s Love Language
          </>
        }
        icon={
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center shadow-sm">
            <Logo className="w-6 h-6" />
          </div>
        }
        title="The Yellow Card"
        subtitle="A simple, printable guide to memorize and live the 17 characteristics of love from 1 Corinthians 13."
      />

      <div className="surface p-6">
        <div className="bg-white border border-orange-100 rounded-2xl p-6 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-red-800">Practical Love: The Yellow Card</h2>
            <p className="text-sm uppercase tracking-wide text-orange-700 font-semibold">
              Insert your name wherever you see “LOVE”
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {characteristics.map(item => (
              <div
                key={item.num}
                className="flex items-start bg-white rounded-xl p-4 border border-orange-100 hover:border-orange-200 hover:-translate-y-0.5 transition"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-orange-500 rounded-full flex items-center justify-center mr-4 text-white font-semibold shadow-sm">
                  {item.num}
                </div>
                <p className="text-gray-800 text-base leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-orange-100 text-center space-y-2">
            <p className="text-red-800 font-bold text-lg font-serif">1 Corinthians 13 (Amplified)</p>
            <p className="text-gray-700 italic">
              “Any family who memorizes and practices these characteristics of love—God will bless that family.”
            </p>
          </div>
        </div>
      </div>

      <div className="surface p-10 md:p-12 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-serif text-red-800 font-bold">Your Daily Practice Guide</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple checkpoints to make love a daily habit.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dailyPractices.map((practice, index) => (
            <div
              key={index}
              className="surface-soft relative overflow-hidden p-8 border border-orange-100 hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-lg group"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 opacity-80" />

              <div className="flex items-center justify-between mb-6 pt-1">
                <span className="pill text-xs font-semibold uppercase tracking-wide">{practice.accent}</span>
                <span
                  className="w-14 h-14 bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 text-white rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform ring-2 ring-orange-100/60"
                >
                  {practice.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-700 transition-colors">
                {practice.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{practice.description}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-700">
                <Sparkles className="w-4 h-4" />
                {practice.tip}
              </div>
            </div>
          ))}
        </div>

      <div className="surface-soft p-8 md:p-10 max-w-5xl mx-auto space-y-6 md:space-y-8 text-center">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-sm font-bold uppercase tracking-wide mx-auto">
          <Sparkles className="w-4 h-4 mr-2" />
          Transform your life
        </div>
        <div className="space-y-3">
          <h3 className="text-3xl font-serif font-bold text-gray-900">30-Day Love Challenge</h3>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Focus on one characteristic each day to strengthen relationships and your personal character.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link to="/love-challenge" className="btn-brand px-8 py-3">
            Start the Challenge
          </Link>
          <Link to="/love-challenge" className="btn-outline-brand px-8 py-3">
            Join 1,000+ others today
          </Link>
        </div>
        <div className="w-full max-w-xl bg-white border border-orange-100 rounded-2xl shadow-md p-6 mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <p className="text-xs uppercase text-orange-700 font-semibold">Day 1</p>
                <p className="text-sm text-gray-600">Preview</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-orange-700">
              <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
              Trust
            </div>
          </div>
          <p className="text-lg font-semibold text-gray-900 mb-2">Love is Patient</p>
          <p className="text-sm text-gray-600 mb-4">
            “Today, I will choose to breathe and wait before reacting in difficult situations.”
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-red-500 to-orange-500 w-16"></div>
            </div>
            Progress
          </div>
        </div>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="surface-soft rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 border-orange-400"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-100 to-orange-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="surface-soft p-10 text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-serif text-red-800">Get Your Personal Yellow Card</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Download a printable version or save it to your phone for daily inspiration. It’s free and transformative.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center print:hidden">
          <button type="button" onClick={() => window.print()} className="btn-brand px-8 py-3">
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </button>
          <button type="button" onClick={() => window.print()} className="btn-outline-brand px-8 py-3">
            <Printer className="w-5 h-5 mr-2" />
            Print version
          </button>
        </div>
        <p className="text-sm text-orange-700">Mobile-friendly version coming soon.</p>
      </div>

      <div className="surface text-center p-12 space-y-6">
        <h2 className="text-4xl font-serif text-red-800">Ready to Begin Your Journey?</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Start practicing practical love today and experience transformation in your relationships and community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/characteristics" className="btn-brand px-10 py-4">
            Detailed Characteristics Guide
          </Link>
          <Link to="/bible-passages" className="btn-outline-brand px-10 py-4">
            Explore 50 Love Passages
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
