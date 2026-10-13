/**
 * GrowthTipsSection Component
 * Displays a categorized list of growth tips with filtering capability
 * Requirements: 2.1, 2.3
 */

import { useState, useMemo, useRef } from 'react';
import TipCard from './TipCard';
import HowItWorks from './HowItWorks';
import { useStagger } from '../pl/motion';
import { dataService } from '../../services/dataService';
import type { LoveCategory, GrowthTip } from '../../types/growth';
import { TEXT_LINK } from './ui';

const CATEGORIES: { value: LoveCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'patience', label: 'Patience' },
  { value: 'kindness', label: 'Kindness' },
  { value: 'forgiveness', label: 'Forgiveness' },
  { value: 'empathy', label: 'Empathy' },
  { value: 'humility', label: 'Humility' },
  { value: 'trust', label: 'Trust' },
  { value: 'perseverance', label: 'Perseverance' },
];

export default function GrowthTipsSection() {
  const [selectedCategory, setSelectedCategory] = useState<LoveCategory | 'all'>('all');
  const listRef = useRef<HTMLDivElement | null>(null);

  // Get tips from DataService, filtered by category
  const tips: GrowthTip[] = useMemo(() => {
    if (selectedCategory === 'all') {
      return dataService.getTips();
    }
    return dataService.getTipsByCategory(selectedCategory);
  }, [selectedCategory]);

  useStagger(listRef, selectedCategory, { delay: 0 });

  return (
    <div>
      <p className="mb-6 mt-0 max-w-[52ch] text-[18px] leading-[1.5] text-pl-body">
        Practical advice and exercises to help you grow in love and develop stronger relationships.
      </p>

      {/* Category Filter */}
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter tips by category">
        {CATEGORIES.map(category => (
          <button
            key={category.value}
            type="button"
            aria-pressed={selectedCategory === category.value}
            onClick={() => setSelectedCategory(category.value)}
            className="pl-chip"
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Tips Count */}
      <p className="mb-5 mt-0 text-[15px] text-pl-muted" aria-live="polite">
        Showing {tips.length} tip{tips.length !== 1 ? 's' : ''}
        {selectedCategory !== 'all' && ` in ${selectedCategory}`}
      </p>

      {/* Tips List */}
      {tips.length > 0 ? (
        <div ref={listRef} className="space-y-4">
          {tips.map(tip => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] border-2 border-dashed border-pl-input px-6 py-12 text-center">
          <p className="m-0 text-[20px] text-pl-muted">No tips found for this category.</p>
          <button type="button" onClick={() => setSelectedCategory('all')} className={`${TEXT_LINK} mt-3`}>
            View all tips
          </button>
        </div>
      )}

      <HowItWorks
        title="How to use growth tips"
        items={[
          'Browse tips by category to find areas you want to develop',
          'Click on a tip to expand and see the full content',
          'Try the practical exercises to apply what you learn',
          'Return regularly to reinforce your growth journey',
        ]}
      />
    </div>
  );
}
