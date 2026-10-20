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

export const CLOCK_MINUTES = [0, 15, 30, 45];

const normalizeHour = (hour) => ((hour - 1 + 12) % 12) + 1;

export const getCatalanHourName = (hour) => HOUR_NAMES[normalizeHour(hour) % 12];

const getHourWithPreposition = (hour) => {
  const hourName = getCatalanHourName(hour);

  return hourName === 'una' || hourName === 'onze'
    ? `d'${hourName}`
    : `de ${hourName}`;
};

export const formatCatalanTime = (hour, minutes) => {
  const normalizedHour = normalizeHour(hour);

  if (minutes === 0) {
    return normalizedHour === 1
      ? 'És la una.'
      : `Són les ${getCatalanHourName(normalizedHour)}.`;
  }

  const nextHour = getHourWithPreposition(normalizedHour + 1);

  if (minutes === 15) {
    return `És un quart ${nextHour}.`;
  }

  if (minutes === 30) {
    return `Són dos quarts ${nextHour}.`;
  }

  return `Són tres quarts ${nextHour}.`;
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

export const createClockQuestion = (random = Math.random) => {
  const hour = Math.floor(random() * 12) + 1;
  const minutes = CLOCK_MINUTES[Math.floor(random() * CLOCK_MINUTES.length)];

  return {
    id: `${hour}-${minutes}-${Math.floor(random() * 100000)}`,
    hour,
    minutes,
    digitalTime: formatDigitalTime(hour, minutes),
    answer: formatCatalanTime(hour, minutes),
    options: shuffle(
      CLOCK_MINUTES.map((candidateMinutes) =>
        formatCatalanTime(hour, candidateMinutes)
      ),
      random
    ),
    hint:
      minutes === 0
        ? 'En punt, mira l’agulla curta i usa “és” només amb la una.'
        : `Hi ha ${minutes / 15} quart${minutes === 15 ? '' : 's'}. Els quarts miren l’hora següent.`
  };
};

export const getClockHandAngles = (hour, minutes) => ({
  hour: (normalizeHour(hour) % 12) * 30 + minutes * 0.5,
  minute: minutes * 6
});
