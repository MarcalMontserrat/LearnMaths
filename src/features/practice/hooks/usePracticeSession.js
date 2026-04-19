import { useEffect, useRef, useState } from 'react';
import {
  ERROR_MESSAGES,
  SESSION_LENGTH,
  STORAGE_KEYS,
  SUCCESS_MESSAGES
} from '../config';
import {
  THEME_OPTIONS,
  addQuestionXp,
  applyRoundProgress,
  buildBadgeCards,
  buildMapCards,
  buildMissionCards,
  buildSkillCards,
  buyTheme,
  createSkillXpSnapshot,
  getAvailableStars,
  getTodayKey,
  getWeeklyProgress,
  openChestReward,
  readStoredGameMeta,
  selectTheme,
  writeStoredGameMeta
} from '../gamificationUtils';
import {
  createQuestionForMode,
  getStarsForMistakes,
  pickOne,
  readStoredNumber
} from '../gameUtils';

const INITIAL_FEEDBACK = {
  type: 'neutral',
  message: 'Elige un modo y resuelve la primera cuenta.'
};

const READY_FEEDBACK = {
  type: 'neutral',
  message: 'Resuelve la cuenta y pulsa comprobar.'
};

export function usePracticeSession() {
  const [mode, setMode] = useState('mix');
  const [question, setQuestion] = useState(() => createQuestionForMode('mix'));
  const [answer, setAnswer] = useState('');
  const [completedCount, setCompletedCount] = useState(0);
  const [roundStars, setRoundStars] = useState(0);
  const [totalStars, setTotalStars] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [perfectStreak, setPerfectStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [roundComplete, setRoundComplete] = useState(false);
  const [feedback, setFeedback] = useState(INITIAL_FEEDBACK);
  const [meta, setMeta] = useState(() => readStoredGameMeta());
  const [roundSkillXp, setRoundSkillXp] = useState(() => createSkillXpSnapshot());
  const [usedHintInRound, setUsedHintInRound] = useState(false);
  const [roundRewards, setRoundRewards] = useState([]);
  const [latestRewardMessage, setLatestRewardMessage] = useState('');
  const answerInputRef = useRef(null);

  useEffect(() => {
    setBestStreak(readStoredNumber(STORAGE_KEYS.bestStreak));
    setTotalStars(readStoredNumber(STORAGE_KEYS.totalStars));
    setMeta(readStoredGameMeta(getTodayKey()));
  }, []);

  useEffect(() => {
    if (!roundComplete) {
      answerInputRef.current?.focus();
    }
  }, [question, roundComplete]);

  const resetQuestionState = (nextMode) => {
    setQuestion(createQuestionForMode(nextMode));
    setAnswer('');
    setMistakes(0);
    setShowHint(false);
    setIsSolved(false);
    setFeedback(READY_FEEDBACK);
  };

  const persistProgress = (nextMeta, nextBestStreak, nextTotalStars) => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEYS.bestStreak,
      String(nextBestStreak)
    );
    window.localStorage.setItem(
      STORAGE_KEYS.totalStars,
      String(nextTotalStars)
    );
    writeStoredGameMeta(nextMeta);
  };

  const startRound = (nextMode) => {
    setMode(nextMode);
    setCompletedCount(0);
    setRoundStars(0);
    setPerfectStreak(0);
    setRoundComplete(false);
    setRoundSkillXp(createSkillXpSnapshot());
    setUsedHintInRound(false);
    setRoundRewards([]);
    resetQuestionState(nextMode);
  };

  const handleModeChange = (nextMode) => {
    startRound(nextMode);
  };

  const handleToggleHint = () => {
    setUsedHintInRound(true);
    setShowHint((currentValue) => !currentValue);
  };

  const goToNextQuestion = () => {
    if (roundComplete) {
      startRound(mode);
      return;
    }

    resetQuestionState(mode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSolved || roundComplete) {
      return;
    }

    if (!/^\d+$/.test(answer.trim())) {
      setFeedback({
        type: 'error',
        message: 'Escribe solo numeros en la respuesta.'
      });
      return;
    }

    const numericAnswer = Number.parseInt(answer, 10);

    if (numericAnswer === question.answer) {
      const nextRoundSkillXp = addQuestionXp(roundSkillXp, question.type, mistakes);
      const starsEarned = getStarsForMistakes(mistakes);
      const nextCompletedCount = completedCount + 1;
      const nextRoundStars = roundStars + starsEarned;
      const nextPerfectStreak = mistakes === 0 ? perfectStreak + 1 : 0;
      const nextBestStreak = Math.max(bestStreak, nextPerfectStreak);
      let nextTotalStars = totalStars + starsEarned;
      let nextMeta = meta;
      let nextRoundRewards = [];

      setCompletedCount(nextCompletedCount);
      setRoundStars(nextRoundStars);
      setPerfectStreak(nextPerfectStreak);
      setBestStreak(nextBestStreak);
      setRoundSkillXp(nextRoundSkillXp);
      setIsSolved(true);
      setFeedback({
        type: 'success',
        message: `${pickOne(SUCCESS_MESSAGES)} Has ganado ${starsEarned} estrellas.`
      });

      if (nextCompletedCount >= SESSION_LENGTH) {
        const roundSummary = {
          selectedMode: mode,
          roundStars: nextRoundStars,
          questionCount: SESSION_LENGTH,
          skillXp: nextRoundSkillXp,
          noHintRound: !usedHintInRound,
          perfectRound: nextRoundStars === SESSION_LENGTH * 3,
          bestStreak: nextBestStreak
        };
        const roundProgress = applyRoundProgress(meta, roundSummary, getTodayKey());

        nextMeta = roundProgress.nextMeta;
        nextTotalStars += roundProgress.bonusStars;
        nextRoundRewards = roundProgress.rewards;

        setMeta(nextMeta);
        setRoundRewards(nextRoundRewards);
        if (nextRoundRewards.length) {
          setLatestRewardMessage(nextRoundRewards[nextRoundRewards.length - 1]);
        }
        setRoundComplete(true);
      }

      setTotalStars(nextTotalStars);
      persistProgress(nextMeta, nextBestStreak, nextTotalStars);

      return;
    }

    const nextMistakes = mistakes + 1;

    setMistakes(nextMistakes);
    setPerfectStreak(0);
    setShowHint(nextMistakes >= 2);
    if (nextMistakes >= 2) {
      setUsedHintInRound(true);
    }
    setFeedback({
      type: 'error',
      message:
        nextMistakes >= 2
          ? `${pickOne(ERROR_MESSAGES)} Mira la pista si la necesitas.`
          : pickOne(ERROR_MESSAGES)
    });
  };

  const handleOpenChest = () => {
    const chestResult = openChestReward(meta);

    if (!chestResult.rewardLabel) {
      return;
    }

    const nextMeta = chestResult.nextMeta;
    const nextTotalStars = totalStars + chestResult.starsAwarded;

    setMeta(nextMeta);
    setTotalStars(nextTotalStars);
    setLatestRewardMessage(chestResult.rewardLabel);
    persistProgress(nextMeta, bestStreak, nextTotalStars);
  };

  const handleBuyTheme = (themeId) => {
    const purchaseResult = buyTheme(meta, totalStars, themeId);

    if (!purchaseResult.success) {
      return;
    }

    const themeName =
      THEME_OPTIONS.find((theme) => theme.id === themeId)?.title ?? themeId;

    setMeta(purchaseResult.nextMeta);
    setLatestRewardMessage(`Tema desbloqueado: ${themeName}.`);
    persistProgress(purchaseResult.nextMeta, bestStreak, totalStars);
  };

  const handleSelectTheme = (themeId) => {
    const nextMeta = selectTheme(meta, themeId);

    setMeta(nextMeta);
    persistProgress(nextMeta, bestStreak, totalStars);
  };

  const availableStars = getAvailableStars(totalStars, meta);

  return {
    mode,
    question,
    answer,
    completedCount,
    roundStars,
    totalStars,
    mistakes,
    perfectStreak,
    bestStreak,
    showHint,
    isSolved,
    roundComplete,
    feedback,
    answerInputRef,
    progressPercentage: (completedCount / SESSION_LENGTH) * 100,
    currentStarValue: getStarsForMistakes(mistakes),
    activeTheme: meta.activeTheme,
    availableStars,
    pendingChests: meta.pendingChests,
    activeBoss: meta.activeBoss,
    latestRewardMessage,
    roundRewards,
    skillCards: buildSkillCards(meta),
    missionCards: buildMissionCards(meta, getTodayKey()),
    badgeCards: buildBadgeCards(meta),
    mapCards: buildMapCards(meta),
    weeklyProgress: getWeeklyProgress(meta, getTodayKey()),
    dailyChallenge: meta.dailyChallenge,
    themeCards: THEME_OPTIONS.map((theme) => ({
      ...theme,
      owned: meta.ownedThemes.includes(theme.id),
      active: meta.activeTheme === theme.id
    })),
    setAnswer,
    startRound,
    handleModeChange,
    handleToggleHint,
    goToNextQuestion,
    handleSubmit,
    handleOpenChest,
    handleBuyTheme,
    handleSelectTheme
  };
}
