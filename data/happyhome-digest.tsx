import { Users, Star, AlertTriangle, Shield, Crown } from 'lucide-react';
import { PublicationProps } from './publications';

export const happyHomeDigest: PublicationProps = {
  id: 'happy-home-digest-vol-1-no-4',
  title: 'Happy Home Digest Vol. 1 No. 4',
  author: 'Family Intercessors Ministry',
  description:
    'Features articles on navigating marital storms, overcoming barrenness, understanding the wise woman, and protecting your glory as a youth.',
  type: 'Book',
  coverImage: '/backgrounds/reader-bg.png',
  images: [
    'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505672675380-41225d7b87d3?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop',
  ],
  pages: [
    {
      content: (
        <div className="text-center space-y-8 animate-in fade-in duration-700">
          <div className="border-b-4 border-orange-500 pb-6 mb-8">
            <h3 className="text-xl text-orange-600 font-bold uppercase tracking-widest mb-2">
              A Publication of
            </h3>
            <h1 className="text-4xl md:text-5xl font-serif font-black text-red-900 leading-tight">
              FAMILY INTERCESSORS MINISTRY
            </h1>
            <div className="flex justify-center items-center gap-4 mt-4 text-gray-600 font-medium">
              <span>Vol. 1</span>
              <span className="w-2 h-2 rounded-full bg-orange-400"></span>
              <span>No. 4</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left py-8">
            <img
              src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=800&auto=format&fit=crop"
              alt="Happy Family"
              className="rounded-lg shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 object-cover h-96 w-full"
            />
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold text-gray-800 border-b-2 border-dashed border-gray-300 pb-2">
                In This Edition
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start group">
                  <Star className="w-6 h-6 text-orange-500 mr-3 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Who is a Wise Woman?</h4>
                    <p className="text-sm text-gray-600">Discover the traits that build a home.</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <AlertTriangle className="w-6 h-6 text-red-500 mr-3 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">
                      Various Storms That Trouble Marriages
                    </h4>
                    <p className="text-sm text-gray-600">Their origin, evils, and solution.</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <Users className="w-6 h-6 text-blue-500 mr-3 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Barrenness: The Way Out</h4>
                    <p className="text-sm text-gray-600">Overcoming the problem through faith.</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <Crown className="w-6 h-6 text-purple-500 mr-3 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Youth's Parliament</h4>
                    <p className="text-sm text-gray-600">Let no-one steal your glory.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Various Storms That Trouble Families',
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-red-900 text-center mb-8">
            VARIOUS STORMS THAT TROUBLE FAMILIES
          </h2>

          <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500 mb-8 italic text-gray-700">
            "6 KINDS OF STORMS THAT TROUBLE HOMES: Their origin, the evils they do, and how to
            overcome them."
          </div>

          <div className="space-y-4 text-lg leading-relaxed text-gray-800">
            <h3 className="text-2xl font-bold text-gray-900 mt-6">
              The Enterprise Tornado Incident
            </h3>
            <p>
              Thursday, March 1, 2007 was a terrible day that many people in Enterprise, a town in
              Alabama, USA, would not forget in a hurry. On that fateful day, people went about
              their normal businesses... Nobody had a premonition that a terrible and very
              destructive storm, Tornado, had chosen that day to threaten the peace of the town.
            </p>
            <p>
              Shortly after 11 o’clock in the morning, the radio and television stations began to
              issue storm warnings... When the dreaded storm landed, it headed straight for
              Enterprise High School. Its speed was about 100 miles per hour...
            </p>
            <p>
              It destroyed properties worth several millions of dollars... It ravaged residential
              buildings, supermarkets, industries and business concerns. It rendered many people
              homeless, many people jobless...
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold text-red-800 mb-4">A Storm-Filled World</h3>
            <p className="text-lg text-gray-800">
              A storm-filled world, full of different kinds of storms that break homes and turn the
              fortunes of many, making the rich poor and the poor poorer. Storms often strike so
              hard. There are many storms in the lives of people, in homes and marriages.
            </p>
            <p className="text-lg text-gray-800 mt-4">
              In this edition of Happy Home Digest, our focus of discussion is on the various storms
              that trouble homes and families. The six storms are:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {[
                'Natural Storm',
                'Satanic Storm',
                "In-laws' Storm",
                "Government's Storm",
                'Interpersonal Storm',
                'Self-inflicted Storm',
              ].map((storm, idx) => (
                <li
                  key={idx}
                  className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm font-semibold text-gray-800 flex items-center"
                >
                  <span className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                    {idx + 1}
                  </span>
                  {storm}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: 'A Sure Shelter',
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-blue-900 text-center mb-8">
            A SURE SHELTER IN THE TIME OF STORM
          </h2>

          <div className="prose prose-lg max-w-none text-gray-800">
            <p>
              Welcome to another refreshing edition of Happy Home Digest. It is our prayer that the
              good Lord will fill your life and home with joy and gladness in Jesus name.
            </p>
            <p>
              It is important to note that all the storms that trouble mankind, some are visible and
              some are invisible, so that no-one could pass through life without experiencing a
              storm.
            </p>

            <div className="bg-blue-50 p-8 rounded-2xl my-8 text-center relative overflow-hidden">
              <Shield className="w-24 h-24 text-blue-100 absolute top-[-20px] left-[-20px]" />
              <p className="font-serif italic text-xl text-blue-900 relative z-10">
                "From every stormy winds that blows,
                <br />
                From every swelling tide of woes,
                <br />
                There is a calm, a pure retreat,
                <br />
                ‘Tis found beneath the mercy seat."
              </p>
              <p className="text-sm font-bold text-blue-600 mt-4">— H. Stowell</p>
            </div>

            <p className="font-semibold">
              There is only one name that is given in the storms of life and that name is{' '}
              <span className="text-red-600">Jesus Christ</span>. It is only Jesus that can give
              shelter in the time of storm. (Philip 2:9-11).
            </p>

            <div className="bg-gray-100 p-6 rounded-lg mt-8">
              <h4 className="font-bold text-gray-900 mb-2">Editor's Note:</h4>
              <p className="text-sm text-gray-600">
                In this issue, we discuss infertility, "The Wise Woman", and "Let no-one steal your
                glory". We thank all our supporters. Peace be unto you.
              </p>
              <p className="font-bold text-gray-800 mt-2 text-right">
                — Pastor Tayo O. Odesola, Editor-in-Chief
              </p>
            </div>
          </div>
          <div className="mt-8 border-t pt-4 text-center">
            <p className="font-bold text-gray-700">Family Intercessors Ministry</p>
            <p className="text-sm text-gray-500">
              5 Samuel Close, Leyin Ibadan City Polytechnic, Sango, Ibadan, Ile-Ife, Osun State.
            </p>
            <p className="text-orange-600 font-bold mt-2">08055122273, 08088994003, 08142305335</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Types of Storms',
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding the Storms</h2>

          <div className="space-y-8">
            <section className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-purple-500">
              <h3 className="text-2xl font-bold text-purple-700 mb-3">
                Interpersonal (Husband-Wife) Storm
              </h3>
              <p className="text-gray-700 leading-relaxed">
                These storms don’t often hit all marriages the same way... These storms may not be
                experienced at all by some couples until the wedding night. But, get this clear,
                no-one can walk across this life’s stage without feeling the bitter effects of some
                of these storms sooner or later.
              </p>
            </section>

            <section className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-500">
              <h3 className="text-2xl font-bold text-green-700 mb-3">Natural Storm</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                This is a universal storm that everyone will experience... It may be triggered by
                certain faults we inherited from our parents or marital faults that are
                character-defects.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  'Anger',
                  'Envy',
                  'Narrow-mindedness',
                  'Selfishness',
                  'Pride',
                  'Covetousness',
                  'Greed',
                  'Lying',
                  'Deceit',
                ].map(fault => (
                  <span
                    key={fault}
                    className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {fault}
                  </span>
                ))}
              </div>
              <h4 className="font-bold text-gray-900 mt-4">Storms in Adam's Home</h4>
              <p className="text-gray-700 mt-2">
                Adam and Eve were the first couple to experience natural storm when their firstborn,
                Cain, killed his brother Abel. Where did Cain learn this? He was born with a blood
                already running in his veins... "All have sinned" (Rom 3:23).
              </p>
            </section>

            <section className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-orange-500">
              <h3 className="text-2xl font-bold text-orange-700 mb-3">Self-inflicted Storm</h3>
              <p className="text-gray-700 leading-relaxed">
                Self-inflicted storm is the kind of storm that people bring upon themselves by their
                own actions. When people disobey God’s commandments, they bring storms upon
                themselves.
              </p>
            </section>
          </div>
        </div>
      ),
    },
    {
      title: 'Barrenness: The Way Out',
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-pink-700 text-center mb-2">
            BARRENNESS: THE WAY OUT
          </h2>
          <p className="text-center text-gray-500 italic mb-8">
            By Pastor (Mrs) Florence T. Ologbon
          </p>

          <div className="prose prose-lg max-w-none text-gray-800">
            <div className="bg-pink-50 p-6 rounded-xl mb-6">
              <h4 className="font-bold text-pink-900 mb-2">A Testimony of Faith</h4>
              <p className="text-sm">
                After five years of waiting on the Lord, a family faced rejection. The husband stood
                by his wife. Eventually, God blessed them with a baby, then another pregnancy, and
                eventually twins! The family who rejected her returned to embrace her.
              </p>
            </div>

            <h3 className="font-bold text-gray-900 text-xl mt-6">Challenges of Barrenness</h3>
            <p>
              It is a fact that marriage is designed by God to be a source of joy... In Genesis
              30:1, Rachel cried, "Give me children, or else I die!"
            </p>
            <p className="font-bold text-green-700 my-4 text-center text-xl">
              "You shall weep no more" (Isaiah 30:19)
            </p>

            <h3 className="font-bold text-gray-900 text-xl mt-6">Two Types of Infertility</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Primary Infertility:</strong> Unable to get pregnant after at least one
                year.
              </li>
              <li>
                <strong>Secondary Infertility:</strong> Unable to get pregnant after having had at
                least one pregnancy.
              </li>
            </ol>

            <h3 className="font-bold text-gray-900 text-xl mt-6">The Way Out</h3>
            <p>
              The solution begins with husband and wife accepting the problem as their common
              problem. Seek medical help but don’t put your trust in medical diagnosis alone.
              <strong> Stop crying, doubting and avoid all sinful thoughts.</strong>
            </p>

            <div className="border border-pink-200 rounded-lg p-6 mt-8 text-center bg-white">
              <h4 className="font-bold text-pink-600 mb-2">Don't Lose Hope</h4>
              <p>
                Remember Sarah, Rebecca, and Elizabeth. Your case has a definite end. In Jesus name.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Women's World",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
              Women's World
            </span>
            <h2 className="text-3xl font-serif font-bold text-purple-900 mt-4">
              WHO IS A WISE WOMAN?
            </h2>
            <p className="text-gray-500 mt-2">By Evang (Mrs.) Esther O. Odesola</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">1. Fear of God</h3>
              <p className="text-gray-700">
                "The fear of the Lord is the beginning of wisdom." A wise woman always has the fear
                of God in her heart, showing reverence in her speech and deeds.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">2. Considers the End</h3>
              <p className="text-gray-700">
                A wise woman thinks about the outcome before she acts. Unlike Queen Vashti who lost
                her position due to pride and refusal to submit (Esther 1), a wise woman does not
                engage in power contests publicly.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">3. Speaks with Wisdom</h3>
              <p className="text-gray-700">
                She opens her mouth with wisdom, and on her tongue is the law of kindness (Proverbs
                31:26). She is not an "angry woman" but one full of grace.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-purple-800 mb-2">Abigail: A Role Model</h3>
              <p className="text-sm text-gray-700">
                Abigail was the wife of a difficult man, Nabal. Yet, she averted destruction by
                using gentle words to pacify a king. She knew what to say and how to say it.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Youth's Parliament",
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Crown className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-gray-900 uppercase">Youth's Parliament</h2>
          </div>

          <h3 className="text-4xl font-black text-center text-red-600 mb-8 leading-tight">
            LET NO-ONE STEAL YOUR GLORY
          </h3>

          <div className="prose prose-lg max-w-none text-gray-800">
            <p className="font-medium text-lg text-center mx-auto max-w-2xl">
              "You have crowned him with glory and honour" (Psalm 8:3). God deposited His glory in
              you. But beware: <strong>glory-snatchers</strong> are real.
            </p>

            <div className="grid gap-6 mt-8">
              <div className="bg-white border-l-4 border-red-500 shadow-sm p-6">
                <h4 className="font-bold text-red-700 text-lg">
                  Shechem stole Dinah's glory (Gen 34)
                </h4>
                <p>
                  Dinah stepped into the territory of unbelievers and lost her glory to Shechem. It
                  brought destruction.
                </p>
              </div>
              <div className="bg-white border-l-4 border-red-500 shadow-sm p-6">
                <h4 className="font-bold text-red-700 text-lg">Amnon stole Tamar's glory</h4>
                <p>
                  Amnon, her half-brother, feigned love but only wanted to steal her glory. Once
                  taken, he hated her.
                </p>
              </div>
              <div className="bg-white border-l-4 border-green-500 shadow-sm p-6">
                <h4 className="font-bold text-green-700 text-lg">
                  But Joseph Kept His Glory (Gen 39)
                </h4>
                <p>
                  Potiphar's wife tried to steal it, but Joseph fled. He went to prison with his
                  glory intact and God exalted him.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-8 mt-10">
              <h4 className="text-2xl font-bold text-center text-yellow-800 mb-6">
                How to Protect Your Glory
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="font-bold text-yellow-600">1.</span>
                  <span>
                    <strong>Mind your company:</strong> "He who walks with the wise will be wise."
                    Don't move with the immoral.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-yellow-600">2.</span>
                  <span>
                    <strong>Avoid isolation:</strong> Never go into a man's room alone.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-yellow-600">3.</span>
                  <span>
                    <strong>Flee Fornication:</strong> Do like Joseph. Take to your heels.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-yellow-600">4.</span>
                  <span>
                    <strong>Be Watchful & Prayerful:</strong> Keep your vigil against
                    glory-snatchers.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Conclusion & People's Parliament",
      content: (
        <div className="space-y-8">
          <div className="bg-gray-100 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">
              People's Parliament: A Widow's Dilemma
            </h3>
            <p className="text-gray-700 mb-4">
              <strong>The Case:</strong> Comfort, a widow, is being pressured by her in-laws to
              marry her late husband's junior brother (who already has a wife). They are also
              demanding the title deed to her house.
            </p>
            <p className="text-sm font-bold text-gray-600">
              What should Comfort do? Send your advice to: happyhomedigest2001@yahoo.com
            </p>
          </div>

          <div className="bg-blue-50 p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Overcoming the Storm</h2>
            <p className="text-lg text-gray-700 mb-6">
              "If your marriage is troubled by any storm whatsoever, the Lord who restored Job’s
              glory is there for you."
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
              <div className="bg-white p-4 rounded shadow-sm">
                <span className="block font-bold text-blue-600 mb-1">Step 1</span>
                Praise God your Creator.
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <span className="block font-bold text-blue-600 mb-1">Step 2</span>
                Resolve conflicts. Seek a mediator if needed.
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <span className="block font-bold text-blue-600 mb-1">Step 3</span>
                Investigate the storm-triggers (Sin, Self, Satan).
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <span className="block font-bold text-blue-600 mb-1">Step 4</span>
                Fast and pray fervently together.
              </div>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-gray-200">
            <h4 className="font-bold text-gray-900 text-lg">
              Thank you for reading Happy Home Digest
            </h4>
            <p className="text-gray-600">Vol. 1 No. 4</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <img
              src="https://images.unsplash.com/photo-1505672675380-41225d7b87d3?q=80&w=400&auto=format&fit=crop"
              className="rounded shadow-md hover:scale-105 transition-transform h-32 w-full object-cover"
              title="Storms"
            />
            <img
              src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=400&auto=format&fit=crop"
              className="rounded shadow-md hover:scale-105 transition-transform h-32 w-full object-cover"
              title="New Life"
            />
            <img
              src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=400&auto=format&fit=crop"
              className="rounded shadow-md hover:scale-105 transition-transform h-32 w-full object-cover"
              title="Wisdom"
            />
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=400&auto=format&fit=crop"
              className="rounded shadow-md hover:scale-105 transition-transform h-32 w-full object-cover"
              title="Youth"
            />
          </div>
        </div>
      ),
    },
  ],
};
