import { MODE_OPTIONS, STORAGE_KEYS } from './config';

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
    goalStars: 18,
    rewardStars: 4
  },
  {
    id: 'open-sub',
    title: 'Jornada 2',
    subtitle: 'Defensa con restas',
    mode: 'sub',
    goalStars: 18,
    rewardStars: 4
  },
  {
    id: 'open-mul2',
    title: 'Jornada 3',
    subtitle: 'Contraataque x1',
    mode: 'mul2',
    goalStars: 18,
    rewardStars: 5
  },
  {
    id: 'open-mul3',
    title: 'Jornada 4',
    subtitle: 'Triple de 3 cifras',
    mode: 'mul3',
    goalStars: 20,
    rewardStars: 6
  },
  {
    id: 'semi-long',
    title: 'Semifinal',
    subtitle: 'Multiplicacion larga bajo presion',
    mode: 'mulLong',
    goalStars: 18,
    rewardStars: 8,
    rewardChest: 1
  },
  {
    id: 'final-mix',
    title: 'Final',
    subtitle: 'Partido mixto para levantar la copa',
    mode: 'mix',
    goalStars: 22,
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

export const BADGE_OPTIONS = [
  {
    id: 'perfect-start',
    title: 'Sin fallos',
    description: 'Completa una ronda perfecta.',
    isUnlocked: (meta) => meta.perfectRounds >= 1
  },
  {
    id: 'season-debut',
    title: 'Debut con victoria',
    description: 'Gana tu primer partido de temporada.',
    isUnlocked: (meta) => meta.totalSeasonWins >= 1
  },
  {
    id: 'season-champion',
    title: 'Campeona de liga',
    description: 'Completa tu primera temporada.',
    isUnlocked: (meta) => meta.seasonTitles >= 1
  },
  {
    id: 'dynasty',
    title: 'Dinastia escolar',
    description: 'Completa 3 temporadas.',
    isUnlocked: (meta) => meta.seasonTitles >= 3
  },
  {
    id: 'sum-queen',
    title: 'Reina de las llevadas',
    description: 'Lleva sumas al nivel 3.',
    isUnlocked: (meta) => getSkillLevel(meta.skillXp.sum) >= 3
  },
  {
    id: 'borrow-master',
    title: 'Domina prestamos',
    description: 'Lleva restas al nivel 3.',
    isUnlocked: (meta) => getSkillLevel(meta.skillXp.sub) >= 3
  },
  {
    id: 'multiply-pro',
    title: 'Multiplicadora experta',
    description: 'Lleva multiplicacion larga al nivel 3.',
    isUnlocked: (meta) => getSkillLevel(meta.skillXp.mulLong) >= 3
  },
  {
    id: 'daily-hero',
    title: 'Heroina diaria',
    description: 'Completa 3 desafios diarios.',
    isUnlocked: (meta) => meta.totalDailyChallengesCompleted >= 3
  },
  {
    id: 'collector',
    title: 'Coleccionista',
    description: 'Desbloquea 3 temas.',
    isUnlocked: (meta) => meta.ownedThemes.length >= 3
  }
];

const createModeRecord = (initialValue) =>
  CORE_MODES.reduce(
    (record, modeId) => ({
      ...record,
      [modeId]: initialValue
    }),
    {}
  );

const getThemeIds = () => THEME_OPTIONS.map((theme) => theme.id);

const hashString = (value) =>
  value.split('').reduce((seed, character) => seed + character.charCodeAt(0), 0);

const formatDateKey = (currentDate) => {
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const getTodayKey = (currentDate = new Date()) =>
  formatDateKey(currentDate);

export const getModeLabel = (modeId) =>
  MODE_OPTIONS.find((option) => option.id === modeId)?.title ?? modeId;

export const getLeagueTier = (seasonNumber) =>
  LEAGUE_TIERS[Math.min(LEAGUE_TIERS.length - 1, Math.floor((seasonNumber - 1) / 2))];

export const buildSeasonSchedule = (seasonNumber) => {
  const difficultyBoost = Math.min(6, Math.floor((seasonNumber - 1) / 2) * 2);

  return SEASON_MATCHES.map((match, index) => ({
    ...match,
    goalStars: Math.min(
      30,
      match.goalStars + (index >= SEASON_MATCHES.length - 2 ? Math.floor(difficultyBoost / 2) : difficultyBoost)
    ),
    rewardStars: match.rewardStars + Math.floor((seasonNumber - 1) / 2)
  }));
};

export const getSkillLevel = (xp) => Math.floor(xp / 120) + 1;

export const getSkillProgress = (xp) => ({
  level: getSkillLevel(xp),
  current: xp % 120,
  required: 120,
  percentage: ((xp % 120) / 120) * 100
});

export const getAvailableStars = (totalStars, meta) =>
  Math.max(0, totalStars - meta.spentStars);

export const createDailyChallenge = (dateKey) => {
  const seed = hashString(dateKey);
  const mode = CORE_MODES[seed % CORE_MODES.length];
  const goalStars =
    mode === 'mulLong'
      ? [16, 18, 20][seed % 3]
      : [18, 20, 22, 24][seed % 4];
  const rewardStars = mode === 'mulLong' ? 12 + (seed % 7) : 10 + (seed % 7);
  const rewardChest = seed % 3 === 0 ? 1 : 0;

  return {
    id: `daily-${dateKey}`,
    dateKey,
    mode,
    goalStars,
    rewardStars,
    rewardChest,
    title: `${getModeLabel(mode)} del dia`,
    description: `Consigue ${goalStars} estrellas en ${getModeLabel(mode).toLowerCase()}.`
  };
};

export const createDefaultGameMeta = (dateKey = getTodayKey()) => ({
  skillXp: createModeRecord(0),
  skillRounds: createModeRecord(0),
  modeRoundsCompleted: {
    mix: 0,
    ...createModeRecord(0)
  },
  totalRoundsCompleted: 0,
  totalQuestionsSolved: 0,
  perfectRounds: 0,
  noHintRounds: 0,
  bossesDefeated: 0,
  mapPosition: 0,
  activeBoss: null,
  pendingChests: 0,
  openedChests: 0,
  spentStars: 0,
  ownedThemes: [DEFAULT_THEME_ID],
  activeTheme: DEFAULT_THEME_ID,
  playedDates: [],
  dailyChallengeHistory: [],
  totalDailyChallengesCompleted: 0,
  bestStreakRecord: 0,
  lastChestReward: null,
  seasonNumber: 1,
  seasonGameIndex: 0,
  seasonWins: 0,
  totalSeasonWins: 0,
  seasonTitles: 0,
  dailyChallenge: createDailyChallenge(dateKey)
});

const normalizeThemeInventory = (ownedThemes = []) => {
  const validThemeIds = new Set(getThemeIds());
  const normalizedThemes = ownedThemes.filter((themeId) => validThemeIds.has(themeId));

  return normalizedThemes.length
    ? Array.from(new Set([DEFAULT_THEME_ID, ...normalizedThemes]))
    : [DEFAULT_THEME_ID];
};

export const normalizeGameMeta = (rawMeta, dateKey = getTodayKey()) => {
  const baseMeta = createDefaultGameMeta(dateKey);
  const safeMeta = rawMeta && typeof rawMeta === 'object' ? rawMeta : {};
  const ownedThemes = normalizeThemeInventory(safeMeta.ownedThemes);
  const activeTheme = ownedThemes.includes(safeMeta.activeTheme)
    ? safeMeta.activeTheme
    : DEFAULT_THEME_ID;
  const dailyChallengeHistory = Array.isArray(safeMeta.dailyChallengeHistory)
    ? Array.from(new Set(safeMeta.dailyChallengeHistory)).slice(-30)
    : [];
  const playedDates = Array.isArray(safeMeta.playedDates)
    ? Array.from(new Set(safeMeta.playedDates)).slice(-30)
    : [];

  return {
    ...baseMeta,
    ...safeMeta,
    skillXp: {
      ...baseMeta.skillXp,
      ...safeMeta.skillXp
    },
    skillRounds: {
      ...baseMeta.skillRounds,
      ...safeMeta.skillRounds
    },
    modeRoundsCompleted: {
      ...baseMeta.modeRoundsCompleted,
      ...safeMeta.modeRoundsCompleted
    },
    ownedThemes,
    activeTheme,
    playedDates,
    dailyChallengeHistory,
    dailyChallenge: {
      ...createDailyChallenge(dateKey),
      completed: dailyChallengeHistory.includes(dateKey)
    }
  };
};

export const readStoredGameMeta = (dateKey = getTodayKey()) => {
  if (typeof window === 'undefined') {
    return createDefaultGameMeta(dateKey);
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEYS.gameMeta);

    return normalizeGameMeta(
      rawValue ? JSON.parse(rawValue) : createDefaultGameMeta(dateKey),
      dateKey
    );
  } catch (error) {
    return createDefaultGameMeta(dateKey);
  }
};

export const writeStoredGameMeta = (meta) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEYS.gameMeta, JSON.stringify(meta));
};

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

