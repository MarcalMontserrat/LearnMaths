import { createDefaultGameMeta } from './metaUtils';
import {
  buildSeasonCard,
  buildSeasonSchedule,
  buildSkillCards,
  getLeagueTier,
  getModeLabel
} from './seasonUtils';

describe('seasonUtils', () => {
  describe('getModeLabel', () => {
    it('returns a label for each known mode', () => {
      expect(getModeLabel('sum')).toBeTruthy();
      expect(getModeLabel('sub')).toBeTruthy();
      expect(getModeLabel('mul2')).toBeTruthy();
      expect(getModeLabel('mul3')).toBeTruthy();
      expect(getModeLabel('mulLong')).toBeTruthy();
      expect(getModeLabel('mix')).toBeTruthy();
    });

    it('returns the modeId as fallback for unknown modes', () => {
      expect(getModeLabel('unknown')).toBe('unknown');
    });
  });

  describe('getLeagueTier', () => {
    it('returns the first tier for season 1', () => {
      expect(getLeagueTier(1).id).toBe('patio');
    });

    it('returns the second tier for season 3', () => {
      expect(getLeagueTier(3).id).toBe('barrio');
    });

    it('caps at the last tier for very high season numbers', () => {
      const last = getLeagueTier(100);
      expect(last.id).toBe('regional');
    });
  });

  describe('buildSeasonSchedule', () => {
    it('returns 6 matches for season 1', () => {
      expect(buildSeasonSchedule(1)).toHaveLength(6);
    });

    it('increases goalStars in later seasons', () => {
      const s1 = buildSeasonSchedule(1);
      const s4 = buildSeasonSchedule(4);
      const totalGoalS1 = s1.reduce((sum, m) => sum + m.goalStars, 0);
      const totalGoalS4 = s4.reduce((sum, m) => sum + m.goalStars, 0);
      expect(totalGoalS4).toBeGreaterThan(totalGoalS1);
    });

    it('caps goalStars at 30', () => {
      const schedule = buildSeasonSchedule(50);
      schedule.forEach((match) => {
        expect(match.goalStars).toBeLessThanOrEqual(30);
      });
    });
  });

  describe('buildSeasonCard', () => {
    it('sets currentMatch to the first match at the start of a season', () => {
      const meta = createDefaultGameMeta('2026-01-01');
      const card = buildSeasonCard(meta);
      expect(card.currentMatch).not.toBeNull();
      expect(card.currentMatch.id).toBe('open-sum');
    });

    it('marks earlier matches as won', () => {
      const meta = { ...createDefaultGameMeta('2026-01-01'), seasonGameIndex: 2 };
      const card = buildSeasonCard(meta);
      expect(card.schedule[0].status).toBe('won');
      expect(card.schedule[1].status).toBe('won');
      expect(card.schedule[2].status).toBe('current');
      expect(card.schedule[3].status).toBe('upcoming');
    });

    it('returns null currentMatch when all matches are done', () => {
      const meta = { ...createDefaultGameMeta('2026-01-01'), seasonGameIndex: 6 };
      const card = buildSeasonCard(meta);
      expect(card.currentMatch).toBeNull();
    });
  });

  describe('buildSkillCards', () => {
    it('returns one card per core mode', () => {
      const cards = buildSkillCards(createDefaultGameMeta('2026-01-01'));
      expect(cards).toHaveLength(5);
    });

    it('includes level and percentage', () => {
      const cards = buildSkillCards(createDefaultGameMeta('2026-01-01'));
      cards.forEach((card) => {
        expect(card).toHaveProperty('level');
        expect(card).toHaveProperty('percentage');
        expect(card).toHaveProperty('rounds');
      });
    });
  });
});
