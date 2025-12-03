/**
 * GrowthTipsSection Component
 * Displays a categorized list of growth tips with filtering capability
 * Requirements: 2.1, 2.3
 */

import { useState, useMemo } from 'react';
import { Lightbulb, Filter } from 'lucide-react';
import TipCard from './TipCard';
import { dataService } from '../../services/dataService';
import type { LoveCategory, GrowthTip } from '../../types/growth';

const CATEGORIES: { value: LoveCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Categories' },
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

  // Get tips from DataService, filtered by category
  const tips: GrowthTip[] = useMemo(() => {
    if (selectedCategory === 'all') {
      return dataService.getTips();
    }
    return dataService.getTipsByCategory(selectedCategory);
  }, [selectedCategory]);

  const getCategoryButtonStyle = (category: LoveCategory | 'all') => {
    const isSelected = selectedCategory === category;
    const baseStyle = 'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200';
    
    if (isSelected) {
      return `${baseStyle} bg-orange-600 text-white shadow-md`;
    }
    return `${baseStyle} bg-gray-100 text-gray-700 hover:bg-gray-200`;
  };

  return (
    <section className="py-8">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Lightbulb className="w-8 h-8 text-orange-600" />
          <h2 className="text-3xl font-serif text-red-800">Growth Tips</h2>
        </div>
        <p className="text-gray-600">
          Practical advice and exercises to help you grow in love and develop stronger relationships.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by category:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={getCategoryButtonStyle(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tips Count */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          Showing {tips.length} tip{tips.length !== 1 ? 's' : ''}
          {selectedCategory !== 'all' && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* Tips List */}
      {tips.length > 0 ? (
        <div className="space-y-6">
          {tips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No tips found for this category.</p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="mt-4 text-orange-600 hover:text-orange-700 font-medium"
          >
            View all tips
          </button>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
        <div className="flex items-start">
          <Lightbulb className="w-6 h-6 text-orange-600 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How to Use Growth Tips</h3>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Browse tips by category to find areas you want to develop</li>
              <li>• Click on a tip to expand and see the full content</li>
              <li>• Try the practical exercises to apply what you learn</li>
              <li>• Return regularly to reinforce your growth journey</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
