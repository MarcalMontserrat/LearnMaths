const RECOMMENDED_MATH_MODES = [
  'sum',
  'sub',
  'mul3',
  'mulLong',
  'div1',
  'problems'
];

const RECOMMENDED_CLOCK_LEVELS = [
  'on-point',
  'quarters',
  'five-minutes',
  'mixed'
];

const buildDateSeed = (date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    .split('')
    .reduce((seed, character) => seed + character.charCodeAt(0), 0);

export const getDailyRecommendation = (date = new Date()) => {
  const seed = buildDateSeed(date);

  return {
    mathMode: RECOMMENDED_MATH_MODES[seed % RECOMMENDED_MATH_MODES.length],
    clockLevel:
      RECOMMENDED_CLOCK_LEVELS[seed % RECOMMENDED_CLOCK_LEVELS.length]
  };
};
