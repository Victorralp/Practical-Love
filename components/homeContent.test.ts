import { describe, expect, it } from 'vitest';
import { STARTING_POINTS, TODAY_LOVE_PRACTICES } from './homeContent';

describe('homepage content', () => {
  it('gives visitors three clear starting points', () => {
    expect(STARTING_POINTS.map(point => point.href)).toEqual([
      '/characteristics',
      '/family-first',
      '/pride-and-humility',
    ]);
  });

  it('keeps the daily practice short and practical', () => {
    expect(TODAY_LOVE_PRACTICES).toHaveLength(3);
    TODAY_LOVE_PRACTICES.forEach(practice => {
      expect(practice.length).toBeGreaterThan(10);
      expect(practice.length).toBeLessThan(80);
    });
  });
});
