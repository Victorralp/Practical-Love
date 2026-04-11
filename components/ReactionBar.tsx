import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  REACTION_CONFIG,
  REACTION_TYPES,
  hasUserReacted,
  toggleReaction,
  type ReactionType,
  type ReactionsMap,
} from '../services/messagePostsService';

type ReactionBarProps = {
  postId: string;
  reactions: ReactionsMap;
};

export default function ReactionBar({ postId, reactions }: ReactionBarProps) {
  const [optimistic, setOptimistic] = useState<Record<string, boolean>>({});
  const [animating, setAnimating] = useState<string | null>(null);

  const handleToggle = async (type: ReactionType) => {
    const wasActive = hasUserReacted(postId, type);

    // Optimistic UI
    setOptimistic(prev => ({ ...prev, [type]: !wasActive }));
    setAnimating(type);

    try {
      await toggleReaction(postId, type);
    } catch {
      // Revert on error
      setOptimistic(prev => ({ ...prev, [type]: wasActive }));
    }

    setTimeout(() => setAnimating(null), 400);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {REACTION_TYPES.map(type => {
        const config = REACTION_CONFIG[type];
        const isActive =
          optimistic[type] !== undefined ? optimistic[type] : hasUserReacted(postId, type);
        const count = reactions[type] || 0;

        return (
          <motion.button
            key={type}
            type="button"
            onClick={() => handleToggle(type)}
            whileTap={{ scale: 0.9 }}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all ${
              isActive
                ? 'border-red-200 bg-red-50 text-red-700 shadow-sm'
                : 'border-orange-100 bg-white text-gray-600 hover:border-orange-200 hover:bg-orange-50'
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={`${type}-${isActive}`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-base"
              >
                {config.emoji}
              </motion.span>
            </AnimatePresence>
            <span>{config.label}</span>
            {count > 0 && (
              <motion.span
                key={`count-${type}-${count}`}
                initial={animating === type ? { scale: 1.4, color: '#b91c1c' } : false}
                animate={{ scale: 1, color: isActive ? '#b91c1c' : '#6b7280' }}
                className="min-w-[1ch] tabular-nums"
              >
                {count}
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