export const createSkillXpSnapshot = () => createModeRecord(0);

export const addQuestionXp = (currentSnapshot, questionType, mistakes) => ({
  ...currentSnapshot,
  [questionType]:
    (currentSnapshot[questionType] ?? 0) + getQuestionXp(questionType, mistakes)
});

const addPlayedDate = (playedDates, dateKey) => {
  if (playedDates.includes(dateKey)) {
    return playedDates;
  }

  return [...playedDates, dateKey].slice(-30);
};

export const applyRoundProgress = (meta, roundSummary, dateKey = getTodayKey()) => {
  const nextMeta = normalizeGameMeta(meta, dateKey);
  const rewards = [];
  let bonusStars = 0;

  nextMeta.playedDates = addPlayedDate(nextMeta.playedDates, dateKey);
  nextMeta.totalRoundsCompleted += 1;
  nextMeta.totalQuestionsSolved += roundSummary.questionCount;
  nextMeta.bestStreakRecord = Math.max(
    nextMeta.bestStreakRecord,
    roundSummary.bestStreak
  );
  nextMeta.modeRoundsCompleted[roundSummary.selectedMode] += 1;

  CORE_MODES.forEach((modeId) => {
    const gainedXp = roundSummary.skillXp[modeId] ?? 0;

    if (gainedXp > 0) {
      nextMeta.skillXp[modeId] += gainedXp;
      nextMeta.skillRounds[modeId] += 1;
    }
  });

  if (roundSummary.perfectRound) {
    nextMeta.perfectRounds += 1;
  }

  if (roundSummary.noHintRound) {
    nextMeta.noHintRounds += 1;
  }

  const dailyChallenge = createDailyChallenge(dateKey);
  const alreadyCompletedToday = nextMeta.dailyChallengeHistory.includes(dateKey);

  if (
    !alreadyCompletedToday &&
    roundSummary.selectedMode === dailyChallenge.mode &&
    roundSummary.roundStars >= dailyChallenge.goalStars
  ) {
    nextMeta.dailyChallengeHistory = [...nextMeta.dailyChallengeHistory, dateKey].slice(-30);
    nextMeta.totalDailyChallengesCompleted += 1;
    nextMeta.pendingChests += dailyChallenge.rewardChest;
    bonusStars += dailyChallenge.rewardStars;
    rewards.push(
      `Desafio diario completado: ${dailyChallenge.rewardStars} estrellas extra${
        dailyChallenge.rewardChest ? ' y 1 cofre' : ''
      }.`
    );
  }

  const currentMatch = buildSeasonSchedule(nextMeta.seasonNumber)[nextMeta.seasonGameIndex];

  if (
    currentMatch &&
    roundSummary.selectedMode === currentMatch.mode &&
    roundSummary.roundStars >= currentMatch.goalStars
  ) {
    nextMeta.seasonWins += 1;
    nextMeta.totalSeasonWins += 1;
    nextMeta.seasonGameIndex += 1;
    bonusStars += currentMatch.rewardStars;
    nextMeta.pendingChests += currentMatch.rewardChest ?? 0;
    rewards.push(
      `Victoria en ${currentMatch.title}: ${currentMatch.rewardStars} estrellas extra${
        currentMatch.rewardChest ? ` y ${currentMatch.rewardChest} cofre` : ''
      }.`
    );

    if (nextMeta.seasonGameIndex >= SEASON_MATCHES.length) {
      const completedSeasonNumber = nextMeta.seasonNumber;
      const leagueTier = getLeagueTier(completedSeasonNumber);
      const titleReward = 16 + Math.min(10, completedSeasonNumber * 2);

      nextMeta.seasonTitles += 1;
      nextMeta.pendingChests += 1;
      bonusStars += titleReward;
      rewards.push(
        `Has ganado la temporada ${completedSeasonNumber} de ${leagueTier.title}. Premio final: ${titleReward} estrellas y 1 cofre.`
      );
      nextMeta.seasonNumber += 1;
      nextMeta.seasonGameIndex = 0;
      nextMeta.seasonWins = 0;
    }
  } else if (
    currentMatch &&
    roundSummary.selectedMode === currentMatch.mode &&
    roundSummary.roundStars < currentMatch.goalStars
  ) {
    rewards.push(
      `${currentMatch.title}: necesitabas ${currentMatch.goalStars} estrellas y has conseguido ${roundSummary.roundStars}. Vuelve a intentarlo para avanzar en la temporada.`
    );
  }

  return {
    nextMeta: normalizeGameMeta(nextMeta, dateKey),
    bonusStars,
    rewards
  };
};

