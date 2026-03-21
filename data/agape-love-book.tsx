import { BookOpen, Heart, Home, Sparkles, Users } from 'lucide-react';
import type { PublicationProps } from './publications';

const coverImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Group_Hug_%288737565975%29.jpg/1280px-Group_Hug_%288737565975%29.jpg';

function internetFigure({
  alt,
  caption,
  creditHref,
  creditLabel,
  imageUrl,
}: {
  alt: string;
  caption: string;
  creditHref: string;
  creditLabel: string;
  imageUrl: string;
}) {
  return (
    <figure className="not-prose overflow-hidden rounded-[1.75rem] border border-orange-100 bg-stone-950 shadow-[0_28px_70px_rgba(120,53,15,0.18)]">
      <img src={imageUrl} alt={alt} className="h-[260px] w-full object-cover md:h-[340px]" />
      <figcaption className="space-y-3 border-t border-white/10 px-6 py-5 text-sm text-stone-200">
        <p>{caption}</p>
        <a
          href={creditHref}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-orange-200 transition-colors hover:text-orange-100"
        >
          Image source: {creditLabel}
        </a>
      </figcaption>
    </figure>
  );
}

const sevenCharacteristics = [
  {
    number: '01',
    title: 'Agape Love Means Action',
    statement: 'Agape love means action, not just a benign attitude.',
    explanation:
      'Love is not complete when it stays in the mind. It becomes visible when it takes shape in service, patience, sacrifice, and timely help.',
    practice: ['Call someone and follow through on what they need.', 'Turn concern into a concrete act today.'],
  },
  {
    number: '02',
    title: 'Agape Love Means Involvement',
    statement:
      'Agape love means involvement, not just a comfortable detachment from the needs of others.',
    explanation:
      'Agape does not stand at a safe distance. It notices burdens, steps closer, and chooses compassion over convenience.',
    practice: ['Listen without rushing people.', 'Enter another person’s situation with prayer, attention, and practical care.'],
  },
  {
    number: '03',
    title: 'Agape Love Loves the Unlovable',
    statement:
      'Agape love means unconditionally loving the unlovable, the undeserving, and the unresponsive.',
    explanation:
      'This is where agape moves beyond preference. It loves people who are difficult, wounded, disappointing, or slow to change.',
    practice: ['Respond gently where you expected rejection.', 'Refuse to make usefulness the price of love.'],
  },
  {
    number: '04',
    title: 'Agape Love Is Commitment',
    statement: 'Agape love means permanent commitment to the object of one’s love.',
    explanation:
      'Agape is not unstable. It does not disappear when feelings drop. It stays rooted in covenant, responsibility, and faithfulness.',
    practice: ['Keep your word.', 'Let your loyalty speak louder than your mood.'],
  },
  {
    number: '05',
    title: 'Agape Love Gives Constructively',
    statement:
      'Agape love means constructive purpose giving based not on blind sentimentality but on the knowledge of the best for the beloved.',
    explanation:
      'Real love is wise. It gives in ways that heal, strengthen, and guide rather than simply making people comfortable for a moment.',
    practice: ['Give what helps growth, not only what brings applause.', 'Ask what will truly bless this person in the long run.'],
  },
  {
    number: '06',
    title: 'Agape Love Is Consistent',
    statement:
      'Agape love means consistency of behaviour showing an ever-present concern for the beloved highest good or goals.',
    explanation:
      'Agape does not act kindly once and disappear. It carries a steady pattern of care that seeks the other person’s true good.',
    practice: ['Make your care dependable.', 'Build habits of encouragement, truth, and presence.'],
  },
  {
    number: '07',
    title: 'Agape Love Blesses Widely',
    statement:
      'Agape love is the chief means and the best way of blessing God, your spouse, your family both physical and spiritual, your neighbours, your enemies, and yourself.',
    explanation:
      'Agape stretches across every relationship. It is not reserved for easy people. It becomes a way of life that blesses God and touches every circle around you.',
    practice: ['Practice love at home first.', 'Extend the same spirit to neighbours, strangers, and opponents.'],
  },
];

