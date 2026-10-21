import { useCallback, useState } from 'react';
import {
  THEME_OPTIONS,
  applyRoundProgress,
  buildBadgeCards,
  buildMissionCards,
  buildSeasonCard,
  buildSkillCards,
  buyTheme,
  createDefaultGameMeta,
  getAvailableStars,
  getTodayKey,
  getWeeklyProgress,
  openChestReward,
  selectTheme
} from '../gamificationUtils';

export function useGameMeta() {
  const [meta, setMeta] = useState(() => createDefaultGameMeta());
  const [totalStars, setTotalStars] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [latestRewardMessage, setLatestRewardMessage] = useState('');

  const updateScores = useCallback((nextTotalStars, nextBestStreak) => {
    setTotalStars(nextTotalStars);
    setBestStreak(nextBestStreak);
  }, []);

  const applyRoundEnd = useCallback(
    (roundSummary, totalStarsBeforeBonus, nextBestStreak) => {
      const roundProgress = applyRoundProgress(meta, roundSummary, getTodayKey());
      const nextTotalStars = totalStarsBeforeBonus + roundProgress.bonusStars;

      setMeta(roundProgress.nextMeta);
      setTotalStars(nextTotalStars);
      setBestStreak(nextBestStreak);
      if (roundProgress.rewards.length > 0) {
        setLatestRewardMessage(
          roundProgress.rewards[roundProgress.rewards.length - 1]
        );
      }
      return roundProgress;
    },
    [meta]
  );

  const handleOpenChest = useCallback(() => {
    const chestResult = openChestReward(meta);

    if (!chestResult.rewardLabel) {
      return;
    }

    const nextTotalStars = totalStars + chestResult.starsAwarded;

    setMeta(chestResult.nextMeta);
    setTotalStars(nextTotalStars);
    setLatestRewardMessage(chestResult.rewardLabel);
  }, [meta, totalStars]);

  const handleBuyTheme = useCallback(
    (themeId) => {
      const purchaseResult = buyTheme(meta, totalStars, themeId);

      if (!purchaseResult.success) {
        return;
      }

      const themeName =
        THEME_OPTIONS.find((theme) => theme.id === themeId)?.title ?? themeId;

      setMeta(purchaseResult.nextMeta);
      setLatestRewardMessage(`Tema desbloqueado: ${themeName}.`);
    },
    [meta, totalStars]
  );

  const handleSelectTheme = useCallback(
    (themeId) => {
      const nextMeta = selectTheme(meta, themeId);

      setMeta(nextMeta);
    },
    [meta]
  );

  const todayKey = getTodayKey();
  const availableStars = getAvailableStars(totalStars, meta);

  return {
    meta,
    totalStars,
    bestStreak,
    latestRewardMessage,
    availableStars,
    activeTheme: meta.activeTheme,
    pendingChests: meta.pendingChests,
    dailyChallenge: meta.dailyChallenge,
    seasonCard: buildSeasonCard(meta),
    skillCards: buildSkillCards(meta),
    missionCards: buildMissionCards(meta, todayKey),
    badgeCards: buildBadgeCards(meta),
    weeklyProgress: getWeeklyProgress(meta, todayKey),
    themeCards: THEME_OPTIONS.map((theme) => ({
      ...theme,
      owned: meta.ownedThemes.includes(theme.id),
      active: meta.activeTheme === theme.id
    })),
    updateScores,
    applyRoundEnd,
    handleOpenChest,
    handleBuyTheme,
    handleSelectTheme
  };
}
