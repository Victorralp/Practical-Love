import { describe, expect, it } from 'vitest';
import { getDailyDevotionForDate } from './dailyDevotions';

describe('daily devotions', () => {
  it('starts the yearly devotion rhythm on day 1 of the love challenge', () => {
    const devotion = getDailyDevotionForDate(new Date('2026-01-01T12:00:00.000Z'));

    expect(devotion.day).toBe(1);
    expect(devotion.title).toBe('Love is patient');
    expect(devotion.scriptureReference).toBe('1 Corinthians 13:4a');
    expect(devotion.actionStep).toContain('practice');
  });

  it('rotates through the 30 day challenge and wraps after day 30', () => {
    expect(getDailyDevotionForDate(new Date('2026-01-30T12:00:00.000Z')).day).toBe(30);
    expect(getDailyDevotionForDate(new Date('2026-01-31T12:00:00.000Z')).day).toBe(1);
  });
});