const CHEST_REWARD_SEQUENCE = [
  { type: 'stars', stars: 12 },
  { type: 'stars', stars: 15 },
  { type: 'theme', themeId: 'forest', fallbackStars: 18 },
  { type: 'stars', stars: 20 },
  { type: 'theme', themeId: 'ocean', fallbackStars: 22 },
  { type: 'theme', themeId: 'festival', fallbackStars: 26 }
];

export const openChestReward = (meta) => {
  if (meta.pendingChests <= 0) {
    return {
      nextMeta: meta,
      starsAwarded: 0,
      rewardLabel: null
    };
  }

  const nextMeta = {
    ...meta,
    pendingChests: meta.pendingChests - 1,
    openedChests: meta.openedChests + 1
  };
  const reward = CHEST_REWARD_SEQUENCE[meta.openedChests % CHEST_REWARD_SEQUENCE.length];

  if (reward.type === 'theme' && !nextMeta.ownedThemes.includes(reward.themeId)) {
    nextMeta.ownedThemes = [...nextMeta.ownedThemes, reward.themeId];
    nextMeta.lastChestReward = `Tema desbloqueado: ${
      THEME_OPTIONS.find((theme) => theme.id === reward.themeId)?.title ?? reward.themeId
    }`;

    return {
      nextMeta,
      starsAwarded: 0,
      rewardLabel: nextMeta.lastChestReward
    };
  }

  nextMeta.lastChestReward = `${reward.fallbackStars ?? reward.stars} estrellas extra`;

  return {
    nextMeta,
    starsAwarded: reward.fallbackStars ?? reward.stars,
    rewardLabel: nextMeta.lastChestReward
  };
};

