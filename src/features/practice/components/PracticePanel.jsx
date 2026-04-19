import React from 'react';
import { supportsGuidedNotebook } from '../notebookUtils';
import { SESSION_LENGTH } from '../config';
import { getRoundMessage } from '../gameUtils';
import { GuidedNotebook } from './GuidedNotebook';

const getRoundSummaryContent = (roundStars, roundOutcome) => {
  if (!roundOutcome || roundOutcome.status === 'idle') {
    return {
      chip: getRoundMessage(roundStars),
      title: 'Has completado los 10 retos.',
      body: 'Puedes repetir la misma ronda o cambiar de modo para seguir practicando otras cuentas.',
      primaryLabel: 'Jugar otra ronda',
      useCurrentMatchCta: false
    };
  }

  if (roundOutcome.status === 'title') {
    return {
      chip: '🏆 Copa levantada',
      title: `Has ganado ${roundOutcome.completedLeagueTitle}`,
      body: `Cerraste la temporada ${roundOutcome.completedSeasonNumber}. Has desbloqueado la siguiente y ya puedes empezar ${roundOutcome.nextMatchTitle?.toLowerCase() ?? 'un nuevo calendario'}.`,
      primaryLabel: 'Empezar nueva temporada',
      useCurrentMatchCta: true
    };
  }

  if (roundOutcome.status === 'won') {
    return {
      chip: '✅ Partido ganado',
      title: `Victoria en ${roundOutcome.matchTitle}`,
      body: `Has logrado ${roundOutcome.achievedStars} estrellas y superado la meta de ${roundOutcome.goalStars}. Tu siguiente partido es ${roundOutcome.nextMatchTitle ?? 'el siguiente del calendario'}.`,
      primaryLabel: 'Jugar partido actual',
      useCurrentMatchCta: true
    };
  }

  if (roundOutcome.status === 'lost') {
    return {
      chip: '🏀 Casi la remontas',
      title: `${roundOutcome.matchTitle} sigue abierto`,
      body: `Necesitabas ${roundOutcome.goalStars} estrellas y has conseguido ${roundOutcome.achievedStars}. Repite ${roundOutcome.matchModeLabel.toLowerCase()} para sumar la victoria.`,
      primaryLabel: 'Reintentar partido',
      useCurrentMatchCta: true
    };
  }

  return {
    chip: '🎯 Ronda de entrenamiento',
    title: 'Esta ronda cuenta como practica',
    body: `Has sumado progreso, pero el partido actual pide ${roundOutcome.matchModeLabel.toLowerCase()} para poder avanzar en la temporada.`,
    primaryLabel: 'Ir al partido actual',
    useCurrentMatchCta: true
  };
};

export function PracticePanel({
  roundComplete,
  completedCount,
  roundStars,
  progressPercentage,
  question,
  currentStarValue,
  answer,
  answerInputRef,
  isSolved,
  showHint,
  feedback,
  mode,
  seasonCard,
  roundRewards,
  questionCelebration,
  roundOutcome,
  onAnswerChange,
  onSubmit,
  onToggleHint,
  onRestartRound,
  onNextQuestion,
  onPlayCurrentMatch
}) {
  const showGuidedNotebook = supportsGuidedNotebook(question);
  const summaryContent = getRoundSummaryContent(roundStars, roundOutcome);

  return (
    <article className="practice-card">
      <div className="round-caption">
        <div>
          <span className="section-kicker">Ronda actual</span>
          <h2>
            {roundComplete
              ? 'Resumen final'
              : `Reto ${completedCount + 1} de ${SESSION_LENGTH}`}
          </h2>
        </div>
        <div className="score-pill">🏀 {roundStars} estrellas</div>
      </div>

      <div className="progress-track" aria-hidden="true">
        <div
          className="progress-bar"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {questionCelebration ? (
        <div
          key={questionCelebration.id}
          className="question-celebration"
          aria-live="polite"
        >
          <div className="question-celebration-stars" aria-hidden="true">
            {Array.from({ length: questionCelebration.starsEarned }, (_, index) => (
              <span key={index}>⭐</span>
            ))}
          </div>
          <strong>{questionCelebration.title}</strong>
          <span>{questionCelebration.subtitle}</span>
        </div>
      ) : null}

      {roundComplete ? (
        <div className={`summary-card is-${roundOutcome?.status ?? 'idle'}`}>
          <span className="summary-chip">{summaryContent.chip}</span>
          <h3>{summaryContent.title}</h3>
          <p className="summary-stars">{roundStars} / 30 estrellas</p>
          <p>{summaryContent.body}</p>
          {roundRewards.length ? (
            <div className="summary-rewards">
              {roundRewards.map((reward) => (
                <p key={reward}>{reward}</p>
              ))}
            </div>
          ) : null}
          <div className="summary-actions">
            {summaryContent.useCurrentMatchCta && seasonCard.currentMatch ? (
              <button className="btn-main" type="button" onClick={onPlayCurrentMatch}>
                {summaryContent.primaryLabel}
              </button>
            ) : (
              <button className="btn-main" type="button" onClick={() => onRestartRound(mode)}>
                {summaryContent.primaryLabel}
              </button>
            )}
            {summaryContent.useCurrentMatchCta ? (
              <button
                className="btn-secondary"
                type="button"
                onClick={() => onRestartRound(mode)}
              >
                Repetir este modo
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <>
          <div className="operation-meta">
            <span className="info-pill strong">{question.label}</span>
            <span className="info-pill">
              Esta jugada te puede dar {currentStarValue} estrellas
            </span>
            {seasonCard.currentMatch ? (
              <span className="info-pill">
                Partido: {seasonCard.currentMatch.title} · {seasonCard.currentMatch.goalStars} estrellas
              </span>
            ) : null}
          </div>

          {showGuidedNotebook ? (
            <GuidedNotebook
              key={`${question.type}-${question.left}-${question.right}`}
              question={question}
              isSolved={isSolved}
              inputRef={answerInputRef}
              onAnswerChange={onAnswerChange}
            />
          ) : (
            <div className="question-board" aria-live="polite">
              <div className="question-row">
                <span className="question-operator" />
                <span className="question-number">{question.left}</span>
              </div>
              <div className="question-row">
                <span className="question-operator">{question.operator}</span>
                <span className="question-number">{question.right}</span>
              </div>
              <div className="question-line" />
            </div>
          )}

          <form className="answer-form" onSubmit={onSubmit}>
            <div className="answer-row">
              {showGuidedNotebook ? null : (
                <input
                  id="math-answer"
                  ref={answerInputRef}
                  className="answer-input"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="off"
                  value={answer}
                  onChange={(event) => onAnswerChange(event.target.value)}
                  disabled={isSolved}
                />
              )}
              <button className="btn-main" type="submit" disabled={isSolved}>
                Comprobar
              </button>
              <button className="btn-secondary" type="button" onClick={onToggleHint}>
                {showHint ? 'Ocultar pista' : 'Mostrar pista'}
              </button>
            </div>
          </form>

          {feedback.type !== 'neutral' ? (
            <div className={`feedback ${feedback.type}`}>{feedback.message}</div>
          ) : null}

          {showHint ? (
            <div className="hint-box">
              <span className="section-kicker">Pista</span>
              <p>{question.hint}</p>
            </div>
          ) : null}

          {isSolved ? (
            <button className="btn-main" type="button" onClick={onNextQuestion}>
              {completedCount >= SESSION_LENGTH ? 'Ver resumen' : 'Siguiente reto'}
            </button>
          ) : null}
        </>
      )}
    </article>
  );
}
