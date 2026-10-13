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
        <h3 className="pt-2 font-serif text-2xl font-semibold leading-[1.3] text-red-800">
          {inline(block.text)}
        </h3>
      );
    case 'p':
      return <p>{inline(block.text)}</p>;
    case 'scripture':
      return (
        <blockquote className="rounded-r-2xl border-l-4 border-orange-300 bg-orange-50/60 px-5 py-4">
          <p className="italic text-gray-700">{inline(block.text)}</p>
          <footer className="mt-2 text-right text-sm font-semibold text-red-800">{block.ref}</footer>
        </blockquote>
      );
    case 'original':
      return (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-700">
            From the original leaflet
          </p>
          <p className="whitespace-pre-line">{inline(block.text)}</p>
        </div>
      );
    case 'callout':
      return (
        <p className="rounded-2xl border border-orange-200 bg-orange-50 p-5 text-center font-semibold text-red-800">
          {inline(block.text)}
        </p>
      );
    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag className={`ml-6 space-y-2 ${block.ordered ? 'list-decimal' : 'list-disc'}`}>
          {block.items.map((text, index) => (
            <li key={index}>{inline(text)}</li>
          ))}
        </ListTag>
      );
    }
  }
}
