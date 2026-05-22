import { STORAGE_KEYS } from '../config';
import { CORE_MODES, DEFAULT_THEME_ID, THEME_OPTIONS, SEASON_MATCHES, createModeRecord } from './constants';
import { getTodayKey } from './dateUtils';
import { createDailyChallenge } from './missionUtils';
import { buildSeasonCard, getLeagueTier } from './seasonUtils';

const getThemeIds = () => THEME_OPTIONS.map((theme) => theme.id);

const normalizeThemeInventory = (ownedThemes = []) => {
  const validThemeIds = new Set(getThemeIds());
  const normalizedThemes = ownedThemes.filter((themeId) =>
    validThemeIds.has(themeId)
  );

  return normalizedThemes.length
    ? Array.from(new Set([DEFAULT_THEME_ID, ...normalizedThemes]))
    : [DEFAULT_THEME_ID];
};

export const createDefaultGameMeta = (dateKey = getTodayKey()) => ({
  skillXp: createModeRecord(0),
  skillRounds: createModeRecord(0),
  modeRoundsCompleted: { mix: 0, ...createModeRecord(0) },
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
    skillXp: { ...baseMeta.skillXp, ...safeMeta.skillXp },
    skillRounds: { ...baseMeta.skillRounds, ...safeMeta.skillRounds },
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
  } catch {
    return createDefaultGameMeta(dateKey);
  }
};

export const writeStoredGameMeta = (meta) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEYS.gameMeta, JSON.stringify(meta));
};

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
  const seasonCardBefore = buildSeasonCard(nextMeta);
  const currentMatch = seasonCardBefore.currentMatch;
  const seasonResult = currentMatch
    ? {
        status: 'off-match',
        seasonNumber: seasonCardBefore.number,
        leagueTitle: seasonCardBefore.leagueTitle,
        matchTitle: currentMatch.title,
        matchMode: currentMatch.mode,
        matchModeLabel: currentMatch.modeLabel,
        goalStars: currentMatch.goalStars,
        achievedStars: roundSummary.roundStars,
        nextMatchTitle: currentMatch.title
      }
    : {
        status: 'idle',
        seasonNumber: seasonCardBefore.number,
        leagueTitle: seasonCardBefore.leagueTitle,
        achievedStars: roundSummary.roundStars,
        nextMatchTitle: null
      };

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
    nextMeta.dailyChallengeHistory = [
      ...nextMeta.dailyChallengeHistory,
      dateKey
    ].slice(-30);
    nextMeta.totalDailyChallengesCompleted += 1;
    nextMeta.pendingChests += dailyChallenge.rewardChest;
    bonusStars += dailyChallenge.rewardStars;
    rewards.push(
      `Desafio diario completado: ${dailyChallenge.rewardStars} estrellas extra${
        dailyChallenge.rewardChest ? ' y 1 cofre' : ''
      }.`
    );
  }

  if (
    currentMatch &&
    roundSummary.selectedMode === currentMatch.mode &&
    roundSummary.roundStars >= currentMatch.goalStars
  ) {
    seasonResult.status = 'won';
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

      seasonResult.status = 'title';
      seasonResult.titleReward = titleReward;
      seasonResult.completedSeasonNumber = completedSeasonNumber;
      seasonResult.completedLeagueTitle = leagueTier.title;
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
    seasonResult.status = 'lost';
    rewards.push(
      `${currentMatch.title}: necesitabas ${currentMatch.goalStars} estrellas y has conseguido ${roundSummary.roundStars}. Vuelve a intentarlo para avanzar en la temporada.`
    );
  } else if (currentMatch) {
    rewards.push(
      `Esta ronda suma entrenamiento, pero el partido actual pide ${currentMatch.modeLabel.toLowerCase()}.`
    );
  }

  const seasonCardAfter = buildSeasonCard(nextMeta);
  seasonResult.nextMatchTitle = seasonCardAfter.currentMatch?.title ?? null;
  seasonResult.nextMatchModeLabel =
    seasonCardAfter.currentMatch?.modeLabel ?? null;
  seasonResult.seasonWins = seasonCardAfter.wins;
  seasonResult.totalMatches = seasonCardAfter.totalMatches;

  return {
    nextMeta: normalizeGameMeta(nextMeta, dateKey),
    bonusStars,
    rewards,
    seasonResult
  };
};
