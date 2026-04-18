import { useEffect, useRef, useState } from 'react';
import {
  ERROR_MESSAGES,
  SESSION_LENGTH,
  STORAGE_KEYS,
  SUCCESS_MESSAGES
} from '../config';
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
  const answerInputRef = useRef(null);

  useEffect(() => {
    setBestStreak(readStoredNumber(STORAGE_KEYS.bestStreak));
    setTotalStars(readStoredNumber(STORAGE_KEYS.totalStars));
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

  const startRound = (nextMode) => {
    setMode(nextMode);
    setCompletedCount(0);
    setRoundStars(0);
    setPerfectStreak(0);
    setRoundComplete(false);
    resetQuestionState(nextMode);
  };

  const handleModeChange = (nextMode) => {
    startRound(nextMode);
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
      const starsEarned = getStarsForMistakes(mistakes);
      const nextCompletedCount = completedCount + 1;
      const nextRoundStars = roundStars + starsEarned;
      const nextPerfectStreak = mistakes === 0 ? perfectStreak + 1 : 0;
      const nextBestStreak = Math.max(bestStreak, nextPerfectStreak);
      const nextTotalStars = totalStars + starsEarned;

      setCompletedCount(nextCompletedCount);
      setRoundStars(nextRoundStars);
      setPerfectStreak(nextPerfectStreak);
      setBestStreak(nextBestStreak);
      setTotalStars(nextTotalStars);
      setIsSolved(true);
      setFeedback({
        type: 'success',
        message: `${pickOne(SUCCESS_MESSAGES)} Has ganado ${starsEarned} estrellas.`
      });

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          STORAGE_KEYS.bestStreak,
          String(nextBestStreak)
        );
        window.localStorage.setItem(
          STORAGE_KEYS.totalStars,
          String(nextTotalStars)
        );
      }

      if (nextCompletedCount >= SESSION_LENGTH) {
        setRoundComplete(true);
      }

      return;
    }

    const nextMistakes = mistakes + 1;

    setMistakes(nextMistakes);
    setPerfectStreak(0);
    setShowHint(nextMistakes >= 2);
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
    setAnswer,
    setShowHint,
    startRound,
    handleModeChange,
    goToNextQuestion,
    handleSubmit
  };
}
