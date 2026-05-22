import {
  buyTheme,
  getAvailableStars,
  openChestReward,
  selectTheme
} from './shopUtils';

const buildMeta = (overrides = {}) => ({
  spentStars: 0,
  ownedThemes: ['sunrise'],
  activeTheme: 'sunrise',
  pendingChests: 0,
  openedChests: 0,
  lastChestReward: null,
  ...overrides
});

describe('shopUtils', () => {
  describe('getAvailableStars', () => {
    it('returns total minus spent', () => {
      expect(getAvailableStars(100, buildMeta({ spentStars: 30 }))).toBe(70);
    });

    it('never goes below 0', () => {
      expect(getAvailableStars(10, buildMeta({ spentStars: 50 }))).toBe(0);
    });
  });

  describe('buyTheme', () => {
    it('rejects purchase if already owned', () => {
      const meta = buildMeta({ ownedThemes: ['sunrise', 'forest'] });
      const result = buyTheme(meta, 200, 'forest');

      expect(result.success).toBe(false);
    });

    it('rejects purchase when not enough available stars', () => {
      const result = buyTheme(buildMeta(), 10, 'forest');

      expect(result.success).toBe(false);
    });

    it('rejects sunrise (free theme, cost 0)', () => {
      const result = buyTheme(buildMeta(), 200, 'sunrise');

      expect(result.success).toBe(false);
    });

    it('succeeds with enough stars', () => {
      const result = buyTheme(buildMeta(), 100, 'forest');

      expect(result.success).toBe(true);
      expect(result.nextMeta.ownedThemes).toContain('forest');
      expect(result.nextMeta.activeTheme).toBe('forest');
      expect(result.nextMeta.spentStars).toBe(45);
    });

    it('rejects unknown theme id', () => {
      const result = buyTheme(buildMeta(), 500, 'unknown');

      expect(result.success).toBe(false);
    });
  });

  describe('selectTheme', () => {
    it('switches active theme when owned', () => {
      const meta = buildMeta({ ownedThemes: ['sunrise', 'forest'], activeTheme: 'sunrise' });
      const next = selectTheme(meta, 'forest');

      expect(next.activeTheme).toBe('forest');
    });

    it('returns unchanged meta when theme is not owned', () => {
      const meta = buildMeta();
      const next = selectTheme(meta, 'ocean');

      expect(next).toBe(meta);
    });
  });

  describe('openChestReward', () => {
    it('returns null reward when no chests pending', () => {
      const result = openChestReward(buildMeta({ pendingChests: 0 }));

      expect(result.rewardLabel).toBeNull();
      expect(result.starsAwarded).toBe(0);
    });

    it('decrements pendingChests and increments openedChests', () => {
      const meta = buildMeta({ pendingChests: 2 });
      const result = openChestReward(meta);

      expect(result.nextMeta.pendingChests).toBe(1);
      expect(result.nextMeta.openedChests).toBe(1);
    });

    it('awards stars for a stars-type reward', () => {
      const meta = buildMeta({ pendingChests: 1, openedChests: 0 });
      const result = openChestReward(meta);

      expect(result.starsAwarded).toBeGreaterThan(0);
      expect(result.rewardLabel).toMatch(/estrellas/);
    });

    it('unlocks a theme for a theme-type reward when not yet owned', () => {
      const meta = buildMeta({
        pendingChests: 1,
        openedChests: 2,
        ownedThemes: ['sunrise']
      });
      const result = openChestReward(meta);

      expect(result.starsAwarded).toBe(0);
      expect(result.nextMeta.ownedThemes).toContain('forest');
      expect(result.rewardLabel).toMatch(/Tema desbloqueado/);
    });

    it('falls back to stars if theme already owned', () => {
      const meta = buildMeta({
        pendingChests: 1,
        openedChests: 2,
        ownedThemes: ['sunrise', 'forest']
      });
      const result = openChestReward(meta);

      expect(result.starsAwarded).toBeGreaterThan(0);
    });
  });
});
