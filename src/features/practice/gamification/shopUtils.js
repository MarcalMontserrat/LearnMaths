import { CHEST_REWARD_SEQUENCE, THEME_OPTIONS } from './constants';

export const getAvailableStars = (totalStars, meta) =>
  Math.max(0, totalStars - meta.spentStars);

export const buyTheme = (meta, totalStars, themeId) => {
  const theme = THEME_OPTIONS.find((option) => option.id === themeId);

  if (!theme || meta.ownedThemes.includes(themeId) || theme.cost <= 0) {
    return { success: false, nextMeta: meta };
  }

  if (getAvailableStars(totalStars, meta) < theme.cost) {
    return { success: false, nextMeta: meta };
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

  return { ...meta, activeTheme: themeId };
};

export const openChestReward = (meta) => {
  if (meta.pendingChests <= 0) {
    return { nextMeta: meta, starsAwarded: 0, rewardLabel: null };
  }

  const nextMeta = {
    ...meta,
    pendingChests: meta.pendingChests - 1,
    openedChests: meta.openedChests + 1
  };
  const reward =
    CHEST_REWARD_SEQUENCE[meta.openedChests % CHEST_REWARD_SEQUENCE.length];

  if (reward.type === 'theme' && !nextMeta.ownedThemes.includes(reward.themeId)) {
    nextMeta.ownedThemes = [...nextMeta.ownedThemes, reward.themeId];
    nextMeta.lastChestReward = `Tema desbloqueado: ${
      THEME_OPTIONS.find((theme) => theme.id === reward.themeId)?.title ??
      reward.themeId
    }`;

    return { nextMeta, starsAwarded: 0, rewardLabel: nextMeta.lastChestReward };
  }

  nextMeta.lastChestReward = `${reward.fallbackStars ?? reward.stars} estrellas extra`;

  return {
    nextMeta,
    starsAwarded: reward.fallbackStars ?? reward.stars,
    rewardLabel: nextMeta.lastChestReward
  };
};
