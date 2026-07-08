import React from 'react';
import { Book } from 'lucide-react';
import { agapeLoveBook } from './agape-love-book';

export interface PublicationPage {
  title?: string;
  sourcePageNumber?: number;
  content: React.ReactNode;
}

export interface PublicationProps {
  id: string; // Added ID for routing
  title: string;
  author: string;
  description: string;
  type: 'Book' | 'E-Book' | 'Audiobook';
  coverImage?: string;
  pdfUrl?: string;
  pageCount?: number;
  images?: string[];
  pages?: PublicationPage[];
  loadPages?: () => Promise<PublicationPage[]>;
}

import { happyHomeDigest } from './happyhome-digest';

export const publications: PublicationProps[] = [
  happyHomeDigest,
  agapeLoveBook,
  {
    id: 'love-nigerians',
    title: 'Love Nigerians Or Live On Curses',
    author: 'MOSES ADEREMI OWOEYE',
    description:
      'Discover the solution to corruption and the path to national blessing through the practical application of love.',
    type: 'Book',
    coverImage: '/backgrounds/reader-bg.png',
    pages: [
      {
        content: (
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-red-800 leading-tight">
              LOVE NIGERIANS
              <br />
              OR LIVE ON CURSES
            </h1>

            <h2 className="text-2xl font-semibold text-gray-700">HOW?</h2>
            <div className="py-4">
              <p className="text-xl font-medium text-gray-800">Make Love Nigerian Culture</p>
            </div>
            <div className="space-y-4 text-lg">
              <p className="font-bold text-green-700">LOVE brings BLESSINGS</p>
              <p className="font-bold text-red-700">Corruption brings CURSES</p>
            </div>
            <div className="pt-8 border-t border-gray-200 mt-8">
              <p className="font-bold text-gray-900">
                MOSES ADEREMI OWOEYE, MB;BS (Lagos), M.A.Th. (California, USA)
              </p>
              <p className="text-gray-600 uppercase text-sm mt-1">
                Logos-Rhema Human Services Inc. (USA & Nigeria)
              </p>
            </div>
            <p className="text-sm text-gray-500 italic mt-8">
              P.S. Feel free to reproduce this flyer and distribute it to every nook and corner of
              Nigeria and her inhabitants.
            </p>
          </div>
        ),
      },
      {
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-red-800 mb-6">
              HOW?
              <br />
              <span className="text-xl text-gray-600 font-normal">THE SOLUTION TO CORRUPTION</span>
            </h2>

            <div className="space-y-4 text-lg leading-relaxed text-gray-800">
              <p>You cannot do anything about your past.</p>
              <p className="font-medium">
                You can decide what you think about your present and future.
              </p>
              <p>What you think determines how you behave or respond.</p>
              <p>How you behave determines what you receive in life.</p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400 my-6">
              <p className="font-bold text-xl mb-2">Ask God for wisdom.</p>
              <p>
                Make <span className="text-red-600 font-bold">LOVE</span> your aim in everything you
                do.
              </p>
            </div>

            <p className="border-l-4 border-red-500 pl-4 italic">
              When you think, act, and walk in LOVE, it is pleasing to GOD and fellow Nigerians.
            </p>

            <p>
              Since responding in love is an intentional action, it is voluntary — an active, not a
              passive attitude. You have to choose to respond in LOVE. When it is an act of your
              will, it is pleasing to you.
            </p>

            <div className="text-center font-bold text-red-800 mt-8 space-y-1">
              <p>Remember: whatever you do in LOVE can never fail.</p>
              <p className="text-xl">LOVE NEVER FAILS.</p>
              <p className="text-xl">GOD IS LOVE.</p>
              <p className="text-sm font-normal text-gray-600">(1 Corinthians 13:8, 1 John 4:8)</p>
            </div>
          </div>
        ),
      },
      {
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-red-800 mb-8">
              HOW DO I LOVE NIGERIANS?
            </h2>

            <p className="text-lg leading-relaxed">
              You love Nigerians by loving your husband, your wife, your children, your parents,
              your brothers and sisters — in short, your family and all that concerns them.
            </p>

            <blockquote className="bg-gray-50 p-6 rounded-r-lg border-l-4 border-red-500 italic text-gray-700">
              "A new commandment I give unto you, that you love one another… By this shall all men
              know that you are my disciples."
              <footer className="text-sm font-bold text-gray-500 mt-2">
                — Jesus (John 13:34-35, Luke 10:27)
              </footer>
            </blockquote>

            <div className="grid gap-4 text-center font-medium text-gray-800">
              <div className="p-3 bg-orange-50 rounded">
                OWE NO MAN ANYTHING EXCEPT LOVE. (Romans 13:8)
              </div>
              <div className="p-3 bg-orange-50 rounded">
                Make LOVE your aim. (1 Corinthians 14:1)
              </div>
            </div>

            <p className="italic text-gray-600 text-center">
              If a man says, “I love God,” and hates his brother, he is a liar. (1 John 4:20-21)
            </p>

            <div className="my-6 text-center">
              <p className="font-semibold">
                There is no fear in love; perfect love casts out fear. (1 John 4:18)
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center text-center">
              <div className="flex-1 bg-gray-100 p-4 rounded">
                <span className="font-bold block text-red-600">FEAR</span>
                False Expectations Appearing Real
              </div>
              <div className="flex-1 bg-gray-100 p-4 rounded">
                <span className="font-bold block text-green-600">FAITH</span>
                Forsaking All, I Trust Him
              </div>
            </div>

            <div className="mt-8 pt-6 border-t font-semibold text-center text-red-800">
              <p>HOW THEN DO I PRACTICE LOVE TO GOD AND FELLOW NIGERIANS?</p>
              <p className="text-gray-700 font-normal mt-2">
                It is by memorizing, meditating, verbalizing, walking, and acting intentionally in
                one or more of the 17 characteristics of love listed below.
              </p>
            </div>
          </div>
        ),
      },
      {
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-red-800 mb-2">
              CHARACTERISTICS OF LOVE
            </h2>
            <p className="text-center text-gray-500 text-sm mb-6">
              (1 Corinthians 13 — Amplified Version)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-gray-800">
              {[
                'Love is patient',
                'Love is kind',
                'Love is not jealous',
                'Love is not boastful or vainglorious',
                'Love does not display itself haughtily',
                'Love is not rude or unmannerly',
                'Love does not act unbecomingly',
                'Love is not self-seeking',
                'Love is not easily provoked',
                'Love is not fretful, touchy, or resentful',
                'Love keeps no record of wrongs',
                'Love does not rejoice in injustice',
                'Love rejoices in truth',
                'Love bears all things',
                'Love believes all things',
                'Love hopes all things',
                'Love never fails',
              ].map((char, i) => (
                <div key={i} className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mr-3">
                    {i + 1}
                  </span>
                  {char}
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg mt-8 text-center">
              <p className="mb-4">
                No human being has succeeded in operating perfectly in all of the 17 steps above
                except <span className="font-bold text-red-800">JESUS CHRIST OF NAZARETH</span>.
              </p>
              <p className="text-sm">
                God sent Him to earth to show us how to love perfectly through the Spirit of God in
                Him called the <span className="font-bold">HOLY SPIRIT</span>.
              </p>
            </div>
          </div>
        ),
      },
      {
        content: (
          <div className="space-y-6">
            <div className="bg-red-50 p-6 rounded-xl mb-8">
              <p className="text-lg leading-relaxed mb-4">
                On leaving the earth, Jesus left the{' '}
                <span className="font-bold text-red-700">HOLY SPIRIT</span> behind to help us love.
                He is a gentle Spirit who will not force Himself on you unless you invite Him.
                <span className="block text-sm text-gray-500 mt-1">
                  (John 14:15-31, Luke 11:9-13)
                </span>
              </p>
              <p className="font-medium text-gray-800">
                You can call on the Holy Spirit many times daily, and He will empower you to LOVE
                with no strings attached.
              </p>
            </div>

            <div className="border-l-4 border-red-600 pl-6 py-2">
              <p className="font-bold text-gray-900 mb-2">
                BUT YOU CANNOT HAVE THE HOLY SPIRIT WITHOUT, BY FAITH, INVITING JESUS CHRIST INTO
                YOUR LIFE AS LORD AND MASTER.
              </p>
              <p className="text-gray-600 italic">You must believe this sincerely.</p>
            </div>

            <h2 className="text-2xl font-bold text-center text-green-700 mt-10 mb-6">
              THE BLESSINGS OF LOVING GOD AND NIGERIANS
            </h2>

            <ul className="space-y-3 text-lg text-gray-800">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> Nigeria will be greater than any
                other nation on earth.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> Our towns and fields will be blessed.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> Nigeria will be blessed with many
                children, abundant crops, and livestock.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> God will bless our food.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> God will bless everything Nigerians
                do.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> God will defeat our enemies.
              </li>
            </ul>
          </div>
        ),
      },
      {
        content: (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
              BLESSINGS (Continued)
            </h2>
            <ul className="space-y-3 text-lg text-gray-800">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> God will bless the work of Nigerians’
                hands and the land.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> Nigerians will become God’s own
                people.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> Nigeria will lend to many nations but
                not borrow.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> Nigeria will be a leader and not a
                follower.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> Nigerians will prosper and never
                fail.
              </li>
            </ul>
            <p className="text-center text-sm font-bold text-gray-500 mt-4">
              (Deuteronomy 28:1-14)
            </p>

            <div className="grid gap-6 mt-12 text-center">
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="font-serif text-xl italic text-blue-900 mb-2">
                  Great peace belongs to those who love God’s law.
                </p>
                <p className="text-sm font-bold text-blue-700">(Psalm 119:165)</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="font-serif text-xl italic text-blue-900 mb-2">
                  This book of the law shall not depart from your mouth.
                </p>
                <p className="text-sm font-bold text-blue-700">(Joshua 1:8)</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        content: (
          <div className="space-y-8 flex flex-col items-center justify-center h-full text-center p-4 bg-red-50 rounded-xl border border-red-100">
            <h2 className="text-3xl font-bold text-red-800 leading-snug">
              ALL THESE CURSES WILL COME UPON YOU IF YOU DO NOT LOVE GOD AND NIGERIANS
            </h2>
            <p className="text-lg font-bold text-red-600">(Deuteronomy 28:15-68)</p>

            <div className="space-y-4 text-xl text-gray-800 max-w-2xl">
              <p>
                God will curse towns, fields, labor, families, leadership, health, peace, and
                security.
              </p>
              <p className="font-semibold">
                Fear, confusion, defeat, poverty, oppression, slavery, and destruction will follow.
              </p>
            </div>
          </div>
        ),
      },
      {
        content: (
          <div className="space-y-8 flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-2xl font-bold text-red-800 uppercase tracking-wide mb-8">
              Consequences of Lovelessness
            </h2>

            <div className="space-y-6 text-xl text-gray-800">
              <p className="p-4 bg-gray-100 rounded-lg">Foreign nations will rise over you.</p>
              <p className="p-4 bg-gray-100 rounded-lg">
                Fear, anxiety, hopelessness, and despair will dominate.
              </p>
              <p className="p-4 bg-gray-100 rounded-lg">Peace will disappear.</p>
              <p className="p-4 bg-red-100 text-red-900 font-bold rounded-lg border border-red-200">
                Life will be lived in constant terror until destruction comes.
              </p>
            </div>
          </div>
        ),
      },
      {
        content: (
          <div className="space-y-12 flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Book className="w-12 h-12 text-red-600" />
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-red-800">
                THE SOLUTION TO CORRUPTION IN NIGERIA
              </h2>
              <div className="h-1 w-24 bg-red-500 mx-auto my-6"></div>
              <h3 className="text-3xl font-bold text-gray-900">MAKE LOVE YOUR AIM</h3>
            </div>

            <div className="mt-12 py-3 px-8 border-2 border-dashed border-red-400 rounded-full text-red-500 font-bold text-sm tracking-widest uppercase">
              Not For Sale
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'love-americans',
    title: 'Love Americans Or Live On Curses',
    author: 'MOSES ADEREMI OWOEYE',
    description:
      'Discover the solution to division and the path to national blessing through the practical application of love in America.',
    type: 'Book',
    coverImage: '/backgrounds/reader-bg.png',
    pages: [
      {
        content: (
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-800 leading-tight">
              LOVE AMERICANS
              <br />
              OR LIVE ON CURSES
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700">HOW?</h2>
            <div className="py-4">
              <p className="text-xl font-medium text-gray-800">Make Love American Culture</p>
            </div>
            <div className="space-y-4 text-lg">
              <p className="font-bold text-green-700">LOVE brings BLESSINGS</p>
              <p className="font-bold text-red-700">Division brings CURSES</p>
            </div>
            <div className="pt-8 border-t border-gray-200 mt-8">
              <p className="font-bold text-gray-900">
                MOSES ADEREMI OWOEYE, MB;BS (Lagos), M.A.Th. (California, USA)
              </p>
              <p className="text-gray-600 uppercase text-sm mt-1">
                Logos-Rhema Human Services Inc. (USA & Nigeria)
              </p>
            </div>
            <p className="text-sm text-gray-500 italic mt-8">
              P.S. Feel free to reproduce this flyer and distribute it to every corner of America
              and her inhabitants.
            </p>
          </div>
        ),
      },
      {
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
              HOW?
              <br />
              <span className="text-xl text-gray-600 font-normal">THE SOLUTION TO DIVISION</span>
            </h2>

            <div className="space-y-4 text-lg leading-relaxed text-gray-800">
              <p>You cannot do anything about your past.</p>
              <p className="font-medium">
                You can decide what you think about your present and future.
              </p>
              <p>What you think determines how you behave or respond.</p>
              <p>How you behave determines what you receive in life.</p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400 my-6">
              <p className="font-bold text-xl mb-2">Ask God for wisdom.</p>
              <p>
                Make <span className="text-blue-600 font-bold">LOVE</span> your aim in everything
                you do.
              </p>
            </div>

            <p className="border-l-4 border-blue-500 pl-4 italic">
              When you think, act, and walk in LOVE, it is pleasing to GOD and fellow Americans.
            </p>

            <p>
              Since responding in love is an intentional action, it is voluntary — an active, not a
              passive attitude. You have to choose to respond in LOVE. When it is an act of your
              will, it is pleasing to you.
            </p>

            <div className="text-center font-bold text-blue-800 mt-8 space-y-1">
              <p>Remember: whatever you do in LOVE can never fail.</p>
              <p className="text-xl">LOVE NEVER FAILS.</p>
              <p className="text-xl">GOD IS LOVE.</p>
              <p className="text-sm font-normal text-gray-600">(1 Corinthians 13:8, 1 John 4:8)</p>
            </div>
          </div>
        ),
      },
      {
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
              HOW DO I LOVE AMERICANS?
            </h2>

            <p className="text-lg leading-relaxed">
              You love Americans by loving your husband, your wife, your children, your parents,
              your brothers and sisters — in short, your family and all that concerns them.
            </p>

            <blockquote className="bg-gray-50 p-6 rounded-r-lg border-l-4 border-blue-500 italic text-gray-700">
              "A new commandment I give unto you, that you love one another… By this shall all men
              know that you are my disciples."
              <footer className="text-sm font-bold text-gray-500 mt-2">
                — Jesus (John 13:34-35, Luke 10:27)
              </footer>
            </blockquote>

            <div className="grid gap-4 text-center font-medium text-gray-800">
              <div className="p-3 bg-blue-50 rounded">
                OWE NO MAN ANYTHING EXCEPT LOVE. (Romans 13:8)
              </div>
              <div className="p-3 bg-blue-50 rounded">Make LOVE your aim. (1 Corinthians 14:1)</div>
            </div>

            <p className="italic text-gray-600 text-center">
              If a man says, "I love God," and hates his brother, he is a liar. (1 John 4:20-21)
            </p>

            <div className="my-6 text-center">
              <p className="font-semibold">
                There is no fear in love; perfect love casts out fear. (1 John 4:18)
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center text-center">
              <div className="flex-1 bg-gray-100 p-4 rounded">
                <span className="font-bold block text-red-600">FEAR</span>
                False Expectations Appearing Real
              </div>
              <div className="flex-1 bg-gray-100 p-4 rounded">
                <span className="font-bold block text-green-600">FAITH</span>
                Forsaking All, I Trust Him
              </div>
            </div>

            <div className="mt-8 pt-6 border-t font-semibold text-center text-blue-800">
              <p>HOW THEN DO I PRACTICE LOVE TO GOD AND FELLOW AMERICANS?</p>
              <p className="text-gray-700 font-normal mt-2">
                It is by memorizing, meditating, verbalizing, walking, and acting intentionally in
                one or more of the 17 characteristics of love listed below.
              </p>
            </div>
          </div>
        ),
      },
      {
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-2">
              CHARACTERISTICS OF LOVE
            </h2>
            <p className="text-center text-gray-500 text-sm mb-6">
              (1 Corinthians 13 — Amplified Version)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-gray-800">
              {[
                'Love is patient',
                'Love is kind',
                'Love is not jealous',
                'Love is not boastful or vainglorious',
                'Love does not display itself haughtily',
                'Love is not rude or unmannerly',
                'Love does not act unbecomingly',
                'Love is not self-seeking',
                'Love is not easily provoked',
                'Love is not fretful, touchy, or resentful',
                'Love keeps no record of wrongs',
                'Love does not rejoice in injustice',
                'Love rejoices in truth',
                'Love bears all things',
                'Love believes all things',
                'Love hopes all things',
                'Love never fails',
              ].map((char, i) => (
                <div key={i} className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3">
                    {i + 1}
                  </span>
                  {char}
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg mt-8 text-center">
              <p className="mb-4">
                No human being has succeeded in operating perfectly in all of the 17 steps above
                except <span className="font-bold text-blue-800">JESUS CHRIST OF NAZARETH</span>.
              </p>
              <p className="text-sm">
                God sent Him to earth to show us how to love perfectly through the Spirit of God in
                Him called the <span className="font-bold">HOLY SPIRIT</span>.
              </p>
            </div>
          </div>
        ),
      },
      {
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-xl mb-8">
              <p className="text-lg leading-relaxed mb-4">
                On leaving the earth, Jesus left the{' '}
                <span className="font-bold text-blue-700">HOLY SPIRIT</span> behind to help us love.
                He is a gentle Spirit who will not force Himself on you unless you invite Him.
                <span className="block text-sm text-gray-500 mt-1">
                  (John 14:15-31, Luke 11:9-13)
                </span>
              </p>
              <p className="font-medium text-gray-800">
                You can call on the Holy Spirit many times daily, and He will empower you to LOVE
                with no strings attached.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-6 py-2">
              <p className="font-bold text-gray-900 mb-2">
                BUT YOU CANNOT HAVE THE HOLY SPIRIT WITHOUT, BY FAITH, INVITING JESUS CHRIST INTO
                YOUR LIFE AS LORD AND MASTER.
              </p>
              <p className="text-gray-600 italic">You must believe this sincerely.</p>
            </div>

            <h2 className="text-2xl font-bold text-center text-green-700 mt-10 mb-6">
              THE BLESSINGS OF LOVING GOD AND AMERICANS
            </h2>

            <ul className="space-y-3 text-lg text-gray-800">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> America will fulfill its calling as a
                beacon to the nations.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> Our cities and communities will be
                blessed.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> America will be blessed with strong
                families, abundant prosperity, and unity.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> God will bless our resources.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> God will bless everything Americans
                do.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> God will protect our nation.
              </li>
            </ul>
          </div>
        ),
      },
      {
        content: (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
              BLESSINGS (Continued)
            </h2>
            <ul className="space-y-3 text-lg text-gray-800">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> God will bless the work of Americans'
                hands and the land.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> Americans will become God's own
                people.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> America will prosper and lead with
                integrity.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> America will be united and strong.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> Americans will prosper and never
                fail.
              </li>
            </ul>
            <p className="text-center text-sm font-bold text-gray-500 mt-4">
              (Deuteronomy 28:1-14)
            </p>

            <div className="grid gap-6 mt-12 text-center">
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="font-serif text-xl italic text-blue-900 mb-2">
                  Great peace belongs to those who love God's law.
                </p>
                <p className="text-sm font-bold text-blue-700">(Psalm 119:165)</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="font-serif text-xl italic text-blue-900 mb-2">
                  This book of the law shall not depart from your mouth.
                </p>
                <p className="text-sm font-bold text-blue-700">(Joshua 1:8)</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        content: (
          <div className="space-y-8 flex flex-col items-center justify-center h-full text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
            <h2 className="text-3xl font-bold text-blue-800 leading-snug">
              ALL THESE CURSES WILL COME UPON YOU IF YOU DO NOT LOVE GOD AND AMERICANS
            </h2>
            <p className="text-lg font-bold text-blue-600">(Deuteronomy 28:15-68)</p>

            <div className="space-y-4 text-xl text-gray-800 max-w-2xl">
              <p>
                God will curse cities, communities, labor, families, leadership, health, peace, and
                security.
              </p>
              <p className="font-semibold">
                Fear, confusion, defeat, poverty, oppression, and destruction will follow.
              </p>
            </div>
          </div>
        ),
      },
      {
        content: (
          <div className="space-y-8 flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-2xl font-bold text-blue-800 uppercase tracking-wide mb-8">
              Consequences of Lovelessness
            </h2>

            <div className="space-y-6 text-xl text-gray-800">
              <p className="p-4 bg-gray-100 rounded-lg">
                Division and strife will consume the nation.
              </p>
              <p className="p-4 bg-gray-100 rounded-lg">
                Fear, anxiety, hopelessness, and despair will dominate.
              </p>
              <p className="p-4 bg-gray-100 rounded-lg">Unity and peace will disappear.</p>
              <p className="p-4 bg-blue-100 text-blue-900 font-bold rounded-lg border border-blue-200">
                Life will be lived in constant turmoil until repentance comes.
              </p>
            </div>
          </div>
        ),
      },
      {
        content: (
          <div className="space-y-12 flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Book className="w-12 h-12 text-blue-600" />
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-blue-800">
                THE SOLUTION TO DIVISION IN AMERICA
              </h2>
              <div className="h-1 w-24 bg-blue-500 mx-auto my-6"></div>
              <h3 className="text-3xl font-bold text-gray-900">MAKE LOVE YOUR AIM</h3>
            </div>

            <div className="mt-12 py-3 px-8 border-2 border-dashed border-blue-400 rounded-full text-blue-500 font-bold text-sm tracking-widest uppercase">
              Not For Sale
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'medicine-without-medication',
    title: 'Medicine Without Medication',
    author: 'MOSES ADEREMI AKANBI OWOEYE',
    description:
      'A readable text edition of Medicine Without Medication, available online with the original PDF for download.',
    type: 'E-Book',
    coverImage: '/publications/universal-cover.png',
    pageCount: 95,
    loadPages: async () =>
      (await import('./medicine-without-medication-pages.json')).default as PublicationPage[],
    pdfUrl: '/publications/medicine-without-medication.pdf',
  },
  {
    id: 'benefits-of-moringa',
    title: 'The Benefits of Moringa',
    author: 'Practical Love Publications',
    description:
      'Discover the 16 remarkable health benefits of Moringa oleifera, nature\'s most nutrient-rich plant. From boosting immunity and promoting energy to supporting healthy skin and digestion.',
    type: 'E-Book',
    coverImage: '/publications/universal-cover.png',
    pdfUrl: '/publications/benefits-of-moringa.pdf',
    pages: [
      {
        title: 'Cover',
        content: (
          <div className="space-y-8 flex flex-col items-center justify-center h-full text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
              A Practical Love Publication
            </p>
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-bold text-red-900 leading-tight">
                THE BENEFITS OF
                <br />
                <span className="text-orange-700">MORINGA</span>
              </h1>
              <div className="h-1 w-20 bg-orange-500 mx-auto my-4" />
              <p className="text-xl text-gray-600 italic">
                Nature&rsquo;s Most Nutrient-Rich Plant
              </p>
            </div>
            <div className="mt-8 py-3 px-8 border-2 border-dashed border-orange-400 rounded-full text-orange-500 font-bold text-sm tracking-widest uppercase">
              Free to distribute
            </div>
          </div>
        ),
      },
      {
        title: 'Introduction',
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-red-800 mb-4">Introduction</h2>
            <p className="text-lg leading-relaxed text-gray-800">
              Moringa oleifera, often called the &ldquo;miracle tree&rdquo; or &ldquo;tree of
              life,&rdquo; is one of the most nutrient-dense plants ever discovered. Native to
              parts of Africa and Asia, Moringa has been used for centuries in traditional medicine
              and nutrition.
            </p>
            <p className="text-lg leading-relaxed text-gray-800">
              Moringa leaf boosts your energy in a natural manner, and is a remarkable source of
              nutrition. This energy promotion does not happen because of sugar, so it lasts for a
              long time. Individuals ingesting it say that their ulcers are healed, tumors
              restricted, there are reductions in arthritis pains and inflammations, controlled
              blood pressure, skin problems are restored, and finally they have stronger defenses
              against diseases.
            </p>
            <blockquote className="border-l-4 border-orange-400 pl-4 py-2 italic text-orange-700">
              &ldquo;The problem with nutrition is not the quantity of food, but the quality of food
              we eat, with people needing about 40 different nutrients to be healthy.&rdquo;
              <br />
              <span className="text-sm text-gray-500 not-italic">
                &mdash; Prof. Mike Golden, United Nations nutrition advisor
              </span>
            </blockquote>
          </div>
        ),
      },
      {
        title: 'The 16 Benefits',
        content: (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-red-800 mb-6">
              The 16 Benefits of Moringa
            </h2>
            <p className="text-gray-700 mb-4">
              Here are the benefits of continuous intake of Moringa:
            </p>
            <ol className="space-y-3 list-decimal list-inside text-gray-800">
              <li>Increases the natural defenses of the body</li>
              <li>Provides nourishment to the eyes and the brain</li>
              <li>Promotes metabolism with bio-available ingredients</li>
              <li>Promotes the cell structure of the body</li>
              <li>Promotes natural serum cholesterol</li>
              <li>Lowers the appearance of wrinkles and fine lines</li>
              <li>Promotes the normal functioning of the liver and the kidney</li>
              <li>Beautifies the skin</li>
              <li>Promotes energy</li>
              <li>Promotes proper digestion</li>
              <li>Acts as an antioxidant</li>
              <li>Takes care of the immune system of the body</li>
              <li>Promotes healthy circulatory system</li>
              <li>It is an anti-inflammatory</li>
              <li>Gives a feeling of general wellness</li>
              <li>Supports the normal sugar levels of the body</li>
            </ol>
          </div>
        ),
      },
      {
        title: 'Nutritional Comparison',
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-red-800 mb-6">
              Nutritional Powerhouse
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-red-900 text-white">
                    <th className="px-4 py-3 rounded-tl-lg">Nutrient</th>
                    <th className="px-4 py-3">Moringa Comparison</th>
                    <th className="px-4 py-3 rounded-tr-lg">Health Impact</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  <tr className="bg-orange-50">
                    <td className="px-4 py-3 font-semibold">Vitamin A</td>
                    <td className="px-4 py-3">4x more than carrots</td>
                    <td className="px-4 py-3">Shields against eye and skin disease</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">Vitamin C</td>
                    <td className="px-4 py-3">7x more than oranges</td>
                    <td className="px-4 py-3">Fights colds and flu</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="px-4 py-3 font-semibold">Calcium</td>
                    <td className="px-4 py-3">4x more than milk</td>
                    <td className="px-4 py-3">Builds strong bones and teeth</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">Potassium</td>
                    <td className="px-4 py-3">3x more than bananas</td>
                    <td className="px-4 py-3">Promotes brain and nerve function</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="px-4 py-3 font-semibold">Protein</td>
                    <td className="px-4 py-3">2x more than yogurt</td>
                    <td className="px-4 py-3">Builds and repairs body tissues</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">Iron</td>
                    <td className="px-4 py-3">3x more than spinach</td>
                    <td className="px-4 py-3">Combats anemia, carries oxygen</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
      },
      {
        title: 'Closing',
        content: (
          <div className="space-y-8 flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-3xl font-bold text-red-800">A Bridge to Better Health</h2>
            <p className="text-lg leading-relaxed text-gray-800 max-w-xl">
              The bridge to better health is through better nutrition. Moringa oleifera stands as
              one of nature&rsquo;s most complete nutritional sources, offering a remarkable
              combination of vitamins, minerals, amino acids, and antioxidants in a single,
              natural plant.
            </p>
            <blockquote className="border-l-4 border-orange-400 pl-4 py-2 italic text-orange-700 text-xl">
              &ldquo;Let food be thy medicine and medicine be thy food.&rdquo;
              <br />
              <span className="text-sm text-gray-500 not-italic">&mdash; Hippocrates</span>
            </blockquote>
            <div className="h-px w-48 bg-orange-400 my-4" />
            <p className="text-sm text-gray-500">
              Source: leafpower.wordpress.com | practicalove.com
            </p>
            <p className="text-sm text-gray-500 italic">
              Feel free to reproduce and distribute this publication freely.
            </p>
          </div>
        ),
      },
    ],
  },
];
