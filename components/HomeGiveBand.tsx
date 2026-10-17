import { Link } from 'react-router-dom';
import { Em } from './pl/primitives';

const WAYS = [
  { title: 'Give by transfer', text: 'Send a gift in dollars, pounds or euros straight to the ministry account.' },
  { title: 'Share love cards', text: 'Your gift prints Love Cards and carries them into homes, markets and schools.' },
  { title: 'Reach families', text: 'Help a family feel God’s love through outreach, workshops and prayer.' },
];

/** Home-page donate band, drawn in the redesign style to match the Donate page. */
export default function HomeGiveBand() {
  return (
    <section className="pl-scope bg-pl-blush" aria-labelledby="home-give-title">
      <div className="pl-wrap grid items-center gap-[clamp(32px,5vw,72px)] py-[clamp(56px,8vw,104px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
        <div>
          <p className="pl-eyebrow m-0">Give</p>
          <h2 id="home-give-title" className="pl-h2 mt-3">
            Love that <Em>gives</Em>.
          </h2>
          <p className="pl-lede mt-5 max-w-[38ch]">
            Every gift helps Practical Love share the love of God with families across Nigeria and beyond.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/donate" className="pl-btn pl-btn-red">
              Donate now
            </Link>
            <Link to="/prayer" className="pl-btn pl-btn-outline">
              Visit the prayer wall
            </Link>
          </div>
        </div>
        <ul className="m-0 grid list-none gap-4 p-0">
          {WAYS.map((way, i) => (
            <li
              key={way.title}
              className="rounded-[28px] border-2 border-pl-ink bg-white p-6 shadow-[8px_8px_0_#e1251b]"
            >
              <span className="pl-serif text-[24px] text-pl-red">0{i + 1}</span>
              <h3 className="mb-0 mt-1 text-[22px] font-extrabold tracking-[-0.03em]">{way.title}</h3>
              <p className="mb-0 mt-2 text-[16px] leading-[1.5] text-pl-body">{way.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
