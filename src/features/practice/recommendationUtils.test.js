import { getDailyRecommendation } from './recommendationUtils';

describe('recommendationUtils', () => {
  it('returns the same plan throughout the same day', () => {
    const morning = getDailyRecommendation(new Date(2026, 9, 21, 8));
    const afternoon = getDailyRecommendation(new Date(2026, 9, 21, 18));

    expect(morning).toEqual(afternoon);
  });

  it('returns supported math and clock options', () => {
    const recommendation = getDailyRecommendation(new Date(2026, 9, 21));

    expect(['sum', 'sub', 'mul3', 'mulLong', 'div1', 'problems']).toContain(
      recommendation.mathMode
    );
    expect(['on-point', 'quarters', 'five-minutes', 'mixed']).toContain(
      recommendation.clockLevel
    );
  });
});
