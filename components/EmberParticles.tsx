import { useMemo } from 'react';

interface Ember {
  id: number;
  left: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
}

const EMBER_COUNT = 18;

export default function EmberParticles() {
  const embers = useMemo<Ember[]>(() => {
    return Array.from({ length: EMBER_COUNT }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 4,
      delay: `${Math.random() * 8}s`,
      duration: `${6 + Math.random() * 8}s`,
      opacity: 0.3 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {embers.map((ember) => (
        <span
          key={ember.id}
          className="ember-particle absolute rounded-full"
          style={{
            left: ember.left,
            bottom: '-4%',
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            animationDelay: ember.delay,
            animationDuration: ember.duration,
            opacity: 0,
            '--ember-opacity': ember.opacity,
            '--ember-drift': `${-30 + Math.random() * 60}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
