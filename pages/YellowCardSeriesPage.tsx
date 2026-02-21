import { Download, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero, PageShell } from '../components/ui';
import Logo from '../components/Logo';

export default function YellowCardSeriesPage() {
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

  const passages = [
    '1. Matthew 5:43-45',
    '2. Matthew 19:19',
    '3. Matthew 22:37-39',
    '4. Mark 12:31-33',
    '5. Luke 6:27',
    '6. Luke 6:32-35',
    '7. John 3:16',
    '8. John 13:34-35',
    '9. John 14:15',
    '10. John 14:21-31',
    '11. John 15:9-19',
    '12. Romans 8:28',
    '13. Romans 8:35-39',
    '14. Romans 12:9-10',
    '15. Romans 13:8',
    '16. Romans 13:9',
    '17. Romans 13:10',
    '18. 1 Corinthians 2:9',
    '19. 1 Corinthians 13',
    '20. Galatians 5:6',
    '21. Galatians 5:13-22',
    '22. Ephesians 4:2',
    '23. Ephesians 4:15',
    '24. Ephesians 5:2',
    '25. Ephesians 5:25',
    '26. Ephesians 5:28',
    '27. Ephesians 5:33',
    '28. Colossians 3:14',
    '29. 1 Thessalonians 4:9',
    '30. 1 Timothy 6:10-11',
    '31. 2 Timothy 1:7',
    '32. Titus 2:4',
    '33. Hebrew 6:10',
    '34. Hebrew 10:24',
    '35. Hebrew 13:1',
    '36. James 2:8',
    '37. 1 Peter 3:8',
    '38. 1 Peter 3:10',
    '39. 1 John 5:2-15',
    '40. 1 John 3:14',
    '41. 1 John 3:16-23',
    '42. 1 John 4:7-19',
    '43. 1 John 4:20-21',
    '44. 1 John 5:2-3',
    '45. 2 John 1:1-6',
    '46. 3 John 1:1',
    '47. Jude 1:2',
    '48. Jude 1:21',
    '49. Revelation 2:4',
    '50. Revelation 3:19',
  ];

  const summaryPoints = [
    '1. We do not Love ourselves in Nigeria.',
    '2. To make this worst as stated in (1) above WE ARE STUBBORN IN WICKEDNESS.',
    '3. All families in Nigeria are guilty including my own and your own families.',
    '4. Why? Because Money and Materialism is the language of Love in our homes and families.',
    '5. Love of money is the root of all evils, name any evil you find it in Nigeria.',
    '6. There is a thin line between LOVE of God and LOVE of money; you need to work hard DAILY to be on the side of God, because LOVE of God is the root of all blessings while LOVE of money is the root of all evils.',
    '7. For God so loved the world.',
    '............................................(John 3:16). But take note this includes every human being on this planet NO EXCEPTION',
    '8. The idea of HUSBAND AND WIFE AND FAMILY is from God and God alone.',
    "9. God's love language is in the yellow card in your hand.",
    '0. Any Nigerian who memorize and practicalized the characteristics of Love in his or her family IT IS MANDATORY OR COMPULSORY FOR GOD TO BLESS THAT FAMILY',
  ];

  const familyPoints = [
    'FAMILY (i) Mrs. Ngozi Okonjo-Iweala and her background (ii) Mr. Adesina Akinwunmi (the present president of (AFDB) African Development Bank) trace this to their roots, you will confirm this.',
    '11. If you love your wife and/or wife Love your husband, parents Love their children and children Love your parents based on THIS LANGUAGE OF LOVE IN THE YELLOW CARD IN YOUR HAND, you are honouring God and God says those who honour me I will honour them.',
    "12. Any Nigerian deep or stubborn in corruption and wickedness, trace their roots; they usually don't come from a LOVING AND GODLY/GOD FEARING AND LOVING HOMES/ FAMILIES",
    '13. There is no way something good will come out of Loving and Godly family, that will not impact the family, community, church, mosque and society at large, E.g. Mrs. Ngozi Okonjo-Iweala and Mr. Adesina Akinwunmi of (AFDB)',
  ];

  return (
    <PageShell
      className="bg-gradient-to-b from-yellow-50 via-white to-orange-50"
      containerClassName="max-w-[1400px] py-16 section-gap"
    >
      <PageHero
        className="surface-soft mb-8"
        badge="Printable Series"
        icon={
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center shadow-sm">
            <Logo className="w-6 h-6" />
          </div>
        }
        title="The Yellow Card Series"
        subtitle="Download or print the three-card set: 17 characteristics of love, 50 love passages, and the summary message."
        actions={
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/" className="btn-outline-brand">
              Back to home
            </Link>
            <Link to="/yellow-card" className="btn-brand">
              View single Yellow Card
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Card 1: Characteristics */}
        <div className="surface p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="pill text-sm">Insert your name wherever you see LOVE</p>
              <h2 className="text-xl font-serif text-red-800 mt-2">Characteristics of Love</h2>
            </div>
            <span className="text-xs font-semibold text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
              17 traits
            </span>
          </div>
          <div className="space-y-3 max-h-[620px] overflow-y-auto pr-2">
            {characteristics.map(item => (
              <div
                key={item.num}
                className="flex items-start p-3 rounded-xl border border-orange-100 bg-white hover:border-orange-200 hover:-translate-y-0.5 transition"
              >
                <span className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-red-600 to-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 shadow-sm">
                  {item.num}
                </span>
                <p className="text-sm text-gray-800 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center pt-4 border-t border-orange-100">
            <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide">
              1 Corinthians 13 (Amplified)
            </p>
          </div>
        </div>

        {/* Card 2: Passages */}
        <div className="surface p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="pill text-sm">New Testament</p>
              <h2 className="text-xl font-serif text-red-800 mt-2">50 Love Passages</h2>
            </div>
            <span className="text-xs font-semibold text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
              50 verses
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[620px] overflow-y-auto pr-2">
            {passages.map((text, i) => (
              <div
                key={i}
                className="py-2 px-3 rounded-lg border border-orange-100 bg-white text-sm text-gray-900 hover:border-orange-200 hover:-translate-y-0.5 transition"
              >
                {text}
              </div>
            ))}
          </div>
          <div className="surface-soft p-4 border-l-4 border-red-500">
            <p className="text-sm font-medium text-gray-700">
              Study each verse (1–50) using a Life Application Bible Commentary.
            </p>
            <p className="text-red-700 font-semibold text-sm">Reproduce and give to every Nigerian.</p>
          </div>
        </div>

        {/* Card 3: Summary */}
        <div className="surface p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="pill text-sm">Love Ministry for Nigeria</p>
              <h2 className="text-xl font-serif text-red-800 mt-2">Summary of Message</h2>
            </div>
            <span className="text-xs font-semibold text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
              Quick read
            </span>
          </div>
          <div className="space-y-3 max-h-[620px] overflow-y-auto pr-2">
            {summaryPoints.map((point, i) => (
              <div key={i} className="p-3 rounded-lg border border-orange-100 bg-white text-sm text-gray-900">
                {point}
              </div>
            ))}
            <div className="border-t border-orange-100 pt-3 space-y-3">
              {familyPoints.map((point, i) => (
                <div key={i} className="p-3 rounded-lg border border-orange-100 bg-white text-sm text-gray-900">
                  {point}
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold text-red-700 uppercase tracking-wide">Please turn over</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
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
    </PageShell>
  );
}

