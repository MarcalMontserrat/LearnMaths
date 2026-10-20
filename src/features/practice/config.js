export const SESSION_LENGTH = 10;

export const STORAGE_KEYS = {
  bestStreak: 'learnmaths.bestPerfectStreak',
  totalStars: 'learnmaths.totalStars',
  gameMeta: 'learnmaths.gameMeta',
  seasonGuideSeen: 'learnmaths.seasonGuideSeen'
};

export const MODE_OPTIONS = [
  {
    id: 'mix',
    title: 'Desafio mixto',
    description: 'Una ronda de 4.º con las cuatro operaciones.',
    accent: '#ff7a18'
  },
  {
    id: 'sum',
    title: 'Sumas de 4 y 5 cifras',
    description: 'Cuentas grandes con varias llevadas.',
    accent: '#2aa876'
  },
  {
    id: 'sub',
    title: 'Restas de 4 y 5 cifras',
    description: 'Restas sin negativos y con varios prestamos.',
    accent: '#0f8b8d'
  },
  {
    id: 'mul2',
    title: '2 cifras x 1 cifra',
    description: 'Multiplicaciones como 34 x 6 o 87 x 4.',
    accent: '#f2b134'
  },
  {
    id: 'mul3',
    title: '3 cifras x 1 cifra',
    description: 'Multiplicaciones como 326 x 3 o 814 x 7.',
    accent: '#ef476f'
  },
  {
    id: 'mulLong',
    title: '3+ cifras x 2+ cifras',
    description: 'Multiplicaciones largas como 326 x 24 o 1487 x 36.',
    accent: '#7f5539'
  },
  {
    id: 'mul33',
    title: '3 cifras x 3 cifras',
    description: 'Multiplicaciones largas como 326 x 247 o 814 x 639.',
    accent: '#6d597a'
  },
  {
    id: 'div1',
    title: 'Divisiones exactas',
    description: 'Dividendos de 3 o 4 cifras entre una cifra, sin resto.',
    accent: '#3a86ff'
  }
];

export const MODE_LABELS = {
  sum: 'Suma con llevadas',
  sub: 'Resta con prestamos',
  mul2: 'Multiplicacion de 2 cifras',
  mul3: 'Multiplicacion de 3 cifras',
  mulLong: 'Multiplicacion larga',
  mul33: 'Multiplicacion de 3 cifras x 3 cifras',
  div1: 'Division exacta entre una cifra'
};

export const SUCCESS_MESSAGES = [
  'Muy bien resuelta.',
  'Cuenta superada.',
  'Eso es, sigue asi.',
  'Perfecto, vas muy fina.'
];

export const ERROR_MESSAGES = [
  'Casi la tienes.',
  'Revisa la columna de las unidades.',
  'Haz una pausa corta y vuelve a mirarla.',
  'Prueba con calma otra vez.'
];