export const buyTheme = (meta, totalStars, themeId) => {
  const theme = THEME_OPTIONS.find((option) => option.id === themeId);

  if (!theme || meta.ownedThemes.includes(themeId) || theme.cost <= 0) {
    return {
      success: false,
      nextMeta: meta
    };
  }

  if (getAvailableStars(totalStars, meta) < theme.cost) {
    return {
      success: false,
      nextMeta: meta
    };
  }

  return {
    success: true,
    nextMeta: {
      ...meta,
      spentStars: meta.spentStars + theme.cost,
      ownedThemes: [...meta.ownedThemes, themeId],
      activeTheme: themeId
    }
  };
};

export const selectTheme = (meta, themeId) => {
  if (!meta.ownedThemes.includes(themeId)) {
    return meta;
  }

  return {
    ...meta,
    activeTheme: themeId
  };
};

export const getWeeklyProgress = (meta, dateKey = getTodayKey()) => {
  const [year, month, day] = dateKey.split('-').map(Number);
  const today = new Date(year, month - 1, day);
  const recentDays = Array.from({ length: 7 }, (_, index) => {
    const currentDay = new Date(today);
    currentDay.setDate(today.getDate() - (6 - index));
    return formatDateKey(currentDay);
  });
  const playedSet = new Set(meta.playedDates);
  const playedCount = recentDays.filter((dayKey) => playedSet.has(dayKey)).length;

  return {
    playedCount,
    recentDays: recentDays.map((dayKey) => ({
      dayKey,
      played: playedSet.has(dayKey)
    }))
  };
};

