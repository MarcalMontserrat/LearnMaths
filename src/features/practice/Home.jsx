import React, { useEffect, useState } from 'react';
import { CoachPanel } from './components/CoachPanel';
import { CollectionPanel } from './components/CollectionPanel';
import { HeroSection } from './components/HeroSection';
import { MissionPanel } from './components/MissionPanel';
import { ModeGrid } from './components/ModeGrid';
import { PracticePanel } from './components/PracticePanel';
import { SeasonPanel } from './components/SeasonPanel';
import { SeasonIntroModal } from './components/SeasonIntroModal';
import { SkillProgressPanel } from './components/SkillProgressPanel';
import { ThemeShopPanel } from './components/ThemeShopPanel';
import { MODE_OPTIONS, STORAGE_KEYS } from './config';
import { readStoredFlag, writeStoredFlag } from './storage';
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
    latestRewardMessage,
    roundRewards,
    questionCelebration,
    roundOutcome,
    seasonCard,
    skillCards,
    missionCards,
    badgeCards,
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
  const [activeMetaTab, setActiveMetaTab] = useState('season');
  const [showSeasonGuide, setShowSeasonGuide] = useState(
    () => readStoredFlag(STORAGE_KEYS.seasonGuideSeen) !== '1'
  );

  useEffect(() => {
    document.title = 'Misión Matemática';
  }, []);

  const selectedMode = MODE_OPTIONS.find((option) => option.id === mode);
  const handleCloseSeasonGuide = () => {
    writeStoredFlag(STORAGE_KEYS.seasonGuideSeen, '1');
    setShowSeasonGuide(false);
  };
  const handlePlayCurrentMatch = () => {
    const targetMode = seasonCard.currentMatch?.mode ?? mode;

    handleCloseSeasonGuide();
    setActiveMetaTab('season');
    startRound(targetMode);
  };

  return (
    <div className={`math-page basketball-page theme-${activeTheme}`}>
      {showSeasonGuide ? (
        <SeasonIntroModal
          season={seasonCard}
          onClose={handleCloseSeasonGuide}
          onPlayCurrentMatch={handlePlayCurrentMatch}
        />
      ) : null}

      <HeroSection
        selectedModeTitle={selectedMode?.title}
        totalStars={totalStars}
        availableStars={availableStars}
        perfectStreak={perfectStreak}
        bestStreak={bestStreak}
        weeklyProgress={weeklyProgress}
        dailyChallenge={dailyChallenge}
        seasonCard={seasonCard}
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
          seasonCard={seasonCard}
          roundRewards={roundRewards}
          questionCelebration={questionCelebration}
          roundOutcome={roundOutcome}
          onAnswerChange={setAnswer}
          onSubmit={handleSubmit}
          onToggleHint={handleToggleHint}
          onRestartRound={startRound}
          onNextQuestion={goToNextQuestion}
          onPlayCurrentMatch={handlePlayCurrentMatch}
        />

        <CoachPanel
          completedCount={completedCount}
          mistakes={mistakes}
          selectedModeTitle={selectedMode?.title}
          pendingChests={pendingChests}
          availableStars={availableStars}
          seasonCard={seasonCard}
          latestRewardMessage={latestRewardMessage}
        />
      </section>

      <section className="meta-grid">
        <div className="meta-hub">
          <div className="meta-tabs" role="tablist" aria-label="Paneles de juego">
            <button
              id="tab-season"
              className={`meta-tab ${activeMetaTab === 'season' ? 'is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={activeMetaTab === 'season'}
              aria-controls="panel-season"
              onClick={() => setActiveMetaTab('season')}
            >
              <span aria-hidden="true">🏆</span> Temporada
            </button>
            <button
              id="tab-missions"
              className={`meta-tab ${activeMetaTab === 'missions' ? 'is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={activeMetaTab === 'missions'}
              aria-controls="panel-missions"
              onClick={() => setActiveMetaTab('missions')}
            >
              <span aria-hidden="true">🎯</span> Club
            </button>
            <button
              id="tab-collection"
              className={`meta-tab ${activeMetaTab === 'collection' ? 'is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={activeMetaTab === 'collection'}
              aria-controls="panel-collection"
              onClick={() => setActiveMetaTab('collection')}
            >
              <span aria-hidden="true">🏅</span> Colección
            </button>
            <button
              id="tab-shop"
              className={`meta-tab ${activeMetaTab === 'shop' ? 'is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={activeMetaTab === 'shop'}
              aria-controls="panel-shop"
              onClick={() => setActiveMetaTab('shop')}
            >
              <span aria-hidden="true">🛍️</span> Tienda
            </button>
          </div>

          {activeMetaTab === 'season' ? (
            <div
              id="panel-season"
              role="tabpanel"
              aria-labelledby="tab-season"
              className="meta-panel-grid"
            >
              <SeasonPanel
                season={seasonCard}
                pendingChests={pendingChests}
                latestRewardMessage={latestRewardMessage}
                onOpenChest={handleOpenChest}
                onPlayCurrentMatch={handlePlayCurrentMatch}
                onShowSeasonGuide={() => setShowSeasonGuide(true)}
              />
              <SkillProgressPanel skills={skillCards} />
            </div>
          ) : null}

          {activeMetaTab === 'missions' ? (
            <div
              id="panel-missions"
              role="tabpanel"
              aria-labelledby="tab-missions"
              className="meta-panel-grid"
            >
              <MissionPanel missions={missionCards} weeklyProgress={weeklyProgress} />
            </div>
          ) : null}

          {activeMetaTab === 'collection' ? (
            <div
              id="panel-collection"
              role="tabpanel"
              aria-labelledby="tab-collection"
              className="meta-panel-grid"
            >
              <CollectionPanel badges={badgeCards} />
            </div>
          ) : null}

          {activeMetaTab === 'shop' ? (
            <div
              id="panel-shop"
              role="tabpanel"
              aria-labelledby="tab-shop"
              className="meta-panel-grid"
            >
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
