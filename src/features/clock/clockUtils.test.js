import {
  createClockQuestion,
  formatCatalanTime,
  getClockHandAngles
} from './clockUtils';

describe('clockUtils', () => {
  it.each([
    [1, 0, 'És la una.'],
    [5, 0, 'Són les cinc.'],
    [10, 15, "És un quart d'onze."],
    [12, 30, "Són dos quarts d'una."],
    [4, 45, 'Són tres quarts de cinc.']
  ])('formats %s:%s using the Catalan quarter system', (hour, minutes, expected) => {
    expect(formatCatalanTime(hour, minutes)).toBe(expected);
  });

  it('creates four unique options including the correct answer', () => {
    const randomValues = [0.4, 0.6, 0.2, 0.8, 0.1, 0.7, 0.3];
    let index = 0;
    const question = createClockQuestion(
      () => randomValues[index++ % randomValues.length]
    );

    expect(question.options).toHaveLength(4);
    expect(new Set(question.options)).toHaveLength(4);
    expect(question.options).toContain(question.answer);
  });

  it('moves the hour hand between hours', () => {
    expect(getClockHandAngles(3, 30)).toEqual({ hour: 105, minute: 180 });
  });
});
