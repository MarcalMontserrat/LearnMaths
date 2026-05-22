import { createDefaultGameMeta } from './metaUtils';
import {
  buildMissionCards,
  createDailyChallenge,
  getWeeklyProgress
} from './missionUtils';

describe('missionUtils', () => {
  describe('createDailyChallenge', () => {
    it('returns a consistent challenge for the same date', () => {
      const a = createDailyChallenge('2026-04-15');
      const b = createDailyChallenge('2026-04-15');
      expect(a).toEqual(b);
    });

    it('returns different challenges for different dates', () => {
      const a = createDailyChallenge('2026-04-15');
      const b = createDailyChallenge('2026-04-16');
      expect(a.id).not.toBe(b.id);
    });

    it('returns a valid mode', () => {
      const challenge = createDailyChallenge('2026-04-15');
      expect(['sum', 'sub', 'mul2', 'mul3', 'mulLong']).toContain(challenge.mode);
    });

    it('includes goalStars, rewardStars and rewardChest', () => {
      const challenge = createDailyChallenge('2026-04-15');
      expect(challenge.goalStars).toBeGreaterThan(0);
      expect(challenge.rewardStars).toBeGreaterThan(0);
      expect(challenge).toHaveProperty('rewardChest');
    });
  });

  describe('getWeeklyProgress', () => {
    it('returns 0 played days on fresh meta', () => {
      const meta = createDefaultGameMeta('2026-04-15');
      const progress = getWeeklyProgress(meta, '2026-04-15');
      expect(progress.playedCount).toBe(0);
      expect(progress.recentDays).toHaveLength(7);
    });

    it('counts played days within the last 7 days', () => {
      const meta = {
        ...createDefaultGameMeta('2026-04-15'),
        playedDates: ['2026-04-13', '2026-04-14', '2026-04-15']
      };
      const progress = getWeeklyProgress(meta, '2026-04-15');
      expect(progress.playedCount).toBe(3);
    });

    it('ignores played dates older than 7 days', () => {
      const meta = {
        ...createDefaultGameMeta('2026-04-15'),
        playedDates: ['2026-04-01']
      };
      const progress = getWeeklyProgress(meta, '2026-04-15');
      expect(progress.playedCount).toBe(0);
    });
  });

  describe('buildMissionCards', () => {
    it('returns at least the core missions', () => {
      const cards = buildMissionCards(createDefaultGameMeta('2026-04-15'), '2026-04-15');
      const ids = cards.map((c) => c.id);
      expect(ids).toContain('season');
      expect(ids).toContain('daily');
      expect(ids).toContain('perfect');
      expect(ids).toContain('no-hints');
    });

    it('marks daily mission complete when date is in history', () => {
      const meta = {
        ...createDefaultGameMeta('2026-04-15'),
        dailyChallengeHistory: ['2026-04-15']
      };
      const cards = buildMissionCards(meta, '2026-04-15');
      expect(cards.find((c) => c.id === 'daily').complete).toBe(true);
    });

    it('marks no-hints complete after 5 hint-free rounds', () => {
      const meta = { ...createDefaultGameMeta('2026-04-15'), noHintRounds: 5 };
      const cards = buildMissionCards(meta, '2026-04-15');
      expect(cards.find((c) => c.id === 'no-hints').complete).toBe(true);
    });
  });
});