export const agapeLoveBook: PublicationProps = {
  id: 'seven-characteristics-of-agape-love',
  title: 'Seven Characteristics of Agape Love',
  author: 'Practical Love Ministry Resource',
  description:
    'A 12-page readable booklet built from the Agape Love sheet, expanded into a clearer study-and-practice guide.',
  type: 'E-Book',
  coverImage,
  pages: [
    {
      title: 'Seven Characteristics of Agape Love',
      content: (
        <div className="space-y-10">
          <div className="not-prose overflow-hidden rounded-[2rem] bg-gradient-to-br from-red-900 via-orange-800 to-amber-700 text-white shadow-[0_30px_80px_rgba(127,29,29,0.35)]">
            <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-8 p-8 md:p-12">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium tracking-[0.2em] uppercase">
                  <Heart className="h-4 w-4" />
                  Readable Booklet
                </div>
                <div className="space-y-5">
                  <p className="text-sm uppercase tracking-[0.4em] text-orange-100">
                    Practical Love Series
                  </p>
                  <h1 className="font-serif text-4xl font-bold leading-tight md:text-6xl">
                    Seven Characteristics of Agape Love
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-orange-50/90">
                    A clearer, slower, more readable version of the Agape Love sheet, arranged as
                    a 12-page guide for reflection, teaching, and daily practice.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-orange-100">Core</p>
                    <p className="mt-2 text-xl font-semibold">7 Traits</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-orange-100">Format</p>
                    <p className="mt-2 text-xl font-semibold">12 Pages</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-orange-100">Use</p>
                    <p className="mt-2 text-xl font-semibold">Study + Action</p>
                  </div>
                </div>
              </div>
              <img src={coverImage} alt="People embracing in a group hug." className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Why This Booklet Exists',
      content: (
        <div className="space-y-8">
          {internetFigure({
            alt: 'People walking outdoors together for exercise.',
            caption:
              'Agape is not an abstract topic. It becomes visible in how people walk with, carry, and remain present for one another.',
            creditHref: 'https://commons.wikimedia.org/wiki/File:Walkingexercise.jpg',
            creditLabel: 'Walkingexercise',
            imageUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Walkingexercise.jpg/1280px-Walkingexercise.jpg',
          })}
          <p>
            Agape love is often spoken about in broad or spiritual terms, but many people still
            need a plain, practical picture of what it looks like in everyday life. This booklet
            slows the idea down and turns it into something readable and usable.
          </p>
          <p>
            The original sheet gives seven concise statements. Here, those same ideas are arranged
            into a book format so a reader can absorb them one by one, meditate on them, and apply
            them in family life, ministry, friendship, and society.
          </p>
          <div className="not-prose grid gap-4 rounded-[1.75rem] bg-orange-50 p-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <BookOpen className="h-6 w-6 text-red-600" />
              <p className="mt-3 font-semibold text-gray-900">Read slowly</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                One characteristic at a time is enough for deep reflection.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <Users className="h-6 w-6 text-red-600" />
              <p className="mt-3 font-semibold text-gray-900">Discuss together</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Use it in family devotion, small groups, or mentoring conversations.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <Sparkles className="h-6 w-6 text-red-600" />
              <p className="mt-3 font-semibold text-gray-900">Act on it</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Every page ends in behaviour, not theory alone.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    ...sevenCharacteristics.slice(0, 3).map(item => ({
      title: item.title,
      content: (
        <div className="space-y-8">
          <div className="not-prose rounded-[1.75rem] border border-orange-100 bg-gradient-to-br from-red-50 via-white to-orange-50 p-8 shadow-[0_24px_60px_rgba(120,53,15,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-600">
              Characteristic {item.number}
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
              {item.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-700">{item.statement}</p>
          </div>
          <p>{item.explanation}</p>
          <div className="not-prose grid gap-4 md:grid-cols-2">
            {item.practice.map(point => (
              <div key={point} className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                  Practice
                </p>
                <p className="mt-3 text-base leading-7 text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    })),
    {
      title: 'Agape Love Is Commitment',
      content: (
        <div className="space-y-8">
          <div className="not-prose rounded-[1.75rem] border border-orange-100 bg-gradient-to-br from-red-50 via-white to-orange-50 p-8 shadow-[0_24px_60px_rgba(120,53,15,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-600">
              Characteristic 04
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
              Agape Love Is Commitment
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-700">
              Agape love means permanent commitment to the object of one’s love.
            </p>
          </div>
          <p>
            Commitment keeps love from becoming seasonal. It teaches the heart to stay responsible
            even when emotions fluctuate. This does not mean tolerating evil blindly; it means
            refusing to make love temporary, casual, or shallow.
          </p>
          <p>
            In marriage, friendship, parenting, and ministry, people feel safe where love is
            stable. Agape says, &quot;I will not disappear the moment this becomes costly.&quot;
          </p>
        </div>
      ),
    },
    {
      title: 'Agape Love Gives Constructively',
      content: (
        <div className="space-y-8">
          {internetFigure({
            alt: 'Fresh fruits and vegetables displayed together.',
            caption:
              'Constructive love gives what strengthens life. It seeks nourishment, healing, and growth.',
            creditHref:
              'https://commons.wikimedia.org/wiki/File:Fruits_and_Vegetables_(Unsplash).jpg',
            creditLabel: 'Fruits and Vegetables (Unsplash)',
            imageUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Fruits_and_Vegetables_%28Unsplash%29.jpg/1280px-Fruits_and_Vegetables_%28Unsplash%29.jpg',
          })}
          <div className="not-prose rounded-[1.75rem] border border-orange-100 bg-gradient-to-br from-red-50 via-white to-orange-50 p-8 shadow-[0_24px_60px_rgba(120,53,15,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-600">
              Characteristic 05
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
              Agape Love Gives Constructively
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-700">
              Agape love means constructive purpose giving based not on blind sentimentality but on
              the knowledge of the best for the beloved.
            </p>
          </div>
          <p>
            Love is not wise merely because it feels warm. It becomes wise when it asks what will
            actually help another person flourish. Some forms of giving soothe the moment but harm
            the future. Agape chooses better.
          </p>
          <p>
            Constructive love feeds, teaches, corrects, protects, and strengthens. It is tender,
            but it is not careless.
          </p>
        </div>
      ),
    },
    {
      title: 'Agape Love Is Consistent',
      content: (
        <div className="space-y-8">
          <div className="not-prose rounded-[1.75rem] border border-orange-100 bg-gradient-to-br from-red-50 via-white to-orange-50 p-8 shadow-[0_24px_60px_rgba(120,53,15,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-600">
              Characteristic 06
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
              Agape Love Is Consistent
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-700">
              Agape love means consistency of behaviour showing an ever-present concern for the
              beloved highest good or goals.
            </p>
          </div>
          <p>
            Many people have experienced occasional kindness and ongoing neglect. Agape is
            different. It carries a repeated pattern of presence, care, truth, and blessing.
          </p>
          <p>
            Consistency builds trust. It turns love from an event into an atmosphere. People learn
            your love not just by what you said once, but by what you keep doing.
          </p>
        </div>
      ),
    },
    {
      title: 'Agape Love Blesses Widely',
      content: (
        <div className="space-y-8">
          {internetFigure({
            alt: 'A group hug outdoors.',
            caption:
              'Agape is not locked to one circle. It radiates outward into family, neighbours, community, and even difficult relationships.',
            creditHref: 'https://commons.wikimedia.org/wiki/File:Group_Hug_(8737565975).jpg',
            creditLabel: 'Group Hug (8737565975)',
            imageUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Group_Hug_%288737565975%29.jpg/1280px-Group_Hug_%288737565975%29.jpg',
          })}
          <div className="not-prose rounded-[1.75rem] border border-orange-100 bg-gradient-to-br from-red-50 via-white to-orange-50 p-8 shadow-[0_24px_60px_rgba(120,53,15,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-600">
              Characteristic 07
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
              Agape Love Blesses Widely
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-700">
              Agape love is the chief means and the best way of blessing God, your spouse, your
              family both physical and spiritual, your neighbours, your enemies, and yourself.
            </p>
          </div>
          <p>
            This final trait stretches the whole message across every relationship. Agape is not
            complete if it blesses a few favourite people while refusing others. It begins close to
            home, but it cannot stay there.
          </p>
          <div className="not-prose grid gap-4 md:grid-cols-2">
            {['God', 'Spouse', 'Family', 'Neighbours', 'Enemies', 'Yourself'].map(item => (
              <div key={item} className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
                <p className="font-semibold text-gray-900">{item}</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Ask: What would faithful, constructive, active love look like here?
                </p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'Where Agape Must Be Practiced',
      content: (
        <div className="space-y-8">
          {internetFigure({
            alt: 'Older couple walking outdoors.',
            caption:
              'Agape becomes believable when it survives ordinary life: marriage, ageing, family duty, and daily community.',
            creditHref: 'https://commons.wikimedia.org/wiki/File:OlderCoupleWalkg.jpg',
            creditLabel: 'OlderCoupleWalkg',
            imageUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/OlderCoupleWalkg.jpg/1280px-OlderCoupleWalkg.jpg',
          })}
          <div className="not-prose grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-orange-100 bg-white p-6 shadow-sm">
              <Home className="h-6 w-6 text-red-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">At Home</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Speak with patience, keep commitments, and let love be visible in ordinary service.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-orange-100 bg-white p-6 shadow-sm">
              <Users className="h-6 w-6 text-red-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">In Community</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Refuse indifference. Step toward the needy, the lonely, and the overlooked.
              </p>
            </div>
          </div>
          <p>
            If agape love cannot survive ordinary settings, it has not yet become mature. Practice
            it in conversation, correction, generosity, forgiveness, and perseverance. That is how
            a doctrine becomes a way of life.
          </p>
        </div>
      ),
    },
    {
      title: 'Reflection and Prayer',
      content: (
        <div className="space-y-8">
          <div className="not-prose rounded-[1.75rem] bg-gradient-to-br from-red-900 via-orange-800 to-amber-700 p-8 text-white shadow-[0_30px_80px_rgba(127,29,29,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-100">
              Reflection
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">
              Let Love Become Measurable
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-orange-50/90">
              This booklet is useful only if it moves from reading into repentance, prayer, and new
              behaviour.
            </p>
          </div>
          <div className="not-prose grid gap-4 md:grid-cols-2">
            {[
              'Which characteristic is strongest in my life right now?',
              'Which characteristic is weakest?',
              'Where have I been detached instead of involved?',
              'Who needs practical love from me this week?',
            ].map(question => (
              <div key={question} className="rounded-2xl border border-orange-100 bg-orange-50 p-5">
                <p className="text-base leading-7 text-gray-700">{question}</p>
              </div>
            ))}
          </div>
          <blockquote className="border-l-4 border-red-500 pl-6 italic">
            Lord, teach me to love in action, in involvement, in consistency, and in wisdom. Let my
            life become a channel of blessing to You, to my family, to my neighbour, and even to
            those who oppose me.
          </blockquote>
        </div>
      ),
    },
    {
      title: 'Closing Charge',
      content: (
        <div className="space-y-8">
          <div className="not-prose rounded-[2rem] border border-orange-100 bg-white p-8 shadow-[0_24px_60px_rgba(120,53,15,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-600">
              Final Word
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-gray-900 md:text-5xl">
              Make Love Your Aim
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700">
              Let these seven characteristics move beyond the page. Teach them. Practice them.
              Share them. Build your home, your friendships, and your witness around them.
            </p>
          </div>
          <p>
            A short sheet can start a long transformation. Read this again, discuss it with others,
            and let every page become visible in your conduct.
          </p>
          <div className="not-prose rounded-[1.75rem] bg-orange-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
              Share Freely
            </p>
            <p className="mt-3 text-base leading-7 text-gray-700">
              Feel free to reproduce, teach, print, and distribute this message so the practice of
              agape love can spread from person to person, home to home, and nation to nation.
            </p>
          </div>
        </div>
      ),
    },
  ],
};
