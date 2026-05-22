export const CORE_MODES = ['sum', 'sub', 'mul2', 'mul3', 'mulLong'];
export const DEFAULT_THEME_ID = 'sunrise';

export const THEME_OPTIONS = [
  {
    id: 'sunrise',
    title: 'Aula dorada',
    cost: 0,
    description: 'La version base, calida y luminosa.'
  },
  {
    id: 'forest',
    title: 'Bosque mental',
    cost: 45,
    description: 'Verdes mas frescos y ambiente tranquilo.'
  },
  {
    id: 'ocean',
    title: 'Marea azul',
    cost: 70,
    description: 'Tonos marinos para sesiones largas.'
  },
  {
    id: 'festival',
    title: 'Feria de numeros',
    cost: 95,
    description: 'Colores vivos y energia de recompensa.'
  }
];

export const LEAGUE_TIERS = [
  {
    id: 'patio',
    title: 'Liga del patio',
    subtitle: 'Las primeras victorias del equipo'
  },
  {
    id: 'barrio',
    title: 'Liga del barrio',
    subtitle: 'Rivales mas serios y ritmo constante'
  },
  {
    id: 'escolar',
    title: 'Liga escolar',
    subtitle: 'Cada partido exige mas precision'
  },
  {
    id: 'regional',
    title: 'Copa regional',
    subtitle: 'La parte alta de la temporada'
  }
];

export const SEASON_MATCHES = [
  {
    id: 'open-sum',
    title: 'Jornada 1',
    subtitle: 'Ataque con sumas',
    mode: 'sum',
    goalStars: 16,
    rewardStars: 4
  },
  {
    id: 'open-sub',
    title: 'Jornada 2',
    subtitle: 'Defensa con restas',
    mode: 'sub',
    goalStars: 16,
    rewardStars: 4
  },
  {
    id: 'open-mul2',
    title: 'Jornada 3',
    subtitle: 'Contraataque x1',
    mode: 'mul2',
    goalStars: 17,
    rewardStars: 5
  },
  {
    id: 'open-mul3',
    title: 'Jornada 4',
    subtitle: 'Triple de 3 cifras',
    mode: 'mul3',
    goalStars: 18,
    rewardStars: 6
  },
  {
    id: 'semi-long',
    title: 'Semifinal',
    subtitle: 'Multiplicacion larga bajo presion',
    mode: 'mulLong',
    goalStars: 16,
    rewardStars: 8,
    rewardChest: 1
  },
  {
    id: 'final-mix',
    title: 'Final',
    subtitle: 'Partido mixto para levantar la copa',
    mode: 'mix',
    goalStars: 20,
    rewardStars: 12,
    rewardChest: 1
  }
];

export const MAP_NODES = [
  {
    id: 'start',
    type: 'start',
    label: 'Salida',
    subtitle: 'Empieza la aventura'
  },
  {
    id: 'sum-trail',
    type: 'mode',
    mode: 'sum',
    label: 'Colina de sumas',
    subtitle: 'Practica con llevadas'
  },
  {
    id: 'chest-1',
    type: 'chest',
    label: 'Cofre brillante',
    subtitle: 'Premio sorpresa'
  },
  {
    id: 'sub-trail',
    type: 'mode',
    mode: 'sub',
    label: 'Puente de restas',
    subtitle: 'Prestamos con calma'
  },
  {
    id: 'boss-sum',
    type: 'boss',
    mode: 'sum',
    label: 'Jefa de sumas',
    subtitle: 'Gana 24 estrellas en sumas',
    goalStars: 24,
    rewardStars: 18
  },
  {
    id: 'mul2-trail',
    type: 'mode',
    mode: 'mul2',
    label: 'Molino x1',
    subtitle: 'Multiplica por columnas'
  },
  {
    id: 'chest-2',
    type: 'chest',
    label: 'Cofre rapido',
    subtitle: 'Mas recompensas'
  },
  {
    id: 'sub-castle',
    type: 'mode',
    mode: 'sub',
    label: 'Castillo de prestamos',
    subtitle: 'Resta reescribiendo arriba'
  },
  {
    id: 'boss-sub',
    type: 'boss',
    mode: 'sub',
    label: 'Jefa de restas',
    subtitle: 'Gana 24 estrellas en restas',
    goalStars: 24,
    rewardStars: 18
  },
  {
    id: 'mul3-trail',
    type: 'mode',
    mode: 'mul3',
    label: 'Torre x1',
    subtitle: 'Las mas largas'
  },
  {
    id: 'mul-long-trail',
    type: 'mode',
    mode: 'mulLong',
    label: 'Galeria x2',
    subtitle: 'Filas parciales y suma final'
  },
  {
    id: 'chest-3',
    type: 'chest',
    label: 'Cofre de ruta',
    subtitle: 'Otra sorpresa'
  },
  {
    id: 'mix-trail',
    type: 'mode',
    mode: 'mix',
    label: 'Camino mixto',
    subtitle: 'Todo junto'
  },
  {
    id: 'boss-mul',
    type: 'boss',
    mode: 'mulLong',
    label: 'Gigante x2',
    subtitle: 'Gana 20 estrellas en 3+ cifras x 2+ cifras',
    goalStars: 20,
    rewardStars: 22
  },
  {
    id: 'theme-stop',
    type: 'chest',
    label: 'Parada premium',
    subtitle: 'Premio grande'
  },
  {
    id: 'boss-mix',
    type: 'boss',
    mode: 'mix',
    label: 'Gran final',
    subtitle: 'Gana 22 estrellas en mixto',
    goalStars: 22,
    rewardStars: 24
  }
];

export const CHEST_REWARD_SEQUENCE = [
  { type: 'stars', stars: 12 },
  { type: 'stars', stars: 15 },
  { type: 'theme', themeId: 'forest', fallbackStars: 18 },
  { type: 'stars', stars: 20 },
  { type: 'theme', themeId: 'ocean', fallbackStars: 22 },
  { type: 'theme', themeId: 'festival', fallbackStars: 26 }
];

export const createModeRecord = (initialValue) =>
  CORE_MODES.reduce(
    (record, modeId) => ({ ...record, [modeId]: initialValue }),
    {}
  );
