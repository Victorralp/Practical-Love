/**
 * GrowthNavigation Component
 * Tab navigation for the Growth page sections
 * Requirements: 6.1, 6.2
 */

import { Calendar, Lightbulb, Sparkles, Map, TrendingUp } from 'lucide-react';

export type GrowthSection = 'challenges' | 'tips' | 'reflection' | 'journeys' | 'progress';

interface GrowthNavigationProps {
  activeSection: GrowthSection;
  onSectionChange: (section: GrowthSection) => void;
}

interface NavItem {
  id: GrowthSection;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'challenges', label: 'Challenges', icon: <Calendar className="w-5 h-5" /> },
  { id: 'tips', label: 'Tips', icon: <Lightbulb className="w-5 h-5" /> },
  { id: 'reflection', label: 'Reflection', icon: <Sparkles className="w-5 h-5" /> },
  { id: 'journeys', label: 'Journeys', icon: <Map className="w-5 h-5" /> },
  { id: 'progress', label: 'Progress', icon: <TrendingUp className="w-5 h-5" /> },
];

export default function GrowthNavigation({ activeSection, onSectionChange }: GrowthNavigationProps) {
  return (
    <nav className="bg-white rounded-xl shadow-md mb-8 overflow-hidden">
      {/* Desktop Navigation */}
      <div className="hidden sm:flex">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 font-medium transition-all duration-200 border-b-2 ${
                isActive
                  ? 'text-orange-600 border-orange-600 bg-orange-50'
                  : 'text-gray-600 border-transparent hover:text-orange-500 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Navigation - Scrollable tabs */}
      <div className="sm:hidden flex overflow-x-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-3 font-medium transition-all duration-200 border-b-2 min-w-[80px] ${
                isActive
                  ? 'text-orange-600 border-orange-600 bg-orange-50'
                  : 'text-gray-600 border-transparent'
              }`}
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
