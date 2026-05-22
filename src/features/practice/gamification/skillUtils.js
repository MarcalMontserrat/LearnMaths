import { createModeRecord } from './constants';

export const getSkillLevel = (xp) => Math.floor(xp / 120) + 1;

export const getSkillProgress = (xp) => ({
  level: getSkillLevel(xp),
  current: xp % 120,
  required: 120,
  percentage: ((xp % 120) / 120) * 100
});

export const createSkillXpSnapshot = () => createModeRecord(0);

const getQuestionXp = (type, mistakes) => {
  const baseXp =
    type === 'mulLong'
      ? 20
      : type === 'mul3'
      ? 16
      : type === 'mul2'
        ? 14
        : 12;

  return Math.max(8, baseXp - mistakes * 2);
};

export const addQuestionXp = (currentSnapshot, questionType, mistakes) => ({
  ...currentSnapshot,
  [questionType]:
    (currentSnapshot[questionType] ?? 0) + getQuestionXp(questionType, mistakes)
});


