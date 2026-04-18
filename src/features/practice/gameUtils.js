import { MODE_LABELS } from './config';

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const pickOne = (items) => items[randomInt(0, items.length - 1)];

const hasCarry = (left, right) => {
  let currentLeft = left;
  let currentRight = right;

  while (currentLeft > 0 || currentRight > 0) {
    if ((currentLeft % 10) + (currentRight % 10) >= 10) {
      return true;
    }

    currentLeft = Math.floor(currentLeft / 10);
    currentRight = Math.floor(currentRight / 10);
  }

  return false;
};

const hasBorrow = (left, right) => {
  let currentLeft = left;
  let currentRight = right;

  while (currentLeft > 0 || currentRight > 0) {
    if (currentLeft % 10 < currentRight % 10) {
      return true;
    }

    currentLeft = Math.floor(currentLeft / 10);
    currentRight = Math.floor(currentRight / 10);
  }

  return false;
};

const buildHint = (type, left, right) => {
  if (type === 'sum') {
    return 'Empieza por las unidades. Si pasan de 9, llevate 1 a la siguiente columna.';
  }

  if (type === 'sub') {
    return 'Mira primero las unidades. Si arriba hay menos, pide prestada una decena.';
  }

  if (type === 'mul2') {
    const tens = Math.floor(left / 10) * 10;
    const ones = left % 10;

    return `${left} x ${right} = (${tens} x ${right}) + (${ones} x ${right})`;
  }

  const hundreds = Math.floor(left / 100) * 100;
  const tens = Math.floor((left % 100) / 10) * 10;
  const ones = left % 10;

  return `${left} x ${right} = (${hundreds} x ${right}) + (${tens} x ${right}) + (${ones} x ${right})`;
};

const createQuestion = (type, left, right) => {
  const operator = type === 'sum' ? '+' : type === 'sub' ? '-' : 'x';
  const answer =
    type === 'sum'
      ? left + right
      : type === 'sub'
        ? left - right
        : left * right;

  return {
    type,
    left,
    right,
    operator,
    answer,
    label: MODE_LABELS[type],
    hint: buildHint(type, left, right)
  };
};

const createAdditionQuestion = () => {
  let left = 0;
  let right = 0;

  do {
    left = randomInt(125, 999);
    right = randomInt(126, 999);
  } while (!hasCarry(left, right));

  return createQuestion('sum', left, right);
};

const createSubtractionQuestion = () => {
  let left = 0;
  let right = 0;

  do {
    left = randomInt(200, 999);
    right = randomInt(101, left - 1);
  } while (!hasBorrow(left, right));

  return createQuestion('sub', left, right);
};

const createMultiplicationQuestion = (digits) => {
  const left = digits === 2 ? randomInt(12, 99) : randomInt(101, 999);
  const right = randomInt(2, 9);

  return createQuestion(digits === 2 ? 'mul2' : 'mul3', left, right);
};

export const createQuestionForMode = (mode) => {
  const effectiveMode =
    mode === 'mix'
      ? pickOne(['sum', 'sub', 'mul2', 'mul3'])
      : mode;

  if (effectiveMode === 'sum') {
    return createAdditionQuestion();
  }

  if (effectiveMode === 'sub') {
    return createSubtractionQuestion();
  }

  if (effectiveMode === 'mul2') {
    return createMultiplicationQuestion(2);
  }

  return createMultiplicationQuestion(3);
};

export const getStarsForMistakes = (mistakes) => {
  if (mistakes === 0) {
    return 3;
  }

  if (mistakes === 1) {
    return 2;
  }

  return 1;
};

export const getRoundMessage = (stars) => {
  if (stars >= 26) {
    return 'Ronda espectacular';
  }

  if (stars >= 18) {
    return 'Buen trabajo';
  }

  return 'Sigue entrenando';
};

export const readStoredNumber = (key) => {
  if (typeof window === 'undefined') {
    return 0;
  }

  const storedValue = window.localStorage.getItem(key);
  const parsedValue = Number.parseInt(storedValue ?? '0', 10);

  return Number.isNaN(parsedValue) ? 0 : parsedValue;
};
