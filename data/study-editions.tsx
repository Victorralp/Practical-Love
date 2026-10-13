import { StudyBlockView, type StudyBlock } from '../components/StudyBlockView';
import type { PublicationPage } from './publications';

// Study editions live in data/study-editions/*.json. The same files feed
// scripts/generate-study-editions.py, which builds the matching PDFs.

interface StudyEdition {
  sections: { title: string; pdfPage?: number; blocks: StudyBlock[] }[];
}

export const loadStudyEdition =
  (importer: () => Promise<{ default: unknown }>) => async (): Promise<PublicationPage[]> => {
    const edition = (await importer()).default as StudyEdition;
    return edition.sections.map(section => ({
      title: section.title,
      sourcePageNumber: section.pdfPage,
      content: (
        <div className="space-y-5 text-lg leading-relaxed text-gray-800">
          {section.blocks.map((block, index) => (
            <StudyBlockView key={index} block={block} />
          ))}
        </div>
      ),
    }));
  };
