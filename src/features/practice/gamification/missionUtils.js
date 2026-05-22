import { CORE_MODES, MAP_NODES } from './constants';
import { formatDateKey, getTodayKey } from './dateUtils';
import { getModeLabel, buildSeasonCard } from './seasonUtils';

const hashString = (value) =>
  value
    .split('')
    .reduce((seed, character) => seed + character.charCodeAt(0), 0);

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

export const buildMapCards = (meta) =>
  MAP_NODES.map((node, index) => ({
    ...node,
    index,
    current: index === meta.mapPosition % MAP_NODES.length,
    cleared:
      index < meta.mapPosition % MAP_NODES.length ||
      meta.mapPosition >= MAP_NODES.length + index
  }));
