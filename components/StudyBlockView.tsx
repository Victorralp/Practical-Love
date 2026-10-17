import type { ReactNode } from 'react';

export type StudyBlock =
  | { type: 'h' | 'p' | 'callout' | 'original'; text: string }
  | { type: 'scripture'; text: string; ref: string }
  | { type: 'list'; ordered?: boolean; items: string[] };

// Supports **bold** and *italic*.
function inline(text: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      return part;
    });
}

export function StudyBlockView({ block }: { block: StudyBlock }) {
  switch (block.type) {
    case 'h':
      return (
        <h3 className="pt-[0.4em] text-[1.3em] font-extrabold leading-[1.15] tracking-[-0.03em] text-pl-ink">
          {inline(block.text)}
        </h3>
      );
    case 'p':
      return <p>{inline(block.text)}</p>;
    case 'scripture':
      return (
        <blockquote className="rounded-r-[20px] border-l-4 border-pl-red bg-pl-blush px-5 py-4">
          <p className="pl-serif text-[1.2em] leading-[1.35] text-pl-ink">{inline(block.text)}</p>
          <footer className="mt-3 text-right font-grotesk text-[13px] font-bold uppercase tracking-[0.08em] text-pl-press">
            {block.ref}
          </footer>
        </blockquote>
      );
    case 'original':
      return (
        <div className="grid gap-2 rounded-[20px] border-2 border-pl-hair bg-[#f6eeed] p-5">
          <p className="font-grotesk text-[13px] font-bold uppercase tracking-[0.08em] text-pl-red">
            From the original leaflet
          </p>
          <p className="whitespace-pre-line">{inline(block.text)}</p>
        </div>
      );
    case 'callout':
      return (
        <p className="rounded-[20px] bg-pl-yellow p-5 text-center font-grotesk font-bold leading-[1.4] text-pl-ink">
          {inline(block.text)}
        </p>
      );
    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag className={`ml-6 space-y-2 marker:font-bold marker:text-pl-red ${block.ordered ? 'list-decimal' : 'list-disc'}`}>
          {block.items.map((text, index) => (
            <li key={index}>{inline(text)}</li>
          ))}
        </ListTag>
      );
    }
  }
}
