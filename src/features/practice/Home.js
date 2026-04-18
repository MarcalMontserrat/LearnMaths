import React, { useEffect } from 'react';
import { CoachPanel } from './components/CoachPanel';
import { HeroSection } from './components/HeroSection';
import { ModeGrid } from './components/ModeGrid';
import { PracticePanel } from './components/PracticePanel';
import { MODE_OPTIONS } from './config';
import { usePracticeSession } from './hooks/usePracticeSession';

export function Home() {
  const {
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
    progressPercentage,
    currentStarValue,
    setAnswer,
    setShowHint,
    startRound,
    handleModeChange,
    goToNextQuestion,
    handleSubmit
  } = usePracticeSession();

  useEffect(() => {
    document.title = 'Mision Matematica';
  }, []);

  const selectedMode = MODE_OPTIONS.find((option) => option.id === mode);

  return (
    <div className="math-page">
      <HeroSection
        selectedModeTitle={selectedMode?.title}
        totalStars={totalStars}
        perfectStreak={perfectStreak}
        bestStreak={bestStreak}
      />

      <ModeGrid activeMode={mode} onModeChange={handleModeChange} />

      <section className="practice-grid">
        <PracticePanel
          roundComplete={roundComplete}
          completedCount={completedCount}
          roundStars={roundStars}
          progressPercentage={progressPercentage}
          question={question}
          currentStarValue={currentStarValue}
          answer={answer}
          answerInputRef={answerInputRef}
          isSolved={isSolved}
          showHint={showHint}
          feedback={feedback}
          mode={mode}
          onAnswerChange={setAnswer}
          onSubmit={handleSubmit}
          onToggleHint={() => setShowHint((currentValue) => !currentValue)}
          onRestartRound={startRound}
          onNextQuestion={goToNextQuestion}
        />

        <CoachPanel
          completedCount={completedCount}
          mistakes={mistakes}
          selectedModeTitle={selectedMode?.title}
        />
      </section>
    </div>
  );
}
