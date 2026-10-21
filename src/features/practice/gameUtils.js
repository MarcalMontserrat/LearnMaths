import { MODE_LABELS } from './config';
import { buildNotebookDescription } from './notebookUtils';
import { WORD_PROBLEMS } from './wordProblems';

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const pickOne = (items) => items[randomInt(0, items.length - 1)];

const createDigitNumber = (length, minInnerDigit = 0) => {
  let digits = String(randomInt(Math.max(1, minInnerDigit), 9));

  for (let index = 1; index < length; index += 1) {
    digits += String(randomInt(minInnerDigit, 9));
  }

  return Number.parseInt(digits, 10);
};

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

const buildExpandedMultiplicationHint = (left, right) => {
  const terms = String(right)
    .split('')
    .reverse()
    .map((digit, index) => Number(digit) * 10 ** index)
    .filter((factor) => factor > 0)
    .map((factor) => `(${left} x ${factor})`);

  return `${left} x ${right} = ${terms.join(' + ')}`;
};

const buildHint = (type, left, right) => {
  if (type === 'sum') {
    return 'Empieza por las unidades. Si pasan de 9, llevate 1 a la siguiente columna.';
  }

  if (type === 'sub') {
    return 'Mira primero las unidades. Si arriba hay menos, pide prestada una decena.';
  }

  if (type === 'div1') {
    return `Busca cuantas veces cabe ${right} en cada parte de ${left}. La division es exacta: el resto final debe ser 0.`;
  }

  if (type === 'mul2') {
    const tens = Math.floor(left / 10) * 10;
    const ones = left % 10;

    return `${left} x ${right} = (${tens} x ${right}) + (${ones} x ${right})`;
  }

  if (type === 'mulLong' || type === 'mul33') {
    return buildExpandedMultiplicationHint(left, right);
  }

  const hundreds = Math.floor(left / 100) * 100;
  const tens = Math.floor((left % 100) / 10) * 10;
  const ones = left % 10;

  return `${left} x ${right} = (${hundreds} x ${right}) + (${tens} x ${right}) + (${ones} x ${right})`;
};

const createQuestion = (type, left, right) => {
  const operator =
    type === 'sum' ? '+' : type === 'sub' ? '-' : type === 'div1' ? '÷' : 'x';
  const answer =
    type === 'sum'
      ? left + right
      : type === 'sub'
        ? left - right
        : type === 'div1'
          ? left / right
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
    left = randomInt(1200, 99999);
    right = randomInt(1201, 99999);
  } while (!hasCarry(left, right));

  return createQuestion('sum', left, right);
};

const createSubtractionQuestion = () => {
  let left = 0;
  let right = 0;

  do {
    left = randomInt(2000, 99999);
    right = randomInt(1001, left - 1);
  } while (!hasBorrow(left, right));

  return createQuestion('sub', left, right);
};

const createMultiplicationQuestion = (digits) => {
  const left = digits === 2 ? randomInt(12, 99) : randomInt(101, 999);
  const right = randomInt(2, 9);

  return createQuestion(digits === 2 ? 'mul2' : 'mul3', left, right);
};

const createLongMultiplicationQuestion = () => {
  const left = createDigitNumber(pickOne([3, 4]));
  const right = createDigitNumber(pickOne([2, 3]), 2);

  return createQuestion('mulLong', left, right);
};

const createThreeByThreeMultiplicationQuestion = () =>
  createQuestion('mul33', randomInt(100, 999), randomInt(100, 999));

const createExactDivisionQuestion = () => {
  const divisor = randomInt(2, 9);
  const quotient = randomInt(101, 999);

  return createQuestion('div1', divisor * quotient, divisor);
};

const createWordProblemQuestion = () => {
  const problem = pickOne(WORD_PROBLEMS);

  return {
    type: 'problems',
    operator: '?',
    left: null,
    right: null,
    label: MODE_LABELS.problems,
    ...problem
  };
};

