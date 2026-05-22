import { useEffect, useRef, useState } from 'react';
import { ERROR_MESSAGES, SESSION_LENGTH, SUCCESS_MESSAGES } from '../config';
import { addQuestionXp, createSkillXpSnapshot } from '../gamificationUtils';
import {
  createQuestionForMode,
  getStarsForMistakes,
  pickOne
} from '../gameUtils';
import { useGameMeta } from './useGameMeta';

const INITIAL_FEEDBACK = { type: 'neutral', message: '' };
const READY_FEEDBACK = {
  type: 'neutral',
  message: 'Resuelve la cuenta y pulsa comprobar.'
};

const buildQuestionCelebration = (starsEarned, nextPerfectStreak) => ({
  id: `${Date.now()}-${starsEarned}`,
  starsEarned,
  title:
    starsEarned === 3
      ? 'Canaston limpio'
      : starsEarned === 2
        ? 'Buena jugada'
        : 'Punto salvado',
  subtitle:
    nextPerfectStreak >= 2
      ? `+${starsEarned} estrellas y racha x${nextPerfectStreak}`
      : `+${starsEarned} estrellas`
});

export function usePracticeSession() {
  const [mode, setMode] = useState('mix');
  const [question, setQuestion] = useState(() => createQuestionForMode('mix'));
  const [answer, setAnswer] = useState('');
  const [completedCount, setCompletedCount] = useState(0);
  const [roundStars, setRoundStars] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [perfectStreak, setPerfectStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [roundComplete, setRoundComplete] = useState(false);
  const [feedback, setFeedback] = useState(INITIAL_FEEDBACK);
  const [roundSkillXp, setRoundSkillXp] = useState(() => createSkillXpSnapshot());
  const [usedHintInRound, setUsedHintInRound] = useState(false);
  const [roundRewards, setRoundRewards] = useState([]);
  const [questionCelebration, setQuestionCelebration] = useState(null);
  const [roundOutcome, setRoundOutcome] = useState(null);
  const answerInputRef = useRef(null);

  const gameMeta = useGameMeta();

  useEffect(() => {
    if (!roundComplete) {
      answerInputRef.current?.focus();
    }
  }, [question, roundComplete]);

  useEffect(() => {
    if (!questionCelebration) {
      return undefined;
    }

    const timeoutId = setTimeout(() => setQuestionCelebration(null), 1350);

    return () => clearTimeout(timeoutId);
  }, [questionCelebration]);

  const resetQuestionState = (nextMode) => {
    setQuestion(createQuestionForMode(nextMode));
    setAnswer('');
    setMistakes(0);
    setShowHint(false);
    setIsSolved(false);
    setFeedback(READY_FEEDBACK);
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
    setQuestionCelebration(null);
    setRoundOutcome(null);
    resetQuestionState(nextMode);
  };

  const handleModeChange = (nextMode) => startRound(nextMode);

  const handleToggleHint = () => {
    setUsedHintInRound(true);
    setShowHint((current) => !current);
  };

  const goToNextQuestion = () => {
    if (roundComplete) {
      startRound(mode);
      return;
    }

    setQuestionCelebration(null);
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
        message: answer.trim()
          ? 'Escribe solo numeros en el resultado.'
          : 'Completa el resultado en la fila final antes de comprobar.'
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
      const nextBestStreak = Math.max(gameMeta.bestStreak, nextPerfectStreak);
      const nextTotalStars = gameMeta.totalStars + starsEarned;

      setCompletedCount(nextCompletedCount);
      setRoundStars(nextRoundStars);
      setPerfectStreak(nextPerfectStreak);
      setRoundSkillXp(nextRoundSkillXp);
      setIsSolved(true);
      setQuestionCelebration(buildQuestionCelebration(starsEarned, nextPerfectStreak));
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
        const result = gameMeta.applyRoundEnd(
          roundSummary,
          nextTotalStars,
          nextBestStreak
        );

        setRoundRewards(result.rewards);
        setRoundOutcome(result.seasonResult);
        setRoundComplete(true);
      } else {
        gameMeta.updateScores(nextTotalStars, nextBestStreak);
      }

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

  return {
    mode,
    question,
    answer,
    completedCount,
    roundStars,
    mistakes,
    perfectStreak,
    showHint,
    isSolved,
    roundComplete,
    feedback,
    answerInputRef,
    progressPercentage: (completedCount / SESSION_LENGTH) * 100,
    currentStarValue: getStarsForMistakes(mistakes),
    roundRewards,
    questionCelebration,
    roundOutcome,
    ...gameMeta,
    setAnswer,
    startRound,
    handleModeChange,
    handleToggleHint,
    goToNextQuestion,
    handleSubmit
  };
}
