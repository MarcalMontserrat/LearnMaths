import {
  applyRoundProgress,
  buildSeasonCard,
  createDefaultGameMeta,
  createSkillXpSnapshot
} from './gamificationUtils';

const buildRoundSummary = (overrides = {}) => ({
  selectedMode: 'sum',
  roundStars: 18,
  questionCount: 10,
  skillXp: createSkillXpSnapshot(),
  noHintRound: true,
  perfectRound: false,
  bestStreak: 0,
  ...overrides
});

describe('gamificationUtils season flow', () => {
  it('advances the current season match after a qualifying round', () => {
    const meta = createDefaultGameMeta('2026-04-19');

    const result = applyRoundProgress(
      meta,
      buildRoundSummary({
        selectedMode: 'sum',
        roundStars: 18
      }),
      '2026-04-19'
    );

    expect(result.nextMeta.seasonGameIndex).toBe(1);
    expect(result.nextMeta.seasonWins).toBe(1);
    expect(result.nextMeta.totalSeasonWins).toBe(1);
    expect(result.bonusStars).toBeGreaterThanOrEqual(4);
  });

  it('starts a new season after winning the final match', () => {
    const meta = {
      ...createDefaultGameMeta('2026-04-19'),
      seasonGameIndex: 5,
      seasonWins: 5
    };

    const result = applyRoundProgress(
      meta,
      buildRoundSummary({
        selectedMode: 'mix',
        roundStars: 22
      }),
      '2026-04-19'
    );

    expect(result.nextMeta.seasonNumber).toBe(2);
    expect(result.nextMeta.seasonTitles).toBe(1);
    expect(result.nextMeta.seasonGameIndex).toBe(0);
    expect(result.nextMeta.seasonWins).toBe(0);
  });

  it('builds a season card around the current match', () => {
    const seasonCard = buildSeasonCard({
      ...createDefaultGameMeta('2026-04-19'),
      seasonGameIndex: 2,
      seasonWins: 2,
      seasonTitles: 1
    });

    expect(seasonCard.number).toBe(1);
    expect(seasonCard.titles).toBe(1);
    expect(seasonCard.currentMatch.title).toBe('Jornada 3');
    expect(seasonCard.schedule[0].status).toBe('won');
    expect(seasonCard.schedule[2].status).toBe('current');
  });
});
