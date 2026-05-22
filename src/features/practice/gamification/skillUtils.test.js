import {
  addQuestionXp,
  createSkillXpSnapshot,
  getSkillLevel,
  getSkillProgress
} from './skillUtils';

describe('skillUtils', () => {
  describe('getSkillLevel', () => {
    it('starts at level 1 with 0 xp', () => {
      expect(getSkillLevel(0)).toBe(1);
    });

    it('reaches level 2 at exactly 120 xp', () => {
      expect(getSkillLevel(120)).toBe(2);
    });

    it('reaches level 3 at 240 xp', () => {
      expect(getSkillLevel(240)).toBe(3);
    });

    it('stays at the same level just below the threshold', () => {
      expect(getSkillLevel(119)).toBe(1);
      expect(getSkillLevel(239)).toBe(2);
    });
  });

  describe('getSkillProgress', () => {
    it('returns level 1 with full required and 0 progress at xp=0', () => {
      const progress = getSkillProgress(0);

      expect(progress.level).toBe(1);
      expect(progress.current).toBe(0);
      expect(progress.required).toBe(120);
      expect(progress.percentage).toBe(0);
    });

    it('calculates percentage correctly mid-level', () => {
      const progress = getSkillProgress(60);

      expect(progress.level).toBe(1);
      expect(progress.current).toBe(60);
      expect(progress.percentage).toBeCloseTo(50);
    });

    it('resets current to 0 at the start of a new level', () => {
      const progress = getSkillProgress(120);

      expect(progress.level).toBe(2);
      expect(progress.current).toBe(0);
      expect(progress.percentage).toBe(0);
    });
  });

  describe('createSkillXpSnapshot', () => {
    it('creates a record with 0 xp for all core modes', () => {
      const snapshot = createSkillXpSnapshot();

      expect(snapshot).toEqual({
        sum: 0,
        sub: 0,
        mul2: 0,
        mul3: 0,
        mulLong: 0
      });
    });
  });

  describe('addQuestionXp', () => {
    it('adds base xp for a flawless sum answer', () => {
      const snapshot = createSkillXpSnapshot();
      const next = addQuestionXp(snapshot, 'sum', 0);

      expect(next.sum).toBe(12);
    });

    it('reduces xp with each mistake but floors at 8', () => {
      const snapshot = createSkillXpSnapshot();
      const next = addQuestionXp(snapshot, 'sum', 3);

      expect(next.sum).toBe(8);
    });

    it('gives more base xp for mulLong', () => {
      const snapshot = createSkillXpSnapshot();
      const next = addQuestionXp(snapshot, 'mulLong', 0);

      expect(next.mulLong).toBe(20);
    });

    it('accumulates xp across multiple calls', () => {
      let snapshot = createSkillXpSnapshot();
      snapshot = addQuestionXp(snapshot, 'mul2', 0);
      snapshot = addQuestionXp(snapshot, 'mul2', 1);

      expect(snapshot.mul2).toBe(14 + 12);
    });

    it('does not affect other modes', () => {
      const snapshot = createSkillXpSnapshot();
      const next = addQuestionXp(snapshot, 'sub', 0);

      expect(next.sum).toBe(0);
      expect(next.mul2).toBe(0);
    });
  });
});
