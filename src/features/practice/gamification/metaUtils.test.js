import { createDefaultGameMeta, normalizeGameMeta } from './metaUtils';

describe('metaUtils', () => {
  describe('createDefaultGameMeta', () => {
    it('initializes all skill xp to 0', () => {
      const meta = createDefaultGameMeta('2026-01-01');

      expect(meta.skillXp).toEqual({
        sum: 0,
        sub: 0,
        mul2: 0,
        mul3: 0,
        mulLong: 0
      });
    });

    it('initializes season fields to defaults', () => {
      const meta = createDefaultGameMeta('2026-01-01');

      expect(meta.seasonNumber).toBe(1);
      expect(meta.seasonGameIndex).toBe(0);
      expect(meta.seasonWins).toBe(0);
      expect(meta.seasonTitles).toBe(0);
    });

    it('includes sunrise in ownedThemes', () => {
      const meta = createDefaultGameMeta('2026-01-01');

      expect(meta.ownedThemes).toContain('sunrise');
    });

    it('creates a daily challenge for the provided dateKey', () => {
      const meta = createDefaultGameMeta('2026-05-22');

      expect(meta.dailyChallenge.dateKey).toBe('2026-05-22');
    });
  });

  describe('normalizeGameMeta', () => {
    it('returns defaults when given null', () => {
      const meta = normalizeGameMeta(null, '2026-01-01');

      expect(meta.seasonNumber).toBe(1);
      expect(meta.ownedThemes).toContain('sunrise');
    });

    it('merges partial skillXp with defaults', () => {
      const raw = { skillXp: { sum: 50 } };
      const meta = normalizeGameMeta(raw, '2026-01-01');

      expect(meta.skillXp.sum).toBe(50);
      expect(meta.skillXp.sub).toBe(0);
    });

    it('strips unknown theme ids from ownedThemes', () => {
      const raw = { ownedThemes: ['sunrise', 'nonexistent'] };
      const meta = normalizeGameMeta(raw, '2026-01-01');

      expect(meta.ownedThemes).not.toContain('nonexistent');
      expect(meta.ownedThemes).toContain('sunrise');
    });

    it('resets activeTheme to sunrise if it is not owned', () => {
      const raw = { ownedThemes: ['sunrise'], activeTheme: 'ocean' };
      const meta = normalizeGameMeta(raw, '2026-01-01');

      expect(meta.activeTheme).toBe('sunrise');
    });

    it('keeps activeTheme when it is owned', () => {
      const raw = { ownedThemes: ['sunrise', 'forest'], activeTheme: 'forest' };
      const meta = normalizeGameMeta(raw, '2026-01-01');

      expect(meta.activeTheme).toBe('forest');
    });

    it('deduplicates and caps playedDates to 30', () => {
      const dates = Array.from({ length: 40 }, (_, i) => `2026-01-${String(i + 1).padStart(2, '0')}`);
      const raw = { playedDates: [...dates, dates[0]] };
      const meta = normalizeGameMeta(raw, '2026-01-01');

      expect(meta.playedDates.length).toBeLessThanOrEqual(30);
    });

    it('marks dailyChallenge as completed when date is in history', () => {
      const raw = { dailyChallengeHistory: ['2026-05-22'] };
      const meta = normalizeGameMeta(raw, '2026-05-22');

      expect(meta.dailyChallenge.completed).toBe(true);
    });
  });
});
