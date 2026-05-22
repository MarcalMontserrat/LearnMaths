import { MODE_OPTIONS } from '../config';
import { CORE_MODES, LEAGUE_TIERS, SEASON_MATCHES } from './constants';
import { getSkillProgress } from './skillUtils';

export const getModeLabel = (modeId) =>
  MODE_OPTIONS.find((option) => option.id === modeId)?.title ?? modeId;

export const getLeagueTier = (seasonNumber) =>
  LEAGUE_TIERS[Math.min(LEAGUE_TIERS.length - 1, Math.floor((seasonNumber - 1) / 2))];

export const buildSeasonSchedule = (seasonNumber) => {
  const difficultyBoost = Math.min(4, Math.floor((seasonNumber - 1) / 3) * 2);

  return SEASON_MATCHES.map((match, index) => ({
    ...match,
    goalStars: Math.min(
      30,
      match.goalStars +
        (index >= SEASON_MATCHES.length - 2
          ? Math.floor(difficultyBoost / 2)
          : difficultyBoost)
    ),
    rewardStars: match.rewardStars + Math.floor((seasonNumber - 1) / 2)
  }));
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
    progressPercentage: (meta.seasonWins / schedule.length) * 100,
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

export const buildSkillCardsForMeta = buildSkillCards;
