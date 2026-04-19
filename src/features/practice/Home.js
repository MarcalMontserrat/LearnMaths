import React, { useEffect, useState } from 'react';
import { AdventurePanel } from './components/AdventurePanel';
import { CoachPanel } from './components/CoachPanel';
import { CollectionPanel } from './components/CollectionPanel';
import { HeroSection } from './components/HeroSection';
import { MissionPanel } from './components/MissionPanel';
import { ModeGrid } from './components/ModeGrid';
import { PracticePanel } from './components/PracticePanel';
import { SkillProgressPanel } from './components/SkillProgressPanel';
import { ThemeShopPanel } from './components/ThemeShopPanel';
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
    activeTheme,
    availableStars,
    pendingChests,
    activeBoss,
    latestRewardMessage,
    roundRewards,
    skillCards,
    missionCards,
    badgeCards,
    mapCards,
    weeklyProgress,
    dailyChallenge,
    themeCards,
    setAnswer,
    startRound,
    handleModeChange,
    handleToggleHint,
    goToNextQuestion,
    handleSubmit,
    handleOpenChest,
    handleBuyTheme,
    handleSelectTheme
  } = usePracticeSession();
  const [activeMetaTab, setActiveMetaTab] = useState('progress');

  useEffect(() => {
    document.title = 'Mision Matematica';
  }, []);

  const selectedMode = MODE_OPTIONS.find((option) => option.id === mode);

  return (
    <div className={`math-page basketball-page theme-${activeTheme}`}>
      <HeroSection
        selectedModeTitle={selectedMode?.title}
        totalStars={totalStars}
        availableStars={availableStars}
        perfectStreak={perfectStreak}
        bestStreak={bestStreak}
        weeklyProgress={weeklyProgress}
        dailyChallenge={dailyChallenge}
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
          roundRewards={roundRewards}
          onAnswerChange={setAnswer}
          onSubmit={handleSubmit}
          onToggleHint={handleToggleHint}
          onRestartRound={startRound}
          onNextQuestion={goToNextQuestion}
        />

        <CoachPanel
          completedCount={completedCount}
          mistakes={mistakes}
          selectedModeTitle={selectedMode?.title}
          pendingChests={pendingChests}
          availableStars={availableStars}
          activeBoss={activeBoss}
          latestRewardMessage={latestRewardMessage}
        />
      </section>

      <section className="meta-grid">
        <div className="meta-hub">
          <div className="meta-tabs" role="tablist" aria-label="Paneles de juego">
            <button
              className={`meta-tab ${activeMetaTab === 'progress' ? 'is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={activeMetaTab === 'progress'}
              onClick={() => setActiveMetaTab('progress')}
            >
              <span aria-hidden="true">📈</span> Progreso
            </button>
            <button
              className={`meta-tab ${activeMetaTab === 'missions' ? 'is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={activeMetaTab === 'missions'}
              onClick={() => setActiveMetaTab('missions')}
            >
              <span aria-hidden="true">🎯</span> Misiones
            </button>
            <button
              className={`meta-tab ${activeMetaTab === 'adventure' ? 'is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={activeMetaTab === 'adventure'}
              onClick={() => setActiveMetaTab('adventure')}
            >
              <span aria-hidden="true">🗺️</span> Mapa
            </button>
            <button
              className={`meta-tab ${activeMetaTab === 'shop' ? 'is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={activeMetaTab === 'shop'}
              onClick={() => setActiveMetaTab('shop')}
            >
              <span aria-hidden="true">🛍️</span> Tienda
            </button>
          </div>

          {activeMetaTab === 'progress' ? (
            <div className="meta-panel-grid">
              <SkillProgressPanel skills={skillCards} />
              <CollectionPanel badges={badgeCards} />
            </div>
          ) : null}

          {activeMetaTab === 'missions' ? (
            <div className="meta-panel-grid">
              <MissionPanel missions={missionCards} weeklyProgress={weeklyProgress} />
            </div>
          ) : null}

          {activeMetaTab === 'adventure' ? (
            <div className="meta-panel-grid">
              <AdventurePanel
                mapCards={mapCards}
                activeBoss={activeBoss}
                pendingChests={pendingChests}
                latestRewardMessage={latestRewardMessage}
                onOpenChest={handleOpenChest}
              />
            </div>
          ) : null}

          {activeMetaTab === 'shop' ? (
            <div className="meta-panel-grid">
              <ThemeShopPanel
                themes={themeCards}
                availableStars={availableStars}
                onBuyTheme={handleBuyTheme}
                onSelectTheme={handleSelectTheme}
              />
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
