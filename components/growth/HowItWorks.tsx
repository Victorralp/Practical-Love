/** The short "how this tool works" note at the foot of each growth tool. */
export default function HowItWorks({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-[clamp(32px,5vw,48px)] rounded-[28px] bg-pl-ink p-[clamp(24px,4vw,40px)] text-white">
      <h3 className="m-0 text-[clamp(24px,2.6vw,32px)] font-extrabold tracking-[-0.03em]">{title}</h3>
      <ul className="mb-0 mt-4 grid list-none gap-x-8 gap-y-3 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
        {items.map(item => (
          <li key={item} className="flex gap-3 text-[16px] leading-[1.5] text-pl-ondark">
            <span aria-hidden="true" className="text-pl-coral">
              ♥
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