export const buildSeasonCard = (meta) => {
  const seasonNumber = Math.max(1, meta.seasonNumber);
  const leagueTier = getLeagueTier(seasonNumber);
  const schedule = buildSeasonSchedule(seasonNumber);
  const currentMatch = schedule[meta.seasonGameIndex] ?? null;

  return {
    number: seasonNumber,
    leagueTitle: leagueTier.title,
    leagueSubtitle: leagueTier.subtitle,
    titles: meta.seasonTitles,
    wins: meta.seasonWins,
    totalMatches: schedule.length,
    currentMatch: currentMatch
      ? {
          ...currentMatch,
          modeLabel: getModeLabel(currentMatch.mode)
        }
      : null,
    schedule: schedule.map((match, index) => ({
      ...match,
      modeLabel: getModeLabel(match.mode),
      status:
        index < meta.seasonGameIndex
          ? 'won'
          : index === meta.seasonGameIndex
            ? 'current'
            : 'upcoming'
    }))
  };
};

export const buildSkillCards = (meta) =>
  CORE_MODES.map((modeId) => ({
    id: modeId,
    title: getModeLabel(modeId),
    rounds: meta.skillRounds[modeId],
    ...getSkillProgress(meta.skillXp[modeId])
  }));

export const buildMissionCards = (meta, dateKey = getTodayKey()) => {
  const dailyChallenge = createDailyChallenge(dateKey);
  const isDailyComplete = meta.dailyChallengeHistory.includes(dateKey);
  const seasonCard = buildSeasonCard(meta);

  return [
    {
      id: 'season',
      title: `${seasonCard.leagueTitle} · Temporada ${seasonCard.number}`,
      description: seasonCard.currentMatch
        ? `${seasonCard.currentMatch.title}: juega ${getModeLabel(
            seasonCard.currentMatch.mode
          ).toLowerCase()} y consigue ${seasonCard.currentMatch.goalStars} estrellas para avanzar.`
        : 'Temporada completada. Empieza la siguiente.',
      progress: seasonCard.wins,
      goal: seasonCard.totalMatches,
      progressLabel: `${seasonCard.wins}/${seasonCard.totalMatches} victorias`,
      complete: seasonCard.wins >= seasonCard.totalMatches
    },
    {
      id: 'daily',
      title: dailyChallenge.title,
      description: dailyChallenge.description,
      progress: isDailyComplete ? dailyChallenge.goalStars : 0,
      goal: dailyChallenge.goalStars,
      progressLabel: isDailyComplete
        ? 'Completado'
        : `${dailyChallenge.goalStars} estrellas`,
      complete: isDailyComplete
    },
    {
      id: 'perfect',
      title: 'Ronda perfecta',
      description: 'Completa una ronda al maximo de estrellas.',
      progress: Math.min(meta.perfectRounds, 1),
      goal: 1,
      progressLabel: `${Math.min(meta.perfectRounds, 1)}/1`,
      complete: meta.perfectRounds >= 1
    },
    {
      id: 'titles',
      title: 'Levanta la copa',
      description: 'Completa una temporada entera del calendario.',
      progress: Math.min(meta.seasonTitles, 1),
      goal: 1,
      progressLabel: `${Math.min(meta.seasonTitles, 1)}/1`,
      complete: meta.seasonTitles >= 1
    },
    {
      id: 'no-hints',
      title: 'Sin pistas',
      description: 'Termina 5 rondas sin abrir ninguna pista.',
      progress: Math.min(meta.noHintRounds, 5),
      goal: 5,
      progressLabel: `${Math.min(meta.noHintRounds, 5)}/5`,
      complete: meta.noHintRounds >= 5
    },
    {
      id: 'wins',
      title: 'Cadena de victorias',
      description: 'Gana 3 partidos de temporada.',
      progress: Math.min(meta.totalSeasonWins, 3),
      goal: 3,
      progressLabel: `${Math.min(meta.totalSeasonWins, 3)}/3`,
      complete: meta.totalSeasonWins >= 3
    },
    {
      id: 'chests',
      title: 'Abre cofres',
      description: 'Abre 3 cofres para impulsar tu progreso.',
      progress: Math.min(meta.openedChests, 3),
      goal: 3,
      progressLabel: `${Math.min(meta.openedChests, 3)}/3`,
      complete: meta.openedChests >= 3
    }
  ];
};

export const buildBadgeCards = (meta) =>
  BADGE_OPTIONS.map((badge) => ({
    ...badge,
    unlocked: badge.isUnlocked(meta)
  }));

export const buildMapCards = (meta) =>
  MAP_NODES.map((node, index) => ({
    ...node,
    index,
    current: index === meta.mapPosition % MAP_NODES.length,
    cleared:
      index < meta.mapPosition % MAP_NODES.length ||
      meta.mapPosition >= MAP_NODES.length + index
  }));
