const HOUR_NAMES = [
  'dotze',
  'una',
  'dues',
  'tres',
  'quatre',
  'cinc',
  'sis',
  'set',
  'vuit',
  'nou',
  'deu',
  'onze'
];

export const CLOCK_LEVELS = [
  {
    id: 'on-point',
    title: 'En punt',
    description: 'Només hores exactes.'
  },
  {
    id: 'quarters',
    title: 'Els quarts',
    description: 'Un quart, dos quarts i tres quarts.'
  },
  {
    id: 'five-minutes',
    title: 'De cinc en cinc',
    description: 'Minuts abans i després de cada quart.'
  },
  {
    id: 'mixed',
    title: 'Mixt',
    description: 'Totes les hores barrejades.'
  }
];

export const CLOCK_MINUTES_BY_LEVEL = {
  'on-point': [0],
  quarters: [15, 30, 45],
  'five-minutes': [5, 10, 20, 25, 35, 40, 50, 55],
  mixed: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
};

export const CLOCK_MINUTES = CLOCK_MINUTES_BY_LEVEL.mixed;

const normalizeHour = (hour) => ((hour - 1 + 12) % 12) + 1;

export const getCatalanHourName = (hour) => HOUR_NAMES[normalizeHour(hour) % 12];

const getHourWithPreposition = (hour) => {
  const hourName = getCatalanHourName(hour);

  return hourName === 'una' || hourName === 'onze'
    ? `d'${hourName}`
    : `de ${hourName}`;
};

const getHourWithArticle = (hour) => {
  const normalizedHour = normalizeHour(hour);

  return normalizedHour === 1
    ? 'la una'
    : `les ${getCatalanHourName(normalizedHour)}`;
};

export const formatCatalanTime = (hour, minutes) => {
  const normalizedHour = normalizeHour(hour);

  if (minutes === 0) {
    return normalizedHour === 1
      ? 'És la una.'
      : `Són les ${getCatalanHourName(normalizedHour)}.`;
  }

  if (minutes === 5) {
    return normalizedHour === 1
      ? 'És la una i cinc.'
      : `Són les ${getCatalanHourName(normalizedHour)} i cinc.`;
  }

  const nextHour = getHourWithPreposition(normalizedHour + 1);

  if (minutes === 10) {
    return `Falten cinc minuts per a un quart ${nextHour}.`;
  }

  if (minutes === 15) {
    return `És un quart ${nextHour}.`;
  }

  if (minutes === 20) {
    return `És un quart i cinc ${nextHour}.`;
  }

  if (minutes === 25) {
    return `Falten cinc minuts per a dos quarts ${nextHour}.`;
  }

  if (minutes === 30) {
    return `Són dos quarts ${nextHour}.`;
  }

  if (minutes === 35) {
    return `Són dos quarts i cinc ${nextHour}.`;
  }

  if (minutes === 40) {
    return `Falten cinc minuts per a tres quarts ${nextHour}.`;
  }

  if (minutes === 45) {
    return `Són tres quarts ${nextHour}.`;
  }

  if (minutes === 50) {
    return `Són tres quarts i cinc ${nextHour}.`;
  }

  return `Falten cinc minuts per a ${getHourWithArticle(normalizedHour + 1)}.`;
};

export const formatDigitalTime = (hour, minutes) =>
  `${String(normalizeHour(hour)).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

const shuffle = (items, random) => {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const targetIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[targetIndex]] = [
      shuffled[targetIndex],
      shuffled[index]
    ];
  }

  return shuffled;
};

const getClockHint = (minutes) => {
  if (minutes === 0) {
    return 'En punt, mira l’agulla curta i usa “és” només amb la una.';
  }

  if ([15, 30, 45].includes(minutes)) {
    return `Hi ha ${minutes / 15} quart${minutes === 15 ? '' : 's'}. Els quarts miren l’hora següent.`;
  }

  if ([5, 20, 35, 50].includes(minutes)) {
    return 'Han passat cinc minuts de la marca anterior. Afegeix “i cinc”.';
  }

  return 'Falten cinc minuts per arribar a la marca següent del rellotge.';
};

const createClockQuestionForTime = (hour, minutes, level, random) => {
  const answer = formatCatalanTime(hour, minutes);
  const allowedMinutes = CLOCK_MINUTES_BY_LEVEL[level] ?? CLOCK_MINUTES;
  const distractors = shuffle(
    Array.from({ length: 12 }, (_, hourIndex) => hourIndex + 1)
      .flatMap((candidateHour) =>
        allowedMinutes.map((candidateMinutes) =>
          formatCatalanTime(candidateHour, candidateMinutes)
        )
      )
      .filter((option) => option !== answer),
    random
  ).filter((option, index, options) => options.indexOf(option) === index);

  return {
    id: `${level}-${hour}-${minutes}`,
    hour,
    minutes,
    level,
    digitalTime: formatDigitalTime(hour, minutes),
    answer,
    options: shuffle([answer, ...distractors.slice(0, 3)], random),
    hint: getClockHint(minutes)
  };
};

export const createClockSession = (
  level = 'quarters',
  questionCount = 10,
  random = Math.random
) => {
  const allowedMinutes = CLOCK_MINUTES_BY_LEVEL[level] ?? CLOCK_MINUTES;
  const availableTimes = Array.from({ length: 12 }, (_, hourIndex) =>
    allowedMinutes.map((minutes) => ({ hour: hourIndex + 1, minutes }))
  ).flat();

  return shuffle(availableTimes, random)
    .slice(0, Math.min(questionCount, availableTimes.length))
    .map(({ hour, minutes }) =>
      createClockQuestionForTime(hour, minutes, level, random)
    );
};

export const createClockQuestion = (random = Math.random) =>
  createClockSession('quarters', 1, random)[0];

export const getClockHandAngles = (hour, minutes) => ({
  hour: (normalizeHour(hour) % 12) * 30 + minutes * 0.5,
  minute: minutes * 6
});
