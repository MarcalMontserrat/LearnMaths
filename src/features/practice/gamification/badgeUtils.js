import { getSkillLevel } from './skillUtils';

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

export const buildBadgeCards = (meta) =>
  BADGE_OPTIONS.map((badge) => ({
    ...badge,
    unlocked: badge.isUnlocked(meta)
  }));
