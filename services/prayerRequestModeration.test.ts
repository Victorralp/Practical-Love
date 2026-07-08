import { describe, expect, it } from 'vitest';
import {
  filterPrayerRequestsForAdmin,
  normalizePrayerRequest,
  shouldShowPrayerRequestPublicly,
  type AdminPrayerFilter,
  type PrayerRequest,
} from './messagePostsService';

function makePrayer(overrides: Partial<PrayerRequest> = {}): PrayerRequest {
  return {
    id: 'prayer-1',
    body: 'Please pray for my family.',
    author: 'Anonymous',
    prayedCount: 0,
    createdAt: '2026-01-01T00:00:00.000Z',
    isActive: true,
    ...overrides,
  };
}

describe('prayer request moderation', () => {
  it('keeps legacy active prayer requests publicly visible as approved public requests', () => {
    const prayer = normalizePrayerRequest('legacy-active', {
      body: 'Legacy request',
      author: 'Anonymous',
      prayedCount: 2,
      createdAt: '2026-01-01T00:00:00.000Z',
      isActive: true,
    } as PrayerRequest);

    expect(prayer.status).toBe('approved');
    expect(prayer.visibility).toBe('public');
    expect(shouldShowPrayerRequestPublicly(prayer)).toBe(true);
  });

  it('keeps pending and private prayer requests off the public wall', () => {
    expect(shouldShowPrayerRequestPublicly(makePrayer({ status: 'pending' }))).toBe(false);
    expect(
      shouldShowPrayerRequestPublicly(makePrayer({ status: 'approved', visibility: 'private' }))
    ).toBe(false);
  });

  it.each([
    ['pending', ['pending-public']],
    ['approved', ['approved-public']],
    ['private', ['private-approved']],
    ['hidden', ['hidden-public']],
    ['all', ['pending-public', 'approved-public', 'private-approved', 'hidden-public']],
  ] satisfies Array<[AdminPrayerFilter, string[]]>)(
    'filters admin prayer requests by %s',
    (filter, expectedIds) => {
      const prayers = [
        makePrayer({ id: 'pending-public', status: 'pending', visibility: 'public' }),
        makePrayer({ id: 'approved-public', status: 'approved', visibility: 'public' }),
        makePrayer({ id: 'private-approved', status: 'approved', visibility: 'private' }),
        makePrayer({ id: 'hidden-public', status: 'hidden', visibility: 'public' }),
      ];

      expect(filterPrayerRequestsForAdmin(prayers, filter).map(prayer => prayer.id)).toEqual(
        expectedIds
      );
    }
  );
});