export const createQuestionForMode = (mode) => {
  const effectiveMode =
    mode === 'mix'
      ? pickOne([
          'sum',
          'sub',
          'mul2',
          'mul3',
          'mulLong',
          'mul33',
          'div1',
          'problems'
        ])
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

  if (effectiveMode === 'mul3') {
    return createMultiplicationQuestion(3);
  }

  if (effectiveMode === 'mul33') {
    return createThreeByThreeMultiplicationQuestion();
  }

  if (effectiveMode === 'div1') {
    return createExactDivisionQuestion();
  }

  if (effectiveMode === 'problems') {
    return createWordProblemQuestion();
  }

  return createLongMultiplicationQuestion();
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

const padDigits = (digits, targetLength) => [
  ...Array(targetLength - digits.length).fill(''),
  ...digits
];

const createStandardNotebookLayout = (question) => {
  const leftDigits = String(question.left).split('');
  const rightDigits = String(question.right).split('');
  const columnCount =
    Math.max(leftDigits.length, rightDigits.length) +
    (question.type === 'sub' ? 0 : 1);

  return {
    variant: 'standard',
    columnCount,
    title:
      question.type === 'sum'
        ? 'Cuenta en columnas'
        : question.type === 'sub'
          ? 'Rehaz y resta'
        : 'Multiplica en columnas',
    description: buildNotebookDescription(question),
    helperLabel: question.type === 'sub' ? 'Arriba queda' : 'Llevo',
    helperMode: question.type === 'sub' ? 'rewrite-top' : 'carry',
    helperInputMaxLength: question.type === 'sub' ? 2 : 1,
    helperSlots: Array.from({ length: columnCount }, (_, index) => ({
      id: `helper-${index}`
    })),
    resultSlots: Array.from({ length: columnCount }, (_, index) => ({
      id: `result-${index}`
    })),
    instructions:
      question.type === 'sub'
        ? 'Esto no es una llevada. Usa esta fila para reescribir como queda el numero de arriba despues del prestamo y luego resta abajo.'
        : 'Puedes apoyarte aqui para escribir llevadas y completar el resultado por columnas.',
    supportSteps:
      question.type === 'sub'
        ? [
            'La columna de la izquierda baja 1.',
            'La columna que recibe se rehace arriba.',
            'Despues restas y escribes el resultado abajo.'
          ]
        : [],
    leftDigits: padDigits(leftDigits, columnCount),
    rightDigits: padDigits(rightDigits, columnCount)
  };
};

const createLongMultiplicationLayout = (question) => {
  const leftDigits = String(question.left).split('');
  const rightDigits = String(question.right).split('');
  const columnCount = Math.max(
    String(question.answer).length,
    leftDigits.length,
    rightDigits.length
  );

  return {
    variant: 'long-multiplication',
    columnCount,
    title: 'Multiplica por filas',
    description: buildNotebookDescription(question),
    instructions:
      'Cada fila tiene sus propias llevadas. Empieza por la cifra de la derecha de abajo, desplaza las siguientes filas y al final suma todo, usando otra fila de llevadas si hace falta.',
    supportSteps: [
      'Haz primero la fila de la derecha.',
      'Si la cifra de abajo vale decenas o centenas, esa fila empieza mas a la izquierda.',
      'En la suma final tambien puedes llevarte y apuntarlo arriba.',
      'Escribe el total abajo.'
    ],
    helperInputMaxLength: 1,
    finalCarryLabel: 'Llevo suma',
    leftDigits: padDigits(leftDigits, columnCount),
    rightDigits: padDigits(rightDigits, columnCount),
    partialRows: [...rightDigits].reverse().map((digit, rowIndex) => {
      const shift = rowIndex;
      const placeValue = Number(digit) * 10 ** shift;

      return {
        id: `partial-${rowIndex}`,
        carryLabel: 'Llevo',
        label: `x ${placeValue}`,
        cells: Array.from({ length: columnCount }, (_, columnIndex) => ({
          id: `partial-${rowIndex}-${columnIndex}`,
          kind: columnIndex >= columnCount - shift ? 'shift' : 'input',
          value: columnIndex >= columnCount - shift ? '0' : ''
        }))
      };
    }),
    finalCarrySlots: Array.from({ length: columnCount }, (_, index) => ({
      id: `final-carry-${index}`
    })),
    resultSlots: Array.from({ length: columnCount }, (_, index) => ({
      id: `result-${index}`
    }))
  };
};

const createDivisionLayout = (question) => ({
  variant: 'division',
  columnCount: String(question.answer).length,
  title: 'Divide paso a paso',
  description: buildNotebookDescription(question),
  instructions:
    'Empieza por la izquierda: divide, multiplica, resta y baja la cifra siguiente.',
  helperInputMaxLength: String(question.left).length,
  dividend: question.left,
  divisor: question.right,
  quotientSlots: Array.from(
    { length: String(question.answer).length },
    (_, index) => ({ id: `quotient-${index}` })
  ),
  stepRows: Array.from(
    { length: String(question.answer).length },
    (_, index) => ({ id: `division-step-${index}`, number: index + 1 })
  )
});

export const createNotebookLayout = (question) =>
  question.type === 'div1'
    ? createDivisionLayout(question)
    : question.type === 'mulLong' || question.type === 'mul33'
    ? createLongMultiplicationLayout(question)
    : createStandardNotebookLayout(question);
