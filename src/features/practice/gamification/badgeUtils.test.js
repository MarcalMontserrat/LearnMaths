import { createDefaultGameMeta } from './metaUtils';
import { BADGE_OPTIONS, buildBadgeCards } from './badgeUtils';

const metaWith = (overrides) => ({
  ...createDefaultGameMeta('2026-01-01'),
  ...overrides
});

describe('badgeUtils', () => {
  describe('buildBadgeCards', () => {
    it('returns a card for every badge option', () => {
      const cards = buildBadgeCards(createDefaultGameMeta('2026-01-01'));
      expect(cards).toHaveLength(BADGE_OPTIONS.length);
    });

    it('all badges are locked on fresh meta', () => {
      const cards = buildBadgeCards(createDefaultGameMeta('2026-01-01'));
      cards.forEach((card) => expect(card.unlocked).toBe(false));
    });

    it('unlocks perfect-start after one perfect round', () => {
      const cards = buildBadgeCards(metaWith({ perfectRounds: 1 }));
      expect(cards.find((c) => c.id === 'perfect-start').unlocked).toBe(true);
    });

    it('unlocks season-debut after first season win', () => {
      const cards = buildBadgeCards(metaWith({ totalSeasonWins: 1 }));
      expect(cards.find((c) => c.id === 'season-debut').unlocked).toBe(true);
    });

    it('unlocks season-champion after completing one season', () => {
      const cards = buildBadgeCards(metaWith({ seasonTitles: 1 }));
      expect(cards.find((c) => c.id === 'season-champion').unlocked).toBe(true);
    });

    it('unlocks dynasty after 3 seasons', () => {
      const cards = buildBadgeCards(metaWith({ seasonTitles: 3 }));
      expect(cards.find((c) => c.id === 'dynasty').unlocked).toBe(true);
    });

    it('unlocks daily-hero after 3 daily challenges', () => {
      const cards = buildBadgeCards(metaWith({ totalDailyChallengesCompleted: 3 }));
      expect(cards.find((c) => c.id === 'daily-hero').unlocked).toBe(true);
    });

    it('unlocks collector after owning 3 themes', () => {
      const cards = buildBadgeCards(
        metaWith({ ownedThemes: ['sunrise', 'forest', 'ocean'] })
      );
      expect(cards.find((c) => c.id === 'collector').unlocked).toBe(true);
    });
  });
});
