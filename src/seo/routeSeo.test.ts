import { describe, expect, it } from 'vitest';
import { buildSeoPayload, getSeoRoute } from './routeSeo';

describe('route SEO entries', () => {
  it('includes the Pride and Humility page', () => {
    const route = getSeoRoute('/pride-and-humility');
    const payload = buildSeoPayload('/pride-and-humility');

    expect(route?.name).toBe('Pride and Humility');
    expect(payload.title).toContain('Pride and Humility');
    expect(payload.description).toContain('recognize pride');
  });
});
