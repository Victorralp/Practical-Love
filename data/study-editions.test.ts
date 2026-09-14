import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadStudyEdition } from './study-editions';

const editionsDir = join(__dirname, 'study-editions');
const files = readdirSync(editionsDir).filter(name => name.endsWith('.json'));

interface RawBlock {
  type?: unknown;
  text?: unknown;
  ref?: unknown;
  ordered?: unknown;
  items?: unknown;
}

interface RawSection {
  title?: unknown;
  pdfPage?: unknown;
  blocks?: unknown;
}

interface RawEdition {
  id?: unknown;
  title?: unknown;
  author?: unknown;
  subtitle?: unknown;
  callout?: unknown;
  sections?: unknown;
}

function read(name: string): RawEdition {
  return JSON.parse(readFileSync(join(editionsDir, name), 'utf8')) as RawEdition;
}

describe('study edition data', () => {
  it('has at least one edition to check', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)('%s has the fields the reader and the PDF script both need', name => {
    const edition = read(name);

    expect(edition.id).toBe(name.replace(/\.json$/, ''));
    for (const field of ['title', 'author', 'subtitle', 'callout'] as const) {
      expect(typeof edition[field]).toBe('string');
      expect((edition[field] as string).length).toBeGreaterThan(0);
    }
    expect(Array.isArray(edition.sections)).toBe(true);
    expect((edition.sections as unknown[]).length).toBeGreaterThan(0);
  });

  it.each(files)('%s has well formed sections and blocks', name => {
    const sections = read(name).sections as RawSection[];

    for (const section of sections) {
      expect(typeof section.title).toBe('string');
      expect((section.title as string).length).toBeGreaterThan(0);
      expect(Array.isArray(section.blocks)).toBe(true);
      expect((section.blocks as unknown[]).length).toBeGreaterThan(0);

      for (const block of section.blocks as RawBlock[]) {
        switch (block.type) {
          case 'h':
          case 'p':
          case 'callout':
          case 'original':
            expect(typeof block.text).toBe('string');
            break;
          case 'scripture':
            expect(typeof block.text).toBe('string');
            // The reader prints the reference as given, so it must name the translation.
            expect(block.ref).toMatch(/\(KJV\)$/);
            break;
          case 'list':
            expect(typeof block.ordered).toBe('boolean');
            expect(Array.isArray(block.items)).toBe(true);
            expect((block.items as unknown[]).length).toBeGreaterThan(0);
            for (const item of block.items as unknown[]) {
              expect(typeof item).toBe('string');
            }
            break;
          default:
            throw new Error(`${name}: unknown block type ${String(block.type)}`);
        }
      }
    }
  });

  it.each(files)('%s leaves no unpaired bold or italic markers', name => {
    const texts: string[] = [];
    for (const section of read(name).sections as RawSection[]) {
      for (const block of section.blocks as RawBlock[]) {
        if (typeof block.text === 'string') texts.push(block.text);
        if (Array.isArray(block.items)) texts.push(...(block.items as string[]));
      }
    }

    for (const text of texts) {
      // inline() in study-editions.tsx splits on ** and * pairs; an odd count
      // would leak a literal asterisk into the page.
      expect((text.match(/\*/g) ?? []).length % 2).toBe(0);
    }
  });
});

describe('loadStudyEdition', () => {
  it('turns every section into a publication page', async () => {
    const name = files[0];
    const edition = read(name);
    const pages = await loadStudyEdition(async () => ({ default: edition }))();
    const sections = edition.sections as RawSection[];

    expect(pages).toHaveLength(sections.length);
    expect(pages[0].title).toBe(sections[0].title);
    expect(pages[0].content).toBeTruthy();
  });

  it('carries the generated pdfPage through as the source page number', async () => {
    const pages = await loadStudyEdition(async () => ({
      default: {
        sections: [{ title: 'Section', pdfPage: 7, blocks: [{ type: 'p', text: 'Body' }] }],
      },
    }))();

    expect(pages[0].sourcePageNumber).toBe(7);
  });
});
